import React, { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import { Button, CodeBlock } from '../components/UI';

interface Props {
  onComplete: () => void;
}

interface FileDoc {
  id: number;
  name: string;
  owner: string;
  content: string;
  isFlag: boolean;
}

export const Level3IDOR: React.FC<Props> = ({ onComplete }) => {
  const [fileId, setFileId] = useState<number>(105); // Start at a user's file
  const [currentFile, setCurrentFile] = useState<FileDoc | null>(null);
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState('http://ogt-secure.com/files?id=105');

  // Database Mock
  const mockDatabase: Record<number, FileDoc> = {
    1: { id: 1, name: 'admin_credentials.txt', owner: 'SYSTEM ADMIN', content: 'FLAG: OGT{IDOR_MASTER_2025}', isFlag: true },
    100: { id: 100, name: 'marketing_plan.pdf', owner: 'Marketing Dept', content: 'Q4 Strategy: Buy more ads.', isFlag: false },
    105: { id: 105, name: 'my_cat_photo.jpg', owner: 'You (Guest)', content: '[Binary Data of a cute cat]', isFlag: false },
    106: { id: 106, name: 'todo_list.txt', owner: 'You (Guest)', content: '1. Hack the planet\n2. Buy milk', isFlag: false },
  };

  useEffect(() => {
    // Sync URL input with state for visual consistency
    setUrlInput(`http://ogt-secure.com/files?id=${fileId}`);
    fetchFile(fileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileId]);

  const fetchFile = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      const file = mockDatabase[id];
      setCurrentFile(file || null);
      setLoading(false);
      
      if (file && file.isFlag) {
        setTimeout(onComplete, 2000);
      }
    }, 600);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const urlObj = new URL(urlInput);
        const idParam = urlObj.searchParams.get('id');
        if (idParam) {
            setFileId(parseInt(idParam, 10));
        }
    } catch (err) {
        // Fallback manual parse if valid URL fails (simplified)
        const match = urlInput.match(/id=(\d+)/);
        if (match && match[1]) {
            setFileId(parseInt(match[1], 10));
        }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full max-w-6xl mx-auto">
      
      {/* Game Area */}
      <div className="flex-1 w-full glass-panel p-0 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Fake Browser Toolbar */}
        <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <form onSubmit={handleUrlSubmit} className="flex-1">
            <div className="bg-slate-800 rounded-md flex items-center px-3 py-1.5 text-sm text-slate-300 border border-slate-700 focus-within:border-blue-500 transition-colors">
              <Icons.Lock className="w-3 h-3 mr-2 text-green-500" />
              <input 
                className="bg-transparent w-full outline-none font-mono"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
          </form>
           <button onClick={() => fetchFile(fileId)} className="text-slate-400 hover:text-white">
              <Icons.Refresh className="w-4 h-4" />
           </button>
        </div>

        {/* Browser Content */}
        <div className="p-8 bg-slate-950/50 min-h-[400px] flex flex-col items-center justify-center">
          {loading ? (
            <div className="animate-pulse flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-slate-500">Fetching document...</p>
            </div>
          ) : currentFile ? (
            <div className={`max-w-md w-full p-6 rounded-xl border ${currentFile.isFlag ? 'bg-green-900/20 border-green-500/50' : 'bg-slate-800 border-slate-700'}`}>
               <div className="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
                  <div className={`p-3 rounded-lg ${currentFile.isFlag ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                    <Icons.BookOpen className={`w-8 h-8 ${currentFile.isFlag ? 'text-green-400' : 'text-blue-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{currentFile.name}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Owner: {currentFile.owner}</p>
                  </div>
               </div>
               
               <div className="bg-black/30 p-4 rounded font-mono text-sm text-slate-300 min-h-[100px]">
                 {currentFile.content}
               </div>

               {currentFile.isFlag && (
                 <div className="mt-4 p-2 bg-green-500 text-black font-bold text-center rounded animate-pulse">
                    Flag Found! System Compromised.
                 </div>
               )}
            </div>
          ) : (
            <div className="text-center text-slate-500">
               <Icons.FileWarning className="w-12 h-12 mx-auto mb-3 opacity-50" />
               <h3 className="text-lg font-semibold">403 Forbidden / 404 Not Found</h3>
               <p>You do not have permission to access this resource.</p>
            </div>
          )}
        </div>
      </div>

      {/* Visualizer */}
      <div className="w-full lg:w-1/3 space-y-4">
        <div className="glass-panel p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
             <Icons.Unlock className="w-5 h-5" /> Parameter Manipulation
          </h3>
          <p className="text-xs text-slate-400 mb-3">
            The URL parameter <code>id</code> controls which file is fetched.
          </p>
          
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
             <label className="text-xs text-slate-500 block mb-2">Quick Modify ID:</label>
             <div className="flex gap-2">
                <Button variant="outline" onClick={() => setFileId(prev => Math.max(1, prev - 1))} className="py-1 px-3 text-sm">-</Button>
                <div className="flex-1 bg-black border border-slate-600 rounded flex items-center justify-center text-green-400 font-mono">
                    {fileId}
                </div>
                <Button variant="outline" onClick={() => setFileId(prev => prev + 1)} className="py-1 px-3 text-sm">+</Button>
             </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-200">
            <strong>Hint:</strong> System administrators usually have the lowest ID numbers (like 0 or 1).
          </div>
        </div>
      </div>

    </div>
  );
};