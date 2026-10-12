'use client'
import Image from 'next/image'
import Link from 'next/link'
import { getBlogs, getLetsTalkContent } from '@/lib/sheetsMappers'
import CTASection from '@/components/CTASection'
import NoiseOverlay from '@/components/NoiseOverlay'
import FadeIn from '@/components/animations/FadeIn'
import LoadingScreen from '@/components/LoadingScreen'
import { useAudience } from '@/hooks/useAudience'
import { usePageData } from '@/hooks/usePageData'
import { withAudience } from '@/lib/audience'

export default function BlogPage() {
  const audience = useAudience()
  const { data, loading } = usePageData(() => Promise.all([getBlogs(), getLetsTalkContent()]))
  const [blogPosts, letsTalkContent] = data ?? [[], null]

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen">
      {/* Section Hero */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[224px] pb-[16px] px-4 md:px-8 lg:px-0 w-full flex justify-center">
        <div className="flex flex-col gap-[40px] md:gap-[56px] lg:gap-[64px] items-center w-full max-w-[1400px] lg:w-[1400px]">
          <FadeIn direction="up" delay={0} immediate>
          <div className="flex flex-col gap-[12px] md:gap-[14px] lg:gap-[16px] items-center text-center">
            <h1 className="font-sans font-light text-[48px] md:text-[80px] lg:text-[128px] leading-none text-[#dac5a7]">
              Blog
            </h1>
            <p className="font-chillax font-light text-[16px] md:text-[20px] lg:text-[24px] leading-[1.5] text-[rgba(218,197,167,0.6)] w-full max-w-[90%] md:max-w-[500px] lg:w-[600px]">
              Get the latest insights and tips on Software Development, AI Designing, and more.
            </p>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Section Posts */}
      <section className="pt-[40px] md:pt-[56px] lg:pt-[64px] pb-[80px] md:pb-[100px] lg:pb-[128px] px-4 md:px-8 lg:px-[50px] w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[28px] lg:gap-[32px] w-full max-w-[1600px] lg:w-[1600px]">
          {blogPosts.map((post, index) => (
            <FadeIn key={post.slug} direction="up" delay={index * 0.038} immediate={index < 3}>
            <Link
              href={withAudience(`/blog/${post.slug}`, audience)}
              className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[20px] md:p-[26px] lg:p-[30px] flex flex-col gap-[20px] md:gap-[26px] lg:gap-[32px] hover:bg-[rgba(218,197,167,0.08)] transition-colors group"
            >
              {/* Image */}
              <div className="border border-[rgba(218,197,167,0.15)] rounded-sm h-[200px] md:h-[240px] lg:h-[270px] relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  unoptimized
                />
                <NoiseOverlay />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-full w-[40px] h-[40px] md:w-[44px] md:h-[44px] lg:w-[46px] lg:h-[46px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="18" height="18" className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4.16666 15.8333L15.8333 4.16666M15.8333 4.16666H4.16666M15.8333 4.16666V15.8333"
                      stroke="#DAC5A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-[6px] md:gap-[7px] lg:gap-[8px]">
                <p className="font-chillax text-[11px] md:text-[11.5px] lg:text-[12px] leading-[1.2] text-[rgba(218,197,167,0.6)] uppercase">
                  {post.date}
                </p>
                <h3 className="font-sans font-light text-[20px] md:text-[22px] lg:text-[24px] leading-[1.3] text-[#dac5a7] tracking-[1px]">
                  {post.title}
                </h3>
                <p className="font-chillax text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] text-[rgba(218,197,167,0.6)]">
                  {post.excerpt}
                </p>
              </div>

              {/* Category Badge */}
              <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[7px] md:p-[7.5px] lg:p-[8px] self-start">
                <p className="font-chillax text-[11px] md:text-[11.5px] lg:text-[12px] leading-[1.2] text-[#dac5a7] uppercase">
                  {post.category}
                </p>
              </div>
            </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTASection content={letsTalkContent} source={audience} />
    </div>
  );
}
