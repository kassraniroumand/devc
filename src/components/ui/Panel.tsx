import { cn } from '@/lib/utils';
import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  isVisible?: boolean;
}

export function Panel({ children, className, title, isVisible = true }: PanelProps) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-lg border border-gray-200',
      'overflow-hidden',
      className
    )}>
      {title && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
