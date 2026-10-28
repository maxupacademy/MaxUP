import { Course } from '../types';

export const COURSE_PHYS_SENIOR: Course = {
  "id": "PHYS_SENIOR_FUNDAMENTAL_01",
  "name": "ฟิสิกส์ ม.ปลาย (สสวท. + A-Level / สอวน.)",
  "code": "PHYS_SENIOR_FUNDAMENTAL_01",
  "gradeLevel": "มัธยมศึกษาตอนปลาย (ม.4 – ม.6)",
  "description": "หลักสูตรฟิสิกส์ ม.ปลาย ฉบับสมบูรณ์ 20 บทเรียน โครงสร้าง 4 ระดับ (Level 1 - Level 4) ครอบคลุมตามหลักสูตร สสวท. (ม.4 – ม.6 ฉบับปรับปรุง พ.ศ. 2560) บูรณาการกลศาสตร์ คลื่น แสง เสียง ไฟฟ้า อุณหพลศาสตร์ และฟิสิกส์แผนใหม่ พร้อมเทคนิคคิดลัดและแนวข้อสอบ A-Level ฟิสิกส์ และ สอวน. ฟิสิกส์",
  "passcode": "PHYS401",
  "badgeColor": "#7C3AED",
  "topics": [
    {
      "id": "phys_s_t1",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 1: ธรรมชาติและพัฒนาการทางฟิสิกส์",
      "nameEn": "Physics Fundamentals & Measurement",
      "sortOrder": 1,
      "subtopics": [
        {
          "id": "phys_s_t1_s1",
          "topicId": "phys_s_t1",
          "level": 1,
          "name": "1.1 การวัด ระบบหน่วยเอสไอ และเลขนัยสำคัญ",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ปริมาณฐาน 7 ตัว หน่วยอนุพัทธ์ คำอุปสรรค ($n, \\mu, m, k, M, G$) กฎการนับเลขนัยสำคัญและการบวก ลบ คูณ หาร"
        },
        {
          "id": "phys_s_t1_s1_1",
          "topicId": "phys_s_t1",
          "parentId": "phys_s_t1_s1",
          "level": 2,
          "name": "เครื่องมือวัดความละเอียดสูง: เวอร์เนียร์แคลิปเปอร์และไมโครมิเตอร์",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "หลักการอ่านสเกลหลักและสเกลเวอร์เนียร์ การหาค่าความละเอียด และการคิดค่า Zero Error (บวกหรือลบ)"
        },
        {
          "id": "phys_s_t1_s1_2",
          "topicId": "phys_s_t1",
          "parentId": "phys_s_t1_s1",
          "level": 3,
          "name": "การวิเคราะห์ความคลาดเคลื่อน (Uncertainty Analysis) และการพลอตกราฟ",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ความคลาดเคลื่อนสัมบูรณ์ $\\Delta x$, ความคลาดเคลื่อนสัมพัทธ์ $\\frac{\\Delta x}{x}$, กฎการรวมความคลาดเคลื่อน และความชันกราฟ (Slope)"
        },
        {
          "id": "phys_s_t1_s1_3",
          "topicId": "phys_s_t1",
          "parentId": "phys_s_t1_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การวิเคราะห์มิติ (Dimensional Analysis) ตรวจสอบความถูกต้องของสูตร",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "การแทนมิติมวล $[M]$, ความยาว $[L]$, เวลา $[T]$ เพื่อหาตัวแปรเลขชี้กำลังและทดสอบสูตรฟิสิกส์แปลก ๆ ในข้อสอบ"
        }
      ]
    },
    {
      "id": "phys_s_t2",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 2: การเคลื่อนที่แนวตรง (Kinematics in One Dimension)",
      "nameEn": "Linear Motion & Free Fall",
      "sortOrder": 2,
      "subtopics": [
        {
          "id": "phys_s_t2_s1",
          "topicId": "phys_s_t2",
          "level": 1,
          "name": "2.1 ปริมาณการเคลื่อนที่และกราฟการเคลื่อนที่ ($s-t, v-t, a-t$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ตำแหน่ง ระยะทาง การกระจัด อัตราเร็ว ความเร็ว ความเร่ง และการแปลความชัน/พื้นที่ใต้กราฟ"
        },
        {
          "id": "phys_s_t2_s1_1",
          "topicId": "phys_s_t2",
          "parentId": "phys_s_t2_s1",
          "level": 2,
          "name": "5 สมการการเคลื่อนที่แนวตรงด้วยความเร่งคงตัว ($a = \\text{const}$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "$v = u + at$, $s = \\frac{u+v}{2}t$, $s = ut + \\frac{1}{2}at^2$, $s = vt - \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$ กำหนดทิศเวกเตอร์ตาม $u$"
        },
        {
          "id": "phys_s_t2_s1_2",
          "topicId": "phys_s_t2",
          "parentId": "phys_s_t2_s1",
          "level": 3,
          "name": "การเคลื่อนที่แนวดิ่งอิสระภายใต้แรงโน้มถ่วง (Free Fall: $g = 9.8\\text{ m/s}^2$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การโยนวัตถุขึ้น จุดสูงสุด $v=0$, ความสมมาตรเวลาขาขึ้น-ขาลง, ความเร็วขาขึ้นเท่ากับขาลงที่ระดับเดียวกัน"
        },
        {
          "id": "phys_s_t2_s1_3",
          "topicId": "phys_s_t2",
          "parentId": "phys_s_t2_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: โจทย์รถไล่กวด วัตถุสวนทาง และระยะกระจัดในวินาทีที่ $n$ ($s_n = u + \\frac{a}{2}(2n-1)$)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "เทคนิควาดกราฟ $v-t$ เพื่อแก้โจทย์ 2 วัตถุที่ซับซ้อนในบรรทัดเดียวโดยไม่ต้องตั้งสมการ 2 ตัวแปร"
        }
      ]
    },
    {
      "id": "phys_s_t3",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 3: แรงและกฎการเคลื่อนที่ (Forces and Newton's Laws)",
      "nameEn": "Newton's Laws & Friction",
      "sortOrder": 3,
      "subtopics": [
        {
          "id": "phys_s_t3_s1",
          "topicId": "phys_s_t3",
          "level": 1,
          "name": "3.1 เวกเตอร์ของแรงและการรวมแรง (Free Body Diagram: FBD)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การแตกแรงเข้าแกน $X, Y$, แรงตั้งฉาก ($N$), แรงตึงเชือก ($T$), และการเขียน FBD แยกก้อนวัตถุ"
        },
        {
          "id": "phys_s_t3_s1_1",
          "topicId": "phys_s_t3",
          "parentId": "phys_s_t3_s1",
          "level": 2,
          "name": "3 กฎการเคลื่อนที่ของนิวตัน (Newton's Laws of Motion)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "กฎข้อที่ 1 (ความเฉื่อย: $\\sum F = 0$), กฎข้อที่ 2 (ความเร่ง: $\\sum F = ma$), กฎข้อที่ 3 (กิริยา-ปฏิกิริยา: Action = Reaction)"
        },
        {
          "id": "phys_s_t3_s1_2",
          "topicId": "phys_s_t3",
          "parentId": "phys_s_t3_s1",
          "level": 2,
          "name": "แรงเสียดทานสถิต ($f_s$) และแรงเสียดทานจลน์ ($f_k$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$f_s \\le \\mu_s N$, $f_{s,\\max} = \\mu_s N$, $f_k = \\mu_k N$, และกราฟความสัมพันธ์แรงดึงกับแรงเสียดทาน"
        },
        {
          "id": "phys_s_t3_s1_3",
          "topicId": "phys_s_t3",
          "parentId": "phys_s_t3_s1",
          "level": 3,
          "name": "ระบบมวลหลายก้อน ลิฟต์ และพื้นเอียง (Multi-mass Systems & Inclines)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การมองระบบรวมคิดความเร่ง $a = \\frac{\\sum F_{\\text{ext}}}{\\sum m}$ แล้วตัดระบบย่อยหาแรงตึงเชือก $T$"
        },
        {
          "id": "phys_s_t3_s1_4",
          "topicId": "phys_s_t3",
          "parentId": "phys_s_t3_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: แรงเทียมในกรอบอ้างอิงไม่เฉื่อย (Fictitious/Inertial Force: $F = -ma$)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "เทคนิคแก้โจทย์ลูกตุ้มในรถเลี้ยวโค้งหรือกล่องในลิฟต์เร่งโดยมองจากผู้สังเกตภายในกรอบความเร่ง"
        }
      ]
    },
    {
      "id": "phys_s_t4",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 4: สมดุลกล (Mechanical Equilibrium)",
      "nameEn": "Statics, Torque & Center of Gravity",
      "sortOrder": 4,
      "subtopics": [
        {
          "id": "phys_s_t4_s1",
          "topicId": "phys_s_t4",
          "level": 1,
          "name": "4.1 สมดุลต่อการเลื่อนที่ ($\\sum F = 0$) และทฤษฎีบทลามี (Lami's Theorem)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "สมดุลของแรง 3 แรงพบกันที่จุดเดียว สามเหลี่ยมแทนแรง และสูตรลามี $\\frac{F_1}{\\sin \\alpha} = \\frac{F_2}{\\sin \\beta} = \\frac{F_3}{\\sin \\gamma}$"
        },
        {
          "id": "phys_s_t4_s1_1",
          "topicId": "phys_s_t4",
          "parentId": "phys_s_t4_s1",
          "level": 2,
          "name": "โมเมนต์ของแรงหรือทอร์ก ($\\sum M = 0$) และโมเมนต์ของแรงคู่ควบ",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "$M = F \\cdot d_\\perp$, โมเมนต์ตาม = โมเมนต์ทวน, โมเมนต์แรงคู่ควบ $M_c = F \\cdot d$, คานและบันไดพาดกำแพง"
        },
        {
          "id": "phys_s_t4_s1_2",
          "topicId": "phys_s_t4",
          "parentId": "phys_s_t4_s1",
          "level": 3,
          "name": "ศูนย์กลางมวล (CM) ศูนย์ถ่วง (CG) และการล้ม/ไถลของวัตถุบนพื้นเอียง",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$x_{\\text{cm}} = \\frac{\\sum m_i x_i}{\\sum m_i}$, เงื่อนไขวัตถุเริ่มล้ม (เส้นแนวศูนย์ถ่วงหลุดพ้นขอบฐาน) vs เริ่มไถล ($f = \\mu N$)"
        },
        {
          "id": "phys_s_t4_s1_3",
          "topicId": "phys_s_t4",
          "parentId": "phys_s_t4_s1",
          "level": 4,
          "name": "เทคนิค: จุดหมุนมหัศจรรย์ (เลือกจุดหมุนที่ผ่านแรงที่ไม่รู้ค่ามากที่สุด)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "เทคนิคแก้โจทย์คานและบันได 1 บรรทัดโดยเลือกจุดหมุนกำจัดตัวแปร $N$ หรือแรงเสียดทานที่พื้น"
        }
      ]
    },
    {
      "id": "phys_s_t5",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 5: งานและพลังงาน (Work and Energy)",
      "nameEn": "Work, Energy & Conservation Laws",
      "sortOrder": 5,
      "subtopics": [
        {
          "id": "phys_s_t5_s1",
          "topicId": "phys_s_t5",
          "level": 1,
          "name": "5.1 งานจากแรงคงตัว งานจากแรงไม่คงตัว และกำลัง ($P$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "$W = \\vec{F} \\cdot \\vec{s} = F s \\cos \\theta$, พื้นที่ใต้กราฟ $F-s$, กำลังเฉลี่ย $P = \\frac{W}{t} = \\vec{F} \\cdot \\vec{v}$ หน่วยวัตต์ ($W$)"
        },
        {
          "id": "phys_s_t5_s1_1",
          "topicId": "phys_s_t5",
          "parentId": "phys_s_t5_s1",
          "level": 2,
          "name": "พลังงานจลน์ พลังงานศักย์โน้มถ่วง และพลังงานศักย์ยืดหยุ่น",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "$E_k = \\frac{1}{2}mv^2$, $E_p = mgh$, พลังงานศักย์สปริง $E_{ps} = \\frac{1}{2}kx^2$ ตามกฎของฮุก ($F = -kx$)"
        },
        {
          "id": "phys_s_t5_s1_2",
          "topicId": "phys_s_t5",
          "parentId": "phys_s_t5_s2",
          "level": 3,
          "name": "ทฤษฎีบทงาน-พลังงานจลน์ ($W_{\\text{net}} = \\Delta E_k$) และกฎการอนุรักษ์พลังงานกล",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$E_1 + W_{\\text{other}} = E_2$, การเคลื่อนที่ผ่านแรงเสียดทาน งานแรงต้าน $W_f = -f s$"
        },
        {
          "id": "phys_s_t5_s1_3",
          "topicId": "phys_s_t5",
          "parentId": "phys_s_t5_s2",
          "level": 3,
          "name": "เครื่องกลอย่างง่ายและประสิทธิภาพของเครื่องกล (Mechanical Advantage & Efficiency)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การได้เปรียบเชิงกล $MA = \\frac{W}{E}$, ประสิทธิภาพ $\\text{Eff} = \\frac{W_{\\text{out}}}{W_{\\text{in}}} \\times 100\\%$, คาน รอก ลิ่ม รอกพวง"
        },
        {
          "id": "phys_s_t5_s1_4",
          "topicId": "phys_s_t5",
          "parentId": "phys_s_t5_s2",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การแกว่งลูกตุ้มหลุดจากรางโค้งวงกลม และความเร็วหลุดต่ำสุด",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "เงื่อนไขแรงปฏิกิริยาตั้งฉาก $N=0$ นำสู่อนุรักษ์พลังงานหาจุดที่วัตถุเหวี่ยงหลุดจากผิวนอกทรงกลม"
        }
      ]
    },
    {
      "id": "phys_s_t6",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 6: โมเมนตัมและการชน (Momentum and Collisions)",
      "nameEn": "Linear Momentum, Impulse & Collisions",
      "sortOrder": 6,
      "subtopics": [
        {
          "id": "phys_s_t6_s1",
          "topicId": "phys_s_t6",
          "level": 1,
          "name": "6.1 โมเมนตัม ($\\vec{p} = m\\vec{v}$) และแรงดล-การดล ($\\vec{I} = \\Delta \\vec{p}$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "โมเมนตัมเป็นปริมาณเวกเตอร์, การดล $\\vec{I} = \\vec{F} \\Delta t = m\\vec{v} - m\\vec{u}$, พื้นที่ใต้กราฟ $F-t$"
        },
        {
          "id": "phys_s_t6_s1_1",
          "topicId": "phys_s_t6",
          "parentId": "phys_s_t6_s1",
          "level": 2,
          "name": "กฎการอนุรักษ์โมเมนตัมเชิงเส้น ($\\sum \\vec{p}_{\\text{ก่อน}} = \\sum \\vec{p}_{\\text{หลัง}}$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "เงื่อนไขไม่มีแรงภายนอกกระทำ $\\sum \\vec{F}_{\\text{ext}} = 0$, การระเบิดแตกเป็นชิ้นส่วน, ปืนถอยหลัง (Recoil)"
        },
        {
          "id": "phys_s_t6_s1_2",
          "topicId": "phys_s_t6",
          "parentId": "phys_s_t6_s1",
          "level": 3,
          "name": "การชนแบบยืดหยุ่นสมบูรณ์ vs การชนแบบไม่ยืดหยุ่น (Elastic vs Inelastic Collisions)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การชนยืดหยุ่น: อนุรักษ์โมเมนตัมและพลังงานจลน์ สูตรลัด $u_1 + v_1 = u_2 + v_2$, การชนไม่ยืดหยุ่นสูญเสียพลังงานจลน์ (ชนแล้วติดกันไป)"
        },
        {
          "id": "phys_s_t6_s1_3",
          "topicId": "phys_s_t6",
          "parentId": "phys_s_t6_s1",
          "level": 3,
          "name": "การชนใน 2 มิติ และสัมประสิทธิ์การคืนสภาพ (Coefficient of Restitution: $e$)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การแยกคิดตามแกน $X$ และ $Y$, นิยาม $e = \\frac{v_2 - v_1}{u_1 - u_2}$ ($e=1$ ยืดหยุ่นสมบูรณ์, $e=0$ ติดกันไป)"
        },
        {
          "id": "phys_s_t6_s1_4",
          "topicId": "phys_s_t6",
          "parentId": "phys_s_t6_s1",
          "level": 4,
          "name": "เทคนิค: บาลิสติกเพนดูลัม (Ballistic Pendulum) และการชนยืดหยุ่นของมวลเท่ากันแลกเปลี่ยนความเร็ว",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "สูตรสรุปรวดเร็ว: มวลเท่ากันชนยืดหยุ่นจะแลกเปลี่ยนความเร็วกันทันที $v_1 = u_2, v_2 = u_1$"
        }
      ]
    },
    {
      "id": "phys_s_t7",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 7: การเคลื่อนที่แนวโค้ง (Curvilinear Motion: Projectile & Circular)",
      "nameEn": "Projectile Motion & Circular Dynamics",
      "sortOrder": 7,
      "subtopics": [
        {
          "id": "phys_s_t7_s1",
          "topicId": "phys_s_t7",
          "level": 1,
          "name": "7.1 การเคลื่อนที่แบบโพรเจกไทล์ (Projectile Motion)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การเคลื่อนที่ 2 มิติอิสระต่อกัน: แกนราบความเร็วคงที่ ($s_x = u_x t$), แกนดิ่งความเร่งคงที่ ($g$)"
        },
        {
          "id": "phys_s_t7_s1_1",
          "topicId": "phys_s_t7",
          "parentId": "phys_s_t7_s1",
          "level": 2,
          "name": "สูตรสำเร็จโพรเจกไทล์บนพื้นระดับ ($R = \\frac{u^2 \\sin 2\\theta}{g}, H = \\frac{u^2 \\sin^2 \\theta}{2g}$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "มุมยิงที่ไปได้ไกลสุดคือ $\\theta = 45^\\circ$, มุมที่รวมกันได้ $90^\\circ$ ได้ระยะตกไกล $R$ เท่ากัน, เวลาทั้งหมด $T = \\frac{2u\\sin\\theta}{g}$"
        },
        {
          "id": "phys_s_t7_s2",
          "topicId": "phys_s_t7",
          "level": 1,
          "name": "7.2 การเคลื่อนที่แบบวงกลมสม่ำเสมอ (Uniform Circular Motion)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "คาบ ($T$), ความถี่ ($f$), อัตราเร็วเชิงเส้น ($v = \\omega r$), อัตราเร็วเชิงมุม ($\\omega = \\frac{2\\pi}{T}$), ความเร่งสู่ศูนย์กลาง $a_c = \\frac{v^2}{r} = \\omega^2 r$"
        },
        {
          "id": "phys_s_t7_s2_1",
          "topicId": "phys_s_t7",
          "parentId": "phys_s_t7_s2",
          "level": 3,
          "name": "แรงสู่ศูนย์กลาง ($F_c = \\frac{mv^2}{r}$) และการประยุกต์",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "รถเลี้ยวโค้งบนถนนราบ ($f_s = \\frac{mv^2}{r} \\implies v_{\\max} = \\sqrt{\\mu g r}$), รถเลี้ยวโค้งบนถนนเอียงทำมุม $\\theta$ ($\\tan \\theta = \\frac{v^2}{rg}$)"
        },
        {
          "id": "phys_s_t7_s2_2",
          "topicId": "phys_s_t7",
          "parentId": "phys_s_t7_s2",
          "level": 3,
          "name": "การเคลื่อนที่วงกลมในแนวดิ่ง และดาวเทียมโคจร",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "จุดสูงสุด $T_{\\text{top}} = \\frac{mv^2}{r} - mg$, จุดต่ำสุด $T_{\\text{bot}} = \\frac{mv^2}{r} + mg$, อัตราเร็วโคจรดาวเทียม $v = \\sqrt{\\frac{GM}{r}}$"
        },
        {
          "id": "phys_s_t7_s2_3",
          "topicId": "phys_s_t7",
          "parentId": "phys_s_t7_s2",
          "level": 4,
          "name": "เทคนิค: สูตรสัมพันธ์โพรเจกไทล์ $\\tan \\theta = \\frac{4H}{R}$ คิดลัดใน 5 วินาที",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "เทคนิคหาอัตราส่วนจุดสูงสุดต่อระยะทางไกลโดยไม่ต้องแก้สมการเวลา"
        }
      ]
    },
    {
      "id": "phys_s_t8",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 8: การเคลื่อนที่แบบฮาร์มอนิกอย่างง่าย (Simple Harmonic Motion: SHM)",
      "nameEn": "SHM, Oscillations & Resonance",
      "sortOrder": 8,
      "subtopics": [
        {
          "id": "phys_s_t8_s1",
          "topicId": "phys_s_t8",
          "level": 1,
          "name": "8.1 นิยามและสมการของการเคลื่อนที่แบบ SHM",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การกระจัด $x = A\\sin(\\omega t + \\phi)$, ความเร็ว $v = \\omega \\sqrt{A^2 - x^2}$, ความเร่ง $a = -\\omega^2 x$, จุดสมดุล $v_{\\max} = \\omega A$, จุดปลาย $a_{\\max} = \\omega^2 A$"
        },
        {
          "id": "phys_s_t8_s1_1",
          "topicId": "phys_s_t8",
          "parentId": "phys_s_t8_s1",
          "level": 2,
          "name": "ระบบมวลติดปลายสปริง (Mass on Spring: $T = 2\\pi \\sqrt{\\frac{m}{k}}$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "สปริงในแนวราบและแนวดิ่ง คาบไม่ขึ้นกับแอมพลิจูด, การต่อสปริงแบบอนุกรม ($\\frac{1}{k_s} = \\frac{1}{k_1} + \\frac{1}{k_2}$) และแบบขนาน ($k_p = k_1 + k_2$)"
        },
        {
          "id": "phys_s_t8_s1_2",
          "topicId": "phys_s_t8",
          "parentId": "phys_s_t8_s1",
          "level": 2,
          "name": "ลูกตุ้มนาฬิกาอย่างง่าย (Simple Pendulum: $T = 2\\pi \\sqrt{\\frac{L}{g}}$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "การแกว่งมุมแคบ ($le 10^\\circ$), คาบแปรผันตรงกับ $\\sqrt{L}$ และแปรผกผันกับ $\\sqrt{g}$ ไม่ขึ้นกับมวลของลูกตุ้ม"
        },
        {
          "id": "phys_s_t8_s1_3",
          "topicId": "phys_s_t8",
          "parentId": "phys_s_t8_s1",
          "level": 3,
          "name": "พลังงานในการสั่น SHM และการสั่นพ้อง (Resonance)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "พลังงานรวมคงตัว $E = \\frac{1}{2}kA^2 = \\frac{1}{2}mv_{\\max}^2$, การสั่นถูกบังคับ, ความถี่ธรรมชาติ และการเกิดการสั่นพ้องแอมพลิจูดสูงสุด"
        },
        {
          "id": "phys_s_t8_s1_4",
          "topicId": "phys_s_t8",
          "parentId": "phys_s_t8_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: เทคนิคใช้วงกลมอ้างอิง (Reference Circle) คำนวณเวลาการเคลื่อนที่ระหว่างสองตำแหน่ง",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "การฉายเงาการเคลื่อนที่วงกลมลงบนแกนเพื่อหาเวลาเดินทางจาก $x = 0$ ไป $x = \\frac{A}{2}$ เท่ากับ $\\frac{T}{12}$ ไม่ใช่ $\\frac{T}{8}$"
        }
      ]
    },
    {
      "id": "phys_s_t9",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 9: คลื่น (Waves)",
      "nameEn": "Mechanical Waves & Wave Phenomena",
      "sortOrder": 9,
      "subtopics": [
        {
          "id": "phys_s_t9_s1",
          "topicId": "phys_s_t9",
          "level": 1,
          "name": "9.1 ธรรมชาติของคลื่น ชนิดคลื่น และสมการอัตราเร็ว ($v = f\\lambda$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "คลื่นกล vs คลื่นแม่เหล็กไฟฟ้า, คลื่นตามยาว vs คลื่นตามขวาง, เฟสตรงกัน/เฟสตรงข้าม, อัตราเร็วคลื่นในเส้นเชือก $v = \\sqrt{\\frac{T}{\\mu}}$"
        },
        {
          "id": "phys_s_t9_s1_1",
          "topicId": "phys_s_t9",
          "parentId": "phys_s_t9_s1",
          "level": 2,
          "name": "สมบัติการสะท้อน (Reflection) และการหักเห (Refraction) ของคลื่น",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "มุมตกกระทบ = มุมสะท้อน, ปลายตรึงแน่นกลับเฟส $180^\\circ$ vs ปลายอิสระเฟสเดิม, กฎของสเนลล์ $\\frac{\\sin \\theta_1}{\\sin \\theta_2} = \\frac{v_1}{v_2} = \\frac{\\lambda_1}{\\lambda_2}$"
        },
        {
          "id": "phys_s_t9_s1_2",
          "topicId": "phys_s_t9",
          "parentId": "phys_s_t9_s1",
          "level": 3,
          "name": "สมบัติการแทรกสอด (Interference: บัพ Node & ปฏิบัพ Antinode)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "แหล่งกำเนิดอาพันธ์เฟสตรงกัน: ปฏิบัพ $|S_1P - S_2P| = n\\lambda$, บัพ $|S_1P - S_2P| = (n - \\frac{1}{2})\\lambda$"
        },
        {
          "id": "phys_s_t9_s1_3",
          "topicId": "phys_s_t9",
          "parentId": "phys_s_t9_s1",
          "level": 3,
          "name": "สมบัติการเลี้ยวเบน (Diffraction) และหลักการของฮอยเกนส์",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "การอธิบายหน้าคลื่นใหม่, การเลี้ยวเบนผ่านช่องแคบเดี่ยว (สลิตเดี่ยว) ชัดเจนเมื่อความกว้างช่อง $d \\approx \\lambda$"
        },
        {
          "id": "phys_s_t9_s1_4",
          "topicId": "phys_s_t9",
          "parentId": "phys_s_t9_s1",
          "level": 4,
          "name": "เทคนิค: คลื่นนิ่ง (Standing Waves) และการนับจำนวนลูป $L = n \\frac{\\lambda}{2}$",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "ระยะระหว่างบัพถึงบัพที่ติดกันเท่ากับ $\\frac{\\lambda}{2}$, บัพถึงปฏิบัพที่ติดกันเท่ากับ $\\frac{\\lambda}{4}$"
        }
      ]
    },
    {
      "id": "phys_s_t10",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 10: แสงเชิงคลื่น (Wave Optics)",
      "nameEn": "Interference, Diffraction & Grating",
      "sortOrder": 10,
      "subtopics": [
        {
          "id": "phys_s_t10_s1",
          "topicId": "phys_s_t10",
          "level": 1,
          "name": "10.1 การแทรกสอดผ่านสลิตคู่ของยัง (Young's Double-Slit Experiment)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "แถบสว่าง $d\\sin\\theta = d\\frac{x}{L} = n\\lambda$, แถบมืด $d\\frac{x}{L} = (n-\\frac{1}{2})\\lambda$, ระยะห่างระหว่างแถบ $\\Delta x = \\frac{\\lambda L}{d}$"
        },
        {
          "id": "phys_s_t10_s1_1",
          "topicId": "phys_s_t10",
          "parentId": "phys_s_t10_s1",
          "level": 2,
          "name": "การเลี้ยวเบนของแสงผ่านสลิตเดี่ยว (Single-Slit Diffraction)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "แถบมืดของสลิตเดี่ยว $a\\sin\\theta = a\\frac{x}{L} = n\\lambda$, แถบสว่างกลางกว้างเป็น 2 เท่าของแถบสว่างข้างเคียง"
        },
        {
          "id": "phys_s_t10_s1_2",
          "topicId": "phys_s_t10",
          "parentId": "phys_s_t10_s1",
          "level": 3,
          "name": "เกรตติงเลี้ยวเบน (Diffraction Grating) และการวัดความยาวคลื่นแสง",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ระยะห่างระหว่างช่อง $d = \\frac{1}{N}\\text{ cm}$, แถบสว่างคมชัดสูงมากตามสูตร $d\\sin\\theta = n\\lambda$"
        },
        {
          "id": "phys_s_t10_s1_3",
          "topicId": "phys_s_t10",
          "parentId": "phys_s_t10_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การหาจำนวนแถบสว่างทั้งหมดที่เป็นไปได้ (ใส่ $\\sin\\theta \\le 1$)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "เทคนิคหา $n_{\\max} = \\lfloor \\frac{d}{\\lambda} \\rfloor$ แล้วนับจำนวนแถบรวม $= 2n_{\\max} + 1$"
        }
      ]
    },
    {
      "id": "phys_s_t11",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 11: แสงเชิงรังสี (Ray Optics)",
      "nameEn": "Geometric Optics, Mirrors, Lenses & Instruments",
      "sortOrder": 11,
      "subtopics": [
        {
          "id": "phys_s_t11_s1",
          "topicId": "phys_s_t11",
          "level": 1,
          "name": "11.1 การสะท้อนของแสง กระจกเงาราบ และกระจกโค้ง (เว้า/นูน)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "กระจกเว้า ($f > 0$) เกิดทั้งภาพจริงและภาพเสมือน, กระจกนูน ($f < 0$) เกิดเฉพาะภาพเสมือนขนาดเล็กกว่าวัตถุ, สูตรกระจก $\\frac{1}{f} = \\frac{1}{s} + \\frac{1}{s'}$"
        },
        {
          "id": "phys_s_t11_s1_1",
          "topicId": "phys_s_t11",
          "parentId": "phys_s_t11_s1",
          "level": 2,
          "name": "การหักเหของแสง ดรรชนีหักเห ($n$) มุมวิกฤต และการสะท้อนกลับหมด",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "กฎสเนลล์ $n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2$, มุมวิกฤต $\\sin \\theta_c = \\frac{n_2}{n_1}$ ($n_1 > n_2$), ความลึกจริง-ลึกปรากฏ $\\frac{d'}{d} = \\frac{n_2}{n_1}$"
        },
        {
          "id": "phys_s_t11_s1_2",
          "topicId": "phys_s_t11",
          "parentId": "phys_s_t11_s1",
          "level": 2,
          "name": "เลนส์บาง (เลนส์นูน/เลนส์เว้า) และกำลังขยาย ($m = \\frac{s'}{s} = \\frac{y'}{y} = \\frac{f}{s-f}$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "เลนส์นูนรวมแสง ($f > 0$), เลนส์เว้ากระจายแสง ($f < 0$), กฎเครื่องหมาย Real is Positive (+)"
        },
        {
          "id": "phys_s_t11_s1_3",
          "topicId": "phys_s_t11",
          "parentId": "phys_s_t11_s1",
          "level": 3,
          "name": "ทัศนูปกรณ์และการมองเห็น: กล้องจุลทรรศน์ กล้องโทรทรรศน์ แว่นตาแก้ไขสายตา",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "สายตาสั้นแก้ไขด้วยเลนส์เว้า, สายตายาวแก้ไขด้วยเลนส์นูน, กำลังของเลนส์ $P = \\frac{1}{f(m)}$ ไดออปเตอร์"
        },
        {
          "id": "phys_s_t11_s1_4",
          "topicId": "phys_s_t11",
          "parentId": "phys_s_t11_s1",
          "level": 4,
          "name": "เทคนิค: สูตรลัดกำลังขยาย $m = \\frac{s' - f}{f} = \\frac{f}{s - f}$ ไม่ต้องผ่าน 2 สมการ",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "แก้โจทย์เลนส์และกระจกในขั้นตอนเดียวโดยไม่ต้องหา $s'$ ก่อน"
        }
      ]
    },
    {
      "id": "phys_s_t12",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 12: เสียง (Sound)",
      "nameEn": "Acoustics, Sound Intensity & Doppler Effect",
      "sortOrder": 12,
      "subtopics": [
        {
          "id": "phys_s_t12_s1",
          "topicId": "phys_s_t12",
          "level": 1,
          "name": "12.1 อัตราเร็วของเสียงและสมบัติของเสียง",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "อัตราเร็วเสียงในอากาศ $v = 331 + 0.6T_c\\text{ m/s}$, การสะท้อน (เสียงก้อง Echo เมื่อ $t \\ge 0.1\\text{ s}$), การหักเหเลี้ยวเบน"
        },
        {
          "id": "phys_s_t12_s1_1",
          "topicId": "phys_s_t12",
          "parentId": "phys_s_t12_s1",
          "level": 2,
          "name": "ความเข้มเสียง ($I = \\frac{P}{4\\pi R^2}$) และระดับเสียง (เดซิเบล: $\\beta = 10\\log\\frac{I}{I_0}$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ขีดเริ่มได้ยิน $I_0 = 10^{-12}\\text{ W/m}^2$, ผลต่างระดับเสียง $\\beta_2 - \\beta_1 = 10\\log\\frac{I_2}{I_1} = 20\\log\\frac{R_1}{R_2}$"
        },
        {
          "id": "phys_s_t12_s1_2",
          "topicId": "phys_s_t12",
          "parentId": "phys_s_t12_s1",
          "level": 3,
          "name": "การสั่นพ้องของเสียงในท่อ (Resonance in Air Columns) และบีตส์ (Beats: $f_b = |f_1 - f_2|$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ท่อปลายเปิดสองข้าง ($f_n = n \\frac{v}{2L}$), ท่อปลายปิดข้างหนึ่ง ($f_n = n \\frac{v}{4L}$ เมื่อ $n=1,3,5,...$), ฮาร์มอนิกและโอเวอร์โทน"
        },
        {
          "id": "phys_s_t12_s1_3",
          "topicId": "phys_s_t12",
          "parentId": "phys_s_t12_s1",
          "level": 3,
          "name": "ปรากฏการณ์ดอปเพลอร์ (Doppler Effect) และคลื่นกระแทก (Shock Waves)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "ความถี่ปรากฏ $f_L = f_s \\left(\\frac{v \\pm v_L}{v \\mp v_s}\\right)$, เลขมัค $\\text{Mach} = \\frac{v_s}{v} = \\frac{1}{\\sin \\theta}$"
        },
        {
          "id": "phys_s_t12_s1_4",
          "topicId": "phys_s_t12",
          "parentId": "phys_s_t12_s1",
          "level": 4,
          "name": "เทคนิค: เทคนิคจำเครื่องหมายดอปเพลอร์ (เข้าหาความถี่สูงขึ้น ถอยห่างความถี่ต่ำลง)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "กฎการตรวจเช็คค่าความถี่ปรากฏใน 2 วินาทีเพื่อป้องกันความสับสนเรื่องเครื่องหมายบวกลบ"
        }
      ]
    },
    {
      "id": "phys_s_t13",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 13: ไฟฟ้าสถิต (Electrostatics)",
      "nameEn": "Electric Charge, Force, Field & Capacitance",
      "sortOrder": 13,
      "subtopics": [
        {
          "id": "phys_s_t13_s1",
          "topicId": "phys_s_t13",
          "level": 1,
          "name": "13.1 กฎของคูลอมบ์ ($F = \\frac{k|q_1 q_2|}{r^2}$) และสนามไฟฟ้า ($\\vec{E} = \\frac{kQ}{r^2}$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ค่าคงที่ $k = 9 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$, เวกเตอร์สนามไฟฟ้าพุ่งออกจากประจุบวกเข้าหาประจุลบ, จุดสะเทิน ($E=0$)"
        },
        {
          "id": "phys_s_t13_s1_1",
          "topicId": "phys_s_t13",
          "parentId": "phys_s_t13_s1",
          "level": 2,
          "name": "ศักย์ไฟฟ้า ($V = \\frac{kQ}{r}$) และงานในการเลื่อนประจุ ($W_{A \\to B} = q(V_B - V_A)$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ศักย์ไฟฟ้าเป็นสเกลาร์ (ต้องแทนเครื่องหมายบวกลบของประจุ), ศักย์ไฟฟ้าของตัวนำทรงกลมคงที่ภายในทรงกลมเท่ากับผิว"
        },
        {
          "id": "phys_s_t13_s1_2",
          "topicId": "phys_s_t13",
          "parentId": "phys_s_t13_s1",
          "level": 3,
          "name": "ตัวเก็บประจุ ($C = \\frac{Q}{V}$) และพลังงานสะสม ($U = \\frac{1}{2}QV = \\frac{1}{2}CV^2$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ความจุไฟฟ้าของตัวนำทรงกลม $C = \\frac{R}{k}$, การต่อตัวเก็บประจุ: ขนาน ($C_p = \\sum C_i$), อนุกรม ($\\frac{1}{C_s} = \\sum \\frac{1}{C_i}$)"
        },
        {
          "id": "phys_s_t13_s1_3",
          "topicId": "phys_s_t13",
          "parentId": "phys_s_t13_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การถ่ายโอนประจุระหว่างทรงกลมตัวนำสัมผัสกัน (ศักย์ไฟฟ้าหลังแตะเท่ากันเสมอ)",
          "sortOrder": 4,
          "difficulty": "advanced",
          "description": "สูตรประจุหลังแตะกัน $q_1' : q_2' = R_1 : R_2$ สัดส่วนตรงตามรัศมีทรงกลม"
        }
      ]
    },
    {
      "id": "phys_s_t14",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 14: ไฟฟ้ากระแส (Direct Current Electricity)",
      "nameEn": "Current, Resistance, Circuits & Kirchhoff's Laws",
      "sortOrder": 14,
      "subtopics": [
        {
          "id": "phys_s_t14_s1",
          "topicId": "phys_s_t14",
          "level": 1,
          "name": "14.1 กระแสไฟฟ้า ($I = \\frac{Q}{t} = neAv_d$) และกฎของโอห์ม ($V = IR$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ความเร็วลอยเลื่อน $v_d$, ความต้านทาน $R = \\rho \\frac{l}{A}$, สภาพต้านทาน $\\rho$, ผลของอุณหภูมิต่อความต้านทาน"
        },
        {
          "id": "phys_s_t14_s1_1",
          "topicId": "phys_s_t14",
          "parentId": "phys_s_t14_s1",
          "level": 2,
          "name": "วงจรไฟฟ้ากระแสตรง แรงเคลื่อนไฟฟ้า (EMF: $E$) และความต้านทานภายใน ($r$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "สมการวงจรเดี่ยว $I = \\frac{\\sum E}{\\sum R + \\sum r}$, ความต่างศักย์คร่อมขั้วแบตเตอรี่ $V = E - Ir$"
        },
        {
          "id": "phys_s_t14_s1_2",
          "topicId": "phys_s_t14",
          "parentId": "phys_s_t14_s1",
          "level": 2,
          "name": "การต่อตัวต้านทาน อนุกรม ขนาน และสะพานวีตสโตน (Wheatstone Bridge)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "อนุกรม $R_s = R_1 + R_2$, ขนาน $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$, บริดจ์สมดุล $\\frac{R_1}{R_2} = \\frac{R_3}{R_4}$ กระแสผ่านตัวกลางเป็นศูนย์"
        },
        {
          "id": "phys_s_t14_s1_3",
          "topicId": "phys_s_t14",
          "parentId": "phys_s_t14_s1",
          "level": 3,
          "name": "กฎของเคอร์ชฮอฟฟ์ (Kirchhoff's Rules: KCL & KVL)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "กฎจุดแยก $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$, กฎวงรอบ $\\sum E = \\sum IR$ หรือ $\\sum V = 0$"
        },
        {
          "id": "phys_s_t14_s1_4",
          "topicId": "phys_s_t14",
          "parentId": "phys_s_t14_s1",
          "level": 3,
          "name": "พลังงานและกำลังไฟฟ้า ($P = IV = I^2 R = \\frac{V^2}{R}$) และการคิดค่าไฟฟ้า",
          "sortOrder": 5,
          "difficulty": "basic",
          "description": "หน่วยยูนิตการไฟฟ้า (Kilowatt-Hour: $\\text{kW}\\cdot\\text{h} = \\frac{W \\times t(h)}{1000}$), การแปลงแกลแวนอมิเตอร์เป็นแอมมิเตอร์และโวลต์มิเตอร์"
        },
        {
          "id": "phys_s_t14_s1_5",
          "topicId": "phys_s_t14",
          "parentId": "phys_s_t14_s1",
          "level": 4,
          "name": "เทคนิค: เทคนิค Nodal Analysis (วิธีจุดยอด) แก้กิริยาเคอร์ชฮอฟฟ์ใน 2 บรรทัด",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "การกำหนดจุดกราวด์ $V=0$ แล้วตั้งสมการ $\\sum I = 0$ จุดเดียวโดยไม่ต้องตั้งสมการลูป 3 ตัวแปร"
        }
      ]
    },
    {
      "id": "phys_s_t15",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 15: แม่เหล็กและไฟฟ้า (Magnetism and Electromagnetism)",
      "nameEn": "Magnetic Field, Induction & AC Circuits",
      "sortOrder": 15,
      "subtopics": [
        {
          "id": "phys_s_t15_s1",
          "topicId": "phys_s_t15",
          "level": 1,
          "name": "15.1 ฟลักซ์แม่เหล็ก ($\\Phi = BA\\cos\\theta$) และแรงแม่เหล็กกระทำต่อประจุ ($F = qvB\\sin\\theta$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "กฎมือขวาหาทิศทางของแรง $\\vec{F} = q(\\vec{v} \\times \\vec{B})$, รัศมีความโค้งของประจุในสนามแม่เหล็ก $R = \\frac{mv}{qB}$"
        },
        {
          "id": "phys_s_t15_s1_1",
          "topicId": "phys_s_t15",
          "parentId": "phys_s_t15_s1",
          "level": 2,
          "name": "แรงแม่เหล็กกระทำต่อลวดตัวนำมีกระแส ($F = ILB\\sin\\theta$) และโมเมนต์ของแรงคู่ควบในขดลวด ($M = NIAB\\cos\\theta$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "แรงดึงดูด/ผลักระหว่างลวดขนาน 2 เส้น, การหมุนของขดลวดในสนามแม่เหล็กและหลักการของมอเตอร์ไฟฟ้า"
        },
        {
          "id": "phys_s_t15_s1_2",
          "topicId": "phys_s_t15",
          "parentId": "phys_s_t15_s1",
          "level": 3,
          "name": "การเหนี่ยวนำแม่เหล็กไฟฟ้า: กฎของฟาราเดย์ กฎของเลนซ์ และหม้อแปลงไฟฟ้า",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$\\mathcal{E} = -\\frac{\\Delta \\Phi}{\\Delta t}$, ทิศของกระแสเหนี่ยวนำต้านการเปลี่ยนแปลงของฟลักซ์เดิม, หม้อแปลงอุดมคติ $\\frac{V_1}{V_2} = \\frac{N_1}{N_2} = \\frac{I_2}{I_1}$"
        },
        {
          "id": "phys_s_t15_s1_3",
          "topicId": "phys_s_t15",
          "parentId": "phys_s_t15_s1",
          "level": 3,
          "name": "ไฟฟ้ากระแสสลับ (AC Circuits): ค่ายังผล ($V_{\\text{rms}} = \\frac{V_{\\max}}{\\sqrt{2}}$) และอิมพีแดนซ์ ($Z$)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "ความต้านทานเชิงจุ $X_C = \\frac{1}{\\omega C}$, ความต้านทานเชิงเหนี่ยวนำ $X_L = \\omega L$, อิมพีแดนซ์วงจร $RLC$ อนุกรม $Z = \\sqrt{R^2 + (X_L - X_C)^2}$"
        },
        {
          "id": "phys_s_t15_s1_4",
          "topicId": "phys_s_t15",
          "parentId": "phys_s_t15_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การเกิดเรโซแนนซ์ในวงจร RLC ($\\omega = \\frac{1}{\\sqrt{LC}}$) และกำลังไฟฟ้าเฉลี่ย",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "สภาวะเรโซแนนซ์ $X_L = X_C \\implies Z = R$ กระแสสูงสุดในวงจร และเพาเวอร์แฟกเตอร์ $\\cos\\phi = 1$"
        }
      ]
    },
    {
      "id": "phys_s_t16",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 16: ความร้อนและแก๊ส (Heat, Gases and Thermodynamics)",
      "nameEn": "Thermal Physics, Ideal Gas & Thermodynamics",
      "sortOrder": 16,
      "subtopics": [
        {
          "id": "phys_s_t16_s1",
          "topicId": "phys_s_t16",
          "level": 1,
          "name": "16.1 ความร้อนจำเพาะ ($Q = mc\\Delta T$), ความร้อนแฝง ($Q = mL$) และสมดุลความร้อน",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การเปลี่ยนอุณหภูมิและการเปลี่ยนสถานะ, การถ่ายโอนความร้อน นำ พา แผ่รังสี, กฎสมดุลความร้อน $Q_{\\text{คาย}} = Q_{\\text{ดูด}}$"
        },
        {
          "id": "phys_s_t16_s1_1",
          "topicId": "phys_s_t16",
          "parentId": "phys_s_t16_s1",
          "level": 2,
          "name": "กฎของแก๊สอุดมคติ ($PV = nRT = N k_B T$)",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "บอยล์ ชาร์ล เกย์-ลุสแซก กฎรวมแก๊ส $\\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}$ (อุณหภูมิต้องใช้หน่วยเคลวิน $K$ เสมอ)"
        },
        {
          "id": "phys_s_t16_s1_2",
          "topicId": "phys_s_t16",
          "parentId": "phys_s_t16_s1",
          "level": 3,
          "name": "ทฤษฎีจลน์ของแก๊ส (Kinetic Theory: $P = \\frac{1}{3}\\frac{Nm v_{\\text{rms}}^2}{V}$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "พลังงานจลน์เฉลี่ยของโมเลกุลแก๊ส $\\bar{E}_k = \\frac{3}{2}k_B T$, อัตราเร็ว rms: $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3k_B T}{m}}$"
        },
        {
          "id": "phys_s_t16_s1_3",
          "topicId": "phys_s_t16",
          "parentId": "phys_s_t16_s1",
          "level": 3,
          "name": "กฎข้อที่หนึ่งของอุณหพลศาสตร์ (First Law of Thermodynamics: $\\Delta Q = \\Delta U + W$)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "พลังงานภายในระบบ $\\Delta U = \\frac{3}{2}nR\\Delta T$, งานของแก๊ส $W = P\\Delta V$ (พื้นที่ใต้กราฟ $P-V$), กระบวนการ Isobaric, Isothermal, Isovolumetric, Adiabatic"
        },
        {
          "id": "phys_s_t16_s1_4",
          "topicId": "phys_s_t16",
          "parentId": "phys_s_t16_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: วัฏจักรคาร์โนต์ (Carnot Cycle) และประสิทธิภาพเครื่องจักรความร้อน ($\\eta = 1 - \\frac{T_C}{T_H}$)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "การคำนวณงานสุทธิของวัฏจักรจากพื้นที่ปิดบนกราฟ $P-V$ และกฎข้อที่ 2 ของเทอร์โมไดนามิกส์"
        }
      ]
    },
    {
      "id": "phys_s_t17",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 17: ของแข็งและของไหล (Solids and Fluid Mechanics)",
      "nameEn": "Elasticity, Hydrostatics & Hydrodynamics",
      "sortOrder": 17,
      "subtopics": [
        {
          "id": "phys_s_t17_s1",
          "topicId": "phys_s_t17",
          "level": 1,
          "name": "17.1 สภาพยืดหยุ่นของของแข็ง: ความเค้น ความเครียด และยังมอดูลัส ($Y = \\frac{\\sigma}{\\epsilon}$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ความเค้น $\\sigma = \\frac{F}{A}$, ความเครียด $\\epsilon = \\frac{\\Delta L}{L}$, ยังมอดูลัส $Y = \\frac{FL}{A\\Delta L}$, ขีดจำกัดสภาพยืดหยุ่น"
        },
        {
          "id": "phys_s_t17_s1_1",
          "topicId": "phys_s_t17",
          "parentId": "phys_s_t17_s1",
          "level": 2,
          "name": "ความดันในของเหลว ($P = \\rho g h$), กฎของปาสคาล และเครื่องอัดไฮดรอลิก",
          "sortOrder": 2,
          "difficulty": "basic",
          "description": "ความดันเกจ $P_g = \\rho g h$, ความดันสัมบูรณ์ $P = P_0 + \\rho g h$, ไฮดรอลิก $\\frac{W}{A} = \\frac{F}{a}$, หลอดแก้วรูปตัวยู"
        },
        {
          "id": "phys_s_t17_s1_2",
          "topicId": "phys_s_t17",
          "parentId": "phys_s_t17_s1",
          "level": 2,
          "name": "แรงพยุงของอาร์คิมีดีส ($F_B = \\rho_{\\text{fluid}} V_{\\text{submerged}} g$)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "หลักการลอยตัว: วัตถุลอย $\\sum F = 0 \\implies F_B = mg$, สัดส่วนการจม $\\frac{V_{\\text{จม}}}{V_{\\text{ทั้งหมด}}} = \\frac{\\rho_{\\text{วัตถุ}}}{\\rho_{\\text{ของเหลว}}}$"
        },
        {
          "id": "phys_s_t17_s1_3",
          "topicId": "phys_s_t17",
          "parentId": "phys_s_t17_s1",
          "level": 3,
          "name": "ความตึงผิว (Surface Tension: $\\gamma = \\frac{F}{L}$) และความหนืด (Viscosity)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "แรงตึงผิวห่วงลวด, กฎของสโตกส์สำหรับทรงกลมตกในของเหลวหนืด $F = 6\\pi \\eta r v$, อัตราเร็วสุดท้าย (Terminal Velocity)"
        },
        {
          "id": "phys_s_t17_s1_4",
          "topicId": "phys_s_t17",
          "parentId": "phys_s_t17_s1",
          "level": 3,
          "name": "พลศาสตร์ของของไหล: สมการความต่อเนื่องและสมการแบร์นูลลี",
          "sortOrder": 5,
          "difficulty": "intermediate",
          "description": "สมการความต่อเนื่อง $A_1 v_1 = A_2 v_2$, สมการแบร์นูลลี $P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{const}$, ปรากฏการณ์เวนจูรี และแรงยกปีกเครื่องบิน"
        },
        {
          "id": "phys_s_t17_s1_5",
          "topicId": "phys_s_t17",
          "parentId": "phys_s_t17_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: อัตราเร็วการไหลรั่วออกจากก้นถัง (ทฤษฎีบททอร์ริเชลลี: $v = \\sqrt{2gh}$)",
          "sortOrder": 6,
          "difficulty": "advanced",
          "description": "การคิดระยะพุ่งไกลสุดของน้ำที่รั่วออกจากรูข้างถัง $R_{\\max} = H$ เมื่อเจาะรูที่กึ่งกลางความสูงพอดี"
        }
      ]
    },
    {
      "id": "phys_s_t18",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 18: คลื่นแม่เหล็กไฟฟ้า (Electromagnetic Waves)",
      "nameEn": "EM Waves, Polarization & Modern Telecommunications",
      "sortOrder": 18,
      "subtopics": [
        {
          "id": "phys_s_t18_s1",
          "topicId": "phys_s_t18",
          "level": 1,
          "name": "18.1 สเปกตรัมคลื่นแม่เหล็กไฟฟ้าและการแผ่คลื่น",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "การเหนี่ยวนำร่วมระหว่างสนามไฟฟ้าและสนามแม่เหล็กตั้งฉากกัน, อัตราเร็วแสง $c = 3 \\times 10^8\\text{ m/s}$, ลำดับคลื่น: วิทยุ ไมโครเวฟ อินฟราเรด แสงที่ตามองเห็น ยูวี รังสีเอกซ์ แกมมา"
        },
        {
          "id": "phys_s_t18_s1_1",
          "topicId": "phys_s_t18",
          "parentId": "phys_s_t18_s1",
          "level": 2,
          "name": "โพลาไรเซชันของคลื่นแม่เหล็กไฟฟ้า (Polarization) และกฎของมาลุส ($I = I_0 \\cos^2 \\theta$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "คลื่นโพลาไรซ์เชิงเส้น แผ่นโพลารอยด์, การโพลาไรซ์จากการสะท้อนและมุมบริวสเตอร์ (Brewster's Angle: $\\tan \\theta_p = \\frac{n_2}{n_1}$)"
        },
        {
          "id": "phys_s_t18_s1_2",
          "topicId": "phys_s_t18",
          "parentId": "phys_s_t18_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การประยุกต์คลื่นวิทยุ AM/FM เรดาร์ เส้นใยนำแสง และระบบสื่อสาร 5G",
          "sortOrder": 3,
          "difficulty": "advanced",
          "description": "เปรียบเทียบการสะท้อนชั้นบรรยากาศไอโอโนสเฟียร์ของคลื่น AM vs คลื่น FM ที่ทะลุผ่านและใช้ดาวเทียมสื่อสาร"
        }
      ]
    },
    {
      "id": "phys_s_t19",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 19: ฟิสิกส์อะตอม (Atomic Physics)",
      "nameEn": "Quantum Physics, Photoelectric & Wave-Particle Duality",
      "sortOrder": 19,
      "subtopics": [
        {
          "id": "phys_s_t19_s1",
          "topicId": "phys_s_t19",
          "level": 1,
          "name": "19.1 รังสีวัตถุดำ ทฤษฎีควอนตัมของพลังค์ และโฟตอน ($E = hf = \\frac{hc}{\\lambda}$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "ค่าคงที่พลังค์ $h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$, ค่าพลังงานในหน่วยอิเล็กตรอนโวลต์ ($1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J}$), สูตรลัด $E(\\text{eV}) = \\frac{1240}{\\lambda(\\text{nm})}$"
        },
        {
          "id": "phys_s_t19_s1_1",
          "topicId": "phys_s_t19",
          "parentId": "phys_s_t19_s1",
          "level": 2,
          "name": "ปรากฏการณ์โฟโตอิเล็กทริก (Photoelectric Effect: $hf = W_0 + E_{k,\\max}$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ฟังก์ชันงาน $W_0 = hf_0$, ความถี่ขีดเริ่ม $f_0$, ศักย์หยุดยั้ง $eV_s = E_{k,\\max}$, จำนวนอิเล็กตรอนขึ้นกับความเข้มแสง พลังงานจลน์สูงสุดขึ้นกับความถี่แสง"
        },
        {
          "id": "phys_s_t19_s1_2",
          "topicId": "phys_s_t19",
          "parentId": "phys_s_t19_s1",
          "level": 3,
          "name": "แบบจำลองอะตอมของโบร์และอนุกรมสเปกตรัมไฮโดรเจน",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "ระดับพลังงาน $E_n = -\\frac{13.6}{n^2}\\text{ eV}$, อนุกรมไลแมน (UV: $n_1 = 1$), บัลเมอร์ (Visible: $n_1 = 2$), ปาสเชน (IR: $n_1 = 3$), แบรกเกตต์, ฟุนด์"
        },
        {
          "id": "phys_s_t19_s1_3",
          "topicId": "phys_s_t19",
          "parentId": "phys_s_t19_s1",
          "level": 3,
          "name": "ทวิภาวะคลื่น-อนุภาค สมมติฐานเดอบรอยล์ ($\\lambda = \\frac{h}{p} = \\frac{h}{mv}$) และหลักความไม่แน่นอน",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "ความยาวคลื่นเดอบรอยล์ของอิเล็กตรอนเร่งด้วยความต่างศักย์ $\\lambda = \\frac{h}{\\sqrt{2mqV}}$, กล้องจุลทรรศน์อิเล็กตรอน, หลักความไม่แน่นอนของไฮเซนเบิร์ก $\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}$"
        },
        {
          "id": "phys_s_t19_s1_4",
          "topicId": "phys_s_t19",
          "parentId": "phys_s_t19_s1",
          "level": 4,
          "name": "เทคนิค & ข้อสอบ: การอ่านกราฟความสัมพันธ์โฟโตอิเล็กทริก ($V_s$ กับ $f$ ความชันคือ $\\frac{h}{e}$)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "จุดตัดแกนตั้งคือ $-\\frac{W_0}{e}$ และจุดตัดแกนนอนคือความถี่ขีดเริ่ม $f_0$ ข้อสอบ A-Level ออกแทบทุกปี"
        }
      ]
    },
    {
      "id": "phys_s_t20",
      "subjectId": "PHYS_SENIOR_FUNDAMENTAL_01",
      "name": "บทที่ 20: ฟิสิกส์นิวเคลียร์และฟิสิกส์อนุภาค (Nuclear & Particle Physics)",
      "nameEn": "Nuclear Energy, Radioactivity & Standard Model",
      "sortOrder": 20,
      "subtopics": [
        {
          "id": "phys_s_t20_s1",
          "topicId": "phys_s_t20",
          "level": 1,
          "name": "20.1 แรงนิวเคลียร์ ส่วนพร่องมวล ($\\Delta m$) และพลังงานยึดเหนี่ยว ($BE = \\Delta m c^2$)",
          "sortOrder": 1,
          "difficulty": "basic",
          "description": "หน่วยมวลอะตอม $1\\text{ u} = 931.5\\text{ MeV}$, พลังงานยึดเหนี่ยวต่อนิวคลีออน $\\frac{BE}{A}$, ความเสถียรสูงสุดบริเวณนิวเคลียสของเหล็ก ($^{56}\\text{Fe}$)"
        },
        {
          "id": "phys_s_t20_s1_1",
          "topicId": "phys_s_t20",
          "parentId": "phys_s_t20_s1",
          "level": 2,
          "name": "การสลายกัมมันตรังสี กฎการสลายตัว ($N(t) = N_0 e^{-\\lambda t}$) และกัมมันตภาพ ($A = \\lambda N$)",
          "sortOrder": 2,
          "difficulty": "intermediate",
          "description": "ความสัมพันธ์ค่าคงที่การสลายตัวกับครึ่งชีวิต $\\lambda = \\frac{\\ln 2}{t_{1/2}} = \\frac{0.693}{t_{1/2}}$, หน่วยเบกเคอเรล (Bq) และคูรี (Ci)"
        },
        {
          "id": "phys_s_t20_s1_2",
          "topicId": "phys_s_t20",
          "parentId": "phys_s_t20_s1",
          "level": 3,
          "name": "ปฏิกิริยานิวเคลียร์ ฟิชชัน ฟิวชัน และการคำนวณพลังงาน ($Q$-value)",
          "sortOrder": 3,
          "difficulty": "intermediate",
          "description": "$Q = (m_{\\text{reactants}} - m_{\\text{products}}) \\times 931.5\\text{ MeV}$, ค่า $Q > 0$ คายพลังงาน, ค่า $Q < 0$ ดูดพลังงาน"
        },
        {
          "id": "phys_s_t20_s1_3",
          "topicId": "phys_s_t20",
          "parentId": "phys_s_t20_s1",
          "level": 3,
          "name": "ฟิสิกส์อนุภาคเบื้องต้นและแบบจำลองมาตรฐาน (Standard Model of Particle Physics)",
          "sortOrder": 4,
          "difficulty": "intermediate",
          "description": "อนุภาคมูลฐาน: ควาร์ก (Quarks: u, d, c, s, t, b), เลปตอน (Leptons: e, $\\mu$, $\\tau$, $\\nu$), เกจโบซอนสื่อแรง (Gluon, Photon, $W^\\pm, Z^0$), ฮิกส์โบซอน (Higgs)"
        },
        {
          "id": "phys_s_t20_s1_4",
          "topicId": "phys_s_t20",
          "parentId": "phys_s_t20_s1",
          "level": 4,
          "name": "เทคนิค: โครงสร้างควาร์กของแฮดรอน โปรตอน ($uud$) และนิวตรอน ($udd$)",
          "sortOrder": 5,
          "difficulty": "advanced",
          "description": "การคิดผลรวมประจุเศษส่วนของควาร์ก: $u (+2/3e)$ และ $d (-1/3e)$ นำสู่ประจุโปรตอน $+1$ และนิวตรอน $0$"
        }
      ]
    }
  ]
};
