import { useLayoutEffect, useRef, type ComponentType, type ReactNode } from 'react'
import { Lock, ArrowUp, Square } from 'lucide-react'
import { AiMark } from '../../../components/sayo'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { Badge } from '@astryxdesign/core/Badge'
import { Banner } from '@astryxdesign/core/Banner'
import { Button } from '@astryxdesign/core/Button'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { ChatMessage, ChatMessageBubble, ChatMessageList } from '@astryxdesign/core/Chat'
import { AppBar } from '../../../components/phone/chrome'
import { AiLabel } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import type { ChatTurn } from '../../../data/types'
import '../../../styles/ask.css'

const noop = () => {}

/** Ask SAYO top bar: back, title, and a quiet privacy reminder. */
export function AskBar({ title = 'Ask SAYO' }: { title?: string }) {
  return (
    <AppBar
      title={title}
      onBack={noop}
      end={
        <HStack gap={1} vAlign="center">
          <Icon icon={Lock} size="xsm" color="secondary" />
          <Text type="supporting" weight="semibold">Private</Text>
        </HStack>
      }
    />
  )
}

/** One AI turn. Always carries the direction's AI label. */
export function AiTurn({ children, metadata, width }: { children: ReactNode; metadata?: ReactNode; width?: string }) {
  const { copy } = useDirection()
  return (
    <ChatMessage sender="assistant" avatar={null} name={<AiLabel label={copy.aiLabel} />} metadata={metadata}>
      <ChatMessageBubble width={width}>{children}</ChatMessageBubble>
    </ChatMessage>
  )
}

/** Non-bubble AI content (cards, banners) in the AI column, still labelled. Spans the full column. */
export function AiBlock({ children }: { children: ReactNode }) {
  const { copy } = useDirection()
  return (
    <ChatMessage sender="assistant" avatar={null} name={<AiLabel label={copy.aiLabel} />}>
      <VStack gap={3} width="100%">{children}</VStack>
    </ChatMessage>
  )
}

export function UserTurn({ children, metadata }: { children: ReactNode; metadata?: ReactNode }) {
  return (
    <ChatMessage sender="user" avatar={null} name={null} metadata={metadata}>
      <ChatMessageBubble>{children}</ChatMessageBubble>
    </ChatMessage>
  )
}

/**
 * Quick replies under an AI question. The always-offered options ("I don't know",
 * "I'd rather not say") come last, so they never compete with real answers.
 */
export function QuickReplies({ options }: { options: string[] }) {
  return (
    <HStack wrap="wrap" gap={2} role="group" aria-label="Quick replies">
      {options.map((o) => <Button key={o} label={o} size="sm" variant="secondary" />)}
    </HStack>
  )
}

/** Renders fixture turns. Only the last AI turn shows its quick replies. */
export function Turns({ turns, showLastOptions = true, extraOptions = [] }: { turns: ChatTurn[]; showLastOptions?: boolean; extraOptions?: string[] }) {
  const lastAi = turns.map((t) => t.from).lastIndexOf('ai')
  return (
    <>
      {turns.map((t, i) =>
        t.from === 'user' ? (
          <UserTurn key={i}>{t.text}</UserTurn>
        ) : (
          <AiTurn
            key={i}
            metadata={
              showLastOptions && i === lastAi && i === turns.length - 1 && t.options ? (
                <QuickReplies options={[...t.options, ...extraOptions]} />
              ) : undefined
            }
          >
            {t.text}
          </AiTurn>
        ),
      )}
    </>
  )
}

/** The conversation. `ask-thread` only scopes the AI-vs-user bubble colours in ask.css. */
export function Thread({ children, streaming = false }: { children: ReactNode; streaming?: boolean }) {
  return (
    <VStack className="ask-thread" paddingInline={4} paddingBlockStart={2} paddingBlockEnd={5}>
      <ChatMessageList align="top" density="compact" isStreaming={streaming}>
        {children}
      </ChatMessageList>
    </VStack>
  )
}

