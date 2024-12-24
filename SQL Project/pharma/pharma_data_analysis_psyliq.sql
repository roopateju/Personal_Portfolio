CREATE database pharma_data_analysis;
use pharma_data_analysis;
show tables;
select * from pharma_data_analysis;

-- Retrieve all columns for all records in the dataset.--
SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'pharma_data_analysis' AND TABLE_SCHEMA = 'pharma_data_analysis';

-- How many unique countries are represented in the dataset? -- 
select distinct Country from pharma_data_analysis;

-- Select the names of all the customers on the 'Retail' channel.-- 
select Customer_Name from pharma_data_analysis where Sub_Channel = 'Retail';

--  Find the total quantity sold for the ' Antibiotics' product class. --
select sum(Quantity) as Total_Quantity_Antibiotics from pharma_data_analysis where Product_Class = 'Antibiotics'; 

-- List all the distinct months present in the dataset. -- 
select distinct Month from pharma_data_analysis;

--  Calculate the total sales for each year. -- 
SELECT Year, SUM(Sales) AS Total_Sales FROM pharma_data_analysis GROUP BY Year ORDER BY Year;

-- Find the customer with the highest sales value. -- 
SELECT Customer_Name, SUM(Sales) AS Total_Sales FROM pharma_data_analysis GROUP BY Customer_Name ORDER BY Total_Sales DESC LIMIT 1;

-- Get the names of all employees who are Sales Reps and are managed by 'James Goodwill'.-- 
SELECT Name_of_Sales_Rep FROM pharma_data_analysis WHERE Name_of_Sales_Rep IS NOT NULL AND Manager = 'James Goodwill';

--  Calculate the average price of products in each sub-channel.  --
SELECT Sub_Channel, AVG(Price) AS Average_Price FROM pharma_data_analysis GROUP BY Sub_Channel ORDER BY Sub_Channel;

 -- Join the 'Employees' table with the 'Sales' table to get the name of the Sales Rep and the corresponding sales records.-- 
SELECT Name_of_Sales_Rep, Sales, Product_Name, Quantity, Price, Month, Year FROM pharma_data_analysis;

--  Retrieve all sales made by employees from ' Poland ' in the year 2018. -- 
SELECT * FROM pharma_data_analysis WHERE Country = 'Poland' AND Year = 2018;

-- Calculate the total sales for each product class, for each month, and order the results by year, month, and product class.-- 
SELECT Product_Class, Year, Month, SUM(Sales) AS Total_Sales FROM pharma_data_analysis 
GROUP BY Year, Month, Product_Class ORDER BY Year, Month, Product_Class;

-- Find the top 3 sales reps with the highest sales in 2018.-- 
SELECT Name_of_Sales_Rep, SUM(Sales) AS Total_Sales FROM pharma_data_analysis WHERE Year = 2018 
GROUP BY Name_of_Sales_Rep ORDER BY Total_Sales DESC LIMIT 3; 

-- Calculate the monthly total sales for each sub-channel, and then calculate the average monthly sales for each sub-channel over the years.--
SELECT Sub_Channel, Year, Month, SUM(Sales) AS Monthly_Total_Sales FROM pharma_data_analysis
GROUP BY Sub_Channel, Year, Month ORDER BY Sub_Channel, Year, Month;

 -- Create a summary report that includes the total sales, average price, and total quantity sold for each product class.--  
SELECT Product_Class, SUM(Sales) AS Total_Sales, AVG(Price) AS Average_Price, SUM(Quantity) AS Total_Quantity_Sold
FROM pharma_data_analysis GROUP BY Product_Class ORDER BY Product_Class;

-- Find the top 5 customers with the highest sales for each year. -- 
WITH RankedCustomers AS (
    SELECT 
        Customer_Name,
        Year,
        SUM(Sales) AS Total_Sales,
        ROW_NUMBER() OVER (PARTITION BY Year ORDER BY SUM(Sales) DESC) AS Ranks
    FROM pharma_data_analysis
    GROUP BY Customer_Name, Year
)
SELECT 
    Customer_Name,
    Year,
    Total_Sales
FROM RankedCustomers
WHERE Ranks <= 5
ORDER BY Year, Ranks;

-- Calculate the year-over-year growth in sales for each country. -- 
WITH AnnualSales AS (
    SELECT 
        Country,
        Year,
        SUM(Sales) AS Total_Sales
    FROM pharma_data_analysis
    GROUP BY Country, Year
),
SalesGrowth AS (
    SELECT 
        a.Country,
        a.Year,
        a.Total_Sales,
        COALESCE(((a.Total_Sales - b.Total_Sales) / b.Total_Sales) * 100, 0) AS Growth_Percentage
    FROM AnnualSales a
    LEFT JOIN AnnualSales b
    ON a.Country = b.Country AND a.Year = b.Year + 1
)
SELECT 
    Country,
    Year,
    Total_Sales,
    Growth_Percentage
FROM SalesGrowth
ORDER BY Country, Year;

-- List the months with the lowest sales for each year -- 
WITH MonthlySales AS (
    SELECT Year, Month, SUM(Sales) AS Total_Sales
    FROM pharma_data_analysis
    GROUP BY Year, Month
),
MinMonthlySales AS (
    SELECT Year, MIN(Total_Sales) AS Min_Sales
    FROM MonthlySales
    GROUP BY Year
)
SELECT ms.Year, ms.Month, ms.Total_Sales
FROM MonthlySales ms
JOIN MinMonthlySales mms
ON ms.Year = mms.Year AND ms.Total_Sales = mms.Min_Sales
ORDER BY ms.Year, ms.Month;

-- Calculate the total sales for each sub-channel in each country, and then find the country with the highest total sales for each sub-channel. -- 
WITH SubChannelCountrySales AS (
    SELECT 
        Sub_Channel,
        Country,
        SUM(Sales) AS Total_Sales
    FROM pharma_data_analysis
    GROUP BY Sub_Channel, Country
),
RankedSales AS (
    SELECT 
        Sub_Channel,
        Country,
        Total_Sales,
        ROW_NUMBER() OVER (PARTITION BY Sub_Channel ORDER BY Total_Sales DESC) AS Ranks
    FROM SubChannelCountrySales
)
SELECT 
    Sub_Channel,
    Country,
    Total_Sales
FROM RankedSales
WHERE Ranks = 1
ORDER BY Sub_Channel;