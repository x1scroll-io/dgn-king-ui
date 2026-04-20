'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TreasuryProps {
  amount: number;
  token: string;
  lastDonation?: number;
}

export function Treasury({ amount, token, lastDonation }: TreasuryProps) {
  const [isBouncing, setIsBouncing] = useState(false);
  const [displayAmount, setDisplayAmount] = useState(amount);

  useEffect(() => {
    if (lastDonation && lastDonation > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [lastDonation]);

  useEffect(() => {
    setDisplayAmount(amount);
  }, [amount]);

  // Scale treasury chest based on amount
  const scale = Math.min(1 + (amount / 1000000) * 0.3, 1.5);

  return (
    <motion.div 
      className="flex flex-col items-center py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Treasury Label */}
      <div className="flex items-center gap-2 mb-4">
        <Coins className="w-5 h-5 text-yellow-500" />
        <span className="text-yellow-500/80 text-sm font-semibold tracking-wider uppercase">
          Treasury
        </span>
      </div>

      {/* Treasury Chest */}
      <motion.div
        className={`
          relative w-40 h-32 flex items-center justify-center
          bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900
          rounded-xl border-4 border-yellow-600/60
          ${isBouncing ? 'bounce-chest' : ''}
        `}
        animate={{ scale }}
        whileHover={{ scale: scale * 1.05 }}
        style={{
          boxShadow: `
            0 0 30px rgba(255, 215, 0, ${0.3 + (amount / 2000000)}),
            inset 0 0 30px rgba(0, 0, 0, 0.5)
          `
        }}
      >
        {/* Chest Lid Detail */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-amber-600/40 to-transparent rounded-t-lg" />
        
        {/* Lock/Hinge */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-10 
                        bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-full 
                        border-2 border-yellow-400 flex items-center justify-center">
          <div className="w-3 h-4 bg-amber-900 rounded-full" />
        </div>

        {/* Treasure Amount */}
        <div className="absolute -bottom-12 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayAmount}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center"
            >
              <span className="text-3xl font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                {displayAmount.toLocaleString()}
              </span>
              <span className="text-yellow-500/60 text-sm font-mono">{token}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-30"
          style={{
            background: `radial-gradient(circle at center, rgba(255, 215, 0, 0.4) 0%, transparent 70%)`
          }}
        />
      </motion.div>

      {/* Daily Drip Indicator */}
      <motion.div 
        className="flex items-center gap-2 mt-16 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-green-400/80">
          +{(amount * 0.02 / 24).toFixed(2)} {token}/hr drip
        </span>
      </motion.div>
    </motion.div>
  );
}
