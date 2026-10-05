"""Heuristic keyword-stuffing cleanup for generated articles."""
import re

SENT_SPLIT = re.compile(r'(?<=[.!?])\s+(?=[A-Z*"(])')


def _is_list_sentence(s):
    """Sentence that is basically a comma list of keyword variants."""
    segs = [x for x in re.split(r',|\bor\b|\band\b', s) if x.strip()]
    golfy = sum(1 for x in segs if 'golf' in x.lower())
    return (len(segs) >= 4 and golfy >= 3) or s.lower().count('golf') >= 5


def _short_form(kw):
    k = re.sub(r'^(best|top)\s+', '', kw.lower()).strip()
    words = k.split()
    if words and words[-1] == 'golf' and len(words) > 1:      # "clean irons golf" -> "clean irons"
        return ' '.join(words[:-1])
    return words[-1]                                           # head noun: "cart", "balls", "charger"


def _cap_like(src, repl):
    return repl[:1].upper() + repl[1:] if src[:1].isupper() else repl


def destuff(content, primary_kw):
    stats = {'h1_removed': 0, 'list_sentences': 0, 'kw_replaced': 0}
    blocks = content.split('\n\n')
    out = []
    for i, b in enumerate(blocks):
        t = b.strip()
        if not t:
            continue
        if t.startswith('# ') and '\n' not in t:           # duplicate H1 (page already renders one)
            stats['h1_removed'] += 1
            continue
        if t.startswith(('#', '-', '*', '|', '1.', '>')) and not t.startswith('**'):
            # list items: drop the ones that are pure keyword-variant enumerations
            if t.startswith(('-', '*')):
                lines = t.split('\n')
                kept = [l for l in lines if not _is_list_sentence(l)]
                stats['list_sentences'] += len(lines) - len(kept)
                if kept:
                    out.append('\n'.join(kept))
                continue
            out.append(t)
            continue
        sents = SENT_SPLIT.split(t)
        kept = [s for s in sents if not _is_list_sentence(s)]
        stats['list_sentences'] += len(sents) - len(kept)
        if kept:
            out.append(' '.join(kept))
    text = '\n\n'.join(out)

    # unbold inline keyword spans (bold used only to stuff keywords)
    def unbold(m):
        inner = m.group(1)
        if inner.rstrip().endswith(':') or 'golf' not in inner.lower():
            return m.group(0)
        stats['unbolded'] = stats.get('unbolded', 0) + 1
        return inner
    text = re.sub(r'(?<!^)(?<!\n)\*\*([^*\n]{3,80})\*\*', unbold, text)

    # sentences with 3+ "golf": keep the first, drop the redundant ones ("epon golf irons or raw golf irons")
    def thin_golf(par):
        if par.lstrip().startswith(('#', '|')):
            return par
        def fix_sentence(sent):
            if len(re.findall(r'\bgolf\b', sent, re.I)) < 3:
                return sent
            n = {'i': 0}
            def drop(m):
                n['i'] += 1
                if n['i'] == 1:
                    return m.group(0)
                stats['golf_thinned'] = stats.get('golf_thinned', 0) + 1
                return ''
            sent = re.sub(r'\bgolf\s+(?=[a-z0-9])|\s+golf\b(?=[\s.,;:!?])', drop, sent)
            return sent
        return ' '.join(fix_sentence(x) for x in SENT_SPLIT.split(par))
    text = '\n'.join(thin_golf(l) for l in text.split('\n'))

    # scrambled keyword variants ("golf cart 4 seats facing forward", "adjust governor yamaha golf cart")
    text = _replace_variants(text, primary_kw, stats)

    # cap exact-match primary keyword (paragraph text only; headings/FAQ questions untouched)
    kw = re.sub(r'^(best|top)\s+', '', primary_kw.lower()).strip()
    if len(kw.split()) >= 2:
        short = _short_form(kw)
        words = len(re.findall(r'\w+', text))
        allowed = max(3, words // 300)
        unnatural = kw.endswith(' golf')                    # e.g. "clean irons golf": never natural
        base = re.escape(kw[:-1] if kw.endswith('s') and not kw.endswith('ss') else kw)
        pat = re.compile(r'\b' + base + r's?\b', re.I)
        seen = {'n': 0}
        lines = text.split('\n')
        for li, line in enumerate(lines):
            if line.lstrip().startswith(('#', '|')) or (line.lstrip().startswith('**') and line.rstrip().endswith('**')):
                continue
            def repl(m, line=line):
                seen['n'] += 1
                if seen['n'] <= allowed and not unnatural:
                    return m.group(0)
                before = line[max(0, m.start() - 12):m.start()].lower()
                det = re.search(r'\b(a|an|the|your|this|these|that|those|their|our|any|each|every|new|used|quality|good|right)\s$', before)
                if not det and not unnatural:
                    return m.group(0)          # preceded by a modifier/brand or sentence start: leave it
                stats['kw_replaced'] += 1
                rep = short
                matched_plural = m.group(0).lower().endswith('s')
                if not unnatural:
                    if rep.endswith('s') and not rep.endswith('ss') and not matched_plural:
                        rep = rep[:-1]
                    elif not rep.endswith('s') and matched_plural:
                        rep = rep + 's'
                    if det and det.group(1) in ('a', 'an') and rep.endswith('s') and not rep.endswith('ss'):
                        rep = rep[:-1]
                    if det and det.group(1) == 'an' and rep[:1] not in 'aeiou':
                        return rep  # caller keeps "an"; rare, accept
                return _cap_like(m.group(0), rep)
            lines[li] = pat.sub(repl, line)
        text = '\n'.join(lines)
    return text, stats


def destuff_text(s, primary_kw):
    """For FAQ answers / meta: only fix the unnatural '<x> golf' keyword form."""
    kw = re.sub(r'^(best|top)\s+', '', primary_kw.lower()).strip()
    if kw.endswith(' golf') and len(kw.split()) > 1:
        s = re.sub(r'\b' + re.escape(kw) + r'\b', lambda m: _cap_like(m.group(0), _short_form(kw)), s, flags=re.I)
    return s


def _stem(w):
    w = w.lower()
    if len(w) > 4 and w.endswith('ies'): return w[:-3] + 'y'
    if len(w) > 3 and w.endswith('s') and not w.endswith('ss'): return w[:-1]
    if len(w) > 5 and w.endswith('ing'): return w[:-3]
    if len(w) > 4 and w.endswith('ed'): return w[:-2]
    return w

STOPW = {'best', 'top', 'the', 'a', 'an', 'for', 'of', 'to', 'in', 'on', 'with', 'how', 'guide', 'review'}


def _replace_variants(text, primary_kw, stats):
    """Normalise scrambled keyword variants to the natural keyword order (paragraph text only)."""
    kw = re.sub(r'^(best|top)\s+', '', primary_kw.lower()).strip()
    kws = [w for w in re.findall(r"[a-z0-9']+", kw) if w not in STOPW]
    if len(kws) < 3 or kw.endswith(' golf'):
        return text
    target = sorted(_stem(w) for w in kws)
    target_seq = [_stem(w) for w in kws]
    n = len(kws)
    out_lines = []
    for line in text.split('\n'):
        if line.lstrip().startswith(('#', '**', '|')):
            out_lines.append(line)
            continue
        tok = list(re.finditer(r"[A-Za-z0-9']+", line))
        spans = []
        i = 0
        while i < len(tok):
            hit = None
            if tok[i].group(0).lower() not in STOPW:
                for L in (n, n + 1):
                    if i + L > len(tok):
                        continue
                    window = tok[i:i + L]
                    if window[-1].group(0).lower() in STOPW:
                        continue
                    seg = line[window[0].start():window[-1].end()]
                    if any(c in seg for c in '.,;:!?()"'):
                        continue
                    ws = [w.group(0).lower() for w in window if w.group(0).lower() not in STOPW]
                    if len(ws) != n:
                        continue
                    stems = [_stem(w) for w in ws]
                    if sorted(stems) == target and stems != target_seq:
                        hit = (window[0].start(), window[-1].end(), ws)
                        break
            if hit:
                spans.append(hit)
                i += n
            else:
                i += 1
        for a, b, ws in reversed(spans):
            # keep grammatical number of the original head noun
            plural_src = any(w.endswith('s') and not w.endswith('ss') and _stem(w) == _stem(kws[-1]) for w in ws)
            det = re.search(r'\b(a|an|the|your|this|these|those|many|most|comparing|purchasing|buying|choosing)\s$', line[max(0, a - 12):a].lower())
            if not det:
                continue
            d = det.group(1)
            if d in ('a', 'an', 'this'):
                plural_src = False
            elif d in ('these', 'those', 'many', 'most', 'comparing'):
                plural_src = True
            words = kw.split()
            head = words[-1]
            if plural_src and not head.endswith('s'):
                head += 's'
            elif not plural_src and head.endswith('s') and not head.endswith('ss'):
                head = head[:-1]
            rep = ' '.join(words[:-1] + [head])
            line = line[:a] + _cap_like(line[a:b], rep) + line[b:]
            stats['variants'] = stats.get('variants', 0) + 1
        out_lines.append(line)
    return '\n'.join(out_lines)
