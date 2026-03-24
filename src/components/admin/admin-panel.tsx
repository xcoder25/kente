'use client';

import { useState } from 'react';
import { updateProductDetails } from '@/app/actions/admin';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AdminPanelProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ products, isOpen, onClose }: AdminPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>();
  const [badge, setBadge] = useState<string>('None');

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setPrice(product.price);
    setOriginalPrice(product.originalPrice || 0);
    setBadge(product.badge || 'None');
  };

  const handleSave = async () => {
    if (!editingId) return;
    setLoading(true);
    
    // Call server action
    const updates = {
      price,
      originalPrice: originalPrice ? originalPrice : undefined,
      badge: badge === 'None' ? undefined : badge,
    };
    
    const res = await updateProductDetails(editingId, updates);
    
    if (res.success) {
      toast({
        title: 'Product Updated',
        description: `Successfully updated the product.`,
      });
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            Admin Dashboard
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <div className="space-y-4 pr-4 py-4">
            {products.map((product) => (
              <div key={product.id} className="border border-primary/10 rounded-xl p-4 bg-secondary/20 flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{product.name}</h4>
                  <p className="text-sm text-primary">ID: {product.id}</p>
                </div>

                {editingId === product.id ? (
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Price (NGN)</Label>
                      <Input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-32"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Orig. Price (NGN)</Label>
                      <Input
                        type="number"
                        value={originalPrice || ''}
                        onChange={(e) => setOriginalPrice(Number(e.target.value))}
                        placeholder="Optional"
                        className="w-32"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Badge</Label>
                      <Select value={badge} onValueChange={setBadge}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Badge" />
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
                    <div className="flex items-end gap-2 pb-0.5 ml-auto">
                      <Button onClick={handleSave} disabled={loading} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        {loading ? 'Saving...' : 'Save'}
                      </Button>
                      <Button onClick={() => setEditingId(null)} variant="ghost" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-6 justify-between flex-1">
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase">Price</p>
                        <p className="font-medium">₦{product.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase">Original</p>
                        <p className="font-medium text-muted-foreground line-through">
                          {product.originalPrice ? `₦${product.originalPrice.toLocaleString()}` : '—'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase">Badge</p>
                        <p className="font-medium text-primary">{product.badge || '—'}</p>
                      </div>
                    </div>
                    <Button onClick={() => handleEdit(product)} variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
