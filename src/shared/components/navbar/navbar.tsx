import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-8 pt-10">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-full rounded text-sm">
        <span className="text-lg tracking-[0.25em] font-light">CALARYS</span>

        <div className="flex items-center justify-center gap-10 text-neutral-700">
          <Link href="">Components</Link>
          <Link href="">Collections</Link>
          <Link href="">Journal</Link>
          <Link href="">GitHub ↗</Link>
        </div>

        <button className="relative flex items-center justify-between min-w-40 px-4 gap-4 h-8 rounded-full bg-neutral-100">
          Search
          <kbd className="rounded border px-1.5 py-0.5 text-xs text-neutral-500">
            ⌘K
          </kbd>
        </button>
      </div>
    </nav>
  );
}
