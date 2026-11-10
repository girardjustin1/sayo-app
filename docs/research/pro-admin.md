# Professional dashboard and admin console (web)

Mobbin research for SAYO, 2026-11-10. "Image" links expire around 2026-12-10. All screens are web.

Mobbin has few clinician-specific dashboards. The closest analogue is **helpdesk and ticketing tools**: an async queue, claiming a case, replying, setting a status and closing. Those references are below.

## Professional: case queue

- **HubSpot Help Desk**: [screen](https://mobbin.com/screens/f9b9fcf1-0767-4ee5-adad-12003a31331e) · [image](https://mobbin.com/api/mcp/short/fsLrflsG)
  - Left-side views with counts: **Unassigned**, **Assigned to me**, All open, All closed.
  - Board columns: New, Waiting on contact, Waiting on us, Closed.
  - Each card shows "Open for 6 days" and "No activity".

  **Takeaway:** the closest match to SAYO's model. "Unassigned" is the shared queue and "Assigned to me" holds accepted cases. Show how long each case has waited.
- **Zendesk: ticket table**: [screen](https://mobbin.com/screens/3156ae05-1afc-4c44-8335-bf21078eebf7) · [image](https://mobbin.com/api/mcp/short/rZN7AkP3)
  Grouped by status (New / Open), with coloured status pills and Requested, Updated and Assignee columns.
- **Heidi (clinical AI scribe): task table**: [screen](https://mobbin.com/screens/97b84dad-6a86-4f60-b81b-439375d4fa16) · [image](https://mobbin.com/api/mcp/short/F3jQcxb6)
  Patient chip, category pill, "created 3 days ago", filters for Status, Category and Date, and a warm beige palette. The screenshot is in Japanese.
  **Takeaway:** the one clinician tool that came back. Its warm palette shows that pro tools don't have to be cold.
- **Pin**: [screen](https://mobbin.com/screens/228a2ca3-e5b6-4806-9a87-fc141efc11e8)
  Status tabs with counts across the top, like a funnel.
  **Navattic**: [screen](https://mobbin.com/screens/9eb629ea-f733-40c3-8480-279df2dbc052)
  A right-side detail drawer over a list.
  **Takeaway:** a drawer lets a professional preview a case summary before accepting it.

## Professional: working a case

- **Zendesk: ticket view**: [screen](https://mobbin.com/screens/f1f0bc5e-8ed7-448c-b870-d94e21b8bca0) · [image](https://mobbin.com/api/mcp/short/vQLLv9Vi)
  - Left: an Assignee field with a **"take it"** link (one-click accept), plus Type, Priority and Topic.
  - Right: a split button **"Submit as Open"**, which sets the status as you send.
  - Far right: interaction history.

  **Takeaway:** "take it" maps to Accept. Setting the status on submit maps to sending the response together with the care decision.
- **Klaviyo Helpdesk**: [screen](https://mobbin.com/screens/b32ed5f6-4f72-4dad-9e46-d5231591c558) · [image](https://mobbin.com/api/mcp/short/icG1W5wk)
  The "Assign to…" dropdown includes **"No assignee — clears agent and team assignment"**, alongside Snooze and Close.
  **Takeaway:** a model for Release. Make Release explicit and ask for an optional reason.
- **Gorgias: ticket**: [screen](https://mobbin.com/screens/0a1e975b-5e42-4ee0-975d-9a9d5f7c05d3) · [image](https://mobbin.com/api/mcp/short/hDQEsgrx)
  Structured fields ("Contact reason", "Resolution") above the thread, and "Suggested macros" chips in the composer.
  **Takeaway:** SAYO's response form should be structured:
  - **My thoughts** (free text, with optional saved snippets)
  - **In-person care** (None / Routine / Urgent, required)
  - **Service category** (required)
- **Outseta**: [screen](https://mobbin.com/screens/f44ebf16-26b5-4e4b-9c57-12e446653e23) · [image](https://mobbin.com/api/mcp/short/ezrehZcu)
  Three panes: ticket list, then the thread with a Reply | Note composer, then Assignee and Status on the right. The system line "X assigned this ticket to X" sits in the thread.
  **Takeaway:** "Note" (an internal note the user never sees) is useful for handing over between professionals.
- **Plain**: [screen](https://mobbin.com/screens/d1d96a01-5f6c-43b9-84bf-83729d43ab9a) · [image](https://mobbin.com/api/mcp/short/o7W2qYIg)
  The right panel shows Status "Waiting for customer" and Priority. Status changes appear in the thread, and an **AI "Summary" row** sits above the thread.
  **Takeaway:** put the user-checked SAYO AI summary at the top of the case. Mark clearly which parts the user corrected.
- **Featurebase**: [screen](https://mobbin.com/screens/003d6a68-5d50-4996-ac68-2d1d8908173f)
  An "In Review" status pill and a **"Visible to customer"** label on messages. Dark UI.
  **Takeaway:** label exactly what the user will see before the professional sends.

## Admin: approve professionals

- **1Password: Person Details**: [screen](https://mobbin.com/screens/234af4ed-2432-4964-8331-5cbb686fff4f) · [image](https://mobbin.com/api/mcp/short/X3Cg0f3t)
  A green banner at the top, "Waiting to Be Confirmed", with **Reject** and **Confirm**. The activity timeline is on the left.
  **Takeaway:** a model for the professional application page. The decision sits at the top, with evidence (licence, role, documents) below.
- **Calendly**: [screen](https://mobbin.com/screens/3cd7e903-497a-4087-aa32-e4efd0ba2810) · [image](https://mobbin.com/api/mcp/short/6dJCStZX)
  Tabs "Active users (1) / Pending users (2)" with a Pending status pill.
- **7shifts: "Pending Requests" card with inline Approve / Decline next to an Activity Log card**: [screen](https://mobbin.com/screens/cc7d3fa8-66ee-45cb-9332-e7e557975c70) · [image](https://mobbin.com/api/mcp/short/jdaAx4OB)
- **Airwallex: "Pending your approval: 1" summary card above a filterable table**: [screen](https://mobbin.com/screens/64cb7251-edd5-4bfa-ad69-8f89182ffafa) · [image](https://mobbin.com/api/mcp/short/0KUuE9pT)
- **Microsoft Teams: Member requests with Approve / ✕ and "Approve all"**: [screen](https://mobbin.com/screens/5cf259ed-d5bf-4493-b027-9a81d27c58c5)
  **Deel: "Action required 72" with inline ✓/✗ per row and bulk "Approve all your pending"**: [screen](https://mobbin.com/screens/b6d82ee0-8694-4f55-a1d5-9f0964c8b13c)
  **Watch-out:** bulk approve is wrong for credential checks. Each professional should be approved one at a time.

## Admin: moderate reports

- **Circle: Moderation**: [screen](https://mobbin.com/screens/14890efa-be84-4cf5-8541-fee384c1b459) · [image](https://mobbin.com/api/mcp/short/zVmnhtFu)
  Tabs Inbox (1) / Approved / Rejected. A modal has **Details | Reports (2)** tabs that list each reporter with their reason, and the actions are "Approve comment" and "Reject comment".
  **Takeaway:** the best model for SAYO. Several reports on one post are grouped together, with every reason visible.
- **Reddit mod tools: Queue**: [screen](https://mobbin.com/screens/14b41132-545c-4de3-94bf-dd58460ef7c3) · [image](https://mobbin.com/api/mcp/short/4MBUzM2x)
  Tabs Needs Review / Reported / Removed / Edited / Unmoderated. Inline actions are "Add removal reason", Approve and Lock. The navigation includes Rules, Saved Responses, **Mod Log**, Automod and Safety Filters.
  **Takeaway:** a Mod Log (who did what, and when) is essential for trust and audit.
- **Reddit: rule enforcement options**: [screen](https://mobbin.com/screens/ae0ef37b-7fa3-45de-a30a-3dd74854b919) · [image](https://mobbin.com/api/mcp/short/Pr5EBXhX)
  The options are "Report (add to mod queue without removing)", "Remove for review", "Remove" and "Only show guidance".
  **Takeaway:** decide the rule for SAYO, e.g. one "Someone may be in danger" report means *remove for review and alert safety*.
- **Aboard: Whistleblowing table**: [screen](https://mobbin.com/screens/cb4c0d02-dfb6-4138-aaac-ff9e4cf78082) · [image](https://mobbin.com/api/mcp/short/lAP4S6lQ)
  Columns Category / Received / Message / Handler ("Unassigned") / Status "Open".
  **Takeaway:** a minimal sensitive-report table with an owner column.
- **Cloudflare: Abuse Reports**: [screen](https://mobbin.com/screens/1b6158c0-c83e-414f-bff1-a172aedecd85)
  "Attention needed | All reports" with filters and a calm empty state.

## Admin: waiting cases and metrics

- **Front: Live dashboard**: [screen](https://mobbin.com/screens/2447f03a-a38e-42f5-a6b9-ffc1d4bdd6b8) · [image](https://mobbin.com/api/mcp/short/xHASBQvw)
  KPI tiles **Open 233 / Unassigned 230 / Oldest 6d 18h**, an "Oldest conversations" table with assignee and status, and workload by teammate.
  **Takeaway:** the best model for "monitor waiting cases". The oldest unassigned case is the single number an admin must watch.
- **Gorgias: Statistics**: [screen](https://mobbin.com/screens/b16206fc-c8f4-49a7-8a17-5181fe95ae48) · [image](https://mobbin.com/api/mcp/short/gNkb7tYp)
  A "Created vs closed tickets" chart and productivity tiles ("Average response time 1h 32m", "Ticket handle time", "One-touch tickets").
  **Takeaway:** candidate SAYO metrics are cases opened vs answered, time to first response, and the share of cases marked Urgent.
- **Vanta: Overview**: [screen](https://mobbin.com/screens/7c8926ed-5d43-49d9-9175-572ee1708c01) · [image](https://mobbin.com/api/mcp/short/VDb4sKwA)
  The banner **"1 pending access request — View access requests"** sits above the charts.
  **Takeaway:** put action items (pending professionals, unreviewed reports, overdue cases) above the charts.
- Squarespace ([screen](https://mobbin.com/screens/c31bbf92-170e-4042-81e1-ccfc636269de)), Confluence ([screen](https://mobbin.com/screens/7b87f3e2-b5d6-45f6-98fa-c687f7878fa3)) and Shopify ([screen](https://mobbin.com/screens/67c692cd-8113-4701-9429-02f417328bef)) are generic KPI-plus-chart layouts and add nothing specific.
