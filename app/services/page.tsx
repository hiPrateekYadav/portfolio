'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { getServices, getStats, getLetsTalkContent } from '@/lib/sheetsMappers';
import CTASection from '@/components/CTASection';
import NoiseOverlay from '@/components/NoiseOverlay';
import FadeIn from '@/components/animations/FadeIn';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageData } from '@/hooks/usePageData';

export default function ServicesPage() {
  const { data, loading } = usePageData(() => Promise.all([getServices(), getStats(), getLetsTalkContent()]));
  const [services, stats, letsTalkContent] = data ?? [[], [], null];

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
              <h1 className="font-sans font-light text-[48px] md:text-[80px] lg:text-[128px] leading-none text-primary tracking-[-1px] w-full">
                <span className="block mb-0">Software Dev</span>
                <span className="block font-serif font-light italic">& AI Designing</span>
              </h1>
              <p className="font-chillax font-light text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[rgba(218,197,167,0.6)] max-w-[90%] md:max-w-[600px]">
                Premium web design, development, ai integration and devops services to help your business stand out.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" delay={0.2} immediate>
            <div className="flex gap-4 items-center">
              <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] flex items-center justify-center rounded-full w-[46px] h-[46px]">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 7L10 13L4 7" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-sans font-normal text-[13px] leading-[1.6] text-primary tracking-[1.5px] uppercase">
                My Services
              </p>
            </div>
          </FadeIn>
          <div className="relative w-full h-[300px] md:h-[500px] lg:h-[804px] overflow-hidden">
            <Image 
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/images/services-hero.jpg`}
              alt="Services Hero" 
              fill 
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION STATS */}
      <section className="w-full pt-12 md:pt-20 pb-0 px-4 md:px-8 lg:px-16 flex justify-center">
        <div className="w-full max-w-[1200px] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {stats.length > 0 ? (
            stats.map((stat, index: number) => (
              <FadeIn key={index} direction="up" delay={index * 0.1}>
                <div className="flex flex-col gap-1 items-center text-center uppercase">
                  <p className="font-sans font-normal text-[11px] md:text-[13px] leading-[1.6] text-[rgba(218,197,167,0.6)] tracking-[1.5px] w-full">
                    {stat.label}
                  </p>
                  <p className="font-sans font-light text-[40px] md:text-[56px] lg:text-[64px] leading-[1.1] text-primary w-full">
                    {stat.value}
                  </p>
                </div>
              </FadeIn>
            ))
          ) : (
            <div className="col-span-full text-center text-[rgba(218,197,167,0.6)]">
              <p>Loading statistics...</p>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES SECTIONS */}
      {services.length > 0 ? (
        services.map((service, index: number) => (
          <section 
            key={service?.id ?? index}
            className={`w-full ${index === 0 ? 'pt-20 md:pt-40' : 'pt-8'} ${index === services.length - 1 ? 'pb-20 md:pb-40' : 'pb-0'} px-4 md:px-8 lg:px-0 flex flex-col items-center`}
          >
            <div className="w-full max-w-[1200px] flex flex-col">
              <FadeIn direction="up" delay={0.1}>
                <div className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-6 md:p-12 lg:p-16 flex flex-col gap-8 md:gap-12 w-full">
                  <div className="flex flex-col gap-4 text-primary">
                    <p className="font-sans font-normal text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-center">
                      {service.shortTitle}
                    </p>
                    <p className="font-sans font-light text-[32px] md:text-[48px] lg:text-[64px] leading-[1.1] w-full whitespace-pre-wrap">
                      {service.title}
                    </p>
                  </div>
                  {service.image && (
                    <div className="bg-dark border border-[rgba(218,197,167,0.15)] rounded-sm h-[300px] md:h-[500px] lg:h-[804px] w-full relative overflow-hidden">
                      <Image 
                        src={service.image}
                        alt={service.shortTitle}
                        fill 
                        className="object-cover"
                        unoptimized
                      />
                      <NoiseOverlay className="opacity-[0.07]" />
                    </div>
                  )}
                  <div className="flex flex-col gap-8 md:gap-12 w-full">
                    {service.details.map((detail, detailIndex) => (
                      <Fragment key={detailIndex}>
                        <FadeIn direction="up" delay={detailIndex * 0.1}>
                          <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
                            <p className="font-sans font-normal pt-[4px] text-[11px] md:text-[13px] leading-[1.6] text-primary tracking-[1.5px] uppercase md:w-[250px]">
                              {detail.label}
                            </p>
                            <p className="flex-1 font-chillax text-[14px] md:text-[16px] leading-[1.8] text-[rgba(218,197,167,0.6)] whitespace-pre-wrap">
                              {detail.text}
                            </p>
                          </div>
                        </FadeIn>
                        {detailIndex < service.details.length - 1 && (
                          <div className="bg-[rgba(218,197,167,0.15)] h-px w-full" />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        ))
      ) : (
        <section className="w-full pt-20 pb-20 px-4 text-center">
          <div className="text-[rgba(218,197,167,0.6)]">
            <p>Loading services...</p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection content={letsTalkContent} />
    </div>
  );
}
