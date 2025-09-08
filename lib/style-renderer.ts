// Style-based poster rendering utility with factory pattern
import { POSTER_STYLES } from './poster-config';
import { PosterStyle, StyleConfig } from '@/types/poster';

export interface PosterRenderData {
  name: string;
  designation: string;
  message: string;
  imageData?: string;
}

export interface CanvasRenderContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
}

export class StyleRenderer {
  private style: PosterStyle;
  private config: StyleConfig;
  private posterData?: PosterRenderData;

  constructor(styleId: string) {
    console.log('Creating StyleRenderer for:', styleId);
    const style = POSTER_STYLES.find(s => s.id === styleId);
    if (!style) {
      console.error('Available styles:', POSTER_STYLES.map(s => s.id));
      throw new Error(`Style with id "${styleId}" not found`);
    }
    this.style = style;
    this.config = style.config;
    console.log('StyleRenderer created for:', this.style.name);
  }

  public render(context: CanvasRenderContext, data: PosterRenderData): void {
    console.log('Rendering with style:', this.style.id, this.style.name);
    this.posterData = data; // Store data for async operations
    this.setupCanvas(context);
    this.drawBackground(context);
    
    // For Style 1 and Style 3, content is drawn after background loads asynchronously
    if (this.style.id !== 'style1' && this.style.id !== 'style3') {
      this.drawHeader(context);
      this.drawProfile(context, data);
      this.drawContent(context, data);
      this.drawFooter(context);
    }
    // Style 1 and Style 3 content is drawn after background loads
  }
  
  private drawContentForStyle1(context: CanvasRenderContext): void {
    if (!this.posterData) return;
    
    // Draw all content for Style 1 after background loads
    this.drawHeader(context);
    this.drawProfile(context, this.posterData);
    this.drawContent(context, this.posterData);
    this.drawFooter(context);
  }
  
  private drawContentForStyle3(context: CanvasRenderContext): void {
    if (!this.posterData) return;
    
    // Draw all content for Style 3 after background loads
    this.drawHeader(context);
    this.drawProfile(context, this.posterData);
    this.drawContent(context, this.posterData);
    this.drawFooter(context);
  }

  private setupCanvas(context: CanvasRenderContext): void {
    const { canvas, ctx } = context;
    
    // Ensure canvas dimensions are properly set
    const targetWidth = 600;
    const targetHeight = 800;
    
    // Set canvas dimensions
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    
    // Update context dimensions
    context.width = targetWidth;
    context.height = targetHeight;
    
    // Clear the entire canvas completely
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Fill with white background to ensure clean slate
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas style dimensions to ensure proper display
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    canvas.style.maxWidth = '300px';
    canvas.style.aspectRatio = '3/4'; // Maintain 3:4 aspect ratio
    
    console.log(`Canvas setup: ${canvas.width}x${canvas.height}`);
  }

  private drawBackground(context: CanvasRenderContext): void {
    const { ctx, width, height } = context;
    
    // Special handling for Style 1 - Custom background image (swapped)
    if (this.style.id === 'style1') {
      // Load background2 image from assets
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = '/background2.png';
      
      bgImg.onload = () => {
        // Draw custom background
        ctx.drawImage(bgImg, 0, 0, width, height);
        
        // Add subtle overlay for text readability
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        // Now draw all content on top of the background
        this.drawContentForStyle1(context);
      };
      
      bgImg.onerror = () => {
        // Fallback to solid background if image fails to load
        ctx.fillStyle = this.config.colors.background;
        ctx.fillRect(0, 0, width, height);
        
        // Draw content even with fallback background
        this.drawContentForStyle1(context);
      };
      
      // Skip background pattern for custom background style
      return;
    }
    
    // Special handling for Style 3 - Background.png
    if (this.style.id === 'style3') {
      // Load Background.png image from assets
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = '/Background.png';
      
      bgImg.onload = () => {
        // Draw custom background
        ctx.drawImage(bgImg, 0, 0, width, height);
        
        // Skip background patterns for Style 3 - keep it clean
        
        // Now draw all content on top of the background
        this.drawContentForStyle3(context);
      };
      
      bgImg.onerror = () => {
        // Fallback to solid background if image fails to load
        ctx.fillStyle = this.config.colors.background;
        ctx.fillRect(0, 0, width, height);
        
        // Skip background patterns for Style 3 - keep it clean
        
        // Draw content even with fallback background
        this.drawContentForStyle3(context);
      };
      
      // Skip background pattern for custom background style
      return;
    }
    
    // Base background for other styles
    if (this.config.colors.background.startsWith('linear-gradient')) {
      // Handle gradient backgrounds (like vibrant style)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#fef3c7');
      gradient.addColorStop(1, '#fef9e7');
      ctx.fillStyle = gradient;
    } else {
      // Use the configured background color
      ctx.fillStyle = this.config.colors.background;
    }
    ctx.fillRect(0, 0, width, height);

    // Background pattern (if enabled)
    if (this.config.decorations.backgroundPattern) {
      this.drawBackgroundPattern(context);
    }
  }

