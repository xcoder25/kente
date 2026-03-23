'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';


export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const firstImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  const secondImage = product.images.length > 1 ? PlaceHolderImages.find(p => p.id === product.images[1]) : firstImage;

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: product.name,
    });
  };

  return (
    <Card className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border-border/60">
      <Link href={`/products/${product.id}`}>
        <CardHeader className="p-0">
          <div className="aspect-[4/5] relative bg-card">
            {firstImage && (
              <Image 
                src={firstImage.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover transition-opacity duration-300 group-hover:opacity-0" 
                data-ai-hint={firstImage.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            {secondImage && (
              <Image 
                src={secondImage.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                data-ai-hint={secondImage.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 bg-card">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-headline text-lg truncate text-foreground">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
          <Button size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