/** Three pulsing dots. Astryx has no typing indicator, so this one stays custom (ask.css). */
export function TypingBubble() {
  const { copy } = useDirection()
  return (
    <ChatMessage sender="assistant" avatar={null} name={<AiLabel label={copy.aiLabel} />}>
      <ChatMessageBubble>
        <span className="ask-typing" role="status" aria-label="SAYO is typing">
          <span /><span /><span />
        </span>
      </ChatMessageBubble>
    </ChatMessage>
  )
}

/**
 * Bottom composer dock: optional notice (error/offline) and sentence starters above,
 * and the permanent quiet "not a diagnosis" line below (research: Alma).
 */
export function Composer({
  value,
  disabled = false,
  stop = false,
  notice,
  starters,
}: {
  value?: string
  disabled?: boolean
  stop?: boolean
  notice?: ReactNode
  starters?: string[]
}) {
  const { copy, locked } = useDirection()
  return (
    <VStack gap={2}>
      {notice}
      {starters && (
        <HStack wrap="wrap" gap={2} role="group" aria-label="Sentence starters">
          {starters.map((s) => <Button key={s} label={s} size="sm" variant="secondary" />)}
        </HStack>
      )}
      <MobileComposer value={value} placeholder={copy.askPlaceholder} disabled={disabled} stop={stop} />
      <Text type="supporting" justify="center">{locked.notDiagnosis}</Text>
    </VStack>
  )
}

/**
 * Single-row mobile composer: text and send button share one vertical centre and the
 * pill grows only when the text wraps. (Astryx's ChatComposer is a desktop layout with a
 * separate action row, which looks stranded on a phone.) Styled by `.sayo-composer` in sayo.css.
 */
export function MobileComposer({ value = '', placeholder, disabled = false, stop = false }: { value?: string; placeholder: string; disabled?: boolean; stop?: boolean }) {
  const rows = Math.min(5, Math.max(1, Math.ceil(value.length / 34)))
  return (
    <div className="sayo-composer" data-disabled={disabled || undefined}>
      <textarea className="sayo-composer__input" rows={rows} placeholder={placeholder} defaultValue={value} disabled={disabled} aria-label={placeholder} />
      <button type="button" className="sayo-composer__send" aria-label={stop ? 'Stop' : 'Send'} data-ready={(value.length > 0 || stop) || undefined} disabled={disabled}>
        {stop ? <Square size={14} fill="currentColor" /> : <ArrowUp size={18} strokeWidth={2.5} />}
      </button>
    </div>
  )
}

/**
 * Scrolls the phone body on mount so a story opens where the moment is: the end of
 * the conversation, or (with `anchor`) a given element near the top of the view.
 */
export function ScrollToEnd({ anchor }: { anchor?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const body = ref.current?.closest('.sayo-screen__body') as HTMLElement | null
    if (!body) return
    const target = anchor ? (body.querySelector(anchor) as HTMLElement | null) : null
    body.scrollTop = target
      ? target.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop - 12
      : body.scrollHeight
  })
  return <span ref={ref} aria-hidden />
}

/** Marks every AI-written card, in addition to the AI label. */
export function AiTag({ children = 'Written by AI' }: { children?: string }) {
  return <Badge variant="neutral" icon={<AiMark size={12} />} label={children} />
}

/**
 * Prototype-only marker: this wording is a draft and needs clinical and/or legal
 * sign-off before real use. Hide it in user-testing builds with `signOff={false}`.
 */
export function SignOffFlag({ who = 'clinical & legal' }: { who?: string }) {
  return <Banner status="warning" title="Draft wording" description={`Needs ${who} sign-off before real use.`} />
}

/**
 * Icon + sentence rows (what a professional sees, how review works, safety tips).
 * The icon centres on the first line, however long the sentence runs.
 */
export function NoteList({ items }: { items: { icon: ComponentType; color?: 'secondary' | 'accent' | 'success' | 'error' | 'warning'; text: ReactNode; key?: string }[] }) {
  return (
    <List edge="flush" density="compact">
      {items.map((it, i) => (
        <ListItem
          key={it.key ?? i}
          align="first-line"
          startContent={<Icon icon={it.icon} size="sm" color={it.color ?? 'secondary'} />}
          label={typeof it.text === 'string' ? <Text>{it.text}</Text> : it.text}
        />
      ))}
    </List>
  )
}
