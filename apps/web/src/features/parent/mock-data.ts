export interface ParentChildProfile {
  id: string;
  name: string;
  grade: number;
  medium: string;
  school: string;
  watchTimeWeek: string;
  lessonsCompletedWeek: number;
  liveAttendancePct: number;
  activeCardTitle: string;
  cardRenewalDate: string;
  recentQuizzes: Array<{
    id: string;
    subject: string;
    title: string;
    scorePct: number;
    date: string;
  }>;
  examAlerts: Array<{
    id: string;
    title: string;
    dateLabel: string;
    urgency: "high" | "normal";
  }>;
}

export const PARENT_CHILDREN: ParentChildProfile[] = [
  {
    id: "kasun",
    name: "Kasun Perera",
    grade: 8,
    medium: "English & Sinhala Medium",
    school: "Ananda College, Colombo",
    watchTimeWeek: "6h 25m",
    lessonsCompletedWeek: 14,
    liveAttendancePct: 92,
    activeCardTitle: "Grade 8 Science + Maths Monthly Card",
    cardRenewalDate: "15 Dec 2026",
    recentQuizzes: [
      {
        id: "pq-1",
        subject: "Science",
        title: "Unit 7: Mirrors & Reflection MCQ",
        scorePct: 85,
        date: "Yesterday",
      },
      {
        id: "pq-2",
        subject: "Mathematics",
        title: "Geometry & Parallel Lines",
        scorePct: 78,
        date: "3 days ago",
      },
      {
        id: "pq-3",
        subject: "History",
        title: "Anuradhapura Irrigation Systems",
        scorePct: 90,
        date: "5 days ago",
      },
    ],
    examAlerts: [
      {
        id: "ea-1",
        title: "Term 2 Western Province Science Test",
        dateLabel: "In 9 days",
        urgency: "high",
      },
      {
        id: "ea-2",
        title: "Maths SBA Practical Assignment Due",
        dateLabel: "Next Friday",
        urgency: "normal",
      },
    ],
  },
  {
    id: "nethmi",
    name: "Nethmi Perera",
    grade: 11,
    medium: "Sinhala Medium (සිංහල)",
    school: "Visakha Vidyalaya, Colombo",
    watchTimeWeek: "11h 40m",
    lessonsCompletedWeek: 22,
    liveAttendancePct: 96,
    activeCardTitle: "G.C.E. O/L 2026 All-Subject Revision Pass",
    cardRenewalDate: "02 Dec 2026",
    recentQuizzes: [
      {
        id: "pq-4",
        subject: "Mathematics",
        title: "2023 O/L Past Paper Part I",
        scorePct: 92,
        date: "Today",
      },
      {
        id: "pq-5",
        subject: "Science",
        title: "Electrochemistry & Acids Quiz",
        scorePct: 88,
        date: "2 days ago",
      },
      {
        id: "pq-6",
        subject: "ICT",
        title: "Logic Gates & SQL Checkpoint",
        scorePct: 95,
        date: "4 days ago",
      },
    ],
    examAlerts: [
      {
        id: "ea-3",
        title: "G.C.E. O/L Final Mock Examination",
        dateLabel: "In 18 days",
        urgency: "high",
      },
    ],
  },
  {
    id: "kavindu",
    name: "Kavindu Perera",
    grade: 6,
    medium: "English Medium",
    school: "Ananda College, Colombo",
    watchTimeWeek: "4h 10m",
    lessonsCompletedWeek: 9,
    liveAttendancePct: 88,
    activeCardTitle: "Grade 6 Foundation Bundle",
    cardRenewalDate: "28 Dec 2026",
    recentQuizzes: [
      {
        id: "pq-7",
        subject: "Science",
        title: "Living Things & Energy Sources",
        scorePct: 80,
        date: "2 days ago",
      },
      {
        id: "pq-8",
        subject: "English",
        title: "Grammar & Reading Comprehension",
        scorePct: 84,
        date: "6 days ago",
      },
    ],
    examAlerts: [
      {
        id: "ea-4",
        title: "Grade 6 Term 2 Class Evaluation",
        dateLabel: "In 12 days",
        urgency: "normal",
      },
    ],
  },
];
