'use client';

import { motion } from 'framer-motion';
import { Shield, Users } from 'lucide-react';

interface ArmyMember {
  address: string;
  contribution: number;
}

interface ArmyProps {
  members: ArmyMember[];
  totalContribution: number;
  isRushing: boolean;
}

export function Army({ members, totalContribution, isRushing }: ArmyProps) {
  const memberCount = members.length;
  const armyStrength = Math.min((totalContribution / 10000) * 100, 100);

  return (
    <motion.div 
      className="py-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Army Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-500" />
          <span className="text-red-400/80 text-sm font-semibold tracking-wider uppercase">
            The Army
          </span>
        </div>
        <div className="flex items-center gap-1 text-red-400/60 text-xs">
          <Users className="w-3 h-3" />
          <span>{memberCount} warriors</span>
        </div>
      </div>

      {/* Army Strength Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-red-400/70">Army Power</span>
          <span className="text-xs text-red-400 font-mono">{armyStrength.toFixed(1)}%</span>
        </div>
        <div className="h-3 bg-stone-800 rounded-full overflow-hidden border border-red-900/30">
          <motion.div 
            className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-500"
            initial={{ width: 0 }}
            animate={{ width: `${armyStrength}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Warriors Display */}
      <motion.div 
        className="relative h-20 flex items-center justify-center overflow-hidden rounded-lg
                   bg-gradient-to-r from-red-950/30 via-stone-900/50 to-red-950/30
                   border border-red-900/20"
        animate={isRushing ? { x: [-2, 2, -2, 0] } : {}}
        transition={{ duration: 0.3, repeat: isRushing ? Infinity : 0 }}
      >
        {/* Animated Warriors */}
        <div className="flex gap-1 px-4">
          {Array.from({ length: Math.min(memberCount || 5, 20) }).map((_, i) => (
            <motion.div
              key={i}
              className="w-6 h-8 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: [0, -2, 0],
                x: isRushing ? [0, 20, 0] : [0, -1, 0]
              }}
              transition={{ 
                duration: isRushing ? 0.5 : 0.8,
                delay: i * 0.05,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              {/* Warrior Silhouette */}
              <div className="w-3 h-3 bg-red-600 rounded-full mb-0.5" />
              <div className="w-4 h-4 bg-red-700 rounded-t-md" />
              <div className="w-2 h-2 bg-red-500 rounded-full mt-0.5 opacity-50" />
            </motion.div>
          ))}
        </div>

        {/* Rush Effect Overlay */}
        {isRushing && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Total Contribution */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-stone-400">Total Pooled</span>
        <span className="text-red-400 font-mono font-semibold">
          {totalContribution.toLocaleString()} XNT
        </span>
      </div>

      {/* Enlist Button Placeholder */}
      <motion.button
        className="w-full mt-4 py-3 bg-gradient-to-r from-red-800 to-red-700 
                   hover:from-red-700 hover:to-red-600
                   rounded-lg border border-red-600/50
                   text-white font-semibold text-sm
                   transition-all touch-target"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        ENLIST IN ARMY
      </motion.button>
    </motion.div>
  );
}
