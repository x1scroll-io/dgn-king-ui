'use client';

import { useState, useCallback } from 'react';

interface GameState {
  // Round info
  roundNumber: number;
  roundStartTime: number;
  roundEndTime: number;
  isIntermission: boolean;
  
  // King info
  kingAddress: string | null;
  kingContribution: number;
  reignStartTime: number;
  
  // Treasury
  treasuryAmount: number;
  
  // Army
  armyMembers: { address: string; contribution: number }[];
  armyTotalContribution: number;
  
  // Arrows
  arrowsFired: number;
  arrowTier: number;
  
  // Player
  playerContribution: number;
  playerIsKing: boolean;
  playerInArmy: boolean;
}

const MOCK_GAME_STATE: GameState = {
  roundNumber: 1,
  roundStartTime: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
  roundEndTime: Date.now() + 1000 * 60 * 60 * 6, // 6 hours from now
  isIntermission: false,
  
  kingAddress: '7x8gH2...K9mN',
  kingContribution: 50000,
  reignStartTime: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
  
  treasuryAmount: 250000,
  
  armyMembers: [
    { address: '3aBcD4...EfGh', contribution: 15000 },
    { address: '5iJkL6...MnOp', contribution: 12000 },
    { address: '7qRsT8...UvWx', contribution: 8000 },
  ],
  armyTotalContribution: 35000,
  
  arrowsFired: 12,
  arrowTier: 2,
  
  playerContribution: 0,
  playerIsKing: false,
  playerInArmy: false,
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(MOCK_GAME_STATE);
  const [isLoading, setIsLoading] = useState(false);

  // Actions
  const claimThrone = useCallback((amount: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        kingAddress: 'You',
        kingContribution: amount,
        reignStartTime: Date.now(),
        treasuryAmount: prev.treasuryAmount + amount,
      }));
      setIsLoading(false);
    }, 1000);
  }, []);

  const enlistInArmy = useCallback((amount: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        playerInArmy: true,
        playerContribution: prev.playerContribution + amount,
        armyTotalContribution: prev.armyTotalContribution + amount,
        armyMembers: [...prev.armyMembers, { address: 'You', contribution: amount }],
        treasuryAmount: prev.treasuryAmount + amount,
      }));
      setIsLoading(false);
    }, 1000);
  }, []);

  const fireArrow = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        arrowsFired: prev.arrowsFired + 1,
        kingAddress: prev.kingAddress === '7x8gH2...K9mN' ? 'You' : prev.kingAddress,
      }));
      setIsLoading(false);
    }, 1500);
  }, []);

  const startIntermission = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isIntermission: true,
    }));
  }, []);

  const endIntermission = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isIntermission: false,
      roundNumber: prev.roundNumber + 1,
      roundStartTime: Date.now(),
      roundEndTime: Date.now() + 1000 * 60 * 60 * 11.98,
      kingAddress: null,
      kingContribution: 0,
      arrowsFired: 0,
      treasuryAmount: 0,
      armyMembers: [],
      armyTotalContribution: 0,
    }));
  }, []);

  return {
    gameState,
    isLoading,
    actions: {
      claimThrone,
      enlistInArmy,
      fireArrow,
      startIntermission,
      endIntermission,
    },
  };
}
