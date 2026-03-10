import { useNavigate } from 'react-router-dom';
import logo from '@/assets/DataBaseLogo.png';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-6">
      <div className="flex flex-col items-center gap-10 max-w-2xl text-center">
        <img
          src={logo}
          alt="Averbuch Foundation Database"
          className="w-[480px] max-w-full brightness-0 invert"
        />

        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
          Internal lead management tool for the Averbuch Foundation team.
        </p>

        <button
          onClick={() => navigate('/leads')}
          className="group flex items-center gap-3 px-8 py-4 bg-card border border-border rounded-lg text-foreground font-medium text-base hover:bg-accent transition-colors"
        >
          Open Lead Database
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Home;
