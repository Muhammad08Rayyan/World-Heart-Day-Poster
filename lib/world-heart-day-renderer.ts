// World Heart Day Poster Renderer - Simple & Generic

export interface WorldHeartDayPosterData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}

interface PosterLayout {
  frameWidth: number;
  posterX: number;
  posterY: number;
  posterWidth: number;
  posterHeight: number;
  profileY: number;
  nameY: number;
  designationY: number;
  messageY: number;
  footerHeight: number;
}

export function renderWorldHeartDayPoster(
  canvas: HTMLCanvasElement,
  data: WorldHeartDayPosterData
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Set canvas dimensions with frame space
  canvas.width = 640; // Increased width for frame
  canvas.height = 880; // Increased height for frame

  // Clear canvas with precision
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Enable high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Updated layout system with bigger frame and abstract design space
  const frameWidth = 35; // Bigger frame border width
  const posterWidth = canvas.width - (frameWidth * 2); // Inner poster width
  const posterHeight = canvas.height - (frameWidth * 2); // Inner poster height
  
  const layout = {
    frameWidth: frameWidth,
    posterX: frameWidth,
    posterY: frameWidth,
    posterWidth: posterWidth,
    posterHeight: posterHeight,
    profileY: 340, // Profile position adjusted for frame
    nameY: 100, // Name moved to account for frame
    designationY: 125, // Designation below name adjusted for frame
    messageY: 595, // Message positioned on background adjusted for frame
    footerHeight: 120 // Footer height increased for frame design
  };

  // Draw World Heart Day frame first
  drawWorldHeartDayFrame(ctx, canvas.width, canvas.height, layout.frameWidth);
  
  // Draw background for inner poster area
  drawPixelPerfectBackground(ctx, layout.posterX, layout.posterY, layout.posterWidth, layout.posterHeight);
  
  // Draw background image and ensure all elements render after it loads
  drawBackgroundImageWithCallback(ctx, layout, () => {
    // Draw all elements after background loads
    drawPixelPerfectProfile(ctx, layout, data);
    drawNameAndDesignation(ctx, layout, data.name, data.designation);
    drawPixelPerfectMessage(ctx, layout, data.message);
    
    // Draw footer as part of the frame
    drawFooterWithFrame(ctx, layout, () => {
      // Footer loaded, no additional borders needed
    });
  });
}

// Draw World Heart Day frame with sophisticated abstract design
function drawWorldHeartDayFrame(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  
  // Main frame gradient - professional heart theme
  const mainGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  mainGradient.addColorStop(0, '#B91C1C'); // Deep red
  mainGradient.addColorStop(0.3, '#DC2626'); // Heart red
  mainGradient.addColorStop(0.7, '#EF4444'); // Lighter red
  mainGradient.addColorStop(1, '#F87171'); // Pink
  
  // Draw outer frame background
  ctx.fillStyle = mainGradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
  // Add abstract geometric pattern overlay
  drawAbstractGeometricPattern(ctx, canvasWidth, canvasHeight, frameWidth);
  
  // Add subtle medical/health symbols
  drawHealthSymbolsPattern(ctx, canvasWidth, canvasHeight, frameWidth);
  
  // Add elegant corner decorations
  drawCornerDecorations(ctx, canvasWidth, canvasHeight, frameWidth);
  
  // Add inner frame border with gradient
  drawInnerFrameBorder(ctx, canvasWidth, canvasHeight, frameWidth);
  
  ctx.restore();
}

