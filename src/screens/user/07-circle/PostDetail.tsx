import { useState } from 'react'
import { BadgeCheck, MoreHorizontal, Send } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { IconButton } from '@astryxdesign/core/IconButton'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Divider } from '@astryxdesign/core/Divider'
import { Heading } from '@astryxdesign/core/Heading'
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, SayoAvatar } from '../../../components/sayo'
import { ME, REMOVED_REPLY, THREAD, topicLabel } from './data'
import { Byline, HiddenAfterReport, Reactions, RemovedNotice, ReplyItem, type Reaction } from './parts'

export interface PostDetailProps {
  /** The reader's own reaction, if any. */
  reaction?: Reaction | null
  /** Which replies to show. */
  filter?: 'all' | 'pro'
  /** A moderator removed one reply in this thread. */
  withRemovedReply?: boolean
  /** The reader reported a reply; it is hidden for them at once. */
  reportedReplyId?: string
}

/** A post with peer replies and a Verified Professional reply that is unmistakably different. */
export function PostDetail({ reaction = null, filter: initialFilter = 'all', withRemovedReply = false, reportedReplyId }: PostDetailProps) {
  const [mine, setMine] = useState<Reaction | null>(reaction)
  const [filter, setFilter] = useState(initialFilter)
  const [shown, setShown] = useState<string[]>([])
  const post = THREAD
  const replies = withRemovedReply ? [...post.replies.slice(0, 2), REMOVED_REPLY, ...post.replies.slice(2)] : post.replies
  const visible = filter === 'pro' ? replies.filter((r) => r.professional) : replies

  return (
    <Screen
      header={<AppBar title={topicLabel(post.topic)} onBack={() => {}} end={<IconButton label="Post options" variant="ghost" icon={<MoreHorizontal size={20} />} />} />}
      footer={
        <HStack gap={2} vAlign="center">
          <SayoAvatar seed={ME.nickname} size={32} />
          <TextInput label={`Reply as ${ME.nickname}`} isLabelHidden value="" onChange={() => {}} placeholder={`Reply as ${ME.nickname}…`} />
          <IconButton label="Send reply" variant="primary" icon={<Send size={16} />} isDisabled />
        </HStack>
      }
    >
      <VStack gap={5} padding={5}>
        <VStack gap={3}>
          <Byline author={post.author} meta={post.ago} />
          <Display size="sm" as="h1">{post.title}</Display>
          <Text>{post.body}</Text>
          <Reactions selected={mine} onSelect={setMine} />
          {mine && <Text type="supporting">You sent “{mine === 'same' ? 'Same here' : mine === 'support' ? 'Support' : 'Thanks'}”. Reactions aren’t counted or ranked.</Text>}
        </VStack>

        <Divider />

        <HStack hAlign="between" vAlign="center" gap={2} wrap="wrap">
          <Heading level={2}>{replies.length} replies</Heading>
          <SegmentedControl label="Show replies" size="sm" value={filter} onChange={(v) => setFilter(v as 'all' | 'pro')}>
            <SegmentedControlItem value="all" label="All" />
            <SegmentedControlItem value="pro" label="Professional" icon={<BadgeCheck size={14} />} />
          </SegmentedControl>
        </HStack>

        <VStack gap={3}>
          {visible.map((r) =>
            r.id === REMOVED_REPLY.id ? (
              <RemovedNotice key={r.id} kind="reply" />
            ) : r.id === reportedReplyId && !shown.includes(r.id) ? (
              <HiddenAfterReport key={r.id} onShow={() => setShown((s) => [...s, r.id])} />
            ) : (
              <ReplyItem key={r.id} reply={r} />
            ),
          )}
        </VStack>
        <Text type="supporting" justify="center">
          Replies are from other members unless marked Verified Professional. There are no private messages in the Circle.
        </Text>
      </VStack>
    </Screen>
  )
}
