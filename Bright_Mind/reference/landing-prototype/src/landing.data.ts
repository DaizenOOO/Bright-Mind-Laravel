import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  CircleUserRound,
  FileText,
  Focus,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Network,
  School,
  Sparkles,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import { landingAssets } from "./landing.assets";

export { landingAssets } from "./landing.assets";

export const partners = [
  "Partner School 01",
  "Partner School 02",
  "Youth Centre",
  "Teacher Academy",
  "Erasmus+ Partner",
  "Learning Lab",
  "Regional Network",
  "Community Hub",
];

export type BuildingLayerData = {
  id: string;
  label: string;
  icon?: LucideIcon;
  asset?: string;
  accent: string;
  height: number;
  glow?: boolean;
  status?: string;
};

export const buildingLayers: BuildingLayerData[] = [
  { id: "courses", label: "Multilingual courses", icon: BookOpen, asset: landingAssets.interfaceLayer, accent: "#e9f8fb", height: 58, status: "Text + video" },
  { id: "active-recall", label: "Active recall", icon: Brain, asset: landingAssets.automationLayer, accent: "#fff0d9", height: 54, status: "Practice" },
  { id: "peer-learning", label: "Peer-to-peer learning", icon: Users, asset: landingAssets.intelligenceLayer, accent: "#e4f7f2", height: 58, glow: true, status: "Collaborate" },
  { id: "design-thinking", label: "Design thinking", icon: Lightbulb, asset: landingAssets.workflowLayer, accent: "#f2f8df", height: 50, status: "Create" },
  { id: "metacognition", label: "Metacognition", icon: Focus, asset: landingAssets.runtimeLayer, accent: "#237ca8", height: 78, glow: true, status: "Reflect" },
  { id: "progress", label: "Progress & achievements", icon: Trophy, asset: landingAssets.telemetryLayer, accent: "#184c73", height: 50, status: "Tracked" },
  { id: "badges", label: "Digital badges", icon: Award, asset: landingAssets.cloudLayer, accent: "#35b8a4", height: 54, glow: true, status: "Verified" },
  { id: "europass", label: "Europass credential", icon: GraduationCap, asset: landingAssets.infrastructureLayer, accent: "#f5f8fa", height: 54, status: "Ready" },
];

export const frameworkTabs = [
  {
    id: "learning",
    label: "Learning",
    title: "Your learning path",
    subtitle: "Courses in partner languages",
    stats: [
      { label: "Active courses", value: "4" },
      { label: "Completed lessons", value: "18" },
      { label: "Quiz accuracy", value: "86%" },
    ],
    items: ["Learning how to learn", "Active recall in practice", "Design thinking challenge"],
  },
  {
    id: "progress",
    label: "Progress",
    title: "Progress overview",
    subtitle: "A clear view of every learning milestone",
    stats: [
      { label: "Weekly progress", value: "72%" },
      { label: "Focus sessions", value: "11" },
      { label: "Current streak", value: "8 days" },
    ],
    items: ["3 lessons completed this week", "2 reflective tasks submitted", "Next goal: finish peer-learning module"],
  },
  {
    id: "badges",
    label: "Badges",
    title: "Digital achievements",
    subtitle: "Recognition for completed skills and activities",
    stats: [
      { label: "Badges earned", value: "7" },
      { label: "Achievements", value: "12" },
      { label: "Next badge", value: "80%" },
    ],
    items: ["Active Recall Explorer", "Peer Learning Contributor", "Reflective Learner"],
  },
  {
    id: "europass",
    label: "Europass",
    title: "Verified credential",
    subtitle: "Course completion prepared for Europass",
    stats: [
      { label: "Eligible courses", value: "3" },
      { label: "Credentials issued", value: "1" },
      { label: "Verification", value: "Ready" },
    ],
    items: ["Complete required modules", "Pass the final assessment", "Receive your Europass Digital Credential"],
  },
  {
    id: "teachers",
    label: "Teachers",
    title: "Teacher workspace",
    subtitle: "Groups, courses and school-level insight",
    stats: [
      { label: "Active groups", value: "6" },
      { label: "Learners", value: "124" },
      { label: "Courses assigned", value: "9" },
    ],
    items: ["Create and assign learning content", "Monitor learner progress", "Manage schools and partner groups"],
  },
];

export const featureCards = [
  {
    id: "scaling",
    eyebrow: "Active recall",
    title: "Strengthen memory through retrieval",
    description: "Learners actively recall key ideas through quizzes, flashcards and structured review instead of only rereading content.",
    benefits: ["Low-stakes quizzes and checkpoints", "Repeated retrieval across each course", "Clear progress after every attempt"],
    cta: "Explore active recall",
  },
  {
    id: "preview",
    eyebrow: "Peer-to-peer learning",
    title: "Learn by explaining, discussing and collaborating",
    description: "Students exchange knowledge, give feedback and solve shared tasks in a safe, teacher-supported learning environment.",
    benefits: ["Group discussions and shared activities", "Structured peer feedback", "Collaborative learning across partner schools"],
    cta: "Explore peer learning",
  },
  {
    id: "monitoring",
    eyebrow: "Design thinking",
    title: "Turn real challenges into practical solutions",
    description: "Learners move from empathy and problem definition to ideas, prototypes and testing through guided course activities.",
    benefits: ["Work with meaningful real-world challenges", "Create, test and improve ideas", "Build creativity and problem-solving skills"],
    cta: "Explore design thinking",
  },
  {
    id: "frontend",
    eyebrow: "Metacognition",
    title: "Understand how you learn best",
    description: "Reflection tools help students plan, monitor and evaluate their own learning strategies and study habits.",
    benefits: ["Set personal learning goals", "Reflect on progress and difficulties", "Choose strategies that work"],
    cta: "Explore metacognition",
  },
];

export const frontendFiles = [
  { name: "Learning plan", accent: "#237ca8", icon: FileText },
  { name: "Reflection journal", accent: "#35b8a4", icon: MessageCircle },
  { name: "Focus session", accent: "#ff9f1c", icon: Focus },
  { name: "Progress review", accent: "#98c63c", icon: CheckCircle2 },
];

export const communityEvents = [
  { name: "Student Learning Lab", date: "OCT 08–10 · 2026", place: "ERASMUS+ PARTNER SCHOOL", image: landingAssets.eventOne },
  { name: "Teacher Academy", date: "NOV 17–19 · 2026", place: "PARTNER NETWORK", image: landingAssets.eventTwo },
  { name: "Bright Mind Exchange", date: "MAR 11–13 · 2027", place: "EUROPEAN SCHOOL COMMUNITY", image: landingAssets.eventThree },
];

export const dashboardIcons = {
  course: BookOpen,
  video: Video,
  learner: CircleUserRound,
  school: School,
  network: Network,
  badge: Award,
};
