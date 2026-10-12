'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { useLoading } from '@/contexts/LoadingContext';
import { useAudience } from '@/hooks/useAudience';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: '', email: '', message: '' };

type Status = { type: 'success' | 'error'; message: string } | null;

export default function ContactPage() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState<Status>(null);
  const source = useAudience();
  const { setLoading } = useLoading();

  useEffect(() => {
    window.scrollTo(0, 0);
    // No async data on this page, so reveal the header and footer immediately
    setLoading(false);
  }, [setLoading]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
    if (emailError) setEmailError('');
  };

  const handleEmailBlur = () => {
    if (formData.email && !EMAIL_PATTERN.test(formData.email)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setStatus(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source }),
      });
      if (!response.ok) throw new Error(`Contact request failed with ${response.status}`);
      setStatus({ type: 'success', message: 'Thank you for your message! I will get back to you soon.' });
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again or contact me directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Section Contact */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[224px] pb-[80px] md:pb-[120px] lg:pb-[160px] px-4 md:px-8 lg:px-[16px]">
        <div className="max-w-[1920px] mx-auto flex justify-center">
          <div className="max-w-[1400px] w-full flex flex-col lg:flex-row gap-[40px] md:gap-[60px] lg:gap-[80px] items-start">
            {/* Left: Profile Image - Hidden on mobile, visible on laptop */}
            <div className="relative w-[500px] h-[566px] flex-shrink-0 mix-blend-lighten opacity-80 hidden lg:block">
              <Image
                src="/images/hero-profile.png"
                alt="Profile"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>

            {/* Right: Form and Connect */}
            <div className="flex flex-col gap-[12px] md:gap-[14px] lg:gap-[16px] flex-1 w-full">
              {/* Contact Form Card */}
              <FadeIn direction="up" delay={0} immediate>
              <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[20px] md:p-[26px] lg:p-[32px] flex flex-col gap-[16px] md:gap-[20px] lg:gap-[24px]">
                <div className="flex flex-col gap-[6px] md:gap-[7px] lg:gap-[8px]">
                  <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[rgba(218,197,167,0.6)] leading-[1.6]">
                    Contact
                  </p>
                  <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-sans font-light leading-[1.1] text-[#DAC5A7]">
                    Let&apos;s get in touch.
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-[10px] md:gap-[11px] lg:gap-[12px]">
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm px-[18px] py-[14px] md:px-[21px] md:py-[15px] lg:px-[24px] lg:py-[16px] text-[11px] md:text-[12px] lg:text-[13px] font-sans text-[#DAC5A7] placeholder:text-[#DAC5A7] placeholder:uppercase tracking-[1.5px] leading-[1.6] focus:outline-none focus:border-[rgba(218,197,167,0.3)] disabled:opacity-50"
                  />

                  <div className="flex flex-col gap-1">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleEmailChange}
                      onBlur={handleEmailBlur}
                      required
                      disabled={isSubmitting}
                      className={`bg-[rgba(218,197,167,0.05)] border ${emailError ? 'border-red-500' : 'border-[rgba(218,197,167,0.15)]'} rounded-sm px-[18px] py-[14px] md:px-[21px] md:py-[15px] lg:px-[24px] lg:py-[16px] text-[11px] md:text-[12px] lg:text-[13px] font-sans text-[#DAC5A7] placeholder:text-[#DAC5A7] placeholder:uppercase tracking-[1.5px] leading-[1.6] focus:outline-none focus:border-[rgba(218,197,167,0.3)] disabled:opacity-50`}
                    />
                    {emailError && (
                      <p className="text-[10px] md:text-[11px] text-red-500 px-[18px] md:px-[21px] lg:px-[24px]">
                        {emailError}
                      </p>
                    )}
                  </div>

                  <textarea
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm px-[18px] py-[14px] md:px-[21px] md:py-[15px] lg:px-[24px] lg:py-[16px] text-[11px] md:text-[12px] lg:text-[13px] font-sans text-[#DAC5A7] placeholder:text-[#DAC5A7] placeholder:uppercase tracking-[1.5px] leading-[1.6] focus:outline-none focus:border-[rgba(218,197,167,0.3)] resize-none h-[100px] md:h-[110px] lg:h-[120px] disabled:opacity-50"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#DAC5A7] rounded-sm px-[14px] py-[9px] md:px-[15px] md:py-[9.5px] lg:px-[16px] lg:py-[10px] text-[11px] md:text-[12px] lg:text-[13px] font-sans text-[#0E0E0E] uppercase tracking-[1.5px] leading-[1.6] hover:bg-[rgba(218,197,167,0.9)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {status && (
                    <p
                      role="status"
                      className={`text-[11px] md:text-[12px] lg:text-[13px] leading-[1.6] ${status.type === 'success' ? 'text-[#DAC5A7]' : 'text-red-500'}`}
                    >
                      {status.message}
                    </p>
                  )}
                </form>
              </div>
              </FadeIn>

              {/* Connect Options - Stack vertically on mobile, horizontal on tablet+ */}
              <FadeIn direction="up" delay={0.1} immediate>
              <div className="flex flex-col sm:flex-row gap-[12px] md:gap-[14px] lg:gap-[16px]">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/prateekyadav398/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[14px] md:p-[15px] lg:p-[16px] flex items-center justify-between hover:bg-[rgba(218,197,167,0.08)] transition-all group"
                >
                  <div className="flex gap-[10px] md:gap-[11px] lg:gap-[12px] items-center">
                    <svg
                      width="18"
                      height="18"
                      className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        fill="#DAC5A7"
                      />
                    </svg>
                    <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7] leading-[1.6]">
                      LinkedIn
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  >
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="#DAC5A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href="mailto:prateekyadav398@outlook.com"
                  className="flex-1 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[14px] md:p-[15px] lg:p-[16px] flex items-center justify-between hover:bg-[rgba(218,197,167,0.08)] transition-all group"
                >
                  <div className="flex gap-[10px] md:gap-[11px] lg:gap-[12px] items-center">
                    <svg
                      width="18"
                      height="18"
                      className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                        stroke="#DAC5A7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6L12 13L2 6"
                        stroke="#DAC5A7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7] leading-[1.6]">
                      Email
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  >
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="#DAC5A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                {/* Mobile */}
                <a
                  href="tel:+919318378389"
                  className="flex-1 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[14px] md:p-[15px] lg:p-[16px] flex items-center justify-between hover:bg-[rgba(218,197,167,0.08)] transition-all group"
                >
                  <div className="flex gap-[10px] md:gap-[11px] lg:gap-[12px] items-center">
                    <svg
                      width="18"
                      height="18"
                      className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77382 17.3147 6.72533 15.2662 5.18999 12.85C3.49997 10.2412 2.44824 7.27099 2.11999 4.18C2.095 3.90347 2.12787 3.62476 2.21649 3.36162C2.30512 3.09849 2.44756 2.85669 2.63476 2.65162C2.82196 2.44655 3.0498 2.28271 3.30379 2.17052C3.55777 2.05833 3.83233 2.00026 4.10999 2H7.10999C7.5953 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04207 3.23945 9.10999 3.72C9.23662 4.68007 9.47144 5.62273 9.80999 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.35999 8.64L8.08999 9.91C9.51355 12.4135 11.5864 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9751 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z"
                        stroke="#DAC5A7"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7] leading-[1.6]">
                      Mobile
                    </p>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="md:w-[15px] md:h-[15px] lg:w-[16px] lg:h-[16px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  >
                    <path
                      d="M3 13L13 3M13 3H6M13 3V10"
                      stroke="#DAC5A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
