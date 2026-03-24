'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Trash2, ShoppingBag } from 'lucide-react';
import { formatNGN } from '@/lib/products';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 150000 ? 0 : 5000;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container py-24 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-4xl font-headline">Your Cart is Empty</h1>
        <p className="mt-4 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-8">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-headline mb-8">Your Cart</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <div className="space-y-6">
            {cart.map(item => {
              const image = PlaceHolderImages.find(p => p.id === item.images[0]);
              return (
                <Card key={item.id} className="flex items-center p-4">
                  <div className="w-24 h-24 relative mr-4">
                    {image && (
                       <Image
                        src={image.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                        data-ai-hint={image.imageHint}
                       />
                    )}
                  </div>
                  <div className="flex-grow">
                    <Link href={`/products/${item.id}`} className="font-headline text-lg hover:text-primary">{item.name}</Link>
                    <p className="text-sm text-muted-foreground">Price: {formatNGN(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                      className="w-16 text-center"
                    />
                     <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-5 w-5 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                  <div className="w-24 text-right font-bold">
                    {formatNGN(item.price * item.quantity)}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatNGN(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatNGN(shipping)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatNGN(total)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full">Proceed to Checkout</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
