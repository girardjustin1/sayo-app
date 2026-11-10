# Find Care: verified clinics and services (no booking)

Mobbin research for SAYO, 2026-11-10. "Image" links expire around 2026-12-10. All screens are iOS.

Most service-finder screens on Mobbin push booking. SAYO only needs **name, type, location and contact**, so the useful references are the ones whose main action is **Call** or **Directions**.

## Service cards and lists

- **Wysa: Counsellor tab, "Having someone to talk to might be beneficial. Here are some agencies you can contact."**: [screen](https://mobbin.com/screens/4f960da9-882f-422a-8bad-0f17dd8261fd) · [image](https://mobbin.com/api/mcp/short/oKbw9xiG)
  Each card has the organisation name, one line on what it does, a "Call 1800-…" pill and "Find out more". The page background is dark navy but the cards are light.
  **Takeaway:** the closest match to a SAYO service card. Keep the short intro line, which feels caring rather than clinical.
- **Warby Parker: Find a store**: [screen](https://mobbin.com/screens/81c37570-e493-44f0-8805-2b7fad927f7e) · [image](https://mobbin.com/api/mcp/short/LRlZczvv)
  Search by city or postcode. Each card shows distance, "Closed · Closes at 7:00 p.m." and "Get directions".
- **Walmart: choose a centre**: [screen](https://mobbin.com/screens/4b195e1c-1de5-401e-99a8-a24c6050d010) · [image](https://mobbin.com/api/mcp/short/QLAVuVVW)
  A "Use my current location" link, a Map View toggle, and a green "Open · until 11:00pm" plus miles away on each row.
  **Takeaway:** make location optional (type a town, or tap to use your location), because some users won't want to share their GPS position. Show "open now" status.
- **SKIMS: store locator**: [screen](https://mobbin.com/screens/4410e38d-3d2b-43e6-b92d-6b384fc38b03)
  A plain text list with an inline temporary-closure note. It is low-tech but readable, which suits a small pilot list.

## Detail page

- **Alan: practitioner detail**: [screen](https://mobbin.com/screens/173dd189-fddb-4c73-9689-309b24a63698) · [image](https://mobbin.com/api/mcp/short/FIQ16l8Y)
  It shows "Open by appointment: Today until 18:00", a weekly hours chart and "Accepts the carte Vitale", and the main button is **"Call to make an appointment"** rather than an in-app booking.
  **Takeaway:** the best detail-page model for SAYO's no-booking scope. A cost row (free, low-cost or paid) could be added later if data exists.
- **CVS Health: store details**: [screen](https://mobbin.com/screens/d60ea93f-9367-4965-a491-9043bb22fd23) · [image](https://mobbin.com/api/mcp/short/LoZD2rga)
  Twin "Call" and "Get directions" buttons under the address, and an hours sheet with today highlighted.
- **Fresha: opening times, "Verified business by Fresha" badge row and accessibility rows (wheelchair, parking)**: [screen](https://mobbin.com/screens/e3a593d6-df18-42fe-a403-da9fb695e7d2) · [image](https://mobbin.com/api/mcp/short/UzqMqGny)
  **Takeaway:** a "Verified by SAYO" row on each clinic page, using the same tick as Verified Professional replies, so trust reads the same everywhere.
- **Zocdoc: office information (map, name, address)**: [screen](https://mobbin.com/screens/1aa5de33-f9d5-41ca-aef6-30abc419e3f9)
  The booking parts are out of scope.

## Category entry

- **Fresha: search**: [screen](https://mobbin.com/screens/86a0b800-40fe-4cbe-a1b6-1355f84bd38d) · [image](https://mobbin.com/api/mcp/short/Y9nAU96l)
  A search field, segmented chips (All / Treatments / Venues / Professionals) and an icon list of categories in lilac.
  **Takeaway:** SAYO categories (e.g. HIV & STI testing, PrEP/PEP, Contraception, Pregnancy, Mental health, Support after violence, Substance use) work as an icon list.
- **Clue: tag filter**: [screen](https://mobbin.com/screens/c9c05513-98f5-46c4-9002-6536bae72a19) · [image](https://mobbin.com/api/mcp/short/WpasRG7U)
  Colour-grouped chips with section icons and a "Show 28 selected" button.
- **Alan: topic page with a crisis card at the bottom**: [screen](https://mobbin.com/screens/ade174b4-c1b8-436a-b522-d1353764cf56) · [image](https://mobbin.com/api/mcp/short/W5wBZu0a)
  The card reads "Help is available: If you're in distress or having suicidal thoughts, reach out now. Get help."
  **Takeaway:** the "Support after violence" and "Mental health" categories should carry the same card.

## Linking from the professional response

The SAYO response includes a service category. Tapping it should open Find Care already filtered to that category. No single Mobbin screen showed this hand-off, so it is a recommendation, not an observed pattern.
