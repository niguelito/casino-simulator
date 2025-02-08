export class SlotsWin {
    public static readonly LOSE = 0;
    public static readonly SMALL = 3;
    public static readonly MEDIUM = 8;
    public static readonly LARGE = 15;
    public static readonly JACKPOT = 25;
    public static readonly GOLD_RUSH = 50;
}

export class SymbolStatus {
    public static readonly MATCHING = 0;
    public static readonly DICE = 1;
    public static readonly SEVEN = 2;
}

export interface SlotsSymbol {
    symbol: string;
    status: number;
    id: number;
}

export default class SlotsAlgorithm {
    static casinoSymbols: SlotsSymbol[] = [
        {
            symbol: "🍒",
            status: SymbolStatus.MATCHING,
            id: 0,
        },
        {
            symbol: "🍋",
            status: SymbolStatus.MATCHING,
            id: 1,
        },
        {
            symbol: "🍇",
            status: SymbolStatus.MATCHING,
            id: 2,
        },
        {
            symbol: "🍕",
            status: SymbolStatus.MATCHING,
            id: 3,
        },
        {
            symbol: "🍘",
            status: SymbolStatus.MATCHING,
            id: 4,
        },
        {
            symbol: "🍙",
            status: SymbolStatus.MATCHING,
            id: 5,
        },
        {
            symbol: "🍮",
            status: SymbolStatus.MATCHING,
            id: 6,
        },
        {
            symbol: "🍯",
            status: SymbolStatus.MATCHING,
            id: 7,
        },
        {
            symbol: "🍬",
            status: SymbolStatus.MATCHING,
            id: 8,
        },
        {
            symbol: "🥨",
            status: SymbolStatus.MATCHING,
            id: 9
        },
        {
            symbol: "🥛",
            status: SymbolStatus.MATCHING,
            id: 17
        },
        {
            symbol: "🥝",
            status: SymbolStatus.MATCHING,
            id: 18
        },
        {
            symbol: "🍫",
            status: SymbolStatus.MATCHING,
            id: 19
        },
        {
            symbol: "⚀",
            status: SymbolStatus.DICE,
            id: 10,
        },
        {
            symbol: "⚁",
            status: SymbolStatus.DICE,
            id: 11,
        },
        {
            symbol: "⚂",
            status: SymbolStatus.DICE,
            id: 12,
        },
        {
            symbol: "⚃",
            status: SymbolStatus.DICE,
            id: 13,
        },
        {
            symbol: "⚄",
            status: SymbolStatus.DICE,
            id: 14,
        },
        {
            symbol: "7",
            status: SymbolStatus.SEVEN,
            id: 16,
        }
    ];

    static getWinningText(type: SlotsWin): [string, string] {
        switch (type) {
            case SlotsWin.LOSE:
                return ["You Lost!", "You lost! Better luck next time..."];
            case SlotsWin.SMALL:
                return ["Small Win!", "Small win! You won 3x your bid!"];
            case SlotsWin.MEDIUM:
                return ["Medium Win!", "Medium win! You won 8x your bid!"];
            case SlotsWin.LARGE:
                return ["Big Win!", "Big win! You won bid 15x your bid!"];
            case SlotsWin.JACKPOT:
                return ["🎰Jackpot🎰", "Jackpot! You won 25x your bid!"];
            default:
                return ["💰Gold Rush💰", "Gold Rush! You won 50x your bid!"];
        }
    }

    static generate(): SlotsSymbol[] {
        // hehe funni cheating
        // return [
        //     this.casinoSymbols[18],
        //     this.casinoSymbols[18],
        //     this.casinoSymbols[18],
        // ]

        return [
            this.casinoSymbols[Math.floor(Math.random() * this.casinoSymbols.length)],
            this.casinoSymbols[Math.floor(Math.random() * this.casinoSymbols.length)],
            this.casinoSymbols[Math.floor(Math.random() * this.casinoSymbols.length)],
        ]
    }

