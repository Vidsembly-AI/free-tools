import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/tools";

const LOGO_URL =
  "https://images.squarespace-cdn.com/content/v1/66993e7ac009314a8eed947d/edbc980b-1a65-4d5b-b15e-23d235e8cb39/Main+Vidsembly+Logo+Gradient+%2B+White+PNG.png?format=1500w";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src={LOGO_URL}
            alt="Vidsembly"
            width={160}
            height={36}
            priority
            className="h-8 w-auto"
          />
          <span className="hidden text-sm font-medium text-muted sm:inline">Free Tools</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-elevated hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav className="flex items-center gap-1 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
