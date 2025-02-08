import 'reflect-metadata';
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Game, GameComponentProps } from './game.ts';
import { SlotsGame } from './games/slots/slots.tsx';
import { Storage } from './State.ts';
import { CrapsGameC } from './games/craps/craps.tsx';

const ComingSoon: React.FC<GameComponentProps> = ({setMoney, getMoney, blockInput, exit, save, ...props}) => <h1 className="text-xl" {...props}>Coming Soon</h1>

const games: Game[] = [
    { name: "Blackjack", icon: "🃏", component: ComingSoon },
    { name: "Mines", icon: "⚒️", component: ComingSoon },
    { name: "Slots", icon: "🎰", component: SlotsGame },
    { name: "Craps", icon: "🎲", component: CrapsGameC },
    { name: "Wheel", icon: "🎱", component: ComingSoon }
];

const state = Storage.load();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App games={games} state={state} />
    </StrictMode>,
)
