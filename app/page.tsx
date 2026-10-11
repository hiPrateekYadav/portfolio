'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import RevealText from '@/components/animations/RevealText'
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren'
import HoverCard from '@/components/animations/HoverCard'
import MagneticButton from '@/components/animations/MagneticButton'
import ParallaxSection from '@/components/animations/ParallaxSection'
import LoadingScreen from '@/components/LoadingScreen'
import { usePageData } from '@/hooks/usePageData'
import { getLogos, getRecruiterContent, type Logo, type RecruiterExperience } from '@/lib/sheetsMappers'
import { toDownloadUrl } from '@/lib/downloadUrl'
import { formatExperience } from '@/lib/experience'

// Shared class names mirroring the /client design system
const glass = 'backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm'
const container = 'max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16'
const sectionSpacing = 'pt-20 md:pt-32 lg:pt-40 pb-16'
const meta = 'text-[13px] uppercase tracking-[1.5px] font-normal'
const muted = 'text-[rgba(218,197,167,0.6)]'
const cardTitle = 'text-[20px] md:text-[22px] lg:text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-primary'
const body = `font-chillax text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] ${muted}`
const sectionTitle = 'font-sans font-light text-[40px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-1px] text-primary'
const pill = `${glass} px-2 py-1 text-[12px] font-chillax text-primary uppercase`

const ArrowUpRight = ({ color = 'currentColor' }: { color?: string }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4.5 13.5L13.5 4.5M13.5 4.5H4.5M13.5 4.5V13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Bullet = () => (
  <svg className="w-[6px] h-[6px] shrink-0 mt-2.5" viewBox="0 0 6 6" fill="none" aria-hidden="true">
    <circle cx="3" cy="3" r="3" fill="rgba(218,197,167,0.6)" />
  </svg>
)

function Tags({ items }: { items: string[] }) {
  if (!items.length) return null
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tag) => <span key={tag} className={pill}>{tag}</span>)}
    </div>
  )
}

function ExperienceCard({ job }: { job: RecruiterExperience }) {
  return (
    <div className={`relative ${glass} p-6 md:p-10 lg:p-12`}>
      <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:justify-between sm:gap-4 mb-6">
        <div>
          <p className={`${meta} ${muted} mb-1`}>{job.employer}{job.location ? ` · ${job.location}` : ''}</p>
          <h3 className={cardTitle}>{job.role}</h3>
        </div>
        <span className={`${pill} whitespace-nowrap`}>{job.dates}</span>
      </div>
      <div className="space-y-4 mb-8">
        {job.bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-4">
            <Bullet />
            <span className="text-[14px] md:text-[16px] font-chillax leading-[1.8] text-primary">{bullet}</span>
          </div>
        ))}
      </div>
      <Tags items={job.technologies} />
    </div>
  )
}

