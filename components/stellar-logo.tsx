"use client"

interface StellarLogoProps {
  variant?: "full" | "icon"
  className?: string
}

export function StellarLogo({ variant = "full", className = "" }: StellarLogoProps) {
  if (variant === "icon") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Outer ring - blockchain nodes */}
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="url(#stellar-gradient)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          className="animate-spin"
          style={{ animationDuration: "30s" }}
        />
        
        {/* Inner stellar burst */}
        <g className="origin-center">
          {/* Central hexagon - blockchain symbol */}
          <path
            d="M24 8L35.5 16V32L24 40L12.5 32V16L24 8Z"
            fill="url(#stellar-fill)"
            fillOpacity="0.15"
            stroke="url(#stellar-gradient)"
            strokeWidth="1.5"
          />
          
          {/* Star points */}
          <path
            d="M24 4L26 12L24 8L22 12L24 4Z"
            fill="url(#stellar-gradient)"
          />
          <path
            d="M24 44L26 36L24 40L22 36L24 44Z"
            fill="url(#stellar-gradient)"
          />
          <path
            d="M4 24L12 22L8 24L12 26L4 24Z"
            fill="url(#stellar-gradient)"
          />
          <path
            d="M44 24L36 22L40 24L36 26L44 24Z"
            fill="url(#stellar-gradient)"
          />
          
          {/* Connection nodes */}
          <circle cx="24" cy="8" r="2" fill="url(#stellar-gradient)" />
          <circle cx="24" cy="40" r="2" fill="url(#stellar-gradient)" />
          <circle cx="8" cy="24" r="2" fill="url(#stellar-gradient)" />
          <circle cx="40" cy="24" r="2" fill="url(#stellar-gradient)" />
          <circle cx="35.5" cy="16" r="1.5" fill="url(#stellar-accent)" />
          <circle cx="35.5" cy="32" r="1.5" fill="url(#stellar-accent)" />
          <circle cx="12.5" cy="16" r="1.5" fill="url(#stellar-accent)" />
          <circle cx="12.5" cy="32" r="1.5" fill="url(#stellar-accent)" />
          
          {/* Center core */}
          <circle cx="24" cy="24" r="6" fill="url(#stellar-core)" />
          <circle cx="24" cy="24" r="3" fill="url(#stellar-gradient)" />
        </g>
        
        <defs>
          <linearGradient id="stellar-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
          <linearGradient id="stellar-accent" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
          <linearGradient id="stellar-fill" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
          <radialGradient id="stellar-core" cx="24" cy="24" r="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10"
      >
        <circle
          cx="24"
          cy="24"
          r="22"
          stroke="url(#stellar-gradient-full)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          className="animate-spin"
          style={{ animationDuration: "30s" }}
        />
        <path
          d="M24 8L35.5 16V32L24 40L12.5 32V16L24 8Z"
          fill="url(#stellar-fill-full)"
          fillOpacity="0.15"
          stroke="url(#stellar-gradient-full)"
          strokeWidth="1.5"
        />
        <circle cx="24" cy="8" r="2" fill="url(#stellar-gradient-full)" />
        <circle cx="24" cy="40" r="2" fill="url(#stellar-gradient-full)" />
        <circle cx="8" cy="24" r="2" fill="url(#stellar-gradient-full)" />
        <circle cx="40" cy="24" r="2" fill="url(#stellar-gradient-full)" />
        <circle cx="35.5" cy="16" r="1.5" fill="url(#stellar-accent-full)" />
        <circle cx="35.5" cy="32" r="1.5" fill="url(#stellar-accent-full)" />
        <circle cx="12.5" cy="16" r="1.5" fill="url(#stellar-accent-full)" />
        <circle cx="12.5" cy="32" r="1.5" fill="url(#stellar-accent-full)" />
        <circle cx="24" cy="24" r="6" fill="url(#stellar-core-full)" />
        <circle cx="24" cy="24" r="3" fill="url(#stellar-gradient-full)" />
        
        <defs>
          <linearGradient id="stellar-gradient-full" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
          <linearGradient id="stellar-accent-full" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </linearGradient>
          <linearGradient id="stellar-fill-full" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
          <radialGradient id="stellar-core-full" cx="24" cy="24" r="6" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.1" />
          </radialGradient>
        </defs>
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-semibold tracking-tight text-foreground">
          Stellar<span className="text-primary">BAF</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Powered by CriptoUNAM
        </span>
      </div>
    </div>
  )
}
