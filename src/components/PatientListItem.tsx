import { Patient } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface PatientListItemProps {
  patient: Patient;
  onClick?: (patientId: string) => void;
  isSelected?: boolean;
}

export const PatientListItem = ({ patient, onClick, isSelected }: PatientListItemProps) => {
  const riskStyles = {
    low: "bg-success/10 text-success",
    medium: "bg-warning/10 text-warning",
    high: "bg-critical/10 text-critical",
  };

  const riskLabels = {
    low: "Baixo risco",
    medium: "Médio risco",
    high: "Alto risco",
  };

  return (
    <button
      onClick={() => onClick?.(patient.id)}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left",
        "hover:bg-secondary/50",
        isSelected && "bg-secondary border-l-4 border-l-primary"
      )}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold">
        {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-medium text-foreground truncate">{patient.name}</h4>
          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", riskStyles[patient.riskLevel])}>
            {riskLabels[patient.riskLevel]}
          </span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
          <span>Adesão: {patient.adherenceRate}%</span>
          <span>•</span>
          <span>{patient.consecutiveDays} dias seguidos</span>
        </div>
      </div>
    </button>
  );
};
