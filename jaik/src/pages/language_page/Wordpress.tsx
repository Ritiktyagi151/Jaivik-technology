"use client";

import { useState } from "react";

const WordPress: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "development" | "rest-api" | "performance"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on WordPress.`
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
            WordPress Development
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Build powerful, scalable, and customizable websites with WordPress,
            the world's leading CMS.
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
            WordPress Basics
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "development"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("development")}
          >
            Theme & Plugin Development
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "rest-api"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("rest-api")}
          >
            REST API
          </button>
          <button
            className={`px-6 py-3 font-medium whitespace-nowrap ${
              activeTab === "performance"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("performance")}
          >
            Performance
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 max-w-6xl my-12">
        {activeTab === "basics" && (
          <div id="basics">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              WordPress Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* WordPress Overview */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  What is WordPress?
                </h3>
                <p className="mb-4 text-gray-300">
                  WordPress is an open-source CMS powering over 40% of the web.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Launched in 2003, latest version: 6.7 (November 2024)</li>
                  <li>Uses PHP and MySQL/MariaDB (5.6+/10.3+)</li>
                  <li>Supports themes for design customization</li>
                  <li>Extensible via plugins (60,000+ available)</li>
                  <li>Features block editor and full-site editing</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Config:</strong> wp-config.php defines DB settings
                    <br />
                    <strong>Core:</strong> /wp-includes, /wp-content, /wp-admin
                  </p>
                </div>
              </div>
              {/* Why Use WordPress */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Why Use WordPress?
                </h3>
                <p className="mb-4 text-gray-300">WordPress is ideal for:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Beginner-friendly content management</li>
                  <li>Flexible theme and plugin ecosystem</li>
                  <li>Robust community and documentation</li>
                  <li>SEO and e-commerce capabilities</li>
                  <li>Scalable for blogs to enterprise sites</li>
                </ul>
              </div>
              {/* Core Components */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Core Components
                </h3>
                <p className="mb-4 text-gray-300">
                  Key WordPress components include:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Themes:</strong> Control site appearance
                  </li>
                  <li>
                    <strong>Plugins:</strong> Add functionality
                  </li>
                  <li>
                    <strong>Block Editor:</strong> Gutenberg for content
                    creation
                  </li>
                  <li>
                    <strong>REST API:</strong> Headless WordPress integration
                  </li>
                  <li>
                    <strong>Database:</strong> MySQL/MariaDB with wp_ tables
                  </li>
                </ul>
              </div>
              {/* Basic WP CLI */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  WP-CLI Basics
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`# Update WordPress core
wp core update

# Install a plugin
wp plugin install woocommerce --activate

# Generate a new theme
wp scaffold _s my-theme

# Export database
wp db export backup.sql

# List all users
wp user list --format=table
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "development" && (
          <div id="development">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Theme & Plugin Development
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Theme Development */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Theme Development
                </h3>
                <p className="mb-4 text-gray-300">
                  Create custom themes in /wp-content/themes:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
// functions.php
function my_theme_setup(): void {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  register_nav_menu('primary', 'Primary Menu');
}
add_action('after_setup_theme', 'my_theme_setup');

function my_theme_scripts(): void {
  wp_enqueue_style('style', get_stylesheet_uri(), [], '1.0');
  wp_enqueue_script('script', get_template_directory_uri() . '/js/script.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'my_theme_scripts');

// index.php
get_header();
if (have_posts()) {
  while (have_posts()) {
    the_post();
    the_title('<h2>', '</h2>');
    the_content();
  }
}
get_footer();

// Note: Always use wp_enqueue_* for assets to avoid conflicts.
`}
                  </code>
                </pre>
              </div>
              {/* Plugin Development */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Plugin Development
                </h3>
                <p className="mb-4 text-gray-300">
                  Build plugins in /wp-content/plugins:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
/*
Plugin Name: My Custom Plugin
Version: 1.0
*/

// Shortcode
function my_shortcode($atts): string {
  $atts = shortcode_atts(['title' => 'Hello'], $atts);
  return '<h3>' . esc_html($atts['title']) . '</h3>';
}
add_shortcode('my_shortcode', 'my_shortcode');

// Custom post type
function register_my_cpt(): void {
  register_post_type('portfolio', [
    'labels' => ['name' => 'Portfolio', 'singular_name' => 'Portfolio Item'],
    'public' => true,
    'supports' => ['title', 'editor', 'thumbnail'],
  ]);
}
add_action('init', 'register_my_cpt');

// Note: Use esc_* functions for output sanitization.
`}
                  </code>
                </pre>
              </div>
              {/* Custom Database Table */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Custom Database Table
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
function create_custom_table(): void {
  global $wpdb;
  $table_name = $wpdb->prefix . 'analytics';
  $charset_collate = $wpdb->get_charset_collate();
  
  $sql = "CREATE TABLE $table_name (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    page_id BIGINT(20) NOT NULL,
    visits INT DEFAULT 0,
    last_visit DATETIME,
    PRIMARY KEY (id),
    INDEX page_id_index (page_id)
  ) $charset_collate;";
  
  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  dbDelta($sql);
}
register_activation_hook(__FILE__, 'create_custom_table');

function log_page_visit(int $page_id): void {
  global $wpdb;
  $table_name = $wpdb->prefix . 'analytics';
  $wpdb->insert(
    $table_name,
    [
      'page_id' => $page_id,
      'visits' => 1,
      'last_visit' => current_time('mysql'),
    ],
    ['%d', '%d', '%s']
  );
}
add_action('wp', function() {
  if (is_page()) {
    log_page_visit(get_the_ID());
  }
});
`}
                  </code>
                </pre>
              </div>
              {/* Hooks and Filters */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Hooks and Filters
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
// Action: Add custom admin notice
function my_admin_notice(): void {
  echo '<div class="notice notice-info"><p>Custom notice!</p></div>';
}
add_action('admin_notices', 'my_admin_notice');

// Filter: Modify excerpt length
function my_excerpt_length(int $length): int {
  return 20;
}
add_filter('excerpt_length', 'my_excerpt_length', 999);

// Filter: Modify content
function my_content_filter(string $content): string {
  if (is_single()) {
    return $content . '<p>Read more at our blog!</p>';
  }
  return $content;
}
add_filter('the_content', 'my_content_filter');

// Note: Use high priority (e.g., 999) for filters to run last.
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "rest-api" && (
          <div id="rest-api">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              WordPress REST API
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* REST API Basics */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  REST API Basics
                </h3>
                <p className="mb-4 text-gray-300">
                  WordPress REST API enables headless applications:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Access via /wp-json/wp/v2/</li>
                  <li>Supports posts, pages, users, etc.</li>
                  <li>Authentication via JWT or Application Passwords</li>
                  <li>Extensible for custom endpoints</li>
                  <li>Ideal for React/Next.js frontends</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Base URL:</strong> yoursite.com/wp-json
                  </p>
                </div>
              </div>
              {/* Fetch Posts */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Fetch Posts (TypeScript)
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`interface Post {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
}

async function fetchPosts(baseUrl: string): Promise<Post[]> {
  try {
    const response = await fetch(\`\${baseUrl}/wp-json/wp/v2/posts?_embed\`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const posts: Post[] = await response.json();
    return posts;
  } catch (error: unknown) {
    console.error('Error:', error);
    return [];
  }
}

// Usage
fetchPosts('https://yoursite.com').then(posts => {
  posts.forEach(post => {
    console.log(post.title.rendered);
  });
});
`}
                  </code>
                </pre>
              </div>
              {/* Custom Endpoint */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Custom REST Endpoint
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
// Register custom endpoint
function register_custom_endpoint(): void {
  register_rest_route('myplugin/v1', '/stats', [
    'methods' => 'GET',
    'callback' => 'get_stats',
    'permission_callback' => '__return_true',
  ]);
}
add_action('rest_api_init', 'register_custom_endpoint');

function get_stats(WP_REST_Request $request): array {
  global $wpdb;
  $stats = $wpdb->get_row(
    $wpdb->prepare(
      "SELECT COUNT(*) as post_count FROM {$wpdb->posts} WHERE post_status = %s",
      'publish'
    )
  );
  return [
    'post_count' => (int) $stats->post_count,
    'last_updated' => current_time('mysql'),
  ];
}

// Access: yoursite.com/wp-json/myplugin/v1/stats
`}
                  </code>
                </pre>
              </div>
              {/* Authentication */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  REST API Authentication
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`interface AuthResponse {
  token: string;
}

async function authenticateWP(baseUrl: string, username: string, password: string): Promise<string | null> {
  try {
    const response = await fetch(\`\${baseUrl}/wp-json/jwt-auth/v1/token\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    const data: AuthResponse = await response.json();
    return data.token;
  } catch (error: unknown) {
    console.error('Error:', error);
    return null;
  }
}

// Usage
authenticateWP('https://yoursite.com', 'user', 'pass').then(token => {
  if (token) {
    fetch('https://yoursite.com/wp-json/wp/v2/posts', {
      headers: { Authorization: \`Bearer \${token}\` },
    });
  }
});

// Note: Requires JWT Authentication plugin.
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "performance" && (
          <div id="performance">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              WordPress Performance
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Database Optimization */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Database Optimization
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`-- Delete post revisions
DELETE FROM wp_posts 
WHERE post_type = 'revision';

-- Delete spam comments
DELETE FROM wp_comments 
WHERE comment_approved = 'spam';

-- Clean expired transients
DELETE FROM wp_options 
WHERE option_name LIKE '_transient_%' 
OR option_name LIKE '_site_transient_%';

-- Add index for performance
ALTER TABLE wp_postmeta 
ADD INDEX post_id_index (post_id);

-- Optimize tables
OPTIMIZE TABLE wp_posts, wp_postmeta, wp_options;

-- Note: Always backup before running these queries.
-- MySQL-specific; use SQL Server equivalents if needed (e.g., DBCC SHRINKDATABASE).
`}
                  </code>
                </pre>
              </div>
              {/* Caching */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Caching
                </h3>
                <p className="mb-4 text-gray-300">
                  Implement caching to improve performance:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
// Transient API
function get_cached_data($key): array {
  $data = get_transient($key);
  if (false === $data) {
    global $wpdb;
    $data = $wpdb->get_results(
      $wpdb->prepare("SELECT * FROM {$wpdb->posts} WHERE post_type = %s", 'post')
    );
    set_transient($key, $data, HOUR_IN_SECONDS);
  }
  return $data;
}

// Object caching (e.g., Memcached)
function my_object_cache(): void {
  wp_cache_set('my_key', ['data' => 'value'], 'my_group', 3600);
}
add_action('init', 'my_object_cache');

// WP-CLI cache commands
wp cache flush
wp transient delete --all
`}
                  </code>
                </pre>
              </div>
              {/* Lazy Loading */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Lazy Loading
                </h3>
                <p className="mb-4 text-gray-300">Optimize asset loading:</p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
// Enable lazy loading for images
function enable_lazy_loading(): void {
  add_filter('wp_lazy_loading_enabled', '__return_true');
}
add_action('init', 'enable_lazy_loading');

// Lazy load custom scripts
function lazy_load_scripts(): void {
  wp_enqueue_script(
    'my-script',
    get_template_directory_uri() . '/js/script.js',
    [],
    '1.0',
    ['strategy' => 'defer']
  );
}
add_action('wp_enqueue_scripts', 'lazy_load_scripts');

// HTML example
<img src="placeholder.jpg" data-src="real-image.jpg" loading="lazy" alt="Example">
`}
                  </code>
                </pre>
              </div>
              {/* CDN Integration */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  CDN Integration
                </h3>
                <p className="mb-4 text-gray-300">
                  Use a CDN for static assets:
                </p>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<?php
// Rewrite asset URLs for CDN
function cdn_rewrite_urls(string $url): string {
  $cdn_url = 'https://cdn.yoursite.com';
  return str_replace(home_url(), $cdn_url, $url);
}
add_filter('wp_get_attachment_url', 'cdn_rewrite_urls');
add_filter('stylesheet_directory_uri', 'cdn_rewrite_urls');
add_filter('template_directory_uri', 'cdn_rewrite_urls');

// WP-CLI CDN plugin commands
wp plugin install jetpack --activate
wp jetpack cdn activate
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <section className="bg-gray-800 py-16 my-8">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-5 text-blue-400">
            WordPress Tips & Updates
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe for the latest WordPress development techniques,
            performance tips, and updates.
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

export default WordPress;