  private drawBackgroundPattern(context: CanvasRenderContext): void {
    const { ctx, width, height } = context;
    ctx.save();
    
    if (this.style.id === 'style3') {
      // Style 3: More visible patterns over the Pakistan flag background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; // White lines for visibility
      ctx.lineWidth = 1;
      
      // Draw subtle diagonal lines
      for (let x = -height; x < width + height; x += 80) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      
      // Draw subtle dots pattern
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      for (let x = 40; x < width; x += 100) {
        for (let y = 150; y < height - 100; y += 100) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    } else {
      // Other styles: Very subtle geometric pattern
      ctx.strokeStyle = this.config.colors.decorative.replace('0.25', '0.02');
      ctx.lineWidth = 1;
      
      // Draw subtle diagonal lines
      for (let x = -height; x < width + height; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();
      }
      
      // Draw subtle dots pattern
      ctx.fillStyle = this.config.colors.decorative.replace('0.25', '0.03');
      for (let x = 30; x < width; x += 80) {
        for (let y = 150; y < height - 100; y += 80) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
    
    ctx.restore();
  }

  public drawHeader(context: CanvasRenderContext): void {
    // Skip header for Style 1 and Style 3 as the backgrounds have titles/designs
    if (this.style.id === 'style1' || this.style.id === 'style3') {
      return;
    }
    
    const { ctx, width } = context;
    const headerHeight = this.config.layout.headerHeight;

    // Try to load Screen.png first
    const screenImg = new Image();
    screenImg.crossOrigin = 'anonymous';
    screenImg.src = '/Screen.png';
    
    screenImg.onload = () => {
      ctx.drawImage(screenImg, 0, 0, width, headerHeight);
    };
    
    screenImg.onerror = () => {
      // Fallback header with style-specific colors
      const headerGradient = ctx.createLinearGradient(0, 0, 0, headerHeight);
      headerGradient.addColorStop(0, this.config.colors.headerGradient[0]);
      headerGradient.addColorStop(1, this.config.colors.headerGradient[1]);
      ctx.fillStyle = headerGradient;
      ctx.fillRect(0, 0, width, headerHeight);
      
      // Add header decorations
      if (this.config.decorations.geometric) {
        this.drawHeaderDecorations(context);
      }
      
      // Header text
      ctx.fillStyle = this.config.colors.secondary;
      ctx.font = `bold 30px ${this.config.fonts.heading}`;
      ctx.textAlign = 'center';
      ctx.fillText('PAKISTAN INDEPENDENCE DAY', width / 2, headerHeight * 0.5);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.font = `18px ${this.config.fonts.body}`;
      ctx.fillText('14th August, 2025', width / 2, headerHeight * 0.62);
    };
  }

  private drawHeaderDecorations(context: CanvasRenderContext): void {
    const { ctx, width } = context;
    ctx.save();
    
    // Style-specific header decorations
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    
    if (this.config.decorations.stars) {
      // Stars in corners
      this.drawStar(ctx, 30, 30, 5, 8, 4);
      this.drawStar(ctx, width - 30, 30, 5, 8, 4);
    }
    
    if (this.config.decorations.geometric) {
      // Geometric decorations
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width/2 - 50, 110);
      ctx.quadraticCurveTo(width/2, 95, width/2 + 50, 110);
      ctx.stroke();
    }
    
    ctx.restore();
  }

  public drawProfile(context: CanvasRenderContext, data: PosterRenderData): void {
    const { ctx, width } = context;
    
    // Position profiles based on background layouts
    let centerX, centerY, radius;
    if (this.style.id === 'style1') {
      // Style 1: Position on left side to avoid right side landmarks
      centerX = width * 0.3; // 30% from left
      centerY = this.config.layout.profileY;
      radius = this.config.layout.profileRadius;
    } else if (this.style.id === 'style3') {
      // Style 3: Center in the white middle area of Background.png
      centerX = width / 2; // Centered horizontally
      centerY = 180; // Moved up by 20px - positioned higher in the white middle area for better balance
      radius = 65; // Slightly smaller for better proportion
    } else {
      // Style 2: Default positioning
      centerX = width / 2;
      centerY = this.config.layout.profileY;
      radius = this.config.layout.profileRadius;
    }

    // Add decorative elements around profile area (skip for Style 2 and Style 3)
    if (this.config.decorations.stars && this.style.id !== 'style2' && this.style.id !== 'style3') {
      this.drawEmptyAreaRefinements(context, centerX);
    }

    // Profile background - adjust for different styles
    let profileBgColor;
    if (this.style.id === 'style1') {
      profileBgColor = 'rgba(255, 255, 255, 0.2)';
    } else if (this.style.id === 'style3') {
      profileBgColor = 'rgba(255, 255, 255, 0.9)'; // Semi-transparent white for Style 3
    } else {
      profileBgColor = '#f8f9fa';
    }
    ctx.fillStyle = profileBgColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    ctx.fill();

    if (data.imageData) {
      this.drawUserImage(context, data.imageData, centerX, centerY, radius);
    } else {
      this.drawPlaceholder(context, centerX, centerY, radius);
    }
  }

  private drawUserImage(context: CanvasRenderContext, imageData: string, centerX: number, centerY: number, radius: number): void {
    const { ctx } = context;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.clip();
      
      const imgAspect = img.width / img.height;
      let drawWidth, drawHeight, drawX, drawY;
      
      if (imgAspect > 1) {
        drawHeight = radius * 2;
        drawWidth = drawHeight * imgAspect;
        drawX = centerX - drawWidth / 2;
        drawY = centerY - drawHeight / 2;
      } else {
        drawWidth = radius * 2;
        drawHeight = drawWidth / imgAspect;
        drawX = centerX - drawWidth / 2;
        drawY = centerY - drawHeight / 2;
      }
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
      
      // Enhanced border with style-specific colors
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      
      ctx.strokeStyle = this.config.colors.secondary;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Inner border with primary color
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = this.config.colors.primary;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 3, 0, 2 * Math.PI);
      ctx.stroke();
      
      ctx.restore();
    };
    
    img.onerror = () => {
      this.drawPlaceholder(context, centerX, centerY, radius);
    };
    
    img.src = imageData;
  }

