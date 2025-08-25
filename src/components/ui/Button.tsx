import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  isDisabled?: boolean;
  label?: string;
  variant?: 'action' | 'toggle';
  children?: React.ReactNode;
}

export function Button({
  isActive = false,
  isDisabled = false,
  className = '',
  onClick,
  label,
  variant = 'action',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isButtonDisabled = isDisabled || disabled;

  return (
    <button
      onClick={!isButtonDisabled ? onClick : undefined}
      disabled={isButtonDisabled}
      className={cn(
        'btn p-2 font-medium text-xs text-center rounded-lg hover:bg-secondary transition-colors',
        isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        variant === 'action' ? 'bg-primary text-white' : '',
        variant === 'toggle' && isActive ? 'bg-primary text-white' : '',
        variant === 'toggle' && !isActive ? 'bg-white text-black border border-gray-300' : '',
        className
      )}
      {...props}
    >
      {children || label}
    </button>
  );
}
