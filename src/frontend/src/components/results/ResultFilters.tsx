import { Search, X } from 'lucide-react';
import type { ExamResult } from '../../backend';

interface ResultFiltersProps {
  filters: {
    search: string;
    organization: string;
    dateFrom: string;
    dateTo: string;
  };
  setFilters: (filters: any) => void;
  results: ExamResult[];
}

export default function ResultFilters({ filters, setFilters, results }: ResultFiltersProps) {
  const uniqueOrganizations = Array.from(new Set(results.map(r => r.organization))).sort();

  const clearFilters = () => {
    setFilters({
      search: '',
      organization: '',
      dateFrom: '',
      dateTo: '',
    });
  };

  const hasActiveFilters = filters.search || filters.organization || filters.dateFrom || filters.dateTo;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filter Results</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Search Exam</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exam name..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

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

        {/* Date From */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">From Date</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">To Date</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </div>
  );
}
