import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Sparkles, Heart } from 'lucide-react';

interface ImageFiltersProps {
  onFilterApply: (filter: string) => void;
  currentFilter: string;
}

const ImageFilters: React.FC<ImageFiltersProps> = ({ onFilterApply, currentFilter }) => {
  const filters = [
    { id: 'none', name: 'Original', icon: Sun, preview: 'brightness-100' },
    { id: 'warm', name: 'Warm', icon: Heart, preview: 'sepia-50 brightness-110' },
    { id: 'cool', name: 'Cool', icon: Moon, preview: 'hue-rotate-180 brightness-90' },
    { id: 'vintage', name: 'Vintage', icon: Palette, preview: 'sepia-75 contrast-125' },
    { id: 'dreamy', name: 'Dreamy', icon: Sparkles, preview: 'blur-sm brightness-110 contrast-75' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFilterApply(filter.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
              currentFilter === filter.id
                ? 'bg-purple-500 text-white shadow-lg'
                : 'bg-white/60 text-purple-600 hover:bg-purple-50'
            } backdrop-blur-sm border border-white/30`}
          >
            <Icon size={14} />
            <span>{filter.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default ImageFilters;