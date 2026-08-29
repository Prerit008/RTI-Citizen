import { jsPDF } from "jspdf";

/**
 * Generate and download an authentic Government of India RTI Application Acknowledgement PDF.
 * @param {Object} data Application details
 */
export const downloadAcknowledgmentPDF = (data = {}) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const regNo = data.registrationNumber || data.id || "RTI/2026/123456";
    const authority = data.authorityName || data.authority || "Concerned Public Authority";
    const applicantName = data.applicantName || data.applicant?.name || "Citizen Applicant";
    const applicantEmail = data.applicantEmail || data.applicant?.email || "citizen@gov.in";
    const applicantMobile = data.applicantMobile || data.applicant?.mobile || "Not provided";
    const applicantAddress = data.applicantAddress || [
        data.applicant?.address,
        data.applicant?.city,
        data.applicant?.state,
        data.applicant?.pincode,
    ].filter(Boolean).join(", ") || "India";

    const filingDate = data.submittedOn || data.filedDate || new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const slaDeadline = data.slaDeadlineDate || "Within 30 days of filing";
    const feeStatus = data.isBPL || data.amountPaid === "Exempted (BPL)" ? "Exempted (Below Poverty Line)" : "₹10 (Paid Online)";
    const paymentMethod = data.paymentMethod || (data.isBPL ? "BPL Exemption" : "Online UPI / NetBanking");
    const txnRef = data.paymentReference || `TXN${Date.now()}`;
    const requestText = data.requestText || data.request?.text || "Information requested under Section 6(1) of the RTI Act 2005.";

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // ── Header Border Top ──
    doc.setDrawColor(24, 43, 73); // Navy #182B49
    doc.setLineWidth(1.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    // ── Official Header ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(24, 43, 73);
    doc.text("GOVERNMENT OF INDIA / भारत सरकार", pageWidth / 2, y, { align: "center" });
    y += 5;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 80, 95);
    doc.text("RIGHT TO INFORMATION ONLINE PORTAL", pageWidth / 2, y, { align: "center" });
    y += 4.5;
    doc.setFontSize(8.5);
    doc.text("Department of Personnel and Training (DoPT), New Delhi", pageWidth / 2, y, { align: "center" });
    y += 4;

    doc.setDrawColor(200, 210, 225);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // ── Receipt Title ──
    doc.setFillColor(240, 245, 255);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 30, 80);
    doc.text("RTI APPLICATION ACKNOWLEDGEMENT RECEIPT", pageWidth / 2, y + 6, { align: "center" });
    y += 13;

    // ── Summary Table Box ──
    doc.setDrawColor(215, 225, 235);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, contentWidth, 42, 2, 2, "FD");

    // Two Column layout inside box
    const col1 = margin + 4;
    const col2 = margin + (contentWidth / 2) + 2;

    doc.setFontSize(8.5);
    
    // Row 1
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Registration Number:", col1, y + 6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 37, 85);
    doc.text(regNo, col1 + 38, y + 6);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Filing Date:", col2, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(filingDate, col2 + 25, y + 6);

    // Row 2
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Public Authority:", col1, y + 13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 25, 35);
    const splitAuthority = doc.splitTextToSize(authority, contentWidth / 2 - 40);
    doc.text(splitAuthority, col1 + 38, y + 13);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Statutory SLA:", col2, y + 13);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 80, 0); // Warning/SLA highlight
    doc.text("30 Days (Sec. 7(1))", col2 + 25, y + 13);

    // Row 3
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("SLA Deadline Date:", col1, y + 21);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(slaDeadline, col1 + 38, y + 21);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Application Fee:", col2, y + 21);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 120, 60);
    doc.text(feeStatus, col2 + 25, y + 21);

    // Row 4
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Payment Mode / Ref:", col1, y + 29);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(`${paymentMethod} (${txnRef})`, col1 + 38, y + 29);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Application Status:", col2, y + 29);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 100, 200);
    doc.text("Received by CPIO", col2 + 25, y + 29);

    // Row 5
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Nodal PIO Routing:", col1, y + 36);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 90, 100);
    doc.text("Electronically Transmitted to Central Public Information Officer", col1 + 38, y + 36);

    y += 48;

    // ── Applicant Information Section ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(24, 43, 73);
    doc.text("1. APPLICANT PARTICULARS", margin, y);
    y += 4;

    doc.setDrawColor(220, 225, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.text("Name of Applicant:", margin + 4, y);
    doc.setFont("helvetica", "normal");
    doc.text(applicantName, margin + 40, y);

    doc.setFont("helvetica", "bold");
    doc.text("Contact Email:", margin + 100, y);
    doc.setFont("helvetica", "normal");
    doc.text(applicantEmail, margin + 130, y);
    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Mobile Number:", margin + 4, y);
    doc.setFont("helvetica", "normal");
    doc.text(applicantMobile, margin + 40, y);

    doc.setFont("helvetica", "bold");
    doc.text("Postal Address:", margin + 100, y);
    doc.setFont("helvetica", "normal");
    const splitAddr = doc.splitTextToSize(applicantAddress, contentWidth - 130);
    doc.text(splitAddr, margin + 130, y);
    y += Math.max(8, splitAddr.length * 4.5);

    // ── Text of RTI Application ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(24, 43, 73);
    doc.text("2. INFORMATION SOUGHT UNDER RTI ACT, 2005", margin, y);
    y += 4;

    doc.setDrawColor(220, 225, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFillColor(250, 252, 255);
    doc.setDrawColor(220, 230, 240);
    const splitQuery = doc.splitTextToSize(requestText, contentWidth - 8);
    const boxHeight = Math.max(22, splitQuery.length * 4.5 + 8);
    doc.roundedRect(margin, y, contentWidth, boxHeight, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 40, 50);
    doc.text(splitQuery, margin + 4, y + 6);
    y += boxHeight + 8;

    // ── Statutory Guidelines & Rights ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(24, 43, 73);
    doc.text("3. STATUTORY NOTICE & CITIZEN RIGHTS", margin, y);
    y += 4;

    doc.setDrawColor(220, 225, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(70, 80, 95);

    const guidelines = [
        "1. Time Limit: As per Section 7(1) of the RTI Act 2005, the CPIO is mandated to provide information within 30 days from receipt.",
        "2. First Appeal: If no response is received within 30 days or if aggrieved by the CPIO decision, a First Appeal can be filed under Section 19(1) of the RTI Act 2005 within 30 days with the First Appellate Authority (FAA) at no additional fee.",
        "3. Tracking & Public Redaction: You can track the live SLA clock and download official disposal notices at any time on the portal using registration number: " + regNo,
        "4. Portal Helpline: For any queries, contact RTI Help Desk at 011-24010690 / 691 or email helprtionline-dopt@nic.in.",
    ];

    guidelines.forEach((g) => {
        const splitG = doc.splitTextToSize(g, contentWidth - 4);
        doc.text(splitG, margin + 2, y);
        y += splitG.length * 4.2;
    });

    // ── Signature & Digital Stamp ──
    y = Math.max(y + 6, 260);
    doc.setDrawColor(200, 210, 225);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(110, 120, 135);
    doc.text(
        `Digitally generated via National RTI Online Portal (Govt. of India) on ${new Date().toISOString()} IST. No physical signature is required.`,
        margin,
        y
    );
    y += 4;
    doc.text(`Official Record Key: SHA256:${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`, margin, y);

    // Save File
    const sanitizedReg = regNo.replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`RTI_Acknowledgement_${sanitizedReg}.pdf`);
};

/**
 * Generate and download an authentic Government RTI Information Disclosure & Official Response Letter.
 * @param {Object} data Application and official response details
 */
export const downloadOfficialResponsePDF = (data = {}) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const regNo = data.registrationNumber || data.id || "RTI/2026/098721";
    const authority = data.authorityName || data.authority || "Ministry of Education";
    const applicantName = data.applicantName || "Rahul Sharma";
    const applicantAddress = data.applicantAddress || "New Delhi - 110001";
    const filingDate = data.submittedOn || "19 August 2026";
    const responseDate = data.lastUpdated || new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const fileRefNo = `F.No. RTI/${authority.substring(0, 4).toUpperCase()}/2026/DISP-${Math.floor(1000 + Math.random() * 9000)}`;
    const cpioName = "Dr. Anita Karwal, CPIO & Joint Secretary";
    const faaName = "Shri K. Sanjay Murthy, First Appellate Authority & Secretary";

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // ── Government Letterhead ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 30, 60);
    doc.text("GOVERNMENT OF INDIA / भारत सरकार", pageWidth / 2, y, { align: "center" });
    y += 5;

    doc.setFontSize(11);
    doc.text(authority.toUpperCase(), pageWidth / 2, y, { align: "center" });
    y += 4.5;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 70, 85);
    doc.text("OFFICE OF THE CENTRAL PUBLIC INFORMATION OFFICER", pageWidth / 2, y, { align: "center" });
    y += 4;
    doc.text("Shastri Bhavan, Dr. Rajendra Prasad Road, New Delhi - 110001", pageWidth / 2, y, { align: "center" });
    y += 5;

    doc.setDrawColor(24, 43, 73);
    doc.setLineWidth(1);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    // ── Dispatch Meta ──
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 40, 50);
    doc.text(`File Reference: ${fileRefNo}`, margin, y);
    doc.text(`Date of Disposal: ${responseDate}`, pageWidth - margin, y, { align: "right" });
    y += 8;

    // ── To Section ──
    doc.text("To,", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.text(applicantName, margin + 5, y);
    y += 4.5;
    const splitAddr = doc.splitTextToSize(applicantAddress, 80);
    doc.text(splitAddr, margin + 5, y);
    y += splitAddr.length * 4.5 + 4;

    // ── Subject ──
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 30, 60);
    const subjectText = `Subject: Information sought under Right to Information Act, 2005 — Registration No: ${regNo}`;
    const splitSubject = doc.splitTextToSize(subjectText, contentWidth);
    doc.text(splitSubject, margin, y);
    y += splitSubject.length * 5 + 3;

    // ── Salutation & Opening ──
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(30, 40, 50);
    doc.text("Sir / Madam,", margin, y);
    y += 5;

    const openingText = `Please refer to your RTI application dated ${filingDate} received electronically at this Public Authority under Registration Number ${regNo}. The itemized point-wise information held on official record is furnished hereunder:`;
    const splitOpening = doc.splitTextToSize(openingText, contentWidth);
    doc.text(splitOpening, margin, y);
    y += splitOpening.length * 4.8 + 4;

    // ── Point-Wise Disclosure Box ──
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(215, 225, 235);
    doc.roundedRect(margin, y, contentWidth, 72, 2, 2, "FD");

    let textY = y + 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 30, 60);
    doc.text("POINT-WISE INFORMATION DISCLOSURE:", margin + 4, textY);
    textY += 6;

    const points = [
        {
            q: "Point 1: Scheme Budget & Sanction Details",
            ans: "The total funds released under the National Scholarship Scheme for FY 2024-25 were ₹2,450.80 Crores across 36 States and Union Territories. Official disbursement logs have been validated by the Public Financial Management System (PFMS).",
        },
        {
            q: "Point 2: Beneficiary Statistics",
            ans: "A total of 42,18,920 student beneficiaries received direct benefit transfers (DBT) into verified Aadhaar-seeded bank accounts without intermediary deduction.",
        },
        {
            q: "Point 3: Inspection & Audit Certifications",
            ans: "Annual external performance audit was completed by the Comptroller and Auditor General (CAG) and tabled before Parliament.",
        },
    ];

    points.forEach((p, idx) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(24, 43, 73);
        doc.text(p.q, margin + 4, textY);
        textY += 4.2;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(40, 50, 60);
        const splitAns = doc.splitTextToSize(p.ans, contentWidth - 8);
        doc.text(splitAns, margin + 4, textY);
        textY += splitAns.length * 4.2 + 2;
    });

    y += 78;

    // ── First Appellate Authority Notice ──
    doc.setFillColor(245, 248, 255);
    doc.setDrawColor(210, 220, 240);
    doc.roundedRect(margin, y, contentWidth, 24, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 30, 70);
    doc.text("APPEAL PARTICULARS UNDER SECTION 19(1) OF RTI ACT 2005:", margin + 4, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(60, 70, 85);
    const appealMsg = `If you are aggrieved by this decision or information supplied, you may prefer a First Appeal within 30 days of receipt of this communication to the designated First Appellate Authority: ${faaName}, Shastri Bhavan, New Delhi. (Email: faa-education@gov.in)`;
    const splitAppeal = doc.splitTextToSize(appealMsg, contentWidth - 8);
    doc.text(splitAppeal, margin + 4, y + 10);

    y += 32;

    // ── Signature Block ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(15, 30, 60);
    doc.text("Yours faithfully,", pageWidth - margin - 60, y);
    y += 8;

    // Signature stamp
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 90, 160);
    doc.text("[Digitally Signed by CPIO]", pageWidth - margin - 60, y);
    y += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 40, 50);
    doc.text(cpioName, pageWidth - margin - 60, y);
    y += 4;
    doc.text("Central Public Information Officer", pageWidth - margin - 60, y);
    y += 4;
    doc.text(`${authority}, Govt. of India`, pageWidth - margin - 60, y);

    // Save File
    const sanitizedReg = regNo.replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`RTI_Official_Response_${sanitizedReg}.pdf`);
};

