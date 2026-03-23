import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

export default function ProductsPage() {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">All Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">Discover the full collection of Kentekrown apparel and accessories.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <h2 className="text-2xl font-headline mb-4">Filters</h2>
            <Accordion type="multiple" defaultValue={['category', 'price']} className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger className="text-lg font-headline">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 p-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="text-lg font-headline">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <Slider defaultValue={[50]} max={200} step={1} />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>$0</span>
                      <span>$200</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>

        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
