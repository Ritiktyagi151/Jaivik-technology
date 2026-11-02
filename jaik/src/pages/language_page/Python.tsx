"use client";

import { useState } from "react";

const Python: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "ecosystem"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on Python.`
      );
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-blue-900 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-5 text-blue-400">
            Python Programming
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about Python, the versatile and powerful programming language
            known for its simplicity and readability.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md font-semibold transition-colors duration-300"
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
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            Python Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "features"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Core Features
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "examples"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "ecosystem"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("ecosystem")}
          >
            Ecosystem
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 max-w-6xl my-12">
        {activeTab === "basics" && (
          <div id="basics">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Python Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is Python */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  What is Python?
                </h3>
                <p className="mb-4 text-gray-300">
                  Python is an interpreted, high-level, general-purpose
                  programming language created by Guido van Rossum.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    Emphasizes code readability with significant indentation
                  </li>
                  <li>Dynamically typed and garbage-collected</li>
                  <li>Supports multiple programming paradigms</li>
                  <li>Comprehensive standard library</li>
                  <li>Large ecosystem of third-party packages</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Current version:</strong> Python 3.13 (released
                    October 2024)
                  </p>
                </div>
              </div>
              {/* Why Python */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Why Use Python?
                </h3>
                <p className="mb-4 text-gray-300">
                  Python is popular across many domains because:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Easy to learn with simple syntax</li>
                  <li>Versatile (web dev, data science, automation, etc.)</li>
                  <li>Large community and extensive documentation</li>
                  <li>Cross-platform compatibility</li>
                  <li>Rich ecosystem of libraries and frameworks</li>
                </ul>
              </div>
              {/* Installation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Installation
                </h3>
                <p className="mb-4 text-gray-300">
                  Python can be installed in several ways:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Official Installer:</strong> Download from{" "}
                    <a
                      href="https://www.python.org/downloads/"
                      className="text-blue-400 hover:underline"
                    >
                      python.org
                    </a>
                  </li>
                  <li>
                    <strong>Package Managers:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        {`# macOS (Homebrew)
brew install python@3.13

# Ubuntu
sudo apt update
sudo apt install python3.13 python3-pip

