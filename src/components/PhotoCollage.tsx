import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, Shuffle, Download, X } from 'lucide-react';

type CollageLayout = 'grid' | 'mosaic' | 'heart';

interface PhotoCollageProps {
  images: string[];
  onClose: () => void;
}

const PhotoCollage: React.FC<PhotoCollageProps> = ({ images, onClose }) => {
  const [layout, setLayout] = useState<CollageLayout>('grid');
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const layouts: { id: CollageLayout; name: string; icon: typeof Grid | '💝' }[] = [
    { id: 'grid', name: 'Grid', icon: Grid },
    { id: 'mosaic', name: 'Mosaic', icon: Shuffle },
    { id: 'heart', name: 'Heart', icon: '💝' }
  ];

  const toggleImageSelection = (imageId: number) => {
    setSelectedImages(prev => 
      prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const generateCollage = () => {
    // In a real implementation, this would generate and download the collage
    console.log('Generating collage with layout:', layout, 'and images:', selectedImages);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/50"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-dancing font-bold text-purple-700">
              Create Photo Collage
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            <span className="text-sm font-medium text-gray-600">Layout:</span>
            {layouts.map((layoutOption) => {
              const Icon = layoutOption.icon;
              return (
                <motion.button
                  key={layoutOption.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLayout(layoutOption.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                    layout === layoutOption.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-100'
                  }`}
                >
                  {typeof Icon === 'string' ? (
                    <span className="text-lg">{Icon}</span>
                  ) : (
                    <Icon size={16} />
                  )}
                  <span>{layoutOption.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">
            Select images for your collage ({selectedImages.length} selected):
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {images.map((image) => (
              <motion.div
                key={image.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => toggleImageSelection(image.id)}
                className={`relative cursor-pointer rounded-lg overflow-hidden ${
                  selectedImages.includes(image.id) ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-20 object-cover"
                />
                {selectedImages.includes(image.id) && (
                  <div className="absolute inset-0 bg-purple-500/30 flex items-center justify-center">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedImages.length} images selected
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateCollage}
              disabled={selectedImages.length < 2}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                selectedImages.length >= 2
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download size={16} />
              <span>Generate Collage</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PhotoCollage;