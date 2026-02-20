import { Link, useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Jobs', path: '/jobs' },
    { name: 'Results', path: '/results' },
    { name: 'Admit Cards', path: '/admit-cards' },
    { name: 'News', path: '/news' },
    { name: 'Schemes', path: '/schemes' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/assets/generated/logo.dim_120x120.png" alt="Portal Logo" className="h-10 w-10" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary leading-tight">India Government Portal</span>
              <span className="text-xs text-muted-foreground hidden sm:block">Jobs, Results & Schemes</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                activeProps={{
                  className: 'text-primary bg-accent',
                }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-accent rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent rounded-md transition-colors"
                  activeProps={{
                    className: 'text-primary bg-accent',
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
