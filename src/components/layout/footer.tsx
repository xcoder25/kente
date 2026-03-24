'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  const router = useRouter();
  const clickCount = useRef(0);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleSecretClick = () => {
    clickCount.current += 1;
    
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }

    if (clickCount.current >= 4) {
      router.push('/admin');
      clickCount.current = 0;
    } else {
      clickTimeout.current = setTimeout(() => {
        clickCount.current = 0;
      }, 1000);
    }
  };

  return (
    <footer className="relative border-t border-primary/15 bg-card overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              hsl(38 95% 62%) 20px,
              hsl(38 95% 62%) 21px
            ), repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              hsl(38 95% 62%) 20px,
              hsl(38 95% 62%) 21px
            )`,
          }}
        />
      </div>

      {/* Kente top strip */}
      <div className="kente-strip w-full" />

      <div className="relative container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <div onClick={handleSecretClick} className="inline-block cursor-pointer select-none">
              <Logo />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm text-sm">
              Wear Your Heritage. Own Your Crown. We blend African tradition with modern streetwear
              — creating clothing that empowers you to celebrate your roots with pride and style.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="md:col-span-3">
            <h3 className="font-headline text-sm font-semibold tracking-widest text-primary uppercase mb-5">
              Shop
            </h3>
            <ul className="space-y-3">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Hoodies', 'T-Shirts', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="font-headline text-sm font-semibold tracking-widest text-primary uppercase mb-5">
              Stay Connected
            </h3>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Get exclusive offers, cultural stories, and early access to new collections.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="your@email.com"
                className="bg-background/50 border-primary/20 focus:border-primary placeholder:text-muted-foreground/50 text-sm"
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold tracking-wide transition-all duration-200 hover:shadow-lg hover:shadow-primary/20"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground/60 mt-3">
              No spam ever. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Kente Krown. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="text-border">·</span>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <span className="text-border">·</span>
            <Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
