import React from "react";

interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant: 'primary' | 'secondary' | 'tertiary' | 'destructive';
    size: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<ButtonProps['variant'], string> = {
    primary: 'bg-white text-black rounded-lg hover:bg-gray-500 cursor-pointer',
    secondary: 'bg-gray-200 text-black rounded-lg',
    tertiary: 'bg-transparent text-black border border-gray-300 rounded-lg',
    destructive: 'bg-red-600 text-white rounded-lg',
};

const sizeStyles: Record<ButtonProps['size'], string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
    text,
    onClick,
    variant,
    size,
}) => {
    const className = `${variantStyles[variant]} ${sizeStyles[size]} font-medium focus:outline-none transition`;

    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
};