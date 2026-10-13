import {
  UserProfile,
  Course,
  Lesson,
  StudentTopicProgress,
  VideoLesson,
  VideoProgress,
  CourseMaterial,
  Homework,
  StudySchedulePlan,
} from '../types';

export const INITIAL_ADMIN: UserProfile = {
  id: 'admin_max',
  role: 'admin',
  fullName: 'อาจารย์แม็ก (MaxUp)',
  nickname: 'ครูพี่แม็ก',
  username: 'Maxnum',
  password: 'Maxnum',
  isActive: true,
  createdAt: '2025-01-01',
};

// All students, courses, syllabus, and records reset to clean slate
export const INITIAL_STUDENTS: UserProfile[] = [];
export const ALL_INITIAL_SUBJECTS: Course[] = [];
export const INITIAL_LESSONS: Lesson[] = [];
export const INITIAL_HOMEWORKS: Homework[] = [];
export const INITIAL_MATERIALS: CourseMaterial[] = [];
export const INITIAL_VIDEOS: VideoLesson[] = [];
export const INITIAL_SCHEDULE_PLANS: StudySchedulePlan[] = [];
export const INITIAL_PROGRESS: Record<string, StudentTopicProgress[]> = {};
export const INITIAL_VIDEO_PROGRESS: Record<string, VideoProgress[]> = {};
