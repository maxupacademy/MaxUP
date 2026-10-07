import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Subject,
  Course,
  Lesson,
  UserRole,
  StudentTopicProgress,
  Homework,
  Topic,
  Subtopic,
  VideoLesson,
  VideoProgress,
  Flashcard,
  FlashcardProgress,
  Quiz,
  QuizAttempt,
  CourseMaterial,
  HomeworkSubmission,
} from '../types';
import {
  INITIAL_ADMIN,
  INITIAL_STUDENTS,
  ALL_INITIAL_SUBJECTS,
  INITIAL_VIDEOS,
  INITIAL_LESSONS,
  INITIAL_PROGRESS,
  INITIAL_VIDEO_PROGRESS,
  INITIAL_FLASHCARDS,
  INITIAL_QUIZZES,
  INITIAL_MATERIALS,
  INITIAL_HOMEWORKS,
} from '../data/initialData';
import { db } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

interface AppContextType {
  // Authentication & Session
  currentUser: UserProfile | null;
  currentUserRole: UserRole;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  authError: string | null;
  clearAuthError: () => void;
  loginWithUsernameAndPassword: (identifier: string, pass: string) => Promise<void>;
  signUpStudent: (
    fullName: string,
    nickname: string,
    username: string,
    pass: string,
    courseId: string,
    coursePasscode: string,
    extra?: Partial<UserProfile>
  ) => Promise<void>;
  enrollCourseWithPasscode: (courseId: string, passcode: string) => Promise<boolean>;
  enrollByPasscode: (passcode: string) => Promise<Course>;
  logout: () => void;

  // Students & Admin Profiles
  adminProfile: UserProfile;
  students: UserProfile[];
  addStudent: (student: Omit<UserProfile, 'id' | 'createdAt' | 'role'>) => void;
  updateStudent: (student: UserProfile) => void;
  deleteStudent: (studentId: string) => void;

  // Courses (คอร์สเรียน) & Universal Syllabus
  courses: Course[];
  subjects: Course[]; // Alias
  activeCourseId: string;
  activeSubjectId: string; // Alias
  setActiveCourseId: (courseId: string) => void;
  setActiveSubjectId: (courseId: string) => void; // Alias
  activeCourse: Course;
  activeSubject: Course; // Alias
  addCourse: (name: string, code: string, description: string, gradeLevel?: string, passcode?: string) => void;
  addSubject: (name: string, code: string, description: string, gradeLevel?: string, passcode?: string) => void; // Alias
  updateCourse: (course: Course) => void;
  updateSubject: (course: Course) => void; // Alias
  deleteCourse: (courseId: string) => void;
  deleteSubject: (courseId: string) => void; // Alias
  addTopic: (courseId: string, name: string, nameEn?: string) => void;
  updateTopic: (courseId: string, topicId: string, name: string, nameEn?: string) => void;
  deleteTopic: (courseId: string, topicId: string) => void;
  addSubtopic: (
    courseId: string,
    topicId: string,
    subtopic: Omit<Subtopic, 'id' | 'topicId' | 'sortOrder'>
  ) => void;
  updateSubtopic: (
    courseId: string,
    topicId: string,
    subtopicId: string,
    subtopic: Partial<Subtopic>
  ) => void;
  deleteSubtopic: (courseId: string, topicId: string, subtopicId: string) => void;

  // Lessons
  lessons: Lesson[];
  addLesson: (lessonData: Omit<Lesson, 'id' | 'createdAt'>) => void;
  updateLesson: (lesson: Lesson) => void;
  deleteLesson: (lessonId: string) => void;

  // Progress Tracking
  progressMap: Record<string, StudentTopicProgress[]>;
  updateStudentTopicStatus: (
    studentId: string,
    subtopicId: string,
    status: StudentTopicProgress['status']
  ) => void;
  updateHomeworkStatus: (homeworkId: string, status: Homework['status'], note?: string) => void;

