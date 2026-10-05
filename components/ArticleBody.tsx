import Link from 'next/link'
import Image from 'next/image'
import { renderMarkdown } from '@/lib/markdown'
import { Tool } from '@/components/tools'

type FAQ = { question: string; answer: string }

/** Article content with an optional embedded calculator, sources and hand-picked related links. */
export function ArticleBody({
  content,
  tool,
  sources,
  related,
  relatedTitles,
  image,
}: {
  image?: { src: string; alt: string; width?: number; height?: number }
  content: string
  tool?: string
  sources?: [string, string][]
  related?: string[]
  relatedTitles?: Record<string, string>
}) {
  let before = content
  let after = ''
  if (tool) {
    if (content.includes('[[tool]]')) {
      ;[before, after] = content.split('[[tool]]')
    } else {
      const i = content.indexOf('\n## ')
      if (i > 0) {
        before = content.slice(0, i)
        after = content.slice(i)
      }
    }
  }
  return (
    <>
      {image && (
        <figure className="mb-8">
          <Image src={image.src} alt={image.alt} width={image.width ?? 1536} height={image.height ?? 1024} priority
            sizes="(max-width: 1024px) 100vw, 66vw" className="w-full h-auto border border-fairway-700" />
        </figure>
      )}
      <div className="prose-golf">{renderMarkdown(before)}</div>
      {tool && <Tool id={tool} />}
      {after && <div className="prose-golf">{renderMarkdown(after)}</div>}

      {related && related.length > 0 && (
        <div className="mt-10 card-dark p-5">
          <p className="section-label mb-3">Keep reading</p>
          <ul className="space-y-2">
            {related.map((href) => (
              <li key={href}>
                <Link prefetch={false} href={href} className="text-gold-400 hover:text-gold-300 text-sm font-body underline-offset-2 hover:underline">
                  {relatedTitles?.[href] ?? href}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sources && sources.length > 0 && (
        <div className="mt-10 border-t border-fairway-700 pt-5">
          <p className="section-label mb-3">Sources</p>
          <ol className="list-decimal list-inside space-y-1">
            {sources.map(([label, url]) => (
              <li key={url} className="text-stone-500 text-xs font-body">
                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 underline-offset-2 hover:underline">{label}</a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}

export function faqJsonLd(faq: FAQ[] | undefined) {
  if (!faq || faq.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  }
}

export function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso + 'T12:00:00Z')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}
