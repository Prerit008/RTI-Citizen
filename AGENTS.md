# AGENTS.md — RTI Online Platform (Next-Gen, Citizen-First)

This file is the persistent context for any AI coding agent working on this repository. Read this fully before writing code. When a decision here conflicts with a new instruction from the user in-session, the in-session instruction wins — but flag the conflict before proceeding on anything architectural.

---

## 1. Mission

Rebuild the Right to Information (RTI) request platform from a **citizen-experience-first** perspective, not a department-workflow-first perspective. The system must be the single front door through which any citizen — regardless of language, literacy, device, or connectivity — can file an RTI request, track it with full transparency, escalate/appeal automatically when deadlines are missed, and discover past disclosures without re-filing duplicate requests.

If a design decision makes life easier for a department but harder for a citizen, **default to the citizen.** Flag the trade-off instead of silently picking the easy path.

---

## 2. Non-Negotiable Design Principles

1. **One front door, many departments.** Citizens never need to know internal bureaucratic structure to file correctly. The system routes internally.
2. **Radical transparency by default.** SLA countdown, status, and full history are always visible to the filer — no black-box states.
3. **Language and literacy as first-class.** Full i18n (not just UI strings — guided flows, plain-language help, voice input) across all major regional languages, not just English + one national language.
4. **Accessible by design.** WCAG 2.2 AA minimum, works on low-bandwidth/2G, screen-reader friendly, and has non-smartphone fallback paths (IVR/USSD/SMS).
5. **Privacy and safety-respecting trust.** Strong identity/auth where legally required, but never over-collect. RTI filers can be whistleblowers-adjacent; treat PII and filing metadata with care.
6. **Public knowledge reuse.** Disclosed responses become a searchable public archive so citizens can self-serve before filing a duplicate request.
7. **SLA is a first-class data object**, not a side effect of a timestamp — deadlines drive notifications, escalations, and appeals automatically.

---

## 3. Core Citizen Journey (the spine of the product)

```
File → Track (live SLA countdown) → Receive Response → 
Auto-suggested Escalation/Appeal (if deadline missed) → Rate Response → 
Response becomes searchable public record (where legally disclosable)
```

Every feature you build should be traceable to a step in this journey. If it isn't, question whether it belongs in v1.

---

## 4. System Architecture (layered)

| Layer | Responsibility |
|---|---|
| **Citizen Experience Layer** | Web app (PWA), mobile-responsive, IVR/USSD/SMS fallback, multilingual UI, guided filing wizard, assistant/chatbot for drafting help |
| **Case Orchestration Layer** | Request routing to correct department/PIO, SLA clock engine, appeal/escalation state machine |
| **Department Integration Layer** | Adapters/APIs so departments can receive, respond, upload documents, and log actions — supports both API-integrated departments and manual/portal-only departments |
| **Identity & Trust Layer** | Auth (OTP/email, optional DigiLocker/Aadhaar-style verification abstraction), fee payment + exemption handling (BPL etc.) |
| **Transparency & Knowledge Layer** | Public searchable archive of disclosed responses, analytics for civil society/oversight bodies |
| **Notification Layer** | SMS, WhatsApp, email, push — channel-agnostic delivery with retries |
| **Data & Compliance Layer** | Audit logs, statutory SLA compliance reporting, grievance redressal, data retention policy enforcement |

Keep these as **separately deployable services** (or at minimum, separately testable modules) from day one, even if v1 ships as a modular monolith. Do not hard-couple citizen-facing code to department-integration code.

---

## 5. Recommended Tech Stack (starting point — adjust with reasoning, don't silently swap)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS. PWA-enabled for offline/low-bandwidth resilience.
- **i18n:** `next-intl` or `react-i18next` with ICU message format. Translation content stored separately from code (JSON/PO files) so non-engineers can contribute translations via a review workflow.
- **Backend:** NestJS (Node.js + TypeScript) for modular, testable service boundaries that map to the layers in §4.
- **Primary DB:** PostgreSQL (relational integrity matters for SLA/legal audit trails).
- **Cache/Queues:** Redis + BullMQ for SLA timers, reminders, notification dispatch.
- **Search:** OpenSearch/Elasticsearch for the public disclosure knowledge base.
- **File storage:** S3-compatible object storage for attachments/responses (with virus scanning on upload).
- **Notifications:** Abstracted provider interface — SMS gateway, WhatsApp Business API, email (SES-compatible), push. Never hard-code a single vendor; use an adapter pattern.
- **Auth:** OIDC/OAuth2. Abstract identity verification (DigiLocker/Aadhaar-equivalent) behind an interface — do not assume availability in all environments/demos.
- **Infra:** Docker + Kubernetes, Terraform for IaC, GitHub Actions for CI/CD.
- **Observability:** OpenTelemetry + Prometheus/Grafana. SLA breaches must be observable as metrics, not just DB rows.

