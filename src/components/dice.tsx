import React from "react";
import d1 from "../assets/dice1.png"
import d2 from "../assets/dice2.png";
import d3 from "../assets/dice3.png";
import d4 from "../assets/dice4.png";
import d5 from "../assets/dice5.png";
import d6 from "../assets/dice6.png";

export interface CrapsDiceProps extends React.HTMLAttributes<HTMLDivElement> {
    dice1: number;
    dice2: number;
}

export interface DiceProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    dice: number;
}

export const Dice: React.FC<DiceProps> = ({dice, ...props}) => {
    var images = [d1, d2, d3, d4, d5, d6];
    
    return <img alt={"Dice " + dice} src={images[dice - 1]} {...props} />
}