import React, { useState } from 'react';
import { Sparkles, Heart, BookOpen, Coffee, Lightbulb, Award, X, Info, Upload, Image as ImageIcon } from 'lucide-react';

export type MascotPose =
  | 'normal'
  | 'happy'
  | 'cheering'
  | 'thinking'
  | 'idea'
  | 'exam_pass'
  | 'sleepy'
  | 'studying'
  | 'snack'
  | 'panic';

interface ProfessorMeowProps {
  pose?: MascotPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  className?: string;
  showProfileOnClick?: boolean;
}

export const ProfessorMeow: React.FC<ProfessorMeowProps> = ({
  pose: initialPose = 'normal',
  size = 'md',
  bubbleText,
  className = '',
  showProfileOnClick = true,
}) => {
  const [currentPose, setCurrentPose] = useState<MascotPose>(initialPose);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(() => {
    return localStorage.getItem('maxup_custom_mascot_image') || null;
  });

  const handleUploadMascotImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const dataUrl = loadEvt.target?.result as string;
      setCustomImage(dataUrl);
      localStorage.setItem('maxup_custom_mascot_image', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  // Sync with prop if it changes
  React.useEffect(() => {
    setCurrentPose(initialPose);
  }, [initialPose]);

  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  return (
    <>
      <div className={`relative inline-flex items-center gap-3 ${className}`}>
        {/* Speech bubble if provided */}
        {bubbleText && (
          <div className="relative bg-white border border-amber-200/90 text-slate-800 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-2xl shadow-xs max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="leading-snug">{bubbleText}</p>
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
          </div>
        )}

        {/* Mascot Avatar Container */}
        <div
          onClick={() => {
            if (showProfileOnClick) setIsProfileModalOpen(true);
          }}
          title={showProfileOnClick ? 'คลิกเพื่อดูประวัติ / เปลี่ยนภาพ Professor Meow' : undefined}
          className={`relative select-none flex-shrink-0 ${sizeMap[size]} ${
            showProfileOnClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''
          }`}
        >
          {customImage ? (
            <img
              src={customImage}
              alt="Professor Meow"
              className="w-full h-full object-contain filter drop-shadow-md rounded-2xl"
            />
          ) : (
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full filter drop-shadow-md select-none"
          >
            <defs>
              {/* Fur gradient: Golden honey orange */}
              <linearGradient id="meowFurGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFA62B" />
                <stop offset="100%" stopColor="#F48C06" />
              </linearGradient>
              {/* Inner ear soft pink */}
              <linearGradient id="meowEarPink" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFC8DD" />
                <stop offset="100%" stopColor="#FFAFCC" />
              </linearGradient>
              {/* Glasses green */}
              <linearGradient id="meowGlassGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
              {/* Bowtie pastel purple */}
              <linearGradient id="meowBowPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
              {/* Purple Cushion Gradient */}
              <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D8B4FE" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* --- POSE 1: SLEEPY ON PURPLE CUSHION --- */}
            {currentPose === 'sleepy' ? (
              <g>
                {/* Purple round cushion */}
                <ellipse cx="100" cy="155" rx="72" ry="26" fill="url(#cushionGrad)" stroke="#9333EA" strokeWidth="2.5" />
                <ellipse cx="100" cy="152" rx="66" ry="20" fill="#E9D5FF" opacity="0.6" />

                {/* Curled cat body */}
                <ellipse cx="100" cy="130" rx="46" ry="26" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                {/* White coat back */}
                <path d="M70 120 Q100 115 130 120 Q130 142 70 142 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />

                {/* Fluffy tail wrapped around */}
                <path
                  d="M140 135 C160 130 165 110 155 105 C145 100 138 120 125 130"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="2.5"
                />

                {/* Sleeping head tilted */}
                <circle cx="75" cy="115" r="28" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                {/* Ears */}
                <polygon points="55,100 48,80 70,90" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                <polygon points="56,98 52,85 68,91" fill="url(#meowEarPink)" />
                <polygon points="80,95 95,78 98,100" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                <polygon points="83,95 93,84 95,98" fill="url(#meowEarPink)" />

                {/* White muzzle */}
                <ellipse cx="75" cy="122" rx="14" ry="10" fill="#FFFDF7" />
                <ellipse cx="75" cy="118" rx="3" ry="2" fill="#FFAFCC" />

                {/* Closed sleepy eyes / glasses resting */}
                <circle cx="66" cy="114" r="10" fill="none" stroke="url(#meowGlassGreen)" strokeWidth="3" />
                <circle cx="86" cy="114" r="10" fill="none" stroke="url(#meowGlassGreen)" strokeWidth="3" />
                <line x1="76" y1="114" x2="76" y2="114" stroke="url(#meowGlassGreen)" strokeWidth="3" />
                <path d="M62 114 Q66 118 70 114" stroke="#4A2810" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M82 114 Q86 118 90 114" stroke="#4A2810" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Resting cute mouth */}
                <path d="M72 124 Q75 127 78 124" stroke="#D07000" strokeWidth="1.5" fill="none" />

                {/* Zzz floating */}
                <text x="135" y="70" fontSize="18" fontWeight="bold" fill="#7E22CE" fontFamily="sans-serif">
                  Z
                </text>
                <text x="148" y="55" fontSize="14" fontWeight="bold" fill="#A855F7" fontFamily="sans-serif">
                  z
                </text>
                <text x="158" y="42" fontSize="11" fontWeight="bold" fill="#C084FC" fontFamily="sans-serif">
                  z
                </text>
              </g>
            ) : currentPose === 'panic' ? (
              /* --- POSE 2: PANIC / MIND OVERLOAD / SMOKE PUFF --- */
              <g>
                {/* Fluffy Bushy Tail */}
                <path
                  d="M135 150 C175 140 190 100 175 80 C165 70 155 85 150 95 C145 105 140 120 125 140"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="3"
                />

                {/* White Lab Coat Body */}
                <ellipse cx="100" cy="160" rx="42" ry="32" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
                <circle cx="100" cy="154" r="2.5" fill="#7E22CE" />
                <circle cx="100" cy="166" r="2.5" fill="#7E22CE" />

                {/* Purple Bowtie */}
                <g transform="translate(100, 135)">
                  <polygon points="-16,-7 -16,7 0,0" fill="url(#meowBowPurple)" />
                  <polygon points="16,-7 16,7 0,0" fill="url(#meowBowPurple)" />
                  <circle cx="0" cy="0" r="4" fill="#6B21A8" />
                </g>

                {/* Head with Spiky frantic fur */}
                <ellipse cx="100" cy="95" rx="52" ry="44" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="3" />
                
                {/* Spiky fur bursts */}
                <path d="M46 92 L32 82 L46 102 Z" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                <path d="M154 92 L168 82 L154 102 Z" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                
                {/* Ears pushed back */}
                <polygon points="56,76 40,40 70,56" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                <polygon points="57,74 46,48 68,58" fill="url(#meowEarPink)" />
                <polygon points="144,76 160,40 130,56" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                <polygon points="143,74 154,48 132,58" fill="url(#meowEarPink)" />

                {/* Steaming explosion cloud on head */}
                <g transform="translate(100, 32)">
                  <ellipse cx="0" cy="0" rx="20" ry="14" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="-12" cy="-4" r="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="12" cy="-4" r="10" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="0" cy="-10" r="12" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                  {/* Explosion spark lines */}
                  <line x1="-28" y1="-12" x2="-38" y2="-18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  <line x1="28" y1="-12" x2="38" y2="-18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Big Green Round Glasses */}
                <circle cx="78" cy="94" r="18" fill="rgba(255,255,255,0.7)" stroke="url(#meowGlassGreen)" strokeWidth="4" />
                <circle cx="122" cy="94" r="18" fill="rgba(255,255,255,0.7)" stroke="url(#meowGlassGreen)" strokeWidth="4" />
                <line x1="96" y1="94" x2="104" y2="94" stroke="url(#meowGlassGreen)" strokeWidth="4" />

                {/* Dizzy Spiral Eyes */}
                <path
                  d="M74 94 Q78 90 82 94 Q82 98 78 98 Q74 98 74 94 Q74 90 80 90"
                  fill="none"
                  stroke="#4A2810"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M118 94 Q122 90 126 94 Q126 98 122 98 Q118 98 118 94 Q118 90 124 90"
                  fill="none"
                  stroke="#4A2810"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* White muzzle & Yelling open mouth */}
                <ellipse cx="100" cy="108" rx="22" ry="14" fill="#FFFDF7" />
                <path
                  d="M92 106 Q100 124 108 106 Z"
                  fill="#E11D48"
                  stroke="#9F1239"
                  strokeWidth="2"
                />

                {/* Paws grabbing head in panic */}
                <ellipse cx="56" cy="100" rx="10" ry="13" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" transform="rotate(35 56 100)" />
                <ellipse cx="144" cy="100" rx="10" ry="13" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" transform="rotate(-35 144 100)" />

                {/* Flying question marks and papers */}
                <text x="25" y="60" fontSize="18" fontWeight="bold" fill="#7E22CE">?</text>
                <text x="165" y="60" fontSize="18" fontWeight="bold" fill="#7E22CE">?</text>
                {/* Fluttering papers */}
                <rect x="20" y="125" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" transform="rotate(-20 28 135)" />
                <rect x="165" y="125" width="16" height="20" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" transform="rotate(20 173 135)" />
              </g>
            ) : currentPose === 'studying' ? (
              /* --- POSE 3: STUDYING AT DESK WITH OPEN NOTEBOOK & PURPLE BEAKER MUG --- */
              <g>
                {/* Fluffy Tail */}
                <path
                  d="M135 140 C170 130 185 95 170 75 C160 65 150 80 145 90 C140 100 135 115 125 130"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="2.5"
                />

                {/* White Lab Coat Body */}
                <ellipse cx="100" cy="135" rx="38" ry="26" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />
                <circle cx="100" cy="130" r="2" fill="#7E22CE" />

                {/* Purple Bowtie */}
                <g transform="translate(100, 114)">
                  <polygon points="-14,-6 -14,6 0,0" fill="url(#meowBowPurple)" />
                  <polygon points="14,-6 14,6 0,0" fill="url(#meowBowPurple)" />
                  <circle cx="0" cy="0" r="3.5" fill="#6B21A8" />
                </g>

                {/* Fluffy Head */}
                <ellipse cx="100" cy="75" rx="48" ry="40" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                {/* Ears */}
                <polygon points="58,62 45,28 72,46" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                <polygon points="59,60 49,34 69,47" fill="url(#meowEarPink)" />
                <polygon points="142,62 155,28 128,46" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                <polygon points="141,60 151,34 131,47" fill="url(#meowEarPink)" />

                {/* Big Green Round Glasses */}
                <circle cx="80" cy="74" r="16" fill="rgba(255,255,255,0.4)" stroke="url(#meowGlassGreen)" strokeWidth="3.5" />
                <circle cx="120" cy="74" r="16" fill="rgba(255,255,255,0.4)" stroke="url(#meowGlassGreen)" strokeWidth="3.5" />
                <line x1="96" y1="74" x2="104" y2="74" stroke="url(#meowGlassGreen)" strokeWidth="3.5" />

                {/* Focused studying eyes */}
                <circle cx="80" cy="76" r="6" fill="#4A2810" />
                <circle cx="78" cy="74" r="2" fill="#FFFFFF" />
                <circle cx="120" cy="76" r="6" fill="#4A2810" />
                <circle cx="118" cy="74" r="2" fill="#FFFFFF" />

                {/* White muzzle & happy focused smile */}
                <ellipse cx="100" cy="88" rx="20" ry="12" fill="#FFFDF7" />
                <polygon points="97,82 103,82 100,86" fill="#FFAFCC" />
                <path d="M95 87 Q100 91 105 87" stroke="#D07000" strokeWidth="1.5" fill="none" />

                {/* Wooden Desk at bottom */}
                <rect x="15" y="145" width="170" height="48" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="2" />
                <rect x="18" y="147" width="164" height="6" fill="#D97706" opacity="0.6" />

                {/* Open Notebook on Desk */}
                <g transform="translate(60, 142)">
                  <polygon points="0,6 40,0 80,6 80,44 40,40 0,44" fill="#FFFBEB" stroke="#78350F" strokeWidth="1.5" />
                  <line x1="40" y1="0" x2="40" y2="40" stroke="#CBD5E1" strokeWidth="1.5" />
                  {/* Little chemistry lines */}
                  <line x1="8" y1="12" x2="32" y2="12" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,2" />
                  <line x1="8" y1="20" x2="32" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,2" />
                  <line x1="48" y1="12" x2="72" y2="12" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,2" />
                  <line x1="48" y1="20" x2="72" y2="20" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,2" />
                </g>

                {/* Right paw holding Blue Stylus/Pen */}
                <ellipse cx="78" cy="144" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                {/* Pen */}
                <line x1="75" y1="130" x2="88" y2="152" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
                <circle cx="89" cy="153" r="1.5" fill="#1E40AF" />

                {/* Left paw resting on book */}
                <ellipse cx="122" cy="146" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />

                {/* Purple Chemistry Beaker Mug on left */}
                <g transform="translate(24, 148)">
                  <rect x="0" y="4" width="22" height="26" rx="4" fill="#7E22CE" stroke="#581C87" strokeWidth="1.5" />
                  {/* Mug handle */}
                  <path d="M0 10 C-6 10 -6 22 0 22" fill="none" stroke="#581C87" strokeWidth="2" />
                  {/* Flask beaker logo */}
                  <path d="M9 12 L13 12 L15 22 L7 22 Z" fill="#F3E8FF" />
                </g>
              </g>
            ) : currentPose === 'snack' ? (
              /* --- POSE 4: EATING COOKIES & BOBA MILK TEA --- */
              <g>
                {/* Fluffy Tail */}
                <path
                  d="M135 150 C170 140 185 105 170 85 C160 75 150 90 145 100 C140 110 135 125 125 140"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="2.5"
                />

                {/* Body in White Lab Coat */}
                <ellipse cx="100" cy="155" rx="42" ry="32" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2.5" />

                {/* Purple Bowtie */}
                <g transform="translate(100, 130)">
                  <polygon points="-16,-7 -16,7 0,0" fill="url(#meowBowPurple)" />
                  <polygon points="16,-7 16,7 0,0" fill="url(#meowBowPurple)" />
                  <circle cx="0" cy="0" r="4" fill="#6B21A8" />
                </g>

                {/* Fluffy Head */}
                <ellipse cx="100" cy="88" rx="52" ry="44" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="3" />
                {/* Ears */}
                <polygon points="56,74 42,38 72,56" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                <polygon points="57,72 46,46 69,57" fill="url(#meowEarPink)" />
                <polygon points="144,74 158,38 128,56" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2.5" />
                <polygon points="143,72 154,46 131,57" fill="url(#meowEarPink)" />

                {/* Big Green Glasses */}
                <circle cx="78" cy="86" r="18" fill="rgba(255,255,255,0.4)" stroke="url(#meowGlassGreen)" strokeWidth="4" />
                <circle cx="122" cy="86" r="18" fill="rgba(255,255,255,0.4)" stroke="url(#meowGlassGreen)" strokeWidth="4" />
                <line x1="96" y1="86" x2="104" y2="86" stroke="url(#meowGlassGreen)" strokeWidth="4" />

                {/* Extremely Happy Eyes (Happy curved eyes ^_^) */}
                <path d="M70 86 Q78 78 86 86" stroke="#4A2810" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                <path d="M114 86 Q122 78 130 86" stroke="#4A2810" strokeWidth="3.5" fill="none" strokeLinecap="round" />

                {/* Cheeks with rosy blush */}
                <circle cx="62" cy="98" r="8" fill="#FDA4AF" opacity="0.6" />
                <circle cx="138" cy="98" r="8" fill="#FDA4AF" opacity="0.6" />

                {/* Cute chewing mouth with cookie crumb */}
                <ellipse cx="100" cy="100" rx="22" ry="14" fill="#FFFDF7" />
                <path d="M94 100 Q100 108 106 100" stroke="#D07000" strokeWidth="2" fill="#FB7185" />

                {/* Eating Cookie in Hand */}
                <g transform="translate(85, 102)">
                  <circle cx="0" cy="0" r="11" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
                  <circle cx="-4" cy="-3" r="1.5" fill="#78350F" />
                  <circle cx="3" cy="-4" r="1.5" fill="#78350F" />
                  <circle cx="2" cy="4" r="1.5" fill="#78350F" />
                  <circle cx="-3" cy="4" r="1.5" fill="#78350F" />
                  {/* Bite mark */}
                  <circle cx="7" cy="0" r="4" fill="#FFFDF7" />
                </g>

                {/* Paws holding cookie */}
                <ellipse cx="80" cy="112" rx="7" ry="9" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="1.5" />

                {/* Boba Milk Tea Cup on Right */}
                <g transform="translate(142, 130)">
                  <polygon points="0,0 24,0 20,42 4,42" fill="#FED7AA" stroke="#78350F" strokeWidth="1.5" />
                  {/* Tea lid */}
                  <rect x="-2" y="-3" width="28" height="5" rx="2" fill="#78350F" />
                  {/* Straw */}
                  <line x1="12" y1="-14" x2="12" y2="4" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
                  {/* Boba pearls */}
                  <circle cx="8" cy="36" r="2.5" fill="#451A03" />
                  <circle cx="14" cy="36" r="2.5" fill="#451A03" />
                  <circle cx="11" cy="30" r="2.5" fill="#451A03" />
                </g>

                {/* Bag of Chips on Left */}
                <g transform="translate(26, 142)">
                  <polygon points="0,0 22,4 18,34 0,30" fill="#EA580C" stroke="#9A3412" strokeWidth="1.5" />
                  <text x="3" y="18" fontSize="6" fontWeight="bold" fill="#FEF08A">
                    CHIPS
                  </text>
                </g>

                {/* Floating love hearts */}
                <text x="32" y="70" fontSize="16" fill="#F43F5E">❤️</text>
                <text x="156" y="70" fontSize="16" fill="#F43F5E">❤️</text>
              </g>
            ) : (
              /* --- STANDARD POSES (NORMAL, HAPPY, CHEERING, THINKING, IDEA, EXAM_PASS) --- */
              <g>
                {/* Fluffy Bushy Tail */}
                <path
                  d="M135 150 C165 140 185 110 180 85 C178 75 168 80 162 90 C155 102 148 118 130 135"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Body with White Researcher Lab Coat */}
                <ellipse cx="100" cy="155" rx="42" ry="34" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2.5" />
                {/* Lab coat lilac buttons */}
                <circle cx="100" cy="148" r="2.5" fill="#7E22CE" />
                <circle cx="100" cy="162" r="2.5" fill="#7E22CE" />

                {/* Coat Lapels */}
                <path d="M78 135 L95 158 L95 180" stroke="#CBD5E1" strokeWidth="2" fill="none" />
                <path d="M122 135 L105 158 L105 180" stroke="#CBD5E1" strokeWidth="2" fill="none" />

                {/* Left Ear */}
                <path
                  d="M50 75 L38 32 C38 32 62 38 74 52"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path d="M50 65 L44 42 C44 42 58 46 64 54" fill="url(#meowEarPink)" />

                {/* Right Ear */}
                <path
                  d="M150 75 L162 32 C162 32 138 38 126 52"
                  fill="url(#meowFurGrad)"
                  stroke="#D07000"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <path d="M150 65 L156 42 C156 42 142 46 136 54" fill="url(#meowEarPink)" />

                {/* Fluffy Head */}
                <ellipse cx="100" cy="85" rx="54" ry="46" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="3" />

                {/* Cheek tufts */}
                <path d="M48 85 C36 88 32 96 38 102 C44 100 48 96 52 94" fill="url(#meowFurGrad)" />
                <path d="M152 85 C164 88 168 96 162 102 C156 100 152 96 148 94" fill="url(#meowFurGrad)" />

                {/* White muzzle */}
                <ellipse cx="100" cy="98" rx="26" ry="18" fill="#FFFDF7" />

                {/* Pink Nose */}
                <polygon points="96,92 104,92 100,97" fill="#FFAFCC" />

                {/* Mouth depending on pose */}
                {currentPose === 'happy' || currentPose === 'cheering' || currentPose === 'exam_pass' ? (
                  <path
                    d="M93 96 Q100 108 107 96"
                    stroke="#D07000"
                    strokeWidth="2.5"
                    fill="#FF85A1"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M93 96 Q96 100 100 97 Q104 100 107 96"
                    stroke="#D07000"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                )}

                {/* Big Round Green Glasses */}
                <circle cx="78" cy="82" r="18" fill="rgba(255,255,255,0.3)" stroke="url(#meowGlassGreen)" strokeWidth="4" />
                <circle cx="122" cy="82" r="18" fill="rgba(255,255,255,0.3)" stroke="url(#meowGlassGreen)" strokeWidth="4" />
                <path d="M96 82 L104 82" stroke="url(#meowGlassGreen)" strokeWidth="4" strokeLinecap="round" />
                <path d="M60 82 L48 80" stroke="url(#meowGlassGreen)" strokeWidth="3" strokeLinecap="round" />
                <path d="M140 82 L152 80" stroke="url(#meowGlassGreen)" strokeWidth="3" strokeLinecap="round" />

                {/* Eyes */}
                {currentPose === 'exam_pass' ? (
                  <>
                    <text x="70" y="88" fontSize="17" fill="#F48C06">
                      ★
                    </text>
                    <text x="114" y="88" fontSize="17" fill="#F48C06">
                      ★
                    </text>
                  </>
                ) : (
                  <>
                    <circle cx="78" cy="82" r="7" fill="#4A2810" />
                    <circle cx="76" cy="80" r="2.5" fill="#FFFFFF" />
                    <circle cx="122" cy="82" r="7" fill="#4A2810" />
                    <circle cx="120" cy="80" r="2.5" fill="#FFFFFF" />
                  </>
                )}

                {/* Purple Bow Tie */}
                <g transform="translate(100, 126)">
                  <polygon points="-16,-8 -16,8 0,0" fill="url(#meowBowPurple)" />
                  <polygon points="16,-8 16,8 0,0" fill="url(#meowBowPurple)" />
                  <circle cx="0" cy="0" r="4.5" fill="#6B21A8" />
                </g>

                {/* Paws & Pose Accessories */}
                {currentPose === 'cheering' && (
                  <>
                    <ellipse cx="58" cy="120" rx="9" ry="12" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" transform="rotate(-30 58 120)" />
                    <ellipse cx="142" cy="120" rx="9" ry="12" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" transform="rotate(30 142 120)" />
                    <text x="32" y="50" fontSize="16" fill="#FFB703">✨</text>
                    <text x="156" y="50" fontSize="16" fill="#FFB703">✨</text>
                  </>
                )}

                {currentPose === 'thinking' && (
                  <>
                    <ellipse cx="118" cy="115" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                    <ellipse cx="75" cy="142" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                    <text x="146" y="45" fontSize="22" fill="#7E22CE" fontWeight="bold">?</text>
                  </>
                )}

                {currentPose === 'idea' && (
                  <>
                    <ellipse cx="140" cy="110" rx="8" ry="11" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                    <ellipse cx="65" cy="140" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                    {/* Glowing Light bulb */}
                    <g transform="translate(100, 16)">
                      <circle cx="0" cy="0" r="11" fill="#FDE047" stroke="#EAB308" strokeWidth="2" />
                      <rect x="-3" y="11" width="6" height="4" fill="#64748B" rx="1" />
                      <line x1="0" y1="-15" x2="0" y2="-20" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="-14" y1="-8" x2="-18" y2="-12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="14" y1="-8" x2="18" y2="-12" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                    </g>
                  </>
                )}

                {currentPose === 'exam_pass' && (
                  <>
                    {/* Exam paper with A+ */}
                    <rect x="120" y="115" width="28" height="36" rx="3" fill="#FFFFFF" stroke="#0047AB" strokeWidth="2" transform="rotate(10 134 133)" />
                    <text x="125" y="138" fontSize="16" fontWeight="bold" fill="#DC2626" transform="rotate(10 134 133)">
                      A+
                    </text>
                    <ellipse cx="120" cy="138" rx="7" ry="8" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="1.5" />
                    <ellipse cx="72" cy="145" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                  </>
                )}

                {(currentPose === 'normal' || currentPose === 'happy') && (
                  <>
                    <ellipse cx="78" cy="146" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                    <ellipse cx="122" cy="146" rx="8" ry="10" fill="url(#meowFurGrad)" stroke="#D07000" strokeWidth="2" />
                  </>
                )}
              </g>
            )}
          </svg>
          )}
        </div>
      </div>

      {/* --- CHARACTER PROFILE MODAL (From character design sheet) --- */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-amber-900/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/15 via-purple-500/10 to-blue-500/15 px-6 py-4 flex items-center justify-between border-b border-amber-200/60">
              <div className="flex items-center gap-2">
                <span className="text-lg">🐾</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Character Profile: Professor Meow</h3>
                  <p className="text-xs text-purple-700 font-medium">The Curious Fluffy Cat (มาสคอตประจำสถาบัน MaxUp)</p>
                </div>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-white/80 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Profile Card Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-5 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
                <div className="shrink-0 w-28 h-28 bg-white rounded-2xl border border-amber-200 p-2 shadow-2xs flex items-center justify-center">
                  <ProfessorMeow pose={currentPose} size="md" showProfileOnClick={false} />
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 w-full">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">ชื่อ: Professor Meow</span>
                    <span className="text-[11px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                      นักเรียน / นักวิจัยตัวน้อย
                    </span>
                  </div>
                  <p><strong>นิสัย:</strong> ขี้เล่น, ช่างสงสัย, ต๊องๆ, ขี้กิน, ขยัน แต่บางทีก็เอ๋อ</p>
                  <p><strong>ของโปรด:</strong> คุกกี้ 🍪, ชานมไข่มุก 🧋</p>
                  <p><strong>สีที่ชอบ:</strong> ม่วง, ฟ้า, เขียวพาสเทล</p>
                  <p><strong>งานอดิเรก:</strong> อ่านหนังสือ, ทำการทดลองเคมี, นอนพักผ่อน, กินของอร่อย</p>
                  <div className="pt-1 text-[11px] italic text-amber-800 bg-amber-100/70 p-2 rounded-xl">
                    "มาสเตอร์ต่างๆ ที่ชอบ ตั้งคำถามและค้นหาคำตอบกับโลกใบนี้เสมอ เมี๊ยว!"
                  </div>
                </div>
              </div>

              {/* Color Palette & Identity */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900">เอกลักษณ์และ Color Palette ประจำตัว</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">ขนฟูนุ่ม</span>
                      <p className="text-[10px] text-slate-500">ส้มอมทอง</p>
                    </div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-xl border border-green-200 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">แว่นกลมใหญ่</span>
                      <p className="text-[10px] text-slate-500">เขียวพาสเทล</p>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-xl border border-purple-200 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">โบว์ไท</span>
                      <p className="text-[10px] text-slate-500">ม่วงสดใส</p>
                    </div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-white border border-slate-300 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">เสื้อกาวน์</span>
                      <p className="text-[10px] text-slate-500">ขาวนักวิจัย</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom Mascot Image Uploader */}
              <div className="p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-purple-700" />
                    <span className="text-xs font-bold text-slate-800">
                      ใช้รูปภาพจริงของมาสคอต (เช่น e62c4167... หรือ 5.png):
                    </span>
                  </div>
                  {customImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setCustomImage(null);
                        localStorage.removeItem('maxup_custom_mascot_image');
                      }}
                      className="text-[11px] text-red-600 font-semibold hover:underline cursor-pointer"
                    >
                      รีเซ็ตกลับเป็นภาพวาด
                    </button>
                  )}
                </div>
                <label className="flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-purple-100/60 border border-purple-300 rounded-xl text-xs font-semibold text-purple-900 cursor-pointer transition-colors shadow-2xs">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadMascotImage}
                    className="hidden"
                  />
                  <Upload className="w-4 h-4 text-purple-600" />
                  <span>
                    {customImage ? '✓ เปลี่ยนรูปภาพจริงใหม่' : '📷 คลิกเพื่อเลือกไฟล์รูปภาพจริงจากเครื่อง'}
                  </span>
                </label>
                <p className="text-[10px] text-slate-500 text-center">
                  เมื่ออัปโหลดแล้ว ภาพจริงของน้องแมวจะแสดงผลแทนภาพวาดทั่วทั้งเว็บไซต์ทันที
                </p>
              </div>

              {/* Interactive Pose Switcher */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">ทดลองสลับท่าทาง (Interactive Poses)</h4>
                  <span className="text-[10px] text-slate-400">คลิกเพื่อเปลี่ยนท่าของน้องแมว</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'studying', label: 'จดโน้ตอย่างตั้งใจ 📝', icon: BookOpen },
                      { id: 'snack', label: 'ได้รับขนม & ชานม 🍪', icon: Coffee },
                      { id: 'idea', label: 'คิดออกแล้ว! 💡', icon: Lightbulb },
                      { id: 'exam_pass', label: 'สอบผ่านได้ A+ 💯', icon: Award },
                      { id: 'panic', label: 'สมองโหลดไม่ทัน 💥', icon: Sparkles },
                      { id: 'sleepy', label: 'นอนพักบนเบาะ 😴', icon: Heart },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentPose(item.id)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all text-left flex items-center gap-1.5 cursor-pointer ${
                        currentPose === item.id
                          ? 'bg-blue-900 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>สามารถคลิกตัว Professor Meow ในหน้าเว็บเพื่อเปิดดูประวัตินี้ได้ตลอดเวลา</span>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-semibold cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
