interface InputProps {
    type: string;
    placeholder: string;
    className?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
    type,
    placeholder,
    value,
    onChange,
    className
}: InputProps ) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border border-gray-500 p-2 rounded-lg text-white${className ? ` ${className}` : ""}`}
        />
    );
};