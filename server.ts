/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import PDFDocument from "pdfkit";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI SDK
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Designer and Project Context to inform the AI Assistant
const DESIGNER_CONTEXT = `
You are the AI UX Portfolio Assistant for Despina Zel (despinazel96@gmail.com), a brilliant Junior UX/UI Designer based in Greece.
You are embedded in her portfolio website "Junior Portfolio Pro" to answer queries from design recruiters, hiring managers, and clients in both Greek and English.

About Despina Zel:
- Role: Junior UX/UI Designer
- Specialty: Evidence-based UX research, modern layout typography (Inter, Space Grotesk), clean spacing, user-centered prototyping.
- Contact: despinazel96@gmail.com
- Main Project Showcased: "Fluffy Care" - An interactive, intuitive onboarding flow for a premium pet mobile app.

About the Fluffy Care Case Study:
- Goal: Redesign the complex onboarding flow of a pet-care app to make it friendly, accessible, and fast, increasing completion rates.
- Method: Double Diamond (Discover, Define, Develop, Deliver)
  1. Discover (Ανακάλυψη):
     - Executed market research on 3 competitor apps. Identified huge friction points on lengthy text inputs.
     - Conducted interviews with 12 pet owners. Key quote from user Christina: "Πάντα αγχώνομαι αν δίνω στη γάτα μου τη σωστή ποσότητα φαγητού. Οι περισσότερες εφαρμογές είναι πολύ περίπλοκες." ("I'm always worried I'm feeding my cat the wrong portion size. Most apps are too complicated.")
  2. Define (Ορισμός):
     - Created 3 detailed personas (including Christina, a busy professional).
     - Defined the Core Problem: Onboarding dropdowns and text inputs created decision fatigue, leading to a 55% dropout rate.
     - Metric / "Aha!" Moment: Visualizing onboarding as a pet profile questionnaire with progressive disclosure, friendly slider controls, and visual selection cards.
  3. Develop (Σχέδιο & Ανάπτυξη):
     - Developed modular cards, simple input fields with 1px neutral outlines, and a distinct Bottom Navigation Bar (Home, Pets, Calendar, Health, Profile).
     - Colors: Pet Teal (#2A7B88 / #00626e) as primary representing friendly corporate trust, and Soft Indigo (#7986CB / #4858ab) as secondary.
     - Shapes: Softer 16px (1rem) rounded corners for cards, 8px (0.5rem) corners for buttons/fields.
  4. Deliver (Παράδοση & Δοκιμές):
     - High-fidelity interactive prototype tested with 8 pet owners.
     - Key Metrics success: Completed flow rate increased from 45% to 92%. Average flow completion time dramatically reduced by 54 seconds. User satisfaction score jumped to 4.8/5.

Your guidelines:
1. Be polite, professional, approachable, and highly structured (use lists, bold texts when helpful).
2. Answer based on the language of the query. If the user asks in Greek, reply in Greek. If in English, reply in English.
3. Be enthusiastic about Despina's talents, her design system, and Fluffy Care's metrics.
4. Keep answers concise but thoroughly informative, demonstrating UX intelligence.
5. If someone asks about how to hire or email Despina, provide despinazel96@gmail.com with a friendly CTA!
`;

// API endpoint for Portfolio Chatbot
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format." });
  }

  // Format history for chat
  const model = "gemini-3.5-flash";
  const lastMessage = messages[messages.length - 1]?.text || "";

  try {
    // Check if API key is present
    if (!process.env.GEMINI_API_KEY) {
      // Fallback response for playground if no API key is specified
      const fallbackResponse = `Γεια σας! (Fallback Mode) Είμαι ο AI Assistant της Δέσποινας. Αυτή τη στιγμή η εφαρμογή τρέχει χωρίς GEMINI_API_KEY, αλλά μπορώ να σας πω ότι η Δέσποινα Ζελ είναι εξαιρετική Junior UX/UI Designer και το Fluffy Care onboarding flow πέτυχε 92% completion rate χρησιμοποιώντας τη μέθοδο Double Diamond! Επικοινωνήστε μαζί της στο despinazel96@gmail.com!`;
      return res.json({ text: fallbackResponse });
    }

    const ai = getAiClient();

    // Map conversation with context
    // We pass history as a unified prompt to optimize context delivery for basic text Q&A
    const formattedHistory = messages.map(m => `${m.sender === 'user' ? 'Interviewer' : 'Assistant'}: ${m.text}`).join("\n");
    const fullPrompt = `${formattedHistory}\n\nInterviewer: ${lastMessage}\nAssistant:`;

    const chatCompletion = await ai.models.generateContent({
      model: model,
      contents: fullPrompt,
      config: {
        systemInstruction: DESIGNER_CONTEXT,
        temperature: 0.7,
      }
    });

    res.json({ text: chatCompletion.text || "Συγγνώμη, δεν μπόρεσα να επεξεργαστώ την απάντηση." });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
  }
});

