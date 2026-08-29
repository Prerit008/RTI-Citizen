# RTI Online Citizen Platform (Next-Gen, Citizen-First)

> **Official Right to Information (RTI) Web Portal — Government of India**  
> Built under the statutory provisions of the **Right to Information Act, 2005**, designed with a radical **citizen-experience-first** architecture.

---

## 🏛️ Platform Overview

The **RTI Online Citizen Platform** is a unified digital front-door allowing citizens across India — regardless of language, literacy, device, or connectivity — to file RTI applications, monitor statutory 30-day SLA countdowns with radical transparency, preference First Appeals under Section 19(1), reconcile online payment disputes, and access official public disclosures.

---

## ✨ Key Platform Features

### 1. Guided Citizen Filing Wizard (`/file-rti`)
- **4-Step Intuitive Flow**:
  1. **Authority Selection**: Search and filter through Central Ministries, Departments, and Public Authorities.
  2. **Applicant Particulars**: Personal, contact, address, and BPL exemption card verification.
  3. **Information Request Drafting**: Plain-language drafting aid with a 3,000-character input box and PDF supporting document attachment.
  4. **Review & Payment**: Summary review, fee calculation (₹10 standard, ₹0 for BPL cardholders), and multi-mode payment simulation (UPI, NetBanking, Cards).
- **Statutory 30-Day SLA**: Computes and stores strict legal disposal deadlines upon submission.

### 2. Parent-Child First Appeal Engine (`/first-appeal`)
- **Statutory Hierarchy (Section 19(1) RTI Act 2005)**:
  - Directly appeals against handling/decision of a parent RTI application.
  - Requires and verifies an existing **Parent RTI Registration Number**.
  - Automatically updates the parent RTI timeline and flags status to *"Under First Appeal"*.
- **Pre-configured Statutory Grounds**:
  - *No response received within 30 days (Deemed Refusal under Sec. 7(2))*
  - *Information wrongfully refused / rejected by CPIO*
  - *Incomplete, misleading or false information provided*
  - *Unreasonable additional fee demanded*
  - *Delay / improper transfer under Section 6(3)*
- **₹0 Statutory Fee**: 100% free filing as mandated by RTI Rules, 2012.
- **FAA SLA Clock**: Real-time 30-day First Appellate Authority (FAA) disposal tracking under Section 19(6).

### 3. Official Downloadable Vector PDF Generators
- **RTI Application Acknowledgement PDF**: Downloadable at submission (`/file-rti/success`) and anytime during tracking (`/track`). Features the Government of India letterhead, DoPT portal banner, registration number, filing timestamp, CPIO routing, applicant details, 30-day SLA deadline, and QR verification stamp.
- **PIO Official Information Disclosure Letter PDF**: Downloadable when an application reaches *"Response Ready"*. Contains official Ministry dispatch file number (`F.No. RTI/.../DISP-...`), date of disposal, itemized point-by-point disclosure facts, FAA details, and CPIO digital signature.
- **First Appeal Memorandum PDF**: Formal Section 19(1) appeal receipt with appeal registration number, parent RTI reference, grounds, relief sought, and legal timelines.

### 4. Real-time Application & SLA Tracking (`/track`)
- Track by unique **Registration Number** (e.g. `RTI/2026/123456`).
- Transparent audit trail timeline from submission to CPIO review to response disposal.
- Live **Statutory SLA Clock** showing remaining days before deadline.
- Direct auto-escalation prompt to *"File First Appeal against this RTI"* if 30 days pass or response is unsatisfactory.

### 5. Multilingual Indian Regional Language Auto-Translation
- Auto-translates the **entire portal** across **12+ major Indian regional languages**:
  - **Hindi (हिन्दी)**
  - **Bengali (বাংলা)**
  - **Marathi (मराठी)**
  - **Telugu (తెలుగు)**
  - **Tamil (தமிழ்)**
  - **Gujarati (ગુજરાતી)**
  - **Kannada (ಕನ್ನಡ)**
  - **Malayalam (മലയാളം)**
  - **Punjabi (ਪੰਜਾਬੀ)**
  - **Odia (ଓଡ଼ିଆ)**
  - **Assamese (অসমীয়া)**
  - **Urdu (اردو)**
  - **English (Default)**
- **Headless Branding & Zero-Offset**: Suppresses third-party top frames, banners, and tooltips via CSS and MutationObservers, keeping the top government bar and accessibility controls perfectly aligned.
- **Language Selector Modal**: Native script cards with state and language search.

### 6. Payment Reconciliation Portal (`/payment-reconciliation`)
- Resolves instances where fees were debited from bank/UPI accounts without registration number generation.
- **Transaction Settlement Verifier**: Look up by Bank Reference / UTR Number or contact details.
- **Grievance Ticket System**: Issues tracked reconciliation tickets (`PR-2026-XXXXXX`).
- Clarifies 24–48 hr bank settlement cycle and 3–5 working day auto-refund window.

