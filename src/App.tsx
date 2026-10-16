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
    logout,
  } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Called immediately after successful login โ€” navigate to correct dashboard
  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // Navigate to appropriate start tab based on role
    const role = currentUserRole;
    if (role === 'admin') {
      setCurrentTab('overview');
    } else {
      setCurrentTab('home');
    }
  };

  // If not logged in โ€” show full-page login
  if (!isLoggedIn || showLoginModal) {
    return (
      <div className="relative">
        {showLoginModal && isLoggedIn && (
          <button
            onClick={() => setShowLoginModal(false)}
            className="fixed top-4 right-4 z-50 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md transition-all border border-slate-700"
          >
            โ เธเธฅเธฑเธเธชเธนเนเธฃเธฐเธเธ ({currentUser?.nickname || 'เนเธ”เธเธเธญเธฃเนเธ”'})
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
      <footer className="border-t border-amber-900/10 bg-white/70 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MaxUpLogo size="sm" />
            <span className="text-slate-400">ยท</span>
            <span>เนเธเธฅเธ•เธเธญเธฃเนเธกเธเธฒเธฃเน€เธฃเธตเธขเธเธฃเธนเนเนเธฅเธฐเธเธฑเธเธ—เธถเธเธเธฒเธฃเธชเธญเธ MaxUp TutorHub</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-blue-900" />
              <span>
                เธฅเนเธญเธเธญเธดเธเนเธเธเธทเนเธญ: {currentUserRole === 'admin' ? 'เธเธฃเธนเธเธตเนเนเธกเนเธ (Admin)' : currentUser?.nickname}
              </span>
            </span>
            <span className="text-slate-400">ยท</span>
            <span>เธฃเธฐเธเธเธเธฃเธดเธซเธฒเธฃเธเธฑเธ”เธเธฒเธฃเธซเธฅเธฑเธเธเนเธฒเธเธเธฃเธเธงเธเธเธฃ</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

