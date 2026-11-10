import type { ReactNode } from 'react'
import { DirectionProvider } from '../DirectionContext'
import { DIRECTIONS, ROUND1_IDS as DIRECTION_IDS, type DirectionId } from '../directions'
import { Logo } from '../Logo'
import { Bullets, DocPage, DocSection, DocTitle, Grid, Label, MiniPhone, Panel, docLine, docMuted } from '../../docs/kit'
import { APPROACHES } from '.'
import type { Approach, ApproachImage, Score } from './types'

const SCORE_LABEL: Record<keyof Approach['scores'], string> = {
  privacy: 'Privacy-safe',
  warmth: 'Warmth',
  distinct: 'Distinctive',
  scalable: 'Easy to scale',
}

function Dots({ value }: { value: Score }) {
  return (
    <span style={{ display: 'inline-flex', gap: 3 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: i <= value ? '#C4007F' : '#E7E3EA' }} />
      ))}
    </span>
  )
}

export function Scorecard({ a, compact = false }: { a: Approach; compact?: boolean }) {
  return (
    <div style={{ display: 'grid', gap: compact ? 4 : 8 }}>
      {(Object.keys(SCORE_LABEL) as (keyof Approach['scores'])[]).map((k) => (
        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, fontSize: compact ? 12 : 13 }}>
          <span style={{ color: docMuted }}>{SCORE_LABEL[k]}</span>
          <Dots value={a.scores[k]} />
        </div>
      ))}
    </div>
  )
}

const heroFor = (a: Approach, d: DirectionId) => a.images.find((i) => i.use === 'hero' && i.direction === d) ?? a.images.find((i) => i.use === 'hero')
const topics = (a: Approach) => a.images.filter((i) => i.use === 'topic')
const empty = (a: Approach) => a.images.find((i) => i.use === 'empty')
const wide = (a: Approach) => a.images.find((i) => i.use === 'wide')

function Pending({ h, label }: { h: number | string; label: string }) {
  return (
    <div style={{ height: h, display: 'grid', placeItems: 'center', background: 'repeating-linear-gradient(45deg,#F6F3F8 0 10px,#FBFAFC 10px 20px)', color: docMuted, fontSize: 12, borderRadius: 12 }}>
      {label}
    </div>
  )
}

function Img({ img, h, fit = 'cover', radius = 0 }: { img?: ApproachImage; h: number | string; fit?: 'cover' | 'contain'; radius?: number }) {
  if (!img) return <Pending h={h} label="Image pending" />
  return <img src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', height: h, objectFit: fit, objectPosition: 'center 30%', borderRadius: radius, background: '#F6F3F8' }} />
}

/** Splash screen with the approach's hero for this direction. */
function SplashMock({ a, d }: { a: Approach; d: DirectionId }) {
  const dir = DIRECTIONS[d]
  const loud = dir.hero.dark
  return (
    <MiniPhone scale={0.5}>
      <DirectionProvider id={d}>
        <div style={{ height: '100%', position: 'relative', background: 'var(--color-background-body)' }}>
          <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '60%' }}><Img img={heroFor(a, d)} h="100%" /></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '46%', background: loud ? 'var(--sayo-hero)' : 'var(--color-background-body)', color: loud ? '#fff' : undefined, borderRadius: '32px 32px 0 0', padding: '30px 28px' }}>
            <Logo height={34} variant={dir.hero.logo} />
            <p className="sayo-display sayo-display--xl" style={{ marginTop: 22, textAlign: 'left' }}>{dir.copy.tagline}</p>
            <p style={{ fontSize: 18, lineHeight: 1.45, marginTop: 12, opacity: 0.85, textAlign: 'left' }}>{dir.copy.splashLine}</p>
          </div>
        </div>
      </DirectionProvider>
    </MiniPhone>
  )
}

/** A Learn card as it would appear in the app. */
function LearnCard({ img, d }: { img?: ApproachImage; d: DirectionId }) {
  return (
    <DirectionProvider id={d}>
      <div className="sayo-card" style={{ overflow: 'hidden', background: 'var(--color-background-surface)' }}>
        <Img img={img} h={150} />
        <div style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-text-accent, var(--color-accent))' }}>LEARN</div>
          <div className="sayo-display sayo-display--sm" style={{ marginTop: 4 }}>{img?.topic ?? 'Topic'}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>3 min read · checked by a professional</div>
        </div>
      </div>
    </DirectionProvider>
  )
}

/** An empty state (e.g. My Reviews with nothing yet). */
function EmptyMock({ img, d }: { img?: ApproachImage; d: DirectionId }) {
  return (
    <DirectionProvider id={d}>
      <div className="sayo-card" style={{ padding: 18, textAlign: 'center', background: 'var(--color-background-surface)' }}>
        <div style={{ width: 140, margin: '0 auto' }}><Img img={img} h={120} fit="contain" radius={12} /></div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12 }}>{DIRECTIONS[d].copy.myReviewsEmpty}</div>
      </div>
    </DirectionProvider>
  )
}

function Column({ a, d, i }: { a: Approach; d: DirectionId; i: number }) {
  const t = topics(a)
  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
      <div style={{ fontWeight: 800 }}>{DIRECTIONS[d].letter} · {DIRECTIONS[d].name}</div>
      <SplashMock a={a} d={d} />
      <div style={{ width: '100%' }}><LearnCard img={t[i % Math.max(t.length, 1)]} d={d} /></div>
      <div style={{ width: '100%' }}><EmptyMock img={empty(a)} d={d} /></div>
    </div>
  )
}

