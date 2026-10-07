export type UserRole = 'admin' | 'student';

export interface UserProfile {
  id: string;
  role: UserRole;
  fullName: string;
  nickname: string;
  email?: string;
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
  name: string;
  description?: string;
  sortOrder: number;
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  keyPoints?: string[];
}

export interface Topic {
  id: string;
  subjectId: string; // Course ID
  name: string;
  nameEn?: string;
  sortOrder: number;
  subtopics: Subtopic[];
  examWeights?: {
    y2568?: number;
    y2567?: number;
    y2566?: number;
    y2565?: number;
    totalHistorical?: number;
  };
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
  createdAt: string;
}

export type TopicLearningStatus = 'not_started' | 'in_progress' | 'completed' | 'mastered';

export interface StudentTopicProgress {
  subtopicId: string;
  status: TopicLearningStatus;
  lastStudiedDate?: string;
  quizScore?: number;
  notes?: string;
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

// Flashcards system (แฟลชการ์ด)
export interface Flashcard {
  id: string;
  courseId: string;
  topicId: string;
  subtopicId?: string;
  front: string; // คำถาม / สูตร / หัวข้อ
  back: string;  // คำตอบ / วิธีจำ / คำอธิบาย
  hint?: string;
  keyFormula?: string;
}

export interface FlashcardProgress {
  cardId: string;
  known: boolean;
  reviewCount: number;
  lastReviewed?: string;
}

// Quizzes & Practice system (ควิซ & ข้อสอบฝึกฝน)
export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  topicId: string;
  title: string;
  description: string;
  timeLimitMinutes?: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  total: number;
  answers: Record<string, number>; // questionId -> chosen index
  submittedAt: string;
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
  fileData?: string; // Base64 data URL for uploaded PDF
  isProtected?: boolean; // Secure in-app viewing
  embeddedPages?: MaterialPage[]; // Multi-page structured reader content
}
