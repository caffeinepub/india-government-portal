import type { GovernmentScheme } from '../../backend';
import { Building2, CheckCircle2 } from 'lucide-react';

interface SchemeCardProps {
  scheme: GovernmentScheme;
  onClick: () => void;
}

export default function SchemeCard({ scheme, onClick }: SchemeCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col"
    >
      {/* Ministry Badge */}
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="h-4 w-4 text-primary" />
        <span className="text-xs text-muted-foreground line-clamp-1">{scheme.ministryDepartment}</span>
      </div>

      {/* Scheme Name */}
      <h3 className="font-semibold text-foreground text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {scheme.schemeName}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
        {scheme.description}
      </p>

      {/* Key Benefits Preview */}
      <div className="mb-4">
        <p className="text-xs font-medium text-foreground mb-2 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3 text-green-600" />
          Key Benefits
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {scheme.benefits}
        </p>
      </div>

      {/* Application Process Preview */}
      <div className="pt-4 border-t border-border mt-auto">
        <p className="text-xs font-medium text-foreground mb-1">Application Process</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {scheme.applicationProcess}
        </p>
      </div>
    </div>
  );
}
