'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import PosterBuilder from './PosterBuilder';
import ErrorBoundary from '../ErrorBoundary';

const PosterGenerator: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-red-50 via-rose-50 to-pink-50">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#DC2626',
            color: '#fff',
            fontSize: '14px',
            borderRadius: '12px'
          }
        }}
      />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-4 sm:pt-8 pb-4 sm:pb-6 text-center px-2"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 shadow-lg border border-red-100"
          >
            <div className="text-2xl sm:text-3xl">❤️</div>
            <div className="text-left">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
                World Heart Day
              </h1>
              <p className="text-red-600 font-medium text-sm sm:text-base">29th September, 2025</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ErrorBoundary>
        <PosterBuilder />
      </ErrorBoundary>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-center text-sm text-gray-600 pb-4"
      >
        Developed by{' '}
        <a
          href="https://softsols.pk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 font-medium underline transition-colors"
        >
          Softsols Pakistan
        </a>
      </motion.footer>
    </div>
  );
};

export default PosterGenerator;