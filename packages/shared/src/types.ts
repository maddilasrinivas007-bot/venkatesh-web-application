export enum UserRole {
  CITIZEN = 'CITIZEN',
  ADVOCATE = 'ADVOCATE',
  LAW_FIRM = 'LAW_FIRM',
  STUDENT = 'STUDENT',
  RESEARCHER = 'RESEARCHER',
  BUSINESS = 'BUSINESS',
  GOVERNMENT = 'GOVERNMENT',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum CaseStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum DocumentType {
  LEGAL_NOTICE = 'LEGAL_NOTICE',
  AFFIDAVIT = 'AFFIDAVIT',
  RENTAL_AGREEMENT = 'RENTAL_AGREEMENT',
  SALE_AGREEMENT = 'SALE_AGREEMENT',
  EMPLOYMENT_AGREEMENT = 'EMPLOYMENT_AGREEMENT',
  NDA = 'NDA',
  GIFT_DEED = 'GIFT_DEED',
  WILL = 'WILL',
  CONSUMER_COMPLAINT = 'CONSUMER_COMPLAINT',
  POLICE_COMPLAINT = 'POLICE_COMPLAINT',
  RTI_APPLICATION = 'RTI_APPLICATION',
  COURT_PETITION = 'COURT_PETITION',
  CONTRACT = 'CONTRACT',
  OTHER = 'OTHER',
}

export enum CourtType {
  SUPREME_COURT = 'SUPREME_COURT',
  HIGH_COURT = 'HIGH_COURT',
  DISTRICT_COURT = 'DISTRICT_COURT',
  TRIBUNAL = 'TRIBUNAL',
  CONSUMER_FORUM = 'CONSUMER_FORUM',
}

export enum LegislationCategory {
  CONSTITUTION = 'CONSTITUTION',
  CRIMINAL = 'CRIMINAL',
  CIVIL = 'CIVIL',
  CORPORATE = 'CORPORATE',
  TAX = 'TAX',
  LABOUR = 'LABOUR',
  PROPERTY = 'PROPERTY',
  FAMILY = 'FAMILY',
  IT = 'IT',
  CONSUMER = 'CONSUMER',
  ENVIRONMENTAL = 'ENVIRONMENTAL',
  RTI = 'RTI',
  MOTOR_VEHICLES = 'MOTOR_VEHICLES',
  OTHER = 'OTHER',
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AILegalResponse {
  answer: string;
  constitutionalProvisions: LegalCitation[];
  statutoryProvisions: LegalCitation[];
  judicialPrecedents: LegalCitation[];
  practicalGuidance: string[];
  requiredDocuments: string[];
  authorities: string[];
  proceduralRoadmap: ProceduralStep[];
  estimatedTimeline: string;
  potentialRisks: string[];
  disclaimer: string;
  confidence: number;
}

export interface LegalCitation {
  title: string;
  reference: string;
  excerpt?: string;
  url?: string;
  court?: string;
  year?: number;
}

export interface ProceduralStep {
  step: number;
  title: string;
  description: string;
  estimatedDuration?: string;
}

export interface SearchFilters {
  court?: CourtType;
  judge?: string;
  citation?: string;
  year?: number;
  subject?: string;
  statute?: string;
  keywords?: string;
  page?: number;
  limit?: number;
}
