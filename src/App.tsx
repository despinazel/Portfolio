/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  X, 
  Menu, 
  Globe, 
  ArrowRight, 
  FileText, 
  Download, 
  Send, 
  Sparkles, 
  CheckCircle, 
  ChevronRight, 
  Briefcase, 
  HelpCircle,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Sun,
  Moon
} from "lucide-react";
import { MobileSimulator } from "./components/MobileSimulator";
import { AiAssistant } from "./components/AiAssistant";
import { FluffyCareCaseStudy } from "./components/FluffyCareCaseStudy";
import { motion } from "motion/react";
import { Analytics } from "@vercel/analytics/react";

interface TranslationTexts {
  navLogo: string;
  navHome: string;
  navWork: string;
  navResume: string;
  navContact: string;
  
  heroGreeting: string;
  heroHighlight: string;
  heroQualityText: string;
  heroSubtitle: string;
  heroDesc: string;
  heroCtaWork: string;
  heroCtaResume: string;
  
  fmTitle: string;
  fmSubtitle: string;
  
  cardGoogleTitle: string;
  cardGoogleDesc: string;
  
  cardQualityTitle: string;
  cardQualityDesc: string;
  cardQualityFooter: string;
  
  cardToolkitTitle: string;
  cardToolkitDesc: string;
  
  cardAiTitle: string;
  cardAiDesc: string;
  cardAiFooter: string;
  
  projectsSectionTag: string;
  projectsSectionTitle: string;
  projectsExploreAll: string;
  
  project1Badge: string;
  project1Title: string;
  project1Type: string;
  project1Desc: string;
  project1Cta: string;
  
  project2Badge: string;
  project2Title: string;
  project2Type: string;
  project2Desc: string;
  
  project3Badge: string;
  project3Title: string;
  project3Type: string;
  project3Desc: string;
  
  designProcessTitle: string;
  designProcessSub: string;
  
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  step5Title: string;
  step5Desc: string;
  
  footerCredit: string;

  workViewTitle: string;
  workViewSubtitle: string;
  filterAll: string;
  filterCompleted: string;
  filterInProgress: string;
  project1TypeWork: string;
  project2TitleWork: string;
  project2TypeWork: string;
  project2DescWork: string;
  project2ActionWork: string;
  project3TitleWork: string;
  project3TypeWork: string;
  project3DescWork: string;
  project3ActionWork: string;
  workDate1: string;
  ctaTitleWork: string;
  ctaDescWork: string;
  ctaSendEmailWork: string;
  ctaViewResumeWork: string;
  
  resumeHeroTitle: string;
  resumeHeroSubtitle: string;
  resumeLocation: string;
  resumeEmail: string;
  resumePhone: string;
  resumeLinkedin: string;
  resumeDownloadPdf: string;
  resumeSummaryTitle: string;
  resumeSummaryDesc: string;
  resumeExperienceTitle: string;
  role1Title: string;
  role1Company: string;
  role1Date: string;
  role1Bullet1: string;
  role1Bullet2: string;
  role1Bullet3: string;
  role2Title: string;
  role2Company: string;
  role2Date: string;
  role2Bullet1: string;
  role2Bullet2: string;
  role3Title: string;
  role3Company: string;
  role3Date: string;
  role3Bullet1: string;
  role3Bullet2: string;
  resumeSkillsTitle: string;
  skillsDesignTitle: string;
  skillsSystemsTitle: string;
  skillsDesignList: string[];
  skillsSystemsList: string[];
  resumeEducationTitle: string;
  edu1Title: string;
  edu1Sub: string;
  edu1Date: string;
  edu2Title: string;
  edu2Sub: string;
  edu2Date: string;
  edu3Title: string;
  edu3Sub: string;
  edu3Date: string;
  resumeCtaTitle: string;
  resumeCtaPortfolio: string;
}

