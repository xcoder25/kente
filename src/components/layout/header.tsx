"use client";
import Link from 'next/link';
import { Menu, ShoppingCart, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/#cultural-hub', label: 'Cultural Hub' },
  { href: '/styling-assistant', label: 'Styling Assistant' },
];

export function Header() {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background">
              <div className="p-4">
                <Logo />
                <nav className="mt-8 flex flex-col space-y-4">
                  {navLinks.map(({ href, label }) => (
                    <Link key={href} href={href} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                      {label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-center">
          <div className="md:hidden flex-1">
             <div className="w-full flex justify-center">
                <Logo />
             </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-foreground/60 transition-colors hover:text-foreground/80">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end space-x-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-white bg-accent">
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
