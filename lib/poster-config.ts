// World Heart Day Poster Configuration - Mobile First

import { PosterConfig, QuickMessage, PosterStyle } from '@/types/poster';

export const POSTER_CONFIG: PosterConfig = {
  dimensions: {
    width: 600,
    height: 800,
    mobile: {
      width: 350,
      height: 467 // 3:4 ratio for mobile sharing
    },
    desktop: {
      width: 600,
      height: 800
    }
  },
  colors: {
    primary: '#DC2626',      // Heart red
    secondary: '#FFFFFF',    // White
    accent: '#F59E0B',       // Warm gold for decorative elements
    text: '#212529',         // Dark text for readability
    background: '#FEF2F2'    // Light red/pink background
  },
  fonts: {
    heading: 'Georgia, "Times New Roman", serif',
    body: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    decorative: '"Poppins", sans-serif'
  }
};

// Quick messages organized by category for better mobile UX
export const QUICK_MESSAGES: QuickMessage[] = [
  // Heart health pledges
  {
    id: 'heart-priority-pledge',
    text: 'I pledge to make my heart health a priority, today and every day.',
    category: 'health'
  },
  {
    id: 'activity-pledge',
    text: 'I commit to 30 minutes of daily physical activity for a stronger heart.',
    category: 'health'
  },
  {
    id: 'nutrition-pledge',
    text: 'I pledge to eat more fruits and vegetables to protect my heart.',
    category: 'health'
  },
  {
    id: 'no-smoking-pledge',
    text: 'I commit to saying NO to smoking for a healthier tomorrow.',
    category: 'health'
  },
  {
    id: 'checkup-pledge',
    text: 'I pledge to get my blood pressure and cholesterol checked regularly.',
    category: 'health'
  },
  {
    id: 'water-pledge',
    text: 'I choose water over sugary drinks to keep my heart healthy.',
    category: 'health'
  },
  {
    id: 'stress-pledge',
    text: 'I pledge to manage stress through meditation, prayer, or relaxation.',
    category: 'health'
  },
  {
    id: 'sleep-pledge',
    text: 'I commit to 7–8 hours of quality sleep for better heart health.',
    category: 'health'
  }
];

// Mobile-optimized character limits
export const CHARACTER_LIMITS = {
  name: {
    max: 20,
    warning: 16 // Show warning at 80%
  },
  designation: {
    max: 25,
    warning: 20
  },
  message: {
    max: 150,
    warning: 120
  }
};

// Canvas rendering settings optimized for mobile
export const CANVAS_SETTINGS = {
  // High DPI support for crisp text on mobile
  pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 2,
  
  // Mobile performance optimization
  maxCanvasSize: 2048, // Prevent memory issues on mobile
  
  // Image quality settings
  imageQuality: {
    mobile: 0.8,
    desktop: 0.95
  },
  
  // Export formats optimized for mobile sharing
  exportFormats: {
    whatsapp: { width: 350, height: 467 },
    instagram: { width: 1080, height: 1080 },
    story: { width: 1080, height: 1920 },
    facebook: { width: 1200, height: 630 }
  }
};

// Touch interaction settings
export const TOUCH_SETTINGS = {
  minTouchTarget: 44, // iOS/Android minimum
  swipeThreshold: 50,
  tapThreshold: 10,
  longPressDelay: 500
};

// Single Poster Style for World Heart Day
export const POSTER_STYLES: PosterStyle[] = [
  {
    id: 'world-heart-day',
    name: 'World Heart Day',
    description: 'Heart-themed design',
    thumbnail: '❤️',
    category: 'health',
    config: {
      colors: {
        primary: '#DC2626', // Heart red
        secondary: '#FFFFFF',
        accent: '#F59E0B', // Warm gold accent
        text: '#1F2937',
        background: 'gradient', // Custom gradient background
        headerGradient: ['#E0F2FE', '#0EA5E9'],
        decorative: 'rgba(220, 38, 38, 0.3)' // Red decorative elements
      },
      fonts: {
        heading: 'Arial, sans-serif',
        body: 'Arial, sans-serif',
        decorative: 'Arial, sans-serif'
      },
      layout: {
        headerHeight: 150,
        profileRadius: 75,
        profileY: 380,
        nameY: 520,
        designationY: 555,
        messageY: 600,
        messageHeight: 120
      },
      decorations: {
        backgroundPattern: false,
        stars: false,
        borders: true,
        geometric: false,
        traditional: false
      }
    }
  }
];

// Default style (only one available)
export const DEFAULT_STYLE = POSTER_STYLES[0];