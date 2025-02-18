export enum SicboBet {
    SINGLE,
    DOUBLE,
    TRIPLE,
    RANGE_SMALL,
    RANGE_BIG,
    DOMINO,
    SUMS
}

export default class SicboAlgorithm {
    public static roll(): [number, number, number] {
        var n = () => Math.floor(Math.random() * 6) + 1;
    
        return [n(), n(), n()];
    }

    public static hasTwoBets(bet: SicboBet): boolean {
        return bet == SicboBet.DOMINO;
    }

    public static hasBets(bet: SicboBet): boolean {
        return bet != SicboBet.RANGE_SMALL && bet != SicboBet.RANGE_BIG;
    }

    private static single(bet: number, dice: number[]): number {
        const r = dice.filter(d => d == bet).length;

        return r == 0 ? r : r + 2;
    }

    private static double(bet: number, dice: number[]): number {
        const r = dice.filter(d => d == bet);

        return r.length >= 2 ? 3 : 0;
    }

    private static triple(bet: number, dice: number[]): number {
        const r = dice.filter(d => d == bet);

        return r.length >= 3 ? 5 : 0;
    }

    private static domino(bet: number[], dice: number[]): number {
        var bool = [false, false];

        dice.forEach(d => {
            if (d == bet[0]) bool[0] = true;
            if (d == bet[1]) bool[1] = true;
        })

        return bool[0] && bool[1] ? 2 : 0;
    }

    private static rangeSmall(dice: number[]): number {
        const sum = dice.reduce((a, b) => a + b);

        return sum <= 10 ? 2 : 0;
    }

    private static rangeBig(dice: number[]): number {
        const sum = dice.reduce((a, b) => a + b);

        return sum >= 11 ? 2 : 0;
    }

    private static sums(dice: number[], bet: number): number {
        const sums = [];

        for (let i = 0; i < dice.length; i++) {
            for (let j = i + 1; j < dice.length; j++) {
                sums.push(dice[i] + dice[j]);
            }
        }

        const r = sums.filter(d => d == bet).length;

        return r == 0 ? r : r * 2 + 5;
    }

    public static calculateWin(dice: number[], bet: SicboBet, betAmount: number[]): number {
        switch (bet) {
            case SicboBet.SINGLE: return this.single(betAmount[0], dice)
            case SicboBet.DOUBLE: return this.double(betAmount[0], dice)
            case SicboBet.TRIPLE: return this.triple(betAmount[0], dice)
            case SicboBet.DOMINO: return this.domino(betAmount, dice)
            case SicboBet.RANGE_SMALL: return this.rangeSmall(dice);
            case SicboBet.RANGE_BIG: return this.rangeBig(dice);
            case SicboBet.SUMS: return this.sums(dice, betAmount[0]);
        }
    }
}