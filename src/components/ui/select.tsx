import React from "react";
import { cn } from "../../lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    variant?: "primary" | "secondary";
}

export const Select: React.FC<SelectProps> = ({
    variant = "primary",
    className,
    children,
    disabled,
    onChange,
    ...props
}) => {
    const baseStyles = "px-4 py-1 rounded-md border-2 font-bold transition";
    const extraStyles = disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    const variantStyles =
        variant === "primary"
            ? "bg-yellow-500 text-black hover:bg-yellow-600 border-yellow-800 border-4"
            : "bg-gray-600 text-white hover:bg-gray-700 border-gray-800 border-4";

    return (
        <select className={cn(baseStyles, variantStyles, extraStyles, className)} disabled={disabled} onChange={onChange} {...props}>
            {children}
        </select>
    );
};
