import { useState } from "react";
import { GameComponentProps } from "../../game";
import SicboAlgorithm, { SicboBet } from "./SicboAlgorithm";
import { BiddingComponent } from "../../components/bidding";
import BigNumber from "bignumber.js";
import { Select } from "../../components/ui/select";
import { Dice } from "../../components/dice";
import { Input } from "../../components/ui/input";
import CrapsAlgorithm from "../craps/CrapsAlgorithm";
import rollA from "./assets/dice_roll.ogg";
import dropA from "./assets/dice_finish.ogg";

const rollAudio = new Audio(rollA);
const dropAudio = new Audio(dropA);

export const SicBoGame: React.FC<GameComponentProps> = ({spendMoney, earnMoney, getMoney, blockInput, exit, ...props}) => {
    var r = SicboAlgorithm.roll();
    const [dice1, setDice1] = useState(r[0]);
    const [dice2, setDice2] = useState(r[1]);
    const [dice3, setDice3] = useState(r[2]);

    const [betType, setBetType] = useState(SicboBet.SINGLE);
    const [diceBets, setDiceBets] = useState<number[]>([1, 1]);
    const [betAmount, setBetAmount] = useState(new BigNumber(1));

    const [isPlaying, setIsPlaying] = useState(false);
    const [message, setMessage] = useState("Roll to Win!");

    function start() {
        if (betAmount.eq(0) || betAmount.greaterThan(getMoney())) return;
        if (isNaN(diceBets[0]) || isNaN(diceBets[1])) return;
        if (diceBets[0] == diceBets[1]) return;

        spendMoney(betAmount);

        setIsPlaying(true);

        blockInput(true);

        setMessage("Rolling!");

        rollAudio.play();

        let maxFirstSpins = 6;
        let maxSecondSpins = maxFirstSpins * 2;
        let maxThirdSpins = maxFirstSpins * 3;

        const w = SicboAlgorithm.roll();
        const firstSpins = CrapsAlgorithm.generateDiceRolls(w[0], maxFirstSpins);
        const secondSpins = CrapsAlgorithm.generateDiceRolls(w[1], maxSecondSpins);
        const thirdSpins = CrapsAlgorithm.generateDiceRolls(w[2], maxThirdSpins);

        const i = setInterval(() => {
            if (maxFirstSpins != 0) {
                maxFirstSpins--;
                setDice1(firstSpins[firstSpins.length - maxFirstSpins - 1]);
            }

            if (maxSecondSpins != 0) {
                maxSecondSpins--;
                setDice2(secondSpins[secondSpins.length - maxSecondSpins - 1]);
            }

            if (maxThirdSpins != 0) {
                maxThirdSpins--;
                setDice3(thirdSpins[thirdSpins.length - maxThirdSpins - 1]);
            }

            if (maxFirstSpins == 0 && maxSecondSpins == 0 && maxThirdSpins == 0) {
                clearInterval(i)
                blockInput(false);
                setIsPlaying(false);

                var win = SicboAlgorithm.calculateWin(w, betType, diceBets);
                earnMoney(betAmount.mul(win))

                setMessage(win >= 1 ? "You Win! " + win + "x" : "Oh no! " + win + "x");

                rollAudio.pause();
                rollAudio.currentTime = 0;

                dropAudio.play();
            }
        }, 100);
    }

    return <div id="sicbo" {...props}>
        <h1 className="text-xl font-bold">Sic Bo</h1>

        <div className="m-10">
            <div className="flex flex-row justify-center items-center">
                <Dice className="w-[20%]" dice={dice1}></Dice>
                <Dice className="w-[20%]" dice={dice2}></Dice>
                <Dice className="w-[20%]" dice={dice3}></Dice>
            </div><br></br>
            <p>{message}</p>
        </div>

        <BiddingComponent updateAmount={setBetAmount} gamble={start} getMoney={getMoney} disabled={isPlaying}>
            <p>Bet Type: </p>
            <Select onChange={(e) => setBetType(parseInt((e.target as HTMLSelectElement).value))} disabled={isPlaying}>
                <option value={SicboBet.SINGLE}>Single</option>
                <option value={SicboBet.DOUBLE}>Double</option>
                <option value={SicboBet.TRIPLE}>Triple</option>
                <option value={SicboBet.DOMINO}>Domino</option>
                <option value={SicboBet.RANGE_SMALL}>Range (3-10)</option>
                <option value={SicboBet.RANGE_BIG}>Range (11-18)</option>
                <option value={SicboBet.SUMS}>Sums</option>
            </Select><br /><br />
            <p hidden={!SicboAlgorithm.hasBets(betType)}>Dice Bets: </p>
            <Input type="number" value={diceBets[0]} onChange={(e) => setDiceBets(b => [parseInt((e.target as HTMLInputElement).value), b[1]])} disabled={isPlaying} hidden={!SicboAlgorithm.hasBets(betType)}></Input>
            <Input type="number" value={diceBets[1]} onChange={(e) => setDiceBets(b => [b[0], parseInt((e.target as HTMLInputElement).value)])} disabled={isPlaying} hidden={!SicboAlgorithm.hasTwoBets(betType)}></Input>
        </BiddingComponent>
    </div>
}