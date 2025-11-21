import React from 'react';
import { CodeBlock } from './UI';

export const SQLiTutorial = () => (
  <div className="space-y-3">
    <p>
      <strong>SQL Injection (SQLi)</strong> occurs when untrusted user input is sent directly to a database query.
    </p>
    <p>The vulnerable backend code looks like this:</p>
    <CodeBlock code={`$sql = "SELECT * FROM users WHERE username = '$user' AND password = '$pass'";`} />
    
    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
      <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase">Method 1: Tautology (The Logic Hack)</h4>
      <p className="text-sm mb-2">
        If you enter <code>' OR '1'='1</code>, the query creates a condition that is ALWAYS true.
      </p>
      <CodeBlock code={`SELECT * FROM users WHERE username = '' OR '1'='1' ...`} />
    </div>

    <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
      <h4 className="text-purple-400 font-bold mb-2 text-sm uppercase">Method 2: Comment Bypass</h4>
      <p className="text-sm mb-2">
        You can use SQL comment characters (<code>--</code> or <code>#</code>) to ignore the password check entirely.
      </p>
      <p className="text-sm mb-1">Try entering this in the username field:</p>
      <CodeBlock code={`admin' --`} />
      <p className="text-xs text-slate-400 mt-1">
        This tells the database: "Select the user 'admin' and ignore everything after this point."
      </p>
    </div>
  </div>
);

export const XSSTutorial = () => (
  <div className="space-y-3">
    <p>
      <strong>Cross-Site Scripting (XSS)</strong> allows attackers to inject malicious scripts into web pages viewed by other users.
    </p>
    <p>The vulnerable PHP code might look like this:</p>
    <CodeBlock code={`echo "<div>" . $_POST['comment'] . "</div>";`} />
    <p>
      If you submit a comment containing <code>&lt;script&gt;</code> tags, the browser will execute that code.
    </p>
    <p className="text-yellow-400 text-sm">
      Try injecting: <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>
    </p>
  </div>
);

export const IDORTutorial = () => (
  <div className="space-y-3">
    <p>
      <strong>Insecure Direct Object Reference (IDOR)</strong> happens when an application exposes a reference to an internal object (like a file ID or user ID) without access control checks.
    </p>
    <p>Example URL:</p>
    <CodeBlock code={`example.com/download.php?file_id=100`} />
    <p>
      If the server doesn't check if <em>you</em> own file 100, you can simply change the ID to 101, 102, or 1 to access other users' files.
    </p>
  </div>
);