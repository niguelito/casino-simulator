import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Download, Gamepad2, Home, User } from "lucide-react";
import { Game, GameComponentProps } from "./game";
import React, { useState } from "react";
import { State, Storage } from "./State";
import { Collect } from "./components/collection";
import { cn } from "./lib/utils";
import NumberFormatter from "./lib/NumberFormatter";
import BigNumber from "bignumber.js";

const HomePage: React.FC<{ games: Game[], state: State }> = ({ games, state }) => {
    const [game, setGame] = useState<Game | null>(null)
    const [money, setMoney] = useState<BigNumber>(state.money);
    const [lastCollected, setLastCollected] = useState<number>(state.lastCollected);
    const [blockingInput, setBlockInput] = useState(false);

    window.addEventListener('beforeunload', () => {
        save();
    });
    

    function spendMoney(n: BigNumber) {
        setMoney((m) => m.sub(n));
        save(new State(money.sub(n), lastCollected));
    }

    function earnMoney(n: BigNumber) {
        setMoney((m) => m.add(n));
        save(new State(money.add(n), lastCollected));
    }

    function exit() {
        setGame(null);
        setGame(null);
        save();
    }

    function save(s = new State(money, lastCollected)) {
        console.log(s);
        Storage.save(s);
    }

    function collect() {
        var l = Date.now() + state.getCollectionInterval();
        var s = money.add(state.getCollectionValue());
        setLastCollected(l);
        setMoney(s);
        save(new State(s, l));
        return l;
    }

    function blockInput(bl: boolean) {
        setBlockInput(bl);
        // document.body.style.overflow = bl ? "hidden" : "auto";
    }

    function download() {
        let exported = localStorage.getItem(Storage.dataKey);
        if (!exported) exported = Storage.export(Storage.createNewSave());
    
        const blob = new Blob([exported], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'gambling-save.txt';
        document.body.appendChild(link);
        link.click();
        link.remove(); 
    }

    async function load(e: React.ChangeEvent<HTMLInputElement>) {
        if ((e.target as HTMLInputElement).files == null) return;
    
        const file = ((e.target as HTMLInputElement).files as FileList)[0];

        try {
            const r = await file.text();

            const s = Storage.parseSave(r, true);

            save(s);

            setMoney(s.money);
            setLastCollected(s.lastCollected)
        } catch (err) {
            alert("This save could not be pased");
        }
    }

    return <>
        <div className={cn("fixed inset-0 bg-opacity-0 z-50", blockingInput ? "block" : "hidden")} />
        <div className="min-h-screen flex flex-col text-white">
            <nav className="flex justify-between p-4 bg-gray-900 text-white">
                <h1 className="text-xl font-bold cursor-pointer" onClick={exit}>Casino Simulator</h1>
                <div className="flex gap-4">
                    <Home className="w-6 h-6 cursor-pointer" onClick={exit} />
                    <Gamepad2 className="w-6 h-6 cursor-pointer" />
                    <Download className="w-6 h-6 cursor-pointer" onClick={download}/>
                    <input type="file" id="import" className="hidden" onChange={load}></input>
                    <label className="cursor-pointer" htmlFor="import"><User className="w-6 h-6" /></label>
                </div>
            </nav>
            <main className="flex-grow">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Casino</h1>
                    <p>Money: ${NumberFormatter.formatText(money)}</p>

                    <Collect collectAmount={state.getCollectionValue()} lastCollected={lastCollected} collect={collect}></Collect>
                </div>
                <div>
                    {game ?
                        React.createElement<GameComponentProps>(game.component, { spendMoney, earnMoney, getMoney: () => money, blockInput, exit, className: "flex flex-grow flex-col text-center p-[2%] place-items-center" }) :
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 select-none px-[10%]">
                            {games.map((game, index) => (
                                <Card imageUrl={game.image} key={index} className="flex flex-col items-center p-4">
                                    <div className="text-4xl">{game.icon}</div>
                                    <CardContent className="text-center mt-2 font-semibold">{game.name}</CardContent>
                                    <Button className="mt-2" onClick={() => setGame(game)}>Play</Button>
                                </Card>
                            ))}
                        </div>
                    }
                </div>
            </main>
            <footer className="p-4 bg-gray-900 text-white text-center mt-4">
                <p>&copy; 2025 Casino Simulator. All rights reserved.</p>
            </footer>
        </div>
    </>
};

export default HomePage;