  // Dedicated Homework Suite
  homeworks: Homework[];
  addHomework: (hw: Omit<Homework, 'id' | 'status' | 'submissions'>) => void;
  updateHomework: (hw: Homework) => void;
  deleteHomework: (hwId: string) => void;
  submitHomework: (submission: Omit<HomeworkSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  gradeHomeworkSubmission: (
    homeworkId: string,
    submissionId: string,
    score: number,
    feedback: string
  ) => void;

  // Video Library
  videos: VideoLesson[];
  addVideo: (video: Omit<VideoLesson, 'id' | 'sortOrder'>) => void;
  deleteVideo: (videoId: string) => void;
  videoProgressMap: Record<string, VideoProgress[]>;
  toggleVideoWatched: (studentId: string, videoId: string) => void;

  // Flashcards (แฟลชการ์ด)
  flashcards: Flashcard[];
  addFlashcard: (card: Omit<Flashcard, 'id'>) => void;
  deleteFlashcard: (cardId: string) => void;
  flashcardProgressMap: Record<string, Record<string, FlashcardProgress>>;
  toggleFlashcardKnown: (studentId: string, cardId: string) => void;

  // Quizzes & Practice (ควิซ & โจทย์แบบฝึกหัด)
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  quizAttempts: QuizAttempt[];
  submitQuizAttempt: (
    quizId: string,
    studentId: string,
    answers: Record<string, number>,
    score: number,
    total: number
  ) => void;

  // Course Materials (เอกสารดาวน์โหลด & ไฟล์เรียน)
  materials: CourseMaterial[];
  addMaterial: (material: Omit<CourseMaterial, 'id' | 'downloadCount' | 'updatedAt'>) => void;
  deleteMaterial: (materialId: string) => void;
  recordDownload: (materialId: string) => void;

  // Active Student Helpers
  activeStudent: UserProfile;
  activeStudentLessons: Lesson[];
  activeStudentProgress: StudentTopicProgress[];
  activeStudentVideoProgress: VideoProgress[];

  // Data reset
  resetAllData: () => void;
}

const STORAGE_KEY_PREFIX = 'maxup_v10_';
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication state - Starts strictly as NULL so user lands on login page!
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}auth_user`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed?.id === 'student_phoom' || parsed?.id === 'student_fah' || parsed?.id === 'student_karn') {
          return null;
        }
        return parsed;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Students list - Starts completely empty (no mock students) as requested by user!
  const [students, setStudents] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}students`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserProfile[];
        return parsed.filter(
          (s) => s.id !== 'student_phoom' && s.id !== 'student_fah' && s.id !== 'student_karn'
        );
      } catch {
        return [];
      }
    }
    return [];
  });

  // Courses (เริ่มที่ เคมี ม.ปลาย & A-Level เสมอ)
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}courses`);
    return saved ? JSON.parse(saved) : ALL_INITIAL_SUBJECTS;
  });

  const [activeCourseId, setActiveCourseId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_course_id`);
    return saved || 'chem_alevel';
  });

  // Lessons
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}lessons`);
    return saved ? JSON.parse(saved) : INITIAL_LESSONS;
  });

  // Homeworks
  const [homeworks, setHomeworks] = useState<Homework[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}homeworks`);
    return saved ? JSON.parse(saved) : INITIAL_HOMEWORKS;
  });

  // Materials (PDFs)
  const [materials, setMaterials] = useState<CourseMaterial[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}materials`);
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  // Videos
  const [videos, setVideos] = useState<VideoLesson[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}videos`);
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [videoProgressMap, setVideoProgressMap] = useState<Record<string, VideoProgress[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}video_progress`);
    return saved ? JSON.parse(saved) : INITIAL_VIDEO_PROGRESS;
  });

  // Flashcards
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}flashcards`);
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [flashcardProgressMap, setFlashcardProgressMap] = useState<
    Record<string, Record<string, FlashcardProgress>>
  >(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}fc_progress`);
    return saved ? JSON.parse(saved) : {};
  });

  // Quizzes
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}quizzes`);
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}quiz_attempts`);
    return saved ? JSON.parse(saved) : [];
  });

  // Progress
  const [progressMap, setProgressMap] = useState<Record<string, StudentTopicProgress[]>>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}progress`);
    return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
  });

  // Persistence to localStorage (Instant, durable and completely stable without layout jitter)
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}auth_user`, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}auth_user`);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}courses`, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}active_course_id`, activeCourseId);
  }, [activeCourseId]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}lessons`, JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}materials`, JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}homeworks`, JSON.stringify(homeworks));
  }, [homeworks]);

  // One-time silent background sync with Firestore (Does not disrupt or jump UI)
  useEffect(() => {
    const syncInit = async () => {
      try {
        // 1. Sync Users from Firestore
        const userSnap = await getDocs(collection(db, 'users'));
        if (userSnap.empty) {
          // Push initial clean seed in background (Only admin, no mock students)
          setDoc(doc(db, 'users', INITIAL_ADMIN.id), INITIAL_ADMIN).catch(() => {});
        } else {
          const remoteStudents: UserProfile[] = [];
          userSnap.forEach((docItem) => {
            const data = docItem.data() as UserProfile;
            // Clean slate: do not load old mock test accounts
            if (data.role === 'student' && data.id !== 'student_phoom' && data.id !== 'student_fah') {
              remoteStudents.push(data);
            }
          });
          setStudents(remoteStudents);
        }

        // 2. Sync Courses from Firestore
        const courseSnap = await getDocs(collection(db, 'courses'));
        if (courseSnap.empty) {
          ALL_INITIAL_SUBJECTS.forEach((c) => {
            setDoc(doc(db, 'courses', c.id), c).catch(() => {});
          });
        } else {
          const remoteCourses: Course[] = [];
          courseSnap.forEach((docItem) => {
            remoteCourses.push(docItem.data() as Course);
          });
          if (remoteCourses.length > 0) {
            setCourses(remoteCourses);
          }
        }
      } catch (e) {
        // Safe offline mode fallback
      }
    };
    syncInit();
  }, []);

  const clearAuthError = () => setAuthError(null);

  // Exact Username & Password Login requested:
  // Teacher: Maxnum / Maxnum
  // Student 1: phoom / 1234 (คอร์สเคมี)
  // Student 2: fah / 1234 (คอร์สเคมี)
  const loginWithUsernameAndPassword = async (identifier: string, pass: string) => {
    setIsAuthLoading(true);
    setAuthError(null);

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. ตรวจสอบคุณครู Max (Username: Maxnum, Password: Maxnum)
    if (
      cleanId === 'maxnum' ||
      cleanId === 'max' ||
      cleanId === 'max@maxup-tutor.com' ||
      cleanId === 'tanadod555@gmail.com'
    ) {
      if (cleanPass === 'Maxnum' || cleanPass === 'maxnum' || cleanPass === '123456') {
        const teacherProfile = {
          ...INITIAL_ADMIN,
          username: 'Maxnum',
          role: 'admin' as const,
        };
        setCurrentUser(teacherProfile);
        setIsAuthLoading(false);
        return;
      } else {
        setIsAuthLoading(false);
        const err = 'รหัสผ่านสำหรับคุณครู Max ไม่ถูกต้อง (รหัสผ่านคือ Maxnum)';
        setAuthError(err);
        throw new Error(err);
      }
    }

    // 2. ตรวจสอบนักเรียนที่สมัครจริง
    let matchedStudent = students.find(
      (s) =>
        (s.username && s.username.toLowerCase() === cleanId) ||
        (s.nickname && s.nickname.toLowerCase() === cleanId)
    );

    // ถ้าไม่พบใน local state ให้ค้นหาจาก Firestore collection 'users' แบบเรียลไทม์
    if (!matchedStudent) {
      try {
        const snap = await getDocs(collection(db, 'users'));
        snap.forEach((docItem) => {
          const u = docItem.data() as UserProfile;
          if (
            u.role === 'student' &&
            u.id !== 'student_phoom' &&
            u.id !== 'student_fah' &&
            ((u.username && u.username.toLowerCase() === cleanId) ||
              (u.nickname && u.nickname.toLowerCase() === cleanId))
          ) {
            matchedStudent = u;
          }
        });
        if (matchedStudent) {
          setStudents((prev) => [matchedStudent!, ...prev.filter((p) => p.id !== matchedStudent!.id)]);
        }
      } catch (err) {
        // Fallback
      }
    }

    if (matchedStudent) {
      const expectedPass = matchedStudent.password || '1234';
      if (cleanPass === expectedPass) {
        setCurrentUser(matchedStudent);
        const primaryCourse = matchedStudent.enrolledCourseIds?.[0] || 'chem_alevel';
        setActiveCourseId(primaryCourse);
        setIsAuthLoading(false);
        return;
      } else {
        setIsAuthLoading(false);
        const err = `รหัสผ่านสำหรับชื่อผู้ใช้ "${matchedStudent.username}" ไม่ถูกต้อง`;
        setAuthError(err);
        throw new Error(err);
      }
    }

    setIsAuthLoading(false);
    const notFoundErr = 'ไม่พบชื่อผู้ใช้งานนี้ หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบหรือสมัครสมาชิกใหม่';
    setAuthError(notFoundErr);
    throw new Error(notFoundErr);
  };

  // Sign up for Students only (with Course selection and Passcode verification)
  const signUpStudent = async (
    fullName: string,
    nickname: string,
    username: string,
    pass: string,
    courseId: string,
    coursePasscode: string,
    extra: Partial<UserProfile> = {}
  ) => {
    setIsAuthLoading(true);
    setAuthError(null);

    const cleanUsername = username.trim().toLowerCase();
    if (cleanUsername === 'maxnum' || cleanUsername === 'max') {
      setIsAuthLoading(false);
      const err = 'ชื่อผู้ใช้นี้ถูกสงวนไว้สำหรับคุณครู Max เท่านั้น';
      setAuthError(err);
      throw new Error(err);
    }

    const isExisting = students.some(
      (s) => s.username?.toLowerCase() === cleanUsername
    );
    if (isExisting) {
      setIsAuthLoading(false);
      const err = 'ชื่อผู้ใช้นี้ถูกใช้งานแล้ว กรุณาเลือกชื่ออื่น';
      setAuthError(err);
      throw new Error(err);
    }

    // ตรวจสอบคอร์สเรียนและรหัสเข้าคอร์ส
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) {
      setIsAuthLoading(false);
      const err = 'กรุณาเลือกคอร์สเรียนที่ต้องการลงทะเบียน';
      setAuthError(err);
      throw new Error(err);
    }

    const expectedPasscode = targetCourse.passcode?.trim().toUpperCase();
    const inputPasscode = coursePasscode.trim().toUpperCase();
    if (expectedPasscode && inputPasscode !== expectedPasscode) {
      setIsAuthLoading(false);
      const err = `รหัสเข้าคอร์ส "${targetCourse.name}" ไม่ถูกต้อง กรุณาตรวจสอบรหัสที่คุณครู Max กำหนดให้`;
      setAuthError(err);
      throw new Error(err);
    }

    const newStudentId = `student_${Date.now()}`;
    const newStudent: UserProfile = {
      id: newStudentId,
      role: 'student',
      fullName: fullName.trim(),
      nickname: nickname.trim(),
      username: username.trim(),
      password: pass.trim(),
      enrolledCourseIds: [courseId],
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      ...extra,
    };

    setStudents((prev) => [newStudent, ...prev]);
    setCurrentUser(newStudent);
    setActiveCourseId(courseId);
    setIsAuthLoading(false);

    // Save to Firestore in background
    setDoc(doc(db, 'users', newStudentId), newStudent).catch(() => {});
  };

  // นักเรียนกรอกรหัสเข้าคอร์สเพื่อเพิ่มวิชาเรียนใหม่เข้าโปรไฟล์ตัวเอง
  const enrollCourseWithPasscode = async (courseId: string, passcode: string): Promise<boolean> => {
    if (!currentUser) return false;
    const targetCourse = courses.find((c) => c.id === courseId);
    if (!targetCourse) throw new Error('ไม่พบคอร์สเรียนนี้ในระบบ');

    const expectedPasscode = targetCourse.passcode?.trim().toUpperCase();
    const inputPasscode = passcode.trim().toUpperCase();
    if (expectedPasscode && inputPasscode !== expectedPasscode) {
      throw new Error(`รหัสเข้าคอร์ส "${targetCourse.name}" ไม่ถูกต้อง กรุณาตรวจสอบกับคุณครู Max`);
    }

    const currentCourses = currentUser.enrolledCourseIds || [];
    if (!currentCourses.includes(courseId)) {
      const updatedEnrolled = [...currentCourses, courseId];
      const updatedStudent: UserProfile = {
        ...currentUser,
        enrolledCourseIds: updatedEnrolled,
      };

      setCurrentUser(updatedStudent);
      setStudents((prev) => prev.map((s) => (s.id === currentUser.id ? updatedStudent : s)));
      setDoc(doc(db, 'users', currentUser.id), updatedStudent).catch(() => {});
    }
    setActiveCourseId(courseId);
    return true;
  };

  // นักเรียนกรอกรหัสเข้าคอร์ส (Passcode) โดยตรงเพื่อค้นหาและเพิ่มคอร์สเข้าโปรไฟล์ทันที
  const enrollByPasscode = async (passcode: string): Promise<Course> => {
    if (!currentUser) throw new Error('กรุณาเข้าสู่ระบบก่อนทำรายการ');
    const cleanPass = passcode.trim().toUpperCase();
    if (!cleanPass) throw new Error('กรุณากรอกรหัสเข้าคอร์ส');

    const matchedCourse = courses.find(
      (c) =>
        (c.passcode && c.passcode.trim().toUpperCase() === cleanPass) ||
        c.code.trim().toUpperCase() === cleanPass
    );

    if (!matchedCourse) {
      throw new Error(`ไม่พบคอร์สที่ตรงกับรหัส "${passcode}" กรุณาตรวจสอบรหัสที่คุณครู Max แจ้ง`);
    }

    const currentCourses = currentUser.enrolledCourseIds || [];
    if (!currentCourses.includes(matchedCourse.id)) {
      const updatedEnrolled = [...currentCourses, matchedCourse.id];
      const updatedStudent: UserProfile = {
        ...currentUser,
        enrolledCourseIds: updatedEnrolled,
      };
      setCurrentUser(updatedStudent);
      setStudents((prev) => prev.map((s) => (s.id === currentUser.id ? updatedStudent : s)));
      setDoc(doc(db, 'users', currentUser.id), updatedStudent).catch(() => {});
    }

    setActiveCourseId(matchedCourse.id);
    return matchedCourse;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}auth_user`);
  };

  // Student CRUD
  const addStudent = (studentData: Omit<UserProfile, 'id' | 'createdAt' | 'role'>) => {
    const newId = `student_${Date.now()}`;
    const newStudent: UserProfile = {
      ...studentData,
      id: newId,
      role: 'student',
      password: studentData.password || '1234',
      enrolledCourseIds: studentData.enrolledCourseIds || ['chem_alevel'],
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setStudents((prev) => [newStudent, ...prev]);
    setDoc(doc(db, 'users', newId), newStudent).catch(() => {});
  };

  const updateStudent = (student: UserProfile) => {
    setStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)));
    setDoc(doc(db, 'users', student.id), student).catch(() => {});
  };

  const deleteStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    deleteDoc(doc(db, 'users', studentId)).catch(() => {});
  };

  // Course Management
  const activeCourse =
    courses.find((c) => c.id === activeCourseId) || courses[0] || ALL_INITIAL_SUBJECTS[0];

  const addCourse = (
    name: string,
    code: string,
    description: string,
    gradeLevel?: string,
    passcode?: string
  ) => {
    const newId = `course_${Date.now()}`;
    const newCourse: Course = {
      id: newId,
      name,
      code,
      description,
      gradeLevel: gradeLevel || 'มัธยมศึกษาตอนปลาย',
      passcode: (passcode || code || 'PASS123').trim().toUpperCase(),
      topics: [],
    };
    setCourses((prev) => [...prev, newCourse]);
    setActiveCourseId(newId);
    setDoc(doc(db, 'courses', newId), newCourse).catch(() => {});
  };

  const updateCourse = (course: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === course.id ? course : c)));
    setDoc(doc(db, 'courses', course.id), course).catch(() => {});
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    if (activeCourseId === courseId && courses.length > 1) {
      const remaining = courses.filter((c) => c.id !== courseId);
      setActiveCourseId(remaining[0].id);
    }
    deleteDoc(doc(db, 'courses', courseId)).catch(() => {});
  };

  const addTopic = (courseId: string, name: string, nameEn?: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopic: Topic = {
            id: `topic_${Date.now()}`,
            subjectId: courseId,
            name,
            nameEn,
            sortOrder: c.topics.length + 1,
            subtopics: [],
          };
          const updated = { ...c, topics: [...c.topics, newTopic] };
          setDoc(doc(db, 'courses', courseId), updated).catch(() => {});
          return updated;
        }
        return c;
      })
    );
  };

  const updateTopic = (courseId: string, topicId: string, name: string, nameEn?: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopics = c.topics.map((t) => {
            if (t.id === topicId) {
              return { ...t, name, nameEn: nameEn !== undefined ? nameEn : t.nameEn };
            }
            return t;
          });
          const updated = { ...c, topics: newTopics };
          setDoc(doc(db, 'courses', courseId), updated).catch(() => {});
          return updated;
        }
        return c;
      })
    );
  };

  const deleteTopic = (courseId: string, topicId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopics = c.topics.filter((t) => t.id !== topicId);
          const updated = { ...c, topics: newTopics };
          setDoc(doc(db, 'courses', courseId), updated).catch(() => {});
          return updated;
        }
        return c;
      })
    );
  };

  const addSubtopic = (
    courseId: string,
    topicId: string,
    subtopicData: Omit<Subtopic, 'id' | 'topicId' | 'sortOrder'>
  ) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopics = c.topics.map((t) => {
            if (t.id === topicId) {
              const newSub: Subtopic = {
                ...subtopicData,
                id: `sub_${Date.now()}`,
                topicId,
                sortOrder: t.subtopics.length + 1,
              };
              return {
                ...t,
                subtopics: [...t.subtopics, newSub],
              };
            }
            return t;
          });
          const updated = { ...c, topics: newTopics };
          setDoc(doc(db, 'courses', courseId), updated).catch(() => {});
          return updated;
        }
        return c;
      })
    );
  };

  const updateSubtopic = (
    courseId: string,
    topicId: string,
    subtopicId: string,
    subtopicData: Partial<Subtopic>
  ) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopics = c.topics.map((t) => {
            if (t.id === topicId) {
              const newSubs = t.subtopics.map((s) => {
                if (s.id === subtopicId) {
                  return { ...s, ...subtopicData };
                }
                return s;
              });
              return { ...t, subtopics: newSubs };
            }
            return t;
          });
          const updated = { ...c, topics: newTopics };
          setDoc(doc(db, 'courses', courseId), updated).catch(() => {});
          return updated;
        }
        return c;
      })
    );
  };

  const deleteSubtopic = (courseId: string, topicId: string, subtopicId: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopics = c.topics.map((t) => {
            if (t.id === topicId) {
              const newSubs = t.subtopics.filter((s) => s.id !== subtopicId);
              return { ...t, subtopics: newSubs };
            }
            return t;
          });
          const updated = { ...c, topics: newTopics };
          setDoc(doc(db, 'courses', courseId), updated).catch(() => {});
          return updated;
        }
        return c;
      })
    );
  };

  // Lessons - Instant local state without layout jumping
  const addLesson = (lessonData: Omit<Lesson, 'id' | 'createdAt'>) => {
    const newId = `les_${Date.now()}`;
    const newLesson: Lesson = {
      ...lessonData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setLessons((prev) => [newLesson, ...prev]);
    setDoc(doc(db, 'lessons', newId), newLesson).catch(() => {});
  };

  const updateLesson = (lesson: Lesson) => {
    setLessons((prev) => prev.map((l) => (l.id === lesson.id ? lesson : l)));
    setDoc(doc(db, 'lessons', lesson.id), lesson).catch(() => {});
  };

  const deleteLesson = (lessonId: string) => {
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    deleteDoc(doc(db, 'lessons', lessonId)).catch(() => {});
  };

  // Progress
  const updateStudentTopicStatus = (
    studentId: string,
    subtopicId: string,
    status: StudentTopicProgress['status']
  ) => {
    setProgressMap((prev) => {
      const studentProgress = prev[studentId] || [];
      const existingIdx = studentProgress.findIndex((p) => p.subtopicId === subtopicId);
      let updated: StudentTopicProgress[];

      if (existingIdx >= 0) {
        updated = studentProgress.map((p, idx) =>
          idx === existingIdx
            ? { ...p, status, lastStudiedDate: new Date().toISOString().split('T')[0] }
            : p
        );
      } else {
        updated = [
          ...studentProgress,
          { subtopicId, status, lastStudiedDate: new Date().toISOString().split('T')[0] },
        ];
      }

      const res = { ...prev, [studentId]: updated };
      setDoc(doc(db, 'progress', studentId), { progress: updated }).catch(() => {});
      return res;
    });
  };

  const updateHomeworkStatus = (
    homeworkId: string,
    status: Homework['status'],
    note?: string
  ) => {
    setLessons((prev) =>
      prev.map((l) => {
        if (l.homework && l.homework.id === homeworkId) {
          const updatedLesson = {
            ...l,
            homework: {
              ...l.homework,
              status,
              submissionNote: note || l.homework.submissionNote,
            },
          };
          setDoc(doc(db, 'lessons', l.id), updatedLesson).catch(() => {});
          return updatedLesson;
        }
        return l;
      })
    );
  };

  // Homework
  const addHomework = (hwData: Omit<Homework, 'id' | 'status' | 'submissions'>) => {
    const newId = `hw_${Date.now()}`;
    const newHw: Homework = {
      ...hwData,
      id: newId,
      status: 'pending',
      submissions: [],
    };
    setHomeworks((prev) => [newHw, ...prev]);
    setDoc(doc(db, 'homeworks', newId), newHw).catch(() => {});
  };

  const updateHomework = (hw: Homework) => {
    setHomeworks((prev) => prev.map((item) => (item.id === hw.id ? hw : item)));
    setDoc(doc(db, 'homeworks', hw.id), hw).catch(() => {});
  };

  const deleteHomework = (hwId: string) => {
    setHomeworks((prev) => prev.filter((item) => item.id !== hwId));
    deleteDoc(doc(db, 'homeworks', hwId)).catch(() => {});
  };

  const submitHomework = (
    subData: Omit<HomeworkSubmission, 'id' | 'submittedAt' | 'status'>
  ) => {
    const submission: HomeworkSubmission = {
      ...subData,
      id: `sub_${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    };

    setHomeworks((prev) =>
      prev.map((hw) => {
        if (hw.id === subData.homeworkId) {
          const existingSubs = hw.submissions || [];
          const updatedSubs = [
            submission,
            ...existingSubs.filter((s) => s.studentId !== subData.studentId),
          ];
          const updatedHw: Homework = {
            ...hw,
            status: 'submitted',
            submissions: updatedSubs,
          };
          setDoc(doc(db, 'homeworks', hw.id), updatedHw).catch(() => {});
          return updatedHw;
        }
        return hw;
      })
    );
  };

  const gradeHomeworkSubmission = (
    homeworkId: string,
    submissionId: string,
    score: number,
    feedback: string
  ) => {
    setHomeworks((prev) =>
      prev.map((hw) => {
        if (hw.id === homeworkId) {
          const updatedSubs = (hw.submissions || []).map((sub) =>
            sub.id === submissionId
              ? { ...sub, score, feedback, status: 'graded' as const }
              : sub
          );
          const updatedHw: Homework = {
            ...hw,
            status: 'graded',
            submissions: updatedSubs,
          };
          setDoc(doc(db, 'homeworks', homeworkId), updatedHw).catch(() => {});
          return updatedHw;
        }
        return hw;
      })
    );
  };

  // Video Management
  const addVideo = (videoData: Omit<VideoLesson, 'id' | 'sortOrder'>) => {
    const newVideo: VideoLesson = {
      ...videoData,
      id: `vid_${Date.now()}`,
      sortOrder: videos.length + 1,
    };
    setVideos((prev) => [...prev, newVideo]);
  };

  const deleteVideo = (videoId: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== videoId));
  };

  const toggleVideoWatched = (studentId: string, videoId: string) => {
    setVideoProgressMap((prev) => {
      const list = prev[studentId] || [];
      const existingIdx = list.findIndex((item) => item.videoId === videoId);
      let updatedList: VideoProgress[];

      if (existingIdx >= 0) {
        const current = list[existingIdx];
        updatedList = list.map((item, idx) =>
          idx === existingIdx
            ? {
                ...item,
                watched: !current.watched,
                watchedAt: !current.watched ? new Date().toISOString().split('T')[0] : undefined,
              }
            : item
        );
      } else {
        updatedList = [
          ...list,
          { videoId, watched: true, watchedAt: new Date().toISOString().split('T')[0] },
        ];
      }
      return { ...prev, [studentId]: updatedList };
    });
  };

  // Flashcards
  const addFlashcard = (cardData: Omit<Flashcard, 'id'>) => {
    const newCard: Flashcard = {
      ...cardData,
      id: `fc_${Date.now()}`,
    };
    setFlashcards((prev) => [...prev, newCard]);
  };

  const deleteFlashcard = (cardId: string) => {
    setFlashcards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const toggleFlashcardKnown = (studentId: string, cardId: string) => {
    setFlashcardProgressMap((prev) => {
      const studentMap = prev[studentId] || {};
      const current = studentMap[cardId];
      const isKnown = current ? !current.known : true;

      return {
        ...prev,
        [studentId]: {
          ...studentMap,
          [cardId]: {
            cardId,
            known: isKnown,
            reviewCount: (current?.reviewCount || 0) + 1,
            lastReviewed: new Date().toISOString().split('T')[0],
          },
        },
      };
    });
  };

  // Quizzes
  const addQuiz = (quizData: Omit<Quiz, 'id'>) => {
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz_${Date.now()}`,
    };
    setQuizzes((prev) => [...prev, newQuiz]);
  };

  const submitQuizAttempt = (
    quizId: string,
    studentId: string,
    answers: Record<string, number>,
    score: number,
    total: number
  ) => {
    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quizId,
      studentId,
      answers,
      score,
      total,
      submittedAt: new Date().toISOString(),
    };
    setQuizAttempts((prev) => [attempt, ...prev]);
  };

  // Materials (PDFs)
  const addMaterial = (
    materialData: Omit<CourseMaterial, 'id' | 'downloadCount' | 'updatedAt'>
  ) => {
    const newId = `mat_${Date.now()}`;
    const newMaterial: CourseMaterial = {
      ...materialData,
      id: newId,
      downloadCount: 0,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setMaterials((prev) => [newMaterial, ...prev]);
    setDoc(doc(db, 'materials', newId), newMaterial).catch(() => {});
  };

  const deleteMaterial = (materialId: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== materialId));
    deleteDoc(doc(db, 'materials', materialId)).catch(() => {});
  };

  const recordDownload = (materialId: string) => {
    setMaterials((prev) =>
      prev.map((m) => {
        if (m.id === materialId) {
          const updated = { ...m, downloadCount: m.downloadCount + 1 };
          setDoc(doc(db, 'materials', materialId), updated).catch(() => {});
          return updated;
        }
        return m;
      })
    );
  };

  const resetAllData = () => {
    localStorage.clear();
    setCourses(ALL_INITIAL_SUBJECTS);
    setStudents(INITIAL_STUDENTS);
    setLessons(INITIAL_LESSONS);
    setProgressMap(INITIAL_PROGRESS);
    setHomeworks(INITIAL_HOMEWORKS);
    setMaterials(INITIAL_MATERIALS);
    window.location.reload();
  };

  // Student active helpers (Defaults to the logged-in student, or first registered student, with clean fallback)
  const fallbackStudent: UserProfile = {
    id: 'placeholder_student',
    role: 'student',
    fullName: 'ยังไม่มีนักเรียนลงทะเบียน',
    nickname: 'นักเรียนใหม่',
    enrolledCourseIds: [activeCourseId],
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0],
  };

  const activeStudent: UserProfile =
    currentUser?.role === 'student'
      ? currentUser
      : students[0] || fallbackStudent;

  const activeStudentLessons = lessons.filter((l) => l.studentId === activeStudent.id);
  const activeStudentProgress = progressMap[activeStudent.id] || [];
  const activeStudentVideoProgress = videoProgressMap[activeStudent.id] || [];

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentUserRole: currentUser?.role || 'student',
        isLoggedIn: !!currentUser,
        isAuthLoading,
        authError,
        clearAuthError,
        loginWithUsernameAndPassword,
        signUpStudent,
        enrollCourseWithPasscode,
        enrollByPasscode,
        logout,

        adminProfile: INITIAL_ADMIN,
        students,
        addStudent,
        updateStudent,
        deleteStudent,

        courses,
        subjects: courses,
        activeCourseId,
        activeSubjectId: activeCourseId,
        setActiveCourseId,
        setActiveSubjectId: setActiveCourseId,
        activeCourse,
        activeSubject: activeCourse,
        addCourse,
        addSubject: addCourse,
        updateCourse,
        updateSubject: updateCourse,
        deleteCourse,
        deleteSubject: deleteCourse,
        addTopic,
        updateTopic,
        deleteTopic,
        addSubtopic,
        updateSubtopic,
        deleteSubtopic,

        lessons,
        addLesson,
        updateLesson,
        deleteLesson,

        progressMap,
        updateStudentTopicStatus,
        updateHomeworkStatus,

        homeworks,
        addHomework,
        updateHomework,
        deleteHomework,
        submitHomework,
        gradeHomeworkSubmission,

        videos,
        addVideo,
        deleteVideo,
        videoProgressMap,
        toggleVideoWatched,

        flashcards,
        addFlashcard,
        deleteFlashcard,
        flashcardProgressMap,
        toggleFlashcardKnown,

        quizzes,
        addQuiz,
        quizAttempts,
        submitQuizAttempt,

        materials,
        addMaterial,
        deleteMaterial,
        recordDownload,

        activeStudent,
        activeStudentLessons,
        activeStudentProgress,
        activeStudentVideoProgress,

        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
