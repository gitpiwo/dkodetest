CREATE TABLE [dbo].[Item] (
    [ID] INT PRIMARY KEY,
    [Name] NVARCHAR(255),
    [Description] NVARCHAR(MAX),
    [Price] DECIMAL(18, 2)
);