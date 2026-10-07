import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SyllabusManager } from '../admin/SyllabusManager';
import { VideoLibraryView } from '../video/VideoLibraryView';
import { FlashcardsView } from './FlashcardsView';
import { QuizPracticeView } from './QuizPracticeView';
import { CourseMaterialsView } from './CourseMaterialsView';
import { HomeworkSuite } from '../homework/HomeworkSuite';
import {
  BookOpen,
  Play,
  Layers,
  HelpCircle,
  Download,
  GraduationCap,
  Sparkles,
  ClipboardList,
  KeyRound,
  Copy,
  Check,
  Lock,
  Unlock,
  AlertCircle,
} from 'lucide-react';

interface CourseLearningHubProps {
  initialSubTab?: 'syllabus' | 'videos' | 'flashcards' | 'quizzes' | 'materials' | 'homework';
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

  const [currentSubTab, setCurrentSubTab] = useState<
    'syllabus' | 'videos' | 'flashcards' | 'quizzes' | 'materials' | 'homework'
  >(initialSubTab);

  const [copied, setCopied] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [enrollMsg, setEnrollMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const isEnrolled =
    currentUserRole === 'admin' ||
    (currentUser?.enrolledCourseIds || []).includes(activeCourseId);

  const handleQuickEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) return;
    setEnrollMsg(null);

    try {
      await enrollCourseWithPasscode(activeCourseId, passcodeInput.trim());
      setEnrollMsg({ type: 'success', text: `ลงทะเบียนคอร์ส "${activeCourse.name}" สำเร็จแล้ว!` });
      setPasscodeInput('');
    } catch (err: any) {
      setEnrollMsg({ type: 'error', text: err.message || 'รหัสเข้าคอร์สไม่ถูกต้อง' });
    }
  };

  const handleCopyPasscode = () => {
    if (!activeCourse.passcode) return;
    navigator.clipboard.writeText(activeCourse.passcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subTabs = [
    { id: 'syllabus', label: 'สารบัญ & ไฟล์เรียน PDF', icon: BookOpen },
    { id: 'videos', label: 'วิดีโอ YouTube', icon: Play },
    { id: 'flashcards', label: 'แฟลชการ์ด', icon: Layers },
    { id: 'quizzes', label: 'ควิซ & ข้อสอบ', icon: HelpCircle },
    { id: 'materials', label: 'คลังเอกสาร & สรุป', icon: Download },
    { id: 'homework', label: 'การบ้าน & ส่งงาน', icon: ClipboardList },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Course Banner & Segmented Learning Sub-tabs */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-xs">
              {activeCourse.code.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {activeCourse.name}
                </h1>
                <span className="text-[11px] font-mono font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                  {activeCourse.code}
                </span>

                {/* Status or Passcode Badge */}
                {currentUserRole === 'admin' ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/90 px-2.5 py-0.5 rounded-lg">
                    <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                    <span>รหัสเข้าคอร์สสำหรับบอกนักเรียน:</span>
                    <strong className="font-mono text-emerald-950 font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-300">
                      {activeCourse.passcode || 'CHEM68'}
                    </strong>
                    <button
                      type="button"
                      onClick={handleCopyPasscode}
                      className="ml-1 text-[11px] text-emerald-700 hover:text-emerald-900 underline flex items-center gap-0.5 cursor-pointer"
                      title="คัดลอกรหัสเข้าคอร์ส"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
                    </button>
                  </div>
                ) : isEnrolled ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>ลงทะเบียนแล้ว</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>ยังไม่ได้ลงทะเบียน</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{activeCourse.description}</p>
            </div>
          </div>

          {/* Quick Course Switcher Dropdown */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
              สลับคอร์ส:
            </span>
            <select
              value={activeCourseId}
              onChange={(e) => {
                setActiveCourseId(e.target.value);
                setEnrollMsg(null);
              }}
              className="bg-[#FFFDF7] border border-amber-200 text-xs font-semibold rounded-xl px-3 py-1.5 text-slate-800 shadow-2xs focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* If student is viewing a course they haven't enrolled in, show clear enroll bar */}
        {!isEnrolled && currentUserRole === 'student' && (
          <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900">
                  คุณยังไม่ได้ลงทะเบียนในวิชา "{activeCourse.name}"
                </span>
                <p className="text-slate-600 text-[11px]">
                  กรอกรหัสเข้าคอร์สที่คุณครู Max แจ้งเพื่อเพิ่มวิชานี้เข้าสู่โปรไฟล์ของคุณ
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickEnroll} className="flex items-center gap-1.5 w-full sm:w-auto">
              <input
                type="text"
                placeholder="กรอกรหัส เช่น CHEM68"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="bg-white border border-amber-300 rounded-xl px-2.5 py-1.5 text-xs font-mono font-bold uppercase text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-36"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl whitespace-nowrap cursor-pointer shadow-2xs text-xs"
              >
                + ปลดล็อกคอร์ส
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

        {/* Spacious Learning Sub-tabs (Clean segmented pill design) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSubTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCurrentSubTab(tab.id as typeof currentSubTab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? 'text-amber-300'
                      : tab.id === 'videos'
                      ? 'text-red-500'
                      : tab.id === 'flashcards'
                      ? 'text-amber-600'
                      : tab.id === 'quizzes'
                      ? 'text-blue-700'
                      : 'text-emerald-600'
                  }`}
                />
                <span style={tab.id === 'homework' ? { width: '100.45px' } : undefined}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Learning View */}
      {currentSubTab === 'syllabus' && <SyllabusManager />}
      {currentSubTab === 'videos' && <VideoLibraryView />}
      {currentSubTab === 'flashcards' && <FlashcardsView />}
      {currentSubTab === 'quizzes' && <QuizPracticeView />}
      {currentSubTab === 'materials' && <CourseMaterialsView />}
      {currentSubTab === 'homework' && <HomeworkSuite />}
    </div>
  );
};
