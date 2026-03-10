import { useState, useCallback } from 'react';
import { Lead, LeadStatus } from '@/lib/types';
import { StatusDropdown } from './StatusDropdown';
import { updateLeadStatus, updateLead } from '@/lib/lead-store';
import { Pencil, Check, X, ExternalLink } from 'lucide-react';

const pulseClass: Record<LeadStatus, string> = {
  'Meeting Booked': 'animate-pulse-meeting',
  'Hang Up': 'animate-pulse-hangup',
  'Uninterested': 'animate-pulse-uninterested',
  'No Response': 'animate-pulse-noresponse',
};

interface LeadTableProps {
  leads: Lead[];
  onLeadsChange: () => void;
}

export function LeadTable({ leads, onLeadsChange }: LeadTableProps) {
  const [pulsingRow, setPulsingRow] = useState<string | null>(null);
  const [pulseStatus, setPulseStatus] = useState<LeadStatus | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Lead>>({});
  const [sortField, setSortField] = useState<keyof Lead>('orderNumber');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const handleStatusChange = useCallback((id: string, status: LeadStatus) => {
    updateLeadStatus(id, status);
    setPulsingRow(id);
    setPulseStatus(status);
    onLeadsChange();
    setTimeout(() => setPulsingRow(null), 300);
  }, [onLeadsChange]);

  const startEdit = (lead: Lead) => {
    setEditingId(lead.id);
    setEditData({ businessName: lead.businessName, industry: lead.industry, city: lead.city, state: lead.state, phone: lead.phone, notes: lead.notes });
  };

  const saveEdit = () => {
    if (editingId) {
      updateLead(editingId, editData);
      onLeadsChange();
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSort = (field: keyof Lead) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = [...leads].sort((a, b) => {
    const av = a[sortField] ?? '';
    const bv = b[sortField] ?? '';
    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av;
    }
    const cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortHeader = ({ field, children }: { field: keyof Lead; children: React.ReactNode }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:text-foreground transition-colors"
      onClick={() => handleSort(field)}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        {sortField === field && (
          <span className="text-[10px]">{sortDir === 'asc' ? '↑' : '↓'}</span>
        )}
      </span>
    </th>
  );

  if (leads.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm py-20">
        No leads yet. Import a CSV file to get started.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full min-w-[900px]">
        <thead className="sticky top-0 bg-card z-10 border-b border-border">
          <tr>
            <SortHeader field="orderNumber">#</SortHeader>
            <SortHeader field="businessName">Business</SortHeader>
            <SortHeader field="industry">Industry</SortHeader>
            <SortHeader field="city">City</SortHeader>
            <SortHeader field="state">State</SortHeader>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[60px]">Map</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[40px]"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((lead) => {
            const isEditing = editingId === lead.id;
            const isPulsing = pulsingRow === lead.id;
            return (
              <tr
                key={lead.id}
                className={`border-b border-border/50 hover:bg-accent/30 transition-colors ${isPulsing && pulseStatus ? pulseClass[pulseStatus] : ''}`}
              >
                <td className="px-4 py-2.5 font-mono-data text-xs text-muted-foreground w-12">
                  {lead.orderNumber}
                </td>
                <td className="px-4 py-2.5 font-mono-data text-sm">
                  {isEditing ? (
                    <input className="bg-accent border border-border rounded px-2 py-1 text-sm font-mono-data w-full" value={editData.businessName || ''} onChange={e => setEditData(d => ({ ...d, businessName: e.target.value }))} />
                  ) : lead.businessName}
                </td>
                <td className="px-4 py-2.5 font-mono-data text-sm text-muted-foreground">
                  {isEditing ? (
                    <input className="bg-accent border border-border rounded px-2 py-1 text-sm font-mono-data w-full" value={editData.industry || ''} onChange={e => setEditData(d => ({ ...d, industry: e.target.value }))} />
                  ) : lead.industry}
                </td>
                <td className="px-4 py-2.5 font-mono-data text-sm text-muted-foreground">
                  {isEditing ? (
                    <input className="bg-accent border border-border rounded px-2 py-1 text-sm font-mono-data w-full" value={editData.city || ''} onChange={e => setEditData(d => ({ ...d, city: e.target.value }))} />
                  ) : lead.city}
                </td>
                <td className="px-4 py-2.5 font-mono-data text-sm text-muted-foreground">
                  {isEditing ? (
                    <input className="bg-accent border border-border rounded px-2 py-1 text-sm font-mono-data w-full w-16" value={editData.state || ''} onChange={e => setEditData(d => ({ ...d, state: e.target.value }))} />
                  ) : lead.state}
                </td>
                <td className="px-4 py-2.5 font-mono-data text-sm">
                  {isEditing ? (
                    <input className="bg-accent border border-border rounded px-2 py-1 text-sm font-mono-data w-full" value={editData.phone || ''} onChange={e => setEditData(d => ({ ...d, phone: e.target.value }))} />
                  ) : lead.phone}
                </td>
                <td className="px-4 py-2.5">
                  <StatusDropdown value={lead.status} onChange={(s) => handleStatusChange(lead.id, s)} />
                </td>
                <td className="px-4 py-2.5">
                  {lead.googleMapsLink && (
                    <a href={lead.googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </td>
                <td className="px-4 py-2.5">
                  {isEditing ? (
                    <span className="flex gap-1">
                      <button onClick={saveEdit} className="text-status-meeting hover:opacity-80"><Check className="w-4 h-4" /></button>
                      <button onClick={cancelEdit} className="text-status-hangup hover:opacity-80"><X className="w-4 h-4" /></button>
                    </span>
                  ) : (
                    <button onClick={() => startEdit(lead)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
