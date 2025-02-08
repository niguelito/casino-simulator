import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    className,
    disabled,
    onClick,
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-bold transition";
    const extraStyles = disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    const variantStyles =
        variant === "primary"
            ? "bg-yellow-500 text-black hover:bg-yellow-600"
            : "bg-gray-600 text-white hover:bg-gray-700";

    return (
        <button className={cn(baseStyles, variantStyles, extraStyles, className)} disabled={disabled} onClick={onClick} {...props}>
            {children}
        </button>
    );
};
