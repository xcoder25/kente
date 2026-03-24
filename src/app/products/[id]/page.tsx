'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products, formatNGN } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Bot, ArrowLeft, Star, Heart, Share2, Check } from 'lucide-react';
import Link from 'next/link';
import { use, useState } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Use `use` hook to unwrap params correctly for Next.js 15
  const resolvedParams = use(params);
  const product = products.find(p => p.id === resolvedParams.id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isWished, setWished] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0 && product.sizes[0] !== 'One Size') {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product);
    toast({
      title: "✓ Added to cart",
      description: `${product.name} (${selectedSize || 'One Size'})`,
    });
  };

  const productImages = product.images.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="container py-12 animate-fade-in">
      {/* Breadcrumb back */}
      <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Collection
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column - Gallery */}
        <div className="sticky top-28 space-y-4">
          <Carousel className="w-full relative overflow-hidden rounded-2xl border border-primary/20 bg-secondary/20 shadow-2xl">
            <CarouselContent>
              {productImages.map((image, index) => (
                image && (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} - view ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-ai-hint={image.imageHint}
                        priority={index === 0}
                      />
                      {/* Product Badges */}
                      {index === 0 && product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg ${
                            product.badge === 'Sale' ? 'bg-rose-500 text-white' :
                            product.badge === 'New' ? 'bg-emerald-500 text-white' :
                            'bg-primary text-primary-foreground'
                          }`}>
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  </CarouselItem>
                )
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-10 w-10 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground backdrop-blur-md" />
            <CarouselNext className="right-4 h-10 w-10 bg-background/50 border-primary/20 hover:bg-primary hover:text-primary-foreground backdrop-blur-md" />
          </Carousel>

          {/* Thumbnail grid */}
          <div className="hidden lg:grid grid-cols-4 gap-4">
            {productImages.map((img, i) => img && (
              <div key={i} className="aspect-square relative rounded-xl border border-primary/10 overflow-hidden bg-secondary/20 cursor-pointer hover:border-primary/50 transition-colors">
                <Image src={img.imageUrl} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="space-y-8 py-4">
          
          <div className="space-y-4 border-b border-primary/10 pb-8">
            <p className="text-primary tracking-[0.2em] uppercase text-xs font-semibold">
              {product.category}
            </p>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating!) ? 'fill-primary text-primary' : 'fill-muted text-muted'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">{product.rating} / 5</span>
                <span className="text-sm text-muted-foreground hover:text-primary cursor-pointer border-b border-dashed border-muted-foreground hover:border-primary transition-colors">
                  Read {product.reviewCount} Reviews
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-4 mt-6">
              <span className="text-4xl font-bold text-primary font-headline tracking-tight">
                {formatNGN(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatNGN(product.originalPrice!)}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-6 pt-4">
            {/* Sizing */}
            {product.sizes.length > 0 && product.sizes[0] !== 'One Size' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm uppercase tracking-wider">Select Size</span>
                  <button className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4 decoration-primary/30">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 min-w-[3rem] px-4 rounded-lg flex items-center justify-center font-medium border transition-all ${
                        selectedSize === size 
                          ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                          : 'bg-background hover:border-primary/50 text-foreground border-primary/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold tracking-wide text-lg rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> 
                Add to Cart
              </Button>
              <div className="flex gap-4">
                <Button 
                  onClick={() => setWished(!isWished)}
                  variant="outline" 
                  size="icon" 
                  className={`h-14 w-14 rounded-xl border-primary/20 transition-all ${isWished ? 'border-rose-500 bg-rose-500/10' : 'hover:border-primary'}`}
                >
                  <Heart className={`h-6 w-6 ${isWished ? 'fill-rose-500 text-rose-500' : 'text-foreground'}`} />
                </Button>
                <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-primary/20 hover:border-primary">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 py-4 bg-secondary/30 rounded-xl p-4 border border-primary/10">
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="h-3 w-3 text-emerald-500"/></div>
                Ready to ship nationwide
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"><Check className="h-3 w-3 text-primary"/></div>
                Authentic handcrafted materials
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full pt-8">
            <TabsList className="w-full justify-start border-b rounded-none border-primary/10 bg-transparent h-auto p-0 space-x-8">
              <TabsTrigger 
                value="description" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 font-headline text-lg tracking-wide"
              >
                Description
              </TabsTrigger>
              <TabsTrigger 
                value="story" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 py-3 font-headline text-lg tracking-wide"
              >
                Cultural Origin
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-8">
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            </TabsContent>
            <TabsContent value="story" className="mt-8">
              <div className="p-6 rounded-2xl bg-secondary/30 relative border border-primary/20 overflow-hidden group">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 opacity-10 blur-xl group-hover:scale-110 transition-transform duration-700">
                  <div className="h-32 w-32 rounded-full bg-primary" />
                </div>
                <h3 className="font-headline text-xl text-primary mb-3">The Meaning Behind The Pattern</h3>
                <p className="text-foreground/90 leading-relaxed z-10 relative">{product.culturalStory}</p>
                <div className="mt-6 pt-6 border-t border-primary/20 z-10 relative">
                  <p className="text-sm text-muted-foreground"><strong className="text-primary font-medium">Design Notes:</strong> {product.kentePatternDescription}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="pt-10 border-t border-primary/10">
             <Link href={`/styling-assistant?pattern=${encodeURIComponent(product.kentePatternDescription)}&productName=${encodeURIComponent(product.name)}`} passHref>
              <Button variant="outline" className="w-full h-16 group border-primary/30 hover:bg-primary/5 hover:border-primary relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Bot className="mr-3 h-6 w-6 text-primary group-hover:animate-pulse" /> 
                <span className="font-semibold text-lg tracking-wide">Get AI Styling Advice for this piece</span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
