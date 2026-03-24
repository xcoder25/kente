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
              <SheetContent side="left" className="bg-background/95 backdrop-blur-xl border-r border-primary/20 w-72">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <Logo />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileOpen(false)}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  {/* Kente divider */}
                  <div className="kente-strip rounded-full mb-8" />
                  <nav className="flex flex-col space-y-1">
                    {navLinks.map(({ href, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-foreground/70 hover:text-primary hover:bg-primary/10 transition-all duration-200"
                      >
                        <span className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                        {label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-8 pt-8 border-t border-border/50">
                    <p className="text-xs text-muted-foreground tracking-widest uppercase">Wear Your Heritage</p>
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
