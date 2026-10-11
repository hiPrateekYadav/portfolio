'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getWorks, getLetsTalkContent } from '@/lib/sheetsMappers';
import CTASection from '@/components/CTASection';
import NoiseOverlay from '@/components/NoiseOverlay';
import FadeIn from '@/components/animations/FadeIn';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageData } from '@/hooks/usePageData';

export default function WorkPage() {
  const { data, loading } = usePageData(() => Promise.all([getWorks(), getLetsTalkContent()]));
  const [works, letsTalkContent] = data ?? [[], null];

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-dark min-h-screen">
      {/* SECTION HERO */}
      <section className="w-full pt-32 md:pt-56 pb-0 px-4 md:px-0 flex flex-col gap-4 items-center">
        <div className="w-full max-w-[1400px] flex flex-col gap-8 md:gap-16 items-center">
          <FadeIn direction="up" immediate>
            <div className="flex flex-col gap-4 items-center text-center">
              <h1 className="font-sans font-light text-[48px] md:text-[80px] lg:text-[128px] leading-none text-primary w-full">
                Work
              </h1>
              <p className="font-chillax font-light text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[rgba(218,197,167,0.6)] max-w-[90%] md:max-w-[600px]">
                My latest web projects, see how we can help bring your ideas to life.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION WORK */}
      <section className="w-full pt-12 md:pt-24 pb-20 md:pb-40 px-4 md:px-8 lg:px-16 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-[1400px]">
          {works.map((project, index: number) => (
            <FadeIn key={project?.slug ?? index} direction="up" delay={index * 0.08} immediate={index < 2} className="w-full">
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm overflow-hidden">
                  <div className="relative h-[220px] md:h-[320px] lg:h-[420px] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain"
                      priority={index === 0}
                      unoptimized
                    />
                    <NoiseOverlay className="opacity-[0.07]" />
                    <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm px-3 md:px-4 py-2 md:py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <p className="font-sans font-light text-[18px] md:text-[20px] lg:text-[24px] leading-[1.3] tracking-[1px] text-primary">
                        {project.client?.trim() || project.title}
                      </p>
                      <p className="font-sans font-normal text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-primary">
                        {project.category}
                      </p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-full w-[46px] h-[46px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection content={letsTalkContent} />
    </div>
  );
}
