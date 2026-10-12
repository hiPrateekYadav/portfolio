import type { ReactNode } from 'react'
import { getBlogs } from '@/lib/sheetsMappers'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getBlogs()

  return Array.from(
    new Set(posts.map((post) => post.slug).filter(Boolean))
  ).map((slug) => ({ slug }))
}

export default function BlogPostLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children
}
