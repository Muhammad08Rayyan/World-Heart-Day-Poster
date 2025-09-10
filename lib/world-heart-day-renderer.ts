// World Heart Day Poster Renderer - Simple & Generic

export interface WorldHeartDayPosterData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}

export function renderWorldHeartDayPoster(
  canvas: HTMLCanvasElement,
  data: WorldHeartDayPosterData
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas dimensions
  canvas.width = 600;
  canvas.height = 800;

  // Clear canvas with precision
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Enable high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Updated layout system
  const layout = {
    profileY: 320, // Profile position moved down and will be positioned to the left
    nameY: 80, // Name moved to top right
    designationY: 105, // Designation below name in top right
    messageY: 575, // Message positioned on background yellow circle
    footerHeight: 100 // Footer height
  };

  // Simple rendering with proper async handling
  drawPixelPerfectBackground(ctx, canvas.width, canvas.height);
  
  // Draw background image and ensure all elements render after it loads
  drawBackgroundImageWithCallback(ctx, canvas.width, canvas.height, layout.footerHeight, () => {
    // Draw all elements after background loads
    drawPixelPerfectProfile(ctx, canvas.width, layout.profileY, data);
    drawNameAndDesignation(ctx, canvas.width, layout.nameY, layout.designationY, data.name, data.designation);
    drawPixelPerfectMessage(ctx, canvas.width, layout.messageY, data.message);
    
    // Draw footer without red borders
    drawFooterImageWithCallback(ctx, canvas.width, canvas.height, layout.footerHeight, () => {
      // Footer loaded, no additional borders needed
    });
  });
}

// Clean professional background
function drawPixelPerfectBackground(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  // Pure white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
}

// Draw background image for main area with callback
function drawBackgroundImageWithCallback(ctx: CanvasRenderingContext2D, width: number, height: number, footerHeight: number, callback: () => void): void {
  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.src = '/Background.png';
  
  bgImg.onload = () => {
    const mainAreaHeight = height - footerHeight;
    ctx.drawImage(bgImg, 0, 0, width, mainAreaHeight);
    // Execute callback after background is drawn
    callback();
  };
  
  bgImg.onerror = () => {
    // Fallback: simple gradient
    const mainAreaHeight = height - footerHeight;
    const gradient = ctx.createLinearGradient(0, 0, 0, mainAreaHeight);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, mainAreaHeight);
    // Execute callback after fallback is drawn
    callback();
  };
}

// Clean name and designation styling positioned in top right
function drawNameAndDesignation(ctx: CanvasRenderingContext2D, width: number, nameY: number, designationY: number, name: string, designation: string): void {
  const rightX = width * 0.75; // Position in top right area
  
  ctx.save();
  
  // Clean name styling
  ctx.font = 'bold 22px "Poppins", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#1F2937';
  ctx.fillText(name.toUpperCase(), rightX, nameY);
  
  // Simple designation styling
  if (designation) {
    ctx.font = '20px "Poppins", sans-serif';
    ctx.fillStyle = '#DC2626';
    ctx.fillText(designation, rightX, designationY);
  }
  
  ctx.restore();
}

// Red borders function removed - no longer needed



// Header is now handled by upper section image

function drawPixelPerfectProfile(ctx: CanvasRenderingContext2D, width: number, profileY: number, data: WorldHeartDayPosterData): void {
  const centerX = width * 0.72; // Move to left side
  const radius = 100; // Keep same size

  ctx.save();
  
  // Always draw white background circle
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(centerX, profileY, radius + 4, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw the user image or default profile image
  if (data.imageData) {
    drawUserImage(ctx, data.imageData, centerX, profileY, radius);
  } else {
    // Use default profile.jpg
    drawDefaultProfileImage(ctx, centerX, profileY, radius);
  }
  
  // White border for clean look
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, profileY, radius + 2, 0, 2 * Math.PI);
  ctx.stroke();
  
  ctx.restore();
}

function drawUserImage(
  ctx: CanvasRenderingContext2D,
  imageData: string,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  img.onload = () => {
    ctx.save();
    
    // Circular clipping
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();
    
    // Scale to fill
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight;
    
    if (imgAspect > 1) {
      drawHeight = radius * 2;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = radius * 2;
      drawHeight = drawWidth / imgAspect;
    }
    
    const drawX = centerX - drawWidth / 2;
    const drawY = centerY - drawHeight / 2;
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    
    ctx.restore();
  };
  
  img.src = imageData;
}

function drawDefaultProfileImage(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = '/Profile.jpg';
  
  img.onload = () => {
    ctx.save();
    
    // Circular clipping
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.clip();
    
    // Scale to fill
    const imgAspect = img.width / img.height;
    let drawWidth, drawHeight;
    
    if (imgAspect > 1) {
      drawHeight = radius * 2;
      drawWidth = drawHeight * imgAspect;
    } else {
      drawWidth = radius * 2;
      drawHeight = drawWidth / imgAspect;
    }
    
    const drawX = centerX - drawWidth / 2;
    const drawY = centerY - drawHeight / 2;
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    
    ctx.restore();
  };
  
  img.onerror = () => {
    // Fallback if profile.jpg not found
    drawProfessionalPlaceholder(ctx, centerX, centerY, radius);
  };
}

function drawProfessionalPlaceholder(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  // Clean light gray background
  ctx.fillStyle = '#F3F4F6';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Professional person icon
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '40px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👤', centerX, centerY);
}



function drawPixelPerfectMessage(
  ctx: CanvasRenderingContext2D,
  width: number,
  messageY: number,
  message: string
): void {
  // Position text directly on background without box - centered on canvas
  const centerX = width * 0.28;
  const maxWidth = width * 0.5; // Use most of the canvas width

  ctx.save();
  
  // Clean message text styling
  ctx.font = '22px "Poppins", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#374151';

  // Smart word wrapping
  const words = message.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine + word + ' ';
    if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine.trim());

  // Clean text positioning
  const lineHeight = 26;
  const maxLines = 6;
  const linesToShow = Math.min(lines.length, maxLines);
  
  const totalTextHeight = (linesToShow - 1) * lineHeight;
  const startY = messageY - (totalTextHeight / 2);
  
  // Draw each line cleanly
  for (let i = 0; i < linesToShow; i++) {
    ctx.fillText(lines[i], centerX, startY + i * lineHeight);
  }
  
  ctx.restore();
}

// Remove the old header and heart functions since upper section image handles this

function drawFooterImageWithCallback(ctx: CanvasRenderingContext2D, width: number, height: number, footerHeight: number, callback: () => void): void {
  const footerImg = new Image();
  footerImg.crossOrigin = 'anonymous';
  footerImg.src = '/Footer.jpg';
  
  footerImg.onload = () => {
    const footerY = height - footerHeight;
    ctx.drawImage(footerImg, 0, footerY, width, footerHeight);
    // Execute callback after footer is drawn
    callback();
  };
  
  footerImg.onerror = () => {
    // Fallback footer
    const footerY = height - footerHeight;
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(0, footerY, width, footerHeight);
    // Execute callback after fallback is drawn
    callback();
  };
}