import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { BingoCardRenderer } from "./bingocard";
import BingoAlgorithm from "./BingoAlgorithm";
import { BiddingComponent } from "../../components/bidding";
import BigNumber from "bignumber.js";
import "./bingo.css";
import { Button } from "../../components/ui/button";

export const BingoGame: React.FC<GameComponentProps> = ({ spendMoney, earnMoney, getMoney, blockInput, exit, ...props }) => {
    const [card, setCard] = useState(BingoAlgorithm.createCard());
    const [marked, setMarked] = useState(BingoAlgorithm.emptyData());
    const [isPlaying, setIsPlaying] = useState(false);
    const [bidAmount, setBidAmount] = useState(new BigNumber(1));
    const [message, setMessage] = useState("Mark the called numbers!");
    const [calledNumbers, setCalledNumbers] = useState<number[]>([]);

    function start() {
        if (bidAmount.eq(0) || bidAmount.greaterThan(getMoney())) return;

        setCard(BingoAlgorithm.createCard());
        setMarked(BingoAlgorithm.emptyData());
        setCalledNumbers(BingoAlgorithm.generateNumbers());
        setIsPlaying(true);
        setMessage("Match numbers to win!");

        spendMoney(bidAmount);
    }

    function hasSelectedAllCalledNumbers() {
        for (let i = 0; i < card.length; i++) {
            for (let j = 0; j < card[i].length; j++) {
                if (!marked[i][j] && calledNumbers.includes(card[i][j])) {
                    return false;
                }
            }
        }

        return true;
    }

    function markNumber(x: number, y: number) {
        if (!isPlaying) return;

        const number = card[x][y];
        if (calledNumbers.includes(number)) {
            const newMarked = [...marked];
            newMarked[x][y] = true;
            setMarked(newMarked);

            if (hasSelectedAllCalledNumbers()) {
                setIsPlaying(false);
                if (BingoAlgorithm.isWin(newMarked)) {
                    setMessage("Bingo! You win!");
                    earnMoney(bidAmount.mul(10));
                } else {
                    setMessage("Oh no! You lost!");
                }
            }
        }
    }

    function skip() {
        card.forEach((row, x) => {
            row.forEach((_, y) => {
                if (!marked[x][y]) {
                    markNumber(x, y);
                }
            })
        })
    }

    return <div id="bingo" {...props}>
        <h1 className="font-bold text-xl">Bingo</h1>

        <BingoCardRenderer card={card} marked={marked} onMark={markNumber} disabled={!isPlaying}></BingoCardRenderer>

        <p className="m-4">{message}</p>
        <div className="m-4">Called Numbers: {calledNumbers.join(", ")}</div>

        <Button onClick={skip} disabled={!isPlaying}>Skip</Button>

        <BiddingComponent updateAmount={setBidAmount} gamble={start} getMoney={getMoney} disabled={isPlaying}></BiddingComponent>
    </div>
}
