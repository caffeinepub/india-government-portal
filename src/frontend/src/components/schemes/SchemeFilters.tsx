import { Search, X } from 'lucide-react';
import type { GovernmentScheme } from '../../backend';

interface SchemeFiltersProps {
  filters: {
    ministry: string;
    eligibility: string;
  };
  setFilters: (filters: any) => void;
  schemes: GovernmentScheme[];
}

export default function SchemeFilters({ filters, setFilters, schemes }: SchemeFiltersProps) {
  const uniqueMinistries = Array.from(new Set(schemes.map(s => s.ministryDepartment))).sort();

  const clearFilters = () => {
    setFilters({
      ministry: '',
      eligibility: '',
    });
  };

  const hasActiveFilters = filters.ministry || filters.eligibility;

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filter Schemes</h2>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ministry Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Ministry/Department</label>
          <select
            value={filters.ministry}
            onChange={(e) => setFilters({ ...filters, ministry: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Ministries</option>
            {uniqueMinistries.map((ministry) => (
              <option key={ministry} value={ministry}>{ministry}</option>
            ))}
          </select>
        </div>

        {/* Eligibility Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Eligibility Criteria</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search eligibility..."
              value={filters.eligibility}
              onChange={(e) => setFilters({ ...filters, eligibility: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
