import { Gamepad2, Search } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-500/20">
            <Gamepad2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            NEXUS <span className="text-indigo-500">ARCADE</span>
          </span>
        </div>

        <div className="relative flex flex-1 max-w-md ml-8">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-zinc-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border-white/10 bg-zinc-900 py-2 pl-10 pr-3 text-sm text-white placeholder-zinc-500 ring-offset-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            placeholder="Search for a game..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
}
