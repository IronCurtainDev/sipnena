export interface TermTestPack {
  id: string;
  term: "Term 1" | "Term 2" | "Term 3";
  title: string;
  subject: string;
  grade: number;
  province: string;
  school: string;
  duration: string;
  difficulty: "Easy" | "Standard" | "Challenging";
  completed: boolean;
  paperLinkId: string;
}

export const PROVINCES = [
  "All Provinces",
  "Western Province",
  "Southern Province",
  "Central Province",
  "North Western Province",
  "Sabaragamuwa Province",
  "Northern Province",
];

export const LEADING_SCHOOLS = [
  "All Schools",
  "Royal College, Colombo",
  "Visakha Vidyalaya, Colombo",
  "Richmond College, Galle",
  "Dharmaraja College, Kandy",
  "Jaffna Hindu College",
  "Maliyadeva College, Kurunegala",
];

export const TERM_TEST_PACKS: TermTestPack[] = [
  {
    id: "tt-t1-western-royal",
    term: "Term 1",
    title: "Term 1 Mathematics Model & School Paper",
    subject: "Mathematics",
    grade: 11,
    province: "Western Province",
    school: "Royal College, Colombo",
    duration: "2 hrs",
    difficulty: "Challenging",
    completed: true,
    paperLinkId: "ol-2023-maths-p2",
  },
  {
    id: "tt-t1-southern-richmond",
    term: "Term 1",
    title: "Term 1 Science Structured & MCQ Pack",
    subject: "Science",
    grade: 8,
    province: "Southern Province",
    school: "Richmond College, Galle",
    duration: "1 hr 30 mins",
    difficulty: "Standard",
    completed: false,
    paperLinkId: "g8-2021-science-p1",
  },
  {
    id: "tt-t2-western-visakha",
    term: "Term 2",
    title: "Term 2 Science — Light, Heat & Chemical Reactions",
    subject: "Science",
    grade: 11,
    province: "Western Province",
    school: "Visakha Vidyalaya, Colombo",
    duration: "2 hrs",
    difficulty: "Challenging",
    completed: false,
    paperLinkId: "ol-2024-science-p1",
  },
  {
    id: "tt-t2-central-dharmaraja",
    term: "Term 2",
    title: "Term 2 History & Map Marking Test",
    subject: "History",
    grade: 11,
    province: "Central Province",
    school: "Dharmaraja College, Kandy",
    duration: "1 hr 45 mins",
    difficulty: "Standard",
    completed: true,
    paperLinkId: "ol-2025-history-p2",
  },
  {
    id: "tt-t2-northern-jaffna",
    term: "Term 2",
    title: "Term 2 ICT — Logic Gates & Flowcharts",
    subject: "ICT",
    grade: 11,
    province: "Northern Province",
    school: "Jaffna Hindu College",
    duration: "1 hr 30 mins",
    difficulty: "Standard",
    completed: false,
    paperLinkId: "ol-2022-ict-p1",
  },
  {
    id: "tt-t3-nw-maliyadeva",
    term: "Term 3",
    title: "Year-End Provincial Final Practice Pack",
    subject: "Mathematics",
    grade: 11,
    province: "North Western Province",
    school: "Maliyadeva College, Kurunegala",
    duration: "3 hrs",
    difficulty: "Challenging",
    completed: false,
    paperLinkId: "ol-2016-maths-p1",
  },
  {
    id: "tt-t3-sabaragamuwa",
    term: "Term 3",
    title: "Term 3 English Essay & Comprehension Pack",
    subject: "English",
    grade: 10,
    province: "Sabaragamuwa Province",
    school: "All Schools",
    duration: "2 hrs",
    difficulty: "Easy",
    completed: false,
    paperLinkId: "ol-2019-english-p2",
  },
];
