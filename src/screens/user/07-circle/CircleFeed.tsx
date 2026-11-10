import { useState } from 'react'
import { BookOpen, MessageSquarePlus, PenLine } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { IconButton } from '@astryxdesign/core/IconButton'
import { Icon } from '@astryxdesign/core/Icon'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { Screen } from '../../../components/phone/chrome'
import { Display, SayoAvatar } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { CIRCLE_TOPICS, FEED, ME, topicLabel, type CircleTopic } from './data'
import { PostCard } from './parts'
import { FilterRow } from './ui'
import '../../../styles/community.css'

export interface CircleFeedProps {
  /** Selected topic chip. */
  topic?: CircleTopic | 'all'
  /** Hide the moderator-removed placeholder in the feed. */
  hideRemoved?: boolean
}

const TOPIC_OPTIONS: { id: CircleTopic | 'all'; label: string }[] = [{ id: 'all', label: 'All' }, ...CIRCLE_TOPICS]

/** The Circle feed: topic chips, peer posts, a floating "Post" button. No photos, no DMs. */
export function CircleFeed({ topic: initialTopic = 'all', hideRemoved = false }: CircleFeedProps) {
  const { copy } = useDirection()
  const [topic, setTopic] = useState<CircleTopic | 'all'>(initialTopic)
  const posts = FEED.filter((p) => (topic === 'all' || p.topic === topic) && !(hideRemoved && p.removed))
  const isEmpty = posts.filter((p) => !p.removed).length === 0

  return (
    <Screen
      tab="circle"
      header={
        isEmpty ? undefined : (
          <span className="cm-fab">
            <Button label="Post" variant="primary" size="lg" elevation="med" icon={<PenLine size={18} />} />
          </span>
        )
      }
    >
      <VStack gap={5} paddingBlockStart={2} paddingBlockEnd={10}>
        <VStack gap={3} paddingInline={5}>
          <HStack hAlign="between" vAlign="center">
            <Display size="md" as="h1">The Circle</Display>
            <IconButton label="Circle guidelines" tooltip="Circle guidelines" variant="ghost" icon={<BookOpen size={20} />} />
          </HStack>
          <Text type="supporting">{copy.circleIntro}</Text>
          <HStack gap={2} vAlign="center">
            <SayoAvatar seed={ME.nickname} size={24} />
            <Text type="supporting">You’re <Text type="supporting" weight="semibold" color="primary">{ME.nickname}</Text> here. Your private chats stay private.</Text>
          </HStack>
        </VStack>

        <FilterRow label="Topics" value={topic} options={TOPIC_OPTIONS} onChange={setTopic} />

        <VStack gap={3} paddingInline={5}>
          {isEmpty ? (
            <EmptyState
              icon={<Icon icon={MessageSquarePlus} size="lg" color="accent" />}
              title={copy.circleEmpty}
              description={topic !== 'all' ? `Nothing in ${topicLabel(topic)} yet. Your question might be the one someone else is waiting for.` : undefined}
              headingLevel={2}
              actions={<Button label="Start a post" variant="primary" icon={<PenLine size={16} />} />}
            />
          ) : (
            posts.map((p) => <PostCard key={p.id} post={p} />)
          )}
        </VStack>
      </VStack>
    </Screen>
  )
}
