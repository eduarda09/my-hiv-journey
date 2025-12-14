import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AlertCard } from '@/components/AlertCard';
import { PatientListItem } from '@/components/PatientListItem';
import { SeverityBadge } from '@/components/SeverityBadge';
import { StatsCard } from '@/components/StatsCard';
import {
  mockAlerts,
  mockPatients,
  Alert,
  AlertSeverity,
  AlertStatus,
  formatRelativeTime
} from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import {
  AlertTriangle,
  Users,
  Bell,
  CheckCircle,
  Filter,
  ArrowLeft,
  Clock,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProfissionalDashboard = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [selectedSeverity, setSelectedSeverity] = useState<AlertSeverity | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<AlertStatus | 'all'>('all');

  // Stats
  const stats = useMemo(() => {
    const critical = alerts.filter(a => a.severity === 'critical' && a.status !== 'resolved').length;
    const attention = alerts.filter(a => a.severity === 'attention' && a.status !== 'resolved').length;
    const resolved = alerts.filter(a => a.status === 'resolved').length;
    const pending = alerts.filter(a => a.status === 'pending').length;
    return { critical, attention, resolved, pending };
  }, [alerts]);

  // Filtered alerts
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      if (selectedSeverity !== 'all' && alert.severity !== selectedSeverity) return false;
      if (selectedStatus !== 'all' && alert.status !== selectedStatus) return false;
      return true;
    }).sort((a, b) => {
      // Sort by severity first (critical > attention > info), then by date
      const severityOrder = { critical: 0, attention: 1, info: 2 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [alerts, selectedSeverity, selectedStatus]);

  // High risk patients
  const highRiskPatients = mockPatients.filter(p => p.riskLevel === 'high');

  const handleAlertAction = (alertId: string, action: 'contact' | 'resolve' | 'assign') => {
    if (action === 'contact') {
      toast({
        title: "Contato iniciado",
        description: "O paciente será contatado pela equipe de enfermagem.",
      });
    } else if (action === 'resolve') {
      setAlerts(prev =>
        prev.map(a => a.id === alertId ? { ...a, status: 'resolved' as AlertStatus, updatedAt: new Date().toISOString() } : a)
      );
      toast({
        title: "Alerta resolvido",
        description: "O alerta foi marcado como resolvido e o paciente será notificado.",
      });
    }
  };

  const severityFilters: { value: AlertSeverity | 'all'; label: string }[] = [
    { value: 'all', label: 'Todos' },
    { value: 'critical', label: 'Críticos' },
    { value: 'attention', label: 'Atenção' },
    { value: 'info', label: 'Informativos' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Painel do Profissional</h1>
                <p className="text-xs text-muted-foreground">Sistema de Monitoramento de Alertas</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right mr-2">
              <p className="text-sm font-medium text-foreground">Hospital São José</p>
              <p className="text-xs text-muted-foreground">Unidade Médica</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold">
              SJ
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Alertas Críticos"
            value={stats.critical}
            subtitle="Requerem ação imediata"
            icon={<AlertTriangle className="w-5 h-5 text-critical" />}
            className={stats.critical > 0 ? "border-critical/30 bg-critical/5" : ""}
          />
          <StatsCard
            title="Atenção"
            value={stats.attention}
            subtitle="Acompanhamento necessário"
            icon={<Bell className="w-5 h-5 text-warning" />}
          />
          <StatsCard
            title="Pendentes"
            value={stats.pending}
            subtitle="Aguardando ação"
            icon={<Clock className="w-5 h-5 text-info" />}
          />
          <StatsCard
            title="Resolvidos Hoje"
            value={stats.resolved}
            subtitle="Alertas finalizados"
            icon={<CheckCircle className="w-5 h-5 text-success" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts Column */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Alertas Ativos
              </h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <div className="flex gap-1">
                  {severityFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => setSelectedSeverity(filter.value)}
                      className={cn(
                        "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                        selectedSeverity === filter.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Alert List */}
            <div className="space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <AlertCard
                      alert={alert}
                      onAction={handleAlertAction}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card rounded-lg border border-border/50">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-success" />
                  <h3 className="font-semibold text-foreground mb-1">Nenhum alerta encontrado</h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os alertas foram resolvidos ou não há alertas com os filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* High Risk Patients */}
            <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Pacientes de Alto Risco
              </h3>
              <div className="space-y-1">
                {highRiskPatients.length > 0 ? (
                  highRiskPatients.map((patient) => (
                    <PatientListItem
                      key={patient.id}
                      patient={patient}
                      onClick={(id) => {
                        toast({
                          title: "Detalhes do paciente",
                          description: `Abrindo ficha de ${patient.name}`,
                        });
                      }}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum paciente de alto risco no momento.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Ações Rápidas</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Função em desenvolvimento" })}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Enviar lembrete em massa
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Função em desenvolvimento" })}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Ver todos os pacientes
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => toast({ title: "Função em desenvolvimento" })}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Relatório de adesão
                </Button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-success mt-1.5"></div>
                  <div>
                    <p className="text-foreground">Alerta de Maria resolvido</p>
                    <p className="text-xs text-muted-foreground">Há 30 min</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-critical mt-1.5"></div>
                  <div>
                    <p className="text-foreground">Novo alerta crítico: Pedro</p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-info mt-1.5"></div>
                  <div>
                    <p className="text-foreground">Contato realizado com João</p>
                    <p className="text-xs text-muted-foreground">Há 3 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfissionalDashboard;
