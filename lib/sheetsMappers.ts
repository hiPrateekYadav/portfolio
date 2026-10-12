import { fetchSheetDataByName } from './googleSheets'

// Generic helpers
type Row = Record<string, unknown>

function toString(val: unknown): string {
  if (val === undefined || val === null) return ''
  const value = String(val)

  // Next.js basePath does not automatically prefix files referenced from
  // public/. Use the build-time base path for root-relative Sheet values.
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  if (basePath && value.startsWith('/') && !value.startsWith('//') && !value.startsWith(`${basePath}/`)) {
    return `${basePath}${value}`
  }

  return value
}

function toNumber(val: unknown): number | undefined {
  const n = Number(val)
  return isNaN(n) ? undefined : n
}

function splitList(val: unknown, separator: RegExp = /[,\n;]/): string[] {
  const s = toString(val)
  if (!s) return []
  return s
    .split(separator)
    .map((v) => v.trim())
    .filter(Boolean)
}

// Logos
export interface Logo {
  src: string
  alt: string
  width: number
  height: number
  isFulltime: boolean
}

export async function getLogos(): Promise<Logo[]> {
  const rows = await fetchSheetDataByName<Row>('logos')
  return rows
    .map((r) => ({
      src: toString(r.src || r.image || r.logo || ''),
      alt: toString(r.alt || r.name || 'Logo'),
      width: toNumber(r.width) || 100,
      height: toNumber(r.height) || 30,
      isFulltime: r.is_fulltime === true || toString(r.is_fulltime).toLowerCase() === 'true',
    }))
    .filter((r) => !!r.src)
}

// Services
export interface ServiceDetail { label: string; text: string }
export interface Service {
  id: string
  number: string
  title: string
  shortTitle: string
  description: string
  image: string
  details: ServiceDetail[]
}

export async function getServices(): Promise<Service[]> {
  const rows = await fetchSheetDataByName<Row>('services')
  
  return rows.map((r, idx) => {
    const details: ServiceDetail[] = []
    
    // Handle nested format like details/0/label, details/0/text, details/1/label, etc.
    for (let i = 0; i <= 20; i++) {
      const labelKey = `details/${i}/label`
      const textKey = `details/${i}/text`
      const label = r[labelKey] ?? r[`detail${i}_label`] ?? r[`detail_${i}_label`] ?? r[`label${i}`] ?? r[`label_${i}`] ?? r[`Detail ${i} Label`]
      const text = r[textKey] ?? r[`detail${i}_text`] ?? r[`detail_${i}_text`] ?? r[`text${i}`] ?? r[`text_${i}`] ?? r[`Detail ${i} Text`]
      if (label || text) {
        details.push({ label: toString(label), text: toString(text) })
      }
    }
    
    const service = {
      id: toString(r.id || r.slug || r.shortTitle || r['Short Title'] || `service_${idx + 1}`)
        .toLowerCase()
        .replace(/\s+/g, '_'),
      number: toString(r.number || r.no || r.Number || r['#'] || String(idx + 1).padStart(2, '0')),
      title: toString(r.title || r.Title || ''),
      shortTitle: toString(r.shortTitle || r['Short Title'] || r.short_title || r.title || r.Title || ''),
      description: toString(r.description || r.Description || r.summary || r.Summary || ''),
      image: toString(r.image || r.Image || r.hero || r.Hero || ''),
      details,
    }
    
    return service
  })
}

