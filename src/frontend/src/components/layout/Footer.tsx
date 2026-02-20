import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'india-gov-portal';

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">About Portal</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted source for government jobs, exam results, admit cards, news updates, and welfare schemes across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/jobs" className="hover:text-primary transition-colors">Government Jobs</a></li>
              <li><a href="/results" className="hover:text-primary transition-colors">Exam Results</a></li>
              <li><a href="/admit-cards" className="hover:text-primary transition-colors">Admit Cards</a></li>
              <li><a href="/news" className="hover:text-primary transition-colors">Latest News</a></li>
              <li><a href="/schemes" className="hover:text-primary transition-colors">Welfare Schemes</a></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              This is an information portal. Please verify all details on official government websites before taking any action.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} India Government Portal. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-4 w-4 text-orange-500 fill-orange-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
