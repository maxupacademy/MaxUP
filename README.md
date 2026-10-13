# MaxUp TutorHub 🚀
เว็บแพลตฟอร์มการเรียนรู้และบันทึกการสอน MaxUp สำหรับติวเตอร์และนักเรียน

![MaxUp Logo](https://img.shields.io/badge/MaxUp-TutorHub-0B48A1?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=firebase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🌟 ฟีเจอร์หลัก (Core Features)

1. **ระบบบันทึกคาบเรียน & เชื่อมโยง Syllabus (Lesson Logger)**:
   - บันทึกคาบเรียน วันที่ เวลา คำนวณชั่วโมงสอนสะสมอัตโนมัติ
   - เลือกหัวข้อที่เรียนตาม Course Syllabus ได้โดยตรง
   - มีช่องแปะ **"✍️ ลิงก์เฉลยจากการเขียนลายมือครู Max"** และ **"📂 ลิงก์ Google Drive ชีทเรียน"**

2. **ระบบติดตามสถานะ & จำนวนครั้งที่เรียนซ้ำ (Study Count & History)**:
   - ตรวจจับหัวข้อที่เรียนแล้ว แสดงป้าย `✅ เรียนแล้ว` อัตโนมัติ
   - แสดงจำนวนครั้งที่เรียน เช่น `🔥 เรียน 2 ครั้ง (เรียนซ้ำ)` หรือ `🔥 เรียน 3 ครั้ง`
   - คุณครูสามารถกด `+1 รอบ` หรือ `-1` ได้โดยตรง และเลือกดูความคืบหน้ารายบุคคลได้ทันที

3. **ระบบจัดเก็บเอกสารและเฉลยผ่าน Google Drive**:
   - แปะลิงก์ Google Drive ชีทเรียนประจำบทและหัวข้อย่อย
   - แปะลิงก์เฉลยจากการเขียนลายมือ (Handwritten Solutions) ให้นักเรียนเปิดทบทวนวิธีคิดได้สะดวก

4. **ตารางเรียน & วางแผนเนื้อหาล่วงหน้า (Study Schedule Planner)**:
   - วางแผนตารางเรียน วันที่ เวลา ชั่วโมง และระบุเนื้อหา/หัวข้อใน Syllabus ที่จะสอนล่วงหน้า
   - คุณครูและนักเรียนสามารถดูตารางเรียนล่วงหน้าร่วมกันได้
   - มีปุ่ม `สอนแล้ว (บันทึกคาบ)` เพื่อแปลงแผนเป็นคาบเรียนจริงได้ทันที

5. **ระบบการบ้าน & ส่งงาน (Homework Suite)**:
   - สั่งการบ้านและตรวจงานรายบุคคล พร้อมแนบลิงก์โจทย์ Google Drive ได้

---

## 🛠️ การรันในเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. เริ่มต้นรัน Development Server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

---

## 🌐 การ Push ขึ้น GitHub และ Deploy ผ่าน Vercel

### วิธีที่ 1: Push จากเครื่องของคุณ (หรือส่ง Token ให้บอท Push ให้)
หากคุณมี Repository บน GitHub อยู่แล้ว (เช่น `https://github.com/USERNAME/REPO.git`):

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git branch -M main
git push -u origin main
```

*(หากต้องการให้บอทในระบบนี้ Push ให้โดยตรง สามารถส่ง GitHub Repo URL พร้อม Personal Access Token เช่น `https://<TOKEN>@github.com/<user>/<repo>.git` ได้ทันทีครับ)*

### วิธีที่ 2: Deploy บน Vercel
1. เข้าไปที่ [Vercel](https://vercel.com) แล้วล็อกอินด้วยบัญชี GitHub
2. คลิกปุ่ม **"Add New..."** -> **"Project"**
3. เลือก Repository ที่เพิ่ง Push ขึ้นไป
4. การตั้งค่า Vercel จะตรวจพบ Vite อัตโนมัติ:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. ในโปรเจกต์มีไฟล์ `vercel.json` รองรับ SPA Rewrite เรียบร้อยแล้ว (ไม่เกิดปัญหา 404 เมื่อรีเฟรชหน้า)
6. คลิก **"Deploy"** รอประมาณ 1 นาที เว็บไซต์จะออนไลน์พร้อมใช้งานทันที!
