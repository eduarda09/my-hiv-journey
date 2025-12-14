// Mock data for the notification system prototype

export type AlertSeverity = 'critical' | 'attention' | 'info';
export type AlertStatus = 'pending' | 'in_progress' | 'resolved';
export type ProfessionalRole = 'medico' | 'enfermeiro' | 'psicologo' | 'assistente_social';
export type EventType = 'humor' | 'medicacao' | 'sintoma' | 'exame';

export interface Patient {
  id: string;
  name: string;
  avatar?: string;
  age: number;
  lastActivity: string;
  adherenceRate: number;
  consecutiveDays: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface HealthProfessional {
  id: string;
  name: string;
  role: ProfessionalRole;
  avatar?: string;
}

export interface PatientEvent {
  id: string;
  patientId: string;
  type: EventType;
  value: number | string;
  description: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  eventId: string;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  recommendation: string;
  assignedTo: ProfessionalRole[];
  createdAt: string;
  updatedAt: string;
}

export interface PatientNotification {
  id: string;
  patientId: string;
  title: string;
  message: string;
  type: 'support' | 'reminder' | 'achievement' | 'appointment';
  isRead: boolean;
  createdAt: string;
  actionLabel?: string;
  actionUrl?: string;
}

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'Pedro Silva',
    age: 32,
    lastActivity: '2024-01-15T10:30:00',
    adherenceRate: 45,
    consecutiveDays: 0,
    riskLevel: 'high',
  },
  {
    id: 'p2',
    name: 'Maria Santos',
    age: 28,
    lastActivity: '2024-01-15T08:00:00',
    adherenceRate: 92,
    consecutiveDays: 45,
    riskLevel: 'low',
  },
  {
    id: 'p3',
    name: 'João Oliveira',
    age: 45,
    lastActivity: '2024-01-14T20:00:00',
    adherenceRate: 78,
    consecutiveDays: 12,
    riskLevel: 'medium',
  },

];

// Mock Health Professionals
export const mockProfessionals: HealthProfessional[] = [
  { id: 'h1', name: 'Dra. Carla Mendes', role: 'medico' },
  { id: 'h2', name: 'Enf. Roberto Lima', role: 'enfermeiro' },
  { id: 'h3', name: 'Psic. Fernanda Alves', role: 'psicologo' },
  { id: 'h4', name: 'A.S. Marcos Souza', role: 'assistente_social' },
];

// Mock Alerts for Health Professionals
export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'Pedro Silva',
    eventId: 'e1',
    severity: 'critical',
    status: 'pending',
    title: '3 dias sem medicação TARV',
    description: 'Paciente não registrou uso de medicação nos últimos 3 dias. Risco de abandono de tratamento.',
    recommendation: 'Contato imediato para verificar situação. Avaliar necessidade de atendimento presencial.',
    assignedTo: ['medico', 'enfermeiro'],
    createdAt: '2025-12-08T08:00:00',
    updatedAt: '2025-12-12T08:00:00',
  },
  {
    id: 'a2',
    patientId: 'p1',
    patientName: 'Pedro Silva',
    eventId: 'e2',
    severity: 'attention',
    status: 'pending',
    title: 'Humor persistentemente baixo',
    description: 'Paciente registrou humor = 1 por 3 dias consecutivos. Relatou: "tô sem energia pra nada".',
    recommendation: 'Agendar conversa com psicólogo. Avaliar necessidade de suporte emocional.',
    assignedTo: ['psicologo', 'assistente_social'],
    createdAt: '2025-12-09T07:30:00',
    updatedAt: '2025-12-10T07:30:00',
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'João Oliveira',
    eventId: 'e3',
    severity: 'critical',
    status: 'in_progress',
    title: 'Carga viral detectável',
    description: 'Último exame mostrou carga viral detectável após 8 meses indetectável.',
    recommendation: 'Retorno urgente para revisão do plano de tratamento. Verificar adesão e possíveis resistências.',
    assignedTo: ['medico', 'enfermeiro'],
    createdAt: '2025-12-12T15:00:00',
    updatedAt: '2025-12-11T09:00:00',
  },
  {
    id: 'a4',
    patientId: 'p2',
    patientName: 'Maria Santos',
    eventId: 'e4',
    severity: 'info',
    status: 'resolved',
    title: 'Excelente adesão ao tratamento',
    description: 'Paciente completou 45 dias consecutivos de medicação. Carga viral indetectável.',
    recommendation: 'Enviar mensagem de incentivo e parabenização.',
    assignedTo: ['enfermeiro'],
    createdAt: '2025-12-11T06:00:00',
    updatedAt: '2025-12-10T06:30:00',
  },

];