  private drawPlaceholder(context: CanvasRenderContext, centerX: number, centerY: number, radius: number): void {
    const { ctx } = context;
    
    ctx.fillStyle = this.config.colors.secondary;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.fillStyle = '#6c757d';
    ctx.font = `40px ${this.config.fonts.body}`;
    ctx.textAlign = 'center';
    ctx.fillText('👤', centerX, centerY + 12);
  }

  public drawContent(context: CanvasRenderContext, data: PosterRenderData): void {
    const { ctx, width } = context;
    
    // Position content based on background layouts
    let centerX, nameY, designationY;
    if (this.style.id === 'style1') {
      // Style 1: Position on left side to avoid right side landmarks
      centerX = width * 0.3; // 30% from left
      nameY = this.config.layout.nameY;
      designationY = this.config.layout.designationY;
    } else if (this.style.id === 'style3') {
      // Style 3: Center in the white middle area
      centerX = width / 2; // Centered
      nameY = 280; // Moved down 20px - 100px gap from profile (consistent spacing)
      designationY = 310; // Moved down 20px - 30px gap from name (better spacing)
    } else {
      // Style 2: Default positioning
      centerX = width / 2;
      nameY = this.config.layout.nameY;
      designationY = this.config.layout.designationY;
    }

    // Name - adjust text color for backgrounds
    if (this.style.id === 'style3') {
      ctx.fillStyle = '#01411C'; // Dark green for visibility on white background
    } else {
      ctx.fillStyle = this.config.colors.text;
    }
    ctx.font = `bold 24px ${this.config.fonts.heading}`;
    ctx.textAlign = 'center';
    ctx.fillText(data.name.toUpperCase(), centerX, nameY);

    // Designation
    if (data.designation) {
      // Set color based on style
      if (this.style.id === 'style1') {
        ctx.fillStyle = this.config.colors.text;
      } else if (this.style.id === 'style3') {
        ctx.fillStyle = '#2d5a3d'; // Medium green for Style 3
      } else {
        ctx.fillStyle = '#6c757d';
      }
      
      let fontSize = 20;
      ctx.font = `${fontSize}px ${this.config.fonts.body}`;
      
      // Adjust width based on style
      let maxWidth;
      if (this.style.id === 'style1') {
        maxWidth = width * 0.5; // Smaller width for left side positioning
      } else {
        maxWidth = width - 80; // Standard width
      }
      
      while (ctx.measureText(data.designation).width > maxWidth && fontSize > 14) {
        fontSize -= 1;
        ctx.font = `${fontSize}px ${this.config.fonts.body}`;
      }
      
      ctx.fillText(data.designation, centerX, designationY);
    }

    // Message area
    this.drawMessage(context, data.message);
  }

