import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { SlotMachineRenderer } from "./machine";
import SlotsAlgorithm from "./SlotsAlgorithm";
import slotmachine from "./assets/slotmachine.mp3";
import slotmachine_end from "./assets/slotmachine-end.mp3";
import NumberFormatter from "../../lib/NumberFormatter";
import { BiddingComponent } from "../../components/bidding";

const audio = new Audio(slotmachine);
const finishAudio = new Audio(slotmachine_end);

export const SlotsGame: React.FC<GameComponentProps> = ({setMoney, getMoney, blockInput, exit, ...props}) => {
    const start = SlotsAlgorithm.generate();
    const [slot1, setSlot1] = useState(start[0]);
    const [slot2, setSlot2] = useState(start[1]);
    const [slot3, setSlot3] = useState(start[2]);

    const [smallMsg, setSmallMsg] = useState("Spin to Win!");
    const [bigMsg, setBigMsg] = useState("Spin to Win!");

    const [gambleAmount, setGambleAmount] = useState(1);

    function gamble() {
        if (gambleAmount == 0 || gambleAmount > getMoney()) return;

        blockInput(true);

        setMoney(getMoney() - gambleAmount);
        setSmallMsg("Spinning...");
        setBigMsg("Spinning...");

        audio.play();

        const win = SlotsAlgorithm.generate();
        console.log(win);

        let maxFirstSpins = 15;
        let maxSecondSpins = maxFirstSpins * 2;
        let maxThirdSpins = maxFirstSpins * 3;

        const firstSpins = SlotsAlgorithm.generateSlotOutputs(win[0], maxFirstSpins);
        const secondSpins = SlotsAlgorithm.generateSlotOutputs(win[1], maxSecondSpins);
        const thirdSpins = SlotsAlgorithm.generateSlotOutputs(win[2], maxThirdSpins);

        const i = setInterval(() => {
            if (maxFirstSpins != 0) {
                maxFirstSpins--;
                setSlot1(firstSpins[firstSpins.length - maxFirstSpins - 1]);
            }

            if (maxSecondSpins != 0) {
                maxSecondSpins--;
                setSlot2(secondSpins[secondSpins.length - maxSecondSpins - 1]);
            }

            if (maxThirdSpins != 0) {
                maxThirdSpins--;
                setSlot3(thirdSpins[thirdSpins.length - maxThirdSpins - 1]);
            }

            if (maxFirstSpins == 0 && maxSecondSpins == 0 && maxThirdSpins == 0) {
                clearInterval(i);
                const result = SlotsAlgorithm.getWinAmount(win);

                var text = SlotsAlgorithm.getWinningText(result);
                setSmallMsg(text[0]);
                setBigMsg(text[1]);

                const newAmount = gambleAmount * result;
                console.log(newAmount);

                setMoney(getMoney() - gambleAmount + newAmount);

                audio.pause();
                audio.currentTime = 0;

                finishAudio.play();

                blockInput(false);
            }
        }, 50);
    }
    
    return (<div id="slots" {...props}>
        <SlotMachineRenderer className="w-[30%] h-[30%]" slot1={slot1.symbol} slot2={slot2.symbol} slot3={slot3.symbol} message={smallMsg}></SlotMachineRenderer>
        <h2 className="font-bold text-xl">Slots</h2>
        <p>Money: ${NumberFormatter.formatText(getMoney())}</p>

        <BiddingComponent updateAmount={setGambleAmount} gamble={gamble} getMoney={getMoney}>
            <p className="m-4">{bigMsg}</p>
        </BiddingComponent>
    </div>);
}