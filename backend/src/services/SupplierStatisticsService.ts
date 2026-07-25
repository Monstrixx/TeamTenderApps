import { SupplierProfileRules } from '../config/supplierProfileRules';

export class SupplierStatisticsService {
  /**
   * Calculates supplier statistics and profile completeness based on user-defined weights.
   */
  public static calculate(profile: any): any {
    let score = 0;
    const weights = SupplierProfileRules.weights;

    // Contact
    if (profile.contacts && profile.contacts.length > 0) score += weights.contact;
    
    // Bank Account
    if (profile.bankAccounts && profile.bankAccounts.length > 0) score += weights.bankAccount;

    // Email
    if (profile.email) score += weights.email;
    
    // Phone
    if (profile.phone) score += weights.phone;
    
    // Website
    if (profile.website) score += weights.website;

    // Logo
    if (profile.logoUrl) score += weights.logoUrl;

    // Tax NPWP
    if (profile.tax?.npwp) score += weights.taxNpwp;

    // Tax PKP
    if (profile.tax?.pkpNumber) score += weights.taxPkp;

    return {
      profileCompleteness: score,
      contactCount: profile.contacts ? profile.contacts.length : 0,
      bankAccountCount: profile.bankAccounts ? profile.bankAccounts.length : 0,
      experienceCount: profile.experiences ? profile.experiences.length : 0, // Now supported!
      documentCount: profile.documents ? profile.documents.length : 0,
      certificationCount: profile.qualifications ? profile.qualifications.length : 0, // Now supported!
      activeTenderCount: 0, // Placeholder for future wave
    };
  }
}
