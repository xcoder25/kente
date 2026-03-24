'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

export async function updateProductDetails(
  productId: string,
  updates: { price?: number; originalPrice?: number; badge?: string }
) {
  // Path to our JSON "database"
  const dbPath = path.join(process.cwd(), 'src/lib/products.json');

  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    const products = JSON.parse(data);

    const productIndex = products.findIndex((p: any) => p.id === productId);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    // Apply updates
    products[productIndex] = {
      ...products[productIndex],
      ...updates,
    };

    // Write back
    fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf-8');

    // Revalidate paths so the homepage and product pages show new data
    revalidatePath('/', 'layout');
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update product:', error);
    return { success: false, error: error.message };
  }
}