export function ApproachPage({ a }: { a: Approach }) {
  const w = wide(a)
  return (
    <DocPage width={1320}>
      <DocTitle kicker={`Imagery approach ${a.number} of 6`} title={a.name} intro={a.idea} />
      <Grid cols={4} gap={16}>
        <Panel><Label>Why it could work</Label><Bullets items={a.why} /></Panel>
        <Panel><Label>Risks</Label><Bullets items={a.risks} /></Panel>
        <Panel><Label>Best for</Label><Bullets items={a.bestFor} /><div style={{ height: 10 }} /><Label>Avoid for</Label><Bullets items={a.avoidFor} /></Panel>
        <Panel><Label>Scorecard (my read)</Label><Scorecard a={a} /></Panel>
      </Grid>

      <DocSection title="In the app, in each direction" intro="The same approach, art-directed for each brand direction: splash, a Learn card and an empty state.">
        <Grid cols={3} gap={28}>{DIRECTION_IDS.map((d, i) => <Column key={d} a={a} d={d} i={i} />)}</Grid>
      </DocSection>

      <DocSection title="Wide: web, deck and campaign use">
        <Panel pad={0} style={{ overflow: 'hidden', position: 'relative' }}>
          <Img img={w} h={420} />
          {w && (
            <div style={{ position: 'absolute', left: 32, bottom: 32, background: 'rgb(255 255 255 / 0.92)', borderRadius: 16, padding: '18px 22px', maxWidth: 420 }}>
              <Logo height={28} />
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 10, letterSpacing: '-0.01em' }}>Ask in your own words. Get trusted answers. Find the right care.</div>
            </div>
          )}
        </Panel>
      </DocSection>

      <DocSection title="All images and prompts">
        {a.images.length === 0 ? (
          <Pending h={160} label="Images are being generated" />
        ) : (
          <Grid cols={4} gap={14}>
            {a.images.map((img) => (
              <Panel key={img.src} pad={0} style={{ overflow: 'hidden' }}>
                <Img img={img} h={220} fit={img.use === 'empty' ? 'contain' : 'cover'} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    {img.use}{img.direction ? ` · ${DIRECTIONS[img.direction].name}` : ''}{img.topic ? ` · ${img.topic}` : ''}
                  </div>
                  <div style={{ fontSize: 12, color: docMuted, marginTop: 2 }}>{img.ratio}{img.model ? ` · ${img.model}` : ''}</div>
                  <details style={{ marginTop: 6 }}>
                    <summary style={{ fontSize: 12, color: '#C4007F', cursor: 'pointer' }}>Prompt</summary>
                    <div style={{ fontSize: 11, color: docMuted, marginTop: 4, lineHeight: 1.45 }}>{img.prompt}</div>
                  </details>
                </div>
              </Panel>
            ))}
          </Grid>
        )}
      </DocSection>

      {a.notes && a.notes.length > 0 && (
        <DocSection title="Notes from generating these">
          <Panel><Bullets items={a.notes} /></Panel>
        </DocSection>
      )}
    </DocPage>
  )
}

function OverviewCard({ a }: { a: Approach }): ReactNode {
  return (
    <a href={`./?path=/story/brand-round-1-pink-imagery-2-six-approaches--${a.slug}`} target="_top" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Panel pad={0} style={{ overflow: 'hidden', height: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: docLine }}>
          {DIRECTION_IDS.map((d) => <Img key={d} img={heroFor(a, d)} h={190} />)}
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#C4007F' }}>APPROACH {a.number}</div>
          <div style={{ fontSize: 19, fontWeight: 800, margin: '4px 0 6px' }}>{a.name}</div>
          <div style={{ fontSize: 13, color: docMuted, lineHeight: 1.5, marginBottom: 12 }}>{a.idea}</div>
          <Scorecard a={a} compact />
        </div>
      </Panel>
    </a>
  )
}

export function ApproachOverview() {
  return (
    <DocPage width={1320}>
      <DocTitle
        kicker="Brand · Imagery approaches"
        title="Six ways SAYO could look"
        intro="Not palette or type: what the pictures are OF. For a privacy-first app about stigmatised topics, that is the bigger decision. Each approach was generated with Higgsfield and art-directed for all three brand directions. Most products mix two: one for warm brand moments, one for sensitive screens."
      />
      <Grid cols={3} gap={20}>{APPROACHES.map((a) => <OverviewCard key={a.slug} a={a} />)}</Grid>
      <DocSection title="A likely pairing to react to" intro="My starting recommendation, to argue with:">
        <Panel>
          <Bullets
            items={[
              <><b>Brand moments</b> (splash, marketing, Circle welcome): people. Candid (A), or Editorial (C).</>,
              <><b>Sensitive screens</b> (Ask SAYO, reviews, Learn on HIV, GBV, contraception): no faces. Soft 3D objects for topics, Faceless photography or Abstraction for mood.</>,
              <><b>System layer</b> (backgrounds, safety, packaging): the brand-built pattern, so SAYO is recognisable with no photo at all.</>,
            ]}
          />
        </Panel>
      </DocSection>
    </DocPage>
  )
}
