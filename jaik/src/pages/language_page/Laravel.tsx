"use client";

import { useState } from "react";

const Laravel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "ecosystem"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on Laravel.`
      );
      setEmail("");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-red-900 to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-5xl font-bold mb-5 text-red-400">
            Laravel Framework
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about Laravel, the PHP framework for web artisans with
            expressive, elegant syntax.
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
        <div className="flex border-b border-gray-700 overflow-x-auto">
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "basics"
                ? "text-red-400 border-b-2 border-red-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            Laravel Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "features"
                ? "text-red-400 border-b-2 border-red-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Core Features
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "examples"
                ? "text-red-400 border-b-2 border-red-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "ecosystem"
                ? "text-red-400 border-b-2 border-red-400"
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
            <h2 className="text-3xl font-bold mb-8 text-red-400">
              Laravel Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is Laravel */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  What is Laravel?
                </h3>
                <p className="mb-4 text-gray-300">
                  Laravel is a free, open-source PHP web framework created by
                  Taylor Otwell and intended for the development of web
                  applications following the MVC architectural pattern.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Expressive, elegant syntax</li>
                  <li>Built-in features for common tasks</li>
                  <li>Robust ecosystem with official packages</li>
                  <li>Active community and thorough documentation</li>
                  <li>Follows PHP best practices and design patterns</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Current version:</strong> Laravel 11 (released March
                    2024)
                  </p>
                </div>
              </div>
              {/* Why Laravel */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Why Use Laravel?
                </h3>
                <p className="mb-4 text-gray-300">
                  Laravel provides tools needed for modern PHP development:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Built-in authentication and authorization</li>
                  <li>Eloquent ORM for database interactions</li>
                  <li>Artisan command-line tool</li>
                  <li>Blade templating engine</li>
                  <li>Task scheduling and queue management</li>
                  <li>Testing and debugging tools</li>
                </ul>
              </div>
              {/* Installation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Installation
                </h3>
                <p className="mb-4 text-gray-300">
                  Laravel utilizes Composer for dependency management:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Install Laravel globally
composer global require laravel/installer

# Create new project
laravel new project-name

# Or via Composer
composer create-project --prefer-dist laravel/laravel project-name

# Serve the application
php artisan serve
`}
                  </code>
                </pre>
                <div className="mt-4">
                  <p className="text-sm text-gray-300">
                    <strong>System Requirements:</strong> PHP 8.2+, Composer,
                    MySQL/PostgreSQL/SQLite
                  </p>
                </div>
              </div>
              {/* Directory Structure */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Directory Structure
                </h3>
                <p className="mb-4 text-gray-300">
                  Key directories in a Laravel application:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <code>app/</code> - Core application code
                  </li>
                  <li>
                    <code>config/</code> - Configuration files
                  </li>
                  <li>
                    <code>database/</code> - Migrations and seeds
                  </li>
                  <li>
                    <code>public/</code> - Web server entry point
                  </li>
                  <li>
                    <code>resources/</code> - Views, assets, localization
                  </li>
                  <li>
                    <code>routes/</code> - All application routes
                  </li>
                  <li>
                    <code>storage/</code> - Logs, compiled views, caches
                  </li>
                  <li>
                    <code>tests/</code> - Automated tests
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-red-400">
              Laravel Core Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Eloquent ORM */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Eloquent ORM
                </h3>
                <p className="mb-4 text-gray-300">
                  Laravel's ActiveRecord implementation for working with
                  databases:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Define a model
namespace App\\Models;
use Illuminate\\Database\\Eloquent\\Model;

class User extends Model {
    protected $table = 'users';
}

// Basic operations
$user = new User;
$user->name = 'John';
$user->save();

// Querying
$users = User::where('active', 1)
            ->orderBy('name')
            ->take(10)
            ->get();

// Relationships
class Post extends Model {
    public function user() {
        return $this->belongsTo(User::class);
    }
}
`}
                  </code>
                </pre>
              </div>
              {/* Routing */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">Routing</h3>
                <p className="mb-4 text-gray-300">
                  Flexible routing system with middleware support:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Basic routes
Route::get('/', function () {
    return view('welcome');
});

// Route parameters
Route::get('user/{id}', function ($id) {
    return 'User '.$id;
});

// Controller routes
Route::get('profile', [ProfileController::class, 'show']);

// Route groups with middleware
Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        // Only for authenticated users
    });
});

// API routes (in routes/api.php)
Route::apiResource('posts', PostController::class);
`}
                  </code>
                </pre>
              </div>
              {/* Blade Templates */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Blade Templating
                </h3>
                <p className="mb-4 text-gray-300">
                  Powerful templating engine with inheritance and components:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<!-- resources/views/layouts/app.blade.php -->
<html>
<head>
    <title>App Name - @yield('title')</title>
</head>
<body>
    @section('sidebar')
        This is the master sidebar.
    @show

    <div class="container">
        @yield('content')
    </div>
</body>
</html>

<!-- resources/views/child.blade.php -->
@extends('layouts.app')

@section('title', 'Page Title')

@section('sidebar')
    @parent
    <p>This is appended to the sidebar.</p>
@endsection

@section('content')
    <p>This is my body content.</p>
@endsection
`}
                  </code>
                </pre>
              </div>
              {/* Artisan */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Artisan Console
                </h3>
                <p className="mb-4 text-gray-300">
                  Command-line interface included with Laravel:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Common Artisan commands
php artisan make:model Post -mcr  # Create model with migration, controller
php artisan migrate               # Run database migrations
php artisan make:middleware Auth  # Create new middleware
php artisan make:request StorePost # Create form request
php artisan make:job ProcessPodcast # Create job
php artisan queue:work            # Process queued jobs
php artisan tinker                # Interactive REPL
php artisan test                  # Run tests
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "examples" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-400">
              Laravel Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* CRUD Example */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  CRUD Operations
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Controller
namespace App\\Http\\Controllers;

use App\\Models\\Post;
use Illuminate\\Http\\Request;

class PostController extends Controller {
    public function index() {
        $posts = Post::latest()->paginate(10);
        return view('posts.index', compact('posts'));
    }

    public function create() {
        return view('posts.create');
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);
        
        Post::create($validated);
        return redirect()->route('posts.index');
    }

    public function edit(Post $post) {
        return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post) {
        $validated = $request->validate([
            'title' => 'required|max:255',
            'body' => 'required',
        ]);
        
        $post->update($validated);
        return redirect()->route('posts.index');
    }

    public function destroy(Post $post) {
        $post->delete();
        return redirect()->route('posts.index');
    }
}
`}
                  </code>
                </pre>
              </div>
              {/* Authentication */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Authentication
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Install Laravel Breeze (simple auth scaffolding)
composer require laravel/breeze --dev
php artisan breeze:install
npm install && npm run dev
php artisan migrate

# Protect routes with middleware
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

# Access authenticated user
Route::get('/profile', function () {
    $user = auth()->user();
    return view('profile', compact('user'));
})->middleware('auth');

# Manual authentication
use Illuminate\\Support\\Facades\\Auth;

if (Auth::attempt(['email' => $email, 'password' => $password])) {
    // Authentication passed...
    return redirect()->intended('dashboard');
}

# Logout
Auth::logout();
`}
                  </code>
                </pre>
              </div>
              {/* API Example */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  API Development
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// API Controller
namespace App\\Http\\Controllers\\Api;

use App\\Models\\Product;
use App\\Http\\Controllers\\Controller;
use App\\Http\\Resources\\ProductResource;
use Illuminate\\Http\\Request;

class ProductController extends Controller {
    public function index() {
        return ProductResource::collection(Product::all());
    }

    public function show(Product $product) {
        return new ProductResource($product);
    }

    public function store(Request $request) {
        $product = Product::create($request->validated());
        return new ProductResource($product);
    }
}

// API Resource (app/Http/Resources/ProductResource.php)
namespace App\\Http\\Resources;

use Illuminate\\Http\\Resources\\Json\\JsonResource;

class ProductResource extends JsonResource {
    public function toArray($request) {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'created_at' => $this->created_at,
        ];
    }
}

// API routes (routes/api.php)
Route::apiResource('products', 'App\\Http\\Controllers\\Api\\ProductController');
`}
                  </code>
                </pre>
              </div>
              {/* Task Scheduling */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Task Scheduling
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// In app/Console/Kernel.php
protected function schedule(Schedule $schedule) {
    // Run command daily at midnight
    $schedule->command('inspire')->daily();
    
    // Run closure every minute
    $schedule->call(function () {
        DB::table('recent_users')->delete();
    })->everyMinute();
    
    // Queue a job weekly
    $schedule->job(new Heartbeat)->weekly();
    
    // Shell command weekly on Sundays
    $schedule->exec('node /home/forge/script.js')
             ->weekly()->sundays()->at('12:00');
}

# Run the scheduler (add to server cron)
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ecosystem" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-red-400">
              Laravel Ecosystem
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Forge */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Laravel Forge
                </h3>
                <p className="mb-4 text-gray-300">
                  Server provisioning and deployment platform for Laravel
                  applications:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    Automated server provisioning on AWS, DigitalOcean, etc.
                  </li>
                  <li>Push-to-deploy Git integration</li>
                  <li>SSL certificate management</li>
                  <li>Queue worker management</li>
                  <li>Database backups</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://forge.laravel.com/"
                    className="text-red-400 hover:underline"
                  >
                    forge.laravel.com
                  </a>
                </div>
              </div>
              {/* Vapor */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Laravel Vapor
                </h3>
                <p className="mb-4 text-gray-300">
                  Serverless deployment platform powered by AWS Lambda:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Auto-scaling serverless PHP runtime</li>
                  <li>Managed database, cache, and storage</li>
                  <li>Zero-downtime deployments</li>
                  <li>Simple domain management</li>
                  <li>Built-in CI/CD pipeline</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://vapor.laravel.com/"
                    className="text-red-400 hover:underline"
                  >
                    vapor.laravel.com
                  </a>
                </div>
              </div>
              {/* Nova */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Laravel Nova
                </h3>
                <p className="mb-4 text-gray-300">
                  Beautifully designed administration panel for Laravel
                  applications:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Resource management with CRUD interfaces</li>
                  <li>Custom metrics and dashboards</li>
                  <li>Action system for bulk operations</li>
                  <li>Authorization and access control</li>
                  <li>Custom field types and tools</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://nova.laravel.com/"
                    className="text-red-400 hover:underline"
                  >
                    nova.laravel.com
                  </a>
                </div>
              </div>
              {/* Other Tools */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  Other Official Packages
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Envoyer:</strong> Zero-downtime PHP deployment
                  </li>
                  <li>
                    <strong>Echo:</strong> WebSocket integration for real-time
                    apps
                  </li>
                  <li>
                    <strong>Horizon:</strong> Dashboard and configuration for
                    Redis queues
                  </li>
                  <li>
                    <strong>Sanctum:</strong> Lightweight API authentication
                  </li>
                  <li>
                    <strong>Scout:</strong> Full-text search for Eloquent models
                  </li>
                  <li>
                    <strong>Socialite:</strong> OAuth authentication
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
          <h2 className="text-3xl font-bold mb-5 text-red-400">
            Stay Updated with Laravel
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on Laravel
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

export default Laravel;
