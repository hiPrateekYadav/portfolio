import type { ReactNode } from 'react'

const ICONS: Record<string, ReactNode> = {
  generic: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14 3H21V10" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14L21 3" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 14V21H14" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 10L3 17" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="#DAC5A7" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="#DAC5A7" strokeWidth="1.5" /><circle cx="17.5" cy="6.5" r="1" fill="#DAC5A7" /></svg>
  ),
  twitter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M23 3.01006C23 3.01006 20.9821 4.20217 19.86 4.54006C19.2577 3.84757 18.4573 3.35675 17.567 3.13398C16.6767 2.91122 15.7395 2.96725 14.8821 3.29451C14.0247 3.62177 13.2884 4.20446 12.773 4.96377C12.2575 5.72309 11.9877 6.62239 12 7.54006V8.54006C10.2426 8.58562 8.50127 8.19587 6.93101 7.4055C5.36074 6.61513 4.01032 5.44869 3 4.01006C3 4.01006 -1 13.0101 8 17.0101C5.94053 18.408 3.48716 19.109 1 19.0101C10 24.0101 21 19.0101 21 7.51006C20.9991 7.23151 20.9723 6.95365 20.92 6.68006C21.9406 5.67355 23 3.01006 23 3.01006Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  facebook: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  youtube: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22.54 6.42C22.4212 5.94541 22.1793 5.51057 21.8387 5.15941C21.498 4.80824 21.0708 4.55318 20.6 4.42C18.88 4 12 4 12 4C12 4 5.12 4 3.4 4.46C2.92925 4.59318 2.50198 4.84824 2.16135 5.19941C1.82072 5.55057 1.57882 5.98541 1.46 6.46C1.14521 8.20556 0.991228 9.97631 1 11.75C0.988771 13.537 1.14275 15.3213 1.46 17.08C1.59096 17.5398 1.83831 17.9581 2.17815 18.2945C2.51798 18.6308 2.93884 18.8738 3.4 19C5.12 19.46 12 19.46 12 19.46C12 19.46 18.88 19.46 20.6 19C21.0708 18.8668 21.498 18.6118 21.8387 18.2606C22.1793 17.9094 22.4212 17.4746 22.54 17C22.8524 15.2676 23.0063 13.5103 23 11.75C23.0112 9.96295 22.8573 8.1787 22.54 6.42Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.75 15.02L15.5 11.75L9.75 8.48V15.02Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  github: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.865 20.125 8.839 21.489C9.339 21.579 9.521 21.272 9.521 21.007C9.521 20.771 9.513 20.146 9.508 19.312C6.726 19.91 6.139 17.843 6.139 17.843C5.685 16.646 5.029 16.34 5.029 16.34C4.121 15.727 5.098 15.74 5.098 15.74C6.101 15.811 6.629 16.762 6.629 16.762C7.521 18.281 8.97 17.842 9.539 17.586C9.631 16.94 9.889 16.502 10.175 16.252C7.955 16 5.62 15.142 5.62 11.233C5.62 10.091 6.01 9.158 6.649 8.424C6.546 8.171 6.203 7.163 6.747 5.794C6.747 5.794 7.586 5.525 9.497 6.868C10.294 6.648 11.147 6.538 12 6.534C12.853 6.538 13.706 6.648 14.504 6.868C16.414 5.525 17.251 5.794 17.251 5.794C17.797 7.163 17.453 8.171 17.35 8.424C17.991 9.158 18.378 10.091 18.378 11.233C18.378 15.151 16.04 15.997 13.813 16.244C14.172 16.556 14.491 17.172 14.491 18.114C14.491 19.466 14.479 20.556 14.479 20.007C14.479 20.274 14.659 21.584 15.159 21.488C19.137 20.121 22 16.418 22 12C22 6.477 17.523 2 12 2Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6.94 7.5H3.5V20.5H6.94V7.5Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.22 3.5C4.13 3.5 3.25 4.38 3.25 5.47C3.25 6.56 4.13 7.44 5.22 7.44C6.31 7.44 7.19 6.56 7.19 5.47C7.19 4.38 6.31 3.5 5.22 3.5Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.5 20.5V13.5C20.5 10.74 18.26 8.5 15.5 8.5C14.04 8.5 12.74 9.2 11.95 10.28V8.5H8.5V20.5H11.95V14.5C11.95 13.12 13.07 12 14.45 12C15.83 12 16.95 13.12 16.95 14.5V20.5H20.5Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  dribbble: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#DAC5A7" strokeWidth="1.5"/><path d="M3.6 10.5C7 10 12.5 9.5 20.4 10.8" stroke="#DAC5A7" strokeWidth="1.5"/><path d="M8.5 4C12 10 14 14 15.5 20" stroke="#DAC5A7" strokeWidth="1.5"/><path d="M4 16C8 13 13 12.5 20 15" stroke="#DAC5A7" strokeWidth="1.5"/></svg>
  ),
  behance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 9.5H9C10.66 9.5 12 10.84 12 12.5C12 14.16 10.66 15.5 9 15.5H4V9.5Z" stroke="#DAC5A7" strokeWidth="1.5"/><path d="M4 9.5C4 8.11929 5.11929 7 6.5 7H9C10.3807 7 11.5 8.11929 11.5 9.5C11.5 10.8807 10.3807 12 9 12H4V9.5Z" stroke="#DAC5A7" strokeWidth="1.5"/><path d="M13.5 15.5C13.5 13.567 15.067 12 17 12C18.933 12 20.5 13.567 20.5 15.5H13.5Z" stroke="#DAC5A7" strokeWidth="1.5"/><rect x="14" y="7" width="4" height="1.5" fill="#DAC5A7"/></svg>
  ),
  pinterest: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11.5 6.5C9.5 6.7 8 8.2 8 10.2C8 11.8 8.9 12.9 10.1 13.3L9.6 15.3C9.3 16.5 9.2 17.4 9.2 18H10.7C10.8 17.5 11 16.7 11.2 15.9L11.5 14.8C11.9 15 12.3 15.1 12.7 15.1C15.1 15.1 17 13.3 17 10.8C17 8.5 15.5 6.8 13.1 6.5C12.6 6.4 12 6.4 11.5 6.5ZM12.6 8.3C13.7 8.3 14.5 9.1 14.5 10.4C14.5 11.9 13.7 13.1 12.6 13.1C12.1 13.1 11.7 12.8 11.5 12.4L11.9 11C12.1 10.3 12.3 9.9 12.3 9.5C12.3 8.9 12.4 8.3 12.6 8.3Z" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  leetcode: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 7L4 12L9 17" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7L20 12L15 17" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  codechef: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="12" width="16" height="6" rx="2" stroke="#DAC5A7" strokeWidth="1.5" />
      <path d="M9 12L8 8.5C8 7.67 8.67 7 9.5 7C10.2 7 10.8 7.42 11.05 8.06L12 12" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 12L16 8.5C16 7.67 15.33 7 14.5 7C13.8 7 13.2 7.42 12.95 8.06L12 12" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12C7 10 8.6 8.5 10.6 8.5H13.4C15.4 8.5 17 10 17 12" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

/** Renders the icon for a social network key (see `getSocials`), falling back to a generic link icon. */
export default function SocialIcon({ name }: { name: string }) {
  return <>{ICONS[name] ?? ICONS.generic}</>
}
