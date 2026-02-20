import Text "mo:core/Text";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Order "mo:core/Order";

actor {
  // Data Models
  type JobListing = {
    id : Nat;
    jobTitle : Text;
    organizationName : Text;
    postName : Text;
    vacancyCount : Nat;
    qualificationRequirements : Text;
    applicationStartDate : Time.Time;
    applicationEndDate : Time.Time;
    examDate : Time.Time;
    officialWebsite : Text;
    location : Text;
  };

  type ExamResult = {
    id : Nat;
    examName : Text;
    organization : Text;
    resultDeclarationDate : Time.Time;
    resultLink : Text;
    rollNumberRange : Text;
    categoryInfo : Text;
  };

  type AdmitCard = {
    id : Nat;
    examName : Text;
    organization : Text;
    admitCardReleaseDate : Time.Time;
    examDate : Time.Time;
    downloadLink : Text;
    instructions : Text;
  };

  type NewsUpdate = {
    id : Nat;
    headline : Text;
    summary : Text;
    publicationDate : Time.Time;
    source : Text;
    category : Text;
    externalLink : Text;
  };

  type GovernmentScheme = {
    id : Nat;
    schemeName : Text;
    ministryDepartment : Text;
    description : Text;
    eligibilityCriteria : Text;
    benefits : Text;
    applicationProcess : Text;
    officialWebsite : Text;
    launchDate : Time.Time;
  };

  let jobListings = List.empty<JobListing>();
  let examResults = List.empty<ExamResult>();
  let admitCards = List.empty<AdmitCard>();
  let newsUpdates = List.empty<NewsUpdate>();
  let governmentSchemes = List.empty<GovernmentScheme>();

  var nextJobListingId = 1;
  var nextExamResultId = 1;
  var nextAdmitCardId = 1;
  var nextNewsUpdateId = 1;
  var nextGovernmentSchemeId = 1;

  // Comparison Functions
  module JobListing {
    public func compareByApplicationEndDate(a : JobListing, b : JobListing) : Order.Order {
      Int.compare(a.applicationEndDate, b.applicationEndDate);
    };
  };

  module ExamResult {
    public func compareByResultDeclarationDate(a : ExamResult, b : ExamResult) : Order.Order {
      Int.compare(a.resultDeclarationDate, b.resultDeclarationDate);
    };
  };

  module AdmitCard {
    public func compareByAdmitCardReleaseDate(a : AdmitCard, b : AdmitCard) : Order.Order {
      Int.compare(a.admitCardReleaseDate, b.admitCardReleaseDate);
    };
  };

  module NewsUpdate {
    public func compareByPublicationDate(a : NewsUpdate, b : NewsUpdate) : Order.Order {
      Int.compare(a.publicationDate, b.publicationDate);
    };
  };

  module GovernmentScheme {
    public func compareByLaunchDate(a : GovernmentScheme, b : GovernmentScheme) : Order.Order {
      Int.compare(a.launchDate, b.launchDate);
    };
  };

  // Add Functions
  public shared ({ caller }) func addJobListing(
    jobTitle : Text,
    organizationName : Text,
    postName : Text,
    vacancyCount : Nat,
    qualificationRequirements : Text,
    applicationStartDate : Time.Time,
    applicationEndDate : Time.Time,
    examDate : Time.Time,
    officialWebsite : Text,
    location : Text,
  ) : async Nat {
    let newListing : JobListing = {
      id = nextJobListingId;
      jobTitle;
      organizationName;
      postName;
      vacancyCount;
      qualificationRequirements;
      applicationStartDate;
      applicationEndDate;
      examDate;
      officialWebsite;
      location;
    };
    jobListings.add(newListing);
    nextJobListingId += 1;
    newListing.id;
  };

  public shared ({ caller }) func addExamResult(
    examName : Text,
    organization : Text,
    resultDeclarationDate : Time.Time,
    resultLink : Text,
    rollNumberRange : Text,
    categoryInfo : Text,
  ) : async Nat {
    let newResult : ExamResult = {
      id = nextExamResultId;
      examName;
      organization;
      resultDeclarationDate;
      resultLink;
      rollNumberRange;
      categoryInfo;
    };
    examResults.add(newResult);
    nextExamResultId += 1;
    newResult.id;
  };

  public shared ({ caller }) func addAdmitCard(
    examName : Text,
    organization : Text,
    admitCardReleaseDate : Time.Time,
    examDate : Time.Time,
    downloadLink : Text,
    instructions : Text,
  ) : async Nat {
    let newCard : AdmitCard = {
      id = nextAdmitCardId;
      examName;
      organization;
      admitCardReleaseDate;
      examDate;
      downloadLink;
      instructions;
    };
    admitCards.add(newCard);
    nextAdmitCardId += 1;
    newCard.id;
  };

  public shared ({ caller }) func addNewsUpdate(
    headline : Text,
    summary : Text,
    publicationDate : Time.Time,
    source : Text,
    category : Text,
    externalLink : Text,
  ) : async Nat {
    let newUpdate : NewsUpdate = {
      id = nextNewsUpdateId;
      headline;
      summary;
      publicationDate;
      source;
      category;
      externalLink;
    };
    newsUpdates.add(newUpdate);
    nextNewsUpdateId += 1;
    newUpdate.id;
  };

  public shared ({ caller }) func addGovernmentScheme(
    schemeName : Text,
    ministryDepartment : Text,
    description : Text,
    eligibilityCriteria : Text,
    benefits : Text,
    applicationProcess : Text,
    officialWebsite : Text,
    launchDate : Time.Time,
  ) : async Nat {
    let newScheme : GovernmentScheme = {
      id = nextGovernmentSchemeId;
      schemeName;
      ministryDepartment;
      description;
      eligibilityCriteria;
      benefits;
      applicationProcess;
      officialWebsite;
      launchDate;
    };
    governmentSchemes.add(newScheme);
    nextGovernmentSchemeId += 1;
    newScheme.id;
  };

  // Get Latest Functions
  public query ({ caller }) func getLatestJobListings(count : Nat) : async [JobListing] {
    jobListings.reverse().toArray().sort(JobListing.compareByApplicationEndDate).sliceToArray(0, Nat.min(count, jobListings.size()));
  };

  public query ({ caller }) func getLatestExamResults(count : Nat) : async [ExamResult] {
    examResults.reverse().toArray().sort(ExamResult.compareByResultDeclarationDate).sliceToArray(0, Nat.min(count, examResults.size()));
  };

  public query ({ caller }) func getLatestAdmitCards(count : Nat) : async [AdmitCard] {
    admitCards.reverse().toArray().sort(AdmitCard.compareByAdmitCardReleaseDate).sliceToArray(0, Nat.min(count, admitCards.size()));
  };

  public query ({ caller }) func getLatestNewsUpdates(count : Nat) : async [NewsUpdate] {
    newsUpdates.reverse().toArray().sort(NewsUpdate.compareByPublicationDate).sliceToArray(0, Nat.min(count, newsUpdates.size()));
  };

  public query ({ caller }) func getLatestGovernmentSchemes(count : Nat) : async [GovernmentScheme] {
    governmentSchemes.reverse().toArray().sort(GovernmentScheme.compareByLaunchDate).sliceToArray(0, Nat.min(count, governmentSchemes.size()));
  };

  // Helper function to slice List to Array
  func sliceToArray<T>(list : List.List<T>, start : Nat, end : Nat) : [T] {
    if (start >= list.size() or end > list.size() or start > end) {
      Runtime.trap("Invalid slice indices");
    };
    let iter = list.values();
    let array = iter.toArray();
    array.sliceToArray(start, end);
  };
};
