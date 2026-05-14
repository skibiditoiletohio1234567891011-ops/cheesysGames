import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, RotateCcw } from 'lucide-react';
import { useState } from 'react';

export default function GameModal({ game, onClose }) {
  const [iframeKey, setIframeKey] = useState(0);

  const reloadGame = () => {
    setIframeKey(prev => prev + 1);
  };

  return (
    <AnimatePresence>
      {game && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl shadow-indigo-500/10"
            id={`game-modal-${game.id}`}
          >
            <div className="flex items-center justify-between border-b border-white/5 bg-zinc-900/50 px-6 py-4">
              <div className="flex items-center gap-4">
                <img 
                  src={game.thumbnail} 
                  alt="" 
                  className="h-8 w-8 rounded-lg object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight leading-none">{game.title}</h2>
                  <p className="mt-1 text-xs text-zinc-500 font-medium">{game.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={reloadGame}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  title="Reload Game"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button
                  onClick={() => {
                    const iframe = document.getElementById('game-iframe');
                    if (iframe.requestFullscreen) iframe.requestFullscreen();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white transition-colors ml-2"
                  id="close-modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 bg-zinc-900">
              <iframe
                key={iframeKey}
                id="game-iframe"
                src={game.url}
                className="h-full w-full border-none"
                allow="autoplay; fullscreen; keyboard"
                title={game.title}
              />
            </div>
            
            <div className="bg-zinc-900 px-6 py-3 select-none">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 text-center">
                Playing on Nexus Arcade • Quality Ensured
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
