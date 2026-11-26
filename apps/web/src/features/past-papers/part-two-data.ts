import type { AppLanguage } from "@/lib/language";
import type { LocalizedText } from "@/lib/i18n-common";

export interface PartTwoQuestionItem {
  id: string;
  numberLabel: LocalizedText;
  title: LocalizedText;
  marks: number;
  prompt: LocalizedText;
  markingScheme: Record<AppLanguage, string[]>;
}

export const DEFAULT_PART_TWO: PartTwoQuestionItem[] = [
  {
    id: "p2-q1",
    numberLabel: {
      en: "Question 1 (Structured)",
      si: "ප්‍රශ්න 1 (ව්‍යුහගත)",
      ta: "வினா 1 (கட்டமைப்பு)",
    },
    title: {
      en: "Ray Diagrams & Spherical Mirrors",
      si: "කිරණ සටහන් සහ ගෝලීය දර්පණ",
      ta: "கதிர் வரைபடங்களும் கோள ஆடிகளும்",
    },
    marks: 10,
    prompt: {
      en: "(a) State the two laws of reflection of light. (4 marks)\n(b) A concave mirror has a focal length of 15 cm. An object is placed 30 cm in front of the mirror. Calculate the radius of curvature and state two characteristics of the image formed. (6 marks)",
      si: "(a) ආලෝක පරාවර්තනයේ නියම දෙක සඳහන් කරන්න. (ලකුණු 4)\n(b) අවතල දර්පණයක නාභි දුර 15 cm වේ. වස්තුවක් දර්පණය ඉදිරියේ 30 cm දුරින් තබා ඇත. වක්‍රතා අරය ගණනය කර සෑදෙන ප්‍රතිබිම්බයේ ලක්ෂණ දෙකක් ලියන්න. (ලකුණු 6)",
      ta: "(a) ஒளித் தெறிப்பின் இரு விதிகளைக் குறிப்பிடுக. (4 புள்ளிகள்)\n(b) குழிவு ஆடி ஒன்றின் குவியத்தூரம் 15 cm ஆகும். ஆடிக்கு முன்னால் 30 cm தொலைவில் பொருள் ஒன்று வைக்கப்பட்டுள்ளது. வளைவு ஆரையைக் கணித்து விம்பத்தின் இரு இயல்புகளைத் தருக. (6 புள்ளிகள்)",
    },
    markingScheme: {
      en: [
        "(a) Incident ray, reflected ray, and normal at the point of incidence lie in the same plane [2 marks].",
        "(a) Angle of incidence (i) equals angle of reflection (r) [2 marks].",
        "(b) R = 2f = 2 × 15 cm = 30 cm (Object is placed at C) [2 marks].",
        "(b) Image characteristics: Real, inverted, same size as object [4 marks].",
      ],
      si: [
        "(a) පතන කිරණය, පරාවර්තන කිරණය සහ අභිලම්බය එකම තලයේ පිහිටයි [ලකුණු 2].",
        "(a) පතන කෝණය (i) පරාවර්තන කෝණයට (r) සමාන වේ [ලකුණු 2].",
        "(b) R = 2f = 2 × 15 cm = 30 cm (වස්තුව වක්‍රතා කේන්ද්‍රයේ පිහිටයි) [ලකුණු 2].",
        "(b) ප්‍රතිබිම්බයේ ලක්ෂණ: සැබෑ, යටිකුරු, වස්තුවේ ප්‍රමාණයට සමාන [ලකුණු 4].",
      ],
      ta: [
        "(a) படுகதிர், தெறிகதிர் மற்றும் படுபுள்ளிக்கு வரையப்பட்ட செங்குத்து ஆகியன ஒரே தளத்தில் அமையும் [2 புள்ளிகள்].",
        "(a) படுகோணம் (i) தெறிகோணத்திற்கு (r) சமன் [2 புள்ளிகள்].",
        "(b) R = 2f = 2 × 15 cm = 30 cm (பொருள் வளைவு மையம் C இல் உள்ளது) [2 புள்ளிகள்].",
        "(b) விம்ப இயல்புகள்: மெய், தலைகீழானது, பொருளின் அளவிற்குச் சமன் [4 புள்ளிகள்].",
      ],
    },
  },
  {
    id: "p2-q2",
    numberLabel: {
      en: "Question 2 (Essay)",
      si: "ප්‍රශ්න 2 (රචනා)",
      ta: "வினா 2 (கட்டுரை)",
    },
    title: {
      en: "Photosynthesis & Gas Exchange in Plants",
      si: "ප්‍රභාසංශ්ලේෂණය සහ ශාකවල වායු හුවමාරුව",
      ta: "ஒளித்தொகுப்பும் தாவரங்களில் வாயுப் பரிமாற்றமும்",
    },
    marks: 15,
    prompt: {
      en: "(a) Write the balanced word equation for photosynthesis. (4 marks)\n(b) Describe a simple school laboratory test to show that starch is produced in a green leaf exposed to sunlight. (11 marks)",
      si: "(a) ප්‍රභාසංශ්ලේෂණය සඳහා වචන සමීකරණය ලියන්න. (ලකුණු 4)\n(b) හිරු එළියට නිරාවරණය වූ කොළ පැහැති පත්‍රයක පිෂ්ඨය නිපදවෙන බව පෙන්වීමට පාසල් පරීක්ෂණයක් විස්තර කරන්න. (ලකුණු 11)",
      ta: "(a) ஒளித்தொகுப்புக்கான சொற் சமன்பாட்டை எழுதுக. (4 புள்ளிகள்)\n(b) சூரிய ஒளி பட்ட பச்சை இலையில் மாப்பொருள் உற்பத்தியாவதைக் காட்டும் ஆய்வுகூடச் சோதனையை விவரிக்க. (11 புள்ளிகள்)",
    },
    markingScheme: {
      en: [
        "(a) Carbon dioxide + Water —(Light, Chlorophyll)→ Glucose + Oxygen [4 marks].",
        "(b) Boil leaf in water to kill cells [3 marks]; boil in alcohol in a water bath to remove chlorophyll [4 marks].",
        "(b) Rinse in warm water and add iodine solution; blue-black colour confirms starch [4 marks].",
      ],
      si: [
        "(a) කාබන් ඩයොක්සයිඩ් + ජලය —(ආලෝකය, හරිතප්‍රද)→ ග්ලූකෝස් + ඔක්සිජන් [ලකුණු 4].",
        "(b) සෛල මැරීමට ජලයේ තම්බා [ලකුණු 3], හරිතප්‍රද ඉවත් කිරීමට ජල තාපකයක මධ්‍යසාරය තුළ තම්බන්න [ලකුණු 4].",
        "(b) උණුසුම් ජලයෙන් සෝදා අයඩින් ද්‍රාවණය දැමූ විට නිල්-කළු පැහැයෙන් පිෂ්ඨය තහවුරු වේ [ලකුණු 4].",
      ],
      ta: [
        "(a) காபனீரொக்சைட்டு + நீர் —(ஒளி, பச்சையம்)→ குளுக்கோசு + ஒட்சிசன் [4 புள்ளிகள்].",
        "(b) கலங்களைக் கொல்ல நீரில் அவிக்கவும் [3 புள்ளிகள்]; பச்சையத்தை நீக்க நீர் முகவையில் மதுசாரத்தில் அவிக்கவும் [4 புள்ளிகள்].",
        "(b) இளஞ்சூட்டு நீரில் கழுவி அயோடின் இட, நீல-கருப்பு நிறம் மாப்பொருளை உறுதிப்படுத்தும் [4 புள்ளிகள்].",
      ],
    },
  },
];

