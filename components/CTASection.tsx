'use client'

import Link from 'next/link'
import FadeIn from '@/components/animations/FadeIn'
import type { LetsTalkContent } from '@/lib/sheetsMappers'

const FALLBACK_CONTENT: LetsTalkContent = {
  titleLine1: "Let's make your",
  titleLine2: 'Website shine.',
  subtitle: 'Premium web design, website, and devops services to help your business stand out.',
}

interface CTASectionProps {
  content?: LetsTalkContent | null
  source?: 'recruiter' | 'client'
}

/** "Let's talk" scrolling banner and contact call-to-action shown at the bottom of client pages. */
export default function CTASection({ content, source = 'client' }: CTASectionProps) {
  const finalContent = {
    titleLine1: content?.titleLine1 || FALLBACK_CONTENT.titleLine1,
    titleLine2: content?.titleLine2 || FALLBACK_CONTENT.titleLine2,
    subtitle: content?.subtitle || FALLBACK_CONTENT.subtitle,
  }

  return (
    <>
      {/* Animated Scrolling Banner */}
      <section className="w-full overflow-hidden">
        <div className="border-t border-[rgba(218,197,167,0.15)]" />
        <div className="bg-[rgba(218,197,167,0.1)] py-[16px] rounded-sm overflow-hidden">
          <div className="flex gap-[32px] animate-scroll-banner whitespace-nowrap">
            {[...Array(50)].map((_, i) => (
              <p
                key={i}
                className="font-sans text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]"
              >
                {i % 2 === 0 ? '+++' : "Let's talk"}
              </p>
            ))}
          </div>
        </div>
        <div className="border-b border-[rgba(218,197,167,0.15)]" />
      </section>

      {/* CTA Content */}
      <section className="bg-[rgba(218,197,167,0.05)] py-16 md:py-24 lg:py-[160px] px-4 md:px-8 lg:px-[48px] w-full">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-[32px] items-center">
          <FadeIn direction="up" delay={0}>
            <div className="flex flex-col gap-2 md:gap-[8px] items-center">
              <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">
                Project in mind?
              </p>
              <div className="font-sans font-light text-[40px] md:text-[80px] lg:text-[128px] leading-none text-[#dac5a7] text-center">
                <p className="mb-0">{finalContent.titleLine1}</p>
                <p className="font-serif italic">{finalContent.titleLine2}</p>
              </div>
              <p className="font-chillax text-[14px] md:text-[18px] lg:text-[20px] leading-[1.7] text-[rgba(218,197,167,0.6)] text-center max-w-[90%] md:max-w-[500px]">
                {finalContent.subtitle}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Link
              href={`/contact?source=${source}`}
              className="bg-[#dac5a7] px-4 md:px-[16px] py-2 md:py-[10px] rounded-sm flex gap-2 md:gap-[8px] items-center justify-center hover:bg-[#c9b396] transition-colors"
            >
              <span className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#0e0e0e]">
                Get in touch
              </span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M4.5 13.5L13.5 4.5M13.5 4.5H4.5M13.5 4.5V13.5"
                  stroke="#0e0e0e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
