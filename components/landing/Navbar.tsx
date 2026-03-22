"use client"

import { ArrowRight } from "lucide-react"
import { StellarLogo } from "@/components/stellar-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useUIFeedback } from "@/hooks/useUIFeedback"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

interface NavbarProps {
  scrolled: boolean
  onGetStarted: (role: "admin" | "basic") => void
}

export function Navbar({ scrolled, onGetStarted }: NavbarProps) {
  const { notifyWIP } = useUIFeedback()
  const { lang } = useLanguage()
  const t = translations[lang]

  const navItems = [
    { label: t.navFeatures, id: "caracteristicas" },
    { label: t.navMetrics, id: "metricas" },
    { label: t.navPricing, id: "precios" },
    { label: t.navAbout,  id: "nosotros" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50" 
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <StellarLogo />
        
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              onClick={(e) => { e.preventDefault(); notifyWIP(`Sección: ${item.label}`) }}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            onClick={() => onGetStarted("basic")}
            className="hidden text-sm text-muted-foreground transition-all hover:text-foreground sm:block"
          >
            {t.navSignIn}
          </button>
          <button
            onClick={() => onGetStarted("admin")}
            className="group flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            {t.navCTA}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </nav>
    </header>
  )
}
