import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Crown, SlidersHorizontal, ArrowDownAZ } from 'lucide-react';

export default function ProductsPage() {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ── HERO BANNER ─────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-secondary overflow-hidden border-b border-primary/20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 via-background to-background" />
        <div className="absolute inset-x-0 bottom-0 kente-strip opacity-50" />
        <div className="container relative z-10 flex flex-col items-center text-center">
          <Crown className="h-10 w-10 text-primary mb-6 animate-pulse" />
          <h1 className="font-headline text-5xl md:text-7xl leading-tight mb-4">
            The <span className="text-gold-gradient">Collection</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl px-4 animate-fade-up">
            Every piece is a masterclass in cultural expression. Browse our full range of 
            premium streetwear interwoven with African heritage.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* ── SIDEBAR FILTERS ───────────────────────────────────── */}
          <aside className="lg:col-span-1 border-r border-primary/10 pr-6 hidden lg:block">
            <div className="sticky top-28 space-y-10">
              
              <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-headline tracking-wide">Filters</h2>
              </div>

              {/* Categories */}
              <div className="space-y-5">
                <h3 className="font-headline text-lg text-primary uppercase tracking-widest">Category</h3>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-3 group cursor-pointer">
                      <Checkbox id={category} className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                      <label 
                        htmlFor={category} 
                        className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors cursor-pointer w-full"
                      >
                        {category}
                        <span className="float-right text-xs opacity-50 bg-secondary/50 px-2 py-0.5 rounded-full">
                          {products.filter(p => p.category === category).length}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-5 pt-6 border-t border-primary/10">
                <h3 className="font-headline text-lg text-primary uppercase tracking-widest">Price Range</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[200000]} 
                    max={300000} 
                    step={1000} 
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs font-medium text-muted-foreground mt-2">
                    <span>₦0</span>
                    <span>₦300k+</span>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* ── PRODUCT GRID ──────────────────────────────────────── */}
          <main className="lg:col-span-3">
            
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-secondary/20 p-4 rounded-2xl border border-primary/10">
              <p className="text-sm text-muted-foreground font-medium">
                Showing <strong className="text-foreground">{products.length}</strong> Results
              </p>
              
              {/* Mobile Filter Toggle */}
              <button className="lg:hidden flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-lg text-sm font-medium">
                <SlidersHorizontal className="h-4 w-4 text-primary" /> Filters
              </button>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:block">Sort by:</span>
                <button className="flex items-center gap-2 px-4 py-2 bg-background border border-primary/20 hover:border-primary/50 transition-colors rounded-lg text-sm font-medium">
                  Featured <ArrowDownAZ className="h-4 w-4 text-primary" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center mt-16">
              <div className="flex gap-2">
                {[1, 2, 3].map(page => (
                  <button 
                    key={page}
                    className={`h-10 w-10 rounded-full font-medium transition-colors border ${
                      page === 1 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-transparent border-primary/20 hover:border-primary/50 text-foreground'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
