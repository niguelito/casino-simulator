type ScratchRow = [number, number, number];
export type ScratchCardData = [ScratchRow, ScratchRow, ScratchRow];
export type ScratchCard = {data: ScratchCardData, mod: number}

type ScratchDataRow = [boolean, boolean, boolean]
export type ScratchData = [ScratchDataRow, ScratchDataRow, ScratchDataRow];

type Modifier = {mod: number, weight: number};

export default class ScratchAlgorithm {
    static modifiers: Modifier[] = [
        {mod: 0.2, weight: 0.5},
        {mod: 0.5, weight: 0.6},
        {mod: 1, weight: 0.6},
        {mod: 2, weight: 0.4},
        {mod: 5, weight: 0.1},
        {mod: 10, weight: 0.05},
        {mod: 25, weight: 0.025},
        {mod: 50, weight: 0.01},
        {mod: 100, weight: 0.005}
    ]

    public static emptyData(): ScratchData {
        return [[false, false, false], [false, false, false], [false, false, false]];
    }

    private static selectMod(): number {
        while (true) {
            const m = this.modifiers[Math.floor(Math.random() * this.modifiers.length)];

            if (Math.random() < m.weight) return m.mod;
        }
    }

    public static createCard(): ScratchCard {
        const selectedMod = this.selectMod();
        let availableMods = this.modifiers.map(m => m.mod).filter(m => m !== selectedMod);
        
        const card: ScratchCardData = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        const positions = Array.from({ length: 9 }, (_, i) => i).sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < 3; i++) {
            const pos = positions.pop();
            if (pos !== undefined) card[Math.floor(pos / 3)][pos % 3] = selectedMod;
        }
        
        const modCounts = new Map<number, number>();
        availableMods = availableMods.sort(() => Math.random() - 0.5);
        
        for (const pos of positions) {
            let mod: number;
            do {
                mod = availableMods[Math.floor(Math.random() * availableMods.length)];
            } while ((modCounts.get(mod) || 0) >= 2);
            
            card[Math.floor(pos / 3)][pos % 3] = mod;
            modCounts.set(mod, (modCounts.get(mod) || 0) + 1);
        }
        
        return { data: card, mod: selectedMod };
    }

    public static isWinRevealed(card: ScratchCard, revealedData: ScratchData): boolean {
        let count = 0;
        
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (card.data[row][col] === card.mod && revealedData[row][col]) {
                    count++;
                }
            }
        }

        console.log(count);
        
        return count === 3;
    }
    
}
