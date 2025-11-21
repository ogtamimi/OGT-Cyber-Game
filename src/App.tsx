import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './components/Icons';
import { GameView, GameState, LEVELS } from './types';
import { Button, Modal } from './components/UI';
import { Level1SQLi } from './levels/Level1SQLi';
import { Level2XSS } from './levels/Level2XSS';
import { Level3IDOR } from './levels/Level3IDOR';
import { SQLiTutorial, XSSTutorial, IDORTutorial } from './components/TutorialContent';
import { Confetti } from './components/Confetti';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentView: GameView.INTRO,
    completedLevels: []
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Current Level Configuration
  const currentLevelConfig = LEVELS.find(l => l.id === gameState.currentView);

  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, currentView: GameView.LEVEL_SELECT }));
  };

  const handleSelectLevel = (levelId: GameView) => {
    setGameState(prev => ({ ...prev, currentView: levelId }));
    // Show tutorial automatically on enter? Let's make it manual button for cleaner UX, 
    // but trigger "Hint" pulse if user is stuck could be cool. For now, clean start.
  };

  const handleBackToMenu = () => {
    setGameState(prev => ({ ...prev, currentView: GameView.LEVEL_SELECT }));
    setShowSuccess(false);
  };

  const handleLevelComplete = () => {
    if (currentLevelConfig && !gameState.completedLevels.includes(currentLevelConfig.id)) {
       setGameState(prev => ({
         ...prev,
         completedLevels: [...prev.completedLevels, currentLevelConfig.id]
       }));
    }
    setShowSuccess(true);
  };

  // -- Intro Screen --
  if (gameState.currentView === GameView.INTRO) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#0f172a_100%)] z-0"></div>
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center max-w-2xl"
        >
          <div className="mb-6 inline-block p-4 rounded-full bg-blue-500/10 border border-blue-500/20 neon-blue">
            <Icons.Shield className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            OGT Cyber
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-slate-300 mb-6 tracking-wide">
            Learn Cybersecurity by Playing
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
             Explore interactive challenges. Understand vulnerabilities. <br/>
             Master SQL Injection, XSS, and IDOR in a safe sandbox.
          </p>
          
          <Button onClick={handleStartGame} className="text-xl py-4 px-10 neon-purple">
            Start Game
          </Button>
        </motion.div>
      </div>
    );
  }

  // -- Level Select Screen --
  if (gameState.currentView === GameView.LEVEL_SELECT) {
    return (
      <div className="min-h-screen bg-[#0f172a] p-8 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-5xl"
        >
          <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
               <Icons.Shield className="w-8 h-8 text-blue-500" />
               <span className="font-bold text-xl tracking-wider">OGT CYBER</span>
            </div>
            <div className="text-slate-400 text-sm">
              Progress: <span className="text-white font-bold">{gameState.completedLevels.length}</span> / {LEVELS.length}
            </div>
          </header>

          <h2 className="text-3xl font-bold text-white mb-8 text-center">Select a Challenge</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVELS.map((level, idx) => {
              const isCompleted = gameState.completedLevels.includes(level.id);
              // Logic: Lock if previous not completed (Optional, currently unlocked per prompt)
              const isLocked = level.locked; 

              return (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                  className={`glass-panel p-6 rounded-2xl border border-white/5 flex flex-col h-full relative cursor-pointer group transition-all ${isCompleted ? 'border-green-500/30' : ''}`}
                  onClick={() => !isLocked && handleSelectLevel(level.id)}
                >
                  {isCompleted && (
                    <div className="absolute top-4 right-4">
                      <Icons.CheckCircle className="text-green-400 w-6 h-6" />
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl ${
                    level.vulnerability === 'SQL Injection' ? 'bg-blue-500/20 text-blue-400' :
                    level.vulnerability === 'Reflected XSS' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-pink-500/20 text-pink-400'
                  }`}>
                    {idx + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{level.title}</h3>
                  <div className="inline-block px-2 py-1 rounded text-xs font-mono bg-slate-800 text-slate-300 mb-3 self-start">
                    {level.vulnerability}
                  </div>
                  <p className="text-slate-400 text-sm mb-6 flex-1">{level.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-bold tracking-wider">
                     <span>{level.difficulty}</span>
                     <span className="group-hover:translate-x-1 transition-transform">Play Now &rarr;</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  // -- Level Layout (Generic Wrapper) --
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col">
      {showSuccess && <Confetti />}
      
      {/* Top Bar */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
         <div className="flex items-center gap-4">
           <button 
             onClick={handleBackToMenu}
             className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
           >
             <Icons.ArrowRight className="w-5 h-5 rotate-180" />
           </button>
           <h1 className="font-bold text-lg hidden md:block">
             {currentLevelConfig?.title} 
             <span className="ml-3 text-xs font-normal text-slate-500 py-1 px-2 border border-slate-700 rounded">
               {currentLevelConfig?.vulnerability}
             </span>
           </h1>
         </div>

         <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowTutorial(true)} className="py-2 px-4 text-sm" icon={<Icons.BookOpen className="w-4 h-4"/>}>
              Mission Brief
            </Button>
         </div>
      </nav>

      {/* Game Content */}
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center relative">
         <AnimatePresence mode="wait">
            <motion.div 
               key={gameState.currentView}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="w-full"
            >
              {gameState.currentView === GameView.LEVEL_1 && <Level1SQLi onComplete={handleLevelComplete} />}
              {gameState.currentView === GameView.LEVEL_2 && <Level2XSS onComplete={handleLevelComplete} />}
              {gameState.currentView === GameView.LEVEL_3 && <Level3IDOR onComplete={handleLevelComplete} />}
            </motion.div>
         </AnimatePresence>
      </main>

      {/* Tutorial Modal */}
      <Modal 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        title={`Mission: ${currentLevelConfig?.title}`}
      >
         {gameState.currentView === GameView.LEVEL_1 && <SQLiTutorial />}
         {gameState.currentView === GameView.LEVEL_2 && <XSSTutorial />}
         {gameState.currentView === GameView.LEVEL_3 && <IDORTutorial />}
         <div className="mt-6 flex justify-end">
           <Button onClick={() => setShowTutorial(false)}>Got it, I'm ready!</Button>
         </div>
      </Modal>

      {/* Success Modal */}
      <Modal 
        isOpen={showSuccess} 
        onClose={() => {}} 
        title="Mission Accomplished!"
        type="success"
      >
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
             <Icons.CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-lg mb-6">You successfully exploited the vulnerability and captured the flag.</p>
          
          <div className="bg-black/40 p-4 rounded-lg border border-green-500/30 mb-8 font-mono text-green-400 text-sm break-all">
             FLAG: OGT_{'{'}MASTER_{gameState.currentView}_PWNED{'}'}
          </div>

          <div className="flex justify-center gap-4">
             <Button variant="outline" onClick={() => setShowSuccess(false)}>Replay Level</Button>
             <Button onClick={handleBackToMenu}>Next Mission &rarr;</Button>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-600 text-sm border-t border-white/5">
        © 2025 — Built by OGT | Ethical Cyber Learning Project
      </footer>
    </div>
  );
};

export default App;
