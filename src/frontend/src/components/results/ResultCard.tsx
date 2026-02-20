import type { ExamResult } from '../../backend';
import { Calendar, ExternalLink, Building2, Hash } from 'lucide-react';

interface ResultCardProps {
  result: ExamResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg mb-2">{result.examName}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span>{result.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Declared on {formatDate(result.resultDeclarationDate)}</span>
            </div>
            {result.rollNumberRange && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4 flex-shrink-0" />
                <span>Roll Numbers: {result.rollNumberRange}</span>
              </div>
            )}
          </div>

          {result.categoryInfo && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Category Info:</span> {result.categoryInfo}
              </p>
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <a
            href={result.resultLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            View Result
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
