import React, { useEffect, useRef } from "react"
import machine from "./assets/machine.png"
import seven from "./assets/seven.png";

export interface SlotMachineRendererProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
    slot1: string;
    slot2: string;
    slot3: string;
    message: string;
}

export const SlotMachineRenderer: React.FC<SlotMachineRendererProps> = ({ slot1, slot2, slot3, message, ...props }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    function render(context: CanvasRenderingContext2D, image: HTMLImageElement, seven: HTMLImageElement) {
        context.clearRect(0, 0, 1024, 1024);

        context.drawImage(image, 0, 0, 1024, 1024);

        var symbolSize = 90;

        context.font = symbolSize + "px Arial";
        context.textAlign = "center";
        context.fillStyle = "black";

        function drawSymbol(s: string, x: number, y: number) {
            switch (s) {
                case "7":
                    context.drawImage(seven, x - symbolSize / 2, y - symbolSize + 10, symbolSize, symbolSize);
                    break;
                
                default: context.fillText(s, x, y)
            }
        }

        var dx = 157;
        var y = 460
        drawSymbol(slot1, 512 - dx, y);
        drawSymbol(slot2, 512, y);
        drawSymbol(slot3, 512 + dx, y);

        context.font = "600 80px Arial";
        context.fillStyle = "white";
        context.fillText("Casino", 512, 762);
        context.fillText("Simulator", 512, 850);

        context.font = "600 70px Arial";
        context.fillText(message, 512, 185)
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                if (ctx) {
                    const image = new Image();
                    image.src = machine;
                    image.onload = () => {
                        const s = new Image();
                        s.src = seven;
                        s.onload = () => render(ctx, image, s);
                    }
                }
            }
        }
    }, [slot1, slot2, slot3, message]); 
    
    return <canvas ref={canvasRef} width="1024" height="1024" {...props}></canvas>
}