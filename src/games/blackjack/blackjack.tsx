import React, { useState } from "react";
import { GameComponentProps } from "../../game";
import { Card } from "../../components/card";
import { BiddingComponent } from "../../components/bidding";
import { BlackJackAlgorithm, BlackJackHand, BlackJackResult, DealerAction } from "./BlackJackAlgorithm";
import { Button } from "../../components/ui/button";

export const BlackJackGame: React.FC<GameComponentProps> = ({setMoney, getMoney, blockInput, exit, save, ...props}) => {
    const [bidAmount, setBidAmount] = useState(1);

    const [playerHand, setPlayerHand] = useState<BlackJackHand>(BlackJackAlgorithm.generateHand());
    const [dealerHand, setDealerHand] = useState<BlackJackHand>(BlackJackAlgorithm.generateHand());
    const [playerTurn, setPlayerTurn] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const [message, setMessage] = useState("Play to Win!")

    function lose() {
        setIsPlaying(false);
        setMessage("You Lose!")
        setMoney(getMoney() - bidAmount);
    }

    function win() {
        setIsPlaying(false);
        setMessage("You Win!")
        setMoney(getMoney() + bidAmount);
    }

    function hit() {
        playerHand.hit();
        setPlayerHand(new BlackJackHand(playerHand.cards));

        if (playerHand.getHandValue() > 21) lose();
        else if (playerHand.getHandValue() == 21) win();
    }

    function stand() {
        setPlayerTurn(false);
        
        var action = BlackJackAlgorithm.getDealerAction(dealerHand, playerHand);
        
        setMessage("Dealer is " + (action == DealerAction.HIT ? "hitting..." : "standing..."));
    }

    function continueGame() {
        var action = BlackJackAlgorithm.getDealerAction(dealerHand, playerHand);

        if (action === DealerAction.HIT && dealerHand.cards.length === 2) {
            dealerHand.hit();
            setDealerHand(new BlackJackHand(dealerHand.cards));
        }

        var nextAction = BlackJackAlgorithm.getDealerAction(dealerHand, playerHand);
        setMessage("Dealer is " + (nextAction === DealerAction.HIT ? "standing..." : "standing..."));

        var result = BlackJackAlgorithm.getWinner(playerHand, dealerHand);
        
        switch (result) {
            case BlackJackResult.PLAYER_WIN:
                win();
                break;
            case BlackJackResult.DEALER_WIN:
                lose();
                break;
            case BlackJackResult.DRAW:
                setMessage("Draw!");
                setIsPlaying(false);
                break;
        }
    }

    function gamble() {
        if (bidAmount == 0 || bidAmount > getMoney()) return;

        setPlayerHand(BlackJackAlgorithm.generateHand());
        setDealerHand(BlackJackAlgorithm.generateHand());

        setIsPlaying(true);
        setMessage("It is your turn!");
        setPlayerTurn(true);
    }

    return <div id="backjack" {...props}>
        <h2 className="font-bold text-xl">Blackjack</h2>

        <div className="m-5 flex gap-2 select-none">
            {(function() {
                const cards: React.JSX.Element[] = [];
                for (let i = 0; i < dealerHand.cards.length; i++) {
                    if (i == dealerHand.cards.length - 1 && playerTurn) {
                        cards.push(<Card className="w-40" back={true} key={i}/>)
                    } else {
                        cards.push(<Card className="w-40" value={dealerHand.cards[i].value} suit={dealerHand.cards[i].suit} key={i}/>)
                    }
                }
                return cards;
            })()}
        </div>

        <div className="m-5 select-none">
            <p>{message}</p><br></br>

            <div className="flex gap-2">
                <Button hidden={!playerTurn} disabled={!isPlaying} onClick={hit}>Hit</Button>
                <Button hidden={!playerTurn} disabled={!isPlaying} onClick={stand}>Stand</Button>
                <Button hidden={playerTurn} onClick={continueGame}>Continue</Button>
            </div>
        </div>

        <div className="m-5 flex gap-2 select-none">
            {playerHand.cards.map(c => <Card value={c.value} suit={c.suit} key={c.value + c.suit} className="w-40"/>)}
        </div>

        <BiddingComponent updateAmount={setBidAmount} gamble={gamble} getMoney={getMoney} disabled={isPlaying} gambleText="Bet!"></BiddingComponent>
    </div>
}