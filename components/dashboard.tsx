"use client"

import { useState, useEffect } from "react"
import { 
  Wallet, 
  Calendar, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  LogOut,
  Shield,
  UserCircle,
  Activity,
  Building2,
  ChevronRight,
  UserMinus
} from "lucide-react"
import { toast } from "sonner"

import { useUIFeedback } from "@/hooks/useUIFeedback"
import type { DashboardProps, Employee } from "@/types/dashboard"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"
import { NomillarLogo } from "@/components/nomillar-logo"

// New modular components
import { SmartCsvImporter } from "@/components/dashboard/SmartCsvImporter"
import { EmployeeView } from "@/components/dashboard/EmployeeView"
import { AuditExplorer } from "@/components/dashboard/AuditExplorer"

export function Dashboard({ role, onLogout }: DashboardProps) {
  const { notifyWIP } = useUIFeedback()
  const { lang } = useLanguage()
  const t = translations[lang]
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isDispersing, setIsDispersing] = useState(false)
  const [employeeList, setEmployeeList] = useState<Employee[]>([])

  const isAdmin = role === "admin"

  const handleDisperseFunds = async () => {
    setIsDispersing(true)
    const toastId = toast.loading("Iniciando dispersión y validación...", { description: "Conectando con la infraestructura..." })
    
    // Simulate real dispersion
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success("Dispersión Completada", {
          id: toastId,
          description: "Los fondos han sido transferidos exitosamente. Consulta el Explorador de Auditoría para más detalles.",
          duration: 5000,
        })
        setIsDispersing(false)
        resolve()
      }, 3000)
    })
  }

  useEffect(() => {
    // Simulate connection and loading
    const timer1 = setTimeout(() => setIsConnected(true), 1000)
    const timer2 = setTimeout(() => setIsLoading(false), 2000)

    setEmployeeList([
      { id: "OP-4921", name: "Operador Logístico #4921", department: "Kavak - Flotilla Centro", country: "Mexico", status: "active" },
      { id: "RP-8812", name: "Repartidor Z-Sur", department: "Rappi - Última Milla", country: "Mexico", status: "active" },
      { id: "ST-092", name: "Staff Tienda #092", department: "Grupo Alsea - Operaciones", country: "Colombia", status: "active" },
    ])

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NomillarLogo variant="icon" />
              <div>
                <h1 className="text-xl font-bold">{t.appName}</h1>
                <p className="text-xs text-muted-foreground">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <button onClick={onLogout} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:bg-secondary transition-colors">
                <LogOut className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">{t.salir}</span>
              </button>
            </div>
          </div>
        </header>
        <EmployeeView />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NomillarLogo variant="icon" />
              <div>
                <h1 className="text-xl font-bold">{t.appName}</h1>
                <p className="text-xs text-muted-foreground">Panel Administrativo</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-end">
              <LanguageToggle />
              <ThemeToggle />

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Admin</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">{t.salir}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Connection Status Banner */}
        {!isConnected && (
          <div className="bg-card rounded-xl p-4 flex items-center justify-center gap-3 border border-primary/30 shadow-lg">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Estableciendo conexión segura...</span>
          </div>
        )}

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm relative overflow-hidden group hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.saldoCustodia}</p>
                <p className="text-3xl font-bold text-foreground">$4,250,000</p>
                <p className="text-xs text-muted-foreground mt-1">MXN Operativos</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-6 text-xs text-green-500 font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Liquidez confirmada</span>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border shadow-sm relative overflow-hidden group hover:border-accent/40 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.proximaDispersion}</p>
                <p className="text-3xl font-bold text-foreground">15 Ene</p>
                <p className="text-xs text-muted-foreground mt-1">{t.nominaQuincenal}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{t.diasRestantes}</span>
            </div>
          </div>
        </div>

        {/* Main Action Area */}
        <div className="space-y-8">
          
          {/* Main Action: CSV Importer */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 max-w-4xl">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Centro de Operaciones
            </h2>
            {isLoading ? (
              <div className="h-64 rounded-xl bg-secondary animate-pulse" />
            ) : (
              <SmartCsvImporter 
                onDisperse={handleDisperseFunds}
                isDispersing={isDispersing}
                escrowReady={true}
              />
            )}
          </div>

          {/* Audit Explorer integrated */}
          <div className="max-w-6xl">
            {isLoading ? (
              <div className="h-64 rounded-2xl bg-card border border-border animate-pulse" />
            ) : (
              <AuditExplorer />
            )}
          </div>
          
        </div>
      </main>
    </div>
  )
}
