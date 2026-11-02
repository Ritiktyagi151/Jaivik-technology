"use client";

import { useState } from "react";

const ReactVite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "ecosystem"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on React with Vite.`
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
            React with Vite.js
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Build lightning-fast React applications with Vite's next-generation
            frontend tooling.
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
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "basics"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
              }`}
            onClick={() => setActiveTab("basics")}
          >
            Vite Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "features"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
              }`}
            onClick={() => setActiveTab("features")}
          >
            Core Features
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "examples"
              ? "text-purple-400 border-b-2 border-purple-400"
              : "text-gray-400 hover:text-gray-300"
              }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === "ecosystem"
              ? "text-purple-400 border-b-2 border-purple-400"
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
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Vite Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is Vite */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  What is Vite?
                </h3>
                <p className="mb-4 text-gray-300">
                  Vite is a next-generation frontend tooling that provides an
                  extremely fast development experience.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Instant server start with native ESM</li>
                  <li>Lightning fast HMR (Hot Module Replacement)</li>
                  <li>Optimized build with Rollup</li>
                  <li>Out-of-the-box TypeScript and JSX support</li>
                  <li>Rich features and plugin ecosystem</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Current version:</strong> Vite 5 (released November
                    2023)
                  </p>
                </div>
              </div>
              {/* Why Vite */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Why Use Vite with React?
                </h3>
                <p className="mb-4 text-gray-300">
                  Vite offers several advantages for React development:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Near-instant server start (~50ms)</li>
                  <li>Lightning fast updates with HMR</li>
                  <li>Pre-configured with TypeScript, JSX, CSS Modules</li>
                  <li>Optimized production builds</li>
                  <li>Modern tooling with minimal configuration</li>
                </ul>
              </div>
              {/* Installation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Getting Started
                </h3>
                <p className="mb-4 text-gray-300">
                  Create a new React project with Vite:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Create a new Vite project
npm create vite@latest my-react-app -- --template react-ts

# Install dependencies
cd my-react-app
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
`}
                  </code>
                </pre>
              </div>
              {/* Project Structure */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Project Structure
                </h3>
                <p className="mb-4 text-gray-300">
                  A typical Vite + React project structure:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`my-react-app/
├── node_modules/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts
│   ├── components/      # React components
│   ├── App.css          # Main styles
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   └── vite-env.d.ts    # TypeScript types
├── index.html           # Entry HTML file
├── package.json
├── tsconfig.json        # TypeScript config
└── vite.config.ts       # Vite configuration
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Vite Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Dev Server */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Development Server
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,          // Custom port
    open: true,          // Open browser on start
    hmr: {
      overlay: false     // Disable error overlay
    }
  },
  preview: {
    port: 3001           // Preview port
  }
})
`}
                  </code>
                </pre>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Native ES modules (no bundling during dev)</li>
                  <li>Instant server start</li>
                  <li>Hot Module Replacement (HMR)</li>
                  <li>Middleware mode for proxying APIs</li>
                </ul>
              </div>
              {/* Production Build */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Production Build
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// vite.config.ts
export default defineConfig({
  build: {
    outDir: 'dist',      // Output directory
    emptyOutDir: true,   // Clean output directory
    sourcemap: true,     // Generate source maps
    minify: 'terser',    // Minifier
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          vendor: ['lodash', 'axios']
        }
      }
    }
  }
})
`}
                  </code>
                </pre>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300">
                  <li>Rollup-based bundling</li>
                  <li>Code splitting</li>
                  <li>Asset optimization</li>
                  <li>Pre-configured for optimal output</li>
                </ul>
              </div>
              {/* CSS Handling */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  CSS & Assets
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Import CSS directly in components
import './App.css'
import styles from './Component.module.css'

// Import assets
import logo from './assets/logo.svg'
import data from './data.json'

function App() {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" />
      <div className="global-style">Content</div>
    </div>
  )
}

// vite.config.ts for CSS preprocessors
export default defineConfig({
  css: {
    modules: {
      localsConvention: 'camelCase'
    },
    preprocessorOptions: {
      scss: {
        additionalData: \`$primary-color: #646cff;\`
      }
    }
  }
})
`}
                  </code>
                </pre>
              </div>
              {/* Environment Variables */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Environment Variables
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// .env
// VITE_API_URL=https://api.example.com
VITE_DEBUG=true

// Access in code
const apiUrl = import.meta.env.VITE_API_URL
const isDebug = import.meta.env.VITE_DEBUG

// vite.config.ts for environment variables
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('1.0.0')
  }
})

