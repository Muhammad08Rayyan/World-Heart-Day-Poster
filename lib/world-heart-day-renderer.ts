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

  // Simple layout system
  const layout = {
    profileY: 280, // Profile position moved up
    nameY: 400, // Name below profile
    designationY: 440, // Designation below name  
    messageY: 500, // Message box positioned above footer
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
    
    // Draw footer
    drawFooterImageWithCallback(ctx, canvas.width, canvas.height, layout.footerHeight, () => {
      // Draw red borders on top of everything after footer loads
      drawProfessionalBorders(ctx, canvas.width, canvas.height);
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

// Enhanced name and designation styling with professional appearance
function drawNameAndDesignation(ctx: CanvasRenderingContext2D, width: number, nameY: number, designationY: number, name: string, designation: string): void {
  const centerX = width * 0.74; // Move to right side to align with profile
  
  ctx.save();
  
  // Name styling with shadow effect for depth
  ctx.font = 'bold 22px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Add subtle shadow for name
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillText(name.toUpperCase(), centerX + 2, nameY + 2);
  
  // Main name text with gradient effect
  const gradient = ctx.createLinearGradient(0, nameY - 20, 0, nameY + 20);
  gradient.addColorStop(0, '#1F2937');
  gradient.addColorStop(1, '#374151');
  ctx.fillStyle = gradient;
  ctx.fillText(name.toUpperCase(), centerX, nameY);
  
  // Designation styling with elegant presentation
  if (designation) {
    ctx.font = 'italic 18px Georgia, serif';
    
    // Create elegant background for designation
    const designationWidth = ctx.measureText(designation).width + 40;
    const designationHeight = 30;
    const rectX = centerX - designationWidth / 2;
    const rectY = designationY - designationHeight / 2;
    
    // Background with rounded corners
    ctx.fillStyle = 'rgba(220, 38, 38, 0.1)';
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, designationWidth, designationHeight, 15);
    ctx.fill();
    
    // Border for designation box
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(rectX, rectY, designationWidth, designationHeight, 15);
    ctx.stroke();
    
    // Designation text
    ctx.fillStyle = '#DC2626';
    ctx.fillText(designation, centerX, designationY);
  }
  
  ctx.restore();
}

function drawProfessionalBorders(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.save();
  
  const borderWidth = 8;
  ctx.fillStyle = '#DC2626';
  
  // Top border
  ctx.fillRect(0, 0, width, borderWidth);
  
  // Bottom border  
  ctx.fillRect(0, height - borderWidth, width, borderWidth);
  
  // Left border
  ctx.fillRect(0, 0, borderWidth, height);
  
  // Right border
  ctx.fillRect(width - borderWidth, 0, borderWidth, height);
  
  ctx.restore();
}



// Header is now handled by upper section image

function drawPixelPerfectProfile(ctx: CanvasRenderingContext2D, width: number, profileY: number, data: WorldHeartDayPosterData): void {
  const centerX = width * 0.74; // Move to right side
  const radius = 70; // Decreased size

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
  const boxWidth = width * 0.5; // Smaller width for compact design
  const boxX = width * 0.7 - boxWidth / 2; // Center with profile pic at 0.8
  const boxHeight = 180; // Increased height for better text spacing

  ctx.save();
  
  // Enhanced background with gradient
  const gradient = ctx.createLinearGradient(boxX, messageY, boxX, messageY + boxHeight);
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(1, '#FAFAFA');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(boxX, messageY, boxWidth, boxHeight, 12);
  ctx.fill();
  
  // Enhanced shadow effect
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(boxX, messageY, boxWidth, boxHeight, 12);
  ctx.fill();
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // Professional red border with better width
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(boxX, messageY, boxWidth, boxHeight, 12);
  ctx.stroke();
  
  ctx.restore();
  
  // Enhanced quote marks with better positioning
  ctx.save();
  ctx.fillStyle = '#DC2626';
  ctx.font = 'bold 24px Georgia, serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('"', boxX + 15, messageY + 15);
  
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('"', boxX + boxWidth - 15, messageY + boxHeight - 15);
  ctx.restore();

  // Enhanced message text styling with larger font
  ctx.fillStyle = '#1F2937';
  ctx.font = 'bold 16px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // Smart word wrapping with better spacing
  const words = message.split(' ');
  const lines = [];
  let currentLine = '';
  const maxWidth = boxWidth - 70; // Better margins for readability
  
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

  // Enhanced text positioning with better spacing
  const lineHeight = 20; // Adjusted line height for better fit
  const maxLines = 5; // Allow more lines for longer messages
  const linesToShow = Math.min(lines.length, maxLines);
  
  // Calculate vertical centering based on actual number of lines
  const totalTextHeight = (linesToShow - 1) * lineHeight;
  const startY = messageY + (boxHeight / 2) - (totalTextHeight / 2);
  
  ctx.textAlign = 'center';
  for (let i = 0; i < linesToShow; i++) {
    ctx.fillText(lines[i], width * 0.7, startY + i * lineHeight); // Center with message box at 0.7
  }
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