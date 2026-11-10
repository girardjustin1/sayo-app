import { useState } from 'react'
import { Lock, ShieldCheck } from 'lucide-react'
import { Center } from '@astryxdesign/core/Center'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { TextInput } from '@astryxdesign/core/TextInput'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Link } from '@astryxdesign/core/Link'
import { Logo } from '../../brand/Logo'
import '../../styles/console.css'

export interface SignInProps {
  /** credentials · code (second step) · error (wrong details) · locked (too many attempts) */
  step?: 'credentials' | 'code' | 'error' | 'locked'
}

/** Professional sign-in. No case or patient information is visible before this succeeds. */
export function SignIn({ step = 'credentials' }: SignInProps) {
  const [email, setEmail] = useState(step === 'credentials' ? '' : 'efua.m@example.com')
  const [password, setPassword] = useState(step === 'credentials' ? '' : '••••••••••')
  const [code, setCode] = useState('')
  const isCode = step === 'code'

  return (
    <VStack className="sayo-auth-page">
      <Center axis="both" padding={6} style={{ minHeight: '100%' }}>
        <VStack gap={5} hAlign="center" width={420}>
          <VStack gap={1} hAlign="center">
            <Logo height={34} />
            <Text type="supporting">Professional review · Pilot</Text>
          </VStack>
          <Card padding={8} width="100%">
            <VStack gap={4}>
              <VStack gap={1}>
                <Heading level={1}>{isCode ? 'Check your email' : 'Professional sign-in'}</Heading>
                <Text type="supporting">
                  {isCode
                    ? 'We sent a 6-digit code to e••••@example.com. It expires in 10 minutes.'
                    : 'For verified health professionals reviewing SAYO cases.'}
                </Text>
              </VStack>
              {step === 'error' && <Banner status="error" title="That email and password don't match." description="Check them and try again. After 5 tries we pause sign-in for 15 minutes." collapsible={false} />}
              {step === 'locked' && <Banner status="warning" title="Sign-in paused for 15 minutes" description="Too many attempts. If this wasn't you, tell the SAYO team." collapsible={false} />}
              {isCode ? (
                <>
                  <TextInput label="Verification code" value={code} onChange={setCode} inputMode="numeric" autoComplete="one-time-code" placeholder="123456" size="lg" hasAutoFocus />
                  <Button label="Verify and continue" variant="primary" size="lg" width="100%" isDisabled={code.length < 6} />
                  <HStack hAlign="between">
                    <Link href="#" size="sm">Send a new code</Link>
                    <Link href="#" size="sm" color="secondary">Use a different account</Link>
                  </HStack>
                </>
              ) : (
                <>
                  <TextInput label="Work email" type="email" value={email} onChange={setEmail} autoComplete="username" size="lg" status={step === 'error' ? { type: 'error' } : undefined} />
                  <TextInput label="Password" type="password" value={password} onChange={setPassword} autoComplete="current-password" size="lg" status={step === 'error' ? { type: 'error' } : undefined} />
                  <Button label="Sign in" variant="primary" size="lg" width="100%" isDisabled={step === 'locked'} />
                  <HStack hAlign="between">
                    <Link href="#" size="sm">Forgot password?</Link>
                    <Link href="#" size="sm">Apply to review</Link>
                  </HStack>
                </>
              )}
            </VStack>
          </Card>
          <VStack gap={2} hAlign="center">
            <HStack gap={1.5} vAlign="center">
              <ShieldCheck size={14} />
              <Text type="supporting" size="sm">Two-step sign-in. Every sign-in is logged.</Text>
            </HStack>
            <HStack gap={1.5} vAlign="center">
              <Lock size={14} />
              <Text type="supporting" size="sm">No case information is shown before you sign in.</Text>
            </HStack>
          </VStack>
        </VStack>
      </Center>
    </VStack>
  )
}
