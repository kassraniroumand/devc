import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SideBarTabProps {
  label: string;
  icon: string;
  active: boolean;
  tabClickHandler: () => void;
}

export function SideBarTab({ label, icon, active, tabClickHandler }: SideBarTabProps) {
  return (
    <button
      onClick={tabClickHandler}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-lg transition-all duration-200',
        'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50',
        active ? 'bg-white/20 scale-105' : ''
      )}
    >
      <Image
        src={icon}
        alt={label}
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <span className="text-xs font-medium text-center leading-tight">
        {label}
      </span>
    </button>
  );
}
