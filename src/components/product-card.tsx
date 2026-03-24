'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import type { Product } from '@/lib/products';
import { formatNGN } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const BADGE_STYLES: Record<string, string> = {
  New: 'bg-emerald-500/90 text-white',
  'Best Seller': 'bg-primary/90 text-primary-foreground',
  Limited: 'bg-accent/90 text-white',
  Sale: 'bg-rose-500/90 text-white',
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [wished, setWished] = useState(false);
  const getImgInfo = (idOrUrl?: string) => {
    if (!idOrUrl) return undefined;
    if (idOrUrl.startsWith('http')) return { imageUrl: idOrUrl, imageHint: 'external product' };
    return PlaceHolderImages.find((p) => p.id === idOrUrl);
  };

  const firstImage = getImgInfo(product.images[0]);
  const secondImage = product.images.length > 1 ? getImgInfo(product.images[1]) : firstImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({ title: '✓ Added to cart', description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished((w) => !w);
    toast({
      title: wished ? 'Removed from wishlist' : '❤️ Saved to wishlist',
      description: product.name,
    });
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-card hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5">

      {/* Image Area */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/5] relative bg-secondary/30">
          {firstImage && (
            <Image
              src={firstImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-110"
              data-ai-hint={firstImage.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
          {secondImage && (
            <Image
              src={secondImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
              data-ai-hint={secondImage.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}

          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end justify-center pb-4">
            <div className="flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100">
              <span className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-background/90 backdrop-blur-sm text-xs font-semibold text-foreground border border-primary/20 hover:border-primary transition-colors">
                <Eye className="h-3.5 w-3.5 text-primary" />
                Quick View
              </span>
            </div>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm ${BADGE_STYLES[product.badge]}`}>
                {product.badge === 'Sale' && hasDiscount ? `-${discountPct}%` : product.badge}
              </span>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-10 h-8 w-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${
              wished
                ? 'bg-rose-500 border-rose-400 text-white scale-110'
                : 'bg-background/70 border-primary/20 text-muted-foreground hover:text-rose-400 hover:border-rose-400'
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${wished ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Kente accent line */}
        <div className="h-0.5 kente-strip w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>

      {/* Info Area */}
      <div className="flex flex-col flex-1 p-2 sm:p-4">
        <Link href={`/products/${product.id}`} className="block">
          <p className="text-[9px] sm:text-[11px] font-medium text-primary/70 tracking-widest uppercase mb-0.5 sm:mb-1">{product.category}</p>
          <h3 className="font-headline text-sm sm:text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1 sm:mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < Math.floor(product.rating!) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[11px] text-muted-foreground">({product.reviewCount})</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-2.5 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border/50">
          <div>
            <p className="text-sm sm:text-lg font-bold text-primary font-headline leading-none">{formatNGN(product.price)}</p>
            {hasDiscount && (
              <p className="text-[10px] sm:text-xs text-muted-foreground line-through mt-0.5">{formatNGN(product.originalPrice!)}</p>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all duration-200 hover:scale-105 h-auto"
          >
            <ShoppingCart className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="hidden sm:inline">Add</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
