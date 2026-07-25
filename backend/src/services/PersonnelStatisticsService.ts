export class PersonnelStatisticsService {
  /**
   * Calculates overall personnel statistics, including availability.
   * Assumes the profile includes its relations (assignments, skk, etc).
   */
  public static calculate(profile: any): any {
    let profileCompleteness = 0;
    
    if (profile.fullName) profileCompleteness += 20;
    if (profile.email) profileCompleteness += 10;
    if (profile.phone) profileCompleteness += 10;
    if (profile.address) profileCompleteness += 10;
    if (profile.photo) profileCompleteness += 10;
    if (profile.educations?.length > 0) profileCompleteness += 10;
    if (profile.experiences?.length > 0) profileCompleteness += 10;
    if (profile.skk?.length > 0) profileCompleteness += 20;

    let available = true;
    const now = new Date();
    
    // Check assignments for availability
    if (profile.assignments && profile.assignments.length > 0) {
      for (const assignment of profile.assignments) {
        const start = assignment.startDate ? new Date(assignment.startDate) : null;
        const end = assignment.finishDate ? new Date(assignment.finishDate) : null;
        if (start && end && now >= start && now <= end) {
          available = false;
          break;
        } else if (start && !end && now >= start) {
          // Assigned with no specific end date
          available = false;
          break;
        }
      }
    }

    // Verify SKK expiration
    let verifiedSKK = 0;
    let expiredSKK = 0;
    if (profile.skk) {
      for (const skk of profile.skk) {
        if (skk.verificationStatus === 'VERIFIED') verifiedSKK++;
        if (skk.expiredDate && new Date(skk.expiredDate) < now) expiredSKK++;
      }
    }

    return {
      profileCompleteness,
      available,
      verifiedSKK,
      expiredSKK,
      educationCount: profile.educations ? profile.educations.length : 0,
      experienceCount: profile.experiences ? profile.experiences.length : 0,
    };
  }
}
