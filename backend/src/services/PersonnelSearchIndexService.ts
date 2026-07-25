export class PersonnelSearchIndexService {
  /**
   * Generates normalized name, search keywords, and aliases for personnel.
   */
  public static generateSearchData(data: any) {
    const fullName = data.fullName || '';
    const nik = data.nik || '';
    const employeeNumber = data.employeeNumber || '';
    const email = data.email || '';
    
    // Convert to lowercase and strip punctuation/spaces for normalized name
    const cleanName = fullName.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    const normalizedName = cleanName.replace(/\s+/g, '');
    
    // Combine all relevant fields for full-text search
    const searchKeywords = [
      fullName,
      nik,
      employeeNumber,
      email,
      cleanName
    ].filter(Boolean).join(' ').toLowerCase();

    // Generate aliases
    const aliases = [
      fullName,
      cleanName,
      normalizedName,
      employeeNumber
    ].filter(Boolean);

    return { 
      normalizedName, 
      searchKeywords,
      aliases: Array.from(new Set(aliases))
    };
  }
}
