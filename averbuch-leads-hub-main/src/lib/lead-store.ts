import { Lead, LeadStatus, ImportResult, CSV_HEADER_MAP } from './types';

const STORAGE_KEY = 'averbuch_leads';

function generateId(): string {
  return crypto.randomUUID();
}

export function getLeads(): Lead[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveLeads(leads: Lead[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead | null {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], status, updatedAt: new Date().toISOString() };
  saveLeads(leads);
  return leads[index];
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
  saveLeads(leads);
  return leads[index];
}

export function importCSVData(rows: Record<string, string>[]): ImportResult {
  const existing = getLeads();
  const existingPhones = new Set(existing.map(l => normalizePhone(l.phone)));
  
  let imported = 0;
  let duplicates = 0;
  let failed = 0;
  const errors: string[] = [];
  const newLeads: Lead[] = [];
  const now = new Date().toISOString();

  // Find the highest existing order number
  let maxOrder = existing.reduce((max, l) => Math.max(max, l.orderNumber || 0), 0);

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const mapped: Partial<Lead> = {};

    // Map CSV headers to lead fields (case-insensitive, trim whitespace)
    for (const [csvHeader, value] of Object.entries(row)) {
      const normalized = csvHeader.toLowerCase().trim();
      const key = CSV_HEADER_MAP[normalized];
      if (key) {
        (mapped as any)[key] = value?.trim() || '';
      }
    }

    // Skip completely empty rows
    const hasAnyData = Object.values(mapped).some(v => v && String(v).trim() !== '');
    if (!hasAnyData) continue;

    // Validate required field
    if (!mapped.businessName) {
      failed++;
      errors.push(`Row ${i + 1}: Missing business name`);
      continue;
    }

    // Duplicate detection by phone
    const phone = normalizePhone(mapped.phone || '');
    if (phone && existingPhones.has(phone)) {
      duplicates++;
      continue;
    }

    if (phone) existingPhones.add(phone);

    // Extract order number from business name (e.g. "Bruce's Service Center #1" -> 1)
    const orderMatch = mapped.businessName.match(/#(\d+)/);
    const orderNumber = orderMatch ? parseInt(orderMatch[1], 10) : ++maxOrder;

    newLeads.push({
      id: generateId(),
      orderNumber,
      businessName: mapped.businessName || '',
      industry: mapped.industry || '',
      city: mapped.city || '',
      state: mapped.state || '',
      phone: mapped.phone || '',
      websiteListed: mapped.websiteListed || '',
      googleMapsLink: mapped.googleMapsLink || '',
      status: 'No Response',
      notes: '',
      createdAt: now,
      updatedAt: now,
    });
    imported++;
  }

  // Sort new leads by order number before saving
  newLeads.sort((a, b) => a.orderNumber - b.orderNumber);

  saveLeads([...existing, ...newLeads]);
  return { imported, duplicates, failed, errors };
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '');
}
