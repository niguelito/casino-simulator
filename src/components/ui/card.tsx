// Suggested code may be subject to a license. Learn more: ~LicenseLog:3656155694.
import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    imageUrl?: string; // New prop for the image URL
}

export const Card: React.FC<CardProps> = ({ children, className, imageUrl }) => {
    return (
        <div
            className={cn(
                "bg-gray-700 p-4 rounded-xl shadow-lg relative overflow-hidden h-100",
                className
            )}
        >
            {imageUrl && (
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        maskImage: "linear-gradient(to bottom, black, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                    }}
                />
            )}

            <div className="absolute z-10 bottom-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">{children}</div>
        </div>
    );
};

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
    return <div className={cn("mt-2", className)}>{children}</div>;
};