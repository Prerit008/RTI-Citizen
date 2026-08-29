# 🇮🇳 RTI Citizen - Reimagining India's Right to Information Experience

> **A citizen-first redesign of the RTI Online journey, built for Build What Moves India 2026.**

RTI Citizen is a modern, accessible prototype that reimagines how Indian citizens **understand, file, track and appeal RTI applications**.

The project focuses on a simple question:

**What if filing an RTI felt as easy as completing any modern digital service - instead of navigating a complex government workflow?**

This prototype was built as part of **Build What Moves India**, with **Codex / OpenAI-powered development** playing a meaningful role throughout the build process.

> ⚠️ **Prototype Notice:** RTI Citizen is an independent hackathon prototype and is **not an official Government of India website or service**. It uses synthetic/mock data and simulated government workflows wherever live government integration would be unsafe or unavailable.

---

## 🎯 The Problem

The Right to Information Act gives citizens a powerful mechanism to seek information from public authorities.

However, the digital journey can still be difficult for many citizens.

A first-time user may have to understand:

* Which Public Authority should receive the RTI?
* What exactly should be written in the application?
* What information can be requested?
* How does the ₹10 application fee work?
* Where can the application be tracked?
* What happens if no response is received within 30 days?
* What is a **First Appeal**?
* When and how should a citizen file one?
* What happens after filing an appeal?

For digitally experienced users, these may be manageable steps.

For citizens with limited digital experience, language barriers, mobile-only access or slower connectivity, they can become significant friction points.

### Our goal

**Turn a legally complex process into a guided citizen journey.**

---

# 💡 Our Approach

Instead of simply redesigning screens, we redesigned the **entire citizen journey** around clarity and guidance.

### From:

**Find → Understand → Fill → Pay → Wait → Figure out what happens next**

### To:

**Understand → Guided Filing → Submit → Track → Get Help → Appeal when necessary**

The platform continuously answers the questions a citizen is likely to have at each stage.

---

# 👤 Complete Citizen Journey

The prototype supports an end-to-end RTI journey.

### 1. Discover

The home page gives citizens a simple starting point rather than overwhelming them with government terminology.

Citizens can:

* Understand what RTI is
* Search for services and authorities
* Access FAQs
* Start filing an RTI
* Track an existing application
* Access help and support

---

### 2. Choose the Public Authority

Citizens can search and filter public authorities instead of manually navigating complicated lists.

The experience is designed around the citizen's intent:

> **"Who has the information I am looking for?"**

---

### 3. File an RTI

A guided **4-step filing wizard** breaks the process into manageable sections:

**Step 1 - Authority**

Select the relevant ministry, department or public authority.

**Step 2 - Applicant Details**

Enter basic applicant and contact information, with support for BPL exemption.

**Step 3 - Information Request**

Draft the information request using a simple, citizen-friendly interface.

Supporting documents can also be attached.

**Step 4 - Review & Payment**

Review the complete application, understand the applicable fee and proceed through the simulated payment journey.

---

### 4. Submission & Acknowledgement

After submission, the citizen receives a clear application reference and acknowledgement.

The prototype generates a downloadable acknowledgement document containing relevant application information.

---

### 5. Track the Application

Citizens can track an application using its registration number.

The tracking experience provides:

* Current status
* Application timeline
* Important milestones
* Statutory deadline
* Remaining time
* Response status

Instead of making citizens repeatedly check whether something happened, the timeline communicates **what happened and what happens next**.

---

# ⏱️ Statutory SLA Transparency

One of our core design principles is:

## **Don't make citizens calculate government deadlines themselves.**

The platform calculates and displays the relevant **30-day RTI response timeline**.

The citizen can immediately understand:

> **When should I expect a response?**

and

> **What can I do if that deadline passes?**

---

# ⚖️ First Appeal - Making the Next Step Obvious

One of the biggest improvements in the prototype is the integration of the **First Appeal journey**.

A citizen shouldn't have to leave the application journey and independently figure out what a First Appeal means.

The platform connects the appeal directly to the original RTI application.

### First Appeal flow

**Existing RTI → Check eligibility → Select reason → Explain issue → Review → Submit → Track**

The prototype supports common grounds such as:

* No response received within the prescribed period
* Information refused or rejected
* Incomplete, misleading or false information
* Unreasonable additional fee
* Issues involving transfer of the application

The appeal remains linked to its **parent RTI application**, giving the citizen a continuous case history instead of two disconnected processes.

---

# 🌐 Designed for Real Indian Users

Accessibility is not treated as an additional feature.

It is part of the product architecture.

### Multilingual Experience

The prototype supports a multilingual interface including:

* English
* Hindi
* Bengali
* Marathi
* Telugu
* Tamil
* Gujarati
* Kannada
* Malayalam
* Punjabi
* Odia
* Assamese
* Urdu

The goal is to make government services understandable beyond English-first users.

---

### ♿ Accessibility

The interface includes accessibility-oriented controls such as:

