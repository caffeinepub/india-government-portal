import { Search, X } from 'lucide-react';
import type { JobListing } from '../../backend';

interface JobFiltersProps {
  filters: {
    qualification: string;
    location: string;
    organization: string;
    status: string;
  };
  setFilters: (filters: any) => void;
  jobs: JobListing[];
}

export default function JobFilters({ filters, setFilters, jobs }: JobFiltersProps) {
  const uniqueLocations = Array.from(new Set(jobs.map(j => j.location))).sort();
  const uniqueOrganizations = Array.from(new Set(jobs.map(j => j.organizationName))).sort();

  const clearFilters = () => {
    setFilters({
      qualification: '',
      location: '',
      organization: '',
      status: 'all',
    });
  };

  const hasActiveFilters = filters.qualification || filters.location || filters.organization || filters.status !== 'all';

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Filter Jobs</h2>
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
        {/* Qualification Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Qualification</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search qualification..."
              value={filters.qualification}
              onChange={(e) => setFilters({ ...filters, qualification: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <select
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
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

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Jobs</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
