# SAYO MASTER CONTEXT
## Current project state as of 9 November 2026

Use this document as the current source of truth for SAYO. Do not replace established decisions with generic health-app assumptions. If something is listed as undecided, it may be explored. If it is listed as an MVP decision, treat it as fixed unless explicitly changed.

---

# 1. WHAT SAYO IS

SAYO is a youth-focused digital health platform being developed initially for young women.

The first pilot is for adults aged 18+.

Its purpose is to create a safe, protective, private and stigma-free environment where young women can:

- ask sensitive health questions in their own words
- access reliable evidence-based health information
- receive AI-supported intake and basic health navigation
- choose to have a concern reviewed asynchronously by a verified health professional
- be directed to an appropriate clinic, hospital or support service where further care is needed
- participate pseudonymously in a protected peer-support community called the Circle

SAYO is not intended to replace doctors, diagnose users autonomously or function as a full telemedicine service during the MVP.

Its core value is reducing the barriers between:

**“Something is happening to me and I am scared/embarrassed/confused”**

and

**“I understand what I may need to do next and where I can get appropriate help.”**

---

# 2. CORE HEALTH AREAS

The first pilot focuses particularly on:

- sexual health
- HIV and other STIs
- PrEP and PEP
- contraception
- pregnancy and reproductive health
- substance/alcohol use
- GBV
- sexual violence/rape
- consent
- mental and emotional wellbeing
- general related health concerns

HIV/STIs, PrEP/PEP and reproductive health should remain explicit in SAYO messaging rather than being diluted into generic terms such as “wellness.”

---

# 3. TARGET USER

Overall brand: **Youth-focused digital health platform**

First pilot: **Young women aged 18+**

The first pilot deliberately focuses on women because:

- many of the initial health problems involve sexual and reproductive health
- stigma and privacy concerns are significant barriers
- GBV/sexual violence requires specialised safety architecture
- SAYO is currently pursuing women’s-health/FemTech funding opportunities
- narrowing the first pilot makes testing and safeguarding more manageable

SAYO may later expand beyond this first population, but this is not the immediate MVP priority.

---

# 4. MAIN PRODUCT PILLARS

## A. Ask SAYO

Private AI-supported health intake.

The user begins with simple language such as: **“What’s up?”**

The user explains the concern freely.

SAYO then asks: **“Okay. In your own words, explain exactly how you feel.”**

SAYO should:

- preserve the user's own wording
- ask relevant follow-up questions
- collect only necessary information
- provide basic evidence-based information where appropriate
- identify predefined red flags
- create a concise summary of the concern
- allow the user to check/correct the summary
- offer optional professional review

AI must not present itself as making a definitive medical diagnosis.

## B. Verified Professional Review

After the AI-supported intake, the user may be asked: **“Would you like a verified health professional to review this?”**

If yes, the concern enters an asynchronous professional queue.

Suggested user-facing queue wording:

**“Your question has been sent for review. A verified health professional will take a look when available and SAYO will notify you when your response is ready.”**

This is NOT: live chat · emergency medicine · video consultation · guaranteed immediate response.

The professional receives: original user message · relevant follow-up answers · SAYO-generated summary · relevant attachments if supported later.

The professional can accept a case and provide:

### My thoughts
Short, clear guidance.

### In-person care decision
- No in-person care currently indicated
- Yes, routine assessment
- Yes, urgent assessment

### Service category
Examples: sexual health/STI service · HIV/PrEP/PEP · general clinic/hospital · mental health · substance-use support · GBV/sexual assault support · other appropriate service

The user then receives the professional response and, where appropriate, a Find Care recommendation.

## C. Find Care

A health-navigation/referral feature. SAYO may show relevant verified services such as clinics, hospitals, sexual-health services, HIV services, mental-health services, GBV/sexual-assault support services.

Basic information may include: facility/service name · type of care · location · contact information.

MVP does NOT include direct appointment booking.

Facilities do not necessarily need to be formal SAYO partners simply to be included as verified/local care options.

## D. The Circle

The Circle is SAYO's pseudonymous peer community. Users use usernames, avatars, no public profile photos.

Possible topics include: sexual health · HIV/STIs · contraception · relationships · consent · substance use · mental wellbeing · GBV/sexual violence.

Users can create posts, reply, react, report harmful content.

Health professionals may publicly reply. Professional replies should be clearly marked: **Verified Professional ✓**

Peer replies and professional advice must remain visibly distinguishable.

The Circle should feel peer-led rather than becoming a clinician-dominated forum.

---

# 5. PRIVACY MODEL

Current MVP decisions include:

- pseudonymous public identities
- avatars instead of photos
- phone/email not publicly displayed
- private health concerns separated from Circle identity/activity
- 4-digit PIN protecting private SAYO conversations
- discreet notifications
- generic lock-screen wording
- minimum necessary personal information
- professional access restricted to authorised/verified accounts
- de-identified pilot analytics where possible

A user's public Circle participation should not expose their private Ask SAYO health history.

---

# 6. GBV / SEXUAL-VIOLENCE SAFETY FLOW

GBV and sexual violence require a different flow from normal health questions. SAYO should distinguish historical disclosures from immediate danger.

Relevant safety questions include: **“Are you in immediate danger right now?”** and **“Is it safe for you to continue using this device?”**

If immediate danger is indicated, safety and urgent-care information should take priority over continuing a long AI questionnaire.

Possible time-sensitive health needs may include appropriate urgent care, HIV PEP, emergency contraception, STI assessment/prophylaxis, injury care and sexual-assault/forensic pathways depending on circumstances and local protocols.

Exact legal and clinical requirements must be verified for the relevant country.

Circle moderation must also protect against: victim blaming · identifying survivors · naming alleged perpetrators unsafely · threats · graphic harmful content · unsafe medical/legal advice.

