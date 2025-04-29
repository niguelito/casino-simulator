import 'reflect-metadata';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Game, GameComponentProps } from './game.ts';
import { SlotsGame } from './games/slots/slots.tsx';
import { Storage } from './State.ts';
import { CrapsGameC } from './games/craps/craps.tsx';
import { BlackJackGame } from './games/blackjack/blackjack.tsx';
import { MinesGame } from './games/mines/mines.tsx';
import { WheelGame } from './games/wheel/wheel.tsx';
import { ScratchGame } from './games/scratch/scratch.tsx';
import { PlinkoGame } from './games/plinko/plinko.tsx';
import BigNumber from 'bignumber.js';
import { SicBoGame } from './games/sicbo/sicbo.tsx';

import blackjack from "./assets/games/blackjack.jpg";
import mines from "./assets/games/mines.webp";
import slots from "./assets/games/slots.avif";
import craps from "./assets/games/craps.jpg";
import wheel from "./assets/games/wheel.jpg"
import scratch from "./assets/games/scratch.jpg";
import plinko from "./assets/games/plinko.jpg";
import bingo from "./assets/games/bingo.webp";
import sicbo from "./assets/games/sicbo.jpg"
import baccarat from "./assets/games/baccarat.jpg";
import { BingoGame } from './games/bingo/bingo.tsx';

const ComingSoon: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => <h1 className="text-xl" {...props}>Coming Soon</h1>

const games: Game[] = [
    { name: "Blackjack", icon: "🃏", image: blackjack, component: BlackJackGame },
    { name: "Mines", icon: "⚒️", image: mines, component: MinesGame },
    { name: "Slots", icon: "🎰", image: slots, component: SlotsGame },
    { name: "Craps", icon: "🎲", image: craps, component: CrapsGameC },
    { name: "Wheel", icon: "🎱", image: wheel, component: WheelGame },
    { name: "Scratch", icon: "👛", image: scratch, component: ScratchGame },
    { name: "Plinko", icon: "🔮", image: plinko, component: PlinkoGame },
    { name: "Bingo", icon: "🏞️", image: bingo, component: BingoGame },
    { name: "Sic Bo", icon: "🎲", image: sicbo, component: SicBoGame },
    { name: "Baccarat", icon: "🃏", image: baccarat, component: ComingSoon }
];

const state = Storage.load();

try {
    BigNumber.config({
        DECIMAL_PLACES: 5,
        RANGE: [-30, 5000]
    });
} catch (err) {
    console.error("BigNumber is being stupid");
    console.error(err);
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App games={games} state={state} />
    </StrictMode>,
)
