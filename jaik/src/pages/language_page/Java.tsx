"use client";

import { useState } from "react";

const Java: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "basics" | "features" | "examples" | "frameworks"
  >("basics");
  const [email, setEmail] = useState<string>("");

  const handleSubscribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email.trim()) {
      alert(
        `Thank you for subscribing with ${email}! We'll keep you updated on Java.`
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
            Java Programming
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-300">
            Learn about Java, one of the most popular and versatile programming
            languages used for everything from mobile apps to enterprise
            systems.
          </p>
          <button
            onClick={() => {
              const featuresElement = document.getElementById("features");
              if (featuresElement) {
                featuresElement.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
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
              activeTab === "basics"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("basics")}
          >
            Java Basics
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "features"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("features")}
          >
            Features
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "examples"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("examples")}
          >
            Examples
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "frameworks"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab("frameworks")}
          >
            Frameworks
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 max-w-6xl my-12">
        {activeTab === "basics" && (
          <div id="basics">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Java Fundamentals
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What is Java */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  What is Java?
                </h3>
                <p className="mb-4 text-gray-300">
                  Java is a high-level, class-based, object-oriented programming
                  language designed to have as few implementation dependencies
                  as possible.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Write Once, Run Anywhere (WORA) principle</li>
                  <li>Strongly typed language</li>
                  <li>Automatic memory management (garbage collection)</li>
                  <li>Multi-threading support</li>
                  <li>Rich standard library</li>
                </ul>
              </div>
              {/* JVM */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Java Virtual Machine (JVM)
                </h3>
                <p className="mb-4 text-gray-300">
                  The JVM is the engine that runs Java bytecode. Key
                  characteristics:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Provides platform independence</li>
                  <li>Performs just-in-time (JIT) compilation</li>
                  <li>Manages memory through garbage collection</li>
                  <li>Provides security features</li>
                  <li>Optimizes performance through adaptive optimization</li>
                </ul>
                <div className="mt-4 p-3 bg-gray-700 rounded">
                  <p className="text-sm text-gray-300">
                    <strong>How to run:</strong>
                    <br />
                    1. Save as HelloWorld.java
                    <br />
                    2. javac HelloWorld.java
                    <br />
                    3. java HelloWorld
                  </p>
                </div>
              </div>
              {/* Syntax */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Basic Syntax
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`public class HelloWorld {
    public static void main(String[] args) {
        // Print "Hello, World!" to console
        System.out.println("Hello, World!");
        
        // Variables
        int number = 10;
        double decimal = 3.14;
        String text = "Java";
        boolean flag = true;
        
        // Conditional statement
        if (number > 5) {
            System.out.println("Number is greater than 5");
        }
    }
}`}
                  </code>
                </pre>
              </div>
              {/* OOP */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Object-Oriented Programming
                </h3>
                <p className="mb-4 text-gray-300">
                  Java is fundamentally object-oriented. Key OOP concepts:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Classes & Objects:</strong> Blueprints and instances
                  </li>
                  <li>
                    <strong>Inheritance:</strong> extends keyword
                  </li>
                  <li>
                    <strong>Polymorphism:</strong> Method overriding and
                    overloading
                  </li>
                  <li>
                    <strong>Encapsulation:</strong> private fields with public
                    getters/setters
                  </li>
                  <li>
                    <strong>Abstraction:</strong> Abstract classes and
                    interfaces
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "features" && (
          <div id="features">
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Java Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Java 8 Features */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Java 8 Features
                </h3>
                <ul className="list-disc pl-5 space-y-3 text-gray-300">
                  <li>
                    <strong>Lambda Expressions:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs">
                      <code className="text-green-400">
                        (parameters) -&gt; expression
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>Stream API:</strong>
                    <pre className="mt-1 bg-gray-900 p-2 rounded text-xs">
                      <code className="text-green-400">
                        list.stream().filter(x -&gt; x &gt;
                        5).collect(Collectors.toList())
                      </code>
                    </pre>
                  </li>
                  <li>
                    <strong>Optional class</strong> for null-safe operations
                  </li>
                  <li>
                    <strong>Default methods</strong> in interfaces
                  </li>
                  <li>
                    <strong>New Date/Time API</strong> (java.time package)
                  </li>
                </ul>
              </div>
              {/* Java 11 Features */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Java 11 Features (LTS)
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Local-Variable Syntax for Lambda Parameters (var)</li>
                  <li>New String methods (isBlank, lines, strip, etc.)</li>
                  <li>HTTP Client (java.net.http)</li>
                  <li>
                    Launch Single-File Source-Code Programs (java
                    MyProgram.java)
                  </li>
                  <li>Epsilon: A No-Op Garbage Collector</li>
                  <li>Nest-Based Access Control</li>
                </ul>
              </div>
              {/* Java 17 Features */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Java 17 Features (LTS)
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Sealed Classes (restrict inheritance)</li>
                  <li>Pattern Matching for switch (preview)</li>
                  <li>Text Blocks (multiline strings)</li>
                  <li>Records (immutable data classes)</li>
                  <li>Strong encapsulation of JDK internals</li>
                  <li>New macOS rendering pipeline</li>
                </ul>
              </div>
              {/* Performance */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Performance Features
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Just-In-Time (JIT) Compilation:</strong> HotSpot
                    compiler
                  </li>
                  <li>
                    <strong>Garbage Collection:</strong> Multiple GC algorithms
                    (G1, ZGC, Shenandoah)
                  </li>
                  <li>
                    <strong>Value Types (Project Valhalla):</strong> Future
                    feature for better performance
                  </li>
                  <li>
                    <strong>Vector API (Project Panama):</strong> For SIMD
                    operations
                  </li>
                  <li>
                    <strong>Native Image (GraalVM):</strong> Ahead-of-time
                    compilation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "examples" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Java Examples
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Hello World */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Hello World
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`}
                  </code>
                </pre>
              </div>
              {/* OOP Example */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  OOP Example
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`// Animal.java (Superclass)
public class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

// Dog.java (Subclass)
public class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof!");
    }
    
    public void fetch() {
        System.out.println(name + " is fetching!");
    }
}`}
                  </code>
                </pre>
              </div>
              {/* Collections Example */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Collections Example
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`import java.util.*;
import java.util.stream.Collectors;

public class CollectionsExample {
    public static void main(String[] args) {
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        
        Map<Integer, String> students = new HashMap<>();
        students.put(101, "Alice");
        
        List<String> filteredFruits = fruits.stream()
            .filter(f -> f.startsWith("A"))
            .collect(Collectors.toList());
    }
}`}
                  </code>
                </pre>
              </div>
              {/* Multithreading */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Multithreading Example
                </h3>
                <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
                  <code className="text-green-400">
                    {`public class ThreadExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Thread 1: " + i);
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        });
        
        thread1.start();
    }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )}
        {activeTab === "frameworks" && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-blue-400">
              Java Frameworks
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Spring */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Spring Framework
                </h3>
                <p className="mb-4 text-gray-300">
                  Comprehensive programming and configuration model for modern
                  Java-based enterprise applications.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Spring Boot:</strong> Convention over configuration
                  </li>
                  <li>
                    <strong>Spring MVC:</strong> Web application framework
                  </li>
                  <li>
                    <strong>Spring Data:</strong> Data access abstraction
                  </li>
                  <li>
                    <strong>Spring Security:</strong> Authentication and
                    authorization
                  </li>
                </ul>
              </div>
              {/* Hibernate */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Hibernate ORM
                </h3>
                <p className="mb-4 text-gray-300">
                  Object-relational mapping tool that provides a framework for
                  mapping an object-oriented domain model to a relational
                  database.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>JPA (Java Persistence API) implementation</li>
                  <li>Automatic table generation</li>
                  <li>Caching mechanisms</li>
                  <li>HQL (Hibernate Query Language)</li>
                </ul>
              </div>
              {/* Jakarta EE */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Jakarta EE
                </h3>
                <p className="mb-4 text-gray-300">
                  The open source future of cloud native Java, evolved from Java
                  EE.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>CDI (Contexts and Dependency Injection)</li>
                  <li>JAX-RS (RESTful Web Services)</li>
                  <li>JPA (Java Persistence API)</li>
                  <li>EJB (Enterprise JavaBeans)</li>
                </ul>
              </div>
              {/* Other Frameworks */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  Other Popular Frameworks
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>
                    <strong>Micronaut:</strong> Modern, JVM-based framework
                  </li>
                  <li>
                    <strong>Quarkus:</strong> Kubernetes-native Java stack
                  </li>
                  <li>
                    <strong>Vert.x:</strong> Reactive applications on JVM
                  </li>
                  <li>
                    <strong>Play Framework:</strong> High velocity web framework
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
            Stay Updated with Java
          </h2>
          <p className="mb-8 text-gray-300">
            Subscribe to our newsletter to get the latest updates on Java
            features, frameworks, and best practices.
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Java;
