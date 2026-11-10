# SAYO: UX research synthesis

*Mobbin research, 2026-11-10, for the designer and the doctor-founder.*

## How this was done

- **Searches:** about 40 searches on Mobbin (iOS screens and flows, plus web for the professional and admin tools). Two searches failed with a tool error and were reworded and run again.
- **What's in these files:** only screens the tool actually returned are cited. Where Mobbin had nothing relevant (quick exit, disguised app icon, health-app lock-screen notification text), we say so.
- **Mobbin collection** with about 40 key screens and flows: https://mobbin.com/collections/f88d1d26-7ac7-472f-8f3e-b52a05ee2e7e/mobile/screens. It is private to the account owner and their teammates.
- **Detail files:** [onboarding-privacy](onboarding-privacy.md) · [ai-intake](ai-intake.md) · [async-review](async-review.md) · [find-care](find-care.md) · [circle-community](circle-community.md) · [safety-gbv](safety-gbv.md) · [pro-admin](pro-admin.md)
- **Screenshot links** (mobbin.com/api/mcp/short/…) expire around 2026-12-10. Download any you need. The mobbin.com/screens/… links don't expire.

---

## 14 recommendations

### 1. One privacy promise screen with one plain sentence. Age confirmation goes in the same step.
**Pillar:** Onboarding and privacy

Show a single light, warm screen that says in one or two sentences what SAYO does and doesn't do with your data. Fold "I confirm I am 18 or older" into a single line on that screen; don't build a separate age-verification flow. Never ask for a legal name or ID.

