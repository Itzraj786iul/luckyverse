import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Camera, Image, Check } from 'lucide-react';

interface PhotoUploadProps {
  onUpload: (file: File) => void;
  onClose: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onUpload, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setUploading(false);
        setUploaded(true);
        onUpload(file);
        
        setTimeout(() => {
          onClose();
        }, 1500);
      }, 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-dancing font-bold text-purple-700">
            Add Your Photo
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {uploaded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="text-green-500 mb-4"
              >
                <Check size={48} className="mx-auto" />
              </motion.div>
              <p className="text-lg font-medium text-gray-700">
                Photo uploaded successfully! 🌸
              </p>
            </motion.div>
          ) : uploading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-purple-500 mb-4"
              >
                <Camera size={48} className="mx-auto" />
              </motion.div>
              <p className="text-lg font-medium text-gray-700">
                Uploading your beautiful photo...
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  dragActive 
                    ? 'border-purple-400 bg-purple-50' 
                    : 'border-gray-300 hover:border-purple-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Image size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drop your photo here
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  or click to browse
                </p>
                
                <label className="inline-block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium cursor-pointer inline-flex items-center space-x-2"
                  >
                    <Upload size={20} />
                    <span>Choose Photo</span>
                  </motion.div>
                </label>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default PhotoUpload;