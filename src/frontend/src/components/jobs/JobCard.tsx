import type { JobListing } from '../../backend';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
  onClick: () => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isActive = Number(job.applicationEndDate) / 1000000 >= Date.now();
  const daysLeft = Math.ceil((Number(job.applicationEndDate) / 1000000 - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group"
    >
      {/* Status Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {job.jobTitle}
          </h3>
          <p className="text-sm text-muted-foreground">{job.organizationName}</p>
        </div>
        {isActive ? (
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full whitespace-nowrap ml-2">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full whitespace-nowrap ml-2">
            Closed
          </span>
        )}
      </div>

      {/* Post Name */}
      <p className="text-sm font-medium text-foreground mb-4">{job.postName}</p>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 flex-shrink-0" />
          <span>{Number(job.vacancyCount)} Vacancies</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="line-clamp-1">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          <span>Deadline: {formatDate(job.applicationEndDate)}</span>
        </div>
      </div>

      {/* Time Left */}
      {isActive && daysLeft > 0 && (
        <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400 font-medium">
          <Clock className="h-4 w-4" />
          <span>{daysLeft} {daysLeft === 1 ? 'day' : 'days'} left to apply</span>
        </div>
      )}
    </div>
  );
}
