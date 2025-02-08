import { CardSuit, CardValue } from "../../components/card";

export enum BlackJackResult {
    PLAYER_WIN = 0,
    DEALER_WIN = 1,
    DRAW = 2,
}

export enum DealerAction {
    HIT = 0,
    STAND = 1,
}

export class BlackJackCard {
    value: CardValue;
    suit: CardSuit;
    constructor(value: CardValue, suit: CardSuit) {
        this.value = value;
        this.suit = suit;
    }

    public getValue(): number {
        switch (this.value) {
            case "ace": return 11;
            case "king":
            case "queen":
            case "jack": return 10;
            default: return parseInt(this.value);
        }
    }

    public is21(): boolean {
        return this.getValue() === 21;
    }

    public canDrawAgain(): boolean {
        return this.getValue() < 21;
    }
}

export class BlackJackHand {
    cards: BlackJackCard[];
    constructor(cards: BlackJackCard[]) {
        this.cards = cards;
    }

    public getHandValue(): number {
        let value = 0;
        let aces = 0;
        for (let card of this.cards) {
            value += card.getValue();
            if (card.value === "ace") aces++;
        }

        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }

        return value;
    }

    private hasCard(card: BlackJackCard) {
        for (let c of this.cards) {
            if (c.value === card.value && c.suit === card.suit) return true;
        }
        return false;
    }

    public hit() {
        let card = BlackJackAlgorithm.generateCard();
        while (this.hasCard(card)) card = BlackJackAlgorithm.generateCard();
        this.cards.push(card)
    }
}

export class BlackJackAlgorithm {
    public static generateCard(): BlackJackCard {
        let suits: CardSuit[] = ["diamonds", "hearts", "spades", "clubs"];
        let values: CardValue[] = ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

        let suit = suits[Math.floor(Math.random() * suits.length)];
        let value = values[Math.floor(Math.random() * values.length)];

        return new BlackJackCard(value, suit);
    }

    public static generateHand(): BlackJackHand {
        var hand = new BlackJackHand([]);
        hand.hit();
        hand.hit();
        return hand;
    }

    public static getWinner(playerHand: BlackJackHand, dealerHand: BlackJackHand): BlackJackResult {
        let playerValue = playerHand.getHandValue();
        let dealerValue = dealerHand.getHandValue();

        if (playerValue == dealerValue) return BlackJackResult.DRAW;
        if (playerValue > 21) return BlackJackResult.DEALER_WIN;
        else if (dealerValue > 21) return BlackJackResult.PLAYER_WIN;
        else if (playerValue > dealerValue) return BlackJackResult.PLAYER_WIN;
        else return BlackJackResult.DEALER_WIN;
        
    }

    public static getDealerAction(hand: BlackJackHand, player: BlackJackHand): DealerAction {
        const value = hand.getHandValue();

        if (value < 17) return DealerAction.HIT;
        else if (this.getWinner(hand, player) == BlackJackResult.PLAYER_WIN && value < 19) return DealerAction.HIT;
        return DealerAction.STAND;
    }
}