The first pilot is currently 18+ partly to reduce safeguarding complexity.

---

# 7. PROFESSIONAL SIDE

SAYO is onboarding health professionals for the pilot. The pool includes doctors and other health professionals. Some are Ghana-licensed and some may hold licences from other jurisdictions.

Until regulatory/legal advice is finalised:

- Ghana-licensed professionals are the most straightforward group for real Ghana user reviews
- foreign-licensed professionals may participate in fictional/de-identified testing, clinical logic evaluation, product feedback and health-information review
- foreign professionals should not automatically be assumed to be legally permitted to privately manage real Ghana patient cases

Professional onboarding should collect: profession · registration/licence details · licensing jurisdiction · areas of expertise · topics they are comfortable reviewing · contact details · contribution preferences.

Professionals should only see the data necessary to review a case.

---

# 8. PROFESSIONAL DASHBOARD MVP

Professionals need: secure login · available case queue · relevant case information · ability to accept a case · ability to release/decline cases outside competence · response field · in-person care decision · referral/service category · case completion · clearly defined professional scope.

The system should log who accepts and completes each review for accountability.

---

# 9. ADMIN MVP

Admin needs the ability to: approve/reject professional accounts · verify professional credentials · view profession/licensing jurisdiction · suspend professional access if necessary · manage care facilities/services · moderate Circle reports · remove harmful Circle content · suspend abusive users · monitor cases waiting too long · see de-identified pilot analytics · export basic pilot metrics.

Useful metrics include: total users · concerns submitted · professional reviews requested · professional reviews completed · average response time · referrals recommended · Circle activity · feature usage · satisfaction/usability feedback.

---

# 10. WHAT IS NOT IN THE MVP

Do NOT expand the first build into: appointment booking · payments · prescriptions · video consultations · live doctor chat · hospital dashboard · clinic dashboard · EMR integration · insurance integration · wearables · complex clinician scheduling · full telemedicine · giant medical record system · public real-name profiles · profile photographs · direct Circle user-to-user private messaging.

The first MVP needs to prove the health-navigation and professional-review concept, not become an entire national health system.

---

# 11. CORE MVP BUILD JOURNEY

**Onboarding → 18+ confirmation → account → PIN → home → Ask SAYO → “What’s up?” → user explains concern → relevant follow-up questions → red-flag check → basic evidence-based information where appropriate → AI summary → user verifies summary → optional verified professional review → professional queue → professional accepts case → professional response → in-person care decision → referral/service category → user receives discreet notification → My Reviews → Find Care where needed**

The Circle is the second major user journey.

---

# 12. CURRENT MVP USER STORY SET

Approximately 75 defined MVP stories divided into: young-woman/end-user stories · verified-professional stories · admin stories · privacy/safety/system stories. The complete Word document has been prepared separately for the development team.

---

# 13. BRAND

Name: **SAYO**

Current visual direction: light · clean · modern · warm · women/youth friendly · health-tech rather than hospital aesthetic · coral/pink/purple family · white/light backgrounds.

Chosen logo direction: coral/pink gradient · heart/looping S-style symbol · lowercase “sayo” · charcoal/black text · coral detail in the “o”.

Avoid: dark interfaces · cliché Africa maps · generic stethoscope logos · obvious Flo copies · overly clinical design · animal mascots.

An “African but not animal” identity/mascot idea has been discussed but is not final.

---

# 14. PRODUCT TONE

SAYO should communicate in understandable, non-judgmental language. It should avoid sounding like a hospital intake form. Examples: **“What’s up?”** · **“In your own words…”** rather than immediately forcing users into rigid clinical forms. The product should feel safe and human while remaining clinically responsible.

---

# 15–16. PILOT RESEARCH & VALIDATION

A pre-pilot survey is collecting demand evidence (the problem, stigma and privacy barriers, wanted features).

Two kinds of validation: **demand validation** (the survey) and **product validation** (real users testing the prototype: understood it? trusted it? Ask SAYO useful? AI vs professional understood? would request review? Circle felt safe? navigation useful?).

---

# 17–21. TEAM, LEGAL AND FUNDING

Kept in the private project copy (`docs/private/`, not in this repository): team details, company and legal
status, and funding plans. What matters for product work: real health cases wait for legal clearance, so the
prototype uses fictional or controlled scenarios only; and funded technology is intended to be open source.

---

# 22. CURRENT PRIORITY

Do not overwhelm the founder with unnecessary enterprise features. Product priorities: complete the MVP prototype ·
test it with a small group of target users · collect usability evidence · validate the professional-review workflow ·
finalise privacy and safety language.

---

# 23. POSITIONING

**SAYO is a youth-focused, AI-enabled digital health platform for young women that reduces stigma and barriers to sexual and reproductive healthcare by combining private conversational intake, evidence-based information, verified professional review, safe referral pathways and protected peer support.**

Simpler: **SAYO gives young women a private, stigma-free place to ask sensitive health questions, understand what they may need, access verified professional guidance where appropriate and find the right care when further help is needed.**

---

# 24. PRODUCT PRINCIPLES

Safety over engagement · Privacy over unnecessary data collection · Clear clinical boundaries over pretending AI is a doctor · Simple language over medical jargon · User autonomy over forced escalation · Verified professional input over anonymous medical claims · Small functional MVP over feature bloat · Actual user evidence over impressive-looking mockups · Young women's real needs over generic FemTech assumptions.

---

# 25. PRODUCT BOUNDARY

SAYO should help answer **“What should I do next?”** It does not need to diagnose every condition, book every service, own every clinic interaction or become an electronic medical record.

The strongest MVP proves that SAYO can safely bridge: **silence/confusion → trusted information → professional review where needed → appropriate care.**
