import React from "react";
import { BingoCardData, BingoData } from "./BingoAlgorithm";
import marker from "./assets/marker.png";
import { cn } from "../../lib/utils";

interface BingoCardProps extends React.HTMLProps<HTMLDivElement> {
    card: BingoCardData;
    marked: BingoData;
    onMark: (x: number, y: number) => void;
    disabled: boolean;
}

export const BingoCardRenderer: React.FC<BingoCardProps> = ({ card, marked, onMark, disabled, className, ...props }) => {
    return (
        <div className={cn("grid grid-cols-5 grid-rows-5 gap-1", className)} {...props}>
            {card.map((row, x) =>
                row.map((num, y) => (
                    <div
                        key={`${x}-${y}`}
                        className={cn(
                            "relative w-full aspect-square flex items-center justify-center text-black font-bold text-xl border-2 border-gray-300 bg-white cursor-pointer",
                            disabled ? "pointer-events-none opacity-50" : "hover:bg-blue-100",
                            marked[x][y] ? "bg-green-300" : undefined
                        )}
                        onClick={() => !disabled && onMark(x, y)}
                    >
                        {num}
                        {marked[x][y] && (
                            <img src={marker} alt="Marked" className="absolute top-0 left-0 w-full h-full object-contain" />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