  private drawMessage(context: CanvasRenderContext, message: string): void {
    const { ctx, width } = context;
    
    // Position message box based on style
    let msgX, msgY, msgWidth, textCenterX;
    if (this.style.id === 'style1') {
      msgX = 20; // Start closer to left edge
      msgY = this.config.layout.messageY;
      msgWidth = width * 0.55; // Take up 55% of width (left side)
      textCenterX = msgX + msgWidth / 2; // Center text in the message box
    } else if (this.style.id === 'style3') {
      msgX = 40; // Standard margin
      msgY = 350; // Moved down 20px - 40px gap from designation (balanced spacing)
      msgWidth = width - 80; // Standard width
      textCenterX = width / 2; // Center text
    } else {
      msgX = 40;
      msgY = this.config.layout.messageY;
      msgWidth = width - 80;
      textCenterX = width / 2;
    }
    
    const msgHeight = this.config.layout.messageHeight;
    
    // Add decorative frame if enabled
    if (this.config.decorations.borders) {
      this.drawMessageDecorations(context, msgX, msgY, msgWidth);
    }
    
    // Message background - adjust for different styles
    let messageBgColor;
    if (this.style.id === 'style1') {
      messageBgColor = 'rgba(255, 255, 255, 0.15)';
    } else if (this.style.id === 'style3') {
      messageBgColor = 'rgba(255, 255, 255, 0.8)'; // Semi-transparent white for Style 3
    } else {
      messageBgColor = '#f8f9fa';
    }
    ctx.fillStyle = messageBgColor;
    ctx.fillRect(msgX, msgY, msgWidth, msgHeight);
    
    // Message border with style-specific colors
    if (this.style.id === 'style3') {
      // Style 3: Grey border
      ctx.strokeStyle = '#9CA3AF';
      ctx.lineWidth = 2;
      ctx.strokeRect(msgX, msgY, msgWidth, msgHeight);
    } else if (this.style.id !== 'style1') {
      // Other styles: Use accent color
      ctx.strokeStyle = this.config.colors.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(msgX, msgY, msgWidth, msgHeight);
    }

    // Message text - adjust color for readability
    if (this.style.id === 'style3') {
      ctx.fillStyle = '#1a1a1a'; // Dark text for Style 3 white background
    } else {
      ctx.fillStyle = this.config.colors.text;
    }
    ctx.font = `22px ${this.config.fonts.body}`;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.5px';

    // Word wrap
    const words = message.split(' ');
    const lines = [];
    let currentLine = '';
    const maxWidth = msgWidth - 40;

    for (const word of words) {
      const testLine = currentLine + word + '  ';
      if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + '  ';
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine.trim());

    const lineHeight = 23; // Increased by 1px for better spacing
    const startY = msgY + 30;
    for (let i = 0; i < Math.min(lines.length, 4); i++) {
      ctx.fillText(lines[i], textCenterX, startY + i * lineHeight);
    }
  }

