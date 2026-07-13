import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-surface-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">
            FR
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Form<span className="text-brand-400">Relay</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-gray-300 md:flex">
          <Link href="/#features" className="transition hover:text-white">
            Features
          </Link>
          <Link href="/#pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/demo" className="transition hover:text-white">
            Live Demo
          </Link>
          <Link href="/developers" className="transition hover:text-white">
            Developers
          </Link>
          <Link href="/research" className="transition hover:text-white">
            Research
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/demo"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </header>
  );
}
