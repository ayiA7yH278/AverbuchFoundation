import { useState, useCallback, useMemo } from 'react';
import { getLeads } from '@/lib/lead-store';
import { Lead, LeadStatus, ImportResult } from '@/lib/types';
import { CSVImport } from '@/components/CSVImport';
import { FilterBar } from '@/components/FilterBar';
import { LeadTable } from '@/components/LeadTable';
import { toast } from 'sonner';
import logo from '@/assets/DataBaseLogo.png';

const Index = () => {
  const [leads, setLeads] = useState<Lead[]>(getLeads);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');

  const refreshLeads = useCallback(() => {
    setLeads(getLeads());
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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
        <a href="/" className="flex items-center gap-4">
          <img src={logo} alt="Averbuch Foundation Database" className="h-12 brightness-0 invert" />
        </a>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono-data">
            {leads.length} lead{leads.length !== 1 ? 's' : ''}
          </span>
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
      <LeadTable leads={filtered} onLeadsChange={refreshLeads} />
    </div>
  );
};

export default Index;
