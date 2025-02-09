import RoulettePro from 'react-roulette-pro';
import 'react-roulette-pro/dist/index.css';
import prizes from './prizes';

export interface WheelRendererProps {
    onWin: (mult: number) => void;
    roll: boolean;
}

export const WheelRenderer: React.FC<WheelRendererProps> = ({ onWin, roll }) => {
    const winIndex = Math.floor(Math.random() * prizes().length);
    
    return <div className="w-[80%] overflow-hidden">
        <RoulettePro
            prizes={prizes()}
            prizeIndex={winIndex}
            onPrizeDefined={() => onWin(winIndex)}
            start={roll}
        ></RoulettePro>
    </div>
    
}