* Font size adjustment
* High contrast mode
* Grayscale mode
* Readable typography
* Skip-to-main-content navigation
* Keyboard-friendly interactions
* Screen-reader-oriented ARIA support

---

# 💳 Payment Reconciliation

A failed or interrupted payment should not leave a citizen wondering:

> **"My money was deducted. Where did my RTI go?"**

The prototype includes a dedicated payment reconciliation journey.

Citizens can:

* Search using a transaction / UTR reference
* Understand settlement states
* Create a reconciliation ticket
* Track the issue

The prototype communicates expected settlement and refund timelines using simulated data.

---

# 🔎 One Search for the Whole Experience

The platform includes a unified search experience accessible through the home interface.

Citizens can search across:

* Public Authorities
* Services
* FAQs
* RTI-related information

The objective is to reduce the cognitive load of figuring out **where something lives on the website**.

---

# ❓ Citizen-Centric FAQ

Instead of expecting citizens to understand legal terminology before they begin, the platform provides contextual answers to common questions.

Examples include:

* What is RTI?
* Who can file an RTI?
* How much does it cost?
* What can I ask for?
* How long does a response take?
* What happens if I don't receive a response?
* What is a First Appeal?
* When should I file a First Appeal?

The FAQ experience is designed to answer questions **before they become blockers**.

---

# 🧠 Built With Codex / OpenAI

Codex was not used as a last-minute submission requirement.

It was part of the development process.

We used AI-assisted development to help:

* Structure the application architecture
* Develop and iterate UI components
* Implement citizen workflows
* Refine form interactions
* Build application and appeal flows
* Improve accessibility patterns
* Create mock backend behavior
* Generate and refine reusable components
* Debug and iterate across the full-stack prototype
* Think through edge cases across the citizen journey

The important part was not simply generating code.

**The goal was to use AI to accelerate product iteration while keeping the citizen problem at the center of every decision.**

---

# 🏗️ Product Architecture

```text
                         CITIZEN
                            │
                            ▼
                ┌─────────────────────┐
                │   RTI Citizen Web   │
                │     Experience      │
                └──────────┬──────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      File RTI          Track           First Appeal
          │                │                │
          └────────────────┼────────────────┘
                           │
                           ▼
                 ┌───────────────────┐
                 │   REST API Layer  │
                 │    Express.js     │
                 └─────────┬─────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        Applications     Appeals      Authorities
            │              │              │
            └──────────────┼──────────────┘
                           ▼
                   Mock Repository
```

---

# 🛠️ Tech Stack

### Frontend

* React 19
* React Router v7
* Tailwind CSS
* Lucide React
* jsPDF
* Progressive Web App approach

### Backend

* Node.js
* Express.js 5
* JWT authentication
* bcryptjs
* Morgan
* CORS

### Storage

The current prototype uses an **in-memory repository layer**.

The repository abstraction is designed to allow migration to persistent storage such as:

* MongoDB
* PostgreSQL

without requiring a complete rewrite of the application layer.

---

# 📱 Core Features

| Feature                   | Purpose                                       |
| ------------------------- | --------------------------------------------- |
| 🧭 Guided RTI Filing      | Makes filing easier for first-time users      |
| 🏛️ Authority Search      | Helps citizens find the right authority       |
| ✍️ Request Drafting       | Simplifies information-request creation       |
| 💳 Payment Flow           | Simulates the RTI fee journey                 |
| 📄 Acknowledgement        | Provides a clear submission record            |
| ⏱️ SLA Tracking           | Makes statutory deadlines visible             |
| 🔎 Application Tracking   | Shows progress through a timeline             |
| ⚖️ First Appeal           | Connects appeals directly to the original RTI |
| 💰 Payment Reconciliation | Handles simulated payment issues              |
| 🌐 Multilingual UI        | Supports major Indian languages               |
| ♿ Accessibility           | Supports diverse citizen needs                |
| ❓ Citizen FAQ             | Explains complex RTI concepts                 |
| 🔍 Global Search          | One entry point for finding information       |
| 📑 PDF Generation         | Produces downloadable application documents   |

---

# 🧪 What Works vs What Is Mocked

This is a prototype built for a hackathon, not a production government integration.

### ✅ Demonstrated in the prototype

* Citizen registration/login
* RTI filing journey
* Public authority selection
* Application submission
* Application tracking
* SLA countdown
* First Appeal journey
* Appeal tracking
* Payment reconciliation flow
* FAQ/search experience
* Multilingual interface
* Accessibility controls
* PDF generation
* Mock backend APIs
* End-to-end citizen navigation

### 🧪 Mocked / Simulated

For safety and because production government integrations are unavailable:

* Government database connections
* Real payment processing
* OTP verification
* Real Aadhaar/PAN verification
* Actual CPIO/FAA actions
* Government authentication systems
* Real application submission to government systems
* Real bank settlement/refund processing

**No real sensitive citizen credentials, payment information or government-system access are used.**

---

