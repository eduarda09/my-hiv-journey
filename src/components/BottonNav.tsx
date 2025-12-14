import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Home, Calendar, Bell, MessageCircle, BarChart2 } from 'lucide-react';

interface BottonNavProps {
  unreadCount?: number;
  reminderCount?: number;
}

export const BottonNav = ({ unreadCount = 0, reminderCount = 0 }: BottonNavProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/registro', label: 'Registro', icon: Calendar },
    { path: '/lembretes', label: 'Lembretes', icon: Bell, badge: reminderCount },
    { path: '/notificacoes', label: 'Mensagens', icon: MessageCircle, badge: unreadCount },
    { path: '/graficos', label: 'Gráficos', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors relative",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-critical text-critical-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
