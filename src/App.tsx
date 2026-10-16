/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LessonLoggerModal } from './components/admin/LessonLoggerModal';
import { AdminContentSuite } from './components/admin/AdminContentSuite';
import { StudentManager } from './components/admin/StudentManager';
import { StudentDashboard } from './components/student/StudentDashboard';
import { CourseLearningHub } from './components/learning/CourseLearningHub';
import { SchedulePlannerView } from './components/schedule/SchedulePlannerView';
import { HomeworkSuite } from './components/homework/HomeworkSuite';
import { LoginView } from './components/auth/LoginView';
import { MaxUpLogo } from './components/brand/MaxUpLogo';
import { Lesson } from './types';
import { Shield } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';

const MainContent: React.FC = () => {
  const {
    currentUser,
    currentUserRole,
    isLoggedIn,
  } = useApp();
  const { tx } = useLanguage();

  const [currentTab, setCurrentTab] = useState<string>(() => {
    if (currentUserRole === 'admin') return 'overview';
    return 'home';
  });
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Sync default dashboard tab whenever role changes or user logs in
  useEffect(() => {
    if (isLoggedIn) {
      if (currentUserRole === 'admin') {
        if (currentTab === 'home' || currentTab === 'my-lessons' || !currentTab) {
          setCurrentTab('overview');
        }
      } else {
        if (currentTab === 'overview' || currentTab === 'admin-suite' || currentTab === 'students' || !currentTab) {
          setCurrentTab('home');
        }
      }
    }
  }, [isLoggedIn, currentUserRole]);

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    const targetTab = currentUserRole === 'admin' ? 'overview' : 'home';
    setCurrentTab(targetTab);
  };

  if (!isLoggedIn || showLoginModal) {
    return (
      <div className="relative">
        {showLoginModal && isLoggedIn && (
          <button
            onClick={() => setShowLoginModal(false)}
            className="fixed top-4 left-4 z-50 px-3.5 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all border border-slate-700 backdrop-blur-xs"
          >
            ← {tx('กลับสู่แดชบอร์ด', 'Back to Dashboard')} ({currentUser?.nickname || tx('ผู้ใช้', 'User')})
          </button>
        )}
        <LoginView onLoginSuccess={handleLoginSuccess} />
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
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-['Prompt',sans-serif]">
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
                onNavigateToSchedule={() => setCurrentTab('schedule')}
              />
            )}
            {currentTab === 'learning-hub' && <CourseLearningHub />}
            {currentTab === 'schedule' && <SchedulePlannerView />}
            {currentTab === 'admin-suite' && <AdminContentSuite />}
            {currentTab === 'students' && <StudentManager />}
          </>
        ) : (
          <>
            {(currentTab === 'home' || currentTab === 'my-lessons') && (
              <StudentDashboard currentTab={currentTab} setCurrentTab={setCurrentTab} />
            )}
            {currentTab === 'schedule' && <SchedulePlannerView />}
            {currentTab === 'learning-hub' && <CourseLearningHub initialSubTab="syllabus" />}
            {currentTab === 'my-syllabus' && <CourseLearningHub initialSubTab="syllabus" />}
            {currentTab === 'my-materials' && <CourseLearningHub initialSubTab="materials" />}
            {currentTab === 'my-videos' && <CourseLearningHub initialSubTab="videos" />}
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
      <footer className="border-t border-slate-200/80 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MaxUpLogo size="sm" />
            <span className="text-slate-300">·</span>
            <span>
              {tx(
                'แพลตฟอร์มการเรียนรู้และติดตามการสอน MaxUp Academy',
                'MaxUp Academy Learning & Progress Platform'
              )}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-900" />
              <span>
                {tx('ผู้ใช้งาน:', 'Signed in as:')}{' '}
                <strong className="text-slate-700">
                  {currentUserRole === 'admin'
                    ? tx('ครูพี่แม็ก', 'Coach Max')
                    : currentUser?.nickname}
                </strong>
              </span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppProvider>
          <MainContent />
        </AppProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}
