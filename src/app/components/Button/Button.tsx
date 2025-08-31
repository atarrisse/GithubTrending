import type { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary';
    onClick: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ 
    children, 
    className = '',
    variant = 'primary', 
    onClick, 
    ...props
}: ButtonProps) => {
    const baseClasses = "px-4 py-2 font-medium rounded-lg transition-colors duration-200 cursor-pointer";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200"
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

    return (
        <button
            onClick={onClick}
            className={combinedClasses}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
