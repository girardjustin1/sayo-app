# Safety, crisis and GBV flow

Mobbin research for SAYO, 2026-11-10. "Image" links expire around 2026-12-10. All screens are iOS.

SAYO's two safety questions are "Are you in immediate danger right now?" and "Is it safe for you to continue using this device?". Urgent information comes before any long questionnaire, and quick exit matters.

## Crisis help screens

- **Alan: "Help is available"**: [screen](https://mobbin.com/screens/aa6b489c-b86c-4492-b477-f3ee9f295810) · [image](https://mobbin.com/api/mcp/short/jYP3AxRR)
  - Light design, one intro sentence, and the highlight "These numbers are **free, confidential, and available 24/7**."
  - A plain list of services, each with a "Call" pill: emergency number, suicide prevention, ambulance, **"Women victims of violence"** and child safety.
  - Footer: "Alan is not suited for crisis situations."

  **Takeaway:** the best template for SAYO's urgent-help screen. Swap in verified Ghana numbers and add a short "what happens when you call" line where we know it.
- **Wysa: "Are you in crisis? You are not alone. Help is just a call away."**: [screen](https://mobbin.com/screens/de96d391-118b-4684-add3-62a5634d2d7e) · [image](https://mobbin.com/api/mcp/short/eDgmew6s)
  Helpline buttons, then **"Can't make a call? Access these:"** with "Create Safety Plan" and "Grounding for panic".
  **Takeaway:** critical for GBV. Calling may not be safe if the abuser is nearby, so always offer a non-call option (text-based help, a clinic address, or "save this number under a different name").
- **How We Feel: "Local Mental Health Hotlines"**: [screen](https://mobbin.com/screens/8594e649-38c0-4705-b9c7-9355952001ff) · [image](https://mobbin.com/api/mcp/short/bSpkqnwa)
  Grouped by channel and need: "Immediate help via phone", "via text", "specializing in **Sexual Assault**", with a country picker. Dark UI.
  **Takeaway:** group SAYO's list by need (danger now / after sexual violence / emotional support), not by organisation name.
- **Bloom: "Get help" sheet**: [screen](https://mobbin.com/screens/2cf0f6a8-c1fb-4919-8ab3-e53826be7387) · [image](https://mobbin.com/api/mcp/short/BgQngh96)
  Lighthouse icon and two large buttons: the national number and "Local hotline".
- **Lyft: "24/7 live support"**: [screen](https://mobbin.com/screens/2eaca1e0-5673-49c7-b4ff-3942100e2555) · [image](https://mobbin.com/api/mcp/short/D6ZQV4RD)
  "Every member of our Safety team is a credentialed victim advocate… more than 330 hours of training in trauma-informed care."
  **Takeaway:** saying who answers, and how they are trained, builds trust. SAYO can say this about its verified professionals.
- **Hinge: Safety as its own tab**: [screen](https://mobbin.com/screens/24b9743f-e76d-4e2d-be60-4a30fe42155f) · [image](https://mobbin.com/api/mcp/short/WvUWWPdh)
  "Crisis Hotlines" and "Help Centre" buttons at the top, then guide cards ("How to report someone", "Protect yourself from scammers").
- **Wysa: home with a permanent red-outline "SOS" pill in the header**: [flow](https://mobbin.com/flows/cff8bd69-80a7-4ed6-ad12-1860bcaad249)
  **Takeaway:** a persistent, always-visible way into urgent help on every main screen.
- **Finch: "First Aid Kit"**: [screen](https://mobbin.com/screens/a057550d-5b73-4af4-aa54-c28ff457e817) · [image](https://mobbin.com/api/mcp/short/VKR6WWkd)
  A "Helpline" pill top right and a list of grounding exercises. **Watch-out:** each exercise shows an energy-point reward (5⚡, 10+⚡). Gamifying crisis tools is wrong for SAYO.
- **QUITTR: "Panic Button"**: [screen](https://mobbin.com/screens/035d99cb-dd49-4546-a2cc-b15557e8eebb) · [image](https://mobbin.com/api/mcp/short/pF1I6LEo)
  Red alarm screen with "DON'T BREAK THAT PROMISE TO YOURSELF…". **Anti-pattern:** shame and alarm. SAYO's safety screens must be calm and free of judgement.

## Asking "are you safe?"

- **Lyft: "Did you feel unsafe in the ride?"**: [screen](https://mobbin.com/screens/c16ba3e5-f95b-4e08-8c1d-bcd9be341b7c) · [image](https://mobbin.com/api/mcp/short/vSKLsubC)
  The question comes with **"The information you give won't be shared with the driver."** and stacked full-width Yes and No buttons.
  **Takeaway:** put the privacy reassurance inside the safety question. For SAYO: "Your answer stays private. Nobody else is told."
- **Lemonade: "Did someone get hurt?" in chat, with a full-width YES / NO bar and editable previous answers**: [screen](https://mobbin.com/screens/c87ff7ed-0cf7-42da-acfb-a13673054ee0) · [image](https://mobbin.com/api/mcp/short/UZV9tETH)
  **Takeaway:** ask the two SAYO safety questions as a single tap inside the Ask SAYO chat, not as a separate form.
- **Visible: big Yes / No pills side by side, with an expandable "i" explainer under the question**: [screen](https://mobbin.com/screens/55cd58a2-cd47-4800-bc36-cb725d32a648) · [image](https://mobbin.com/api/mcp/short/Ry8la3SE)
  Dark navy.
- **Ada: "If you're experiencing serious symptoms, do not use Ada. Contact emergency services."**: [screen](https://mobbin.com/screens/8fcc2faf-8b96-4b20-b99f-8845c91cfd92)
  A pink "Needs immediate attention" banner on results ([screen](https://mobbin.com/screens/7c4637e5-2e41-4267-88d1-5a34711a2136)).
  **Takeaway:** once a red flag is answered "yes", show urgent help first and offer to continue the conversation afterwards.

## Quick exit and hiding

- **No safety quick-exit pattern came back from Mobbin.** The search "quick exit or panic button that hides the app instantly" returned only screen-time apps that add *friction* to leaving: Opal "Hold to Leave" ([screen](https://mobbin.com/screens/e187ab82-450c-4625-8592-e6df33f395a3)), FocusFlight "Hold to give up" ([screen](https://mobbin.com/screens/df434bb4-78c8-47a4-9f01-b4e8cd8e60d2)) and Me+ "Hold to quit" ([screen](https://mobbin.com/screens/38470ab6-45a6-4d0c-a5cd-d9f41cee5c5e)). It also returned media close buttons from eBay, Fetch and Fabric.
  **Takeaway:** "hold to leave" is the opposite of what SAYO needs. A SAYO quick exit must be **one tap and always in the same place**. It should replace the screen with something neutral and clear the back stack. Design this from first principles and from GBV-sector guidance, because Mobbin has no reference for it.
- **Revolut: "Hide balances with a flip gesture"**: [screen](https://mobbin.com/screens/79e086a8-5557-4227-b4da-daec2291559b) · [image](https://mobbin.com/api/mcp/short/ZjaVUZGr)
  Turning the phone face down hides sensitive content. The closest physical quick-hide we found. Worth testing as an optional extra, not as a replacement for a visible button.
- **App-icon disguise:** only cosmetic icon pickers came back (see onboarding-privacy.md). No safety-specific disguise was found on Mobbin.

## Lock-screen and on-screen discretion (applies to GBV users most)

- Telegram ([screen](https://mobbin.com/screens/77b75e7d-5ac6-4082-915e-85d4e86aee6b)), OpenPhone ([screen](https://mobbin.com/screens/170a3da2-014f-4f89-9f7e-cba61f69ba2e)) and Apple Watch ([screen](https://mobbin.com/screens/f15ca81e-4b64-4dc9-897a-82d87fc4babd)) offer toggles that hide previews and names on the lock screen.
- Flo's Messages list ([screen](https://mobbin.com/screens/4699be5b-4201-4eca-b2d3-dc4d38f9f77f)) shows thread titles like "Sex check-in" in plain view. Clue's content hub ([screen](https://mobbin.com/screens/ef1335bb-1d1f-475f-b434-fbd5331d96e1)) uses explicit anatomical thumbnails.
  **Takeaway:** someone looking over the user's shoulder is a real risk. SAYO's home, inbox and Circle feed should look neutral at a glance.
