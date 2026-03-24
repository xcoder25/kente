import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Crown, Star, Sparkles, MoveRight, Leaf, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero-1');
  const storyImage = PlaceHolderImages.find((p) => p.id === 'story-1');

  // Determine top 4 products
  const newArrivals = products.filter((p) => p.badge === 'New').slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === 'Best Seller').slice(0, 4);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-[65vh] sm:min-h-[85vh] md:h-[95vh] w-full flex items-center justify-center overflow-hidden">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-top sm:object-center transform scale-105 animate-[kenburns_20s_ease-out_infinite_alternate]"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}

        {/* Multi-layer gradient overlays to make text readable & cinematic */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background z-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent z-0" />

        {/* Top & Bottom decorative strips */}
        <div className="absolute inset-x-0 top-[64px] kente-strip opacity-60 z-0 h-[6px]" />
        
        {/* Content Container */}
        <div className="container relative z-10 flex flex-col items-center justify-center h-full text-center px-4 mt-20 md:mt-0">
          
          {/* Subtle top badge */}
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md animate-fade-up shadow-xl shadow-primary/10 mb-8 max-w-fit mx-auto">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
              The Fall/Winter Collection
            </span>
            <Crown className="h-4 w-4 text-primary" />
          </div>

          <h1 className="font-headline text-5xl sm:text-7xl md:text-8xl lg:text-[130px] tracking-tighter leading-[0.85] animate-fade-up animation-delay-200 drop-shadow-2xl mt-4 sm:mt-0">
            <span className="text-white relative inline-block">
              Royal
              <div className="absolute -left-6 -top-4 opacity-50"><Sparkles className="h-8 w-8 text-primary" /></div>
            </span>
            <br />
            <span className="text-gold-gradient italic -ml-4 md:-ml-8 relative z-10">Ascension</span>
          </h1>

          <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-white/80 leading-relaxed font-light animate-fade-up animation-delay-400 drop-shadow-md">
            Woven in legacy, designed for the streets. Discover premium African heritage garments crafted for the modern monarch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10 w-full px-6 sm:px-0 animate-fade-up animation-delay-600">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-white text-primary-foreground hover:text-black font-bold px-10 py-7 text-lg uppercase tracking-widest rounded-none shadow-[0_0_40px_-10px_rgba(201,168,76,0.5)] transition-all duration-500 w-full sm:w-auto hover:scale-[1.02]"
            >
              <Link href="/products">
                Shop Men <MoveRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10 hover:border-primary hover:text-primary px-10 py-7 text-lg uppercase tracking-widest rounded-none backdrop-blur-sm transition-all duration-500 w-full sm:w-auto"
            >
              <Link href="/products">Shop Women</Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 animate-bounce z-10 hidden sm:flex">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase">Discover</div>
          <div className="h-10 w-px bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* ── NEW ARRIVALS MARQUEE / HIGHLIGHTS ────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C10_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-primary"></span> Just Landed
              </h2>
              <h3 className="text-4xl md:text-6xl font-headline leading-none">
                New <span className="text-gold-gradient italic">Season</span> Drops
              </h3>
            </div>
            <Link href="/products" className="text-sm font-bold tracking-widest text-muted-foreground hover:text-primary uppercase flex items-center gap-2 group transition-colors border-b border-primary/30 pb-1">
              View Collection
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-2 text-primary" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURAL STORY SPLIT ───────────────────────────────────── */}
      <section className="py-24 bg-card border-y border-primary/20 relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Image side */}
            <div className="relative group order-2 lg:order-1 h-[350px] sm:h-[450px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
              {storyImage && (
                <>
                  <Image
                    src={storyImage.imageUrl}
                    alt={storyImage.description}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    data-ai-hint={storyImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                  
                  {/* Floating info card */}
                  <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-xl border border-white/10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
                    <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Kumasi, Ghana</p>
                    <p className="text-sm text-white leading-relaxed">Our weavers use techniques passed down through generations since the 17th century Ashanti Empire.</p>
                  </div>
                </>
              )}
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary m-6 opacity-50" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary m-6 opacity-50" />
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase flex items-center gap-3">
                <span className="h-px w-8 bg-primary"></span> Our Origin
              </h2>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-headline leading-[1.1]">
                More Than Threads. <br />
                A <span className="text-gold-gradient italic">Tapestry</span> of Identity.
              </h3>
              
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
                <p>
                  Every piece of Kente cloth holds a proverb, a philosophical concept, or a historical event. At Kente Krown, we don&apos;t just print these patterns; we honor their meaning.
                </p>
                <p>
                  By integrating authentic West African Adinkra symbolism and hand-woven Kente into contemporary street luxury silhouettes, we create garments that speak before you do.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-primary/10">
                <div>
                  <div className="text-4xl font-headline text-primary mb-2">100%</div>
                  <div className="text-xs font-bold tracking-wider uppercase text-foreground/70">Authentic Patterns</div>
                </div>
                <div>
                   <div className="text-4xl font-headline text-primary mb-2">50+</div>
                   <div className="text-xs font-bold tracking-wider uppercase text-foreground/70">Local Artisans</div>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-8 border-primary text-primary hover:bg-primary hover:text-black rounded-none px-8 py-6 tracking-widest uppercase text-sm"
              >
                <Link href="/products">Read The Full Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS CAROUSEL ──────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 flex justify-center items-center gap-3">
              <span className="h-px w-8 bg-primary"></span> Community Favorites <span className="h-px w-8 bg-primary"></span>
            </h2>
            <h3 className="text-4xl md:text-6xl font-headline">
              The <span className="text-gold-gradient italic">Crown</span> Jewels
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 xl:gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-secondary hover:bg-primary hover:text-black text-foreground border border-primary/20 hover:border-primary px-10 py-6 tracking-widest rounded-none transition-all duration-300 shadow-md uppercase text-sm font-bold"
            >
              <Link href="/products">Shop All Bestsellers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS (TRUST BAR) ────────────────────────────────── */}
      <section className="py-16 bg-secondary border-t border-primary/10">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Leaf, title: 'Ethically Sourced', desc: 'Supporting local African artisans with fair trade practices.' },
              { icon: ShieldCheck, title: 'Premium Quality', desc: 'Heavyweight fabrics built to last across generations.' },
              { icon: Truck, title: 'Global Shipping', desc: 'Free express delivery on orders above ₦150,000.' },
              { icon: RefreshCcw, title: 'Free Returns', desc: 'Secure 14-day return window. No questions asked.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center group">
                <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center border border-primary/20 mb-6 group-hover:scale-110 group-hover:border-primary transition-all duration-500 shadow-lg shadow-primary/5">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-headline text-xl mb-3 tracking-wide">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL WIDTH CTA ─────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden border-t border-primary/20">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        
        {/* Animated Background Text */}
        <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 text-[20vw] font-headline text-primary/5 whitespace-nowrap z-0 pointer-events-none font-bold uppercase select-none flex">
          <div className="animate-[marquee_60s_linear_infinite]">
            OWN YOUR CROWN &nbsp;&nbsp;&nbsp; WEAR YOUR HERITAGE &nbsp;&nbsp;&nbsp;
          </div>
          <div className="animate-[marquee_60s_linear_infinite] absolute top-0 left-full">
            OWN YOUR CROWN &nbsp;&nbsp;&nbsp; WEAR YOUR HERITAGE &nbsp;&nbsp;&nbsp;
          </div>
        </div>

        <div className="container relative z-10 text-center max-w-3xl">
          <Crown className="h-16 w-16 text-primary mx-auto mb-8 drop-shadow-[0_0_15px_rgba(201,168,76,0.5)]" />
          <h2 className="text-4xl md:text-6xl font-headline leading-tight mb-8">
            Join the <span className="text-gold-gradient italic">Dynasty</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light mb-12">
            Sign up to our royalty list to receive 10% off your first order, exclusive access to limited drops, and culturally curated content.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow h-14 bg-background border border-primary/30 px-6 rounded-none text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:ring-offset-0 placeholder:text-muted-foreground/50 transition-colors"
            />
            <Button 
              type="submit" 
              className="h-14 bg-primary hover:bg-white text-primary-foreground hover:text-black font-bold uppercase tracking-widest px-8 rounded-none transition-colors"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
