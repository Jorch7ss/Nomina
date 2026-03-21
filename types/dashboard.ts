export type UserRole = "admin" | "basic"

export interface DashboardProps {
  role: UserRole
  onLogout: () => void
}

export interface Transaction {
  id: string
  type: string
  amount: string
  date: string
  status: "completed" | "pending" | "failed"
  recipient?: string
}

export interface Employee {
  id: string
  name: string
  department: string
  country: string
  status: "active" | "inactive"
}

export interface ContractEvent {
  id: string
  timestamp: string
  type: "escrow" | "dispersion" | "validation" | "token"
  message: string
  status: "ok" | "warning" | "error"
}
