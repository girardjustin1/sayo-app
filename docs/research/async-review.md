# Verified professional review: async queue, waiting state, response

Mobbin research for SAYO, 2026-11-10. "Image" links expire around 2026-12-10. All screens are iOS.

SAYO's model is async: no live chat, no video and no booking. Most US telehealth apps on Mobbin (Hims/Hers, Ro) work the same way, so their status and response screens map well.

## Right after sending: "what happens next"

- **Ro: "Great news! Your information was successfully submitted."**: [screen](https://mobbin.com/screens/4f1b2a26-79ae-4154-b286-741e351ff7d9) · [image](https://mobbin.com/api/mcp/short/tlyUuczc)
  A vertical "WHAT'S NEXT" timeline: Submitted ✓ → **Provider review, "Typically within 2–3 days"** (expanded to say what the provider will do) → later steps.
  **Takeaway:** the best model for SAYO's after-sending screen. Use three steps, "Sent → Being reviewed → Response ready", each with a typical time.
- **Alan: General medicine**: [screen](https://mobbin.com/screens/6cbf0c5d-7aed-4921-aa5c-cac618fb8d5e) · [image](https://mobbin.com/api/mcp/short/l7utfW75)
  "We reply in 30 minutes, from 7:00 to 23:00. And as quickly as possible at night." There is also a "See the medical team" link.
  **Takeaway:** state reply hours honestly and show who answers. This builds trust in the "verified" part.
- **Alan: Mental well-being**: [screen](https://mobbin.com/screens/ade174b4-c1b8-436a-b522-d1353764cf56) · [image](https://mobbin.com/api/mcp/short/W5wBZu0a)
  The "Chat by message" card lists "With the Alan health team · Reply within 24 hours on weekdays · Free". A "Help is available" crisis card sits at the bottom.
  **Takeaway:** an async option card that says who replies, how soon and the cost, with safety always one tap away.
- **Airbnb: "Your reservation is pending. Your Host has 24 hours to confirm."**: [screen](https://mobbin.com/screens/773b6968-34cf-4415-8873-3ccb37f5b0f0) · [image](https://mobbin.com/api/mcp/short/f1xhGmeU)
  A summary card with a "Pending" pill.
  **Takeaway:** a time-bound promise plus a status pill on the item.
- **Superpower: "We received your sample — ready in 5–7 days"**: [screen](https://mobbin.com/screens/5c8e11ba-1d6e-4802-be01-f0fd16217455) · [image](https://mobbin.com/api/mcp/short/9j9bh7YS)
  A three-step tracker (Scheduled → Processing → Results Ready) on the home card.
  **Takeaway:** show the case status on SAYO's home screen, not only inside the case.
- **Warby Parker: "We are verifying your uploaded Rx — update within 24 hours"**: [screen](https://mobbin.com/screens/0d2a686a-b3dd-480b-ac56-4773395debf8) · [image](https://mobbin.com/api/mcp/short/v9QqDIqv)
  An inline status card in a list.
- **Turo: "We'll notify you when they respond"**: [screen](https://mobbin.com/screens/fb28d67a-0e73-43bd-9c70-3c11ead80da2) · [image](https://mobbin.com/api/mcp/short/HPN0oqmQ)
  A lilac privacy callout with a lock icon: "Your host can only view these photos to confirm… and they can't screenshot them."
  **Takeaway:** at the moment of sending, tell the user exactly who will see their case (one verified professional) and what they won't see (e.g. their Circle username).
- **Bond: "Requested" pill, with the composer disabled and the note "Asking questions will unlock once your request is approved!"**: [screen](https://mobbin.com/screens/0b868c0c-1032-4b4a-85ee-2b0cc3b265a0) · [image](https://mobbin.com/api/mcp/short/z4DqBuQc)
  **Takeaway:** when something is locked during the wait, say why.
- **Hers: loading checklist**: [screen](https://mobbin.com/screens/44f7a26e-46b8-4512-a432-598171fb7885) · [image](https://mobbin.com/api/mcp/short/ZX6qtqAW)
  A stepwise checklist ("Gathering your responses ✓ / Calculating ✓ / Preparing…") gives honest progress while the AI summary is generated.
- **Hims ("One moment — searching our network for your provider")**: [screen](https://mobbin.com/screens/f416c17e-bd3f-4a02-ba8a-69035c02b8fa)
  **Future Pro ("Just a moment")**: [screen](https://mobbin.com/screens/8864362f-5255-4e6c-b0cc-2f3bc71cc8f3)
  **WHOOP ("This can take several minutes. We'll notify you when it is ready.")**: [screen](https://mobbin.com/screens/05318606-60c7-42a4-8587-5e265bd44414)
  Simpler spinner versions. WHOOP's copy is the useful part.
- **Search note:** a search naming Talkspace or BetterHelp returned a tool error ("Failed to execute search"). A reworded search ("therapy app… request is pending") returned no therapy apps. Airbnb, Bond, Future Pro, Partiful, Mindvalley and Zocdoc came back instead, and the useful ones are listed above.

## The case thread and system events

- **Hims: per-topic treatment channel**: [screen](https://mobbin.com/screens/30b14c19-488e-4f68-a837-687859333287) · [image](https://mobbin.com/api/mcp/short/7Jp51Yi1)
  A header card reads "Welcome to your Skincare: Acne treatment channel. This is where you'll chat with licensed providers…" A system bubble says "A provider is reviewing your information and will message you here."
  **Takeaway:** give each SAYO case its own thread with an expectation-setting header. Because SAYO is async, the composer should be closed while the case is being reviewed.
- **Future Pro: system event cards inside the thread ("Coach Changed: Lee Owens is now your coach")**: [screen](https://mobbin.com/screens/4f233213-fc0d-4f08-8d4d-528ea9d2f581) · [image](https://mobbin.com/api/mcp/short/05mlu16I)
  **Takeaway:** use the same card style for "A verified professional has picked up your case" and "Response ready".
- **Ro: closed conversation**: [screen](https://mobbin.com/screens/3a5bdd3c-4e3c-41f3-a261-06c93b3ed47e) · [image](https://mobbin.com/api/mcp/short/1AmWSKE2)
  A clinician letter card (photo, name and timestamp), then "This conversation is closed. Still need help? **Start a new conversation**."
  **Takeaway:** a clear end state for a case, with a way to start again.

## The professional's response

- **Hims: doctor message**: [screen](https://mobbin.com/screens/97deb4af-27f2-43d5-a3fd-f53797a78a05) · [image](https://mobbin.com/api/mcp/short/8s3tvYS4)
  The header shows an initials avatar, the clinician's name, a "Dr." badge and a licence number (NPI) above a long letter.
  **Takeaway:** show the credential at the top. Avoid the wall of text below it.
- **Superpower: Concierge**: [screen](https://mobbin.com/screens/e95dfce5-6c0c-4146-8bbb-17eff35df24b) · [image](https://mobbin.com/api/mcp/short/ihB8PJMR)
  Numbered, headed sections ("2) Rebuild Iron Stores") with "What to change" bullets.
  **Takeaway:** SAYO's response should be structured in the same way, with fixed sections:
  1. **My thoughts**
  2. **Do you need in-person care?** (None / Routine / Urgent)
  3. **What kind of service**, linking to Find Care
- **Ada: per-item care level ("Seek emergency care" / "Seek medical advice") with icons, and a pink "Needs immediate attention" banner**: [screen](https://mobbin.com/screens/7c4637e5-2e41-4267-88d1-5a34711a2136) · [image](https://mobbin.com/api/mcp/short/WzMUYN3h)
  **Takeaway:** a visual model for the three-level care decision. Give each level its own icon and colour, and use colour for "Urgent" only.
- **Apple Health: "Next Steps" plus "The results of your questionnaire are not a diagnosis" plus "Learn More" cards**: [screen](https://mobbin.com/screens/3c8ad2b2-26b9-4931-b8ab-d08688e05b31) · [image](https://mobbin.com/api/mcp/short/ZWCJ9VpS)
- **Hers: provider message ending "If you have any medical questions feel free to message me back at any time" and linking to a public health-centre finder**: [screen](https://mobbin.com/screens/10abe866-8ae0-4ddc-b370-1f78c2937fa1) · [image](https://mobbin.com/api/mcp/short/gr0t10aU)
  **Takeaway:** the response should hand off to Find Care. Note that SAYO's MVP is one response per case, not an open-ended thread.

## Notifications for "response ready"

See onboarding-privacy.md: Fixtured (preview the exact notification text) and Granola (ask for permission at the moment it matters). No Mobbin screen showed a health app's lock-screen notification text, so that wording is SAYO's own decision.
