import { motion } from 'motion/react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-6 sm:px-6 lg:px-8">
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(category)}
          className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            selectedCategory === category
              ? "text-white"
              : "text-zinc-400 hover:text-white hover:bg-white/5"
          }`}
          id={`filter-${category.toLowerCase()}`}
        >
          {selectedCategory === category && (
            <motion.div
              layoutId="active-category"
              className="absolute inset-0 rounded-full bg-indigo-600"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </motion.button>
      ))}
    </div>
  );
}
