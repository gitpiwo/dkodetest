import './Body.css'
export default function Body() {
    
    return (
        <div id="calculator">
            <div className="cell" id="result-holder">
                <input type="text" id="result" />
            </div>
            <div className="cell">
                <input type="button" value="GBP" />
            </div>
            <div className="cell">
                <input type="button" value="EUR" />
            </div>
            <div className="cell">
                <input type="button" value="USD" />
            </div>
            <div className="cell">
                <input type="button" value="C" />
            </div>
            <div className="cell">
                <input type="button" value="7" />
            </div>
            <div className="cell">
                <input type="button" value="8" />
            </div>
            <div className="cell">
                <input type="button" value="9" />
            </div>
            <div className="cell">
                <input type="button" value="/" />
            </div>
            <div className="cell">
                <input type="button" value="4" />
            </div>
            <div className="cell">
                <input type="button" value="5" />
            </div>
            <div className="cell">
                <input type="button" value="6" />
            </div>
            <div className="cell">
                <input type="button" value="*" />
            </div>
            <div className="cell">
                <input type="button" value="1" />
            </div>
            <div className="cell">
                <input type="button" value="2" />
            </div>
            <div className="cell">
                <input type="button" value="3" />
            </div>
            <div className="cell">
                <input type="button" value="-" />
            </div>
            <div className="cell">
                <input type="button" value="." />
            </div>
            <div className="cell">
                <input type="button" value="0" />
            </div>
            <div className="cell">
                <input type="button" value="=" />
            </div>
            <div className="cell">
                <input type="button" value="+" />
            </div>  

        </div>
        
    )
}