export default function RecruiterHome() {
  const heroRef = useRef<HTMLElement>(null)
  // Recruiter content is required, so a failed load keeps the branded loading screen up.
  // Logos are optional: a failed fetch just hides the carousel.
  const { data, loading } = usePageData(
    () => Promise.all([
      getRecruiterContent(),
      getLogos()
        .then((items) => items.filter((logo) => logo.isFulltime))
        .catch((error) => {
          console.error('Failed to load logos', error)
          return [] as Logo[]
        }),
    ]),
    [],
    { holdOnError: true }
  )
  const [content, logos] = data ?? [null, []]
  const ready = !loading

  // Hero parallax - only attach once the hero is rendered
  const { scrollYProgress } = useScroll(ready ? { target: heroRef, offset: ['start start', 'end start'] } : {})
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -300])

  const toolkit = useMemo(() => {
    const groups = new Map<string, string[]>()
    content?.toolkit.forEach(({ category, technology }) => groups.set(category, [...(groups.get(category) || []), technology]))
    return [...groups.entries()]
  }, [content])

  if (!content) return <div className="bg-dark min-h-screen"><LoadingScreen /></div>
  const { profile } = content
  const certifications = content.credentials.filter((item) => item.type === 'certification')
  const education = content.credentials.filter((item) => item.type === 'education')
  const [experienceLine1, experienceLine2] = profile.experienceIntro.split('|')

  return (
    <div className="bg-dark min-h-screen overflow-hidden">
      {/* ==================== HERO SECTION ==================== */}
      <section ref={heroRef} className="relative h-[700px] md:h-[900px] lg:h-[1130px] w-full overflow-hidden flex flex-col items-center justify-end">
        <div className="absolute left-1/2 top-[80px] md:top-[100px] lg:top-[130px] w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] -translate-x-1/2 mix-blend-lighten opacity-80">
          <Image src={profile.portrait || '/images/hero-profile.png'} alt={`${profile.name} portrait`} fill priority className="object-cover" unoptimized />
        </div>

        <motion.div style={{ y: heroTextY }} className="relative z-10 flex flex-col items-center gap-6 md:gap-10 lg:gap-12 pb-[60px] md:pb-[90px] lg:pb-[117px] px-4">
          <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
            {profile.availability && (
              <FadeIn direction="up" immediate>
                <span className={`${glass} inline-block px-3 py-1.5 ${meta} text-primary`}>{profile.availability}</span>
              </FadeIn>
            )}
            <RevealText immediate>
              <h1 className="text-[40px] md:text-[60px] lg:text-[80px] leading-none tracking-[-1px] antialiased" style={{ fontWeight: 300 }}>
                <div className="font-sans text-primary" style={{ fontWeight: 100 }}>{profile.titleLine1}</div>
                <div className="font-serif italic text-primary" style={{ fontWeight: 100 }}>{profile.titleLine2}</div>
              </h1>
            </RevealText>
            <FadeIn delay={0.3} direction="up" immediate>
              <p className={`font-chillax font-light text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] ${muted} max-w-[90%] md:max-w-[500px] lg:max-w-[650px] mx-auto text-center`}>
                {profile.summary}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} direction="up">
            <MagneticButton>
              <a href="#experience" aria-label="Scroll to experience" className={`w-[46px] h-[46px] rounded-full ${glass} !rounded-full flex items-center justify-center`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 3.75V16.25M10 16.25L5 11.25M10 16.25L15 11.25" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </MagneticButton>
          </FadeIn>
        </motion.div>
      </section>

      {/* ==================== LOGO CAROUSEL ==================== */}
      {/* Same carousel as /client, limited to full-time employers */}
      {logos.length > 0 && (
        <ParallaxSection speed={-0.3}>
          <section className="w-full pt-10 pb-20 overflow-hidden" aria-label="Companies">
            <div className="relative w-full">
              <div className="flex items-center gap-20 md:gap-40 h-[35px] animate-scroll-logos">
                {[...Array(8)].map((_, setIndex) => (
                  <div key={setIndex} className="flex items-center gap-20 md:gap-40 flex-shrink-0">
                    {logos.map((logo, index) => (
                      <Image
                        key={index}
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className="w-auto opacity-60 flex-shrink-0"
                        style={{ height: `${logo.height}px` }}
                        unoptimized
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ParallaxSection>
      )}

      {/* ==================== METRICS ==================== */}
      <section className="w-full pt-10 md:pt-16 pb-16">
        <div className={container}>
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {content.metrics.map((metric) => (
              <StaggerItem key={metric.label} className="h-full">
                <div className={`${glass} h-full p-6 md:p-10 flex flex-col items-center justify-center gap-2 text-center`}>
                  <p className="font-sans font-light text-[40px] md:text-[52px] lg:text-[64px] leading-none tracking-[-1px] text-primary">{metric.value}</p>
                  <p className={`${meta} ${muted} text-[11px] md:text-[13px]`}>{metric.label}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ==================== EXPERIENCE ==================== */}
      <section id="experience" className={`w-full scroll-mt-28 ${sectionSpacing}`}>
        <FadeIn direction="up">
          <div className="max-w-[710px] mx-auto text-center mb-12 px-4">
            <p className={`${meta} text-primary mb-4`}>Experience</p>
            <h2 className="text-[48px] md:text-[80px] lg:text-[128px] leading-none tracking-[-1px]">
              <div className="font-sans font-light text-primary">{experienceLine1 || formatExperience()}</div>
              <div className="font-serif font-light italic text-primary">{experienceLine2 || 'in production'}</div>
            </h2>
          </div>
        </FadeIn>

        <div className="flex justify-center">
          <div className="w-px h-12 md:h-20 lg:h-24 bg-[rgba(218,197,167,0.15)]" />
        </div>

        <div className={container}>
          {/* Mobile / tablet: stacked cards */}
          <div className="lg:hidden space-y-8 pt-8">
            {content.experience.map((job, index) => (
              <FadeIn key={`${job.employer}-${job.role}`} direction="up" delay={index * 0.1}>
                <div className="flex flex-col items-center gap-4">
                  <div className={`w-10 h-10 ${glass} !rounded-full flex items-center justify-center`}>
                    <span className={`${meta} text-primary`}>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="w-full"><ExperienceCard job={job} /></div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop: alternating timeline */}
          <div className="hidden lg:block">
            {content.experience.map((job, index) => {
              const card = (
                <FadeIn direction={index % 2 ? 'left' : 'right'} delay={0.1}>
                  <div className="pt-16 pb-12"><ExperienceCard job={job} /></div>
                </FadeIn>
              )
              return (
                <div key={`${job.employer}-${job.role}`} className="grid grid-cols-[1fr_40px_1fr] gap-20">
                  {index % 2 === 0 ? card : <div />}
                  <div className="flex flex-col items-center">
                    <div className="w-px h-[88px] bg-[rgba(218,197,167,0.15)]" />
                    <div className={`w-10 h-10 shrink-0 ${glass} !rounded-full flex items-center justify-center`}>
                      <span className={`${meta} text-primary`}>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="w-px flex-1 bg-[rgba(218,197,167,0.15)]" />
                  </div>
                  {index % 2 === 1 ? card : <div />}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== CASE STUDIES ==================== */}
      <section id="work" className={`w-full scroll-mt-28 ${sectionSpacing}`}>
        <div className={container}>
          <FadeIn direction="up">
            <div className="mb-8 md:mb-12 lg:mb-16 px-4 md:px-8">
              <h2 className={sectionTitle}>
                <span>Selected </span>
                <span className="font-serif italic">Case Studies</span>
              </h2>
            </div>
          </FadeIn>

          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {content.caseStudies.map((study) => (
              <StaggerItem key={study.title} className="h-full">
                <HoverCard className="h-full">
                  <motion.article
                    whileHover={{ borderColor: 'rgba(218,197,167,0.3)' }}
                    transition={{ duration: 0.3 }}
                    className={`${glass} h-full p-8 md:p-10 lg:p-12 flex flex-col gap-6 md:gap-8 min-h-[280px] lg:min-h-[340px]`}
                  >
                    <p className={`${meta} ${muted}`}>{study.eyebrow}</p>
                    <p className="font-sans font-light text-[48px] md:text-[56px] lg:text-[64px] leading-none tracking-[-1px] text-primary">{study.metric}</p>
                    <div className="flex flex-col gap-2 flex-1">
                      <h3 className={`${cardTitle} uppercase`}>{study.title}</h3>
                      <p className={body}>{study.description}</p>
                    </div>
                    <Tags items={study.tags} />
                  </motion.article>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ==================== TOOLKIT ==================== */}
      <section id="skills" className={`w-full scroll-mt-28 ${sectionSpacing}`}>
        <div className={container}>
          <FadeIn direction="up">
            <h2 className={`${sectionTitle} mb-8 md:mb-12 lg:mb-16 px-4 md:px-8`}>
              Technical <span className="font-serif italic">Toolkit</span>
            </h2>
          </FadeIn>
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {toolkit.map(([category, technologies]) => (
              <StaggerItem key={category} className="h-full">
                <div className={`${glass} h-full p-6 md:p-8 lg:p-10 flex flex-col gap-6`}>
                  <p className={`${meta} ${muted}`}>{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((technology) => (
                      <span key={technology} className={`${glass} px-3 py-1.5 text-[13px] md:text-[14px] font-chillax text-primary`}>{technology}</span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ==================== CREDENTIALS ==================== */}
      <section className={`w-full ${sectionSpacing}`}>
        <div className={`${container} grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8`}>
          <FadeIn direction="up" className="h-full">
            <div className={`${glass} h-full p-6 md:p-10 lg:p-12`}>
              <p className={`${meta} ${muted} mb-8`}>Certifications</p>
              {certifications.map((item) => (
                <div key={item.title} className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-6 border-b border-[rgba(218,197,167,0.15)] pb-6 mb-6 last:mb-0 last:border-0 last:pb-0">
                  <div>
                    <h3 className={cardTitle}>{item.title}</h3>
                    <p className={`font-chillax text-[14px] leading-[1.6] ${muted} mt-1`}>{item.issuer}</p>
                  </div>
                  <span className={`${meta} ${muted} whitespace-nowrap`}>{item.date}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.15} className="h-full">
            <div className={`${glass} h-full p-6 md:p-10 lg:p-12`}>
              <p className={`${meta} ${muted} mb-8`}>Education</p>
              {education.map((item) => (
                <div key={item.title} className="border-b border-[rgba(218,197,167,0.15)] pb-6 mb-6 last:mb-0 last:border-0 last:pb-0">
                  <h3 className={cardTitle}>{item.title}</h3>
                  <p className={`${meta} ${muted} mt-2`}>{item.issuer}{item.date ? ` · ${item.date}` : ''}</p>
                  {item.detail && <p className={`${body} mt-4`}>{item.detail}</p>}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ==================== CTA (mirrors CTASection) ==================== */}
      <section className="w-full overflow-hidden mt-16">
        <div className="border-t border-[rgba(218,197,167,0.15)]" />
        <div className="bg-[rgba(218,197,167,0.1)] py-[16px] rounded-sm overflow-hidden">
          <div className="flex gap-[32px] animate-scroll-banner whitespace-nowrap">
            {[...Array(50)].map((_, i) => (
              <p key={i} className="text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">
                {i % 2 === 0 ? '+++' : 'Open to roles'}
              </p>
            ))}
          </div>
        </div>
        <div className="border-b border-[rgba(218,197,167,0.15)]" />
      </section>

      <section className="bg-[rgba(218,197,167,0.05)] py-16 md:py-24 lg:py-[160px] px-4 md:px-8 lg:px-[48px] w-full">
        <div className="flex flex-col gap-6 md:gap-8 lg:gap-[32px] items-center">
          <FadeIn direction="up">
            <div className="flex flex-col gap-2 md:gap-[8px] items-center">
              <p className="text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">Let&apos;s connect</p>
              <div className="font-light text-[40px] md:text-[80px] lg:text-[128px] leading-none text-[#dac5a7] text-center">
                <p className="mb-0">{profile.ctaLine1}</p>
                <p className="font-serif italic">{profile.ctaLine2}</p>
              </div>
              <p className={`font-chillax text-[14px] md:text-[18px] lg:text-[20px] leading-[1.7] ${muted} text-center max-w-[90%] md:max-w-[500px]`}>
                {profile.ctaSubtitle}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact?source=recruiter" className="bg-[#dac5a7] px-4 md:px-[16px] py-2 md:py-[10px] rounded-sm flex gap-2 md:gap-[8px] items-center justify-center hover:bg-[#c9b396] transition-colors">
                <span className="text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#0e0e0e]">Get in touch</span>
                <ArrowUpRight color="#0e0e0e" />
              </Link>
              {profile.resumePath && (
                <a href={toDownloadUrl(profile.resumePath)} download="Prateek-Yadav-Resume.pdf" className={`${glass} px-4 md:px-[16px] py-2 md:py-[10px] flex gap-2 items-center justify-center hover:border-[rgba(218,197,167,0.3)] transition-colors`}>
                  <span className="text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-primary">Download CV</span>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 3.75V14.25M9 14.25L4.5 9.75M9 14.25L13.5 9.75" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className={`${glass} px-4 md:px-[16px] py-2 md:py-[10px] flex gap-2 items-center justify-center hover:border-[rgba(218,197,167,0.3)] transition-colors`}>
                  <span className="text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-primary">Email</span>
                  <ArrowUpRight color="#DAC5A7" />
                </a>
              )}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