// Abstract geometric pattern for professional look
function drawAbstractGeometricPattern(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  
  // Semi-transparent overlay for depth
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  
  // Draw flowing organic shapes
  
  // Top flowing curves
  ctx.beginPath();
  ctx.moveTo(0, frameWidth * 0.3);
  ctx.bezierCurveTo(canvasWidth * 0.2, frameWidth * 0.8, canvasWidth * 0.8, frameWidth * 0.2, canvasWidth, frameWidth * 0.7);
  ctx.lineTo(canvasWidth, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  
  // Bottom flowing curves
  ctx.beginPath();
  ctx.moveTo(0, canvasHeight - frameWidth * 0.3);
  ctx.bezierCurveTo(canvasWidth * 0.3, canvasHeight - frameWidth * 0.8, canvasWidth * 0.7, canvasHeight - frameWidth * 0.2, canvasWidth, canvasHeight - frameWidth * 0.6);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.lineTo(0, canvasHeight);
  ctx.closePath();
  ctx.fill();
  
  // Side organic patterns
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  
  // Left side flowing shape
  ctx.beginPath();
  ctx.moveTo(frameWidth * 0.2, 0);
  ctx.bezierCurveTo(frameWidth * 0.8, canvasHeight * 0.2, frameWidth * 0.3, canvasHeight * 0.8, frameWidth * 0.9, canvasHeight);
  ctx.lineTo(0, canvasHeight);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  
  // Right side flowing shape
  ctx.beginPath();
  ctx.moveTo(canvasWidth - frameWidth * 0.2, 0);
  ctx.bezierCurveTo(canvasWidth - frameWidth * 0.8, canvasHeight * 0.3, canvasWidth - frameWidth * 0.3, canvasHeight * 0.7, canvasWidth - frameWidth * 0.9, canvasHeight);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.lineTo(canvasWidth, 0);
  ctx.closePath();
  ctx.fill();
  
  ctx.restore();
}

// Heart pattern with natural randomness
function drawHealthSymbolsPattern(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  
  // Slightly more visible hearts
  ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.font = '14px system-ui';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const hearts = ['♥', '♡']; // Only hearts
  
  // Create pseudo-random but consistent pattern
  const seed = 42; // Fixed seed for consistency
  function pseudoRandom(x: number, y: number): number {
    return ((x * 73 + y * 37 + seed) % 100) / 100;
  }
  
  const baseSpacing = 35;
  
  // Top border hearts with natural variation
  for (let x = baseSpacing; x < canvasWidth - baseSpacing; x += baseSpacing) {
    const randomOffset = (pseudoRandom(x, 0) - 0.5) * 15; // ±7.5px variation
    const heartType = pseudoRandom(x, 1) > 0.6 ? hearts[1] : hearts[0]; // Mix of filled and outline
    const y = frameWidth / 2 + (pseudoRandom(x, 2) - 0.5) * 8; // Slight vertical variation
    ctx.fillText(heartType, x + randomOffset, y);
  }
  
  // Bottom border hearts
  for (let x = baseSpacing; x < canvasWidth - baseSpacing; x += baseSpacing) {
    const randomOffset = (pseudoRandom(x, 100) - 0.5) * 15;
    const heartType = pseudoRandom(x, 101) > 0.6 ? hearts[1] : hearts[0];
    const y = canvasHeight - frameWidth / 2 + (pseudoRandom(x, 102) - 0.5) * 8;
    ctx.fillText(heartType, x + randomOffset, y);
  }
  
  // Left border hearts
  for (let y = baseSpacing * 2; y < canvasHeight - baseSpacing * 2; y += baseSpacing) {
    const randomOffset = (pseudoRandom(0, y) - 0.5) * 12;
    const heartType = pseudoRandom(1, y) > 0.6 ? hearts[1] : hearts[0];
    const x = frameWidth / 2 + (pseudoRandom(2, y) - 0.5) * 8;
    ctx.fillText(heartType, x, y + randomOffset);
  }
  
  // Right border hearts
  for (let y = baseSpacing * 2; y < canvasHeight - baseSpacing * 2; y += baseSpacing) {
    const randomOffset = (pseudoRandom(200, y) - 0.5) * 12;
    const heartType = pseudoRandom(201, y) > 0.6 ? hearts[1] : hearts[0];
    const x = canvasWidth - frameWidth / 2 + (pseudoRandom(202, y) - 0.5) * 8;
    ctx.fillText(heartType, x, y + randomOffset);
  }
  
  // Add some scattered hearts in the frame corners for natural feel
  const cornerHearts = [
    {x: frameWidth * 0.7, y: frameWidth * 0.7},
    {x: canvasWidth - frameWidth * 0.7, y: frameWidth * 0.7},
    {x: frameWidth * 0.7, y: canvasHeight - frameWidth * 0.7},
    {x: canvasWidth - frameWidth * 0.7, y: canvasHeight - frameWidth * 0.7},
  ];
  
  cornerHearts.forEach((corner) => {
    const heartType = pseudoRandom(corner.x, corner.y) > 0.5 ? hearts[1] : hearts[0];
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.fillText(heartType, corner.x, corner.y);
  });
  
  ctx.restore();
}

// Elegant corner decorations
function drawCornerDecorations(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  
  const cornerSize = frameWidth * 0.6;
  
  // Top-left corner
  ctx.beginPath();
  ctx.arc(cornerSize, cornerSize, cornerSize * 0.7, Math.PI, Math.PI * 1.5);
  ctx.stroke();
  
  // Top-right corner
  ctx.beginPath();
  ctx.arc(canvasWidth - cornerSize, cornerSize, cornerSize * 0.7, Math.PI * 1.5, 0);
  ctx.stroke();
  
  // Bottom-left corner
  ctx.beginPath();
  ctx.arc(cornerSize, canvasHeight - cornerSize, cornerSize * 0.7, Math.PI * 0.5, Math.PI);
  ctx.stroke();
  
  // Bottom-right corner
  ctx.beginPath();
  ctx.arc(canvasWidth - cornerSize, canvasHeight - cornerSize, cornerSize * 0.7, 0, Math.PI * 0.5);
  ctx.stroke();
  
  ctx.restore();
}

// Inner frame border with gradient
function drawInnerFrameBorder(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, frameWidth: number): void {
  ctx.save();
  
  // Inner border gradient
  const innerGradient = ctx.createLinearGradient(frameWidth, frameWidth, canvasWidth - frameWidth, canvasHeight - frameWidth);
  innerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
  innerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
  innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
  
  ctx.strokeStyle = innerGradient;
  ctx.lineWidth = 3;
  ctx.strokeRect(frameWidth - 1.5, frameWidth - 1.5, canvasWidth - (frameWidth * 2) + 3, canvasHeight - (frameWidth * 2) + 3);
  
  // Add subtle inner shadow effect
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(frameWidth + 1, frameWidth + 1, canvasWidth - (frameWidth * 2) - 2, canvasHeight - (frameWidth * 2) - 2);
  
  ctx.restore();
}

// Clean professional background - updated for inner poster area
function drawPixelPerfectBackground(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
  // Pure white background for inner poster
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x, y, width, height);
}

