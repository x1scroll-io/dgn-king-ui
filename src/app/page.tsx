'use client';

import { motion } from 'framer-motion';
import { Wallet, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Throne } from '@/components/Throne';
import { Treasury } from '@/components/Treasury';
import { Army } from '@/components/Army';
import { ArrowAttack, FireArrowButton } from '@/components/ArrowAttack';
import { Intermission } from '@/components/Intermission';
import { ChainSelector } from '@/components/ChainSelector';
import { useGameState } from '@/hooks/useGameState';
import { useWebAudio } from '@/hooks/useSound';

export default function DGNKingGame() {
  const { gameState, actions } = useGameState();
  const sounds = useWebAudio();
  
  const [selectedChain, setSelectedChain] = useState('x1');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [lastDonation, setLastDonation] = useState(0);

  // Calculate reign duration
  const reignDuration = gameState.kingAddress 
    ? (Date.now() - gameState.reignStartTime) / (1000 * 60 * 60)
    : 0;

  // Calculate time to endgame (2 hours before round end)
  const timeToEndgame = Math.max(0, gameState.roundEndTime - Date.now() - 1000 * 60 * 60 * 2);
  const isEndgame = timeToEndgame <= 0;

  const handleDonate = () => {
    const amount = 1000;
    setLastDonation(amount);
    if (soundEnabled) sounds.playDonation();
    
    if (!gameState.kingAddress) {
      actions.claimThrone(amount);
    } else {
      actions.enlistInArmy(amount);
    }
  };

  const handleFireArrow = () => {
    if (soundEnabled) sounds.playArrowFire();
    setShowArrow(true);
  };

  const handleArrowComplete = () => {
    setShowArrow(false);
    if (soundEnabled) {
      sounds.playArrowImpact();
      sounds.playKingDethroned();
    }
    actions.fireArrow();
  };

  const handleShare = () => {
    const text = `I just ${gameState.playerIsKing ? 'defended my throne' : 'joined the battle'} in DGN KING 👑\n\nRound ${gameState.roundNumber} | Treasury: ${gameState.treasuryAmount.toLocaleString()} XNT\n\nPlay now: x1scroll.io/dgn`;
    
    if (navigator.share) {
      navigator.share({ title: 'DGN KING', text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen colosseum-bg torchlight overflow-x-hidden">
      {/* Arrow Attack Animation */}
      <ArrowAttack isActive={showArrow} onComplete={handleArrowComplete} />

      {/* Intermission Screen */}
      <Intermission
        isVisible={gameState.isIntermission}
        roundNumber={gameState.roundNumber}
        lastKing={gameState.kingAddress || 'None'}
        reignDuration={reignDuration}
        totalRaised={gameState.treasuryAmount}
        armySize={gameState.armyMembers.length}
        arrowsFired={gameState.arrowsFired}
        nextRoundTime={120}
        onShare={handleShare}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-700 
                       flex items-center justify-center shadow-lg"
          >
            <span className="text-xl">👑</span>
          </motion.div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">DGN KING</h1>
            <p className="text-yellow-500/60 text-xs">Round {gameState.roundNumber}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ChainSelector 
            selectedChain={selectedChain}
            onChainChange={setSelectedChain}
          />
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-stone-800/80 text-stone-400 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-gradient-to-r from-yellow-600 to-yellow-500 
                            hover:from-yellow-500 hover:to-yellow-400
                            text-white font-semibold text-sm transition-all">
            <Wallet className="w-4 h-4" />
            <span>Connect</span>
          </button>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="pt-24 pb-32 px-4 max-w-lg mx-auto">
        <!-- Round Timer -->
        <div className="text-center mb-6">
          <motion.div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       ${isEndgame 
                         ? 'bg-red-900/60 border border-red-500/50 animate-pulse' 
                         : 'bg-stone-800/60 border border-stone-700'
                       }`}
          >
            <span className={`text-sm font-mono ${isEndgame ? 'text-red-400' : 'text-stone-300'}`}>
              {isEndgame ? '⚠️ ENDGAME' : '⏱️ TIME REMAINING'}
            </span>
          </motion.div>
          
          <div className="mt-2 text-3xl font-mono font-bold text-white tabular-nums">
            {/* Placeholder - would use real countdown */}
            06:42:18
          </div>
        </div>

        <!-- Throne Section -->
        <Throne
          kingAddress={gameState.kingAddress}
          reignStrength={gameState.kingAddress 
            ? Math.min((gameState.kingContribution / gameState.treasuryAmount) * 100, 100)
            : 0
          }
          isUnderAttack={showArrow}
        />

        <!-- Treasury Section -->
        <Treasury
          amount={gameState.treasuryAmount}
          token="XNT"
          lastDonation={lastDonation}
        />

        <!-- Army Section -->
        <Army
          members={gameState.armyMembers}
          totalContribution={gameState.armyTotalContribution}
          isRushing={gameState.armyTotalContribution > gameState.kingContribution}
        />

        <!-- Arrow Section -->
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-stone-400 text-sm">The Assassin's Arrow</span>
            <span className="text-red-400/60 text-xs">{gameState.arrowsFired} fired</span>
          </div>
          
          <FireArrowButton
            onFire={handleFireArrow}
            disabled={!gameState.kingAddress || gameState.playerIsKing}
            cost={gameState.arrowTier === 1 ? 1 : gameState.arrowTier === 2 ? 0.75 : 0.5}
          />
        </div>
      </main>

      <!-- Fixed Bottom Actions -->
      <footer className="fixed bottom-0 left-0 right-0 z-30 p-4 glass-panel">
        <div className="max-w-lg mx-auto flex gap-3">
          <motion.button
            onClick={handleDonate}
            className="flex-1 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 
                       hover:from-yellow-500 hover:to-yellow-400
                       rounded-xl text-white font-bold text-lg shadow-lg
                       transition-all touch-target"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {gameState.kingAddress ? 'JOIN ARMY' : 'CLAIM THRONE'}
          </motion.button>
          
          <motion.button
            onClick={() => actions.startIntermission()}
            className="px-4 py-4 bg-stone-800 rounded-xl text-stone-400
                       hover:text-white hover:bg-stone-700 transition-colors"
          >
            ⏸️
          </motion.button>
        </div>
      </footer>
    </div>
  );
}
