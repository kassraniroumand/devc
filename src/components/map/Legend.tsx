import { cn } from '@/lib/utils';

interface LegendItem {
  color: string;
  label: string;
  value?: string | number;
}

interface LegendProps {
  items: LegendItem[];
  title?: string;
  className?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function Legend({
  items,
  title,
  className,
  position = 'bottom-right'
}: LegendProps) {
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div className={cn(
      'absolute z-10 bg-white rounded-lg shadow-lg border p-3',
      'min-w-[200px] max-w-[300px]',
      positionClasses[position],
      className
    )}>
      {title && (
        <h3 className="font-semibold text-sm text-gray-900 mb-2 border-b pb-1">
          {title}
        </h3>
      )}

      <div className="space-y-1">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 flex-1">{item.label}</span>
            {item.value && (
              <span className="text-gray-600 font-medium">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
