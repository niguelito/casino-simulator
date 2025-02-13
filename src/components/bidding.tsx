import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select } from "./ui/select";
import { cn } from "../lib/utils";

export interface BiddingComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    updateAmount: (n: number) => void;
    gamble: () => void;
    gambleText?: string;
    getMoney: () => number;
    disabled?: boolean;
}

export const BiddingComponent: React.FC<BiddingComponentProps> = ({updateAmount, gamble, gambleText = "Gamble!", getMoney, disabled = false, className, children, ...props}) => {
    const [gambleAmount, setgambleAmount] = useState(1);

    function setGambleAmount(n: number) {
        setgambleAmount(n);
        updateAmount(n);
    }

    return <div className={cn(className, "p-2")} {...props}>
        <Input type="number" className="w-40" value={gambleAmount} disabled={disabled} onChange={(e) => setGambleAmount(parseInt(e.target.value))}></Input>
        <br />
        <Button variant="secondary" className="m-2" onClick={() => setGambleAmount(getMoney())} disabled={disabled}>All In!</Button>
        <Button variant="primary" className="m-2" onClick={gamble} disabled={disabled}>{gambleText}</Button>
        <Select variant="secondary" className="m-2" disabled={disabled} onClick={(e) => setGambleAmount(Math.floor(getMoney() * parseFloat((e.target as HTMLSelectElement).value)))}>
            <option value="0.01">1%</option>
            <option value="0.05">5%</option>
            <option value="0.1">10%</option>
            <option value="0.2">20%</option>
            <option value="0.3">30%</option>
            <option value="0.4">40%</option>
            <option value="0.5">50%</option>
            <option value="0.6">60%</option>
            <option value="0.7">70%</option>
            <option value="0.8">80%</option>
            <option value="0.9">90%</option>
        </Select>
        <br />
        {children}
    </div>
}