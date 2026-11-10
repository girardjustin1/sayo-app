import { useMemo, useState } from 'react'
import { LocateFixed, MapPinOff, MessageCircleHeart, Navigation, Search, SearchX } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { Icon } from '@astryxdesign/core/Icon'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Screen } from '../../../components/phone/chrome'
import { CareDecisionTag, Display, ProBadge, ProBlock, SERVICE_CATEGORY_LABEL } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import type { CareDecision, ServiceCategory } from '../../../data/types'
import { FilterRow } from '../07-circle/ui'
import { AREAS, CARE_SERVICES, CATEGORY_CHIPS } from './data'
import { CareServiceRow, CrisisCard } from './parts'

export interface FindCareProps {
  /** Pre-selected category filter. */
  category?: ServiceCategory | 'all'
  /** Arrived from a professional's review: shows who recommended what. */
  fromReview?: { professional: string; profession: string; decision: CareDecision; category: ServiceCategory }
  /** granted: distances shown · denied: ask for an area · manual: an area the user picked. */
  location?: 'granted' | 'denied' | 'manual'
  /** Search text (drives the no-results state). */
  query?: string
}

const CATEGORY_OPTIONS: { id: ServiceCategory | 'all'; label: string }[] = [{ id: 'all', label: 'All' }, ...CATEGORY_CHIPS]

/** Find Care: verified services near you, filterable by category. Call or get directions; never book. */
export function FindCare({ category = 'all', fromReview, location = 'granted', query: initialQuery = '' }: FindCareProps) {
  const { copy } = useDirection()
  const [cat, setCat] = useState<ServiceCategory | 'all'>(fromReview?.category ?? category)
  const [query, setQuery] = useState(initialQuery)
  const [area, setArea] = useState<string | null>(location === 'manual' ? 'Osu' : null)
  const needsArea = location === 'denied' && !area

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARE_SERVICES.filter((s) => (cat === 'all' || s.categories.includes(cat)))
      .filter((s) => !q || `${s.name} ${s.type} ${s.area} ${s.offers.join(' ')}`.toLowerCase().includes(q))
  }, [cat, query])

  return (
    <Screen tab="care">
      <VStack gap={5} paddingBlockStart={2} paddingBlockEnd={6}>
        <VStack gap={2} paddingInline={5}>
          <Display size="md" as="h1">Find Care</Display>
          <Text type="supporting">{copy.findCareIntro}</Text>
        </VStack>

        {fromReview && (
          <VStack paddingInline={5}>
            <ProBlock title={`${fromReview.professional} suggested: ${SERVICE_CATEGORY_LABEL[fromReview.category]}`}>
              <VStack gap={2}>
                <HStack gap={1.5} wrap="wrap">
                  <ProBadge profession={fromReview.profession} />
                  <CareDecisionTag decision={fromReview.decision} />
                </HStack>
                <Text type="supporting">We’ve filtered the list to match. You can change the filter any time.</Text>
              </VStack>
            </ProBlock>
          </VStack>
        )}

        <VStack gap={3}>
          <VStack paddingInline={5}>
            <TextInput label="Search services" isLabelHidden value={query} onChange={setQuery} placeholder="Search by name, area or service" startIcon={Search} hasClear />
          </VStack>
          <FilterRow label="Filter by type of care" value={cat} options={CATEGORY_OPTIONS} onChange={setCat} />
        </VStack>

        <VStack gap={3} paddingInline={5}>
          {location === 'granted' && (
            <HStack gap={1.5} vAlign="center">
              <Icon icon={LocateFixed} size="sm" color="secondary" />
              <Text type="supporting">Near your current location · nearest first</Text>
            </HStack>
          )}
          {location !== 'granted' && area && (
            <HStack gap={2} hAlign="between" vAlign="center">
              <HStack gap={1.5} vAlign="center">
                <Icon icon={Navigation} size="sm" color="secondary" />
                <Text type="supporting">Showing services around {area}</Text>
              </HStack>
              <Button label="Change area" variant="ghost" size="sm" onClick={() => setArea(null)} />
            </HStack>
          )}

          {(cat === 'gbv' || cat === 'mental_health') && !needsArea && <CrisisCard kind={cat} />}

          {needsArea ? (
            <Banner
              status="info"
              icon={<MapPinOff size={20} />}
              collapsible={false}
              title="Location is off. That’s okay."
              description="Pick an area, or type a town in the search box. SAYO only uses it to sort this list; it isn’t saved."
            >
              <VStack gap={3}>
                <HStack gap={2} wrap="wrap" role="group" aria-label="Choose an area">
                  {AREAS.map((a) => <Button key={a} label={a} variant="secondary" size="sm" onClick={() => setArea(a)} />)}
                </HStack>
                <HStack><Button label="Use my location instead" variant="ghost" size="sm" icon={<LocateFixed size={16} />} /></HStack>
              </VStack>
            </Banner>
          ) : results.length === 0 ? (
            <EmptyState
              icon={<Icon icon={SearchX} size="lg" color="accent" />}
              title={`No verified services match${query ? ` “${query}”` : ''}`}
              description="We’re still adding services during the pilot. Try another word or type of care, or ask a professional where to go."
              headingLevel={2}
              actions={
                <VStack gap={2} hAlign="center">
                  <Button label="Clear search and filters" variant="secondary" onClick={() => { setQuery(''); setCat('all') }} />
                  <Button label="Ask SAYO" variant="ghost" icon={<MessageCircleHeart size={16} />} />
                </VStack>
              }
            />
          ) : (
            results.map((s) => <CareServiceRow key={s.id} service={s} showDistance={location === 'granted'} />)
          )}

          {!needsArea && (
            <Text type="supporting" justify="center">
              SAYO doesn’t book appointments. Call ahead to confirm opening hours before you go.
            </Text>
          )}
        </VStack>
      </VStack>
    </Screen>
  )
}
