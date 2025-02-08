import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export interface CollectionProps {
    lastCollected: number;
    collect: () => number;
}

export const Collect: React.FC<CollectionProps> = ({ ...props }) => {
    const [lastCollected, setLastCollected] = useState<number>(props.lastCollected);
    const [parsedDate, setParsedDate] = useState("never");

    useEffect(() => {
        const intervalId = setInterval(() => {
            var time = new Date(Date.now() - lastCollected);
            var seconds = time.getUTCSeconds();
            var minutes = time.getUTCMinutes();
            var hours = time.getUTCHours();
            setParsedDate(`${23 - hours}:${59 - minutes}:${60 - seconds}`)
        }, 1000);
      
        return () => clearInterval(intervalId);
    }, [lastCollected, parsedDate])

    return (<>
        <Button onClick={() => setLastCollected(props.collect())} variant={lastCollected < Date.now() ? "primary" : 'secondary'} disabled={lastCollected > Date.now()}>Collect{lastCollected > Date.now() ? "" : "$1000"}</Button>
        <p hidden={lastCollected < Date.now()}>Next Collect: {parsedDate}</p>
    </>)
}