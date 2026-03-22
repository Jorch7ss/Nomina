"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  Wallet, 
  Calendar, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  Send,
  FileText,
  Building2,
  Filter,
  Coins,
  LineChart,
  Settings,
  Clock,
  Globe,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  X,
  Sparkles,
  LogOut,
  Shield,
  UserCircle,
  Terminal,
  Upload,
  BarChart3,
  UserMinus,
  Zap,
  ArrowRight,
  Loader2
} from "lucide-react"
import { toast } from "sonner"

import { useUIFeedback } from "@/hooks/useUIFeedback"
import type { DashboardProps, Transaction, Employee, ContractEvent } from "@/types/dashboard"
import { FeedSidebar } from "@/components/dashboard/FeedSidebar"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { LanguageToggle } from "@/components/language-toggle"

export function Dashboard({ role, onLogout }: DashboardProps) {
  const { notifyWIP } = useUIFeedback()
  const { lang } = useLanguage()
  const t = translations[lang]
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(null)
  const [showReceipt, setShowReceipt] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFeed, setShowFeed] = useState(false)
  const [dissolvingEmployee, setDissolvingEmployee] = useState<string | null>(null)
  const [escrowReady, setEscrowReady] = useState(true)
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [contractEvents, setContractEvents] = useState<ContractEvent[]>([])
  const [isDispersing, setIsDispersing] = useState(false)

  const handleDisperseFunds = async () => {
    if (!escrowReady || isDispersing) return
    setIsDispersing(true)
    const toastId = toast.loading("Iniciando dispersión LFPDP...", { description: "Enviando lote al dispersor Alebrije (Stellar testnet)..." })
    
    // API del dispersor: https://github.com/Edgadafi/dispersor-nomina-alebrije — `npm run api` (puerto 3001)
    const apiUrl =
      process.env.NEXT_PUBLIC_DISPERSOR_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3001"
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120000)
    
    try {
      // Generar CSV dinámico para la API
      const header = "phone,employee_id,amount,date_of_birth,stellar_address\n"
      const rows = employeeList.filter(e => e.status === "active").map((emp, index) => {
        return `+52551234560${index},${emp.id},1.00,1990-01-01,GCF4XVNREGZD3BJE2MURDVKISSATDWP2CX6FFCWZIQFC6NKJMP26TWXH`
      }).join("\n")
      const csvStr = header + rows

      const res = await fetch(`${apiUrl}/api/dispersar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: csvStr }),
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.error || "Error interno en el servidor de dispersión")

      const txRef = (data.hash || data.txHash || "") as string
      const explorer = data.txExplorerUrl as string | undefined
      let description = `Empleados: ${data.count ?? "—"} · Total: ${data.total} ${data.asset ?? ""}`
      if (txRef.length >= 16) {
        description = `Tx: ${txRef.slice(0, 8)}...${txRef.slice(-8)}\n${description}`
      }
      if (explorer) description += `\n${explorer}`

      toast.success("Nómina dispersada correctamente", {
        id: toastId,
        description,
        duration: 10000,
      })
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      let errorMsg = "Ocurrió un error inesperado al procesar la dispersión."
      
      if (error.name === "AbortError") {
        errorMsg = "Tiempo agotado. El backend tardó demasiado en responder."
      } else if (error.message === "Failed to fetch" || error.message.includes("Load failed")) {
        errorMsg =
          "No se pudo contactar al dispersor.\n\n→ En la carpeta dispersor-nomina-alebrije ejecuta: npm install && npm run api\n→ El frontend debe poder llegar a la URL configurada en NEXT_PUBLIC_DISPERSOR_API_URL (por defecto http://localhost:3001)."
      } else if (error.message) {
        errorMsg = error.message
      }

      toast.error("Error al dispersar fondos", {
        id: toastId,
        description: errorMsg,
        duration: 7000
      })
    } finally {
      setIsDispersing(false)
    }
  }

  const isAdmin = role === "admin"

  // Sample data
  const transactions: Transaction[] = [
    { id: "TX001", type: "Dispersion Masiva", amount: "$1,250,000.00 MXN", date: "2024-01-15", status: "completed", recipient: "Nomina Enero" },
    { id: "TX002", type: "Transferencia Internacional", amount: "$45,000.00 USD", date: "2024-01-14", status: "completed", recipient: "Oficina Miami" },
    { id: "TX003", type: "Dispersion Individual", amount: "$28,500.00 MXN", date: "2024-01-13", status: "pending", recipient: "Bono Ejecutivo" },
    { id: "TX004", type: "Recibo de Nomina", amount: "$45,000.00 MXN", date: "2024-01-15", status: "completed" },
    { id: "TX005", type: "Aguinaldo", amount: "$90,000.00 MXN", date: "2023-12-20", status: "completed" },
  ]

  const initialEmployees: Employee[] = [
    { id: "E001", name: "Maria Garcia", department: "Ingenieria", country: "Mexico", status: "active" },
    { id: "E002", name: "Carlos Rodriguez", department: "Finanzas", country: "Mexico", status: "active" },
    { id: "E003", name: "Ana Martinez", department: "Recursos Humanos", country: "Colombia", status: "active" },
    { id: "E004", name: "John Smith", department: "Ventas", country: "USA", status: "active" },
    { id: "E005", name: "Laura Sanchez", department: "Marketing", country: "Espana", status: "inactive" },
  ]

  const initialEvents: ContractEvent[] = [
    { id: "EV001", timestamp: "14:32:01", type: "escrow", message: "[Escrow] Fondos validados para Nomina Q1... OK", status: "ok" },
    { id: "EV002", timestamp: "14:31:45", type: "validation", message: "[Validation] Hash de empleados verificado", status: "ok" },
    { id: "EV003", timestamp: "14:30:22", type: "token", message: "[Token] MXN-T acreditado: $4,250,000", status: "ok" },
    { id: "EV004", timestamp: "14:28:10", type: "dispersion", message: "[Dispersion] Programada: 15 Ene 2024 00:01", status: "ok" },
  ]

  // Simulate connection and data loading
  useEffect(() => {
    setEmployeeList(initialEmployees)
    setContractEvents(initialEvents)
    
    // Simulate wallet connection
    const connectionTimer = setTimeout(() => {
      setIsConnected(true)
    }, 1500)

    // Simulate data loading after connection
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearTimeout(connectionTimer)
      clearTimeout(loadingTimer)
    }
  }, [])

  // Add new contract events periodically
  useEffect(() => {
    if (!isConnected) return
    
    const interval = setInterval(() => {
      const newEvent: ContractEvent = {
        id: `EV${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('es-MX', { hour12: false }),
        type: ["escrow", "validation", "token", "dispersion"][Math.floor(Math.random() * 4)] as ContractEvent["type"],
        message: [
          "[Escrow] Heartbeat... OK",
          "[Validation] Bloque #" + Math.floor(Math.random() * 100000) + " confirmado",
          "[Token] Rendimiento Estela: +$" + (Math.random() * 100).toFixed(2),
          "[Dispersion] Cola de espera: 0 pendientes"
        ][Math.floor(Math.random() * 4)],
        status: "ok"
      }
      setContractEvents(prev => [newEvent, ...prev.slice(0, 9)])
    }, 5000)

    return () => clearInterval(interval)
  }, [isConnected])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      
      switch(e.key.toLowerCase()) {
        case 'k':
          setSelectedQuadrant(selectedQuadrant === 1 ? null : 1)
          break
        case 'd':
          if (isAdmin) setSelectedQuadrant(selectedQuadrant === 2 ? null : 2)
          break
        case 's':
          setSelectedQuadrant(selectedQuadrant === 3 ? null : 3)
          break
        case 'f':
          setShowFeed(prev => !prev)
          break
        case 'escape':
          setSelectedQuadrant(null)
          setShowFeed(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedQuadrant, isAdmin])

  const handleRemoveEmployee = useCallback((empId: string) => {
    setDissolvingEmployee(empId)
    
    // Add contract event for removal
    const removalEvent: ContractEvent = {
      id: `EV${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('es-MX', { hour12: false }),
      type: "validation",
      message: `[Contract] Desvinculacion iniciada: ${empId}...`,
      status: "warning"
    }
    setContractEvents(prev => [removalEvent, ...prev])

    setTimeout(() => {
      setEmployeeList(prev => prev.filter(e => e.id !== empId))
      setDissolvingEmployee(null)
      
      // Confirmation event
      const confirmEvent: ContractEvent = {
        id: `EV${Date.now()}`,
        timestamp: new Date().toLocaleTimeString('es-MX', { hour12: false }),
        type: "validation",
        message: `[Contract] Hilo cortado: ${empId}... OK`,
        status: "ok"
      }
      setContractEvents(prev => [confirmEvent, ...prev])
    }, 600)
  }, [])

  const StatusIcon = ({ status }: { status: string }) => {
    if (status === "completed") return <CheckCircle2 className="w-4 h-4 text-green-500" />
    if (status === "pending") return <Clock className="w-4 h-4 text-yellow-500" />
    return <AlertCircle className="w-4 h-4 text-red-500" />
  }

  const SkeletonCard = ({ variant = "cyan" }: { variant?: "cyan" | "fuchsia" | "violet" }) => (
    <div className={`rounded-xl p-6 ${
      variant === "cyan" ? "skeleton-neon" : 
      variant === "fuchsia" ? "skeleton-neon-fuchsia" : "skeleton-neon-violet"
    }`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary/50" />
        <div className="flex-1">
          <div className="h-4 w-32 bg-secondary/50 rounded mb-2" />
          <div className="h-3 w-24 bg-secondary/30 rounded" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-12 bg-secondary/30 rounded-lg" />
        <div className="h-12 bg-secondary/30 rounded-lg" />
        <div className="h-12 bg-secondary/30 rounded-lg" />
      </div>
    </div>
  )

  const KeyboardHint = ({ keys }: { keys: string }) => (
    <span className="kbd-tooltip ml-2">{keys}</span>
  )

  // Payroll comparison data for chart
  const payrollComparison = [
    { label: "Ene", current: 1250000, previous: 1180000 },
    { label: "Feb", current: 1280000, previous: 1200000 },
    { label: "Mar", current: 1320000, previous: 1250000 },
    { label: "Abr", current: 1350000, previous: 1280000 },
  ]

  const maxPayroll = Math.max(...payrollComparison.flatMap(p => [p.current, p.previous]))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t.appName}</h1>
                <p className="text-xs text-muted-foreground">{t.appSubtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <LanguageToggle />

              {/* Feed Toggle */}
              <button
                onClick={() => setShowFeed(prev => !prev)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                  showFeed 
                    ? "bg-primary/20 text-primary" 
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">{t.feedLabel}</span>
                <KeyboardHint keys="F" />
              </button>

              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                isAdmin ? "bg-primary/10 card-admin" : "bg-accent/10 card-employee"
              }`}>
                {isAdmin ? (
                  <Shield className="w-4 h-4 text-primary" />
                ) : (
                  <UserCircle className="w-4 h-4 text-neon-violet" />
                )}
                <span className="text-sm font-medium text-foreground">
                  {isAdmin ? t.rolAdmin : t.rolEmployee}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">{t.salir}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${showFeed ? "mr-80" : ""}`}>
          {/* Connection Status Banner */}
          {!isConnected && (
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="glass-card rounded-xl p-4 flex items-center justify-center gap-3 border border-primary/30">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground">
                  {t.conectando}
                </span>
              </div>
            </div>
          )}

          {/* KPI Header */}
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Saldo en Custodia */}
              <div className={`glass-card rounded-xl p-5 alebrije-pattern ${isAdmin ? "card-admin" : "card-employee"} relative overflow-hidden ${!isLoading && isConnected ? "light-sweep" : ""}`}>
                {isLoading ? (
                  <div className="skeleton-neon rounded-lg h-32" />
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t.saldoCustodia}</p>
                        <p className="text-2xl font-bold text-foreground">$4,250,000</p>
                        <p className="text-xs text-muted-foreground">{t.saldoSub}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-end gap-1 mt-4 h-8">
                      {[40, 65, 45, 80, 60, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/30 rounded-t sparkline-bar"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <TrendingUp className="w-3 h-3" />
                      <span>{t.rendimiento}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Proxima Dispersion */}
              <div className={`glass-card rounded-xl p-5 alebrije-pattern ${isAdmin ? "card-admin" : "card-employee"} relative overflow-hidden ${!isLoading && isConnected ? "light-sweep" : ""}`}>
                {isLoading ? (
                  <div className="skeleton-neon-fuchsia rounded-lg h-32" />
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t.proximaDispersion}</p>
                        <p className="text-2xl font-bold text-foreground">15 Ene 2024</p>
                        <p className="text-xs text-muted-foreground">{t.nominaQuincenal}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                      <span className="text-xs text-muted-foreground">{t.diasRestantes}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                      <Globe className="w-3 h-3" />
                      <span>4 paises, 1,247 empleados</span>
                    </div>
                  </>
                )}
              </div>

              {/* Headcount Total */}
              <div className={`glass-card rounded-xl p-5 alebrije-pattern ${isAdmin ? "card-admin" : "card-employee"} relative overflow-hidden ${!isLoading && isConnected ? "light-sweep" : ""}`}>
                {isLoading ? (
                  <div className="skeleton-neon-violet rounded-lg h-32" />
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t.headcount}</p>
                        <p className="text-2xl font-bold text-foreground">1,247</p>
                        <p className="text-xs text-muted-foreground">{t.empleadosActivos}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-neon-violet/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-neon-violet" />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {[
                        { flag: "MX", count: 890 },
                        { flag: "US", count: 215 },
                        { flag: "CO", count: 98 },
                        { flag: "ES", count: 44 },
                      ].map((c) => (
                        <div key={c.flag} className="text-center">
                          <p className="text-xs font-medium text-foreground">{c.flag}</p>
                          <p className="text-xs text-muted-foreground">{c.count}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-xs text-green-500">
                      <ArrowUpRight className="w-3 h-3" />
                      <span>{t.esteMes}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Dashboard Grid 2x2 */}
          <div className="max-w-7xl mx-auto px-4 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quadrant 1: Transacciones */}
              {isLoading ? (
                <SkeletonCard variant="cyan" />
              ) : (
                <div 
                  onClick={() => setSelectedQuadrant(1)}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden ${
                    isAdmin ? "card-admin" : "card-employee"
                  } ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Send className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center">
                          {isAdmin ? t.transacciones : t.misRecibos}
                          <KeyboardHint keys="K" />
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {isAdmin ? t.gestionDispersiones : t.historialNomina}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                  
                  <div className="space-y-3">
                    {(isAdmin ? transactions.slice(0, 3) : transactions.filter(t => t.type.includes("Recibo") || t.type.includes("Aguinaldo")).slice(0, 3)).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <StatusIcon status={tx.status} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{tx.type}</p>
                            <p className="text-xs text-muted-foreground">{tx.date}</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-foreground">{tx.amount}</p>
                      </div>
                    ))}
                  </div>

                  {isAdmin && (
                    <button 
                      onClick={handleDisperseFunds}
                      disabled={isDispersing || !escrowReady}
                      className={`w-full mt-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                        escrowReady && !isDispersing
                          ? "btn-dispersion-ready text-foreground" 
                          : "btn-dispersion-pending text-muted-foreground opacity-70"
                      }`}
                    >
                      <Send className={`w-4 h-4 ${isDispersing ? "animate-bounce" : ""}`} />
                      {isDispersing ? t.enviandoStellar : (escrowReady ? t.dispersarFondos : t.esperandoEscrow)}
                      {escrowReady && !isDispersing && <Zap className="w-3 h-3" />}
                    </button>
                  )}
                  {!isAdmin && (
                    <button 
                      onClick={() => setShowReceipt(true)}
                      className="w-full mt-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-2 border border-primary/20"
                    >
                      <FileText className="w-4 h-4" />
                      {t.simularRecibo}
                    </button>
                  )}
                </div>
              )}

              {/* Quadrant 2: Capital Humano / Solicitudes */}
              {isLoading ? (
                <SkeletonCard variant="fuchsia" />
              ) : isAdmin ? (
                <div 
                  onClick={() => setSelectedQuadrant(2)}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden card-admin ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center">
                          {t.capitalHumano}
                          <KeyboardHint keys="D" />
                        </h3>
                        <p className="text-xs text-muted-foreground">{t.gestionEmpleados}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <button className="px-3 py-1 rounded-lg bg-green-500/20 text-green-500 text-xs font-medium">
                      {t.activos} ({employeeList.filter(e => e.status === "active").length})
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-secondary text-muted-foreground text-xs font-medium">
                      {t.inactivos} ({employeeList.filter(e => e.status === "inactive").length})
                    </button>
                  </div>

                  <div className="space-y-3">
                    {employeeList.filter(e => e.status === "active").slice(0, 3).map((emp) => (
                      <div key={emp.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center">
                            <span className="text-sm font-medium text-accent">
                              {emp.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{emp.name}</p>
                            <p className="text-xs text-muted-foreground">{emp.department}</p>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground">
                          {emp.country}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => notifyWIP("Filtros Avanzados")} className="w-full mt-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-colors flex items-center justify-center gap-2">
                    <Filter className="w-4 h-4" />
                    {t.filtrarPais}
                  </button>
                </div>
              ) : (
                <div 
                  onClick={() => setSelectedQuadrant(2)}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden card-employee ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center">
                          {t.misSolicitudes}
                        </h3>
                        <p className="text-xs text-muted-foreground">{t.vacacionesPermisos}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-secondary/30 text-center border border-border/50">
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-xs text-muted-foreground mt-1">Días de vacaciones</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/30 text-center border border-border/50">
                      <p className="text-2xl font-bold text-foreground">2</p>
                      <p className="text-xs text-muted-foreground mt-1">En proceso</p>
                    </div>
                  </div>

                  <button onClick={() => notifyWIP("Nueva Solicitud de Ausencia")} className="w-full mt-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors flex items-center justify-center gap-2 border border-accent/20">
                    <Calendar className="w-4 h-4" />
                    {t.solicitarVacaciones}
                  </button>
                </div>
              )}              {/* Quadrant 3: Ahorro y Tokenizacion */}
              {isLoading ? (
                <SkeletonCard variant="cyan" />
              ) : (
                <motion.div 
                  layoutId="quadrant-3"
                  onClick={() => setSelectedQuadrant(3)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer relative overflow-hidden group border border-border/50 hover:border-primary/40 ${
                    isAdmin ? "card-admin" : "card-employee"
                  } ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        whileHover={{ rotate: 15 }}
                        className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                      >
                        <Coins className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center">
                          {isAdmin ? t.tokenizacion : t.crecimiento}
                          <KeyboardHint keys="S" />
                        </h3>
                        <p className="text-xs text-muted-foreground transition-colors group-hover:text-primary/70">
                          {isAdmin ? t.activosReservas : t.fondoAhorro}
                        </p>
                      </div>
                    </div>
                    <motion.div whileHover={{ x: 3 }}>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5 relative z-10">
                    <motion.div whileHover={{ scale: 1.03 }} className="p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-colors">
                      <p className="text-xs text-muted-foreground mb-1">{isAdmin ? t.fondosTokenizados : t.fondosAhorrados}</p>
                      <p className="text-xl font-bold text-foreground">{isAdmin ? "$2.5M" : "$12,450.00"}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-primary font-medium">
                        <TrendingUp className="w-3 h-3" />
                        <span>+3.2% mensual</span>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} className="p-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-primary/30 transition-colors">
                      <p className="text-xs text-muted-foreground mb-1">{t.enReservaFija}</p>
                      <p className="text-xl font-bold text-foreground">{isAdmin ? "$1.75M" : "$5,000.00"}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t.saldosRetiro}</p>
                    </motion.div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 relative z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16" />
                    <div className="flex items-center gap-2 mb-2">
                       <Zap className="w-4 h-4 text-primary animate-pulse" />
                       <p className="text-sm font-medium text-foreground">Rendimientos Inteligentes</p>
                    </div>
                    <p className="text-xs text-muted-foreground relative z-10">
                      Tus fondos en espera generan rendimientos automáticos del 4.8% APY anualizados, habilitados gracias a los smart-contracts descentralizados de la red.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Quadrant 4: Automatizacion */}
              {isLoading ? (
                <SkeletonCard variant="cyan" />
              ) : (
                <div 
                  onClick={() => setSelectedQuadrant(4)}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden ${
                    isAdmin ? "card-admin" : "card-employee"
                  } ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{t.automatizacion}</h3>
                        <p className="text-xs text-muted-foreground">{t.flujosNomina}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "Nomina Quincenal UNAM", nextRun: "15 Ene", status: "active" },
                      { name: "Dispersion Estelar Foundation", nextRun: "01 Feb", status: "active" },
                      { name: "Bonos Trimestrales", nextRun: "01 Abr", status: "active" },
                    ].map((flow, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${flow.status === "active" ? "bg-green-500" : "bg-muted"}`} />
                          <div>
                            <p className="text-sm font-medium text-foreground">{flow.name}</p>
                            <p className="text-xs text-muted-foreground">Proxima: {flow.nextRun}</p>
                          </div>
                        </div>
                        {isAdmin && (
                          <button onClick={() => notifyWIP("Editor de Flujos")} className="text-xs text-primary hover:underline">Editar</button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isAdmin && (
                    <button onClick={() => notifyWIP("Configurador de Nuevos Flujos")} className="w-full mt-4 py-2 rounded-lg bg-green-500/20 text-green-500 text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4" />
                      {t.configurarFlujo}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feed Sidebar */}
        <FeedSidebar 
          showFeed={showFeed} 
          setShowFeed={setShowFeed} 
          contractEvents={contractEvents} 
        />
      </div>

      {/* Detail Modal - Quadrant 1 (Nomina) */}
      {selectedQuadrant === 1 && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQuadrant(null)}
        >
          <div 
            className="glass-card rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {isAdmin ? "Transacciones y Movimientos" : "Mis Recibos de Nomina"}
              </h2>
              <button 
                onClick={() => setSelectedQuadrant(null)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {isAdmin && (
              <>
                {/* Payroll Comparison Chart */}
                <div className="mb-6 p-4 rounded-xl bg-secondary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-foreground">Comparacion de Nomina</h3>
                  </div>
                  <div className="flex items-end gap-4 h-40">
                    {payrollComparison.map((month, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full flex items-end gap-1 h-32">
                          <div 
                            className="flex-1 bar-previous rounded-t transition-all hover:opacity-80"
                            style={{ height: `${(month.previous / maxPayroll) * 100}%` }}
                            title={`Anterior: $${month.previous.toLocaleString()}`}
                          />
                          <div 
                            className="flex-1 bar-current rounded-t transition-all hover:opacity-80"
                            style={{ height: `${(month.current / maxPayroll) * 100}%` }}
                            title={`Actual: $${month.current.toLocaleString()}`}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground mt-2">{month.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bar-previous rounded" />
                      <span className="text-xs text-muted-foreground">Anterior</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bar-current rounded" />
                      <span className="text-xs text-muted-foreground">Actual</span>
                    </div>
                  </div>
                </div>

                {/* Dispersion Button — llama al API LFPDP del repo dispersor-nomina-alebrije */}
                <button
                  type="button"
                  disabled={!escrowReady || isDispersing}
                  onClick={() => handleDisperseFunds()}
                  className={`w-full mb-6 py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all text-lg ${
                    escrowReady && !isDispersing
                      ? "btn-dispersion-ready text-foreground hover:scale-[1.02]"
                      : "btn-dispersion-pending text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {isDispersing ? (
                    <Loader2 className="w-5 h-5 shrink-0 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 shrink-0" />
                  )}
                  {isDispersing
                    ? "Procesando dispersión..."
                    : escrowReady
                      ? "Ejecutar Dispersion Masiva"
                      : "Esperando fondos en Escrow..."}
                  {escrowReady && !isDispersing && <Zap className="w-4 h-4 shrink-0" />}
                </button>

                {/* Drag & Drop Zone */}
                <div className="drop-zone rounded-xl p-8 mb-6 text-center">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">Arrastra tu archivo Excel aqui</p>
                  <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
                </div>

                <div className="flex gap-2 mb-4">
                  <button onClick={() => notifyWIP("Asistente de Nueva Dispersión")} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Nueva Dispersion
                  </button>
                  <button onClick={() => notifyWIP("Visor Avanzado de Auditoría")} className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Logs de Auditoria
                  </button>
                </div>
              </>
            )}

            <div className="space-y-3">
              {(isAdmin ? transactions : transactions.filter(t => t.type.includes("Recibo") || t.type.includes("Aguinaldo"))).map((tx) => (
                <div key={tx.id} className="p-4 rounded-xl bg-secondary/30 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <StatusIcon status={tx.status} />
                    <div>
                      <p className="font-medium text-foreground">{tx.type}</p>
                      <p className="text-sm text-muted-foreground">{tx.recipient || "Personal"} - {tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Quadrant 2 (Employees) */}
      {selectedQuadrant === 2 && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQuadrant(null)}
        >
          <div 
            className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Capital Humano</h2>
              <button 
                onClick={() => setSelectedQuadrant(null)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Buscar empleado..."
                className="flex-1 px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground"
              />
              <select className="px-4 py-2 rounded-lg bg-input border border-border text-foreground">
                <option>Todos los paises</option>
                <option>Mexico</option>
                <option>USA</option>
                <option>Colombia</option>
                <option>Espana</option>
              </select>
            </div>

            <div className="space-y-3">
              {employeeList.map((emp) => (
                <div 
                  key={emp.id} 
                  className={`p-4 rounded-xl bg-secondary/30 flex items-center justify-between ${
                    dissolvingEmployee === emp.id ? "dissolving" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                      <span className="font-medium text-accent">{emp.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{emp.name}</p>
                      <p className="text-sm text-muted-foreground">{emp.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 rounded bg-secondary text-xs text-muted-foreground">{emp.country}</span>
                    <span className={`px-2 py-1 rounded text-xs ${emp.status === "active" ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"}`}>
                      {emp.status === "active" ? "Activo" : "Inactivo"}
                    </span>
                    {isAdmin && emp.status === "active" && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveEmployee(emp.id)
                        }}
                        className="p-2 rounded-lg hover:bg-destructive/20 text-destructive/70 hover:text-destructive transition-colors"
                        title="Desvincular empleado"
                      >
                        <UserMinus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Quadrant 3 */}
      {selectedQuadrant === 3 && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQuadrant(null)}
        >
          <div 
            className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {isAdmin ? "Sistema de Tokenizacion" : "Mis Ahorros"}
              </h2>
              <button 
                onClick={() => setSelectedQuadrant(null)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-6 rounded-xl bg-secondary/30">
                <p className="text-sm text-muted-foreground mb-2">Total Tokenizado</p>
                <p className="text-3xl font-bold text-foreground">$2,500,000</p>
                <div className="flex items-center gap-1 mt-2 text-green-500">
                  <TrendingUp className="w-4 h-4" />
                  <span>+3.2% este mes</span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-secondary/30">
                <p className="text-sm text-muted-foreground mb-2">Rendimientos Acumulados</p>
                <p className="text-3xl font-bold text-foreground">$120,000</p>
                <p className="text-sm text-muted-foreground mt-2">4.8% APY</p>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">Integracion Producto Estela</h4>
              <p className="text-sm text-muted-foreground">
                Los fondos en reserva para dispersion futura se invierten automaticamente en instrumentos de bajo riesgo, generando rendimientos mientras esperan ser dispersados.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal - Quadrant 4 */}
      {selectedQuadrant === 4 && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedQuadrant(null)}
        >
          <div 
            className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Automatizacion de Flujos</h2>
              <button 
                onClick={() => setSelectedQuadrant(null)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {isAdmin && (
              <button className="w-full p-4 rounded-xl border border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary mb-4">
                <Settings className="w-5 h-5" />
                Crear Nuevo Flujo Automatizado
              </button>
            )}

            <div className="space-y-3">
              {[
                { name: "Nomina Quincenal UNAM", schedule: "1 y 15 de cada mes", employees: 890, status: "active" },
                { name: "Dispersion Estelar Foundation", schedule: "1ro de cada mes", employees: 215, status: "active" },
                { name: "Bonos Trimestrales", schedule: "1 Abr, Jul, Oct, Ene", employees: 1247, status: "active" },
                { name: "Aguinaldos", schedule: "20 de Diciembre", employees: 1247, status: "scheduled" },
              ].map((flow, i) => (
                <div key={i} className="p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${flow.status === "active" ? "bg-green-500" : "bg-yellow-500"}`} />
                      <p className="font-medium text-foreground">{flow.name}</p>
                    </div>
                    {isAdmin && (
                      <button className="text-sm text-primary hover:underline">Configurar</button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {flow.schedule}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {flow.employees} empleados
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Simulacion de Recibo Overlay (User) */}
      {showReceipt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md transition-all" onClick={() => setShowReceipt(false)}>
          <motion.div 
            initial={{ scale: 0.95, y: 20, opacity: 0 }} 
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl relative"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <div className="bg-muted/30 p-8 text-center border-b border-border/50">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Recibo de Nómina</h3>
              <p className="text-sm text-muted-foreground mt-1">Periodo: Mar 01 - Mar 15, 2026</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-muted-foreground text-sm">Empresa</span>
                <span className="font-medium text-sm">Nomillar Inc.</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-muted-foreground text-sm">Empleado</span>
                <span className="font-medium text-sm">Jorge Desarrollador</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-muted-foreground text-sm">Salario Base</span>
                <span className="font-medium text-sm">$4,500.00 USDC</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-3">
                <span className="text-muted-foreground text-sm">Deducciones (Impuestos)</span>
                <span className="font-medium text-sm text-destructive">-$350.00 USDC</span>
              </div>
              <div className="flex justify-between pt-3 items-center">
                <span className="font-bold text-foreground">Total Neto a Recibir</span>
                <span className="text-2xl font-bold text-green-500">$4,150.00 USDC</span>
              </div>
            </div>
            <div className="bg-muted p-4 flex gap-3 h-16">
              <button 
                onClick={() => setShowReceipt(false)} 
                className="flex-1 rounded-lg border border-border bg-background py-2 text-sm font-medium hover:bg-muted/80 transition-colors"
              >
                Cerrar
              </button>
              <button 
                onClick={() => {
                  alert("¡Simulación exitosa! Recibo_Nomina_Mar_2026.pdf está descargado.")
                  setShowReceipt(false)
                }} 
                className="flex-1 rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 transition-all hover:shadow-lg shadow-sm"
              >
                <ArrowRight className="h-4 w-4 rotate-90" />
                Descargar Recibo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
