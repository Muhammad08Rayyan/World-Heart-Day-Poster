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
    profileY: 300, // Profile position
    nameY: 420, // Name below profile
    designationY: 455, // Designation below name
    messageY: 490, // Message box
    footerHeight: 100 // Footer height
  };

  // Simple rendering
  drawPixelPerfectBackground(ctx, canvas.width, canvas.height);
  
  // Draw background image for main area
  drawBackgroundImage(ctx, canvas.width, canvas.height, layout.footerHeight);
  
  // Draw all elements on top of background
  setTimeout(() => {
    // Draw profile, name, designation
    drawPixelPerfectProfile(ctx, canvas.width, layout.profileY, data);
    drawNameAndDesignation(ctx, canvas.width, layout.nameY, layout.designationY, data.name, data.designation);
    
    // Draw message box
    drawPixelPerfectMessage(ctx, canvas.width, layout.messageY, data.message);
  }, 100);
  
  // Draw footer
  drawFooterImage(ctx, canvas.width, canvas.height, layout.footerHeight);
  
  // Draw red borders on top of everything
  drawProfessionalBorders(ctx, canvas.width, canvas.height);
}

// Clean professional background
function drawPixelPerfectBackground(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  // Pure white background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
}

// Draw background image for main area
function drawBackgroundImage(ctx: CanvasRenderingContext2D, width: number, height: number, footerHeight: number): void {
  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.src = '/Background.png';
  
  bgImg.onload = () => {
    const mainAreaHeight = height - footerHeight;
    ctx.drawImage(bgImg, 0, 0, width, mainAreaHeight);
  };
  
  bgImg.onerror = () => {
    // Fallback: simple gradient
    const mainAreaHeight = height - footerHeight;
    const gradient = ctx.createLinearGradient(0, 0, 0, mainAreaHeight);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, mainAreaHeight);
  };
}

// Simple name and designation drawing
function drawNameAndDesignation(ctx: CanvasRenderingContext2D, width: number, nameY: number, designationY: number, name: string, designation: string): void {
  const centerX = width / 2;
  
  ctx.save();
  
  // Name styling - black text
  ctx.font = 'bold 26px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#000000';
  ctx.fillText(name.toUpperCase(), centerX, nameY);
  
  // Designation styling - black text
  if (designation) {
    ctx.font = '16px system-ui';
    ctx.fillStyle = '#000000';
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
  const centerX = width / 2;
  const radius = 65;

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
  const boxX = 30;
  const boxWidth = width - 60;
  const boxHeight = 100; // Fixed height

  ctx.save();
  
  // Clean white background with subtle border
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(boxX, messageY, boxWidth, boxHeight, 8);
  ctx.fill();
  
  // Professional red border
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(boxX, messageY, boxWidth, boxHeight, 8);
  ctx.stroke();
  
  ctx.restore();
  
  // Clean quote marks
  ctx.save();
  ctx.fillStyle = '#DC2626';
  ctx.font = '20px system-ui';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('"', boxX + 12, messageY + 12);
  
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillText('"', boxX + boxWidth - 12, messageY + boxHeight - 12);
  ctx.restore();

  // Clean message text styling
  ctx.fillStyle = '#374151';
  ctx.font = '14px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  // Smart word wrapping with better spacing
  const words = message.split(' ');
  const lines = [];
  let currentLine = '';
  const maxWidth = boxWidth - 50; // More reasonable text margins
  
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

  // Simple text positioning
  const lineHeight = 18;
  const maxLines = 4;
  const linesToShow = Math.min(lines.length, maxLines);
  const startY = messageY + 30;
  
  ctx.textAlign = 'center';
  for (let i = 0; i < linesToShow; i++) {
    ctx.fillText(lines[i], width / 2, startY + i * lineHeight);
  }
}

// Remove the old header and heart functions since upper section image handles this

function drawFooterImage(ctx: CanvasRenderingContext2D, width: number, height: number, footerHeight: number): void {
  const footerImg = new Image();
  footerImg.crossOrigin = 'anonymous';
  footerImg.src = '/Footer.jpg';
  
  footerImg.onload = () => {
    const footerY = height - footerHeight;
    ctx.drawImage(footerImg, 0, footerY, width, footerHeight);
  };
  
  footerImg.onerror = () => {
    // Fallback footer
    const footerY = height - footerHeight;
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(0, footerY, width, footerHeight);
  };
}