export const translations = {
  es: {
    // Header
    appName: "Alebrije Flow",
    appSubtitle: "Sistema de Nomina",
    rolAdmin: "Administrador",
    rolEmployee: "Empleado",
    feedLabel: "Feed",
    salir: "Salir",

    // KPI Cards
    saldoCustodia: "Saldo en Custodia",
    saldoSub: "MXN Tokenizado",
    rendimiento: "+2.4% rendimiento",
    proximaDispersion: "Proxima Dispersion",
    nominaQuincenal: "Nomina Quincenal",
    diasRestantes: "3 dias",
    headcount: "Headcount Total",
    empleadosActivos: "Empleados activos",
    esteMes: "+12 este mes",

    // Dashboard Cards
    transacciones: "Transacciones y Movimientos",
    gestionDispersiones: "Gestion de dispersiones",
    misRecibos: "Mis Recibos",
    historialNomina: "Historial de nomina",
    capitalHumano: "Capital Humano",
    gestionEmpleados: "Gestion de empleados",
    misSolicitudes: "Mis Solicitudes",
    vacacionesPermisos: "Vacaciones y permisos",
    tokenizacion: "Sistema de Tokenizacion",
    activosReservas: "Activos y reservas",
    crecimiento: "Crecimiento y Ahorros",
    fondoAhorro: "Tu fondo de ahorro generando APY",
    automatizacion: "Automatizacion",
    flujosNomina: "Flujos de nomina",

    // Buttons
    dispersarFondos: "Dispersar Fondos",
    enviandoStellar: "Enviando a Stellar...",
    esperandoEscrow: "Esperando Escrow...",
    simularRecibo: "Simular mi Recibo de Nómina",
    filtrarPais: "Filtrar por Pais/Depto",
    solicitarVacaciones: "Solicitar Vacaciones",
    configurarFlujo: "Configurar Nuevo Flujo",
    activos: "Activos",
    inactivos: "Inactivos",

    // Tokenization
    fondosTokenizados: "Fondos Tokenizados",
    fondosAhorrados: "Fondos Ahorrados",
    enReservaFija: "En Reserva Fija",
    saldosRetiro: "Saldos listos para retiro",
    rendimientosInteligentes: "Rendimientos Inteligentes",
    rendimientosDesc: "Tus fondos en espera generan rendimientos automáticos del 4.8% APY anualizados, habilitados gracias a los smart-contracts descentralizados de la red.",

    // Connection
    conectando: "Conectando con el contrato inteligente... Esperando Esencia",

    // Modals
    transaccionesTitle: "Transacciones y Movimientos",
    misRecibosTitle: "Mis Recibos de Nomina",
    comparacionNomina: "Comparacion de Nomina",
    anterior: "Anterior",
    actual: "Actual",

    // Flows
    nominaQuincenalFlow: "Nomina Quincenal UNAM",
    dispersionEstelar: "Dispersion Estelar Foundation",
    bonosTrim: "Bonos Trimestrales",
    proxima: "Proxima:",
    editar: "Editar",

    // Status
    completado: "completed",
    pendiente: "pending",
  },
  en: {
    // Header
    appName: "Alebrije Flow",
    appSubtitle: "Payroll System",
    rolAdmin: "Administrator",
    rolEmployee: "Employee",
    feedLabel: "Feed",
    salir: "Log Out",

    // KPI Cards
    saldoCustodia: "Custody Balance",
    saldoSub: "Tokenized MXN",
    rendimiento: "+2.4% yield",
    proximaDispersion: "Next Dispersion",
    nominaQuincenal: "Biweekly Payroll",
    diasRestantes: "3 days",
    headcount: "Total Headcount",
    empleadosActivos: "Active employees",
    esteMes: "+12 this month",

    // Dashboard Cards
    transacciones: "Transactions & Movements",
    gestionDispersiones: "Dispersion management",
    misRecibos: "My Receipts",
    historialNomina: "Payroll history",
    capitalHumano: "Human Capital",
    gestionEmpleados: "Employee management",
    misSolicitudes: "My Requests",
    vacacionesPermisos: "Time off & permits",
    tokenizacion: "Tokenization System",
    activosReservas: "Assets and reserves",
    crecimiento: "Growth & Savings",
    fondoAhorro: "Your savings fund generating APY",
    automatizacion: "Automation",
    flujosNomina: "Payroll flows",

    // Buttons
    dispersarFondos: "Disperse Funds",
    enviandoStellar: "Sending to Stellar...",
    esperandoEscrow: "Awaiting Escrow...",
    simularRecibo: "Simulate my Pay Stub",
    filtrarPais: "Filter by Country/Dept",
    solicitarVacaciones: "Request Time Off",
    configurarFlujo: "Configure New Flow",
    activos: "Active",
    inactivos: "Inactive",

    // Tokenization
    fondosTokenizados: "Tokenized Funds",
    fondosAhorrados: "Saved Funds",
    enReservaFija: "In Fixed Reserve",
    saldosRetiro: "Balances ready for withdrawal",
    rendimientosInteligentes: "Smart Yields",
    rendimientosDesc: "Your idle funds automatically generate 4.8% APY returns, enabled by the network's decentralized smart-contracts.",

    // Connection
    conectando: "Connecting to smart contract... Awaiting Essence",

    // Modals
    transaccionesTitle: "Transactions & Movements",
    misRecibosTitle: "My Pay Stubs",
    comparacionNomina: "Payroll Comparison",
    anterior: "Previous",
    actual: "Current",

    // Flows
    nominaQuincenalFlow: "UNAM Biweekly Payroll",
    dispersionEstelar: "Stellar Foundation Dispersion",
    bonosTrim: "Quarterly Bonuses",
    proxima: "Next:",
    editar: "Edit",

    // Status
    completado: "completed",
    pendiente: "pending",
  },
} as const

export type Lang = keyof typeof translations
export type TranslationKey = keyof typeof translations.es
