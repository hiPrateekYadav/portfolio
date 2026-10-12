import type { ReactNode } from 'react'
import { getWorks } from '@/lib/sheetsMappers'

export const dynamicParams = false

export async function generateStaticParams() {
  const works = await getWorks()

  return Array.from(
    new Set(works.map((work) => work.slug).filter(Boolean))
  ).map((slug) => ({ slug }))
}

export default function WorkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children
}
