import React, { useEffect, useRef, useState } from "react";
import { ScratchCardData } from "./ScratchAlgorithm";
import scratch from "./assets/scratch.jpg";
import cube from "./assets/cube.jpeg";
import { cn } from "../../lib/utils";
import ScratchCard from 'lesca-react-scratch-card';
import "./cheat.css";

export interface ScratchCard extends React.HTMLProps<HTMLDivElement> {
    card: ScratchCardData,
    onReveal: (x: number, y: number) => void;
    disabled: boolean;
}

export const ScratchCardRenderer: React.FC<ScratchCard> = ({ card, onReveal, disabled, className, ...props }) => {    
    const divRef = useRef<HTMLDivElement | null>(null);

    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);
    const [resizeKey, setResizeKey] = useState(0); // Key to force remount

    useEffect(() => {
        const updateSize = () => {
            if (divRef.current) {
                const { width, height } = divRef.current.getBoundingClientRect();
                setWidth(width / 3 + 1);
                setHeight(height / 3 + 1);
                setResizeKey((prev) => prev + 1); // Change key to force full reload
            }
        };

        window.addEventListener("resize", updateSize);
        updateSize(); // Set initial size on mount

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    return (
        <div key={resizeKey} style={{ backgroundImage: `url(${scratch})` }} className={cn("bg-cover relative", className)} {...props}>
            <div className={cn("w-[100%] h-[100%] z-50 absolute bg-[rgba(0,0,0,0.5)]", disabled ? "block" : "hidden")}></div>
            <div ref={divRef} className="w-[76%] h-[49%] absolute top-[39.5%] left-[12%] grid grid-cols-3 grid-rows-3 place-items-center text-black relative">
                {(function() {
                    const elems: React.JSX.Element[] = [];

                    for (let x = 0; x < card.length; x++) {
                        for (let y = 0; y < card[x].length; y++) {
                            elems.push(<ScratchCard width={width} height={height} key={`${x}-${y}`} cover={cube} percent={30} onComplete={() => onReveal(x, y)}>
                                <p className="scratch-text">{card[x][y]}x</p>
                            </ScratchCard>);
                        }
                    }

                    return elems;
                })()}
            </div>
        </div>
    );
};
