'use client';

import { useState } from 'react';
import { updateProductDetails } from '@/app/actions/admin';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface AdminDashboardProps {
  initialProducts: Product[];
}

export function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  // Use state to reflect optimistic updates or reset easily
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>();
  const [badge, setBadge] = useState<string>('None');
  const [image1Url, setImage1Url] = useState<string>('');

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || 0);
    setBadge(product.badge || 'None');
    setImage1Url(product.images[0]?.startsWith('http') ? product.images[0] : '');
  };

  const handleSave = async (currentProduct: Product) => {
    if (!editingId) return;
    setLoading(true);

    const oldImages = [...currentProduct.images];
    if (image1Url.trim()) {
      oldImages[0] = image1Url.trim();
    }

    const updates = {
      price,
      originalPrice: originalPrice ? originalPrice : undefined,
      badge: badge === 'None' ? undefined : badge,
      images: oldImages,
    };
    
    const res = await updateProductDetails(editingId, updates);
    
    if (res.success) {
      toast({
        title: 'Product Updated',
        description: `Successfully updated ${currentProduct.name}.`,
      });
      // Optimistic locally
      setProducts(products.map(p => p.id === editingId ? { ...p, ...updates } : p));
      setEditingId(null);
    } else {
      toast({
        title: 'Error',
        description: res.error || 'Failed to update product',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border border-border rounded-xl p-5 bg-card flex flex-col shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground font-mono mt-1">{product.id}</p>
            </div>
            {product.badge && (
              <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-primary/20 text-primary whitespace-nowrap">
                {product.badge}
              </span>
            )}
          </div>

          {editingId === product.id ? (
            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <Label className="text-xs">Price (₦)</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Original Price (₦)</Label>
                <Input
                  type="number"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  placeholder="Optional for sales"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Badge</Label>
                <Select value={badge} onValueChange={setBadge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a badge" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Best Seller">Best Seller</SelectItem>
                    <SelectItem value="Sale">Sale</SelectItem>
                    <SelectItem value="Limited">Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Primary Image URL (Unsplash/HTTP)</Label>
                <Input
                  type="url"
                  value={image1Url}
                  onChange={(e) => setImage1Url(e.target.value)}
                  placeholder="Leave empty to use default"
                />
              </div>
              
              <div className="flex border-t border-border pt-4 mt-4 gap-3">
                <Button 
                  onClick={() => handleSave(product)} 
                  disabled={loading} 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button onClick={() => setEditingId(null)} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm bg-muted/30 p-3 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-0.5">Price</p>
                  <p className="font-semibold">₦{product.price.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase mb-0.5">Original</p>
                  <p className="font-semibold text-muted-foreground line-through">
                    {product.originalPrice ? `₦${product.originalPrice.toLocaleString()}` : '—'}
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-border">
                <Button 
                  onClick={() => handleEdit(product)} 
                  variant="secondary" 
                  className="w-full hover:bg-primary hover:text-primary-foreground group transition-colors"
                >
                  Edit Product
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
