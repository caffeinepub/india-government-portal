import { useState, useMemo } from 'react';
import { useGetLatestJobListings } from '../hooks/useQueries';
import JobCard from '../components/jobs/JobCard';
import JobFilters from '../components/jobs/JobFilters';
import JobDetailsModal from '../components/jobs/JobDetailsModal';
import type { JobListing } from '../backend';
import { Briefcase } from 'lucide-react';

export default function JobsPage() {
  const { data: jobs = [], isLoading } = useGetLatestJobListings(100);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [filters, setFilters] = useState({
    qualification: '',
    location: '',
    organization: '',
    status: 'all', // 'all', 'active', 'closed'
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQualification = !filters.qualification || 
        job.qualificationRequirements.toLowerCase().includes(filters.qualification.toLowerCase());
      
      const matchesLocation = !filters.location || 
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const matchesOrganization = !filters.organization || 
        job.organizationName.toLowerCase().includes(filters.organization.toLowerCase());
      
      const isActive = Number(job.applicationEndDate) / 1000000 >= Date.now();
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'active' && isActive) || 
        (filters.status === 'closed' && !isActive);

      return matchesQualification && matchesLocation && matchesOrganization && matchesStatus;
    });
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Government Jobs</h1>
              <p className="text-muted-foreground mt-1">
                Browse and apply for the latest government job opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <JobFilters filters={filters} setFilters={setFilters} jobs={jobs} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </p>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard key={Number(job.id)} job={job} onClick={() => setSelectedJob(job)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No jobs found</h3>
            <p className="text-muted-foreground">
              {jobs.length === 0 
                ? 'No job listings available yet. Check back soon!' 
                : 'Try adjusting your filters to see more results.'}
            </p>
          </div>
        )}

        {/* Job Details Modal */}
        {selectedJob && (
          <JobDetailsModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </div>
    </div>
  );
}