// TypeScript support (src/vite-env.d.ts)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_DEBUG: string
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
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Vite + React Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Setup */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Basic Vite Config
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\/api/, '')
      }
    }
  }
})

// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
`}
                  </code>
                </pre>
              </div>
              {/* SVG Component */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  SVG as React Components
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
    }),
  ],
})

// Component usage
import { ReactComponent as Logo } from './logo.svg'

const Header = () => (
  <header>
    <Logo className="logo" />
  </header>
)

// Or using query param
import logoUrl from './logo.svg?url'
import logoRaw from './logo.svg?raw'

<img src={logoUrl} alt="Logo" />
<div dangerouslySetInnerHTML={{ __html: logoRaw }} />
`}
                  </code>
                </pre>
              </div>
              {/* React Router */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  React Router Setup
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// App.tsx
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

// vite.config.ts for SPA fallback
export default defineConfig({
  server: {
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  }
})
`}
                  </code>
                </pre>
              </div>
              {/* Global State */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Global State Management
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Using Zustand (recommended for Vite)
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))

function Counter() {
  const { count, increment, decrement } = useCounterStore()
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )
}

// Using Context API
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ecosystem" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Vite Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vite Plugins */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Vite Plugins
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>@vitejs/plugin-react:</strong> Official React plugin
                  </li>
                  <li>
                    <strong>vite-plugin-svgr:</strong> SVG as React components
                  </li>
                  <li>
                    <strong>vite-plugin-pwa:</strong> PWA support
                  </li>
                  <li>
                    <strong>vite-plugin-checker:</strong> TypeScript checker
                  </li>
                  <li>
                    <strong>vite-plugin-mkcert:</strong> Local HTTPS
                    certificates
                  </li>
                </ul>
              </div>
              {/* Testing */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Testing
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Vitest:</strong> Vite-native test runner
                  </li>
                  <li>
                    <strong>React Testing Library:</strong> Component testing
                  </li>
                  <li>
                    <strong>Jest:</strong> With vite-jest transformer
                  </li>
                  <li>
                    <strong>Cypress:</strong> E2E testing
                  </li>
                  <li>
                    <strong>Playwright:</strong> Modern E2E testing
                  </li>
                </ul>
              </div>
              {/* Frameworks */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Frameworks
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Next.js:</strong> Now uses Turbopack (Vite
                    alternative)
                  </li>
                  <li>
                    <strong>Remix:</strong> Supports Vite
                  </li>
                  <li>
                    <strong>Astro:</strong> Island architecture with Vite
                  </li>
                  <li>
                    <strong>SvelteKit:</strong> Built with Vite
                  </li>
                  <li>
                    <strong>SolidStart:</strong> Solid.js framework with Vite
                  </li>
                </ul>
              </div>
              {/* Advanced */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Advanced Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>SSR:</strong> Server-Side Rendering
                  </li>
                  <li>
                    <strong>SSG:</strong> Static Site Generation
                  </li>
                  <li>
                    <strong>Library Mode:</strong> Build component libraries
                  </li>
                  <li>
                    <strong>WASM:</strong> WebAssembly support
                  </li>
                  <li>
                    <strong>Web Workers:</strong> Easy worker integration
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
            Stay Updated with Vite
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on Vite
            features, plugins, and best practices.
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

export default ReactVite;
