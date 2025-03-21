import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import NumberFormatter from "../../lib/NumberFormatter";
import { Button } from "../../components/ui/button";
import CrapsAlgorithm, { CrapsGame, CrapsResult, CrapsRound } from "./CrapsAlgorithm";
import { BiddingComponent } from "../../components/bidding";
import rollA from "./assets/dice_roll.ogg";
import dropA from "./assets/dice_finish.ogg";
import BigNumber from "bignumber.js";
import { Dice } from "../../components/dice";

const rollAudio = new Audio(rollA);
const dropAudio = new Audio(dropA);

export const CrapsGameC: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => {
    var r = CrapsAlgorithm.roll();
    const [dice1, setDice1] = useState(r[0]);
    const [dice2, setDice2] = useState(r[1]);

    const [message, setMessage] = useState("Roll to Win!")

    const [bidAmount, setBidAmount] = useState(new BigNumber(1));

    const [game, setGame] = useState<CrapsGame | null>(null);
    const [round, setRound] = useState(0);
    const [point, setPoint] = useState(-1);
    const [cont, setCont] = useState(false);

    function roll(r: CrapsRound) {
        blockInput(true);
        
        let maxFirstSpins = 25;
        let maxSecondSpins = maxFirstSpins;

        const firstSpins = CrapsAlgorithm.generateDiceRolls(r[0][0], maxFirstSpins);
        const secondSpins = CrapsAlgorithm.generateDiceRolls(r[0][1], maxSecondSpins)

        rollAudio.play();

        const i = setInterval(() => {
            if (maxFirstSpins != 0) {
                maxFirstSpins--;
                setDice1(firstSpins[firstSpins.length - maxFirstSpins - 1]);
            }

            if (maxSecondSpins != 0) {
                maxSecondSpins--;
                setDice2(secondSpins[secondSpins.length - maxSecondSpins - 1]);
            }

            if (maxFirstSpins == 0 && maxSecondSpins == 0) {
                clearInterval(i)
                blockInput(false);

                rollAudio.pause();
                rollAudio.currentTime = 0;
                
                dropAudio.play();

                if (r[1] != CrapsResult.CONTINUE) {
                    setGame(null);
                    setRound(0);
                    setCont(false);
                    setPoint(-1);
                }

                switch (r[1]) {
                    case CrapsResult.WIN:
                        earnMoney(bidAmount.mul(2));
                        setMessage("You Won!")
                        break;

                    case CrapsResult.LOSE:
                        setMessage("You Lost!")
                        break;

                    default:
                        if (point == -1) {
                            setPoint(r[0][0] + r[0][1]);
                        }
                        setMessage(`Continue! (${r[0][0] + r[0][1]})`);
                        setRound(round + 1);
                        setCont(true);
                }
            }
        }, 100);
    }

    function gamble() {
        if (bidAmount.eq(0) || bidAmount.greaterThan(getMoney())) return;

        spendMoney(bidAmount);

        setMessage("Rolling!")

        var game = CrapsAlgorithm.generateGame();
        setGame(game);
        console.log(game);

        roll(game.rounds[round])
    }
    
    return (<div id="craps" {...props}>
        <h2 className="font-bold text-xl">Craps</h2>
        <p>Money: ${NumberFormatter.formatText(getMoney())}</p>

        <div className="m-10">
            <div className="flex flex-row justify-center items-center">
                <Dice className="w-[20%]" dice={dice1}></Dice>
                <Dice className="w-[20%]" dice={dice2}></Dice>
            </div><br></br>
            <Button variant="primary" hidden={!cont} onClick={() => roll((game as CrapsGame).rounds[round])}>Continue</Button>
            <p hidden={point == -1}>Point: {point}</p>
            <p>{message}</p>
        </div>

        <BiddingComponent updateAmount={setBidAmount} gamble={gamble} getMoney={getMoney} disabled={game != null} gambleText="Roll!"></BiddingComponent>
    </div>);
}