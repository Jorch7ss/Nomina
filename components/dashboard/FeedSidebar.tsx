"use client"

import { Terminal, X } from "lucide-react"
import type { ContractEvent } from "@/types/dashboard"

interface FeedSidebarProps {
  showFeed: boolean
  setShowFeed: (show: boolean) => void
  contractEvents: ContractEvent[]
}

export function FeedSidebar({ showFeed, setShowFeed, contractEvents }: FeedSidebarProps) {
  return (
    <div className={`fixed right-0 top-[73px] h-[calc(100vh-73px)] w-80 bg-card/95 backdrop-blur-xl border-l border-border transition-transform duration-300 z-40 ${
      showFeed ? "translate-x-0" : "translate-x-full"
    }`}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground text-sm">Eventos del Contrato</span>
        </div>
        <button 
          onClick={() => setShowFeed(false)}
          className="p-1 rounded hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100%-60px)] terminal-feed">
        {contractEvents.map((event) => (
          <div key={event.id} className="mb-3 pb-3 border-b border-border/50">
            <span className="timestamp">[{event.timestamp}]</span>
            <br />
            <span className={event.status === "ok" ? "success" : event.status === "warning" ? "warning" : "error"}>
              {event.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
