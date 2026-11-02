"use client";

import { useState } from "react";

const SQL: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "engines"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on SQL.`
      );
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-purple-900 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-5 text-purple-400">
            SQL Databases
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about SQL, the standard language for managing and manipulating
            relational databases.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-md font-semibold transition-colors duration-300"
          >
            Explore
          </button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 max-w-6xl my-10">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "basics"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            SQL Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "features"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Core Features
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "examples"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "engines"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("engines")}
          >
            Database Engines
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 max-w-6xl my-12">
        {activeTab === "basics" && (
          <div id="basics">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              SQL Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is SQL */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  What is SQL?
                </h3>
                <p className="mb-4 text-gray-300">
                  SQL (Structured Query Language) is a domain-specific language
                  used for managing and manipulating relational databases.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Standard language for relational database systems</li>
                  <li>
                    Used for querying, inserting, updating, and deleting data
                  </li>
                  <li>Supports database schema creation and modification</li>
                  <li>ANSI/ISO standardized with vendor-specific extensions</li>
                  <li>Works with all major database systems</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>First appeared:</strong> 1974 (IBM System R)
                    <br />
                    <strong>Latest standard:</strong> SQL:2023 (released
                    December 2023)
                  </p>
                </div>
              </div>
              {/* Why SQL */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Why Use SQL?
                </h3>
                <p className="mb-4 text-gray-300">
                  SQL remains the dominant language for relational databases
                  because:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Standardized across database vendors</li>
                  <li>Powerful for complex queries and data analysis</li>
                  <li>ACID compliance for reliable transactions</li>
                  <li>Mature technology with extensive documentation</li>
                  <li>Integrates with all major programming languages</li>
                </ul>
              </div>
              {/* Basic Commands */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Basic SQL Commands
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Create a database
CREATE DATABASE company;

-- Create a table
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name VARCHAR(100),
  department VARCHAR(50),
  salary DECIMAL(10,2)
);

-- Insert data
INSERT INTO employees (id, name, department, salary) VALUES 
(1, 'John Doe', 'Engineering', 75000.00),
(2, 'Jane Smith', 'Marketing', 65000.00);

-- Query data
SELECT * FROM employees WHERE department = 'Engineering';

-- Update data
UPDATE employees SET salary = 80000.00 WHERE id = 1;

-- Delete data
DELETE FROM employees WHERE id = 2;

-- Note: Syntax may vary (e.g., INTEGER vs INT, depending on the database).`}
                  </code>
                </pre>
              </div>
              {/* Data Types */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  SQL Data Types
                </h3>
                <p className="mb-4 text-gray-300">
                  Common SQL data types across most database systems:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>INTEGER:</strong> Whole numbers
                  </li>
                  <li>
                    <strong>DECIMAL/NUMERIC:</strong> Exact numeric values
                  </li>
                  <li>
                    <strong>VARCHAR:</strong> Variable-length strings
                  </li>
                  <li>
                    <strong>CHAR:</strong> Fixed-length strings
                  </li>
                  <li>
                    <strong>DATE/TIME:</strong> Date and time values
                  </li>
                  <li>
                    <strong>BOOLEAN:</strong> True/false values
                  </li>
                  <li>
                    <strong>BLOB:</strong> Binary large objects
                  </li>
                </ul>
                <p className="mt-4 text-gray-300">
                  Note: Data type names may vary (e.g., TEXT in PostgreSQL,
                  NVARCHAR in SQL Server).
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              SQL Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Querying */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Querying Data
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Basic SELECT
SELECT column1, column2 FROM table_name;

-- Filtering with WHERE
SELECT * FROM products WHERE price > 100;

-- Sorting with ORDER BY
SELECT * FROM customers ORDER BY last_name ASC;

-- Limiting results (PostgreSQL/MySQL)
SELECT * FROM orders LIMIT 10;
-- SQL Server alternative: SELECT TOP 10 * FROM orders;

-- Distinct values
SELECT DISTINCT country FROM suppliers;

-- Aliasing columns
SELECT product_name AS name, unit_price AS price FROM products;
`}
                  </code>
                </pre>
              </div>
              {/* Joins */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Table Joins
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- INNER JOIN (default)
SELECT o.order_id, c.customer_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id;

-- LEFT JOIN (all from left table)
SELECT p.product_name, s.supplier_name
FROM products p
LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id;

-- RIGHT JOIN (all from right table)
SELECT e.employee_name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- FULL OUTER JOIN (all from both tables)
SELECT * FROM table1
FULL OUTER JOIN table2 ON table1.id = table2.id;

-- Self join
SELECT a.employee_name, b.employee_name AS manager
FROM employees a
JOIN employees b ON a.manager_id = b.employee_id;
`}
                  </code>
                </pre>
              </div>
              {/* Aggregation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Aggregation
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Basic aggregation functions
SELECT 
  COUNT(*) AS total_orders,
  SUM(amount) AS total_sales,
  AVG(amount) AS average_sale,
  MIN(amount) AS smallest_order,
  MAX(amount) AS largest_order
FROM orders;

-- GROUP BY
SELECT department, COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- HAVING (filter groups)
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5;

-- ROLLUP (subtotals, PostgreSQL/Oracle)
SELECT department, job_title, COUNT(*)
FROM employees
GROUP BY ROLLUP(department, job_title);
-- SQL Server alternative: GROUP BY department, job_title WITH ROLLUP
`}
                  </code>
                </pre>
              </div>
              {/* Subqueries */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Subqueries
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- WHERE clause subquery
SELECT product_name, unit_price
FROM products
WHERE unit_price > (SELECT AVG(unit_price) FROM products);

-- FROM clause subquery
SELECT avg_prices.category, avg_prices.avg_price
FROM (
  SELECT category, AVG(price) AS avg_price
  FROM products
  GROUP BY category
) AS avg_prices
WHERE avg_prices.avg_price > 100;

-- IN operator with subquery
SELECT customer_name
FROM customers
WHERE customer_id IN (
  SELECT customer_id FROM orders WHERE order_date > '2023-01-01'
);

-- EXISTS operator
SELECT supplier_name
FROM suppliers s
WHERE EXISTS (
  SELECT 1 FROM products p 
  WHERE p.supplier_id = s.supplier_id AND p.price < 10
);
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "examples" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              SQL Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Database Design */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Database Design
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Create a normalized database schema
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  registration_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE products (
  product_id INTEGER PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) CHECK (price > 0),
  stock_quantity INTEGER DEFAULT 0
);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(customer_id),
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'delivered', 'cancelled'))
);

