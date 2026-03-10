import { LeadStatus } from '@/lib/types';

const statusStyles: Record<LeadStatus, string> = {
  'Meeting Booked': 'bg-status-meeting/10 text-status-meeting',
  'Hang Up': 'bg-status-hangup/10 text-status-hangup',
  'Uninterested': 'bg-status-uninterested/10 text-status-uninterested',
  'No Response': 'bg-status-noresponse/10 text-status-noresponse',
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium font-mono-data ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
