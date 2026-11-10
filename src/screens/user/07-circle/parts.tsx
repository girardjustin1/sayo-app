import { BadgeCheck, EyeOff, Flag, HandHeart, MessageCircle, ShieldOff, Sparkles, Users } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { IconButton } from '@astryxdesign/core/IconButton'
import { Badge } from '@astryxdesign/core/Badge'
import { Card } from '@astryxdesign/core/Card'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Icon } from '@astryxdesign/core/Icon'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { ToggleButton, ToggleButtonGroup } from '@astryxdesign/core/ToggleButton'
import { ProBadge, SayoAvatar } from '../../../components/sayo'
import type { CircleReply } from '../../../data/types'
import { ME, topicLabel, type FeedPost } from './data'

/** Nickname line. Marks the signed-in user's own content with "You". */
export function Byline({ author, meta }: { author: string; meta?: string }) {
  return (
    <HStack gap={2} vAlign="center">
      <SayoAvatar seed={author} size={36} />
      <VStack gap={0}>
        <HStack gap={1.5} vAlign="center">
          <Text weight="semibold">{author}</Text>
          {author === ME.nickname && <Badge label="You" />}
        </HStack>
        {meta && <Text type="supporting">{meta}</Text>}
      </VStack>
    </HStack>
  )
}

/** Muted placeholder shared by removed and hidden content. Never shows what was said. */
function Placeholder({ icon, children }: { icon: React.ComponentType; children: React.ReactNode }) {
  return (
    <Card variant="muted" role="note">
      <HStack gap={3} vAlign="start">
        <Icon icon={icon} color="secondary" />
        <VStack gap={1}>{children}</VStack>
      </HStack>
    </Card>
  )
}

/** Placeholder where moderators removed a post or reply. Never shows what was said. */
export function RemovedNotice({ kind = 'post' }: { kind?: 'post' | 'reply' }) {
  return (
    <Placeholder icon={ShieldOff}>
      <Text type="supporting">This {kind} was removed by SAYO moderators because it broke the Circle guidelines.</Text>
      <Text type="supporting">The person who wrote it has been told why.</Text>
    </Placeholder>
  )
}

/** Shown to someone who reported a reply: hidden for them straight away. */
export function HiddenAfterReport({ onShow }: { onShow?: () => void }) {
  return (
    <Placeholder icon={EyeOff}>
      <Text type="supporting">You reported this. It’s hidden for you while moderators check it.</Text>
      <HStack><Button label="Show anyway" variant="secondary" size="sm" onClick={onShow} /></HStack>
    </Placeholder>
  )
}

/** One post in the feed: title + two-line snippet. Reply count only; no reaction scores. */
export function PostCard({ post }: { post: FeedPost }) {
  if (post.removed) return <RemovedNotice />
  const proReplied = post.replies.some((r) => r.professional)
  const n = post.replies.length
  return (
    <ClickableCard label={post.title}>
      <VStack gap={3}>
        <Byline author={post.author} meta={`${topicLabel(post.topic)} · ${post.ago}`} />
        <VStack gap={1}>
          <Text weight="bold" type="large">{post.title}</Text>
          <Text type="supporting" maxLines={2}>{post.body}</Text>
        </VStack>
        <HStack gap={3} vAlign="center" wrap="wrap">
          <HStack gap={1.5} vAlign="center">
            <Icon icon={MessageCircle} size="sm" color="secondary" />
            <Text type="supporting">{n === 0 ? 'Be the first to reply' : `${n} ${n === 1 ? 'reply' : 'replies'}`}</Text>
          </HStack>
          {proReplied && <Badge variant="green" icon={<BadgeCheck size={12} />} label="A professional replied" />}
        </HStack>
      </VStack>
    </ClickableCard>
  )
}

export type Reaction = 'support' | 'same' | 'thanks'
export const REACTIONS: { id: Reaction; label: string; icon: React.ReactNode }[] = [
  { id: 'support', label: 'Support', icon: <HandHeart size={16} /> },
  { id: 'same', label: 'Same here', icon: <Users size={16} /> },
  { id: 'thanks', label: 'Thanks', icon: <Sparkles size={16} /> },
]

/** Reactions with no counts, so nothing becomes a popularity contest. */
export function Reactions({ selected, onSelect }: { selected: Reaction | null; onSelect?: (r: Reaction | null) => void }) {
  return (
    <ToggleButtonGroup label="React to this post" type="single" size="sm" value={selected} onChange={(v) => onSelect?.(v as Reaction | null)}>
      {REACTIONS.map((r) => <ToggleButton key={r.id} value={r.id} label={r.label} icon={r.icon} />)}
    </ToggleButtonGroup>
  )
}

/**
 * A reply. A peer reply is a plain card with a generated avatar. A professional reply
 * differs three ways: Verified Professional badge, role line, and a green tinted card.
 */
export function ReplyItem({ reply, onReport }: { reply: CircleReply; onReport?: () => void }) {
  if (reply.professional) {
    return (
      <Card variant="green" role="article" aria-label={`Verified Professional reply from ${reply.author}`}>
        <VStack gap={2}>
          <HStack gap={2} vAlign="center">
            <Avatar name={reply.author.replace(/^(Dr\.|Nurse)\s+/, '')} size="md" shape="rounded" tooltip={false} />
            <VStack gap={0}>
              <Text weight="semibold">{reply.author}</Text>
              <Text type="supporting">{reply.professional.profession} · {reply.ago}</Text>
            </VStack>
          </HStack>
          <HStack><ProBadge /></HStack>
          <Text>{reply.body}</Text>
          <Text type="supporting">General information from a verified professional. Not a personal diagnosis.</Text>
        </VStack>
      </Card>
    )
  }
  const mine = reply.author === ME.nickname
  return (
    <Card>
      <VStack gap={2}>
        <HStack gap={2} vAlign="center" hAlign="between">
          <Byline author={reply.author} meta={reply.ago} />
          {!mine && <IconButton label={`Report reply from ${reply.author}`} variant="ghost" size="sm" icon={<Flag size={16} />} onClick={onReport} />}
        </HStack>
        <Text>{reply.body}</Text>
      </VStack>
    </Card>
  )
}
