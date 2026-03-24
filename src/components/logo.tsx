import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-primary/30 group-hover:ring-primary/70 transition-all duration-300">
        <Image
          src="/logo.jpeg"
          alt="Kente Krown Logo"
          fill
          className="object-cover"
          sizes="40px"
          priority
        />
      </div>
      <span className="font-headline text-xl md:text-2xl font-bold tracking-widest text-primary uppercase hidden sm:inline-block">
        Kente Krown
      </span>
    </Link>
  );
}
