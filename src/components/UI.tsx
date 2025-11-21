import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './Icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] hover:shadow-[0_0_25px_rgba(37,99,235,0.7)]",
    secondary: "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)]",
    outline: "border-2 border-slate-600 hover:border-blue-400 text-slate-300 hover:text-blue-400 bg-transparent",
    danger: "bg-red-600 hover:bg-red-500 text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export const Modal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode;
  type?: 'info' | 'success' 
}> = ({ isOpen, onClose, title, children, type = 'info' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`w-full max-w-lg p-6 rounded-2xl border glass-panel shadow-2xl ${
              type === 'success' ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'border-blue-500/30'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className={`text-2xl font-bold ${type === 'success' ? 'text-green-400' : 'text-blue-400'}`}>
                {title}
              </h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                ✕
              </button>
            </div>
            <div className="text-slate-200 leading-relaxed">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => (
  <div className="bg-slate-950 rounded-md p-4 my-3 border border-slate-800 font-mono text-sm overflow-x-auto shadow-inner">
    <div className="flex gap-1.5 mb-3 opacity-50">
      <div className="w-3 h-3 rounded-full bg-red-500"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
      <div className="w-3 h-3 rounded-full bg-green-500"></div>
    </div>
    <pre className="text-green-400">
      <code>{code}</code>
    </pre>
  </div>
);