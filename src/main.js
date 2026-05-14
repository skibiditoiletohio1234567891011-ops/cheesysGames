/**
 * Nexus Arcade - Vanilla JS Version
 * Curated unblocked games collection.
 */
import './index.css';
import gamesData from './data/games.json';

async function init() {
  const gamesContainer = document.getElementById('games-grid');
  const searchInput = document.getElementById('search-input');
  const categoryFilters = document.getElementById('category-filters');
  const modal = document.getElementById('game-modal');
  const closeModal = document.getElementById('close-modal');
  const iframe = document.getElementById('game-iframe');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalThumbnail = document.getElementById('modal-thumbnail');
  const reloadBtn = document.getElementById('reload-game');
  const fullscreenBtn = document.getElementById('fullscreen-game');
  const resultsCount = document.getElementById('results-count');

  let games = gamesData;
  let currentCategory = 'All';
  let searchTerm = '';

  const categories = ['All', ...new Set(games.map(g => g.category))];

  function renderCategories() {
    categoryFilters.innerHTML = categories.map(cat => `
      <button 
        class="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${currentCategory === cat ? 'text-white bg-indigo-600' : 'text-zinc-400 hover:text-white hover:bg-white/5'}"
        data-category="${cat}"
      >
        ${cat}
      </button>
    `).join('');

    categoryFilters.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category;
        renderGames();
        renderCategories();
      });
    });
  }

  function renderGames() {
    const filtered = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCat = currentCategory === 'All' || game.category === currentCategory;
      return matchesSearch && matchesCat;
    });

    resultsCount.textContent = `Showing ${filtered.length} games`;

    if (filtered.length === 0) {
      gamesContainer.innerHTML = `
        <div class="col-span-full flex flex-col items-center justify-center py-24 text-center">
          <div class="text-zinc-700 text-6xl font-bold mb-4">No results found</div>
          <p class="text-zinc-500 max-w-sm">We couldn't find any games matching "${searchTerm}".</p>
        </div>
      `;
      return;
    }

    gamesContainer.innerHTML = filtered.map(game => `
      <div 
        class="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer"
        data-id="${game.id}"
      >
        <div class="aspect-video w-full overflow-hidden">
          <img
            src="${game.thumbnail}"
            alt="${game.title}"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          </div>
        </div>

        <div class="p-4">
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-bold text-white tracking-tight line-clamp-1">${game.title}</h3>
            <span class="shrink-0 rounded-md bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 border border-indigo-500/20">
              ${game.category}
            </span>
          </div>
          <p class="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            ${game.description}
          </p>
        </div>
      </div>
    `).join('');

    gamesContainer.querySelectorAll('[data-id]').forEach(card => {
      card.addEventListener('click', () => {
        const game = games.find(g => g.id === card.dataset.id);
        openGame(game);
      });
    });
  }

  function openGame(game) {
    modalTitle.textContent = game.title;
    modalCategory.textContent = game.category;
    modalThumbnail.src = game.thumbnail;
    iframe.src = game.url;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeGame() {
    iframe.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderGames();
  });

  closeModal.addEventListener('click', closeGame);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeGame();
  });

  reloadBtn.addEventListener('click', () => {
    const currentSrc = iframe.src;
    iframe.src = '';
    setTimeout(() => { iframe.src = currentSrc; }, 10);
  });

  fullscreenBtn.addEventListener('click', () => {
    if (iframe.requestFullscreen) iframe.requestFullscreen();
  });

  renderCategories();
  renderGames();
}

document.addEventListener('DOMContentLoaded', init);
