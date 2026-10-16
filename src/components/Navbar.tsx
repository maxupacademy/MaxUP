import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage, LanguageToggle } from '../context/LanguageContext';
import { MaxUpLogo } from './brand/MaxUpLogo';
import { motion } from 'motion/react';
import {
  PlusCircle,
  LogOut,
  UserCheck,
  LayoutDashboard,
  BookOpen,
  Settings,
  Users,
  Calendar,
  ClipboardList,
  ChevronDown,
  History,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenLessonModal: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenLessonModal,
  onOpenLogin,
}) => {
  const {
    currentUser,
    currentUserRole,
    logout,
    courses,
    activeCourseId,
    setActiveCourseId,
  } = useApp();

  const { tx } = useLanguage();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const adminTabs = [
    { id: 'overview', label: tx('แดชบอร์ด', 'Dashboard'), icon: LayoutDashboard },
    { id: 'schedule', label: tx('ตารางสอน', 'Schedule'), icon: Calendar },
    { id: 'learning-hub', label: tx('คอร์สเรียน', 'Courses'), icon: BookOpen },
    { id: 'admin-suite', label: tx('จัดการเนื้อหา', 'Studio'), icon: Settings },
    { id: 'students', label: tx('นักเรียน', 'Students'), icon: Users },
  ];

  const studentTabs = [
    { id: 'home', label: tx('แดชบอร์ด', 'Dashboard'), icon: LayoutDashboard },
    { id: 'schedule', label: tx('ตารางเรียน', 'Schedule'), icon: Calendar },
    { id: 'learning-hub', label: tx('คอร์สเรียน', 'Courses'), icon: BookOpen },
    { id: 'my-lessons', label: tx('ประวัติเรียน', 'History'), icon: History },
    { id: 'my-homework', label: tx('การบ้าน', 'Homework'), icon: ClipboardList },
  ];

  const tabs = currentUserRole === 'admin' ? adminTabs : studentTabs;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo */}
        <div
          onClick={() => setCurrentTab(currentUserRole === 'admin' ? 'overview' : 'home')}
          className="flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <MaxUpLogo size="sm" showSubtitle={false} />
          <span className="hidden lg:inline-block text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/80">
            TutorHub
          </span>
        </div>

        {/* Center: 21st.dev Tubelight Animated Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-100/90 border border-slate-200/70 rounded-2xl shrink-0">
          {tabs.map((tab) => {
            const isActive =
              currentTab === tab.id ||
              (tab.id === 'learning-hub' &&
                ['my-syllabus', 'my-materials', 'my-videos'].includes(currentTab));
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-slate-900 rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon
                  className={`relative z-10 w-3.5 h-3.5 ${
                    isActive ? 'text-amber-400' : 'text-slate-500'
                  }`}
                />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Course Switcher, Language Switcher, Action & User Profile */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Course Selector */}
          {courses.length > 0 && (
            <div className="relative shrink-0 hidden sm:block">
              <select
                value={activeCourseId}
                onChange={(e) => setActiveCourseId(e.target.value)}
                className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 py-1.5 pl-2.5 pr-6 rounded-xl focus:ring-2 focus:ring-amber-500/40 focus:outline-none cursor-pointer max-w-[160px] truncate transition-colors"
                title={tx('เลือกคอร์สเรียน', 'Select Course')}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Record Lesson button for Admin */}
          {currentUserRole === 'admin' && (
            <button
              onClick={onOpenLessonModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all rounded-xl shadow-2xs whitespace-nowrap cursor-pointer shrink-0"
              title={tx('บันทึกคาบเรียน', 'Log Lesson')}
            >
              <PlusCircle className="w-3.5 h-3.5 text-slate-950" />
              <span className="hidden sm:inline">{tx('บันทึกคาบ', 'Log Lesson')}</span>
            </button>
          )}

          {/* Global TH / EN Switcher */}
          <LanguageToggle variant="light" />

          {/* User Profile Compact Pill with Dropdown */}
          <div className="relative shrink-0" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl transition-colors cursor-pointer text-left"
              title={tx('จัดการบัญชี', 'Account Menu')}
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.nickname}
                  className="w-6 h-6 rounded-lg object-cover border border-slate-300"
                />
              ) : (
                <div
                  className={`w-6 h-6 rounded-lg text-white font-bold flex items-center justify-center text-[10px] shrink-0 ${
                    currentUserRole === 'admin' ? 'bg-slate-900' : 'bg-blue-700'
                  }`}
                >
                  {currentUserRole === 'admin'
                    ? tx('ครู', 'TM')
                    : currentUser?.nickname
                    ? currentUser.nickname.slice(0, 2)
                    : 'ST'}
                </div>
              )}
              <div className="hidden sm:block text-left text-xs leading-none">
                <span className="font-bold text-slate-800 block truncate max-w-[90px]">
                  {currentUser?.nickname ||
                    (currentUserRole === 'admin' ? tx('ครูพี่แม็ก', 'Coach Max') : tx('นักเรียน', 'Student'))}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {currentUserRole === 'admin' ? tx('ติวเตอร์', 'Tutor') : tx('นักเรียน', 'Student')}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2.5 border-b border-slate-100">
                  <div className="font-bold text-slate-900 text-xs">
                    {currentUser?.fullName ||
                      (currentUserRole === 'admin' ? tx('อาจารย์แม็ก', 'Coach Max') : '')}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                    {tx('บัญชี:', 'User:')}{' '}
                    <strong className="text-slate-700">
                      {currentUser?.username || (currentUserRole === 'admin' ? 'Maxnum' : '')}
                    </strong>
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{tx('เชื่อมต่อเรียลไทม์', 'Live Synced')}</span>
                  </div>
                </div>

                <div className="p-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-slate-700" />
                    <span>{tx('สลับบัญชีผู้ใช้', 'Switch Account')}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>{tx('ออกจากระบบ', 'Sign Out')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav Bar */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto no-scrollbar px-3 py-1.5 gap-1.5 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
