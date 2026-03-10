import { LeadStatus, LEAD_STATUSES } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusDot: Record<LeadStatus, string> = {
  'Meeting Booked': 'bg-status-meeting',
  'Hang Up': 'bg-status-hangup',
  'Uninterested': 'bg-status-uninterested',
  'No Response': 'bg-status-noresponse',
};

interface StatusDropdownProps {
  value: LeadStatus;
  onChange: (status: LeadStatus) => void;
}

export function StatusDropdown({ value, onChange }: StatusDropdownProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as LeadStatus)}>
      <SelectTrigger className="h-7 w-[150px] text-xs font-mono-data border-border">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LEAD_STATUSES.map((s) => (
          <SelectItem key={s} value={s} className="text-xs font-mono-data">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${statusDot[s]}`} />
              {s}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
