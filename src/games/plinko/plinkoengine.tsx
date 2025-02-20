import { Engine, Render, World, Bodies, Events, Runner, Body } from "matter-js";
import React, { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";
import b0 from "./assets/0.png";
import b02b from "./assets/02b.png";
import b02d from "./assets/02d.png";
import b2 from "./assets/2.png";
import b4 from "./assets/4.png";
import b9 from "./assets/9.png";
import b26 from "./assets/26.png";
import BigNumber from "bignumber.js";

export interface PlinkoEngineProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
    onResult: (multiplier: number, bidAmount: BigNumber) => void;
}

export interface PlinkoEngineRunner {
    addBall(bid: BigNumber): void;
}


export const PlinkoEngine = memo(forwardRef<PlinkoEngineRunner, PlinkoEngineProps>(({ onResult, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [engine, setEngine] = useState<Engine | null>(null);

    const multipliers = [26, 9, 4, 2, 0.2, 0.2, 0, 0, 0, 0.2, 0.2, 2, 4, 9, 26];
    const colors = [b26, b9, b4, b2, b02d, b02b, b0, b0, b0, b02b, b02d, b2, b4, b9, b26];

    const ballCollision = 0x001;
    const pegsCollision = 0x002;
    const worldCollision = 0x003;

    function generateX(): number {
        while (true) {
            const randomNumber = Math.floor(Math.random() * 201) + 400;
            const distanceFromCenter = Math.abs(randomNumber - 500);
            const probability = Math.exp(-distanceFromCenter / 30);

            if (Math.random() < probability) {
                return randomNumber;
            }
        }
    }

    // function generateWall(): number {
    //     while (true) {
    //         var n = 450;
    //         const randomNumber = Math.floor(Math.random() * n);
    //         const distanceFromCenter = Math.abs(randomNumber - n);
    //         const probability = Math.exp(-distanceFromCenter / 5);

    //         if (Math.random() < probability) {
    //             return randomNumber;
    //         }
    //     }
    // }

    useImperativeHandle(ref, () => ({
        addBall(bid: BigNumber) {
            if (!engine) return;
            const a = `ball-${bid.toString()}`;
            console.log(a);
            const ball = Bodies.circle(generateX(), 0, 10, { collisionFilter: { group: ballCollision, mask: pegsCollision | worldCollision }, restitution: 0.3, friction: 7, isStatic: false, label: a });
            World.add(engine.world, ball);
        }
    }));

    useEffect(() => {
        const engine = Engine.create();
        const render = Render.create({
            canvas: canvasRef.current as HTMLCanvasElement,
            engine,
            options: { width: 1000, height: 1000, wireframes: false }
        });
        const runner = Runner.create();

        setEngine(engine);

        // Create pegs in a triangular formation
        const pegs = [];
        const minCols = 3;
        const maxCols = 17;
        const spacing = 50;
        const pinSize = 8;

        for (let l = minCols; l < maxCols; l++) {
            const linePins = minCols + l;
            const lineWidth = linePins * spacing;
            for (let i = 0; i < linePins; i++) {
                const pin = Bodies.circle(
                    500 - lineWidth / 2 + i * spacing + 30,
                    -50 + l * spacing,
                    pinSize,
                    {
                        render: { fillStyle: "white" },
                        isStatic: true,
                        friction: 1,
                        collisionFilter: { group: pegsCollision },
                        label: "peg"
                    }
                );
                pegs.push(pin);
            }
        }

        // Create walls
        const r = 40;
        const walls = [
            Bodies.rectangle(500, 1000, 1000, 60, { isStatic: true, render: { visible: false }, collisionFilter: { group: worldCollision } }),
            Bodies.rectangle(0, 500, r, 1000, { isStatic: true, render: { visible: false }, collisionFilter: { group: worldCollision } }),
            Bodies.rectangle(1000, 500, r, 1000, { isStatic: true, render: { visible: false }, collisionFilter: { group: worldCollision } })
        ];

        // Create bins
        const bins = [];
        const binSpacing = 10;
        const margin = 30;
        const binWidth = 53;
        const binHeight = 50;
        for (let i = 0; i < multipliers.length; i++) {
            bins.push(Bodies.rectangle(
                margin + i * (binWidth + binSpacing) + binWidth / 2,
                950 - binHeight - binSpacing,
                binWidth, binHeight,
                { render: { visible: true, sprite: { texture: colors[i], xScale: 0.35, yScale: 0.35 } }, isStatic: true, label: `bin-${multipliers[i]}` }
            ));
        }

        World.add(engine.world, [...pegs, ...walls, ...bins]);
        Runner.run(runner, engine);
        Render.run(render);

        Events.on(engine, "collisionStart", (event) => {
            for (let i = 0; i < event.pairs.length; i++) {
                const pair = event.pairs[i];
                if (pair.bodyA.label.startsWith("ball") || pair.bodyB.label.startsWith("ball")) {
                    if (pair.bodyA.label.startsWith("bin") || pair.bodyB.label.startsWith("bin")) {
                        const ball = pair.bodyA.label.startsWith("ball") ? pair.bodyA : pair.bodyB;
                        const bin = pair.bodyA.label.startsWith("bin") ? pair.bodyA : pair.bodyB;
                        const bid = new BigNumber(ball.label.split("-")[1]);
                        const multiplier = parseFloat(bin.label.split("-")[1]);
                        onResult(multiplier, bid);
                        World.remove(engine.world, ball);
                    }
                }
            }
        });

        Events.on(engine, "afterTick", (e) => {
            World.allBodies(engine.world).forEach(body => {
                if (body.label.startsWith("ball")) {
                    const force = body.position.x <= 500 ? 50000 : -50000;

                    Body.applyForce(body, { x: 500, y: 500 }, { x: force, y: 0 })
                }
            })
        })

        return () => {
            Render.stop(render);
            World.clear(engine.world, false);
            Engine.clear(engine);
        };
    }, [true]);

    return <canvas ref={canvasRef} {...props} />;
}));