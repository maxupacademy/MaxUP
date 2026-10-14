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
  StudySchedulePlan,
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
  INITIAL_SCHEDULE_PLANS,
  INITIAL_MATERIALS,
  INITIAL_HOMEWORKS,
} from '../data/initialData';
import { COURSE_MATH_JUNIOR } from '../data/mathJuniorCourse';
import { db } from '../lib/firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';

const deepCleanSanitize = (val: any): any => {
  if (val === undefined) return null;
  if (val === null || typeof val !== 'object') return val;
  if (Array.isArray(val)) {
    return val.map(deepCleanSanitize);
  }
  const cleaned: Record<string, any> = {};
  for (const [k, v] of Object.entries(val)) {
    if (v !== undefined) {
      cleaned[k] = deepCleanSanitize(v);
    }
  }
  return cleaned;
};

const safeSetDoc = (docRef: any, data: any) => {
  try {
    const sanitized = deepCleanSanitize(data);
    return setDoc(docRef, sanitized).catch((err) => {
      console.warn('Firestore offline note:', err);
    });
  } catch (err) {
    console.warn('Firestore serialize note:', err);
    return Promise.resolve();
  }
};

const safeDeleteDoc = (docRef: any) => {
  try {
    return deleteDoc(docRef).catch((err) => {
      console.warn('Firestore delete note:', err);
    });
  } catch (err) {
    return Promise.resolve();
  }
};


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
    status: StudentTopicProgress['status'],
    handwrittenSolutionUrl?: string
  ) => void;
  adjustStudentTopicCount: (studentId: string, subtopicId: string, delta: number) => void;
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

  // Study Schedule & Planning (ตารางเรียน & แผนสอนล่วงหน้า)
  schedulePlans: StudySchedulePlan[];
  addSchedulePlan: (plan: Omit<StudySchedulePlan, 'id' | 'createdAt'>) => void;
  updateSchedulePlan: (plan: StudySchedulePlan) => void;
  deleteSchedulePlan: (planId: string) => void;
  toggleSchedulePlanStatus: (
    planId: string,
    status: 'upcoming' | 'completed' | 'cancelled'
  ) => void;
  completeSchedulePlanAndLogLesson: (
    planId: string,
    customData?: Partial<Lesson>
  ) => void;
  submitSchedulePaymentSlip: (
    planId: string,
    slipUrl: string,
    note?: string
  ) => void;
  confirmSchedulePayment: (
    planId: string,
    confirmed: boolean
  ) => void;
  teacherPromptPay: {
    number: string;
    name: string;
    qrUrl?: string;
  };
  setTeacherPromptPay: (data: { number: string; name: string; qrUrl?: string }) => void;

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
  resetToDefaultMathJuniorCourse: () => Promise<void>;
}

