export interface SyllabusGradeNode {
  grade: number;
  subjects: Array<{
    id: string;
    name: string;
    terms: Array<{
      term: string;
      units: Array<{ id: string; title: string; published: boolean }>;
    }>;
  }>;
}

export const INITIAL_SYLLABUS_TREE: SyllabusGradeNode[] = [
  {
    grade: 8,
    subjects: [
      {
        id: "g8-sci",
        name: "Science",
        terms: [
          {
            term: "Term 1",
            units: [
              {
                id: "u1",
                title: "Unit 1: Importance of Microorganisms",
                published: true,
              },
              {
                id: "u2",
                title: "Unit 2: Animal & Plant Classification",
                published: true,
              },
            ],
          },
          {
            term: "Term 2",
            units: [
              {
                id: "u7",
                title: "Unit 7: Light, Mirrors & Reflection",
                published: true,
              },
              {
                id: "u8",
                title: "Unit 8: Changes in Matter",
                published: false,
              },
            ],
          },
        ],
      },
      {
        id: "g8-math",
        name: "Mathematics",
        terms: [
          {
            term: "Term 1",
            units: [
              {
                id: "m1",
                title: "Number Patterns & Perimeter",
                published: true,
              },
            ],
          },
          {
            term: "Term 2",
            units: [
              {
                id: "m4",
                title: "Angles, Triangles & Parallel Lines",
                published: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: 11,
    subjects: [
      {
        id: "g11-math",
        name: "G.C.E. O/L Mathematics",
        terms: [
          {
            term: "Term 1",
            units: [
              {
                id: "ol-m1",
                title: "Real Numbers, Percentages & Taxes",
                published: true,
              },
              {
                id: "ol-m2",
                title: "Quadratic Equations & Graphs",
                published: true,
              },
            ],
          },
          {
            term: "Term 2",
            units: [
              {
                id: "ol-m3",
                title: "Circle Theorems & Cyclic Quadrilaterals",
                published: true,
              },
              {
                id: "ol-m4",
                title: "Trigonometry & Bearings",
                published: true,
              },
            ],
          },
        ],
      },
    ],
  },
];
