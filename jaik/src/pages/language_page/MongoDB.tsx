"use client";

import { useState } from "react";

const MongoDB: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "ecosystem"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on MongoDB.`
      );
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-green-900 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-5 text-green-400">
            MongoDB Database
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about MongoDB, the leading NoSQL database that provides high
            performance, high availability, and easy scalability.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
          >
            Explore Features
          </button>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 max-w-6xl my-8">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "basics"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            MongoDB Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "features"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Core Features
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "examples"
                ? "text-green-400 border-b-2 border-green-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "ecosystem"
                ? "text-green-400 border-b-2 border-green-400"
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
            <h2 className="text-3xl font-bold mb-8 text-green-400">
              MongoDB Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is MongoDB */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  What is MongoDB?
                </h3>
                <p className="mb-4 text-gray-300">
                  MongoDB is a source-available cross-platform document-oriented
                  database program that uses JSON-like documents with optional
                  schemas.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Document database (NoSQL)</li>
                  <li>High performance, high availability</li>
                  <li>Horizontal scalability with sharding</li>
                  <li>Flexible schema design</li>
                  <li>Rich query language</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Current version:</strong> MongoDB 7.0 (released
                    August 2023)
                  </p>
                </div>
              </div>
              {/* Why MongoDB */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Why Use MongoDB?
                </h3>
                <p className="mb-4 text-gray-300">
                  MongoDB is designed for modern application development:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Handles diverse data types and structures</li>
                  <li>Scalable architecture for growing applications</li>
                  <li>Developer-friendly data model</li>
                  <li>Strong consistency and durability</li>
                  <li>Comprehensive tooling and services</li>
                </ul>
              </div>
              {/* Installation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Installation
                </h3>
                <p className="mb-4 text-gray-300">
                  MongoDB is available on multiple platforms:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Community Server:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        {`# Ubuntu/Debian
sudo apt-get install mongodb-org
`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>Docker:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        {`docker run --name mongodb -d -p 27017:27017 mongo:latest
`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>Atlas:</strong> Cloud-hosted MongoDB service at{" "}
                    <a
                      href="https://www.mongodb.com/atlas"
                      className="text-green-400 hover:underline"
                    >
                      mongodb.com/atlas
                    </a>
                  </li>
                </ul>
              </div>
              {/* Data Structure */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Data Structure
                </h3>
                <p className="mb-4 text-gray-300">
                  MongoDB uses a document data model:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Document:</strong> Basic unit (similar to JSON
                    object)
                  </li>
                  <li>
                    <strong>Collection:</strong> Group of documents (similar to
                    table)
                  </li>
                  <li>
                    <strong>Database:</strong> Physical container for
                    collections
                  </li>
                </ul>
                <pre className="mt-4 bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Example document
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "hiking"]
}
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-green-400">
              MongoDB Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* CRUD Operations */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  CRUD Operations
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Create
db.users.insertOne({
  name: "Alice",
  age: 25,
  status: "active"
})

// Read
db.users.find({ age: { $gt: 20 } }).pretty()
db.users.findOne({ name: "Alice" })

// Update
db.users.updateOne(
  { name: "Alice" },
  { $set: { status: "inactive" } }
)

// Delete
db.users.deleteOne({ name: "Alice" })
`}
                  </code>
                </pre>
              </div>
              {/* Aggregation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Aggregation Framework
                </h3>
                <p className="mb-4 text-gray-300">
                  Powerful data processing pipeline:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: {
      _id: "$customer_id",
      total: { $sum: "$amount" }
    }
  },
  { $sort: { total: -1 } },
  { $limit: 5 }
]).pretty()
`}
                  </code>
                </pre>
              </div>
              {/* Indexes */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Indexes
                </h3>
                <p className="mb-4 text-gray-300">
                  Improve query performance with indexes:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Create indexes
db.users.createIndex({ email: 1 })  // Single field
db.users.createIndex({ name: 1, age: -1 })  // Compound
db.users.createIndex({ location: "2dsphere" })  // Geospatial

// View indexes
db.users.getIndexes()

// Text search index
db.articles.createIndex({ content: "text" })
db.articles.find({ $text: { $search: "mongodb tutorial" } }).pretty()
`}
                  </code>
                </pre>
              </div>
              {/* Transactions */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Transactions
                </h3>
                <p className="mb-4 text-gray-300">
                  Multi-document ACID transactions:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`const session = db.getMongo().startSession();
session.startTransaction();
try {
  const orders = session.getDatabase("shop").orders;
  const inventory = session.getDatabase("shop").inventory;
  
  orders.insertOne({ item: "abc", qty: 10 }, { session });
  inventory.updateOne(
    { item: "abc" },
    { $inc: { qty: -10 } },
    { session }
  );
  
  session.commitTransaction();
} catch (error) {
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "examples" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-green-400">
              MongoDB Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Node.js Example */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Node.js Integration
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Install MongoDB driver
npm install mongodb

// Basic example
import { MongoClient } from 'mongodb';
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("mydb");
    const collection = database.collection("users");
    
    // Insert document
    await collection.insertOne({ name: "John", age: 30 });
    
    // Find documents
    const users = await collection.find({ age: { $gt: 25 } }).toArray();
    // console.log(users);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
`}
                  </code>
                </pre>
              </div>
              {/* Mongoose Example */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Mongoose ODM
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Install Mongoose
npm install mongoose

// Define schema and model
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/test');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Create and save document
const user = new User({ name: 'Alice', age: 25 });
await user.save();
// console.log('User saved');

// Query documents
const users = await User.find({ age: { $gt: 20 } });
// console.log(users);
`}
                  </code>
                </pre>
              </div>
              {/* Atlas Search */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Atlas Search
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Create search index
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "title": {
        "type": "string",
        "analyzer": "lucene.standard"
      },
      "description": {
        "type": "string",
        "analyzer": "lucene.english"
      }
    }
  }
}

