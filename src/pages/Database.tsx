import { useState, useCallback, useMemo } from 'react';
import { getLeads, saveLeads } from '@/lib/lead-store';
import { Lead, LeadStatus, ImportResult } from '@/lib/types';
import { CSVImport } from '@/components/CSVImport';
import { FilterBar } from '@/components/FilterBar';
import { LeadTable } from '@/components/LeadTable';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import logo from '@/assets/DataBaseLogo.png';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const CORRECT_PASSWORD = '09Apr2012!';

const Database = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setLeads(getLeads());
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleOpenDatabase = () => {
    setShowDatabase(true);
    setLeads(getLeads());
  };

  const refreshLeads = useCallback(() => {
    setLeads(getLeads());
  }, []);

  const handleClearLeads = useCallback(() => {
    saveLeads([]);
    setLeads([]);
    toast.success('All leads cleared.');
  }, []);

  const handleImport = useCallback((result: ImportResult) => {
    refreshLeads();
    const parts = [
      `${result.imported} leads imported`,
      result.duplicates > 0 ? `${result.duplicates} duplicates skipped` : null,
      result.failed > 0 ? `${result.failed} rows failed` : null,
    ].filter(Boolean).join(', ');
    
    if (result.imported > 0) {
      toast.success(parts);
    } else if (result.duplicates > 0) {
      toast.info(parts);
    } else {
      toast.error(parts);
    }
    if (result.errors.length > 0) {
      result.errors.slice(0, 3).forEach(e => toast.error(e));
    }
  }, [refreshLeads]);

  const filtered = useMemo(() => {
    let result = leads;
    if (statusFilter !== 'All') {
      result = result.filter(l => l.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(l =>
        l.businessName.toLowerCase().includes(q) ||
        l.industry.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q) ||
        l.phone.includes(q)
      );
    }
    return result;
  }, [leads, statusFilter, search]);

  // Password prompt screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-center">Database Access</h1>
            <p className="text-muted-foreground text-sm text-center mb-6">
              Please enter the password to access the leads database.
            </p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  className={passwordError ? 'border-destructive' : ''}
                  autoFocus
                />
                {passwordError && (
                  <p className="text-destructive text-sm mt-2">{passwordError}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Access Database
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Homepage screen (after authentication, before database)
  if (!showDatabase) {
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
            onClick={handleOpenDatabase}
            className="group flex items-center gap-3 px-8 py-4 bg-card border border-border rounded-lg text-foreground font-medium text-base hover:bg-accent transition-colors"
          >
            Open Lead Database
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Averbuch Foundation Database"
            className="h-8 w-auto brightness-0 invert"
          />
          <h1 className="text-xl font-bold">Leads Database</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono-data">
            {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={leads.length === 0}>
                Clear CSV
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete all imported leads?</AlertDialogTitle>
                <AlertDialogDescription>
                  This clears the saved leads data from this browser (local storage). This action can’t be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearLeads}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <CSVImport onImportComplete={handleImport} />
        </div>
      </header>

      {/* Filters */}
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Table */}
      <div className="flex-1">
        <LeadTable leads={filtered} onLeadsChange={refreshLeads} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-6 py-4 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <span className="font-mono-data">© {new Date().getFullYear()} Averbuch Foundation</span>
          <span className="opacity-70">Internal leads database</span>
        </div>
      </footer>
    </div>
  );
};

export default Database;
