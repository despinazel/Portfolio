import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Sparkles, 
  Lightbulb, 
  ChevronRight, 
  Award, 
  Plus, 
  Layers, 
  CheckCircle,
  X,
  Target,
  Search,
  Compass,
  BookOpen,
  Clock,
  Activity,
  Users,
  Smartphone,
  Shield,
  FileText,
  Calendar,
  Home,
  MapPin,
  ExternalLink
} from "lucide-react";
import { MobileSimulator } from "./MobileSimulator";

interface FluffyCareCaseStudyProps {
  lang: "EN" | "GR";
  setActiveView: (view: "home" | "work" | "resume" | "fluffy-care") => void;
  setShowContact: (show: boolean) => void;
}

const fcTranslations = {
  EN: {
    fcTag: "UX Case Study & Compliance Integration",
    fcHeroTitle: "Designing the Future of",
    fcHeroSubtitle: "Pet Healthcare",
    fcHeroDesc: "An intuitive mobile app that centralizes medical records, medication and symptom tracking, and entry appoinment into a single, accessible environment.",
    fcAhaTitle: "The \"Aha!\" Moment",
    fcAhaDesc: "Realizing that static onboarding screens fail because users skim text and tap blindly. The opportunity was to convert a passive welcome flow into an active 'aha' moment by guiding users to perform a critical product action—registering their pet—right away, turning activation into immediate user value.",
    fcStrategyTitle: "Design Strategy: Double Diamond",
    fcStrategyDesc: "I followed the Double Diamond framework to ensure I thoroughly explored and defined the right problem before shifting focus to designing the right solution.",
    fcDiscoverTitle: "Discover: User Research",
    fcDiscoverDesc: "This section demonstrates my commitment to evidence-based design, proving that I base my decisions on real user data rather than assumptions.",
    fcInsightsTitle: "Quantitative & Qualitative Insights",
    fcInsight1Title: "Fragmented Methods",
    fcInsight1Desc: "The majority of owners rely on scattered phone notes, physical notebooks, or loose paper folders.",
    fcInsight2Title: "Need for Automation",
    fcInsight2Desc: "High demand for automated push notifications for vaccination deadlines and interactive clinic maps.",
    fcDefineTitle: "Define: Synthesizing Research",
    fcProblemStatement: "Our users need a way to record and keep track of their pets’ health care, because managing vet visits, medications and medical history across time is difficult to remember and critical to a pet’s health and wellbeing.",
    fcPersonasTitle: "User Personas",
    fcPersonaLucySub: "The Anxious New Owner",
    fcPersonaLucyPain: "Feels overwhelmed by information and requires proactive guidance.",
    fcPersonaNickSub: "Responsibility Manager",
    fcPersonaNickPain: "Needs seamless data sharing with his spouse for multiple pets.",
    fcPersonaAriaSub: "The Frequent Traveler",
    fcPersonaAriaPain: "Needs instant access to vaccine passports without internet connection.",
    fcDevelopTitle: "Develop: Information Architecture & Flows",
    fcDevelopDesc: "Utilizing Card Sorting methodology, I streamlined the sitemap into 6 core categories that eliminate friction in daily tasks.",
    fcDevelopItem1: "Pet profile",
    fcDevelopItem2: "Add pet",
    fcDevelopItem3: "Calendar",
    fcDevelopItem4: "Library",
    fcDevelopItem5: "Community",
    fcDevelopItem6: "Settings",
    fcFlowTitle: "Critical User Flow",
    fcFlowOnboarding: "Onboarding Flow",
    fcFlowMedication: "Medication Log Flow",
    fcDeliverTitle: "Deliver & Validate: Usability Testing",
    fcDeliverDesc: "This is the most crucial stage. It proves my ability to test my work, embrace negative feedback, and successfully iterate on a design.",
    fcDeliverParticipants: "Participants Tested",
    fcDeliverSuccess: "Task Success Rate",
    fcDeliverFlawTitle: "Critical Design Flaw Identified",
    fcDeliverFlawQuote: "\"If I have two pets starting with 'M', I won't know whose appointment this is on the calendar.\"",
    fcDeliverSolutionTitle: "Solution Implemented",
    fcDeliverSolutionDesc: "Assigned a unique color to each pet profile. When scheduling, users can select their desired pet and easily tell appointments apart based on color tags, two-letter initials, a default pet icon, or an uploaded photo.",
    fcDeliverKeyTitle: "Key Transformation",
    fcDeliverKeyDesc: "Replacing the hidden side menu with a persistent Bottom Navigation Bar kept core destinations visible, lowering cognitive friction.",
    fcMockupsTitle: "Final UI Mockups",
    fcMockupsDesc: "Designed with structured Figma components and WCAG AA standard accessibility.",
    fcOnboardingTitle: "Onboarding & Pet Creation",
    fcOnboardingDesc: "A frictionless entrance flow with engaging interactive elements.",
    fcDashboardTitle: "Dashboard UX",
    fcDashboardDesc: "Prioritizing emergency information and accessibility.",
    fcProfileTitle: "Pet Profile Database",
    fcProfileDesc: "Clean data layouts for finding lab reports instantly.",
    fcConclusionTitle: "Conclusion",
    fcConclusionDesc: "The development of Fluffy Care demonstrated that impactful UX design goes beyond clean aesthetics, it is about mitigating user anxiety during high-stress moments. By transforming a fragmented, paper-heavy tracking method into a centralized digital ecosystem, the application successfully bridges the gap between routine care and emergency preparedness.\n\nThe core success of this project relied on embracing real-world user friction. Navigating away from original assumptions, proved that iterative design is essential to building an intuitive, user-centered product.",
    fcFooterCopyright: "© 2024 Fluffy Care Case Study. Designed with precision.",
    fcFigmaButton: "Figma Presentation Slides"
  },
  GR: {
    fcTag: "Μελέτη Περίπτωσης UX & Εναρμόνιση Ποιότητας",
    fcHeroTitle: "Σχεδιάζοντας το Μέλλον της",
    fcHeroSubtitle: "Φροντίδας Κατοικιδίων",
    fcHeroDesc: "Μια εύχρηστη εφαρμογή για κινητά που συγκεντρώνει ιατρικά αρχεία, παρακολούθηση φαρμάκων και συμπτωμάτων, καθώς και καταχώριση ραντεβού σε ένα ενιαίο, προσβάσιμο περιβάλλον.",
    fcAhaTitle: "Η Στιγμή της «Αποκάλυψης»",
    fcAhaDesc: "Η συνειδητοποίηση ότι οι στατικές οθόνες εισαγωγής αποτυγχάνουν επειδή οι χρήστες δεν διαβάζουν το κείμενο και απλώς προσπερνούν γρήγορα τις οθόνες. Η ευκαιρία ήταν να μετατρέψουμε μια παθητική ροή καλωσορίσματος σε μια ενεργή στιγμή «Aha!», καθοδηγώντας τους χρήστες να εκτελέσουν μια κρίσιμη ενέργεια—τη δημιουργία προφίλ του κατοικιδίου τους—αμέσως, μετατρέποντας την ενεργοποίηση σε άμεση αξία χρηστών.",
    fcStrategyTitle: "Στρατηγική Σχεδιασμού: Double Diamond",
    fcStrategyDesc: "Ακολούθησα το πλαίσιο Double Diamond για να διασφαλίσω ότι διερεύνησα και όρισα διεξοδικά το σωστό πρόβλημα πριν εστιάσω στο σχεδιασμό της σωστής λύσης.",
    fcDiscoverTitle: "Discover: Έρευνα Χρηστών",
    fcDiscoverDesc: "Αυτή η ενότητα αποδεικνύει τη δέσμευσή μου στον σχεδιασμό που βασίζεται σε στοιχεία (evidence-based), αποδεικνύοντας ότι βασίζω τις αποφάσεις μου σε πραγματικά δεδομένα χρηστών.",
    fcInsightsTitle: "Ποσοτικές & Ποιοτικές Πληροφορίες",
    fcInsight1Title: "Διάσπαρτες Μέθοδοι",
    fcInsight1Desc: "Η πλειονότητα των ιδιοκτητών βασίζεται σε σκόρπιες σημειώσεις στο τηλέφωνο, φυσικά σημειωματάρια ή χαλαρούς χάρτινους φακέλους.",
    fcInsight2Title: "Ανάγκη για Αυτοματοποίηση",
    fcInsight2Desc: "Υψηλή ζήτηση για αυτοματοποιημένες ειδοποιήσεις push για προθεσμίες εμβολιασμού και διαδραστικούς χάρτες κλινικών.",
    fcDefineTitle: "Define: Σύνθεση Έρευνας",
    fcProblemStatement: "Οι χρήστες μας χρειάζονται έναν τρόπο να καταγράφουν και να παρακολουθούν τη φροντίδα της υγείας των κατοικιδίων τους, επειδή η διαχείριση των επισκέψεων στον κτηνίατρο, των φαρμάκων και του ιατρικού ιστορικού με την πάροδο του χρόνου είναι δύσκολο να απομνημονευθεί και κρίσιμη για την υγεία και την ευημερία του κατοικιδίου.",
    fcPersonasTitle: "User Personas (Προφίλ Χρηστών)",
    fcPersonaLucySub: "Η Αγχωμένη Νέα Ιδιοκτήτρια",
    fcPersonaLucyPain: "Αισθάνεται συγκλονισμένη από τις πληροφορίες και χρειάζεται ενεργή καθοδήγηση.",
    fcPersonaNickSub: "Υπεύθυνος Οργάνωσης",
    fcPersonaNickPain: "Χρειάζεται απρόσκοπτη κοινή χρήση δεδομένων με τον/την σύζυγό του για πολλά κατοικίδια.",
    fcPersonaAriaSub: "Η Συχνή Ταξιδιώτης",
    fcPersonaAriaPain: "Χρειάζεται άμεση πρόσβαση στα διαβατήρια εμβολίων χωρίς σύνδεση στο διαδίκτυο.",
    fcDevelopTitle: "Develop: Αρχιτεκτονική Πληροφοριών & Ροές",
    fcDevelopDesc: "Χρησιμοποιώντας τη μεθοδολογία Card Sorting, απλοποίησα το sitemap σε 6 βασικές κατηγορίες που εξαλείφουν την τριβή στις καθημερινές εργασίες.",
    fcDevelopItem1: "Προφίλ κατοικιδίου",
    fcDevelopItem2: "Προσθήκη κατοικιδίου",
    fcDevelopItem3: "Ημερολόγιο",
    fcDevelopItem4: "Βιβλιοθήκη",
    fcDevelopItem5: "Κοινότητα",
    fcDevelopItem6: "Ρυθμίσεις",
    fcFlowTitle: "Κρίσιμη Ροή Χρήστη",
    fcFlowOnboarding: "Ροή Onboarding",
    fcFlowMedication: "Ροή Καταγραφής Φαρμάκων",
    fcDeliverTitle: "Deliver & Validate: Δοκιμές Ευχρηστίας",
    fcDeliverDesc: "Αυτό είναι το πιο κρίσιμο στάδιο. Αποδεικνύει την ικανότητά μου να δοκιμάζω τη δουλειά μου, να αποδέχομαι τα αρνητικά σχόλια και να εξελίσσω με επιτυχία έναν σχεδιασμό.",
    fcDeliverParticipants: "Συμμετέχοντες Δοκιμών",
    fcDeliverSuccess: "Ποσοστό Επιτυχίας",
    fcDeliverFlawTitle: "Εντοπισμός Κρίσιμου Σφάλματος",
    fcDeliverFlawQuote: "«Αν έχω δύο κατοικίδια που ξεκινούν από 'Μ', δεν θα ξέρω ποιανού είναι αυτό το ραντεβού στο ημερολόγιο».",
    fcDeliverSolutionTitle: "Λύση που Εφαρμόστηκε",
    fcDeliverSolutionDesc: "Ανατέθηκε ένα μοναδικό χρώμα σε κάθε προφίλ κατοικιδίου. Κατά τον προγραμματισμό, οι χρήστες μπορούν να επιλέξουν το επιθυμητό κατοικίδιο και να ξεχωρίζουν εύκολα τα ραντεβού με βάση χρωματικές ετικέτες, αρχικά δύο γραμμάτων, ένα προεπιλεγμένο εικονίδιο ή μια μεταφορτωμένη φωτογραφία.",
    fcDeliverKeyTitle: "Βασικός Μετασχηματισμός",
    fcDeliverKeyDesc: "Η αντικατάσταση του κρυφού πλευρικού μενού με μια μόνιμη γραμμή πλοήγησης στο κάτω μέρος διατήρησε ορατούς τους βασικούς προορισμούς, μειώνοντας τη γνωστική τριβή.",
    fcMockupsTitle: "Τελικά UI Mockups",
    fcMockupsDesc: "Σχεδιασμένο με δομημένα στοιχεία Figma και προσβασιμότητα κατά το πρότυπο WCAG AA.",
    fcOnboardingTitle: "Onboarding & Δημιουργία Κατοικιδίου",
    fcOnboardingDesc: "Μια ροή εισόδου χωρίς τριβές με ελκυστικά διαδραστικά στοιχεία.",
    fcDashboardTitle: "Ταμπλό (Dashboard)",
    fcDashboardDesc: "Δίνοντας προτεραιότητα στις πληροφορίες έκτακτης ανάγκης και την προσβασιμότητα.",
    fcProfileTitle: "Προφίλ Κατοικιδίου",
    fcProfileDesc: "Καθαρές διατάξεις δεδομένων για άμεση εύρεση εργαστηριακών εκθέσεων.",
    fcConclusionTitle: "Συμπέρασμα",
    fcConclusionDesc: "Η ανάπτυξη του Fluffy Care απέδειξε ότι ο επιδραστικός σχεδιασμός UX ξεπερνά την καθαρή αισθητική· πρόκειται για τον μετριασμό του άγχους των χρηστών σε στιγμές υψηλού στρες. Μετατρέποντας μια κατακερματισμένη μέθοδο παρακολούθησης σε χαρτί σε ένα κεντρικό ψηφιακό οικοσύστημα, η εφαρμογή γεφυρώνει με επιτυχία το χάσμα μεταξύ της καθημερινής φροντίδας και της ετοιμότητας για καταστάσεις έκτακτης ανάγκης.\n\nΗ βασική επιτυχία αυτού του έργου βασίστηκε στην αποδοχή των πραγματικών δυσκολιών των χρηστών. Η απομάκρυνση από τις αρχικές υποθέσεις απέδειξε ότι ο επαναληπτικός σχεδιασμός είναι απαραίτητος για τη δημιουργία ενός εύχρηστου προϊόντος με επίκεντρο τον χρήστη.",
    fcFooterCopyright: "© 2024 Fluffy Care Case Study. Σχεδιασμένο με ακρίβεια.",
    fcFigmaButton: "Παρουσίαση Figma Slides"
  }
};

