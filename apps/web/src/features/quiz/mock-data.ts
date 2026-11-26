import type { QuizQuestion } from "./types";

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    totalQuestions: 10,
    gradeBadge: "Science • Grade 8",
    subjectBadge: "Light",
    title:
      "Light travels in straight lines until it meets a surface. What is this property of light called in science?",
    diagramType: "plane_reflection",
    incidentAngle: 45,
    reflectedAngle: 45,
    showLawBadge: false,
    options: [
      {
        id: "A",
        text: "Rectilinear propagation",
        subtext: "Light moving along a straight line path",
        isCorrect: true,
      },
      {
        id: "B",
        text: "Circular dispersion",
        subtext: "Light bending in loops",
        isCorrect: false,
      },
      {
        id: "C",
        text: "Diffraction wave",
        subtext: "Spreading around corners",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Lateral inversion",
        subtext: "Left-to-right flipping in a mirror",
        isCorrect: false,
      },
    ],
    explanation: {
      title: "Rectilinear Propagation (ආලෝකයේ සරල රේඛීය ප්‍රචාරණය)",
      body: "In a uniform medium like air or empty space, light always travels along straight paths. This is why sharp shadows form behind opaque objects.",
      textbookRef: "Grade 8 Science • Unit 14.1",
    },
  },
  {
    id: 2,
    questionNumber: 2,
    totalQuestions: 10,
    gradeBadge: "Science • Grade 8",
    subjectBadge: "Light",
    title:
      "When measuring the angle of incidence (i), from which reference line must you always measure?",
    diagramType: "plane_reflection",
    incidentAngle: 30,
    reflectedAngle: 30,
    showLawBadge: true,
    options: [
      {
        id: "A",
        text: "From the mirror's flat glass surface",
        subtext: "Surface horizontal plane",
        isCorrect: false,
      },
      {
        id: "B",
        text: "From the normal line (90° perpendicular)",
        subtext: "Always measured relative to the normal",
        isCorrect: true,
      },
      {
        id: "C",
        text: "From the bottom silvered back layer",
        subtext: "Underneath the mirror",
        isCorrect: false,
      },
      {
        id: "D",
        text: "From the reflected ray itself",
        subtext: "Between both light rays",
        isCorrect: false,
      },
    ],
    explanation: {
      title: "Teacher's Golden Rule (අභිලම්භය)",
      body: "Remember: Angles in reflection are NEVER measured against the mirror table! Both the angle of incidence (i) and reflection (r) start from the dashed 90° normal line.",
      formula: "Angle with mirror = 90° - i",
      textbookRef: "Grade 8 Science • Unit 14.2",
    },
  },
  {
    id: 3,
    questionNumber: 3,
    totalQuestions: 10,
    gradeBadge: "Science • Grade 8",
    subjectBadge: "Light",
    title:
      "When a light ray strikes a smooth flat mirror at an angle of 35° to the normal, what is the angle of reflection?",
    diagramType: "plane_reflection",
    incidentAngle: 35,
    reflectedAngle: 35,
    showLawBadge: true,
    options: [
      {
        id: "A",
        text: "0° — along the normal",
        subtext: "Straight up",
        isCorrect: false,
      },
      {
        id: "B",
        text: "35° — equal to incidence",
        subtext: "Angle of incidence equals angle of reflection",
        isCorrect: true,
      },
      {
        id: "C",
        text: "55° — perpendicular to mirror",
        subtext: "Complementary angle to mirror surface",
        isCorrect: false,
      },
      {
        id: "D",
        text: "70° — double the angle",
        subtext: "Sum of both angles combined",
        isCorrect: false,
      },
    ],
    explanation: {
      title: "First Law of Reflection (පරාවර්තන නීතිය)",
      body: "According to the Law of Reflection, the angle of incidence (i) is always strictly equal to the angle of reflection (r). Since i = 35°, the reflected angle must also be r = 35°.",
      formula: "i = r ⇒ r = 35°",
      textbookRef: "Review textbook chapter 4.2: Reflection",
    },
  },
  {
    id: 4,
    questionNumber: 4,
    totalQuestions: 10,
    gradeBadge: "Science • Grade 8",
    subjectBadge: "Curved Mirrors",
    title:
      "Which type of spherical mirror curves inward like the hollow bowl of a soup spoon?",
    diagramType: "concave_focus",
    showLawBadge: false,
    options: [
      {
        id: "A",
        text: "Concave mirror (අවතල දර්පණය)",
        subtext: "Curves inward, collecting light rays",
        isCorrect: true,
      },
      {
        id: "B",
        text: "Convex mirror (උත්තල දර්පණය)",
        subtext: "Curves outward, spreading rays apart",
        isCorrect: false,
      },
      {
        id: "C",
        text: "Plane mirror (තල දර්පණය)",
        subtext: "Completely flat silvered surface",
        isCorrect: false,
      },
      {
        id: "D",
        text: "Cylindrical lens (සිලින්ඩරාකාර කාචය)",
        subtext: "Refracting transparent glass",
        isCorrect: false,
      },
    ],
    explanation: {
      title: "Concave vs Convex Mirrors",
      body: "A concave mirror curves inward like an entrance to a cave or the inside bowl of a spoon. It brings incoming parallel light beams together to a focus.",
      textbookRef: "Grade 8 Science • Unit 14.3",
    },
  },
  {
    id: 5,
    questionNumber: 5,
    totalQuestions: 10,
    gradeBadge: "Science • Grade 8",
    subjectBadge: "Curved Mirrors",
    title:
      "For a spherical concave mirror with a radius of curvature R = 20 cm, what is its focal length (f)?",
    diagramType: "concave_focus",
    showLawBadge: false,
    options: [
      {
        id: "A",
        text: "10 cm — half of radius",
        subtext: "f = R / 2",
        isCorrect: true,
      },
      {
        id: "B",
        text: "20 cm — same as radius",
        subtext: "f = R",
        isCorrect: false,
      },
      {
        id: "C",
        text: "40 cm — double the radius",
        subtext: "f = 2R",
        isCorrect: false,
      },
      {
        id: "D",
        text: "5 cm — one quarter",
        subtext: "f = R / 4",
        isCorrect: false,
      },
    ],
    explanation: {
      title: "Focal Length Formula (f = R / 2)",
      body: "The principal focus (F) always lies exactly midway between the pole (P) and center of curvature (C). Therefore, focal length is always half of the radius of curvature.",
      formula: "f = R / 2 = 20 cm / 2 = 10 cm",
      textbookRef: "Grade 8 Science • Unit 14.4",
    },
  },
];
