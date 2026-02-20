import { useState, useMemo } from 'react';
import { useGetLatestExamResults } from '../hooks/useQueries';
import ResultCard from '../components/results/ResultCard';
import ResultFilters from '../components/results/ResultFilters';
import { FileText } from 'lucide-react';

export default function ResultsPage() {
  const { data: results = [], isLoading } = useGetLatestExamResults(100);
  const [filters, setFilters] = useState({
    search: '',
    organization: '',
    dateFrom: '',
    dateTo: '',
  });

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const matchesSearch = !filters.search || 
        result.examName.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesOrganization = !filters.organization || 
        result.organization.toLowerCase().includes(filters.organization.toLowerCase());
      
      const resultDate = Number(result.resultDeclarationDate) / 1000000;
      const matchesDateFrom = !filters.dateFrom || 
        resultDate >= new Date(filters.dateFrom).getTime();
      
      const matchesDateTo = !filters.dateTo || 
        resultDate <= new Date(filters.dateTo).getTime();

      return matchesSearch && matchesOrganization && matchesDateFrom && matchesDateTo;
    });
  }, [results, filters]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
              <FileText className="h-8 w-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Exam Results</h1>
              <p className="text-muted-foreground mt-1">
                Check the latest government exam results
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ResultFilters filters={filters} setFilters={setFilters} results={results} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredResults.length} of {results.length} results
          </p>
        </div>

        {/* Results List */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <ResultCard key={Number(result.id)} result={result} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">
              {results.length === 0 
                ? 'No exam results available yet. Check back soon!' 
                : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
