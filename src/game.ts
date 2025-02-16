import BigNumber from "bignumber.js";
import React from "react";

export interface GameComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    spendMoney: (money: BigNumber) => void;
    earnMoney: (money: BigNumber) => void;
    getMoney: () => BigNumber;
    exit: () => void;
    blockInput: (bl: boolean) => void;
}

export interface Game {
    name: string;
    icon: string;
    component: React.FC<GameComponentProps>
}