import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Gamepad2, Home, Info, User } from "lucide-react";
import { Game, GameComponentProps } from "./game";
import React, { useState } from "react";
import { State, Storage } from "./State";
import { Collect } from "./components/collection";
import { cn } from "./lib/utils";
import NumberFormatter from "./lib/NumberFormatter";


const HomePage: React.FC<{ games: Game[], state: State }> = ({ games, state }) => {
    const [game, setGame] = useState<Game | null>(null)
    const [money, setmoney] = useState<number>(state.money);
    const [lastCollected, setLastCollected] = useState<number>(state.lastCollected);
    const [blockingInput, setBlockInput] = useState(false);

    function setMoney(n: number) {
        setmoney(n);
    }

    function exit() {
        setGame(null);
        save();
    }

    function save(s = new State(money, lastCollected)) {
        console.log(s);
        Storage.save(s);
    }

    function collect() {
        var l = Date.now() + state.getCollectionInterval();
        var s = money + state.getCollectionValue();
        setLastCollected(l);
        setMoney(s);
        save(new State(s, l));
        return l;
    }

    function blockInput(bl: boolean) {
        setBlockInput(bl);
        document.body.style.overflow = bl ? "hidden" : "auto";
    }

    return <>
        <div className={cn("fixed inset-0 bg-opacity-0 z-50", blockingInput ? "block" : "hidden")} />
        <div className="min-h-screen flex flex-col text-white">
            <nav className="flex justify-between p-4 bg-gray-900 text-white">
                <h1 className="text-xl font-bold" onClick={exit}>Casino Simulator</h1>
                <div className="flex gap-4">
                    <Home className="w-6 h-6" onClick={exit} />
                    <Gamepad2 className="w-6 h-6" />
                    <Info className="w-6 h-6" />
                    <User className="w-6 h-6" />
                </div>
            </nav>
            <main className="flex-grow">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Casino</h1>
                    <p>Money: ${NumberFormatter.formatText(money)}</p>

                    <Collect lastCollected={lastCollected} collect={collect}></Collect>
                </div>
                <div>
                    {game ?
                        React.createElement<GameComponentProps>(game.component, { setMoney, getMoney: () => money, blockInput, exit, save, className: "flex-grow text-center p-[2%] place-items-center" }) :
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 select-none px-[10%]">
                            {games.map((game, index) => (
                                <Card key={index} className="flex flex-col items-center p-4">
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
