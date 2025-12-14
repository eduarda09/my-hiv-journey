import { cn } from '@/lib/utils';
import { AlertSeverity } from '@/data/mockData';

interface SeverityBadgeProps {
  severity: AlertSeverity;
  className?: string;
  showPulse?: boolean;
}

export const SeverityBadge = ({ severity, className, showPulse = false }: SeverityBadgeProps) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold";

  const severityStyles = {
    critical: "bg-critical/10 text-critical border border-critical/20",
    attention: "bg-warning/10 text-warning border border-warning/20",
    info: "bg-success/10 text-success border border-success/20",
  };

  const labels = {
    critical: 'Crítico',
    attention: 'Atenção',
    info: 'Informativo',
  };

  return (
    <span className={cn(baseStyles, severityStyles[severity], className)}>
      {showPulse && severity === 'critical' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-critical opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-critical"></span>
        </span>
      )}
      {labels[severity]}
    </span>
  );
};
