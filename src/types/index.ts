export type UserRole = 'admin' | 'student';

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  nickname: string;
  username?: string;
  password?: string;
  enrolledCourseIds?: string[];
  avatarUrl?: string;
  targetExam?: string;
  targetFaculty?: string;
  school?: string;
  grade?: string;
  isActive: boolean;
  createdAt: string;
  totalHoursTaught?: number;
}

export interface Subtopic {
  id: string;
  topicId: string;
  parentId?: string; // ID ของหัวข้อแม่ หากเป็นหัวข้อย่อยขั้นที่ 2 หรือ ขั้นที่ 3
  level?: 1 | 2 | 3; // ระดับขั้นหัวข้อย่อย: 1 = ขั้นที่ 1 (หลัก), 2 = ขั้นที่ 2 (ย่อย), 3 = ขั้นที่ 3 (ย่อยลึก)
  name: string;
  description?: string;
  sortOrder: number;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  keyPoints?: string[];
  googleDriveUrl?: string; // ลิงก์ Google Drive ชีท/เอกสารประจำหัวข้อ
  handwrittenSolutionUrl?: string; // ลิงก์เฉลยจากการเขียนลายมือครู Max (Handwritten Solution)
}

export interface Topic {
  id: string;
  subjectId: string; // Course ID
  name: string;
  nameEn?: string;
  sortOrder: number;
  subtopics: Subtopic[];
  googleDriveUrl?: string; // ลิงก์ Google Drive โฟลเดอร์/ชีทประจำบท
  handwrittenSolutionUrl?: string; // ลิงก์เฉลยจากการเขียนลายมือประจำบท
}

// Course represents a learning course (คอร์สเรียน)
export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  gradeLevel?: string;
  topics: Topic[];
  badgeColor?: string;
  passcode?: string; // รหัสผ่านสำหรับให้นักเรียนกรอกเพื่อเข้าเรียนคอร์สนี้
  googleDriveFolderUrl?: string; // ลิงก์ Google Drive โฟลเดอร์รวมของคอร์ส
}

// Backward-compatible alias
export type Subject = Course;

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  submissionType: 'pdf' | 'image' | 'text';
  fileData?: string; // Base64 data URL for PDF or image
  fileName?: string;
  fileSize?: string;
  textAnswer?: string; // Math and chemistry formatted text
  score?: number;
  maxScore?: number;
  feedback?: string;
  status: 'submitted' | 'graded';
}

export interface Homework {
  id: string;
  lessonId?: string;
  courseId: string;
  topicId?: string;
  studentId: string; // 'all' or specific studentId
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  submissionNote?: string;
  allowedSubmissionTypes?: ('pdf' | 'image' | 'text')[];
  googleDriveUrl?: string; // ลิงก์ Google Drive โจทย์การบ้าน
  questionFile?: {
    name: string;
    fileData?: string;
    fileType: 'pdf' | 'image';
  };
  maxScore?: number;
  submissions?: HomeworkSubmission[];
}

export interface LessonAttachment {
  id: string;
  name: string;
  fileType: 'pdf' | 'doc' | 'image' | 'link';
  url?: string;
  driveUrl?: string;
  size?: string;
}

export interface Lesson {
  id: string;
  studentId: string;
  subjectId: string; // Course ID
  lessonDate: string; // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  durationMinutes: number;
  subtopicIds: string[];
  contentDetail: string;
  score: number;
  scoreScale: '1-5' | '0-100';
  teacherNote?: string;
  homework?: Homework;
  attachments?: LessonAttachment[];
  googleDriveUrl?: string;
  handwrittenSolutionUrl?: string; // ลิงก์เฉลยจากการเขียนลายมือครู Max
  createdAt: string;
}

export type TopicLearningStatus = 'not_started' | 'in_progress' | 'completed' | 'mastered';

export interface StudentTopicProgress {
  subtopicId: string;
  status: TopicLearningStatus;
  lastStudiedDate?: string;
  studyCount?: number; // จำนวนครั้งที่เรียนหัวข้อนี้ (เช่น เรียนซ้ำ 2 ครั้ง)
  quizScore?: number;
  notes?: string;
  handwrittenSolutionUrl?: string; // ลิงก์เฉลยลายมือสำหรับหัวข้อนี้
}

export interface VideoLesson {
  id: string;
  subjectId: string; // Course ID
  topicId: string;
  subtopicId?: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  durationMinutes: number;
  sortOrder: number;
  tags?: string[];
}

export interface VideoProgress {
  videoId: string;
  watched: boolean;
  watchedAt?: string;
  lastPositionSeconds?: number;
}

// แผนตารางเรียนล่วงหน้า & วางแผนเนื้อหารายชั่วโมง
export interface StudySchedulePlan {
  id: string;
  courseId: string;
  studentId: string; // 'all' หรือ studentId เฉพาะ
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  durationHours: number;
  plannedSubtopicIds: string[]; // หัวข้อใน Syllabus ที่จะเรียนล่วงหน้า
  plannedContentDescription: string; // เนื้อหาที่จะเรียน
  preparationNote?: string; // ข้อความเตรียมตัวก่อนเรียน / เอกสารที่ต้องเตรียม
  googleDriveUrl?: string; // ลิงก์ Google Drive เอกสารประจำคาบนี้
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;

  // ระบบชำระเงินสำหรับคาบเรียน (PromptPay Payment & Slip Verification)
  priceAmount?: number; // ค่าเรียน (บาท) - ครูสามารถกรอกเองได้ มีค่าแนะนำ เช่น ชั่วโมงละ 250 บ.
  promptPayNumber?: string; // หมายเลขพร้อมเพย์ (เบอร์มือถือ หรือ เลขบัตรประชาชน)
  promptPayAccountName?: string; // ชื่อบัญชีผู้รับเงิน เช่น "ครูพี่แม็ก (ธนดล)"
  promptPayQrUrl?: string; // รูป QR Code พร้อมเพย์ หรือ ลิงก์รูป QR Code ของครู
  paymentStatus?: 'pending' | 'slip_uploaded' | 'paid'; // สถานะ: รอชำระ, แนบสลิปแล้วรอตรวจ, ชำระเงินสำเร็จ
  paymentSlipUrl?: string; // รูปภาพสลิปที่นักเรียนแนบ
  paymentSlipNote?: string; // บันทึกจากนักเรียน เช่น เวลาที่โอนเงิน
  slipUploadedAt?: string; // เวลาที่แนบสลิป
  paidAt?: string; // เวลาที่คุณครูกดยืนยันชำระเงิน
  confirmedByTeacher?: boolean; // ครูกดยืนยันการตรวจสอบสลิปแล้ว
}

export interface MaterialPage {
  pageNumber: number;
  title: string;
  subtitle?: string;
  content: string[];
  keyFormulas?: string[];
  tips?: string[];
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  topicId?: string;
  subtopicId?: string;
  title: string;
  description: string;
  category: 'ชีทสรุปสูตร' | 'ใบงานแบบฝึกหัด' | 'ข้อสอบเก่า' | 'เฉลยละเอียด';
  fileType: 'pdf' | 'doc' | 'sheet';
  fileSize: string;
  downloadCount: number;
  updatedAt: string;
  driveUrl?: string; // ลิงก์ Google Drive สำหรับเปิดหรือดาวน์โหลดเอกสาร
  fileData?: string; // Optional embedded data URL
  isProtected?: boolean;
  embeddedPages?: MaterialPage[];
}