# Windows (Chocolatey)
choco install python --version=3.13
`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>Anaconda:</strong> Data science distribution at{" "}
                    <a
                      href="https://www.anaconda.com/"
                      className="text-blue-400 hover:underline"
                    >
                      anaconda.com
                    </a>
                  </li>
                </ul>
              </div>
              {/* Python Syntax */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Basic Syntax
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Variables and types
name: str = "Alice"           # String
age: int = 30                 # Integer
price: float = 19.99          # Float
is_active: bool = True        # Boolean

# Collections
numbers: list[int] = [1, 2, 3]      # List
coordinates: tuple[int, int] = (4, 5)     # Tuple
person: dict[str, str] = {"name": "Bob"} # Dictionary

# Control flow
if age >= 18:
    print("Adult")
elif age >= 13:
    print("Teen")
else:
    print("Child")

# Loops
for i in range(5):       # 0 to 4
    print(i)

while age < 100:
    age += 1

# Functions
def greet(name: str) -> str:
    return f"Hello, {name}!"
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Python Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Functions */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Functions
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Basic function
def square(x: float) -> float:
    return x * x

# Default arguments
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

# Variable arguments
def sum_all(*args: float) -> float:
    return sum(args)

# Keyword arguments
def create_user(**kwargs: str) -> None:
    print(kwargs)

# Lambda functions
square: callable[[float], float] = lambda x: x * x
numbers: list[int] = [1, 2, 3]
squared = list(map(lambda x: x**2, numbers))
`}
                  </code>
                </pre>
              </div>
              {/* OOP */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Object-Oriented Programming
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`from typing import Self

class Person:
    # Class attribute
    species: str = "Homo sapiens"
    
    # Constructor
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
    
    # Instance method
    def greet(self) -> str:
        return f"Hello, {self.name}"
    
    # Class method
    @classmethod
    def from_birth_year(cls, name: str, birth_year: int) -> Self:
        return cls(name, 2025 - birth_year)
    
    # Static method
    @staticmethod
    def is_adult(age: int) -> bool:
        return age >= 18

# Inheritance
class Student(Person):
    def __init__(self, name: str, age: int, student_id: str) -> None:
        super().__init__(name, age)
        self.student_id = ''
`}
                  </code>
                </pre>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-500">
                  Classes
                </h3>
                <p className="mb-4 text-gray-300">
                  Python supports object-oriented programming:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`from typing import Self

class Person:
    # Class attribute
    species: str = "Homo sapiens"
    
    # Constructor
    def __init__(self, name: str, age: int) -> None:
        self.name = name
        self.age = age
    
    # Instance method
    def greet(self) -> str:
        return f"Hello, {self.name}"
    
    # Class method
    @classmethod
    def from_birth_year(cls, name: str, birth_year: int) -> Self:
        return cls(name, 2025 - birth_year)
    
    # Static method
    @staticmethod
    def is_adult(age: int) -> bool:
        return age >= 18

# Inheritance
class Student(Person):
    def __init__(self, name: str, age: int, student_id: str) -> None:
        super().__init__(name, age)
        self.student_id = student_id
`}
                  </code>
                </pre>
              </div>
              {/* Collections */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Collections
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`from typing import List, Tuple, Dict, Set

# Lists (mutable)
numbers: List[int] = [1, 2, 3]
numbers.append(4)
numbers[0] = 10

# Tuples (immutable)
coordinates: Tuple[int, int] = (10, 20)

# Dictionaries (key-value pairs)
person: Dict[str, str] = {"name": "Alice", "age": "30"}
person["email"] = "alice@example.com"

# Sets (unique elements)
primes: Set[int] = {2, 3, 5, 7}
primes.add(11)

# List comprehensions
squares: List[int] = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary comprehensions
square_dict: Dict[int, int] = {x: x**2 for x in range(5)}
`}
                  </code>
                </pre>
              </div>
              {/* Error Handling */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Error Handling
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`try:
    # Code that might raise an exception
    result: float = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except (TypeError, ValueError) as e:
    print(f"Error: {e}")
else:
    print("No exceptions occurred")
finally:
    print("This always runs")

# Raising exceptions
def validate_age(age: int) -> int:
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

# Custom exceptions
class MyError(Exception):
    pass
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "examples" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Python Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* File Handling */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  File Handling
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`from pathlib import Path
import csv
import json

# Reading a file
file_path: Path = Path('file.txt')
content: str = file_path.read_text(encoding='utf-8')
print(content)

# Writing to a file
Path('output.txt').write_text("Hello, Python!", encoding='utf-8')

# CSV handling
with open('data.csv', 'r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row['name'], row['email'])

# JSON handling
data: dict[str, str | int] = {'name': 'Alice', 'age': 30}
with open('data.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=2)
`}
                  </code>
                </pre>
              </div>
              {/* Web Scraping */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Web Scraping
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import requests
from bs4 import BeautifulSoup

url: str = "https://example.com"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Extract all links
for link in soup.find_all('a'):
    href: str | None = link.get('href')
    if href:
        print(href)

# Extract specific elements
title_tag = soup.find('h1')
title: str = title_tag.text if title_tag else "No title found"
print(f"Page title: {title}")
`}
                  </code>
                </pre>
              </div>
              {/* FastAPI Web App */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  FastAPI Web App
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    age: int

@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "Welcome to my FastAPI app!"}

@app.post("/users/")
async def create_user(user: User) -> User:
    return user

@app.get("/users/{user_id}")
async def read_user(user_id: int) -> dict[str, str | int]:
    return {"id": user_id, "name": "Alice", "age": 30}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`}
                  </code>
                </pre>
              </div>
              {/* Data Analysis */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Data Analysis
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create DataFrame
data: dict[str, list[str | int]] = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [50000, 60000, 70000]
}
df = pd.DataFrame(data)

# Basic operations
print(df.describe())
print(df[df['Age'] > 25])

# Visualization
df.plot(kind='bar', x='Name', y='Salary')
plt.title('Salaries by Name')
plt.show()

# NumPy operations
array: np.ndarray = np.array([1, 2, 3])
print(array * 2)
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ecosystem" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Python Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Web Development */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Web Development
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Django:</strong> High-level web framework
                  </li>
                  <li>
                    <strong>Flask:</strong> Micro web framework
                  </li>
                  <li>
                    <strong>FastAPI:</strong> Modern API framework
                  </li>
                  <li>
                    <strong>Pyramid:</strong> Flexible framework
                  </li>
                  <li>
                    <strong>Requests:</strong> HTTP client library
                  </li>
                </ul>
              </div>
              {/* Data Science */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Data Science
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>NumPy:</strong> Numerical computing
                  </li>
                  <li>
                    <strong>Pandas:</strong> Data manipulation
                  </li>
                  <li>
                    <strong>Matplotlib:</strong> Data visualization
                  </li>
                  <li>
                    <strong>Scikit-learn:</strong> Machine learning
                  </li>
                  <li>
                    <strong>TensorFlow/PyTorch:</strong> Deep learning
                  </li>
                </ul>
              </div>
              {/* Automation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Automation & Scripting
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>BeautifulSoup:</strong> Web scraping
                  </li>
                  <li>
                    <strong>Selenium:</strong> Browser automation
                  </li>
                  <li>
                    <strong>Fabric:</strong> Remote execution
                  </li>
                  <li>
                    <strong>APScheduler:</strong> Job scheduling
                  </li>
                  <li>
                    <strong>Click:</strong> Command line interfaces
                  </li>
                </ul>
              </div>
              {/* Other Domains */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Other Domains
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Pygame:</strong> Game development
                  </li>
                  <li>
                    <strong>Kivy:</strong> Mobile app development
                  </li>
                  <li>
                    <strong>OpenCV:</strong> Computer vision
                  </li>
                  <li>
                    <strong>NLTK:</strong> Natural language processing
                  </li>
                  <li>
                    <strong>PyQt:</strong> Desktop GUI development
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
          <h2 className="text-3xl font-bold mb-5 text-blue-400">
            Stay Updated with Python
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on Python
            features, packages, and best practices.
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
              className="flex-1 px-4 py-3 rounded-md bg-black focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
            />
            <button
              onClick={handleSubscribe}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Python;