  private drawMessageDecorations(context: CanvasRenderContext, x: number, y: number, width: number): void {
    const { ctx } = context;
    ctx.save();
    
    // Style-specific decorative elements
    if (this.config.decorations.geometric) {
      ctx.strokeStyle = this.config.colors.decorative.replace('0.25', '0.1');
      ctx.lineWidth = 2;
      
      const cornerSize = 15;
      
      // Decorative corners
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 5 + cornerSize);
      ctx.lineTo(x - 5, y - 5);
      ctx.lineTo(x - 5 + cornerSize, y - 5);
      ctx.stroke();
    }
    
    if (this.config.decorations.stars) {
      ctx.fillStyle = this.config.colors.decorative.replace('0.25', '0.06');
      
      // Side decorative elements
      for (let i = 0; i < 3; i++) {
        const decorY = y + 30 + i * 40;
        this.drawStar(ctx, x - 15, decorY, 3, 4, 2);
        this.drawStar(ctx, x + width + 15, decorY, 3, 4, 2);
      }
    }
    
    ctx.restore();
  }

  private drawEmptyAreaRefinements(context: CanvasRenderContext, centerX: number): void {
    const { ctx, width, height } = context;
    ctx.save();
    
    // Add decorative stars with style-specific colors
    ctx.fillStyle = this.config.colors.decorative;
    
    if (this.style.id === 'style2') {
      // Style 2: Random star placement, avoiding header area
      const headerHeight = this.config.layout.headerHeight;
      const numStars = 25; // Number of random stars
      
      // Generate random star positions (avoid header area)
      for (let i = 0; i < numStars; i++) {
        const x = Math.random() * (width - 60) + 30; // 30px margin from edges
        const y = Math.random() * (height - headerHeight - 100) + headerHeight + 50; // Avoid header + 50px buffer
        const size = Math.random() * 4 + 3; // Random size between 3-7
        const innerSize = Math.max(2, size - 2);
        
        this.drawStar(ctx, x, y, 5, size, innerSize);
      }
    } else {
      // Other styles: Organized star pattern
      const starPositions = [
        // Upper area stars
        [80, 120], [width - 80, 120],
        [100, 140], [width - 100, 140],
        [70, 190], [width - 70, 190],
        [120, 170], [width - 120, 170],
        [50, 160], [width - 50, 160],
        
        // Middle area stars
        [50, 280], [width - 50, 280],
        [90, 300], [width - 90, 300],
        [40, 350], [width - 40, 350],
        [110, 380], [width - 110, 380],
        [70, 420], [width - 70, 420],
        [130, 450], [width - 130, 450],
        
        // Message area stars
        [60, 580], [width - 60, 580],
        [80, 620], [width - 80, 620],
        [50, 650], [width - 50, 650],
        [100, 680], [width - 100, 680]
      ];
      
      // Draw different sized stars for variety
      starPositions.forEach(([x, y], index) => {
        const size = index % 3 === 0 ? 7 : index % 2 === 0 ? 5 : 4;
        const innerSize = Math.max(2, size - 2);
        this.drawStar(ctx, x, y, 5, size, innerSize);
      });
    }
    
    // Skip other decorative elements for Style 2 (clean look)
    if (this.style.id !== 'style2') {
      // Add some sparkle effects
      ctx.fillStyle = this.config.colors.accent;
      const sparklePositions = [
        [centerX - 150, 220], [centerX + 150, 220],
        [centerX - 120, 480], [centerX + 120, 480],
        [centerX - 180, 350], [centerX + 180, 350]
      ];
      
      sparklePositions.forEach(([x, y]) => {
        this.drawSparkle(ctx, x, y, 3);
      });
      
      // Elegant divider line with decorative ends
      ctx.strokeStyle = '#e9ecef';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 100, 560);
      ctx.lineTo(centerX + 100, 560);
      ctx.stroke();
      
      // Decorative ends on divider
      ctx.fillStyle = this.config.colors.primary;
      ctx.beginPath();
      ctx.arc(centerX - 100, 560, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(centerX + 100, 560, 4, 0, 2 * Math.PI);
      ctx.fill();
      
      // Center accent on divider
      ctx.fillStyle = this.config.colors.accent;
      ctx.beginPath();
      ctx.arc(centerX, 560, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
    
    ctx.restore();
  }

  public drawFooter(context: CanvasRenderContext): void {
    const { ctx, width, height } = context;
    
    const footerY = height - 50;
    const footerHeight = 50;
    
    // Set footer background color based on style
    let footerBgColor;
    if (this.style.id === 'style1') {
      footerBgColor = '#01411C'; // Traditional green for Style 1
    } else if (this.style.id === 'style3') {
      footerBgColor = '#228B22'; // Same green as in Background.png
    } else {
      footerBgColor = this.config.colors.primary; // Style 2 uses config color
    }
    
    ctx.fillStyle = footerBgColor;
    ctx.fillRect(0, footerY, width, footerHeight);
    
    ctx.fillStyle = this.config.colors.secondary;
    ctx.font = `14px ${this.config.fonts.body}`;
    ctx.textAlign = 'center';
    ctx.fillText('SOFTSOLS PAKISTAN - Digital AI Transformation  |  www.softsols.pk', width / 2, footerY + 30);
  }

  private drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, spikes: number, outerRadius: number, innerRadius: number): void {
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
  }
  
  private drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.save();
    ctx.translate(x, y);
    
    // Draw a simple sparkle (plus sign with diagonal lines)
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();
    
    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
    
    // Diagonal lines for extra sparkle
    const diagSize = size * 0.7;
    ctx.beginPath();
    ctx.moveTo(-diagSize, -diagSize);
    ctx.lineTo(diagSize, diagSize);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(diagSize, -diagSize);
    ctx.lineTo(-diagSize, diagSize);
    ctx.stroke();
    
    ctx.restore();
  }
}

