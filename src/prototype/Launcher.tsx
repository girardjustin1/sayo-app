import { ArrowRight, Monitor, Smartphone } from 'lucide-react'
import { Badge } from '@astryxdesign/core/Badge'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { HStack } from '@astryxdesign/core/HStack'
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl'
import { Switch } from '@astryxdesign/core/Switch'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { Logo } from '../brand/Logo'
import { DIRECTIONS, DIRECTION_IDS, type DirectionId } from '../brand/directions'
import { Screen } from '../components/phone/chrome'
import { Display } from '../components/sayo'
import { FLOWS, type FlowId } from './flows'

/** The prototype's menu: every flow, plus (on a real phone) the brand and hint controls. */
export function Launcher({
  onStart,
  controls,
}: {
  onStart: (id: FlowId) => void
  /** Brand and hint controls, shown when there is no side panel (real phones). */
  controls?: { direction: DirectionId; onDirection: (d: DirectionId) => void; hints: boolean; onHints: (v: boolean) => void }
}) {
  return (
    <Screen>
      <VStack gap={5} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={8}>
        <HStack hAlign="between" vAlign="center">
          <Logo height={28} />
          <Badge label="Prototype" />
        </HStack>
        <VStack gap={2}>
          <Display size="lg">Try SAYO, start to finish.</Display>
          <Text color="secondary">Everything is prefilled and fictional. Pick a flow, then tap what glows.</Text>
        </VStack>
        <VStack gap={3}>
          {FLOWS.map((f, i) => (
            <ClickableCard key={f.id} label={`Start: ${f.title}`} onClick={() => onStart(f.id)}>
              <VStack gap={2}>
                <HStack hAlign="between" vAlign="center">
                  <HStack gap={1.5} vAlign="center">
                    {f.device === 'phone' ? <Smartphone size={14} /> : <Monitor size={14} />}
                    <Text type="supporting" weight="semibold">
                      {i + 1} · {f.who} · {f.device === 'phone' ? 'phone' : 'laptop'}
                    </Text>
                  </HStack>
                  <ArrowRight size={18} />
                </HStack>
                <Text weight="bold" size="lg">{f.title}</Text>
                <Text type="supporting">{f.blurb}</Text>
              </VStack>
            </ClickableCard>
          ))}
        </VStack>
        {controls && (
          <VStack gap={4}>
            <SegmentedControl label="Brand direction" value={controls.direction} onChange={(v) => controls.onDirection(v as DirectionId)} layout="fill">
              {DIRECTION_IDS.map((id) => <SegmentedControlItem key={id} value={id} label={DIRECTIONS[id].name} />)}
            </SegmentedControl>
            <Switch label="Tap hints" description="Glow on the next prefilled step" value={controls.hints} onChange={controls.onHints} />
          </VStack>
        )}
        <Text type="supporting" justify="center">Sample data only · fictional people and clinics</Text>
      </VStack>
    </Screen>
  )
}
