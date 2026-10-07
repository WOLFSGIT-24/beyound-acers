/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: amenities
 * Interface for Amenities
 */
export interface Amenities {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  amenityName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType boolean */
  isOperational?: boolean;
}


/**
 * Collection ID: brochures
 * Interface for Brochures
 */
export interface Brochures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  documentTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType url */
  fileUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType date */
  publicationDate?: Date | string;
  /** @wixFieldType text */
  documentType?: string;
}


/**
 * Collection ID: inquiries
 * Interface for Inquiries
 */
export interface Inquiries {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  utmCampaign?: string;
  /** @wixFieldType text */
  campaignLabel?: string;
  /** @wixFieldType text */
  trackCode?: string;
  /** @wixFieldType text */
  utmTerm?: string;
  /** @wixFieldType text */
  utmContent?: string;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  utmMedium?: string;
  /** @wixFieldType text */
  utmSource?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType text */
  message?: string;
  /** @wixFieldType datetime */
  dateSubmitted?: Date | string;
}


/**
 * Collection ID: plottypes
 * Interface for PlotTypes
 */
export interface PlotTypes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  plotSizeName?: string;
  /** @wixFieldType text */
  dimensions?: string;
  /** @wixFieldType number */
  totalArea?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  plotImage?: string;
  /** @wixFieldType boolean */
  isAvailable?: boolean;
}


/**
 * Collection ID: sustainabilityfeatures
 * Interface for SustainabilityFeatures
 */
export interface SustainabilityFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featureImage?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
}
