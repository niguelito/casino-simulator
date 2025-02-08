import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: "primary" | "secondary";
}

export const Input: React.FC<InputProps> = ({
    children,
    variant = "primary",
    className,
    type = "text",
    disabled,
    onChange,
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-md border-2 font-bold transition";
    const extraStyles = disabled ? "cursor-not-allowed opacity-50" : "cursor-text"
    const variantStyles =
        variant === "primary"
            ? "bg-yellow-500 text-black hover:bg-yellow-600 border-yellow-800 border-4"
            : "bg-gray-600 text-white hover:bg-gray-700 border-gray-800 border-4";

    return (
        <input type={type} className={cn(baseStyles, variantStyles, extraStyles, className)} disabled={disabled} onChange={onChange} {...props} />
    );
};