// Search query
db.products.aggregate([
  {
    $search: {
      index: "default",
      text: {
        query: "wireless headphones",
        path: ["title", "description"]
      }
    }
  },
  { $limit: 5 }
]).pretty()
`}
                  </code>
                </pre>
              </div>
              {/* Change Streams */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Change Streams
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Watch for changes
const changeStream = db.collection('orders').watch();

changeStream.on('change', (change) => {
  console.log('Change detected:', change);
  
  // Full document for insert/replace/update
  if (change.operationType === 'insert') {
    // console.log('New document:', change.fullDocument);
  }
  
  // Update description
  if (change.operationType === 'update') {
    // console.log('Updated fields:', change.updateDescription.updatedFields);
  }
});
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ecosystem" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-green-400">
              MongoDB Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Atlas */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  MongoDB Atlas
                </h3>
                <p className="mb-4 text-gray-300">
                  Fully managed cloud database service:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Global clusters with multi-region deployments</li>
                  <li>Automated scaling and backups</li>
                  <li>Built-in security and compliance</li>
                  <li>Atlas Search, Charts, and Data Lake</li>
                  <li>Serverless instances</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://www.mongodb.com/atlas"
                    className="text-green-400 hover:underline"
                  >
                    mongodb.com/atlas
                  </a>
                </div>
              </div>
              {/* Compass */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  MongoDB Compass
                </h3>
                <p className="mb-4 text-gray-300">
                  GUI for MongoDB with powerful visualization tools:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Schema visualization and analysis</li>
                  <li>Interactive query building</li>
                  <li>Index management</li>
                  <li>Document validation</li>
                  <li>Performance metrics</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://www.mongodb.com/products/compass"
                    className="text-green-400 hover:underline"
                  >
                    mongodb.com/products/compass
                  </a>
                </div>
              </div>
              {/* Realm */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  MongoDB Realm
                </h3>
                <p className="mb-4 text-gray-300">
                  Application development platform with sync:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Mobile database with offline-first capabilities</li>
                  <li>Automatic data synchronization</li>
                  <li>Authentication and user management</li>
                  <li>Serverless functions</li>
                  <li>GraphQL API</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://www.mongodb.com/realm"
                    className="text-green-400 hover:underline"
                  >
                    mongodb.com/realm
                  </a>
                </div>
              </div>
              {/* Other Tools */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  Other MongoDB Tools
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>MongoDB Shell (mongosh):</strong> Modern
                    command-line interface
                  </li>
                  <li>
                    <strong>MongoDB Charts:</strong> Data visualization tool
                  </li>
                  <li>
                    <strong>MongoDB Connector for BI:</strong> SQL interface for
                    analytics
                  </li>
                  <li>
                    <strong>MongoDB Kubernetes Operator:</strong> Deploy on
                    Kubernetes
                  </li>
                  <li>
                    <strong>MongoDB Database Tools:</strong> Import/export
                    utilities
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
          <h2 className="text-3xl font-bold mb-5 text-green-400">
            Stay Updated with MongoDB
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on MongoDB
            features, tools, and best practices.
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
              onClick={handleSubscribe}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MongoDB;
