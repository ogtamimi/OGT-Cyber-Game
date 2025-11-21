import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { Button, CodeBlock } from '../components/UI';

interface Props {
  onComplete: () => void;
}

export const Level2XSS: React.FC<Props> = ({ onComplete }) => {
  const [comment, setComment] = useState('');
  const [posts, setPosts] = useState<string[]>(['Welcome to my guestbook!', 'Great site, thanks for sharing.']);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setPosts([comment, ...posts]);
    
    // Vulnerability Check: Does it contain <script>alert
    // We are stripping spaces to make detection lenient for the game
    const normalized = comment.replace(/\s/g, '').toLowerCase();
    
    // Supports:
    // <script>alert(1)</script>
    // <script>alert("1")</script>
    // <script>alert('1')</script>
    if (normalized.includes('<script>alert(1)</script>') || 
        normalized.includes('<script>alert("1")</script>') || 
        normalized.includes("<script>alert('1')</script>")) {
      // Delay slightly to simulate browser execution
      setTimeout(() => {
        setShowAlert(true);
      }, 500);
    }
    
    setComment('');
  };

  const handleAlertConfirm = () => {
    setShowAlert(false);
    onComplete();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl mx-auto">
      
      {/* Game Area */}
      <div className="flex-1 w-full glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Icons.Code className="text-purple-400" /> Public Guestbook
          </h2>
          <p className="text-slate-400 text-sm">Leave a comment for the admin.</p>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="mb-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write something nice..."
            className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none min-h-[80px]"
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" variant="secondary" className="py-2 px-4 text-sm">Post Comment</Button>
          </div>
        </form>

        {/* Feed */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {posts.map((post, idx) => (
            <div key={idx} className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                <span className="text-sm font-bold text-slate-300">Anonymous User</span>
              </div>
              {/* 
                  In a real XSS vulnerability, this would be dangerouslySetInnerHTML.
                  For the game, we visually render it as text unless it's the payload, 
                  but we simulate the execution logic in handleSubmit.
               */}
              <div className="text-slate-200 font-mono text-sm break-all">
                {post}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visualizer */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
            <Icons.FileWarning className="w-5 h-5" /> Vulnerable Code
          </h3>
          <p className="text-xs text-slate-400 mb-3">The developer forgot to sanitize inputs:</p>
          
          <CodeBlock language="php" code={`<?php
// No sanitization!
$comment = $_POST['comment'];
echo "<div>" . $comment . "</div>";
?>`} />
          
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded text-xs text-yellow-200">
            <strong>Objective:</strong> Make the browser execute JavaScript. Try to pop an <code>alert(1)</code> box.
          </div>
        </div>
      </div>

      {/* Simulated Browser Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-32 bg-black/60 backdrop-blur-sm transition-opacity">
            <div className="bg-white text-slate-800 rounded-xl shadow-2xl w-96 overflow-hidden border border-slate-200 transform transition-all scale-100">
                {/* Header */}
                <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600/20"></div>
                    </div>
                    <span className="text-xs font-bold text-slate-600">OGT Says</span>
                    <div className="w-8"></div>
                </div>

                {/* Body */}
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="text-4xl font-mono font-bold text-slate-800 mb-2">1</div>
                    <p className="text-sm text-slate-500 font-medium">XSS Payload Executed</p>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
                    <button 
                        onClick={handleAlertConfirm}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};