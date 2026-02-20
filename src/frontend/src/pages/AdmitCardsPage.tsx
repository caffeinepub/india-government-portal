import { useState, useMemo } from 'react';
import { useGetLatestAdmitCards } from '../hooks/useQueries';
import AdmitCardCard from '../components/admitcards/AdmitCardCard';
import AdmitCardFilters from '../components/admitcards/AdmitCardFilters';
import { CreditCard } from 'lucide-react';

export default function AdmitCardsPage() {
  const { data: admitCards = [], isLoading } = useGetLatestAdmitCards(100);
  const [filters, setFilters] = useState({
    organization: '',
    examDateFrom: '',
    examDateTo: '',
  });

  const filteredAdmitCards = useMemo(() => {
    return admitCards.filter((card) => {
      const matchesOrganization = !filters.organization || 
        card.organization.toLowerCase().includes(filters.organization.toLowerCase());
      
      const examDate = Number(card.examDate) / 1000000;
      const matchesDateFrom = !filters.examDateFrom || 
        examDate >= new Date(filters.examDateFrom).getTime();
      
      const matchesDateTo = !filters.examDateTo || 
        examDate <= new Date(filters.examDateTo).getTime();

      return matchesOrganization && matchesDateFrom && matchesDateTo;
    });
  }, [admitCards, filters]);

  // Sort by exam date, upcoming first
  const sortedAdmitCards = useMemo(() => {
    return [...filteredAdmitCards].sort((a, b) => {
      const aDate = Number(a.examDate);
      const bDate = Number(b.examDate);
      return aDate - bDate;
    });
  }, [filteredAdmitCards]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Admit Cards</h1>
              <p className="text-muted-foreground mt-1">
                Download admit cards for upcoming government exams
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <AdmitCardFilters filters={filters} setFilters={setFilters} admitCards={admitCards} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {sortedAdmitCards.length} of {admitCards.length} admit cards
          </p>
        </div>

        {/* Admit Cards List */}
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : sortedAdmitCards.length > 0 ? (
          <div className="space-y-4">
            {sortedAdmitCards.map((card) => (
              <AdmitCardCard key={Number(card.id)} admitCard={card} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <CreditCard className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No admit cards found</h3>
            <p className="text-muted-foreground">
              {admitCards.length === 0 
                ? 'No admit cards available yet. Check back soon!' 
                : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
