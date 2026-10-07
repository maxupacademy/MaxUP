import React from 'react';

interface MaxUpLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const MaxUpLogo: React.FC<MaxUpLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = false,
}) => {
  const sizeMap = {
    sm: { height: 32 },
    md: { height: 42 },
    lg: { height: 54 },
    xl: { height: 68 },
  };

  const { height } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2 select-none shrink-0 ${className}`}>
      {/* 
        High-fidelity continuous MaxUp Logo vector
        - Generous viewBox (-25 -20 400 135) to eliminate ANY cut-offs on edges
        - Completely transparent background (no white box)
        - Clean continuous outer outline
        - Bold Navy Blue "Max" (#0B48A1)
        - Bold Orange "UP!" (#FF7A00) with upward arrow & exclamation mark
      */}
      <svg
        height={height}
        viewBox="-25 -20 400 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto filter drop-shadow-sm transition-transform hover:scale-[1.02]"
        aria-label="MaxUp Logo"
      >
        <defs>
          <linearGradient id="maxNavyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B48A1" />
            <stop offset="100%" stopColor="#003580" />
          </linearGradient>
          <linearGradient id="upOrangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF7A00" />
            <stop offset="100%" stopColor="#F55D00" />
          </linearGradient>
          <filter id="stickerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#001848" floodOpacity="0.25" />
          </filter>
        </defs>

        <g filter="url(#stickerGlow)">
          {/* Continuous Unified Navy Outer Stroke (Layer 1 - Thick, no severed edges) */}
          <g stroke="#001B48" strokeWidth="20" strokeLinejoin="round" strokeLinecap="round" fill="#001B48">
            {/* M */}
            <path d="M 16 75 L 22 25 L 42 25 L 53 50 L 64 25 L 84 25 L 77 75 L 60 75 L 63 47 L 53 68 L 44 68 L 35 47 L 30 75 Z" />
            {/* a */}
            <path d="M 85 52 C 85 36 97 30 111 30 C 125 30 132 37 132 48 L 129 75 L 112 75 L 113 67 C 109 72 102 76 94 76 C 82 76 76 68 76 56 C 76 45 83 40 95 39 L 113 37 C 113 33 108 32 102 32 C 95 32 91 34 90 39 Z" />
            {/* x */}
            <path d="M 132 32 L 149 32 L 159 50 L 170 32 L 187 32 L 170 53 L 187 75 L 169 75 L 158 57 L 147 75 L 130 75 L 148 52 Z" />
            {/* U with Arrow */}
            <path d="M 203 10 L 220 28 L 211 28 L 209 57 C 209 64 214 68 223 68 C 232 68 237 64 237 57 L 241 32 L 259 32 L 255 59 C 255 75 242 84 223 84 C 204 84 192 75 192 59 L 194 28 L 185 28 Z" />
            {/* P */}
            <path d="M 262 32 L 278 32 L 277 40 C 282 35 289 31 298 31 C 310 31 320 40 320 56 C 320 72 310 81 296 81 C 290 81 284 78 280 73 L 275 92 L 258 92 Z" />
            {/* Exclamation ! */}
            <path d="M 334 22 L 348 22 L 344 65 L 332 65 Z" />
            <circle cx="338" cy="80" r="7" />
          </g>

          {/* Continuous Crisp White Sticker Outline (Layer 2) */}
          <g stroke="#FFFFFF" strokeWidth="11" strokeLinejoin="round" strokeLinecap="round" fill="#FFFFFF">
            {/* M */}
            <path d="M 16 75 L 22 25 L 42 25 L 53 50 L 64 25 L 84 25 L 77 75 L 60 75 L 63 47 L 53 68 L 44 68 L 35 47 L 30 75 Z" />
            {/* a */}
            <path d="M 85 52 C 85 36 97 30 111 30 C 125 30 132 37 132 48 L 129 75 L 112 75 L 113 67 C 109 72 102 76 94 76 C 82 76 76 68 76 56 C 76 45 83 40 95 39 L 113 37 C 113 33 108 32 102 32 C 95 32 91 34 90 39 Z" />
            {/* x */}
            <path d="M 132 32 L 149 32 L 159 50 L 170 32 L 187 32 L 170 53 L 187 75 L 169 75 L 158 57 L 147 75 L 130 75 L 148 52 Z" />
            {/* U with Arrow */}
            <path d="M 203 10 L 220 28 L 211 28 L 209 57 C 209 64 214 68 223 68 C 232 68 237 64 237 57 L 241 32 L 259 32 L 255 59 C 255 75 242 84 223 84 C 204 84 192 75 192 59 L 194 28 L 185 28 Z" />
            {/* P */}
            <path d="M 262 32 L 278 32 L 277 40 C 282 35 289 31 298 31 C 310 31 320 40 320 56 C 320 72 310 81 296 81 C 290 81 284 78 280 73 L 275 92 L 258 92 Z" />
            {/* Exclamation ! */}
            <path d="M 334 22 L 348 22 L 344 65 L 332 65 Z" />
            <circle cx="338" cy="80" r="7" />
          </g>

          {/* Letter Fills (Layer 3) */}
          {/* Max in Royal Navy Blue */}
          <path
            d="M 16 75 L 22 25 L 42 25 L 53 50 L 64 25 L 84 25 L 77 75 L 60 75 L 63 47 L 53 68 L 44 68 L 35 47 L 30 75 Z"
            fill="url(#maxNavyGradient)"
          />
          <path
            d="M 85 52 C 85 36 97 30 111 30 C 125 30 132 37 132 48 L 129 75 L 112 75 L 113 67 C 109 72 102 76 94 76 C 82 76 76 68 76 56 C 76 45 83 40 95 39 L 113 37 C 113 33 108 32 102 32 C 95 32 91 34 90 39 Z"
            fill="url(#maxNavyGradient)"
          />
          <ellipse cx="103" cy="56" rx="7" ry="8" fill="#FFFFFF" />
          <path
            d="M 132 32 L 149 32 L 159 50 L 170 32 L 187 32 L 170 53 L 187 75 L 169 75 L 158 57 L 147 75 L 130 75 L 148 52 Z"
            fill="url(#maxNavyGradient)"
          />

          {/* UP! in Vibrant Energetic Orange with Upward Arrow */}
          <path
            d="M 203 10 L 220 28 L 211 28 L 209 57 C 209 64 214 68 223 68 C 232 68 237 64 237 57 L 241 32 L 259 32 L 255 59 C 255 75 242 84 223 84 C 204 84 192 75 192 59 L 194 28 L 185 28 Z"
            fill="url(#upOrangeGradient)"
          />
          <path
            d="M 262 32 L 278 32 L 277 40 C 282 35 289 31 298 31 C 310 31 320 40 320 56 C 320 72 310 81 296 81 C 290 81 284 78 280 73 L 275 92 L 258 92 Z"
            fill="url(#upOrangeGradient)"
          />
          <ellipse cx="293" cy="56" rx="7" ry="9" fill="#FFFFFF" />

          {/* Exclamation ! */}
          <path d="M 334 22 L 348 22 L 344 65 L 332 65 Z" fill="url(#upOrangeGradient)" />
          <circle cx="338" cy="80" r="6" fill="url(#upOrangeGradient)" />
        </g>
      </svg>

      {showSubtitle && (
        <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 border-l border-slate-300 pl-2">
          TutorHub
        </span>
      )}
    </div>
  );
};