export const MATH_PART_TWO: PartTwoQuestionItem[] = [
  {
    id: "math-p2-1",
    numberLabel: {
      en: "Part A — Question 1",
      si: "A කොටස — ප්‍රශ්න 1",
      ta: "பகுதி A — வினா 1",
    },
    title: {
      en: "Percentages & Simple Interest",
      si: "ප්‍රතිශත සහ සුළු පොළිය",
      ta: "சதவீதங்களும் எளிய வட்டியும்",
    },
    marks: 10,
    prompt: {
      en: "Nimal deposits Rs. 50,000 in a bank paying 8% annual simple interest. Calculate the total interest earned after 3 years and the final balance.",
      si: "නිමල් වාර්ෂිකව 8% ක සුළු පොළියක් ගෙවන බැංකුවක රු. 50,000 ක් තැන්පත් කරයි. වසර 3 කට පසු ලැබෙන මුළු පොළිය සහ අවසන් මුදල ගණනය කරන්න.",
      ta: "நிமல் 8% வருடாந்த எளிய வட்டி தரும் வங்கியில் ரூ. 50,000 வைப்புச் செய்கிறார். 3 ஆண்டுகளின் பின் மொத்த வட்டியையும் இறுதித் தொகையையும் கணிக்க.",
    },
    markingScheme: {
      en: [
        "Annual interest = 50,000 × 8 / 100 = Rs. 4,000 [4 marks].",
        "Interest for 3 years = 4,000 × 3 = Rs. 12,000 [3 marks].",
        "Final balance = 50,000 + 12,000 = Rs. 62,000 [3 marks].",
      ],
      si: [
        "වාර්ෂික පොළිය = 50,000 × 8 / 100 = රු. 4,000 [ලකුණු 4].",
        "වසර 3 සඳහා පොළිය = 4,000 × 3 = රු. 12,000 [ලකුණු 3].",
        "අවසන් මුදල = 50,000 + 12,000 = රු. 62,000 [ලකුණු 3].",
      ],
      ta: [
        "வருடாந்த வட்டி = 50,000 × 8 / 100 = ரூ. 4,000 [4 புள்ளிகள்].",
        "3 ஆண்டு வட்டி = 4,000 × 3 = ரூ. 12,000 [3 புள்ளிகள்].",
        "இறுதி மீதி = 50,000 + 12,000 = ரூ. 62,000 [3 புள்ளிகள்].",
      ],
    },
  },
];

