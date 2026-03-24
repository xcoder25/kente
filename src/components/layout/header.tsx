"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, ShoppingCart, User, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/products', label: 'Collection' },
  { href: '/#cultural-hub', label: 'Cultural Hub' },
  { href: '/styling-assistant', label: 'Style AI' },
];

export function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Kente pattern strip at very top */}
      <div className="kente-strip w-full fixed top-0 z-[60]" />

      <header
        className={`fixed top-[4px] z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-primary/20 shadow-2xl shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container flex h-16 items-center justify-between gap-4">

          {/* Mobile: Hamburger */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground/70 hover:text-primary hover:bg-primary/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background/95 backdrop-blur-3xl border-r border-primary/20 w-[85vw] max-w-[400px] sm:w-[400px] p-0 flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex-1 overflow-y-auto px-8 py-16 flex flex-col h-full">
                  <div className="mb-16 scale-110 origin-left">
                    <Logo />
                  </div>
                  
                  <nav className="flex flex-col space-y-8">
                    {navLinks.map(({ href, label }, i) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="text-4xl font-headline tracking-wider text-foreground/80 hover:text-primary transition-all duration-500 flex items-center group"
                      >
                        <span className="h-0.5 w-0 bg-primary mr-0 transition-all duration-500 group-hover:w-8 group-hover:mr-6" />
                        {label}
                        <span className="ml-auto opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                          <span className="text-primary text-xl">→</span>
                        </span>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto pt-16">
                    <div className="kente-strip w-full h-[3px] mb-8 opacity-60" />
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary mb-6">Connect With The Crown</p>
                    <div className="flex gap-6">
                      {['Instagram', 'Twitter', 'TikTok'].map(social => (
                        <Link 
                          key={social} 
                          href="#" 
                          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                          {social}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Nav - centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative px-4 py-2 text-sm font-medium tracking-wide text-foreground/60 hover:text-primary transition-colors duration-200 group"
              >
                {label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-primary transition-all duration-300 group-hover:w-4/5" />
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Link href="/account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="relative text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
            >
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs bg-primary text-primary-foreground font-bold animate-pulse">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header + kente strip */}
      <div className="h-[4px]" />
    </>
  );
}