const STORAGE_KEY_PREFIX = 'maxup_v19_math_';
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

  // Courses (คอร์สคณิตศาสตร์ ม.ต้น MATH_JUNIOR_FUNDENMENTAL_01 และคอร์สอื่นๆ)
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}courses`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Course[];
        const validCourses = parsed.filter(
          (c) =>
            c.id !== 'chem_alevel' &&
            c.id !== 'math_junior' &&
            c.id !== 'phys_senior' &&
            c.id !== 'sci_junior' &&
            c.id !== 'course_1791903632912'
        );
        const mathJuniorIdx = validCourses.findIndex(
          (c) => c.id === 'MATH_JUNIOR_FUNDENMENTAL_01' || c.code === 'MATH_JUNIOR_FUNDENMENTAL_01'
        );
        if (mathJuniorIdx !== -1) {
          if (!validCourses[mathJuniorIdx].topics || validCourses[mathJuniorIdx].topics.length < 10) {
            validCourses[mathJuniorIdx] = COURSE_MATH_JUNIOR;
          }
          return validCourses;
        }
        return [COURSE_MATH_JUNIOR, ...validCourses];
      } catch {
        return ALL_INITIAL_SUBJECTS;
      }
    }
    return ALL_INITIAL_SUBJECTS;
  });

  const [activeCourseId, setActiveCourseId] = useState<string>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}active_course_id`);
    if (
      saved &&
      saved !== 'chem_alevel' &&
      saved !== 'math_junior' &&
      saved !== 'course_1791903632912'
    ) {
      return saved;
    }
    return 'MATH_JUNIOR_FUNDENMENTAL_01';
  });

  // Keep activeCourseId synchronized with available courses
  useEffect(() => {
    if (courses.length > 0 && !courses.some((c) => c.id === activeCourseId)) {
      setActiveCourseId(courses[0].id);
    }
  }, [courses, activeCourseId]);

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

  // Study Schedule Plans (ตารางเรียนและวางแผนล่วงหน้า)
  const [schedulePlans, setSchedulePlans] = useState<StudySchedulePlan[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}schedules`);
    return saved ? JSON.parse(saved) : INITIAL_SCHEDULE_PLANS;
  });

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}schedules`, JSON.stringify(schedulePlans));
  }, [schedulePlans]);

  // Teacher PromptPay Settings
  const [teacherPromptPay, setTeacherPromptPayState] = useState<{
    number: string;
    name: string;
    qrUrl?: string;
  }>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY_PREFIX}teacher_promptpay`);
    return saved
      ? JSON.parse(saved)
      : {
          number: '0812345678',
          name: 'อาจารย์แม็ก (MaxUp)',
          qrUrl: '',
        };
  });

  const setTeacherPromptPay = (data: { number: string; name: string; qrUrl?: string }) => {
    setTeacherPromptPayState(data);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}teacher_promptpay`, JSON.stringify(data));
    setDoc(doc(db, 'settings', 'promptpay'), data).catch(() => {});
  };

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

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}progress`, JSON.stringify(progressMap));
  }, [progressMap]);

  // Realtime background sync with Firestore for all collections (Lessons, Progress, Schedules, Users, Courses, Homeworks, Materials, Settings)
  useEffect(() => {
    // 1. Realtime Lessons Listener (Auto updates student & teacher dashboards instantly)
    const unsubLessons = onSnapshot(
      collection(db, 'lessons'),
      (snapshot) => {
        const remoteLessons: Lesson[] = [];
        snapshot.forEach((docItem) => {
          remoteLessons.push(docItem.data() as Lesson);
        });
        remoteLessons.sort((a, b) => (b.lessonDate || '').localeCompare(a.lessonDate || ''));
        setLessons(remoteLessons);
      },
      (err) => console.warn('Lessons realtime note:', err)
    );

    // 2. Realtime Student Progress Listener (Auto updates checklist & study counts)
    const unsubProgress = onSnapshot(
      collection(db, 'progress'),
      (snapshot) => {
        const remoteProgress: Record<string, StudentTopicProgress[]> = {};
        snapshot.forEach((docItem) => {
          const data = docItem.data();
          if (data && Array.isArray(data.progress)) {
            remoteProgress[docItem.id] = data.progress;
          }
        });
        if (Object.keys(remoteProgress).length > 0) {
          setProgressMap((prev) => ({ ...prev, ...remoteProgress }));
        }
      },
      (err) => console.warn('Progress realtime note:', err)
    );

    // 3. Realtime Schedules & Payment Plans Listener
    const unsubSchedules = onSnapshot(
      collection(db, 'schedules'),
      (snapshot) => {
        const remoteSchedules: StudySchedulePlan[] = [];
        snapshot.forEach((docItem) => {
          remoteSchedules.push(docItem.data() as StudySchedulePlan);
        });
        setSchedulePlans(remoteSchedules);
      },
      (err) => console.warn('Schedules realtime note:', err)
    );

    // 4. Realtime Users Listener (Students & Accounts)
    const unsubUsers = onSnapshot(
      collection(db, 'users'),
      (snapshot) => {
        if (snapshot.empty) {
          safeSetDoc(doc(db, 'users', INITIAL_ADMIN.id), INITIAL_ADMIN);
        } else {
          const remoteStudents: UserProfile[] = [];
          snapshot.forEach((docItem) => {
            const data = docItem.data() as UserProfile;
            if (data.role === 'student' && data.id !== 'student_phoom' && data.id !== 'student_fah') {
              remoteStudents.push(data);
            }
          });
          setStudents(remoteStudents);
        }
      },
      (err) => console.warn('Users realtime note:', err)
    );

    // 5. Realtime Courses Listener
    const unsubCourses = onSnapshot(
      collection(db, 'courses'),
      (snapshot) => {
        if (!snapshot.empty) {
          const remoteCourses: Course[] = [];
          snapshot.forEach((docItem) => {
            const data = docItem.data() as Course;
            if (
              data &&
              data.id &&
              data.id !== 'chem_alevel' &&
              data.id !== 'math_junior' &&
              data.id !== 'phys_senior' &&
              data.id !== 'sci_junior' &&
              data.id !== 'course_1791903632912'
            ) {
              remoteCourses.push(data);
            }
          });

          const mathJuniorIdx = remoteCourses.findIndex(
            (c) => c.id === 'MATH_JUNIOR_FUNDENMENTAL_01' || c.code === 'MATH_JUNIOR_FUNDENMENTAL_01'
          );

          let finalCourses = remoteCourses;
          if (mathJuniorIdx === -1) {
            finalCourses = [COURSE_MATH_JUNIOR, ...remoteCourses];
            safeSetDoc(doc(db, 'courses', COURSE_MATH_JUNIOR.id), COURSE_MATH_JUNIOR);
          } else {
            if (
              !finalCourses[mathJuniorIdx].topics ||
              finalCourses[mathJuniorIdx].topics.length < 10
            ) {
              finalCourses[mathJuniorIdx] = COURSE_MATH_JUNIOR;
              safeSetDoc(doc(db, 'courses', COURSE_MATH_JUNIOR.id), COURSE_MATH_JUNIOR);
            }
          }

          if (finalCourses.length > 0) {
            setCourses(finalCourses);
          }
        } else {
          safeSetDoc(doc(db, 'courses', COURSE_MATH_JUNIOR.id), COURSE_MATH_JUNIOR);
          setCourses([COURSE_MATH_JUNIOR]);
        }
      },
      (err) => console.warn('Courses realtime note:', err)
    );

    // 6. Realtime Homeworks Listener
    const unsubHomeworks = onSnapshot(
      collection(db, 'homeworks'),
      (snapshot) => {
        const remoteHw: Homework[] = [];
        snapshot.forEach((docItem) => {
          remoteHw.push(docItem.data() as Homework);
        });
        setHomeworks(remoteHw);
      },
      (err) => console.warn('Homeworks realtime note:', err)
    );

    // 7. Realtime Course Materials Listener
    const unsubMaterials = onSnapshot(
      collection(db, 'materials'),
      (snapshot) => {
        const remoteMats: CourseMaterial[] = [];
        snapshot.forEach((docItem) => {
          remoteMats.push(docItem.data() as CourseMaterial);
        });
        setMaterials(remoteMats);
      },
      (err) => console.warn('Materials realtime note:', err)
    );

    // 8. Realtime PromptPay Settings Listener
    const unsubPromptPay = onSnapshot(
      doc(db, 'settings', 'promptpay'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && data.number) {
            setTeacherPromptPay({
              number: data.number || '0812345678',
              name: data.name || 'อาจารย์แม็ก (MaxUp)',
              qrUrl: data.qrUrl || '',
            });
          }
        }
      },
      (err) => console.warn('PromptPay realtime note:', err)
    );

    return () => {
      unsubLessons();
      unsubProgress();
      unsubSchedules();
      unsubUsers();
      unsubCourses();
      unsubHomeworks();
      unsubMaterials();
      unsubPromptPay();
    };
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
        const primaryCourse =
          matchedStudent.enrolledCourseIds?.[0] &&
          matchedStudent.enrolledCourseIds[0] !== 'chem_alevel'
            ? matchedStudent.enrolledCourseIds[0]
            : 'MATH_JUNIOR_FUNDENMENTAL_01';
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
      enrolledCourseIds: studentData.enrolledCourseIds || ['MATH_JUNIOR_FUNDENMENTAL_01'],
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
  const fallbackCourse: Course = {
    id: 'draft_starter',
    name: 'ร่างคอร์สเรียนใหม่',
    code: 'DRAFT',
    gradeLevel: 'ม.ปลาย',
    description: 'ยังไม่มีคอร์สเรียนในระบบ คุณครู Max สามารถเริ่มสร้างและร่างสารบัญบทเรียนได้ทันที',
    passcode: 'MAXUP1',
    topics: [],
  };

  const activeCourse =
    courses.find((c) => c.id === activeCourseId) || courses[0] || fallbackCourse;

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
    safeSetDoc(doc(db, 'courses', newId), newCourse);
  };

  const updateCourse = (course: Course) => {
    setCourses((prev) => prev.map((c) => (c.id === course.id ? course : c)));
    safeSetDoc(doc(db, 'courses', course.id), course);
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => {
      const remaining = prev.filter((c) => c.id !== courseId);
      if (activeCourseId === courseId) {
        setActiveCourseId(remaining[0]?.id || '');
      }
      return remaining;
    });
    safeDeleteDoc(doc(db, 'courses', courseId));
  };

  const addTopic = (courseId: string, name: string, nameEn?: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const newTopic: Topic = {
            id: `topic_${Date.now()}`,
            subjectId: courseId,
            name,
            nameEn: nameEn || '',
            sortOrder: c.topics.length + 1,
            subtopics: [],
          };
          const updated = { ...c, topics: [...c.topics, newTopic] };
          safeSetDoc(doc(db, 'courses', courseId), updated);
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
              return { ...t, name, nameEn: nameEn !== undefined ? nameEn : (t.nameEn || '') };
            }
            return t;
          });
          const updated = { ...c, topics: newTopics };
          safeSetDoc(doc(db, 'courses', courseId), updated);
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
          safeSetDoc(doc(db, 'courses', courseId), updated);
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
              const parentSub = subtopicData.parentId
                ? t.subtopics.find((s) => s.id === subtopicData.parentId)
                : undefined;
              const calculatedLevel: 1 | 2 | 3 = subtopicData.level
                ? subtopicData.level
                : parentSub
                ? ((Math.min(3, (parentSub.level || 1) + 1)) as 1 | 2 | 3)
                : 1;

              const newSub: Subtopic = {
                ...subtopicData,
                id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
                topicId,
                parentId: subtopicData.parentId,
                level: calculatedLevel,
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
          safeSetDoc(doc(db, 'courses', courseId), updated);
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
          safeSetDoc(doc(db, 'courses', courseId), updated);
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
              // Delete subtopic and any nested descendants
              const toDelete = new Set<string>([subtopicId]);
              // Find children
              t.subtopics.forEach((s) => {
                if (s.parentId && toDelete.has(s.parentId)) {
                  toDelete.add(s.id);
                }
              });
              // Find grand-children (level 3)
              t.subtopics.forEach((s) => {
                if (s.parentId && toDelete.has(s.parentId)) {
                  toDelete.add(s.id);
                }
              });

              const newSubs = t.subtopics.filter((s) => !toDelete.has(s.id));
              return { ...t, subtopics: newSubs };
            }
            return t;
          });
          const updated = { ...c, topics: newTopics };
          safeSetDoc(doc(db, 'courses', courseId), updated);
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
      subtopicIds: lessonData.subtopicIds || [],
      contentDetail: lessonData.contentDetail || '',
      durationMinutes: lessonData.durationMinutes || 0,
      createdAt: new Date().toISOString(),
    };
    setLessons((prev) => [newLesson, ...prev]);
    safeSetDoc(doc(db, 'lessons', newId), newLesson);

    // อัปเดตความคืบหน้าของสารบัญหัวข้อ (Syllabus) ให้นักเรียนทันที พร้อมบันทึกจำนวนครั้งที่เรียนและเฉลยลายมือ
    if (newLesson.subtopicIds && newLesson.subtopicIds.length > 0 && newLesson.studentId) {
      newLesson.subtopicIds.forEach((subId) => {
        updateStudentTopicStatus(
          newLesson.studentId,
          subId,
          'completed',
          newLesson.handwrittenSolutionUrl
        );
      });
    }
  };

  const updateLesson = (lesson: Lesson) => {
    const safeLesson: Lesson = {
      ...lesson,
      subtopicIds: lesson.subtopicIds || [],
      contentDetail: lesson.contentDetail || '',
      durationMinutes: lesson.durationMinutes || 0,
    };
    setLessons((prev) => prev.map((l) => (l.id === safeLesson.id ? safeLesson : l)));
    safeSetDoc(doc(db, 'lessons', safeLesson.id), safeLesson);

    if (safeLesson.subtopicIds && safeLesson.subtopicIds.length > 0 && safeLesson.studentId) {
      safeLesson.subtopicIds.forEach((subId) => {
        updateStudentTopicStatus(
          safeLesson.studentId,
          subId,
          'completed',
          safeLesson.handwrittenSolutionUrl
        );
      });
    }
  };

  const deleteLesson = (lessonId: string) => {
    const lessonToDelete = lessons.find((l) => l.id === lessonId);
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    safeDeleteDoc(doc(db, 'lessons', lessonId));

    if (lessonToDelete && lessonToDelete.studentId && (lessonToDelete.subtopicIds || []).length > 0) {
      const studentId = lessonToDelete.studentId;
      const remainingLessonsForStudent = lessons.filter(
        (l) => l.id !== lessonId && l.studentId === studentId
      );

      setProgressMap((prev) => {
        const studentProgress = prev[studentId] || [];
        const updated = studentProgress.map((p) => {
          if ((lessonToDelete.subtopicIds || []).includes(p.subtopicId)) {
            const countInRemaining = remainingLessonsForStudent.filter(
              (l) => (l.subtopicIds || []).includes(p.subtopicId)
            ).length;

            return {
              ...p,
              studyCount: countInRemaining,
              status: (countInRemaining > 0 ? 'completed' : 'not_started') as StudentTopicProgress['status'],
            };
          }
          return p;
        });

        safeSetDoc(doc(db, 'progress', studentId), { progress: updated });
        return { ...prev, [studentId]: updated };
      });
    }
  };

  // Progress Tracking: บันทึกสถานะเรียนแล้ว และนับจำนวนครั้งที่เรียนซ้ำ
  const updateStudentTopicStatus = (
    studentId: string,
    subtopicId: string,
    status: StudentTopicProgress['status'],
    handwrittenSolutionUrl?: string
  ) => {
    setProgressMap((prev) => {
      const studentProgress = prev[studentId] || [];
      const existingIdx = studentProgress.findIndex((p) => p.subtopicId === subtopicId);
      let updated: StudentTopicProgress[];

      if (existingIdx >= 0) {
        const existing = studentProgress[existingIdx];
        const newCount = (existing.studyCount || 1) + (status === 'completed' ? 1 : 0);
        updated = studentProgress.map((p, idx) =>
          idx === existingIdx
            ? {
                ...p,
                status,
                studyCount: newCount,
                lastStudiedDate: new Date().toISOString().split('T')[0],
                handwrittenSolutionUrl: handwrittenSolutionUrl || p.handwrittenSolutionUrl,
              }
            : p
        );
      } else {
        updated = [
          ...studentProgress,
          {
            subtopicId,
            status,
            studyCount: 1,
            lastStudiedDate: new Date().toISOString().split('T')[0],
            handwrittenSolutionUrl,
          },
        ];
      }

      const res = { ...prev, [studentId]: updated };
      safeSetDoc(doc(db, 'progress', studentId), { progress: updated });
      return res;
    });
  };

  const adjustStudentTopicCount = (
    studentId: string,
    subtopicId: string,
    delta: number
  ) => {
    setProgressMap((prev) => {
      const studentProgress = prev[studentId] || [];
      const existingIdx = studentProgress.findIndex((p) => p.subtopicId === subtopicId);
      let updated: StudentTopicProgress[];

      if (existingIdx >= 0) {
        const existing = studentProgress[existingIdx];
        const newCount = Math.max(0, (existing.studyCount || 1) + delta);
        const newStatus =
          newCount > 0
            ? existing.status === 'not_started'
              ? 'completed'
              : existing.status
            : 'not_started';
        updated = studentProgress.map((p, idx) =>
          idx === existingIdx
            ? {
                ...p,
                studyCount: newCount,
                status: newStatus,
                lastStudiedDate: new Date().toISOString().split('T')[0],
              }
            : p
        );
      } else {
        const newCount = Math.max(0, 1 + delta);
        updated = [
          ...studentProgress,
          {
            subtopicId,
            status: newCount > 0 ? 'completed' : 'not_started',
            studyCount: newCount,
            lastStudiedDate: new Date().toISOString().split('T')[0],
          },
        ];
      }

      const res = { ...prev, [studentId]: updated };
      safeSetDoc(doc(db, 'progress', studentId), { progress: updated });
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

  // Study Schedule & Planning (ตารางเรียน & แผนสอนล่วงหน้า)
  const addSchedulePlan = (planData: Omit<StudySchedulePlan, 'id' | 'createdAt'>) => {
    const newId = `sch_${Date.now()}`;
    const newPlan: StudySchedulePlan = {
      ...planData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setSchedulePlans((prev) => [newPlan, ...prev]);
    safeSetDoc(doc(db, 'schedules', newId), newPlan);

    // If added directly with status === 'completed' (e.g. past class / already taught)
    if (newPlan.status === 'completed') {
      setTimeout(() => {
        completeSchedulePlanAndLogLesson(newId);
      }, 50);
    }
  };

  const updateSchedulePlan = (plan: StudySchedulePlan) => {
    setSchedulePlans((prev) => prev.map((p) => (p.id === plan.id ? plan : p)));
    safeSetDoc(doc(db, 'schedules', plan.id), plan);

    if (plan.status === 'completed') {
      setTimeout(() => {
        completeSchedulePlanAndLogLesson(plan.id);
      }, 50);
    }
  };

  const deleteSchedulePlan = (planId: string) => {
    setSchedulePlans((prev) => prev.filter((p) => p.id !== planId));
    safeDeleteDoc(doc(db, 'schedules', planId));
  };

  const completeSchedulePlanAndLogLesson = (
    planId: string,
    customData?: Partial<Lesson>
  ) => {
    const plan = schedulePlans.find((p) => p.id === planId);
    if (!plan) return;

    // 1. Mark schedule plan as completed in state and Firestore
    const updatedPlan: StudySchedulePlan = { ...plan, status: 'completed' };
    setSchedulePlans((prev) =>
      prev.map((p) => (p.id === planId ? updatedPlan : p))
    );
    safeSetDoc(doc(db, 'schedules', planId), updatedPlan);

    // 2. Identify target students
    let targetStudentIds: string[] = [];
    if (plan.studentId && plan.studentId !== 'all') {
      targetStudentIds = [plan.studentId];
    } else {
      const enrolled = students.filter(
        (st) => (st.enrolledCourseIds || []).includes(plan.courseId)
      );
      if (enrolled.length > 0) {
        targetStudentIds = enrolled.map((s) => s.id);
      } else if (students.length > 0) {
        targetStudentIds = [students[0].id];
      }
    }

    // 3. For each target student, create or sync lesson and update topic progress
    const subIds = plan.plannedSubtopicIds || [];
    targetStudentIds.forEach((stId) => {
      const existingLesson = lessons.find(
        (l) =>
          l.studentId === stId &&
          l.lessonDate === plan.date &&
          (l.startTime === plan.startTime || (l.teacherNote && l.teacherNote.includes(planId)))
      );

      if (!existingLesson) {
        const newLessonId = `les_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const durationMin = Math.round((plan.durationHours || 2) * 60);
        const newLesson: Lesson = {
          id: newLessonId,
          studentId: stId,
          subjectId: plan.courseId,
          lessonDate: plan.date,
          startTime: plan.startTime,
          endTime: plan.endTime,
          durationMinutes: durationMin,
          subtopicIds: subIds,
          contentDetail: plan.plannedContentDescription || plan.title,
          score: 5,
          scoreScale: '1-5',
          teacherNote: `บันทึกคาบเรียนจากตารางแผนการสอน [${planId}]`,
          googleDriveUrl: plan.googleDriveUrl,
          createdAt: new Date().toISOString(),
          ...customData,
        };

        setLessons((prev) => [newLesson, ...prev]);
        safeSetDoc(doc(db, 'lessons', newLessonId), newLesson);
      }

      // Update student topic progress for all subtopics in this plan
      if (subIds.length > 0) {
        subIds.forEach((subId) => {
          updateStudentTopicStatus(stId, subId, 'completed');
        });
      }
    });
  };

  const toggleSchedulePlanStatus = (
    planId: string,
    status: 'upcoming' | 'completed' | 'cancelled'
  ) => {
    if (status === 'completed') {
      completeSchedulePlanAndLogLesson(planId);
      return;
    }

    setSchedulePlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, status } : p))
    );
    const existing = schedulePlans.find((p) => p.id === planId);
    if (existing) {
      safeSetDoc(doc(db, 'schedules', planId), { ...existing, status });
    }
  };

  const submitSchedulePaymentSlip = (
    planId: string,
    slipUrl: string,
    note?: string
  ) => {
    const slipUploadedAt = new Date().toISOString();
    setSchedulePlans((prev) =>
      prev.map((p) =>
        p.id === planId
          ? {
              ...p,
              paymentStatus: 'slip_uploaded',
              paymentSlipUrl: slipUrl,
              paymentSlipNote: note || '',
              slipUploadedAt,
            }
          : p
      )
    );
    const existing = schedulePlans.find((p) => p.id === planId);
    if (existing) {
      safeSetDoc(doc(db, 'schedules', planId), {
        ...existing,
        paymentStatus: 'slip_uploaded',
        paymentSlipUrl: slipUrl,
        paymentSlipNote: note || '',
        slipUploadedAt,
      });
    }
  };

  const confirmSchedulePayment = (planId: string, confirmed: boolean) => {
    const paidAt = confirmed ? new Date().toISOString() : undefined;
    const newStatus: StudySchedulePlan['paymentStatus'] = confirmed ? 'paid' : 'pending';
    setSchedulePlans((prev) =>
      prev.map((p) =>
        p.id === planId
          ? {
              ...p,
              paymentStatus: newStatus,
              confirmedByTeacher: confirmed,
              paidAt,
            }
          : p
      )
    );
    const existing = schedulePlans.find((p) => p.id === planId);
    if (existing) {
      safeSetDoc(doc(db, 'schedules', planId), {
        ...existing,
        paymentStatus: newStatus,
        confirmedByTeacher: confirmed,
        paidAt,
      });
    }
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

  const resetToDefaultMathJuniorCourse = async () => {
    try {
      const snap = await getDocs(collection(db, 'courses'));
      for (const d of snap.docs) {
        if (d.id !== COURSE_MATH_JUNIOR.id) {
          await deleteDoc(doc(db, 'courses', d.id));
        }
      }
      await safeSetDoc(doc(db, 'courses', COURSE_MATH_JUNIOR.id), COURSE_MATH_JUNIOR);
    } catch {
      // offline fallback
    }

    setCourses([COURSE_MATH_JUNIOR]);
    setActiveCourseId(COURSE_MATH_JUNIOR.id);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}courses`, JSON.stringify([COURSE_MATH_JUNIOR]));
    localStorage.setItem(`${STORAGE_KEY_PREFIX}active_course_id`, COURSE_MATH_JUNIOR.id);
  };

  const resetAllData = () => {
    localStorage.clear();
    setCourses([COURSE_MATH_JUNIOR]);
    setActiveCourseId(COURSE_MATH_JUNIOR.id);
    setStudents([]);
    setLessons([]);
    setProgressMap({});
    setHomeworks([]);
    setMaterials([]);
    setVideos([]);
    setSchedulePlans([]);
    safeSetDoc(doc(db, 'courses', COURSE_MATH_JUNIOR.id), COURSE_MATH_JUNIOR);
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
        adjustStudentTopicCount,
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

        schedulePlans,
        addSchedulePlan,
        updateSchedulePlan,
        deleteSchedulePlan,
        toggleSchedulePlanStatus,
        completeSchedulePlanAndLogLesson,
        submitSchedulePaymentSlip,
        confirmSchedulePayment,
        teacherPromptPay,
        setTeacherPromptPay,

        materials,
        addMaterial,
        deleteMaterial,
        recordDownload,

        activeStudent,
        activeStudentLessons,
        activeStudentProgress,
        activeStudentVideoProgress,

        resetAllData,
        resetToDefaultMathJuniorCourse,
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
