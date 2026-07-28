import prisma from '../database/prisma';
import { CompanyVisibility } from '@prisma/client';

export type PublicCompanyProjection = {
  id: string;
  slug: string;
  name: string;
  businessType: string;
  verifiedAt: Date | null;
  establishedDate: Date | null;
  description: string | null;
  logoUrl: string | null;
  website: string | null;
  // Included relations
  profile?: any;
  brandKit?: any;
  timeline?: any[];
  contacts?: any[];
  addresses?: any[];
  portfolios?: any[];
  products?: any[];
  services?: any[];
  activities?: any[];
  downloads?: any[];
};

export class PublicCompanyRepositoryImpl {
  /**
   * Fetches the public projection of a company by its slug.
   * Only returns companies that are PUBLIC or UNLISTED.
   * Strips out all sensitive internal data (like legal documents, internal IDs).
   */
  async findBySlug(slug: string): Promise<PublicCompanyProjection | null> {
    const company = await prisma.company.findFirst({
      where: {
        slug,
        deletedAt: null,
        visibility: {
          in: [CompanyVisibility.PUBLIC, CompanyVisibility.UNLISTED]
        }
      },
      select: {
        id: true,
        slug: true,
        name: true,
        businessType: true,
        verifiedAt: true,
        establishedDate: true,
        description: true,
        logoUrl: true,
        website: true,
        profile: {
          select: {
            heroAssetId: true,
            about: true,
            vision: true,
            mission: true,
            galleryAssetIds: true,
            metaTitle: true,
            metaDescription: true,
            metaKeywords: true
          }
        },
        brandKit: {
          select: {
            primaryColor: true,
            secondaryColor: true,
            accentColor: true,
            fontFamily: true,
            typography: true,
            logoAssetId: true,
            lightLogoAssetId: true,
            darkLogoAssetId: true,
            faviconAssetId: true,
            brandSlogan: true,
            ctaLabel: true,
            ctaUrl: true
          }
        },
        portfolios: {
          where: { featured: true },
          select: {
            id: true,
            title: true,
            category: true,
            client: true,
            location: true,
            description: true,
            completionDate: true,
            coverAssetId: true,
            galleryAssetIds: true
          },
          orderBy: { displayOrder: 'asc' }
        },
        products: {
          where: { active: true },
          select: {
            id: true,
            name: true,
            slug: true,
            category: true,
            shortDescription: true,
            specifications: true,
            coverAssetId: true,
            galleryAssetIds: true,
            featured: true
          },
          orderBy: { displayOrder: 'asc' }
        },
        services: {
          where: { active: true },
          select: {
            id: true,
            name: true,
            category: true,
            description: true,
            icon: true,
            heroAssetId: true,
            featured: true
          },
          orderBy: { displayOrder: 'asc' }
        },
        activities: {
          where: { visibility: CompanyVisibility.PUBLIC },
          select: {
            id: true,
            title: true,
            summary: true,
            date: true,
            category: true,
            coverAssetId: true,
            featured: true
          },
          orderBy: { date: 'desc' },
          take: 10
        },
        downloads: {
          where: { visibility: CompanyVisibility.PUBLIC },
          select: {
            id: true,
            title: true,
            category: true,
            assetId: true,
            version: true,
            language: true
          }
        },
        timeline: {
          select: {
            year: true,
            title: true,
            description: true
          },
          orderBy: { year: 'desc' }
        },
        contacts: {
          where: { isPrimary: true },
          select: {
            fullName: true,
            position: true,
            email: true, // Might want to obscure this if needed, but primary contact for public
            phone: true
          }
        },
        addresses: {
          where: { isPrimary: true },
          select: {
            province: true,
            city: true,
            district: true,
            address: true,
            latitude: true,
            longitude: true
          }
        }
      }
    });

    return company;
  }
}

export const PublicCompanyRepository = new PublicCompanyRepositoryImpl();
export default PublicCompanyRepository;
