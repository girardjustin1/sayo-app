# Onboarding, privacy promises, PIN lock and discreet notifications

Research for SAYO, done on Mobbin on 2026-11-10. "Screen" links open the screen on Mobbin. "Image" links are full-size screenshots; **they expire around 2026-12-10**, so download any you want to keep. All screens below are iOS unless marked.

Mobbin collection with the key screens: https://mobbin.com/collections/f88d1d26-7ac7-472f-8f3e-b52a05ee2e7e/mobile/screens (private to the account owner and their teammates).

## Privacy promise screens

- **Bevel: "Your Data, Your Control"**: [screen](https://mobbin.com/screens/1df5738f-ecf7-4b44-bcc6-7541affe4a87) · [image](https://mobbin.com/api/mcp/short/iCHQKRUB)
  Pale pink gradient, shield-and-lock illustration, one plain sentence: it doesn't store reproductive data on its servers, never sells it, and you can view or delete it any time. The links to the terms and privacy policy are small.
  **Takeaway:** the closest match to SAYO's tone. Use one screen with one promise in plain words, not a list of legal points.
- **Apple Health: Cycle Tracking welcome**: [screen](https://mobbin.com/screens/8248489e-0ad5-40f2-86c1-b641a47adbfa) · [image](https://mobbin.com/api/mcp/short/7VPTo1B1)
  A feature list where one row is "Privacy and Security": the data is encrypted and nobody, Apple included, can read it without your permission.
  **Takeaway:** treat privacy as a feature row next to the other features, not as a disclaimer.
- **ABY Journal**: [screen](https://mobbin.com/screens/db87bf91-0dc7-4ea2-9e7b-669d94f38531) · [image](https://mobbin.com/api/mcp/short/09xhEVMx)
  Three bullets ("stored only on your device", "used only for insights", "we don't train on your data") and a "Sounds great!" button. The background is dark blue, which SAYO should not copy.
  **Takeaway:** three short, specific bullets beat a paragraph.
- **WHOOP: "You Control Your Data"**: [screen](https://mobbin.com/screens/c51bc186-30b6-43d3-8c88-e4518ef7fe5e) · [image](https://mobbin.com/api/mcp/short/xWSKWJMP)
  **Oura: "A word on privacy"**: [screen](https://mobbin.com/screens/b39b51ed-bdf7-4f02-bd32-a2ec53fb66d1) · [image](https://mobbin.com/api/mcp/short/cGgCIrzX)
  Both show a privacy screen right before the user enters the hormonal or women's-health feature, and Oura says exactly where to delete the data. Both are dark UI.
  **Takeaway:** repeat a short privacy line at each sensitive entry point (Ask SAYO, professional review, the Circle), not only at sign-up.
- **Gentler Streak**: [screen](https://mobbin.com/screens/709ce134-543f-433b-a4a7-73749b7992d3) · [image](https://mobbin.com/api/mcp/short/y2uldqwk)
  **BitePal**: [screen](https://mobbin.com/screens/af5234db-93d1-42a6-a2f7-89aa28d07c6f) · [image](https://mobbin.com/api/mcp/short/3OevqO5q)
  A one-line promise right under the main button ("Your health data will never leave this device", "We never use your health data for ads or sale"). Gentler Streak adds "not a substitute for professional medical advice".
  **Takeaway:** put the microcopy where the decision happens.

## Age gate and consent

- **Wysa: nickname, no login**: [screen](https://mobbin.com/screens/cab4f7de-ed2c-442c-835e-930d34031d7c) · [image](https://mobbin.com/api/mcp/short/WFVDMQca)
  "Our conversations are private & anonymous, so there is no login. Just choose a nickname." The age confirmation is one footer line: "By continuing, I confirm I am 13 or older and accept the Terms of Service and Privacy Policy."
  **Takeaway:** the best low-friction age gate we found. SAYO can use "I confirm I am 18 or older" in the same way, next to the privacy promise.
- **Glovo: "Confirm legal age" bottom sheet**: [flow](https://mobbin.com/flows/0d0dd1b4-6b98-4147-83c9-23ebbbf9c870)
  The user self-declares their age with a checkbox and Save or Cancel.
  **Takeaway:** a lightweight self-declaration pattern.
- **Zocdoc: create account**: [flow](https://mobbin.com/flows/7111ec59-45dc-40c7-b7ce-87df002d8431)
  Separate checkboxes for the terms and data consent and for the optional health-data authorisation. A "?" next to a field opens a sheet explaining why it is asked.
  **Takeaway:** split consents so each one is a real choice, and add "why we ask" explainers.
- **7-Eleven: age and identity verification (14 screens)**: [flow](https://mobbin.com/flows/86f66a9b-9561-4b92-b675-bc244303352a)
  Legal name, address, phone code and ID.
  **Anti-pattern for SAYO:** heavy identity checks break the promise of anonymity. Do not collect legal identity.
- **Duolingo: "Just 7 quick questions"**: [screen](https://mobbin.com/screens/74201708-1b1b-4b6d-b804-92f9eb2d65c9) · [image](https://mobbin.com/api/mcp/short/wZroRhEg)
  Says how long onboarding is before it starts. Its mascot speech bubbles ([screen](https://mobbin.com/screens/ce101753-63a5-4c96-bf23-33f584d0a4ba)) make the questions feel conversational.
  **Takeaway:** tell users up front how short onboarding is.

## PIN and passcode lock

- **Tabby: "Set your PIN code?"**: [screen](https://mobbin.com/screens/5e78ea5d-a18a-4360-9883-70e54d9ffd2c) · [image](https://mobbin.com/api/mcp/short/stFFOOYc)
  Lilac icon, one line saying what the PIN is for, a primary "Set PIN code" button and a secondary "Skip for now".
  **Takeaway:** a good opt-in prompt. For SAYO, offer it right after the first private conversation.
- **Alan (health insurer): "Create your security code"**: [screen](https://mobbin.com/screens/f0e4e34d-c12e-4e5b-8589-89d302946b77) · [image](https://mobbin.com/api/mcp/short/VNhlgJb9)
  Light, soft round keypad and four dots.
  **Takeaway:** a calm, health-tech PIN entry and the visual reference for SAYO's PIN.
- **Monzo: PIN entry**: [screen](https://mobbin.com/screens/72c5018c-2590-4263-af0b-6d816debf83d) · [image](https://mobbin.com/api/mcp/short/ocU2dCrF)
  "I forgot my PIN" sits top right, with a "Use Face ID next time" toggle.
  **Takeaway:** always show the recovery path.
- **Flo: access code**: [settings](https://mobbin.com/screens/79d5c232-7c14-418e-abc7-0e0abe5cb1ba) · [on state](https://mobbin.com/screens/b3eac62e-c622-4e33-9d23-eae744c8c61a) · [confirm code](https://mobbin.com/screens/aec9f81b-9fc5-4be6-9125-270bd9f8edb3)
  A "Secure access" toggle with a short explainer, then a four-dot code on the system keypad.
  **Takeaway:** a standard pattern. The look is not SAYO's to copy.
- **Clue: settings, "Data & privacy"**: [screen](https://mobbin.com/screens/67872707-9e92-4421-823e-0796a56fc049) · [image](https://mobbin.com/api/mcp/short/7a1chabc)
  Privacy settings, Download my data, a "Passcode to unlock app" toggle and a "Hide data in widgets" toggle, grouped together.
  **Takeaway:** put every discretion control in one obvious settings group.
- **Other PIN screens:** GoPay ([screen](https://mobbin.com/screens/7192f156-00db-4c0a-a42d-ef521c95cc52)) has a "Forgot PIN" pill. Mercedes ([screen](https://mobbin.com/screens/641ab639-731d-46c3-9378-6c5917c281e8)) has new and confirm PIN on one screen. My BMW ([screen](https://mobbin.com/screens/c0fd3a16-50c6-411c-9573-13db1b2fd7f9)), bunq ([screen](https://mobbin.com/screens/f74cc563-6d69-414b-a4c8-5c8c71eaba35)) and Oura ([screen](https://mobbin.com/screens/6b8646ec-a417-4b2a-899e-1e24e8dd6ba3)) are dark-UI versions. Use them as interaction references only.

## Discreet notifications

- **Fixtured: notification priming**: [screen](https://mobbin.com/screens/fac12af3-b7ad-4ea7-a2ef-ab09e53a3d37) · [image](https://mobbin.com/api/mcp/short/Mw1J2ZTN)
  Shows sample notification cards before asking for permission.
  **Takeaway:** SAYO should preview its real lock-screen text (e.g. "You have a new message") so the user can see it is discreet before saying yes.
- **Granola: "Get notified when your notes are ready"**: [screen](https://mobbin.com/screens/796e5918-9efd-42e4-855c-3cb7b3593ad0) · [image](https://mobbin.com/api/mcp/short/pPSWlG8I)
  One purpose, with Enable and "Not now".
  **Takeaway:** ask at the moment it matters, i.e. right after the user sends a case for professional review.
- **Affirm: "Stay in the know"**: [screen](https://mobbin.com/screens/c797ee4d-1c25-4e77-b592-9f6732e5725a) · [image](https://mobbin.com/api/mcp/short/uyNmUTYw)
  Lists what you'll get and adds "Update your preferences any time in Settings", with a "Not right now" button.
- **Agoda**: [screen](https://mobbin.com/screens/a94518a2-f6a1-4007-8b4a-9f1051be6e14). Mascot and three icon bullets.
- **Gopuff: "No, I don't want to save"**: [screen](https://mobbin.com/screens/dc8f0aa9-d895-4873-a46d-30ac1dc2c4bd)
  **Anti-pattern:** a decline button that shames the user ("confirmshaming").
- **Telegram: "Names on Lock Screen" toggle**: [screen](https://mobbin.com/screens/77b75e7d-5ac6-4082-915e-85d4e86aee6b) · [image](https://mobbin.com/api/mcp/short/03IE04a9)
  **OpenPhone: "Include message previews" toggle**: [screen](https://mobbin.com/screens/170a3da2-014f-4f89-9f7e-cba61f69ba2e)
  **Apple Watch: "Notification Privacy" section**: [screen](https://mobbin.com/screens/f15ca81e-4b64-4dc9-897a-82d87fc4babd)
  **Takeaway:** SAYO should ship with previews **off by default**. A user who wants more detail can turn it on.
- **Flo: Messages list**: [screen](https://mobbin.com/screens/4699be5b-4201-4eca-b2d3-dc4d38f9f77f)
  Thread titles such as "Sex check-in" are visible to anyone looking at the screen.
  **Watch-out:** SAYO's case and thread titles should be neutral, e.g. "Your question, 12 Nov".

## Disguise and app-icon change

- **No Mobbin example of disguising an app for safety came back.** Searching for an app-icon disguise only returned cosmetic icon pickers: YNAB ([screen](https://mobbin.com/screens/15cd1d8c-c412-4946-b6d5-60674666b7f5)), Mammoth ([screen](https://mobbin.com/screens/b72a4c18-f00f-40a0-a658-4435734671a0)), Gymshark ([screen](https://mobbin.com/screens/c58812cb-b47e-4c74-b5b8-d8be177f6b54)) and SoundCloud ([screen](https://mobbin.com/screens/9136e6b7-cafd-4a99-9443-2163be4bb569)). They show that the alternate-icon mechanism works on iOS, but none is designed for safety. If SAYO adds a neutral icon later, YNAB's named-list layout (icon, name, one-line description) is the clearest picker.
- **Revolut: "Hide balances with a flip gesture"**: [screen](https://mobbin.com/screens/79e086a8-5557-4227-b4da-daec2291559b) · [image](https://mobbin.com/api/mcp/short/ZjaVUZGr)
  Turning the phone face down hides sensitive numbers. This is the only physical quick-hide gesture we found. Dark UI.

## Data controls

- **Apple Health**: [screen](https://mobbin.com/screens/05e238d5-f279-406e-867b-0b4b83090692) · [image](https://mobbin.com/api/mcp/short/4npsmCBC)
  Footer line: "Your data is encrypted on your device and can only be shared with your permission."
- **Google Health**: [screen](https://mobbin.com/screens/47345c48-dff2-443f-9080-7cbabcaf6c46) · [image](https://mobbin.com/api/mcp/short/93j97Ekl)
  Export data and Delete data rows, each with an icon and one line of explanation.
- **Fitbit**: [screen](https://mobbin.com/screens/0ded0fd2-9d13-48c9-a547-c617e16ad720)
  Delete by date range (last month, last year, all time).
  **Takeaway:** "delete this conversation" and "delete everything" should both be easy to find.
