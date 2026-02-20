import type { AdmitCard } from '../../backend';
import { Calendar, Download, Building2, AlertCircle, Clock } from 'lucide-react';

interface AdmitCardCardProps {
  admitCard: AdmitCard;
}

export default function AdmitCardCard({ admitCard }: AdmitCardCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const isUpcoming = Number(admitCard.examDate) / 1000000 >= Date.now();
  const daysUntilExam = Math.ceil((Number(admitCard.examDate) / 1000000 - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className={`bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow ${
      isUpcoming ? 'border-orange-500/50 shadow-orange-500/10' : 'border-border'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          {/* Upcoming Badge */}
          {isUpcoming && daysUntilExam > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium rounded-full mb-3">
              <Clock className="h-4 w-4" />
              Exam in {daysUntilExam} {daysUntilExam === 1 ? 'day' : 'days'}
            </div>
          )}

          <h3 className="font-semibold text-foreground text-lg mb-2">{admitCard.examName}</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 flex-shrink-0" />
              <span>{admitCard.organization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Released on {formatDate(admitCard.admitCardReleaseDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span>Exam Date: {formatDate(admitCard.examDate)}</span>
            </div>
          </div>

          {/* Instructions */}
          {admitCard.instructions && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Important Instructions</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">{admitCard.instructions}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-shrink-0">
          <a
            href={admitCard.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            Download Admit Card
          </a>
        </div>
      </div>
    </div>
  );
}