const translations: Record<"EN" | "GR", TranslationTexts> = {
  EN: {
    navLogo: "Despoina Zelelidou",
    navHome: "Home",
    navWork: "Projects",
    navResume: "Resume",
    navContact: "Contact",
    
    heroGreeting: "Hi, I'm ",
    heroHighlight: "Despoina",
    heroQualityText: ".",
    heroSubtitle: "UX designer and AI enthusiast",
    heroDesc: "I’m a former Quality Systems Consultant & Food Auditor making my dynamic entry into the UX Design world. Armed with a Google certification, I blend analytical thinking with user-centric creativity. Right now, I'm diving deep into Figma, mastering design systems, and incorporating the latest AI tools into my process to design smart, structured, and beautiful experiences. I might be at the start of my design journey, but I'm fully equipped to tackle complex problems!",
    heroCtaWork: "View My Work",
    heroCtaResume: "VIEW RESUME",
    
    fmTitle: "Foundation & Mastery",
    fmSubtitle: "Analytical precision meets creative execution.",
    
    cardGoogleTitle: "Google UX Design",
    cardGoogleDesc: "Professional Certificate covering the end-to-end UX process from empathy to high-fidelity prototyping.",
    
    cardQualityTitle: "UI/UX Bootcamp",
    cardQualityDesc: "Completed Gary Simon’s intensive Bootcamp, mastering core UI fundamentals, including visual hierarchy, spacing, typography, and responsive layouts within Figma.",
    cardQualityFooter: "GARY SIMON BOOTCAMP",
    
    cardToolkitTitle: "Digital Toolkit",
    cardToolkitDesc: "Modern toolset for collaborative design and system layout orchestration.",
    
    cardAiTitle: "AI SaaS Development",
    cardAiDesc: "Currently pursuing Gary Simon's advanced seminar on Claude Code. Focusing on leveraging terminal-based AI tools to rapidly prototype, build backend infrastructures, and ship production-ready SaaS applications.",
    cardAiFooter: "CLAUDE CODE AI SAAS",
    
    projectsSectionTag: "Case Studies",
    projectsSectionTitle: "Projects",
    projectsExploreAll: "Explore All Projects",
    
    project1Badge: "Completed",
    project1Title: "Fluffy Care",
    project1Type: "Mobile App",
    project1Desc: "An end-to-end case study on designing an all-in-one mobile solution that helps pet owners track medical history, manage symptoms, conect with other pet owners and access local resources effortlessly.",
    project1Cta: "View Case Study",
    
    project2Badge: "In Progress",
    project2Title: "The Cheat Day",
    project2Type: "WEB - Responsive APP",
    project2Desc: "A high-fidelity e-commerce web platform for food delivery. Showcasing advanced dynamic variants, real-time cart state management, and continuous layout implementation driven by AI.",
    
    project3Badge: "Coming Soon",
    project3Title: "Next Project",
    project3Type: "UX/UI Design",
    project3Desc: "Upcoming UI/UX dashboard project focusing on data visualization and complex system management.",
    
    designProcessTitle: "Design Thinking Process",
    designProcessSub: "Five core operational phases applied systematically to deliver intuitive, user-centered experiences.",
    
    step1Title: "Empathize",
    step1Desc: "Understanding user needs through research and observation.",
    step2Title: "Define",
    step2Desc: "Synthesizing insights to create a clear problem statement.",
    step3Title: "Ideate",
    step3Desc: "Generating a wide range of creative solutions and concepts.",
    step4Title: "Prototype",
    step4Desc: "Building low-to-high fidelity models to bring ideas to life.",
    step5Title: "Test",
    step5Desc: "Validating solutions with real users to refine and improve.",
    
    footerCredit: "© 2026 Despoina Zelelidou. Build with Google AI Studio",

    workViewTitle: "My Work",
    workViewSubtitle: "Exploring the intersection of Quality Systems and User-Centered Design through end-to-end projects.",
    filterAll: "All Projects",
    filterCompleted: "Completed",
    filterInProgress: "In Progress",
    project1TypeWork: "Mobile App",
    project2TitleWork: "The Cheat Day",
    project2TypeWork: "WEB - Responsive APP",
    project2DescWork: "A high-fidelity e-commerce web platform for food delivery. Showcasing advanced dynamic variants, real-time cart state management, and continuous layout implementation driven by AI.",
    project2ActionWork: "Work in discovery phase",
    project3TitleWork: "Quality Systems Dashboard",
    project3TypeWork: "B2B SaaS Interface",
    project3DescWork: "Visualizing complex audit data and compliance metrics into an intuitive, actionable dashboard for quality managers.",
    project3ActionWork: "Scheduled for late 2026",
    workDate1: "March - May 2026",
    ctaTitleWork: "Interested in working together?",
    ctaDescWork: "I'm always looking for opportunities to apply evidence-based design to complex systems.",
    ctaSendEmailWork: "Send an Email",
    ctaViewResumeWork: "View My Resume",
    
    resumeHeroTitle: "Despoina Zelelidou",
    resumeHeroSubtitle: "UX/UI designer & AI enthusiast",
    resumeLocation: "Greece",
    resumeEmail: "ux.zelelidoud@gmail.com",
    resumePhone: "+30 6949454258",
    resumeLinkedin: "https://www.linkedin.com/in/despoina-zelelidou",
    resumeDownloadPdf: "Download PDF Resume",
    resumeSummaryTitle: "Professional Summary",
    resumeSummaryDesc: "Detail-oriented and analytical UX/UI Designer with a strong background as a Quality Systems Consultant and Food Auditor. Having mastered the art of analyzing complex structures, managing strict standards (ISO, IFs), and optimizing operational processes, I am now applying this structured mindset to digital experiences. Recently certified via the Google UX Design Professional Certificate, I combine user-centered research with meticulous design execution.",
    resumeExperienceTitle: "Work Experience",
    role1Title: "Quality Systems Consultant",
    role1Company: "Progress Stirixis Consulting Group",
    role1Date: "Feb 2024 — Dec 2025",
    role1Bullet1: "Conducted comprehensive client assessments to design and deploy structured operational systems, streamlining complex workflows and ensuring cross-functional alignment across teams.",
    role1Bullet2: "Participated in rigorous compliance inspections, systematically identifying system gaps and iterating on procedural improvements to enhance operational efficiency.",
    role1Bullet3: "Translated organizational requirements and standards into intuitive, user-friendly workflows, reducing friction and optimizing end-to-end system usability for internal stakeholders.",
    role2Title: "Shift Manager",
    role2Company: "AFOI Kompatsiari A.E. Amalthea",
    role2Date: "Sep 2023 — Feb 2024",
    role2Bullet1: "Managed daily operations and team coordination, ensuring strict adherence to safety and quality protocols.",
    role2Bullet2: "Optimized resource allocation and task scheduling to maintain high-performance standards during peak demand.",
    role3Title: "Shift Quality Manager",
    role3Company: "REGINA Foods - Kourantidis Nikolaos",
    role3Date: "Feb 2021 — Oct 2021",
    role3Bullet1: "Monitored and inspected real-time production processes and products during shifts to ensure strict compliance with quality standards.",
    role3Bullet2: "Identified and resolved operational defects proactively, mitigating risks before products reached the end customer.",
    resumeSkillsTitle: "Skills & Tools",
    skillsDesignTitle: "Design & Research",
    skillsSystemsTitle: "Systems & Tools",
    skillsDesignList: [
      "User Research",
      "Information Architecture",
      "Wireframing & Prototyping",
      "Usability Testing",
      "Visual Design",
      "Hi-Fi Mockups"
    ],
    skillsSystemsList: [
      "Figma",
      "Gemini AI",
      "Google Stitch",
      "Google AI Studio",
      "Antigravity",
      "GitHub"
    ],
    resumeEducationTitle: "Education & Certificates",
    edu1Title: "Google UX Design Professional Certificate",
    edu1Sub: "Coursera Professional Specialization",
    edu1Date: "2026",
    edu2Title: "Bachelor's Degree in Quality Management Systems",
    edu2Sub: "International Hellenic University",
    edu2Date: "2021 — 2024",
    edu3Title: "Agriculture Technologist",
    edu3Sub: "University of Western Macedonia",
    edu3Date: "2014 — 2019",
    resumeCtaTitle: "Ready to integrate quality into your next design?",
    resumeCtaPortfolio: "View Portfolio"
  },
  GR: {
    navLogo: "Δέσποινα Ζελελίδου",
    navHome: "Αρχική",
    navWork: "Έργα",
    navResume: "Βιογραφικό",
    navContact: "Επικοινωνία",
    
    heroGreeting: "Γεια σας, είμαι η ",
    heroHighlight: "Δέσποινα",
    heroQualityText: ".",
    heroSubtitle: "UX designer και AI enthusiast",
    heroDesc: "Είμαι πρώην Σύμβουλος Συστημάτων Ποιότητας & Επιθεωρήτρια Τροφίμων που κάνει τη δυναμική της είσοδο στον κόσμο του UX Design. Εξοπλισμένη με πιστοποίηση από την Google, συνδυάζω την αναλυτική σκέψη με την ανθρωποκεντρική δημιουργικότητα. Αυτή τη στιγμή εμβαθύνω στο Figma, κατακτώντας τα συστήματα σχεδιασμού (design systems) και ενσωματώνοντας τα πιο πρόσφατα εργαλεία AI στη διαδικασία μου για να σχεδιάζω έξυπνες, δομημένες και όμορφες εμπειρίες. Μπορεί να βρίσκομαι στην αρχή του σχεδιαστικού μου ταξιδιού, αλλά είμαι πλήρως εξοπλισμένη για να αντιμετωπίσω πολύπλοκα προβλήματα!",
    heroCtaWork: "Δείτε τα Έργα μου",
    heroCtaResume: "ΠΡΟΒΟΛΗ ΒΙΟΓΡΑΦΙΚΟΥ",
    
    fmTitle: "Θεμέλια & Εξειδίκευση",
    fmSubtitle: "Η αναλυτική ακρίβεια συναντά τη δημιουργική εκτέλεση.",
    
    cardGoogleTitle: "Google UX Design",
    cardGoogleDesc: "Επαγγελματικό Πιστοποιητικό που καλύπτει ολόκληρη τη μεθοδολογία UX από την ενσυναίσθηση έως τα διαδραστικά πρωτότυπα.",
    
    cardQualityTitle: "UI/UX Bootcamp",
    cardQualityDesc: "Ολοκλήρωσα το εντατικό Bootcamp του Gary Simon, κατακτώντας τις βασικές αρχές UI, συμπεριλαμβανομένης της οπτικής ιεραρχίας, των αποστάσεων (spacing), της τυπογραφίας και των responsive διατάξεων μέσα στο Figma.",
    cardQualityFooter: "GARY SIMON BOOTCAMP",
    
    cardToolkitTitle: "Ψηφιακό Toolkit",
    cardToolkitDesc: "Σύγχρονα εργαλεία για συλλογικό σχεδιασμό και εναρμόνιση συστημάτων διάταξης.",
    
    cardAiTitle: "AI SaaS Development",
    cardAiDesc: "Παρακολουθώ το προχωρημένο σεμινάριο του Gary Simon για το Claude Code. Εστιάζω στην αξιοποίηση εργαλείων AI που βασίζονται σε τερματικό για γρήγορη δημιουργία πρωτοτύπων, κατασκευή υποδομών backend και παράδοση έτοιμων για παραγωγή εφαρμογών SaaS.",
    cardAiFooter: "CLAUDE CODE AI SAAS",
    
    projectsSectionTag: "Μελέτες Περίπτωσης",
    projectsSectionTitle: "Έργα",
    projectsExploreAll: "Εξερευνήστε Όλα τα Έργα",
    
    project1Badge: "Ολοκληρωμένο",
    project1Title: "Fluffy Care",
    project1Type: "Mobile App",
    project1Desc: "Μια ολοκληρωμένη μελέτη περίπτωσης σχετικά με το σχεδιασμό μιας all-in-one λύσης για κινητά που βοηθά τους ιδιοκτήτες κατοικιδίων να παρακολουθούν το ιατρικό ιστορικό, να διαχειρίζονται τα συμπτώματα, να συνδέονται με άλλους ιδιοκτήτες και να έχουν εύκολη πρόσβαση σε τοπικούς πόρους.",
    project1Cta: "Δείτε το Case Study",
    
    project2Badge: "Σε Εξέλιξη",
    project2Title: "The Cheat Day",
    project2Type: "WEB - Responsive APP",
    project2Desc: "Μια υψηλής πιστότητας web πλατφόρμα ηλεκτρονικού εμπορίου για διανομή φαγητού (food delivery). Παρουσιάζει προηγμένες δυναμικές παραλλαγές (variants), διαχείριση κατάστασης καλαθιού σε πραγματικό χρόνο και συνεχή υλοποίηση διάταξης καθοδηγούμενη από AI.",
    
    project3Badge: "Έρχεται Σύντομα",
    project3Title: "Επόμενο Έργο",
    project3Type: "UX/UI Σχεδιασμός",
    project3Desc: "Προσεχές έργο UI/UX dashboard με εστίαση στην οπτικοποίηση σύνθετων δεδομένων και τη διαχείριση συστημάτων.",
    
    designProcessTitle: "Διαδικασία Σχεδιαστικής Σκέψης",
    designProcessSub: "Πέντε βασικά στάδια που εφαρμόζονται συστηματικά για την παροχή εύχρηστων εμπειριών με επίκεντρο τον χρήστη.",
    
    step1Title: "Ενσυναίσθηση",
    step1Desc: "Κατανόηση των αναγκών των χρηστών μέσω έρευνας και παρατήρησης.",
    step2Title: "Ορισμός",
    step2Desc: "Σύνθεση των ευρημάτων για τη δημιουργία μιας σαφούς δήλωσης προβλήματος.",
    step3Title: "Ιδεασμός",
    step3Desc: "Παραγωγή ενός ευρέος φάσματος δημιουργικών λύσεων και πρωτότυπων ιδεών.",
    step4Title: "Πρωτότυπο",
    step4Desc: "Κατασκευή μοντέλων χαμηλής και υψηλής πιστότητας για να ζωντανέψουν οι ιδέες.",
    step5Title: "Δοκιμή",
    step5Desc: "Έλεγχος και επικύρωση των λύσεων με πραγματικούς χρήστες για περαιτέρω βελτίωση.",
    
    footerCredit: "© 2026 Despoina Zelelidou. Build with Google AI Studio",

    workViewTitle: "Τα Έργα μου",
    workViewSubtitle: "Εξερευνώντας την τομή μεταξύ Συστημάτων Ποιότητας και Ανθρωποκεντρικού Σχεδιασμού (UX) μέσα από ολοκληρωμένα έργα.",
    filterAll: "Όλα τα Έργα",
    filterCompleted: "Ολοκληρωμένα",
    filterInProgress: "Σε Εξέλιξη",
    project1TypeWork: "Mobile App",
    project2TitleWork: "The Cheat Day",
    project2TypeWork: "WEB - Responsive APP",
    project2DescWork: "Μια υψηλής πιστότητας web πλατφόρμα ηλεκτρονικού εμπορίου για διανομή φαγητού (food delivery). Παρουσιάζει προηγμένες δυναμικές παραλλαγές (variants), διαχείριση κατάστασης καλαθιού σε πραγματικό χρόνο και συνεχή υλοποίηση διάταξης καθοδηγούμενη από AI.",
    project2ActionWork: "Έργο σε φάση ανακάλυψης",
    project3TitleWork: "Quality Systems Dashboard",
    project3TypeWork: "B2B SaaS Interface",
    project3DescWork: "Οπτικοποίηση σύνθετων δεδομένων ελέγχου και μετρικών συμμόρφωσης σε ένα εύχρηστο dashboard για διαχειριστές ποιότητας.",
    project3ActionWork: "Προγραμματισμένο για τα τέλη του 2026",
    workDate1: "Μάρτιος - Μάιος 2026",
    ctaTitleWork: "Ενδιαφέρεστε για συνεργασία;",
    ctaDescWork: "Αναζητώ πάντα ευκαιρίες να εφαρμόσω σχεδιασμό βασισμένο σε στοιχεία (evidence-based) σε σύνθετα συστήματα.",
    ctaSendEmailWork: "Αποστολή Email",
    ctaViewResumeWork: "Δείτε το Βιογραφικό",
    
    resumeHeroTitle: "Δέσποινα Ζελελίδου",
    resumeHeroSubtitle: "UX/UI designer & AI enthusiast",
    resumeLocation: "Ελλάδα",
    resumeEmail: "ux.zelelidoud@gmail.com",
    resumePhone: "+30 6949454258",
    resumeLinkedin: "https://www.linkedin.com/in/despoina-zelelidou",
    resumeDownloadPdf: "Λήψη PDF Βιογραφικού",
    resumeSummaryTitle: "Επαγγελματική Σύνοψη",
    resumeSummaryDesc: "Λεπτομερής και αναλυτική UX/UI Designer με ισχυρό υπόβαθρο ως Σύμβουλος Συστημάτων Ποιότητας και Επιθεωρήτρια Τροφίμων. Έχοντας κατακτήσει την τέχνη της ανάλυσης σύνθετων δομών, της διαχείρισης αυστηρών προτύπων (ISO, IFs) και της βελτιστοποίησης λειτουργικών διαδικασιών, εφαρμόζω τώρα αυτή τη δομημένη νοοτροπία στις ψηφιακές εμπειρίες. Πρόσφατα πιστοποιημένη μέσω του Google UX Design Professional Certificate, συνδυάζω την ανθρωποκεντρική έρευνα με τη σχολαστική εκτέλεση σχεδιασμού.",
    resumeExperienceTitle: "Επαγγελματική Εμπειρία",
    role1Title: "Σύμβουλος Συστημάτων Ποιότητας",
    role1Company: "Progress Stirixis Consulting Group",
    role1Date: "Φεβ 2024 — Δεκ 2025",
    role1Bullet1: "Διενήργησα ολοκληρωμένες αξιολογήσεις πελατών για τη σχεδίαση και εφαρμογή δομημένων λειτουργικών συστημάτων, απλοποιώντας σύνθετες ροές εργασίας και διασφαλίζοντας τη διαλειτουργική ευθυγράμμιση μεταξύ των ομάδων.",
    role1Bullet2: "Συμμετείχα σε αυστηρές επιθεωρήσεις συμμόρφωσης, εντοπίζοντας συστηματικά κενά στο σύστημα και επανεξετάζοντας διαδικαστικές βελτιώσεις για την ενίσχυση της επιχειρησιακής αποτελεσματικότητας.",
    role1Bullet3: "Διενήργησα εσωτερικούς ελέγχους και συνεντεύξεις με ενδιαφερόμενα μέρη για την ευθυγράμμιση των επιχειρησιακών διαδικασιών με τους στρατηγικούς στόχους ποιότητας.",
    role2Title: "Διευθυντής Βάρδιας / Shift Manager",
    role2Company: "ΑΦΟΙ Κομπατσιάρη Α.Ε. Αμάλθεια",
    role2Date: "Σεπ 2023 — Φεβ 2024",
    role2Bullet1: "Διαχειρίστηκα τις καθημερινές λειτουργίες και το συντονισμό της ομάδας, διασφαλίζοντας την αυστηρή τήρηση των πρωτοκόλλων ασφάλειας και ποιότητας.",
    role2Bullet2: "Βελτιστοποίησα την κατανομή πόρων και τον προγραμματισμό εργασιών για τη διατήρηση υψηλών προτύπων απόδοσης κατά τις περιόδους αιχμής.",
    role3Title: "Υπεύθυνη Ποιοτικού Ελέγχου Βάρδιας / Shift Quality Manager",
    role3Company: "REGINA Foods - Κουραντίδης Νικόλαος",
    role3Date: "Φεβ 2021 — Οκτ 2021",
    role3Bullet1: "Παρακολουθούσα και επιθεωρούσα τις παραγωγικές διαδικασίες και τα προϊόντα σε πραγματικό χρόνο κατά τη διάρκεια της βάρδιας για τη διασφάλιση της αυστηρής συμμόρφωσης με τα πρότυπα ποιότητας.",
    role3Bullet2: "Εντόπιζα και επίλυα προληπτικά λειτουργικά ελαττώματα/αποκλίσεις, μετριάζοντας τους κινδύνους πριν τα προϊόντα φτάσουν στον τελικό πελάτη.",
    resumeSkillsTitle: "Δεξιότητες & Εργαλεία",
    skillsDesignTitle: "Σχεδιασμός & Έρευνα",
    skillsSystemsTitle: "Συστήματα & Εργαλεία",
    skillsDesignList: [
      "Έρευνα Χρηστών (User Research)",
      "Αρχιτεκτονική Πληροφοριών",
      "Wireframing & Πρωτοτυποποίηση",
      "Δοκιμές Ευχρηστίας (Usability Testing)",
      "Οπτικός Σχεδιασμός (Visual Design)",
      "Hi-Fi Mockups"
    ],
    skillsSystemsList: [
      "Figma",
      "Gemini AI",
      "Google Stitch",
      "Google AI Studio",
      "Antigravity",
      "GitHub"
    ],
    resumeEducationTitle: "Εκπαίδευση & Πιστοποιήσεις",
    edu1Title: "Google UX Design Professional Certificate",
    edu1Sub: "Επαγγελματική Εξειδίκευση Coursera",
    edu1Date: "2026",
    edu2Title: "Πτυχίο στα Συστήματα Διαχείρισης Ποιότητας",
    edu2Sub: "Διεθνές Πανεπιστήμιο της Ελλάδος",
    edu2Date: "2021 — 2024",
    edu3Title: "Τεχνολόγος Γεωπονίας",
    edu3Sub: "Πανεπιστήμιο Δυτικής Μακεδονίας",
    edu3Date: "2014 — 2019",
    resumeCtaTitle: "Είστε έτοιμοι να ενσωματώσετε την ποιότητα στον επόμενο σχεδιασμό σας;",
    resumeCtaPortfolio: "Δείτε τα Έργα μου"
  }
};

