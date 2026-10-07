import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MaxUpLogo } from './brand/MaxUpLogo';
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
  Layers,
  GraduationCap,
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

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown on outside click
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
    { id: 'overview', label: 'ภาพรวม', icon: LayoutDashboard },
    { id: 'learning-hub', label: 'คอร์ส & สื่อเรียน', icon: BookOpen },
    { id: 'admin-suite', label: 'จัดการเนื้อหา', icon: Settings },
    { id: 'students', label: 'นักเรียน', icon: Users },
  ];

  const studentTabs = [
    { id: 'home', label: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'learning-hub', label: 'คอร์ส & สื่อเรียน', icon: BookOpen },
    { id: 'my-lessons', label: 'ประวัติเรียน', icon: Calendar },
    { id: 'my-homework', label: 'การบ้าน', icon: ClipboardList },
  ];

  const tabs = currentUserRole === 'admin' ? adminTabs : studentTabs;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-amber-900/10 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-15 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <MaxUpLogo size="sm" showSubtitle={false} />
          <span className="hidden lg:inline-block text-[11px] font-semibold text-amber-800/80 bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-200/50">
            TutorHub
          </span>
        </div>

        {/* Center: Desktop Navigation Pills (never wrap) */}
        <nav className="hidden md:flex items-center gap-1 shrink-0">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-amber-100/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Course Switcher & User Profile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Quick Course Selector */}
          <div className="relative shrink-0">
            <select
              value={activeCourseId}
              onChange={(e) => setActiveCourseId(e.target.value)}
              className="bg-white border border-amber-200 text-xs font-medium text-slate-800 py-1.5 pl-2 pr-6 rounded-xl shadow-2xs focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-[130px] sm:max-w-[180px] truncate"
              title="เลือกคอร์สเรียน"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Record Lesson button for Admin */}
          {currentUserRole === 'admin' && (
            <button
              onClick={onOpenLessonModal}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 active:scale-98 transition-all rounded-xl shadow-xs whitespace-nowrap cursor-pointer shrink-0"
              title="บันทึกคาบเรียนใหม่"
            >
              <PlusCircle className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">บันทึกคาบ</span>
            </button>
          )}

          {/* User Profile Compact Pill with Dropdown */}
          <div className="relative shrink-0" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 bg-amber-50/90 hover:bg-amber-100/80 border border-amber-200 rounded-xl transition-colors cursor-pointer text-left"
              title="โปรไฟล์และจัดการบัญชี"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.nickname}
                  className="w-6 h-6 rounded-lg object-cover border border-amber-300"
                />
              ) : (
                <div
                  className={`w-6 h-6 rounded-lg text-white font-bold flex items-center justify-center text-[10px] shrink-0 ${
                    currentUserRole === 'admin' ? 'bg-blue-900' : 'bg-amber-600'
                  }`}
                >
                  {currentUserRole === 'admin' ? 'ครู' : currentUser?.nickname.slice(0, 2) || 'ST'}
                </div>
              )}
              <div className="hidden sm:block text-left text-xs leading-none">
                <span className="font-bold text-slate-800 block truncate max-w-[100px]">
                  {currentUser?.nickname || (currentUserRole === 'admin' ? 'ครูพี่แม็ก' : 'ผู้ใช้งาน')}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold block flex items-center gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  {currentUserRole === 'admin' ? 'ติวเตอร์ (Admin)' : 'นักเรียน'}
                </span>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-2xl shadow-lg border border-amber-900/10 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2.5 border-b border-slate-100">
                  <div className="font-bold text-slate-900 text-xs">
                    {currentUser?.fullName || (currentUserRole === 'admin' ? 'อาจารย์แม็ก (MaxUp)' : '')}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                    ชื่อผู้ใช้: <strong className="text-slate-700">{currentUser?.username || (currentUserRole === 'admin' ? 'Maxnum' : '')}</strong>
                  </div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Firebase Real-time Connected</span>
                  </div>
                </div>

                <div className="p-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-amber-50 hover:text-blue-900 rounded-xl transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-blue-900" />
                    <span>สลับ / เข้าสู่ระบบบัญชีอื่น</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>ออกจากระบบ (Sign Out)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav Bar (Horizontal Scroll, zero wrapping) */}
      <div className="md:hidden flex overflow-x-auto no-scrollbar px-3 py-1.5 gap-1.5 border-t border-amber-900/5 bg-[#FFFDF7]">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-blue-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-amber-100/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