    static generateSlotOutputs(finalSymbol: SlotsSymbol, amount: number): SlotsSymbol[] {
        const output: SlotsSymbol[] = [];
        for (let i = 0; i < amount; i++) {
            output.push(this.casinoSymbols[Math.floor(Math.random() * this.casinoSymbols.length)]);
        }
        output[output.length - 1] = finalSymbol;
        return output;
    }

    // no matching symbols = lose
    // 2 matching symbols = small win
    // 2 differing dice = small win
    // 1 7 = medium win
    // 2 matching dice = medium win
    // 3 matching symbols = large win
    // 3 differing dice = large win
    // 2 7s = jackpot
    // 3 matching dice = jackpot
    // 3 7s = gold rush

    // this function is recursive, and will check for the first win it finds
    static getWinAmount(symbols: SlotsSymbol[], currentSymbol?: number, sevenCheck?: boolean): number {
        // there should always be 3 symbols for the 3 slots
        if (symbols.length != 3) throw new Error("Invalid symbol array length!");
        
        if (!sevenCheck) {
            // 1 seven is better than 2 matching
            // so check sevens before checking others
            const sevens = symbols.filter((sy) => sy.status == SymbolStatus.SEVEN);

            switch (sevens.length) {
                // we have no sevens, continue
                default: return this.getWinAmount(symbols, undefined, true);

                // 1 seven = medium
                case 1: return SlotsWin.MEDIUM;

                // 2 sevens = jackpot
                case 2: return SlotsWin.JACKPOT;

                // 3 sevens = gold rush
                case 3: return SlotsWin.GOLD_RUSH;
            }
        } else if (currentSymbol == undefined) {
            // if we do not have a current symbol,
            // we are at the start of the array
            return this.getWinAmount(symbols, 0, true);
        } else if (currentSymbol >= symbols.length) {
            // if we are at the end of the array, 
            // we have not matched anything,
            // meaning we have lost
            return SlotsWin.LOSE;
        } else {
            // otherwise, we are somewhere in the middle
            const symbol = symbols[currentSymbol];

            // get all other symbols
            const others = symbols.filter((_, i) => i != currentSymbol);

            switch (symbol.status) {
                case SymbolStatus.MATCHING:
                    // if we are matching, we need to check if we have any other matching symbols
                    const matching = others.filter(s => s.status == SymbolStatus.MATCHING);
                    if (matching.length == 0) return this.getWinAmount(symbols, currentSymbol + 1, true);

                    // if we have matching symbols, we need to check if we have 2 or 3
                    const matched = matching.filter(s => s.id == symbol.id);

                    // if array length is 1, we have 2 matching symbols
                    if (matched.length == 1) return SlotsWin.SMALL;

                    // if array length is 2, we have 3 matching symbols
                    else if (matched.length == 2) return SlotsWin.LARGE;

                    // otherwise, we have no matching symbols
                    else return this.getWinAmount(symbols, currentSymbol + 1, true);

                case SymbolStatus.DICE:
                    // if we are a dice, we need to check if we have any other dice
                    const dice = others.filter(s => s.status == SymbolStatus.DICE);
                    if (dice.length == 0) return this.getWinAmount(symbols, currentSymbol + 1, true);

                    // if we have other dice, we need to check if any of them match
                    const matchedDice = dice.filter(s => s.id == symbol.id);

                    // if array length is 1, we have 2 matching dice
                    if (matchedDice.length == 1) return SlotsWin.MEDIUM;

                    // if array length is 2, we have 3 matching dice
                    else if (matchedDice.length == 2) return SlotsWin.JACKPOT;

                    // otherwise, we have no matching dice, and should look for differing dice
                    else {
                        // if dice array length is 1, we have 2 differing dice
                        if (dice.length == 1) return SlotsWin.SMALL;

                        // if dice array length is 2, we have 3 differing dice
                        else if (dice.length == 2) return SlotsWin.LARGE;

                        // otherwise, we have no dice
                        else return this.getWinAmount(symbols, currentSymbol + 1, true);
                    }

                default:
                    // we shuold never reach this scope
                    throw new Error("Sevens checked incorrectly!")
            }
        }
    }
}