export class SupplierSearchIndexService {
  /**
   * Generates normalized name, search keywords, and aliases for a supplier.
   */
  public static generateSearchData(data: any) {
    const name = data.name || '';
    const displayName = data.displayName || '';
    const category = data.category || '';
    const businessType = data.businessType || '';

    // "PT. Maju Bersama, Tbk" -> "pt maju bersama tbk"
    const cleanName = name.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    
    // "ptmajubersamatbk"
    const normalizedName = cleanName.replace(/\s+/g, '');
    
    // Combine all fields for full-text search
    const searchKeywords = [
      name,
      displayName,
      category,
      businessType,
      cleanName
    ].filter(Boolean).join(' ').toLowerCase();

    // Default aliases generated from the name variations
    const aliases = [
      name,
      cleanName,
      displayName,
      normalizedName
    ].filter(Boolean);

    // Remove duplicates
    const uniqueAliases = Array.from(new Set(aliases));

    return { 
      normalizedName, 
      searchKeywords,
      aliases: uniqueAliases
    };
  }
}