CREATE TABLE order_items (
  order_item_id INTEGER PRIMARY KEY,
  order_id INTEGER REFERENCES orders(order_id),
  product_id INTEGER REFERENCES products(product_id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_customer_email ON customers(email);
CREATE INDEX idx_order_customer ON orders(customer_id);
CREATE INDEX idx_order_date ON orders(order_date);
`}
                  </code>
                </pre>
              </div>
              {/* Complex Query */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Complex Query
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Find top 5 customers by total spending in 2023
SELECT 
  c.customer_id,
  c.name,
  c.email,
  SUM(oi.quantity * oi.unit_price) AS total_spent,
  COUNT(DISTINCT o.order_id) AS order_count
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.order_date BETWEEN '2023-01-01' AND '2023-12-31'
  AND o.status = 'delivered'
GROUP BY c.customer_id, c.name, c.email
ORDER BY total_spent DESC
LIMIT 5;
-- SQL Server alternative: SELECT TOP 5 ...

-- Monthly sales report with growth calculation (PostgreSQL)
WITH monthly_sales AS (
  SELECT 
    DATE_TRUNC('month', order_date) AS month,
    SUM(oi.quantity * oi.unit_price) AS revenue
  FROM orders o
  JOIN order_items oi ON o.order_id = oi.order_id
  WHERE o.status = 'delivered'
  GROUP BY DATE_TRUNC('month', order_date)
)
SELECT 
  TO_CHAR(month, 'YYYY-MM') AS month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_month_revenue,
  ROUND(
    (revenue - LAG(revenue) OVER (ORDER BY month)) / 
    LAG(revenue) OVER (ORDER BY month) * 100, 
    2
  ) AS growth_percentage
FROM monthly_sales
ORDER BY month;
-- SQL Server alternative: DATEPART(MONTH, order_date), FORMAT(month, 'yyyy-MM')
`}
                  </code>
                </pre>
              </div>
              {/* Stored Procedure */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Stored Procedure (PostgreSQL)
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Create a stored procedure to place an order (PostgreSQL)
CREATE OR REPLACE PROCEDURE place_order(
  p_customer_id INTEGER,
  p_product_ids INTEGER[],
  p_quantities INTEGER[],
  OUT p_order_id INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
  i INTEGER;
  v_total DECIMAL(10,2) := 0;
  v_product_price DECIMAL(10,2);
BEGIN
  -- Start transaction
  BEGIN
    -- Create order header
    INSERT INTO orders (customer_id, status)
    VALUES (p_customer_id, 'pending')
    RETURNING order_id INTO p_order_id;
    
    -- Add order items
    FOR i IN 1..array_length(p_product_ids, 1) LOOP
      -- Get product price
      SELECT price INTO v_product_price 
      FROM products 
      WHERE product_id = p_product_ids[i];
      
      -- Add order item
      INSERT INTO order_items (
        order_id, 
        product_id, 
        quantity, 
        unit_price
      ) VALUES (
        p_order_id,
        p_product_ids[i],
        p_quantities[i],
        v_product_price
      );
      
      -- Update total
      v_total := v_total + (v_product_price * p_quantities[i]);
      
      -- Update product stock
      UPDATE products
      SET stock_quantity = stock_quantity - p_quantities[i]
      WHERE product_id = p_product_ids[i];
    END LOOP;
    
    -- Update order total (assuming orders table has total_amount column)
    UPDATE orders
    SET total_amount = v_total
    WHERE order_id = p_order_id;
    
    -- Commit transaction
    COMMIT;
  EXCEPTION
    WHEN OTHERS THEN
      -- Rollback on error
      ROLLBACK;
      RAISE EXCEPTION 'Error placing order: %', SQLERRM;
  END;
END;
$$;

-- Call the procedure
CALL place_order(1, ARRAY[1, 2], ARRAY[5, 3], NULL);
`}
                  </code>
                </pre>
              </div>
              {/* Node.js Integration */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Node.js Integration (TypeScript)
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Using pg (PostgreSQL) library with TypeScript
import { Pool, QueryResult } from 'pg';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface Account {
  id: number;
  balance: number;
}

interface Transaction {
  from_account: number;
  to_account: number;
  amount: number;
}

const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 5432,
});

// Query example
async function getUsers(): Promise<User[]> {
  try {
    const res: QueryResult<User> = await pool.query(
      'SELECT * FROM users WHERE active = $1', 
      [true]
    );
    return res.rows;
  } catch (err: unknown) {
    console.error('Database error:', err);
    throw err;
  }
}

// Transaction example
async function transferFunds(fromId: number, toId: number, amount: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Deduct from source account
    await client.query(
      'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
      [amount, fromId]
    );
    
    // Add to target account
    await client.query(
      'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
      [amount, toId]
    );
    
    // Record transaction
    await client.query(
      'INSERT INTO transactions (from_account, to_account, amount) VALUES ($1, $2, $3)',
      [fromId, toId, amount]
    );
    
    await client.query('COMMIT');
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "engines" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              SQL Database Engines
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* PostgreSQL */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  PostgreSQL
                </h3>
                <p className="mb-4 text-gray-300">
                  Advanced open-source relational database:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Highly standards-compliant</li>
                  <li>Advanced features (JSON support, full-text search)</li>
                  <li>Excellent for complex queries and large datasets</li>
                  <li>Strong ACID compliance</li>
                  <li>Extensible with custom functions and types</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://www.postgresql.org/"
                    className="text-purple-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    postgresql.org
                  </a>
                </div>
              </div>
              {/* MySQL */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  MySQL
                </h3>
                <p className="mb-4 text-gray-300">
                  Popular open-source relational database:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Widely used in web applications</li>
                  <li>Excellent performance for read-heavy workloads</li>
                  <li>Multiple storage engines (InnoDB, MyISAM)</li>
                  <li>Owned by Oracle Corporation</li>
                  <li>Community and enterprise editions</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://www.mysql.com/"
                    className="text-purple-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    mysql.com
                  </a>
                </div>
              </div>
              {/* SQL Server */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Microsoft SQL Server
                </h3>
                <p className="mb-4 text-gray-300">
                  Enterprise-grade relational database:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Deep integration with Microsoft products</li>
                  <li>Advanced business intelligence features</li>
                  <li>Strong security features</li>
                  <li>Available on Windows and Linux</li>
                  <li>Commercial product with free Express edition</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://www.microsoft.com/sql-server"
                    className="text-purple-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    microsoft.com/sql-server
                  </a>
                </div>
              </div>
              {/* Other Databases */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Other SQL Databases
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>SQLite:</strong> Lightweight, file-based database
                  </li>
                  <li>
                    <strong>Oracle Database:</strong> Enterprise RDBMS
                  </li>
                  <li>
                    <strong>MariaDB:</strong> MySQL fork with enhanced features
                  </li>
                  <li>
                    <strong>Amazon RDS:</strong> Managed database service
                  </li>
                  <li>
                    <strong>Google Cloud SQL:</strong> Fully-managed database
                    service
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="bg-gray-800 py-16 my-8">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-5 text-purple-400">
            Stay Updated with SQL
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on SQL
            features, database technologies, and best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-md bg-black focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"
            />
            <button
              onClick={handleSubscribe}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SQL;
