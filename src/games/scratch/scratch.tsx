import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { ScratchCardRenderer } from "./scratchcard";
import ScratchAlgorithm, { ScratchData } from "./ScratchAlgorithm";
import { BiddingComponent } from "../../components/bidding";

export const ScratchGame: React.FC<GameComponentProps> = ({setMoney, getMoney, blockInput, exit, ...props}) => {
    const [card, setCard] = useState(ScratchAlgorithm.createCard());
    const [data, setData] = useState(ScratchAlgorithm.emptyData());
    const [isScratching, setIsScratching] = useState(false);

    const [bidAmount, setBidAmount] = useState(1);
    const [message, setMessage] = useState("Scratch to win!")

    const [k, setK] = useState(0);
    
    function reveal(x: number, y: number) {
        console.log(card);

        const newData: ScratchData = [...data];
        newData[x][y] = true;
        setData(newData)

        if (ScratchAlgorithm.isWinRevealed(card, newData)) {
            setIsScratching(false);
            setMessage(`${card.mod > 1 ? "Congratulations!" : "Oh no!"} You scratched a ${card.mod}x multiplier!`);
            setMoney(getMoney() - bidAmount + bidAmount * card.mod);
        }
    }

    function start() {
        if (bidAmount == 0 || bidAmount > getMoney()) return;

        setCard(ScratchAlgorithm.createCard());
        setData(ScratchAlgorithm.emptyData());
        setIsScratching(true);
        setMessage("Scratch to reveal 3 modifiers!");

        setK(nk => nk + 1);
    }

    return <div id="scratch" {...props}>
        <h1 className="font-bold text-xl">Scratch Card</h1>

        <ScratchCardRenderer key={k} className="w-[40%] h-[100%] aspect-[71/102]" disabled={!isScratching} card={card.data} onReveal={reveal}></ScratchCardRenderer>

        <p className="m-4">{message}</p>

        <BiddingComponent updateAmount={setBidAmount} gamble={start} getMoney={getMoney} disabled={isScratching}></BiddingComponent>
    </div>
}