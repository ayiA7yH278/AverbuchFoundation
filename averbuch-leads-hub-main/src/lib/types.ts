export type LeadStatus = 'No Response' | 'Hang Up' | 'Uninterested' | 'Meeting Booked';

export const LEAD_STATUSES: LeadStatus[] = ['No Response', 'Hang Up', 'Uninterested', 'Meeting Booked'];

export interface Lead {
  id: string;
  orderNumber: number;
  businessName: string;
  industry: string;
  city: string;
  state: string;
  phone: string;
  websiteListed: string;
  googleMapsLink: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImportResult {
  imported: number;
  duplicates: number;
  failed: number;
  errors: string[];
}

export const CSV_HEADER_MAP: Record<string, keyof Lead> = {
  'business name': 'businessName',
  'industry': 'industry',
  'city': 'city',
  'state': 'state',
  'phone': 'phone',
  'website listed': 'websiteListed',
  'google maps link': 'googleMapsLink',
};
