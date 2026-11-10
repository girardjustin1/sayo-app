import { MessageSquareText } from 'lucide-react'
import { AiLabel } from '../../../components/sayo'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Card } from '@astryxdesign/core/Card'
import { Icon } from '@astryxdesign/core/Icon'
import { Blockquote } from '@astryxdesign/core/Blockquote'
import { Collapsible } from '@astryxdesign/core/Collapsible'
import type { Concern } from '../../../data/types'

/** The user's own words and SAYO's summary, collapsed by default. */
export function WhatYouSent({ concern, defaultOpen = false }: { concern: Concern; defaultOpen?: boolean }) {
  return (
    <Card>
      <Collapsible
        defaultIsOpen={defaultOpen}
        trigger={
          <HStack gap={2} vAlign="center">
            <Icon icon={MessageSquareText} color="secondary" />
            <Text weight="semibold">What you sent</Text>
          </HStack>
        }
      >
        <VStack gap={4} paddingBlockStart={3}>
          <VStack gap={1}>
            <Text type="supporting" weight="semibold">In your words · {concern.createdAt}</Text>
            <Blockquote>{concern.originalMessage}</Blockquote>
          </VStack>
          <VStack gap={1}>
            <AiLabel label="Summary you checked" />
            <Text>{concern.summary}</Text>
          </VStack>
          {concern.followUps.length > 0 && (
            <VStack gap={2}>
              <Text type="supporting" weight="semibold">Your answers</Text>
              {concern.followUps.map((f) => (
                <VStack key={f.q} gap={0}>
                  <Text type="supporting">{f.q}</Text>
                  <Text>{f.a}</Text>
                </VStack>
              ))}
            </VStack>
          )}
        </VStack>
      </Collapsible>
    </Card>
  )
}
