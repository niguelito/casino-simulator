import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { WheelRenderer } from "./renderer";
import { BiddingComponent } from "../../components/bidding";
import prizes from "./prizes";

export const WheelGame: React.FC<GameComponentProps> = ({setMoney, getMoney, blockInput, exit, ...props}) => {
    const [roll, setRoll] = useState(false);
    
    const [betAmount, setBetAmount] = useState(1);

    const [message, setMessage] = useState("Spin to Win!")

    function win(idx: number) {
        const p = prizes()[idx];
        const mul = parseFloat(p.text as string)

        console.log(p);
        console.log(mul);

        setRoll(false);
        setMoney(getMoney() - betAmount + (betAmount * mul));
        blockInput(false);

        if (mul <= 1) setMessage("Oh no! You got " + mul + "x!")
        else setMessage("Congratulations! You won " + mul + "x!")
    }

    function start() {
        setRoll(true);

        blockInput(true);

        setMessage("Spinning!")
    }
    
    return <div id="wheel" {...props}>
        <h1 className="font-bold text-xl">Wheel</h1>

        <WheelRenderer onWin={win} roll={roll}></WheelRenderer>

        <p className="m-5">{message}</p>

        <BiddingComponent updateAmount={setBetAmount} gamble={start} getMoney={getMoney}></BiddingComponent>
    </div>
}