# Ask SAYO: conversational AI intake

Mobbin research for SAYO, 2026-11-10. "Image" links expire around 2026-12-10. All screens are iOS.

## The opening question: free text in the user's own words

- **Bloom: "What's on your mind?"**: [screen](https://mobbin.com/screens/868c5272-110b-422e-8f6b-08566a4f6614) · [image](https://mobbin.com/api/mcp/short/U46nEDYw)
  The sub-line reads "Describe your thoughts and feelings, and what is causing them in detail", above a large free-text area. Sentence-starter chips ("I'm worried about…", "I'm feeling…") sit above the keyboard.
  **Takeaway:** the best model for "In your own words, explain exactly how you feel." Starter chips help people who freeze at a blank box.
- **Liven: "What's on your mind?"**: [screen](https://mobbin.com/screens/ddd5384e-be2d-4165-8d78-b28ede9c5bf9) · [image](https://mobbin.com/api/mcp/short/AmtDXBCq)
  Warm peach gradient with the earlier feelings shown as a card.
  **Takeaway:** the palette is close to SAYO's warm coral direction.
- **Noom: "What might be contributing to your mood?"**: [screen](https://mobbin.com/screens/425e978e-5f24-4546-b155-e491c41e0dbb) · [image](https://mobbin.com/api/mcp/short/DG2HcscM)
  Emoji topic chips plus an optional "Any specific details?" box.
  **Takeaway:** chips and an optional text box together. Useful for the "What's up?" topic step before the free-text step.
- **Ada: "Let's start with 1 symptom that's bothering you, whichever comes to mind first"**: [screen](https://mobbin.com/screens/941e4c8b-e48c-475a-8621-9fc0c9a98db3) · [image](https://mobbin.com/api/mcp/short/ssC1zUAb)
  Lowers the pressure by asking for just one thing. An "About Ada and Privacy" link sits in the footer of every step.
- **Calm: free-text box with "297 characters left"**: [screen](https://mobbin.com/screens/a650c632-970d-4028-ba89-845d978b34f7)
  **Watch-out:** a visible, tight character limit discourages people from telling their full story.
- **Headspace: "What's on your mind? I want to…"**: [screen](https://mobbin.com/screens/6aba84cc-e359-446c-8cf3-b10cae809456) · [image](https://mobbin.com/api/mcp/short/1gzz2au2)
  The single-select list includes a "Something else" option.
  **Takeaway:** every topic picker needs an escape option.

## Follow-up questions in chat

- **Ahead (Kai)**: [screen](https://mobbin.com/screens/29b3524d-623e-47bf-a483-96b3100d9ac7) · [image](https://mobbin.com/api/mcp/short/u4jgNBxU)
  Light lilac gradient and warm, short bubbles. The assistant reflects back what it heard ("Sound about right?") and then shows "select all that apply" emoji chips, with free text or voice still available.
  **Takeaway:** the closest tone match to SAYO for the follow-up stage.
- **Oura: Medical chat (Counsel AI)**: [screen](https://mobbin.com/screens/d9c75407-2a3c-41ed-aed1-9dee47613a44) · [image](https://mobbin.com/api/mcp/short/DDceEf9R)
  - It asks one question at a time, echoes the user's multi-select answer as a bubble, and gives one line of empathy before the next question.
  - A strip above the composer reads "Add a doctor · will reply after 7pm".
  - A footer disclaimer reads "Messages from Counsel AI are informational… For emergencies, call 911."
  - Dark UI.

  **Takeaway:** shows exactly where an optional, async human review can sit inside an AI chat, with the expected reply time in the same line.
- **WHOOP coach**: [screen](https://mobbin.com/screens/ebd02f7f-dd31-4972-8902-2327feb39c09) · [image](https://mobbin.com/api/mcp/short/TswakBdr)
  It summarises before asking ("Got it, Alex — so you…") and then asks the next question in bold. Dark UI.
- **Lemonade (insurance claim chat): "Did someone get hurt?"**: [screen](https://mobbin.com/screens/c87ff7ed-0cf7-42da-acfb-a13673054ee0) · [image](https://mobbin.com/api/mcp/short/UZV9tETH)
  A full-width YES/NO bar replaces the keyboard, and each past answer has an edit pencil.
  **Takeaway:** a strong pattern for SAYO's red-flag questions. It is fast, it can't be misread, and answers can be corrected.
- **Ada: "How long has this been troubling you?"**: [screen](https://mobbin.com/screens/eea76783-e15c-4ca4-8908-0b7c5d3bc389) · [image](https://mobbin.com/api/mcp/short/ab3PRqXa)
  Right-aligned pill answers, always including **"I don't know"**.
  **Takeaway:** include "I don't know" and "I'd rather not say" on every structured question.
- **Visible: symptom severity grid**: [screen](https://mobbin.com/screens/f3ae98a2-0de0-402b-9021-c67d4df2641d) · [image](https://mobbin.com/api/mcp/short/7ShPCefi)
  A 0–3 grid (None, Mild, Moderate, Severe) per symptom, with a "Use previous answers" toggle. Dark navy.
  **Takeaway:** a compact grid for red-flag symptom severity if a structured check is needed.
- **Headspace: validated questionnaire, one item per screen ("1/7")**: [screen](https://mobbin.com/screens/adb5db43-5635-43cb-bd6c-186aebf23010) · [image](https://mobbin.com/api/mcp/short/ElOFrCel)
  **Wysa: the same, inside onboarding**: [flow](https://mobbin.com/flows/cff8bd69-80a7-4ed6-ad12-1860bcaad249)
  **Takeaway:** if SAYO uses a validated screener (e.g. for mood), show progress and keep the close (X) button visible.
- **Lovi: suggested prompt chips above the composer**: [screen](https://mobbin.com/screens/7930a742-bd25-49f7-a110-1998064f65f2) · [image](https://mobbin.com/api/mcp/short/zyZYwvzs)
  Light lilac.
- **Flo: scripted bot ("Let's see if there's reason to worry about bloating" + OK)**: [screen](https://mobbin.com/screens/5fe6d040-6fdb-41b5-ae7b-78c85c8e1731)
  A single fixed button feels robotic. SAYO's chat should allow free text at every step.

## Emergency and limit disclaimers inside the chat

- **Amazon Health AI**: [screen](https://mobbin.com/screens/ca1c14f1-cf34-4b27-b041-d8e30ebb332d) · [image](https://mobbin.com/api/mcp/short/BNMO7MZS)
  The first message says, in bold, "If this is an emergency, dial 911." A banner offers "Have specific medical needs? Talk to a provider", and a "Thinking…" state shows while it works.
- **Ada intro**: [screen](https://mobbin.com/screens/8fcc2faf-8b96-4b20-b99f-8845c91cfd92) · [image](https://mobbin.com/api/mcp/short/i3EM62GD)
  A soft blue callout: "If you're experiencing serious symptoms, do not use Ada. Contact emergency services."
- **Alma**: [screen](https://mobbin.com/screens/da3670e3-53fd-4404-becb-04f4e301e6b0) · [image](https://mobbin.com/api/mcp/short/i9IxaAIH)
  A small grey footer under the composer: "Alma is not a medical professional and can make mistakes."
  **Takeaway:** SAYO needs both:
  1. one clear emergency line at the start of every Ask SAYO conversation, and
  2. a permanent, quiet "SAYO doesn't diagnose" footer.

## Summary the user checks and corrects

- **Hers: consultation summary**: [screen](https://mobbin.com/screens/fea54d82-85d4-43d3-9c26-2c9c271c6709) · [image](https://mobbin.com/api/mcp/short/8QfTwanL)
  "To find the right treatment, a provider will be taking the following into consideration:" The summary is written as sentences, and the user's own answers are highlighted inline and can be tapped ("You've been feeling *anxious*, *not social*… for about *the past few months*").
  **Takeaway:** the best model for the SAYO AI summary. It reads like a person wrote it, and each fact can be corrected in place.
- **Warby Parker: grouped summary cards with edit pencils and "Retake quiz"**: [screen](https://mobbin.com/screens/0e5ceb3f-cb67-4fd2-a3a2-409fde052900) · [image](https://mobbin.com/api/mcp/short/plvnzTbM)
  Light and clearly grouped.
- **Bevel: "This biomarker may be incorrect — please review the value and update it if needed" (inline amber warning with Edit)**: [screen](https://mobbin.com/screens/a4e9028a-d28e-45ba-af21-1d92b34f4e37) · [image](https://mobbin.com/api/mcp/short/yIojB2Vl)
  **Takeaway:** flag the parts of the AI summary it is unsure about, so the user checks those first.
- **Visible: "That's all the questions… Once your responses are submitted, they can no longer be changed."**: [screen](https://mobbin.com/screens/14c7efb9-6786-499d-a3a1-f889205f5d6e) · [image](https://mobbin.com/api/mcp/short/4hU7ph96)
  **Takeaway:** be explicit about what happens after "Send to a professional".
- **Equinox+** ([screen](https://mobbin.com/screens/d8c29db8-7813-4abd-a525-2287ee532e6d)) and **Garmin** ([screen](https://mobbin.com/screens/e36175d8-2aac-4307-a6a1-98f40f68c623)) show "Review before we continue" lists with Edit. Both are dark UI.
- **Tempo**: [screen](https://mobbin.com/screens/47abfa5c-67f8-48f1-b86a-4e9c722d5932)
  "Check your result before submitting", with two equal buttons, "Try again" and "Submit".

## Results and next steps (what SAYO should and should not borrow)

- **Ada: assessment report**: [screen](https://mobbin.com/screens/7c4637e5-2e41-4267-88d1-5a34711a2136) · [image](https://mobbin.com/api/mcp/short/WzMUYN3h)
  A pink "Needs immediate attention" banner, and per-item care-level icons ("Seek emergency care", "Seek medical advice").
  **Borrow:** the urgency tiers and their icons.
  **Do NOT borrow:** the ranked list of possible conditions. SAYO never diagnoses.
- **Ada: results**: [screen](https://mobbin.com/screens/7c3c259d-a253-47fc-b2e1-06009361432c) · [image](https://mobbin.com/api/mcp/short/0sMfD7fX)
  The callout "This is not a medical diagnosis." is good. The "48% of people with your symptoms had this condition" statistic is out of scope for SAYO.
- **Apple Health: questionnaire results**: [screen](https://mobbin.com/screens/3c8ad2b2-26b9-4931-b8ab-d08688e05b31) · [image](https://mobbin.com/api/mcp/short/ZWCJ9VpS)
  Plain "Next Steps" advice, the line "The results of your questionnaire are not a diagnosis", an "Export PDF" button and "Learn More" article cards.
- **Alma**: [screen](https://mobbin.com/screens/da3670e3-53fd-4404-becb-04f4e301e6b0)
  Bold mini-headers "Practical starting point:" and "One small win to aim for:" make AI answers scannable.

## Search notes

- The "telehealth app doctor's written response with treatment plan" search returned a tool error ("Failed to execute search"). We reworded the query and searched again; those results are in async-review.md.
