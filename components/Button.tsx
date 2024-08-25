import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    loading?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, loading = false, disabled = false, ...props }) => {
    return (
        <button
            onClick={!disabled && !loading ? onClick : undefined}
            disabled={disabled || loading}
            className={`p-2 rounded text-white 
                        ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-secondary'} 
                        transition duration-200 ease-in-out`}
            {...props}
        >
            {loading ? 'Loading...' : label}
        </button>
    );
};

export default Button;