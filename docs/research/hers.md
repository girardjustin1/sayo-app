# Hers (forhers.com): research for G · Grove

*Mobbin and Firecrawl research, 2026-11-10, for the designer and the doctor-founder. It deepens and corrects `hers-brief.md`. The earlier Mobbin work is in [synthesis](synthesis.md) and is not repeated here.*

## How this was done

- **Mobbin:** 12 searches (Hers and Hims, iOS and web). About 100 results came back (with repeats); every screen cited below was looked at as an image.
- **Firecrawl:** the homepage (text, brand tokens and a full-page screenshot), `/weight-loss/app`, `/mental-health`, `/sexual-health`, `/about`, plus one site search.
- **What did not come back:**
  - `/about/how-it-works` redirected to the weight-loss shop page. There is no standalone "how it works" page; the pattern only exists as step cards (see UX pattern 5).
  - `/birth-control` was not scraped. `/sexual-health` exists but is a product list with "Add to cart".
  - No Mobbin search returned a Hers community screen. The site only mentions a "Private Hers Weight Loss community" as a membership perk.
  - No search returned a privacy promise screen. Privacy in the app is a legal menu (see section 4).
- **Caveat:** the Mobbin app captures are older than the live site (messages dated late 2024). They show a white app with black buttons, a rounder typeface and no forest or lime. Treat them as UX evidence, and the 2026 website as the brand evidence.
- Mobbin links (`mobbin.com/screens/…`) do not expire.

---

## 1. Brand system

**What makes it recognisable:** a dark green rounded panel, one lime pill button, a two-tone headline in a medium-weight sans, a small serif wordmark, and one object floating in soft light.

