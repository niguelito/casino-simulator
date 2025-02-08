import React from "react";
import d1 from "../assets/dice1.png"
import d2 from "../assets/dice2.png";
import d3 from "../assets/dice3.png";
import d4 from "../assets/dice4.png";
import d5 from "../assets/dice5.png";
import d6 from "../assets/dice6.png";
import { cn } from "../lib/utils";

export interface DiceProps extends React.HTMLAttributes<HTMLDivElement> {
    dice1: number;
    dice2: number;
}

export const CrapsDice: React.FC<DiceProps> = ({dice1, dice2, className, ...props}) => {
    var dice = [d1, d2, d3, d4, d5, d6];
    
    return <div className={cn(className, "flex flex-row justify-center items-center")} {...props}>
        <img src={dice[dice1 - 1]} alt="Dice 1" className="w-[20%]" />
        <img src={dice[dice2 - 1]} alt="Dice 2" className="w-[20%]" />
    </div>
}