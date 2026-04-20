'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Crosshair } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ArrowAttackProps {
  isActive: boolean;
  onComplete?: () => void;
}

export function ArrowAttack({ isActive, onComplete }: ArrowAttackProps) {
  const [showArrow, setShowArrow] = useState(false);
  const [showImpact, setShowImpact] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowArrow(true);
      const impactTimer = setTimeout(() => {
        setShowImpact(true);
        setTimeout(() => {
          setShowArrow(false);
          setShowImpact(false);
          onComplete?.();
        }, 500);
      }, 800);
      return () => clearTimeout(impactTimer);
    }
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {showArrow && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Flying Arrow */}
          <motion.div
            initial={{ x: '-100vw', y: '60vh', rotate: -25, opacity: 1 }}
            animate={{ x: '50vw', y: '30vh', rotate: -15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute"
          >
            <motion.div
              animate={{ x: [-2, 2, -2, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
            >
              <ArrowRight className="w-16 h-16 text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]" 
                         style={{ transform: 'rotate(45deg)' }} />
            </motion.div>
            
            {/* Motion Trail */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-red-500"
              style={{ width: '200px', transform: 'translateY(-50%) rotate(45deg) translateX(-100%)' }}
            />
          </motion.div>

          {/* Impact Effect */}
          <AnimatePresence>
            {showImpact && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-red-500/80" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-16 h-16 bg-red-500/40 rounded-full blur-xl" />
                </motion.div>

                {/* Sparks */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ 
                      scale: [0, 1, 0],
                      x: Math.cos(i * Math.PI / 4) * 60,
                      y: Math.sin(i * Math.PI / 4) * 60
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

interface FireArrowButtonProps {
  onFire: () => void;
  disabled: boolean;
  cost: number;
}

export function FireArrowButton({ onFire, disabled, cost }: FireArrowButtonProps) {
  return (
    <motion.button
      onClick={onFire}
      disabled={disabled}
      className={`
        relative w-full py-4 rounded-xl font-bold text-lg
        flex items-center justify-center gap-3
        transition-all touch-target
        ${disabled 
          ? 'bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700' 
          : 'bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white border border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
        }
      `}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <Crosshair className="w-5 h-5" />
      <span>FIRE ARROW</span>
      <span className="text-sm opacity-80">({cost}%)</span>
    </motion.button>
  );
}
