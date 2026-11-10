import { ArrowRight } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Icon } from '@astryxdesign/core/Icon'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, ProBadge } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { R2Img, type R2Slot } from '../../../brand/rounds/round2/imagery'
import '../../../styles/bento.css'

const noop = () => {}

/** Every Learn piece carries this line: how long, and that a professional checked it. */
const META = '3 min read · checked by a professional'

export type LearnTopic = 'prep' | 'contraception' | 'mood'

interface Article {
  id: LearnTopic
  slot: R2Slot
  /** Title in two tones: `lead` is plain, `promise` takes the direction's emphasis. */
  lead: string
  promise: string
  /** PLACEHOLDER section headings. The body under each is placeholder text too. */
  sections: string[]
}

/** SAMPLE DATA. Titles are real; all body text is a placeholder that needs clinical review. */
const ARTICLES: Article[] = [
  { id: 'prep', slot: 'topic-prep', lead: 'PrEP is ', promise: 'prevention', sections: ['What PrEP is', 'Who it can be for', 'How to get it'] },
  { id: 'contraception', slot: 'topic-contraception', lead: 'Your ', promise: 'contraception options', sections: ['The main types', 'Choosing what fits you', 'Where to get it'] },
  { id: 'mood', slot: 'topic-mood', lead: 'When your mood ', promise: 'feels heavy', sections: ['What it can feel like', 'Small things that can help', 'When to reach out'] },
]

/**
 * Two-tone title (the Hers headline move). Directions with an emphasis style (italic in
 * Ink and Clay, colour in Grove) pick out the promise; the others show it plain.
 */
function TwoTone({ article, size, as }: { article: Article; size: 'sm' | 'lg'; as: 'h1' | 'h3' }) {
  const { direction } = useDirection()
  return (
    <Display size={size} as={as}>
      {direction.emphasize ? <>{article.lead}<em>{article.promise}</em></> : article.lead + article.promise}
    </Display>
  )
}

export interface LearnProps {
  /** 'list' = the Learn cards · 'article' = one article open. */
  view?: 'list' | 'article'
  /** Which article is open in the article view. */
  topic?: LearnTopic
}

/**
 * Learn: short editorial reads. This is written, professionally checked content, not AI,
 * so it carries no AI label. Every article ends with a way to ask SAYO about it.
 */
export function Learn({ view = 'list', topic = 'prep' }: LearnProps) {
  return view === 'article' ? <LearnArticle article={ARTICLES.find((a) => a.id === topic) ?? ARTICLES[0]} /> : <LearnList />
}

function LearnList() {
  const { direction } = useDirection()
  return (
    <Screen header={<AppBar title="Learn" onBack={noop} />} tab="home">
      <VStack gap={5} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={6}>
        <Text type="large" color="secondary">Short reads in plain words, each one checked by a verified professional.</Text>
        <VStack gap={4}>
          {ARTICLES.map((a) => (
            <ClickableCard key={a.id} label={a.lead + a.promise} padding={0} className="bento-tile" onClick={noop}>
              <VStack>
                <R2Img direction={direction.id} slot={a.slot} height={152} />
                <HStack padding={4} gap={3} hAlign="between" vAlign="end">
                  <VStack gap={1.5}>
                    <TwoTone article={a} size="sm" as="h3" />
                    <Text type="supporting">{META}</Text>
                  </VStack>
                  <Icon icon={ArrowRight} color="secondary" />
                </HStack>
              </VStack>
            </ClickableCard>
          ))}
        </VStack>
      </VStack>
    </Screen>
  )
}

function LearnArticle({ article }: { article: Article }) {
  const { direction } = useDirection()
  return (
    <Screen
      header={<AppBar title="Learn" onBack={noop} />}
      footer={<Button label="Ask SAYO about this" variant="primary" size="lg" width="100%" endContent={<Icon icon={ArrowRight} size="sm" />} />}
    >
      <VStack gap={5} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={6}>
        <R2Img direction={direction.id} slot={article.slot} height={220} radius="var(--radius-container)" />
        <VStack gap={3}>
          <Text type="supporting" weight="semibold">{META}</Text>
          <TwoTone article={article} size="lg" as="h1" />
          <HStack gap={3} vAlign="center">
            <Avatar name="Efua M." tooltip={false} />
            <VStack gap={1} hAlign="start">
              <Text type="supporting">Checked by Dr. Efua M., medical doctor</Text>
              <ProBadge />
            </VStack>
          </HStack>
        </VStack>
        <Banner status="warning" title="Placeholder text" description="This article is not written yet. The words below mark where it will go and need clinical review before real use." />
        {article.sections.map((s) => (
          <VStack key={s} gap={2}>
            <Heading level={2}>{s}</Heading>
            <Text color="secondary">Placeholder. Two or three plain sentences will go here, written with the clinical lead and checked by a verified professional before anyone reads them.</Text>
          </VStack>
        ))}
        <Text type="supporting">Learn articles are general health information, not personal medical advice.</Text>
      </VStack>
    </Screen>
  )
}
