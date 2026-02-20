import { useState, useMemo } from 'react';
import { useGetLatestGovernmentSchemes } from '../hooks/useQueries';
import SchemeCard from '../components/schemes/SchemeCard';
import SchemeFilters from '../components/schemes/SchemeFilters';
import SchemeDetailsModal from '../components/schemes/SchemeDetailsModal';
import type { GovernmentScheme } from '../backend';
import { HandHeart } from 'lucide-react';

export default function SchemesPage() {
  const { data: schemes = [], isLoading } = useGetLatestGovernmentSchemes(100);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [filters, setFilters] = useState({
    ministry: '',
    eligibility: '',
  });

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesMinistry = !filters.ministry || 
        scheme.ministryDepartment.toLowerCase().includes(filters.ministry.toLowerCase());
      
      const matchesEligibility = !filters.eligibility || 
        scheme.eligibilityCriteria.toLowerCase().includes(filters.eligibility.toLowerCase());

      return matchesMinistry && matchesEligibility;
    });
  }, [schemes, filters]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <HandHeart className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Government Schemes</h1>
              <p className="text-muted-foreground mt-1">
                Explore welfare schemes and benefits for citizens
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <SchemeFilters filters={filters} setFilters={setFilters} schemes={schemes} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredSchemes.length} of {schemes.length} schemes
          </p>
        </div>

        {/* Schemes Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredSchemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map((scheme) => (
              <SchemeCard key={Number(scheme.id)} scheme={scheme} onClick={() => setSelectedScheme(scheme)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <HandHeart className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No schemes found</h3>
            <p className="text-muted-foreground">
              {schemes.length === 0 
                ? 'No government schemes available yet. Check back soon!' 
                : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        )}

        {/* Scheme Details Modal */}
        {selectedScheme && (
          <SchemeDetailsModal scheme={selectedScheme} onClose={() => setSelectedScheme(null)} />
        )}
      </div>
    </div>
  );
}
