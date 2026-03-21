"use client"

import { useRouter } from "next/navigation"
import { Dashboard } from "@/components/dashboard"

export default function DashboardRoute() {
  const router = useRouter()

  return (
    <Dashboard 
      role="admin" 
      onLogout={() => router.push("/")} 
    />
  )
}
