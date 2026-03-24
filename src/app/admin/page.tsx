import fs from 'fs';
import path from 'path';
import { AdminDashboard } from './dashboard-client';
import { Product } from '@/lib/products';

// Opt out of caching so admin always gets fresh data
export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const dbPath = path.join(process.cwd(), 'src/lib/products.json');
  const fileContent = fs.readFileSync(dbPath, 'utf-8');
  const products: Product[] = JSON.parse(fileContent);

  return (
    <div className="min-h-screen bg-background text-foreground py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-headline tracking-wider text-primary">Kente Krown Admin</h1>
          <p className="text-muted-foreground mt-2">Manage products, pricing, badges, and images</p>
        </div>
        
        <AdminDashboard initialProducts={products} />
      </div>
    </div>
  );
}
