"use client";

import { useState } from "react";

const NodeJS: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "ecosystem"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on Node.js.`
      );
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-yellow-900 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-5 text-yellow-400">
            Node.js Runtime
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about Node.js, the JavaScript runtime built on Chrome's V8
            engine that enables server-side JavaScript development.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
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
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            Node.js Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "features"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Core Features
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "examples"
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "ecosystem"
                ? "text-yellow-400 border-b-2 border-yellow-400"
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
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Node.js Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is Node.js */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  What is Node.js?
                </h3>
                <p className="mb-4 text-gray-300">
                  Node.js is an open-source, cross-platform JavaScript runtime
                  environment that executes JavaScript code outside a web
                  browser.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Built on Chrome's V8 JavaScript engine</li>
                  <li>Event-driven, non-blocking I/O model</li>
                  <li>Single-threaded with event looping</li>
                  <li>Package ecosystem (npm) - largest in the world</li>
                  <li>Used for building scalable network applications</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Current version:</strong> Node.js 20.x (LTS as of
                    October 2023)
                  </p>
                </div>
              </div>
              {/* Why Node.js */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Why Use Node.js?
                </h3>
                <p className="mb-4 text-gray-300">
                  Node.js is particularly suited for certain types of
                  applications:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Real-time applications (chat, gaming)</li>
                  <li>APIs and microservices</li>
                  <li>Data streaming applications</li>
                  <li>Server-side web applications</li>
                  <li>Command line tools</li>
                  <li>Scripting and automation</li>
                </ul>
              </div>
              {/* Installation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Installation
                </h3>
                <p className="mb-4 text-gray-300">
                  Node.js can be installed in several ways:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Official Installers:</strong> Download from{" "}
                    <a
                      href="https://nodejs.org/"
                      className="text-yellow-400 hover:underline"
                    >
                      nodejs.org
                    </a>
                  </li>
                  <li>
                    <strong>Package Managers:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        {`# macOS (Homebrew)
brew install node

# Ubuntu
sudo apt update
sudo apt install nodejs npm

# Windows (Chocolatey)
choco install nodejs
`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>Version Managers:</strong> nvm, n, fnm
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        {`# Using nvm
nvm install 20
nvm use 20
`}
                      </code>
                    </pre>
                  </li>
                </ul>
              </div>
              {/* Node.js Architecture */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Node.js Architecture
                </h3>
                <p className="mb-4 text-gray-300">
                  Key components of Node.js runtime:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>V8 Engine:</strong> JavaScript execution
                  </li>
                  <li>
                    <strong>Libuv:</strong> Event loop and async I/O
                  </li>
                  <li>
                    <strong>Core Modules:</strong> fs, http, path, etc.
                  </li>
                  <li>
                    <strong>Event Loop:</strong> Non-blocking execution
                  </li>
                  <li>
                    <strong>Worker Threads:</strong> For CPU-intensive tasks
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    Node.js uses a single-threaded event loop model with
                    background worker threads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Node.js Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Event Loop */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Event Loop
                </h3>
                <p className="mb-4 text-gray-300">
                  The heart of Node.js asynchronous programming:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`console.log('Start');

setTimeout(() => console.log('Timeout 1'), 0);
setImmediate(() => console.log('Immediate'));

Promise.resolve().then(() => console.log('Promise'));

process.nextTick(() => console.log('Next Tick'));

console.log('End');

