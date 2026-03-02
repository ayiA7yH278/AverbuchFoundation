// Helper function to determine if background is light or dark
const getLuminance = (hex: string): number => {
  // Remove # if present
  const rgb = hex.replace('#', '');
  const r = parseInt(rgb.substring(0, 2), 16);
  const g = parseInt(rgb.substring(2, 4), 16);
  const b = parseInt(rgb.substring(4, 6), 16);
  // Calculate relative luminance
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};

const getTextColor = (backgroundColor?: string): string => {
  if (!backgroundColor) return '#9CA3AF';

  const luminance = getBackgroundLuminance(backgroundColor);
  if (luminance === null) return '#FFFFFF';
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const getBackgroundLuminance = (backgroundColor?: string): number | null => {
  if (!backgroundColor) return null;

  // Handle hex colors
  if (backgroundColor.startsWith('#')) {
    return getLuminance(backgroundColor);
  }

  // Handle rgb/rgba colors - extract RGB values
  const rgbMatch = backgroundColor.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    const r = parseInt(rgbMatch[0]);
    const g = parseInt(rgbMatch[1]);
    const b = parseInt(rgbMatch[2]);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  // Unknown format
  return null;
};

type BrandSiteFooterProps = {
  name: string;
  backgroundColor?: string;
  textColor?: string;
};

export const BrandSiteFooter = ({ name, backgroundColor, textColor }: BrandSiteFooterProps) => {
  // Determine text color based on background if not explicitly provided
  const finalTextColor = textColor || getTextColor(backgroundColor);
  const luminance = getBackgroundLuminance(backgroundColor);
  const isLightBackground = luminance !== null ? luminance > 0.5 : false;
  // For light backgrounds use the dark AF logo (`black-af-logo.png` in /public)
  // For dark backgrounds use the existing favicon (white mark)
  const logoSrc = isLightBackground ? '/black-af-logo.png' : '/favicon.png';
  
  return (
    <footer 
      className="py-8 px-6 text-xs"
      style={{ 
        backgroundColor: backgroundColor || 'transparent',
        color: finalTextColor
      }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
        <p className="font-sans-body text-[11px] tracking-[0.25em] uppercase opacity-70">
          © 2026 {name}. All rights reserved.
        </p>
        <div className="flex items-center gap-3 justify-center flex-wrap">
          <a 
            href="https://averbuch-foundation.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-sans-body text-[11px] tracking-[0.3em] uppercase hover:opacity-80 transition-opacity cursor-pointer inline-flex items-center"
            style={{ color: finalTextColor }}
          >
            An Averbuch Foundation™ Enterprise
          </a>
          <img
            src={logoSrc}
            alt="Averbuch Foundation"
            className="h-5 w-5 opacity-90 flex-shrink-0 object-contain"
            style={{ display: 'block' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // If the dark logo fails on light backgrounds, fall back to favicon
              if (!target.src.includes('/favicon.png')) {
                target.src = '/favicon.png';
              } else {
                // As a last resort, hide the image to avoid broken icon
                target.style.display = 'none';
              }
              console.warn('Footer logo failed to load, falling back or hiding.');
            }}
          />
        </div>
      </div>
    </footer>
  );
};

