import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { MinefieldViewer } from "./minefield";
import MinesAlgorithm, { Minefield, MinefieldRisk } from "./MinesAlgorithm";
import { Button } from "../../components/ui/button";
import { BiddingComponent } from "../../components/bidding";
import { Select } from "../../components/ui/select";
import NumberFormatter from "../../lib/NumberFormatter";

export const MinesGame: React.FC<GameComponentProps> = ({setMoney, getMoney, blockInput, exit, ...props}) => {
    const [bidAmount, setBidAmount] = useState(1);
    const [risk, setRisk] = useState(MinefieldRisk.LOW);

    const [minefield, setMinefield] = useState<Minefield>(MinesAlgorithm.generateMinefield(MinefieldRisk.LOW));
    const [multiplier, setMultplier] = useState(0.1);
    const [message, setMessage] = useState("Mine to Win!")

    const [isPlaying, setIsPlaying] = useState(false);

    function activateMine(x: number, y: number) {
        const newMinefield: Minefield = [...minefield];
        newMinefield[x][y].revealed = true;
        setMinefield(newMinefield);

        if (!MinesAlgorithm.hasLost(minefield)) {
            setMultplier(MinesAlgorithm.calculateMultiplier(minefield, risk));
        } else {
            lose();
        }
    }

    function end() {
        setIsPlaying(false);
    }

    function lose() {
        setMessage("You Lose!");
        setMoney(getMoney() - bidAmount);
        end();
    }

    function cashOut() {
        setMessage("You won with a multiplier of " + multiplier + "x!");
        setMoney((getMoney() - bidAmount) + (bidAmount * multiplier));
        end();
    }

    function start() {
        if (bidAmount == 0 || bidAmount > getMoney()) return;

        var field = MinesAlgorithm.generateMinefield(risk);
        setIsPlaying(true);
        setMinefield(field);
        setMultplier(MinesAlgorithm.calculateMultiplier(field, risk));
    }

    return <div id="mines" {...props}>
        <h2 className="font-bold text-xl">Mines</h2>

        <div className="m-5">
            <Button disabled={!isPlaying} onClick={cashOut}>Cash Out</Button>
            <p>Current Multiplier: {multiplier}x</p>
            <p>Current Bid: ${NumberFormatter.formatText(bidAmount)}</p>
            <br/>
            <p>{message}</p>
        </div>

        <MinefieldViewer minefield={minefield} toggleMine={activateMine} disabled={!isPlaying}></MinefieldViewer>

        <BiddingComponent updateAmount={setBidAmount} gamble={start} getMoney={getMoney} gambleText="Bid!" className="m-5" disabled={isPlaying}>
            <p>Risk: </p>
            <Select onClick={(e) => {setRisk(parseInt((e.target as HTMLSelectElement).value))}}>
                <option value={MinefieldRisk.LOW}>Low</option>
                <option value={MinefieldRisk.MEDIUM}>Medium</option>
                <option value={MinefieldRisk.HIGH}>High</option>
            </Select>
        </BiddingComponent>
    </div>
}