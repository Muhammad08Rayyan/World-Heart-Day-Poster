'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PosterFormData, PosterGenerationState } from '@/types/poster';
import { triggerHapticFeedback, isMobile } from '@/lib/utils';
import ImageUploadWithCrop from './ImageUploadWithCrop';

interface PosterFormProps {
  onSubmit: (data: PosterFormData) => void;
  generationState: PosterGenerationState;
  initialData?: PosterFormData;
}

const PosterForm: React.FC<PosterFormProps> = ({ 
  onSubmit, 
  generationState, 
  initialData 
}) => {
  const { register, handleSubmit, watch, setValue } = useForm<PosterFormData>({
    defaultValues: initialData || {
      name: '',
      designation: '',
      message: '',
      imageData: undefined
    }
  });

  const [imageData, setImageData] = useState<string | undefined>(initialData?.imageData);

  // Watch form values for real-time feedback
  const name = watch('name');
  const designation = watch('designation');
  const message = watch('message');

  // Auto-save to localStorage for mobile users
  useEffect(() => {
    if (isMobile()) {
      const formData = { name, designation, message, imageData };
      localStorage.setItem('posterFormData', JSON.stringify(formData));
    }
  }, [name, designation, message, imageData]);

  // Load saved data on mobile
  useEffect(() => {
    if (isMobile()) {
      const saved = localStorage.getItem('posterFormData');
      if (saved) {
        const data = JSON.parse(saved);
        setValue('name', data.name || '');
        setValue('designation', data.designation || '');
        setValue('message', data.message || '');
        setImageData(data.imageData);
      }
    }
  }, [setValue]);


  const handleFormSubmit = (data: PosterFormData) => {
    const submitData = { ...data, imageData };
    
    if (!data.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!data.message.trim()) {
      toast.error('Please enter a World Heart Day message');
      return;
    }

    triggerHapticFeedback('medium');
    onSubmit(submitData);
  };


  const quickMessages = [
    { text: 'I pledge to make my heart health a priority, today and every day.', label: 'Heart Priority Pledge' },
    { text: 'I commit to 30 minutes of daily physical activity for a stronger heart.', label: 'Activity Pledge' },
    { text: 'I pledge to eat more fruits and vegetables to protect my heart.', label: 'Nutrition Pledge' },
    { text: 'I commit to saying NO to smoking for a healthier tomorrow.', label: 'No Smoking Pledge' },
    { text: 'I pledge to get my blood pressure and cholesterol checked regularly.', label: 'Checkup Pledge' },
    { text: 'I choose water over sugary drinks to keep my heart healthy.', label: 'Water Pledge' },
    { text: 'I pledge to manage stress through meditation, prayer, or relaxation.', label: 'Stress Management' },
    { text: 'I commit to 7–8 hours of quality sleep for better heart health.', label: 'Sleep Pledge' }
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      
      {/* Name Input */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative px-[5px]"
      >
        <label className="block mb-[10px] font-medium text-white/95 text-[15px] tracking-[0.3px] relative pl-[15px]">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[6px] h-[6px] bg-white rounded-full opacity-70"></span>
          Your Name:
        </label>
        <input
          {...register('name', { 
            required: 'Name is required',
            maxLength: { value: 20, message: 'Maximum 20 characters' }
          })}
          type="text"
          placeholder="Enter your name"
          maxLength={20}
          className="w-full px-4 py-[14px] border-2 border-white/15 rounded-xl text-[15px] bg-white/95 text-[#1a3a2a] transition-all duration-300 font-['Poppins'] shadow-[0_4px_15px_rgba(0,0,0,0.05)] placeholder:text-[#8a9a8f] placeholder:opacity-80 focus:outline-none focus:border-white/60 focus:bg-white focus:shadow-[0_6px_20px_rgba(0,0,0,0.12),0_0_0_3px_rgba(255,255,255,0.25)] focus:transform focus:translate-y-[-1px]"
        />
        <div className="text-[12px] text-white/70 text-right mt-[6px] font-normal tracking-[0.3px]">
          <span>{name?.length || 0}/20</span>
        </div>
      </motion.div>

      {/* Designation Input */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative px-[5px]"
      >
        <label className="block mb-[10px] font-medium text-white/95 text-[15px] tracking-[0.3px] relative pl-[15px]">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[6px] h-[6px] bg-white rounded-full opacity-70"></span>
          Your Designation:
        </label>
        <input
          {...register('designation', {
            maxLength: { value: 25, message: 'Maximum 25 characters' }
          })}
          type="text"
          placeholder="e.g Doctor"
          maxLength={25}
          className="w-full px-4 py-[14px] border-2 border-white/15 rounded-xl text-[15px] bg-white/95 text-[#1a3a2a] transition-all duration-300 font-['Poppins'] shadow-[0_4px_15px_rgba(0,0,0,0.05)] placeholder:text-[#8a9a8f] placeholder:opacity-80 focus:outline-none focus:border-white/60 focus:bg-white focus:shadow-[0_6px_20px_rgba(0,0,0,0.12),0_0_0_3px_rgba(255,255,255,0.25)] focus:transform focus:translate-y-[-1px]"
        />
        <div className="text-[12px] text-white/70 text-right mt-[6px] font-normal tracking-[0.3px]">
          <span>{designation?.length || 0}/25</span>
        </div>
      </motion.div>

      {/* Quick Messages Section */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-[25px] bg-white/5 rounded-[14px] p-[18px] border border-white/8 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
      >
        <h3 className="text-[16px] mb-[14px] text-white font-semibold text-center relative pb-2">
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50px] h-[2px] bg-white/50 rounded-[2px]"></span>
          Quick World Heart Day Messages:
        </h3>
        
        {/* Quick Message Buttons */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 max-h-[220px] overflow-y-auto p-[4px_2px] mx-[-2px]">
          {quickMessages.map((msg, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => setValue('message', msg.text)}
              whileTap={{ scale: 0.98 }}
              className="bg-white/8 border border-white/15 text-white px-3 py-2 rounded-[10px] cursor-pointer text-[12px] font-normal transition-all duration-300 text-center whitespace-nowrap overflow-hidden text-ellipsis backdrop-blur-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] relative z-[1] hover:bg-white/15 hover:border-white/25 hover:transform hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:transform active:translate-y-0 active:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              {msg.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Message Textarea */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative px-[5px]"
      >
        <label className="block mb-[10px] font-medium text-white/95 text-[15px] tracking-[0.3px] relative pl-[15px]">
          <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[6px] h-[6px] bg-white rounded-full opacity-70"></span>
          Your World Heart Day Message:
        </label>
        <textarea
          {...register('message', {
            required: 'Message is required',
            maxLength: { value: 150, message: 'Maximum 150 characters' }
          })}
          placeholder="Share your World Heart Day message..."
          maxLength={150}
          className="w-full px-4 py-[14px] border-2 border-white/15 rounded-xl min-h-[100px] resize-vertical text-[15px] bg-white/95 text-[#1a3a2a] transition-all duration-300 font-['Poppins'] shadow-[0_4px_15px_rgba(0,0,0,0.05)] placeholder:text-[#8a9a8f] placeholder:opacity-80 focus:outline-none focus:border-white/60 focus:bg-white focus:shadow-[0_6px_20px_rgba(0,0,0,0.12),0_0_0_3px_rgba(255,255,255,0.25)] focus:transform focus:translate-y-[-1px] leading-[1.6]"
        />
        <div className="text-[12px] text-white/70 text-right mt-[6px] font-normal tracking-[0.3px]">
          <span>{message?.length || 0}/150</span>
        </div>
      </motion.div>

      {/* Image Upload */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-[25px] bg-white/3 rounded-[14px] p-[18px] border border-white/8 transition-all duration-300 hover:bg-white/5 hover:transform hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
      >
        <h3 className="text-[16px] mb-[15px] text-white font-semibold text-center relative pb-2">
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[50px] h-[2px] bg-white/50 rounded-[2px]"></span>
          Upload Your Photo:
        </h3>
        
        <ImageUploadWithCrop 
          onImageChange={(image) => {
            setImageData(image);
            setValue('imageData', image);
          }}
          initialImage={imageData}
        />
      </motion.div>

      {/* Generate Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          type="submit"
          disabled={generationState.isGenerating}
          className="w-full bg-gradient-to-r from-white to-[#e8f5e8] text-[#0a3a1a] border-none px-4 py-4 rounded-xl text-[16px] font-semibold cursor-pointer transition-all duration-300 uppercase tracking-[1px] shadow-[0_6px_20px_rgba(0,0,0,0.15)] relative overflow-hidden z-[1] mt-[10px] flex items-center justify-center gap-[10px] hover:transform hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] active:transform active:translate-y-0 active:shadow-[0_4px_15px_rgba(0,0,0,0.15)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <AnimatePresence mode="wait">
            {generationState.isGenerating ? (
              <motion.div
                key="generating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <div className="w-5 h-5 border-2 border-[#0a3a1a] border-t-transparent rounded-full animate-spin"></div>
                Generating Poster...
              </motion.div>
            ) : (
              <motion.span
                key="generate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Generate World Heart Day Poster
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.div>

    </form>
  );
};

export default PosterForm;