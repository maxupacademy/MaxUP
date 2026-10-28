import { Course } from '../types';

export const COURSE_MATH_JUNIOR: Course = {
  "id": "MATH_JUNIOR_FUNDENMENTAL_01",
  "name": "คณิตศาสตร์ พื้นฐาน ม.ต้น (สสวท. + เตรียมอุดม/MWIT/จภ.)",
  "code": "MATH_JUNIOR_FUNDENMENTAL_01",
  "gradeLevel": "มัธยมศึกษาตอนต้น (ม.1 – ม.3)",
  "description": "หลักสูตรคณิตศาสตร์ ม.ต้น ฉบับสมบูรณ์ 17 บทเรียน โครงสร้าง 4 ระดับ (Level 1 - Level 4) ครอบคลุมตามหลักสูตรแกนกลาง สสวท. (ม.1 – ม.3 ฉบับปรับปรุง พ.ศ. 2560) บูรณาการเทคนิคคิดเร็ว K-Tips และขอบเขตข้อสอบคัดเลือกเข้า ม.4 รร.เตรียมอุดมศึกษา, รร.กำเนิดวิทย์, รร.วิทยาศาสตร์จุฬาภรณราชวิทยาลัย และ รร.มหิดลวิทยานุสรณ์ (MWIT)",
  "passcode": "MATH101",
  "badgeColor": "#1E3A8A",
  "topics": [
    {
      "id": "math_j_t1",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 1: จำนวน ทฤษฎีจำนวน และระบบตัวเลขฐาน",
      "nameEn": "Numbers, Number Theory & Base Systems",
      "sortOrder": 1,
      "subtopics": [
        {
          "id": "math_j_t1_s1",
          "level": 1,
          "name": "1.1 โครงสร้างจำนวนจริงและจำนวนเต็ม (สสวท. ม.1)",
          "difficulty": "basic",
          "description": "ระบบจำนวนเต็ม การเปรียบเทียบ ค่าสัมบูรณ์ $|a|$ และการดำเนินการ บวก ลบ คูณ หาร",
          "topicId": "math_j_t1",
          "sortOrder": 1
        },
        {
          "id": "math_j_t1_s1_1",
          "parentId": "math_j_t1_s1",
          "level": 2,
          "name": "สมบัติการบวกและการคูณของจำนวนเต็ม",
          "difficulty": "basic",
          "description": "สมบัติการสลับที่ เปลี่ยนหมู่ การแจกแจง $a(b+c) = ab + ac$ เอกลักษณ์ และอินเวอร์ส",
          "topicId": "math_j_t1",
          "sortOrder": 2
        },
        {
          "id": "math_j_t1_s1_2",
          "parentId": "math_j_t1_s1",
          "level": 3,
          "name": "ทศนิยมซ้ำและการแปลงเป็นเศษส่วน $\\frac{a}{b}$",
          "difficulty": "intermediate",
          "description": "ทศนิยมซ้ำศูนย์และไม่ซ้ำศูนย์ พิสูจน์สูตรลัด $\\frac{\\text{ตัวเลขทั้งหมด} - \\text{ตัวเลขไม่ซ้ำ}}{9\\dots90\\dots0}$",
          "topicId": "math_j_t1",
          "sortOrder": 3
        },
        {
          "id": "math_j_t1_s1_3",
          "parentId": "math_j_t1_s1_2",
          "level": 4,
          "name": "K-Tips ข้อสอบ: เทคนิคคิดเลขเร็ว & ลำดับการคำนวณ (Order of Operations / PEMDAS)",
          "difficulty": "advanced",
          "description": "เทคนิคการจับคู่พจน์หักล้างและดักจุดผิดยอดฮิตเรื่องเครื่องหมายลบหน้าวงเล็บ $-(a - b) = -a + b$",
          "topicId": "math_j_t1",
          "sortOrder": 4
        },
        {
          "id": "math_j_t1_s2",
          "level": 1,
          "name": "1.2 ห.ร.ม. และ ค.ร.น. ขั้นสูง (GCD & LCM)",
          "difficulty": "intermediate",
          "description": "การแยกตัวประกอบเฉพาะ การตั้งหารสั้น และขั้นตอนวิธียูคลิด (Euclidean Algorithm)",
          "topicId": "math_j_t1",
          "sortOrder": 5
        },
        {
          "id": "math_j_t1_s2_1",
          "parentId": "math_j_t1_s2",
          "level": 2,
          "name": "ขั้นตอนวิธียูคลิดสำหรับการหา ห.ร.ม. ของเลขจำนวนมาก",
          "difficulty": "intermediate",
          "description": "การหารเอาเศษซ้ำ $a = bq + r$ เพื่อหา $\\gcd(a, b) = \\gcd(b, r)$ ของตัวเลขขนาดใหญ่",
          "topicId": "math_j_t1",
          "sortOrder": 6
        },
        {
          "id": "math_j_t1_s2_2",
          "parentId": "math_j_t1_s2",
          "level": 3,
          "name": "ความสัมพันธ์ระหว่าง ห.ร.ม. และ ค.ร.น. ($a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b)$)",
          "difficulty": "intermediate",
          "description": "ทฤษฎีบท $a \\times b = \\gcd(a, b) \\times \\operatorname{lcm}(a, b)$ และการประยุกต์หาตัวเลขที่หายไป",
          "topicId": "math_j_t1",
          "sortOrder": 7
        },
        {
          "id": "math_j_t1_s2_3",
          "parentId": "math_j_t1_s2",
          "level": 3,
          "name": "ฟังก์ชันตัวหาร: จำนวนตัวหารบวก $d(n)$ และผลบวกตัวหารบวก $\\sigma(n)$",
          "difficulty": "advanced",
          "description": "การแยกตัวประกอบเฉพาะมาตรฐาน $n = p_1^{e_1} p_2^{e_2} \\cdots p_k^{e_k}$, $d(n) = \\prod(e_i+1)$, $\\sigma(n) = \\prod \\frac{p_i^{e_i+1}-1}{p_i-1}$",
          "topicId": "math_j_t1",
          "sortOrder": 8
        },
        {
          "id": "math_j_t1_s2_4",
          "parentId": "math_j_t1_s2_3",
          "level": 4,
          "name": "K-Tips: โจทย์แข่งขัน ห.ร.ม. ค.ร.น. เศษเหลือ & การวิ่งรอบสนามวนซ้ำ",
          "difficulty": "advanced",
          "description": "เทคนิคแก้โจทย์ \"หาร $x$ แล้วเหลือเศษ $r$ เท่ากัน\" $\\implies x - r$ หารด้วย ห.ร.ม. ลงตัว",
          "topicId": "math_j_t1",
          "sortOrder": 9
        },
        {
          "id": "math_j_t1_s3",
          "level": 1,
          "name": "1.3 เลขคณิตมอดุโล (Modular Arithmetic) & การหารลงตัว",
          "difficulty": "advanced",
          "description": "ความสัมพันธ์คอนกรูเอนซ์ $a \\equiv b \\pmod m$, กฎการหารลงตัว และการหาเศษเลขยกกำลังสูง",
          "topicId": "math_j_t1",
          "sortOrder": 10
        },
        {
          "id": "math_j_t1_s3_1",
          "parentId": "math_j_t1_s3",
          "level": 2,
          "name": "กฎการหารลงตัวของจำนวนเฉพาะและจำนวนประกอบ (2, 3, 4, 7, 8, 9, 11, 13)",
          "difficulty": "intermediate",
          "description": "การใช้ผลบวกเลขโดด, ผลต่างเลขโดดตำแหน่งคี่-คู่ และการตัดเลขท้าย 3 หลัก",
          "topicId": "math_j_t1",
          "sortOrder": 11
        },
        {
          "id": "math_j_t1_s3_2",
          "parentId": "math_j_t1_s3",
          "level": 3,
          "name": "การหาเลขโดดในหลักหน่วยของ $a^n$ และเลขสองหลักสุดท้าย",
          "difficulty": "advanced",
          "description": "วิเคราะห์วงรอบของเลขท้าย (Cycle of Units Digits) โมดูโล 10 และโมดูโล 100",
          "topicId": "math_j_t1",
          "sortOrder": 12
        },
        {
          "id": "math_j_t1_s3_3",
          "parentId": "math_j_t1_s3_2",
          "level": 4,
          "name": "K-Tips: เทคนิควงรอบมอดุโล & Euler’s Totient Theorem เบื้องต้นสไตล์ข้อสอบ MWIT/จภ.",
          "difficulty": "advanced",
          "description": "การลดทอนเลขชี้กำลังมหาศาล $a^{\\phi(m)} \\equiv 1 \\pmod m$ เพื่อหาเศษเหลือภายใน 3 บรรทัด",
          "topicId": "math_j_t1",
          "sortOrder": 13
        },
        {
          "id": "math_j_t1_s4",
          "level": 1,
          "name": "1.4 สมการไดโอแฟนไทน์เชิงเส้น & ระบบตัวเลขฐาน (Base Numbers)",
          "difficulty": "advanced",
          "description": "สมการผลเฉลยจำนวนเต็ม $ax + by = c$ และการแปลงระบบตัวเลขฐาน 2, 8, 10, 16",
          "topicId": "math_j_t1",
          "sortOrder": 14
        },
        {
          "id": "math_j_t1_s4_1",
          "parentId": "math_j_t1_s4",
          "level": 2,
          "name": "การเปลี่ยนฐานระบบตัวเลขและการคำนวณในระบบฐานต่าง ๆ",
          "difficulty": "intermediate",
          "description": "การกระจายค่าประจำหลัก $\\sum d_i b^i$, การหารสั้นเปลี่ยนฐาน และการบวก-ลบในระบบฐาน 2 ถึง 16",
          "topicId": "math_j_t1",
          "sortOrder": 15
        },
        {
          "id": "math_j_t1_s4_2",
          "parentId": "math_j_t1_s4",
          "level": 3,
          "name": "สมการไดโอแฟนไทน์เชิงเส้น (Linear Diophantine Equation $ax + by = c$)",
          "difficulty": "advanced",
          "description": "เงื่อนไขการมีผลเฉลยจำนวนเต็ม $\\gcd(a, b) \\mid c$ และการหาผลเฉลยทั่วไป $(x_0 + \\frac{b}{d}t, y_0 - \\frac{a}{d}t)$",
          "topicId": "math_j_t1",
          "sortOrder": 16
        },
        {
          "id": "math_j_t1_s4_3",
          "parentId": "math_j_t1_s4_2",
          "level": 4,
          "name": "K-Tips: ตารางลดทอนหาผลเฉลยจำนวนเต็มบวก $x, y \\in \\mathbb{Z}^+$ ในข้อสอบคัดเลือก ม.4",
          "difficulty": "advanced",
          "description": "สูตรนับจำนวนคู่ลำดับ $(x, y)$ ที่เป็นจำนวนเต็มบวกอย่างรวดเร็วโดยไม่ต้องไล่แทนทีละค่า",
          "topicId": "math_j_t1",
          "sortOrder": 17
        }
      ]
    },
    {
      "id": "math_j_t2",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 2: เลขยกกำลัง กรณฑ์ และรากที่สอง",
      "nameEn": "Exponents, Radicals & Roots",
      "sortOrder": 2,
      "subtopics": [
        {
          "id": "math_j_t2_s1",
          "level": 1,
          "name": "2.1 สมบัติเลขยกกำลังและสัญกรณ์วิทยาศาสตร์ (สสวท. ม.1 & ม.2)",
          "difficulty": "basic",
          "description": "นิยามเลขยกกำลัง $a^n = a \\times a \\times \\dots \\times a$, สมบัติผลคูณ $a^m \\cdot a^n = a^{m+n}$, $a^0 = 1$, $a^{-n} = \\frac{1}{a^n}$",
          "topicId": "math_j_t2",
          "sortOrder": 1
        },
        {
          "id": "math_j_t2_s1_1",
          "parentId": "math_j_t2_s1",
          "level": 2,
          "name": "สัญกรณ์วิทยาศาสตร์ (Scientific Notation: $A \\times 10^n, 1 \\le A < 10$)",
          "difficulty": "basic",
          "description": "การเขียนตัวเลขขนาดใหญ่และตัวเลขขนาดเล็กมาก พร้อมการบวก ลบ คูณ หาร ในรูปสัญกรณ์",
          "topicId": "math_j_t2",
          "sortOrder": 2
        },
        {
          "id": "math_j_t2_s1_2",
          "parentId": "math_j_t2_s1",
          "level": 3,
          "name": "การเปรียบเทียบเลขยกกำลังฐานต่างกันและเลขชี้กำลังสูง",
          "difficulty": "advanced",
          "description": "เทคนิคการทำเลขชี้กำลังให้เท่ากันโดยใช้ ห.ร.ม. เช่น $2^{50} = (2^5)^{10} = 32^{10}$ เทียบกับ $3^{40} = (3^4)^{10} = 81^{10}$",
          "topicId": "math_j_t2",
          "sortOrder": 3
        },
        {
          "id": "math_j_t2_s1_3",
          "parentId": "math_j_t2_s1_2",
          "level": 4,
          "name": "K-Tips: เทคนิคเรียงลำดับเลขยกกำลังมหึมาในข้อสอบเตรียมอุดมฯ Speed Test",
          "difficulty": "advanced",
          "description": "การแปลงรูปเลขชี้กำลังเพื่อเปรียบเทียบค่าโดยไม่ต้องเปิดตารางลอการิทึม",
          "topicId": "math_j_t2",
          "sortOrder": 4
        },
        {
          "id": "math_j_t2_s2",
          "level": 1,
          "name": "2.2 สมการเลขยกกำลัง (Exponential Equations)",
          "difficulty": "intermediate",
          "description": "การแก้สมการเลขยกกำลังรูปแบบฐานเท่ากัน $a^{f(x)} = a^{g(x)} \\implies f(x) = g(x)$ และการแปลงตัวแปร $u = a^x$",
          "topicId": "math_j_t2",
          "sortOrder": 5
        },
        {
          "id": "math_j_t2_s2_1",
          "parentId": "math_j_t2_s2",
          "level": 2,
          "name": "การแก้สมการ $a^{f(x)} = a^{g(x)}$ และการจัดรูปฐานร่วม",
          "difficulty": "intermediate",
          "description": "การแปลงฐานให้อยู่ในรูปจำนวนเฉพาะ เช่น 4, 8, 16 ให้อยู่ในฐาน 2",
          "topicId": "math_j_t2",
          "sortOrder": 6
        },
        {
          "id": "math_j_t2_s2_2",
          "parentId": "math_j_t2_s2",
          "level": 3,
          "name": "สมการเลขยกกำลังที่แปลงเป็นสมการกำลังสอง ($A(a^{2x}) + B(a^x) + C = 0$)",
          "difficulty": "advanced",
          "description": "การสมมติตัวแปร $u = a^x > 0$ เพื่อแก้สมการกำลังสอง $Au^2 + Bu + C = 0$ และตัดคำตอบ $u \\le 0$",
          "topicId": "math_j_t2",
          "sortOrder": 7
        },
        {
          "id": "math_j_t2_s2_3",
          "parentId": "math_j_t2_s2_2",
          "level": 4,
          "name": "K-Tips: สมการแข่งขันกรณีฐานเป็นตัวแปร $x^{g(x)} = 1$ และ $f(x)^{g(x)} = f(x)^{h(x)}$",
          "difficulty": "advanced",
          "description": "วิเคราะห์ครบทั้ง 3 กรณี: ฐานเท่ากับ 1, เลขชี้กำลังเท่ากับ 0, และฐานเท่ากับ -1 พร้อมเช็คพจน์คู่-คี่",
          "topicId": "math_j_t2",
          "sortOrder": 8
        },
        {
          "id": "math_j_t2_s3",
          "level": 1,
          "name": "2.3 รากที่สอง รากที่สาม และสมบัติของกรณฑ์ (สสวท. ม.2)",
          "difficulty": "basic",
          "description": "นิยามของรากที่ $n$, ค่าหลักของกรณฑ์, และสมบัติสำคัญ $\\sqrt{a^2} = |a|$, $\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$",
          "topicId": "math_j_t2",
          "sortOrder": 9
        },
        {
          "id": "math_j_t2_s3_1",
          "parentId": "math_j_t2_s3",
          "level": 2,
          "name": "การบวก ลบ คูณ หาร ค่ากรณฑ์ และการทำให้ส่วนไม่ติดกรณฑ์ (Rationalization)",
          "difficulty": "intermediate",
          "description": "การรวมพจน์คล้ายและการคูณด้วยคอนจูเกต $\\frac{1}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{\\sqrt{a} \\mp \\sqrt{b}}{a - b}$",
          "topicId": "math_j_t2",
          "sortOrder": 10
        },
        {
          "id": "math_j_t2_s3_2",
          "parentId": "math_j_t2_s3",
          "level": 3,
          "name": "การสังยุคตัวส่วนสามพจน์และกรณฑ์อันดับสาม (Cubic Rationalization)",
          "difficulty": "advanced",
          "description": "การใช้เอกลักษณ์ $a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$ เพื่อกำจัดกรณฑ์อันดับสามที่ตัวส่วน",
          "topicId": "math_j_t2",
          "sortOrder": 11
        },
        {
          "id": "math_j_t2_s3_3",
          "parentId": "math_j_t2_s3_2",
          "level": 4,
          "name": "K-Tips: การถอดกรณฑ์ซ้อนกรณฑ์ $\\sqrt{A \\pm 2\\sqrt{B}} = \\sqrt{x} \\pm \\sqrt{y}$ ใน 10 วินาที",
          "difficulty": "advanced",
          "description": "เทคนิคหา $x + y = A$ และ $xy = B$ ($x > y > 0$) พร้อมวิธีดึง 2 หรือดันเลขเข้าข้างในรูท",
          "topicId": "math_j_t2",
          "sortOrder": 12
        }
      ]
    },
    {
      "id": "math_j_t3",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 3: อัตราส่วน สัดส่วน และร้อยละเชิงพาณิชย์",
      "nameEn": "Ratio, Proportion & Commercial Math",
      "sortOrder": 3,
      "subtopics": [
        {
          "id": "math_j_t3_s1",
          "level": 1,
          "name": "3.1 อัตราส่วนและสัดส่วน (สสวท. ม.1 เล่ม 2)",
          "difficulty": "basic",
          "description": "ความหมายของอัตราส่วน $a : b = \\frac{a}{b}$, อัตราส่วนที่เท่ากัน และสัดส่วนตรง-สัดส่วนผกผัน",
          "topicId": "math_j_t3",
          "sortOrder": 1
        },
        {
          "id": "math_j_t3_s1_1",
          "parentId": "math_j_t3_s1",
          "level": 2,
          "name": "สัดส่วนต่อเนื่องหลายจำนวน ($a : b : c$)",
          "difficulty": "intermediate",
          "description": "การเชื่อมโยงอัตราส่วนสองชุด $a:b$ และ $b:c$ โดยใช้ ค.ร.น. ของตัวแปรเชื่อมโยง $b$",
          "topicId": "math_j_t3",
          "sortOrder": 2
        },
        {
          "id": "math_j_t3_s1_2",
          "parentId": "math_j_t3_s1",
          "level": 3,
          "name": "การแปรผันตรง การแปรผันแบบผกผัน และการแปรผันเกี่ยวเนื่อง",
          "difficulty": "intermediate",
          "description": "สมการการแปรผัน $y = kx$, $y = \\frac{k}{x}$, $y = \\frac{kxz}{w}$ และการหาค่าคงที่การแปรผัน $k$",
          "topicId": "math_j_t3",
          "sortOrder": 3
        },
        {
          "id": "math_j_t3_s1_3",
          "parentId": "math_j_t3_s1_2",
          "level": 4,
          "name": "K-Tips: เทคนิคตัวคูณเชื่อมโซ่อัตราส่วน & อัตราส่วนเปรียบเทียบในโจทย์แข่งขัน",
          "difficulty": "advanced",
          "description": "เทคนิคตั้งตารางอัตราส่วน ลดขั้นตอนการแก้สมการหลายตัวแปร",
          "topicId": "math_j_t3",
          "sortOrder": 4
        },
        {
          "id": "math_j_t3_s2",
          "level": 1,
          "name": "3.2 ร้อยละและการประยุกต์เชิงพาณิชย์ (Commercial Math)",
          "difficulty": "intermediate",
          "description": "ทุน ราคาขาย ราคาป้าย กำไร ขาดทุน ส่วนลด ภาษี และดอกเบี้ย",
          "topicId": "math_j_t3",
          "sortOrder": 5
        },
        {
          "id": "math_j_t3_s2_1",
          "parentId": "math_j_t3_s2",
          "level": 2,
          "name": "การลดราคาต่อเนื่องสองชั้น (Successive Discounts)",
          "difficulty": "intermediate",
          "description": "การคิดส่วนลดซ้อน $d_1\\%$ และ $d_2\\%$ พร้อมสูตรลัดส่วนลดรวมสุทธิ $d_{\\text{total}} = d_1 + d_2 - \\frac{d_1 d_2}{100}$",
          "topicId": "math_j_t3",
          "sortOrder": 6
        },
        {
          "id": "math_j_t3_s2_2",
          "parentId": "math_j_t3_s2",
          "level": 3,
          "name": "ภาษีมูลค่าเพิ่ม (VAT) และดอกเบี้ยคงต้น (Simple Interest $I = Prt$)",
          "difficulty": "intermediate",
          "description": "การคำนวณราคารวมภาษี/ก่อนภาษี และสูตรเงินรวม $A = P(1 + rt)$",
          "topicId": "math_j_t3",
          "sortOrder": 7
        },
        {
          "id": "math_j_t3_s2_3",
          "parentId": "math_j_t3_s2_2",
          "level": 4,
          "name": "K-Tips: สูตรบรรทัดเดียว Multiplier Formula $\\left(1 \\pm \\frac{r}{100}\\right)$ สปีดเทสต์กำไร-ขาดทุน",
          "difficulty": "advanced",
          "description": "เทคนิคคิดราคาขายจากทุน และคิดย้อนกลับหาทุนทันที $\\text{ทุน} = \\frac{\\text{ราคาขาย}}{1 + r/100}$ โดยไม่ต้องเทียบบัญญัติไตรยางศ์",
          "topicId": "math_j_t3",
          "sortOrder": 8
        },
        {
          "id": "math_j_t3_s3",
          "level": 1,
          "name": "3.3 โจทย์ปัญหาการทำงานและการผสมสาร (Work & Mixture Problems)",
          "difficulty": "advanced",
          "description": "โจทย์ปัญหาคลาสสิกที่ออกสอบแข่งขันคัดเลือกเข้า ม.4 ทุกสนาม",
          "topicId": "math_j_t3",
          "sortOrder": 9
        },
        {
          "id": "math_j_t3_s3_1",
          "parentId": "math_j_t3_s3",
          "level": 2,
          "name": "โจทย์อัตราการทำงานของคนหลายคน (Work Rate Problems: $\\frac{1}{A} + \\frac{1}{B} = \\frac{1}{T}$)",
          "difficulty": "intermediate",
          "description": "สูตรพื้นฐาน $\\frac{1}{A} + \\frac{1}{B} = \\frac{1}{T}$ และเทคนิคกำหนดเนื้องานรวมเป็น ค.ร.น. แปลงเป็นจำนวนเต็ม",
          "topicId": "math_j_t3",
          "sortOrder": 10
        },
        {
          "id": "math_j_t3_s3_2",
          "parentId": "math_j_t3_s3",
          "level": 3,
          "name": "โจทย์การเปิดท่อน้ำเข้าถังและท่อน้ำทิ้งระบายออก",
          "difficulty": "advanced",
          "description": "อัตราไหลสุทธิ $\\frac{1}{T_{\\text{net}}} = \\sum \\frac{1}{\\text{ท่อเข้า}} - \\sum \\frac{1}{\\text{ท่อออก}}$",
          "topicId": "math_j_t3",
          "sortOrder": 11
        },
        {
          "id": "math_j_t3_s3_3",
          "parentId": "math_j_t3_s3",
          "level": 3,
          "name": "โจทย์การผสมสารละลายและความเข้มข้น ($C_1 V_1 + C_2 V_2 = C_m(V_1 + V_2)$)",
          "difficulty": "advanced",
          "description": "สมการปริมาณเนื้อสารบริสุทธิ์ $C_1 V_1 + C_2 V_2 = C_m V_m$ เมื่อ $V_m = V_1 + V_2$",
          "topicId": "math_j_t3",
          "sortOrder": 12
        },
        {
          "id": "math_j_t3_s3_4",
          "parentId": "math_j_t3_s3_3",
          "level": 4,
          "name": "K-Tips: Alligation Cross Method (ผังรูปกากบาท) แก้โจทย์ผสมสารใน 15 วินาที",
          "difficulty": "advanced",
          "description": "วิธีลัดวางความเข้มข้นหาอัตราส่วนปริมาตร $\\frac{V_1}{V_2} = \\frac{|C_2 - C_m|}{|C_1 - C_m|}$ โดยไม่ต้องตั้งสมการพีชคณิตยาว",
          "topicId": "math_j_t3",
          "sortOrder": 13
        }
      ]
    },
    {
      "id": "math_j_t4",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 4: สมการและอสมการเชิงเส้นตัวแปรเดียว",
      "nameEn": "Linear Equations & Inequalities in One Variable",
      "sortOrder": 4,
      "subtopics": [
        {
          "id": "math_j_t4_s1",
          "level": 1,
          "name": "4.1 สมการเชิงเส้นตัวแปรเดียวและการแก้โจทย์ปัญหา (สสวท. ม.1)",
          "difficulty": "basic",
          "description": "การเตรียมความพร้อมก่อนรู้จักสมการ การแก้สมการติดเศษส่วนและวงเล็บ สมบัติการเท่ากัน",
          "topicId": "math_j_t4",
          "sortOrder": 1
        },
        {
          "id": "math_j_t4_s1_1",
          "parentId": "math_j_t4_s1",
          "level": 2,
          "name": "การสร้างสมการจากโจทย์ปัญหาชีวิตจริง",
          "difficulty": "basic",
          "description": "โจทย์เกี่ยวกับจำนวนเต็มเรียงติดกัน $n, n+1, n+2$ โจทย์อายุ โจทย์หัวและขาของสัตว์",
          "topicId": "math_j_t4",
          "sortOrder": 2
        },
        {
          "id": "math_j_t4_s1_2",
          "parentId": "math_j_t4_s1",
          "level": 3,
          "name": "โจทย์ปัญหาการเคลื่อนที่และอัตราเร็ว ($s = vt$)",
          "difficulty": "intermediate",
          "description": "วิ่งตามทัน สวนทางกัน รถไฟแล่นสวน/แซงกัน และรถไฟแล่นผ่านสะพาน/อุโมงค์ ($s = L_{\\text{รถไฟ}} + L_{\\text{อุโมงค์}}$)",
          "topicId": "math_j_t4",
          "sortOrder": 3
        },
        {
          "id": "math_j_t4_s1_3",
          "parentId": "math_j_t4_s1_2",
          "level": 4,
          "name": "K-Tips: ตารางวิเคราะห์เวลา & อัตราเร็วสัมพัทธ์ (Relative Speed) แก้โจทย์ไล่กวด",
          "difficulty": "advanced",
          "description": "การคิดความเร็วสัมพัทธ์ $v_1 + v_2$ (สวนกัน) และ $v_1 - v_2$ (ตามกัน) ลดขั้นตอนคำนวณ",
          "topicId": "math_j_t4",
          "sortOrder": 4
        },
        {
          "id": "math_j_t4_s2",
          "level": 1,
          "name": "4.2 อสมการเชิงเส้นตัวแปรเดียว (สสวท. ม.3 เล่ม 1)",
          "difficulty": "basic",
          "description": "ความหมายของอสมการ เครื่องหมาย $<, \\le, >, \\ge, \\neq$ และสมบัติการคูณด้วยจำนวนลบ (กลับทิศเครื่องหมาย)",
          "topicId": "math_j_t4",
          "sortOrder": 5
        },
        {
          "id": "math_j_t4_s2_1",
          "parentId": "math_j_t4_s2",
          "level": 2,
          "name": "การแก้อสมการและการแสดงคำตอบบนเส้นจำนวน",
          "difficulty": "intermediate",
          "description": "จุดทึบ จุดโปร่ง ช่วงเปิด $(a, b)$ ช่วงปิด $[a, b]$ และการระบุจำนวนคำตอบที่เป็นจำนวนเต็ม",
          "topicId": "math_j_t4",
          "sortOrder": 6
        },
        {
          "id": "math_j_t4_s2_2",
          "parentId": "math_j_t4_s2",
          "level": 3,
          "name": "โจทย์ปัญหาอสมการเชิงเส้นตัวแปรเดียว",
          "difficulty": "intermediate",
          "description": "โจทย์เงินในกระเป๋า ปัญหาคะแนนสอบเฉลี่ย และการหาค่าต่ำสุด/สูงสุดที่สอดคล้อง",
          "topicId": "math_j_t4",
          "sortOrder": 7
        },
        {
          "id": "math_j_t4_s2_3",
          "parentId": "math_j_t4_s2_2",
          "level": 4,
          "name": "K-Tips & จุดหลอก: การกลับเครื่องหมายอสมการ & อสมการพหุนามช่วงบวก-ลบ (+ - +)",
          "difficulty": "advanced",
          "description": "จุดดักคะแนนยอดฮิตเมื่อหารหรือคูณด้วยพจน์ติดตัวแปรที่ไม่ทราบเครื่องหมาย",
          "topicId": "math_j_t4",
          "sortOrder": 8
        },
        {
          "id": "math_j_t4_s3",
          "level": 1,
          "name": "4.3 สมการและอสมการค่าสัมบูรณ์ (Absolute Value Equations)",
          "difficulty": "advanced",
          "description": "นิยามเชิงเรขาคณิตของระยะห่างบนเส้นจำนวน $|x| = \\text{dist}(x, 0)$ และการแก้สมการ $|f(x)| = g(x)$",
          "topicId": "math_j_t4",
          "sortOrder": 9
        },
        {
          "id": "math_j_t4_s3_1",
          "parentId": "math_j_t4_s3",
          "level": 2,
          "name": "สมการค่าสัมบูรณ์รูปแบบพื้นฐาน $|f(x)| = c$ และ $|f(x)| = |g(x)|$",
          "difficulty": "intermediate",
          "description": "การแยกสองกรณี $f(x) = c$ หรือ $f(x) = -c$ (เมื่อ $c \\ge 0$) พร้อมการตรวจสอบคำตอบจริง",
          "topicId": "math_j_t4",
          "sortOrder": 10
        },
        {
          "id": "math_j_t4_s3_2",
          "parentId": "math_j_t4_s3",
          "level": 3,
          "name": "อสมการค่าสัมบูรณ์ $|x| < a$ และ $|x| > a$",
          "difficulty": "advanced",
          "description": "การแปลงเป็นช่วง $-a < x < a$ หรือ $x < -a \\cup x > a$ (เมื่อ $a > 0$)",
          "topicId": "math_j_t4",
          "sortOrder": 11
        },
        {
          "id": "math_j_t4_s3_3",
          "parentId": "math_j_t4_s3_2",
          "level": 4,
          "name": "K-Tips: วิธียกกำลังสองสองข้าง & การปลดค่าสัมบูรณ์ตามช่วงวิกฤต",
          "difficulty": "advanced",
          "description": "เทคนิคแก้สมการค่าสัมบูรณ์หลายก้อน $|x - a| + |x - b| = c$ สไตล์ข้อสอบ MWIT",
          "topicId": "math_j_t4",
          "sortOrder": 12
        }
      ]
    },
    {
      "id": "math_j_t5",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 5: ระบบสมการสองตัวแปร (เชิงเส้นและไม่เชิงเส้น)",
      "nameEn": "Systems of Equations in Two Variables (Linear & Non-Linear)",
      "sortOrder": 5,
      "subtopics": [
        {
          "id": "math_j_t5_s1",
          "level": 1,
          "name": "5.1 ระบบสมการเชิงเส้นสองตัวแปร (สสวท. ม.3 เล่ม 2)",
          "difficulty": "basic",
          "description": "รูปมาตรฐาน $a_1 x + b_1 y = c_1$ และ $a_2 x + b_2 y = c_2$ นิยามของคำตอบคู่ลำดับ $(x, y)$",
          "topicId": "math_j_t5",
          "sortOrder": 1
        },
        {
          "id": "math_j_t5_s1_1",
          "parentId": "math_j_t5_s1",
          "level": 2,
          "name": "วิธีแก้ระบบสมการ: การแทนค่า (Substitution) และการกำจัดตัวแปร (Elimination)",
          "difficulty": "basic",
          "description": "การทำสัมประสิทธิ์ให้เท่ากัน การบวก-ลบสมการเพื่อกำจัดตัวแปร",
          "topicId": "math_j_t5",
          "sortOrder": 2
        },
        {
          "id": "math_j_t5_s1_2",
          "parentId": "math_j_t5_s1",
          "level": 3,
          "name": "การวิเคราะห์ลักษณะคำตอบจากความชันและอัตราส่วนสัมประสิทธิ์",
          "difficulty": "intermediate",
          "description": "เส้นตรงตัดกัน (1 คำตอบ: $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$), เส้นตรงขนาน (ไม่มีคำตอบ: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$), เส้นตรงทับกัน (คำตอบอนันต์: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$)",
          "topicId": "math_j_t5",
          "sortOrder": 3
        },
        {
          "id": "math_j_t5_s1_3",
          "parentId": "math_j_t5_s1_2",
          "level": 4,
          "name": "K-Tips คิดเร็ว: กฎของคราเมอร์ (Cramer’s Rule $2\\times 2$ / Determinant) ตอบ $x, y$ ใน 20 วินาที",
          "difficulty": "advanced",
          "description": "การคำนวณ $D = a_1 b_2 - a_2 b_1$, $x = \\frac{D_x}{D}$, $y = \\frac{D_y}{D}$ ด้วยดีเทอร์มิแนนต์เมทริกซ์ $2\\times 2$ สำหรับข้อสอบ Speed Test",
          "topicId": "math_j_t5",
          "sortOrder": 4
        },
        {
          "id": "math_j_t5_s2",
          "level": 1,
          "name": "5.2 โจทย์ปัญหาระบบสมการเชิงเส้นสองตัวแปรประยุกต์",
          "difficulty": "intermediate",
          "description": "การแปลงโจทย์ภาษาไทยให้เป็นระบบสมการสองตัวแปร",
          "topicId": "math_j_t5",
          "sortOrder": 5
        },
        {
          "id": "math_j_t5_s2_1",
          "parentId": "math_j_t5_s2",
          "level": 2,
          "name": "โจทย์ตัวเลขสองหลักและผลบวก/ผลต่างของการกลับหลัก ($10x + y$ vs $10y + x$)",
          "difficulty": "intermediate",
          "description": "สมบัติผลต่าง $(10x+y)-(10y+x) = 9(x-y)$ หารด้วย 9 ลงตัว และผลบวก $11(x+y)$ หารด้วย 11 ลงตัวเสมอ",
          "topicId": "math_j_t5",
          "sortOrder": 6
        },
        {
          "id": "math_j_t5_s2_2",
          "parentId": "math_j_t5_s2",
          "level": 3,
          "name": "โจทย์การพายเรือตามน้ำและทวนน้ำ ($v_{\\text{เรือ}} \\pm v_{\\text{น้ำ}}$)",
          "difficulty": "intermediate",
          "description": "อัตราเร็วตามน้ำ $= v_{\\text{เรือ}} + v_{\\text{น้ำ}}$, อัตราเร็วทวนน้ำ $= v_{\\text{เรือ}} - v_{\\text{น้ำ}}$",
          "topicId": "math_j_t5",
          "sortOrder": 7
        },
        {
          "id": "math_j_t5_s2_3",
          "parentId": "math_j_t5_s2_2",
          "level": 4,
          "name": "K-Tips: เทคนิคตัดตัวแปรสมมติร่วมในโจทย์แข่งขันเตรียมอุดมฯ",
          "difficulty": "advanced",
          "description": "การบวกสองสมการเพื่อหาผลรวม $(x + y)$ ทันทีโดยไม่ต้องแก้หา $x$ และ $y$ แต่ละตัว",
          "topicId": "math_j_t5",
          "sortOrder": 8
        },
        {
          "id": "math_j_t5_s3",
          "level": 1,
          "name": "5.3 ระบบสมการสองตัวแปรดีกรีสอง (Non-Linear Systems)",
          "difficulty": "advanced",
          "description": "ระบบสมการที่มีตัวแปรกำลังสอง หรือผลคูณของตัวแปร $xy$",
          "topicId": "math_j_t5",
          "sortOrder": 9
        },
        {
          "id": "math_j_t5_s3_1",
          "parentId": "math_j_t5_s3",
          "level": 2,
          "name": "ระบบสมการเส้นตรงตัดกับพาราโบลาหรือวงกลม (Linear + Quadratic)",
          "difficulty": "intermediate",
          "description": "การจัดรูปตัวแปรหนึ่งในเทอมอีกตัวแปรแล้วแทนค่าลงในสมการกำลังสอง $ax^2 + bx + c = 0$",
          "topicId": "math_j_t5",
          "sortOrder": 10
        },
        {
          "id": "math_j_t5_s3_2",
          "parentId": "math_j_t5_s3",
          "level": 3,
          "name": "ระบบสมการสองตัวแปรดีกรีสองทั้งสองสมการ (Quadratic + Quadratic)",
          "difficulty": "advanced",
          "description": "การบวก-ลบสมการเพื่อกำจัดพจน์กำลังสอง หรือการจัดรูปผลต่างกำลังสอง",
          "topicId": "math_j_t5",
          "sortOrder": 11
        },
        {
          "id": "math_j_t5_s3_3",
          "parentId": "math_j_t5_s3_2",
          "level": 4,
          "name": "K-Tips: ระบบสมการสมมาตร (Symmetric Systems) & การแปลงตัวแปร $u = x+y, v = xy$",
          "difficulty": "advanced",
          "description": "การใช้ความสัมพันธ์ $x^2 + y^2 = u^2 - 2v$ และ $x^3 + y^3 = u^3 - 3uv$ เพื่อแก้โจทย์ MWIT/จภ.",
          "topicId": "math_j_t5",
          "sortOrder": 12
        }
      ]
    },
    {
      "id": "math_j_t6",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 6: พหุนามและการแยกตัวประกอบ",
      "nameEn": "Polynomials & Advanced Factoring",
      "sortOrder": 6,
      "subtopics": [
        {
          "id": "math_j_t6_s1",
          "level": 1,
          "name": "6.1 พหุนามและการดำเนินการ (สสวท. ม.2)",
          "difficulty": "basic",
          "description": "เอกนาม พหุนาม ดีกรี การบวก ลบ คูณ และการหารพหุนามด้วยเอกนาม/พหุนาม",
          "topicId": "math_j_t6",
          "sortOrder": 1
        },
        {
          "id": "math_j_t6_s1_1",
          "parentId": "math_j_t6_s1",
          "level": 2,
          "name": "การหารพหุนาม (Long Division) และความสัมพันธ์ $P(x) = D(x)Q(x) + R(x)$",
          "difficulty": "basic",
          "description": "ขั้นตอนการตั้งหารยาวพหุนามและการตรวจสอบดีกรีของเศษ $\\deg(R) < \\deg(D)$",
          "topicId": "math_j_t6",
          "sortOrder": 2
        },
        {
          "id": "math_j_t6_s2",
          "level": 1,
          "name": "6.2 การแยกตัวประกอบพหุนามดีกรีสอง (สสวท. ม.2 เล่ม 2)",
          "difficulty": "intermediate",
          "description": "การดึงตัวคูณร่วม การแยกสองวงเล็บ กำลังสองสมบูรณ์ และผลต่างกำลังสอง",
          "topicId": "math_j_t6",
          "sortOrder": 3
        },
        {
          "id": "math_j_t6_s2_1",
          "parentId": "math_j_t6_s2",
          "level": 2,
          "name": "กำลังสองสมบูรณ์ (Perfect Square: $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$)",
          "difficulty": "intermediate",
          "description": "การจัดรูปพหุนามโดยการบวกเข้าและลบออกด้วย $(\\text{สัมประสิทธิ์พจน์กลาง}/2)^2$",
          "topicId": "math_j_t6",
          "sortOrder": 4
        },
        {
          "id": "math_j_t6_s2_2",
          "parentId": "math_j_t6_s2",
          "level": 2,
          "name": "ผลต่างของกำลังสอง (Difference of Squares: $a^2 - b^2 = (a - b)(a + b)$)",
          "difficulty": "intermediate",
          "description": "การประยุกต์ผลต่างกำลังสองกับตัวเลขขนาดใหญ่ เช่น $2026^2 - 2025^2 = (2026-2025)(2026+2025)$",
          "topicId": "math_j_t6",
          "sortOrder": 5
        },
        {
          "id": "math_j_t6_s3",
          "level": 1,
          "name": "6.3 การแยกตัวประกอบดีกรีสูงกว่าสอง & เทคนิคพิเศษ (สสวท. ม.3 เล่ม 1)",
          "difficulty": "advanced",
          "description": "ผลบวก-ผลต่างกำลังสาม การจัดกลุ่มตัวแปร และการบวกเข้า-หักออก",
          "topicId": "math_j_t6",
          "sortOrder": 6
        },
        {
          "id": "math_j_t6_s3_1",
          "parentId": "math_j_t6_s3",
          "level": 2,
          "name": "ผลบวกและผลต่างของกำลังสาม ($a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)$)",
          "difficulty": "intermediate",
          "description": "การจำแนกเครื่องหมายในวงเล็บสั้นและวงเล็บยาวอย่างแม่นยำ",
          "topicId": "math_j_t6",
          "sortOrder": 7
        },
        {
          "id": "math_j_t6_s3_2",
          "parentId": "math_j_t6_s3",
          "level": 3,
          "name": "การกระจายกำลังสองของสามพจน์ ($(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$)",
          "difficulty": "advanced",
          "description": "สูตร $(a+b+c)^2$ และการประยุกต์หาผลบวกกำลังสอง $a^2+b^2+c^2$",
          "topicId": "math_j_t6",
          "sortOrder": 8
        },
        {
          "id": "math_j_t6_s3_3",
          "parentId": "math_j_t6_s3_2",
          "level": 4,
          "name": "K-Tips: เอกลักษณ์สามมิติ $a^3 + b^3 + c^3 - 3abc$ และกรณีเฉพาะ $a + b + c = 0$",
          "difficulty": "advanced",
          "description": "เมื่อ $a+b+c = 0$ จะได้ $a^3 + b^3 + c^3 = 3abc$ ทันที (ออกสอบเตรียมฯ และ MWIT ทุกปี)",
          "topicId": "math_j_t6",
          "sortOrder": 9
        },
        {
          "id": "math_j_t6_s4",
          "level": 1,
          "name": "6.4 ทฤษฎีบทเศษเหลือและการหารสังเคราะห์ (Remainder Theorem & Synthetic Division)",
          "difficulty": "advanced",
          "description": "ทฤษฎีบทเศษเหลือ $P(c)$, ทฤษฎีบทตัวประกอบ และการหารสังเคราะห์ลดทอนดีกรี",
          "topicId": "math_j_t6",
          "sortOrder": 10
        },
        {
          "id": "math_j_t6_s4_1",
          "parentId": "math_j_t6_s4",
          "level": 2,
          "name": "ทฤษฎีบทเศษเหลือและการหาค่าเศษโดยไม่ต้องตั้งหาร",
          "difficulty": "intermediate",
          "description": "หาร $P(x)$ ด้วย $x - c$ เศษเท่ากับ $P(c)$, หารด้วย $ax - b$ เศษเท่ากับ $P(b/a)$",
          "topicId": "math_j_t6",
          "sortOrder": 11
        },
        {
          "id": "math_j_t6_s4_2",
          "parentId": "math_j_t6_s4",
          "level": 3,
          "name": "การหารสังเคราะห์ (Synthetic Division) และการสุ่มรากตรรกยะ $\\pm \\frac{p}{q}$",
          "difficulty": "advanced",
          "description": "วิธีตั้งหารสังเคราะห์เพื่อหารากของสมการพหุนามดีกรี 3 และ 4",
          "topicId": "math_j_t6",
          "sortOrder": 12
        },
        {
          "id": "math_j_t6_s4_3",
          "parentId": "math_j_t6_s4_2",
          "level": 4,
          "name": "K-Tips: ผลรวมสัมประสิทธิ์ $P(1)$ และผลรวมสัมประสิทธิ์สลับเครื่องหมาย $P(-1)$",
          "difficulty": "advanced",
          "description": "เทคนิคหาผลรวมสัมประสิทธิ์พจน์คี่และพจน์คู่ในพหุนามที่กระจายตัว",
          "topicId": "math_j_t6",
          "sortOrder": 13
        },
        {
          "id": "math_j_t6_s5",
          "level": 1,
          "name": "6.5 ผลบวกและผลคูณของรากพหุนาม: สูตรของเวียตา (Vieta’s Formulas for Polynomials)",
          "difficulty": "advanced",
          "description": "ความสัมพันธ์ระหว่างรากของสมการพหุนามดีกรี $n$ กับสัมประสิทธิ์ของพหุนาม",
          "topicId": "math_j_t6",
          "sortOrder": 14
        },
        {
          "id": "math_j_t6_s5_1",
          "parentId": "math_j_t6_s5",
          "level": 2,
          "name": "ผลบวกและผลคูณของรากพหุนามดีกรีสองและดีกรีสาม ($ax^2+bx+c=0$ และ $ax^3+bx^2+cx+d=0$)",
          "difficulty": "intermediate",
          "description": "กำลังสอง: $r_1+r_2 = -\\frac{b}{a}$, $r_1 r_2 = \\frac{c}{a}$ | กำลังสาม: $\\sum r_i = -\\frac{b}{a}$, $\\sum r_i r_j = \\frac{c}{a}$, $r_1 r_2 r_3 = -\\frac{d}{a}$",
          "topicId": "math_j_t6",
          "sortOrder": 15
        },
        {
          "id": "math_j_t6_s5_2",
          "parentId": "math_j_t6_s5",
          "level": 3,
          "name": "สูตรของเวียตาทั่วไปสำหรับพหุนามดีกรี $n$ (General Vieta’s Theorem)",
          "difficulty": "advanced",
          "description": "สำหรับ $P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_0$ ผลบวกราก $\\sum r_i = -\\frac{a_{n-1}}{a_n}$, ผลคูณราก $\\prod r_i = (-1)^n \\frac{a_0}{a_n}$",
          "topicId": "math_j_t6",
          "sortOrder": 16
        },
        {
          "id": "math_j_t6_s5_3",
          "parentId": "math_j_t6_s5",
          "level": 3,
          "name": "การหาค่าฟังก์ชันสมมาตรของราก ($r_1^2 + r_2^2 + \\dots$ และ $\\frac{1}{r_1} + \\frac{1}{r_2} + \\dots$)",
          "difficulty": "advanced",
          "description": "การใช้เอกลักษณ์ $(\\sum r_i)^2 = \\sum r_i^2 + 2\\sum r_i r_j$ เพื่อหาผลบวกกำลังสองของรากโดยไม่ต้องแก้หาราก",
          "topicId": "math_j_t6",
          "sortOrder": 17
        },
        {
          "id": "math_j_t6_s5_4",
          "parentId": "math_j_t6_s5_3",
          "level": 4,
          "name": "K-Tips: เทคนิคจัดรูปนิพจน์สมมาตร & แปลงสมการรากพหุนามในข้อสอบเตรียมอุดมฯ และ MWIT",
          "difficulty": "advanced",
          "description": "เทคนิคแปลงสมการหารากผกผัน $y = \\frac{1}{x}$ หรือรากเลื่อน $y = x - k$ ตอบโจทย์ข้อสอบแข่งขันได้ใน 30 วินาที",
          "topicId": "math_j_t6",
          "sortOrder": 18
        }
      ]
    },
    {
      "id": "math_j_t7",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 7: สมการกำลังสองตัวแปรเดียว",
      "nameEn": "Quadratic Equations in One Variable",
      "sortOrder": 7,
      "subtopics": [
        {
          "id": "math_j_t7_s1",
          "level": 1,
          "name": "7.1 สมการกำลังสองตัวแปรเดียวและการหาคำตอบ (สสวท. ม.3 เล่ม 1)",
          "difficulty": "basic",
          "description": "รูปทั่วไป $ax^2 + bx + c = 0$ ($a \\neq 0$) วิธีแยกตัวประกอบ และวิธีกำลังสองสมบูรณ์",
          "topicId": "math_j_t7",
          "sortOrder": 1
        },
        {
          "id": "math_j_t7_s1_1",
          "parentId": "math_j_t7_s1",
          "level": 2,
          "name": "การใช้สูตรคำตอบสมการกำลังสอง $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$",
          "difficulty": "intermediate",
          "description": "การแก้สมการด้วยสูตร $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ และที่มาจากการจัดรูปกำลังสองสมบูรณ์",
          "topicId": "math_j_t7",
          "sortOrder": 2
        },
        {
          "id": "math_j_t7_s1_2",
          "parentId": "math_j_t7_s1",
          "level": 3,
          "name": "การวิเคราะห์รากจากดิสคริมิแนนต์ (Discriminant $\\Delta = b^2 - 4ac$)",
          "difficulty": "intermediate",
          "description": "$\\Delta > 0$ (มี 2 รากจริงต่างกัน), $\\Delta = 0$ (มี 1 รากจริง/รากซ้ำ), $\\Delta < 0$ (ไม่มีรากเป็นจำนวนจริง)",
          "topicId": "math_j_t7",
          "sortOrder": 3
        },
        {
          "id": "math_j_t7_s2",
          "level": 1,
          "name": "7.2 การประยุกต์สูตรของเวียตากับสมการกำลังสอง ($x_1 + x_2 = -\\frac{b}{a}, x_1 x_2 = \\frac{c}{a}$)",
          "difficulty": "intermediate",
          "description": "การหาค่า $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2$, $\\frac{1}{x_1} + \\frac{1}{x_2} = \\frac{x_1+x_2}{x_1x_2}$ และ $|x_1 - x_2| = \\frac{\\sqrt{b^2-4ac}}{|a|}$",
          "topicId": "math_j_t7",
          "sortOrder": 4
        },
        {
          "id": "math_j_t7_s2_1",
          "parentId": "math_j_t7_s2",
          "level": 2,
          "name": "การสร้างสมการกำลังสองใหม่จากรากที่กำหนด ($x^2 - (\\text{ผลบวกราก})x + (\\text{ผลคูณราก}) = 0$)",
          "difficulty": "intermediate",
          "description": "การสร้างสมการใหม่ที่มีรากเป็น $2x_1, 2x_2$ หรือ $x_1+1, x_2+1$",
          "topicId": "math_j_t7",
          "sortOrder": 5
        },
        {
          "id": "math_j_t7_s2_2",
          "parentId": "math_j_t7_s2",
          "level": 4,
          "name": "K-Tips: ขอบเขตของรากสมการกำลังสองและเงื่อนไขรากเป็นจำนวนจริงบวกทั้งสองค่า",
          "difficulty": "advanced",
          "description": "เงื่อนไข $\\Delta \\ge 0$, ผลบวกราก $> 0$, และผลคูณราก $> 0$ ในข้อสอบคัดเลือกเตรียมอุดมฯ",
          "topicId": "math_j_t7",
          "sortOrder": 6
        },
        {
          "id": "math_j_t7_s3",
          "level": 1,
          "name": "7.3 โจทย์ปัญหาและสมการติดกรณฑ์/สมการแปลงรูป",
          "difficulty": "advanced",
          "description": "โจทย์ปัญหาพื้นที่ ผลคูณจำนวนเรียงติดกัน และสมการที่แก้ด้วยการยกกำลังสอง",
          "topicId": "math_j_t7",
          "sortOrder": 7
        },
        {
          "id": "math_j_t7_s3_1",
          "parentId": "math_j_t7_s3",
          "level": 2,
          "name": "สมการติดกรณฑ์ $\\sqrt{f(x)} = g(x)$ และการตรวจสอบคำตอบแปลกปลอม (Extraneous Roots)",
          "difficulty": "intermediate",
          "description": "ข้อควรระวังเงื่อนไขใต้กรณฑ์ $f(x) \\ge 0$ และผลลัพธ์ของกรณฑ์ $g(x) \\ge 0$",
          "topicId": "math_j_t7",
          "sortOrder": 8
        },
        {
          "id": "math_j_t7_s3_2",
          "parentId": "math_j_t7_s3_1",
          "level": 4,
          "name": "K-Tips: สมการกรณฑ์ซ้อนกันไม่สิ้นสุด $x = \\sqrt{a + \\sqrt{a + \\dots}}$ และเศษส่วนวนซ้ำ",
          "difficulty": "advanced",
          "description": "เทคนิคสมมติตัวแปร $x = \\sqrt{a + x} \\implies x^2 - x - a = 0$ พร้อมเลือกคำตอบที่เป็นบวก",
          "topicId": "math_j_t7",
          "sortOrder": 9
        }
      ]
    },
    {
      "id": "math_j_t8",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 8: พาราโบลาและฟังก์ชันกำลังสอง",
      "nameEn": "Parabola & Quadratic Functions",
      "sortOrder": 8,
      "subtopics": [
        {
          "id": "math_j_t8_s1",
          "level": 1,
          "name": "8.1 กราฟของฟังก์ชันกำลังสองและรูปแบบมาตรฐาน (สสวท. ม.3 เล่ม 1)",
          "difficulty": "basic",
          "description": "รูปมาตรฐาน $y = a(x - h)^2 + k$ กราฟพาราโบลาหงายและคว่ำ",
          "topicId": "math_j_t8",
          "sortOrder": 1
        },
        {
          "id": "math_j_t8_s1_1",
          "parentId": "math_j_t8_s1",
          "level": 2,
          "name": "จุดยอด $(h, k)$ แกนสมมาตร $x = h$ และความกว้าง/แคบของกราฟ",
          "difficulty": "basic",
          "description": "อิทธิพลของค่า $a$ ($a > 0$ หงาย เกิดจุดต่ำสุด $y = k$, $a < 0$ คว่ำ เกิดจุดสูงสุด $y = k$)",
          "topicId": "math_j_t8",
          "sortOrder": 2
        },
        {
          "id": "math_j_t8_s1_2",
          "parentId": "math_j_t8_s1",
          "level": 3,
          "name": "การแปลงรูปทั่วไป $y = ax^2 + bx + c$ สู่รูปมาตรฐาน $y = a(x - h)^2 + k$",
          "difficulty": "intermediate",
          "description": "สูตรจุดยอด $(h, k) = \\left(-\\frac{b}{2a}, \\frac{4ac - b^2}{4a}\\right)$ และจุดตัดแกน X, Y ($(0, c)$)",
          "topicId": "math_j_t8",
          "sortOrder": 3
        },
        {
          "id": "math_j_t8_s2",
          "level": 1,
          "name": "8.2 ความสัมพันธ์เชิงเรขาคณิตและการตัดแกนของพาราโบลา",
          "difficulty": "intermediate",
          "description": "ระยะตัดแกน X, แกนสมมาตรแบ่งครึ่งคอร์ดแนวนอน, และจุดตัดระหว่างเส้นตรงกับพาราโบลา",
          "topicId": "math_j_t8",
          "sortOrder": 4
        },
        {
          "id": "math_j_t8_s2_1",
          "parentId": "math_j_t8_s2",
          "level": 2,
          "name": "การวิเคราะห์จุดตัดแกน X จาก $b^2 - 4ac$",
          "difficulty": "intermediate",
          "description": "ตัดแกน X สองจุด ($b^2 - 4ac > 0$), สัมผัสแกน X หนึ่งจุด ($b^2 - 4ac = 0$), ไม่ตัดแกน X ($b^2 - 4ac < 0$)",
          "topicId": "math_j_t8",
          "sortOrder": 5
        },
        {
          "id": "math_j_t8_s2_2",
          "parentId": "math_j_t8_s2",
          "level": 3,
          "name": "โจทย์ปัญหาค่าสูงสุดและค่าต่ำสุดเชิงประยุกต์ (Optimization Problems)",
          "difficulty": "advanced",
          "description": "การล้อมรั้วให้ได้พื้นที่มากที่สุด, การตั้งราคาสินค้าเพื่อกำไรสูงสุด, การยิงขีปนาวุธ/วิถีโค้ง $h(t) = -gt^2 + v_0 t$",
          "topicId": "math_j_t8",
          "sortOrder": 6
        },
        {
          "id": "math_j_t8_s2_3",
          "parentId": "math_j_t8_s2_2",
          "level": 4,
          "name": "K-Tips: สูตรลัดจุดวกกลับ $x = -\\frac{b}{2a}$ & พาราโบลาสมมาตรรอบแกนในข้อสอบแข่งขัน",
          "difficulty": "advanced",
          "description": "เทคนิคแก้โจทย์ Optimization โดยไม่ต้องกระจายสมการกำลังสองยาว",
          "topicId": "math_j_t8",
          "sortOrder": 7
        }
      ]
    },
    {
      "id": "math_j_t9",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 9: ลำดับ อนุกรม และแบบรูป",
      "nameEn": "Sequences, Series & Patterns",
      "sortOrder": 9,
      "subtopics": [
        {
          "id": "math_j_t9_s1",
          "level": 1,
          "name": "9.1 ลำดับเลขคณิตและลำดับเรขาคณิต (Arithmetic & Geometric Sequences)",
          "difficulty": "basic",
          "description": "นิยามพจน์ ผลต่างร่วม ($d$) อัตราส่วนร่วม ($r$) และสูตรพจน์ทั่วไป $a_n$",
          "topicId": "math_j_t9",
          "sortOrder": 1
        },
        {
          "id": "math_j_t9_s1_1",
          "parentId": "math_j_t9_s1",
          "level": 2,
          "name": "ลำดับเลขคณิต $a_n = a_1 + (n - 1)d$ และการหาจำนวนพจน์ $n$",
          "difficulty": "basic",
          "description": "สูตรหาจำนวนพจน์ $n = \\frac{a_n - a_1}{d} + 1$",
          "topicId": "math_j_t9",
          "sortOrder": 2
        },
        {
          "id": "math_j_t9_s1_2",
          "parentId": "math_j_t9_s1",
          "level": 2,
          "name": "ลำดับเรขาคณิต $a_n = a_1 r^{n - 1}$",
          "difficulty": "intermediate",
          "description": "การหาพจน์ทั่วไปเมื่ออัตราส่วนร่วมเป็นเศษส่วนหรือจำนวนลบ",
          "topicId": "math_j_t9",
          "sortOrder": 3
        },
        {
          "id": "math_j_t9_s2",
          "level": 1,
          "name": "9.2 อนุกรมและผลบวก $S_n$ (Series & Summation)",
          "difficulty": "intermediate",
          "description": "ผลบวก $n$ พจน์แรกของอนุกรมเลขคณิตและอนุกรมเรขาคณิต",
          "topicId": "math_j_t9",
          "sortOrder": 4
        },
        {
          "id": "math_j_t9_s2_1",
          "parentId": "math_j_t9_s2",
          "level": 2,
          "name": "อนุกรมเลขคณิต $S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}[2a_1 + (n - 1)d]$",
          "difficulty": "intermediate",
          "description": "เทคนิคการจับคู่หัว-ท้ายของเกาส์ (Gauss Trick: $1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$)",
          "topicId": "math_j_t9",
          "sortOrder": 5
        },
        {
          "id": "math_j_t9_s2_2",
          "parentId": "math_j_t9_s2",
          "level": 3,
          "name": "สูตรผลรวมกำลัง $k$ ($\\sum i, \\sum i^2, \\sum i^3$)",
          "difficulty": "advanced",
          "description": "$\\sum i = \\frac{n(n+1)}{2}$, $\\sum i^2 = \\frac{n(n+1)(2n+1)}{6}$, $\\sum i^3 = \\left[\\frac{n(n+1)}{2}\\right]^2$",
          "topicId": "math_j_t9",
          "sortOrder": 6
        },
        {
          "id": "math_j_t9_s3",
          "level": 1,
          "name": "9.3 อนุกรมเศษส่วนเทเลสโคปิก (Telescoping Series)",
          "difficulty": "advanced",
          "description": "อนุกรมเศษส่วนย่อยที่พจน์กลางหักล้างกันจนเหลือเฉพาะหัวและท้าย",
          "topicId": "math_j_t9",
          "sortOrder": 7
        },
        {
          "id": "math_j_t9_s3_1",
          "parentId": "math_j_t9_s3",
          "level": 2,
          "name": "อนุกรมตัดกันสองพจน์ $\\frac{1}{n(n + k)} = \\frac{1}{k}\\left(\\frac{1}{n} - \\frac{1}{n + k}\\right)$",
          "difficulty": "intermediate",
          "description": "การหาผลบวก $\\frac{1}{1\\times 2} + \\frac{1}{2\\times 3} + \\dots + \\frac{1}{99\\times 100} = 1 - \\frac{1}{100} = \\frac{99}{100}$",
          "topicId": "math_j_t9",
          "sortOrder": 8
        },
        {
          "id": "math_j_t9_s3_2",
          "parentId": "math_j_t9_s3",
          "level": 3,
          "name": "อนุกรมตัดกันสามพจน์และอนุกรมติดกรณฑ์ $\\frac{1}{\\sqrt{n} + \\sqrt{n + 1}}$",
          "difficulty": "advanced",
          "description": "การคอนจูเกตเพื่อเปลี่ยนรูปเป็น $\\sqrt{n+1} - \\sqrt{n}$ แล้วตัดกัน",
          "topicId": "math_j_t9",
          "sortOrder": 9
        },
        {
          "id": "math_j_t9_s3_3",
          "parentId": "math_j_t9_s3_2",
          "level": 4,
          "name": "K-Tips: ลำดับผลต่างหลายชั้น (Method of Differences) & ลำดับฟีโบนักชีในข้อสอบ Unseen",
          "difficulty": "advanced",
          "description": "การสร้างพจน์ทั่วไปของลำดับพหุนามดีกรีสองและสามด้วยสูตรผลต่างชั้นที่สองและสาม",
          "topicId": "math_j_t9",
          "sortOrder": 10
        }
      ]
    },
    {
      "id": "math_j_t10",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 10: เรขาคณิตระนาบ พีทาโกรัส และเส้นขนาน",
      "nameEn": "Plane Geometry, Pythagoras & Parallel Lines",
      "sortOrder": 10,
      "subtopics": [
        {
          "id": "math_j_t10_s1",
          "level": 1,
          "name": "10.1 เส้นขนานและมุม (สสวท. ม.2 เล่ม 2)",
          "difficulty": "basic",
          "description": "มุมแย้ง มุมภายในบนข้างเดียวกันของเส้นตัด และมุมภายนอกกับมุมภายใน",
          "topicId": "math_j_t10",
          "sortOrder": 1
        },
        {
          "id": "math_j_t10_s1_1",
          "parentId": "math_j_t10_s1",
          "level": 2,
          "name": "สมบัติของมุมภายในและมุมภายนอกของรูปหลายเหลี่ยม ($(n - 2) \\times 180^\\circ$)",
          "difficulty": "basic",
          "description": "ผลบวกมุมภายในรูปสามเหลี่ยม $= 180^\\circ$, รูป $n$ เหลี่ยม $= (n - 2) \\times 180^\\circ$, มุมภายนอกรวม $= 360^\\circ$",
          "topicId": "math_j_t10",
          "sortOrder": 2
        },
        {
          "id": "math_j_t10_s1_2",
          "parentId": "math_j_t10_s1",
          "level": 3,
          "name": "เส้นขนานกับเส้นตัดซิกแซก (Zig-Zag Angle Properties)",
          "difficulty": "intermediate",
          "description": "ผลรวมมุมแหลมชี้ซ้าย = ผลรวมมุมแหลมชี้ขวา (เทคนิคสร้างเส้นขนานช่วยผ่านจุดหักมุม)",
          "topicId": "math_j_t10",
          "sortOrder": 3
        },
        {
          "id": "math_j_t10_s2",
          "level": 1,
          "name": "10.2 ทฤษฎีบทพีทาโกรัสและบทกลับ (สสวท. ม.2 เล่ม 1)",
          "difficulty": "basic",
          "description": "ความสัมพันธ์ $a^2 + b^2 = c^2$ และการตรวจสอบชนิดของรูปสามเหลี่ยม",
          "topicId": "math_j_t10",
          "sortOrder": 4
        },
        {
          "id": "math_j_t10_s2_1",
          "parentId": "math_j_t10_s2",
          "level": 2,
          "name": "ชุดตัวเลขพีทาโกรัสยอดนิยม (Pythagorean Triples)",
          "difficulty": "basic",
          "description": "$(3,4,5), (5,12,13), (7,24,25), (8,15,17), (9,40,41), (20,21,29)$ และตัวคูณเท่า",
          "topicId": "math_j_t10",
          "sortOrder": 5
        },
        {
          "id": "math_j_t10_s2_2",
          "parentId": "math_j_t10_s2",
          "level": 3,
          "name": "บทกลับของทฤษฎีบทพีทาโกรัสและการจำแนกสามเหลี่ยมมุมแหลม/มุมป้าน",
          "difficulty": "intermediate",
          "description": "$c^2 = a^2 + b^2$ (มุมฉาก), $c^2 < a^2 + b^2$ (มุมแหลม), $c^2 > a^2 + b^2$ (มุมป้าน)",
          "topicId": "math_j_t10",
          "sortOrder": 6
        },
        {
          "id": "math_j_t10_s3",
          "level": 1,
          "name": "10.3 ทฤษฎีบทเรขาคณิตสามเหลี่ยมขั้นสูง & การหาพื้นที่",
          "difficulty": "advanced",
          "description": "ทฤษฎีบทของสจ๊วต เมเนลอส เซวา และสูตรของเฮรอน",
          "topicId": "math_j_t10",
          "sortOrder": 7
        },
        {
          "id": "math_j_t10_s3_1",
          "parentId": "math_j_t10_s3",
          "level": 2,
          "name": "สูตรพื้นที่ของเฮรอน (Heron’s Formula: $\\text{Area} = \\sqrt{s(s-a)(s-b)(s-c)}$)",
          "difficulty": "intermediate",
          "description": "การหาพื้นที่สามเหลี่ยมเมื่อทราบความยาวด้านทั้งสาม ($s = \\frac{a+b+c}{2}$)",
          "topicId": "math_j_t10",
          "sortOrder": 8
        },
        {
          "id": "math_j_t10_s3_2",
          "parentId": "math_j_t10_s3",
          "level": 3,
          "name": "รัศมีวงกลมแนบใน ($r = \\frac{\\text{Area}}{s}$) และรัศมีวงกลมแนบนอก ($R = \\frac{abc}{4\\text{Area}}$)",
          "difficulty": "advanced",
          "description": "ความสัมพันธ์ระหว่างพื้นที่ ความยาวรอบรูป และรัศมีวงกลมที่ล้อมรอบ/แนบในรูปสามเหลี่ยม",
          "topicId": "math_j_t10",
          "sortOrder": 9
        },
        {
          "id": "math_j_t10_s3_3",
          "parentId": "math_j_t10_s3_2",
          "level": 4,
          "name": "K-Tips: ทฤษฎีบทของสจ๊วต (Stewart’s Theorem: $b^2 m + c^2 n = a(d^2 + mn)$) หาเส้นเซเวียน",
          "difficulty": "advanced",
          "description": "สูตรคำนวณความยาวเส้นมัธยฐานและเส้นแบ่งครึ่งมุมในข้อสอบเตรียมอุดมฯ และ MWIT",
          "topicId": "math_j_t10",
          "sortOrder": 10
        }
      ]
    },
    {
      "id": "math_j_t11",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 11: ความเท่ากันทุกประการและความคล้าย",
      "nameEn": "Congruence & Similarity",
      "sortOrder": 11,
      "subtopics": [
        {
          "id": "math_j_t11_s1",
          "level": 1,
          "name": "11.1 ความเท่ากันทุกประการของรูปสามเหลี่ยม (สสวท. ม.2 เล่ม 2)",
          "difficulty": "basic",
          "description": "เงื่อนไขความเท่ากันทุกประการ: ด.ม.ด., ม.ด.ม., ด.ด.ด., ม.ม.ด., ฉ.ด.ด.",
          "topicId": "math_j_t11",
          "sortOrder": 1
        },
        {
          "id": "math_j_t11_s1_1",
          "parentId": "math_j_t11_s1",
          "level": 2,
          "name": "การให้เหตุผลทางเรขาคณิตและการพิสูจน์ (Geometric Proofs)",
          "difficulty": "intermediate",
          "description": "การอ้างสัจพจน์และทฤษฎีบทเพื่อพิสูจน์ความเท่ากันของมุมและความยาวด้าน",
          "topicId": "math_j_t11",
          "sortOrder": 2
        },
        {
          "id": "math_j_t11_s2",
          "level": 1,
          "name": "11.2 รูปสามเหลี่ยมที่คล้ายกัน (สสวท. ม.3 เล่ม 1)",
          "difficulty": "basic",
          "description": "นิยามรูปเรขาคณิตที่คล้ายกัน อัตราส่วนของด้านคู่ที่สมนัยกันเท่ากัน $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$",
          "topicId": "math_j_t11",
          "sortOrder": 3
        },
        {
          "id": "math_j_t11_s2_1",
          "parentId": "math_j_t11_s2",
          "level": 2,
          "name": "ทฤษฎีบทสามเหลี่ยมมุมฉากคล้ายกัน & ส่วนสูงบนด้านตรงข้ามมุมฉาก",
          "difficulty": "intermediate",
          "description": "ความสัมพันธ์ $h^2 = mn, a^2 = cm, b^2 = cn$ เมื่อลากส่วนสูงลงมาที่ด้านตรงข้ามมุมฉาก $c$",
          "topicId": "math_j_t11",
          "sortOrder": 4
        },
        {
          "id": "math_j_t11_s2_2",
          "parentId": "math_j_t11_s2",
          "level": 3,
          "name": "โจทย์ปัญหาการนำความคล้ายไปใช้ในชีวิตจริง (เงาและระยะทาง)",
          "difficulty": "intermediate",
          "description": "การคำนวณความสูงของตึก เสาธง และความกว้างของแม่น้ำโดยใช้เงา",
          "topicId": "math_j_t11",
          "sortOrder": 5
        },
        {
          "id": "math_j_t11_s2_3",
          "parentId": "math_j_t11_s2_2",
          "level": 4,
          "name": "K-Tips: ทฤษฎีบทอัตราส่วนพื้นที่ ($k^2$) และปริมาตร ($k^3$) ของรูปที่คล้ายกัน",
          "difficulty": "advanced",
          "description": "เมื่ออัตราส่วนด้านเป็น $k$ อัตราส่วนพื้นที่แรเงาจะเท่ากับ $k^2$ และปริมาตรเป็น $k^3$ เสมอ",
          "topicId": "math_j_t11",
          "sortOrder": 6
        }
      ]
    },
    {
      "id": "math_j_t12",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 12: วงกลมและทฤษฎีบทวงกลมขั้นสูง",
      "nameEn": "Circles & Advanced Circle Theorems",
      "sortOrder": 12,
      "subtopics": [
        {
          "id": "math_j_t12_s1",
          "level": 1,
          "name": "12.1 ทฤษฎีบทมุมและส่วนโค้งของวงกลม (สสวท. ม.3 เล่ม 2)",
          "difficulty": "basic",
          "description": "มุมที่จุดศูนย์กลาง มุมในส่วนโค้งของวงกลม และมุมในครึ่งวงกลม",
          "topicId": "math_j_t12",
          "sortOrder": 1
        },
        {
          "id": "math_j_t12_s1_1",
          "parentId": "math_j_t12_s1",
          "level": 2,
          "name": "มุมที่จุดศูนย์กลางมีขนาดเป็นสองเท่าของมุมในส่วนโค้ง ($2\\theta$ vs $\\theta$)",
          "difficulty": "basic",
          "description": "ทฤษฎีบทมุมที่จุดศูนย์กลางโตเป็น 2 เท่า และมุมในครึ่งวงกลมกาง $90^\\circ$ เสมอ",
          "topicId": "math_j_t12",
          "sortOrder": 2
        },
        {
          "id": "math_j_t12_s1_2",
          "parentId": "math_j_t12_s1",
          "level": 2,
          "name": "มุมในส่วนโค้งของวงกลมที่รองรับด้วยส่วนโค้งเดียวกันมีขนาดเท่ากัน",
          "difficulty": "basic",
          "description": "ทฤษฎีบท \"มุมโบว์ไทน์\" (Bow-tie Angles) สำหรับสี่เหลี่ยมแนบในวงกลม",
          "topicId": "math_j_t12",
          "sortOrder": 3
        },
        {
          "id": "math_j_t12_s2",
          "level": 1,
          "name": "12.2 คอร์ดและเส้นสัมผัสวงกลม (Chords & Tangents)",
          "difficulty": "intermediate",
          "description": "สมบัติเส้นตั้งฉากแบ่งครึ่งคอร์ด และเส้นสัมผัสตั้งฉากกับรัศมีที่จุดสัมผัส",
          "topicId": "math_j_t12",
          "sortOrder": 4
        },
        {
          "id": "math_j_t12_s2_1",
          "parentId": "math_j_t12_s2",
          "level": 2,
          "name": "ส่วนของเส้นตรงสัมผัสวงกลมจากจุดภายนอกจุดเดียวกันมีความยาวเท่ากัน",
          "difficulty": "intermediate",
          "description": "การใช้สมบัติความยาวเส้นสัมผัสเท่ากันเพื่อหารอบรูปของสามเหลี่ยมที่วงกลมแนบใน",
          "topicId": "math_j_t12",
          "sortOrder": 5
        },
        {
          "id": "math_j_t12_s2_2",
          "parentId": "math_j_t12_s2",
          "level": 3,
          "name": "มุมที่เกิดจากคอร์ดและเส้นสัมผัสเท่ากับมุมในส่วนโค้งที่อยู่ตรงข้าม (Alternate Segment)",
          "difficulty": "advanced",
          "description": "ทฤษฎีบท Alternate Segment Theorem หัวใจหลักของการคำนวณมุมในข้อสอบแข่งขัน",
          "topicId": "math_j_t12",
          "sortOrder": 6
        },
        {
          "id": "math_j_t12_s3",
          "level": 1,
          "name": "12.3 รูปสี่เหลี่ยมแนบในวงกลม (Cyclic Quadrilateral) & ปโตเลมี",
          "difficulty": "advanced",
          "description": "ผลบวกมุมตรงข้าม $180^\\circ$, ทฤษฎีบทปโตเลมี, และสูตรของพรหมคุปต์",
          "topicId": "math_j_t12",
          "sortOrder": 7
        },
        {
          "id": "math_j_t12_s3_1",
          "parentId": "math_j_t12_s3",
          "level": 2,
          "name": "สมบัติมุมของรูปสี่เหลี่ยมแนบในวงกลม (ผลบวกมุมตรงข้าม $= 180^\\circ$)",
          "difficulty": "intermediate",
          "description": "มุมภายนอกของรูปสี่เหลี่ยมแนบในวงกลมเท่ากับมุมภายในที่อยู่ตรงข้าม",
          "topicId": "math_j_t12",
          "sortOrder": 8
        },
        {
          "id": "math_j_t12_s3_2",
          "parentId": "math_j_t12_s3",
          "level": 3,
          "name": "ทฤษฎีบทของปโตเลมี (Ptolemy’s Theorem: $AC \\cdot BD = AB \\cdot CD + BC \\cdot DA$)",
          "difficulty": "advanced",
          "description": "ผลคูณความยาวเส้นทแยงมุมเท่ากับผลบวกของผลคูณด้านตรงข้าม",
          "topicId": "math_j_t12",
          "sortOrder": 9
        },
        {
          "id": "math_j_t12_s3_3",
          "parentId": "math_j_t12_s3_2",
          "level": 4,
          "name": "K-Tips: ทฤษฎีกำลังของจุด (Power of a Point Theorem: $PA \\cdot PB = PC \\cdot PD = PT^2$)",
          "difficulty": "advanced",
          "description": "ทฤษฎีบทคอร์ดตัดกันภายในและภายนอกวงกลม ออกข้อสอบเตรียมอุดมฯ และ MWIT ทุกปี",
          "topicId": "math_j_t12",
          "sortOrder": 10
        }
      ]
    },
    {
      "id": "math_j_t13",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 13: พื้นที่ผิวและปริมาตรสามมิติ",
      "nameEn": "Surface Area & Volume of 3D Solids",
      "sortOrder": 13,
      "subtopics": [
        {
          "id": "math_j_t13_s1",
          "level": 1,
          "name": "13.1 ปริซึมและทรงกระบอก (สสวท. ม.2 เล่ม 1)",
          "difficulty": "basic",
          "description": "พื้นที่ผิวข้าง พื้นที่ผิวทั้งหมด และปริมาตรของรูปทรงหน้าตัดสม่ำเสมอ",
          "topicId": "math_j_t13",
          "sortOrder": 1
        },
        {
          "id": "math_j_t13_s1_1",
          "parentId": "math_j_t13_s1",
          "level": 2,
          "name": "ปริซึม: ปริมาตร $= \\text{พื้นที่ฐาน} \\times h$, พื้นที่ผิวข้าง $= \\text{เส้นรอบฐาน} \\times h$",
          "difficulty": "basic",
          "description": "ปริซึมสามเหลี่ยม สี่เหลี่ยม และหกเหลี่ยมด้านเท่า",
          "topicId": "math_j_t13",
          "sortOrder": 2
        },
        {
          "id": "math_j_t13_s1_2",
          "parentId": "math_j_t13_s1",
          "level": 2,
          "name": "ทรงกระบอก: $V = \\pi r^2 h$, พื้นที่ผิวข้าง $= 2\\pi rh$, พื้นที่ผิวทั้งหมด $= 2\\pi r^2 + 2\\pi rh$",
          "difficulty": "basic",
          "description": "การคลี่ผิวข้างทรงกระบอกออกเป็นรูปสี่เหลี่ยมผืนผ้า กว้าง $2\\pi r$ ยาว $h$",
          "topicId": "math_j_t13",
          "sortOrder": 3
        },
        {
          "id": "math_j_t13_s2",
          "level": 1,
          "name": "13.2 พีระมิด กรวย และทรงกลม (สสวท. ม.3 เล่ม 2)",
          "difficulty": "intermediate",
          "description": "รูปทรงยอดแหลมและทรงกลม พื้นที่ผิวและปริมาตร",
          "topicId": "math_j_t13",
          "sortOrder": 4
        },
        {
          "id": "math_j_t13_s2_1",
          "parentId": "math_j_t13_s2",
          "level": 2,
          "name": "พีระมิด: $V = \\frac{1}{3} \\times \\text{พ.ท.ฐาน} \\times h$, พื้นที่ผิวข้าง $= \\frac{1}{2} \\times \\text{เส้นรอบฐาน} \\times l$",
          "difficulty": "intermediate",
          "description": "ความสัมพันธ์ระหว่าง สูงตรง ($h$) สูงเอียง ($l$) และระยะจากศูนย์กลางฐานถึงขอบ ($r$): $l^2 = h^2 + r^2$",
          "topicId": "math_j_t13",
          "sortOrder": 5
        },
        {
          "id": "math_j_t13_s2_2",
          "parentId": "math_j_t13_s2",
          "level": 2,
          "name": "กรวย: $V = \\frac{1}{3}\\pi r^2 h$, พื้นที่ผิวข้าง $= \\pi r l$ (เมื่อ $l = \\sqrt{r^2 + h^2}$)",
          "difficulty": "intermediate",
          "description": "การคลี่ผิวข้างกรวยออกเป็นเซกเตอร์ (Sector) ของวงกลมรัศมี $l$",
          "topicId": "math_j_t13",
          "sortOrder": 6
        },
        {
          "id": "math_j_t13_s2_3",
          "parentId": "math_j_t13_s2",
          "level": 2,
          "name": "ทรงกลม: $V = \\frac{4}{3}\\pi r^3$, พื้นที่ผิวทรงกลม $= 4\\pi r^2$",
          "difficulty": "intermediate",
          "description": "ทรงกลมตัน ทรงกลมกลวง และครึ่งทรงกลม (Hemisphere)",
          "topicId": "math_j_t13",
          "sortOrder": 7
        },
        {
          "id": "math_j_t13_s3",
          "level": 1,
          "name": "13.3 รูปทรงตัดยอด (Frustum) และโจทย์ประยุกต์เชิงแข่งขัน",
          "difficulty": "advanced",
          "description": "พีระมิดยอดตัด กรวยยอดตัด และโจทย์หลอมละลายเปลี่ยนรูปทรง",
          "topicId": "math_j_t13",
          "sortOrder": 8
        },
        {
          "id": "math_j_t13_s3_1",
          "parentId": "math_j_t13_s3",
          "level": 3,
          "name": "ปริมาตรกรวยยอดตัด ($V = \\frac{1}{3}h(A_1 + A_2 + \\sqrt{A_1 A_2})$)",
          "difficulty": "advanced",
          "description": "การใช้สามเหลี่ยมคล้ายตัดยอดหรือใช้สูตรลัด Frustum คำนวณปริมาตรถังน้ำ/กระถาง",
          "topicId": "math_j_t13",
          "sortOrder": 9
        },
        {
          "id": "math_j_t13_s3_2",
          "parentId": "math_j_t13_s3_1",
          "level": 4,
          "name": "K-Tips: โจทย์การหย่อนทรงกลมลงในถังน้ำ & ระดับน้ำที่เพิ่มขึ้น ($V_{\\text{object}} = A_{\\text{base}} \\times h_{\\text{rise}}$)",
          "difficulty": "advanced",
          "description": "เทคนิค ปริมาตรวัตถุที่จม = ปริมาตรน้ำที่เพิ่มขึ้น ลดขั้นตอนตั้งสมการซับซ้อน",
          "topicId": "math_j_t13",
          "sortOrder": 10
        }
      ]
    },
    {
      "id": "math_j_t14",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 14: การแปลงทางเรขาคณิตและมิติสัมพันธ์",
      "nameEn": "Geometric Transformations & 3D Spatial Relations",
      "sortOrder": 14,
      "subtopics": [
        {
          "id": "math_j_t14_s1",
          "level": 1,
          "name": "14.1 การสร้างทางเรขาคณิตแบบยุคลิด (สสวท. ม.1 เล่ม 1)",
          "difficulty": "basic",
          "description": "การใช้วงเวียนและสันตรง: สร้างส่วนของเส้นตรง แบ่งครึ่งมุม สร้างเส้นตั้งฉาก",
          "topicId": "math_j_t14",
          "sortOrder": 1
        },
        {
          "id": "math_j_t14_s1_1",
          "parentId": "math_j_t14_s1",
          "level": 2,
          "name": "การสร้างมุมขนาดมาตรฐาน ($60^\\circ, 90^\\circ, 45^\\circ, 30^\\circ, 75^\\circ, 105^\\circ$)",
          "difficulty": "basic",
          "description": "การประยุกต์สามเหลี่ยมด้านเท่าและการแบ่งครึ่งมุมสร้างมุมผสม",
          "topicId": "math_j_t14",
          "sortOrder": 2
        },
        {
          "id": "math_j_t14_s2",
          "level": 1,
          "name": "14.2 การแปลงทางเรขาคณิต (สสวท. ม.2 เล่ม 1)",
          "difficulty": "intermediate",
          "description": "การเลื่อนขนาน (Translation) การสะท้อน (Reflection) และการหมุน (Rotation)",
          "topicId": "math_j_t14",
          "sortOrder": 3
        },
        {
          "id": "math_j_t14_s2_1",
          "parentId": "math_j_t14_s2",
          "level": 2,
          "name": "การเลื่อนขนานด้วยเวกเตอร์ (Vector Translation: $(x + a, y + b)$)",
          "difficulty": "basic",
          "description": "ทิศทางและระยะทางของการเลื่อนขนาน รูปต้นแบบขนานกับภาพที่ได้",
          "topicId": "math_j_t14",
          "sortOrder": 4
        },
        {
          "id": "math_j_t14_s2_2",
          "parentId": "math_j_t14_s2",
          "level": 2,
          "name": "การสะท้อนข้ามเส้นสะท้อน (แกน X, แกน Y, เส้นตรง $y = x$, เส้นตรง $y = -x$)",
          "difficulty": "intermediate",
          "description": "ระยะห่างจากจุดถึงเส้นสะท้อนเท่ากัน และเทคนิคสลับพิกัด $(x, y) \\leftrightarrow (y, x)$",
          "topicId": "math_j_t14",
          "sortOrder": 5
        },
        {
          "id": "math_j_t14_s2_3",
          "parentId": "math_j_t14_s2",
          "level": 3,
          "name": "การหมุนรอบจุดกำเนิด (Rotation $90^\\circ, 180^\\circ, 270^\\circ$ ทวน/ตามเข็ม)",
          "difficulty": "advanced",
          "description": "สูตรพิกัดการหมุน $90^\\circ$ ทวนเข็ม: $(x, y) \\to (-y, x)$, หมุน $180^\\circ$: $(-x, -y)$",
          "topicId": "math_j_t14",
          "sortOrder": 6
        },
        {
          "id": "math_j_t14_s3",
          "level": 1,
          "name": "14.3 มิติสัมพันธ์และการมองภาพสามมิติ (สสวท. ม.1 เล่ม 1)",
          "difficulty": "intermediate",
          "description": "ภาพหน้าตัด (Cross-section) และการมองภาพสามมิติจากมุมมองต่าง ๆ",
          "topicId": "math_j_t14",
          "sortOrder": 7
        },
        {
          "id": "math_j_t14_s3_1",
          "parentId": "math_j_t14_s3",
          "level": 2,
          "name": "ภาพหน้าตัดของรูปเรขาคณิตสามมิติ (ระนาบตัดกรวย ทรงกระบอก ลูกบาศก์)",
          "difficulty": "intermediate",
          "description": "ภาคตัดขวางรูปวงกลม วงรี พาราโบลา สามเหลี่ยม และหกเหลี่ยม",
          "topicId": "math_j_t14",
          "sortOrder": 8
        },
        {
          "id": "math_j_t14_s3_2",
          "parentId": "math_j_t14_s3",
          "level": 2,
          "name": "การมองภาพด้านหน้า (Front), ด้านข้าง (Side) และด้านบน (Top View)",
          "difficulty": "intermediate",
          "description": "การเขียนและการอ่านภาพฉายสองมิติจากโมเดลลูกบาศก์สามมิติ",
          "topicId": "math_j_t14",
          "sortOrder": 9
        },
        {
          "id": "math_j_t14_s3_3",
          "parentId": "math_j_t14_s3_2",
          "level": 4,
          "name": "K-Tips: เทคนิคเขียนตัวเลขกำกับชั้นลูกบาศก์ (Cube Stacking) ตอบถูก 100%",
          "difficulty": "advanced",
          "description": "วิธีวิเคราะห์จำนวนลูกบาศก์มากที่สุด/น้อยที่สุดที่เป็นไปได้จากภาพ 3 ด้าน",
          "topicId": "math_j_t14",
          "sortOrder": 10
        }
      ]
    },
    {
      "id": "math_j_t15",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 15: อัตราส่วนตรีโกณมิติประยุกต์",
      "nameEn": "Applied Trigonometry",
      "sortOrder": 15,
      "subtopics": [
        {
          "id": "math_j_t15_s1",
          "level": 1,
          "name": "15.1 อัตราส่วนตรีโกณมิติของมุมแหลม (สสวท. ม.3 เล่ม 2)",
          "difficulty": "basic",
          "description": "$\\sin = \\frac{\\text{ข้าม}}{\\text{ฉาก}}$, $\\cos = \\frac{\\text{ชิด}}{\\text{ฉาก}}$, $\\tan = \\frac{\\text{ข้าม}}{\\text{ชิด}}$, $\\operatorname{cosec}, \\sec, \\cot$",
          "topicId": "math_j_t15",
          "sortOrder": 1
        },
        {
          "id": "math_j_t15_s1_1",
          "parentId": "math_j_t15_s1",
          "level": 2,
          "name": "ค่าตรีโกณมิติของมุมมาตรฐาน ($30^\\circ, 45^\\circ, 60^\\circ$) & โคฟังก์ชัน (Cofunction)",
          "difficulty": "basic",
          "description": "ตารางค่าตรีโกณมิติ และความสัมพันธ์ $\\sin(90^\\circ - A) = \\cos A$, $\\tan(90^\\circ - A) = \\cot A$",
          "topicId": "math_j_t15",
          "sortOrder": 2
        },
        {
          "id": "math_j_t15_s1_2",
          "parentId": "math_j_t15_s1",
          "level": 2,
          "name": "เอกลักษณ์ตรีโกณมิติพื้นฐาน ($\\sin^2\\theta + \\cos^2\\theta = 1, 1 + \\tan^2\\theta = \\sec^2\\theta$)",
          "difficulty": "intermediate",
          "description": "การจัดรูปพีชคณิตตรีโกณมิติและการแก้สมการตรีโกณมิติอย่างง่าย",
          "topicId": "math_j_t15",
          "sortOrder": 3
        },
        {
          "id": "math_j_t15_s2",
          "level": 1,
          "name": "15.2 การนำตรีโกณมิติไปใช้ในชีวิตจริง (มุมก้มและมุมเงย)",
          "difficulty": "intermediate",
          "description": "Angle of Elevation, Angle of Depression และการวัดระยะทางที่ไม่สามารถเข้าถึงได้",
          "topicId": "math_j_t15",
          "sortOrder": 4
        },
        {
          "id": "math_j_t15_s2_1",
          "parentId": "math_j_t15_s2",
          "level": 2,
          "name": "โจทย์มุมเงยสองจุดสังเกต (Double Angle of Elevation)",
          "difficulty": "intermediate",
          "description": "การเดินเข้าหาตึกแล้วมุมเงยเปลี่ยนจาก $30^\\circ$ เป็น $60^\\circ$ พร้อมสูตรลัด $h = \\frac{d}{\\cot 30^\\circ - \\cot 60^\\circ}$",
          "topicId": "math_j_t15",
          "sortOrder": 5
        },
        {
          "id": "math_j_t15_s3",
          "level": 1,
          "name": "15.3 กฎของไซน์และโคไซน์ในข้อสอบคัดเลือกเข้า ม.4 (Law of Sines & Cosines)",
          "difficulty": "advanced",
          "description": "การแก้รูปสามเหลี่ยมใด ๆ ที่ไม่ใช่มุมฉาก",
          "topicId": "math_j_t15",
          "sortOrder": 6
        },
        {
          "id": "math_j_t15_s3_1",
          "parentId": "math_j_t15_s3",
          "level": 3,
          "name": "กฎของไซน์ (Law of Sines: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$)",
          "difficulty": "advanced",
          "description": "การเชื่อมโยงกฎของไซน์กับรัศมีวงกลมล้อมรอบรูปสามเหลี่ยม $R$",
          "topicId": "math_j_t15",
          "sortOrder": 7
        },
        {
          "id": "math_j_t15_s3_2",
          "parentId": "math_j_t15_s3",
          "level": 3,
          "name": "กฎของโคไซน์ (Law of Cosines: $c^2 = a^2 + b^2 - 2ab \\cos C$)",
          "difficulty": "advanced",
          "description": "การหาความยาวด้านที่สามเมื่อทราบสองด้านและมุมระหว่างด้านทั้งสอง",
          "topicId": "math_j_t15",
          "sortOrder": 8
        },
        {
          "id": "math_j_t15_s3_3",
          "parentId": "math_j_t15_s3_2",
          "level": 4,
          "name": "K-Tips: สูตรพื้นที่สามเหลี่ยม $\\text{Area} = \\frac{1}{2}ab \\sin C$ & สูตรผลบวกมุม $\\sin(A \\pm B)$",
          "difficulty": "advanced",
          "description": "เทคนิคคำนวณพื้นที่หลายเหลี่ยมโดยไม่ต้องหาความสูงตรงในข้อสอบแข่งขัน",
          "topicId": "math_j_t15",
          "sortOrder": 9
        }
      ]
    },
    {
      "id": "math_j_t16",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 16: สถิติเชิงวิเคราะห์และแผนภาพกล่อง",
      "nameEn": "Statistics & Box Plots",
      "sortOrder": 16,
      "subtopics": [
        {
          "id": "math_j_t16_s1",
          "level": 1,
          "name": "16.1 การนำเสนอข้อมูลและแผนภาพสถิติ (สสวท. ม.1 & ม.2)",
          "difficulty": "basic",
          "description": "คำถามทางสถิติ แผนภาพจุด (Dot Plot) แผนภาพต้น-ใบ (Stem-and-Leaf) ฮิสโทแกรม",
          "topicId": "math_j_t16",
          "sortOrder": 1
        },
        {
          "id": "math_j_t16_s1_1",
          "parentId": "math_j_t16_s1",
          "level": 2,
          "name": "การอ่านและแปลความหมายจากแผนภาพจุดและแผนภาพต้น-ใบ",
          "difficulty": "basic",
          "description": "การหาข้อมูลต่ำสุด สูงสุด และการกระจายตัวของข้อมูล",
          "topicId": "math_j_t16",
          "sortOrder": 2
        },
        {
          "id": "math_j_t16_s2",
          "level": 1,
          "name": "16.2 ค่ากลางของข้อมูล (Measures of Central Tendency)",
          "difficulty": "basic",
          "description": "ค่าเฉลี่ยเลขคณิต (Mean $\\bar{x} = \\frac{\\sum x}{n}$), มัธยฐาน (Median), ฐานนิยม (Mode)",
          "topicId": "math_j_t16",
          "sortOrder": 3
        },
        {
          "id": "math_j_t16_s2_1",
          "parentId": "math_j_t16_s2",
          "level": 2,
          "name": "ค่าเฉลี่ยเลขคณิตถ่วงน้ำหนัก (Weighted Mean) และค่าเฉลี่ยของข้อมูลรวม",
          "difficulty": "intermediate",
          "description": "สูตร $\\bar{x}_{\\text{comb}} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}$ สำหรับคำนวณเกรดเฉลี่ย/คะแนนสองห้อง",
          "topicId": "math_j_t16",
          "sortOrder": 4
        },
        {
          "id": "math_j_t16_s2_2",
          "parentId": "math_j_t16_s2",
          "level": 3,
          "name": "ผลกระทบต่อค่ากลางและการกระจายเมื่อบวกหรือคูณค่าคงที่ $k$ เข้ากับข้อมูลทุกตัว",
          "difficulty": "intermediate",
          "description": "การบวก $k$ ส่งผลให้ค่ากลางเพิ่มขึ้น $k$ แต่การกระจายคงเดิม, การคูณ $k$ ส่งผลให้ค่ากลางและการกระจายคูณด้วย $|k|$",
          "topicId": "math_j_t16",
          "sortOrder": 5
        },
        {
          "id": "math_j_t16_s3",
          "level": 1,
          "name": "16.3 แผนภาพกล่องและการวัดตำแหน่งข้อมูล (สสวท. ม.3 เล่ม 1)",
          "difficulty": "intermediate",
          "description": "แผนภาพกล่อง (Box Plot) ควอร์ไทล์ $Q_1, Q_2, Q_3$ และการวิเคราะห์การกระจาย",
          "topicId": "math_j_t16",
          "sortOrder": 6
        },
        {
          "id": "math_j_t16_s3_1",
          "parentId": "math_j_t16_s3",
          "level": 2,
          "name": "การหาตำแหน่งควอร์ไทล์ $Q_1, Q_2, Q_3$ และพิสัยระหว่างควอร์ไทล์ ($IQR = Q_3 - Q_1$)",
          "difficulty": "intermediate",
          "description": "ขั้นตอนการเรียงข้อมูล การแบ่งครึ่งหา $Q_1$ และ $Q_3$ ตามเกณฑ์ สสวท. ปรับปรุง 2560",
          "topicId": "math_j_t16",
          "sortOrder": 7
        },
        {
          "id": "math_j_t16_s3_2",
          "parentId": "math_j_t16_s3",
          "level": 3,
          "name": "เกณฑ์การระบุค่าผิดปกติ (Outliers: $x < Q_1 - 1.5\\cdot IQR$ หรือ $x > Q_3 + 1.5\\cdot IQR$)",
          "difficulty": "advanced",
          "description": "การคำนวณหาค่าขอบเขตและเขียนสัญลักษณ์ดอกจัน (*) แทนค่าผิดปกติ",
          "topicId": "math_j_t16",
          "sortOrder": 8
        },
        {
          "id": "math_j_t16_s3_3",
          "parentId": "math_j_t16_s3_2",
          "level": 4,
          "name": "K-Tips: การวิเคราะห์ลักษณะความเบ้ของข้อมูล (เบ้ซ้าย เบ้ขวา สมมาตร) ในข้อสอบคัดเลือก",
          "difficulty": "advanced",
          "description": "เปรียบเทียบ Mean vs Median vs Mode และความยาวของกล่อง/หนวดแมว",
          "topicId": "math_j_t16",
          "sortOrder": 9
        }
      ]
    },
    {
      "id": "math_j_t17",
      "subjectId": "MATH_JUNIOR_FUNDENMENTAL_01",
      "name": "บทที่ 17: ความน่าจะเป็นและคอมบินาทอริกส์",
      "nameEn": "Probability & Combinatorics",
      "sortOrder": 17,
      "subtopics": [
        {
          "id": "math_j_t17_s1",
          "level": 1,
          "name": "17.1 กฎการนับเบื้องต้นและการทดลองสุ่ม (สสวท. ม.3 เล่ม 2)",
          "difficulty": "basic",
          "description": "กฎการบวก กฎการคูณ การทดลองสุ่ม แซมเปิลสเปซ ($S$) และเหตุการณ์ ($E$)",
          "topicId": "math_j_t17",
          "sortOrder": 1
        },
        {
          "id": "math_j_t17_s1_1",
          "parentId": "math_j_t17_s1",
          "level": 2,
          "name": "ความน่าจะเป็นของเหตุการณ์ $P(E) = \\frac{n(E)}{n(S)}$",
          "difficulty": "basic",
          "description": "สมบัติ $0 \\le P(E) \\le 1, P(S) = 1, P(\\emptyset) = 0$ และเหตุการณ์คู่ตรงข้าม $P(E') = 1 - P(E)$",
          "topicId": "math_j_t17",
          "sortOrder": 2
        },
        {
          "id": "math_j_t17_s1_2",
          "parentId": "math_j_t17_s1",
          "level": 2,
          "name": "โจทย์ทอยลูกเต๋า โยนเหรียญ หยิบไพ่ และหยิบลูกบอลสี",
          "difficulty": "intermediate",
          "description": "การหยิบแบบใส่คืน vs ไม่ใส่คืน และการใช้แผนภาพต้นไม้ช่วยนับ",
          "topicId": "math_j_t17",
          "sortOrder": 3
        },
        {
          "id": "math_j_t17_s2",
          "level": 1,
          "name": "17.2 วิธีเรียงสับเปลี่ยนและการจัดหมู่ (Permutations & Combinations)",
          "difficulty": "advanced",
          "description": "ก้าวข้ามแผนภาพต้นไม้สู่การใช้แฟกทอเรียล $n!$, สูตร $P(n, r)$ และ $C(n, r)$",
          "topicId": "math_j_t17",
          "sortOrder": 4
        },
        {
          "id": "math_j_t17_s2_1",
          "parentId": "math_j_t17_s2",
          "level": 2,
          "name": "วิธีเรียงสับเปลี่ยนเชิงเส้น $P(n, r) = \\frac{n!}{(n - r)!}$",
          "difficulty": "intermediate",
          "description": "การจัดคนเข้าแถว การสร้างคำ การสร้างจำนวนจากเลขโดด",
          "topicId": "math_j_t17",
          "sortOrder": 5
        },
        {
          "id": "math_j_t17_s2_2",
          "parentId": "math_j_t17_s2",
          "level": 3,
          "name": "วิธีจัดหมู่ $C(n, r) = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}$ และการเลือกสิ่งของ",
          "difficulty": "advanced",
          "description": "การเลือกคณะกรรมการ การจับคู่แข่งขัน และการสร้างรูปสามเหลี่ยมจากจุดบนระนาบ",
          "topicId": "math_j_t17",
          "sortOrder": 6
        },
        {
          "id": "math_j_t17_s2_3",
          "parentId": "math_j_t17_s2",
          "level": 3,
          "name": "เทคนิคมัดติดกัน (Tie Together) และเทคนิคเสียบช่องว่าง (Slot Insertion)",
          "difficulty": "advanced",
          "description": "แก้โจทย์ \"ต้องอยู่ติดกันเสมอ\" (จับมัดเป็น 1 ก้อน) และ \"ห้ามอยู่ติดกัน\" (เอาตัวอื่นลงก่อนแล้วเสียบช่อง)",
          "topicId": "math_j_t17",
          "sortOrder": 7
        },
        {
          "id": "math_j_t17_s3",
          "level": 1,
          "name": "17.3 คอมบินาทอริกส์ขั้นสูง & ทฤษฎีเกมสไตล์ MWIT และ สอวน.",
          "difficulty": "advanced",
          "description": "เทคนิคดาวและแท่ง (Stars and Bars), หลักการรังนกพิราบ, และแบบรูปการแข่งขัน",
          "topicId": "math_j_t17",
          "sortOrder": 8
        },
        {
          "id": "math_j_t17_s3_1",
          "parentId": "math_j_t17_s3",
          "level": 3,
          "name": "เทคนิคดาวและแท่ง (Stars and Bars: $\\binom{n + k - 1}{k - 1}$)",
          "difficulty": "advanced",
          "description": "การแจกของเหมือนกัน $n$ ชิ้น ให้คน $k$ คน โดยแต่ละคนอาจได้หรือไม่ได้รับ",
          "topicId": "math_j_t17",
          "sortOrder": 9
        },
        {
          "id": "math_j_t17_s3_2",
          "parentId": "math_j_t17_s3",
          "level": 3,
          "name": "หลักการรังนกพิราบ (Pigeonhole Principle)",
          "difficulty": "advanced",
          "description": "หากนำนก $n + 1$ ตัวใส่ในรัง $n$ รัง จะต้องมีอย่างน้อยหนึ่งรังที่มีนกตั้งแต่ 2 ตัวขึ้นไป",
          "topicId": "math_j_t17",
          "sortOrder": 10
        },
        {
          "id": "math_j_t17_s3_3",
          "parentId": "math_j_t17_s3_2",
          "level": 4,
          "name": "K-Tips: ทฤษฎีเกมเบื้องต้น (Game Theory: ตำแหน่งชนะ vs ตำแหน่งแพ้) & โจทย์ Unseen MWIT",
          "difficulty": "advanced",
          "description": "เทคนิคการวิเคราะห์ย้อนกลับ (Backward Induction) เพื่อหากลยุทธ์ชนะในการหยิบสิ่งของ",
          "topicId": "math_j_t17",
          "sortOrder": 11
        }
      ]
    }
  ]
};
