import type { GovernmentScheme } from '../../backend';
import { X, Building2, CheckCircle2, FileText, ExternalLink, Calendar } from 'lucide-react';

interface SchemeDetailsModalProps {
  scheme: GovernmentScheme;
  onClose: () => void;
}

export default function SchemeDetailsModal({ scheme, onClose }: SchemeDetailsModalProps) {
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{scheme.schemeName}</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">{scheme.ministryDepartment}</span>
            </div>
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
          {/* Launch Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Launched on {formatDate(scheme.launchDate)}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">About the Scheme</h3>
            <p className="text-foreground whitespace-pre-wrap">{scheme.description}</p>
          </div>

          {/* Eligibility Criteria */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Eligibility Criteria</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-foreground whitespace-pre-wrap">{scheme.eligibilityCriteria}</p>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-foreground">Benefits</h3>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 border border-green-200 dark:border-green-900/30">
              <p className="text-foreground whitespace-pre-wrap">{scheme.benefits}</p>
            </div>
          </div>

          {/* Application Process */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">How to Apply</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-foreground whitespace-pre-wrap">{scheme.applicationProcess}</p>
            </div>
          </div>

          {/* Official Website Link */}
          <div className="pt-4 border-t border-border">
            <a
              href={scheme.officialWebsite}
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
