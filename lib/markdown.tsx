import { ReactNode, createElement } from 'react'

/**
 * Converts a markdown string to React elements.
 * Handles: headings, bold, italic, lists, horizontal rules, paragraphs.
 * Designed for the pre-generated article content in this project.
 */
export function renderMarkdown(content: string): ReactNode[] {
  const blocks = content.split(/\n{2,}/)
  const elements: ReactNode[] = []

  blocks.forEach((block, idx) => {
    const trimmed = block.trim()
    if (!trimmed) return

    // H1
    if (trimmed.startsWith('# ')) {
      elements.push(
        createElement('h1', { key: idx, className: 'display-heading text-2xl text-stone-100 mt-10 mb-4' },
          inlineMarkdown(trimmed.slice(2))
        )
      )
      return
    }
    // H2
    if (trimmed.startsWith('## ')) {
      elements.push(
        createElement('h2', { key: idx, className: 'display-heading text-xl text-stone-100 mt-8 mb-3 border-b border-fairway-700 pb-2' },
          inlineMarkdown(trimmed.slice(3))
        )
      )
      return
    }
    // H3
    if (trimmed.startsWith('### ')) {
      elements.push(
        createElement('h3', { key: idx, className: 'display-heading text-lg text-gold-400 mt-6 mb-2' },
          inlineMarkdown(trimmed.slice(4))
        )
      )
      return
    }
    // H4
    if (trimmed.startsWith('#### ')) {
      elements.push(
        createElement('h4', { key: idx, className: 'font-body font-semibold text-stone-200 mt-4 mb-2' },
          inlineMarkdown(trimmed.slice(5))
        )
      )
      return
    }
    // Horizontal rule
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      elements.push(
        createElement('hr', { key: idx, className: 'border-fairway-700 my-8' })
      )
      return
    }
    // Unordered list
    const listLines = trimmed.split('\n')
    if (listLines.every((l) => /^[-*+]\s/.test(l.trimStart()))) {
      elements.push(
        createElement('ul', { key: idx, className: 'space-y-2 my-4 ml-4' },
          listLines.map((l, li) =>
            createElement('li', { key: li, className: 'text-stone-400 font-body text-sm flex items-start gap-2' },
              createElement('span', { className: 'text-gold-500 flex-shrink-0 mt-0.5' }, '—'),
              createElement('span', null, inlineMarkdown(l.replace(/^[-*+]\s+/, '')))
            )
          )
        )
      )
      return
    }
    // Ordered list
    if (listLines.every((l) => /^\d+\.\s/.test(l.trimStart()))) {
      elements.push(
        createElement('ol', { key: idx, className: 'space-y-2 my-4 ml-4 list-decimal list-inside' },
          listLines.map((l, li) =>
            createElement('li', { key: li, className: 'text-stone-400 font-body text-sm' },
              inlineMarkdown(l.replace(/^\d+\.\s+/, ''))
            )
          )
        )
      )
      return
    }
    // Blockquote
    if (trimmed.startsWith('> ')) {
      elements.push(
        createElement('blockquote', { key: idx, className: 'border-l-2 border-gold-500 pl-5 italic text-stone-400 text-sm font-body my-4' },
          inlineMarkdown(trimmed.replace(/^>\s?/gm, ''))
        )
      )
      return
    }
    // Mixed block with inline bold headers (e.g. **Term**: description)
    // Default: paragraph
    elements.push(
      createElement('p', { key: idx, className: 'text-stone-400 font-body text-sm leading-relaxed my-3' },
        inlineMarkdown(trimmed.replace(/\n/g, ' '))
      )
    )
  })

  return elements
}

/**
 * Convert inline markdown (bold, italic, code, links) to React nodes.
 * Returns an array of strings/elements.
 */
function inlineMarkdown(text: string): ReactNode {
  // Process in order: bold+italic, bold, italic, code, links
  const parts: ReactNode[] = []
  // Pattern: **bold+italic** | ***bold+italic*** | **bold** | *italic* | `code` | [text](url)
  const pattern = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    if (match[2]) {
      // bold italic
      parts.push(createElement('strong', { key: match.index, className: 'font-semibold text-stone-200 italic' }, match[2]))
    } else if (match[3]) {
      // bold
      parts.push(createElement('strong', { key: match.index, className: 'font-semibold text-stone-200' }, match[3]))
    } else if (match[4]) {
      // italic
      parts.push(createElement('em', { key: match.index, className: 'italic text-stone-300' }, match[4]))
    } else if (match[5]) {
      // code
      parts.push(createElement('code', { key: match.index, className: 'bg-fairway-700 text-gold-400 px-1.5 py-0.5 text-xs rounded font-mono' }, match[5]))
    } else if (match[6] && match[7]) {
      // link
      const isExternal = match[7].startsWith('http')
      const isAmazon = match[7].includes('amazon.com')
      parts.push(createElement('a', {
        key: match.index,
        href: match[7],
        className: isAmazon
          ? 'text-gold-400 hover:text-gold-300 underline transition-colors'
          : 'text-gold-500 hover:text-gold-300 underline transition-colors',
        ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' + (isAmazon ? ' sponsored' : '') } : {}),
      }, match[6]))
    }
    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : createElement('span', null, ...parts)
}
