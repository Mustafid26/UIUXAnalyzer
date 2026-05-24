import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalyzerStore } from '../../../store/useAnalyzerStore';
import { RefreshCw, Crosshair } from 'lucide-react';

export const AnnotatedScreenshot = ({ result }) => {
  const { previewUrl, activePin, setActivePin, reset } = useAnalyzerStore();

  const normalizeCoord = (val) => {
    if (val === undefined || val === null) return 50;
    let num = parseFloat(val);
    if (isNaN(num)) return 50;
    if (num > 100 && num <= 1000) {
      num = (num / 1000) * 100;
    } else if (num > 1000) {
      num = 50;
    }
    return Math.min(Math.max(num, 2), 98);
  };

  return (
    <div className="lab-panel p-4 md:p-6 relative overflow-hidden group flex flex-col items-center justify-center w-full h-full min-h-[450px] lg:min-h-[calc(100vh-160px)]">
      {/* Tech grid overlay inside container */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
      <div className="corner-decoration pointer-events-none" />
      
      {/* Container Header/Label */}
      <div className="absolute top-4 left-4 flex items-center gap-2 opacity-50 z-20">
        <Crosshair size={14} className="text-primary animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">Viewport Analysis</span>
      </div>

      <div className="relative inline-block max-w-full">
        {previewUrl && (
          <img 
            src={previewUrl} 
            alt="Viewport Analysis Source" 
            className="max-h-[50vh] lg:max-h-[68vh] w-auto object-contain rounded-lab border border-border/80 shadow-neon-sm"
          />
        )}
        
        {/* Scanning green light overlay (only when analyzed) */}
        {result && (
          <div className="absolute inset-0 rounded-lab overflow-hidden pointer-events-none z-10">
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80 shadow-[0_0_10px_#00e5a0] animate-scan" />
            <div className="absolute inset-0 bg-primary/2 opacity-[0.03]" />
          </div>
        )}
        
        {/* Overlay Pins */}
        <AnimatePresence>
          {result?.improvements?.map((item) => {
            const safeX = normalizeCoord(item.x);
            const safeY = normalizeCoord(item.y);
            const isSelected = activePin === item.id;
            
            return (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                key={item.id}
                className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center font-display font-black text-xs cursor-pointer transition-all duration-300 z-20 hover:scale-110 hover:-translate-y-0.5
                  ${isSelected 
                    ? 'bg-primary text-background shadow-neon scale-110 ring-4 ring-primary/20 border border-primary-light' 
                    : 'bg-surface/90 backdrop-blur-sm text-textLight border border-border hover:border-primary/50 hover:text-primary hover:shadow-neon-sm'
                  }`}
                style={{ left: `${safeX}%`, top: `${safeY}%` }}
                onClick={() => setActivePin(item.id)}
                onMouseEnter={() => setActivePin(item.id)}
              >
                {item.id}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Image Actions */}
      <div className="absolute bottom-4 right-4 z-40 opacity-80 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={reset}
          className="lab-button py-2 px-4 flex items-center gap-2 border border-border/80 bg-surface/80"
        >
          <RefreshCw size={12} />
          <span>Reload</span>
        </button>
      </div>
    </div>
  );
};
