import type { JobListing } from '../../backend';
import { X, Calendar, MapPin, Users, ExternalLink, GraduationCap } from 'lucide-react';

interface JobDetailsModalProps {
  job: JobListing;
  onClose: () => void;
}

export default function JobDetailsModal({ job, onClose }: JobDetailsModalProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const isActive = Number(job.applicationEndDate) / 1000000 >= Date.now();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{job.jobTitle}</h2>
            <p className="text-muted-foreground">{job.organizationName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div>
            {isActive ? (
              <span className="inline-flex px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
                Applications Open
              </span>
            ) : (
              <span className="inline-flex px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-full">
                Applications Closed
              </span>
            )}
          </div>

          {/* Post Name */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Post Name</h3>
            <p className="text-foreground">{job.postName}</p>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Vacancies</p>
                <p className="font-semibold text-foreground">{Number(job.vacancyCount)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-semibold text-foreground">{job.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Application Start</p>
                <p className="font-semibold text-foreground">{formatDate(job.applicationStartDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Application Deadline</p>
                <p className="font-semibold text-foreground">{formatDate(job.applicationEndDate)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg sm:col-span-2">
              <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Exam Date</p>
                <p className="font-semibold text-foreground">{formatDate(job.examDate)}</p>
              </div>
            </div>
          </div>

          {/* Qualification Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Qualification Requirements</h3>
            </div>
            <p className="text-foreground whitespace-pre-wrap">{job.qualificationRequirements}</p>
          </div>

          {/* Official Website Link */}
          <div className="pt-4 border-t border-border">
            <a
              href={job.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Visit Official Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
