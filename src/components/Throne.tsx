'use client';

import { motion } from 'framer-motion';
import { Crown, Sword } from 'lucide-react';

interface ThroneProps {
  kingAddress: string | null;
  reignStrength: number;
  isUnderAttack: boolean;
}

export function Throne({ kingAddress, reignStrength, isUnderAttack }: ThroneProps) {
  const hasKing = !!kingAddress;
  
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center py-8"
      animate={isUnderAttack ? { x: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Floating Crown Above Throne */}
      {hasKing && (
        <motion.div
          className="absolute -top-8 z-20"
          animate={{ 
            y: [0, -8, 0],
            rotate: [-3, 3, -3]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Crown className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]" />
        </motion.div>
      )}

      {/* Throne Platform */}
      <motion.div
        className={`
          relative w-48 h-48 rounded-2xl flex flex-col items-center justify-center
          ${hasKing 
            ? 'bg-gradient-to-b from-amber-900/80 to-amber-950/90 throne-glow' 
            : 'bg-gradient-to-b from-stone-800/60 to-stone-900/80'
          }
          border-2 ${hasKing ? 'border-yellow-500/60' : 'border-stone-600/40'}
        `}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* King Avatar or Empty Throne */}
        <div className="relative">
          {hasKing ? (
            <motion.div
              className="w-24 h-24 rounded-full bg-gradient-to-b from-amber-400 to-yellow-600 
                         flex items-center justify-center shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Sword className="w-12 h-12 text-amber-950" />
            </motion.div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-stone-800 border-2 border-stone-600/50 
                            flex items-center justify-center opacity-50">
              <span className="text-stone-500 text-2xl">?</span>
            </div>
          )}
        </div>

        {/* King Address Display */}
        {hasKing ? (
          <div className="mt-4 text-center">
            <p className="text-yellow-400 text-sm font-mono font-bold">
              {kingAddress?.slice(0, 6)}...{kingAddress?.slice(-4)}
            </p>
            <p className="text-yellow-500/80 text-xs mt-1">👑 THE KING</p>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-stone-400 text-sm">Empty Throne</p>
            <p className="text-stone-500 text-xs mt-1">Claim it now</p>
          </div>
        )}

        {/* Reign Strength Bar */}
        {hasKing && (
          <div className="absolute -bottom-6 w-full px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-yellow-500/70">Strength</span>
              <div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${reignStrength}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs text-yellow-400 font-mono">{reignStrength}%</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Throne Steps */}
      <div className="flex flex-col items-center mt-2 opacity-50">
        <div className="w-56 h-3 bg-stone-800/80 rounded-sm" />
        <div className="w-64 h-3 bg-stone-800/60 rounded-sm mt-1" />
        <div className="w-72 h-3 bg-stone-800/40 rounded-sm mt-1" />
      </div>
    </motion.div>
  );
}
