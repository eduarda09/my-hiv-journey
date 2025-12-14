import { cn } from '@/lib/utils';
import { AlertStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: AlertStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium";

  const statusStyles = {
    pending: "bg-muted text-muted-foreground",
    in_progress: "bg-info/10 text-info border border-info/20",
    resolved: "bg-success/10 text-success border border-success/20",
  };

  const labels = {
    pending: 'Pendente',
    in_progress: 'Em andamento',
    resolved: 'Resolvido',
  };

  const icons = {
    pending: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="10" strokeWidth="2" />
      </svg>
    ),
    in_progress: (
      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    resolved: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
  };

  return (
    <span className={cn(baseStyles, statusStyles[status], className)}>
      {icons[status]}
      {labels[status]}
    </span>
  );
};
