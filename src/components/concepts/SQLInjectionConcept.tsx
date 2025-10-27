import { useState } from 'react';
import { Database, Code, Shield, BookOpen, AlertTriangle, Terminal, Lock, Unlock, ArrowLeft, Target } from 'lucide-react';

const tabs = [
  { id: 'theory', name: 'Theory', icon: BookOpen },
  { id: 'lab', name: 'Lab', icon: Terminal },
  { id: 'tools', name: 'Tools', icon: Shield },
  { id: 'references', name: 'References', icon: Database }
];

interface SQLInjectionConceptProps {
  onBack?: () => void;
  onStartChallenge?: () => void;
}

export const SQLInjectionConcept = ({ onBack, onStartChallenge }: SQLInjectionConceptProps = {}) => {
  const [activeTab, setActiveTab] = useState('theory');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2 border border-slate-300 dark:border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        )}

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
              <Database className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold">SQL Injection</h1>
              <p className="text-emerald-600 dark:text-emerald-400 mt-2">Master one of the most dangerous web vulnerabilities</p>
            </div>
            {onStartChallenge && (
              <button
                onClick={onStartChallenge}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <Target className="w-5 h-5" />
                Take Challenge
              </button>
            )}
          </div>

          <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
            <nav className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-t-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-b-2 border-emerald-600 dark:border-emerald-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="space-y-6">
            {activeTab === 'theory' && <TheoryTab />}
            {activeTab === 'lab' && <LabTab />}
            {activeTab === 'tools' && <ToolsTab />}
            {activeTab === 'references' && <ReferencesTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

const TheoryTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        What is SQL Injection?
      </h2>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 space-y-4 border border-slate-200 dark:border-slate-700">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          SQL Injection (SQLi) is a code injection technique that exploits vulnerabilities in an application's
          database layer. Attackers insert malicious SQL statements into entry fields, allowing them to bypass
          authentication, extract sensitive data, modify or delete database records, and in some cases, execute
          administrative operations on the database.
        </p>
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
          <p className="text-sm font-semibold mb-2 text-slate-900 dark:text-white">OWASP Top 10 Classification</p>
          <p className="text-slate-700 dark:text-slate-300">
            SQL Injection consistently ranks in the OWASP Top 10 Web Application Security Risks. As of 2021,
            it falls under A03:2021 - Injection, representing one of the most critical security vulnerabilities
            affecting web applications worldwide.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Types of SQL Injection Attacks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-600 dark:text-purple-600 dark:text-purple-400" />
            Classic SQL Injection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
            The most straightforward form where attackers directly manipulate SQL queries through input fields.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
            <code className="text-green-600 dark:text-green-600 dark:text-green-400">
              ' OR '1'='1' --
            </code>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            This payload bypasses authentication by making the WHERE clause always true.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-600 dark:text-blue-400" />
            UNION-Based SQL Injection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
            Leverages the UNION SQL operator to combine results from multiple SELECT statements.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
            <code className="text-green-600 dark:text-green-600 dark:text-green-400">
              ' UNION SELECT username, password FROM users --
            </code>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Allows extraction of data from other database tables.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-orange-200 dark:border-orange-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-orange-600 dark:text-orange-600 dark:text-orange-400" />
            Boolean-Based Blind SQL Injection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
            Used when the application doesn't display database errors but changes behavior based on true/false queries.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
            <code className="text-green-600 dark:text-green-600 dark:text-green-400">
              ' AND 1=1 -- (true condition)<br />
              ' AND 1=2 -- (false condition)
            </code>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            Attackers infer database structure by observing application responses.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-yellow-200 dark:border-yellow-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            Time-Based Blind SQL Injection
          </h3>
          <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
            Forces the database to wait for a specified time before responding, indicating successful injection.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 font-mono text-sm border border-slate-200 dark:border-slate-700">
            <code className="text-green-600 dark:text-green-600 dark:text-green-400">
              ' OR SLEEP(5) --
            </code>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            If the response is delayed by 5 seconds, the injection was successful.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
        Real-World Breach: Capital One (2019)
      </h2>
      <div className="bg-red-500/20 border-l-4 border-red-500 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <Unlock className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">100+ Million Records Exposed</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              In July 2019, Capital One announced a massive data breach affecting over 100 million customers
              in the United States and 6 million in Canada. The attacker exploited a SQL injection vulnerability
              in a web application firewall, gaining unauthorized access to sensitive customer data including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li>140,000 Social Security numbers</li>
              <li>80,000 bank account numbers</li>
              <li>Credit card application data spanning 2005-2019</li>
              <li>Personal information including names, addresses, credit scores, and income</li>
            </ul>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mt-4 border border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Attack Vector:</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                The attacker used a Server-Side Request Forgery (SSRF) vulnerability combined with SQL injection
                to access AWS S3 buckets containing customer data. The breach cost Capital One approximately
                $190 million in settlements and demonstrated the critical importance of input validation and
                secure database access controls.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Attack Methodology</h2>
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <ol className="space-y-4">
          {[
            {
              step: 1,
              title: 'Identify Input Vectors',
              description: 'Locate user input fields that interact with the database (login forms, search boxes, URL parameters).'
            },
            {
              step: 2,
              title: 'Test for Vulnerability',
              description: 'Insert special characters like single quotes (\'), double quotes ("), or SQL keywords to trigger errors.'
            },
            {
              step: 3,
              title: 'Determine Database Type',
              description: 'Use database-specific functions and error messages to identify the DBMS (MySQL, PostgreSQL, MSSQL, Oracle).'
            },
            {
              step: 4,
              title: 'Enumerate Database Structure',
              description: 'Extract table names, column names, and database schema using UNION queries or information_schema tables.'
            },
            {
              step: 5,
              title: 'Extract Data',
              description: 'Retrieve sensitive information from identified tables using SELECT statements.'
            },
            {
              step: 6,
              title: 'Maintain Access/Escalate',
              description: 'Create backdoors, elevate privileges, or modify data for persistent access (advanced attacks).'
            }
          ].map((item) => (
            <li key={item.step} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1 text-slate-900 dark:text-white">{item.title}</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </div>
);

const LabTab = () => (
  <div className="space-y-8">
    <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
      <p className="text-sm font-semibold flex items-center gap-2 text-slate-900 dark:text-white">
        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        ETHICAL USE ONLY: These examples are for educational purposes. Only test on systems you own or have explicit permission to test.
      </p>
    </div>

    <section>
      <h2 className="text-2xl font-bold mb-4">Vulnerable Code Examples</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" />
            Vulnerable PHP Login (INSECURE)
          </h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
            <pre className="text-slate-800 dark:text-slate-300">
<code>{`<?php
// VULNERABLE CODE - DO NOT USE IN PRODUCTION
$username = $_POST['username'];
$password = $_POST['password'];

// Direct string concatenation - VULNERABLE TO SQL INJECTION
$query = "SELECT * FROM users WHERE username = '$username'
          AND password = '$password'";

$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo "Login successful!";
    // Authentication bypassed with: ' OR '1'='1' --
} else {
    echo "Login failed!";
}
?>`}</code>
            </pre>
          </div>
          <div className="mt-3 bg-red-500/20 rounded-lg p-3">
            <p className="text-sm font-semibold mb-1">Why it's vulnerable:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              User input is directly concatenated into the SQL query without sanitization.
              An attacker can input <code className="bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">' OR '1'='1' --</code>
              as the username to bypass authentication.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" />
            Vulnerable Python Flask (INSECURE)
          </h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
            <pre className="text-slate-800 dark:text-slate-300">
<code>{`import sqlite3
from flask import Flask, request

app = Flask(__name__)

@app.route('/search')
def search():
    # VULNERABLE CODE - DO NOT USE IN PRODUCTION
    search_term = request.args.get('q')

    # String formatting - VULNERABLE TO SQL INJECTION
    query = f"SELECT * FROM products WHERE name LIKE '%{search_term}%'"

    conn = sqlite3.connect('store.db')
    cursor = conn.cursor()
    cursor.execute(query)  # DANGEROUS!
    results = cursor.fetchall()

    return str(results)

# Attack: /search?q=%' UNION SELECT username,password FROM users --`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-red-400" />
            Vulnerable Node.js (INSECURE)
          </h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
            <pre className="text-slate-800 dark:text-slate-300">
<code>{`const mysql = require('mysql');
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
    // VULNERABLE CODE - DO NOT USE IN PRODUCTION
    const userId = req.params.id;

    // Template literal concatenation - VULNERABLE
    const query = \`SELECT * FROM users WHERE id = \${userId}\`;

    connection.query(query, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

// Attack: /user/1 OR 1=1`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Authentication Bypass Demonstration</h2>
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3">Classic Bypass: <code className="text-emerald-600 dark:text-emerald-400">' OR '1'='1' --</code></h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Original SQL Query:</p>
            <div className="bg-black/50 rounded p-3 font-mono text-sm">
              <code className="text-slate-600 dark:text-slate-400">
                SELECT * FROM users WHERE username = '<span className="text-yellow-400">[INPUT]</span>' AND password = '<span className="text-yellow-400">[INPUT]</span>'
              </code>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">After Injection (username field):</p>
            <div className="bg-black/50 rounded p-3 font-mono text-sm">
              <code className="text-slate-600 dark:text-slate-400">
                SELECT * FROM users WHERE username = '<span className="text-red-400">' OR '1'='1' --</span>' AND password = ''
              </code>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">What happens:</p>
            <div className="bg-blue-50 dark:bg-blue-500/20 rounded p-3">
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li>The single quote closes the username string</li>
                <li><code className="bg-slate-100 dark:bg-slate-900 px-1">OR '1'='1'</code> makes the condition always TRUE</li>
                <li><code className="bg-slate-100 dark:bg-slate-900 px-1">--</code> comments out the rest of the query (including password check)</li>
                <li>The query returns all users, granting access to the first account (often admin)</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">UNION-Based Data Extraction</h2>
      <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-6 space-y-4">
        <p className="text-slate-700 dark:text-slate-300">
          UNION attacks combine results from multiple SELECT statements to extract data from other tables.
        </p>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold mb-2">Step 1: Determine number of columns</p>
            <div className="bg-black/50 rounded p-3 font-mono text-sm">
              <code className="text-green-600 dark:text-green-400">' ORDER BY 1 --</code><br />
              <code className="text-green-600 dark:text-green-400">' ORDER BY 2 --</code><br />
              <code className="text-gray-500">// Continue until error occurs</code>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Step 2: Find injectable column</p>
            <div className="bg-black/50 rounded p-3 font-mono text-sm">
              <code className="text-green-600 dark:text-green-400">' UNION SELECT NULL, NULL, NULL --</code><br />
              <code className="text-green-600 dark:text-green-400">' UNION SELECT 'test', NULL, NULL --</code>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Step 3: Extract database information</p>
            <div className="bg-black/50 rounded p-3 font-mono text-sm">
              <code className="text-green-600 dark:text-green-400">' UNION SELECT table_name, NULL, NULL FROM information_schema.tables --</code><br />
              <code className="text-green-600 dark:text-green-400">' UNION SELECT username, password, NULL FROM users --</code>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
        Secure Code Examples
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            Secure PHP with Prepared Statements
          </h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
            <pre className="text-slate-800 dark:text-slate-300">
<code>{`<?php
// SECURE CODE - USES PREPARED STATEMENTS
$username = $_POST['username'];
$password = $_POST['password'];

// Prepared statement with placeholders
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");

// Bind parameters - treats input as DATA, not CODE
$stmt->bind_param("ss", $username, $password);

// Execute query
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "Login successful!";
} else {
    echo "Login failed!";
}

$stmt->close();
?>`}</code>
            </pre>
          </div>
          <div className="mt-3 bg-green-500/20 rounded-lg p-3">
            <p className="text-sm font-semibold mb-1">Why it's secure:</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Prepared statements separate SQL code from data. The database treats user input
              as literal values, not executable SQL commands.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            Secure Python with Parameterized Queries
          </h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
            <pre className="text-slate-800 dark:text-slate-300">
<code>{`import sqlite3
from flask import Flask, request

app = Flask(__name__)

@app.route('/search')
def search():
    # SECURE CODE - USES PARAMETERIZED QUERIES
    search_term = request.args.get('q')

    conn = sqlite3.connect('store.db')
    cursor = conn.cursor()

    # Use ? placeholder and pass parameters as tuple
    query = "SELECT * FROM products WHERE name LIKE ?"
    cursor.execute(query, (f'%{search_term}%',))

    results = cursor.fetchall()
    conn.close()

    return str(results)`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
            Secure Node.js with Parameterized Queries
          </h3>
          <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-200 dark:border-slate-700">
            <pre className="text-slate-800 dark:text-slate-300">
<code>{`const mysql = require('mysql');
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
    // SECURE CODE - USES PARAMETERIZED QUERIES
    const userId = req.params.id;

    // Use ? placeholder for parameter
    const query = 'SELECT * FROM users WHERE id = ?';

    // Pass parameters as array - prevents injection
    connection.query(query, [userId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Database error' });
            return;
        }
        res.json(results);
    });
});`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="bg-cyan-500/20 border border-cyan-500/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          Practice Laboratory
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Ready to practice SQL injection techniques in a safe environment?
        </p>
        <a
          href="/notebooks/12-sql-injection.ipynb"
          className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-semibold transition-all"
        >
          Open Interactive Jupyter Notebook
        </a>
      </div>
    </section>
  </div>
);

const ToolsTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4">Attack Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800/50 border border-red-200 dark:border-red-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Terminal className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">sqlmap</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Automated SQL injection and database takeover tool. Detects and exploits SQLi vulnerabilities
                with support for all major database systems.
              </p>
              <div className="bg-black/50 rounded p-3 font-mono text-sm mb-3">
                <code className="text-green-600 dark:text-green-400">
                  sqlmap -u "http://target.com/page?id=1" --dbs
                </code>
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Key Features:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Automatic SQLi detection and exploitation</li>
                  <li>Database fingerprinting and enumeration</li>
                  <li>Data extraction and file system access</li>
                  <li>Supports GET, POST, cookies, and headers</li>
                  <li>Built-in tamper scripts for WAF bypass</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-purple-600 dark:text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Burp Suite</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Comprehensive web application security testing platform with powerful proxy and injection capabilities.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">SQLi Testing Features:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Intercept and modify HTTP requests</li>
                  <li>Automated scanner for SQLi detection</li>
                  <li>Intruder tool for payload fuzzing</li>
                  <li>Repeater for manual injection testing</li>
                  <li>Collaborator for out-of-band testing</li>
                </ul>
              </div>
              <div className="mt-3 bg-slate-100 dark:bg-slate-900 rounded p-2">
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Professional Edition includes advanced SQLi detection and exploitation features
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Code className="w-8 h-8 text-blue-600 dark:text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">OWASP ZAP</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Free, open-source web application security scanner maintained by OWASP.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">SQLi Capabilities:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>Automated active and passive scanning</li>
                  <li>SQLi vulnerability detection</li>
                  <li>Fuzzing for injection points</li>
                  <li>Ajax spider for modern web apps</li>
                  <li>Scriptable with Python and JavaScript</li>
                </ul>
              </div>
              <div className="mt-3 bg-green-500/20 rounded p-2">
                <p className="text-xs text-green-300 font-semibold">
                  100% Free and Open Source
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-yellow-200 dark:border-yellow-500/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Database className="w-8 h-8 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Havij</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Automated SQL injection tool with graphical user interface for Windows.
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">Features:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                  <li>User-friendly GUI interface</li>
                  <li>Supports MySQL, MSSQL, Oracle, PostgreSQL</li>
                  <li>Admin panel finder</li>
                  <li>MD5 hash cracker</li>
                  <li>Table and column enumeration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
        Defense Tools & Techniques
      </h2>
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-green-600 dark:text-green-600 dark:text-green-400" />
            Parameterized Queries / Prepared Statements
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            The PRIMARY defense against SQL injection. Separates SQL code from data by using placeholders
            for user input.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">PHP PDO</p>
              <div className="bg-black/50 rounded p-2 font-mono text-xs">
                <code className="text-slate-600 dark:text-slate-400">
                  $stmt = $pdo-&gt;prepare("SELECT * FROM users WHERE id = ?");<br />
                  $stmt-&gt;execute([$id]);
                </code>
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Python</p>
              <div className="bg-black/50 rounded p-2 font-mono text-xs">
                <code className="text-slate-600 dark:text-slate-400">
                  cursor.execute("SELECT * FROM users WHERE id = ?", (id,))
                </code>
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-900 rounded p-4">
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Node.js</p>
              <div className="bg-black/50 rounded p-2 font-mono text-xs">
                <code className="text-slate-600 dark:text-slate-400">
                  connection.query("SELECT * FROM users WHERE id = ?", [id])
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Input Validation & Sanitization</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Validate and sanitize all user input before processing. Use whitelisting over blacklisting.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Validation Examples:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>Check data types (integers, emails, URLs)</li>
                <li>Enforce length restrictions</li>
                <li>Use regex patterns for specific formats</li>
                <li>Reject unexpected characters</li>
              </ul>
            </div>
            <div className="bg-black/50 rounded p-3 font-mono text-xs">
              <code className="text-slate-600 dark:text-slate-400">
                // JavaScript example<br />
                const userId = parseInt(req.params.id);<br />
                if (isNaN(userId)) {'{'}<br />
                &nbsp;&nbsp;return res.status(400).json({'{'} error: 'Invalid ID' {'}'});<br />
                {'}'}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Web Application Firewalls (WAF)</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            Deploy WAFs to filter malicious SQL injection patterns before they reach the application.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded p-3">
              <p className="font-semibold mb-1">ModSecurity</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Open-source WAF with OWASP Core Rule Set (CRS)</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded p-3">
              <p className="font-semibold mb-1">Cloudflare WAF</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Cloud-based protection with managed rulesets</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded p-3">
              <p className="font-semibold mb-1">AWS WAF</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">Customizable rules for AWS-hosted applications</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-orange-200 dark:border-orange-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Least Privilege Principle</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-3">
            Database accounts should have minimum necessary permissions. Never use admin credentials for web applications.
          </p>
          <div className="bg-black/50 rounded p-4">
            <p className="text-sm font-semibold mb-2 text-yellow-400">Best Practices:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Create separate DB users for different application components</li>
              <li>Grant only required permissions (SELECT, INSERT, UPDATE)</li>
              <li>Deny DROP, ALTER, and administrative commands</li>
              <li>Use read-only accounts where modification isn't needed</li>
              <li>Implement database connection pooling with limited privileges</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800/50 border border-emerald-200 dark:border-emerald-500/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Additional Security Measures</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Detection & Monitoring:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>Monitor database logs for unusual queries</li>
                <li>Implement intrusion detection systems (IDS)</li>
                <li>Set up alerts for SQL errors and anomalies</li>
                <li>Regular security audits and penetration testing</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Error Handling:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
                <li>Never display detailed database errors to users</li>
                <li>Use generic error messages in production</li>
                <li>Log detailed errors server-side only</li>
                <li>Implement custom error pages</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const ReferencesTab = () => (
  <div className="space-y-8">
    <section>
      <h2 className="text-2xl font-bold mb-4">Official Documentation & Guidelines</h2>
      <div className="space-y-4">
        <a
          href="https://owasp.org/www-community/attacks/SQL_Injection"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-slate-800/50 border border-blue-200 dark:border-blue-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-slate-900 dark:text-white">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-600 dark:text-blue-400" />
            OWASP SQL Injection Guide
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Comprehensive guide from the Open Web Application Security Project covering attack vectors,
            prevention techniques, and testing methodologies.
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">https://owasp.org/www-community/attacks/SQL_Injection</p>
        </a>

        <a
          href="https://cwe.mitre.org/data/definitions/89.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-slate-800/50 border border-purple-200 dark:border-purple-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600 dark:text-purple-600 dark:text-purple-400" />
            CWE-89: SQL Injection
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Common Weakness Enumeration entry for SQL Injection with detailed technical description,
            consequences, and mitigation strategies.
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400">https://cwe.mitre.org/data/definitions/89.html</p>
        </a>

        <a
          href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-slate-800/50 border border-green-200 dark:border-green-500/50 rounded-lg p-5 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all"
        >
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600 dark:text-green-600 dark:text-green-400" />
            OWASP SQL Injection Prevention Cheat Sheet
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Quick reference guide for developers on preventing SQL injection across different programming languages and frameworks.
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">https://cheatsheetseries.owasp.org/...</p>
        </a>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Real-World Breach Analysis</h2>
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Capital One Data Breach (2019)
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            Analysis of the Capital One breach that exposed over 100 million customer records through
            SQL injection and SSRF vulnerabilities.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 rounded p-4 mb-3">
            <p className="text-xs font-semibold mb-2 text-emerald-600 dark:text-emerald-400">Key Takeaways:</p>
            <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>Vulnerability in web application firewall configuration</li>
              <li>Combined SQL injection with SSRF to access AWS metadata</li>
              <li>Compromised IAM credentials with excessive permissions</li>
              <li>Cost: $190 million in settlements and fines</li>
              <li>Attacker prosecuted and sentenced to prison</li>
            </ul>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-500/30 rounded text-xs">100M+ Records</span>
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">$190M Settlement</span>
            <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">2019</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2">Sony Pictures Hack (2011)</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            SQL injection attack on Sony Pictures that compromised personal information of over 1 million users.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">1M+ Accounts</span>
            <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">2011</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-2">Heartland Payment Systems (2008)</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
            SQL injection led to one of the largest payment card breaches, compromising 130 million credit cards.
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-yellow-500/30 rounded text-xs">130M Cards</span>
            <span className="px-3 py-1 bg-orange-500/30 rounded text-xs">2008</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Academic Papers & Research</h2>
      <div className="space-y-3">
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="font-semibold mb-1">SQL Injection Attacks and Defense Mechanisms</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">W. Halfond, J. Viegas, A. Orso (2006)</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Comprehensive taxonomy of SQL injection attacks and analysis of existing defense techniques.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="font-semibold mb-1">AMNESIA: Analysis and Monitoring for NEutralizing SQL-Injection Attacks</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">W. Halfond, A. Orso (2005)</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Runtime protection tool that uses static analysis and runtime monitoring to prevent SQLi attacks.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="font-semibold mb-1">Preventing SQL Injection Attacks in Stored Procedures</p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-2">K. Kemalis, T. Tzouramanis (2008)</p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Research on protecting stored procedures from SQL injection vulnerabilities.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Practice Platforms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">DVWA (Damn Vulnerable Web App)</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            PHP/MySQL web application designed to practice common web vulnerabilities including SQL injection.
          </p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400">Open Source • Practice Environment</span>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">SQLi Labs</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            75+ SQL injection challenges covering various attack vectors and difficulty levels.
          </p>
          <span className="text-xs text-purple-600 dark:text-purple-400">Educational • Progressive Difficulty</span>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">PortSwigger Web Security Academy</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Free online training with interactive SQL injection labs and real-world scenarios.
          </p>
          <span className="text-xs text-green-600 dark:text-green-400">Free • Interactive Labs</span>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg p-5">
          <h3 className="text-lg font-semibold mb-2">HackTheBox</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Online platform with vulnerable machines that often include SQL injection challenges.
          </p>
          <span className="text-xs text-orange-600 dark:text-orange-400">CTF Style • Real-World Scenarios</span>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-4">Tools & Resources</h2>
      <div className="space-y-3">
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">sqlmap Official Documentation</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">Complete guide to automated SQL injection exploitation</p>
            </div>
            <a
              href="https://sqlmap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded text-sm transition-all"
            >
              Visit
            </a>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">PayloadsAllTheThings - SQL Injection</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">Comprehensive collection of SQL injection payloads and techniques</p>
            </div>
            <a
              href="https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded text-sm transition-all"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">OWASP Testing Guide - SQL Injection</p>
              <p className="text-sm text-slate-500 dark:text-slate-500">Methodology for testing applications for SQL injection vulnerabilities</p>
            </div>
            <a
              href="https://owasp.org/www-project-web-security-testing-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-100 dark:bg-emerald-500/20 hover:bg-emerald-200 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 rounded text-sm transition-all"
            >
              Visit
            </a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          Legal and Ethical Disclaimer
        </h3>
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p>
            The information and tools provided in this module are for educational purposes only.
            SQL injection is a criminal offense in most jurisdictions when performed without authorization.
          </p>
          <div className="bg-red-500/20 rounded p-3">
            <p className="font-semibold mb-2 text-red-300">Always Remember:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Only test systems you own or have explicit written permission to test</li>
              <li>Unauthorized access to computer systems is illegal (CFAA, Computer Misuse Act, etc.)</li>
              <li>Ethical hackers must operate within legal boundaries and professional codes of conduct</li>
              <li>Bug bounty programs provide legal avenues for security research</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Violations can result in criminal prosecution, imprisonment, and significant fines.
            Always obtain proper authorization before conducting security testing.
          </p>
        </div>
      </div>
    </section>
  </div>
);
