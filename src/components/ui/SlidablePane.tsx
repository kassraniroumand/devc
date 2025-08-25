'use client';

import { useEffect, useState } from 'react';

interface SlidablePaneProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
  side?: 'left' | 'right';
}

export function SlidablePane({
  isOpen,
  onClose,
  children,
  width = '600px',
  side = 'right',
}: SlidablePaneProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Prevent body scroll when pane is open
      document.body.style.overflow = 'hidden';

      // Trigger animation after render
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 10);

      return () => clearTimeout(timer);
    } else {
      setIsAnimating(true);
      // Allow body scroll when pane is closed
      document.body.style.overflow = 'unset';

      // Hide after animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isVisible) return null;

  const translateValue = side === 'right' ? '100%' : '-100%';
  const slideTransform = isOpen && !isAnimating ? 'translateX(0)' : `translateX(${translateValue})`;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen && !isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Slidable Pane */}
      <div
        className={`fixed top-0 ${
          side === 'right' ? 'right-0' : 'left-0'
        } h-full bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out`}
        style={{
          width,
          transform: slideTransform,
        }}
      >
        {/* Content */}
        <div className="h-full flex flex-col">
          {children}
        </div>
      </div>
    </>
  );
}