const getToolIcon = (tool: string) => {
  switch (tool) {
    case "Figma":
      return (
        <img
          src="/assets/figma.png"
          alt="Figma"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      );
    case "Gemini AI":
      return (
        <img
          src="/assets/gemini ai.png"
          alt="Gemini AI"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      );
    case "Google Stitch":
      return (
        <img
          src="/assets/stitch.png"
          alt="Google Stitch"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      );
    case "Google AI studio":
    case "Google AI Studio":
      return (
        <img
          src="/assets/google studio ai.png"
          alt="Google AI Studio"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      );
    case "Antigravity":
      return (
        <img
          src="/assets/antigravity.png"
          alt="Antigravity"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      );
    case "GitHub":
    case "Github":
      return (
        <img
          src="/assets/github logo.png"
          alt="GitHub"
          className="w-full h-full object-contain rounded-full"
          referrerPolicy="no-referrer"
        />
      );
    default:
      return null;
  }
};

export default function App() {
  const [lang] = useState<"EN" | "GR">("EN");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  });
  const [activeView, setActiveView] = useState<"home" | "work" | "resume" | "fluffy-care">(() => {
    const saved = localStorage.getItem("activeView");
    return (saved as "home" | "work" | "resume" | "fluffy-care") || "home";
  });

  // Keep HTML class matching the active theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [projectFilter, setProjectFilter] = useState<"all" | "completed" | "in-progress">("all");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<boolean>(false);
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "", sent: false });

  // Persist active tab across loads
  useEffect(() => {
    localStorage.setItem("activeView", activeView);
  }, [activeView]);

  // Persist scroll position across live preview reloads
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("appScrollY");
    if (savedScroll) {
      const scrollY = parseInt(savedScroll, 10);
      if (!isNaN(scrollY)) {
        setTimeout(() => {
          window.scrollTo(0, scrollY);
        }, 150);
      }
    }

    const saveScrollY = () => {
      sessionStorage.setItem("appScrollY", window.scrollY.toString());
    };

    window.addEventListener("scroll", saveScrollY);
    return () => window.removeEventListener("scroll", saveScrollY);
  }, []);

  const t = translations[lang];

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subjectLine = contactForm.name || "your name";
      
    const emailBody = lang === "GR"
      ? `Όνομα: ${contactForm.name}\nEmail: ${contactForm.email}\n\nΜήνυμα:\n${contactForm.message}`
      : `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`;
      
    const mailtoUrl = `mailto:ux.zelelidoud@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
    
    // Attempt opening mailto link
    window.location.href = mailtoUrl;

    setContactForm(prev => ({ ...prev, sent: true }));
    setTimeout(() => {
      setContactForm({ name: "", email: "", subject: "", message: "", sent: false });
      setShowContact(false);
      alert(lang === "GR" 
        ? "Το μήνυμά σας προετοιμάστηκε στο email πρόγραμμά σας! Παρακαλούμε πατήστε αποστολή." 
        : "Your message has been prepared in your email client! Please click send.");
    }, 1500);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen relative font-sans flex flex-col">
      
      {/* Navigation Top Bar */}
      <nav className="fixed top-0 left-0 w-full h-[72px] z-[100] flex justify-between items-center px-6 md:px-12 bg-white/80 dark:bg-surface/80 backdrop-blur-md border-b border-outline-variant shadow-sm transition-all">
        {/* Logo Text on Desktop */}
        <div 
          onClick={() => { setActiveView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
          className="hidden md:block text-lg md:text-xl font-bold text-on-surface cursor-pointer select-none font-sans tracking-tight"
        >
          {t.navLogo}
        </div>

        {/* Logo or Back button on Mobile / Tablet */}
        {activeView === "fluffy-care" ? (
          <button 
            onClick={() => { setActiveView("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            className="block md:hidden bg-transparent hover:bg-surface-subtle text-on-surface font-semibold px-3.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>{lang === "GR" ? "Πίσω στα έργα" : "Back to Projects"}</span>
          </button>
        ) : (
          <div 
            onClick={() => { setActiveView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }} 
            className="block md:hidden text-lg font-bold text-on-surface cursor-pointer select-none font-sans tracking-tight"
          >
            {t.navLogo}
          </div>
        )}
        
        {/* Navigation Items (Desktop) */}
        <div className="hidden md:flex gap-8 items-center">
          <button 
            onClick={() => { setActiveView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={`font-semibold text-sm pb-1 transition-all cursor-pointer ${activeView === "home" ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"}`}
          >
            {t.navHome}
          </button>
          
          <button 
            onClick={() => { setActiveView("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={`font-semibold text-sm pb-1 transition-all cursor-pointer ${(activeView === "work" || activeView === "fluffy-care") ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"}`}
          >
            {t.navWork}
          </button>
          
          <button 
            onClick={() => { setActiveView("resume"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className={`font-semibold text-sm pb-1 transition-all cursor-pointer ${activeView === "resume" ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-primary"}`}
          >
            {t.navResume}
          </button>

          <button 
            onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
            className={`w-14 h-8 p-1 rounded-full relative flex items-center transition-all duration-300 cursor-pointer border hover:scale-105 active:scale-95 ml-1 ${
              theme === "light" 
                ? "bg-slate-200 border-slate-300" 
                : "bg-slate-800 border-slate-700"
            }`}
            aria-label="Toggle Theme"
            title={theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-amber-500 absolute left-1 bg-white p-0.5 rounded-full shadow-md transition-all duration-300 transform translate-x-0" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-900 absolute left-1 bg-white p-0.5 rounded-full shadow-md transition-all duration-300 transform translate-x-6" />
            )}
          </button>
          
          <button 
            onClick={() => { window.location.href = "mailto:ux.zelelidoud@gmail.com"; }}
            className="bg-pet-teal text-[#ffffff] px-6 py-2 rounded-lg font-semibold text-sm scale-95 hover:bg-[#1E5D68] active:opacity-80 transition-all shadow-sm cursor-pointer"
          >
            {t.navContact}
          </button>
        </div>

        {/* Mobile Hamburger menu */}
        <div className="flex md:hidden items-center gap-2.5">
          <button 
            onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
            className={`w-14 h-8 p-1 rounded-full relative flex items-center transition-all duration-300 cursor-pointer border ${
              theme === "light" 
                ? "bg-slate-200 border-slate-300" 
                : "bg-slate-800 border-slate-700"
            }`}
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5 text-amber-500 absolute left-1 bg-white p-0.5 rounded-full shadow-md transition-all duration-300 transform translate-x-0" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-900 absolute left-1 bg-white p-0.5 rounded-full shadow-md transition-all duration-300 transform translate-x-6" />
            )}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-on-surface hover:opacity-80 transition-opacity cursor-pointer flex items-center"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl font-light">menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Overlay backdrop with background 000000 25% */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/25 cursor-pointer"
          />
          
          {/* Menu Panel */}
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="absolute top-0 right-0 h-full w-[280px] bg-white dark:bg-surface z-10 flex flex-col p-6 space-y-6 shadow-2xl border-l border-outline-variant font-sans"
          >
            {/* Header with Close option inside the drawer */}
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <span className="text-lg font-bold text-on-surface">{t.navLogo}</span>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-on-surface hover:opacity-80 transition-opacity p-1 hover:bg-surface-variant/20 rounded-full"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveView("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`text-left font-bold text-lg py-2 border-b border-outline-variant cursor-pointer ${activeView === "home" ? "text-primary" : "text-on-surface"}`}
            >
              {t.navHome}
            </button>
            
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveView("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`text-left font-bold text-lg py-2 border-b border-outline-variant cursor-pointer ${(activeView === "work" || activeView === "fluffy-care") ? "text-primary" : "text-on-surface"}`}
            >
              {t.navWork}
            </button>
            
            <button 
              onClick={() => { setMobileMenuOpen(false); setActiveView("resume"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className={`text-left font-bold text-lg py-2 border-b border-outline-variant cursor-pointer ${activeView === "resume" ? "text-primary font-bold" : "text-on-surface"}`}
            >
              {t.navResume}
            </button>

            <div className="border-b border-outline-variant pb-4 flex items-center justify-between">
              <span className="font-bold text-base text-on-surface">
                {lang === "GR" ? "Θέμα Εμφάνισης" : "Theme Style"}
              </span>
              <button 
                onClick={() => setTheme(prev => prev === "light" ? "dark" : "light")}
                className={`w-14 h-8 p-1 rounded-full relative flex items-center transition-all duration-300 cursor-pointer border ${
                  theme === "light" 
                    ? "bg-slate-200 border-slate-300" 
                    : "bg-slate-800 border-slate-700"
                }`}
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <Sun className="w-5 h-5 text-amber-500 absolute left-1 bg-white p-0.5 rounded-full shadow-md transition-all duration-300 transform translate-x-0" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-900 absolute left-1 bg-white p-0.5 rounded-full shadow-md transition-all duration-300 transform translate-x-6" />
                )}
              </button>
            </div>
            
            <button 
              onClick={() => { setMobileMenuOpen(false); window.location.href = "mailto:ux.zelelidoud@gmail.com"; }}
              className="text-center font-bold bg-pet-teal text-[#ffffff] py-3 rounded-lg w-full text-base shadow-sm cursor-pointer hover:opacity-90 transition-opacity mt-auto"
            >
              {t.navContact}
            </button>
          </motion.div>
        </div>
      )}

      {/* Main Container Content */}
      <main className="pt-[72px] flex-1 overflow-x-clip">
        {activeView === "home" ? (
          <>
            {/* HERO SECTION */}
            <section className="min-h-0 md:min-h-[819px] flex items-stretch px-6 md:px-12 pt-12 pb-0 hero-gradient max-w-full relative overflow-hidden">
              <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center md:items-stretch justify-between w-full gap-8 text-left flex-1 self-stretch">
                <div className="w-full md:w-1/2 space-y-6 flex flex-col justify-start pt-12 md:pt-[140px] pb-12 md:pb-0">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-extrabold text-text-primary leading-[1.2] tracking-tight">
                    {t.heroGreeting}<span className="text-pet-teal">{t.heroHighlight}</span>{t.heroQualityText}
                  </h1>
                  
                  <p className="text-sm md:text-md font-bold text-secondary uppercase tracking-widest font-sans">
                    {t.heroSubtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-3 text-on-surface-variant font-medium text-sm pt-1">
                    <a href={`mailto:${t.resumeEmail}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                      <Mail className="w-5 h-5 text-pet-teal" />
                      <span>{t.resumeEmail}</span>
                    </a>
                    <a href={t.resumeLinkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                      <Linkedin className="w-5 h-5 text-pet-teal" />
                      <span>LinkedIn</span>
                    </a>
                    <a href="https://github.com/despinazel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                      <Github className="w-5 h-5 text-pet-teal" />
                      <span>GitHub</span>
                    </a>
                  </div>
                  
                  <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                    {t.heroDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto">
                    <button 
                      onClick={() => { setActiveView("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="bg-pet-teal text-pure-white w-full sm:w-[220px] py-4 rounded-lg font-bold text-xs tracking-wider uppercase tonal-elevation hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {t.heroCtaWork} <span className="material-symbols-outlined text-sm font-semibold">arrow_downward</span>
                    </button>
                    
                    <button 
                      onClick={() => { setActiveView("resume"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="border-2 border-pet-teal text-pet-teal w-full sm:w-[220px] py-4 rounded-lg font-bold text-xs tracking-wider uppercase hover:bg-surface-subtle transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {t.heroCtaResume}
                    </button>
                  </div>
                </div>
                
                {/* Portrait Graphic representation */}
                <div className="hidden md:flex w-full md:w-1/2 mt-8 md:mt-0 justify-center items-end self-stretch">
                  <div className="relative w-[60%] sm:w-[45%] md:w-full max-w-[240px] md:max-w-md flex items-end mx-auto">
                    <img 
                      alt="Professional portrait of Despoina Zelelidou" 
                      className="relative z-10 w-full h-auto object-contain block align-bottom m-0 p-0" 
                      src="/assets/crop pofile photo withoud background.png"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* FOUNDATION & MASTERY SECTION */}
            <section className="py-20 px-6 md:px-12 bg-surface-container-lowest border-y border-outline-variant" id="foundation">
              <div className="max-w-[1200px] mx-auto text-left">
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight">{t.fmTitle}</h2>
                  <p className="text-sm md:text-base text-on-surface-variant mt-2 font-medium">{t.fmSubtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Google Cert */}
                  <div className="p-8 bg-white rounded-xl border border-outline-variant tonal-elevation hover:border-pet-teal transition-all group flex flex-col justify-between h-full relative">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-pet-teal/10 rounded-full flex items-center justify-center text-pet-teal">
                          <span className="material-symbols-outlined text-2xl">verified</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-600 text-pure-white font-bold text-xs rounded-full uppercase tracking-wider">
                          {lang === "GR" ? "ΟΛΟΚΛΗΡΩΘΗΚΕ" : "COMPLETED"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface mb-2">{t.cardGoogleTitle}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-sans">{t.cardGoogleDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-semibold text-pet-teal tracking-wide uppercase">
                      <span>Google Professional</span>
                    </div>
                  </div>
                  
                  {/* Quality Workflows */}
                  <div className="p-8 bg-white rounded-xl border border-outline-variant tonal-elevation hover:border-pet-teal transition-all group flex flex-col justify-between h-full relative">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-pet-teal/10 rounded-full flex items-center justify-center text-pet-teal">
                          <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                        <span className="px-3 py-1 bg-emerald-600 text-pure-white font-bold text-xs rounded-full uppercase tracking-wider">
                          {lang === "GR" ? "ΟΛΟΚΛΗΡΩΘΗΚΕ" : "COMPLETED"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface mb-2">{t.cardQualityTitle}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-sans">{t.cardQualityDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-semibold text-pet-teal tracking-wide uppercase">
                      <span>{t.cardQualityFooter}</span>
                    </div>
                  </div>
                  
                  {/* AI SaaS Development */}
                  <div className="p-8 bg-white rounded-xl border border-outline-variant tonal-elevation hover:border-pet-teal transition-all group flex flex-col justify-between h-full relative">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-pet-teal/10 rounded-full flex items-center justify-center text-pet-teal">
                          <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                        </div>
                        <span className="px-3 py-1 bg-amber-500 text-pure-white font-bold text-xs rounded-full uppercase tracking-wider">
                          {lang === "GR" ? "ΣΕ ΕΞΕΛΙΞΗ" : "IN PROGRESS"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-on-surface mb-2">{t.cardAiTitle}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-sans">{t.cardAiDesc}</p>
                    </div>
                    <div className="mt-6 flex items-center text-xs font-semibold text-pet-teal tracking-wide uppercase">
                      <span>{t.cardAiFooter}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* DIGITAL TOOLKIT SECTION */}
            <section className="py-20 px-6 md:px-12 bg-surface-container-lowest border-b border-outline-variant text-left" id="toolkit">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col gap-10">
                  <div className="max-w-3xl">
                    <span className="text-xs font-bold text-pet-teal uppercase tracking-widest block mb-2">
                      {lang === "GR" ? "Εργαλειοθήκη Σχεδιασμού & Ανάπτυξης" : "DESIGN & CODE ORCHESTRATION"}
                    </span>
                    <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mb-4">
                      {t.cardToolkitTitle}
                    </h2>
                    <p className="text-base text-on-surface-variant leading-relaxed font-sans">
                      {t.cardToolkitDesc}
                    </p>
                  </div>
                  
                  <div className="w-full overflow-hidden relative py-4">
                    {/* Fade overlays for the edge transition */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-container-lowest to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-container-lowest to-transparent z-10 pointer-events-none" />
                    
                    {/* Infinite horizontal scroll wrapper */}
                    <motion.div 
                      className="flex gap-12 md:gap-16 w-max px-4"
                      animate={{ x: ["0%", "-50%"] }}
                      transition={{
                        ease: "linear",
                        duration: 18,
                        repeat: Infinity,
                      }}
                    >
                      {[
                        "Figma", "Gemini AI", "Google Stitch", "Google AI studio", "Antigravity", "GitHub",
                        "Figma", "Gemini AI", "Google Stitch", "Google AI studio", "Antigravity", "GitHub"
                      ].map((tool, idx) => (
                        <div key={`${tool}-${idx}`} className="flex flex-col items-center gap-3 group shrink-0">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-surface-container-high border border-outline-variant hover:border-pet-teal hover:scale-110 transition-all duration-300 rounded-full flex items-center justify-center p-1.5 md:p-2 shadow-sm hover:shadow-md aspect-square shrink-0">
                            {getToolIcon(tool)}
                          </div>
                          <span className="text-xs font-extrabold text-on-surface select-none group-hover:text-pet-teal transition-colors text-center font-sans tracking-wide">
                            {tool === "Google AI studio" ? "Google AI Studio" : tool}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>

            {/* FEATURED PROJECTS SECTION */}
            <section className="py-20 px-6 md:px-12 text-left" id="work">
              <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
                  <div>
                    <span className="text-xs font-bold text-pet-teal uppercase tracking-widest block">{t.projectsSectionTag}</span>
                    <h2 className="text-3xl font-extrabold text-on-surface mt-2 tracking-tight">{t.projectsSectionTitle}</h2>
                  </div>
                  <button 
                    onClick={() => { setActiveView("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="flex items-center gap-1.5 text-pet-teal font-bold text-sm hover:underline transition-all cursor-pointer"
                  >
                    {t.projectsExploreAll} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {/* Project Card 1: Completed Case study */}
                  <div 
                    onClick={() => { setActiveView("fluffy-care"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="group bg-surface-container-low p-8 rounded-2xl border border-outline-variant tonal-elevation transition-all hover:-translate-y-2 hover:shadow-xl hover:border-pet-teal block cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-pet-teal/10 rounded-xl flex items-center justify-center text-pet-teal">
                        <span className="material-symbols-outlined text-3xl">pets</span>
                      </div>
                      <span className="px-3 py-1 bg-emerald-600 text-pure-white font-bold text-xs rounded-full uppercase tracking-wider">
                        {t.project1Badge}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-1 group-hover:text-pet-teal transition-colors">{t.project1Title}</h3>
                    <p className="text-xs uppercase font-extrabold text-secondary tracking-wider mb-4">{t.project1Type}</p>
                    
                    <p className="text-sm text-on-surface-variant font-sans leading-relaxed mb-6">
                      {t.project1Desc}
                    </p>
                    
                    <div className="flex items-center text-pet-teal font-bold text-xs uppercase tracking-wide">
                      {t.project1Cta} <span className="material-symbols-outlined ml-1.5 text-base">open_in_new</span>
                    </div>
                  </div>

                  {/* Project Card 2: In Progress */}
                  <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant tonal-elevation cursor-default">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 border border-orange-500/20 shadow-sm">
                        <span className="material-symbols-outlined text-3xl">fastfood</span>
                      </div>
                      <span className="px-3 py-1 bg-amber-500 text-pure-white font-bold text-xs rounded-full uppercase tracking-wider">
                        {t.project2Badge}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-1">{t.project2Title}</h3>
                    <p className="text-xs uppercase font-extrabold text-secondary tracking-wider mb-4">{t.project2Type}</p>
                    
                    <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
                      {t.project2Desc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* DESIGN THINKING PROCESS SECTION */}
            <section className="py-20 px-6 md:px-12 bg-surface-container-low overflow-hidden border-t border-outline-variant text-center">
              <div className="max-w-[1200px] mx-auto mb-16">
                <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight uppercase">{t.designProcessTitle}</h2>
                <div className="w-24 h-1 bg-pet-teal mx-auto mt-4 rounded-full"></div>
                <p className="text-xs md:text-sm text-on-surface-variant mt-3 max-w-xl mx-auto">{t.designProcessSub}</p>
              </div>
              
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 relative items-stretch">
                {/* Background alignment deck link for desktop */}
                <div className="hidden md:block absolute top-[24px] left-0 w-full h-[1px] bg-outline-variant -z-0"></div>
                
                {/* Step 1 */}
                <div className="group flex flex-col items-center h-full relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-pet-teal flex items-center justify-center mb-6 font-bold text-pet-teal shadow-sm group-hover:shadow-lg transition-all duration-300">
                    01
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-pet-teal hover:scale-105 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center h-full flex-1 w-full">
                    <img 
                      alt="Empathize" 
                      className="w-12 h-12 mb-4 object-contain bg-transparent" 
                      src="/assets/empathize.png"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-base font-bold mb-2 text-on-surface">{t.step1Title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{t.step1Desc}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group flex flex-col items-center h-full relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-pet-teal flex items-center justify-center mb-6 font-bold text-pet-teal shadow-sm group-hover:shadow-lg transition-all duration-300">
                    02
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-pet-teal hover:scale-105 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center h-full flex-1 w-full">
                    <img 
                      alt="Define" 
                      className="w-12 h-12 mb-4 object-contain bg-transparent" 
                      src="/assets/define.png"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-base font-bold mb-2 text-on-surface">{t.step2Title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{t.step2Desc}</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group flex flex-col items-center h-full relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-pet-teal flex items-center justify-center mb-6 font-bold text-pet-teal shadow-sm group-hover:shadow-lg transition-all duration-300">
                    03
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-pet-teal hover:scale-105 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center h-full flex-1 w-full">
                    <img 
                      alt="Ideate" 
                      className="w-12 h-12 mb-4 object-contain bg-transparent" 
                      src="/assets/ideate.png"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-base font-bold mb-2 text-on-surface">{t.step3Title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{t.step3Desc}</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="group flex flex-col items-center h-full relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-pet-teal flex items-center justify-center mb-6 font-bold text-pet-teal shadow-sm group-hover:shadow-lg transition-all duration-300">
                    04
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-pet-teal hover:scale-105 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center h-full flex-1 w-full">
                    <img 
                      alt="Prototype" 
                      className="w-12 h-12 mb-4 object-contain bg-transparent" 
                      src="/assets/prototyping.png"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-base font-bold mb-2 text-on-surface">{t.step4Title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{t.step4Desc}</p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="group flex flex-col items-center h-full relative z-10">
                  <div className="w-12 h-12 bg-white rounded-full border-2 border-pet-teal flex items-center justify-center mb-6 font-bold text-pet-teal shadow-sm group-hover:shadow-lg transition-all duration-300">
                    05
                  </div>
                  <div className="p-6 bg-white rounded-xl border border-transparent hover:border-pet-teal hover:scale-105 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center h-full flex-1 w-full">
                    <img 
                      alt="Test" 
                      className="w-12 h-12 mb-4 object-contain bg-transparent" 
                      src="/assets/testing.png"
                      referrerPolicy="no-referrer"
                    />
                    <h4 className="text-base font-bold mb-2 text-on-surface">{t.step5Title}</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{t.step5Desc}</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : activeView === "work" ? (
          /* WORK VIEW SECTION (matching EXACT layout and contents) */
          <section className="min-h-screen py-16 px-6 md:px-12 bg-surface font-sans max-w-7xl mx-auto flex flex-col justify-start">
            {/* Page Header */}
            <div className="mb-12 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-tight tracking-tight">
                {t.workViewTitle}
              </h1>
            </div>

            {/* Interactive Filter Bar */}
            <div className="flex flex-wrap items-center gap-3 mb-12 select-none">
              <button 
                onClick={() => setProjectFilter("all")}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${projectFilter === "all" ? "bg-pet-teal text-pure-white border-pet-teal shadow-md" : "border-outline-variant text-on-surface-variant hover:border-pet-teal bg-surface-container-lowest"}`}
              >
                {t.filterAll}
              </button>
              <button 
                onClick={() => setProjectFilter("completed")}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${projectFilter === "completed" ? "bg-pet-teal text-pure-white border-pet-teal shadow-md" : "border-outline-variant text-on-surface-variant hover:border-pet-teal bg-surface-container-lowest"}`}
              >
                {t.filterCompleted}
              </button>
              <button 
                onClick={() => setProjectFilter("in-progress")}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${projectFilter === "in-progress" ? "bg-pet-teal text-pure-white border-pet-teal shadow-md" : "border-outline-variant text-on-surface-variant hover:border-pet-teal bg-surface-container-lowest"}`}
              >
                {t.filterInProgress}
              </button>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch mb-16 w-full">
              
              {/* Card 1: Completed Case Study (Fluffy Care) */}
              {(projectFilter === "all" || projectFilter === "completed") && (
                <div 
                  onClick={() => { setActiveView("fluffy-care"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  onMouseMove={handleMouseMove}
                  style={{
                    "--mouse-x": `${mousePos.x}px`,
                    "--mouse-y": `${mousePos.y}px`
                  } as React.CSSProperties}
                  className="group col-span-1 w-full md:col-span-12 bg-white rounded-3xl border border-outline-variant shadow-sm hover:shadow-xl hover:border-pet-teal transition-all duration-300 overflow-hidden text-left flex flex-col md:flex-row relative cursor-pointer"
                >
                  {/* Image section */}
                  <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden relative bg-surface-subtle self-stretch">
                    <img 
                      src="/assets/case study card.png"
                      alt="Fluffy Care Mobile App Preview" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Content section */}
                  <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between items-start gap-6">
                    <div>
                      <div className="flex justify-between items-center w-full mb-4">
                        <span className="px-3 py-1 bg-emerald-600 text-pure-white font-bold text-xs rounded-full uppercase tracking-wider">
                          {t.project1Badge}
                        </span>
                        <div className="w-9 h-9 bg-pet-teal/10 rounded-xl flex items-center justify-center text-pet-teal">
                          <span className="material-symbols-outlined text-xl">pets</span>
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-2 tracking-tight group-hover:text-pet-teal transition-colors font-sans">
                        {t.project1Title}
                      </h3>
                      <p className="text-xs font-extrabold text-pet-teal uppercase tracking-wider mb-4">
                        {t.project1TypeWork}
                      </p>
                      <p className="text-sm md:text-base text-on-surface-variant font-sans leading-relaxed">
                        {t.project1Desc}
                      </p>
                    </div>

                    <div className="w-full pt-4 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-medium text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-pet-teal col-span-3">calendar_today</span>
                        <span>{t.workDate1}</span>
                      </div>
                      
                      <div className="text-pet-teal font-bold uppercase tracking-wider flex items-center gap-1.5 hover:underline group-hover:translate-x-1 transition-transform">
                        <span>{t.project1Cta}</span>
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card 2: Web E-Commerce Platform (In Progress) */}
              {(projectFilter === "all" || projectFilter === "in-progress") && (
                <div 
                  className="col-span-1 w-full md:col-span-12 bg-white rounded-3xl border border-outline-variant shadow-sm p-8 md:p-10 flex flex-col justify-between items-start text-left gap-6 transition-all duration-300"
                >
                  <div className="w-full">
                    <div className="flex justify-between items-center w-full mb-6">
                      <span className="bg-amber-100 text-amber-800 text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border border-amber-200">
                        {t.project2Badge}
                      </span>
                      <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 border border-orange-200 shadow-sm">
                        <span className="material-symbols-outlined text-xl">fastfood</span>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-extrabold text-on-surface mb-1 tracking-tight">
                      {t.project2TitleWork}
                    </h3>
                    <p className="text-xs font-extrabold text-on-surface-variant uppercase tracking-wider mb-4">
                      {t.project2TypeWork}
                    </p>
                    <p className="text-sm text-on-surface-variant font-sans leading-relaxed md:text-base">
                      {t.project2DescWork}
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-outline-variant flex items-center gap-2 text-xs font-bold text-orange-700">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    <span className="capitalize">{t.project2ActionWork}</span>
                  </div>
                </div>
              )}
            </div>

            {/* High Contrast Teal Call-to-Action */}
            <div className="bg-pet-teal text-pure-white p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-lg text-left w-full">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="space-y-4 relative z-10 max-w-2xl">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-none">
                  {t.ctaTitleWork}
                </h3>
                <p className="text-sm md:text-base text-pure-white/90 font-medium">
                  {t.ctaDescWork}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10 shrink-0">
                <button 
                  onClick={() => { window.location.href = "mailto:ux.zelelidoud@gmail.com"; }}
                  className="bg-white text-pet-teal dark:bg-[#161b16] dark:text-pure-white hover:bg-neutral-100 dark:hover:bg-[#1f2824] transition-all font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg cursor-pointer shadow-sm border border-transparent dark:border-white/10"
                >
                  {t.ctaSendEmailWork}
                </button>
                <button 
                  onClick={() => { setActiveView("resume"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-pet-teal hover:bg-[#20606a] border-2 border-pure-white/40 hover:border-pure-white text-pure-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg transition-all cursor-pointer"
                >
                  {t.ctaViewResumeWork}
                </button>
              </div>
            </div>
          </section>
        ) : activeView === "resume" ? (
          /* ==================== BILINGUAL RESUME VIEW SECTION ==================== */
          <div className="bg-surface pb-0 animate-fadeIn">
            {/* Header / Hero Container */}
            <header className="bg-surface-container-lowest border-b border-outline-variant py-16 md:py-24 text-left">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl lg:text-display-lg font-extrabold text-on-surface tracking-tight font-sans">
                      {t.resumeHeroTitle}
                    </h1>
                    <p className="text-sm md:text-md font-bold text-pet-teal uppercase tracking-widest font-sans">
                      {t.resumeHeroSubtitle}
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3 text-on-surface-variant font-medium text-sm pt-2">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-pet-teal" />
                        <span>{t.resumeLocation}</span>
                      </span>
                      <a href={`mailto:${t.resumeEmail}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                        <Mail className="w-5 h-5 text-pet-teal" />
                        <span>{t.resumeEmail}</span>
                      </a>
                      <a href={`tel:${t.resumePhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-secondary transition-colors">
                        <Phone className="w-5 h-5 text-pet-teal" />
                        <span>{t.resumePhone}</span>
                      </a>
                      <a href={t.resumeLinkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                        <Linkedin className="w-5 h-5 text-pet-teal" />
                        <span>LinkedIn</span>
                      </a>
                      <a href="https://github.com/despinazel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-secondary transition-colors">
                        <Github className="w-5 h-5 text-pet-teal" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </header>

            {/* Professional Summary Section */}
            <section className="py-16 md:py-20 border-b border-outline-variant bg-surface text-left">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <h2 className="text-xl md:text-2xl font-extrabold text-on-surface border-l-4 border-pet-teal pl-4 tracking-tight uppercase">
                      {t.resumeSummaryTitle}
                    </h2>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-base md:text-lg text-on-surface-variant leading-relaxed font-sans font-medium">
                      {t.resumeSummaryDesc}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Work Experience Section */}
            <section className="py-16 md:py-20 border-b border-outline-variant bg-surface-subtle text-left">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <h2 className="text-xl md:text-2xl font-extrabold text-on-surface border-l-4 border-pet-teal pl-4 tracking-tight uppercase">
                      {t.resumeExperienceTitle}
                    </h2>
                  </div>
                  <div className="md:col-span-8 space-y-12">
                    {/* Job 1 */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant pb-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
                            {t.role1Title}
                          </h3>
                          <p className="text-sm font-bold text-pet-teal mt-0.5">
                            {t.role1Company}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant bg-surface px-3 py-1.5 rounded-full border border-outline-variant shrink-0 w-fit">
                          {t.role1Date}
                        </span>
                      </div>
                      <ul className="space-y-3 text-sm md:text-base text-on-surface-variant font-medium leading-relaxed font-sans">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role1Bullet1}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role1Bullet2}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role1Bullet3}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job 2 */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant pb-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
                            {t.role2Title}
                          </h3>
                          <p className="text-sm font-bold text-pet-teal mt-0.5">
                            {t.role2Company}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant bg-surface px-3 py-1.5 rounded-full border border-outline-variant shrink-0 w-fit">
                          {t.role2Date}
                        </span>
                      </div>
                      <ul className="space-y-3 text-sm md:text-base text-on-surface-variant font-medium leading-relaxed font-sans">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role2Bullet1}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role2Bullet2}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Job 3 */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant pb-2">
                        <div>
                          <h3 className="text-lg md:text-xl font-extrabold text-on-surface tracking-tight">
                            {t.role3Title}
                          </h3>
                          <p className="text-sm font-bold text-pet-teal mt-0.5">
                            {t.role3Company}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant bg-surface px-3 py-1.5 rounded-full border border-outline-variant shrink-0 w-fit">
                          {t.role3Date}
                        </span>
                      </div>
                      <ul className="space-y-3 text-sm md:text-base text-on-surface-variant font-medium leading-relaxed font-sans">
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role3Bullet1}</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-pet-teal shrink-0 mt-0.5" />
                          <span>{t.role3Bullet2}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills & Tools Section */}
            <section className="py-16 md:py-20 border-b border-outline-variant bg-surface text-left">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <h2 className="text-xl md:text-2xl font-extrabold text-on-surface border-l-4 border-pet-teal pl-4 tracking-tight uppercase">
                      {t.resumeSkillsTitle}
                    </h2>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Design Skills */}
                    <div className="p-6 md:p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm hover:border-pet-teal transition-all">
                      <h3 className="text-md font-bold text-on-surface border-b border-outline-variant pb-3 mb-4 uppercase tracking-wider">
                        {t.skillsDesignTitle}
                      </h3>
                      <ul className="space-y-3 text-sm font-semibold text-on-surface-variant font-sans">
                        {t.skillsDesignList.map((skill, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-pet-teal" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Systems Tools */}
                    <div className="p-6 md:p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm hover:border-pet-teal transition-all">
                      <h3 className="text-md font-bold text-on-surface border-b border-outline-variant pb-3 mb-4 uppercase tracking-wider">
                        {t.skillsSystemsTitle}
                      </h3>
                      <ul className="space-y-3 text-sm font-semibold text-on-surface-variant font-sans">
                        {t.skillsSystemsList.map((skill, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Education & Certificates Section */}
            <section className="py-16 md:py-20 bg-surface-subtle text-left">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                  <div className="md:col-span-4">
                    <h2 className="text-xl md:text-2xl font-extrabold text-on-surface border-l-4 border-pet-teal pl-4 tracking-tight uppercase">
                      {t.resumeEducationTitle}
                    </h2>
                  </div>
                  <div className="md:col-span-8 space-y-8">
                    {/* Edu 1 */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-outline-variant pb-6">
                      <div className="space-y-1">
                        <h3 className="text-base md:text-lg font-bold text-on-surface tracking-tight">
                          {t.edu1Title}
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-on-surface-variant">
                          {t.edu1Sub}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-pet-teal bg-white border border-outline-variant px-3 py-1 rounded-full h-fit w-fit self-start sm:self-center shrink-0">
                        {t.edu1Date}
                      </span>
                    </div>

                    {/* Edu 2 */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-outline-variant pb-6">
                      <div className="space-y-1">
                        <h3 className="text-base md:text-lg font-bold text-on-surface tracking-tight">
                          {t.edu2Title}
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-on-surface-variant">
                          {t.edu2Sub}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-pet-teal bg-white border border-outline-variant px-3 py-1 rounded-full h-fit w-fit self-start sm:self-center shrink-0">
                        {t.edu2Date}
                      </span>
                    </div>

                    {/* Edu 3 */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="text-base md:text-lg font-bold text-on-surface tracking-tight">
                          {t.edu3Title}
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-on-surface-variant">
                          {t.edu3Sub}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-pet-teal bg-white border border-outline-variant px-3 py-1 rounded-full h-fit w-fit self-start sm:self-center shrink-0">
                        {t.edu3Date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>


          </div>
        ) : (
          <FluffyCareCaseStudy 
            lang={lang} 
            setActiveView={setActiveView} 
            setShowContact={setShowContact} 
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full py-12 px-6 md:px-12 bg-surface-container-lowest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold text-on-surface tracking-tight font-sans">
          {t.navLogo}
        </div>
        
        <p className="text-xs sm:text-sm text-on-surface-variant text-center md:text-left font-medium">
          {t.footerCredit}
        </p>
        
        <div className="flex gap-6 items-center">
          <a href={`mailto:${t.resumeEmail}`} className="text-xs font-bold text-on-surface hover:text-primary transition-all">Email</a>
          <a href={t.resumeLinkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-on-surface hover:text-primary transition-all">LinkedIn</a>
          <a href="https://github.com/despinazel" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-on-surface hover:text-primary transition-all">GitHub</a>
        </div>
      </footer>


      {/* ==================== RESUME OVERLAY MODAL ==================== */}
      {showResume && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-white border-b border-outline-variant p-6 flex justify-between items-center sticky top-0 z-10">
              <div>
                <h3 className="text-xl font-bold text-on-surface">{lang === "GR" ? "Βιογραφικό Σημείωμα" : "Curriculum Vitae (Resume)"}</h3>
                <p className="text-xs text-on-surface-variant mt-1">Despoina Zelelidou | UX Designer & Quality Engineer</p>
              </div>
              <button 
                onClick={() => setShowResume(false)}
                className="p-1.5 bg-surface-subtle hover:bg-surface-variant rounded-full text-on-surface transition-all cursor-pointer"
                aria-label="Close CV"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Resume Content Body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8 flex-1 font-sans text-left text-sm text-on-surface-variant">
              
              {/* Introduction & Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-outline-variant">
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-base font-bold text-on-surface uppercase tracking-wide">{lang === "GR" ? "Προφίλ" : "Executive Summary"}</h4>
                  <p className="text-xs leading-relaxed leading-slate">
                    {lang === "GR"
                      ? "Αποδεδειγμένη εμπειρία στην ανάλυση και διασφάλιση ποιότητας (ISO-9001), μεταφέροντας την υψηλή ακρίβεια ελέγχου στο UX Engineering. Συνδυάζω αναλυτικές δεξιότητες με καθαρό UI design."
                      : "Multi-disciplinary professional transferring auditing, compliance, and user-research rigor (ISO Standards) to digital product layouts. Certified by Google, prioritizing accessibility."}
                  </p>
                </div>
                
                <div className="space-y-2 text-xs">
                  <strong className="block text-on-surface">{lang === "GR" ? "Πληροφορίες" : "Key Contact Details"}</strong>
                  <p>ux.zelelidoud@gmail.com</p>
                  <p>Greece (Relocatable / Remote)</p>
                  <p>Google Certified Designer</p>
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-on-surface uppercase tracking-wide flex items-center gap-2"><Sparkles className="w-4 h-4 text-pet-teal" /> {lang === "GR" ? "Πιστοποιήσεις & Εκπαίδευση" : "Education & Credentials"}</h4>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[#f8f9fa] rounded-xl border border-outline-variant">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-pet-teal">Google Career Certificates</span>
                    <h5 className="font-bold text-on-surface text-base mt-1">Google UX Design Professional Certificate</h5>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {lang === "GR" 
                        ? "Κάλυψη ερευνητικών μεθόδων, user persona mapping, σχεδιασμού wireframes (Figma/FigJam), συστημάτων UI και ελέγχων προσβασιμότητας."
                        : "Comprehensive end-to-end curriculum encompassing empathy design, usability metrics formulation, wireframe drafting (Figma), and WCAG accessibility standards."}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-white rounded-xl border border-outline-variant">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-secondary">{lang === "GR" ? "Επιστημονική Κατάρτιση" : "Scientific Foundations"}</span>
                    <h5 className="font-bold text-on-surface text-sm mt-1">{lang === "GR" ? "Σύμβουλος Ποιότητας & Food Safety Auditor" : "Quality Systems Specialist & Food Safety Assessor"}</h5>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {lang === "GR"
                        ? "Έλεγχος και εφαρμογή διεθνών προτύπων ISO, ανάλυση κινδύνου, σχεδιασμός ροών εργασίας και επικύρωση αποτελεσμάτων."
                        : "Analyzing and executing international ISO quality standards, workflow modeling, corporate risk-mapping, and audit system validation."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills breakdown */}
              <div className="space-y-3">
                <h4 className="text-base font-bold text-on-surface uppercase tracking-wide">{lang === "GR" ? "Δεξιότητες & Εργαλεία" : "Methodologies & Stack"}</h4>
                <div className="flex flex-wrap gap-2">
                  {["User Research", "Information Architecture", "Wireframing", "Interactive Prototyping", "Usability Testing", "UX Auditing", "ISO Compliance", "Figma", "Miro", "Gemini AI"].map((sk) => (
                    <span key={sk} className="px-3 py-1 bg-surface-subtle border border-outline-variant text-on-surface-variant rounded-lg text-xs font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer with Resume PDF download simulation trigger */}
            <div className="bg-surface-subtle p-4 border-t border-outline-variant flex justify-between items-center z-10">
              <span className="text-xs text-on-surface-variant font-medium">Despoina_Z_CV.pdf</span>
              <a 
                href="/api/download-resume" 
                download="Zelelidou_Despoina_CV.pdf"
                className="bg-pet-teal text-pure-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase hover:bg-primary transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{lang === "GR" ? "Λήψη Βιογραφικού" : "Download PDF File"}</span>
              </a>
            </div>

          </div>
        </div>
      )}


      {/* ==================== CONTACT FORM DIALOG ==================== */}
      {showContact && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative text-left">
            
            {/* Header */}
            <div className="bg-pet-teal text-pure-white p-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{lang === "GR" ? "Φόρμα Επικοινωνίας" : "Drop Me a Message"}</h3>
              </div>
              <button 
                onClick={() => setShowContact(false)}
                className="p-1.5 hover:bg-pure-white/10 rounded-full text-pure-white transition-all cursor-pointer"
                aria-label="Close Contact Form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Entry fields */}
            <form onSubmit={handleContactSubmit} className="p-6 space-y-4 font-sans">
              <div>
                <label className="text-xs font-bold text-on-surface block uppercase tracking-wide mb-1.5">{lang === "GR" ? "Ονοματεπώνυμο" : "Your Name"}</label>
                <input 
                  type="text" 
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-outline-variant bg-surface rounded-lg focus:border-pet-teal focus:ring-1 focus:ring-pet-teal outline-none transition-all text-sm font-medium"
                  placeholder={lang === "GR" ? "π.χ. Ιωάννης Παππάς" : "e.g. John Doe"}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block uppercase tracking-wide mb-1.5">{lang === "GR" ? "Email Επικοινωνίας" : "Your Email address"}</label>
                <input 
                  type="email" 
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-outline-variant bg-surface rounded-lg focus:border-pet-teal focus:ring-1 focus:ring-pet-teal outline-none transition-all text-sm font-medium"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block uppercase tracking-wide mb-1.5">{lang === "GR" ? "Μήνυμα" : "How can I help you?"}</label>
                <textarea 
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-outline-variant bg-surface rounded-lg focus:border-pet-teal focus:ring-1 focus:ring-pet-teal outline-none transition-all text-sm font-medium resize-none"
                  placeholder={lang === "GR" ? "Γράψτε το μήνυμά σας εδώ..." : "What’s on your mind? Describe a potential project, collaboration, or just to connect here..."}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-pet-teal text-pure-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-primary transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{lang === "GR" ? "Αποστολή Μηνύματος" : "SEND MESSAGE"}</span>
              </button>
            </form>

            {/* Email link fallback */}
            <div className="bg-surface-subtle p-4 border-t border-outline-variant text-center space-y-2">
              <p className="text-xs text-on-surface-variant font-medium">
                {lang === "GR" ? "Ή επικοινωνήστε απευθείας στο:" : "Or email directly at:"}{" "}
                <strong className="text-pet-teal hover:underline"><a href={`mailto:${t.resumeEmail}`}>{t.resumeEmail}</a></strong>
              </p>
              <div className="flex justify-center gap-6 text-xs font-bold text-on-surface-variant">
                <a href={t.resumeLinkedin} target="_blank" rel="noopener noreferrer" className="hover:text-pet-teal flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://github.com/despinazel" target="_blank" rel="noopener noreferrer" className="hover:text-pet-teal flex items-center gap-1.5">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}




      <Analytics />
    </div>
  );
}
