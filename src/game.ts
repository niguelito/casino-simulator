import React from "react";

export interface GameComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    spendMoney: (money: number) => void;
    earnMoney: (money: number) => void;
    getMoney: () => number;
    exit: () => void;
    blockInput: (bl: boolean) => void;
}

export interface Game {
    name: string;
    icon: string;
    component: React.FC<GameComponentProps>
}