'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getBlogs, getLetsTalkContent } from '@/lib/sheetsMappers'
import CTASection from '@/components/CTASection'
import NoiseOverlay from '@/components/NoiseOverlay'
import FadeIn from '@/components/animations/FadeIn'
import LoadingScreen from '@/components/LoadingScreen'
import { useAudience } from '@/hooks/useAudience'
import { usePageData } from '@/hooks/usePageData'
import { withAudience } from '@/lib/audience'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const audience = useAudience()
  const { data } = usePageData(() => Promise.all([getBlogs(), getLetsTalkContent()]), [slug])
  const [posts, letsTalkContent] = data ?? [[], null]
  const post = posts.find((p) => p.slug === slug)
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3)

  if (!post) {
    return <LoadingScreen />
  }

  const conclusion = post.content.sections.at(-1)

  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      {/* Hero Section */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[224px] pb-[40px] md:pb-[56px] lg:pb-[64px] px-4 md:px-8 lg:px-[64px]">
        <div className="max-w-[1920px] mx-auto">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-[32px] md:gap-[40px] lg:gap-[48px] items-center">
            <FadeIn direction="up" delay={0} immediate>
            <div className="flex flex-col gap-[8px] items-center text-center">
              <h1 className="text-[36px] md:text-[56px] lg:text-[80px] font-sans font-light leading-none text-[#DAC5A7] w-full max-w-[90%] md:max-w-[800px] lg:w-[1200px]">
                {post.title}
              </h1>
              <p className="text-[16px] md:text-[18px] lg:text-[20px] font-chillax leading-[1.7] text-[rgba(218,197,167,0.6)] w-full max-w-[90%] md:max-w-[500px] lg:w-[600px]">
                {post.excerpt}
              </p>
            </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.1} immediate>
            <div className="flex gap-[12px] md:gap-[14px] lg:gap-[16px] items-center">
              <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-[500px] p-[8px] flex items-center justify-center w-[40px] h-[40px] md:w-[44px] md:h-[44px] lg:w-[46px] lg:h-[46px]">
                <svg
                  width="18"
                  height="18"
                  className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6.66667V13.3333M10 13.3333L13.3333 10M10 13.3333L6.66667 10"
                    stroke="#DAC5A7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7]">
                Read More
              </p>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-[12px] md:pb-[14px] lg:pb-[16px] px-4 md:px-8 lg:px-[16px]">
        <div className="max-w-[1920px] mx-auto flex justify-center">
          <div className="max-w-[1400px] w-full">
            <FadeIn direction="up" delay={0} immediate>
            <div className="flex flex-col md:flex-row gap-[12px] md:gap-[14px] lg:gap-[16px]">
              {/* Date Card */}
              <div className="flex-1 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[20px] md:p-[26px] lg:p-[32px] flex items-center justify-between">
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[rgba(218,197,167,0.6)]">
                  Date
                </p>
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7]">
                  {post.date}
                </p>
              </div>

              {/* Category Card */}
              <div className="flex-1 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[20px] md:p-[26px] lg:p-[32px] flex items-center justify-between">
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[rgba(218,197,167,0.6)]">
                  Category
                </p>
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7]">
                  {post.category}
                </p>
              </div>

              {/* Reading Time Card */}
              <div className="flex-1 backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[20px] md:p-[26px] lg:p-[32px] flex items-center justify-between">
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[rgba(218,197,167,0.6)]">
                  Reading time
                </p>
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans uppercase tracking-[1.5px] text-[#DAC5A7]">
                  {post.readTime}
                </p>
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="px-4 md:px-8 lg:px-0">
        <div className="max-w-[1920px] mx-auto flex justify-center">
          <div className="max-w-[1400px] w-full">
            <FadeIn direction="up" delay={0.1} immediate>
            <div className="relative h-[300px] md:h-[500px] lg:h-[900px] rounded-sm overflow-hidden border border-[rgba(218,197,167,0.15)] bg-[#0E0E0E]">
              <Image
                src={post.content.hero}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              <NoiseOverlay />
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-[50px] md:pt-[64px] lg:pt-[80px] pb-0 px-4 md:px-8 lg:pr-[16px]">
        <div className="max-w-[1920px] mx-auto flex justify-center">
          <div className="max-w-[1000px] w-full">
            <div className="flex flex-col gap-[32px] md:gap-[40px] lg:gap-[48px]">
              {/* Main content sections (all except conclusion) */}
              {post.content.sections.slice(0, -1).map((section, index) => (
                <FadeIn key={index} direction="up" delay={0}>
                <div className="flex flex-col gap-[12px] md:gap-[14px] lg:gap-[16px]">
                  <p
                    className={`${
                      index === 0
                        ? 'text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1]'
                        : 'text-[24px] md:text-[28px] lg:text-[32px] leading-[1.2] tracking-[1px]'
                    } font-sans font-light text-[#DAC5A7]`}
                  >
                    {section.heading}
                  </p>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[14px] md:text-[15px] lg:text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                </FadeIn>
              ))}

              {/* Conclusion Card */}
              <FadeIn direction="up" delay={0}>
              <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[24px] md:p-[36px] lg:p-[48px] flex flex-col gap-[20px] md:gap-[26px] lg:gap-[32px]">
                {conclusion && (
                  <div className="flex flex-col gap-[12px] md:gap-[14px] lg:gap-[16px]">
                    <p className="text-[24px] md:text-[28px] lg:text-[32px] font-sans font-light leading-[1.2] tracking-[1px] text-[#DAC5A7]">
                      {conclusion.heading}
                    </p>
                    {conclusion.paragraphs.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-[14px] md:text-[15px] lg:text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)] w-full max-w-full lg:w-[792px]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {/* Author info */}
                <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[14px] lg:gap-[16px] items-start sm:items-center w-full">
                  <div className="relative w-[50px] h-[50px] md:w-[56px] md:h-[56px] lg:w-[60px] lg:h-[60px] rounded-full overflow-hidden shrink-0">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-[4px]">
                    <p className="text-[18px] md:text-[19px] lg:text-[20px] font-sans font-light leading-[1.4] tracking-[1px] text-[#DAC5A7]">
                      {post.author.name}
                    </p>
                    <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans leading-[1.6] tracking-[1.5px] uppercase text-[rgba(218,197,167,0.6)]">
                      {post.author.title}
                    </p>
                  </div>
                  
                  {/* Author Social Links */}
                  <div className="flex gap-[8px] md:gap-[10px] lg:gap-[12px]">
                    {post.author.socials.instagram && (
                      <a
                        href={post.author.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[10px] md:p-[11px] lg:p-[12px] hover:bg-[rgba(218,197,167,0.08)] transition-all"
                        aria-label="Instagram"
                      >
                        <svg
                          width="18"
                          height="18"
                          className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
                            fill="#DAC5A7"
                          />
                        </svg>
                      </a>
                    )}
                    {post.author.socials.linkedin && (
                      <a
                        href={post.author.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[12px] hover:bg-[rgba(218,197,167,0.08)] transition-all"
                        aria-label="LinkedIn"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                            fill="#DAC5A7"
                          />
                        </svg>
                      </a>
                    )}
                    {post.author.socials.twitter && (
                      <a
                        href={post.author.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[12px] hover:bg-[rgba(218,197,167,0.08)] transition-all"
                        aria-label="Twitter"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 5.8C21.2483 6.1262 20.4534 6.34121 19.64 6.44C20.4982 5.92731 21.1413 5.12077 21.45 4.17C20.6436 4.64886 19.7608 4.98641 18.84 5.17C18.2245 4.50254 17.405 4.05843 16.5098 3.90842C15.6147 3.75841 14.6945 3.91053 13.8938 4.34114C13.093 4.77175 12.4569 5.45711 12.0852 6.28357C11.7135 7.11003 11.6273 8.03334 11.84 8.91C10.2094 8.82776 8.61444 8.40318 7.15865 7.6663C5.70287 6.92943 4.41885 5.89928 3.39 4.64C3.02914 5.24388 2.83952 5.92691 2.84 6.62C2.83872 7.26459 3.00422 7.89896 3.32176 8.4635C3.63929 9.02804 4.09902 9.50533 4.66 9.85C4.00798 9.8317 3.36989 9.66056 2.8 9.35V9.4C2.80489 10.3373 3.13599 11.2448 3.73731 11.9726C4.33864 12.7003 5.17326 13.2038 6.1 13.4C5.74326 13.4981 5.37287 13.5494 5 13.5525C4.74189 13.5501 4.48442 13.5265 4.23 13.4816C4.49391 14.2915 5.00462 15.0025 5.69107 15.5186C6.37753 16.0347 7.20558 16.3314 8.06 16.3691C6.6172 17.4951 4.83588 18.1026 3 18.0991C2.66574 18.1 2.33174 18.0794 2 18.0375C3.87443 19.2334 6.05881 19.8704 8.29 19.8691C9.82969 19.8835 11.3571 19.5887 12.7831 19.0016C14.2091 18.4145 15.505 17.546 16.5952 16.4479C17.6854 15.3497 18.5502 14.0433 19.1392 12.6074C19.7282 11.1714 20.0298 9.63388 20.0267 8.08207C20.0267 7.90541 20.0267 7.72207 20.0267 7.54207C20.7894 6.96237 21.4481 6.25599 21.9733 5.45207L22 5.8Z"
                            fill="#DAC5A7"
                          />
                        </svg>
                      </a>
                    )}
                    {post.author.socials.facebook && (
                      <a
                        href={post.author.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[12px] hover:bg-[rgba(218,197,167,0.08)] transition-all"
                        aria-label="Facebook"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                            fill="#DAC5A7"
                          />
                        </svg>
                      </a>
                    )}
                    {post.author.socials.medium && (
                      <a
                        href={post.author.socials.medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm p-[12px] hover:bg-[rgba(218,197,167,0.08)] transition-all"
                        aria-label="Medium"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.54 12C13.54 15.3915 10.7915 18.14 7.4 18.14C4.00852 18.14 1.26 15.3915 1.26 12C1.26 8.60852 4.00852 5.86 7.4 5.86C10.7915 5.86 13.54 8.60852 13.54 12ZM20.488 12C20.488 15.1732 19.1137 17.7443 17.424 17.7443C15.7343 17.7443 14.36 15.1732 14.36 12C14.36 8.82679 15.7343 6.25571 17.424 6.25571C19.1137 6.25571 20.488 8.82679 20.488 12ZM23.76 12C23.76 14.8331 23.3317 17.1291 22.8 17.1291C22.2683 17.1291 21.84 14.8331 21.84 12C21.84 9.16686 22.2683 6.87086 22.8 6.87086C23.3317 6.87086 23.76 9.16686 23.76 12Z"
                            fill="#DAC5A7"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Related News Section */}
      <section className="px-4 md:px-8 lg:px-[16px] py-[80px] md:py-[100px] lg:py-[128px]">
        <div className="max-w-[1920px] mx-auto flex justify-center">
          <div className="max-w-[1600px] w-full">
            {/* Section Header */}
            <FadeIn direction="up" delay={0}>
            <div className="flex items-center justify-between px-0 md:px-[16px] lg:px-[32px] pb-[24px] md:pb-[28px] lg:pb-[32px]">
              <p className="text-[36px] md:text-[48px] lg:text-[64px] font-sans font-light leading-[1.1] text-[#DAC5A7]">
                Related <span className="font-serif italic">News</span>
              </p>
              <Link
                href={withAudience('/blog', audience)}
                className="flex gap-[8px] md:gap-[10px] lg:gap-[12px] items-center hover:opacity-80 transition-opacity"
              >
                <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-[500px] p-[6px] md:p-[7px] lg:p-[8px] flex items-center justify-center w-[28px] h-[28px] md:w-[30px] md:h-[30px] lg:w-[32px] lg:h-[32px]">
                  <svg
                    width="16"
                    height="16"
                    className="md:w-[17px] md:h-[17px] lg:w-[18px] lg:h-[18px]"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 9L14 9M14 9L10 5M14 9L10 13"
                      stroke="#DAC5A7"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-[11px] md:text-[12px] lg:text-[13px] font-sans leading-[1.6] tracking-[1.5px] uppercase text-[#DAC5A7]">
                  See all
                </p>
              </Link>
            </div>
            </FadeIn>

            {/* Related Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[28px] lg:gap-[32px]">
              {relatedPosts.map((relatedPost, index) => (
                <FadeIn key={relatedPost.slug} direction="up" delay={index * 0.1}>
                <Link
                  href={withAudience(`/blog/${relatedPost.slug}`, audience)}
                  className={`${
                    index === 0
                      ? 'backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)]'
                      : 'bg-[rgba(218,197,167,0.05)]'
                  } border border-[rgba(218,197,167,0.15)] rounded-sm p-[24px] md:p-[36px] lg:p-[48px] hover:bg-[rgba(218,197,167,0.08)] transition-all flex flex-col gap-[20px] md:gap-[26px] lg:gap-[32px] group`}
                >
                  {/* Image */}
                  <div className="relative h-[200px] md:h-[240px] lg:h-[270px] rounded-sm overflow-hidden border border-[rgba(218,197,167,0.15)]">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <NoiseOverlay />
                    {/* Arrow Badge - visible on hover for all cards */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-[500px] p-[8px] flex items-center justify-center w-[40px] h-[40px] md:w-[44px] md:h-[44px] lg:w-[46px] lg:h-[46px]">
                        <svg
                          width="18"
                          height="18"
                          className="md:w-[19px] md:h-[19px] lg:w-[20px] lg:h-[20px]"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.83333 14.1667L14.1667 5.83333M14.1667 5.83333H5.83333M14.1667 5.83333V14.1667"
                            stroke="#DAC5A7"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-[6px] md:gap-[7px] lg:gap-[8px]">
                    <p className="text-[11px] md:text-[11.5px] lg:text-[12px] font-chillax leading-[1.2] uppercase text-[rgba(218,197,167,0.6)]">
                      {relatedPost.date}
                    </p>
                    <p className="text-[20px] md:text-[22px] lg:text-[24px] font-sans font-light leading-[1.3] tracking-[1px] text-[#DAC5A7]">
                      {relatedPost.title}
                    </p>
                    <p className="text-[14px] md:text-[15px] lg:text-[16px] font-chillax leading-[1.8] text-[rgba(218,197,167,0.6)]">
                      {relatedPost.excerpt}
                    </p>
                  </div>

                  {/* Category Badge */}
                  <div className="backdrop-blur-[15px] bg-[rgba(218,197,167,0.05)] border border-[rgba(218,197,167,0.15)] rounded-sm px-[7px] py-[7px] md:px-[7.5px] md:py-[7.5px] lg:px-[8px] lg:py-[8px] self-start">
                    <p className="text-[11px] md:text-[11.5px] lg:text-[12px] font-chillax leading-[1.2] uppercase text-[#DAC5A7]">
                      {relatedPost.category}
                    </p>
                  </div>
                </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection content={letsTalkContent} source={audience} />
    </div>
  )
}
