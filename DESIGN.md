# 🎨 MaxUp Academy — Official Brand Design System & CI Guidelines
**Owner:** Thanadol (Maxnm) — Founder of Maxups Institute  
**Platform:** MaxUp Academy (Web & Mobile Learning Suite)  
**Version:** 1.0 (2026 Edition)

---

## 1. Brand Identity & Vision
- **Brand Name:** **MaxUp Academy** (เดิมคือ MaxUp TutorHub)
- **Tagline:** ระบบดูแลการเรียนที่ออกแบบเพื่อน้องรายบุคคล (Personalized Learning Workspace)
- **Voice & Tone:** "พี่สอนน้อง" (อบอุ่น เป็นกันเอง ให้กำลังใจ ชัดเจนตรงประเด็น ไม่กดดันเด็ก)

---

## 2. Core CI Color Palette (4 สีหลักของ MaxUp)
ห้ามใช้สีดำสนิทหรือกล่องทึบสีดำ (`#000000` / `bg-slate-950` ทึบ) โดยให้ใช้โทนสีทางการของสถาบันทั้ง 4 สีนี้ในการคุมโทน:

| สี | ชื่อเฉดสี | HEX Code | Tailwind Utility | บทบาทและตำแหน่งที่ใช้ |
|---|---|---|---|---|
| 🔵 **น้ำเงิน (Primary)** | Royal Navy / Deep Ocean | `#001B48`<br/>`#0B48A1`<br/>`#1E3A8A` | `bg-[#001B48]`<br/>`text-[#0B48A1]`<br/>`from-[#001B48] to-[#0B48A1]` | สีหลักของสถาบัน ใช้กับ Banner แดชบอร์ด, Header, ตัวอักษร "Max" ในโลโก้, และโครงสร้างหลัก |
| 🟠 **ส้ม (Action)** | Energetic Orange / Sunset | `#FF7A00`<br/>`#F55D00` | `bg-[#FF7A00]`<br/>`text-[#FF7A00]`<br/>`hover:bg-[#F55D00]` | สีแอ็กชันหลัก ใช้กับปุ่ม Call-to-Action, ตัวอักษร "UP!" ในโลโก้, ไฮไลต์คะแนน, และความก้าวหน้าสำคัญ |
| 🟡 **เหลือง (Highlight)** | Sunshine Yellow / Amber | `#FBBF24`<br/>`#F59E0B` | `text-amber-400`<br/>`bg-amber-400/15`<br/>`border-amber-400/40` | สีไฮไลต์ข้อความสำคัญ, ป้ายประกาศ, ติวเตอร์ทิป, ดาวความเข้าใจ, และประกายความคิด |
| 🟣 **ม่วง (Accent)** | Soft Lavender / Violet | `#7C3AED`<br/>`#8B5CF6`<br/>`#EDE9FE` | `bg-purple-50`<br/>`text-purple-700`<br/>`border-purple-200` | สีแห่งความรู้และการค้นพบ ใช้กับโบว์ไทด์น้อง Pumpkin, หมวดหมู่วิทยาศาสตร์/เคมี, แท็กชีทเรียนพิเศษ |

### Backgrounds & Cards
- **Light Theme Background:** `#F8FAFC` (Slate-50 นุ่มนวล สบายตา)
- **Primary Cards:** สีขาว `#FFFFFF` ขอบ `border-slate-200/80` หรือขอบนวลน้ำเงิน `border-blue-100` พร้อมเงาเบา `shadow-2xs`
- **Hero Banners:** Gradient ลึกหรูหรา `bg-gradient-to-r from-[#001B48] via-[#072B61] to-[#0B48A1]` พร้อมกริดละอองสีทอง `amber-400`

---

## 3. Typography
- **Primary Body & UI Font:** `Prompt`, `sans-serif` (ภาษาไทยและสากล โมเดิร์น อ่านง่าย)
- **Academic & Formal Notes:** `IBM Plex Sans Thai` (สำหรับข้อสอบ, เอกสารทางการ, และวิธีทำ)
- **Numbers & Formulas:** `Fira Code`, `monospace` (สำหรับเวลา, รหัสวิชา, สมการ และตัวเลขสถิติ)

---

## 4. Official Mascot: "Pumpkin" (Professor Meow) 🐱
**ชื่อ:** น้องพัมคิน (Professor Meow / The Curious Fluffy Cat)  
**บุคลิก:** แมวส้มขนฟู ใส่แว่นตากลมโต สวมเสื้อกาวน์นักวิจัยตัวน้อย และผูกโบว์ไทด์สีม่วงพาสเทล  
**นิสัย:** ช่างสงสัย ขี้เล่น อบอุ่น ขยันเรียน ชอบอ่านหนังสือ กินคุกกี้ และดื่มชานมไข่มุก

### การนำ Pumpkin ไปใช้งานในระบบ Web App:
1. **หน้าเข้าสู่ระบบ (Login / Welcome):**
   - รูปภาพห้องทดลองวิจัย (`pumpkin_lab.jpg`) สร้างความรู้สึกอบอุ่น เป็นกันเองตั้งแต่ก้าวแรกที่เข้ามา
2. **Navbar & Brand Badge:**
   - มินิไอคอนใบหน้าน้อง Pumpkin ยิ้มหวานข้างชื่อ "MaxUp Academy"
3. **Empty States (เมื่อยังไม่มีข้อมูล):**
   - *ทำการบ้านครบทุกข้อแล้ว:* ท่า **Pumpkin นอนหลับปุ๋ยบนเบาะม่วง** (`sleep`) พร้อมข้อความ *"เก่งมากครับน้อง! การบ้านส่งครบหมดแล้ว พักผ่อนให้สบายใจเลยนะ"*
   - *ยังไม่มีประวัติคาบเรียน:* ท่า **Pumpkin อ่านหนังสือเตรียมสอน** (`study`) พร้อมข้อความ *"เริ่มบันทึกคาบเรียนเพื่อสะสมชั่วโมงและติดตามความรู้กันครับ"*
   - *สอบผ่าน / ผลลัพธ์ยอดเยี่ยม:* ท่า **Pumpkin ถือใบประกาศ A+ กระโดดดีใจ** (`happy`)
4. **Loading & Auth State:**
   - ท่า **Pumpkin กำลังคิด / หลอดไฟปิ๊งแวบ** (`thinking`) หมุนนุ่มนวลระหว่างรอข้อมูล

---

## 5. UI Component Pattern Standards
- **Buttons:**
  - *Primary Action (ปุ่มเด่นสุด):* พื้นหลังส้ม `#FF7A00` ข้อความสีขาวหรือน้ำเงินเข้ม โค้งมน `rounded-xl`
  - *Secondary Action (ปุ่มรอง):* พื้นหลังน้ำเงินเข้ม `#0B48A1` หรือสีกรมท่า `#001B48`
  - *Ghost / Outline:* พื้นหลังขาว ขอบน้ำเงิน/เทา ข้อความน้ำเงิน `#0B48A1`
- **Spotlight Cards:**
  - ใช้ Spotlight แสงสีทอง `rgba(251, 191, 36, 0.15)` หรือแสงสีน้ำเงิน `rgba(11, 72, 161, 0.12)`
- **No Harsh Pitch Black:**
  - เลี่ยงการใช้สี `bg-black` หรือ `bg-slate-950` ให้ใช้ `bg-[#001B48]` หรือ `bg-[#072B61]` เพื่อรักษาอัตลักษณ์ CI ตลอดทั้งเว็บไซต์
