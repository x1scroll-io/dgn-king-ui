'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Timer, Crown, Users, ArrowRight, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IntermissionProps {
  isVisible: boolean;
  roundNumber: number;
  lastKing: string;
  reignDuration: number;
  totalRaised: number;
  armySize: number;
  arrowsFired: number;
  nextRoundTime: number;
  onShare: () => void;
}

export function Intermission({ 
  isVisible, 
  roundNumber,
  lastKing,
  reignDuration,
  totalRaised,
  armySize,
  arrowsFired,
  nextRoundTime,
  onShare
}: IntermissionProps) {
  const [timeLeft, setTimeLeft] = useState(nextRoundTime);
  const [adIndex, setAdIndex] = useState(0);

  const ads = [
    { type: 'promo', text: '⚡ Powered by X1 Blockchain', subtext: 'Fast. Cheap. Unstoppable.' },
    { type: 'promo', text: '📜 x1scroll.io', subtext: 'The scroll that never stops' },
    { type: 'promo', text: '🎮 Want to build on X1?', subtext: 'Join the ecosystem' },
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    const adTimer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
    }, 10000);
    return () => clearInterval(adTimer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (hours: number) => {
    if (hours < 1) return `${Math.floor(hours * 60)}m`;
    if (hours < 24) return `${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`;
    return `${Math.floor(hours / 24)}d`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Intermission Card */}
          <motion.div
            className="relative w-full max-w-lg bg-gradient-to-b from-amber-900/90 to-amber-950/95 
                       rounded-2xl border-2 border-yellow-600/50 p-6 shadow-2xl overflow-hidden"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            
            {/* Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
              </motion.div>
              <h2 className="text-2xl font-bold text-yellow-400">Round {roundNumber} Complete</h2>
              <p className="text-yellow-200/60 text-sm">The arena rests before the next battle</p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ResultCard
                icon={<Crown className="w-5 h-5" />}
                label="Last King"
                value={`${lastKing.slice(0, 6)}...${lastKing.slice(-4)}`}
                color="text-yellow-400"
              />
              <ResultCard
                icon={<Timer className="w-5 h-5" />}
                label="Reign Duration"
                value={formatDuration(reignDuration)}
                color="text-yellow-400"
              />
              <ResultCard
                icon={<Users className="w-5 h-5" />}
                label="Army Warriors"
                value={armySize.toString()}
                color="text-red-400"
              />
              <ResultCard
                icon={<ArrowRight className="w-5 h-5" />}
                label="Arrows Fired"
                value={arrowsFired.toString()}
                color="text-red-400"
              />
            </div>

            {/* Total Raised */}
            <div className="text-center mb-6 p-4 bg-black/30 rounded-xl">
              <p className="text-stone-400 text-sm mb-1">Total Treasury Raised</p>
              <p className="text-3xl font-bold text-yellow-400">
                {totalRaised.toLocaleString()} XNT
              </p>
            </div>

            {/* Ad Slot */}
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl border border-purple-500/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={adIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center"
                >
                  <p className="text-lg font-semibold text-white">{ads[adIndex].text}</p>
                  <p className="text-sm text-white/60">{ads[adIndex].subtext}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Countdown */}
            <div className="text-center mb-6">
              <p className="text-stone-400 text-sm mb-2">Next Round Starts In</p>
              <div className="text-5xl font-mono font-bold text-yellow-400 tabular-nums">
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Share Button */}
            <motion.button
              onClick={onShare}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 
                         hover:from-blue-500 hover:to-blue-400
                         rounded-xl flex items-center justify-center gap-2
                         text-white font-semibold transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5" />
              <span>Share Victory</span>
            </motion.button>

            {/* Arena Gates Closing Animation */}
            <motion.div
              className="absolute bottom-0 left-0 w-1/2 h-1 bg-gradient-to-r from-yellow-600 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 - (timeLeft / nextRoundTime) }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-1/2 h-1 bg-gradient-to-l from-yellow-600 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 - (timeLeft / nextRoundTime) }}
              style={{ transformOrigin: 'right' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ResultCard({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  color: string;
}) {
  return (
    <div className="bg-black/30 rounded-lg p-3 text-center">
      <div className={`${color} mb-1 flex justify-center`}>{icon}</div>
      <p className="text-stone-400 text-xs uppercase tracking-wider">{label}</p>
      <p className={`font-mono font-semibold ${color} truncate`}>{value}</p>
    </div>
  );
}
