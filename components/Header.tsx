'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import { useAudience } from '@/hooks/useAudience';
import { audienceHome, withAudience } from '@/lib/audience';
import { getRecruiterContent } from '@/lib/sheetsMappers';
import { toDownloadUrl } from '@/lib/downloadUrl';

/**
 * Floating glass navigation bar. Links switch between the recruiter and client
 * portfolios based on the current audience; the recruiter homepage also gets a CV download.
 */
const Header = () => {
  const pathname = usePathname();
  const audience = useAudience();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [resumePath, setResumePath] = useState('');
  const { loading } = useLoading();
  // The mobile menu closes automatically when the route changes
  const isOpen = openPath === pathname;

  useEffect(() => {
    if (pathname !== '/') return;
    let mounted = true;
    getRecruiterContent()
      .then(({ profile }) => {
        if (mounted) setResumePath(profile.resumePath);
      })
      .catch((error) => console.error('Failed to load recruiter resume link', error));
    return () => { mounted = false; };
  }, [pathname]);

  // Don't render header while loading
  if (loading) return null;

  // Navigation menu items
  // Recruiters never see client-only pages; off the homepage, anchors point back to it
  const anchorBase = pathname === '/' ? '' : '/';
  const navItems = audience === 'recruiter'
    ? [
        { name: 'Experience', href: `${anchorBase}#experience` },
        { name: 'Work', href: `${anchorBase}#work` },
        { name: 'Skills', href: `${anchorBase}#skills` },
        { name: 'Blog', href: withAudience('/blog', 'recruiter') },
      ]
    : [
        { name: 'Services', href: '/services' },
        { name: 'Work', href: '/work' },
        { name: 'About', href: '/about' },
        { name: 'Blog', href: withAudience('/blog', audience) },
      ];
  const recruiterHome = pathname === '/' && audience === 'recruiter';

  return (
    <header className="fixed inset-x-0 mx-auto top-6 md:top-12 z-50 w-[calc(100%-1rem)] md:w-fit">
      <div className="flex items-center justify-between md:justify-center gap-2 sm:gap-4 md:gap-8 rounded-sm border border-border bg-bg-glass px-3 sm:px-4 md:px-6 py-3 md:py-3 backdrop-blur-15">
        {/* Logo */}
        <Link href={audienceHome(audience)} className="flex min-w-0 items-center">
          <span className="whitespace-nowrap font-sans text-[18px] sm:text-[20px] md:text-[20px] font-light tracking-tight text-primary">
            prateek.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="flex items-start gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-sans text-meta uppercase text-primary transition-opacity hover:opacity-80"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link
            href={`/contact?source=${audience}`}
            className="flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-2.5 font-sans text-meta uppercase text-text-inverse transition-opacity hover:opacity-90"
          >
            Let&apos;s Talk
          </Link>
          {recruiterHome && resumePath && (
            <a
              href={toDownloadUrl(resumePath)}
              download="Prateek-Yadav-Resume.pdf"
              aria-label="Download CV"
              title="Download CV"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-sm border border-border bg-dark-100 text-primary transition-colors hover:bg-dark-200"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3.5V11.5M9 11.5L5.75 8.25M9 11.5L12.25 8.25M4 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </nav>

        {/* Mobile Right Section */}
        <div className="md:hidden flex items-center gap-2 sm:gap-3">
          {/* Mobile Contact Button */}
          <Link
            href={`/contact?source=${audience}`}
            className="flex items-center justify-center gap-2 rounded-sm bg-primary px-3 sm:px-4 py-2.5 font-sans text-[12px] sm:text-[13px] uppercase text-text-inverse transition-opacity hover:opacity-90 whitespace-nowrap"
          >
            Let&apos;s Talk
          </Link>
          {recruiterHome && resumePath && (
            <a
              href={toDownloadUrl(resumePath)}
              download="Prateek-Yadav-Resume.pdf"
              aria-label="Download CV"
              title="Download CV"
              className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-sm border border-border bg-dark-100 text-primary"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 3.5V11.5M9 11.5L5.75 8.25M9 11.5L12.25 8.25M4 14.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpenPath(isOpen ? null : pathname)}
            className="text-primary"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="absolute left-0 right-0 top-full mt-4 flex flex-col gap-4 rounded-sm border border-border bg-[#1A1A1A] px-8 py-6 backdrop-blur-15 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-sans text-meta uppercase text-primary transition-opacity hover:opacity-80"
                onClick={() => setOpenPath(null)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

