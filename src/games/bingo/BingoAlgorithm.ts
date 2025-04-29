import { range } from "../../lib/utils";

export type BingoCardData = number[][];
export type BingoData = boolean[][];

export default class BingoAlgorithm {
    static max = 65;

    static createCard(): BingoCardData {
        const numbers = range(1, this.max).sort(() => Math.random() - 0.5);
        const card: BingoCardData = [];

        for (let i = 0; i < 5; i++) {
            card.push(numbers.slice(i * 5, (i + 1) * 5));
        }

        return card;
    }

    static emptyData(): BingoData {
        return Array.from({ length: 5 }, () => Array(5).fill(false));
    }

    static generateNumbers(): number[] {
        return range(1, this.max).sort(() => Math.random() - 0.5).slice(0, 30);
    }

    static isWin(marked: BingoData): boolean {
        for (let i = 0; i < 5; i++) {
            if (marked[i].every(Boolean)) return true;
        }

        for (let j = 0; j < 5; j++) {
            if (marked.every(row => row[j])) return true;
        }

        if (marked.every((row, idx) => row[idx])) return true;
        if (marked.every((row, idx) => row[4 - idx])) return true;

        return false;
    }
}