If Agents judges a different stack is meaningfully better for a specific module, propose it with a one-paragraph rationale before switching — don't drift silently.

---

## 6. Data Model — Core Entities (v1 scope)

Sketch only; expand with migrations as modules are built.

- **Citizen** — identity, contact channels, preferred language, verification status
- **RTIRequest** — citizen_id, department_id, subject, description, attachments, filing_date, status, sla_deadline, language, fee_status, exemption_flag
- **Department / PIO** — jurisdiction, integration_type (API / manual / email-bridge), contact routing rules
- **StatusEvent** — request_id, event_type, timestamp, actor, notes (full audit trail — append-only)
- **Appeal** — request_id, appeal_level (first/second/commission), filed_date, deadline, status
- **DisclosureRecord** — request_id (if public), redacted_response, publish_date, tags, search_index_ref
- **Notification** — recipient, channel, template_id, status, retry_count

SLA deadlines should be **computed and stored explicitly**, not derived ad hoc at query time — this is what powers reminders and auto-escalation.

---

## 7. Multilingual & Accessibility Requirements (do not treat as polish)

- All user-facing strings go through the i18n layer from the first commit — no hardcoded English strings "to fix later."
- Guided filing wizard should support **plain-language mode** (short sentences, examples, tooltips) as a toggle, not just raw form fields.
- Voice input/output and text-to-speech for low-literacy users where feasible.
- Every interactive component must be keyboard-navigable and screen-reader labeled (proper ARIA).
- Design for 2G/3G: lazy-load, compress aggressively, provide an SMS/IVR path for status checks at minimum.

---

## 8. Coding Standards for the Agent

- TypeScript strict mode everywhere. No `any` without a comment justifying it.
- Every service module gets unit tests for its core logic before being marked done — especially the SLA engine and routing logic, since these carry legal/statutory weight.
- Write migrations for every schema change; never hand-edit the DB.
- Feature flags for anything not yet legally/organizationally approved for production (e.g., Aadhaar integration) so the rest of the system isn't blocked on it.
- Comment *why*, not *what*, especially around SLA/legal deadline logic — this code will be audited.
- Prefer small, reviewable PR-sized commits over large sweeping changes. If a task will produce a large diff, break it into phases and check in with the user between phases.

---

## 9. Build Phases (suggested — confirm with user before starting each)

1. **Phase 0 — Foundations:** repo scaffolding, CI/CD, auth skeleton, i18n plumbing, base design system.
2. **Phase 1 — Core Filing Journey:** guided wizard, department routing (manual/mock departments first), SLA clock, status tracking UI.
3. **Phase 2 — Notifications & Escalation:** multi-channel notifications, auto-suggested appeals, appeal state machine.
4. **Phase 3 — Transparency Layer:** public disclosure archive + search.
5. **Phase 4 — Department Integration:** real adapters for API-capable departments; email/manual bridge for the rest.
6. **Phase 5 — Accessibility & Non-Smartphone Access:** IVR/USSD/SMS fallback, full WCAG audit.
7. **Phase 6 — Scale & Hardening:** load testing, security audit, observability dashboards.

Do not silently skip ahead to later phases because they're more interesting — the citizen journey in §3 must work end-to-end (even with mocked departments) before deep infra work begins.

---

## 10. Agent Working Agreement

- Before making an architectural decision not covered above, state the trade-off in one short paragraph and ask, rather than assuming.
- Before generating a large batch of files/boilerplate, confirm the phase and scope with the user first.
- Treat legal/statutory logic (SLA deadlines, appeal windows, exemptions) as high-stakes: flag any assumption made about the underlying RTI law/timelines rather than hardcoding a number silently.
- Keep this file updated as decisions are made — it's the shared memory across sessions.
