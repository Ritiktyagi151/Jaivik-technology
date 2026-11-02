"use client";

import { useState } from "react";

// Define types for Todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define type for API response in FetchDataExample
interface TodoResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const JavaScript: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"es6" | "modern" | "examples">(
    "es6"
  );
  const [email, setEmail] = useState<string>("");

  // const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   alert(
  //     `Thank you for subscribing with ${email}! We'll keep you updated on JavaScript.`
  //   );
  //   setEmail("");
  // };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-5 text-red-600">
            Modern JavaScript with ES6+
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Discover the evolution of JavaScript from its foundations to the
            powerful features of ES6 and beyond, revolutionizing web
            development.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Explore Features
          </button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 max-w-6xl my-8">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "es6"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("es6")}
          >
            ES6 Features
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "modern"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("modern")}
          >
            Modern JavaScript
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "examples"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Interactive Examples
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 max-w-6xl my-12">
        {activeTab === "es6" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-red-500">
              Key ES6 Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Arrow Functions */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Arrow Functions
                </h3>
                <p className="mb-4 text-gray-300">
                  Shorter syntax for writing function expressions and lexically
                  binds the 'this' value.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Traditional function\nfunction add(a, b) {\n  return a + b;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;`}
                  </code>
                </pre>
              </div>
              {/* Template Literals */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Template Literals
                </h3>
                <p className="mb-4 text-gray-300">
                  String literals allowing embedded expressions and multi-line
                  strings.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`const name = 'Alice';\nconst greeting = \`Hello, \${name}!\nWelcome to our website.\`;`}
                  </code>
                </pre>
              </div>
              {/* Destructuring */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Destructuring Assignment
                </h3>
                <p className="mb-4 text-gray-300">
                  Unpack values from arrays or properties from objects into
                  distinct variables.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Array destructuring\nconst [first, second] = [1, 2, 3];\n\n// Object destructuring\nconst { name, age } = { name: 'Bob', age: 30 };`}
                  </code>
                </pre>
              </div>
              {/* Classes */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">Classes</h3>
                <p className="mb-4 text-gray-300">
                  Syntactical sugar over JavaScript's prototype-based
                  inheritance.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`class Person {\n  constructor(name) {\n    this.name = name;\n  }\n\n  greet() {\n    return \`Hello, \${this.name}!\`;\n  }\n}\n\nconst alice = new Person('Alice');\nalice.greet();`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "modern" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-500">
              Modern JavaScript Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Async/Await */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Async/Await
                </h3>
                <p className="mb-4 text-gray-300">
                  Syntactic sugar built on promises that makes asynchronous code
                  easier to write and read.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`async function fetchData() {\n  try {\n    const response = await fetch('api/data');\n    const data = await response.json();\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}`}
                  </code>
                </pre>
              </div>
              {/* Optional Chaining */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Optional Chaining (?.)
                </h3>
                <p className="mb-4 text-gray-300">
                  Allows reading values deep in a chain of connected objects
                  without validating each reference.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`const user = {\n  profile: {\n    name: 'Alice',\n    address: {\n      city: 'Wonderland'\n    }\n  }\n};\n\n// Without optional chaining\nconst city = user && user.profile && user.profile.address && user.profile.address.city;\n\n// With optional chaining\nconst city = user?.profile?.address?.city;`}
                  </code>
                </pre>
              </div>
              {/* Nullish Coalescing */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Nullish Coalescing (??)
                </h3>
                <p className="mb-4 text-gray-300">
                  Logical operator that returns its right-hand operand when its
                  left-hand operand is null or undefined.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`const defaultValue = 42;\nconst value = null;\n\n// Using || (falsy values)\nconst result1 = value || defaultValue; // 42\n\n// Using ?? (only null/undefined)\nconst result2 = value ?? defaultValue; // 42\n\nconst emptyString = '';\nconst result3 = emptyString || defaultValue; // 42\nconst result4 = emptyString ?? defaultValue; // ''`}
                  </code>
                </pre>
              </div>
              {/* Modules */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Modules (import/export)
                </h3>
                <p className="mb-4 text-gray-300">
                  Native support for modular code organization using import and
                  export statements.
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// math.js\nexport const add = (a, b) => a + b;\nexport const PI = 3.14159;\n\nexport default function multiply(a, b) {\n  return a * b;\n}\n\n// app.js\nimport multiply, { add, PI } from './math.js';`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "examples" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-500">
              Interactive Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Counter with useState */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  useState Hook
                </h3>
                <p className="mb-4 text-gray-300">
                  React state management example with a counter.
                </p>
                <CounterExample />
              </div>
              {/* Fetch Data */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Fetch API Example
                </h3>
                <p className="mb-4 text-gray-300">
                  Fetch data from an API using async/await.
                </p>
                <FetchDataExample />
              </div>
              {/* Form Handling */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Form Handling
                </h3>
                <p className="mb-4 text-gray-300">
                  Controlled component form with React.
                </p>
                <FormExample />
              </div>
              {/* Todo List */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-400">
                  Todo List
                </h3>
                <p className="mb-4 text-gray-300">
                  Simple todo list with state management.
                </p>
                <TodoList />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="bg-gray-800 py-16 my-8">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-5 text-red-500">
            Stay Updated with JavaScript
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on JavaScript
            features, tutorials, and best practices.
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
              className="flex-1 px-4 py-3 rounded-full bg-black focus:outline-none text-white"
            />
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                if (email) {
                  alert(
                    `Thank you for subscribing with ${email}! We'll keep you updated on JavaScript.`
                  );
                  setEmail("");
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Example Components
const CounterExample: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="text-center">
      <p className="text-2xl mb-4">Count: {count}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

const FetchDataExample: React.FC = () => {
  const [data, setData] = useState<TodoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const json: TodoResponse = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <button
        onClick={fetchData}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {data && (
        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto text-left">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

const FormExample: React.FC = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(`Form submitted!\nName: ${formData.name}\nEmail: ${formData.email}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1 text-gray-300">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded text-gray-900"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1 text-gray-300">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded text-gray-900"
          required
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewTodo(e.target.value)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && addTodo()
          }
          placeholder="Add a new todo"
          className="flex-1 px-3 py-2 rounded-l text-gray-900"
        />
        <button
          onClick={addTodo}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-700 p-3 rounded"
          >
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-400" : "text-gray-200"
              }`}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-400 ml-2"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JavaScript;
