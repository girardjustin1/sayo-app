import { Heart, ShieldCheck } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { Icon } from '@astryxdesign/core/Icon'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, EmergencyNote } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'

export interface AgeGateProps {
  /** The person answered "No, I'm under 18". */
  underage?: boolean
}

/**
 * 18+ confirmation. A yes/no question only: no date of birth is asked for.
 * "No" ends onboarding kindly and keeps nothing.
 */
export function AgeGate({ underage = false }: AgeGateProps) {
  const { copy } = useDirection()

  if (underage) {
    return (
      <Screen
        header={<AppBar onBack={() => {}} />}
        footer={<Button label="Close SAYO" variant="secondary" size="lg" width="100%" />}
      >
        <VStack gap={5} paddingInline={5} paddingBlockStart={4} paddingBlockEnd={6}>
          <NavIcon icon={<Icon icon={Heart} />} />
          <VStack gap={3}>
            <Display size="md">Thanks for being honest</Display>
            <Text size="lg" color="secondary">
              SAYO’s first pilot is only for women aged 18 and over, so you can’t create an account yet. We hope to welcome you when SAYO opens to younger people.
            </Text>
          </VStack>
          <Banner
            status="success"
            icon={<Icon icon={ShieldCheck} />}
            title="We have not saved anything"
            description="No answer, name or number from this screen is kept."
          />
          <VStack gap={2}>
            <Heading level={3}>Need help now?</Heading>
            <Text color="secondary">A trusted adult, a teacher, or a nurse at your school or local clinic can help you.</Text>
            <EmergencyNote />
          </VStack>
        </VStack>
      </Screen>
    )
  }

  return (
    <Screen
      header={<AppBar onBack={() => {}} />}
      footer={
        <VStack gap={3}>
          <Button label="Yes, I’m 18 or older" variant="primary" size="lg" width="100%" />
          <Button label="No, I’m under 18" variant="secondary" size="lg" width="100%" />
        </VStack>
      }
    >
      <VStack gap={5} paddingInline={5} paddingBlockStart={4}>
        <NavIcon icon={<Icon icon={ShieldCheck} />} />
        <VStack gap={3}>
          <Display size="lg">{copy.ageGateTitle}</Display>
          <Text size="lg" color="secondary">{copy.ageGateBody}</Text>
        </VStack>
        <Text type="supporting">We only ask yes or no. We don’t ask for your date of birth or ID.</Text>
      </VStack>
    </Screen>
  )
}
