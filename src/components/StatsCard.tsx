import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export const StatsCard = ({ title, value, subtitle, icon, trend, className }: StatsCardProps) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-critical',
    neutral: 'text-muted-foreground',
  };

  return (
    <div className={cn(
      "bg-card rounded-lg p-4 shadow-card border border-border/50",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {subtitle && (
            <p className={cn("text-xs mt-0.5", trend ? trendColors[trend] : "text-muted-foreground")}>
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div className="text-primary">{icon}</div>
        )}
      </div>
    </div>
  );
};