// Mock Notifications for Patients
export const mockPatientNotifications: PatientNotification[] = [
  {
    id: 'n1',
    patientId: 'p1',
    title: 'Estamos aqui para você',
    message: 'Notamos que você não está se sentindo bem. Sua equipe de saúde está aqui para te apoiar. Entre em contato com a equipe médica.',
    type: 'support',
    isRead: false,
    createdAt: '2025-12-12T09:00:00',
  },
  {
    id: 'n2',
    patientId: 'p1',
    title: 'Lembrete de medicação',
    message: 'Não esqueça de tomar sua medicação hoje. Manter a regularidade é importante para o sucesso do tratamento.',
    type: 'reminder',
    isRead: false,
    createdAt: '2025-12-13T08:00:00',
  },
  {
    id: 'n3',
    patientId: 'p2',
    title: 'Parabéns pela sua dedicação!',
    message: 'Você completou 45 dias seguidos de adesão ao tratamento! Continue assim, você está no caminho certo.',
    type: 'achievement',
    isRead: true,
    createdAt: '2025-12-11T06:30:00',
  },
  {
    id: 'n4',
    patientId: 'p3',
    title: 'Consulta agendada',
    message: 'Você tem uma consulta agendada para amanhã às 14:00 com a Dra. Carla Mendes. Lembre-se de trazer seus últimos exames.',
    type: 'appointment',
    isRead: false,
    createdAt: '2025-12-13T16:00:00',

  },
  {
    id: 'n5',
    patientId: 'p1',
    title: 'Como você está hoje?',
    message: 'Gostaríamos de saber como você está se sentindo. Registre seu humor e sintomas para que possamos acompanhar seu bem-estar.',
    type: 'reminder',
    isRead: true,
    createdAt: '2025-12-11T10:00:00',

  },
];

// Classification rules for events
export const classificationRules = {
  humor: [
    { condition: (value: number) => value <= 1, severity: 'attention' as AlertSeverity, message: 'Humor muito baixo detectado' },
    { condition: (value: number) => value === 5, severity: 'info' as AlertSeverity, message: 'Paciente em ótimo estado emocional' },
  ],
  medicacao: [
    { condition: (days: number) => days >= 3, severity: 'critical' as AlertSeverity, message: 'Múltiplos dias sem medicação' },
    { condition: (days: number) => days >= 1, severity: 'attention' as AlertSeverity, message: 'Medicação não tomada' },
  ],
  exame: [
    { condition: (result: string) => result === 'detectavel', severity: 'critical' as AlertSeverity, message: 'Carga viral detectável' },
    { condition: (result: string) => result === 'indetectavel', severity: 'info' as AlertSeverity, message: 'Carga viral indetectável' },
  ],
};

// Helper functions
export const getSeverityColor = (severity: AlertSeverity) => {
  switch (severity) {
    case 'critical':
      return 'critical';
    case 'attention':
      return 'warning';
    case 'info':
      return 'success';
    default:
      return 'muted';
  }
};

export const getSeverityLabel = (severity: AlertSeverity) => {
  switch (severity) {
    case 'critical':
      return 'Crítico';
    case 'attention':
      return 'Atenção';
    case 'info':
      return 'Informativo';
    default:
      return severity;
  }
};

export const getStatusLabel = (status: AlertStatus) => {
  switch (status) {
    case 'pending':
      return 'Pendente';
    case 'in_progress':
      return 'Em andamento';
    case 'resolved':
      return 'Resolvido';
    default:
      return status;
  }
};

export const getRoleLabel = (role: ProfessionalRole) => {
  switch (role) {
    case 'medico':
      return 'Médico';
    case 'enfermeiro':
      return 'Enfermeiro';
    case 'psicologo':
      return 'Psicólogo';
    case 'assistente_social':
      return 'Assistente Social';
    default:
      return role;
  }
};

export const getNotificationIcon = (type: PatientNotification['type']) => {
  switch (type) {
    case "support":
      return '🩹';
    case 'reminder':
      return '⏰';
    case 'achievement':
      return '🏆';
    case 'appointment':
      return '📅';
    default:
      return '📌';
  }
};

export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `Há ${diffMins}min`;
  if (diffHours < 24) return `Há ${diffHours}h`;
  if (diffDays === 1) return 'Ontem';
  return `Há ${diffDays} dias`;
};