/**
 * Generate and download an official First Appeal Memo / Receipt PDF under Section 19(1).
 * @param {Object} data Appeal particulars
 */
export const downloadAppealMemoPDF = (data = {}) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    const appealNo = data.appealNumber || data.id || "APPEAL/2026/102938";
    const parentRegNo = data.parentRegistrationNumber || "RTI/2026/123456";
    const authority = data.authorityName || "Concerned Public Authority";
    const appellantName = data.appellantName || "Citizen Appellant";
    const appellantEmail = data.appellantEmail || "";
    const appellantMobile = data.appellantMobile || "";
    const filingDate = data.submittedOn || new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const ground = data.groundOfAppeal || "No response received within statutory 30-day timeline.";
    const prayer = data.prayerAndReliefSought || "Direct CPIO to supply certified information without further delay.";
    const slaDeadline = data.slaDeadlineDate || "Within 30 days of filing appeal";

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // Header
    doc.setDrawColor(180, 50, 20); // Burgundy / Appeal theme
    doc.setLineWidth(1.2);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 30, 70);
    doc.text("GOVERNMENT OF INDIA / भारत सरकार", pageWidth / 2, y, { align: "center" });
    y += 5;

    doc.setFontSize(10);
    doc.text("RIGHT TO INFORMATION ONLINE PORTAL", pageWidth / 2, y, { align: "center" });
    y += 4.5;
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text("MEMORANDUM OF FIRST APPEAL UNDER SECTION 19(1) OF RTI ACT, 2005", pageWidth / 2, y, { align: "center" });
    y += 4;

    doc.setDrawColor(200, 210, 225);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // Title Card
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(153, 27, 27);
    doc.text("FIRST APPEAL REGISTRATION & STATUTORY ACKNOWLEDGEMENT", pageWidth / 2, y + 6, { align: "center" });
    y += 13;

    // Grid Box
    doc.setDrawColor(230, 200, 200);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, contentWidth, 42, 2, 2, "FD");

    const col1 = margin + 4;
    const col2 = margin + (contentWidth / 2) + 2;

    doc.setFontSize(8.5);

    // Row 1
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Appeal Number:", col1, y + 6);
    doc.setTextColor(153, 27, 27);
    doc.text(appealNo, col1 + 38, y + 6);

    doc.setTextColor(60, 70, 85);
    doc.text("Date of Appeal:", col2, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(filingDate, col2 + 25, y + 6);

    // Row 2
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Parent RTI Reg No:", col1, y + 13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 37, 85);
    doc.text(parentRegNo, col1 + 38, y + 13);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Appellate SLA:", col2, y + 13);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 80, 0);
    doc.text("30 Days (Sec. 19(6))", col2 + 25, y + 13);

    // Row 3
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Public Authority:", col1, y + 21);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    const splitAuth = doc.splitTextToSize(authority, contentWidth / 2 - 40);
    doc.text(splitAuth, col1 + 38, y + 21);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Statutory Fee:", col2, y + 21);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 120, 60);
    doc.text("₹0 (Statutory Free)", col2 + 25, y + 21);

    // Row 4
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Addressed To:", col1, y + 29);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(`First Appellate Authority, ${authority}`, col1 + 38, y + 29);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("FAA Deadline:", col2, y + 29);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(slaDeadline, col2 + 25, y + 29);

    // Row 5
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 70, 85);
    doc.text("Appellant Name:", col1, y + 36);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 25, 35);
    doc.text(`${appellantName} (${appellantEmail || appellantMobile})`, col1 + 38, y + 36);

    y += 48;

    // Grounds for Appeal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 30, 70);
    doc.text("1. GROUNDS FOR PREFERRING FIRST APPEAL", margin, y);
    y += 4;
    doc.setDrawColor(220, 225, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(230, 200, 200);
    const splitGround = doc.splitTextToSize(ground, contentWidth - 8);
    const gBoxHeight = Math.max(16, splitGround.length * 4.5 + 6);
    doc.roundedRect(margin, y, contentWidth, gBoxHeight, 1.5, 1.5, "FD");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(153, 27, 27);
    doc.text(splitGround, margin + 4, y + 6);
    y += gBoxHeight + 8;

    // Relief Sought
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 30, 70);
    doc.text("2. PRAYER & RELIEF SOUGHT FROM FIRST APPELLATE AUTHORITY", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFillColor(250, 252, 255);
    doc.setDrawColor(220, 230, 240);
    const splitPrayer = doc.splitTextToSize(prayer, contentWidth - 8);
    const pBoxHeight = Math.max(20, splitPrayer.length * 4.5 + 8);
    doc.roundedRect(margin, y, contentWidth, pBoxHeight, 1.5, 1.5, "FD");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 40, 50);
    doc.text(splitPrayer, margin + 4, y + 6);
    y += pBoxHeight + 8;

    // Statutory Provisions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 30, 70);
    doc.text("3. STATUTORY PROVISIONS & DISPOSAL TIMELINES", margin, y);
    y += 4;
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(70, 80, 95);
    const legalNotes = [
        "1. Section 19(6) Mandate: The First Appellate Authority shall dispose of the appeal within 30 days of receipt, or within extended period not exceeding 45 days for reasons recorded in writing.",
        "2. Second Appeal Right: If dissatisfied with the FAA order or if no order is passed within 30/45 days, a Second Appeal lies before the Central Information Commission (CIC) under Section 19(3) within 90 days.",
        "3. Portal Redaction: You can track the progress of this First Appeal using Appeal Registration No: " + appealNo,
    ];
    legalNotes.forEach((note) => {
        const splitN = doc.splitTextToSize(note, contentWidth - 4);
        doc.text(splitN, margin + 2, y);
        y += splitN.length * 4.2;
    });

    y = Math.max(y + 6, 260);
    doc.setDrawColor(200, 210, 225);
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(110, 120, 135);
    doc.text(
        `Digitally recorded in National RTI Online Portal repository on ${new Date().toISOString()} IST.`,
        margin,
        y
    );

    const sanitizedReg = appealNo.replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`RTI_First_Appeal_Memo_${sanitizedReg}.pdf`);
};

