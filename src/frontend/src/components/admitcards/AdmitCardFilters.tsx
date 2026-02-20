import { X } from 'lucide-react';
import type { AdmitCard } from '../../backend';

interface AdmitCardFiltersProps {
  filters: {
    organization: string;
    examDateFrom: string;
    examDateTo: string;
  };
  setFilters: (filters: any) => void;
  admitCards: AdmitCard[];
}

export default function AdmitCardFilters({ filters, setFilters, admitCards }: AdmitCardFiltersProps) {
  const uniqueOrganizations = Array.from(new Set(admitCards.map(c => c.organization))).sort();

  const clearFilters = () => {
    setFilters({
      organization: '',
      examDateFrom: '',
      examDateTo: '',
    });
  };

  const hasActiveFilters = filters.organization || filters.examDateFrom || filters.examDateTo;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filter Admit Cards</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Organization Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Organization</label>
          <select
            value={filters.organization}
            onChange={(e) => setFilters({ ...filters, organization: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Organizations</option>
            {uniqueOrganizations.map((org) => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>

        {/* Exam Date From */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Exam From Date</label>
          <input
            type="date"
            value={filters.examDateFrom}
            onChange={(e) => setFilters({ ...filters, examDateFrom: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Exam Date To */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Exam To Date</label>
          <input
            type="date"
            value={filters.examDateTo}
            onChange={(e) => setFilters({ ...filters, examDateTo: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}
