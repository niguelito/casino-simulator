export enum MinefieldRisk {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

export type Mine = { safe: boolean, revealed: boolean }

type Row = [Mine, Mine, Mine, Mine, Mine];
export type Minefield = [Row, Row, Row, Row, Row];

export default class MinesAlgorithm {
    public static generateEmptyMinefield(): Minefield {
        var mine = () => {return {safe: true, revealed: false}};
        return [
            [mine(), mine(), mine(), mine(), mine()],
            [mine(), mine(), mine(), mine(), mine()],
            [mine(), mine(), mine(), mine(), mine()],
            [mine(), mine(), mine(), mine(), mine()],
            [mine(), mine(), mine(), mine(), mine()]
        ]
    }

    public static generateMinefield(risk: MinefieldRisk): Minefield {
        const field = this.generateEmptyMinefield();

        for (let i = 0; i < risk; i) {
            // randomly select a mine
            const x = Math.floor(Math.random() * 5);
            const y = Math.floor(Math.random() * 5);

            if (!field[x][y].safe) continue;

            field[x][y].safe = false;
            i++
        }

        return field;
    }

    public static hasLost(field: Minefield) {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (!field[x][y].safe && field[x][y].revealed) return true;
            }
        }

        return false;
    }

    public static calculateMultiplier(field: Minefield, risk: MinefieldRisk): number {
        const base = 0.1 * risk;

        let count = 0;

        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (field[x][y].safe && field[x][y].revealed) count++;
            }
        }

        const addition = Math.round((0.07 * (Math.pow(count, Math.max(1, risk - 1)))) * 10) / 10;

        return base + addition;
    }
}
