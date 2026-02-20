import { useNavigate } from '@tanstack/react-router';
import { Briefcase, FileText, CreditCard, Newspaper, HandHeart } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  const quickLinks = [
    { icon: Briefcase, label: 'Jobs', path: '/jobs', color: 'text-orange-600' },
    { icon: FileText, label: 'Results', path: '/results', color: 'text-teal-600' },
    { icon: CreditCard, label: 'Admit Cards', path: '/admit-cards', color: 'text-orange-600' },
    { icon: Newspaper, label: 'News', path: '/news', color: 'text-teal-600' },
    { icon: HandHeart, label: 'Schemes', path: '/schemes', color: 'text-orange-600' },
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Hero Background */}
      <div className="relative h-[500px] sm:h-[600px] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x600.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-teal-600/80 to-orange-600/90" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            India Government Portal
          </h1>
          <p className="text-lg sm:text-xl text-white/95 mb-8 max-w-3xl leading-relaxed">
            Your comprehensive source for government jobs, exam results, admit cards, latest news, and welfare schemes. 
            Stay informed and never miss an opportunity.
          </p>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-5xl mt-8">
            {quickLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className="bg-white/95 hover:bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <link.icon className={`h-10 w-10 ${link.color} mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                <span className="text-sm font-semibold text-gray-800">{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
