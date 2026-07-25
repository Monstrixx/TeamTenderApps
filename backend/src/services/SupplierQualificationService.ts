import { SupplierQualification } from '@prisma/client';

export class SupplierQualificationService {
  /**
   * Checks if a supplier qualification is expired.
   */
  public static isExpired(qualification: SupplierQualification): boolean {
    if (!qualification.validUntil) return false;
    
    const now = new Date();
    const expiry = new Date(qualification.validUntil);
    
    return now > expiry;
  }

  /**
   * Returns the number of days until a qualification expires.
   * If already expired, returns a negative number.
   * If it has no expiry date, returns null.
   */
  public static daysUntilExpiry(qualification: SupplierQualification): number | null {
    if (!qualification.validUntil) return null;
    
    const now = new Date();
    const expiry = new Date(qualification.validUntil);
    
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays;
  }
}
