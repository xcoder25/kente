import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <Logo />
            <p className="max-w-md text-muted-foreground">
              Wear Your Heritage. Own Your Crown. Blending African tradition with modern streetwear to empower and inspire.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-primary">Stay Connected</h3>
            <p className="mt-4 text-muted-foreground">Subscribe to our newsletter for exclusive offers and stories.</p>
            <form className="mt-4 flex gap-2">
              <Input type="email" placeholder="Your email" className="bg-background" />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kentekrown. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
