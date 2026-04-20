'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Link2 } from 'lucide-react';
import { useState } from 'react';

interface Chain {
  id: string;
  name: string;
  symbol: string;
  color: string;
  rpc: string;
  explorer: string;
}

const CHAINS: Chain[] = [
  {
    id: 'x1',
    name: 'X1',
    symbol: 'XNT',
    color: '#00d4ff',
    rpc: 'https://rpc.mainnet.x1.xyz',
    explorer: 'https://explorer.x1.xyz',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    color: '#9945ff',
    rpc: 'https://api.mainnet-beta.solana.com',
    explorer: 'https://solscan.io',
  },
  {
    id: 'base',
    name: 'Base',
    symbol: 'ETH',
    color: '#0052ff',
    rpc: 'https://mainnet.base.org',
    explorer: 'https://basescan.org',
  },
];

interface ChainSelectorProps {
  selectedChain: string;
  onChainChange: (chainId: string) => void;
}

export function ChainSelector({ selectedChain, onChainChange }: ChainSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentChain = CHAINS.find(c => c.id === selectedChain) || CHAINS[0];

  return (
    <div className="relative">
      {/* Selected Chain Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-full 
                   bg-stone-800/80 border border-stone-700 
                   hover:border-stone-600 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ChainIcon color={currentChain.color} />
        <span className="text-white font-medium text-sm">{currentChain.name}</span>
        <span className="text-stone-400 text-xs">({currentChain.symbol})</span>
        <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {/* Dropdown Menu */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          y: isOpen ? 0 : -10,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        className="absolute top-full left-0 mt-2 w-48 bg-stone-900/95 backdrop-blur-lg 
                   rounded-xl border border-stone-700 shadow-2xl overflow-hidden z-50"
      >
        <div className="p-2">
          {CHAINS.map((chain) => (
            <motion.button
              key={chain.id}
              onClick={() => {
                onChainChange(chain.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-lg
                transition-colors text-left
                ${selectedChain === chain.id 
                  ? 'bg-stone-800 border border-stone-600' 
                  : 'hover:bg-stone-800/50'
                }
              `}
              whileHover={{ x: 4 }}
            >
              <ChainIcon color={chain.color} />
              <div>
                <p className="text-white font-medium text-sm">{chain.name}</p>
                <p className="text-stone-400 text-xs">{chain.symbol}</p>
              </div>
              {selectedChain === chain.id && (
                <motion.div
                  layoutId="chain-indicator"
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ backgroundColor: chain.color }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-3 py-2 bg-stone-800/50 border-t border-stone-800">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Link2 className="w-3 h-3" />
            <span>Contract: 8ctq...K9H</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ChainIcon({ color }: { color: string }) {
  return (
    <div 
      className="w-6 h-6 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${color}30`, border: `2px solid ${color}` }}
    >
      <div 
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
