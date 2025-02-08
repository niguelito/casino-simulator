import React from "react";

export interface GameComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    setMoney: (money: number) => void;
    getMoney: () => number;
    exit: () => void;
    save: () => void;
    blockInput: (bl: boolean) => void;
}

export interface Game {
    name: string;
    icon: string;
    component: React.FC<GameComponentProps>
}