export class SlugService {
  /**
   * Generates a base slug from a given text.
   * e.g., "PT Maju Bersama" -> "pt-maju-bersama"
   */
  static generate(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove non-word characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
  }

  /**
   * Ensures a slug is unique by checking against a repository function.
   * If the base slug is taken, appends the fallback suffix.
   * e.g. "pt-maju-bersama" -> "pt-maju-bersama-cmp000002"
   *
   * @param baseSlug The generated base slug
   * @param repositoryCheckFn Function that returns true if the slug exists
   * @param fallbackSuffix Suffix to append if conflict occurs (e.g. company code in lowercase)
   */
  static async ensureUnique(
    baseSlug: string,
    repositoryCheckFn: (slug: string) => Promise<boolean>,
    fallbackSuffix: string
  ): Promise<string> {
    const exists = await repositoryCheckFn(baseSlug);
    if (!exists) {
      return baseSlug;
    }

    const suffix = fallbackSuffix.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `${baseSlug}-${suffix}`;
  }
}
