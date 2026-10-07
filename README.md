# MaxUp TutorHub 🚀
เว็บแพลตฟอร์มการเรียนรู้และบันทึกการสอน MaxUp สำหรับติวเตอร์และนักเรียน

![MaxUp Logo](https://img.shields.io/badge/MaxUp-TutorHub-0B48A1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🌟 ฟีเจอร์หลัก (Core Features)

1. **ระบบคอร์สเรียนแยกตามวิชา (Multi-Course Architecture)**:
   - เคมี ม.ปลาย สสวท. & A-Level (ครอบคลุม 15 บท พร้อมสถิติข้อสอบ 4 ปีย้อนหลัง)
   - คณิตศาสตร์ ม.ต้น เตรียมสอบ ม.4
   - วิทยาศาสตร์ ม.ต้น ตะลุยโจทย์
   - เพิ่มคอร์สใหม่ได้ไม่จำกัดผ่านหน้าเว็บ

2. **สารบัญบทเรียน & เปิดอ่านชีท PDF ในระบบทันที (In-App PDF Reader)**:
   - เปิดอ่านเอกสารประกอบบทเรียนได้ทันทีโดยไม่ต้องดาวน์โหลดแยก
   - ซูมเข้า-ออก ปรับโหมดถนอมสายตา และ Watermark ป้องกันสิทธิ์
   - ติวเตอร์อัปโหลดไฟล์ PDF จากเครื่องฝังลงระบบได้โดยตรง

3. **ระบบการบ้านและการส่งงาน (Homework Suite)**:
   - ติวเตอร์สร้างโจทย์การบ้าน กำหนดวันส่ง และคะแนนเต็มบนเว็บได้ทันที
   - นักเรียนส่งการบ้านได้ 3 รูปแบบ:
     - 📄 ส่งไฟล์ PDF
     - 🖼️ ส่งรูปภาพสมุด
     - ✍️ พิมพ์ข้อความและสูตรคณิต-เคมี (พร้อม Formula Toolbar ปุ่มลัดพิมพ์สมการ)
   - ติวเตอร์ตรวจงาน ให้คะแนน และส่งคำแนะนำแบบรายบุคคลได้ทันที

4. **สื่อการเรียนรู้ครบวงจร (Learning Hub)**:
   - 📺 **วิดีโอ YouTube**: ตัวเล่นวิดีโอฝังในเว็บ พร้อมระบบติ๊กดูแล้ว
   - 🗂️ **แฟลชการ์ด (Flashcards)**: พลิกการ์ดทบทวนสูตรและนิยามสำคัญ
   - 📝 **ควิซ (Quizzes)**: ข้อสอบจำลองจับเวลาพร้อมเฉลยละเอียด
   - 📥 **คลังดาวน์โหลด (Course Materials)**: รวมชีทสรุปสูตรและข้อสอบเก่า

5. **ระบบจัดการสำหรับติวเตอร์ (Admin Management Studio)**:
   - จัดการคอร์ส, สารบัญ, คลิป, แฟลชการ์ด, เอกสาร และการบ้านได้ 100% ผ่านหน้าเว็บ

---

## 🛠️ วิธีการติดตั้งและรันในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. เริ่มต้นรันเซิร์ฟเวอร์จำลอง
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## 🌐 การ Deploy ขึ้น Vercel (ขั้นตอนง่ายๆ ใน 2 นาที)

1. เข้าไปที่ [Vercel](https://vercel.com) แล้วล็อกอินด้วยบัญชี GitHub ของคุณ
2. คลิกปุ่ม **"Add New..."** -> **"Project"**
3. เลือก Repository `maxupacademy/MaxUP`
4. ตรวจสอบการตั้งค่า:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. คลิก **"Deploy"** รอประมาณ 1 นาที เว็บไซต์จะออนไลน์พร้อมใช้งานทั่วโลกทันที!

---

## 🔒 ลิขสิทธิ์ (License)
ลิขสิทธิ์ของสถาบัน **MaxUp** โดยครูพี่แม็ก สำหรับการศึกษา
