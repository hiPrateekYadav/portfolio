'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSocials, type Social } from '@/lib/sheetsMappers';
import { useLoading } from '@/contexts/LoadingContext';
import { useAudience } from '@/hooks/useAudience';
import { audienceHome, withAudience } from '@/lib/audience';
import SocialIcon from '@/components/icons/SocialIcon';

/** Site footer: social links, audience-aware page links and a scroll-to-top button. */
const Footer = () => {
  const { loading } = useLoading();
  const audience = useAudience();
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    let mounted = true;
    getSocials()
      .then((data) => {
        if (mounted) setSocials(data);
      })
      .catch((error) => console.error('Failed to fetch socials sheet', error));
    return () => { mounted = false };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't render footer while loading
  if (loading) return null;

  return (
    <footer className="bg-dark border-t border-[rgba(218,197,167,0.15)]">
      <div className="border-t border-[rgba(218,197,167,0.15)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 lg:px-32 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-16">
            {/* Brand */}
            <div>
              <h3 className="text-[16px] font-sans font-normal text-primary mb-8">prateek.</h3>
              <div className="flex flex-col gap-4">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors"
                  >
                    <span className="w-5 h-5 flex items-center justify-center"><SocialIcon name={s.icon} /></span>
                    {s.name.toUpperCase()}
                  </a>
                ))}
                {socials.length === 0 && (
                  <p className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.4)]">Loading socials...</p>
                )}
              </div>
            </div>

            {/* Pages */}
            <div>
              <h4 className="text-[13px] text-primary uppercase tracking-[1.5px] mb-8 font-normal">Pages</h4>
              <div className="flex flex-col gap-4">
                <Link href={audienceHome(audience)} className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors">
                  HOME
                </Link>
                <Link href={audience === 'recruiter' ? '/#experience' : '/services'} className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors">
                  {audience === 'recruiter' ? 'EXPERIENCE' : 'SERVICES'}
                </Link>
                <Link href={audience === 'recruiter' ? '/#skills' : '/about'} className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors">
                  {audience === 'recruiter' ? 'SKILLS' : 'ABOUT'}
                </Link>
                <Link href={`/contact?source=${audience}`} className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors">
                  CONTACT
                </Link>
              </div>
            </div>

            {/* CMS */}
            <div>
              <h4 className="text-[13px] text-primary uppercase tracking-[1.5px] mb-8 font-normal">CMS</h4>
              <div className="flex flex-col gap-4">
                {audience === 'client' && (
                  <Link href="/work" className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors">
                    WORK
                  </Link>
                )}
                <Link href={withAudience('/blog', audience)} className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors">
                  BLOG
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-[rgba(218,197,167,0.15)] flex flex-col md:flex-row justify-center items-center gap-4">
            <button
              onClick={scrollToTop}
              className="text-[13px] font-chillax font-normal text-[rgba(218,197,167,0.6)] hover:text-primary transition-colors flex items-center gap-2"
            >
              TO TOP
              <div className="w-6 h-6 rounded-full border border-[rgba(218,197,167,0.15)] bg-[rgba(218,197,167,0.05)] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9V3M6 3L3 6M6 3L9 6" stroke="#DAC5A7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
