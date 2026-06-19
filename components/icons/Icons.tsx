interface IconProps { size?: number; className?: string; color?: string }
const c = (p: IconProps) => ({ width: p.size ?? 20, height: p.size ?? 20, viewBox: '0 0 20 20', fill: 'none', className: p.className, 'aria-hidden': true as const })
const s = (color?: string) => ({ stroke: color ?? 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const })

export const IconMonitor = (p: IconProps) => <svg {...c(p)}><rect x="2" y="3" width="16" height="11" rx="1.5" {...s(p.color)}/><path d="M6 17h8M10 14v3" {...s(p.color)}/></svg>
export const IconSearch = (p: IconProps) => <svg {...c(p)}><circle cx="9" cy="9" r="5.5" {...s(p.color)}/><path d="M16 16l-3-3" {...s(p.color)}/></svg>
export const IconLightning = (p: IconProps) => <svg {...c(p)}><path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" {...s(p.color)}/></svg>
export const IconShield = (p: IconProps) => <svg {...c(p)}><path d="M10 2L3 5v5c0 4.4 3 7.4 7 8.5 4-1.1 7-4.1 7-8.5V5L10 2z" {...s(p.color)}/><path d="M7 10l2 2 4-4" {...s(p.color)}/></svg>
export const IconChat = (p: IconProps) => <svg {...c(p)}><path d="M4 4h12v9H4z" rx="1" {...s(p.color)}/><path d="M7 16l2-3h1" {...s(p.color)}/><path d="M7 8h6M7 11h4" {...s(p.color)}/></svg>
export const IconPencil = (p: IconProps) => <svg {...c(p)}><path d="M13 3l4 4L7 17H3v-4L13 3z" {...s(p.color)}/><path d="M11 5l4 4" {...s(p.color)}/></svg>
export const IconCode = (p: IconProps) => <svg {...c(p)}><path d="M6 7L2 10l4 3M14 7l4 3-4 3M11 4l-2 12" {...s(p.color)}/></svg>
export const IconRocket = (p: IconProps) => <svg {...c(p)}><path d="M10 2s5 2 5 8v1l-3 3-2-1-2 1-3-3v-1c0-6 5-8 5-8z" {...s(p.color)}/><circle cx="10" cy="10" r="1.5" {...s(p.color)}/><path d="M7 15l-2 3M13 15l2 3" {...s(p.color)}/></svg>
export const IconArrow = (p: IconProps) => <svg {...c(p)}><path d="M4 10h12M10 4l6 6-6 6" {...s(p.color)}/></svg>
export const IconCheck = (p: IconProps) => <svg {...c(p)}><path d="M3 10l5 5 9-9" {...s(p.color)}/></svg>
export const IconX = (p: IconProps) => <svg {...c(p)}><path d="M5 5l10 10M15 5L5 15" {...s(p.color)}/></svg>
export const IconStar = (p: IconProps) => <svg {...c(p)}><path d="M10 2l2.3 4.6 5.1.75-3.7 3.6.87 5.07L10 13.5l-4.57 2.53.87-5.07L2.6 7.31l5.1-.75L10 2z" fill={p.color ?? 'currentColor'} stroke="none"/></svg>
export const IconPin = (p: IconProps) => <svg {...c(p)}><path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5z" {...s(p.color)}/><circle cx="10" cy="7" r="2" {...s(p.color)}/></svg>
export const IconMail = (p: IconProps) => <svg {...c(p)}><rect x="2" y="4" width="16" height="12" rx="1.5" {...s(p.color)}/><path d="M2 6l8 6 8-6" {...s(p.color)}/></svg>
export const IconPhone = (p: IconProps) => <svg {...c(p)}><path d="M3 3h4l2 4-2.5 1.5C7.5 11 9 12.5 11.5 13.5L13 11l4 2v4c-6 .5-12-5.5-14-14z" {...s(p.color)}/></svg>
export const IconExternal = (p: IconProps) => <svg {...c(p)}><path d="M5 15L15 5M15 5H7M15 5v8" {...s(p.color)}/></svg>
export const IconPlus = (p: IconProps) => <svg {...c(p)}><path d="M10 4v12M4 10h12" {...s(p.color)}/></svg>
export const IconSpinner = (p: IconProps) => <svg {...c(p)} className={`${p.className} animate-spin`}><circle cx="10" cy="10" r="7" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2"/><path d="M17 10a7 7 0 01-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>

export const serviceIcon = (name: string, p: IconProps = {}) => {
  const icons: Record<string, JSX.Element> = {
    monitor: <IconMonitor {...p} />,
    search: <IconSearch {...p} />,
    lightning: <IconLightning {...p} />,
    shield: <IconShield {...p} />,
    chat: <IconChat {...p} />,
    pencil: <IconPencil {...p} />,
    code: <IconCode {...p} />,
    rocket: <IconRocket {...p} />,
  }
  return icons[name] ?? null
}
