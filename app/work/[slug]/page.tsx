'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getWorks, getLetsTalkContent } from '@/lib/sheetsMappers';
import CTASection from '@/components/CTASection';
import NoiseOverlay from '@/components/NoiseOverlay';
import FadeIn from '@/components/animations/FadeIn';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageData } from '@/hooks/usePageData';

export default function WorkSinglePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = usePageData(() => Promise.all([getWorks(), getLetsTalkContent()]), [slug]);
  const [works, letsTalkContent] = data ?? [[], null];
  const work = works.find((w) => w.slug === slug);

  if (!work) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      {/* Section Hero */}
      <section className="pt-32 md:pt-44 lg:pt-56 pb-0 px-4 md:px-8 lg:px-0 w-full">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 md:gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 md:gap-10 lg:gap-12 items-center">
            {/* Title and Description */}
            <FadeIn direction="up" immediate>
              <div className="flex flex-col gap-3 md:gap-4 items-center text-center">
                <h1 className="font-sans font-light text-[48px] md:text-[80px] lg:text-[128px] leading-none text-[#dac5a7]">
                  {work.title}
                </h1>
                <p className="font-chillax text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[rgba(218,197,167,0.6)] max-w-[90%] md:max-w-[600px]">
                  {work.description}
                </p>
              </div>
            </FadeIn>

            {/* Meta Cards */}
            <FadeIn direction="up" delay={0.2} immediate>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full max-w-[1000px]">
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-3 md:p-4 flex flex-col gap-1 items-center">
                  <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] opacity-60">
                    Client
                  </p>
                  <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">
                    {work.client}
                  </p>
                </div>
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-3 md:p-4 flex flex-col gap-1 items-center">
                  <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] opacity-60">
                    Timeline
                  </p>
                  <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">
                    {work.timeline}
                  </p>
                </div>
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-3 md:p-4 flex flex-col gap-1 items-center">
                  <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] opacity-60">
                    Services
                  </p>
                  {work.services && work.services.length > 0 ? (
                    <ul className="list-disc list-inside font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] text-center">
                      {work.services.map((service, index) => (
                        <li key={`${service}-${index}`}>{service}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] text-center">
                      N/A
                    </p>
                  )}
                </div>
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-3 md:p-4 flex flex-col gap-1 items-center">
                  <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] opacity-60">
                    Website
                  </p>
                  {work.website && work.website.trim() !== '' ? (
                    <a
                      href={work.website.startsWith('http') ? work.website : `https://${work.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] hover:opacity-80 transition-opacity text-center"
                    >
                      {work.website}
                    </a>
                  ) : (
                    <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7] text-center">
                      N/A
                    </p>
                  )}
                </div>
              </div>
            </FadeIn>

            {/* More Details */}
            <FadeIn direction="up" delay={0.3} immediate>
              <div className="flex gap-3 md:gap-4 items-center">
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-full w-[46px] h-[46px] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M10 4.16666V15.8333M10 15.8333L15.8333 10M10 15.8333L4.16666 10"
                      stroke="#DAC5A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">
                  More Details
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Hero Image */}
          <div className="border border-[rgba(218,197,167,0.15)] rounded-sm w-full aspect-[4/3] relative overflow-hidden">
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-contain"
              unoptimized
              priority
            />
            <NoiseOverlay />
          </div>
        </div>
      </section>

      {/* Section About */}
      <section className="pt-12 md:pt-16 lg:pt-20 pb-12 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-16 w-full flex justify-center">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-[100px] w-full max-w-[1400px]">
          {/* Left Column */}
          <div className="w-full lg:w-[500px] flex flex-col gap-2">
            <FadeIn direction="up">
              <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[rgba(218,197,167,0.6)]">
                {work.about.sectionTitle}
              </p>
              <h2 className="font-sans font-light text-[28px] md:text-[32px] lg:text-[40px] leading-[1.1] text-[#dac5a7]">
                {work.about.sectionSubtitle}
              </h2>
            </FadeIn>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[900px] flex flex-col gap-4 md:gap-6">
            {work.about.cards.map((card, index) => (
              <FadeIn key={index} direction="up" delay={index * 0.1}>
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-6 md:p-8 lg:p-8 flex flex-col gap-3">
                  <h3 className="font-sans font-light text-[18px] md:text-[20px] leading-[1.3] tracking-[1px] text-[#dac5a7]">
                    {card.title}
                  </h3>
                  <p className="font-chillax text-[14px] md:text-[15px] leading-[1.7] text-[rgba(218,197,167,0.6)]">
                    {card.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection content={letsTalkContent} />
    </div>
  );
}
