"use client"

import { motion } from "framer-motion"
import { Upload, ShieldCheck, Zap } from "lucide-react"
import { SectionHeading } from "@/components/landing/SectionHeading"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/translations"

const stepIcons = [Upload, ShieldCheck, Zap]

export function HowItWorks() {
  const { lang } = useLanguage()
  const t = translations[lang]

  const steps = [
    { title: t.howStep1Title, desc: t.howStep1Desc },
    { title: t.howStep2Title, desc: t.howStep2Desc },
    { title: t.howStep3Title, desc: t.howStep3Desc },
  ]

  return (
    <section id="como-funciona" className="border-y border-border bg-muted/30 py-20 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-6"
      >
        <SectionHeading title={t.howTitle} description={t.howDesc} />

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = stepIcons[idx]
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/25"
              >
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {idx + 1}
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </motion.div>
                <h3 className="text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <span
                    className="absolute -right-4 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-border md:block"
                    aria-hidden
                  />
                )}
              </motion.li>
            )
          })}
        </ol>
      </motion.div>
    </section>
  )
}