| Element | What Hers does (as returned by the tools) | For Grove |
|---|---|---|
| **Colour** | White page `#FFFFFF`. Forest-olive `#343C2B` panels. Lime `#C5ED82` button with forest text. Teal-sage `#729693` for links and the quiet half of headlines. Black text. Each topic gets its own colour world: olive with a diagonal beam of light (weight), dusty sage (hair), deep teal (labs). Small tiles are a very pale mint. Coral appears only as a one-word accent. | Take the logic: white page, forest for hero panels, lime for the one main action on forest, sage as the second headline tone. Keep everyday screens light. |
| **Type** | One sans, Care Sans, for everything (h1 57px, h2 32px, body 16px). Headlines are medium weight, tightly spaced, sentence case, no full stop. The only serif is the "hers" wordmark. | One sans at medium weight. Let the SAYO logo be the only "different" letterform on screen. |
| **Shape** | Whole sections are rounded panels (about 20px radius) stacked with white gaps. Inputs 18px. Buttons are small pills (48px radius). Tiles carry a chevron or a round "+" chip. A translucent "ghost" pill sits next to the main pill as the second action. | Rounded section panels and pills. One filled pill and one ghost pill per panel, never more. |
| **Imagery** | Five repeating types: (1) one object floating on a gradient with a soft shadow; (2) a woman looking up or away against sky or a blurred street, calm, rarely looking at the camera; (3) a phone in a hand showing the app; (4) a close-up of a hand; (5) small UI pieces (answer chips, chat bubbles) laid over a photo. Clinicians are cut-out portraits in white coats on pale cards with role and specialty tags. | Types 2, 3 and 5 with young Ghanaian women. Replace products with abstract objects. No white-coat photos: initials and profession (see UX pattern 9). |
| **Motion** | Not directly observable. The page data implies: tiles that swap image on hover, rolling number counters, a testimonial carousel, a scrolling row of chips, and app screens that animate in. The app has a dotted ring loader around the "h" and a small rotating text seal on home ([screen](https://mobbin.com/screens/e2df5b43-0d78-47c4-aeb4-be8d9344583d)). | Slow, small motion only: a gentle image shift on tiles and a calm loader. No counters (they exist to sell numbers). |

**The app is not the website.** In the Mobbin captures the app is white and pale mint, with **black** pill buttons, a teal-sage wordmark, purple in the Care/messaging area and tiny pink "Popular / Trending / New" tags ([splash](https://mobbin.com/screens/a753193c-3c68-4e05-a084-0ac02adadbe5), [home](https://mobbin.com/screens/e36b5e4e-8334-43c8-a1a4-4f71ea9f8043), [Care tab](https://mobbin.com/screens/72e737a2-f417-4f39-9cfd-d1f269c68066)). Forest and lime are marketing-surface colours. That supports keeping Grove's forest for hero moments only.

---

## 2. Voice and copy

Short quotes only. The rewrites are suggestions and never replace SAYO's locked copy.

| # | Hers says | Pattern | SAYO-safe rewrite |
|---|---|---|---|
| 1 | "The care you've always deserved" (homepage h1) | **You-deserve promise** | "Your questions deserve real answers." |
| 2 | "Your weight loss **breakthrough is here**" | **Two-tone promise**: plain start, coloured payoff. Here the payoff is an outcome claim. | "A private place **to ask anything**" |
| 3 | "Unsure where to begin? **Start here**" | **Guided entry**: name the doubt, give one door | "Not sure where to begin? **Ask SAYO**" |
| 4 | "What's top of mind for your health right now?" with six options such as "Feeling more like myself mentally" and "Something else" | **First-person option list**: answers written as the user would say them | "What's on your mind today?" Options in her words, ending with "Something else". Exact options need the clinical lead. |
| 5 | "Test what your body's been telling you" | **Validation hook**: your instinct was right | "You noticed something. Let's talk it through." |
| 6 | "Knows you, knows what's next" | **Parallel pair** | "Ask privately. Work out your next step." |
| 7 | "AI-powered, expert-led care. All in one seamless conversation." | **AI plus human pairing** | "SAYO helps you put it into words. A verified professional can review it." (Not "one conversation": SAYO's review is not live chat.) |
| 8 | "For if you're feeling anxious, depressed, or just not like yourself." | **Everyday words plus a catch-all** ("or just…") | "For when something feels off, or you just want to check." |
| 9 | "If your colleagues don't have your back, we do." | **On-your-side line** | "No judgement. No silly questions." |
| 10 | "…pharmacy lines, or raised eyebrows." | **Names the stigma lightly** | "No waiting room. No raised eyebrows." |
| 11 | "You're not alone." followed by a statistic ([screen](https://mobbin.com/screens/457161c8-d7ee-44d3-aa13-66a8b6da65f4)) | **Normalising pause** | "You're not the only one asking this." No number. |
| 12 | "Hair is personal… We heard you've been **gradually** noticing…" ([screen](https://mobbin.com/screens/151efa54-e3f7-4ec3-a3ce-4aa8fd418cf6)) | **Reflect-back** with her words highlighted | "Thank you for telling me. Here's what I heard: …" |
| 13 | "What comes next" and "A bit about our process and what you'll get" | **Benefit, then how**: three steps, each with a time | "What happens next" with SAYO's three steps (see UX pattern 5) |
| 14 | "Ask anything · Track progress · Get guidance · Set reminders" | **Two-word verb labels** | "Ask anything · Get a review · Find care · Join the Circle" |
| 15 | "This is what care should feel like" (closing line) | **Quiet closing line** | "This is your space." |

**CTA labels seen:** "Get started", "Start here", "Start a free assessment", "Start my labs", "Meet the app", "Meet the markers", "Explore the plan", "Learn more", "Get the science", "See if I'm eligible", "Get results", "Join Hers", "Take special offer", "Add to cart".

- **Borrow the shape:** verb first, two or three words, "Meet the…" for introductions, first person for personal actions ("Start my…"). For SAYO: "Ask SAYO", "Start here", "See how it works", "Meet the professionals", "Find care near me", "Keep it private".
- **Leave:** "Get results", "See if I'm eligible", "Take special offer", "Add to cart", "Join".

**One good honesty pattern:** the AI demo on the app page sits directly above a plain note that the AI is not medical advice and "can make mistakes". SAYO should keep its own locked line ("This is general health information, not a diagnosis.") just as close to the AI.

---

## 3. UX patterns

| # | Pattern | Why it works | SAYO |
|---|---|---|---|
| 1 | **Guided entry by feeling.** "What brings you here today?" with answers like "Feeling unusually down" ([screen](https://mobbin.com/screens/996dc505-e17c-48fb-9d4d-0ed649bcdc84)). The website repeats it as a home tile and an inline question. | The user does not need to know which service she needs. | **Use: home and Ask SAYO start.** A "Not sure where to begin?" tile that opens Ask SAYO. The locked opener "What's up?" stays; the options are optional chips. |
| 2 | **One question per screen, large answer cards, human opt-outs.** Answers include "Longer than I can remember" and "Unsure, it's been on and off" ([screen](https://mobbin.com/screens/741f20a9-393e-4016-997a-e2467eac8eb3)). Progress is a soft segmented bar with a section chip ([screen](https://mobbin.com/screens/8cf0b060-a9cc-4845-a641-273c36bdc359)). | Low effort, and never forces a false answer. | **Use: onboarding steps and the answer pills inside Ask SAYO.** Borrow the card look and the opt-out wording. Avoid counters like "7 of 12" ([screen](https://mobbin.com/screens/4f11420a-63ff-4392-a075-9e9ad25a59fc)): they make a conversation feel like a form. |
| 3 | **A "why we ask" line** in grey under a sensitive question ([screen](https://mobbin.com/screens/b0dbdea2-a6be-4f32-b870-1fb22b530034), [screen](https://mobbin.com/screens/afd1f322-724d-4273-a73d-18d8bb7a6feb)). | Removes the feeling of being judged or screened. | **Use: Ask SAYO follow-ups and the safety questions.** One short line, e.g. "This helps the professional understand." |
| 4 | **Reflect-back with tinted highlights.** The user's own words sit on a soft tinted background inside a plain sentence ([screen](https://mobbin.com/screens/151efa54-e3f7-4ec3-a3ce-4aa8fd418cf6); the summary version is already in synthesis no. 8). | Proves she was heard; easy to scan and correct. | **Use: Ask SAYO**, after her free text and again in the summary. Use the tint, not bold. |
| 5 | **Process card with a time per step.** Three steps, each with a time, and a "Now" tag on the current one ([screen](https://mobbin.com/screens/8c7d371e-1137-4de0-9308-ff87c57e8d9b); web version with time chips: [screen](https://mobbin.com/screens/026b7557-4b01-4ff1-9064-21acae40054f)). | Sets honest expectations before any effort. | **Use: onboarding.** Ask SAYO (now, a few minutes) → optional professional review (an honest time) → Find Care if needed. Drop the delivery step and the white-coat photo. |
| 6 | **"What comes next" just before the commit** ([screen](https://mobbin.com/screens/2a4b82e2-361d-493e-81c9-914995bf3438)). | The user knows what her tap will start. | **Use: the review offer screen**, above "Would you like a verified health professional to review this?". No checkout step. |
| 7 | **Status and resume cards on home.** A four-step tracker with "A provider is reviewing…" and an unread-message row ([screen](https://mobbin.com/screens/e36b5e4e-8334-43c8-a1a4-4f71ea9f8043)); "Finish your intake. Pick up where you left off." ([screen](https://mobbin.com/screens/ec94a869-1c0a-4410-8847-2fa56bd6f3f2)). The web version adds what the provider is doing and how you will be told ([screen](https://mobbin.com/screens/86231ec9-1c2b-4255-bfe0-8f30a3c32e4d)). | No hunting for status; unfinished work is one tap away. | **Use: home and review waiting.** Adds two things to synthesis no. 9: a resume card for an unfinished Ask SAYO, and a line saying how she will be notified. **Change:** Hers prints the topic on the card ("Psychiatry"). SAYO titles stay neutral. |
| 8 | **A thread per case, opened by a welcome note.** The first message explains what the space is for and that a provider is reviewing ([Hims screen](https://mobbin.com/screens/30b14c19-488e-4f68-a837-687859333287); Care tab: [screen](https://mobbin.com/screens/72e737a2-f417-4f39-9cfd-d1f269c68066)). | An empty waiting screen never looks broken. | **Use in part: review waiting.** Borrow the welcome note. **Do not** borrow the always-open "Write a message…" box or "24/7" language: SAYO's review is one async response, not chat. Do not put the condition in the thread title. |
| 9 | **Clinician header: initials, name, credential badge, licence number** ([screen](https://mobbin.com/screens/6b02f209-7247-461a-88c1-88108bcbf87a), [Hims screen](https://mobbin.com/screens/97deb4af-27f2-43d5-a3fd-f53797a78a05)). The reply opens with who they are and that they have read the history. | Trust without a photo. | **Use: the professional response.** Initials, profession, "Verified Professional ✓", licensing body. **Do not** borrow the reply itself: one long grey block of template text. SAYO keeps its three sections. |
| 10 | **Source label above content**: a small "FROM YOUR PROVIDER TEAM" line over the plan ([screen](https://mobbin.com/screens/7091c4f1-d96c-4186-a574-329d1b71dd7e)). | Always clear who is speaking. | **Use: everywhere two voices meet.** "From SAYO (AI)" and "From a verified professional" in Ask SAYO and review; the same idea separates peers and professionals in the Circle. |
| 11 | **Notification ask with a preview and "Not now"** ([screen](https://mobbin.com/screens/541cd314-a6e4-4bbc-8d6f-58c8647e1067)). | Shows the value before the system prompt. | **Use the structure** after a case is sent. **Do not** copy the content: the Hers preview shows what the alert is about. SAYO's preview must show its real, generic text. |
| 12 | **Help split by need**: "Medical questions → message your Care Team" and "Account questions → contact support" ([screen](https://mobbin.com/screens/4a4b0861-708e-428a-a97a-9e942766157e)). | Stops health questions going to the wrong inbox. | **Use: account and help.** Three rows: a health question → Ask SAYO; something about the app → contact us; urgent → Get help. |

**Where Hers offers nothing:** Find Care (the only trace is a provider's sign-off pointing to a public directory of in-person clinics, which is a good habit for SAYO's professional replies) and the Circle (no screens returned).

---

## 4. Do not borrow

- **Sales on every surface.** Prices on tiles, a promo bar above the logo, "Trending" products on the app home ([screen](https://mobbin.com/screens/e2df5b43-0d78-47c4-aeb4-be8d9344583d)), a Shop tab, checkout inside the consultation ([screen](https://mobbin.com/screens/6a31bf8a-a237-44c1-8557-61f5b6a1abc6)), an email-capture "free guide".
- **Cross-sell at calm moments.** A "Have more health goals?" sheet over the user's own care page ([screen](https://mobbin.com/screens/2cf8b13c-c973-4c7d-b02c-4eb7cab71017)); "You've got options" before any professional has looked ([screen](https://mobbin.com/screens/7326debc-f26c-4fbe-b6f1-f6d2820430e1)); a "Reactivate" banner after cancelling.
- **Urgency and popularity tags.** "Popular", "Trending" and "New" on health concerns; "today"; "is here"; "special offer".
- **Outcome and statistical claims.** Percent-lost figures, "92% of customers…" ([screen](https://mobbin.com/screens/f6afd00a-f5ac-414e-8343-8056b28f2a04)), a "biological age" number, "Success is the standard". Also the prevalence statistic after "You're not alone": keep the sentence, drop the number.
- **Result testimonials.** Paid testimonials with before/after photos and "Get results" beneath them.
- **Product shots.** Pens, pills and jars are the hero image almost everywhere.
- **Scores and eligibility.** "Severe Anxiety 16/21" with a "Medication zone" ([screen](https://mobbin.com/screens/34722beb-5c0b-4c76-91e4-6195a60a65b0), [screen](https://mobbin.com/screens/33eb3262-d824-4b44-9648-b80ddc21194f)) and a staged "Calculating your scores" loader ([screen](https://mobbin.com/screens/44f7a26e-46b8-4512-a432-598171fb7885)). SAYO never labels or scores the user.
- **"24/7" and "instant" promises.** SAYO's review is async with honest times.
- **Hers's privacy model.** Sign-up needs email, legal name, date of birth, phone and state ([screen](https://mobbin.com/screens/b79f2534-8766-4227-81f4-1c6aa89d595e)). The welcome screen says answers may be used for personalisation "and for other purposes" ([screen](https://mobbin.com/screens/a2dbacb3-d9bc-4283-be3a-39aba59c8673)). "Privacy" is a list of legal links with opt-outs for targeted advertising and data sharing ([screen](https://mobbin.com/screens/cb332639-79a9-4b9f-bab4-c3893281d87b)). On the site, "discreet" refers to shipping. SAYO must be far stronger here; use the privacy patterns in synthesis, not Hers.
- **Conditions visible at a glance.** Thread titles and home cards name the condition. SAYO keeps titles neutral.
- **Anything that is theirs.** The wordmark, the name, photos, copy and the named clinicians.

---

## 5. Top 8 moves for G · Grove

1. **Guided start:** a "Not sure where to begin? Start here" tile on home that opens Ask SAYO with answers written in her own words and "Something else" last.
2. **Two-tone headlines:** one medium-weight sans, sentence case, one phrase per headline in the second tone (lime on forest, sage on white).
3. **Forest for hero moments only:** a white, light app with rounded forest panels and a soft beam of light on welcome, section intros and "sent for review", with lime as the single main button on forest and a dark pill on white screens.
4. **Bento tiles for the four pillars:** each tile is a label, a short verb line and an arrow, with an abstract object or a calm portrait where Hers puts a product.
5. **Say what happens next, twice:** a three-step process card with honest times in onboarding and at the review offer, then a neutral-titled status card on home.
6. **Make Ask SAYO feel heard:** her own words on a soft tint in the reflect-back and summary, a grey "why we ask" line under sensitive questions, and human opt-out answers.
7. **Always show who is speaking:** a small source label ("From SAYO (AI)", "From a verified professional") and a professional header with initials, profession and licensing body.
8. **Imagery of calm, not products:** young Ghanaian women looking up or away against open sky, phone-in-hand app shots and UI chips over photos, with no before/after, no medication and no white coats.
