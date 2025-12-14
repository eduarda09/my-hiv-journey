import { Alert, formatRelativeTime, getRoleLabel } from '@/data/mockData';
import { SeverityBadge } from './SeverityBadge';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
  onAction?: (alertId: string, action: 'contact' | 'resolve' | 'assign') => void;
  className?: string;
}

export const AlertCard = ({ alert, onAction, className }: AlertCardProps) => {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-4 shadow-card border border-border/50 hover:shadow-elevated transition-all duration-200",
        alert.severity === 'critical' && alert.status === 'pending' && "border-l-4 border-l-critical",
        alert.severity === 'attention' && alert.status === 'pending' && "border-l-4 border-l-warning",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <SeverityBadge severity={alert.severity} showPulse={alert.status === 'pending'} />
            <StatusBadge status={alert.status} />
          </div>

          <h3 className="font-semibold text-foreground mb-1 truncate">{alert.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-medium text-foreground">{alert.patientName}</span>
            <span className="mx-2">•</span>
            {formatRelativeTime(alert.createdAt)}
          </p>

          <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

          <div className="bg-secondary/50 rounded-md p-3 mb-3">
            <p className="text-xs font-medium text-secondary-foreground mb-1">Recomendação:</p>
            <p className="text-sm text-foreground">{alert.recommendation}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Responsáveis:</span>
            {alert.assignedTo.map((role) => (
              <span
                key={role}
                className="text-xs bg-accent px-2 py-0.5 rounded-full text-accent-foreground"
              >
                {getRoleLabel(role)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {alert.status !== 'resolved' && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Button
            size="sm"
            variant="default"
            onClick={() => onAction?.(alert.id, 'contact')}
            className="flex-1"
          >
            Contatar paciente
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAction?.(alert.id, 'resolve')}
          >
            Marcar como resolvido
          </Button>
        </div>
      )}
    </div>
  );
};
