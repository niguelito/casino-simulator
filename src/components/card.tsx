import React from "react";

export type CardValue = "ace" | "king" | "queen" | "jack" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1";
export type CardSuit = "diamonds" | "hearts" | "spades" | "clubs";

export interface CardProp extends React.ImgHTMLAttributes<HTMLImageElement> {
    value?: CardValue;
    suit?: CardSuit;
    back?: boolean;
}

export const Card: React.FC<CardProp> = ({value, suit, back, ...props}) => {
    if (value && suit && !back) {
        function getValue() {
            switch (value) { 
                case "ace": return "A";
                case "king": return "K";
                case "queen": return "Q";
                case "jack": return "J";
                case "10": return "0";
                default: return value as string;
            }
        }

        function getSuit() {
            switch (suit) {
                case "diamonds": return "D";
                case "hearts": return "H";
                case "spades": return "S";
                case "clubs": return "C";
            }
        }

        return <img src={"https://deckofcardsapi.com/static/img/" + getValue() + getSuit() + ".png"} {...props} />
    } else {
        return <img src="https://deckofcardsapi.com/static/img/back.png" {...props} />
    }
}