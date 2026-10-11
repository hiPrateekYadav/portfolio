'use client';

import Image from 'next/image';
import { getAbout, getSkills, getSocials, getLetsTalkContent } from '@/lib/sheetsMappers';
import CTASection from '@/components/CTASection';
import NoiseOverlay from '@/components/NoiseOverlay';
import SocialIcon from '@/components/icons/SocialIcon';
import FadeIn from '@/components/animations/FadeIn';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageData } from '@/hooks/usePageData';

export default function AboutPage() {
  const { data } = usePageData(() => Promise.all([getAbout(), getSkills(), getSocials(), getLetsTalkContent()]));

  if (!data) {
    return <LoadingScreen />;
  }

  const [aboutContent, skills, socials, letsTalkContent] = data;

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      {/* Section About */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[224px] pb-[80px] md:pb-[120px] lg:pb-[160px] px-4 md:px-8 lg:px-0 w-full flex justify-center">
        <div className="flex flex-col lg:flex-row gap-[5px] md:gap-[60px] lg:gap-[80px] w-full max-w-[1400px] lg:w-[1400px]">
          {/* Left Column - Profile Image */}
          <div className="flex-1 flex items-start justify-center lg:justify-start">
            <div className="w-full max-w-[500px] lg:w-[650px] aspect-[520/590] lg:h-[520px] relative mix-blend-lighten lg:sticky lg:top-[130px] overflow-hidden">
              <Image
                src="/images/hero-profile.png"
                alt={aboutContent.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-[800px] pt-0 lg:pt-[64px] flex flex-col gap-[64px] md:gap-[96px] lg:gap-[128px]">
            {/* Hero Section */}
            <div className="flex flex-col gap-[32px] md:gap-[48px] lg:gap-[64px]">
              <FadeIn direction="up" delay={0} immediate>
              <div className="flex flex-col gap-[12px] md:gap-[16px]">
                <div className="font-sans font-light text-[48px] md:text-[80px] lg:text-[128px] leading-none text-[#dac5a7] tracking-[-1px]">
                  <p className="mb-0">Prateek</p>
                  <p className="font-serif italic">Yadav</p>
                </div>
                <p className="font-chillax font-light text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[rgba(218,197,167,0.6)] w-full max-w-[600px] lg:w-[600px]">
                  {aboutContent.subtitle}
                </p>
              </div>
              </FadeIn>

              <FadeIn direction="up" delay={0.2} immediate>
              <div className="flex gap-[12px] md:gap-[16px] items-center">
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-full w-[40px] h-[40px] md:w-[46px] md:h-[46px] flex items-center justify-center">
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
                  About Me
                </p>
              </div>
              </FadeIn>
            </div>

            {/* Bio Card */}
            <div className="flex flex-col gap-[12px] md:gap-[16px]">
              <FadeIn direction="up" delay={0} immediate>
              <div className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[24px] md:p-[36px] lg:p-[48px] flex flex-col gap-[12px] md:gap-[16px]">
                <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[rgba(218,197,167,0.6)]">
                  {aboutContent.name}
                </p>
                <div className="flex flex-col gap-[12px] md:gap-[16px]">
                  <h2 className="font-sans font-light text-[24px] md:text-[36px] lg:text-[48px] leading-[1.1] text-[#dac5a7]">
                    {aboutContent.bio.heading}
                  </h2>
                  <div className="font-chillax text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] text-[rgba(218,197,167,0.6)] flex flex-col gap-[12px] md:gap-[16px]">
                    {aboutContent.bio.paragraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* About Image */}
                  <div className="border border-[rgba(218,197,167,0.15)] rounded-sm h-[250px] md:h-[350px] lg:h-[417px] w-full relative overflow-hidden mt-[12px] md:mt-[16px]">
                    <Image
                      src={aboutContent.image}
                      alt="About"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <NoiseOverlay className="opacity-[0.07]" />
                  </div>
                </div>
              </div>
              </FadeIn>

              {/* Social Links */}
              <FadeIn direction="up" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[12px] md:gap-[16px]">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm px-[16px] md:px-[20px] lg:px-[24px] py-[12px] md:py-[14px] lg:py-[16px] flex items-center justify-between hover:bg-[rgba(218,197,167,0.08)] transition-colors"
                  >
                    <div className="flex gap-[12px] md:gap-[16px] items-center">
                      <div className="scale-75 md:scale-90 lg:scale-100"><SocialIcon name={social.icon} /></div>
                      <p className="font-sans text-[11px] md:text-[12px] lg:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[#dac5a7]">
                        {social.name}
                      </p>
                    </div>
                    <svg width="14" height="14" className="md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px]" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 12.5L12.5 3.5M12.5 3.5H3.5M12.5 3.5V12.5"
                        stroke="#DAC5A7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
              </FadeIn>

              {/* Skills Card */}
              <FadeIn direction="up" delay={0.3}>
              <div className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[24px] md:p-[36px] lg:p-[48px] flex flex-col gap-[24px] md:gap-[28px] lg:gap-[32px]">
                <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase text-[rgba(218,197,167,0.6)]">
                  Skills
                </p>
                <div className="flex flex-col gap-[20px] md:gap-[24px]">
                  {skills.map((skill, index) => (
                    <div key={skill.name}>
                      <div className="flex gap-[24px] md:gap-[36px] lg:gap-[48px] items-center justify-between text-[#dac5a7]">
                        <p className="flex-1 font-sans font-light text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] tracking-[1px]">
                          {skill.name}
                        </p>
                        <p className="font-sans text-[11px] md:text-[13px] leading-[1.6] tracking-[1.5px] uppercase">
                          {skill.year}
                        </p>
                      </div>
                      {index < skills.length - 1 && (
                        <div className="bg-[rgba(218,197,167,0.15)] h-px w-full mt-[20px] md:mt-[24px]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection content={letsTalkContent} />
    </div>
  );
}