export function FluffyCareCaseStudy({ lang, setActiveView, setShowContact }: FluffyCareCaseStudyProps) {
  const [activeSubSection, setActiveSubSection] = useState("overview");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedFlowPath, setSelectedFlowPath] = useState<"register" | "login" | "forgot" | "skip">("register");
  const [activeKeyTransTab, setActiveKeyTransTab] = useState<"home" | "calendar" | "library" | "community" | "map">("home");

  const isAutoScrolling = useRef(false);
  const autoScrollTimeout = useRef<any>(null);

  const fc = fcTranslations[lang];

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["overview", "discover", "define", "develop", "deliver", "mockups", "prototype"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      if (isAutoScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSubSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSubSection = (id: string) => {
    setActiveSubSection(id);
    isAutoScrolling.current = true;
    if (autoScrollTimeout.current) {
      clearTimeout(autoScrollTimeout.current);
    }
    autoScrollTimeout.current = setTimeout(() => {
      isAutoScrolling.current = false;
    }, 1000);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    return () => {
      if (autoScrollTimeout.current) {
        clearTimeout(autoScrollTimeout.current);
      }
    };
  }, []);

  const flowPaths = {
    register: {
      name: lang === "GR" ? "Ροή Εγγραφής" : "Register Path",
      steps: [
        { title: lang === "GR" ? "Άνοιγμα Εφαρμογής" : "Open app", detail: lang === "GR" ? "Εκκίνηση εφαρμογής" : "App initialization" },
        { title: lang === "GR" ? "Διαφάνειες Onboarding" : "Onboarding", detail: lang === "GR" ? "Εισαγωγικά βήματα & καθοδήγηση" : "Intro walkthrough & options" },
        { title: lang === "GR" ? "Σύνδεση / Εγγραφή" : "Login / Register", detail: lang === "GR" ? "Επιλογή: Εγγραφή Νέου Χρήστη" : "Select Register option" },
        { title: lang === "GR" ? "Συμπλήρωση Στοιχείων Προφίλ" : "Fill in profile informations", detail: lang === "GR" ? "Δημιουργία στοιχείων λογαριασμού" : "Account details compilation" },
        { title: lang === "GR" ? "Στοιχεία Κατοικιδίου (Βασικά)" : "Fill in basic pet info", detail: lang === "GR" ? "Όνομα, ηλικία, είδος, φύλο, στείρωση" : "Name, age, species, gender, sterilization stage" },
        { title: lang === "GR" ? "Αρχική Σελίδα (Dashboard)" : "Home page", detail: lang === "GR" ? "Είσοδος στο κεντρικό ταμπλό" : "Navigate to dashboard homepage" },
        { title: lang === "GR" ? "Προσθήκη Προφίλ Κατοικιδίου" : "Add pets profile", detail: lang === "GR" ? "Συμπλήρωση λεπτομερειών κατοικιδίου" : "Fill in pets informations" },
        { title: lang === "GR" ? "Μεταφόρτωση Αρχείων PDF & Φωτο" : "Upload PDF files and photos", detail: lang === "GR" ? "Επισύναψη εγγράφων & αρχείων" : "Attach vaccine passports, PDFs & photos" },
        { title: lang === "GR" ? "Πλήρες Προφίλ Κατοικιδίου" : "Complete pets profile", detail: lang === "GR" ? "Επιτυχής δημιουργία προφίλ!" : "Finalized complete pet profile!" }
      ]
    },
    login: {
      name: lang === "GR" ? "Ροή Σύνδεσης" : "Login Path",
      steps: [
        { title: lang === "GR" ? "Άνοιγμα Εφαρμογής" : "Open app", detail: lang === "GR" ? "Εκκίνηση εφαρμογής" : "App initialization" },
        { title: lang === "GR" ? "Διαφάνειες Onboarding" : "Onboarding", detail: lang === "GR" ? "Εισαγωγικά βήματα" : "Intro walkthrough" },
        { title: lang === "GR" ? "Σύνδεση / Εγγραφή" : "Login / Register", detail: lang === "GR" ? "Επιλογή: Σύνδεση (Login)" : "Select Login option" },
        { title: lang === "GR" ? "Αρχική Σελίδα (Dashboard)" : "Home page", detail: lang === "GR" ? "Είσοδος στο κεντρικό ταμπλό" : "Navigate to homepage" },
        { title: lang === "GR" ? "Επιλογή Προφίλ Κατοικιδίου" : "Choose pets profile", detail: lang === "GR" ? "Φόρτωση υπάρχοντος προφίλ" : "Select corresponding stored pet profile" },
        { title: lang === "GR" ? "Μεταφόρτωση Αρχείων PDF & Φωτο" : "Upload PDF files and photos", detail: lang === "GR" ? "Επισύναψη νέων εγγράφων" : "Attach clinical logs, PDFs & photos" },
        { title: lang === "GR" ? "Πλήρες Προφίλ Κατοικιδίου" : "Complete pets profile", detail: lang === "GR" ? "Επιτυχής ολοκλήρωση!" : "Finalized profile setup!" }
      ]
    },
    forgot: {
      name: lang === "GR" ? "Επαναφορά Κωδικού" : "Forgot Password Path",
      steps: [
        { title: lang === "GR" ? "Άνοιγμα Εφαρμογής" : "Open app", detail: lang === "GR" ? "Εκκίνηση" : "App initialization" },
        { title: lang === "GR" ? "Διαφάνειες Onboarding" : "Onboarding", detail: lang === "GR" ? "Εισαγωγικά βήματα" : "Intro walkthrough" },
        { title: lang === "GR" ? "Σύνδεση / Εγγραφή" : "Login / Register", detail: lang === "GR" ? "Επιλογή: Forgot Password" : "Click Forgot Password link" },
        { title: lang === "GR" ? "Επαναφορά Κωδικού" : "Reset password", detail: lang === "GR" ? "Αποστολή κωδικού & επιστροφή στη Σύνδεση" : "Input email, send instructions, return to login template" },
        { title: lang === "GR" ? "Σύνδεση / Εγγραφή" : "Login / Register", detail: lang === "GR" ? "Σύνδεση με το νέο κωδικό" : "Authenticate with temporary reset secret" },
        { title: lang === "GR" ? "Αρχική Σελίδα (Dashboard)" : "Home page", detail: lang === "GR" ? "Είσοδος στο κεντρικό ταμπλό" : "Navigate to homepage" },
        { title: lang === "GR" ? "Επιλογή Προφίλ Κατοικιδίου" : "Choose pets profile", detail: lang === "GR" ? "Φόρτωση υπάρχοντος προφίλ" : "Select corresponding stored pet profile" },
        { title: lang === "GR" ? "Μεταφόρτωση Αρχείων PDF & Φωτο" : "Upload PDF files and photos", detail: lang === "GR" ? "Προσθήκη εγγράφων" : "Attach vaccine passports, PDFs & photos" },
        { title: lang === "GR" ? "Πλήρες Προφίλ Κατοικιδίου" : "Complete pets profile", detail: lang === "GR" ? "Ολοκλήρωση!" : "Finalized setup!" }
      ]
    },
    skip: {
      name: lang === "GR" ? "Παράλειψη Onboarding" : "Skip Onboarding Path",
      steps: [
        { title: lang === "GR" ? "Άνοιγμα Εφαρμογής" : "Open app", detail: lang === "GR" ? "Εκκίνηση" : "App initialization" },
        { title: lang === "GR" ? "Διαφάνειες Onboarding" : "Onboarding", detail: lang === "GR" ? "Επιλογή: Παράλειψη (Skip)" : "Select Skip action link" },
        { title: lang === "GR" ? "Σύνδεση / Εγγραφή" : "Login / Register", detail: lang === "GR" ? "Μετάβαση απευθείας στη φόρμα" : "Bypass onboarding slide directly" },
        { title: lang === "GR" ? "Συμπλήρωση Στοιχείων Προφίλ" : "Fill in profile informations", detail: lang === "GR" ? "Καταγραφή στοιχείων" : "Owner basic details" },
        { title: lang === "GR" ? "Στοιχεία Κατοικιδίου (Βασικά)" : "Fill in basic pet info", detail: lang === "GR" ? "Όνομα, ηλικία, είδος, φύλο, στείρωση" : "Name, age, species, gender, sterilization stage" },
        { title: lang === "GR" ? "Αρχική Σελίδα (Dashboard)" : "Home page", detail: lang === "GR" ? "Είσοδος στο κεντρικό ταμπλό" : "Navigate to homepage" },
        { title: lang === "GR" ? "Επιλογή Προφίλ Κατοικιδίου" : "Choose pets profile", detail: lang === "GR" ? "Ή επιλογή προσθήκης" : "Select or add clinical assets list" },
        { title: lang === "GR" ? "Μεταφόρτωση Αρχείων PDF & Φωτο" : "Upload PDF files and photos", detail: lang === "GR" ? "Επισύναψη εγγράφων" : "Vaccines, PDFs & photos" },
        { title: lang === "GR" ? "Πλήρες Προφίλ Κατοικιδίου" : "Complete pets profile", detail: lang === "GR" ? "Ολοκλήρωση!" : "Finalized set!" }
      ]
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen relative font-sans flex flex-col">
      
      {/* Scroll Progress Bar */}
      <div 
        className="hidden md:block fixed top-[72px] left-0 h-[3.5px] bg-pet-teal z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Fluffy Care Specific Secondary Sticky Navigation */}
      <div className="hidden md:flex sticky top-[72px] left-0 w-full z-30 bg-surface-container-low border-b border-outline-variant py-2.5 px-6 md:px-12 justify-between items-center overflow-x-auto gap-4">
        <button 
          onClick={() => { setActiveView("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="flex items-center gap-1.5 text-xs font-bold text-pet-teal hover:underline uppercase tracking-wider cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === "GR" ? "Πίσω στα Έργα" : "Back to Projects"}</span>
        </button>
        
        <div className="flex gap-4 md:gap-8 items-center text-xs font-semibold shrink-0">
          <button 
            onClick={() => scrollToSubSection("overview")}
            className={`cursor-pointer transition-all ${activeSubSection === "overview" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "Επισκόπηση" : "Overview"}
          </button>
          <button 
            onClick={() => scrollToSubSection("discover")}
            className={`cursor-pointer transition-all ${activeSubSection === "discover" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "Ανακάλυψη" : "Discover"}
          </button>
          <button 
            onClick={() => scrollToSubSection("define")}
            className={`cursor-pointer transition-all ${activeSubSection === "define" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "Ορισμός" : "Define"}
          </button>
          <button 
            onClick={() => scrollToSubSection("develop")}
            className={`cursor-pointer transition-all ${activeSubSection === "develop" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "Ανάπτυξη" : "Develop"}
          </button>
          <button 
            onClick={() => scrollToSubSection("deliver")}
            className={`cursor-pointer transition-all ${activeSubSection === "deliver" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "Παράδοση" : "Deliver"}
          </button>
          <button 
            onClick={() => scrollToSubSection("mockups")}
            className={`cursor-pointer transition-all ${activeSubSection === "mockups" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "UI Mockups" : "UI Mockups"}
          </button>
          <button 
            onClick={() => scrollToSubSection("prototype")}
            className={`cursor-pointer transition-all ${activeSubSection === "prototype" ? "text-primary border-b-2 border-primary pb-0.5 font-bold" : "text-on-surface-variant hover:text-primary"}`}
          >
            {lang === "GR" ? "Πρωτότυπο" : "Prototype"}
          </button>
        </div>
      </div>

      {/* ==================== 1. HERO SECTION ==================== */}
      <section id="overview" className="scroll-mt-[130px] min-h-[700px] py-16 md:py-24 px-6 md:px-12 bg-white relative overflow-hidden text-left">
        {/* Soft Glowing Background Orbs */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-12 w-80 h-80 bg-pet-teal/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-pet-teal uppercase tracking-widest bg-pet-teal/10 px-3 py-1.5 rounded-full border border-pet-teal/20 inline-block">
              {fc.fcTag}
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-sm font-extrabold text-on-surface tracking-tight leading-[1.1]">
              {fc.fcHeroTitle} <span className="text-pet-teal block md:inline">{fc.fcHeroSubtitle}</span>
            </h1>

            <p className="text-sm sm:text-base md:text-md text-on-surface-variant leading-relaxed max-w-2xl font-sans font-medium">
              {fc.fcHeroDesc}
            </p>

            {/* Figma Slides Presentation Link */}
            <div className="flex flex-wrap gap-4 pt-1 pb-3">
              <a 
                href="https://www.figma.com/slides/AFWSIz8nNafaw5PA0k3yIQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-pure-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer group"
                id="figma-case-study-button"
              >
                <img 
                  src="assets/figma.png" 
                  alt="Figma Logo" 
                  className="w-4 h-auto shrink-0 transition-transform duration-200 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <span className="text-pure-white">{fc.fcFigmaButton}</span>
                <ExternalLink className="w-4 h-4 text-pure-white stroke-[2.5]" />
              </a>
            </div>

            {/* Aha card representation */}
            <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant flex gap-4 items-start shadow-sm max-w-2xl">
              <div className="w-10 h-10 bg-pet-teal/15 rounded-xl flex items-center justify-center shrink-0 text-pet-teal">
                <Lightbulb className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-on-surface uppercase tracking-wider">
                  {fc.fcAhaTitle}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-sans font-medium">
                  {fc.fcAhaDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Hero smartphone mockup */}
          <div className="lg:col-span-5 flex justify-center relative" id="iphone-17-pro-preview-container">
            {/* Outer wrapper with side buttons simulating iPhone 17 Pro */}
            <div className="relative w-full max-w-[320px] transform rotate-2 hover:rotate-0 transition-all duration-500 scale-100 hover:scale-[1.02]">
              {/* Left Side Buttons (Volume & Action Button) */}
              <div className="absolute top-24 -left-1.5 w-1.5 h-6 bg-neutral-800 rounded-l-md z-0 shadow-sm"></div>
              <div className="absolute top-36 -left-1.5 w-1.5 h-12 bg-neutral-800 rounded-l-md z-0 shadow-sm"></div>
              <div className="absolute top-52 -left-1.5 w-1.5 h-12 bg-neutral-800 rounded-l-md z-0 shadow-sm"></div>
              
              {/* Right Side Buttons (Power & Camera Control) */}
              <div className="absolute top-32 -right-1.5 w-1.5 h-16 bg-neutral-800 rounded-r-md z-0 shadow-sm"></div>
              <div className="absolute top-64 -right-1.5 w-1.5 h-10 bg-neutral-800 rounded-r-md z-0 shadow-sm"></div>

              {/* iPhone Core Body Frame with titanium bezel & fine border */}
              <div className="relative w-full aspect-[9/19] bg-neutral-950 rounded-[52px] p-[10px] border-[5px] border-neutral-700/80 shadow-2xl shadow-black/40 ring-4 ring-neutral-900">
                {/* Screen bezel overlay/highlight */}
                <div className="absolute inset-[3px] rounded-[48px] border border-white/10 pointer-events-none z-30"></div>
                
                {/* Dynamic Island (Pill Cutout with subtle sensor circles) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3.5 shadow-inner">
                  {/* Camera lens circle reflection */}
                  <span className="w-2.5 h-2.5 rounded-full bg-[#081016] border border-neutral-900 flex items-center justify-center relative">
                    <span className="w-1 h-1 rounded-full bg-blue-900/40 absolute"></span>
                  </span>
                  {/* Ambient indicator dot */}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/20 shadow-sm"></span>
                </div>

                {/* Simulated Screen Area with exact rounded border */}
                <div className="overflow-hidden rounded-[42px] w-full h-full relative bg-neutral-900 z-10">
                  <img 
                    src="/assets/Onboarding - choose pet.png"
                    alt="Fluffy Care Mobile App Mockup Preview on iPhone 17 Pro" 
                    className="w-full h-full object-cover select-none" 
                    referrerPolicy="no-referrer"
                    id="iphone-mockup-main-image"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== DESIGN METHODOLOGY STRATEGY ==================== */}
      <section className="py-20 px-6 md:px-12 bg-surface border-y border-outline-variant text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold text-secondary uppercase tracking-wider block">
              {lang === "GR" ? "Μεθοδολογία" : "Execution Framework"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight leading-none font-sans">
              {fc.fcStrategyTitle}
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-sans font-medium">
              {fc.fcStrategyDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: "discover", no: "1", title: lang === "GR" ? "1. Ανακάλυψη" : "1. Discover", desc: lang === "GR" ? "Έρευνα Χρηστών & Insight" : "User Research & Inquiries", color: "bg-pet-teal/15 text-pet-teal" },
              { id: "define", no: "2", title: lang === "GR" ? "2. Ορισμός" : "2. Define", desc: lang === "GR" ? "Σύνθεση αποτελεσμάτων" : "Synthesizing Research", color: "bg-secondary/15 text-secondary" },
              { id: "develop", no: "3", title: lang === "GR" ? "3. Ανάπτυξη" : "3. Develop", desc: lang === "GR" ? "Ιδεασμός & Αρχιτεκτονική" : "Ideation & Architecture", color: "bg-yellow-500/15 text-yellow-600" },
              { id: "deliver", no: "4", title: lang === "GR" ? "4. Παράδοση" : "4. Deliver", desc: lang === "GR" ? "Επικύρωση & Iteration" : "Validation & Usability", color: "bg-emerald-500/15 text-emerald-700" }
            ].map((d) => (
              <div 
                key={d.no}
                onClick={() => scrollToSubSection(d.id)}
                className="group p-8 bg-white rounded-2xl border border-outline-variant hover:border-pet-teal hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-xl mb-6 shadow-sm ${d.color}`}>
                    {d.no}
                  </div>
                  <h3 className="font-extrabold text-base text-on-surface group-hover:text-pet-teal transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed mt-2 font-sans font-medium">
                    {d.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs text-pet-teal font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{lang === "GR" ? "Μετάβαση" : "Scroll To Section"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STAGE 1: DISCOVER ==================== */}
      <section id="discover" className="scroll-mt-[130px] py-20 px-6 md:px-12 bg-white text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Dynamic Header & Research Metrics row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Stage 1
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-sans">
                {fc.fcDiscoverTitle}
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-sans font-medium">
                {fc.fcDiscoverDesc}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 bg-surface rounded-xl border border-outline-variant space-y-3">
                <h4 className="text-xs font-bold text-on-surface uppercase tracking-wide">
                  {lang === "GR" ? "Μέθοδοι Έρευνας" : "Research Strategy Metrics"}
                </h4>
                <ul className="text-xs text-on-surface-variant space-y-2.5 font-sans font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-pet-teal shrink-0" />
                    <span>{lang === "GR" ? "4 Ποιοτικές συνεντεύξεις χρηστών" : "4 Qualitative user interviews"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-pet-teal shrink-0" />
                    <span>{lang === "GR" ? "Έρευνα ανταγωνισμού (3 ανταγωνιστές)" : "Competitive audits of 3 platforms"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-pet-teal shrink-0" />
                    <span>{lang === "GR" ? "Ανάλυση προτύπων ποιότητας κλινικών" : "Clinical data flow & audit compliance"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* In-depth insights card spanning full-width */}
          <div className="p-8 bg-pet-teal rounded-2xl border border-black/10 dark:border-white/10 space-y-6 text-pure-white">
            <h3 className="text-xs font-bold text-pure-white uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4 text-pure-white" />
              <span>{fc.fcInsightsTitle}</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 border-l-2 border-white/40 pl-4">
                <h4 className="text-sm font-bold text-pure-white">
                  {fc.fcInsight1Title}
                </h4>
                <p className="text-xs text-pure-white/95 font-sans leading-relaxed">
                  {fc.fcInsight1Desc}
                </p>
              </div>

              <div className="space-y-2 border-l-2 border-white/30 pl-4">
                <h4 className="text-sm font-bold text-pure-white">
                  {fc.fcInsight2Title}
                </h4>
                <p className="text-xs text-pure-white/95 font-sans leading-relaxed">
                  {fc.fcInsight2Desc}
                </p>
              </div>
            </div>
          </div>

          {/* Elegant full-width grid of 5 cards with ample spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                label: lang === "GR" ? "Τι;" : "What?", 
                fullText: lang === "GR" 
                  ? "Μια εφαρμογή διαχείρισης κατοικιδίων που απλοποιεί τον προγραμματισμό ραντεβού και την παρακολούθηση του ιατρικού ιστορικού για τους ιδιοκτήτες κατοικιδίων." 
                  : "A pet management app that simplifies appointment scheduling and medical history tracking for pet owners." 
              },
              { 
                label: lang === "GR" ? "Πού;" : "Where?", 
                fullText: lang === "GR"
                  ? "Μια mobile-first εφαρμογή σχεδιασμένη για τη βελτιστοποίηση της παρακολούθησης της υγείας των κατοικιδίων και των υπενθυμίσεων ραντεβού, τόσο στο σπίτι όσο και εν κινήσει."
                  : "A mobile-first application designed to optimize pet health tracking and appointment reminders both at home and on the go."
              },
              { 
                label: lang === "GR" ? "Γιατί;" : "Why?", 
                fullText: lang === "GR"
                  ? "Προκειμένου να υπάρχει συνέπεια με τις ανάγκες του κατοικιδίου και τη φροντίδα της υγείας του."
                  : "In order to be consistent with his pet needs and health care."
              },
              { 
                label: lang === "GR" ? "Πότε;" : "When?", 
                fullText: lang === "GR"
                  ? "Όποτε ένας ιδιοκτήτης κατοικιδίου επισκέπτεται τον κτηνίατρο, όταν πρέπει να θυμηθεί ένα ραντεβού ή για να ελέγξει/τροποποιήσει το ιατρικό ιστορικό του κατοικιδίου του."
                  : "Anytime a pet owner visits the vet, when he needs to remember an appointment, or to check/alter their pet’s medical history"
              },
              { 
                label: lang === "GR" ? "Πώς;" : "How?", 
                fullText: lang === "GR"
                  ? "Οι χρήστες θα μπορούν να βλέπουν και να επεξεργάζονται ραντεβού και ιατρικά αρχεία χωρίς σύνδεση στο διαδίκτυο, αλλά ορισμένες λειτουργίες θα απαιτούν σύνδεση."
                  : "Users will be able to view and edit appointments and medical records without an internet connection, but some feature will require online access."
              }
            ].map((box, i) => (
              <div key={i} className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex flex-col justify-start items-stretch h-full hover:border-[#2A7B88]/30 hover:shadow-sm transition-all duration-300">
                <span className="text-[10px] uppercase font-extrabold text-[#2A7B88] tracking-wider mb-4 block border-b border-outline-variant/30 pb-2">{box.label}</span>
                <p className="text-xs text-on-surface-variant font-sans font-medium leading-relaxed">{box.fullText}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== STAGE 2: DEFINE ==================== */}
      <section id="define" className="scroll-mt-[130px] py-20 px-6 md:px-12 bg-surface-container-low border-y border-outline-variant text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header & Problem Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Stage 2
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-sans">
                {fc.fcDefineTitle}
              </h2>
              <p className="text-sm text-on-surface-variant font-sans font-medium leading-relaxed">
                {lang === "GR" 
                  ? "Καθορίζοντας το κεντρικό πρόβλημα, καταλήγουμε σε μια δήλωση προβλήματος που καθοδηγεί κάθε σχεδιαστική απόφαση, διασφαλίζοντας την ευθυγράμμιση με τις ανάγκες των χρηστών."
                  : "By syntesizing discovery research, I formulated an actionable problem statement that serves as a guide for engineering the client interfaces."}
              </p>
            </div>

            <div className="lg:col-span-7 bg-[#2A7B88] text-pure-white p-6 md:p-8 rounded-2xl border-2 border-primary shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-pure-white/80 block mb-2.5">
                {lang === "GR" ? "ΔΗΛΩΣΗ ΠΡΟΒΛΗΜΑΤΟΣ (Problem Statement)" : "User Problem Statement"}
              </span>
              <p className="text-base font-medium leading-relaxed tracking-tight italic">
                "{fc.fcProblemStatement}"
              </p>
            </div>
          </div>

          {/* User Persona Section */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-wider text-left">
              {fc.fcPersonasTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  name: lang === "GR" ? "Ρόμπιν (Robin)" : "Robin", 
                  sub: fc.fcPersonaLucySub, 
                  img: "/assets/robin persona.png",
                  pain: fc.fcPersonaLucyPain,
                  goal: lang === "GR" ? "Θέλει μια αξιόπιστη, οργανωμένη πλατφόρμα που τη βοηθά να διαχειρίζεται με σιγουριά τις καθημερινές ρουτίνες υγείας και τα συμπτώματα της νέας της γάτας χωρίς να αισθάνεται συγκλονισμένη από τις πληροφορίες." : "Wants a trustworthy, organized platform that helps her confidently manage her new cat's healthcare routines and symptoms without feeling overwhelmed by information."
                },
                { 
                  name: lang === "GR" ? "Νίκος (Nick)" : "Nick", 
                  sub: fc.fcPersonaNickSub, 
                  img: "/assets/nick persona.png",
                  pain: fc.fcPersonaNickPain,
                  goal: lang === "GR" ? "Θέλει μια κοινή, συνεργατική πλατφόρμα που θα επιτρέπει στον ίδιο και τη σύζυγό του να συντονίζουν αβίαστα τα προγράμματα και να παρακολουθούν ξεχωριστά ιατρικά ιστορικά για τα δύο κατοικίδιά τους χωρίς κενά επικοινωνίας." : "Wants a shared, collaborative platform that allows him and his wife to effortlessly coordinate schedules and track separate medical histories for their two pets without communication gaps."
                },
                { 
                  name: lang === "GR" ? "Άρια (Aria)" : "Aria", 
                  sub: fc.fcPersonaAriaSub, 
                  img: "/assets/aria persona.png",
                  pain: fc.fcPersonaAriaPain,
                  goal: lang === "GR" ? "Θέλει μια παγκοσμίως προσβάσιμη πλατφόρμα που συγκεντρώνει τα ιατρικά αρχεία και τα ταξιδιωτικά έγγραφα του σκύλου της, βοηθώντας την να βρίσκει με σιγουρία αξιόπιστες υπηρεσίες κατοικιδίων και να διαχειρίζεται τις απαιτήσεις υγείας της κατά τη διάρκεια του ταξιδιού." : "Wants a globally accessible platform that centralizes her dog's medical records and travel documents, helping her confidently find trusted pet services and manage health requirements while traveling."
                }
              ].map((p, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-outline-variant t-elevation flex flex-col h-full hover:border-[#2A7B88] transition-all justify-between">
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/30">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-subtle border border-outline-variant shrink-0">
                        <img 
                          src={p.img} 
                          alt={`${p.name} Portrait Avatar`} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-on-surface leading-none">{p.name}</h4>
                        <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mt-1 leading-none">{p.sub}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between pt-4 gap-4">
                      <div className="space-y-1">
                        <strong className="text-on-surface block text-[10px] uppercase font-bold tracking-wider">{lang === "GR" ? "ΣΗΜΕΙΟ ΠΟΝΟΥ" : "Pain Point"}</strong>
                        <p className="text-xs text-on-surface-variant font-sans leading-relaxed md:min-h-[44px] flex items-start">
                          {p.pain}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <strong className="text-on-surface block text-[10px] uppercase font-bold tracking-wider">{lang === "GR" ? "ΒΑΣΙΚΟΣ ΣΤΟΧΟΣ (Key Goal)" : "Desired Outcome"}</strong>
                        <p className="text-xs text-on-surface-variant font-sans leading-relaxed md:min-h-[110px] flex items-start">
                          {p.goal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==================== STAGE 3: DEVELOP ==================== */}
      <section id="develop" className="scroll-mt-[130px] py-20 px-6 md:px-12 bg-white text-left animate-fadeIn">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="space-y-6 max-w-none">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
              Stage 3
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-sans">
              {fc.fcDevelopTitle}
            </h2>
            <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-sans">
              {fc.fcDevelopDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "01", val: fc.fcDevelopItem1 },
              { label: "02", val: fc.fcDevelopItem2 },
              { label: "03", val: fc.fcDevelopItem3 },
              { label: "04", val: fc.fcDevelopItem4 },
              { label: "05", val: fc.fcDevelopItem5 },
              { label: "06", val: fc.fcDevelopItem6 }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center p-4 bg-surface rounded-xl border border-outline-variant select-none cursor-default">
                <div className="w-8 h-8 rounded-lg bg-pet-teal/10 text-pet-teal flex items-center justify-center font-extrabold text-xs shrink-0">
                  {item.label}
                </div>
                <span className="text-xs font-bold text-on-surface font-sans">
                  {item.val}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full">
            {/* Diagram Part 1: User Pathways */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant space-y-6 flex flex-col justify-between w-full">
              <div>
                <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-4">
                  <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4 text-pet-teal" />
                    <span>{fc.fcFlowTitle}</span>
                  </h3>
                  <span className="text-[10px] font-bold text-[#5C6BC0] uppercase bg-[#5C6BC0]/5 px-2.5 py-1 rounded-full shadow-xs border border-[#5C6BC0]/20">
                    {lang === "GR" ? "Διάγραμμα Ροής" : "Flow Diagram"}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-extrabold uppercase text-on-surface-variant tracking-wider">
                    {lang === "GR" ? "Επιλογή Διαδρομής Χρήστη" : "Choose User Pathway"}
                  </h4>
                  
                  {/* Pathway pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "register", label: lang === "GR" ? "Εγγραφή & Ζώο" : "Register Path" },
                      { id: "login", label: lang === "GR" ? "Απευθείας Σύνδεση" : "Direct Login" },
                      { id: "forgot", label: lang === "GR" ? "Ξέχασα τον Κωδικό" : "Forgot Password" },
                      { id: "skip", label: lang === "GR" ? "Παράλειψη " : "Skip Onboarding" }
                    ].map((path) => (
                      <button
                        key={path.id}
                        onClick={() => setSelectedFlowPath(path.id as any)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border transition-all flex items-center justify-center text-center leading-tight min-h-[44px] ${
                          selectedFlowPath === path.id
                            ? "bg-pet-teal text-pure-white border-pet-teal shadow-xs"
                            : "bg-white text-on-surface-variant hover:bg-surface border-outline-variant"
                        }`}
                      >
                        {path.label}
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#5C6BC0]/5 border border-[#5C6BC0]/20 p-3 rounded-xl mt-2 shadow-xs">
                    <span className="text-[9px] uppercase font-extrabold text-[#5C6BC0] tracking-wider block">
                      {lang === "GR" ? "ΔΟΜΗ ΡΟΗΣ" : "CORE FLOW STRUCTURE"}
                    </span>
                    <span className="text-[11px] font-extrabold text-[#5C6BC0] block select-none">
                      {lang === "GR" ? "ΔΗΜΙΟΥΡΓΙΑ ΛΟΓΑΡΙΑΣΜΟΥ / ΣΥΝΔΕΣΗ" : "CREATE AN ACCOUNT / LOGIN"}
                    </span>
                  </div>

                  {/* Vertical timeline steps */}
                  <div className="space-y-3 pt-2 max-h-[380px] overflow-y-auto pr-1">
                    {flowPaths[selectedFlowPath].steps.map((step, idx) => {
                      const isDecisionNode = step.title.includes("?") || step.title.includes("/") || step.title.toLowerCase().includes("onboarding") || step.title.toLowerCase().includes("register");
                      return (
                        <div key={idx} className="relative pl-7 pb-4 last:pb-1 text-left">
                          {/* Connecting vertical line */}
                          {idx < flowPaths[selectedFlowPath].steps.length - 1 && (
                            <div className="absolute left-[9px] top-4 bottom-0 w-0.5 bg-outline-variant/60" />
                          )}
                          
                          {/* Custom shaped bullet node */}
                          <div className={`absolute left-0 top-1.5 w-[20px] h-[20px] flex items-center justify-center transition-all ${
                            idx === 0 
                              ? "bg-[#9E6335] rounded-full shadow-xs text-pure-white text-[9px] font-bold" 
                              : idx === flowPaths[selectedFlowPath].steps.length - 1
                              ? "bg-[#2A7B88] rounded-full shadow-xs text-pure-white animate-pulse"
                              : isDecisionNode
                              ? "bg-[#9E6335] rotate-45 border border-pure-white text-pure-white shadow-xs"
                              : "bg-white border-2 border-pet-teal rounded-lg"
                          }`} style={{ width: "19px", height: "19px" }}>
                            {idx === 0 ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-pure-white" />
                            ) : idx === flowPaths[selectedFlowPath].steps.length - 1 ? (
                              <CheckCircle className="w-2.5 h-2.5 text-pure-white shrink-0" />
                            ) : isDecisionNode ? (
                              <div className="w-1 h-1 bg-pure-white shrink-0 -rotate-45" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-pet-teal" />
                            )}
                          </div>

                          {/* Node Card details */}
                          <div className="bg-white p-3 rounded-xl border border-outline-variant hover:border-pet-teal/30 hover:shadow-xs transition-all duration-300">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs font-extrabold text-on-surface leading-tight font-sans">
                                {step.title}
                              </h4>
                              {isDecisionNode && (
                                <span className="text-xs bg-[#5C6BC0]/5 font-extrabold text-[#5C6BC0] px-1.5 py-0.5 rounded border border-[#5C6BC0]/20 select-none uppercase">
                                  {lang === "GR" ? "Διακλάδωση" : "Branch"}
                                </span>
                              )}
                            </div>
                            {step.detail && (
                              <p className="text-xs text-on-surface-variant font-sans font-medium mt-0.5 leading-relaxed">
                                {step.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Diagram Part 2: Register Pet Appointment Flow (From uploaded picture) */}
            <div className="bg-surface-container-low p-6 md:p-8 rounded-2xl border border-outline-variant space-y-6 flex flex-col justify-between w-full">
              <div>
                <div className="flex justify-between items-center border-b border-outline-variant pb-4 mb-4">
                  <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-pet-teal" />
                    <span>{lang === "GR" ? "Εγγραφή Ραντεβού" : "Register Pet Appointment"}</span>
                  </h3>
                  <span className="text-xs font-bold text-[#5C6BC0] uppercase bg-[#5C6BC0]/5 px-2.5 py-1 rounded-full shadow-xs border border-[#5C6BC0]/20">
                    {lang === "GR" ? "Διάγραμμα Ροής" : "Flow Diagram"}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase text-on-surface-variant tracking-wider">
                    {lang === "GR" ? "Βήματα Ροής Ραντεβού" : "Appointment Flow Steps"}
                  </h4>

                  <div className="bg-[#5C6BC0]/5 border border-[#5C6BC0]/20 p-3 rounded-xl mt-2 shadow-xs">
                    <span className="text-xs uppercase font-extrabold text-[#5C6BC0] tracking-wider block">
                      {lang === "GR" ? "ΔΟΜΗ ΡΟΗΣ" : "CORE FLOW STRUCTURE"}
                    </span>
                    <span className="text-xs font-extrabold text-[#5C6BC0] block select-none">
                      {lang === "GR" ? "ΕΓΓΡΑΦΗ ΡΑΝΤΕΒΟΥ" : "REGISTER APPOINTMENT"}
                    </span>
                  </div>

                  {/* Appointment Steps list representation matching original card */}
                  <div className="space-y-3 pt-2 max-h-[380px] overflow-y-auto pr-1">
                    {[
                      { 
                        title: lang === "GR" ? "Αρχική Σελίδα (Home page)" : "Home page", 
                        detail: lang === "GR" ? "Έναρξη διαδικασίας από την αρχική οθόνη" : "Start node on the dashboard home segment" 
                      },
                      { 
                        title: lang === "GR" ? "Ημερολόγιο (Calendar)" : "Calendar", 
                        detail: lang === "GR" ? "Επιλογή ημέρας & ώρας για το ραντεβού (Choose day & time)" : "Select desired available slot and practitioner" 
                      },
                      { 
                        title: lang === "GR" ? "Στοιχεία Ραντεβού" : "Put appointment info", 
                        detail: lang === "GR" ? "Συμπλήρωση πληροφοριών επίσκεψης" : "Fill in clinic name, address, and visit details" 
                      },
                      { 
                        title: lang === "GR" ? "Ορισμός Υπενθυμίσεων" : "Set reminders", 
                        detail: lang === "GR" ? "Ρύθμιση ειδοποιήσεων push notifications" : "Set automatic calendar invites & push triggers" 
                      },
                      { 
                        title: lang === "GR" ? "Εξατομίκευση" : "Personalisation", 
                        detail: lang === "GR" ? "Σύνδεση με το κατάλληλο κατοικίδιο" : "Select corresponding pet profile & tag colors" 
                      },
                      { 
                        title: lang === "GR" ? "Σημειώσεις" : "Take notes", 
                        detail: lang === "GR" ? "Προσθήκη συμπτωμάτων & ιατρικών παρατηρήσεων" : "Add description, preparation logs or medical docs" 
                      },
                      { 
                        title: lang === "GR" ? "Αρχική Σελίδα (Home page)" : "Home page", 
                        detail: lang === "GR" ? "Επιτυχής ολοκλήρωση & επιστροφή στο ταμπλό" : "End node. Successfully saved to local device!" 
                      }
                    ].map((step, idx, arr) => {
                      const isCalendarNode = step.title.toLowerCase().includes("calendar") || step.title.toLowerCase().includes("ημερολόγιο");
                      return (
                        <div key={idx} className="relative pl-7 pb-4 last:pb-1 text-left">
                          {/* Connecting vertical line */}
                          {idx < arr.length - 1 && (
                            <div className="absolute left-[9px] top-4 bottom-0 w-0.5 bg-outline-variant/60" />
                          )}
                          
                          {/* Custom shaped bullet node */}
                          <div className={`absolute left-0 top-1.5 w-[20px] h-[20px] flex items-center justify-center transition-all ${
                            idx === 0 
                              ? "bg-[#9E6335] rounded-full shadow-xs text-pure-white text-xs font-bold" 
                              : idx === arr.length - 1
                              ? "bg-[#2A7B88] rounded-full shadow-xs text-pure-white animate-pulse"
                              : isCalendarNode
                              ? "bg-[#9E6335] rotate-45 border border-pure-white text-pure-white shadow-xs"
                              : "bg-white border-2 border-pet-teal rounded-lg"
                          }`} style={{ width: "19px", height: "19px" }}>
                            {idx === 0 ? (
                              <div className="w-1.5 h-1.5 rounded-full bg-pure-white" />
                            ) : idx === arr.length - 1 ? (
                              <CheckCircle className="w-2.5 h-2.5 text-pure-white shrink-0" />
                            ) : isCalendarNode ? (
                              <div className="w-1 h-1 bg-pure-white shrink-0 -rotate-45" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-pet-teal" />
                            )}
                          </div>

                          {/* Node Card details */}
                          <div className="bg-white p-3 rounded-xl border border-outline-variant hover:border-pet-teal/30 hover:shadow-xs transition-all duration-300">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-xs font-extrabold text-on-surface leading-tight font-sans">
                                {step.title}
                              </h4>
                              {isCalendarNode && (
                                <span className="text-xs bg-[#5C6BC0]/5 font-extrabold text-[#5C6BC0] px-1.5 py-0.5 rounded border border-[#5C6BC0]/20 select-none uppercase">
                                  {lang === "GR" ? "Επιλογή" : "Choice"}
                                </span>
                              )}
                            </div>
                            {step.detail && (
                              <p className="text-xs text-on-surface-variant font-sans font-medium mt-0.5 leading-relaxed">
                                {step.detail}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STAGE 4: DELIVER & VALIDATE ==================== */}
      <section id="deliver" className="scroll-mt-[130px] py-20 px-6 md:px-12 bg-surface-container-low border-y border-outline-variant text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest block">
                Stage 4
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface tracking-tight font-sans">
                {fc.fcDeliverTitle}
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed font-sans font-medium">
                {fc.fcDeliverDesc}
              </p>
            </div>

            {/* Stats boxes */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-xl border border-outline-variant text-center">
                <span className="block text-3xl font-extrabold text-[#2A7B88]">4</span>
                <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider block mt-1">
                  {fc.fcDeliverParticipants}
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-outline-variant text-center">
                <span className="block text-3xl font-extrabold text-emerald-600">100%</span>
                <span className="text-xs text-on-surface-variant uppercase font-bold tracking-wider block mt-1">
                  {fc.fcDeliverSuccess}
                </span>
              </div>
            </div>
          </div>

          {/* Validation details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            
            {/* Critical Flaw Card */}
            <div className="p-6 bg-[#ffdad6] border border-[#ffb4ab] rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#ffb4ab] text-red-950 flex items-center justify-center font-bold text-sm shrink-0">
                    !
                  </div>
                  <h4 className="text-sm font-extrabold text-red-950 uppercase tracking-wide">
                    {fc.fcDeliverFlawTitle}
                  </h4>
                </div>
                
                <p className="text-xs sm:text-sm text-red-950 leading-relaxed italic font-medium font-sans bg-[#ffffff]/40 p-3.5 rounded-lg border border-red-200">
                  {fc.fcDeliverFlawQuote}
                </p>
              </div>

              {/* Solution Card nested inside */}
              <div className="mt-6 p-4 bg-[#ffffff]/90 rounded-xl border border-[#ffb4ab]/50 space-y-1.5">
                <span className="text-xs font-extrabold text-[#2A7B88] uppercase tracking-wide">
                  {fc.fcDeliverSolutionTitle}
                </span>
                <p className="text-xs text-[#3f484a] leading-relaxed font-sans font-medium">
                  {fc.fcDeliverSolutionDesc}
                </p>
              </div>
            </div>

            {/* Key Transformation box */}
            <div className="p-6 bg-white rounded-2xl border border-outline-variant flex flex-col justify-between">
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <h4 className="text-sm font-extrabold text-on-surface uppercase tracking-wide">
                    {fc.fcDeliverKeyTitle}
                  </h4>
                </div>
                
                {/* Visual conversion simulation */}
                <div className="flex items-center gap-4 py-3 text-xs font-mono font-bold justify-center bg-surface rounded-xl border border-outline-variant select-none">
                  <span className="text-on-surface-variant line-through opacity-65 bg-white/50 px-3 py-1.5 rounded border border-outline-variant">
                    {lang === "GR" ? "Κρυφό Μενού" : "Hamburger Menu"}
                  </span>
                  <ChevronRight className="w-4 h-4 text-pet-teal shrink-0" />
                  <span className="text-pure-white bg-pet-teal px-3 py-1.5 rounded border border-pet-teal">
                    {lang === "GR" ? "Κάτω Πλοήγηση" : "Persistent Bottom Nav"}
                  </span>
                </div>

                {/* Bottom Navigation replica matching user's uploaded image */}
                <div className="mt-4 bg-pure-white rounded-t-[20px] rounded-b-[4px] border border-outline-variant/80 shadow-xs pt-5 pb-1 px-2 select-none overflow-hidden max-w-[480px] mx-auto w-full transition-all duration-300">
                  <div className="grid grid-cols-5 items-end text-center">
                    {/* Home tab */}
                    <button
                      onClick={() => setActiveKeyTransTab("home")}
                      className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-all group pb-1 relative"
                    >
                      <Home id="bottom-nav-home" className={`w-7 h-7 stroke-[2] transition-colors duration-200 ${
                        activeKeyTransTab === "home" 
                          ? "text-pet-teal" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`} />
                      <span className={`text-xs font-bold tracking-tight transition-colors duration-200 ${
                        activeKeyTransTab === "home" 
                          ? "text-pet-teal font-extrabold" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`}>
                        {lang === "GR" ? "Αρχική" : "Home"}
                      </span>
                      {activeKeyTransTab === "home" && (
                        <div className="w-12 h-[3px] bg-pet-teal rounded-full mt-1.5 absolute bottom-0" />
                      )}
                    </button>

                    {/* Calendar tab */}
                    <button
                      onClick={() => setActiveKeyTransTab("calendar")}
                      className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-all group pb-1 relative"
                    >
                      <Calendar id="bottom-nav-calendar" className={`w-7 h-7 stroke-[2] transition-colors duration-200 ${
                        activeKeyTransTab === "calendar" 
                          ? "text-pet-teal" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`} />
                      <span className={`text-xs font-bold tracking-tight transition-colors duration-200 ${
                        activeKeyTransTab === "calendar" 
                          ? "text-pet-teal font-extrabold" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`}>
                        {lang === "GR" ? "Ημερολόγιο" : "Calendar"}
                      </span>
                      {activeKeyTransTab === "calendar" && (
                        <div className="w-12 h-[3px] bg-pet-teal rounded-full mt-1.5 absolute bottom-0" />
                      )}
                    </button>

                    {/* Library tab */}
                    <button
                      onClick={() => setActiveKeyTransTab("library")}
                      className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-all group pb-1 relative"
                    >
                      <BookOpen id="bottom-nav-library" className={`w-7 h-7 stroke-[1.8] transition-colors duration-200 ${
                        activeKeyTransTab === "library" 
                          ? "text-pet-teal" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`} />
                      <span className={`text-xs font-bold tracking-tight transition-colors duration-200 ${
                        activeKeyTransTab === "library" 
                          ? "text-pet-teal font-extrabold" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`}>
                        {lang === "GR" ? "Βιβλιοθήκη" : "Library"}
                      </span>
                      {activeKeyTransTab === "library" && (
                        <div className="w-12 h-[3px] bg-pet-teal rounded-full mt-1.5 absolute bottom-0" />
                      )}
                    </button>

                    {/* Community tab */}
                    <button
                      onClick={() => setActiveKeyTransTab("community")}
                      className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-all group pb-1 relative"
                    >
                      <Users id="bottom-nav-community" className={`w-7 h-7 stroke-[1.8] transition-colors duration-200 ${
                        activeKeyTransTab === "community" 
                          ? "text-pet-teal" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`} />
                      <span className={`text-xs font-bold tracking-tight transition-colors duration-200 ${
                        activeKeyTransTab === "community" 
                          ? "text-pet-teal font-extrabold" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`}>
                        {lang === "GR" ? "Κοινότητα" : "Community"}
                      </span>
                      {activeKeyTransTab === "community" && (
                        <div className="w-12 h-[3px] bg-pet-teal rounded-full mt-1.5 absolute bottom-0" />
                      )}
                    </button>

                    {/* Map tab */}
                    <button
                      onClick={() => setActiveKeyTransTab("map")}
                      className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-all group pb-1 relative"
                    >
                      <MapPin id="bottom-nav-map" className={`w-7 h-7 stroke-[1.8] transition-colors duration-200 ${
                        activeKeyTransTab === "map" 
                          ? "text-pet-teal" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`} />
                      <span className={`text-xs font-bold tracking-tight transition-colors duration-200 ${
                        activeKeyTransTab === "map" 
                          ? "text-pet-teal font-extrabold" 
                          : "text-[#1A1A1A] group-hover:text-pet-teal"
                      }`}>
                        {lang === "GR" ? "Χάρτης" : "Map"}
                      </span>
                      {activeKeyTransTab === "map" && (
                        <div className="w-12 h-[3px] bg-pet-teal rounded-full mt-1.5 absolute bottom-0" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed font-sans font-medium mt-6">
                {fc.fcDeliverKeyDesc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==================== 5. MOCKUPS GALLERY BENTO ==================== */}
      <section id="mockups" className="scroll-mt-[130px] py-20 px-6 md:px-12 bg-white text-left text-sm">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold text-secondary uppercase tracking-wider block">
              {lang === "GR" ? "Σχεδιαστική Εκτέλεση" : "Production Deliverables"}
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight leading-none font-sans">
              {fc.fcMockupsTitle}
            </h2>
            <p className="text-sm text-on-surface-variant font-sans leading-relaxed">
              {fc.fcMockupsDesc}
            </p>
          </div>

          {/* Bento layout grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
            
            {/* Bento item 1: Onboarding (Span 2 to give space for horizontal content) */}
            <div className="group md:col-span-2 bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-lg transition-all hover:border-pet-teal">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between items-start gap-4">
                <div className="space-y-4">
                  <span className="text-xs font-extrabold text-secondary uppercase tracking-widest block">
                    {lang === "GR" ? "HIGH-FIDELITY MOCKUPS" : "HIGH-FIDELITY MOCKUPS"}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface tracking-tight">
                    {lang === "GR" ? "Άδειο Στάδιο & Οθόνη Επιτυχίας" : "Empty Stage & Success Screen"}
                  </h3>
                  <p className="text-xs leading-relaxed text-on-surface-variant font-sans">
                    {lang === "GR" 
                      ? "Ο στόχος των άδειων σταδίων και της οθόνης επιτυχίας είναι να διατηρηθεί μια ευχάριστη εμπειρία χρήστη ακόμα και κατά τη διάρκεια διακοπών, κρατώντας τους χρήστες ενημερωμένους για την κατάστασή τους με ένα παιχνιδιάρικο, επικεντρωμένο στα κατοικίδια θέμα." 
                      : "The goal of the empty stages and success screen is to maintain a delightful user experience even during interruptions, while keeping users informed of their status with playful, pet-centric theme. "}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-2 relative overflow-hidden shrink-0 min-h-[350px]">
                <img 
                  src="/assets/Empty stage and success screen.png"
                  alt="Empty stage and success screen design" 
                  className="w-full h-full object-contain max-h-[330px] rounded-xl hover:scale-[1.03] transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Bento item 2: Dashboard (Span 1) */}
            <div className="group bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-all hover:border-[#2A7B88]">
              <div className="p-8 space-y-4 text-left">
                <span className="text-xs font-extrabold text-secondary uppercase tracking-widest block">
                  {lang === "GR" ? "HIGH-FIDELITY MOCKUPS" : "HIGH-FIDELITY MOCKUPS"}
                </span>
                <h3 className="text-lg font-bold text-on-surface tracking-tight">
                  {lang === "GR" ? "Αρχική Σελίδα" : "Home Page"}
                </h3>
                <p className="text-xs leading-relaxed text-on-surface-variant font-sans">
                  {lang === "GR" 
                    ? "Μέσω της αρχικής σελίδας, ο χρήστης πρέπει να μπορεί να πλοηγηθεί εύκολα στις λειτουργίες της εφαρμογής και να έχει πρόσβαση σε βασικές πληροφορίες του κατοικιδίου." 
                    : "Trough the home page, the user must be able to navigate easy on the apps features and have access to basic pet info. "}
                </p>
              </div>

              <div className="bg-white p-4 flex justify-center items-center relative overflow-hidden min-h-[260px]">
                <img 
                  src="/assets/Home page card.png"
                  alt="Fluffy Care dashboard design view screenshot" 
                  className="w-full max-h-[240px] h-auto object-contain rounded-xl hover:scale-[1.03] transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Bento item 3: Pet Profile (Span 1) */}
            <div className="group bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-lg transition-all hover:border-[#2A7B88]">
              <div className="p-8 space-y-4 text-left">
                <span className="text-xs font-extrabold text-secondary uppercase tracking-widest block">
                  {lang === "GR" ? "HIGH-FIDELITY MOCKUPS" : "HIGH-FIDELITY MOCKUPS"}
                </span>
                <h3 className="text-lg font-bold text-on-surface tracking-tight">
                  {lang === "GR" ? "Ροή Εγγραφής" : "Onboarding"}
                </h3>
                <p className="text-xs leading-relaxed text-on-surface-variant font-sans">
                  {lang === "GR" 
                    ? "Ο στόχος της εγγραφής είναι οι χρήστες όχι μόνο να δημιουργήσουν λογαριασμό αλλά και να καταχωρίσουν το πρώτο τους κατοικίδιο αμέσως." 
                    : "The goal of onboarding is for users to not only create an account but also register their first pet right away."}
                </p>
              </div>

              <div className="bg-white p-4 flex justify-center items-center relative overflow-hidden min-h-[260px]">
                <img 
                  src="/assets/onboarding photo.png"
                  alt="Onboarding photo mockup" 
                  className="w-full max-h-[240px] h-auto object-contain rounded-xl hover:scale-[1.03] transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Bento item 4: Success & Empty States (Span 2) */}
            <div className="group md:col-span-2 bg-surface-container-low rounded-3xl border border-outline-variant overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-lg transition-all hover:border-pet-teal">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between items-start gap-4">
                <div className="space-y-4">
                  <span className="text-xs font-extrabold text-secondary uppercase tracking-widest block">
                    {lang === "GR" ? "HIGH-FIDELITY MOCKUPS" : "HIGH-FIDELITY MOCKUPS"}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface tracking-tight">
                    {lang === "GR" ? "Προφίλ Κατοικιδίου" : "Pet Profile"}
                  </h3>
                  <p className="text-xs leading-relaxed text-on-surface-variant font-sans font-medium">
                    {lang === "GR" 
                      ? "Το προφίλ του κατοικιδίου στοχεύει στην εμφάνιση όλων των λεπτομερών πληροφοριών σχετικά με ένα συγκεκριμένο κατοικίδιο, όχι μόνο των βασικών. Επιπλέον, το προφίλ επιτρέπει στους χρήστες να προσαρμόζουν και να αλλάζουν τις λεπτομέρειες του κατοικιδίου τους ανά πάσα στιγμή. Μπορούν να δουν φάρμακα, έγγραφα, ιστορικό υγείας κ.λπ." 
                      : "The pet profile aim to display all the detailed information about a specific pet, not just the basics. In addition, the pet profile allows users to customize and change their pet’s details at any time. They can view medication, documents, health history etc."}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-2 relative overflow-hidden shrink-0 min-h-[350px]">
                <img 
                  src="/assets/pet profile.png"
                  alt="Pet profile design view" 
                  className="w-full h-full object-contain max-h-[330px] rounded-xl hover:scale-[1.03] transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

          {/* Conclusion card: Placed underneath */}
          <div className="group bg-[#2A7B88] text-pure-white p-8 rounded-3xl border-2 border-primary overflow-hidden flex flex-col justify-between shadow-sm relative text-left">
            <div className="absolute right-0 top-0 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#BEEBEF] block">
                {lang === "GR" ? "Ανακεφαλαίωση" : "Retrospective & Lessons"}
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {fc.fcConclusionTitle}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#D6F4F7] font-sans font-medium whitespace-pre-line">
                {fc.fcConclusionDesc}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-pure-white/10 flex flex-wrap gap-4 items-center justify-between text-xs text-pure-white/80 font-semibold font-sans relative z-10">
              <span>{lang === "GR" ? "Σχεδιάστηκε από τη Δέσποινα" : "Designed with systems-precision by Despina"}</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== INDIVIDUAL ACTIVE MOCKUP PREVIEW SIMULATOR ==================== */}
      <section id="prototype" className="scroll-mt-[130px] py-20 px-6 md:px-12 bg-surface-container-low border-t border-outline-variant text-left">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="w-full space-y-3">
            <span className="text-xs font-extrabold text-secondary uppercase tracking-wider block">
              {lang === "GR" ? "Διαδραστικό Πρωτότυπο" : "Interactive Prototype Simulator"}
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight leading-none font-sans">
              {lang === "GR" ? "Δοκιμάστε τις Επανασχεδιασμένες Ροές" : "Test Drive the Redesigned Flows"}
            </h2>
            <p className="w-full text-sm text-on-surface-variant font-sans leading-relaxed whitespace-pre-line">
              {lang === "GR"
                ? `Αλληλεπιδράστε με το παρακάτω πρωτότυπο κινητού δοκιμάζοντας τις ροές και τα βασικά χαρακτηριστικά του.

Πώς να πλοηγηθείτε: Χρησιμοποιήστε το μενού στην αριστερή πλευρά του πίνακα για να επιλέξετε ποιο συγκεκριμένο πρωτότυπο ή ροή χρήστη θέλετε να εξερευνήσετε.

Συμβουλή για καλύτερη εμπειρία: Κάντε κλικ στο εικονίδιο με τα δύο βέλη (διαγώνια βέλη επέκτασης) στην επάνω δεξιά γωνία του παραθύρου του πρωτοτύπου για να εισέλθετε σε λειτουργία πλήρους οθόνης για μια βελτιστοποιημένη, πιο καθαρή προβολή.`
                : `Interact with the mobile prototype below by testing its flows and key features.

How to navigate: Use the menu on the left side of the panel to choose which specific prototype or user flow you want to explore.

Tip for a better experience: Click the two arrows icon (diagonal expand arrows) in the top right corner of the prototype window to enter full-screen mode for an optimized, clearer view.`}
            </p>
          </div>
          
          <div className="flex justify-center max-w-3xl mx-auto w-full">
            <MobileSimulator currentLang={lang} />
          </div>
        </div>
      </section>

    </div>
  );
}
