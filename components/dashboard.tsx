"use client"

import { useState, useEffect, useCallback } from "react"
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
  Zap
} from "lucide-react"

import { useUIFeedback } from "@/hooks/useUIFeedback"
import type { DashboardProps, Transaction, Employee, ContractEvent } from "@/types/dashboard"
import { FeedSidebar } from "@/components/dashboard/FeedSidebar"

export function Dashboard({ role, onLogout }: DashboardProps) {
  const { notifyWIP } = useUIFeedback()
  const [selectedQuadrant, setSelectedQuadrant] = useState<number | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFeed, setShowFeed] = useState(false)
  const [dissolvingEmployee, setDissolvingEmployee] = useState<string | null>(null)
  const [escrowReady, setEscrowReady] = useState(true)
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [contractEvents, setContractEvents] = useState<ContractEvent[]>([])

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
                <h1 className="text-xl font-bold text-foreground">Alebrije Flow</h1>
                <p className="text-xs text-muted-foreground">Sistema de Nomina</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
                <span className="text-sm hidden sm:inline">Feed</span>
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
                  {isAdmin ? "Administrador" : "Empleado"}
                </span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Salir</span>
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
                  Conectando con el contrato inteligente... Esperando Esencia
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
                        <p className="text-sm text-muted-foreground mb-1">Saldo en Custodia</p>
                        <p className="text-2xl font-bold text-foreground">$4,250,000</p>
                        <p className="text-xs text-muted-foreground">MXN Tokenizado</p>
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
                      <span>+2.4% rendimiento</span>
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
                        <p className="text-sm text-muted-foreground mb-1">Proxima Dispersion</p>
                        <p className="text-2xl font-bold text-foreground">15 Ene 2024</p>
                        <p className="text-xs text-muted-foreground">Nomina Quincenal</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary to-accent rounded-full" />
                      </div>
                      <span className="text-xs text-muted-foreground">3 dias</span>
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
                        <p className="text-sm text-muted-foreground mb-1">Headcount Total</p>
                        <p className="text-2xl font-bold text-foreground">1,247</p>
                        <p className="text-xs text-muted-foreground">Empleados activos</p>
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
                      <span>+12 este mes</span>
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
                          {isAdmin ? "Transacciones y Movimientos" : "Mis Recibos"}
                          <KeyboardHint keys="K" />
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {isAdmin ? "Gestion de dispersiones" : "Historial de nomina"}
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
                      onClick={() => escrowReady ? notifyWIP("Dispersar Fondos") : null}
                      className={`w-full mt-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                        escrowReady 
                          ? "btn-dispersion-ready text-foreground" 
                          : "btn-dispersion-pending text-muted-foreground"
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      {escrowReady ? "Dispersar Fondos" : "Esperando Escrow..."}
                      {escrowReady && <Zap className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              )}

              {/* Quadrant 2: Capital Humano */}
              {isLoading ? (
                <SkeletonCard variant="fuchsia" />
              ) : (
                <div 
                  onClick={() => setSelectedQuadrant(2)}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden ${
                    isAdmin ? "card-admin" : "card-employee"
                  } ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center">
                          Capital Humano
                          {isAdmin && <KeyboardHint keys="D" />}
                        </h3>
                        <p className="text-xs text-muted-foreground">Gestion de empleados</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <button className="px-3 py-1 rounded-lg bg-green-500/20 text-green-500 text-xs font-medium">
                      Activos ({employeeList.filter(e => e.status === "active").length})
                    </button>
                    <button className="px-3 py-1 rounded-lg bg-secondary text-muted-foreground text-xs font-medium">
                      Inactivos ({employeeList.filter(e => e.status === "inactive").length})
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

                  {isAdmin && (
                    <button onClick={() => notifyWIP("Filtros Avanzados")} className="w-full mt-4 py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-colors flex items-center justify-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filtrar por Pais/Depto
                    </button>
                  )}
                </div>
              )}

              {/* Quadrant 3: Ahorro y Tokenizacion */}
              {isLoading ? (
                <SkeletonCard variant="violet" />
              ) : (
                <div 
                  onClick={() => setSelectedQuadrant(3)}
                  className={`glass-card rounded-xl p-6 alebrije-pattern cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden ${
                    isAdmin ? "card-admin" : "card-employee"
                  } ${!isLoading && isConnected ? "light-sweep" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-neon-violet/20 flex items-center justify-center">
                        <Coins className="w-5 h-5 text-neon-violet" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center">
                          {isAdmin ? "Sistema de Tokenizacion" : "Mis Ahorros"}
                          <KeyboardHint keys="S" />
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {isAdmin ? "Activos y reservas" : "Tu fondo de ahorro"}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-lg bg-secondary/30">
                      <p className="text-xs text-muted-foreground mb-1">Fondos Tokenizados</p>
                      <p className="text-lg font-bold text-foreground">$2.5M</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-green-500">
                        <TrendingUp className="w-3 h-3" />
                        <span>+3.2%</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/30">
                      <p className="text-xs text-muted-foreground mb-1">En Reserva</p>
                      <p className="text-lg font-bold text-foreground">$1.75M</p>
                      <p className="text-xs text-muted-foreground mt-1">Listo para dispersion</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <LineChart className="w-4 h-4 text-primary" />
                      <p className="text-sm font-medium text-foreground">Rendimientos Estela</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Los fondos en espera generan rendimientos automaticos del 4.8% anual
                    </p>
                  </div>
                </div>
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
                        <h3 className="font-semibold text-foreground">Automatizacion</h3>
                        <p className="text-xs text-muted-foreground">Flujos de nomina</p>
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
                      Configurar Nuevo Flujo
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

                {/* Dispersion Button */}
                <button 
                  onClick={() => escrowReady ? notifyWIP("Lanzar Dispersión Masiva") : null}
                  className={`w-full mb-6 py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all text-lg ${
                    escrowReady 
                      ? "btn-dispersion-ready text-foreground hover:scale-[1.02]" 
                      : "btn-dispersion-pending text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                  {escrowReady ? "Ejecutar Dispersion Masiva" : "Esperando fondos en Escrow..."}
                  {escrowReady && <Zap className="w-4 h-4" />}
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
    </div>
  )
}