export const HIST_PART_TWO: PartTwoQuestionItem[] = [
  {
    id: "hist-p2-1",
    numberLabel: {
      en: "Question 1 (Map & Sources)",
      si: "ප්‍රශ්න 1 (සිතියම් සහ මූලාශ්‍ර)",
      ta: "வினா 1 (வரைபடம் & மூலாதாரம்)",
    },
    title: {
      en: "Anuradhapura Irrigation Systems",
      si: "අනුරාධපුර යුගයේ වාරි කර්මාන්ත",
      ta: "அனுராதபுர நீர்ப்பாசன முறைகள்",
    },
    marks: 12,
    prompt: {
      en: "Name three major tanks built during the Anuradhapura period and explain how Bisokotuwa technology prevented tank bund erosion.",
      si: "අනුරාධපුර යුගයේ ඉදි කළ ප්‍රධාන වැව් තුනක් නම් කර, බිසෝකොටුව තාක්ෂණයෙන් වැව් බැම්ම ඛාදනය වීම වැළැක්වූ ආකාරය පැහැදිලි කරන්න.",
      ta: "அனுராதபுர காலத்தில் கட்டப்பட்ட மூன்று பிரதான குளங்களைக் குறிப்பிட்டு, பிசோகொட்டுவ தொழில்நுட்பம் அணை அரிப்பை எவ்வாறு தடுத்தது என விளக்குக.",
    },
    markingScheme: {
      en: [
        "Any three valid tanks: Kala Wewa, Minneriya, Abhaya Wewa, Tissa Wewa, Padaviya [6 marks].",
        "Bisokotuwa regulated water pressure before releasing water through the sluice gate [6 marks].",
      ],
      si: [
        "වැව් තුනක්: කලා වැව, මින්නේරිය, අභය වැව, තිසා වැව, පදවිය [ලකුණු 6].",
        "බිසෝකොටුව සොරොව්වෙන් ජලය පිටවීමට පෙර ජල පීඩනය පාලනය කර බැම්ම ආරක්ෂා කළේය [ලකුණු 6].",
      ],
      ta: [
        "மூன்று குளங்கள்: கலாவாவ, மின்னேரியா, அபயவாவ, திஸ்ஸவாவ, பதவிய [6 புள்ளிகள்].",
        "பிசோகொட்டுவ மதகு வழி நீர் வெளியேறும் முன் நீர் அழுத்தத்தைக் கட்டுப்படுத்தி அணையைப் பாதுகாத்தது [6 புள்ளிகள்].",
      ],
    },
  },
];