- Bevel, "Your Data, Your Control": [screen](https://mobbin.com/screens/1df5738f-ecf7-4b44-bcc6-7541affe4a87)
- Wysa, "private & anonymous, so there is no login… I confirm I am 13 or older": [screen](https://mobbin.com/screens/cab4f7de-ed2c-442c-835e-930d34031d7c)
- Counter-example: 7-Eleven's 14-screen ID check ([flow](https://mobbin.com/flows/86f66a9b-9561-4b92-b675-bc244303352a))

### 2. Repeat a short privacy line at every sensitive entry point
**Pillars:** All

Show a one-line reminder right where the user acts:
- Starting Ask SAYO: "Only you can see this."
- Sending to a professional: "One verified professional will read this. Your Circle name is never shared."
- First Circle post: "Others only see your username and avatar."

References:
- Gentler Streak ([screen](https://mobbin.com/screens/709ce134-543f-433b-a4a7-73749b7992d3)) and BitePal ([screen](https://mobbin.com/screens/af5234db-93d1-42a6-a2f7-89aa28d07c6f)): a promise right under the main button.
- Turo ([screen](https://mobbin.com/screens/fb28d67a-0e73-43bd-9c70-3c11ead80da2)): a lock-icon callout saying who can see what.
- WHOOP ([screen](https://mobbin.com/screens/c51bc186-30b6-43d3-8c88-e4518ef7fe5e)) and Oura ([screen](https://mobbin.com/screens/b39b51ed-bdf7-4f02-bd32-a2ec53fb66d1)): privacy shown right before a sensitive feature.

### 3. Offer the PIN right after the first private conversation, in a calm style, with recovery always visible
**Pillar:** Privacy (PIN on private conversations)

- Offer the 4-digit PIN as "Protect your conversations?", with "Set PIN" and "Not now", at the moment the user has something to protect.
- Use a light, round-key keypad.
- Always show "Forgot PIN?".
- Group the PIN and all discretion settings in one "Privacy" section.

References:
- Tabby, opt-in prompt: [screen](https://mobbin.com/screens/5e78ea5d-a18a-4360-9883-70e54d9ffd2c)
- Alan, calm keypad: [screen](https://mobbin.com/screens/f0e4e34d-c12e-4e5b-8589-89d302946b77)
- Monzo, "I forgot my PIN": [screen](https://mobbin.com/screens/72c5018c-2590-4263-af0b-6d816debf83d)
- Clue, Data & privacy settings group: [screen](https://mobbin.com/screens/67872707-9e92-4421-823e-0796a56fc049)

### 4. Discreet notifications: previews off by default, and show the exact lock-screen text before asking permission
**Pillars:** Privacy and professional review

- Ask for notification permission only after the user sends a case for review ("Want a discreet alert when your answer is ready?").
- Show a mock lock-screen card with SAYO's real generic text.
- Keep a "Show message previews" toggle, off by default.
- Keep thread and case titles neutral (not "Sex check-in").

References:
- Fixtured, sample notifications shown before asking: [screen](https://mobbin.com/screens/fac12af3-b7ad-4ea7-a2ef-ab09e53a3d37)
- Granola, "Get notified when your notes are ready": [screen](https://mobbin.com/screens/796e5918-9efd-42e4-855c-3cb7b3593ad0)
- Telegram, preview and name toggles: [screen](https://mobbin.com/screens/77b75e7d-5ac6-4082-915e-85d4e86aee6b)
- Counter-example: Flo's visible "Sex check-in" thread title ([screen](https://mobbin.com/screens/4699be5b-4201-4eca-b2d3-dc4d38f9f77f))
- Gap: Mobbin had no health app's lock-screen notification text, so the wording is SAYO's own decision.

### 5. "In your own words" means a big text box plus sentence starters, never a tight character limit
**Pillar:** Ask SAYO

- After "What's up?", optional topic chips (with "Something else") lead to a full-height free-text box.
- Starter chips such as "I'm worried about…", "Since…" and "It started when…" help people who don't know where to begin.
- No visible character countdown.

References:
- Bloom, "What's on your mind?" with starter chips: [screen](https://mobbin.com/screens/868c5272-110b-422e-8f6b-08566a4f6614)
- Noom, chips plus optional details: [screen](https://mobbin.com/screens/425e978e-5f24-4546-b155-e491c41e0dbb)
- Headspace, "Something else": [screen](https://mobbin.com/screens/6aba84cc-e359-446c-8cf3-b10cae809456)
- Counter-example: Calm's "297 characters left" ([screen](https://mobbin.com/screens/a650c632-970d-4028-ba89-845d978b34f7))

### 6. Follow-up questions: one at a time, reflect back first, always offer "I don't know"
**Pillar:** Ask SAYO

- The AI reflects back what it heard ("So it's been about a week…"), then asks a single question.
- Structured questions use tappable pills that always include "I don't know" and "I'd rather not say", with free text still allowed.
- Past answers can be edited.

References:
- Ahead, warm reflect-back and "select all that apply": [screen](https://mobbin.com/screens/29b3524d-623e-47bf-a483-96b3100d9ac7). Closest to SAYO's tone.
- Oura medical chat, one question at a time with empathy lines: [screen](https://mobbin.com/screens/d9c75407-2a3c-41ed-aed1-9dee47613a44)
- Ada, pill answers including "I don't know": [screen](https://mobbin.com/screens/eea76783-e15c-4ca4-8908-0b7c5d3bc389)

### 7. Red-flag and safety questions are single-tap YES/NO inside the chat, and a "yes" shows urgent help first
**Pillars:** Ask SAYO and GBV safety

Ask "Are you in immediate danger right now?" and "Is it safe for you to continue using this device?" as large YES/NO bars in the conversation, each with a privacy line ("Your answer stays private"). A "yes" to danger stops the questionnaire and shows the urgent-help screen, with "Continue talking" offered afterwards.

References:
- Lemonade, chat YES/NO bar: [screen](https://mobbin.com/screens/c87ff7ed-0cf7-42da-acfb-a13673054ee0)
- Lyft, "Did you feel unsafe?" with "won't be shared with the driver": [screen](https://mobbin.com/screens/c16ba3e5-f95b-4e08-8c1d-bcd9be341b7c)
- Ada, "Needs immediate attention" banner: [screen](https://mobbin.com/screens/7c4637e5-2e41-4267-88d1-5a34711a2136)

### 8. The AI summary reads like sentences, with the user's facts tappable to correct
**Pillar:** Ask SAYO, then professional review

- Show the summary as two or three plain sentences ("You've had *lower belly pain* for *about 5 days*…").
- Each highlighted fact can be tapped and changed.
- Parts the AI is unsure about get a soft amber "Please check this" flag.
- Then explain exactly what happens on "Send to a professional" (or "Keep it private").

References:
- Hers, consultation summary with inline highlighted answers: [screen](https://mobbin.com/screens/fea54d82-85d4-43d3-9c26-2c9c271c6709). Best match.
- Bevel, "This may be incorrect — please review": [screen](https://mobbin.com/screens/a4e9028a-d28e-45ba-af21-1d92b34f4e37)
- Visible, "once submitted, can no longer be changed": [screen](https://mobbin.com/screens/14c7efb9-6786-499d-a3a1-f889205f5d6e)

### 9. After sending: a three-step "what's next" timeline with honest typical times, also shown on home
**Pillar:** Professional review (async)

- Show a three-step timeline: Sent ✓ → Being reviewed by a verified professional (typically within X hours) → Response ready.
- Show the same status as a card on the home screen.
- State reply hours honestly and link to "Who are SAYO's professionals?".

References:
- Ro, "What's next" timeline with "Typically within 2–3 days": [screen](https://mobbin.com/screens/4f1b2a26-79ae-4154-b286-741e351ff7d9)
- Alan, "We reply in 30 minutes, from 7:00 to 23:00" plus "See the medical team": [screen](https://mobbin.com/screens/6cbf0c5d-7aed-4921-aa5c-cac618fb8d5e)
- Superpower, tracker on the home card: [screen](https://mobbin.com/screens/5c8e11ba-1d6e-4802-be01-f0fd16217455)
- Hims, case channel with "A provider is reviewing your information": [screen](https://mobbin.com/screens/30b14c19-488e-4f68-a837-687859333287)

### 10. The professional response uses three fixed sections, a visible credential and colour-coded care levels
**Pillar:** Professional review

The response has a header (name or initials, "Verified Professional ✓", role) and then three sections:
1. **My thoughts**
2. **Do you need in-person care?** with three levels, each with its own icon. Only Urgent uses a strong colour.
3. **Where to go**, a service category that opens Find Care already filtered.

End the response with "SAYO doesn't diagnose" and "Start a new question".

References:
- Hims, clinician header with credential: [screen](https://mobbin.com/screens/97deb4af-27f2-43d5-a3fd-f53797a78a05)
- Superpower, numbered headed sections: [screen](https://mobbin.com/screens/e95dfce5-6c0c-4146-8bbb-17eff35df24b)
- Ada, care-level icons: [screen](https://mobbin.com/screens/7c4637e5-2e41-4267-88d1-5a34711a2136)
- Apple Health, "not a diagnosis": [screen](https://mobbin.com/screens/3c8ad2b2-26b9-4931-b8ab-d08688e05b31)
- Ro, closed case plus "Start a new conversation": [screen](https://mobbin.com/screens/3a5bdd3c-4e3c-41f3-a261-06c93b3ed47e)

### 11. Find Care cards lead with Call and Directions, never Book, and carry a "Verified by SAYO" mark
**Pillar:** Find Care

- **Card:** name, type, area, an "open now" line where known, and **Call** and **Directions** buttons.
- **Location:** typed town or "use my location", never forced.
- **Detail page:** hours, services offered, the "Verified by SAYO" row, and the same tick used for Verified Professionals.
- **Sensitive categories:** "Support after violence" and "Mental health" also carry a crisis card.

References:
- Alan, "Call to make an appointment" as the primary button: [screen](https://mobbin.com/screens/173dd189-fddb-4c73-9689-309b24a63698)
- Wysa, agency cards with a Call pill: [screen](https://mobbin.com/screens/4f960da9-882f-422a-8bad-0f17dd8261fd)
- CVS, Call and Get directions: [screen](https://mobbin.com/screens/d60ea93f-9367-4965-a491-9043bb22fd23)
- Fresha, "Verified business" row: [screen](https://mobbin.com/screens/e3a593d6-df18-42fe-a403-da9fb695e7d2)
- Walmart, optional "Use my current location": [screen](https://mobbin.com/screens/4b195e1c-1de5-401e-99a8-a24c6050d010)

### 12. Circle identity: a generated username and illustrated avatar, with a preview of what others see
**Pillar:** The Circle

- Suggest a random two-word username with "Try another", and offer an illustrated avatar set (no photo upload).
- Show a small "what others see" preview that makes the separation clear: your private chats are never linked to this name.
- Use SAYO's own avatar style so it isn't a Flo look-alike.

References:
- Flo, generated username and animal avatars: [screen](https://mobbin.com/screens/ab72af68-a679-4cf9-85aa-fbafd0d8d137). Use the mechanics only.
- Clubhouse, "you're now anonymous" before-and-after: [screen](https://mobbin.com/screens/42d229e3-3918-49ee-982c-da9e925f148d)
- Xbox, suggested-name chips: [screen](https://mobbin.com/screens/3503e774-b8cf-409a-bba6-5e9eb18a73c0)
- Peanut, "Incognito" ghost posts: [screen](https://mobbin.com/screens/21ece13c-81bd-4209-bc26-a3c00a6e1060)

### 13. Verified Professional replies stand out three ways (tick and label, role line, tinted card), with an optional filter
**Pillar:** The Circle

- Peer replies stay neutral.
- A professional reply gets "Verified Professional ✓", a role line (e.g. "Midwife"), and a softly tinted card. Colour is never the only signal.
- On busy posts, an "All replies | Verified Professional" toggle lets readers jump to the professional answer.

References:
- Brainly, "Community | Expert-Verified" toggle: [screen](https://mobbin.com/screens/4976da19-c341-4b01-b614-f18f2c002f8a)
- Liven, "EXPERT REVIEWED" pill plus credential: [screen](https://mobbin.com/screens/e51a2af2-bb7d-4314-b291-061965b5ea92)
- LinkedIn, badge plus role line: [screen](https://mobbin.com/screens/5f27d8d8-f0c8-4af2-ab2a-12d69af1583e)

### 14. Short guidelines before the first post, and a reason-based report that hides the content at once
**Pillars:** The Circle and admin

**Guidelines:**
- Show four headed principles plus one "I understand" before the first post.
- Make "Don't share phone numbers, socials or location" an explicit rule, since it is how people get around no-DMs.

**Reporting:**
- Report → reason chips with definitions → the post is hidden for the reporter → "Thanks, this helps keep the Circle safe".
- Add SAYO-specific reasons: "Wrong or harmful health info" and "Someone may be in danger", which goes to the safety team.

**Admin side:** group reports per post, show every reason, approve or remove, and keep a moderation log.

References:
- Nextdoor, four-principle gate: [screen](https://mobbin.com/screens/45520aae-12d2-488d-9185-ce5838bf67e0)
- Vestiaire, "no exchanging personal information" rule: [screen](https://mobbin.com/screens/3873f821-6783-4b6c-8ee3-a5bb8db3c379)
- Reddit, report reason chips: [screen](https://mobbin.com/screens/4de80dc1-c1a3-49f6-ba58-14390c77e091)
- Character AI, report flow with instant hide: [flow](https://mobbin.com/flows/4718a748-8105-4e58-868f-f92a90cfbcad)
- Circle (web), moderation modal with grouped reports: [screen](https://mobbin.com/screens/14890efa-be84-4cf5-8541-fee384c1b459)
- Reddit (web), mod queue and Mod Log: [screen](https://mobbin.com/screens/14b41132-545c-4de3-94bf-dd58460ef7c3)

### Also: the professional and admin tools should borrow from helpdesk tools
**Pillars:** Professional dashboard and admin console (in addition to the 14 above)

**Professional dashboard:**
- Use the views "Waiting (unassigned)" and "My cases", with time waited on every case.
- Show a case preview in a side drawer before **Accept**.
- **Release** is an explicit "no assignee" action with an optional reason.
- The reply form has structured fields (My thoughts, In-person care, Service category) and is sent with a single "Send and close".
- The user-checked AI summary is pinned at the top of each case.

**Admin dashboard:**
- Action items go above the charts: pending professionals, unreviewed reports, and the **oldest waiting case**.
- Approve professionals one at a time from a profile page with Confirm and Reject at the top. No bulk approve.

References:
- HubSpot Help Desk: [screen](https://mobbin.com/screens/f9b9fcf1-0767-4ee5-adad-12003a31331e)
- Zendesk "take it": [screen](https://mobbin.com/screens/f1f0bc5e-8ed7-448c-b870-d94e21b8bca0)
- Klaviyo "No assignee": [screen](https://mobbin.com/screens/b32ed5f6-4f72-4dad-9e46-d5231591c558)
- Gorgias structured fields: [screen](https://mobbin.com/screens/0a1e975b-5e42-4ee0-975d-9a9d5f7c05d3)
- Front, "Oldest 6d 18h": [screen](https://mobbin.com/screens/2447f03a-a38e-42f5-a6b9-ffc1d4bdd6b8)
- Vanta, pending banner above charts: [screen](https://mobbin.com/screens/7c8926ed-5d43-49d9-9175-572ee1708c01)
- 1Password, "Waiting to Be Confirmed": [screen](https://mobbin.com/screens/234af4ed-2432-4964-8331-5cbb686fff4f)

---

## Safety: a persistent way out and a way to help

These apply to the GBV flow and run across all pillars.

- **Urgent help:** a small, always-visible "Get help" pill on every main screen (Wysa's SOS pill, in the [onboarding flow](https://mobbin.com/flows/cff8bd69-80a7-4ed6-ad12-1860bcaad249)).
- **The urgent-help screen** lists free, confidential numbers grouped by need, each with a Call button. It also has a **"Can't call right now?"** section with non-call options.
  - Alan, "Help is available": [screen](https://mobbin.com/screens/aa6b489c-b86c-4492-b477-f3ee9f295810)
  - Wysa, "Can't make a call? Access these": [screen](https://mobbin.com/screens/de96d391-118b-4684-add3-62a5634d2d7e)
  - How We Feel, grouped by need including sexual assault: [screen](https://mobbin.com/screens/8594e649-38c0-4705-b9c7-9355952001ff)
- **Quick exit:** Mobbin had **no** reference for a safety quick-exit. Search results only showed "hold to leave" friction patterns (Opal, FocusFlight, Me+), which are the opposite of what SAYO needs. Design it as **one tap, always in the same spot, switching to a neutral screen and clearing back-navigation**, based on GBV-sector guidance rather than Mobbin.
  - The closest idea found is Revolut's flip-face-down to hide ([screen](https://mobbin.com/screens/79e086a8-5557-4227-b4da-daec2291559b)). It could be an optional extra, not the main exit.

---

## Patterns to avoid

| Avoid | Seen in | Why it's wrong for SAYO |
|---|---|---|
| **Gamification on health or crisis tools**: points, streaks, big vote counts | Finch, energy points on grounding exercises ([screen](https://mobbin.com/screens/a057550d-5b73-4af4-aa54-c28ff457e817)); QUITTR, "10 Day Streak" and 6,664 upvotes ([screen](https://mobbin.com/screens/ba6982fb-4f59-48e4-85a0-c7cd623502b6)) | Turns help-seeking into performance, makes people feel they failed, and creates popularity contests over sensitive posts. |
| **Shame or alarm copy** | QUITTR panic button, "DON'T BREAK THAT PROMISE…" ([screen](https://mobbin.com/screens/035d99cb-dd49-4546-a2cc-b15557e8eebb)); Gopuff "No, I don't want to save" ([screen](https://mobbin.com/screens/dc8f0aa9-d895-4873-a46d-30ac1dc2c4bd)) | SAYO is stigma-free. Declining or struggling should never feel judged. |
| **Friction on leaving** ("hold to leave") | Opal ([screen](https://mobbin.com/screens/e187ab82-450c-4625-8592-e6df33f395a3)), FocusFlight, Me+ | A user in danger must be able to leave instantly. |
| **Flo look-alike** | Flo's coral-pink buttons, animal-avatar grid and Secret Chats layout ([screen](https://mobbin.com/screens/2c21c741-013e-44e4-bc63-d1ee3a2d33fc), [screen](https://mobbin.com/screens/0aa571df-7d67-4562-aedd-930e14c5b274)) | Borrow mechanics, not visuals. Give SAYO its own avatar style and more purple and warm-neutral in the palette. |
| **Dark or cosmic UI** | Stardust ([screen](https://mobbin.com/screens/8db4541e-807a-4ba4-ba15-ebfe33104215)), WHOOP, Oura, QUITTR, How We Feel | Off-brand. SAYO is light and warm. Several good patterns (Oura chat, How We Feel hotlines) need re-skinning. |
| **Explicit imagery or labels visible at a glance** | Clue's sexual-health thumbnails ([screen](https://mobbin.com/screens/ef1335bb-1d1f-475f-b434-fbd5331d96e1)); Flo's "Sex check-in" thread title | Someone looking over the user's shoulder can see them. Use neutral titles and abstract illustration. |
| **Showing condition matches or "% of people had this"** | Ada results ([screen](https://mobbin.com/screens/7c3c259d-a253-47fc-b2e1-06009361432c)) | SAYO never diagnoses. Borrow the care-level tiers only. |
| **Location, DMs or photo profiles in the community** | Lex: city on every post and a "Chat" button ([screen](https://mobbin.com/screens/a5a2c6ad-9c27-4860-a52a-bfcafd057bce)) | Out of MVP scope and a safety risk. |
| **Heavy identity checks** | 7-Eleven ID flow ([flow](https://mobbin.com/flows/86f66a9b-9561-4b92-b675-bc244303352a)) | Breaks anonymity. A self-declared 18+ is enough for the pilot. |
| **Bulk approve for professionals** | Deel "Approve all your pending" ([screen](https://mobbin.com/screens/b6d82ee0-8694-4f55-a1d5-9f0964c8b13c)) | Each credential needs a real check. |
| **Booking-first clinic pages** | Zocdoc ([screen](https://mobbin.com/screens/1005da89-5f47-4ded-89be-13c42e2b4adb)) | Out of scope. Call and Directions only. |

## Gaps Mobbin couldn't fill

These need the team's own design, plus input from GBV and sexual-health practitioners:
- the quick exit
- a disguised app name or icon
- exact lock-screen notification wording
- Ghana-specific hotline and service data
- how the AI summary hands over to a professional while keeping the Circle identity separate
