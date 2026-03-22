"use client"

interface StellarLogoProps {
  variant?: "full" | "icon"
  className?: string
}

export function StellarLogo({ variant = "full", className = "" }: StellarLogoProps) {
  if (variant === "icon") {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <img 
          src="/logo.png" 
          alt="Nomillar Icon" 
          className="h-10 w-auto object-contain dark:drop-shadow-[0_0_12px_rgba(45,212,191,0.5)] drop-shadow-md transition-all"
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img 
        src="/logo.png" 
        alt="Nomillar by Stellar" 
        className="h-8 w-auto object-contain dark:drop-shadow-[0_0_12px_rgba(45,212,191,0.4)] drop-shadow-sm transition-all"
      />
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Nomillar
        </span>
        <span className="text-[9px] uppercase font-medium tracking-[0.2em] text-muted-foreground">
          by Stellar
        </span>
      </div>
    </div>
  )
}
