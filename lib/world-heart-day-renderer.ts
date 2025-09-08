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

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Simple light background
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw simple sections
  drawSimpleHeader(ctx, canvas.width);
  drawSimpleProfile(ctx, canvas.width, data);
  drawSimpleName(ctx, canvas.width, data.name, data.designation);
  drawSimpleMessage(ctx, canvas.width, data.message);
  drawFooterImage(ctx, canvas.width, canvas.height);
}

function drawSimpleHeader(ctx: CanvasRenderingContext2D, width: number): void {
  // Simple centered header
  ctx.fillStyle = '#DC2626';
  ctx.font = 'bold 28px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('World Heart Day', width / 2, 50);
  
  ctx.font = '18px Arial, sans-serif';
  ctx.fillText('September 29, 2024', width / 2, 80);
}

function drawSimpleProfile(ctx: CanvasRenderingContext2D, width: number, data: WorldHeartDayPosterData): void {
  const centerX = width / 2;
  const centerY = 200;
  const radius = 60;

  // Simple circular border
  ctx.strokeStyle = '#DC2626';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
  ctx.stroke();

  // Profile image or placeholder
  if (data.imageData) {
    drawUserImage(ctx, data.imageData, centerX, centerY, radius);
  } else {
    drawSimplePlaceholder(ctx, centerX, centerY, radius);
  }
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

function drawSimplePlaceholder(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
): void {
  ctx.fillStyle = '#E5E7EB';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();
  
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '40px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('👤', centerX, centerY + 12);
}

function drawSimpleName(
  ctx: CanvasRenderingContext2D,
  width: number,
  name: string,
  designation: string
): void {
  const centerX = width / 2;
  
  // Name
  ctx.fillStyle = '#1F2937';
  ctx.font = 'bold 24px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(name, centerX, 300);

  // Designation
  if (designation) {
    ctx.font = '16px Arial, sans-serif';
    ctx.fillStyle = '#6B7280';
    ctx.fillText(designation, centerX, 325);
  }
}

function drawSimpleMessage(
  ctx: CanvasRenderingContext2D,
  width: number,
  message: string
): void {
  const boxX = 40;
  const boxY = 360;
  const boxWidth = width - 80;
  const boxHeight = 120;

  // Simple white box
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

  // Simple border
  ctx.strokeStyle = '#E5E7EB';
  ctx.lineWidth = 2;
  ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

  // Message text
  ctx.fillStyle = '#374151';
  ctx.font = '16px Arial, sans-serif';
  ctx.textAlign = 'center';

  // Word wrap
  const words = message.split(' ');
  const lines = [];
  let currentLine = '';
  const maxWidth = boxWidth - 40;
  
  ctx.textAlign = 'left';
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

  // Draw text centered
  ctx.textAlign = 'center';
  const lineHeight = 20;
  const startY = boxY + 30;
  
  for (let i = 0; i < Math.min(lines.length, 4); i++) {
    ctx.fillText(lines[i], width / 2, startY + i * lineHeight);
  }
}

function drawFooterImage(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const footerImg = new Image();
  footerImg.crossOrigin = 'anonymous';
  footerImg.src = '/Footer.jpg';
  
  footerImg.onload = () => {
    const footerHeight = 80;
    const footerY = height - footerHeight;
    ctx.drawImage(footerImg, 0, footerY, width, footerHeight);
  };
}