// Real-world, dynamic resume PDF generation route returning the uploaded CV
app.get("/api/download-resume", (req, res) => {
  try {
    const filename = "Zelelidou_Despoina_CV.pdf";
    const filePath = path.join(process.cwd(), "Zelelidou Despoina CV.pdf");

    if (fs.existsSync(filePath)) {
      res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-type", "application/pdf");
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      const doc = new PDFDocument({ size: "A4", margin: 40 });
      
      res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
      res.setHeader("Content-type", "application/pdf");
      
      doc.pipe(res);
      
      doc.save();
      
      // Primary brand color: Pet Teal #2A7B88
      // Dark color: #1D232A
      // Muted grey text: #5A5F66
      // Divider line color: #E2E8F0
      // Soft Indigo highlight: #7986CB
      const primaryColor = "#2A7B88";
      const darkColor = "#1D232A";
      const mutedColor = "#5A5F66";
      const highlightColor = "#7986CB";
      
      // ------------------ HEADER SECTION ------------------
      doc.fillColor(primaryColor);
      doc.font("Helvetica-Bold").fontSize(28);
      doc.text("Zelelidou Despoina", 40, 45);
      
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(13);
      doc.text("UX / UI Designer", 42, 78);
      
      // Decorative line across the header
      doc.strokeColor("#E2E8F0").lineWidth(1);
      doc.moveTo(40, 96).lineTo(555, 96).stroke();
      
      // Personal Intro Paragraph
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9.5).lineGap(4);
      const summaryText = "Detail-oriented and analytical UX/UI Designer with a strong background as a Quality Systems Consultant and Food Auditor. Having mastered the art of analyzing complex structures, managing strict standards (ISO, IFS), and optimizing operational processes, I am now applying this structured mindset to digital experiences. Recently certified via the Google UX Design Professional Certificate, I combine user-centered research with meticulous design execution.";
      doc.text(summaryText, 40, 110, { width: 515, align: "justify" });
      
      // Horizontal divider below intro
      doc.strokeColor("#E2E8F0").lineWidth(1);
      doc.moveTo(40, 168).lineTo(555, 168).stroke();
      
      // ------------------ TWO COLUMN LAYOUT ------------------
      const leftColX = 40;
      const leftColWidth = 310;
      const rightColX = 385;
      const rightColWidth = 170;
      
      // 1. LEFT COLUMN: EXPERIENCE
      // Capsule for EXPERIENCE
      doc.fillColor(primaryColor);
      doc.roundedRect(leftColX, 185, 110, 20, 10).fill();
      
      // Capsule text
      doc.fillColor("#FFFFFF");
      doc.font("Helvetica-Bold").fontSize(9);
      doc.text("EXPERIENCE", leftColX, 191, { width: 110, align: "center" });
      
      // Experience items starting Y = 220
      let expY = 220;
      
      // Item 1: Quality Systems Consultant
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(11.5);
      doc.text("Quality Systems Consultant", leftColX, expY);
      expY += 16;
      
      doc.fillColor(primaryColor);
      doc.font("Helvetica-Bold").fontSize(9.5);
      doc.text("Progress Stirixis consulting group", leftColX, expY);
      expY += 13;
      
      doc.fillColor("#8F949B");
      doc.font("Helvetica-Oblique").fontSize(8.5);
      doc.text("Feb 2024 - Dec 2025", leftColX, expY);
      expY += 14;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9).lineGap(3);
      const desc1 = "My main goal was to conduct client assessments in order to design and implement quality systems, ensuring intuitive workflows and cross-functional alignment. Also, I participated in compliance inspections to identify and iterate on system gaps.";
      doc.text(desc1, leftColX, expY, { width: leftColWidth, align: "justify" });
      expY += 66; // advance Y
      
      // Item 2: Shift Manager
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(11.5).lineGap(0);
      doc.text("Shift Manager", leftColX, expY);
      expY += 16;
      
      doc.fillColor(primaryColor);
      doc.font("Helvetica-Bold").fontSize(9.5);
      doc.text("AFOI Kompatsiari A.E. Amalthea", leftColX, expY);
      expY += 13;
      
      doc.fillColor("#8F949B");
      doc.font("Helvetica-Oblique").fontSize(8.5);
      doc.text("Sep 2023 - Feb 2024", leftColX, expY);
      expY += 14;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9).lineGap(3);
      const desc2 = "I organized daily my team and workflow to make sure shift ran smoothly and efficiently. Made fast, critical decisions under pressure to solve sudden problems and keep the production on time.";
      doc.text(desc2, leftColX, expY, { width: leftColWidth, align: "justify" });
      expY += 56; // advance Y
      
      // Item 3: Shift Quality Manager
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(11.5).lineGap(0);
      doc.text("Shift Quality Manager", leftColX, expY);
      expY += 16;
      
      doc.fillColor(primaryColor);
      doc.font("Helvetica-Bold").fontSize(9.5);
      doc.text("AFOI Kompatsiari A.E. Amalthea", leftColX, expY);
      expY += 13;
      
      doc.fillColor("#8F949B");
      doc.font("Helvetica-Oblique").fontSize(8.5);
      doc.text("Sep 2023 - Feb 2024", leftColX, expY);
      expY += 14;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9).lineGap(3);
      const desc3 = "My main goal was to inspect products and processes during the shift to catch mistakes before they reached the customer.";
      doc.text(desc3, leftColX, expY, { width: leftColWidth, align: "justify" });
      
      // 2. RIGHT COLUMN: PERSONAL INFO & EDUCATION & TOOLS
      // Capsule for PERSONAL INFO
      let rightY = 185;
      doc.fillColor(primaryColor);
      doc.roundedRect(rightColX, rightY, 115, 20, 10).fill();
      
      // Capsule text
      doc.fillColor("#FFFFFF");
      doc.font("Helvetica-Bold").fontSize(9);
      doc.text("PERSONAL INFO", rightColX, rightY + 6, { width: 115, align: "center" });
      
      rightY += 32;
      
      // Info details
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(8.5);
      
      // Email icon/text style
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9);
      doc.text("Email: ", rightColX, rightY, { continued: true });
      doc.fillColor(primaryColor).font("Helvetica-Bold");
      doc.text("ux.zelelidoud@gmail.com", { link: "mailto:ux.zelelidoud@gmail.com" });
      rightY += 16;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9);
      doc.text("Phone: ", rightColX, rightY, { continued: true });
      doc.fillColor(darkColor).font("Helvetica-Bold");
      doc.text("+30 6949454258");
      rightY += 16;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9);
      doc.text("LinkedIn: ", rightColX, rightY, { continued: true });
      doc.fillColor(primaryColor).font("Helvetica-Bold");
      doc.text("Profile Link", { link: "https://www.linkedin.com/in/despoina-zelelidou" });
      rightY += 16;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(9);
      doc.text("Figma: ", rightColX, rightY, { continued: true });
      doc.fillColor(primaryColor).font("Helvetica-Bold");
      doc.text("Case Study Link", { link: "https://www.figma.com/file/xyz" });
      
      rightY += 38;
      
      // Capsule for EDUCATION
      doc.fillColor(primaryColor);
      doc.roundedRect(rightColX, rightY, 115, 20, 10).fill();
      
      doc.fillColor("#FFFFFF");
      doc.font("Helvetica-Bold").fontSize(9);
      doc.text("EDUCATION", rightColX, rightY + 6, { width: 115, align: "center" });
      
      rightY += 32;
      
      // Edu 1: Google UX Design
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(10);
      doc.text("Google UX Design", rightColX, rightY);
      rightY += 13;
      
      doc.fillColor("#8F949B");
      doc.font("Helvetica-Oblique").fontSize(8.5);
      doc.text("March - May 2026", rightColX, rightY);
      rightY += 12;
      
      doc.fillColor(mutedColor);
      doc.font("Helvetica").fontSize(8.5);
      doc.text("Professional Certificate", rightColX, rightY);
      
      rightY += 24;
      
      // Edu 2: Bachelor
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(10).lineGap(1);
      doc.text("Quality Management Systems", rightColX, rightY, { width: rightColWidth });
      doc.text("& production organization", { width: rightColWidth });
      doc.font("Helvetica").fontSize(8.5).text("in the food industry (Bachelor)", { width: rightColWidth });
      
      doc.fillColor("#8F949B");
      doc.font("Helvetica-Oblique").fontSize(8.5);
      doc.text("2021 - 2024", rightColX, doc.y + 1);
      
      rightY = doc.y + doc.currentLineHeight() + 14;
      
      // Edu 3: Agricultural
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(10).lineGap(1);
      doc.text("Quality Control of", rightColX, rightY, { width: rightColWidth });
      doc.text("agricultural products & food", { width: rightColWidth });
      
      doc.fillColor("#8F949B");
      doc.font("Helvetica-Oblique").fontSize(8.5);
      doc.text("2014 - 2019", rightColX, doc.y + 1);
      
      rightY = doc.y + doc.currentLineHeight() + 24;
      
      // Capsule for TOOLS
      doc.fillColor(primaryColor);
      doc.roundedRect(rightColX, rightY, 115, 20, 10).fill();
      
      doc.fillColor("#FFFFFF");
      doc.font("Helvetica-Bold").fontSize(9);
      doc.text("TOOLS", rightColX, rightY + 6, { width: 115, align: "center" });
      
      rightY += 32;
      
      // Tools items Figma & Gemini AI with style
      doc.fillColor(darkColor);
      doc.font("Helvetica-Bold").fontSize(10);
      
      // Draw dot for Figma
      doc.circle(rightColX + 5, rightY + 5, 3).fill(highlightColor);
      doc.fillColor(darkColor).text("Figma", rightColX + 15, rightY);
      rightY += 18;
      
      // Draw dot for Gemini AI
      doc.circle(rightColX + 5, rightY + 5, 3).fill(highlightColor);
      doc.fillColor(darkColor).text("Gemini AI", rightColX + 15, rightY);
      
      doc.restore();
      doc.end();
    }
  } catch (err: any) {
    console.error("PDF download or generation failed:", err);
    res.status(500).send("Could not retrieve resume PDF.");
  }
});

// Configure Vite or Static File Delivery
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
