import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import CategoryFilter from './components/CategoryFilter';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';
import gamesData from './data/games.json';
import { Game } from './types';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const games = gamesData as Game[];

  const categories = useMemo(() => {
    const cats = Array.from(new Set(games.map((g) => g.category)));
    return ['All', ...cats];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-black font-sans text-zinc-100 selection:bg-indigo-500/30">
      <Navbar onSearch={setSearchQuery} />
      
      <main className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 bg-black">
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <div className="px-4 py-4 sm:px-6 lg:px-8 text-xs font-medium text-zinc-500 italic">
            Showing {filteredGames.length} games
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="popLayout">
            {filteredGames.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                layout
              >
                {filteredGames.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    onSelect={setActiveGame}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="text-zinc-700 text-6xl font-bold mb-4">No results found</div>
                <p className="text-zinc-500 max-w-sm">
                  We couldn't find any games matching "{searchQuery}". Try searching for something else or browse categories.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <GameModal 
        game={activeGame}
        onClose={() => setActiveGame(null)}
      />

      <footer className="border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 grayscale brightness-50 opacity-50">
            <span className="text-sm font-bold tracking-tighter">NEXUS ARCADE</span>
          </div>
          <div className="flex gap-8 text-xs font-medium text-zinc-500 tracking-wide uppercase">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Contact</a>
          </div>
          <p className="text-[10px] text-zinc-600 font-medium">
            &copy; {new Date().getFullYear()} Nexus Arcade. All games are property of their respective owners.
          </p>
        </div>
      </footer>
    </div>
  );
}