// Process Steps
export interface ProcessStep {
  number: string
  title: string
  subtitle: string
  duration: string
  description: string
  points: string[]
  side: 'left' | 'right'
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  const rows = await fetchSheetDataByName<Row>('process')
  return rows
    .map((r, idx) => {
      // Collect points from known patterns: points column may be split into multiple headers like points/0, points/1, points/2
      const pointKeys = Object.keys(r).filter(k => /^points\//.test(k))
      let points: string[] = []
      if (pointKeys.length) {
        points = pointKeys
          .map(k => toString(r[k]))
          .filter(Boolean)
      } else {
        // Fallbacks: single 'points' field that may contain delimited list
        points = splitList(r.points || r.points_list || r.bullets || '')
      }
      return {
        number: toString(r.number || r.no || String(idx + 1).padStart(2, '0')),
        title: toString(r.title),
        subtitle: toString(r.subtitle || ''),
        duration: toString(r.duration || ''),
        description: toString(r.description || ''),
        points,
        side: (toString(r.side || '').toLowerCase() === 'left' ? 'left' : 'right') as 'left' | 'right',
      }
    })
    .filter((step) => step.title)
}

// Stats
export interface Stat { label: string; value: string }
export async function getStats(): Promise<Stat[]> {
  const rows = await fetchSheetDataByName<Row>('stats')
  return rows
    .map((r) => ({ 
      label: toString(r.label || r.Label || r.name || r.Name || ''), 
      value: toString(r.value || r.Value || r.stat || r.Stat || '') 
    }))
    .filter((r) => !!r.label && !!r.value)
}

// Socials
/** `icon` is a normalized network key rendered by `components/icons/SocialIcon`. */
export interface Social { name: string; url: string; icon: string }

export async function getSocials(): Promise<Social[]> {
  const rows = await fetchSheetDataByName<Row>('socials')
  return rows
    .map((r) => {
      const name = toString(r.name)
      const keyRaw = name.toLowerCase().trim().replace(/\s+/g, '')
      const aliases: Record<string, string> = { x: 'twitter' }
      const key = aliases[keyRaw] ?? keyRaw
      return {
        name,
        url: toString(r.url || r.link || ''),
        icon: key,
      }
    })
    .filter((s) => !!s.url)
}

// Let's Talk CTA
export interface LetsTalkContent {
  titleLine1: string
  titleLine2: string
  subtitle: string
}

export async function getLetsTalkContent(): Promise<LetsTalkContent> {
  const rows = await fetchSheetDataByName<Row>('letsTalk')
  const r = rows[0] || {}

  return {
    titleLine1: toString(r.title_line1 || r.titleLine1 || r.line1 || "Let's make your"),
    titleLine2: toString(r.title_line2 || r.titleLine2 || r.line2 || 'Website shine.'),
    subtitle: toString(
      r.subtitle ||
      r.description ||
      'Premium web design, website, and devops services to help your business stand out.'
    ),
  }
}

// Recruiter portfolio
export interface RecruiterProfile {
  name: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  summary: string
  availability: string
  portrait: string
  resumePath: string
  email: string
  ctaLine1: string
  ctaLine2: string
  ctaSubtitle: string
  experienceIntro: string
  companyMarquee: string[]
}

export interface RecruiterMetric { label: string; value: string; order: number }
export interface RecruiterExperience {
  employer: string; role: string; location: string; dates: string; bullets: string[]; technologies: string[]; order: number
}
export interface RecruiterCaseStudy {
  eyebrow: string; metric: string; title: string; description: string; tags: string[]; order: number
}
export interface RecruiterToolkitItem { category: string; technology: string; order: number }
export interface RecruiterCredential {
  type: 'certification' | 'education'; title: string; issuer: string; date: string; detail: string; order: number
}
export interface RecruiterContent {
  profile: RecruiterProfile
  metrics: RecruiterMetric[]
  experience: RecruiterExperience[]
  caseStudies: RecruiterCaseStudy[]
  toolkit: RecruiterToolkitItem[]
  credentials: RecruiterCredential[]
}

function ordered<T extends { order: number }>(items: T[]): T[] {
  return items.sort((a, b) => a.order - b.order)
}

export async function getRecruiterContent(): Promise<RecruiterContent> {
  const [profileRows, metricRows, experienceRows, caseRows, toolkitRows, credentialRows] = await Promise.all([
    fetchSheetDataByName<Row>('recruiter_profile'),
    fetchSheetDataByName<Row>('recruiter_metrics'),
    fetchSheetDataByName<Row>('recruiter_experience'),
    fetchSheetDataByName<Row>('recruiter_case_studies'),
    fetchSheetDataByName<Row>('recruiter_toolkit'),
    fetchSheetDataByName<Row>('recruiter_credentials'),
  ])
  if (!profileRows.length || !metricRows.length || !experienceRows.length || !caseRows.length || !toolkitRows.length || !credentialRows.length) {
    throw new Error('Recruiter spreadsheet tabs must all contain data')
  }
  const profileRow = profileRows[0]
  const profile: RecruiterProfile = {
    name: toString(profileRow.name), eyebrow: toString(profileRow.eyebrow),
    titleLine1: toString(profileRow.title_line_1), titleLine2: toString(profileRow.title_line_2),
    summary: toString(profileRow.summary), availability: toString(profileRow.availability),
    portrait: toString(profileRow.portrait), resumePath: toString(profileRow.resume_path),
    email: toString(profileRow.email), ctaLine1: toString(profileRow.cta_line_1),
    ctaLine2: toString(profileRow.cta_line_2), ctaSubtitle: toString(profileRow.cta_subtitle),
    experienceIntro: toString(profileRow.experience_intro), companyMarquee: splitList(profileRow.company_marquee),
  }
  return {
    profile,
    metrics: ordered(metricRows.map((r, i) => ({ label: toString(r.label), value: toString(r.value), order: toNumber(r.order) ?? i }))),
    experience: ordered(experienceRows.map((r, i) => ({ employer: toString(r.employer), role: toString(r.role), location: toString(r.location), dates: toString(r.dates), bullets: splitList(r.bullets, /[;\n]/), technologies: splitList(r.technologies), order: toNumber(r.order) ?? i }))),
    caseStudies: ordered(caseRows.map((r, i) => ({ eyebrow: toString(r.eyebrow), metric: toString(r.metric), title: toString(r.title), description: toString(r.description), tags: splitList(r.tags), order: toNumber(r.order) ?? i }))),
    toolkit: ordered(toolkitRows.map((r, i) => ({ category: toString(r.category), technology: toString(r.technology), order: toNumber(r.order) ?? i }))),
    credentials: ordered(credentialRows.map((r, i) => ({ type: toString(r.type).toLowerCase() === 'education' ? 'education' as const : 'certification' as const, title: toString(r.title), issuer: toString(r.issuer), date: toString(r.date), detail: toString(r.detail), order: toNumber(r.order) ?? i }))),
  }
}

// About + Skills
export interface Skill { name: string; year: string }
export interface AboutContent {
  name: string
  title: string
  subtitle: string
  bio: { heading: string; paragraphs: string[] }
  image: string
}

export async function getSkills(): Promise<Skill[]> {
  const rows = await fetchSheetDataByName<Row>('skills')
  return rows
    .map((r) => ({ name: toString(r.name), year: toString(r.year || r.since || '') }))
    .filter((r) => !!r.name)
}

export async function getAbout(): Promise<AboutContent> {
  const rows = await fetchSheetDataByName<Row>('about')
  
  const r = rows[0] || {}
  
  // Parse paragraphs from nested format (bio/paragraphs/0, bio/paragraphs/1, etc.)
  const paragraphs: string[] = []
  for (let i = 0; i <= 20; i++) {
    const para = r[`bio/paragraphs/${i}`]
    if (para) {
      paragraphs.push(toString(para))
    }
  }
  
  // Fallback to flat formats if no nested paragraphs found
  const finalParagraphs = paragraphs.length > 0 
    ? paragraphs 
    : splitList(r.bio_paragraphs).length
      ? splitList(r.bio_paragraphs)
      : [toString(r.bio || '')].filter(Boolean)
  
  const aboutData = {
    name: toString(r.name || r.Name || ''),
    title: toString(r.title || r.Title || r.name || r.Name || ''),
    subtitle: toString(r.subtitle || r.Subtitle || ''),
    bio: {
      heading: toString(r['bio/heading'] || r.bio_heading || r.bioHeading || 'About'),
      paragraphs: finalParagraphs,
    },
    image: toString(r.image || r.Image || '/images/hero-profile.png'),
  }
  
  return aboutData
}

// Works
export interface WorkAboutCard { title: string; content: string }
export interface Work {
  slug: string
  title: string
  category: string
  year: string
  client: string
  timeline: string
  services: string[]
  website: string
  description: string
  about: { sectionTitle: string; sectionSubtitle: string; cards: WorkAboutCard[] }
  challenge: string
  goal: string
  result: string
  image: string
  thumbnail: string
}

export async function getWorks(): Promise<Work[]> {
  const rows = await fetchSheetDataByName<Row>('works')
  
  return rows.map((r, idx) => {
    const cards: WorkAboutCard[] = []
    
    // Handle nested format like about/cards/0/title, about/cards/0/content
    // Also handle flat formats like about_card1_title, card1_title
    for (let i = 0; i <= 10; i++) {
      const nestedTitle = r[`about/cards/${i}/title`]
      const nestedContent = r[`about/cards/${i}/content`]
      const flatTitle = r[`about_card${i}_title`] ?? r[`card${i}_title`] ?? r[`Card ${i} Title`]
      const flatContent = r[`about_card${i}_content`] ?? r[`card${i}_content`] ?? r[`Card ${i} Content`]
      
      const title = nestedTitle ?? flatTitle
      const content = nestedContent ?? flatContent
      
      if (title || content) {
        cards.push({ 
          title: toString(title), 
          content: toString(content) 
        })
      }
    }
    
    // If no cards found, use challenge, goal, result as fallback cards
    if (cards.length === 0) {
      const challenge = toString(r.challenge || r.Challenge || '')
      const goal = toString(r.goal || r.Goal || '')
      const result = toString(r.result || r.Result || '')
      
      if (challenge) cards.push({ title: 'Challenge', content: challenge })
      if (goal) cards.push({ title: 'Goal', content: goal })
      if (result) cards.push({ title: 'Result', content: result })
    }
    
    // Parse services from nested format (services/0, services/1, etc.)
    const services: string[] = []
    for (let i = 0; i <= 20; i++) {
      const service = r[`services/${i}`]
      if (service) {
        services.push(toString(service))
      }
    }
    // Fallback to comma-separated if no nested services found
    const finalServices = services.length > 0 ? services : splitList(r.services || r.Services)
    
    const work = {
      slug: toString(r.slug || r.Slug || r.title || r.Title || `work_${idx + 1}`)
        .toLowerCase()
        .replace(/\s+/g, '-'),
      title: toString(r.title || r.Title || ''),
      category: toString(r.category || r.Category || ''),
      year: toString(r.year || r.Year || ''),
      client: toString(r.client || r.Client || ''),
      timeline: toString(r.timeline || r.Timeline || ''),
      services: finalServices,
      website: toString(r.website || r.Website || ''),
      description: toString(r.description || r.Description || ''),
      about: {
        sectionTitle: toString(r['about/sectionTitle'] || r.about_section_title || r['About Section Title'] || r.about_title || 'About'),
        sectionSubtitle: toString(r['about/sectionSubtitle'] || r.about_section_subtitle || r['About Section Subtitle'] || r.about_subtitle || ''),
        cards,
      },
      challenge: toString(r.challenge || r.Challenge || ''),
      goal: toString(r.goal || r.Goal || ''),
      result: toString(r.result || r.Result || ''),
      image: toString(r.image || r.Image || r.thumbnail || ''),
      thumbnail: toString(r.thumbnail || r.Thumbnail || r.image || r.Image || ''),
    }
    
    return work
  })
}

// Blogs
export interface BlogPostSection { heading: string; paragraphs: string[] }
export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  readTime: string
  excerpt: string
  image: string
  content: { hero: string; sections: BlogPostSection[] }
  author: { name: string; title: string; image: string; socials: Record<string, string | undefined> }
}

