"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/landing/Navbar"
import { SectionHeading } from "@/components/landing/SectionHeading"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { AudienceSection } from "@/components/landing/AudienceSection"
import { ValueSection } from "@/components/landing/ValueSection"
import { LandingFooter } from "@/components/landing/LandingFooter"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"
import { scrollToSection } from "@/lib/scroll-to"
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  BarChart3,
  Play,
  Check,
  Users,
  Calendar,
  FileText,
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: (role: "admin" | "basic") => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const { lang } = useLanguage()
  const t = translations[lang]
  const [scrolled, setScrolled] = useState(false)
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
    let frame = 0
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!heroRef.current) return
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      })
    }
    const mq = window.matchMedia("(min-width: 1024px)")
    if (mq.matches) window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const metrics = [
    { value: "$2.4B+", label: t.metric1 },
    { value: "99.99%", label: t.metric2 },
    { value: "< 3s", label: t.metric3 },
    { value: "150K+", label: t.metric4 },
  ]

  const productFeatures = [t.productFeature1, t.productFeature2, t.productFeature3, t.productFeature4]

  const features = [
    {
      icon: Shield,
      title: t.feat1Title,
      description: t.feat1Desc,
    },
    {
      icon: Zap,
      title: t.feat2Title,
      description: t.feat2Desc,
    },
    {
      icon: Globe,
      title: t.feat3Title,
      description: t.feat3Desc,
    },
    {
      icon: BarChart3,
      title: t.feat4Title,
      description: t.feat4Desc,
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
                  ⚡ {t.heroBadge}
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl"
              >
                {t.heroTitle1}{" "}
                <span className="relative">
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient">
                    {t.heroTitle2}
                  </span>
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty lg:mx-0"
              >
                {t.heroDesc}
              </motion.p>

              {/* CTA buttons */}
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <button
                  type="button"
                  onClick={() => onGetStarted("admin")}
                  className="btn-press group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
                >
                  {t.heroCTA}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("como-funciona")}
                  className="btn-press group flex w-full items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-8 py-4 text-base font-medium transition-all hover:border-primary/30 hover:bg-secondary sm:w-auto"
                >
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {t.heroDemo}
                </button>
              </div>

              {/* Quick stats */}
              <div className="mt-12 flex items-center justify-center gap-8 lg:justify-start">
                {[
                  { value: "500+", label: t.heroStat1 },
                  { value: "12", label: t.heroStat2 },
                  { value: "24/7", label: t.heroStat3 },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vista previa del periodo de nómina */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-lg"
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  {t.heroCardBadge}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t.heroCardPeriod}</h3>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 shrink-0" aria-hidden />
                  {t.heroCardEmployees}
                </p>
                <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-500" aria-hidden />
                  {t.heroCardStatus}
                </p>
                <ul className="mt-6 space-y-3 border-t border-border pt-4">
                  {[
                    { name: "Área operaciones", amount: "$842,120", status: "paid" as const },
                    { name: "Área administrativa", amount: "$318,450", status: "paid" as const },
                    { name: "Nuevos ingresos", amount: "$96,200", status: "pending" as const },
                  ].map((row) => (
                    <li
                      key={row.name}
                      className="flex items-center justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2.5"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                        <span className="truncate text-sm text-foreground">{row.name}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <span className="text-sm font-medium tabular-nums">{row.amount}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            row.status === "paid"
                              ? "bg-green-500/15 text-green-700 dark:text-green-400"
                              : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                          }`}
                        >
                          {row.status === "paid" ? t.heroCardPaid : t.heroCardPending}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-muted-foreground">{t.scroll}</span>
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
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <span className="text-3xl font-semibold text-foreground md:text-4xl lg:text-5xl">
                  {metric.value}
                </span>
                <div className="mt-3 text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading title={t.featTitle} description={t.featDesc} />

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

      <HowItWorks />
      <AudienceSection onGetStarted={onGetStarted} />

      {/* Product Preview */}
      <section id="producto" className="border-y border-border bg-card/30 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t.productTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.productDesc}</p>
              <ul className="mt-8 space-y-4">
                {productFeatures.map((item) => (
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
                  type="button"
                  onClick={() => onGetStarted("admin")}
                  className="group flex items-center gap-2 text-primary transition-colors hover:text-primary/80"
                >
                  {t.productCTA}
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
              
            </motion.div>
          </div>
        </div>
      </section>

      <ValueSection />


      {/* CTA Section */}
      <section className="relative overflow-hidden border-t border-border py-20 lg:py-28">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {t.ctaTitle}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t.ctaDesc}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => onGetStarted("admin")}
                className="btn-press group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20 sm:w-auto"
              >
                {t.ctaBtn1}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("soluciones")}
                className="btn-press flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-base font-medium transition-all hover:bg-secondary sm:w-auto"
              >
                {t.ctaBtn2}
              </button>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  )
}
