import { cn } from '@/lib/utils';
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function TextArea({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}: TextAreaProps) {
  const textAreaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textAreaId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        className={cn(
          'px-3 py-2 border border-gray-300 rounded-md shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          'disabled:bg-gray-50 disabled:text-gray-500',
          'resize-vertical min-h-[80px]',
          error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : '',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-600">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-sm text-gray-500">{helperText}</span>
      )}
    </div>
  );
}