// Draw background image for main area with callback - updated for layout
function drawBackgroundImageWithCallback(ctx: CanvasRenderingContext2D, layout: PosterLayout, callback: () => void): void {
  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.src = '/Background.png';
  
  bgImg.onload = () => {
    const mainAreaHeight = layout.posterHeight - layout.footerHeight;
    ctx.drawImage(bgImg, layout.posterX, layout.posterY, layout.posterWidth, mainAreaHeight);
    // Execute callback after background is drawn
    callback();
  };
  
  bgImg.onerror = () => {
    // Fallback: simple gradient
    const mainAreaHeight = layout.posterHeight - layout.footerHeight;
    const gradient = ctx.createLinearGradient(layout.posterX, layout.posterY, layout.posterX, layout.posterY + mainAreaHeight);
    gradient.addColorStop(0, '#f8f9fa');
    gradient.addColorStop(1, '#e9ecef');
    ctx.fillStyle = gradient;
    ctx.fillRect(layout.posterX, layout.posterY, layout.posterWidth, mainAreaHeight);
    // Execute callback after fallback is drawn
    callback();
  };
}

// Clean name and designation styling positioned in top right - updated for layout
function drawNameAndDesignation(ctx: CanvasRenderingContext2D, layout: PosterLayout, name: string, designation: string): void {
  const rightX = layout.posterX + (layout.posterWidth * 0.75); // Position in top right area within frame
  
  ctx.save();
  
  // Clean name styling
  ctx.font = 'bold 22px "Poppins", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#1F2937';
  ctx.fillText(name.toUpperCase(), rightX, layout.posterY + layout.nameY);
  
  // Simple designation styling
  if (designation) {
    ctx.font = '20px "Poppins", sans-serif';
    ctx.fillStyle = '#DC2626';
    ctx.fillText(designation, rightX, layout.posterY + layout.designationY);
  }
  
  ctx.restore();
}

// Red borders function removed - no longer needed



// Header is now handled by upper section image

function drawPixelPerfectProfile(ctx: CanvasRenderingContext2D, layout: PosterLayout, data: WorldHeartDayPosterData): void {
  const centerX = layout.posterX + (layout.posterWidth * 0.72); // Move to left side within frame
  const centerY = layout.posterY + layout.profileY;
  const radius = 100; // Keep same size

  ctx.save();
  
  // Always draw white background circle
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 4, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw the user image or default profile image
  if (data.imageData) {
    drawUserImage(ctx, data.imageData, centerX, centerY, radius);
  } else {
    // Use default profile.jpg
    drawDefaultProfileImage(ctx, centerX, centerY, radius);
  }
  
  // White border for clean look
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
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
  layout: PosterLayout,
  message: string
): void {
  // Position text directly on background without box - centered within frame
  const centerX = layout.posterX + (layout.posterWidth * 0.28);
  const maxWidth = layout.posterWidth * 0.5; // Use most of the poster width
  const messageY = layout.posterY + layout.messageY;

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

// New footer function that integrates with the frame
function drawFooterWithFrame(ctx: CanvasRenderingContext2D, layout: PosterLayout, callback: () => void): void {
  const footerImg = new Image();
  footerImg.crossOrigin = 'anonymous';
  footerImg.src = '/Footer.jpg';
  
  footerImg.onload = () => {
    // Footer positioned within the frame at bottom
    const footerY = layout.posterY + layout.posterHeight - layout.footerHeight;
    ctx.drawImage(footerImg, layout.posterX, footerY, layout.posterWidth, layout.footerHeight);
    
    // Add decorative border between footer and main content
    ctx.save();
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(layout.posterX + 10, footerY);
    ctx.lineTo(layout.posterX + layout.posterWidth - 10, footerY);
    ctx.stroke();
    ctx.restore();
    
    // Execute callback after footer is drawn
    callback();
  };
  
  footerImg.onerror = () => {
    // Fallback footer - red background with frame integration
    const footerY = layout.posterY + layout.posterHeight - layout.footerHeight;
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(layout.posterX, footerY, layout.posterWidth, layout.footerHeight);
    
    // Add decorative border
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(layout.posterX + 10, footerY);
    ctx.lineTo(layout.posterX + layout.posterWidth - 10, footerY);
    ctx.stroke();
    ctx.restore();
    
    // Execute callback after fallback is drawn
    callback();
  };
}