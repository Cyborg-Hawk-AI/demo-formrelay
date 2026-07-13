import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-800">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
              FR
            </div>
            <span className="font-semibold text-gray-200">FormRelay</span>
            <span className="text-sm text-gray-500">· Built for Indian SMBs</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <Link href="/demo" className="transition hover:text-brand-400">
              Live Demo
            </Link>
            <Link href="/developers" className="transition hover:text-brand-400">
              Developers
            </Link>
            <Link href="/research" className="transition hover:text-brand-400">
              How we found this idea
            </Link>
          </nav>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FormRelay · Demo by Idea Miner
          </p>
        </div>
      </div>
    </footer>
  );
}
