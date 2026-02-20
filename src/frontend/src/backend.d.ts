import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface GovernmentScheme {
    id: bigint;
    applicationProcess: string;
    ministryDepartment: string;
    description: string;
    schemeName: string;
    launchDate: Time;
    benefits: string;
    eligibilityCriteria: string;
    officialWebsite: string;
}
export interface JobListing {
    id: bigint;
    postName: string;
    organizationName: string;
    applicationStartDate: Time;
    applicationEndDate: Time;
    vacancyCount: bigint;
    qualificationRequirements: string;
    jobTitle: string;
    examDate: Time;
    location: string;
    officialWebsite: string;
}
export interface NewsUpdate {
    id: bigint;
    source: string;
    externalLink: string;
    headline: string;
    summary: string;
    publicationDate: Time;
    category: string;
}
export type Time = bigint;
export interface ExamResult {
    id: bigint;
    resultDeclarationDate: Time;
    categoryInfo: string;
    rollNumberRange: string;
    resultLink: string;
    organization: string;
    examName: string;
}
export interface AdmitCard {
    id: bigint;
    downloadLink: string;
    instructions: string;
    organization: string;
    examDate: Time;
    examName: string;
    admitCardReleaseDate: Time;
}
export interface backendInterface {
    addAdmitCard(examName: string, organization: string, admitCardReleaseDate: Time, examDate: Time, downloadLink: string, instructions: string): Promise<bigint>;
    addExamResult(examName: string, organization: string, resultDeclarationDate: Time, resultLink: string, rollNumberRange: string, categoryInfo: string): Promise<bigint>;
    addGovernmentScheme(schemeName: string, ministryDepartment: string, description: string, eligibilityCriteria: string, benefits: string, applicationProcess: string, officialWebsite: string, launchDate: Time): Promise<bigint>;
    addJobListing(jobTitle: string, organizationName: string, postName: string, vacancyCount: bigint, qualificationRequirements: string, applicationStartDate: Time, applicationEndDate: Time, examDate: Time, officialWebsite: string, location: string): Promise<bigint>;
    addNewsUpdate(headline: string, summary: string, publicationDate: Time, source: string, category: string, externalLink: string): Promise<bigint>;
    getLatestAdmitCards(count: bigint): Promise<Array<AdmitCard>>;
    getLatestExamResults(count: bigint): Promise<Array<ExamResult>>;
    getLatestGovernmentSchemes(count: bigint): Promise<Array<GovernmentScheme>>;
    getLatestJobListings(count: bigint): Promise<Array<JobListing>>;
    getLatestNewsUpdates(count: bigint): Promise<Array<NewsUpdate>>;
}
