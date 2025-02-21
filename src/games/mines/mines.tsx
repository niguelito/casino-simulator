import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { MinefieldViewer } from "./minefield";
import MinesAlgorithm, { Minefield, MinefieldRisk } from "./MinesAlgorithm";
import { Button } from "../../components/ui/button";
import { BiddingComponent } from "../../components/bidding";
import { Select } from "../../components/ui/select";
import NumberFormatter from "../../lib/NumberFormatter";
import bomb from "./assets/bomb.ogg";
import diamond from "./assets/diamond.ogg"
import BigNumber from "bignumber.js";

const bombSound = new Audio(bomb);
const diamondSound = new Audio(diamond);

export const MinesGame: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => {
    const [bidAmount, setBidAmount] = useState(new BigNumber(1));
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
            diamondSound.pause();
            diamondSound.currentTime = 0;
            diamondSound.play();
        } else {
            lose();
            bombSound.play();
        }
    }

    function end() {
        setIsPlaying(false);
    }

    function lose() {
        setMessage("You Lose!");
        end();
    }

    function cashOut() {
        setMessage("You won with a multiplier of " + multiplier + "x!");
        earnMoney(bidAmount.mul(multiplier));
        end();
    }

    function start() {
        if (bidAmount.eq(0) || bidAmount.greaterThan(getMoney())) return;

        var field = MinesAlgorithm.generateMinefield(risk);
        setIsPlaying(true);
        setMinefield(field);
        setMultplier(MinesAlgorithm.calculateMultiplier(field, risk));

        spendMoney(bidAmount)
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
            <Select onChange={(e) => {setRisk(parseInt((e.target as HTMLSelectElement).value))}}>
                <option value={MinefieldRisk.LOW}>Low</option>
                <option value={MinefieldRisk.MEDIUM}>Medium</option>
                <option value={MinefieldRisk.HIGH}>High</option>
            </Select>
        </BiddingComponent>
    </div>
}