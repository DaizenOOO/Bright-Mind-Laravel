import {
  Award,
  BookOpen,
  Brain,
  CalendarDays,
  CircleHelp,
  ClipboardCheck,
  FileText,
  Focus,
  GraduationCap,
  Lightbulb,
  MapPinned,
  MessageSquare,
  School,
  Sparkles,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import type { EventData, EventPosterData, MenuEntry, NavigationItem, ProductCardData } from "./navigation.types";

export const assets = {
  logo: "/placeholders/bright-mind-logo.png",
  productOnePreview: "/placeholders/product-one.png",
  productTwoPreview: "/placeholders/product-two.png",
  productThreePreview: "/placeholders/product-three.png",
  eventOnePoster: "/placeholders/event-one.jpg",
  eventTwoPoster: "/placeholders/event-two.jpg",
  eventThreePoster: "/placeholders/event-three.jpg",
};

export const navigationItems: NavigationItem[] = [
  { id: "platform", label: "Framework", type: "panel" },
  { id: "products", label: "Platform", type: "panel" },
  { id: "resources", label: "Resources", type: "panel" },
  { id: "events", label: "Network", type: "panel" },
  { id: "documentation", label: "About", type: "link", href: "#framework" },
];

export const platformPrimary: MenuEntry[] = [
  { id: "active-recall", title: "Active recall", description: "Strengthen memory through retrieval practice", href: "#methods", icon: Brain },
  { id: "peer-learning", title: "Peer-to-peer learning", description: "Learn through discussion and collaboration", href: "#methods", icon: Users },
  { id: "design-thinking", title: "Design thinking", description: "Solve meaningful challenges creatively", href: "#methods", icon: Lightbulb },
];

export const platformPackages: MenuEntry[] = [
  { id: "metacognition", title: "Metacognition", description: "Plan, monitor and reflect on learning", href: "#methods", icon: Focus },
  { id: "learning-cycle", title: "Learning cycle", description: "Connect knowledge, practice and reflection", href: "#framework", icon: Sparkles },
  { id: "assessment", title: "Assessment", description: "Use quizzes, feedback and progress evidence", href: "#framework", icon: ClipboardCheck },
];

export const documentationLinks = [
  { label: "Student dashboard", href: "#framework", icon: BookOpen },
  { label: "Teacher workspace", href: "#framework", icon: School },
  { label: "Digital badges", href: "#framework", icon: Award },
  { label: "Achievements", href: "#framework", icon: Trophy },
  { label: "Europass credentials", href: "#framework", icon: GraduationCap },
];

export const productCards: ProductCardData[] = [
  { id: "student", name: "Student learning", headline: "Courses, quizzes and progress in one clear dashboard", description: "Text and video courses in partner languages with active-learning activities and visible progress.", ctaLabel: "Explore student learning", href: "#framework", image: assets.productOnePreview, imageFit: "contain", backgroundClass: "bg-[#17344d] text-white" },
  { id: "teacher", name: "Teacher workspace", headline: "Create content and guide every learning group", description: "Manage students, assign courses, monitor progress and coordinate schools and partner groups.", ctaLabel: "Explore teacher tools", href: "#framework", image: assets.productTwoPreview, imageFit: "contain", backgroundClass: "bg-[#eef9fb] text-[#17344d]" },
  { id: "focus", name: "Focus companion", headline: "Build concentration and regular learning habits", description: "A Forest-inspired focus experience with sessions, streaks, goals and motivating achievements.", ctaLabel: "Explore focus tools", href: "#framework", image: assets.productThreePreview, imageFit: "cover", backgroundClass: "bg-[#237ca8] text-white" },
];

export const resourceGroups = [
  { title: "For students", items: [
    { id: "courses", title: "Courses", description: "Multilingual text and video learning paths", href: "#framework", icon: BookOpen },
    { id: "quizzes", title: "Quizzes", description: "Active-recall checks and final assessments", href: "#framework", icon: ClipboardCheck },
  ]},
  { title: "For teachers", items: [
    { id: "groups", title: "Group management", description: "Organise learners, classes and assignments", href: "#framework", icon: Users },
    { id: "authoring", title: "Course creation", description: "Build lessons, videos, quizzes and activities", href: "#framework", icon: Video },
  ]},
  { title: "Recognition", items: [
    { id: "badges", title: "Digital badges", description: "Recognise completed skills and milestones", href: "#framework", icon: Award },
    { id: "europass", title: "Europass", description: "Issue verified digital learning credentials", href: "#framework", icon: GraduationCap },
  ]},
  { title: "Project", items: [
    { id: "schools", title: "Partner schools", description: "Explore the European school network", href: "#community", icon: MapPinned },
    { id: "support", title: "Project support", description: "Guidance for students, teachers and partners", href: "#", icon: CircleHelp },
  ]},
];

export const events: EventData[] = [
  { id: "one", day: "08", month: "OCT", title: "Student Learning Lab", location: "Partner school network", category: "Workshop", href: "#community" },
  { id: "two", day: "17", month: "NOV", title: "Teacher Academy", location: "European partner network", category: "Training", href: "#community" },
  { id: "three", day: "11", month: "MAR", title: "Bright Mind Exchange", location: "Erasmus+ school community", category: "Exchange", href: "#community" },
  { id: "four", day: "22", month: "APR", title: "Peer Learning Forum", location: "Online and partner schools", category: "Forum", href: "#community" },
];

export const eventPosters: EventPosterData[] = [
  { id: "poster-one", name: "Student Learning Lab", date: "Oct 8–10, 2026", location: "Partner school", ctaLabel: "View activity", href: "#community", image: assets.eventOnePoster },
  { id: "poster-two", name: "Teacher Academy", date: "Nov 17–19, 2026", location: "European network", ctaLabel: "View activity", href: "#community", image: assets.eventTwoPoster },
  { id: "poster-three", name: "Bright Mind Exchange", date: "Mar 11–13, 2027", location: "Erasmus+ community", ctaLabel: "View activity", href: "#community", image: assets.eventThreePoster },
];

export const utilityActions = {
  communityCount: "12 partners",
  accountLabel: "Sign in",
  searchPlaceholder: "Search courses",
};
