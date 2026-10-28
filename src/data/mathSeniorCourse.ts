import { Course } from '../types';

export const COURSE_MATH_SENIOR: Course = {
  "id": "MATH_SENIOR_FUNDAMENTAL_01",
  "name": "คณิตศาสตร์ ม.ปลาย (สสวท. + A-Level / สอวน.)",
  "code": "MATH_SENIOR_FUNDAMENTAL_01",
  "gradeLevel": "มัธยมศึกษาตอนปลาย (ม.4 – ม.6)",
  "description": "หลักสูตรคณิตศาสตร์ ม.ปลาย ฉบับสมบูรณ์ 16 บทเรียน โครงสร้าง 4 ระดับ (Level 1 - Level 4) ครอบคลุมตามหลักสูตรแกนกลาง สสวท. (ม.4 – ม.6 ฉบับปรับปรุง พ.ศ. 2560) ทั้งสาระพื้นฐานและเพิ่มเติม บูรณาการเทคนิคคิดเร็วและรูปแบบข้อสอบ A-Level คณิตประยุกต์ 1, คณิตประยุกต์ 2 และ สอวน. คณิตศาสตร์",
  "passcode": "MATH401",
  "badgeColor": "#2563EB",
  "topics": [
    {
      "id": "math_s_t1",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 1: เซต (Sets)",
      "nameEn": "Set Theory & Applications",
      "sortOrder": 1,
      "subtopics": [
        {
          "id": "math_s_t1_s1",
          "topicId": "math_s_t1",
          "level": 1,
          "name": "1.1 ความรู้เบื้องต้นและสัญลักษณ์พื้นฐานเกี่ยวกับเซต",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การเขียนเซตแบบแจกแจงสมาชิกและแบบบอกเงื่อนไข สมาชิก $\\in$, $\\notin$, เซตจำกัด เซตอนันต์ และเซตว่าง $\\emptyset$"
        },
        {
          "id": "math_s_t1_s1_1",
          "topicId": "math_s_t1",
          "parentId": "math_s_t1_s1",
          "level": 2,
          "name": "ความสัมพันธ์ระหว่างเซต: สับเซต และเอกภพสัมพัทธ์ ($\\mathcal{U}$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "นิยามสับเซต ($A \\subset B$), สับเซตแท้, จำนวนสับเซตทั้งหมด $2^n$ และสับเซตแท้ $2^n - 1$"
        },
        {
          "id": "math_s_t1_s1_2",
          "topicId": "math_s_t1",
          "parentId": "math_s_t1_s1",
          "level": 3,
          "name": "เพาเวอร์เซต ($P(A)$) และสมบัติสำคัญ",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "นิยามเพาเวอร์เซต $P(A)$, จำนวนสมาชิก $n(P(A)) = 2^n$, การตรวจสอบ $\\in P(A)$ และ $\\subset P(A)$"
        },
        {
          "id": "math_s_t1_s1_3",
          "topicId": "math_s_t1",
          "parentId": "math_s_t1_s1",
          "level": 4,
          "name": "เทคนิค: เทคนิคเช็คความเป็นสมาชิก $\\in$ vs สับเซต $\\subset$ ในเพาเวอร์เซตซ้อน",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "จุดดักข้อสอบยอดนิยมเรื่องการปลดปีกกาเพาเวอร์เซต $x \\in P(A) \\iff x \\subset A$"
        },
        {
          "id": "math_s_t1_s2",
          "topicId": "math_s_t1",
          "level": 1,
          "name": "1.2 การดำเนินการของเซตและแผนภาพเวนน์ (Venn Diagrams)",
          "sortOrder": 5,
          "difficulty": "basic",
          "description": "ยูเนียน ($A \\cup B$), อินเตอร์เซกชัน ($A \\cap B$), คอมพลีเมนต์ ($A'$), และผลต่าง ($A - B$)"
        },
        {
          "id": "math_s_t1_s2_1",
          "topicId": "math_s_t1",
          "parentId": "math_s_t1_s2",
          "level": 2,
          "name": "สมบัติการดำเนินการของเซตและกฎของเดอมอร์แกน (De Morgan's Laws)",
          "sortOrder": 6,
          "difficulty": "intermediate",
          "description": "$(A \\cup B)' = A' \\cap B'$, $(A \\cap B)' = A' \\cup B'$, และการกระจาย $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$"
        },
        {
          "id": "math_s_t1_s2_2",
          "topicId": "math_s_t1",
          "parentId": "math_s_t1_s2",
          "level": 3,
          "name": "การหาจำนวนสมาชิกของเซตจำกัด 2 และ 3 เซต",
          "sortOrder": 7,
          "difficulty": "intermediate",
          "description": "สูตร $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$ และสูตร 3 เซต $n(A \\cup B \\cup C)$"
        },
        {
          "id": "math_s_t1_s2_3",
          "topicId": "math_s_t1",
          "parentId": "math_s_t1_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การแก้โจทย์ปัญหาค่ามากสุด-น้อยสุด (Max-Min) ของเซต",
          "sortOrder": 8,
          "difficulty": "advanced",
          "description": "เทคนิคการลงตัวแปรในแผนภาพเวนน์และการวิเคราะห์อสมการหาค่าขอบเขตสมาชิก $n(A \\cap B)_{\\min}$ และ $n(A \\cap B)_{\\max}$"
        }
      ]
    },
    {
      "id": "math_s_t2",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 2: ตรรกศาสตร์เบื้องต้น (Mathematical Logic)",
      "nameEn": "Propositional Logic & Quantifiers",
      "sortOrder": 2,
      "subtopics": [
        {
          "id": "math_s_t2_s1",
          "topicId": "math_s_t2",
          "level": 1,
          "name": "2.1 ประพจน์และตัวเชื่อมประพจน์ (Logical Connectives)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "นิยามประพจน์ ค่าความจริงจริง ($T$) เท็จ ($F$) ตัวเชื่อม $\\land, \\lor, \\to, \\leftrightarrow, \\sim$"
        },
        {
          "id": "math_s_t2_s1_1",
          "topicId": "math_s_t2",
          "parentId": "math_s_t2_s1",
          "level": 2,
          "name": "การสร้างตารางค่าความจริงและการหาค่าความจริงของประพจน์เชิงประกอบ",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "ตารางค่าความจริง $2^n$ กรณี และการหาค่าความจริงโดยการสาวกิ่งย้อนกลับ"
        },
        {
          "id": "math_s_t2_s1_2",
          "topicId": "math_s_t2",
          "parentId": "math_s_t2_s1",
          "level": 3,
          "name": "รูปแบบของประพจน์ที่สมมูลกัน (Equivalence: $\\equiv$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "สมมูลสำคัญ: $p \\to q \\equiv \\sim p \\lor q \\equiv \\sim q \\to \\sim p$ (แย้งสลับที่) และกฎเดอมอร์แกน"
        },
        {
          "id": "math_s_t2_s1_3",
          "topicId": "math_s_t2",
          "parentId": "math_s_t2_s1",
          "level": 3,
          "name": "สัจนิรันดร์ (Tautology) และการตรวจสอบ",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การตรวจสอบด้วยตารางค่าความจริง และวิธีสมมติตัวขัดแย้ง (Proof by Contradiction: สมมติให้เป็นเท็จ)"
        },
        {
          "id": "math_s_t2_s2",
          "topicId": "math_s_t2",
          "level": 1,
          "name": "2.2 การอ้างเหตุผลและตัวบ่งปริมาณ (Quantifiers)",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "การตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล ประโยคเปิด และตัวบ่งปริมาณ $\\forall, \\exists$"
        },
        {
          "id": "math_s_t2_s2_1",
          "topicId": "math_s_t2",
          "parentId": "math_s_t2_s2",
          "level": 2,
          "name": "การตรวจสอบความสมเหตุสมผลของการอ้างเหตุผล (Validity of Arguments)",
          "sortOrder": 6,
          "difficulty": "intermediate",
          "description": "การเชื่อมเหตุด้วย $\\land$ นำไปสู่ผลด้วย $\\to$ แล้วตรวจสอบสัจนิรันดร์ หรือการสมมติให้ผลเป็นเท็จเพื่อหาข้อขัดแย้ง"
        },
        {
          "id": "math_s_t2_s2_2",
          "topicId": "math_s_t2",
          "parentId": "math_s_t2_s2",
          "level": 3,
          "name": "ค่าความจริงของประโยคที่มีตัวบ่งปริมาณตัวแปรเดียวและสองตัวแปร",
          "sortOrder": 7,
          "difficulty": "intermediate",
          "description": "นิยาม $\\forall x P(x), \\exists x P(x)$ และระบบ 2 ตัวแปร $\\forall x \\exists y, \\exists x \\forall y$ ภายใต้เอกภพสัมพัทธ์ $\\mathcal{U}$"
        },
        {
          "id": "math_s_t2_s2_3",
          "topicId": "math_s_t2",
          "parentId": "math_s_t2_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: นิเสธของตัวบ่งปริมาณและเทคนิคการเช็ค $\\forall x \\exists y$ ใน 10 วินาที",
          "sortOrder": 8,
          "difficulty": "advanced",
          "description": "กฎ $\\sim [\\forall x P(x)] \\equiv \\exists x [\\sim P(x)]$ และโจทย์สับสนเรื่องตัวเลือก $y$ ขึ้นกับค่า $x$"
        }
      ]
    },
    {
      "id": "math_s_t3",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 3: จำนวนจริงและพหุนาม (Real Numbers and Polynomials)",
      "nameEn": "Real Number System & Polynomial Theory",
      "sortOrder": 3,
      "subtopics": [
        {
          "id": "math_s_t3_s1",
          "topicId": "math_s_t3",
          "level": 1,
          "name": "3.1 ระบบจำนวนจริงและทฤษฎีบทเศษเหลือ-ตัวประกอบ",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "สมบัติทางพีชคณิต ทฤษฎีบทเศษเหลือ (Remainder Theorem) และทฤษฎีบทตัวประกอบ (Factor Theorem)"
        },
        {
          "id": "math_s_t3_s1_1",
          "topicId": "math_s_t3",
          "parentId": "math_s_t3_s1",
          "level": 2,
          "name": "การหารสังเคราะห์ (Synthetic Division) และการแยกตัวประกอบดีกรีสูง",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "ขั้นตอนการหารสังเคราะห์ และทฤษฎีตัวประกอบตรรกยะ $\\frac{p}{q}$ เพื่อหารากที่เป็นไปได้ของพหุนาม"
        },
        {
          "id": "math_s_t3_s1_2",
          "topicId": "math_s_t3",
          "parentId": "math_s_t3_s1",
          "level": 3,
          "name": "สมการและอสมการพหุนามตัวแปรเดียว (Polynomial Inequalities)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การลงจุดวิกฤตบนเส้นจำนวน เส้นคลื่นเครื่องหมาย $+ - + -$, ช่วงเปิด-ปิด, และกำลังคู่/คี่"
        },
        {
          "id": "math_s_t3_s2",
          "topicId": "math_s_t3",
          "level": 1,
          "name": "3.2 สมการและอสมการเศษส่วนพหุนาม (Rational Inequalities)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การจัดรูป $\\frac{P(x)}{Q(x)} \\ge 0$ การคูณด้วย $Q(x)^2$ และเงื่อนไขตัวส่วนห้ามเป็นศูนย์ ($Q(x) \\neq 0$)"
        },
        {
          "id": "math_s_t3_s2_1",
          "topicId": "math_s_t3",
          "parentId": "math_s_t3_s2",
          "level": 3,
          "name": "ค่าสัมบูรณ์ของจำนวนจริง: สมการและอสมการ ($|x| < a, |x| > a$)",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "นิยาม $|x|$, สมบัติ $|ab| = |a||b|$, การปลดค่าสัมบูรณ์ด้วยการแบ่งกรณีช่วง หรือการยกกำลังสองสองข้าง"
        },
        {
          "id": "math_s_t3_s2_2",
          "topicId": "math_s_t3",
          "parentId": "math_s_t3_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: สมการค่าสัมบูรณ์รูป $|A| + |B| = |A + B|$ และอสมการสามเหลี่ยม",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "สูตรลัดปลดสมการค่าสัมบูรณ์ 3 วินาที: $|A| + |B| = |A + B| \\iff A \\cdot B \\ge 0$ ไม่ต้องเสียเวลาแบ่งช่วง"
        }
      ]
    },
    {
      "id": "math_s_t4",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 4: ความสัมพันธ์และฟังก์ชัน (Relations and Functions)",
      "nameEn": "Relations, Functions & Transformations",
      "sortOrder": 4,
      "subtopics": [
        {
          "id": "math_s_t4_s1",
          "topicId": "math_s_t4",
          "level": 1,
          "name": "4.1 ผลคูณคาร์ทีเซียน ความสัมพันธ์ โดเมน และเรนจ์",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "คู่อันดับ $(a, b)$, $A \\times B$, ความสัมพันธ์ $r \\subset A \\times B$, โดเมน $D_r$ และเรนจ์ $R_r$"
        },
        {
          "id": "math_s_t4_s1_1",
          "topicId": "math_s_t4",
          "parentId": "math_s_t4_s1",
          "level": 2,
          "name": "เทคนิคการหาโดเมนและเรนจ์ของความสัมพันธ์และฟังก์ชัน",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "เงื่อนไขทางคณิตศาสตร์: ตัวส่วน $\\neq 0$, ภายในสแควร์รูท $\\ge 0$, กราฟรูปพาราโบลา และค่าสัมบูรณ์"
        },
        {
          "id": "math_s_t4_s1_2",
          "topicId": "math_s_t4",
          "parentId": "math_s_t4_s1",
          "level": 2,
          "name": "นิยามฟังก์ชัน การทดสอบเส้นแนวตั้ง (Vertical Line Test) และชนิดฟังก์ชัน",
          "sortOrder": 3,
          "difficulty": "basic",
          "description": "ฟังก์ชัน 1-1 (One-to-One), ฟังก์ชันทั่วถึง (Onto), ฟังก์ชันเพิ่ม (Increasing) และฟังก์ชันลด (Decreasing)"
        },
        {
          "id": "math_s_t4_s2",
          "topicId": "math_s_t4",
          "level": 1,
          "name": "4.2 พีชคณิตของฟังก์ชัน ฟังก์ชันประกอบ (Composite) และฟังก์ชันผกผัน (Inverse)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การบวก ลบ คูณ หารฟังก์ชัน, โดเมน $D_{f \\pm g}$, ฟังก์ชันประกอบ $(g \\circ f)(x) = g(f(x))$"
        },
        {
          "id": "math_s_t4_s2_1",
          "topicId": "math_s_t4",
          "parentId": "math_s_t4_s2",
          "level": 3,
          "name": "การหาฟังก์ชันผกผัน ($f^{-1}(x)$) และสมบัติสมมาตรข้ามเส้นตรง $y = x$",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "ขั้นตอนการหา $f^{-1}$: สลับ $x$ กับ $y$ แล้วจัดรูปใหม่, เงื่อนไขการมีอินเวอร์สต้องเป็นฟังก์ชัน 1-1 ทั่วถึง"
        },
        {
          "id": "math_s_t4_s2_2",
          "topicId": "math_s_t4",
          "parentId": "math_s_t4_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การแก้สมการฟังก์ชันประกอบ $f(g(x))$ และการแก้สมการเชิงฟังก์ชัน (Functional Equations)",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "เทคนิคการเปลี่ยนตัวแปร $u = g(x)$ ย้อนกลับเพื่อหา $f(x)$ และโจทย์สไตล์ สอวน. / A-Level"
        }
      ]
    },
    {
      "id": "math_s_t5",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 5: ฟังก์ชันเอกซ์โพเนนเชียลและฟังก์ชันลอการิทึม (Exponential & Logarithmic Functions)",
      "nameEn": "Exponents, Radicals & Logarithms",
      "sortOrder": 5,
      "subtopics": [
        {
          "id": "math_s_t5_s1",
          "topicId": "math_s_t5",
          "level": 1,
          "name": "5.1 เลขยกกำลังและฟังก์ชันเอกซ์โพเนนเชียล ($y = a^x$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "สมบัติเลขยกกำลัง กรณฑ์ กราฟเอกซ์โพเนนเชียล: ฟังก์ชันเพิ่ม ($a > 1$) vs ฟังก์ชันลด ($0 < a < 1$)"
        },
        {
          "id": "math_s_t5_s1_1",
          "topicId": "math_s_t5",
          "parentId": "math_s_t5_s1",
          "level": 2,
          "name": "การแก้สมการและอสมการเอกซ์โพเนนเชียล",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "การทำฐานให้เท่ากัน, การสมมติตัวแปรช่วย $A = a^x$ เพื่อแก้สมการกำลังสอง, ข้อควรระวังการกลับเครื่องหมายอสมการเมื่อ $0 < a < 1$"
        },
        {
          "id": "math_s_t5_s2",
          "topicId": "math_s_t5",
          "level": 1,
          "name": "5.2 ฟังก์ชันลอการิทึม ($y = \\log_a x$) และสมบัติของลอการิทึม",
          "sortOrder": 3,
          "difficulty": "basic",
          "description": "นิยามลอการิทึมในฐานะอินเวอร์สของเอกซ์โพเนนเชียล $\\log_a x = y \\iff a^y = x$, ข้อกำหนดหลังล็อก $x > 0$ และฐาน $a > 0, a \\neq 1$"
        },
        {
          "id": "math_s_t5_s2_1",
          "topicId": "math_s_t5",
          "parentId": "math_s_t5_s2",
          "level": 2,
          "name": "10 สมบัติพื้นฐานของลอการิทึม ลอการิทึมสามัญ (ฐาน 10) และลอการิทึมธรรมชาติ ($\\ln x$ ฐาน $e$)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "$\\log(MN) = \\log M + \\log N$, $\\log(M/N) = \\log M - \\log N$, $\\log_a M^k = k \\log_a M$, การเปลี่ยนฐาน $\\log_a b = \\frac{\\log_c b}{\\log_c a}$"
        },
        {
          "id": "math_s_t5_s2_2",
          "topicId": "math_s_t5",
          "parentId": "math_s_t5_s2",
          "level": 3,
          "name": "การแก้สมการและอสมการลอการิทึม",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "การปลดล็อก การยุบผลบวกลบเป็นคูณหาร และการตรวจคำตอบตามเงื่อนไขหลังล็อก $x > 0$ เสมอ"
        },
        {
          "id": "math_s_t5_s2_3",
          "topicId": "math_s_t5",
          "parentId": "math_s_t5_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: เทคนิคเทคล็อกสองข้าง และกับดักข้อสอบ A-Level เรื่องเงื่อนไขฐานตัวแปร",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "การแก้โจทย์เลขชี้กำลังติดตัวแปรต่างฐาน เช่น $2^{x+1} = 3^{x-1}$ ด้วยการ Take Log และโจทย์ฐานเป็นตัวแปร $\\log_{x-1}(x+3)$"
        }
      ]
    },
    {
      "id": "math_s_t6",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 6: เรขาคณิตวิเคราะห์และภาคตัดกรวย (Analytic Geometry & Conic Sections)",
      "nameEn": "Coordinate Geometry & Conics",
      "sortOrder": 6,
      "subtopics": [
        {
          "id": "math_s_t6_s1",
          "topicId": "math_s_t6",
          "level": 1,
          "name": "6.1 เรขาคณิตวิเคราะห์บนระนาบพิกัดฉาก",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ระยะห่างระหว่างจุด $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$, จุดกึ่งกลาง, จุดตัดตามอัตราส่วน, ความชัน $m = \\frac{y_2-y_1}{x_2-x_1}$"
        },
        {
          "id": "math_s_t6_s1_1",
          "topicId": "math_s_t6",
          "parentId": "math_s_t6_s1",
          "level": 2,
          "name": "สมการเส้นตรง เส้นขนาน เส้นตั้งฉาก และระยะห่างระหว่างจุดกับเส้นตรง",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "สมการ $Ax + By + C = 0$, เส้นขนานความชันเท่ากัน, เส้นตั้งฉาก $m_1 \\cdot m_2 = -1$, ระยะห่าง $d = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2+B^2}}$"
        },
        {
          "id": "math_s_t6_s2",
          "topicId": "math_s_t6",
          "level": 1,
          "name": "6.2 ภาคตัดกรวย: วงกลมและพาราโบลา",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "สมการมาตรฐานและทั่วไปของวงกลม $(x-h)^2 + (y-k)^2 = r^2$, พาราโบลา $(y-k)^2 = 4c(x-h)$ จุดยอด โฟกัส และไดเรกตริกซ์"
        },
        {
          "id": "math_s_t6_s2_1",
          "topicId": "math_s_t6",
          "parentId": "math_s_t6_s2",
          "level": 2,
          "name": "ภาคตัดกรวย: วงรีและไฮเพอร์โบลา",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "วงรี: จุดยอด โฟกัส แกนเอก แกนโท ความสัมพันธ์ $a^2 = b^2 + c^2$; ไฮเพอร์โบลา: $c^2 = a^2 + b^2$ เส้นกำกับ (Asymptotes)"
        },
        {
          "id": "math_s_t6_s2_2",
          "topicId": "math_s_t6",
          "parentId": "math_s_t6_s2",
          "level": 3,
          "name": "การจัดรูปสมการทั่วไปสู่รูปมาตรฐานด้วยกำลังสองสมบูรณ์",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "การแยกแยะชนิดภาคตัดกรวยจากสมการ $Ax^2 + Cy^2 + Dx + Ey + F = 0$ (ดูเครื่องหมาย $A, C$)"
        },
        {
          "id": "math_s_t6_s2_3",
          "topicId": "math_s_t6",
          "parentId": "math_s_t6_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: เทคนิคหาเส้นสัมผัสภาคตัดกรวย และนิยามผลบวก/ผลต่างคงที่",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "นิยามทรงคุณค่า: วงรี $|PF_1| + |PF_2| = 2a$, ไฮเพอร์โบลา $||PF_1| - |PF_2|| = 2a$ แก้โจทย์ซับซ้อนโดยไม่ต้องเขียนสมการ"
        }
      ]
    },
    {
      "id": "math_s_t7",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 7: ฟังก์ชันตรีโกณมิติ (Trigonometric Functions)",
      "nameEn": "Trigonometry & Inverse Trig Functions",
      "sortOrder": 7,
      "subtopics": [
        {
          "id": "math_s_t7_s1",
          "topicId": "math_s_t7",
          "level": 1,
          "name": "7.1 วงกลมหนึ่งหน่วยและการวัดมุม (เรเดียน vs องศา)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การแปลง $\\pi \\text{ rad} = 180^\\circ$, พิกัด $(\\cos \\theta, \\sin \\theta)$ บนวงกลมหนึ่งหน่วย $x^2 + y^2 = 1$, จตุภาค 1-4"
        },
        {
          "id": "math_s_t7_s1_1",
          "topicId": "math_s_t7",
          "parentId": "math_s_t7_s1",
          "level": 2,
          "name": "นิยาม 6 ฟังก์ชันตรีโกณมิติ และเอกลักษณ์พีทาโกรัส",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "$\\sin, \\cos, \\tan, \\csc, \\sec, \\cot$, เอกลักษณ์ $\\sin^2 \\theta + \\cos^2 \\theta = 1$, $1 + \\tan^2 \\theta = \\sec^2 \\theta$, $1 + \\cot^2 \\theta = \\csc^2 \\theta$"
        },
        {
          "id": "math_s_t7_s1_2",
          "topicId": "math_s_t7",
          "parentId": "math_s_t7_s1",
          "level": 3,
          "name": "สูตรมุมประกอบ มุมสองเท่า สามเท่า และครึ่งเท่า (Trig Identities)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$\\sin(A \\pm B), \\cos(A \\pm B), \\tan(A \\pm B)$, มุมสองเท่า $\\sin 2A = 2\\sin A \\cos A$, $\\cos 2A = \\cos^2 A - \\sin^2 A$, และการแปลงผลคูณผลบวก"
        },
        {
          "id": "math_s_t7_s2",
          "topicId": "math_s_t7",
          "level": 1,
          "name": "7.2 กราฟตรีโกณมิติและฟังก์ชันตรีโกณมิติผกผัน (Inverse Trig)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "คาบ แอมพลิจูด ของฟังก์ชันคลื่น, โดเมนและเรนจ์ของ $\\arcsin x, \\arccos x, \\arctan x$"
        },
        {
          "id": "math_s_t7_s2_1",
          "topicId": "math_s_t7",
          "parentId": "math_s_t7_s2",
          "level": 3,
          "name": "กฎของไซน์ (Law of Sines) และกฎของโคไซน์ (Law of Cosines)",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "สูตรสามเหลี่ยมใด ๆ: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$, $c^2 = a^2 + b^2 - 2ab \\cos C$, พื้นที่ $\\frac{1}{2}ab \\sin C$"
        },
        {
          "id": "math_s_t7_s2_2",
          "topicId": "math_s_t7",
          "parentId": "math_s_t7_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การแก้สมการตรีโกณมิติและเทคนิคแปลงรูป $A\\sin x + B\\cos x = R\\sin(x + \\phi)$",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "เทคนิคหาค่าสูงสุดต่ำสุดของ $A\\sin x + B\\cos x$ คือ $\\pm \\sqrt{A^2 + B^2}$ และโจทย์ A-Level อาร์กตรีโกณมิติ"
        }
      ]
    },
    {
      "id": "math_s_t8",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 8: เมทริกซ์ (Matrices)",
      "nameEn": "Matrix Algebra & Linear Systems",
      "sortOrder": 8,
      "subtopics": [
        {
          "id": "math_s_t8_s1",
          "topicId": "math_s_t8",
          "level": 1,
          "name": "8.1 ความรู้เบื้องต้นและการดำเนินการบนเมทริกซ์",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "มิติ $m \\times n$, เมทริกซ์แถว หลัก จัตุรัส เอกลักษณ์, การบวก ลบ การคูณด้วยสเกลาร์ และทรานสโพส ($A^t$)"
        },
        {
          "id": "math_s_t8_s1_1",
          "topicId": "math_s_t8",
          "parentId": "math_s_t8_s1",
          "level": 2,
          "name": "การคูณระหว่างเมทริกซ์ (Matrix Multiplication) และสมบัติ",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "เงื่อนไขจำนวนหลักตัวหน้าเท่ากับแถวตัวหลัง, สมบัติ $AB \\neq BA$ (ไม่มีการสลับที่การคูณโดยทั่วไป)"
        },
        {
          "id": "math_s_t8_s2",
          "topicId": "math_s_t8",
          "level": 1,
          "name": "8.2 ดีเทอร์มิแนนต์ (Determinant: $\\det(A)$) และอินเวิร์สการคูณ ($A^{-1}$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การหาดีเทอร์มิแนนต์ขนาด $2 \\times 2$ และ $3 \\times 3$, ไมเนอร์ $M_{ij}$, โคแฟกเตอร์ $C_{ij}$, และเมทริกซ์ผูกพัน $\\operatorname{adj}(A)$"
        },
        {
          "id": "math_s_t8_s2_1",
          "topicId": "math_s_t8",
          "parentId": "math_s_t8_s2",
          "level": 3,
          "name": "สมบัติสำคัญของดีเทอร์มิแนนต์: $\\det(AB) = \\det(A)\\det(B)$ และ $\\det(kA) = k^n \\det(A)$",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "สมบัติ: $\\det(A^t) = \\det(A)$, $\\det(A^{-1}) = \\frac{1}{\\det(A)}$, แถวเป็นศูนย์หรือซ้ำกัน $\\det = 0$"
        },
        {
          "id": "math_s_t8_s2_2",
          "topicId": "math_s_t8",
          "parentId": "math_s_t8_s2",
          "level": 3,
          "name": "การแก้ระบบสมการเชิงเส้น: กฎของคราเมอร์ (Cramer's Rule) และ ERO",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "สูตรคราเมอร์ $x_i = \\frac{\\det(A_i)}{\\det(A)}$ และการดำเนินการตามแถวขั้นมูลฐาน (Elementary Row Operations) เพื่อหา $A^{-1}$ และคำตอบ"
        },
        {
          "id": "math_s_t8_s2_3",
          "topicId": "math_s_t8",
          "parentId": "math_s_t8_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: เทคนิค ERO ลดรูปเมทริกซ์ และการวิเคราะห์ภาวะมีคำตอบเดียว/นับไม่ถ้วน/ไม่มีคำตอบ",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "วิเคราะห์ความสอดคล้องของระบบสมการเมื่อ $\\det(A) = 0$ (Infinite solutions vs Inconsistent)"
        }
      ]
    },
    {
      "id": "math_s_t9",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 9: เวกเตอร์ในสามมิติ (Vectors in Three Dimensions)",
      "nameEn": "Vector Algebra, Dot & Cross Products",
      "sortOrder": 9,
      "subtopics": [
        {
          "id": "math_s_t9_s1",
          "topicId": "math_s_t9",
          "level": 1,
          "name": "9.1 ระบบพิกัดฉากสามมิติและเวกเตอร์เบื้องต้น",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "แกน $X, Y, Z$, อัฐภาค (Octants), การเขียนเวกเตอร์ในรูป $\\begin{bmatrix} a \\\\ b \\\\ c \\end{bmatrix}$ หรือ $a\\hat{i} + b\\hat{j} + c\\hat{k}$"
        },
        {
          "id": "math_s_t9_s1_1",
          "topicId": "math_s_t9",
          "parentId": "math_s_t9_s1",
          "level": 2,
          "name": "ขนาดของเวกเตอร์ (Magnitude) และเวกเตอร์หนึ่งหน่วย (Unit Vector)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "$|\\vec{u}| = \\sqrt{a^2 + b^2 + c^2}$, เวกเตอร์หนึ่งหน่วย $\\hat{u} = \\frac{\\vec{u}}{|\\vec{u}|}$, โคไซน์แสดงทิศทาง (Direction Cosines)"
        },
        {
          "id": "math_s_t9_s2",
          "topicId": "math_s_t9",
          "level": 1,
          "name": "9.2 ผลคูณเชิงสเกลาร์ (Dot Product: $\\vec{u} \\cdot \\vec{v}$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "นิยาม $\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\vec{u}||\\vec{v}| \\cos \\theta$, การตรวจสอบเวกเตอร์ตั้งฉาก ($\\vec{u} \\cdot \\vec{v} = 0$)"
        },
        {
          "id": "math_s_t9_s2_1",
          "topicId": "math_s_t9",
          "parentId": "math_s_t9_s2",
          "level": 3,
          "name": "ผลคูณเชิงเวกเตอร์ (Cross Product: $\\vec{u} \\times \\vec{v}$)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การหาดีเทอร์มิแนนต์เวกเตอร์ $\\vec{u} \\times \\vec{v}$, เวกเตอร์ผลลัพธ์ตั้งฉากกับระนาบ, ขนาด $|\\vec{u} \\times \\vec{v}| = |\\vec{u}||\\vec{v}| \\sin \\theta$"
        },
        {
          "id": "math_s_t9_s2_2",
          "topicId": "math_s_t9",
          "parentId": "math_s_t9_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การประยุกต์หาพื้นที่สี่เหลี่ยมด้านขนานและปริมาตรทรงสี่เหลี่ยมด้านขนาน (Scalar Triple Product)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "พื้นที่ = $|\\vec{u} \\times \\vec{v}|$, ปริมาตร = $|\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|$ และการทดสอบเวกเตอร์อยู่บนระนาบเดียวกัน"
        }
      ]
    },
    {
      "id": "math_s_t10",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 10: จำนวนเชิงซ้อน (Complex Numbers)",
      "nameEn": "Complex Numbers & De Moivre's Theorem",
      "sortOrder": 10,
      "subtopics": [
        {
          "id": "math_s_t10_s1",
          "topicId": "math_s_t10",
          "level": 1,
          "name": "10.1 พีชคณิตของจำนวนเชิงซ้อนและสังยุค (Conjugate)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "หน่วยจินตภาพ $i = \\sqrt{-1}, i^2 = -1, i^3 = -i, i^4 = 1$, รูปมาตรฐาน $z = a + bi$, สังยุค $\\bar{z} = a - bi$, ค่าสัมบูรณ์ $|z| = \\sqrt{a^2 + b^2}$"
        },
        {
          "id": "math_s_t10_s1_1",
          "topicId": "math_s_t10",
          "parentId": "math_s_t10_s1",
          "level": 2,
          "name": "การบวก ลบ คูณ หาร และสมบัติของสังยุคและค่าสัมบูรณ์",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "สมบัติ: $|z_1 z_2| = |z_1||z_2|$, $|z|^2 = z \\bar{z}$, $\\overline{z_1 + z_2} = \\bar{z}_1 + \\bar{z}_2$, การคูณด้วยสังยุคเพื่อปลดส่วน $i$"
        },
        {
          "id": "math_s_t10_s2",
          "topicId": "math_s_t10",
          "level": 1,
          "name": "10.2 รูปเชิงขั้ว (Polar Form) และทฤษฎีบทของเดอมัวฟ์ (De Moivre's Theorem)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การแปลง $z = r(\\cos \\theta + i\\sin \\theta) = r\\operatorname{cis}\\theta$, ทฤษฎีเดอมัวฟ์ $z^n = r^n(\\cos n\\theta + i\\sin n\\theta)$"
        },
        {
          "id": "math_s_t10_s2_1",
          "topicId": "math_s_t10",
          "parentId": "math_s_t10_s2",
          "level": 3,
          "name": "การหารากที่ $n$ ของจำนวนเชิงซ้อน (Roots of Complex Numbers)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "สูตรรากที่ $n$: $w_k = r^{1/n} \\operatorname{cis}\\left(\\frac{\\theta + 2k\\pi}{n}\\right)$ สำหรับ $k = 0, 1, 2, \\dots, n-1$ และการกระจายตัวสมมาตรบนวงกลม"
        },
        {
          "id": "math_s_t10_s2_2",
          "topicId": "math_s_t10",
          "parentId": "math_s_t10_s2",
          "level": 3,
          "name": "ทฤษฎีบทหลักมูลของพีชคณิตและรากของสมการพหุนาม",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "ทฤษฎีบท: พหุนามดีกรี $n$ จะมีรากเชิงซ้อน $n$ ตัวเสมอ และถ้ารากตัวหนึ่งคือ $a+bi$ สังยุค $a-bi$ จะเป็นรากด้วยเสมอ"
        },
        {
          "id": "math_s_t10_s2_3",
          "topicId": "math_s_t10",
          "parentId": "math_s_t10_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การแก้สมการรากที่หนึ่งของหนึ่งภาพ (Roots of Unity) และเรขาคณิตระนาบเชิงซ้อน (Argand Diagram)",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "การประยุกต์ $z^n = 1$ หาผลบวกและผลคูณรากเชิงซ้อน และจุดตัดรูปหลายเหลี่ยมด้านเท่า"
        }
      ]
    },
    {
      "id": "math_s_t11",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 11: หลักการนับเบื้องต้นและความน่าจะเป็น (Combinatorics & Probability)",
      "nameEn": "Permutations, Combinations & Probability",
      "sortOrder": 11,
      "subtopics": [
        {
          "id": "math_s_t11_s1",
          "topicId": "math_s_t11",
          "level": 1,
          "name": "11.1 กฎการนับเบื้องต้นและการเรียงสับเปลี่ยน (Permutations: $P_{n, r}$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "หลักการบวก หลักการคูณ แฟกทอเรียล $n!$, การเรียงสับเปลี่ยนสิ่งของแตกต่างกันทั้งหมด $P_{n, r} = \\frac{n!}{(n-r)!}$"
        },
        {
          "id": "math_s_t11_s1_1",
          "topicId": "math_s_t11",
          "parentId": "math_s_t11_s1",
          "level": 2,
          "name": "การเรียงสับเปลี่ยนสิ่งของที่ซ้ำกันบางส่วน และการเรียงสับเปลี่ยนเชิงวงกลม",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "สิ่งของซ้ำ $\\frac{n!}{n_1! n_2! \\dots n_k!}$, วงกลม 2 มิติ $(n-1)!$, วงกลม 3 มิติ (พวงมาลัย) $\\frac{(n-1)!}{2}$"
        },
        {
          "id": "math_s_t11_s1_2",
          "topicId": "math_s_t11",
          "parentId": "math_s_t11_s1",
          "level": 2,
          "name": "การจัดหมู่ (Combinations: $\\binom{n}{r}$) และทฤษฎีบททวินาม (Binomial Theorem)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การเลือกของโดยไม่คำนึงถึงลำดับ $\\binom{n}{r} = \\frac{n!}{r!(n-r)!}$, สัมประสิทธิ์ทวินาม และพจน์ทั่วไป $T_{r+1} = \\binom{n}{r} a^{n-r} b^r$"
        },
        {
          "id": "math_s_t11_s2",
          "topicId": "math_s_t11",
          "level": 1,
          "name": "11.2 ความน่าจะเป็นของเหตุการณ์ (Probability: $P(E)$)",
          "sortOrder": 4,
          "difficulty": "basic",
          "description": "การทดลองสุ่ม ปริภูมิตัวอย่าง ($S$) เหตุการณ์ ($E$) สูตรพื้นฐาน $P(E) = \\frac{n(E)}{n(S)}$, กฎ $0 \\le P(E) \\le 1$"
        },
        {
          "id": "math_s_t11_s2_1",
          "topicId": "math_s_t11",
          "parentId": "math_s_t11_s2",
          "level": 3,
          "name": "กฎความน่าจะเป็น ความน่าจะเป็นมีเงื่อนไข ($P(A|B)$) และเหตุการณ์อิสระ",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$, $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$, เหตุการณ์อิสระ $P(A \\cap B) = P(A) \\cdot P(B)$"
        },
        {
          "id": "math_s_t11_s2_2",
          "topicId": "math_s_t11",
          "parentId": "math_s_t11_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: เทคนิคแยกกรณีแจกของ (Stars and Bars) และโจทย์ไพ่/ลูกเต๋ายอดฮิต",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "การแจกของเหมือนกันให้คนต่างกัน $\\binom{n+k-1}{k-1}$ และวิธีนับเหตุการณ์ตรงข้าม (Complement Method: $1 - P(E')$)"
        }
      ]
    },
    {
      "id": "math_s_t12",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 12: ลำดับและอนุกรม (Sequences and Series)",
      "nameEn": "Arithmetic, Geometric Sequences & Financial Math",
      "sortOrder": 12,
      "subtopics": [
        {
          "id": "math_s_t12_s1",
          "topicId": "math_s_t12",
          "level": 1,
          "name": "12.1 ลำดับเลขคณิตและลำดับเรขาคณิต (Arithmetic & Geometric Sequences)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "พจน์ทั่วไปลำดับเลขคณิต $a_n = a_1 + (n-1)d$, ลำดับเรขาคณิต $a_n = a_1 r^{n-1}$, พจน์กลางเลขคณิต/เรขาคณิต"
        },
        {
          "id": "math_s_t12_s1_1",
          "topicId": "math_s_t12",
          "parentId": "math_s_t12_s1",
          "level": 2,
          "name": "ลิมิตของลำดับอนันต์ (Limit of Sequences: $\\lim_{n \\to \\infty} a_n$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ลำดับลู่เข้า (Convergent) vs ลำดับลู่ออก (Divergent), เทคนิคดึงตัวประกอบดีกรีสูงสุดสำหรับพหุนามเศษส่วน"
        },
        {
          "id": "math_s_t12_s2",
          "topicId": "math_s_t12",
          "level": 1,
          "name": "12.2 อนุกรมจำกัดและอนุกรมอนันต์ (Series & Telescopic Sum)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "สัญลักษณ์ $\\sum$, ผลบวก $n$ พจน์แรก $S_n = \\frac{n}{2}(a_1 + a_n)$, $S_n = \\frac{a_1(1-r^n)}{1-r}$, ผลบวกอนุกรมอนันต์เรขาคณิต $S_\\infty = \\frac{a_1}{1-r}$ ($|r| < 1$)"
        },
        {
          "id": "math_s_t12_s2_1",
          "topicId": "math_s_t12",
          "parentId": "math_s_t12_s2",
          "level": 3,
          "name": "อนุกรมเทเลสโคปิก (Telescoping Series) และอนุกรมผสมเลขคณิต-เรขาคณิต (AGS)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "การแยกเศษส่วนย่อยเพื่อตัดทอนพจน์กลาง, เทคนิคคูณ $r$ เลื่อนพจน์แล้วนำมาลบกันเพื่อหาผลบวก $S_n$"
        },
        {
          "id": "math_s_t12_s2_2",
          "topicId": "math_s_t12",
          "parentId": "math_s_t12_s2",
          "level": 3,
          "name": "คณิตศาสตร์การเงิน: ดอกเบี้ยทบต้น มูลค่าปัจจุบัน และค่างวด (Financial Mathematics)",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "สูตรดอกเบี้ยทบต้น $A = P\\left(1 + \\frac{r}{k}\\right)^{kn}$, มูลค่าปัจจุบัน $PV$ และมูลค่าอนาคต $FV$, การคำนวณค่างวดรับ/จ่ายตอนต้นงวดและสิ้นงวด"
        },
        {
          "id": "math_s_t12_s2_3",
          "topicId": "math_s_t12",
          "parentId": "math_s_t12_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: สรุปภาพรวมสูตรค่างวดการเงินที่ออกสอบ A-Level ทุกปี",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "เทคนิคการวาดเส้นเวลา (Time Line) วางตำแหน่งเงินแต่ละก้อนเพื่อแปลงเป็นอนุกรมเรขาคณิตโดยไม่ต้องจำสูตรลัดยาว ๆ"
        }
      ]
    },
    {
      "id": "math_s_t13",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 13: แคลคูลัสเบื้องต้น (Calculus)",
      "nameEn": "Limits, Derivatives & Integrals",
      "sortOrder": 13,
      "subtopics": [
        {
          "id": "math_s_t13_s1",
          "topicId": "math_s_t13",
          "level": 1,
          "name": "13.1 ลิมิตและความต่อเนื่องของฟังก์ชัน (Limits & Continuity)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ลิมิตซ้าย $\\lim_{x \\to a^-} f(x)$, ลิมิตขวา $\\lim_{x \\to a^+} f(x)$, รูปแบบยังไม่กำหนด $\\frac{0}{0}$, ความต่อเนื่อง 3 เงื่อนไข"
        },
        {
          "id": "math_s_t13_s1_1",
          "topicId": "math_s_t13",
          "parentId": "math_s_t13_s1",
          "level": 2,
          "name": "เทคนิคแก้ลิมิตรูป $\\frac{0}{0}$: แยกตัวประกอบ คอนจูเกต และกฎโลปิตาล (L'Hôpital's Rule)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "การกำจัดตัวส่วนศูนย์ และสูตรลัดโลปิตาล $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$"
        },
        {
          "id": "math_s_t13_s2",
          "topicId": "math_s_t13",
          "level": 1,
          "name": "13.2 อนุพันธ์ของฟังก์ชัน (Differential Calculus: $f'(x)$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "นิยามอนุพันธ์ $f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$, กฎผลคูณ $(uv)'$, กฎผลหาร $(u/v)'$, และกฎลูกโซ่ (Chain Rule)"
        },
        {
          "id": "math_s_t13_s2_1",
          "topicId": "math_s_t13",
          "parentId": "math_s_t13_s2",
          "level": 3,
          "name": "การประยุกต์อนุพันธ์: เส้นสัมผัสโค้ง ฟังก์ชันเพิ่ม-ลด และค่าสุดขีด (Max-Min)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "ความชันเส้นสัมผัส $m = f'(x_0)$, จุดวิกฤต $f'(x) = 0$, การทดสอบอนุพันธ์อันดับสอง $f''(x)$ เพื่อตัดสินจุดสูงสุด/ต่ำสุดสัมพัทธ์"
        },
        {
          "id": "math_s_t13_s3",
          "topicId": "math_s_t13",
          "level": 1,
          "name": "13.3 ปริพันธ์ของฟังก์ชัน (Integral Calculus: $\\int f(x) dx$)",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "ปฏิยานุพันธ์และปริพันธ์ไม่จำกัดเขต $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$, ปริพันธ์จำกัดเขต $\\int_a^b f(x) dx = F(b) - F(a)$"
        },
        {
          "id": "math_s_t13_s3_1",
          "topicId": "math_s_t13",
          "parentId": "math_s_t13_s3",
          "level": 3,
          "name": "ทฤษฎีบทหลักมูลของแคลคูลัสและการหาพื้นที่ใต้เส้นโค้ง (Area Under Curve)",
          "sortOrder": 6,
          "difficulty": "intermediate",
          "description": "การคำนวณพื้นที่ปิดล้อมด้วยเส้นโค้งและแกน $X$, การระวังพื้นที่ใต้แกนที่มีค่าอินทิเกรตติดลบ ต้องใส่ค่าสัมบูรณ์"
        },
        {
          "id": "math_s_t13_s3_2",
          "topicId": "math_s_t13",
          "parentId": "math_s_t13_s3",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: โจทย์โจทย์ประยุกต์หาจุดสูงสุด-ต่ำสุดในชีวิตจริง และพื้นที่ระหว่างเส้นโค้ง 2 เส้น",
          "sortOrder": 7,
          "difficulty": "advanced",
          "description": "การตั้งสมการ 1 ตัวแปรจากโจทย์ปัญหาเรขาคณิต/เศรษฐศาสตร์ และการอินทิเกรต $\\int (y_{\\text{upper}} - y_{\\text{lower}}) dx$"
        }
      ]
    },
    {
      "id": "math_s_t14",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 14: สถิติศาสตร์และข้อมูล (Statistics)",
      "nameEn": "Data Analysis, Central Tendency & Dispersion",
      "sortOrder": 14,
      "subtopics": [
        {
          "id": "math_s_t14_s1",
          "topicId": "math_s_t14",
          "level": 1,
          "name": "14.1 ข้อมูลและการนำเสนอข้อมูล (Data Presentation)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ประเภทข้อมูล (เชิงปริมาณ vs เชิงคุณภาพ), ประชากร vs กลุ่มตัวอย่าง, ตารางความถี่ ฮิสโทแกรม แผนภาพลำต้นและใบ และแผนภาพกล่อง (Box Plot)"
        },
        {
          "id": "math_s_t14_s1_1",
          "topicId": "math_s_t14",
          "parentId": "math_s_t14_s1",
          "level": 2,
          "name": "ค่าวัดตำแหน่งที่ของข้อมูล: ควอร์ไทล์ ($Q_r$) และเปอร์เซ็นไทล์ ($P_r$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "ตำแหน่งข้อมูลไม่แจกแจงความถี่ $\\frac{r(N+1)}{4}$ และ $\\frac{r(N+1)}{100}$, การประมาณค่าระหว่างจุดด้วยสัดส่วน"
        },
        {
          "id": "math_s_t14_s2",
          "topicId": "math_s_t14",
          "level": 1,
          "name": "14.2 ค่าวัดแนวโน้มเข้าสู่ส่วนกลาง (Central Tendency)",
          "sortOrder": 3,
          "difficulty": "basic",
          "description": "ค่าเฉลี่ยเลขคณิต ($\\bar{x}$), มัธยฐาน ($Med$), ฐานนิยม ($Mode$), ค่าเฉลี่ยถ่วงน้ำหนัก, และการเลือกใช้ค่ากลางที่เหมาะสมกับลักษณะข้อมูล"
        },
        {
          "id": "math_s_t14_s2_1",
          "topicId": "math_s_t14",
          "parentId": "math_s_t14_s2",
          "level": 2,
          "name": "ค่าวัดการกระจายสัมบูรณ์และสัมพัทธ์ (Dispersion)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "พิสัย, พิสัยระหว่างควอร์ไทล์ ($IQR = Q_3 - Q_1$), ความแปรปรวน ($s^2$), ส่วนเบี่ยงเบนมาตรฐาน ($s$), และสัมประสิทธิ์การแปรผัน ($CV$)"
        },
        {
          "id": "math_s_t14_s2_2",
          "topicId": "math_s_t14",
          "parentId": "math_s_t14_s2",
          "level": 3,
          "name": "สมบัติการบวกและคูณค่าคงที่ต่อค่ากลางและค่าวัดการกระจาย",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "ถ้า $y_i = a x_i + b$: ค่ากลาง $\\bar{y} = a\\bar{x} + b$, ส่วนเบี่ยงเบนมาตรฐาน $s_y = |a| s_x$, ความแปรปรวน $s_y^2 = a^2 s_x^2$"
        },
        {
          "id": "math_s_t14_s2_3",
          "topicId": "math_s_t14",
          "parentId": "math_s_t14_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การอ่านแผนภาพกล่อง (Box Plot) และการตรวจหาค่านอกเกณฑ์ (Outliers)",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "เกณฑ์ Outlier: ค่าน้อยกว่า $Q_1 - 1.5(IQR)$ หรือมากกว่า $Q_3 + 1.5(IQR)$ และการวิเคราะห์การเบ้ซ้าย/เบ้ขวา/สมมาตร"
        }
      ]
    },
    {
      "id": "math_s_t15",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 15: ตัวแปรสุ่มและการแจกแจงความน่าจะเป็น (Random Variables & Probability Distributions)",
      "nameEn": "Discrete & Continuous Probability Distributions",
      "sortOrder": 15,
      "subtopics": [
        {
          "id": "math_s_t15_s1",
          "topicId": "math_s_t15",
          "level": 1,
          "name": "15.1 ตัวแปรสุ่มไม่ต่อเนื่องและการแจกแจงทวินาม (Binomial Distribution)",
          "sortOrder": 1,
          "difficulty": "intermediate",
          "description": "นิยามตัวแปรสุ่ม, ฟังก์ชันมวลความน่าจะเป็น, ค่าคาดหมาย $\\mu = E(X) = \\sum x P(X=x)$, ความแปรปรวน $\\sigma^2$"
        },
        {
          "id": "math_s_t15_s1_1",
          "topicId": "math_s_t15",
          "parentId": "math_s_t15_s1",
          "level": 2,
          "name": "การแจกแจงทวินาม (Binomial Distribution: $X \\sim B(n, p)$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "เงื่อนไขการทดลองแบร์นุลลี, ฟังก์ชัน $P(X=x) = \\binom{n}{x} p^x (1-p)^{n-x}$, ค่าเฉลี่ย $\\mu = np$, ความแปรปรวน $\\sigma^2 = np(1-p)$"
        },
        {
          "id": "math_s_t15_s2",
          "topicId": "math_s_t15",
          "level": 1,
          "name": "15.2 ตัวแปรสุ่มต่อเนื่องและการแจกแจงปกติ (Normal Distribution)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ฟังก์ชันความหนาแน่นความน่าจะเป็น, โค้งความหนาแน่นรูประฆังคว่ำสมมาตรรอบค่าเฉลี่ย, พื้นที่ใต้โค้งทั้งหมดเท่ากับ 1"
        },
        {
          "id": "math_s_t15_s2_1",
          "topicId": "math_s_t15",
          "parentId": "math_s_t15_s2",
          "level": 3,
          "name": "การแจกแจงปกติมาตรฐานและการเปิดตารางค่า $Z$ (Standard Normal: $Z$-score)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การแปลงค่า $Z = \\frac{X - \\mu}{\\sigma}$, การเปิดตารางพื้นที่ใต้โค้งปกติมาตรฐาน $P(Z \\le z)$ และการคำนวณเปอร์เซ็นต์ย้อนกลับหาค่า $X$"
        },
        {
          "id": "math_s_t15_s2_2",
          "topicId": "math_s_t15",
          "parentId": "math_s_t15_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: เทคนิคการเปิดตาราง $Z$ สไตล์ สสวท. ยุคใหม่ (พื้นที่สะสมจากซ้ายสุด)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "ข้อควรระวังเรื่องตารางค่า $Z$ ของข้อสอบ A-Level ปัจจุบันที่ให้พื้นที่ตั้งแต่ $-\\infty$ ถึง $Z$ ไม่ใช่เริ่มจากแกนกลาง"
        }
      ]
    },
    {
      "id": "math_s_t16",
      "subjectId": "MATH_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 16: การแก้ปัญหาคณิตศาสตร์ประยุกต์และแนวข้อสอบ A-Level",
      "nameEn": "Applied Mathematics & Exam Mastery",
      "sortOrder": 16,
      "subtopics": [
        {
          "id": "math_s_t16_s1",
          "topicId": "math_s_t16",
          "level": 1,
          "name": "16.1 การบูรณาการข้ามบทและการสร้างแบบจำลองทางคณิตศาสตร์ (Mathematical Modeling)",
          "sortOrder": 1,
          "difficulty": "advanced",
          "description": "การแปลงโจทย์สถานการณ์ชีวิตจริงสู่อสมการ ฟังก์ชัน เมทริกซ์ หรือแคลคูลัส"
        },
        {
          "id": "math_s_t16_s1_1",
          "topicId": "math_s_t16",
          "parentId": "math_s_t16_s1",
          "level": 2,
          "name": "การวิเคราะห์โจทย์ข้อสอบแข่งขันแบบวัดสมรรถนะ (Competency-based Problems)",
          "sortOrder": 2,
          "difficulty": "advanced",
          "description": "โจทย์ปัญหาข้อสอบ A-Level คณิตประยุกต์ 1 ที่มีความยาวและเชื่อมโยงหลายบริบท"
        },
        {
          "id": "math_s_t16_s1_2",
          "topicId": "math_s_t16",
          "parentId": "math_s_t16_s1",
          "level": 4,
          "name": "เทคนิค: กลยุทธ์การบริหารเวลาและการตัดช้อยส์ในห้องสอบ A-Level คณิตศาสตร์ประยุกต์",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "ลำดับการทำข้อสอบ: การเก็บคะแนนจากข้อย่อยอัตนัยและบทง่ายก่อน (สถิติ ดอกเบี้ย เซต ตรรกศาสตร์) ก่อนลุยแคลคูลัสและตรีโกณมิติ"
        }
      ]
    }
  ]
};