### 7. Official Help Desk & Support Centre (`/help`)
- Prominent official notice:
  > **Help Desk :** For any query or feedback related to this portal, Please contact at **011-24010690/691 new**, during office hours **(9:00 AM to 5:30 PM, Monday to Friday except Public Holidays)** or send an email to `helprtionline-dopt[at]nic[dot]in`. Due to high call volume, call waiting may occur.
- One-click click-to-call, email dispatch, and copy actions.
- General grievance & inquiry ticketing system (`HD-2026-XXXXXX`).

### 8. Unified Global Search (`Ctrl+K`)
- Search bar on the Home page hero connects directly to the header Global Search Modal.
- Live keyword search across Public Authorities, Services, and 26 FAQ topics.

### 9. Accessibility (WCAG 2.2 AA Compliant)
- Font size adjustment (`A-`, `A`, `A+`).
- High Contrast mode toggle.
- Grayscale mode and readable typography filters.
- Skip-to-main-content screen reader links and full ARIA keyboard navigation.

---

## 🛠️ Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│                   Citizen Web Client                   │
│      React 19 · React Router v7 · Tailwind CSS · PWA   │
└───────────────────────────┬────────────────────────────┘
                            │ (REST APIs + JWT Auth)
┌───────────────────────────▼────────────────────────────┐
│               Express.js Modular Backend               │
│                  Port: 5001 (Node.js)                  │
├────────────────────────────────────────────────────────┤
│  • Auth Controller & JWT Verification                  │
│  • Application Controller & 30-Day SLA Engine          │
│  • Appeal Controller (Parent-Child Section 19(1))      │
│  • Authority Controller & Directory Search             │
│  • In-Memory Repository Layer (Mongoose-Ready)         │
└────────────────────────────────────────────────────────┘
```

- **Frontend**: React 19, React Router v7, Tailwind CSS, Lucide React, jsPDF.
- **Backend**: Express.js (v5), JSON Web Tokens (JWT), bcryptjs, Morgan logger, CORS.
- **Storage Layer**: In-memory repository pattern designed for zero-refactor transition to MongoDB/PostgreSQL.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.x or higher)
- npm (v9.x or higher)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Prerit008/RTI-Citizen.git
   cd RTI-Citizen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Full-Stack Development Server**:
   ```bash
   npm run dev
   ```
   - **Frontend App**: `http://localhost:3000`
   - **Backend API**: `http://localhost:5001`
   - **Backend Health Check**: `http://localhost:5001/api/health`

Alternatively, run them in separate terminals:
```bash
# Terminal 1: Start React Frontend
npm start

# Terminal 2: Start Express Backend
npm run server:dev
```

---

## 🔑 Demo & Test Credentials

| Role | Email | Password | Purpose |
|---|---|---|---|
| **Demo Citizen 1** | `demo.citizen@example.com` | `Citizen@123` | Pre-loaded sandbox test account (`RTI/2026/123456`, `RTI/2026/098721`) |
| **Demo Citizen 2** | `test.applicant@example.com` | `India@456` | Pre-loaded sandbox test account (`RTI/2026/074321`) |

*Quick test demo registration numbers for status tracking:*
- `RTI/2026/123456` *(Active — Under Review with Demo Railways)*
- `RTI/2026/098721` *(Response Ready — Demo Education)*

---

## 📡 Backend API Endpoints

### 🔐 Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new citizen account
- `POST /api/auth/login` — Sign in and obtain JWT token
- `GET /api/auth/me` — Get current logged-in user profile (Bearer token required)

### 📋 RTI Applications (`/api/applications`)
- `POST /api/applications` — Submit a new RTI application
- `GET /api/applications` — List citizen's filed applications
- `GET /api/applications/:regNumber` — Track application status & SLA countdown
- `GET /api/applications/stats/summary` — Overview metrics (Active, Completed, Appeals)

### ⚖️ First Appeals (`/api/appeals`)
- `POST /api/appeals` — File First Appeal linked to parent RTI application
- `GET /api/appeals/:appealNumber` — Track specific appeal and FAA SLA
- `GET /api/appeals/parent/:regNumber` — List all appeals for a parent RTI

### 🏛️ Public Authorities (`/api/authorities`)
- `GET /api/authorities` — List and search ministries/departments
- `GET /api/authorities/:id` — Get detailed public authority information & PIO contacts

### 🩺 System Health (`/api/health`)
- `GET /api/health` — Backend server heartbeat status

---

## 📄 License & Compliance

Developed in accordance with the **Right to Information Act, 2005** and guidelines issued by the **Department of Personnel & Training (DoPT)**, Government of India.
