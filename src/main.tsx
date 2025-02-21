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

const ComingSoon: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => <h1 className="text-xl" {...props}>Coming Soon</h1>

const games: Game[] = [
    { name: "Blackjack", icon: "🃏", component: BlackJackGame },
    { name: "Mines", icon: "⚒️", component: MinesGame },
    { name: "Slots", icon: "🎰", component: SlotsGame },
    { name: "Craps", icon: "🎲", component: CrapsGameC },
    { name: "Wheel", icon: "🎱", component: WheelGame },
    { name: "Scratch", icon: "👛", component: ScratchGame },
    { name: "Plinko", icon: "🔮", component: PlinkoGame },
    { name: "Bingo", icon: "🏞️", component: ComingSoon },
    { name: "Sic Bo", icon: "🎲", component: SicBoGame },
    { name: "Baccarat", icon: "🎲", component: ComingSoon }
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
