export type Product = {
  id: string;
  name: string;
  price: number; // NGN
  originalPrice?: number; // NGN (for sale items)
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  culturalStory: string;
  kentePatternDescription: string;
  badge?: 'New' | 'Best Seller' | 'Limited' | 'Sale';
  rating?: number;
  reviewCount?: number;
};

import productsData from './products.json';

export const products: Product[] = productsData as Product[];

export function formatNGN(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
