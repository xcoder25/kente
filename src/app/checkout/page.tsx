'use client';

import { useCart } from '@/hooks/use-cart';
import { formatNGN } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lock, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150000 ? 0 : 5000;
  const total = subtotal + shipping;

  const getImgInfo = (idOrUrl?: string) => {
    if (!idOrUrl) return undefined;
    if (idOrUrl.startsWith('http')) return { imageUrl: idOrUrl, imageHint: 'external product' };
    return PlaceHolderImages.find((p) => p.id === idOrUrl);
  };

  if (cart.length === 0) {
    return (
      <div className="container py-24 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50 mb-6" />
        <h1 className="text-3xl font-headline tracking-wide">Your Cart is Empty</h1>
        <p className="mt-4 text-muted-foreground">Select some heritage pieces before checking out.</p>
        <Button asChild className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/products">Return to Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-24">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Checkout Header */}
        <div className="mb-12 text-center border-b border-primary/10 pb-8">
          <h1 className="text-3xl md:text-5xl font-headline tracking-tighter mb-4">
            Secure <span className="text-gold-gradient italic">Checkout</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-emerald-500 font-medium bg-emerald-500/10 w-max mx-auto px-4 py-1.5 rounded-full border border-emerald-500/20">
            <Lock className="h-4 w-4" /> SSL Encrypted Connection
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Forms */}
          <div className="w-full lg:w-3/5 space-y-10">
            
            {/* Contact Info */}
            <section>
              <h2 className="text-xl font-headline uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-primary" /> Contact Information
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs text-muted-foreground uppercase tracking-widest">Email Address</Label>
                  <Input id="email" type="email" placeholder="you@example.com" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs text-muted-foreground uppercase tracking-widest">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+234 XXX XXXX" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-headline uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-primary" /> Shipping Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs text-muted-foreground uppercase tracking-widest">First Name</Label>
                  <Input id="firstName" placeholder="Kwame" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs text-muted-foreground uppercase tracking-widest">Last Name</Label>
                  <Input id="lastName" placeholder="Mensah" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-xs text-muted-foreground uppercase tracking-widest">Street Address</Label>
                  <Input id="address" placeholder="123 Heritage Ave" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs text-muted-foreground uppercase tracking-widest">City</Label>
                  <Input id="city" placeholder="Lagos" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-xs text-muted-foreground uppercase tracking-widest">State / Region</Label>
                  <Input id="state" placeholder="LA" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-xs text-muted-foreground uppercase tracking-widest">Postal Code</Label>
                  <Input id="zip" placeholder="100001" className="h-12 bg-secondary/50 border-primary/20 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-xs text-muted-foreground uppercase tracking-widest">Country</Label>
                  <Input id="country" defaultValue="Nigeria" readOnly className="h-12 bg-secondary/20 cursor-not-allowed border-primary/10 text-muted-foreground" />
                </div>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h2 className="text-xl font-headline uppercase tracking-widest text-primary mb-6 flex items-center gap-3">
                <span className="h-px w-6 bg-primary" /> Payment Method
              </h2>
              
              <div className="border border-primary/30 rounded-xl p-6 bg-secondary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                
                <div className="flex items-center gap-4 mb-6">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <span className="font-semibold tracking-wide">Credit / Debit Card</span>
                </div>
                
                <div className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    <Label htmlFor="cc-name" className="text-xs text-muted-foreground uppercase tracking-widest">Name on Card</Label>
                    <Input id="cc-name" placeholder="Kwame Mensah" className="h-12 bg-background border-primary/20 focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc-number" className="text-xs text-muted-foreground uppercase tracking-widest">Card Number</Label>
                    <Input id="cc-number" placeholder="0000 0000 0000 0000" className="h-12 bg-background border-primary/20 focus:border-primary font-mono tracking-widest" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cc-exp" className="text-xs text-muted-foreground uppercase tracking-widest">Expiry Date</Label>
                      <Input id="cc-exp" placeholder="MM/YY" className="h-12 bg-background border-primary/20 focus:border-primary font-mono" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cc-cvc" className="text-xs text-muted-foreground uppercase tracking-widest">CVC</Label>
                      <Input id="cc-cvc" placeholder="123" type="password" maxLength={4} className="h-12 bg-background border-primary/20 focus:border-primary font-mono" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-2/5">
            <Card className="sticky top-24 border-primary/20 bg-card shadow-2xl overflow-hidden rounded-2xl">
              <div className="h-2 w-full kente-strip" />
              <CardHeader className="bg-secondary/30 pb-6">
                <CardTitle className="font-headline text-2xl tracking-wide flex items-center justify-between">
                  Order Summary
                  <span className="text-sm font-sans font-normal text-muted-foreground">{cart.length} items</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map((item) => {
                    const image = getImgInfo(item.images[0]);
                    return (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-20 w-16 md:h-24 md:w-20 relative rounded-lg overflow-hidden border border-primary/10 flex-shrink-0 bg-secondary">
                          {image && (
                            <Image
                              src={image.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          )}
                          <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-card">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-grow py-1">
                          <h4 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground uppercase mt-1">Qty: {item.quantity}</p>
                          <p className="font-headline font-bold text-primary mt-2">
                            {formatNGN(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-6 bg-primary/10" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">{formatNGN(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? 'Free' : formatNGN(shipping)}</span>
                  </div>
                </div>

                <Separator className="my-6 bg-primary/10" />

                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-sm text-muted-foreground uppercase tracking-widest mb-1">Total Due</span>
                    <span className="text-[10px] text-muted-foreground">Including VAT</span>
                  </div>
                  <span className="text-3xl font-headline font-bold text-primary">
                    {formatNGN(total)}
                  </span>
                </div>
              </CardContent>
              
              <CardFooter className="bg-secondary/30 pt-6 flex-col gap-4">
                <Button size="lg" className="w-full h-14 bg-primary hover:bg-white text-primary-foreground hover:text-black font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                  <Lock className="mr-2 h-4 w-4" /> Pay {formatNGN(total)}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground text-center">
                  <ShieldCheck className="h-4 w-4" /> Payments are secure and encrypted.
                </div>
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
