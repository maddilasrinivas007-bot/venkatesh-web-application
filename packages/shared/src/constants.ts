export const APP_NAME = 'NyayaAI';
export const APP_TAGLINE = "Empowering Every Citizen with Trusted Legal Intelligence.";
export const LEGAL_DISCLAIMER =
  'This information is for educational purposes only and does not constitute legal advice. Please consult a qualified advocate for your specific situation.';

export const PRACTICE_AREAS = [
  'Criminal Law',
  'Civil Litigation',
  'Corporate Law',
  'Family Law',
  'Property Law',
  'Labour Law',
  'Tax Law',
  'Consumer Protection',
  'Intellectual Property',
  'Constitutional Law',
  'Cyber Law',
  'Environmental Law',
] as const;

export const INDIAN_LANGUAGES = [
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Gujarati',
  'Bengali',
  'Punjabi',
  'Odia',
  'Urdu',
] as const;

export const DOCUMENT_TEMPLATES = [
  { type: 'LEGAL_NOTICE', label: 'Legal Notice', icon: 'FileWarning' },
  { type: 'AFFIDAVIT', label: 'Affidavit', icon: 'FileText' },
  { type: 'RENTAL_AGREEMENT', label: 'Rental Agreement', icon: 'Home' },
  { type: 'SALE_AGREEMENT', label: 'Sale Agreement', icon: 'Handshake' },
  { type: 'EMPLOYMENT_AGREEMENT', label: 'Employment Agreement', icon: 'Briefcase' },
  { type: 'NDA', label: 'Non-Disclosure Agreement', icon: 'Shield' },
  { type: 'GIFT_DEED', label: 'Gift Deed', icon: 'Gift' },
  { type: 'WILL', label: 'Will', icon: 'Scroll' },
  { type: 'CONSUMER_COMPLAINT', label: 'Consumer Complaint', icon: 'AlertCircle' },
  { type: 'POLICE_COMPLAINT', label: 'Police Complaint', icon: 'ShieldAlert' },
  { type: 'RTI_APPLICATION', label: 'RTI Application', icon: 'FileSearch' },
  { type: 'COURT_PETITION', label: 'Court Petition', icon: 'Gavel' },
] as const;

export const LANDING_STATS = [
  { value: '50K+', label: 'Legal Queries Answered' },
  { value: '10K+', label: 'Verified Advocates' },
  { value: '1M+', label: 'Judgments Indexed' },
  { value: '500+', label: 'Acts & Statutes' },
] as const;

export const CONTACT_INFO = {
  organization: 'Aruna Gen AI',
  ownerName: 'Venkatesh garu',
  ownerTitle: 'Lawyer',
  ownerDisplay: 'Venkatesh garu — Lawyer',
  ownerTagline: 'Application Owner & Advocate',
  email: 'venkatesh9.adv@gmail.com',
  phone: '+91 85559 12093',
  phoneHref: 'tel:+918555912093',
  whatsapp: '+91 91600 93811',
  whatsappHref: 'https://wa.me/919160093811',
  address: 'No 22-11-100/2/2, Cotton Mill, Gollavanigunta, Tirupati, Andhra Pradesh',
  advocateEmail: 'venkatesh9.adv@gmail.com',
} as const;
