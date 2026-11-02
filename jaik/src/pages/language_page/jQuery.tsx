"use client";

import { useState } from "react";

const JQuery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "plugins"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on jQuery.`
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
            jQuery Library
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about jQuery, the fast, small, and feature-rich JavaScript
            library that simplified HTML document traversal, event handling, and
            Ajax.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
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
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            jQuery Basics
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
              activeTab === "plugins"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("plugins")}
          >
            Plugins
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 max-w-6xl my-12">
        {activeTab === "basics" && (
          <div id="basics">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              jQuery Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is jQuery */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  What is jQuery?
                </h3>
                <p className="mb-4 text-gray-300">
                  jQuery is a fast, small, and feature-rich JavaScript library
                  that simplifies:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>HTML document traversal and manipulation</li>
                  <li>Event handling</li>
                  <li>Ajax interactions</li>
                  <li>Animation effects</li>
                  <li>Cross-browser JavaScript development</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>Current version:</strong> 3.7.1 (as of August 2023)
                  </p>
                </div>
              </div>
              {/* Why jQuery */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Why Use jQuery?
                </h3>
                <p className="mb-4 text-gray-300">
                  jQuery revolutionized front-end development by solving common
                  pain points:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Simplified DOM manipulation</li>
                  <li>Consistent cross-browser API</li>
                  <li>Concise syntax (write less, do more)</li>
                  <li>Large ecosystem of plugins</li>
                  <li>Excellent documentation and community</li>
                </ul>
              </div>
              {/* Basic Syntax */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Basic Syntax
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Document ready (ensures DOM is loaded)
$(document).ready(function() {
  // jQuery code here
});

// Shorthand version
$(function() {
  // jQuery code here
});

// Select elements
$('div')          // All div elements
$('#myId')        // Element with id="myId"
$('.myClass')     // Elements with class="myClass"
$('input[name="first_name"]') // Input with name="first_name"
`}
                  </code>
                </pre>
              </div>
              {/* Installation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Installation
                </h3>
                <p className="mb-4 text-gray-300">
                  There are several ways to include jQuery:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>CDN:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">
                        {`<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>npm:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs overflow-x-auto">
                      <code className="text-green-400">{`npm install jquery`}</code>
                    </pre>
                  </li>
                  <li>
                    <strong>Download:</strong> Get the file from{" "}
                    <a
                      href="https://jquery.com/download/"
                      className="text-purple-400 hover:underline"
                    >
                      jquery.com/download/
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Core jQuery Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* DOM Manipulation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  DOM Manipulation
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Get/set content
$('#element').html()      // Get HTML
$('#element').html('New content') // Set HTML
$('#element').text()      // Get text
$('#element').text('New text') // Set text

// Attributes
$('#element').attr('href') // Get attribute
$('#element').attr('href', 'new-value') // Set attribute

// CSS
$('#element').css('color') // Get CSS
$('#element').css('color', 'red') // Set CSS

// Classes
$('#element').addClass('new-class')
$('#element').removeClass('old-class')
$('#element').toggleClass('active')
`}
                  </code>
                </pre>
              </div>
              {/* Events */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Event Handling
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Click event
$('#button').click(function() {
  alert('Button clicked!');
});

// Form submit
$('form').submit(function(e) {
  e.preventDefault(); // Prevent default form submission
  // Handle form
});

// Event delegation (works for dynamically added elements)
$('#container').on('click', '.item', function() {
  // Handle click on .item elements inside #container
});

// Common events:
// click, dblclick, mouseenter, mouseleave,
// keypress, keydown, keyup, focus, blur,
// change, submit
`}
                  </code>
                </pre>
              </div>
              {/* Effects */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Effects & Animation
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Basic show/hide
$('#element').hide()     // Hide immediately
$('#element').show()     // Show immediately
$('#element').toggle()   // Toggle visibility

// With effects
$('#element').fadeIn()   // Fade in
$('#element').fadeOut()  // Fade out
$('#element').slideUp()  // Slide up
$('#element').slideDown() // Slide down

// Custom animation
$('#element').animate({
  opacity: 0.5,
  left: '+=50',
  height: 'toggle'
}, 500); // Duration in ms

// Chaining
$('#element')
  .css('color', 'red')
  .slideUp(200)
  .slideDown(200);
`}
                  </code>
                </pre>
              </div>
              {/* Ajax */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Ajax Methods
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Basic GET request
$.get('api/data', function(response) {
  // Handle response
});

// POST request
$.post('api/save', { name: 'John' }, function(response) {
  // Handle response
});

// Full AJAX options
$.ajax({
  url: 'api/data',
  type: 'GET',
  dataType: 'json',
  success: function(data) {
    // Handle success
  },
  error: function(xhr, status, error) {
    // Handle error
  }
});

// Load HTML into element
$('#result').load('partial.html #content');
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
              jQuery Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Tab System */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Tab System
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<!-- HTML -->
<div class="tabs">
  <ul class="tab-nav">
    <li><a href="#tab1">Tab 1</a></li>
    <li><a href="#tab2">Tab 2</a></li>
  </ul>
  <div id="tab1" class="tab-content">Content 1</div>
  <div id="tab2" class="tab-content">Content 2</div>
</div>

<!-- jQuery -->
<script>
$(function() {
  $('.tab-content').hide().first().show();
  
  $('.tab-nav a').click(function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $($(this).attr('href')).show();
    $('.tab-nav li').removeClass('active');
    $(this).parent().addClass('active');
  });
});
</script>
`}
                  </code>
                </pre>
              </div>
              {/* Form Validation */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Form Validation
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<!-- HTML -->
<div id="signup-form">
  <input type="text" name="username" placeholder="Username" required>
  <input type="email" name="email" placeholder="Email" required>
  <button type="submit">Sign Up</button>
</div>

<!-- jQuery -->
<script>
$(function() {
  $('#signup-form button').click(function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Validate each field
    $('#signup-form input[required]').each(function() {
      if (!$(this).val()) {
        $(this).css('border-color', 'red');
        isValid = false;
      } else {
        $(this).css('border-color', '');
      }
    });
    
    // Email validation
    const email = $('input[name="email"]').val();
    if (email && !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      $('input[name="email"]').css('border-color', 'red');
      isValid = false;
    }
    
    if (isValid) {
      // Form is valid, submit via AJAX
      $.post('signup.php', $('#signup-form').find('input').serialize(), function(response) {
        alert('Signup successful!');
      });
    }
  });
});
</script>
`}
                  </code>
                </pre>
              </div>
              {/* Image Slider */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Image Slider
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<!-- HTML -->
<div class="slider">
  <div class="slides">
    <img src="image1.jpg" alt="Image 1">
    <img src="image2.jpg" alt="Image 2">
    <img src="image3.jpg" alt="Image 3">
  </div>
  <button class="prev">Previous</button>
  <button class="next">Next</button>
</div>

<!-- CSS -->
<style>
.slides img { display: none; width: 100%; }
.slides img:first-child { display: block; }
</style>

<!-- jQuery -->
<script>
$(function() {
  const $slides = $('.slides img');
  let current = 0;
  
  $('.next').click(function() {
    $slides.eq(current).fadeOut();
    current = (current + 1) % $slides.length;
    $slides.eq(current).fadeIn();
  });
  
  $('.prev').click(function() {
    $slides.eq(current).fadeOut();
    current = (current - 1 + $slides.length) % $slides.length;
    $slides.eq(current).fadeIn();
  });
});
</script>
`}
                  </code>
                </pre>
              </div>
              {/* Dynamic Content */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Dynamic Content Loading
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`<!-- HTML -->
<div id="comments">
  <h3>Comments</h3>
  <div id="comments-list"></div>
  <button id="load-comments">Load Comments</button>
</div>

<!-- jQuery -->
<script>
$(function() {
  $('#load-comments').click(function() {
    $.getJSON('comments.json', function(data) {
      let html = '';
      $.each(data, function(key, comment) {
        html += \`
          <div class="comment">
            <h4>\${comment.name}</h4>
            <p>\${comment.text}</p>
          </div>
        \`;
      });
      $('#comments-list').html(html);
      $(this).hide();
    });
  });
});
</script>
`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "plugins" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-purple-400">
              Popular jQuery Plugins
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* jQuery UI */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  jQuery UI
                </h3>
                <p className="mb-4 text-gray-300">
                  Official user interface library providing interactions,
                  widgets, effects, and themes.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Widgets: Accordion, Datepicker, Dialog, Slider, Tabs</li>
                  <li>
                    Interactions: Draggable, Droppable, Resizable, Selectable,
                    Sortable
                  </li>
                  <li>Effects: Color animations, Class transitions, Easing</li>
                  <li>Themes: ThemeRoller for custom styling</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://jqueryui.com/"
                    className="text-purple-400 hover:underline"
                  >
                    jqueryui.com
                  </a>
                </div>
              </div>
              {/* DataTables */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  DataTables
                </h3>
                <p className="mb-4 text-gray-300">
                  Advanced interactive tables with sorting, filtering,
                  pagination, and more.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Server-side processing for large datasets</li>
                  <li>AJAX data loading</li>
                  <li>Extensive API for customization</li>
                  <li>Responsive design options</li>
                  <li>Export options (Excel, PDF, CSV)</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://datatables.net/"
                    className="text-purple-400 hover:underline"
                  >
                    datatables.net
                  </a>
                </div>
              </div>
              {/* Slick Carousel */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Slick Carousel
                </h3>
                <p className="mb-4 text-gray-300">
                  Fully responsive carousel with dozens of configuration
                  options.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Responsive with breakpoints</li>
                  <li>Multiple slides at once</li>
                  <li>Lazy loading</li>
                  <li>Autoplay with pause on hover</li>
                  <li>Touch/swipe support</li>
                </ul>
                <div className="mt-4">
                  <a
                    href="https://kenwheeler.github.io/slick/"
                    className="text-purple-400 hover:underline"
                  >
                    kenwheeler.github.io/slick
                  </a>
                </div>
              </div>
              {/* Other Plugins */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  Other Popular Plugins
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Magnific Popup:</strong> Responsive lightbox/dialog
                  </li>
                  <li>
                    <strong>Validate:</strong> Form validation plugin
                  </li>
                  <li>
                    <strong>FullCalendar:</strong> Full-sized calendar with
                    events
                  </li>
                  <li>
                    <strong>Isotope:</strong> Filterable and sortable layouts
                  </li>
                  <li>
                    <strong>Select2:</strong> Enhanced select boxes
                  </li>
                  <li>
                    <strong>Toastr:</strong> Simple notifications
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
            Stay Updated with jQuery
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on jQuery,
            plugins, and best practices.
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
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JQuery;