/* Output order:
Start
End
Next Tick
Promise
Timeout 1
Immediate
*/
`}
                  </code>
                </pre>
              </div>
              {/* Modules */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Module System
                </h3>
                <p className="mb-4 text-gray-300">
                  Node.js supports both CommonJS and ES modules:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// CommonJS modules
// math.js
const add = (a, b) => a + b;
module.exports = { add };

// app.js
const name = require('./math');
console.log(add(2, 3));

// ES modules
// math.mjs
export const multiply = (a, b) => a * b;

// app.mjs
import fs from './math.mjs';
console.log(multiply(2, 3));
`}
                  </code>
                </pre>
              </div>
              {/* Streams */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Streams
                </h3>
                <p className="mb-4 text-gray-300">
                  Efficient way to handle reading/writing files, network
                  communications:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import fs from 'fs';
import { Transform } from 'stream';

// Readable stream
const readStream = fs.createReadStream('input.txt');

// Writable stream
const writeStream = fs.createWriteStream('output.txt');

// Pipe streams
readStream.pipe(writeStream);

// Transform stream
const uppercase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin
  .pipe(uppercase)
  .pipe(process.stdout);
`}
                  </code>
                </pre>
              </div>
              {/* Worker Threads */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Worker Threads
                </h3>
                <p className="mb-4 text-gray-300">
                  For CPU-intensive tasks (avoid blocking event loop):
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import { Worker, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
  // Main thread
  const worker = new Worker(import.meta.url);
  worker.on('message', (msg) => console.log(msg));
  worker.postMessage('Hello worker!');
} else {
  // Worker thread
  parentPort.on('message', (msg) => {
    // CPU-intensive task
    const result = heavyComputation(msg);
    parentPort.postMessage(result);
  });
}

function heavyComputation(input) {
  // Simulated heavy task
  return input.toUpperCase();
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
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Node.js Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* HTTP Server */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  HTTP Server
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import http from 'http';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Page</h1>');
  } else {
    res.writeHead(404);
    res.end('<h1>Page Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
`}
                  </code>
                </pre>
              </div>
              {/* File System */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  File System Operations
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import fs from 'fs/promises';

// Read file (async/await)
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// Write file
async function writeFile() {
  await fs.writeFile('log.txt', 'Hello Node.js');
}

// Directory operations
async function listFiles() {
  const files = await fs.readdir('./');
  console.log(files);
}

async function main() {
  await Promise.all([readFile(), writeFile(), listFiles()]);
}

main();
`}
                  </code>
                </pre>
              </div>
              {/* Express.js */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Express.js Web App
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import express from 'express';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

app.post('/api/users', (req, res) => {
  const user = req.body;
  // Save to database
  res.status(201).json(user);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => console.log('Server started'));
`}
                  </code>
                </pre>
              </div>
              {/* WebSocket */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  WebSocket Server
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (message) => {
    console.log('Received:', message.toString());
    
    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send('Server: ' + message);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ecosystem" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">
              Node.js Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* npm */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  npm (Node Package Manager)
                </h3>
                <p className="mb-4 text-gray-300">
                  World's largest software registry with over 2 million
                  packages:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Package installation and version management</li>
                  <li>Script running with package.json</li>
                  <li>Dependency management</li>
                  <li>Publishing packages</li>
                </ul>
                <pre className="mt-4 bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Common npm commands
npm init -y       # Initialize project
npm install       # Install dependencies
npm install express # Install package
npm run start     # Run script
npm publish       # Publish package
`}
                  </code>
                </pre>
              </div>
              {/* Express.js */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Express.js
                </h3>
                <p className="mb-4 text-gray-300">
                  Fast, unopinionated, minimalist web framework for Node.js:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Routing and middleware support</li>
                  <li>Template engine integration</li>
                  <li>Error handling</li>
                  <li>REST API development</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://expressjs.com/"
                    className="text-yellow-400 hover:underline"
                  >
                    expressjs.com
                  </a>
                </div>
              </div>
              {/* Popular Libraries */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Popular Libraries
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Socket.IO:</strong> Real-time bidirectional
                    communication
                  </li>
                  <li>
                    <strong>Mongoose:</strong> MongoDB object modeling
                  </li>
                  <li>
                    <strong>Passport:</strong> Authentication middleware
                  </li>
                  <li>
                    <strong>Jest:</strong> JavaScript testing framework
                  </li>
                  <li>
                    <strong>Nodemailer:</strong> Email sending
                  </li>
                  <li>
                    <strong>Axios:</strong> HTTP client
                  </li>
                  <li>
                    <strong>Winston:</strong> Logging library
                  </li>
                </ul>
              </div>
              {/* Frameworks */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-yellow-300">
                  Node.js Frameworks
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>NestJS:</strong> Progressive framework for
                    server-side apps
                  </li>
                  <li>
                    <strong>Fastify:</strong> Fast and low overhead web
                    framework
                  </li>
                  <li>
                    <strong>Koa:</strong> Next-gen web framework by Express
                    creators
                  </li>
                  <li>
                    <strong>AdonisJS:</strong> Full-featured MVC framework
                  </li>
                  <li>
                    <strong>Sails.js:</strong> MVC framework for enterprise apps
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
          <h2 className="text-3xl font-bold mb-5 text-yellow-400">
            Stay Updated with Node.js
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on Node.js
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
              className="flex-1 px-4 py-3 rounded-full bg-black focus:outline-none text-white"
            />
            <button
              onClick={handleSubscribe}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NodeJS;
