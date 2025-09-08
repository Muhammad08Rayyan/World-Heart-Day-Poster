'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ImageUploadWithCrop from './ImageUploadWithCrop';
import { DEFAULT_STYLE } from '@/lib/poster-config';
import { renderWorldHeartDayPoster } from '@/lib/world-heart-day-renderer';

interface PosterData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
  selectedStyle: string;
}

interface Step {
  id: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Add your name and designation'
  },
  {
    id: 'message',
    title: 'Your Message',
    description: 'Choose or write your World Heart Day message'
  },
  {
    id: 'photo',
    title: 'Your Photo',
    description: 'Upload and crop your profile picture'
  },
  {
    id: 'preview',
    title: 'Preview & Download',
    description: 'Review your poster and download it'
  }
];

const quickMessages = [
  'I pledge to make my heart health a priority, today and every day.',
  'I commit to 30 minutes of daily physical activity for a stronger heart.',
  'I pledge to eat more fruits and vegetables to protect my heart.',
  'I commit to saying NO to smoking for a healthier tomorrow.',
  'I pledge to get my blood pressure and cholesterol checked regularly.',
  'I choose water over sugary drinks to keep my heart healthy.',
  'I pledge to manage stress through meditation, prayer, or relaxation.',
  'I commit to 7–8 hours of quality sleep for better heart health.'
];

const PosterBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [posterData, setPosterData] = useState<PosterData>({
    name: '',
    designation: '',
    message: '',
    selectedStyle: DEFAULT_STYLE.id
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updatePosterData = (field: keyof PosterData, value: string) => {
    console.log('Updating poster data:', field, value);
    
    setPosterData(prev => {
      const newData = { ...prev, [field]: value };
      console.log('New poster data:', newData);
      return newData;
    });
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Force regenerate poster if we're on preview step and changing style
    if (field === 'selectedStyle' && currentStep === 3) {
      console.log('Style change detected, clearing canvas and regenerating...');
      
      // Immediately clear canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      // Force immediate regeneration with new style
      setTimeout(() => {
        console.log('Regenerating World Heart Day poster');
        if (canvasRef.current) {
          try {
            renderWorldHeartDayPoster(canvasRef.current, {
              name: posterData.name,
              designation: posterData.designation,
              message: posterData.message,
              imageData: posterData.imageData
            });
          } catch (error) {
            console.error('Failed to generate poster during style switch:', error);
          }
        }
      }, 100);
    }
  };

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!posterData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (posterData.name.length > 25) {
        newErrors.name = 'Name must be 25 characters or less';
      }
      
      if (!posterData.designation.trim()) {
        newErrors.designation = 'Designation is required';
      }
    }

    if (stepIndex === 1) {
      if (!posterData.message.trim()) {
        newErrors.message = 'Message is required';
      } else if (posterData.message.length > 150) {
        newErrors.message = 'Message must be 150 characters or less';
      }
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Generate poster whenever we enter preview step or data changes
  useEffect(() => {
    if (currentStep === 3 && canvasRef.current) {
      console.log('useEffect triggered, generating poster with:', posterData.selectedStyle);
      // Small delay to ensure canvas is properly rendered
      setTimeout(() => {
        if (canvasRef.current) {
          try {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
            
            renderWorldHeartDayPoster(canvasRef.current, {
              name: posterData.name,
              designation: posterData.designation,
              message: posterData.message,
              imageData: posterData.imageData
            });
            
            console.log('useEffect: World Heart Day poster generated');
          } catch (error) {
            console.error('useEffect: Failed to generate poster:', error);
          }
        }
      }, 200);
    }
  }, [currentStep, posterData.selectedStyle, posterData.name, posterData.designation, posterData.message, posterData.imageData]);

  // Removed duplicate useEffect to prevent conflicts

  const generatePoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('No canvas available for generation');
      return;
    }

    console.log('Generating poster with style:', posterData.selectedStyle);
    
    try {
      // Clear canvas completely
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Render World Heart Day poster
      renderWorldHeartDayPoster(canvas, {
        name: posterData.name,
        designation: posterData.designation,
        message: posterData.message,
        imageData: posterData.imageData
      });
      
      console.log('World Heart Day poster generated successfully');
    } catch (error) {
      console.error('Failed to generate poster:', error);
      toast.error('Failed to generate poster. Please try again.');
    }
  };

  const downloadPoster = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      toast.error('Poster not ready for download');
      return;
    }
    
    // Ensure canvas has content
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      toast.error('Canvas not available');
      return;
    }

    // Force regenerate the poster first to make sure canvas has current content
    console.log('Regenerating poster before download...');
    generatePoster();
    
    // Wait a moment for the poster to render, then download and upload
    setTimeout(async () => {
      try {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          toast.error('Cannot access canvas');
          return;
        }

        // Debug: Check canvas dimensions and content
        console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
        
        // Get the image data
        const dataURL = canvas.toDataURL('image/png', 1.0);
        console.log('DataURL length:', dataURL.length);
        console.log('DataURL preview:', dataURL.substring(0, 100));
        
        if (!dataURL || dataURL === 'data:,' || dataURL.length < 1000) {
          toast.error('Canvas appears empty - trying to regenerate...');
          // Try regenerating again
          generatePoster();
          return;
        }

        // Create cleaner filename
        const userName = posterData.name.trim() ? posterData.name.replace(/[^a-zA-Z0-9]/g, '_') : 'poster';
        const timestamp = new Date().toISOString().slice(0, 10);
        const randomId = Math.random().toString(36).substring(2, 8); // Generate 6-character random ID
        const filename = `${userName}_World_Heart_Day_${timestamp}_${randomId}`;

        // Create download link
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataURL;
        
        // Force download
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success(`Poster downloaded: ${filename}.png 🎉`);
        console.log('Download successful:', filename);

        // Upload to Cloudinary silently
        try {
          const response = await fetch('/api/upload-poster', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              dataUrl: dataURL,
              filename: filename,
            }),
          });

          await response.json();
        } catch {
          // Silent upload - no user notification
        }
      } catch (error) {
        console.error('Download error:', error);
        toast.error('Download failed - please try again');
      }
    }, 1000); // Wait 1 second for poster to render
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                value={posterData.name}
                onChange={(e) => updatePosterData('name', e.target.value)}
                placeholder="Enter your full name"
                maxLength={25}
                className={`w-full px-4 py-3 border-2 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-red-500'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">{posterData.name.length}/25 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Designation *
              </label>
              <input
                type="text"
                value={posterData.designation}
                onChange={(e) => updatePosterData('designation', e.target.value)}
                placeholder="e.g Doctor"
                maxLength={30}
                className={`w-full px-4 py-3 border-2 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                  errors.designation ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-red-500'
                }`}
              />
              {errors.designation && (
                <p className="mt-1 text-sm text-red-600">{errors.designation}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">{posterData.designation.length}/30 characters</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Choose a message or write your own *
              </label>
              
              <div className="grid grid-cols-1 gap-3 mb-6">
                {quickMessages.map((msg, index) => (
                  <motion.button
                    key={index}
                    onClick={() => updatePosterData('message', msg)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 text-left rounded-xl border-2 transition-colors ${
                      posterData.message === msg
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    <p className="text-sm">{msg}</p>
                  </motion.button>
                ))}
              </div>

              <div className="relative">
                <textarea
                  value={posterData.message}
                  onChange={(e) => updatePosterData('message', e.target.value)}
                  placeholder="Or write your own World Heart Day message..."
                  maxLength={150}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none transition-colors ${
                    errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-red-500'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">{posterData.message.length}/150 characters</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Upload Your Photo (Optional)
              </label>
              <ImageUploadWithCrop
                onImageChange={(imageData) => updatePosterData('imageData', imageData || '')}
                initialImage={posterData.imageData}
              />
              <p className="mt-3 text-xs text-gray-500">
                Your photo will be displayed as a circular profile picture on your poster.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Your World Heart Day Poster is Ready! ❤️
              </h3>
              
              
              <div className="bg-white rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg border border-gray-200 inline-block">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={800}
                  className="block border border-gray-300 rounded-lg shadow-md w-full max-w-[280px] sm:max-w-[300px] h-auto"
                  style={{ aspectRatio: '3/4' }}
                />
              </div>

              <div className="mt-4 sm:mt-6 space-y-3 px-4 sm:px-0">
                <motion.button
                  onClick={downloadPoster}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
                >
                  📥 Download Your Poster
                </motion.button>

                <button
                  onClick={() => setCurrentStep(0)}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base"
                >
                  ✨ Create Another Poster
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 pb-4 sm:pb-8">
      {/* Progress Steps */}
      <div className="mb-4 sm:mb-8 px-2">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <>
              <motion.div
                key={step.id}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: currentStep === index ? 1.1 : 1,
                  backgroundColor: currentStep >= index ? '#DC2626' : '#e5e7eb'
                }}
                className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-xs sm:text-base ${
                  currentStep >= index ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                {currentStep > index ? '✓' : <span className="text-xs sm:text-base">{index + 1}</span>}
              </motion.div>
              {index < steps.length - 1 && (
                <div
                  key={`line-${index}`}
                  className={`h-1 flex-1 mx-1 sm:mx-2 rounded-full transition-colors duration-300 ${
                    currentStep > index ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </>
          ))}
        </div>
        
        <div className="mt-3 sm:mt-4 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{steps[currentStep].title}</h2>
          <p className="text-sm sm:text-base text-gray-600">{steps[currentStep].description}</p>
        </div>
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0"
      >
        {renderStepContent()}
      </motion.div>

      {/* Navigation */}
      {currentStep < 3 && (
        <div className="flex items-center justify-between mt-4 sm:mt-6 mx-2 sm:mx-0">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 0}
            whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
            whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
            className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Back</span>
          </motion.button>

          <motion.button
            onClick={nextStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg transition-all text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Next Step</span>
            <span className="sm:hidden">Next</span>
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default PosterBuilder;