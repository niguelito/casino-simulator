import React from "react";
import { Minefield } from "./MinesAlgorithm";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import bomb from "./assets/bomb.png";
import diamond from "./assets/diamond.png";

export interface MinefieldProps extends React.HTMLAttributes<HTMLDivElement> {
    minefield: Minefield;
    toggleMine: (x: number, y: number) => void;
    disabled: boolean;
}

export const MinefieldViewer: React.FC<MinefieldProps> = ({minefield, toggleMine, disabled, className, ...props}) => {
    return <div id="minefield" className={cn(className, "grid grid-rows-5 grid-cols-5 w-[50%] h-[50vw] gap-1")} {...props}>
        {(function() {
            const elems: React.JSX.Element[] = [];

            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    const mine = minefield[x][y];
                    elems.push(<Button key={(x*5)+y} variant={mine.revealed ? "primary" : "secondary"} disabled={disabled} onClick={() => { if (!mine.revealed) toggleMine(x, y); }}>
                        {mine.revealed ? 
                            <img className="w-[100%]" src={mine.safe ? diamond : bomb}></img> :
                            " "
                        }
                    </Button>);
                }
            }

            return elems;
        })()}
    </div>
}