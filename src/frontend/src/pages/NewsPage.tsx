import { useState, useMemo } from 'react';
import { useGetLatestNewsUpdates } from '../hooks/useQueries';
import NewsCard from '../components/news/NewsCard';
import NewsFilters from '../components/news/NewsFilters';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
  const { data: news = [], isLoading } = useGetLatestNewsUpdates(100);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
  });

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesSearch = !filters.search || 
        item.headline.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.summary.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = !filters.category || 
        item.category.toLowerCase() === filters.category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [news, filters]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
              <Newspaper className="h-8 w-8 text-teal-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Government News</h1>
              <p className="text-muted-foreground mt-1">
                Stay updated with the latest government announcements and news
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <NewsFilters filters={filters} setFilters={setFilters} news={news} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredNews.length} of {news.length} news items
          </p>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <NewsCard key={Number(item.id)} news={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Newspaper className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No news found</h3>
            <p className="text-muted-foreground">
              {news.length === 0 
                ? 'No news updates available yet. Check back soon!' 
                : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
