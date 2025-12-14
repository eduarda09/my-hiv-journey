import { useState } from "react";
import { NotificationCard } from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  mockPatientNotifications,
  PatientNotification,
} from "@/data/mockData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Plus,
  Pill,
  FileText,
  Calendar,
  Trash2,
  Clock,
  Repeat,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* =======================
   TIPOS
======================= */
interface RecurringNotification {
  id: number;
  type: string;
  title: string;
  times: string[];
  frequency?: string;
  date?: string;
  active: boolean;
  createdAt: string;
}

/* =======================
   COMPONENTE
======================= */
const Notificacoes = () => {
  const { toast } = useToast();

  /* ===== Notificações normais ===== */
  const [notifications, setNotifications] = useState<PatientNotification[]>(
    mockPatientNotifications
  );

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const readNotifications = notifications.filter((n) => n.isRead);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

    toast({
      title: "Notificação marcada como lida",
      description: "A notificação foi arquivada.",
    });
  };

  const handleAction = (url: string) => {
    toast({
      title: "Ação",
      description: `Navegando para ${url}`,
    });
  };

  /* ===== Notificações recorrentes ===== */
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [recurringNotifications, setRecurringNotifications] = useState<
    RecurringNotification[]
  >([
    {
      id: 1,
      type: "medicacao",
      title: "Antirretroviral",
      times: ["08:00", "20:00"],
      frequency: "daily",
      active: true,
      createdAt: "20/11/2024",
    },
  ]);

  const [newNotification, setNewNotification] = useState({
    type: "",
    title: "",
    frequency: "",
    date: "",
    times: [""],
  });

  const addTimeSlot = () => {
    if (newNotification.type !== "medicacao") return;
    setNewNotification((prev) => ({
      ...prev,
      times: [...prev.times, ""],
    }));
  };

  const removeTimeSlot = (index: number) => {
    setNewNotification((prev) => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index),
    }));
  };

  const updateTimeSlot = (index: number, value: string) => {
    setNewNotification((prev) => ({
      ...prev,
      times: prev.times.map((t, i) => (i === index ? value : t)),
    }));
  };

  const handleCreateNotification = () => {
    const isMedication = newNotification.type === "medicacao";
    const hasRequiredFields =
      newNotification.type &&
      newNotification.title &&
      newNotification.times.every((t) => t);
    const hasFrequencyOrDate = isMedication
      ? newNotification.frequency
      : newNotification.date;

    if (!hasRequiredFields || !hasFrequencyOrDate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const notification: RecurringNotification = {
      id: Date.now(),
      type: newNotification.type,
      title: newNotification.title,
      times: newNotification.times,
      ...(isMedication
        ? { frequency: newNotification.frequency }
        : { date: newNotification.date }),
      active: true,
      createdAt: new Date().toLocaleDateString("pt-BR"),
    };

    setRecurringNotifications((prev) => [notification, ...prev]);
    setNewNotification({ type: "", title: "", frequency: "", date: "", times: [""] });
    setIsDialogOpen(false);

    toast({
      title: "Notificação criada",
      description: "Lembrete configurado com sucesso.",
    });
  };

  const toggleNotification = (id: number) => {
    setRecurringNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, active: !n.active } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setRecurringNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "medicacao":
        return <Pill className="h-5 w-5" />;
      case "exame":
        return <FileText className="h-5 w-5" />;
      case "consulta":
        return <Calendar className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };
const unreadCount = notifications.filter(n => !n.isRead).length;

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="relative">
              {/* Ícone principal */}
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>

              {/* Badge */}
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1
                  w-5 h-5 bg-red-600 text-[#ffffff] text-xs font-bold
                  rounded-full flex items-center justify-center"
                >
                  {unreadCount}
                </span>
              )}
            </div>

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-critical text-critical-foreground text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Suas notificações</h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount > 0
                    ? `${unreadCount} ${unreadCount === 1 ? 'nova mensagem' : 'novas mensagens'}`
                  : 'Nenhuma mensagem pendente'
                }
              </p>
            </div>
          </div>
      </div>
      <main className="w-full px-6 space-y-10">

        {/* NOVAS */}
        {unreadNotifications.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">
              Novas
            </h2>
            <div className="space-y-3">
              {unreadNotifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onMarkAsRead={handleMarkAsRead}
                  onAction={handleAction}
                />
              ))}
            </div>
          </div>
        )}

        {/* ANTERIORES */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase">
              Anteriores
            </h2>
            <div className="space-y-3">
              {readNotifications.map((n) => (
                <NotificationCard
                  key={n.id}
                  notification={n}
                  onMarkAsRead={handleMarkAsRead}
                  onAction={handleAction}
                />
              ))}
            </div>
          </div>
        )}

        {/* =======================
            NOTIFICAÇÕES RECORRENTES
        ======================= */}
        <div className="border-t pt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase">
              <Repeat className="w-4 h-4" />
              Lembretes recorrentes
            </h2>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Novo
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar lembrete</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Tipo</Label>
                    <Select
                      value={newNotification.type}
                      onValueChange={(v) =>
                        setNewNotification((p) => ({ ...p, type: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="medicacao">Medicação</SelectItem>
                        <SelectItem value="exame">Exame</SelectItem>
                        <SelectItem value="consulta">Consulta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Título</Label>
                    <Input
                      value={newNotification.title}
                      onChange={(e) =>
                        setNewNotification((p) => ({
                          ...p,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>

                  {newNotification.type === "medicacao" ? (
                    <div>
                      <Label>Frequência</Label>
                      <Select
                        value={newNotification.frequency}
                        onValueChange={(v) =>
                          setNewNotification((p) => ({ ...p, frequency: v }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Diária</SelectItem>
                          <SelectItem value="weekly">Semanal</SelectItem>
                          <SelectItem value="monthly">Mensal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div>
                      <Label>Data</Label>
                      <Input
                        type="date"
                        value={newNotification.date}
                        onChange={(e) =>
                          setNewNotification((p) => ({
                            ...p,
                            date: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}

                  <Button className="w-full" onClick={handleCreateNotification}>
                    Criar lembrete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {recurringNotifications.map((n) => (
            <Card key={n.id} className="p-4">
              <div className="flex gap-4">
                <div className="p-3 rounded-xl bg-primary/20 text-primary">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{n.title}</h3>
                    <Badge>{n.active ? "Ativo" : "Inativo"}</Badge>
                  </div>

                  <div className="flex gap-2 mt-2">
                    {n.times.map((t, i) => (
                      <div key={i} className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {t}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => toggleNotification(n.id)}>
                      {n.active ? "Desativar" : "Ativar"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => deleteNotification(n.id)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notificacoes;
