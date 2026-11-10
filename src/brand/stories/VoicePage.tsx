import { DIRECTIONS, LOCKED_COPY, type DirectionCopy, type DirectionId } from '../directions'
import { DocPage, DocSection, DocTitle, Grid, Panel, docLine, docMuted } from '../../docs/kit'


const ROWS: { key: keyof DirectionCopy; label: string }[] = [
  { key: 'tagline', label: 'Tagline' },
  { key: 'splashLine', label: 'Splash line' },
  { key: 'ageGateTitle', label: '18+ check' },
  { key: 'pinTitle', label: 'PIN title' },
  { key: 'pinBody', label: 'PIN body' },
  { key: 'homeGreeting', label: 'Home greeting' },
  { key: 'homePrompt', label: 'Home prompt' },
  { key: 'askPlaceholder', label: 'Ask placeholder' },
  { key: 'aiLabel', label: 'AI label' },
  { key: 'summaryIntro', label: 'Summary check' },
  { key: 'summaryConfirm', label: 'Confirm button' },
  { key: 'reviewReadyTitle', label: 'Review ready (in app)' },
  { key: 'notificationLock', label: 'Lock-screen notification' },
  { key: 'circleIntro', label: 'Circle intro' },
  { key: 'circleEmpty', label: 'Circle empty' },
  { key: 'findCareIntro', label: 'Find Care intro' },
  { key: 'errorGeneric', label: 'Error' },
  { key: 'ctaPrimary', label: 'Primary CTA' },
]

const value = (c: DirectionCopy, k: keyof DirectionCopy) => {
  const v = c[k]
  if (typeof v === 'function') return v('Ama')
  if (Array.isArray(v)) return v.map((s) => s.title).join(' · ')
  return v
}

/** Every app line written in each direction's voice, plus the locked copy. */
export function VoicePage({ ids, kicker }: { ids: DirectionId[]; kicker: string }) {
  return (
    <DocPage width={ids.length > 3 ? 1640 : 1320}>
      <DocTitle
        kicker={kicker}
        title="Same moment, three voices"
        intro="Every line the app says, written three ways. Pick a voice, or mix: many teams use a warmer voice for marketing and a calmer one inside the product. Safety and clinical wording (below) never changes."
      />
      <Panel pad={0} style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, lineHeight: 1.45 }}>
          <thead>
            <tr style={{ background: '#F6F3F8', textAlign: 'left' }}>
              <th style={{ padding: '12px 16px', width: 170, fontSize: 12, color: docMuted }}>MOMENT</th>
              {ids.map((id) => (
                <th key={id} style={{ padding: '12px 16px' }}>
                  {DIRECTIONS[id].letter} · {DIRECTIONS[id].name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.key} style={{ borderTop: `1px solid ${docLine}`, verticalAlign: 'top' }}>
                <td style={{ padding: '12px 16px', color: docMuted, fontSize: 13 }}>{r.label}</td>
                {ids.map((id) => (
                  <td key={id} style={{ padding: '12px 16px', fontFamily: id === 'unmuted' && r.key === 'tagline' ? "'Fraunces Variable', serif" : undefined, fontWeight: r.key === 'tagline' ? 700 : 400 }}>
                    {value(DIRECTIONS[id].copy, r.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>

      <DocSection title="Onboarding, three ways">
        <Grid cols={ids.length}>
          {ids.map((id) => (
            <Panel key={id}>
              <div style={{ fontWeight: 800, marginBottom: 10 }}>{DIRECTIONS[id].letter} · {DIRECTIONS[id].name}</div>
              {DIRECTIONS[id].copy.onboarding.map((s, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontWeight: 700 }}>{i + 1}. {s.title}</div>
                  <div style={{ fontSize: 14, color: docMuted }}>{s.body}</div>
                </div>
              ))}
            </Panel>
          ))}
        </Grid>
      </DocSection>

      <DocSection title="Locked copy" intro="Fixed by the master context or by safety. Same words in every direction. Changes need sign-off from the clinical lead.">
        <Panel pad={0} style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <tbody>
              {Object.entries(LOCKED_COPY).map(([k, v]) => (
                <tr key={k} style={{ borderTop: `1px solid ${docLine}`, verticalAlign: 'top' }}>
                  <td style={{ padding: '10px 16px', width: 170, fontFamily: 'ui-monospace, monospace', fontSize: 12, color: docMuted }}>{k}</td>
                  <td style={{ padding: '10px 16px' }}>{typeof v === 'string' ? v : Object.values(v).join(' · ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </DocSection>

      <DocSection title="Rules for every voice">
        <Grid cols={2}>
          <Panel>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>
              <li>Name topics plainly: HIV, STIs, PrEP, PEP, contraception, sex, rape. Never “wellness”.</li>
              <li>AI never says “you have…”. It says what something <i>can</i> be and what to do next.</li>
              <li>Always say what happens next and roughly when.</li>
              <li>User autonomy: offer, don’t push. “Not now” is always a fine answer.</li>
            </ul>
          </Panel>
          <Panel>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.6 }}>
              <li>Lock-screen text never names a health topic or emotion.</li>
              <li>Inside safety and GBV flows every direction speaks in the calm voice: short, believing, no emoji.</li>
              <li>Write for a phone read in a hurry: one idea per sentence, short paragraphs.</li>
              <li>Ghanaian English spelling and examples; test with pilot users before finalising.</li>
            </ul>
          </Panel>
        </Grid>
      </DocSection>
    </DocPage>
  )
}
