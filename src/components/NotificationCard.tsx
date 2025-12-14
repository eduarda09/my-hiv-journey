import { PatientNotification, formatRelativeTime, getNotificationIcon } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationCardProps {
  notification: PatientNotification;
  onMarkAsRead?: (id: string) => void;
  onAction?: (url: string) => void;
  className?: string;
}

export const NotificationCard = ({ notification, onMarkAsRead, onAction, className }: NotificationCardProps) => {
  const typeStyles = {
    support: "border-l-info",
    reminder: "border-l-warning",
    achievement: "border-l-success",
    appointment: "border-l-primary",
  };

  return (
    <div
      className={cn(
        "bg-card rounded-lg p-4 shadow-card border border-border/50 border-l-4 transition-all duration-200",
        typeStyles[notification.type],
        !notification.isRead && "bg-secondary/30",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{getNotificationIcon(notification.type)}</span>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={cn(
              "font-semibold text-foreground",
              !notification.isRead && "text-primary"
            )}>
              {notification.title}
            </h3>
            {!notification.isRead && (
              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2"></span>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(notification.createdAt)}
            </span>

            <div className="flex items-center gap-2">
              {!notification.isRead && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead?.(notification.id)}
                  className="text-xs h-7 px-2"
                >
                  Marcar como lida
                </Button>
              )}
              {notification.actionLabel && notification.actionUrl && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction?.(notification.actionUrl!)}
                  className="text-xs h-7"
                >
                  {notification.actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
