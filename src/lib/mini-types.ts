/** Types des mini-simulateurs (RECETTE §9.3). Chaque mini est un fichier de lib/minis/. */
export interface MiniInput { id: string; label: string; def: number; unit?: string; max?: number; decimals?: number; options?: Array<{ value: string; label: string }> }
export interface MiniOut { head: [string, string]; rows: Array<[string, string]>; note?: string; tone?: 'si' | 'no' | 'na' | 'warn' }
export interface MiniSpec { /** Fuseau du jour courant (America/Mexico_City ou America/Bogota). */ tz?: string; title: string; cta: string; ctaHref?: string; inputs: MiniInput[]; run: (v: Record<string, number>, hoy: string) => MiniOut }
