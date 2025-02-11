import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { WheelRenderer } from "./renderer";
import { BiddingComponent } from "../../components/bidding";
import prizes from "./prizes";
import spinning from "./assets/spinning.ogg";
import end from "./assets/end.ogg";

const spinningAudio = new Audio(spinning);
const endAudio = new Audio(end);

export const WheelGame: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => {
    const [roll, setRoll] = useState(false);
    
    const [betAmount, setBetAmount] = useState(1);

    const [message, setMessage] = useState("Spin to Win!")

    function win(idx: number) {
        const p = prizes()[idx];
        const mul = parseFloat(p.text as string)

        console.log(p);
        console.log(mul);

        setRoll(false);
        earnMoney(betAmount * mul);
        blockInput(false);

        spinningAudio.pause();
        spinningAudio.currentTime = 0;

        endAudio.play();

        if (mul <= 1) setMessage("Oh no! You got " + mul + "x!")
        else setMessage("Congratulations! You won " + mul + "x!")
    }

    function start() {
        if (betAmount == 0 || betAmount > getMoney()) return;

        setRoll(true);

        blockInput(true);

        setMessage("Spinning!")

        spinningAudio.play();

        spendMoney(betAmount)
    }
    
    return <div id="wheel" {...props}>
        <h1 className="font-bold text-xl">Wheel</h1>

        <WheelRenderer onWin={win} roll={roll}></WheelRenderer>

        <p className="m-5">{message}</p>

        <BiddingComponent updateAmount={setBetAmount} gamble={start} getMoney={getMoney}></BiddingComponent>
    </div>
}