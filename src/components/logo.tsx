import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="text-2xl md:text-3xl font-headline font-bold tracking-tight text-primary">
      Kentekrown
    </Link>
  );
}
