export enum CrapsResult {
    LOSE = 0,
    WIN = 1,
    CONTINUE = 2
}

export type CrapsRound = [[number, number], CrapsResult];

export type CrapsGame = { rounds: CrapsRound[], result: CrapsResult; }

export default class CrapsAlgorithm {
    static readonly craps = [2, 3, 12];
    static readonly naturals = [7, 11];

    public static roll(): [number, number] {
        return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    }

    public static getWinAmount(round: [number, number], point?: number): CrapsResult {
        if (point) {
            switch (round[0] + round[1]) {
                case point: return CrapsResult.WIN;
                case 7: return CrapsResult.LOSE;
                default: return CrapsResult.CONTINUE;
            }
        } else {
            const sum = round[0] + round[1];
            if (this.craps.includes(sum)) {
                return CrapsResult.LOSE;
            } else if (this.naturals.includes(sum)) {
                return CrapsResult.WIN;
            } else {
                return CrapsResult.CONTINUE;
            }
        }
    }

    public static generateGame(): CrapsGame {
        const round: CrapsRound[] = [];
        let gameresult: CrapsResult;

        let point: number | undefined = undefined;
        while (true) {
            var r = this.roll();
            const result = this.getWinAmount(r, point)

            if (!point && result == CrapsResult.CONTINUE) point = r[0] + r[1];

            if (result == CrapsResult.LOSE || result == CrapsResult.WIN) {
                gameresult = result;
                round.push([r, result]);
                break;
            } else {
                round.push([r, result]);
            }
        }

        return { rounds: round, result: gameresult };
    }

    static generateDiceRolls(finalSymbol: number, amount: number): number[] {
        const output: number[] = [];
        for (let i = 0; i < amount; i++) {
            output.push(Math.ceil(Math.random() * 6));
        }
        output[output.length - 1] = finalSymbol;
        return output;
    }
}