'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { getLogos, getServices, getProcessSteps, getWorks, getTestimonials, getLetsTalkContent, type ProcessStep, type Testimonial } from '@/lib/sheetsMappers';
import CTASection from '@/components/CTASection';
import NoiseOverlay from '@/components/NoiseOverlay';
import FadeIn from '@/components/animations/FadeIn';
import ParallaxSection from '@/components/animations/ParallaxSection';
import RevealText from '@/components/animations/RevealText';
import StaggerChildren, { StaggerItem } from '@/components/animations/StaggerChildren';
import HoverCard from '@/components/animations/HoverCard';
import MagneticButton from '@/components/animations/MagneticButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageData } from '@/hooks/usePageData';

const glass = 'backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm';

function ProcessCard({ step }: { step: ProcessStep }) {
  return (
    <div className={`relative ${glass} p-12 mb-12`}>
      <div className={`absolute top-5 right-5 ${glass} px-2 py-1`}>
        <span className="text-[12px] font-chillax text-primary uppercase">{step.duration}</span>
      </div>
      <div className="mb-8">
        <p className="text-[13px] text-[rgba(218,197,167,0.6)] uppercase tracking-[1.5px] mb-1 font-normal">{step.subtitle}</p>
        <h3 className="text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-primary mb-4">{step.title}</h3>
        <p className="text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)] mb-8">{step.description}</p>
      </div>
      <BulletList points={step.points} />
    </div>
  );
}