# 🔐 Safety & Responsible Prototyping

We intentionally did **not** attempt to access, scrape, reverse-engineer or interfere with live government systems.

All demonstration accounts, application numbers, payment transactions and backend states are synthetic.

The prototype is designed to demonstrate the **experience and system concept**, not to impersonate or interfere with an existing government service.

---

# 🚀 Running Locally

## Prerequisites

* Node.js 18+
* npm 9+

## Installation

```bash
git clone https://github.com/Prerit008/RTI-Citizen.git
cd RTI-Citizen
npm install
```

## Start the full-stack application

```bash
npm run dev
```

### Services

```text
Frontend → http://localhost:3000
Backend  → http://localhost:5001
Health   → http://localhost:5001/api/health
```

Alternatively:

```bash
# Terminal 1
npm start

# Terminal 2
npm run server:dev
```

---

# 🔑 Demo Credentials

> These are synthetic demonstration accounts created exclusively for the prototype.

| Role      | Email              | Password      |
| --------- | ------------------ | ------------- |
| Citizen 1 | `demo.citizen@example.com` | `Citizen@123` |
| Citizen 2 | `test.applicant@example.com` | `India@456`   |

### Demo applications

```text
RTI/2026/123456
→ Active - Under Review

RTI/2026/098721
→ Response Ready

RTI/2026/451209
→ Demo application
```

---

# 📡 API Overview

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### RTI Applications

```text
POST /api/applications
GET  /api/applications
GET  /api/applications/:regNumber
GET  /api/applications/stats/summary
```

### First Appeals

```text
POST /api/appeals
GET  /api/appeals/:appealNumber
GET  /api/appeals/parent/:regNumber
```

### Public Authorities

```text
GET /api/authorities
GET /api/authorities/:id
```

### System

```text
GET /api/health
```

---

# 📈 From Prototype to Production

The prototype demonstrates the citizen-facing experience.

A production implementation would require deeper integration with the existing government ecosystem.

Potential next steps include:

### 1. Secure Government Integration

Authenticated and audited APIs connecting with relevant government systems.

### 2. Production Identity & Verification

Government-approved identity and authentication mechanisms without exposing sensitive information unnecessarily.

### 3. Persistent Data Infrastructure

Move from the current in-memory repository to a secure, highly available government-grade data platform.

### 4. Notifications

Provide citizens with:

* Application updates
* Deadline reminders
* Response notifications
* First Appeal reminders

through appropriate channels.

### 5. Human & Administrative Workflows

The citizen interface should connect to corresponding CPIO and FAA workflows without exposing administrative complexity to citizens.

### 6. Observability & Auditability

A production system should provide:

* Immutable audit logs
* Monitoring
* Security controls
* Failure recovery
* Access controls
* Compliance reporting

---

# 🏆 Why This Matters

The RTI Act is fundamentally about **access to information**.

A digital service built around that right should not create another information barrier.

Our approach is therefore simple:

> **Government systems should adapt to citizens - not citizens to government systems.**

RTI Citizen attempts to make that principle tangible through:

**Clarity.
Guidance.
Transparency.
Accessibility.
Continuity.**

From the first question to the final appeal, the citizen should always know:

### **Where am I?**

### **What happened?**

### **What happens next?**

---

# 🇮🇳 Build What Moves India

This project was built for **Build What Moves India 2026** - a challenge focused on rethinking real problems in Indian public-service websites and digital services.

We chose RTI because the underlying service is important, legally empowered and citizen-facing, while the digital journey presents an opportunity for a fundamentally better experience.

Our goal wasn't to make another government-looking website.

**It was to ask what a government service would look like if it were designed from the citizen's perspective first.**

---

## 📄 Legal & Prototype Disclaimer

RTI Citizen is an independent hackathon prototype.

It is **not an official Government of India portal**, does not represent the Department of Personnel & Training (DoPT), and does not imply government approval, endorsement or partnership.

The prototype uses synthetic/mock data and simulated workflows for demonstration purposes.

Any production implementation would require appropriate government authorization, security review, legal validation, infrastructure integration and compliance processes.

---

## 👥 Team

| Name | GitHub | Contributions | 
|------|--------|---------------|
|[Prerit Agarwal](https://github.com/Prerit008) | ![GitHub](https://img.shields.io/github/followers/Prerit008?label=Follow&style=social) | ![Contributions](https://img.shields.io/badge/Contributions-107%2B-brightgreen)|
|[Ritwik Agrawal](https://github.com/RitwikAg120) | ![GitHub](https://img.shields.io/github/followers/RitwikAg120?label=Follow&style=social) | ![Contributions](https://img.shields.io/badge/Contributions-50%2B-brightgreen)|

Built with **React + Express + OpenAI/Codex-assisted development**.

---

## ⭐ The Idea in One Sentence

> **RTI Citizen turns a complex government process into a guided, transparent and accessible citizen journey - from asking a question to getting an answer, and from an unanswered RTI to the next legal step.**
