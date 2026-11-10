import { useState } from 'react'
import { ArrowRight, Lock, RefreshCw } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Icon } from '@astryxdesign/core/Icon'
import { TextInput } from '@astryxdesign/core/TextInput'
import { TextArea } from '@astryxdesign/core/TextArea'
import { Banner } from '@astryxdesign/core/Banner'
import { Grid } from '@astryxdesign/core/Grid'
import { SelectableCard } from '@astryxdesign/core/SelectableCard'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { SayoAvatar } from '../../../components/sayo'
import { CIRCLE_TOPICS, ME, findIdentifyingDetails, type CircleTopic } from './data'

export interface ComposePostProps {
  initialTopic?: CircleTopic | null
  initialTitle?: string
  initialBody?: string
}

/** New Circle post: shows exactly what others will see, asks for a topic, and warns about identifying details. */
export function ComposePost({ initialTopic = null, initialTitle = '', initialBody = '' }: ComposePostProps) {
  const [topic, setTopic] = useState<CircleTopic | null>(initialTopic)
  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const found = findIdentifyingDetails(`${title} ${body}`)
  const canPost = !!topic && title.trim().length > 0 && body.trim().length > 0 && found.length === 0

  return (
    <Screen
      header={<AppBar title="New post" onBack={() => {}} />}
      footer={<Button label="Post to the Circle" variant="primary" size="lg" width="100%" isDisabled={!canPost} />}
    >
      <VStack gap={5} padding={5}>
        <Card>
          <VStack gap={3}>
            <Text type="supporting" weight="semibold">What others see</Text>
            <HStack gap={3} vAlign="center" hAlign="between">
              <HStack gap={3} vAlign="center">
                <SayoAvatar seed={ME.nickname} size={40} />
                <VStack gap={0}>
                  <Text weight="bold">{ME.nickname}</Text>
                  <Text type="supporting">Nickname and avatar only</Text>
                </VStack>
              </HStack>
              <Button label="Change" variant="ghost" size="sm" icon={<RefreshCw size={14} />} />
            </HStack>
            <HStack gap={2} vAlign="start">
              <Icon icon={Lock} size="sm" color="secondary" />
              <Text type="supporting">Your Ask SAYO chats and professional reviews are never linked to this name.</Text>
            </HStack>
          </VStack>
        </Card>

        <VStack gap={2}>
          <Text weight="semibold">Topic</Text>
          <Grid columns={2} gap={2} role="radiogroup" aria-label="Topic">
            {CIRCLE_TOPICS.map((t) => (
              <SelectableCard key={t.id} label={t.label} isSelected={topic === t.id} onChange={() => setTopic(t.id)}>
                <Text weight={topic === t.id ? 'semibold' : 'normal'}>{t.label}</Text>
              </SelectableCard>
            ))}
          </Grid>
        </VStack>

        <TextInput label="Title" value={title} onChange={setTitle} placeholder="Ask or share in a sentence" />
        <TextArea label="Say more" value={body} onChange={setBody} rows={6} placeholder="Share as much or as little as you like. No names, numbers or places." />

        {found.length > 0 && (
          <Banner
            status="warning"
            collapsible={false}
            title="This might identify someone"
            description={`It looks like your post includes ${found.join(' and ')}. To keep you and others safe, please remove it before posting.`}
          />
        )}

        <Card variant="muted">
          <VStack gap={2}>
            <Text weight="bold">Before you post</Text>
            <Text type="supporting">
              No real names, phone numbers, socials or locations: yours or anyone else’s. Be kind. Members share experiences, not medical advice.
            </Text>
            <HStack><Button label="Read the guidelines" variant="secondary" size="sm" endContent={<Icon icon={ArrowRight} />} /></HStack>
          </VStack>
        </Card>
      </VStack>
    </Screen>
  )
}