function BulletList({ points }: { points: string[] }) {
  return (
    <div className="space-y-4">
      {points.map((point, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <svg className="w-[6px] h-[6px] shrink-0 mt-2.5" viewBox="0 0 6 6" fill="none" aria-hidden="true">
            <circle cx="3" cy="3" r="3" fill="rgba(218,197,167,0.6)" />
          </svg>
          <span className="text-[16px] font-chillax leading-[1.8] text-primary">{point}</span>
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className={`flex-1 ${glass} p-6 md:p-10 lg:p-12 flex flex-col`}>
      <Image src={t.logoSrc} alt="Company logo" width={t.logoWidth} height={t.logoHeight} className="mb-6 md:mb-8" unoptimized />
      <div className="mb-6 md:mb-8 flex-1">
        <h3 className="text-[20px] md:text-[22px] lg:text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-primary mb-2">{t.title}</h3>
        <p className="text-[14px] md:text-[15px] lg:text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)]">{t.text}</p>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
          <Image src={t.authorPhotoSrc} alt={t.authorName} width={60} height={60} className="object-cover" />
        </div>
        <div>
          <p className="text-[13px] text-primary uppercase tracking-[1.5px] font-normal leading-[1.6]">{t.authorName}</p>
          <p className="text-[14px] font-chillax font-light leading-[1.6] text-[rgba(218,197,167,0.6)]">{t.authorCompany}</p>
        </div>
      </div>
    </div>
  );
}

/** Freelance-client homepage: hero, logos, services, selected work, process, testimonials and about. */
export default function ClientHome() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const { data, loading } = usePageData(() =>
    Promise.all([getLogos(), getServices(), getProcessSteps(), getWorks(), getTestimonials(), getLetsTalkContent()])
  );
  const [logos, services, processSteps, works, testimonialItems, letsTalkContent] = data ?? [[], [], [], [], [], null];

  // Hero section scroll progress - conditionally attach
  const { scrollYProgress } = useScroll(
    loading ? {} : {
      target: heroRef,
      offset: ['start start', 'end start'],
    }
  );

  // About section scroll progress - conditionally attach
  const { scrollYProgress: aboutScrollProgress } = useScroll(
    loading ? {} : {
      target: aboutRef,
      offset: ['start end', 'end start'],
    }
  );

  // Parallax transforms for hero elements
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  // Parallax transforms for about section names
  const leftNameX = useTransform(aboutScrollProgress, [0, 0.6], [-300, -420]);
  const rightNameX = useTransform(aboutScrollProgress, [0, 0.6], [300, 420]);

  return (
    <div className="bg-dark min-h-screen">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
      {/* ==================== HERO SECTION ==================== */}
      {/* Full-height section with animated profile and scrolling text */}
      <section ref={heroRef} className="relative h-[700px] md:h-[900px] lg:h-[1130px] w-full overflow-hidden flex flex-col items-center justify-end">
        {/* Background Profile Image - Fades and scales out on scroll */}
        <div 
          className="absolute left-1/2 top-[80px] md:top-[100px] lg:top-[130px] w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] -translate-x-1/2 mix-blend-lighten opacity-80"
        >
          <Image
            src="/images/hero-profile.png"
            alt="Profile"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content - Moves up with parallax effect on scroll */}
        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 flex flex-col items-center gap-6 md:gap-10 lg:gap-12 pb-[60px] md:pb-[90px] lg:pb-[117px] px-4"
        >
          <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
            {/* Main Heading */}
            <RevealText immediate>
              <h1 className="text-[40px] md:text-[60px] lg:text-[80px] leading-none tracking-[-1px] antialiased" style={{ fontWeight: 300, WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' }}>
                <div className="font-sans text-primary" style={{ fontWeight: 100 }}>Software Developer</div>
                <div className="font-serif italic text-primary" style={{ fontWeight: 100 }}>DevOps Engineer | AI Engineer</div>
              </h1>
            </RevealText>

            {/* Subtitle */}
            <FadeIn delay={0.3} direction="up" immediate>
              <p className="font-chillax font-light text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[rgba(218,197,167,0.6)] max-w-[90%] md:max-w-[500px] lg:max-w-[600px] text-center">
                Building, Automating &amp; Scaling Intelligent Software Solutions. From Concept to Cloud: Reliable, Automated.
              </p>
            </FadeIn>
          </div>

          {/* Scroll Down Indicator */}
          <FadeIn delay={0.5} direction="up">
            <div className="flex items-center gap-4">
              <MagneticButton>
                <div className="w-[46px] h-[46px] rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 3.75V16.25M10 16.25L5 11.25M10 16.25L15 11.25" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </MagneticButton>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* ==================== LOGO CAROUSEL ==================== */}
      {/* Infinite scrolling animation of client logos */}
      <ParallaxSection speed={-0.3}>
        <section className="w-full pt-10 pb-20 overflow-hidden">
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

      {/* ==================== SERVICES SECTION ==================== */}
      {/* Grid of service cards with hover effects */}
      <section className="w-full pt-20 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
          <StaggerChildren key={services.length} staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <StaggerItem key={service?.id ?? idx}>
                <HoverCard>
                  <Link href={service?.id ? `/services#${service.id}` : '#'}>
                    <motion.div
                      whileHover={{ borderColor: 'rgba(218,197,167,0.3)' }}
                      transition={{ duration: 0.3 }}
                      className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-8 md:p-10 lg:p-12 flex flex-col gap-6 md:gap-8 h-auto min-h-[280px] md:min-h-[280px] lg:min-h-[314px] cursor-pointer"
                    >
                      <div className="flex flex-col gap-2 flex-1">
                          <p className="text-[13px] text-[rgba(218,197,167,0.6)] uppercase tracking-[1.5px] font-normal">{service.number}</p>
                          <h3 className="text-[20px] md:text-[22px] lg:text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-primary uppercase">{service.shortTitle}</h3>
                          <p className="text-[14px] md:text-[15px] lg:text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)]">
                            {service.description}
                          </p>
                        </div>
                      <div className="flex items-center gap-3 mt-auto flex-shrink-0">
                        <MagneticButton strength={0.15}>
                          <div className="w-8 h-8 rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </MagneticButton>
                        <p className="text-[13px] text-primary uppercase tracking-[1.5px] font-normal">About {service.shortTitle}</p>
                      </div>
                    </motion.div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ==================== SELECTED WORK SECTION ==================== */}
      {/* Showcase of featured projects */}
      <section className="w-full pt-20 md:pt-32 lg:pt-40 pb-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
          {/* Header */}
          <FadeIn direction="up">
            <div className="flex items-center justify-between mb-8 md:mb-12 lg:mb-16 px-4 md:px-8">
              <h2 className="font-sans font-light text-[40px] md:text-[52px] lg:text-[64px] leading-[1.1] tracking-[-1px]">
                <span className="text-primary">Selected </span>
                <span className="font-serif italic">Work</span>
              </h2>
              <div className="hidden md:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9H14M14 9L10 5M14 9L10 13" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <Link href="/work">
                  <p className="text-[13px] text-primary uppercase tracking-[1.5px] font-normal">See all</p>
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* Work Grid - Responsive (from Sheets) */}
          <StaggerChildren key={works.length} staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {works.slice(0, 4).map((w) => (
              <StaggerItem key={w.slug}>
                <HoverCard>
                  <Link href={`/work/${w.slug}`} className="group relative w-full aspect-[4/3] rounded-sm border border-[rgba(218,197,167,0.15)] overflow-hidden block">
                    <Image
                      src={w.thumbnail || w.image}
                      alt={w.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                    <NoiseOverlay />
                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 backdrop-blur-[15px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)] rounded-sm px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
                      <p className="text-[20px] md:text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-primary">{w.client?.trim() || w.title}</p>
                      <p className="text-[12px] md:text-[13px] text-primary uppercase tracking-[1.5px] font-normal">{w.category}</p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[46px] h-[46px] rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* SECTION PROCESS - Responsive */}
      <section className="w-full pt-20 md:pt-32 lg:pt-40 pb-16">
        {/* Process Header */}
        <FadeIn direction="up">
          <div className="max-w-[710px] mx-auto text-center mb-12 px-4">
            <p className="text-[13px] text-primary uppercase tracking-[1.5px] mb-4 font-normal">THE PROCESS</p>
            <h2 className="text-[48px] md:text-[80px] lg:text-[128px] leading-none tracking-[-1px] mb-6">
              <div className="font-sans font-light text-primary">Your Website</div>
              <div className="font-serif font-light italic text-primary">in {processSteps.length} steps</div>
            </h2>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] font-chillax leading-[1.7] text-[rgba(218,197,167,0.6)] max-w-[90%] md:max-w-[500px] mx-auto mb-12">
              Our process ensures that we create a website tailored to your business needs.
            </p>
            <div className="w-[46px] h-[46px] rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center mx-auto">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3.75V16.25M10 16.25L5 11.25M10 16.25L15 11.25" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </FadeIn>

        {/* Vertical line before steps */}
        <div className="flex justify-center mb-0">
          <div className="w-px h-12 md:h-20 lg:h-24 bg-[rgba(218,197,167,0.15)]"></div>
        </div>

        {/* Process Steps Container - Mobile: Simple cards, Desktop: Alternating timeline */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {processSteps.map((step, index) => (
              <FadeIn key={step?.number ?? index} direction="up" delay={index * 0.1}>
                <div className="relative backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-12">
                  {/* Step Number - Top Left */}
                  <div className="absolute top-6 left-6 w-10 h-10 rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center">
                    <span className="text-[13px] text-primary uppercase tracking-[1.5px] font-normal">{step.number}</span>
                  </div>
                  
                  {/* Duration Badge - Top Right */}
                  <div className="absolute top-6 right-6 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm px-2 py-1">
                    <span className="text-[12px] font-chillax text-primary uppercase">{step.duration}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="mt-12">
                    <div className="mb-4">
                      <p className="text-[13px] text-[rgba(218,197,167,0.6)] uppercase tracking-[1.5px] mb-1 font-normal">{step.subtitle}</p>
                      <h3 className="text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-primary mb-4">{step.title}</h3>
                    </div>
                    <p className="text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)] mb-8">
                      {step.description}
                    </p>
                  
                    <BulletList points={step.points} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Desktop Layout - Alternating Timeline */}
          <div className="hidden lg:block">
            {processSteps.map((step, index) => (
              <div key={step?.number ?? index} className="grid grid-cols-[1fr_40px_1fr] gap-20 -mt-12">
                {step.side === 'right' ? <div /> : (
                  <FadeIn direction="up" delay={index * 0.1}>
                    <ProcessCard step={step} />
                  </FadeIn>
                )}

                <div className="flex flex-col items-center">
                  <div className="w-px h-[181.5px] bg-[rgba(218,197,167,0.15)]"></div>
                  <div className="w-10 h-10 rounded-full backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center">
                    <span className="text-[13px] text-primary uppercase tracking-[1.5px] font-normal">{step.number}</span>
                  </div>
                  <div className={`w-px flex-1 bg-[rgba(218,197,167,0.15)] ${index === processSteps.length - 1 ? 'h-[181.5px]' : ''}`}></div>
                </div>
                
                {step.side === 'left' ? <div /> : (
                  <FadeIn direction="up" delay={index * 0.1}>
                    <ProcessCard step={step} />
                  </FadeIn>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS SECTION ==================== */}
      {/* Client testimonials and feedback (from Google Sheets) */}
      <section className="w-full pt-20 md:pt-32 lg:pt-40 pb-16">
        <FadeIn direction="up">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 text-center mb-12 md:mb-16">
            <h2 className="text-[48px] md:text-[72px] lg:text-[96px] leading-none tracking-[-1px] mb-4 md:mb-6">
              <div className="font-sans font-light text-primary">What my</div>
              <div className="font-serif font-light italic text-primary">clients say</div>
            </h2>
            <p className="text-[16px] md:text-[17px] lg:text-[18px] font-chillax leading-[1.6] text-[rgba(218,197,167,0.6)] max-w-[90%] md:max-w-[600px] mx-auto">
              See what my clients have to say about working with me and the results I helped them achieve.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16">
          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {testimonialItems.length > 0 && (
              <>
                <div className="flex flex-col gap-6 md:gap-8">
                  {testimonialItems.slice(0, 3).map((t, i) => <TestimonialCard key={`left-${i}`} testimonial={t} />)}
                </div>
                <div className="flex flex-col gap-6 md:gap-8">
                  {testimonialItems.slice(3, 6).map((t, i) => <TestimonialCard key={`right-${i}`} testimonial={t} />)}
                </div>
              </>
            )}
          </StaggerChildren>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      {/* Profile section with parallax name animations */}
      <section ref={aboutRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background Profile Image */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[50px] md:top-[80px] w-[280px] md:w-[500px] lg:w-[700px] h-[245px] md:h-[437px] lg:h-[612px] mix-blend-lighten opacity-80">
          <Image
            src="/images/hero-profile.png"
            alt="Profile"
            fill
            className="object-cover"
          />
        </div>

        {/* Left Name - Hidden on mobile */}
        <motion.div
          className="hidden xl:block absolute left-[220px] top-[350px] -translate-x-1/2"
          style={{ x: leftNameX }}
        >
          <h2 className="text-[96px] xl:text-[128px] leading-none tracking-[-1px] text-center whitespace-nowrap">
            <span className="font-sans font-light text-primary">Prateek </span>
            <span className="font-serif font-light italic text-primary">Yadav</span>
          </h2>
        </motion.div>

        {/* Right Name - Hidden on mobile */}
        <motion.div
          className="hidden xl:block absolute right-[220px] top-[350px] translate-x-1/2"
          style={{ x: rightNameX }}
        >
          <h2 className="text-[96px] xl:text-[128px] leading-none tracking-[-1px] text-center whitespace-nowrap">
            <span className="font-sans font-light text-primary">Prateek </span>
            <span className="font-serif font-light italic text-primary">Yadav</span>
          </h2>
        </motion.div>

        {/* About Content */}
        <FadeIn direction="up" delay={0.4}>
          <div className="max-w-[1200px] mx-auto px-6 md:px-16 relative z-10 mt-[280px] md:mt-[350px] lg:mt-[500px]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16 items-start">
            <div className="font-sans font-light text-[28px] md:text-[36px] lg:text-[48px] leading-[1.1] text-primary w-full md:w-[45%] lg:w-[568px]">
              <div>A website that leaves </div>
              <div className="font-serif italic">a lasting impression!</div>
            </div>
            <div className="w-full md:w-[55%] lg:w-[568px] flex flex-col gap-4 md:gap-6">
              <p className="text-[14px] md:text-[16px] lg:text-[18px] font-chillax leading-[1.6] text-[rgba(218,197,167,0.6)]">
                Hi, I&apos;m Prateek Yadav - a professional specializing in premium AI web designing, development, and devops services. I&apos;m passionate about creating unique and effective solutions for my clients, and I bring a personal touch to every project. Let&apos;s work together to bring your vision to life!
              </p>
            </div>
          </div>
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <CTASection content={letsTalkContent} source="client" />
        </>
      )}
    </div>
  );
}
