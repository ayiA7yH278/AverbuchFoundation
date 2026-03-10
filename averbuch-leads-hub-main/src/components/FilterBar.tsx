import { LeadStatus, LEAD_STATUSES } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  statusFilter: LeadStatus | 'All';
  onStatusFilterChange: (v: LeadStatus | 'All') => void;
}

export function FilterBar({ search, onSearchChange, statusFilter, onStatusFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 border-b border-border bg-card">
      <Select value={statusFilter} onValueChange={(v) => onStatusFilterChange(v as LeadStatus | 'All')}>
        <SelectTrigger className="w-full sm:w-[180px] text-sm">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Statuses</SelectItem>
          {LEAD_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Search by name, industry, city, state..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 text-sm"
      />
    </div>
  );
}
