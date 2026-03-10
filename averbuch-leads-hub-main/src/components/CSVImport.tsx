import { useRef, useState } from 'react';
import Papa from 'papaparse';
import { importCSVData } from '@/lib/lead-store';
import { ImportResult } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface CSVImportProps {
  onImportComplete: (result: ImportResult) => void;
}

export function CSVImport({ onImportComplete }: CSVImportProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  const handleFile = (file: File) => {
    setImporting(true);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as Record<string, string>[];
        const result = importCSVData(data);
        onImportComplete(result);
        setImporting(false);
        if (fileRef.current) fileRef.current.value = '';
      },
      error: () => {
        onImportComplete({ imported: 0, duplicates: 0, failed: 1, errors: ['Failed to parse CSV file'] });
        setImporting(false);
      },
    });
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      <Button
        variant="outline"
        size="sm"
        onClick={() => fileRef.current?.click()}
        disabled={importing}
        className="text-sm font-medium"
      >
        <Upload className="w-4 h-4 mr-2" />
        {importing ? 'Importing...' : 'Import CSV'}
      </Button>
    </>
  );
}
