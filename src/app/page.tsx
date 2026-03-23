import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const featuredProducts = products.slice(0, 4);
  const storyImage = PlaceHolderImages.find(p => p.id === 'story-1');

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl tracking-tight">
            Wear Your Heritage.
          </h1>
          <h2 className="font-headline text-4xl md:text-7xl lg:text-8xl tracking-tight text-primary">
            Own Your Crown.
          </h2>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/90">
            Blending African tradition with modern streetwear, creating clothing that empowers you to celebrate your roots with pride and style.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">
            Featured <span className="text-primary">Collection</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="cultural-hub" className="py-16 md:py-24 bg-card">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline">
              Real Patterns, <span className="text-primary">Real Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Each Kentekrown piece is more than just clothing—it's a narrative. Our Cultural Story Hub invites you to explore the rich history and symbolism woven into every design, celebrating the authenticity and craftsmanship of African heritage.
            </p>
            <p className="text-muted-foreground">
              Discover the meanings behind the motifs, the communities we support, and the journey of tradition into contemporary fashion.
            </p>
            <Button asChild variant="outline">
              <Link href="/products">Explore The Stories</Link>
            </Button>
          </div>
          {storyImage && (
             <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    width={600}
                    height={700}
                    className="object-cover w-full h-full rounded-lg"
                    data-ai-hint={storyImage.imageHint}
                  />
                </CardContent>
             </Card>
          )}
        </div>
      </section>
    </div>
  );
}
