export type ProductTier = 'Flagship' | 'Standard' | 'Other';

export interface VulnerabilityCategory {
  id: string;
  name: string;
  description: string;
  example: string;
  baseRewards: Record<ProductTier, number | 'credit'>;
}

export interface IneligibleType {
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProductTierDefinition {
  name: ProductTier;
  description: string;
  examples: string[];
}