// Factory function to create style renderer
export function createStyleRenderer(styleId: string): StyleRenderer {
  return new StyleRenderer(styleId);
}

// Utility function to render poster with selected style
export function renderPosterWithStyle(
  canvas: HTMLCanvasElement, 
  styleId: string, 
  data: PosterRenderData
): void {
  console.log('renderPosterWithStyle called with:', styleId);
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('No canvas context available');
    return;
  }

  try {
    const renderer = createStyleRenderer(styleId);
    const context: CanvasRenderContext = {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height
    };

    console.log('About to render with style:', styleId, 'Canvas size:', canvas.width, 'x', canvas.height);
    renderer.render(context, data);
    console.log('Render completed for style:', styleId);
  } catch (error) {
    console.error('Error in renderPosterWithStyle:', error);
    throw error;
  }
}

// Utility function to render Style 2 with custom background image
export function renderStyle2WithBackground(
  canvas: HTMLCanvasElement, 
  data: PosterRenderData,
  backgroundImageUrl: string
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const renderer = createStyleRenderer('style2');
  
  // Load and draw custom background first
  const bgImg = new Image();
  bgImg.crossOrigin = 'anonymous';
  bgImg.onload = function() {
    // Draw custom background
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    
    // Add semi-transparent overlay for text readability
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Now render the poster content on top
    const context: CanvasRenderContext = {
      canvas,
      ctx,
      width: canvas.width,
      height: canvas.height
    };
    
    // Skip the background drawing and just render content
    renderer.drawHeader(context);
    renderer.drawProfile(context, data);
    renderer.drawContent(context, data);
    renderer.drawFooter(context);
  };
  
  bgImg.onerror = function() {
    // Fallback to regular Style 2 rendering if background fails
    renderPosterWithStyle(canvas, 'style2', data);
  };
  
  bgImg.src = backgroundImageUrl;
}