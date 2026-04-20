# DGN KING 👑 — UI Scaffold

A cinematic colosseum-themed game interface for the DGN KING blockchain game.

## Features

- 🏛️ **Dark Colosseum Theme** — Stone walls, torchlight, crowd silhouettes
- 👑 **Animated Throne** — Floating crown, reign strength bar, king avatar
- 💰 **Bouncing Treasury Chest** — Scales with amount, particle effects
- ⚔️ **Warrior Army** — Marching animations, strength bar
- 🏹 **Arrow Attack** — Slow-motion arrow, impact effects
- ⏸️ **Intermission Screen** — Results, countdown, ad slots
- 🔗 **Multi-Chain Selector** — X1 / Solana / Base
- 🔊 **Sound Effects** — Web Audio API implementation

## Tech Stack

- Next.js 14 + React + TypeScript
- Tailwind CSS
- Framer Motion
- Howler.js (sound structure ready)
- Solana Web3.js / Anchor (wallet integration ready)

## Contract

- **Program ID:** `8ctqCod93uSEhCtN1w8T6uj1HunJKcMPTYRkGvZ28K9H`
- **Network:** X1 Mainnet
- **Round Duration:** 11 hours 58 minutes (2 min intermission)

## Quick Start

```bash
cd dgn-king-ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
```

## File Structure

```
src/
  app/
    globals.css       # Colosseum theme + animations
    page.tsx          # Main game interface
  components/
    Throne.tsx        # King + throne animations
    Treasury.tsx      # Treasury chest
    Army.tsx          # Warrior army
    ArrowAttack.tsx   # Arrow firing effects
    Intermission.tsx  # Results + ad slot
    ChainSelector.tsx # Multi-chain switcher
  hooks/
    useSound.ts       # Sound effects (Web Audio)
    useGameState.ts   # Game state management
```

## Next Steps

1. **Add actual wallet connection** — Integrate @solana/wallet-adapter
2. **Connect to program** — Add Anchor IDL, implement real transactions
3. **Add sound files** — Replace Web Audio with actual MP3s
4. **Configure ads** — Replace placeholder ads with real ad network
5. **Deploy** — `npm run build` + deploy to Vercel/server

## Integration Points

### Wallet Connection
Replace the mock "Connect" button in `page.tsx` with actual wallet adapter.

### Program Calls
Replace `useGameState.ts` mock functions with actual Anchor program calls:
- `claimThrone()` → `program.methods.claimThrone().accounts({...}).rpc()`
- `enlistInArmy()` → `program.methods.enlist().accounts({...}).rpc()`
- `fireArrow()` → `program.methods.fireArrow().accounts({...}).rpc()`

### Sound Files
Add actual audio files to `/public/sounds/` and update `useSound.ts`.

---

Built by Theo for ArnettX1 + Mask
