"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { StellarLogo } from "@/components/stellar-logo"
import { useUIFeedback } from "@/hooks/useUIFeedback"
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users, 
  BarChart3, 
  Lock,
  ChevronRight,
  Play,
  Check,
  Landmark,
  Coins,
  TrendingUp,
  Wallet,
  FileCheck,
  Building2,
  CreditCard,
  PieChart,
  Database,
  Network,
  CircleDollarSign,
  ShieldCheck
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: (role: "admin" | "basic") => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { notifyWIP } = useUIFeedback()
  const [scrolled, setScrolled] = useState(false)
  const [activeMetric, setActiveMetric] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const metrics = [
    { value: "$2.4B+", label: "Procesado anualmente" },
    { value: "99.99%", label: "Tiempo de actividad" },
    { value: "< 3s", label: "Tiempo de dispersion" },
    { value: "150K+", label: "Empleados gestionados" },
  ]

  // Trust icons for rotating orbital display
  const orbitIcons = [
    { icon: Landmark, label: "Banca", angle: 0 },
    { icon: Coins, label: "Blockchain", angle: 45 },
    { icon: TrendingUp, label: "Finanzas", angle: 90 },
    { icon: Wallet, label: "Custodia", angle: 135 },
    { icon: FileCheck, label: "Cumplimiento", angle: 180 },
    { icon: Building2, label: "Corporativo", angle: 225 },
    { icon: CreditCard, label: "Pagos", angle: 270 },
    { icon: PieChart, label: "Reportes", angle: 315 },
  ]

  const features = [
    {
      icon: Shield,
      title: "Seguridad Institucional",
      description: "Custodia de fondos con contratos inteligentes auditados y cumplimiento regulatorio completo.",
    },
    {
      icon: Zap,
      title: "Dispersion Instantanea",
      description: "Procesamiento de nomina en tiempo real con confirmacion en blockchain.",
    },
    {
      icon: Globe,
      title: "Cobertura Internacional",
      description: "Soporte para 12+ paises con conversion automatica de divisas y cumplimiento local.",
    },
    {
      icon: BarChart3,
      title: "Transparencia Total",
      description: "Trazabilidad completa de cada transaccion con reportes en tiempo real.",
    },
  ]

  const plans = [
    {
      name: "Starter",
      price: "Gratis",
      description: "Para equipos pequenos",
      features: ["Hasta 25 empleados", "1 pais", "Soporte por email", "Reportes basicos"],
      cta: "Comenzar gratis",
      popular: false,
    },
    {
      name: "Business",
      price: "$4.99",
      period: "/empleado/mes",
      description: "Para empresas en crecimiento",
      features: ["Empleados ilimitados", "5 paises", "Soporte prioritario", "API completa", "Integraciones ERP"],
      cta: "Iniciar prueba",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      description: "Para grandes corporativos",
      features: ["Todo en Business", "Paises ilimitados", "SLA garantizado", "Cuenta dedicada", "Auditoria on-demand"],
      cta: "Contactar ventas",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <Navbar scrolled={scrolled} onGetStarted={onGetStarted} />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Animated background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Gradient orbs that follow mouse slightly */}
          <div 
            className="absolute h-[600px] w-[600px] rounded-full bg-primary/5 blur-[100px] dark:bg-primary/8 dark:blur-[120px] transition-transform duration-1000 ease-out"
            style={{ 
              left: `${20 + mousePosition.x * 10}%`, 
              top: `${10 + mousePosition.y * 10}%` 
            }}
          />
          <div 
            className="absolute h-[500px] w-[500px] rounded-full bg-accent/5 blur-[80px] dark:bg-accent/6 dark:blur-[100px] transition-transform duration-1000 ease-out"
            style={{ 
              right: `${15 + (1 - mousePosition.x) * 10}%`, 
              bottom: `${20 + (1 - mousePosition.y) * 10}%` 
            }}
          />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left content */}
            <div className="text-center lg:text-left">
              {/* Slogan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-block"
              >
                <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                  ⚡ Tu nómina, a la velocidad de la luz
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl"
              >
                Infraestructura de pagos para la{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                    nueva economía
                  </span>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty lg:mx-0"
              >
                Flujos financieros sin fricción. Procesamiento de nómina global en segundos, 
                auditable en blockchain y diseñado para la escala institucional.
              </motion.p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <button
                  onClick={() => onGetStarted("admin")}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
                >
                  Comenzar ahora
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="group flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-8 py-4 text-base font-medium transition-all hover:bg-secondary hover:border-primary/30 sm:w-auto">
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Ver demo
                </button>
              </div>

              {/* Quick stats */}
              <div className="mt-12 flex items-center justify-center gap-8 lg:justify-start">
                {[
                  { value: "500+", label: "Empresas" },
                  { value: "12", label: "Paises" },
                  { value: "24/7", label: "Soporte" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Dynamic Growth Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex items-center justify-center lg:h-[600px] w-full"
            >
              <div className="relative w-full max-w-lg perspective-1000">
                {/* Glow behind */}
                <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-br from-primary via-accent to-green-500 opacity-20 blur-3xl" />
                
                <div className="relative rounded-[2.5rem] border border-primary/10 bg-background/40 p-8 shadow-[0_8px_40px_rgba(var(--primary),0.12)] backdrop-blur-3xl transition-colors hover:border-primary/20">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
                  
                  <div className="relative z-10">
                    {/* Floating +Profit badge (Soft, pill-like) */}
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -right-6 -top-6 rounded-[2rem] border border-white/10 bg-card/80 px-6 py-4 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Interés Generado</p>
                          <p className="text-xl font-bold text-foreground">+$12,450.00</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Shield badge (Clean) */}
                    <motion.div
                      animate={{ y: [0, 15, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      className="absolute -left-6 bottom-16 rounded-[2rem] border border-white/10 bg-card/80 px-6 py-4 shadow-2xl backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-[13px] font-bold text-foreground">Fondos Seguros</p>
                          <p className="text-[11px] text-muted-foreground">Custodia Institucional</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Inside Card Header */}
                    <div className="mb-10 text-center sm:text-left mt-4 sm:mt-0">
                      <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-4 border border-primary/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-semibold text-primary uppercase tracking-widest">Balance de Tesorería</span>
                      </div>
                      <h3 className="text-4xl font-semibold tabular-nums text-foreground tracking-tight sm:text-5xl">
                        $2,450,890<span className="text-2xl text-muted-foreground">.50</span>
                      </h3>
                    </div>

                    {/* Minimalist Chart Bars */}
                    <div className="flex h-48 items-end gap-2 sm:gap-3 border-b border-border/50 pb-2">
                      {[35, 45, 30, 60, 55, 75, 65, 85, 100].map((height, i) => (
                        <div key={i} className="group relative flex h-full w-full flex-col justify-end">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            whileInView={{ height: `${height}%`, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 + (i * 0.05), ease: "circOut" }}
                            className={`relative w-full rounded-t-lg transition-all duration-500 hover:opacity-100 ${
                              i === 8 ? 'bg-gradient-to-t from-primary/30 to-primary shadow-[0_0_20px_rgba(var(--primary),0.3)] opacity-100' : 'bg-primary/10 opacity-70 hover:bg-primary/30'
                            }`}
                          >
                            {i === 8 && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1 text-[10px] font-medium text-background shadow-xl"
                              >
                                Récord 🚀
                              </motion.div>
                            )}
                          </motion.div>
                        </div>
                      ))}
                    </div>

                    {/* Trust footer minimalistic */}
                    <div className="mt-8 flex flex-col items-center justify-between sm:flex-row gap-4">
                      <div className="flex -space-x-2">
                        {[Landmark, Building2, Wallet, Coins].map((Icon, i) => (
                          <div key={i} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-card text-muted-foreground shadow-sm transition-transform hover:-translate-y-1 hover:text-primary z-10 hover:z-20">
                            <Icon className="h-4 w-4" />
                          </div>
                        ))}
                      </div>
                      <div className="text-center sm:text-right">
                        <p className="text-[13px] font-medium text-foreground tracking-tight">
                          Confianza Global
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Respaldado por instituciones top
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-muted-foreground">Desplazar</span>
          <div className="h-8 w-5 rounded-full border border-border p-1">
            <div className="h-2 w-full rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metricas" className="relative border-y border-border bg-card/50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={`group text-center transition-all duration-500 ${
                  activeMetric === index ? "opacity-100 scale-105" : "opacity-50 scale-100 hover:opacity-80"
                }`}
              >
                <div className="relative inline-block">
                  <span className="text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
                    {metric.value}
                  </span>
                  {activeMetric === index && (
                    <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-primary animate-ping" />
                  )}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Infraestructura de clase mundial
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Construido para escalar con las demandas de instituciones financieras 
              y corporativos de alto volumen.
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="border-y border-border bg-card/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Panel de control unificado
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Gestiona nomina, capital humano, flujos de pago y reportes desde una 
                unica interfaz disenada para equipos de operaciones y finanzas.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Vista consolidada de todas las entidades",
                  "Aprobaciones multi-firma con roles granulares",
                  "Alertas inteligentes y automatizaciones",
                  "Exportacion a formatos regulatorios (IDSE, SUA, CFDI)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 group">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <button
                  onClick={() => onGetStarted("admin")}
                  className="group flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
                >
                  Explorar el dashboard
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.div>

            {/* Dashboard preview mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              {/* Minimal glow backdrop */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-primary/10 via-accent/5 to-transparent opacity-60 blur-2xl" />
              
              <div className="relative aspect-[4/3] rounded-[2rem] border border-primary/10 bg-background/40 p-3 shadow-[0_8px_40px_rgba(var(--primary),0.08)] backdrop-blur-3xl transition-transform hover:scale-[1.02] hover:border-primary/20">
                <div className="flex h-full flex-col overflow-hidden rounded-xl bg-card/80 border border-white/5 shadow-inner">
                  {/* MacOS style window header */}
                  <div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-4 py-3">
                     <div className="flex gap-1.5">
                       <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                       <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                       <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                     </div>
                     <div className="ml-auto flex items-center gap-2">
                       <div className="h-3 w-32 rounded-full bg-background/60" />
                     </div>
                  </div>
                  {/* Clean Mock Content */}
                  <div className="flex-1 p-5">
                    {/* Header mock */}
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 p-[2px]">
                          <div className="h-full w-full rounded-full bg-background" />
                        </div>
                        <div className="space-y-2">
                          <div className="h-3 w-28 rounded-full bg-foreground/20 animate-pulse" />
                          <div className="h-2 w-16 rounded-full bg-muted-foreground/30" />
                        </div>
                      </div>
                      <div className="h-10 w-28 rounded-full bg-primary/10" />
                    </div>
                    {/* Mock KPIs */}
                    <div className="mb-8 grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl border border-border/40 bg-background/30 p-5 transition-colors hover:bg-background/50">
                          <div className="h-2 w-12 rounded-full bg-muted-foreground/30" />
                          <div className={`mt-4 h-5 w-24 rounded-full ${i === 1 ? 'bg-primary/40' : 'bg-foreground/10'}`} />
                        </div>
                      ))}
                    </div>
                    {/* Mock list */}
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/20 p-4">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-muted/60" />
                            <div className="space-y-2">
                              <div className="h-2.5 w-32 rounded-full bg-foreground/20" />
                              <div className="h-2 w-20 rounded-full bg-muted-foreground/30" />
                            </div>
                          </div>
                          <div className="h-4 w-16 rounded-full bg-primary/20" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating status */}
              <div className="absolute -top-4 -right-4 rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-md animate-float">
                <div className="flex items-center gap-3">
                  <div className="relative h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <span className="text-[11px] font-semibold text-foreground">Sincronizado</span>
                </div>
              </div>
              
              {/* Floating notification */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-card/90 px-4 py-3 shadow-xl backdrop-blur-md animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <CircleDollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Último bloque</p>
                    <p className="text-[12px] font-bold text-foreground">Confirmado</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Precios transparentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sin cargos ocultos. Escala segun tus necesidades.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
                className={`group relative rounded-2xl border p-8 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary bg-card shadow-xl shadow-primary/10 scale-105 z-10"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-xs font-medium text-primary-foreground shadow-lg">
                      Recomendado
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-medium">{plan.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">{plan.period}</span>
                  )}
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onGetStarted(plan.popular ? "admin" : "basic")}
                  className={`w-full rounded-full py-3 text-sm font-medium transition-all ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
                      : "border border-border bg-secondary hover:bg-secondary/80 hover:border-primary/30"
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-border overflow-hidden py-24 lg:py-32">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Comienza a transformar tu operacion de nomina
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Unete a mas de 500 empresas que ya confian en Stellar BAF para 
              gestionar su nomina de manera segura y eficiente.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => onGetStarted("admin")}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
              >
                Solicitar demo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-medium transition-all hover:bg-secondary sm:w-auto">
                Contactar ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="nosotros" className="border-t border-border bg-card/50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="md:col-span-1">
              <StellarLogo />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Infraestructura de nomina de grado institucional con tecnologia blockchain.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">SOC 2 Type II Certificado</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground">Producto</h4>
              <ul className="mt-4 space-y-3">
                {["Caracteristicas", "Precios", "Seguridad", "Integraciones"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground">Empresa</h4>
              <ul className="mt-4 space-y-3">
                {["Nosotros", "Blog", "Carreras", "Contacto"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground">Legal</h4>
              <ul className="mt-4 space-y-3">
                {["Privacidad", "Terminos", "Cumplimiento", "Documentacion"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              2026 Stellar BAF. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Estado del sistema
              </a>
              <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                API Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
