'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { POSTER_STYLES } from '@/lib/poster-config';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (styleId: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ 
  selectedStyle, // eslint-disable-line @typescript-eslint/no-unused-vars
  onStyleSelect  // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          World Heart Day Poster Style
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Heart-themed design for raising awareness about cardiovascular health
        </p>
      </div>

      {/* Single Style Display - No Selection Needed */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="w-full p-6 rounded-xl border-2 border-red-500 bg-red-50 shadow-lg ring-2 ring-red-200">
            <div className="text-center">
              <div 
                className="text-4xl sm:text-5xl mb-3"
                style={{ 
                  background: `linear-gradient(135deg, ${POSTER_STYLES[0].config.colors.primary}, ${POSTER_STYLES[0].config.colors.accent})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {POSTER_STYLES[0].thumbnail}
              </div>
              <h4 className="font-semibold text-lg text-gray-800 mb-2">
                {POSTER_STYLES[0].name}
              </h4>
              <p className="text-sm text-gray-600 leading-tight">
                {POSTER_STYLES[0].description}
              </p>
            </div>
            
            {/* Always selected indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center"
            >
              <svg 
                className="w-4 h-4 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Style Preview */}
      <div className="bg-red-50 rounded-xl p-4 border border-red-200">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span>❤️</span>
          Style Details
        </h4>
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ 
                backgroundColor: POSTER_STYLES[0].config.colors.primary 
              }}
            ></div>
            <span>Heart Red</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ 
                backgroundColor: POSTER_STYLES[0].config.colors.accent 
              }}
            ></div>
            <span>Warm Gold</span>
          </div>
          <div className="text-xs mt-2 p-2 bg-white rounded border border-red-200">
            <strong>Theme:</strong> Cardiovascular health awareness
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;