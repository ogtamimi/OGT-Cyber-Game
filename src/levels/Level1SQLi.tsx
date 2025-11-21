import React, { useState } from 'react';
import { Icons } from '../components/Icons';
import { Button, CodeBlock } from '../components/UI';

interface Props {
  onComplete: () => void;
}

export const Level1SQLi: React.FC<Props> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success' | null, msg: string }>({ type: null, msg: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulated Vulnerable PHP Logic
    // $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    
    // Improved regex to catch more variations of the tautology
    // Matches: ' OR '1'='1, ' OR 1=1, ' OR '1' = '1', ' OR "1"="1"
    // Also allows spaces around OR and =
    const tautologyRegex = /'(\s*)OR(\s*)(['"]?)1\3(\s*)=(\s*)(['"]?)1\6/i;

    // Check for Comment Bypass (e.g., admin' -- or admin' #)
    const commentRegex = /'.*(--|#)/;
    
    // Check if either field contains the injection
    const isInjection = (text: string) => tautologyRegex.test(text) || commentRegex.test(text);

    if (isInjection(username) || isInjection(password)) {
      setFeedback({ type: 'success', msg: 'Access Granted! Welcome, Administrator.' });
      setTimeout(onComplete, 1500);
    } else if (username === 'admin' && password === 'password123') {
      setFeedback({ type: 'success', msg: 'Login Successful (Standard Flow - No Flag)' });
      // This is just a normal login, doesn't solve the "Hack"
    } else {
      setFeedback({ type: 'error', msg: 'Invalid Credentials' });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl mx-auto">
      
      {/* Game Area */}
      <div className="flex-1 w-full glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        
        <div className="mb-8 flex items-center gap-3">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <Icons.Lock className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Secure Bank Login</h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access the vault.</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <div className="relative">
              <Icons.Terminal className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Icons.Lock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Login</Button>

          {feedback.msg && (
            <div className={`p-3 rounded-lg text-sm text-center font-semibold ${feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {feedback.msg}
            </div>
          )}
        </form>
      </div>

      {/* Visualizer */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
            <Icons.Database className="w-5 h-5" /> Backend Query Simulator
          </h3>
          <p className="text-xs text-slate-400 mb-3">This is how the server interprets your input:</p>
          
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm leading-relaxed break-words">
            <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> users 
            <br/>
            <span className="text-purple-400">WHERE</span> username = '<span className="text-yellow-400">{username}</span>' 
            <br/>
            <span className="text-purple-400">AND</span> password = '<span className="text-yellow-400">{password}</span>'
          </div>
          
          <div className="mt-4 text-xs text-slate-500">
            <p className="flex items-center gap-2">
              <Icons.AlertTriangle className="w-4 h-4 text-yellow-600" />
              Try to close the quote (') and make the statement true.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};