import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { ScratchCardRenderer } from "./scratchcard";
import ScratchAlgorithm, { ScratchData } from "./ScratchAlgorithm";
import { BiddingComponent } from "../../components/bidding";
import BigNumber from "bignumber.js";

export const ScratchGame: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => {
    const [card, setCard] = useState(ScratchAlgorithm.createCard());
    const [data, setData] = useState(ScratchAlgorithm.emptyData());
    const [isScratching, setIsScratching] = useState(false);

    const [bidAmount, setBidAmount] = useState(new BigNumber(1));
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
            earnMoney(bidAmount.mul(card.mod));
        }
    }

    function start() {
        if (bidAmount.eq(0) || bidAmount.greaterThan(getMoney())) return;

        setCard(ScratchAlgorithm.createCard());
        setData(ScratchAlgorithm.emptyData());
        setIsScratching(true);
        setMessage("Scratch to reveal 3 modifiers!");

        spendMoney(bidAmount);

        setK(nk => nk + 1);
    }

    return <div id="scratch" {...props}>
        <h1 className="font-bold text-xl">Scratch Card</h1>

        <ScratchCardRenderer key={k} className="w-[40%] h-[100%] aspect-[71/102]" disabled={!isScratching} card={card.data} onReveal={reveal}></ScratchCardRenderer>

        <p className="m-4">{message}</p>

        <BiddingComponent updateAmount={setBidAmount} gamble={start} getMoney={getMoney} disabled={isScratching}></BiddingComponent>
    </div>
}