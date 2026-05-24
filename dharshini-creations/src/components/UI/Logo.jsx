import React from 'react';

export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`relative drop-shadow-[0_0_8px_rgba(167,139,250,0.5)] ${className}`}
    >
      <defs>
        {/* Luxury Gold Gradients */}
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="30%" stopColor="#FFD54F" />
          <stop offset="70%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>

        <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>

        {/* Royal Purple / Violet Accents */}
        <linearGradient id="violetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-purple-glow)" />
          <stop offset="50%" stopColor="var(--color-purple-primary)" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>

        {/* Soft Glow Filter */}
        <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Embroidery Hoop Outer Ring (Outer Circle) */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#goldGradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* 2. Inner Hoop Ring (Double Ring Look for Luxury feel) */}
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="url(#violetGradient)"
        strokeWidth="1.2"
        strokeDasharray="4 2"
        opacity="0.8"
      />

      {/* 3. Fluid Brush Stroke (representing Fabric Painting) */}
      <path
        d="M24 64 C 30 75, 45 74, 55 68 C 65 62, 78 50, 72 38 C 66 26, 44 32, 38 46 C 32 60, 48 76, 68 70 C 76 68, 80 62, 80 58"
        stroke="url(#violetGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#glowEffect)"
        opacity="0.85"
      />

      {/* 4. Elegant Intertwined Monogram Letter 'D' */}
      <path
        d="M42 34 H49 C 56 34, 63 38, 63 49 C 63 60, 56 64, 49 64 H42 V34 Z"
        stroke="url(#goldGradient)"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="32"
        x2="42"
        y2="66"
        stroke="url(#goldGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* 5. Golden Sewing Needle passing through the monogram & hoop */}
      <g>
        {/* Needle Body */}
        <line
          x1="18"
          y1="82"
          x2="78"
          y2="22"
          stroke="url(#needleGradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Needle Eye */}
        <ellipse
          cx="74"
          cy="26"
          rx="1"
          ry="3"
          transform="rotate(45 74 26)"
          fill="#0C0816"
        />
        {/* Thread flowing from the needle eye */}
        <path
          d="M74 26 Q82 22, 78 14 T66 18 T72 30"
          stroke="url(#goldGradient)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Small Decorative Shiny Sparkles */}
      <path
        d="M32 26 L34 29 L37 26 L34 23 Z"
        fill="url(#goldGradient)"
      />
      <path
        d="M68 74 L70 77 L73 74 L70 71 Z"
        fill="url(#goldGradient)"
      />
    </svg>
  );
}
