'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { saveAs } from 'file-saver';
import toast from 'react-hot-toast';
import { PosterFormData } from '@/types/poster';

interface PosterPreviewProps {
  formData: PosterFormData;
  onBack: () => void;
}

const PosterPreview: React.FC<PosterPreviewProps> = ({ 
  formData, 
  onBack 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const lastFormDataRef = useRef<string>('');

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number) => {
    let rot = Math.PI / 2 * 3;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(x, y - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
      rot += step;
      
      ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
      rot += step;
    }
    
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();
  };

  const drawSubtleBackgroundPattern = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.save();
    
    // Very subtle geometric pattern
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.02)';
    ctx.lineWidth = 1;
    
    // Draw subtle diagonal lines
    for (let x = -height; x < width + height; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }
    
    // Draw subtle dots pattern
    ctx.fillStyle = 'rgba(220, 38, 38, 0.03)';
    for (let x = 30; x < width; x += 80) {
      for (let y = 150; y < height - 100; y += 80) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
    
    ctx.restore();
  };

  const drawEmptyAreaRefinements = (ctx: CanvasRenderingContext2D, width: number, height: number, centerX: number) => {
    ctx.save();
    
    // Add decorative hearts spread around the design - doubled quantity with red color
    ctx.fillStyle = 'rgba(220, 38, 38, 0.8)';
    
    // Stars around upper area (doubled)
    drawStar(ctx, 100, 140, 5, 6, 3);
    drawStar(ctx, width - 100, 140, 5, 6, 3);
    drawStar(ctx, 70, 190, 4, 5, 2);
    drawStar(ctx, width - 70, 190, 4, 5, 2);
    drawStar(ctx, 80, 120, 4, 5, 2);
    drawStar(ctx, width - 80, 120, 4, 5, 2);
    drawStar(ctx, 120, 170, 3, 4, 2);
    drawStar(ctx, width - 120, 170, 3, 4, 2);
    
    // Stars in middle areas (doubled)
    drawStar(ctx, 50, 280, 4, 5, 2);
    drawStar(ctx, width - 50, 280, 4, 5, 2);
    drawStar(ctx, 90, 420, 5, 6, 3);
    drawStar(ctx, width - 90, 420, 5, 6, 3);
    drawStar(ctx, 70, 350, 4, 5, 2);
    drawStar(ctx, width - 70, 350, 4, 5, 2);
    drawStar(ctx, 110, 450, 3, 4, 2);
    drawStar(ctx, width - 110, 450, 3, 4, 2);
    
    // Stars around message area (doubled)
    drawStar(ctx, 60, 580, 4, 5, 2);
    drawStar(ctx, width - 60, 580, 4, 5, 2);
    drawStar(ctx, 80, 640, 5, 6, 3);
    drawStar(ctx, width - 80, 640, 5, 6, 3);
    drawStar(ctx, 50, 620, 3, 4, 2);
    drawStar(ctx, width - 50, 620, 3, 4, 2);
    drawStar(ctx, 100, 600, 4, 5, 2);
    drawStar(ctx, width - 100, 600, 4, 5, 2);
    
    // Additional smaller hearts for more spread (doubled)
    ctx.fillStyle = 'rgba(220, 38, 38, 0.7)';
    drawStar(ctx, 120, 240, 3, 4, 2);
    drawStar(ctx, width - 120, 240, 3, 4, 2);
    drawStar(ctx, 40, 380, 3, 4, 2);
    drawStar(ctx, width - 40, 380, 3, 4, 2);
    drawStar(ctx, 110, 680, 3, 4, 2);
    drawStar(ctx, width - 110, 680, 3, 4, 2);
    drawStar(ctx, 140, 260, 3, 4, 2);
    drawStar(ctx, width - 140, 260, 3, 4, 2);
    drawStar(ctx, 30, 400, 3, 4, 2);
    drawStar(ctx, width - 30, 400, 3, 4, 2);
    drawStar(ctx, 130, 700, 3, 4, 2);
    drawStar(ctx, width - 130, 700, 3, 4, 2);
    
    // More prominent hearts
    ctx.fillStyle = 'rgba(220, 38, 38, 0.6)';
    drawStar(ctx, 130, 320, 5, 6, 3);
    drawStar(ctx, width - 130, 320, 5, 6, 3);
    drawStar(ctx, 150, 380, 4, 5, 2);
    drawStar(ctx, width - 150, 380, 4, 5, 2);
    
    // Elegant divider line above message area
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 80, 560);
    ctx.lineTo(centerX + 80, 560);
    ctx.stroke();
    
    // Small center accent on divider
    ctx.fillStyle = '#DC2626';
    ctx.beginPath();
    ctx.arc(centerX, 560, 3, 0, 2 * Math.PI);
    ctx.fill();
    
    // Clean geometric elements near bottom
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.3)';
    ctx.lineWidth = 1;
    
    // Simple bottom corner accents
    ctx.beginPath();
    ctx.moveTo(50, 720);
    ctx.lineTo(70, 720);
    ctx.moveTo(60, 710);
    ctx.lineTo(60, 720);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(width - 50, 720);
    ctx.lineTo(width - 70, 720);
    ctx.moveTo(width - 60, 710);
    ctx.lineTo(width - 60, 720);
    ctx.stroke();
    
    ctx.restore();
  };

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }, []);


  const drawPosterContent = useCallback(async (ctx: CanvasRenderingContext2D, name: string, designation: string, message: string, imageData: string | undefined, canvas: HTMLCanvasElement) => {
    // Clean avatar section - positioned below the header (260px + margin)
    const centerX = canvas.width / 2;
    const centerY = 370; // Moved up by 20px to increase vertical space from name
    const radius = 70;
    
    // Add subtle elements in empty areas
    drawEmptyAreaRefinements(ctx, canvas.width, canvas.height, centerX);
    
    // Simple white circle background
    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fill();
    
    if (imageData) {
      try {
        const img = await loadImage(imageData);
        ctx.save();
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.clip();
        
        // Calculate scaling to maintain aspect ratio and fill circle
        const imgAspect = img.width / img.height;
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > 1) {
          // Image is wider than tall
          drawHeight = radius * 2;
          drawWidth = drawHeight * imgAspect;
          drawX = centerX - drawWidth / 2;
          drawY = centerY - drawHeight / 2;
        } else {
          // Image is taller than wide or square
          drawWidth = radius * 2;
          drawHeight = drawWidth / imgAspect;
          drawX = centerX - drawWidth / 2;
          drawY = centerY - drawHeight / 2;
        }
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Draw the image with proper scaling
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
        
        // Enhanced border with subtle shadow effect
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Inner border
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 3, 0, 2 * Math.PI);
        ctx.stroke();
        
        ctx.restore();
      } catch {
        console.error('Failed to load user image');
        // Fall through to placeholder
      }
    }
    
    if (!imageData) {
      // Clean placeholder
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.strokeStyle = '#e9ecef';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.fillStyle = '#6c757d';
      ctx.font = '40px "Poppins", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👤', centerX, centerY + 12);
    }
    
    // Clean name styling - positioned below profile
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 24px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(name.toUpperCase(), centerX, 510);
    
    // Clean designation - increased size with auto-adjustment
    if (designation) {
      ctx.fillStyle = '#6c757d';
      ctx.textAlign = 'center';
      
      // Auto-adjust if text is too long
      const maxWidth = canvas.width - 80;
      let fontSize = 28; // Start with much larger size
      ctx.font = `${fontSize}px "Poppins", sans-serif`;
      
      while (ctx.measureText(designation).width > maxWidth && fontSize > 18) {
        fontSize -= 1;
        ctx.font = `${fontSize}px "Poppins", sans-serif`;
      }
      
      ctx.fillText(designation, centerX, 535);
    }
    
    // Clean message area - positioned below name/designation
    const msgY = 580;
    const msgWidth = canvas.width - 80;
    
    // Simple message container
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(40, msgY, msgWidth, 150);
    
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, msgY, msgWidth, 150);
    
    // Clean message text with increased size and spacing
    ctx.fillStyle = '#495057';
    ctx.font = '26px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.8px';
    
    // Word wrap with increased spacing
    const words = message.split(' ');
    const lines = [];
    let currentLine = '';
    const maxWidth = msgWidth - 40;
    
    ctx.textAlign = 'left';
    for (const word of words) {
      const testLine = currentLine + word + '  '; // Double space between words
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + '  ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());
    
    // Draw message
    ctx.textAlign = 'center';
    const lineHeight = 26; // Increased by 1 pixel for better spacing
    const startY = msgY + 40;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], canvas.width / 2, startY + i * lineHeight);
    }
    
    // Clean footer - positioned at bottom
    const footerY = canvas.height - 50;
    const footerHeight = 50;
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(0, footerY, canvas.width, footerHeight);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px "Poppins", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SOFTSOLS PAKISTAN - Digital AI Transformation  |  www.softsols.pk', canvas.width / 2, footerY + 30);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadImage]);

  const generatePoster = useCallback(async () => {
    if (isGenerating) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // Set canvas size
    canvas.width = 600;
    canvas.height = 800;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Clean modern background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add subtle background pattern
    drawSubtleBackgroundPattern(ctx, canvas.width, canvas.height);

    try {
      // Load header image with proper error handling
      const screenImg = await loadImage('/Screen.png');
      ctx.drawImage(screenImg, 0, 0, canvas.width, 260);
    } catch {
      console.warn('Header image failed to load, drawing simple header');
      
      // Draw simple header background
      const headerGradient = ctx.createLinearGradient(0, 0, 0, 260);
      headerGradient.addColorStop(0, '#DC2626');
      headerGradient.addColorStop(1, '#B91C1C');
      ctx.fillStyle = headerGradient;
      ctx.fillRect(0, 0, canvas.width, 260);
      
      // Add header text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px "Poppins", sans-serif';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '1.5px';
      ctx.fillText('WORLD HEART DAY', canvas.width / 2, 130);
      
      // Date
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = '18px "Poppins", sans-serif';
      ctx.letterSpacing = '0.8px';
      ctx.fillText('29th September, 2025', canvas.width / 2, 160);
    }
    
    // Draw the rest of the poster content
    await drawPosterContent(ctx, formData.name, formData.designation || '', formData.message, formData.imageData, canvas);
    setIsGenerating(false);
  }, [formData, isGenerating, drawPosterContent, loadImage]);

  useEffect(() => {
    const currentFormDataString = JSON.stringify(formData);
    if (canvasRef.current && currentFormDataString !== lastFormDataRef.current) {
      lastFormDataRef.current = currentFormDataString;
      generatePoster();
    }
  }, [formData, generatePoster]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsDownloading(true);

    try {
      canvas.toBlob((blob) => {
        if (blob) {
          const fileName = `world-heart-day-poster-${formData.name.replace(/\s+/g, '-').toLowerCase()}.png`;
          saveAs(blob, fileName);
          toast.success('Poster downloaded successfully!');
        }
      }, 'image/png', 0.9);
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download poster');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="text-center">
      {/* Canvas for poster generation */}
      <div className="inline-block p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 mb-4 relative">
        {isGenerating && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-4 flex items-center gap-3 shadow-lg">
              <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-700 font-medium">Generating poster...</span>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block border-2 border-white/20 rounded-xl shadow-2xl"
          style={{ 
            maxWidth: '100%', 
            height: 'auto',
            maxHeight: '500px' // Limit height for better mobile experience
          }}
        />
      </div>

      {/* Download Button */}
      <motion.button
        onClick={handleDownload}
        disabled={isDownloading}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#2d8f5f] to-[#1e5f3e] text-white border-none px-6 py-3 rounded-[25px] text-[14px] font-semibold cursor-pointer transition-all duration-300 uppercase tracking-[0.5px] mb-4 hover:transform hover:translate-y-[-2px] hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-gradient-to-r hover:from-[#1e5f3e] hover:to-[#2d8f5f] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isDownloading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Downloading...
          </div>
        ) : (
          'Download Poster'
        )}
      </motion.button>

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-xl border border-white/30 transition-all duration-200"
      >
        ← Back to Form
      </motion.button>
    </div>
  );
};

export default PosterPreview;