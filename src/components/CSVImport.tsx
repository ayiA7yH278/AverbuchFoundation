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
    
    // Use step callback to process rows incrementally for large files
    const allRows: Record<string, string>[] = [];
    let rowCount = 0;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      // Process rows incrementally to handle large files
      step: (results, parser) => {
        rowCount++;
        // Only add rows that have data
        if (results.data && Object.keys(results.data).length > 0) {
          allRows.push(results.data as Record<string, string>);
        }
        
        // Log progress for very large files (every 100 rows)
        if (rowCount % 100 === 0) {
          console.log(`Processing row ${rowCount}...`);
        }
      },
      complete: () => {
        console.log(`Finished parsing. Total rows processed: ${rowCount}, Rows with data: ${allRows.length}`);
        const result = importCSVData(allRows);
        onImportComplete(result);
        setImporting(false);
        if (fileRef.current) fileRef.current.value = '';
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        onImportComplete({ imported: 0, duplicates: 0, failed: 1, errors: [`Failed to parse CSV file: ${error.message}`] });
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
