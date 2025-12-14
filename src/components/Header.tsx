import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showProfessionalLink?: boolean;
  showBack?: boolean;
}

export const Header = ({ title, showLogo = true, showProfessionalLink = true, showBack = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        {showBack ? (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="w-8 h-8">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
          </div>
        ) : showLogo ? (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-primary">I=I Inde.</span>
          </Link>
        ) : (
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
        )}

        {showProfessionalLink && (
          <Link
            to="/profissional"
            className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors bg-secondary px-3 py-1.5 rounded-full"
          >
            Área Profissional
          </Link>
        )}
      </div>
    </header>
  );
};
