import React, { useRef, useState } from "react";
import { GameComponentProps } from "../../game";
import { PlinkoEngine, PlinkoEngineRunner } from "./plinkoengine";
import { BiddingComponent } from "../../components/bidding";
import BigNumber from "bignumber.js";

export const PlinkoGame: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => {
    const engine = useRef<PlinkoEngineRunner>(null);
    
    const [bidAmount, setBidAmount] = useState(new BigNumber(1));

    const [multipliers, setMultipliers] = useState<string[]>(["Drop balls to win!"]);

    function onResult(mul: number, bidAmount: BigNumber) {
        earnMoney(bidAmount.mul(mul));
        console.log("earn money");

        setMultipliers(Mul => {
            const newMul = [...Mul];
            if (newMul.length == 1 && newMul[0] == "Drop balls to win!") newMul.pop();  

            if(newMul.length == 4) newMul.shift();
            newMul.push(`${mul}x`);
            setMultipliers(newMul);

            return newMul;
        });
    }

    function addBall() {
        if (bidAmount.eq(0) || bidAmount.greaterThan(getMoney())) return;

        spendMoney(bidAmount);
        engine.current?.addBall(bidAmount);
    }
    
    return <div id="plinko" {...props}>
        <h1 className="text-xl font-bold">Plinko</h1>

        <PlinkoEngine className="max-h-[70vh]" ref={engine} onResult={onResult}></PlinkoEngine>

        <div className="flex">
            {multipliers.map((m, i) => <p key={i} className="m-4">{m}</p>)}
        </div>

        <BiddingComponent updateAmount={setBidAmount} gamble={addBall} getMoney={getMoney} gambleText="Add Ball!"></BiddingComponent>
    </div>
}