export async function getBlogs(): Promise<BlogPost[]> {
  const rows = await fetchSheetDataByName<Row>('blogs')
  
  return rows.map((r, idx) => {
    const sections: BlogPostSection[] = []
    
    // Handle nested format like content/sections/0/heading, content/sections/0/paragraphs/0
    for (let i = 0; i <= 20; i++) {
      const nestedHeading = r[`content/sections/${i}/heading`]
      const flatHeading = r[`section${i}_heading`]
      const heading = nestedHeading ?? flatHeading
      
      // Collect all paragraphs for this section
      const paragraphs: string[] = []
      for (let j = 0; j <= 20; j++) {
        const nestedPara = r[`content/sections/${i}/paragraphs/${j}`]
        if (nestedPara) {
          paragraphs.push(toString(nestedPara))
        }
      }
      
      // Fallback to flat format if no nested paragraphs
      if (paragraphs.length === 0) {
        const flatParas = r[`section${i}_paragraphs`]
        if (flatParas) {
          paragraphs.push(...splitList(flatParas))
        }
      }
      
      if (heading || paragraphs.length > 0) {
        sections.push({ 
          heading: toString(heading || ''), 
          paragraphs: paragraphs.filter(Boolean)
        })
      }
    }
    
    const blogPost = {
      slug: toString(r.slug || r.Slug || r.title || r.Title || `post_${idx + 1}`)
        .toLowerCase()
        .replace(/\s+/g, '-'),
      title: toString(r.title || r.Title || ''),
      date: toString(r.date || r.Date || ''),
      category: toString(r.category || r.Category || ''),
      readTime: toString(r.readTime || r.read_time || r.read || ''),
      excerpt: toString(r.excerpt || r.Excerpt || ''),
      image: toString(r.image || r.Image || ''),
      content: {
        hero: toString(r['content/hero'] || r.content_hero || r.hero || r.image || ''),
        sections,
      },
      author: {
        name: toString(r['author/name'] || r.author_name || 'Author'),
        title: toString(r['author/title'] || r.author_title || ''),
        image: toString(r['author/image'] || r.author_image || '/images/hero-profile.png'),
        socials: {
          instagram: toString(r['author/socials/instagram'] || r.author_instagram || ''),
          linkedin: toString(r['author/socials/linkedin'] || r.author_linkedin || ''),
          twitter: toString(r['author/socials/twitter'] || r.author_twitter || ''),
          facebook: toString(r['author/socials/facebook'] || r.author_facebook || ''),
          medium: toString(r['author/socials/medium'] || r.author_medium || ''),
        },
      },
    }
    
    return blogPost
  })
}

// Testimonials
export interface Testimonial {
  logoSrc: string
  logoWidth: number
  logoHeight: number
  title: string
  text: string
  authorName: string
  authorCompany: string
  authorPhotoSrc: string
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await fetchSheetDataByName<Row>('projects')
  return rows
    .map((r) => ({
      logoSrc: toString(r.logoSrc || r.logo || r.logo_image || ''),
      logoWidth: toNumber(r.logoWidth || r.logo_width) || 30,
      logoHeight: toNumber(r.logoHeight || r.logo_height) || 20,
      title: toString(r.title || ''),
      text: toString(r.text || r.description || ''),
      authorName: toString(r.authorName || r.author_name || ''),
      authorCompany: toString(r.authorCompany || r.author_company || ''),
      authorPhotoSrc: toString(r.authorPhotoSrc || r.author_photo || r.photo || ''),
    }))
    .filter(t => t.title && t.text)
}
