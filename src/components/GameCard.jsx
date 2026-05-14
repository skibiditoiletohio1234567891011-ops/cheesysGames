import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function GameCard({ game, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10"
      id={`game-card-${game.id}`}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(game)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/40"
        >
          <Play className="h-6 w-6 ml-1" />
        </motion.button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-white tracking-tight line-clamp-1">{game.title}</h3>
          <span className="shrink-0 rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 border border-indigo-500/20">
            {game.category}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
          {game.description}
        </p>
      </div>
    </motion.div>
  );
}
