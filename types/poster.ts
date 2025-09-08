// Mobile-optimized TypeScript types for World Heart Day Poster Generator

export interface PosterFormData {
  name: string;
  designation?: string;
  message: string;
  imageData?: string;
  selectedStyle?: string;
}

export interface PosterStyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'health' | 'modern' | 'artistic' | 'professional' | 'medical' | 'awareness';
  config: StyleConfig;
}

export interface StyleConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    headerGradient: [string, string];
    decorative: string;
  };
  fonts: {
    heading: string;
    body: string;
    decorative: string;
  };
  layout: {
    headerHeight: number;
    profileRadius: number;
    profileY: number;
    nameY: number;
    designationY: number;
    messageY: number;
    messageHeight: number;
  };
  decorations: {
    backgroundPattern: boolean;
    stars: boolean;
    borders: boolean;
    geometric: boolean;
    traditional: boolean;
  };
}

export interface PosterDimensions {
  width: number;
  height: number;
  // Mobile-optimized canvas sizes
  mobile: {
    width: number;
    height: number;
  };
  desktop: {
    width: number;
    height: number;
  };
}

export interface QuickMessage {
  id: string;
  text: string;
  category: 'health' | 'professional' | 'personal' | 'medical';
}

export interface PosterConfig {
  dimensions: PosterDimensions;
  colors: {
    primary: string;      // Heart red
    secondary: string;    // White
    accent: string;       // Gold accents
    text: string;         // Text color
    background: string;   // Background color
  };
  fonts: {
    heading: string;
    body: string;
    decorative: string;
  };
}

export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ImageUploadState {
  file?: File;
  preview?: string;
  cropped?: string;
  isProcessing: boolean;
  error?: string;
}

export interface PosterGenerationState {
  isGenerating: boolean;
  progress: number;
  error?: string;
  generatedImage?: string;
}

// Mobile-specific touch interaction types
export interface TouchInteraction {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isActive: boolean;
}

// Export formats optimized for mobile sharing
export type ExportFormat = 'png' | 'jpeg' | 'webp';
export type ExportQuality = 'low' | 'medium' | 'high' | 'ultra';

export interface ExportOptions {
  format: ExportFormat;
  quality: ExportQuality;
  // Mobile-optimized dimensions for social sharing
  socialPresets?: {
    instagram: { width: 1080; height: 1080 };
    story: { width: 1080; height: 1920 };
    facebook: { width: 1200; height: 630 };
    whatsapp: { width: 600; height: 800 };
  };
}