export interface TimetableSession {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string;
  subject: string;
  grade: number;
  topic: string;
  teacher: string;
  medium: string;
  channel: "Zoom Live" | "YouTube Live";
  isLiveNow?: boolean;
}

export interface RecordedSession {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  grade: number;
  recordedOn: string;
  duration: string;
}

export const WEEKLY_TIMETABLE: TimetableSession[] = [
  {
    id: "live-mon-sci",
    day: "Mon",
    time: "04:30 PM",
    subject: "Science",
    grade: 8,
    topic: "Mirrors, Ray Diagrams & Focal Length Lab",
    teacher: "Ms. Menaka Jayawardena",
    medium: "Sinhala & English",
    channel: "Zoom Live",
    isLiveNow: true,
  },
  {
    id: "live-tue-math",
    day: "Tue",
    time: "06:00 PM",
    subject: "Mathematics",
    grade: 11,
    topic: "O/L Circle Theorems & Past Paper Walkthrough",
    teacher: "Mr. Anura Perera",
    medium: "Sinhala Medium",
    channel: "YouTube Live",
  },
  {
    id: "live-wed-ict",
    day: "Wed",
    time: "05:00 PM",
    subject: "ICT",
    grade: 10,
    topic: "Logic Gates & Truth Tables Revision",
    teacher: "Ms. Dilani Silva",
    medium: "English Medium",
    channel: "Zoom Live",
  },
  {
    id: "live-thu-eng",
    day: "Thu",
    time: "04:00 PM",
    subject: "English",
    grade: 9,
    topic: "Formal Letter Writing & Grammar Clinic",
    teacher: "Mrs. Fathima Nazeer",
    medium: "English Medium",
    channel: "YouTube Live",
  },
  {
    id: "live-fri-hist",
    day: "Fri",
    time: "06:30 PM",
    subject: "History",
    grade: 11,
    topic: "Sri Lanka Map Marking & Ancient Kingdoms",
    teacher: "Mr. K. Rajaratnam",
    medium: "Tamil & Sinhala",
    channel: "Zoom Live",
  },
  {
    id: "live-sat-ol",
    day: "Sat",
    time: "08:30 AM",
    subject: "Science",
    grade: 11,
    topic: "G.C.E. O/L 2024 Part II Timed Workshop",
    teacher: "Ms. Menaka Jayawardena",
    medium: "All Mediums",
    channel: "YouTube Live",
  },
  {
    id: "live-sun-math",
    day: "Sun",
    time: "09:30 AM",
    subject: "Mathematics",
    grade: 8,
    topic: "Term 2 Geometry & Parallel Lines Quiz",
    teacher: "Mr. Anura Perera",
    medium: "Sinhala & English",
    channel: "Zoom Live",
  },
];

export const PAST_RECORDINGS: RecordedSession[] = [
  {
    id: "rec-1",
    title: "Unit 7: Concave & Convex Mirror Image Rules (Full Replay)",
    subject: "Science",
    teacher: "Ms. Menaka Jayawardena",
    grade: 8,
    recordedOn: "2 days ago",
    duration: "52 mins",
  },
  {
    id: "rec-2",
    title: "O/L Quadratic Graphs & Symmetry Axis Clinic",
    subject: "Mathematics",
    teacher: "Mr. Anura Perera",
    grade: 11,
    recordedOn: "5 days ago",
    duration: "1 hr 08 mins",
  },
  {
    id: "rec-3",
    title: "Binary Hexadecimal Conversion & Logic Circuits",
    subject: "ICT",
    teacher: "Ms. Dilani Silva",
    grade: 10,
    recordedOn: "Last week",
    duration: "46 mins",
  },
];
