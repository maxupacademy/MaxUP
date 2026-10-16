import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { SyllabusManager } from '../admin/SyllabusManager';
import { VideoLibraryView } from '../video/VideoLibraryView';
import { CourseMaterialsView } from './CourseMaterialsView';
import { HomeworkSuite } from '../homework/HomeworkSuite';
import { motion } from 'motion/react';
import {
  BookOpen,
  Play,
  Download,
  ClipboardList,
  KeyRound,
  Copy,
  Check,
  Lock,
  AlertCircle,
} from 'lucide-react';

interface CourseLearningHubProps {
  initialSubTab?: 'syllabus' | 'videos' | 'materials' | 'homework';
}

export const CourseLearningHub: React.FC<CourseLearningHubProps> = ({
  initialSubTab = 'syllabus',
}) => {
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    currentUserRole,
    currentUser,
    enrollCourseWithPasscode,
  } = useApp();

  const { tx } = useLanguage();

  const [currentSubTab, setCurrentSubTab] = useState<
    'syllabus' | 'videos' | 'materials' | 'homework'
  >(initialSubTab);

  const [copied, setCopied] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [enrollMsg, setEnrollMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const isEnrolled =
    currentUserRole === 'admin' ||
    (currentUser?.enrolledCourseIds || []).includes(activeCourseId);

  const handleQuickEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) return;
    setEnrollMsg(null);

    try {
      await enrollCourseWithPasscode(activeCourseId, passcodeInput.trim());
      setEnrollMsg({
        type: 'success',
        text: tx(
          `ลงทะเบียนคอร์ส "${activeCourse.name}" สำเร็จแล้ว`,
          `Enrolled in "${activeCourse.name}"`
        ),
      });
      setPasscodeInput('');
    } catch (err: any) {
      setEnrollMsg({
        type: 'error',
        text: err.message || tx('รหัสเข้าคอร์สไม่ถูกต้อง', 'Invalid passcode'),
      });
    }
  };

  const handleCopyPasscode = () => {
    if (!activeCourse.passcode) return;
    navigator.clipboard.writeText(activeCourse.passcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subTabs = [
    { id: 'syllabus', label: tx('สารบัญและเอกสาร', 'Syllabus & Sheets'), icon: BookOpen },
    { id: 'videos', label: tx('วิดีโอทบทวน', 'Videos'), icon: Play },
    { id: 'materials', label: tx('คลังเอกสาร', 'Materials'), icon: Download },
    { id: 'homework', label: tx('การบ้าน', 'Homework'), icon: ClipboardList },
  ];

  if (courses.length === 0) {
    return (
      <div className="bg-white border border-slate-200/90 rounded-3xl p-10 text-center space-y-4 max-w-lg mx-auto shadow-2xs animate-in fade-in">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center mx-auto text-2xl font-bold">
          📚
        </div>
        <h2 className="text-lg font-bold text-slate-800">
          {tx('ยังไม่มีคอร์สเรียนในระบบ', 'No courses available yet')}
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          {currentUserRole === 'admin'
            ? tx(
                'สามารถไปที่เมนูจัดการเนื้อหาเพื่อเริ่มสร้างคอร์สและร่างบทเรียนได้ทันที',
                'Open the Studio tab to create your first course and syllabus.'
              )
            : tx(
                'ครูแม็กกำลังเตรียมหลักสูตรคอร์สเรียนใหม่ กรุณารอสักครู่ครับ',
                'Coach Max is preparing new courses. Please check back soon.'
              )}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Course Banner & 21st.dev Segmented Learning Sub-tabs */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-black flex items-center justify-center text-xs shrink-0 shadow-xs">
              {activeCourse.code.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {activeCourse.name}
                </h1>
                <span className="text-[11px] font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                  {activeCourse.code}
                </span>

                {/* Status or Passcode Badge */}
                {currentUserRole === 'admin' ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-2.5 py-0.5 rounded-lg">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tx('รหัสเข้าคอร์ส:', 'Passcode:')}</span>
                    <strong className="font-mono text-emerald-950 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">
                      {activeCourse.passcode || 'MATH01'}
                    </strong>
                    <button
                      type="button"
                      onClick={handleCopyPasscode}
                      className="ml-1 text-[11px] text-emerald-700 hover:text-emerald-900 underline flex items-center gap-0.5 cursor-pointer"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copied ? tx('คัดลอกแล้ว', 'Copied') : tx('คัดลอก', 'Copy')}</span>
                    </button>
                  </div>
                ) : isEnrolled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>{tx('ลงทะเบียนแล้ว', 'Enrolled')}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>{tx('ยังไม่ลงทะเบียน', 'Locked')}</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                {activeCourse.description}
              </p>
            </div>
          </div>

          {/* Quick Course Switcher Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              {tx('คอร์ส:', 'Course:')}
            </span>
            <select
              value={activeCourseId}
              onChange={(e) => {
                setActiveCourseId(e.target.value);
                setEnrollMsg(null);
              }}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-800 focus:ring-2 focus:ring-amber-500/40 focus:outline-none cursor-pointer"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* If student is viewing a course they haven't enrolled in */}
        {!isEnrolled && currentUserRole === 'student' && (
          <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">
                  {tx(
                    `ยังไม่ได้ลงทะเบียนในวิชา "${activeCourse.name}"`,
                    `You are not enrolled in "${activeCourse.name}"`
                  )}
                </span>
                <p className="text-slate-600 text-[11px]">
                  {tx(
                    'กรอกรหัสเข้าคอร์สที่ครูแม็กแจ้งเพื่อปลดล็อกวิชานี้',
                    'Enter the course passcode from Coach Max to unlock this course'
                  )}
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickEnroll} className="flex items-center gap-1.5 w-full sm:w-auto">
              <input
                type="text"
                placeholder={tx('รหัสคอร์ส', 'Passcode')}
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="bg-white border border-amber-300 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold uppercase text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-36"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl whitespace-nowrap cursor-pointer text-xs"
              >
                {tx('+ ปลดล็อกคอร์ส', '+ Unlock')}
              </button>
            </form>
          </div>
        )}

        {enrollMsg && (
          <div
            className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
              enrollMsg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {enrollMsg.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            )}
            <span>{enrollMsg.text}</span>
          </div>
        )}

        {/* 21st.dev Animated Segmented Sub-tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/90 border border-slate-200/70 rounded-2xl overflow-x-auto w-fit max-w-full">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentSubTab(tab.id as typeof currentSubTab)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="learning-hub-subtab"
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
        </div>
      </div>

      {/* Render Selected Learning View */}
      {currentSubTab === 'syllabus' && <SyllabusManager />}
      {currentSubTab === 'videos' && <VideoLibraryView />}
      {currentSubTab === 'materials' && <CourseMaterialsView />}
      {currentSubTab === 'homework' && <HomeworkSuite />}
    </div>
  );
};
