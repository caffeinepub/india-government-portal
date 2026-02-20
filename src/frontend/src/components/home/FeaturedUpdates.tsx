import { useGetLatestJobListings, useGetLatestExamResults, useGetLatestAdmitCards, useGetLatestNewsUpdates, useGetLatestGovernmentSchemes } from '../../hooks/useQueries';
import { Briefcase, FileText, CreditCard, Newspaper, HandHeart, ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function FeaturedUpdates() {
  const navigate = useNavigate();
  const { data: jobs = [], isLoading: jobsLoading } = useGetLatestJobListings(3);
  const { data: results = [], isLoading: resultsLoading } = useGetLatestExamResults(3);
  const { data: admitCards = [], isLoading: admitCardsLoading } = useGetLatestAdmitCards(3);
  const { data: news = [], isLoading: newsLoading } = useGetLatestNewsUpdates(3);
  const { data: schemes = [], isLoading: schemesLoading } = useGetLatestGovernmentSchemes(3);

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const isDeadlinePassed = (timestamp: bigint) => {
    return Number(timestamp) / 1000000 < Date.now();
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Latest Updates</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay up-to-date with the most recent government opportunities and announcements
          </p>
        </div>

        <div className="space-y-12">
          {/* Jobs Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Government Jobs</h3>
              </div>
              <button
                onClick={() => navigate({ to: '/jobs' })}
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm"
              >
                View All <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
                ))
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={Number(job.id)} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground line-clamp-2">{job.jobTitle}</h4>
                      {!isDeadlinePassed(job.applicationEndDate) && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">Active</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{job.organizationName}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Deadline: {formatDate(job.applicationEndDate)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-muted-foreground">
                  No job listings available yet
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Exam Results</h3>
              </div>
              <button
                onClick={() => navigate({ to: '/results' })}
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm"
              >
                View All <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resultsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
                ))
              ) : results.length > 0 ? (
                results.map((result) => (
                  <div key={Number(result.id)} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-foreground mb-3 line-clamp-2">{result.examName}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{result.organization}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(result.resultDeclarationDate)}</span>
                    </div>
                    <a
                      href={result.resultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
                    >
                      View Result <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-muted-foreground">
                  No exam results available yet
                </div>
              )}
            </div>
          </div>

          {/* Admit Cards Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground">Admit Cards</h3>
              </div>
              <button
                onClick={() => navigate({ to: '/admit-cards' })}
                className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm"
              >
                View All <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {admitCardsLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-48 bg-muted animate-pulse rounded-xl" />
                ))
              ) : admitCards.length > 0 ? (
                admitCards.map((card) => (
                  <div key={Number(card.id)} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="font-semibold text-foreground mb-3 line-clamp-2">{card.examName}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{card.organization}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>Exam: {formatDate(card.examDate)}</span>
                    </div>
                    <a
                      href={card.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
                    >
                      Download <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-muted-foreground">
                  No admit cards available yet
                </div>
              )}
            </div>
          </div>

          {/* News & Schemes in 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* News Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                    <Newspaper className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">Latest News</h3>
                </div>
                <button
                  onClick={() => navigate({ to: '/news' })}
                  className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {newsLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
                  ))
                ) : news.length > 0 ? (
                  news.map((item) => (
                    <div key={Number(item.id)} className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-1">{item.headline}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.summary}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{formatDate(item.publicationDate)}</span>
                        <a
                          href={item.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium text-sm"
                        >
                          Read More
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No news updates available yet
                  </div>
                )}
              </div>
            </div>

            {/* Schemes Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <HandHeart className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">Welfare Schemes</h3>
                </div>
                <button
                  onClick={() => navigate({ to: '/schemes' })}
                  className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 text-sm"
                >
                  View All <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {schemesLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
                  ))
                ) : schemes.length > 0 ? (
                  schemes.map((scheme) => (
                    <div key={Number(scheme.id)} className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-foreground mb-2 line-clamp-1">{scheme.schemeName}</h4>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{scheme.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{scheme.ministryDepartment}</span>
                        <a
                          href={scheme.officialWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 font-medium text-sm"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No schemes available yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
