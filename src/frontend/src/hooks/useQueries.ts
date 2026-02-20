import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { JobListing, ExamResult, AdmitCard, NewsUpdate, GovernmentScheme } from '../backend';

export function useGetLatestJobListings(count: number = 50) {
  const { actor, isFetching } = useActor();

  return useQuery<JobListing[]>({
    queryKey: ['jobListings', count],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestJobListings(BigInt(count));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLatestExamResults(count: number = 50) {
  const { actor, isFetching } = useActor();

  return useQuery<ExamResult[]>({
    queryKey: ['examResults', count],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestExamResults(BigInt(count));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLatestAdmitCards(count: number = 50) {
  const { actor, isFetching } = useActor();

  return useQuery<AdmitCard[]>({
    queryKey: ['admitCards', count],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestAdmitCards(BigInt(count));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLatestNewsUpdates(count: number = 50) {
  const { actor, isFetching } = useActor();

  return useQuery<NewsUpdate[]>({
    queryKey: ['newsUpdates', count],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestNewsUpdates(BigInt(count));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLatestGovernmentSchemes(count: number = 50) {
  const { actor, isFetching } = useActor();

  return useQuery<GovernmentScheme[]>({
    queryKey: ['governmentSchemes', count],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLatestGovernmentSchemes(BigInt(count));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddJobListing() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      jobTitle: string;
      organizationName: string;
      postName: string;
      vacancyCount: bigint;
      qualificationRequirements: string;
      applicationStartDate: bigint;
      applicationEndDate: bigint;
      examDate: bigint;
      officialWebsite: string;
      location: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addJobListing(
        data.jobTitle,
        data.organizationName,
        data.postName,
        data.vacancyCount,
        data.qualificationRequirements,
        data.applicationStartDate,
        data.applicationEndDate,
        data.examDate,
        data.officialWebsite,
        data.location
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobListings'] });
    },
  });
}
