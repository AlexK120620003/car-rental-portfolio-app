import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-lg font-bold text-accent">
          Rentola
        </Link>

        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Rentola. All rights reserved.
        </p>

        <div className="flex gap-6">
          <Link href="/about" className="text-sm text-muted transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="text-sm text-muted transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}