import { useEffect } from 'react';

function Logic() {
    
    useEffect(() => {
        
        const currencyRates = {
            GBP: 5.2,
            EUR: 4.5,
            USD: 4.3,
        };

        //Init variable
        let currentInput = 0;
        let currentOperator = null;
        let currCurrency = null;
        let resultElement = null;
        // Fetch currency rates and set up other variables after the component is mounted
        async function FetchCurrRates() {
            try {
                const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/a/2023-10-12/');
                const data = await response.json();

                currencyRates.GBP = data[0].rates[10].mid;
                currencyRates.EUR = data[0].rates[7].mid;
                currencyRates.USD = data[0].rates[1].mid;

            } catch (error) {
                console.error('Failed to fetch currency rates:', error);
            }
        }

        FetchCurrRates();

        // Fetch buttons and resultElement after body has been mounted
        const buttons = document.querySelectorAll('.cell input[type=button]')
        resultElement = document.getElementById('result');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                if (!isNaN(button.value) || button.value === '.') {
                    resultElement.value += button.value;
                    if (!currentInput)
                        currentInput = resultElement.value;
                }

                else if (button.value === 'C') { Clear(); }

                else if (button.value === '=') {
                    // Perform calculation
                    if (currentOperator && currentInput) {
                        Calculate();
                        resultElement.value = currentInput;
                        currentInput = '';
                        currentOperator = null;
                    }

                }
                else if (button.value in currencyRates) {
                    currCurrency = button.value;
                    ConvertCurrency(currCurrency);
                }
                else {
                    // Handle arithmetic operators
                    if (currentInput) {
                        if (currentOperator) {
                            Calculate();
                        } else {
                            currentInput = resultElement.value;
                        }
                        currentOperator = button.value;
                        resultElement.value = '';
                    }
                }
            });
        });

        function Clear() {
            resultElement.value = '';
            currentInput = '';
            currentOperator = null;
            currCurrency = null;
        }
    
        //From PLN to given currency [USD, EUR, GBP]
        function ConvertCurrency(currencyVal) {
            const conversionRate = currencyRates[currencyVal];
            const convertedValue = parseFloat(resultElement.value) / conversionRate;
            resultElement.value = convertedValue.toFixed(2);
        }
        function Calculate() {
            const num1 = parseFloat(currentInput);
            const num2 = parseFloat(resultElement.value);
            switch (currentOperator) {
                case '+':
                    currentInput = (num1 + num2).toString();
                    break;
                case '-':
                    currentInput = (num1 - num2).toString();
                    break;
                case '*':
                    currentInput = (num1 * num2).toString();
                    break;
                case '/':
                    currentInput = (num1 / num2).toString();
                    break;
                default:
                    break;
            }
        }        
    }, []);
}

export default Logic