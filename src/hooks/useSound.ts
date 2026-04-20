'use client';

import { useCallback, useRef } from 'react';
import { Howl } from 'howler';

interface SoundEffects {
  playDonation: () => void;
  playThroneTakeover: () => void;
  playArrowFire: () => void;
  playArrowImpact: () => void;
  playKingDethroned: () => void;
  playArmyRush: () => void;
  playRoundEnd: () => void;
  playRoundStart: () => void;
  playEndgameWarning: () => void;
}

// Sound URLs - replace with actual audio files when available
const SOUND_URLS = {
  donation: '/sounds/donation.mp3',
  throneTakeover: '/sounds/throne.mp3',
  arrowFire: '/sounds/arrow-fire.mp3',
  arrowImpact: '/sounds/arrow-impact.mp3',
  kingDethroned: '/sounds/dethroned.mp3',
  armyRush: '/sounds/army-rush.mp3',
  roundEnd: '/sounds/round-end.mp3',
  roundStart: '/sounds/round-start.mp3',
  endgameWarning: '/sounds/endgame.mp3',
};

export function useSound(): SoundEffects {
  const soundsRef = useRef<Map<string, Howl>>(new Map());

  const playSound = useCallback((name: keyof typeof SOUND_URLS) => {
    // In development, sounds won't play without actual audio files
    // This is a scaffold - add actual sounds later
    console.log(`🔊 ${name}`);
  }, []);

  return {
    playDonation: () => playSound('donation'),
    playThroneTakeover: () => playSound('throneTakeover'),
    playArrowFire: () => playSound('arrowFire'),
    playArrowImpact: () => playSound('arrowImpact'),
    playKingDethroned: () => playSound('kingDethroned'),
    playArmyRush: () => playSound('armyRush'),
    playRoundEnd: () => playSound('roundEnd'),
    playRoundStart: () => playSound('roundStart'),
    playEndgameWarning: () => playSound('endgameWarning'),
  };
}

// Alternative: Web Audio API implementation for built-in sounds
export function useWebAudio(): SoundEffects {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    const ctx = initAudio();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [initAudio]);

  return {
    playDonation: () => playTone(800, 0.1, 'sine'),
    playThroneTakeover: () => {
      playTone(400, 0.3, 'square');
      setTimeout(() => playTone(600, 0.2, 'square'), 150);
    },
    playArrowFire: () => {
      playTone(200, 0.5, 'sawtooth');
    },
    playArrowImpact: () => {
      playTone(100, 0.3, 'square');
    },
    playKingDethroned: () => {
      playTone(300, 0.5, 'sawtooth');
      setTimeout(() => playTone(200, 0.5, 'sawtooth'), 200);
    },
    playArmyRush: () => {
      [200, 250, 300, 350, 400].forEach((freq, i) => {
        setTimeout(() => playTone(freq, 0.1, 'square'), i * 100);
      });
    },
    playRoundEnd: () => {
      playTone(880, 0.5, 'sine');
    },
    playRoundStart: () => {
      playTone(523, 0.3, 'sine');
      setTimeout(() => playTone(659, 0.3, 'sine'), 200);
      setTimeout(() => playTone(784, 0.5, 'sine'), 400);
    },
    playEndgameWarning: () => {
      playTone(150, 1, 'sawtooth');
    },
  };
}
