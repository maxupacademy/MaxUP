/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LessonLoggerModal } from './components/admin/LessonLoggerModal';
import { AdminContentSuite } from './components/admin/AdminContentSuite';
import { StudentManager } from './components/admin/StudentManager';
import { StudentDashboard } from './components/student/StudentDashboard';
import { CourseLearningHub } from './components/learning/CourseLearningHub';
import { HomeworkSuite } from './components/homework/HomeworkSuite';
import { LoginView } from './components/auth/LoginView';
import { MaxUpLogo } from './components/brand/MaxUpLogo';
import { Lesson } from './types';
import { BookOpen, Calendar, Shield, GraduationCap, CheckCircle } from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentUser,
    currentUserRole,
    isLoggedIn,
    activeStudent,
    activeStudentLessons,
    activeCourse,
  } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // If not logged in or user explicitly requested login screen
  if (!isLoggedIn || showLoginModal) {
    return (
      <div className="relative">
        {showLoginModal && isLoggedIn && (
          <button
            onClick={() => setShowLoginModal(false)}
            className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all"
          >
            ← กลับสู่ระบบ ({currentUser?.nickname || 'แดชบอร์ด'})
          </button>
        )}
        <LoginView />
      </div>
    );
  }

  const handleOpenAddLesson = () => {
    setEditingLesson(null);
    setIsLessonModalOpen(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsLessonModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF7] text-slate-800 font-['Prompt',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenLessonModal={handleOpenAddLesson}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentUserRole === 'admin' ? (
          <>
            {currentTab === 'overview' && (
              <AdminDashboard
                onOpenLessonModal={handleOpenAddLesson}
                onEditLesson={handleOpenEditLesson}
                onNavigateToSyllabus={() => setCurrentTab('learning-hub')}
                onNavigateToStudents={() => setCurrentTab('students')}
              />
            )}
            {currentTab === 'learning-hub' && <CourseLearningHub />}
            {currentTab === 'admin-suite' && <AdminContentSuite />}
            {currentTab === 'students' && <StudentManager />}
          </>
        ) : (
          <>
            {currentTab === 'home' && (
              <StudentDashboard currentTab={currentTab} setCurrentTab={setCurrentTab} />
            )}
            {currentTab === 'learning-hub' && <CourseLearningHub />}
            {currentTab === 'my-lessons' && (
              <StudentDashboard currentTab="my-lessons" setCurrentTab={setCurrentTab} />
            )}
            {currentTab === 'my-homework' && <HomeworkSuite />}
          </>
        )}
      </main>

      {/* Lesson Logger / Editor Modal */}
      <LessonLoggerModal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        editLesson={editingLesson}
      />

      {/* Footer */}
      <footer className="border-t border-amber-900/10 bg-white/70 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MaxUpLogo size="sm" />
            <span className="text-slate-400">·</span>
            <span>แพลตฟอร์มการเรียนรู้และบันทึกการสอน MaxUp TutorHub</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-900" />
              <span>
                ล็อกอินในชื่อ: {currentUserRole === 'admin' ? 'ครูพี่แม็ก (Admin)' : currentUser?.nickname}
              </span>
            </span>
            <span className="text-slate-400">·</span>
            <span>ระบบบริหารจัดการหลังบ้านครบวงจร</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
