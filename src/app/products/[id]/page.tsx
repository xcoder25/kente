'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
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
import { ShoppingCart, Bot } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: product.name,
    });
  };

  const productImages = product.images.map(id => PlaceHolderImages.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="sticky top-24">
          <Carousel>
            <CarouselContent>
              {productImages.map((image, index) => (
                image && (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/5] relative">
                      <Image
                        src={image.imageUrl}
                        alt={`${product.name} - view ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  </CarouselItem>
                )
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div className="space-y-6">
          <h1 className="font-headline text-4xl md:text-5xl">{product.name}</h1>
          <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-4">
            <div className="w-1/3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-grow">
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="story">Cultural Story</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 prose prose-invert max-w-none text-muted-foreground">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="story" className="mt-4 prose prose-invert max-w-none text-muted-foreground">
              <p>{product.culturalStory}</p>
            </TabsContent>
          </Tabs>

          <div className="pt-4">
             <Link href={`/styling-assistant?pattern=${encodeURIComponent(product.kentePatternDescription)}&productName=${encodeURIComponent(product.name)}`} passHref>
              <Button variant="outline" className="w-full">
                <Bot className="mr-2 h-5 w-5" /> Get Styling Advice with AI
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
