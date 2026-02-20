import type { NewsUpdate } from '../../backend';
import { Calendar, ExternalLink, Tag } from 'lucide-react';

interface NewsCardProps {
  news: NewsUpdate;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col h-full">
      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-medium rounded-full">
          <Tag className="h-3 w-3" />
          {news.category}
        </span>
      </div>

      {/* Headline */}
      <h3 className="font-semibold text-foreground text-lg mb-3 line-clamp-2 flex-grow">
        {news.headline}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {news.summary}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(news.publicationDate)}</span>
          </div>
          <span className="text-xs text-muted-foreground">{news.source}</span>
        </div>

        <a
          href={news.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
        >
          Read Full Article
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
