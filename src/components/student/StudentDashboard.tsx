import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  BookOpen,
  Award,
  Calendar,
  CheckCircle,
  FileText,
  AlertCircle,
  ChevronRight,
  Sparkles,
  KeyRound,
  Plus,
  Check,
  ExternalLink,
  FolderOpen,
  CalendarDays,
  ChevronLeft,
  CreditCard,
} from 'lucide-react';
import { PromptPayPaymentModal } from '../payment/PromptPayPaymentModal';
import { StudySchedulePlan } from '../../types';

interface StudentDashboardProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentTab,
  setCurrentTab,
}) => {
  const {
    activeStudent,
    activeStudentLessons,
    activeStudentProgress,
    activeSubject,
    updateHomeworkStatus,
    courses,
    activeCourseId,
    setActiveCourseId,
    currentUser,
    enrollByPasscode,
    schedulePlans,
  } = useApp();

  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(
    activeStudentLessons[0]?.id || null
  );

  const [calViewDate, setCalViewDate] = useState<Date>(new Date());
  const [selectedCalDate, setSelectedCalDate] = useState<string | null>(null);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<StudySchedulePlan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);

  const [passcodeInput, setPasscodeInput] = useState('');
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [enrollSuccess, setEnrollSuccess] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnrollPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) return;
    setEnrollError(null);
    setEnrollSuccess(null);
    setIsEnrolling(true);

    try {
      const addedCourse = await enrollByPasscode(passcodeInput.trim());
      setEnrollSuccess(`เพิ่มคอร์ส "${addedCourse.name}" เข้าโปรไฟล์เรียบร้อยแล้ว!`);
      setPasscodeInput('');
    } catch (err: any) {
      setEnrollError(err.message || 'รหัสเข้าคอร์สไม่ถูกต้อง');
    } finally {
      setIsEnrolling(false);
    }
  };

  // Statistics
  const totalMinutes = activeStudentLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const totalLessons = activeStudentLessons.length;
  const avgScore =
    totalLessons > 0
      ? (
          activeStudentLessons.reduce(
            (acc, l) => acc + (l.scoreScale === '1-5' ? l.score * 20 : l.score),
            0
          ) / totalLessons
        ).toFixed(0)
      : '0';

  const totalSubtopics =
    activeSubject?.topics?.reduce((acc, t) => acc + (t.subtopics?.length || 0), 0) || 0;
  const completedCount = activeStudentProgress.filter(
    (p) => p.status === 'completed' || p.status === 'mastered'
  ).length;
  const syllabusPercent =
    totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;

  // Pending homework
  const pendingHomeworkList = activeStudentLessons
    .filter((l) => l.homework && l.homework.status === 'pending')
    .map((l) => l.homework!);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Student Mascot Header Banner */}
      <section className="bg-gradient-to-br from-amber-50 via-[#FFF9EE] to-blue-50 border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-100/80 px-3 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ยินดีต้อนรับสู่ MaxUp TutorHub</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              สู้ๆ นะครับ {activeStudent?.nickname}! 🚀
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed">
              เป้าหมาย: <strong className="text-blue-900">{activeStudent?.targetFaculty || activeStudent?.targetExam}</strong>{' '}
              ({activeStudent?.school}) ความคืบหน้าในวิชา {activeSubject.name} สำเร็จไปแล้ว{' '}
              <strong className="text-amber-700">{syllabusPercent}%</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2 justify-center md:justify-start">
              <button
                onClick={() => setCurrentTab('my-lessons')}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                ประวัติเรียน ({totalLessons} คาบ)
              </button>
              <button
                onClick={() => setCurrentTab('my-syllabus')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all"
              >
                สารบัญคอร์ส ({completedCount}/{totalSubtopics})
              </button>
              <button
                onClick={() => setCurrentTab('schedule')}
                className="px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                📅 ตารางเรียนล่วงหน้า
              </button>
              <button
                onClick={() => setCurrentTab('my-materials')}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                📥 โหลดไฟล์เรียน
              </button>
              <button
                onClick={() => setCurrentTab('my-videos')}
                className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                ▶️ วิดีโอ YouTube
              </button>
              <button
                onClick={() => setCurrentTab('my-homework')}
                className="px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                📝 การบ้าน & ส่งงาน
              </button>
            </div>
          </div>

          {/* Student Goal & Encouragement Badge */}
          <div className="flex-shrink-0 bg-white/90 border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col items-center justify-center text-center min-w-[200px]">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-800 flex items-center justify-center font-bold text-xl mb-2">
              🎯
            </div>
            <div className="text-xs font-bold text-slate-800">
              เป้าหมาย: {activeStudent?.targetExam || 'เตรียมสอบ A-Level / ม.ปลาย'}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 max-w-[180px]">
              {activeStudent?.targetFaculty
                ? `คณะ ${activeStudent.targetFaculty}`
                : `สะสมชั่วโมงเรียนไปแล้ว ${totalHours} ชม.`}
            </div>
          </div>
        </div>
      </section>

      {/* Quantitative Metric Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">ชั่วโมงเรียนสะสม</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {totalHours}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>ชั่วโมงกับอาจารย์แม็ก</span>
          </div>
        </div>

        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">จำนวนคาบที่เรียน</span>
            <BookOpen className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {totalLessons}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>คาบเรียนเข้มข้น</span>
          </div>
        </div>

        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">ความเข้าใจเฉลี่ย</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {avgScore}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>ประเมินโดยติวเตอร์</span>
          </div>
        </div>

        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">สารบัญที่ครอบคลุม</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {syllabusPercent}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{completedCount} จาก {totalSubtopics} หัวข้อย่อย</span>
          </div>
        </div>
      </section>

      {/* Main Content Split: Lessons Timeline + Pending Homework / Syllabus Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Lesson Calendar & Lesson History Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Student Dashboard Calendar & Planned Syllabus Topics */}
          {(() => {
            const myPlans = schedulePlans
              .filter((plan) => {
                const isForMe =
                  plan.studentId === 'all' ||
                  plan.studentId === (activeStudent?.id || currentUser?.id);
                const isForMyCourse =
                  plan.courseId === activeCourseId ||
                  (currentUser?.enrolledCourseIds || []).includes(plan.courseId);
                return isForMe && isForMyCourse;
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            const upcomingCount = myPlans.filter((p) => p.status === 'upcoming').length;

            const calYear = calViewDate.getFullYear();
            const calMonth = calViewDate.getMonth();
            const firstDayIdx = new Date(calYear, calMonth, 1).getDay();
            const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
            const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();
            const todayStr = new Date().toISOString().split('T')[0];

            const focusedDate = selectedCalDate || myPlans.find((p) => p.status === 'upcoming')?.date || todayStr;
            const focusedPlans = myPlans.filter((p) => p.date === focusedDate);

            return (
              <section className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-1">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-700" />
                      <span>ปฏิทินตารางเรียน & แผนการสอน (Lesson Calendar)</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      ตารางเรียนล่วงหน้า & หัวข้อที่ต้องเตรียมตัว
                    </h2>
                    <p className="text-xs text-slate-500">
                      กำหนดการเรียนและหัวข้อ Syllabus ที่คุณครู Max วางแผนจะสอนในแต่ละคาบ
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60">
                      ตามแผน {upcomingCount} คาบ
                    </span>
                    <button
                      onClick={() => setCurrentTab('schedule')}
                      className="px-3 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                    >
                      <span>ดูเต็มจอ</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Calendar Layout: Month Grid + Scheduled Slot Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left Column: Mini Month Calendar Grid */}
                  <div className="md:col-span-6 bg-[#FFFDF7] border border-amber-200/70 rounded-2xl p-4 space-y-3">
                    {/* Month Nav */}
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCalViewDate(new Date(calYear, calMonth - 1, 1))}
                        className="p-1 rounded-lg hover:bg-amber-100 text-slate-600 transition-colors cursor-pointer"
                        title="เดือนก่อนหน้า"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        <span>
                          {[
                            'มกราคม',
                            'กุมภาพันธ์',
                            'มีนาคม',
                            'เมษายน',
                            'พฤษภาคม',
                            'มิถุนายน',
                            'กรกฎาคม',
                            'สิงหาคม',
                            'กันยายน',
                            'ตุลาคม',
                            'พฤศจิกายน',
                            'ธันวาคม',
                          ][calMonth]}{' '}
                          {calYear + 543}
                        </span>
                      </div>

                      <button
                        onClick={() => setCalViewDate(new Date(calYear, calMonth + 1, 1))}
                        className="p-1 rounded-lg hover:bg-amber-100 text-slate-600 transition-colors cursor-pointer"
                        title="เดือนถัดไป"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Weekday headers */}
                    <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 pb-1 border-b border-amber-100">
                      <span className="text-red-500">อา.</span>
                      <span>จ.</span>
                      <span>อ.</span>
                      <span>พ.</span>
                      <span>พฤ.</span>
                      <span>ศ.</span>
                      <span className="text-blue-600">ส.</span>
                    </div>

                    {/* Days Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {/* Leading days from previous month */}
                      {Array.from({ length: firstDayIdx }).map((_, idx) => {
                        const dayNum = daysInPrevMonth - firstDayIdx + 1 + idx;
                        return (
                          <div
                            key={`prev-${dayNum}`}
                            className="h-8 rounded-lg flex items-center justify-center text-[11px] text-slate-300"
                          >
                            {dayNum}
                          </div>
                        );
                      })}

                      {/* Current month days */}
                      {Array.from({ length: daysInMonth }).map((_, idx) => {
                        const day = idx + 1;
                        const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const dayPlans = myPlans.filter((p) => p.date === dateStr);
                        const hasPlans = dayPlans.length > 0;
                        const isToday = todayStr === dateStr;
                        const isSelected = focusedDate === dateStr;

                        return (
                          <button
                            type="button"
                            key={dateStr}
                            onClick={() => setSelectedCalDate(dateStr)}
                            className={`h-8 rounded-lg text-xs font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-blue-900 text-white shadow-2xs ring-2 ring-amber-400'
                                : isToday
                                ? 'bg-amber-100 text-amber-950 font-bold'
                                : hasPlans
                                ? 'bg-blue-50 text-blue-900 hover:bg-blue-100 font-bold'
                                : 'text-slate-700 hover:bg-amber-50/80'
                            }`}
                          >
                            <span>{day}</span>
                            {hasPlans && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                                  isSelected ? 'bg-amber-300' : 'bg-blue-600'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-amber-100">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                        <span>วันที่มีคาบเรียน</span>
                      </span>
                      {selectedCalDate && (
                        <button
                          onClick={() => setSelectedCalDate(null)}
                          className="text-blue-900 hover:underline cursor-pointer"
                        >
                          แสดงทั้งหมด
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Scheduled Lesson Slot Details & Syllabus Topics */}
                  <div className="md:col-span-6 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-900" />
                          <span>
                            {selectedCalDate
                              ? `คาบเรียนวันที่ ${new Date(selectedCalDate).toLocaleDateString('th-TH', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}`
                              : 'คาบเรียนตามแผนที่กำลังจะถึง'}
                          </span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {selectedCalDate ? `${focusedPlans.length} คาบ` : `${myPlans.length} คาบทั้งหมด`}
                        </span>
                      </div>

                      {/* Display Focused Plans or Upcoming Plans */}
                      {(selectedCalDate ? focusedPlans : myPlans.slice(0, 3)).length === 0 ? (
                        <div className="p-6 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
                          <div className="text-2xl">📅</div>
                          <p className="text-xs text-slate-600 font-semibold">
                            {selectedCalDate
                              ? 'ไม่มีคาบเรียนในวันที่เลือก'
                              : 'ยังไม่มีตารางเรียนที่กำหนดไว้'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            คุณครู Max จะอัปเดตวันเวลาและหัวข้อที่จะสอนล่วงหน้าให้น้องทราบที่นี่ครับ
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {(selectedCalDate ? focusedPlans : myPlans.slice(0, 3)).map((plan) => {
                            const isDone = plan.status === 'completed';
                            const course = courses.find((c) => c.id === plan.courseId);

                            // Find planned subtopics from course
                            const allCourseSubtopics = (course || activeSubject)?.topics?.flatMap(
                              (t) => t.subtopics
                            ) || [];
                            const matchedSubtopics = allCourseSubtopics.filter((sub) =>
                              plan.plannedSubtopicIds?.includes(sub.id)
                            );

                            return (
                              <div
                                key={plan.id}
                                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                                  isDone
                                    ? 'bg-emerald-50/30 border-emerald-200'
                                    : 'bg-[#FFFDF7] border-amber-200/80 hover:border-amber-400'
                                }`}
                              >
                                {/* Top Badge: Date, Time & Status */}
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1">
                                      <Calendar className="w-3 h-3 text-blue-700" />
                                      {new Date(plan.date).toLocaleDateString('th-TH', {
                                        weekday: 'short',
                                        day: 'numeric',
                                        month: 'short',
                                      })}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-amber-700" />
                                      {plan.startTime} - {plan.endTime} ({plan.durationHours} ชม.)
                                    </span>
                                  </div>

                                  <span
                                    className={`px-2 py-0.2 rounded-full text-[10px] font-bold shrink-0 ${
                                      isDone
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-900'
                                    }`}
                                  >
                                    {isDone ? '✓ เรียนแล้ว' : '⏳ ตามแผน'}
                                  </span>
                                </div>

                                {/* Title */}
                                <div>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                    {plan.title}
                                  </h4>
                                  {course && (
                                    <span className="text-[10px] text-slate-500 font-medium">
                                      วิชา: {course.name}
                                    </span>
                                  )}
                                </div>

                                {/* Assigned Syllabus Topics from Active Course */}
                                {(matchedSubtopics.length > 0 || plan.plannedContentDescription) && (
                                  <div className="bg-white border border-amber-100 rounded-lg p-2 space-y-1">
                                    <div className="text-[10px] font-bold text-blue-900 flex items-center gap-1">
                                      <BookOpen className="w-3 h-3 text-blue-800" />
                                      <span>หัวข้อ Syllabus ที่ต้องเตรียมตัว:</span>
                                    </div>

                                    {matchedSubtopics.length > 0 && (
                                      <div className="flex flex-wrap gap-1">
                                        {matchedSubtopics.map((sub) => (
                                          <span
                                            key={sub.id}
                                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200/80 text-[10px] font-semibold"
                                          >
                                            <span>•</span>
                                            <span>{sub.name}</span>
                                          </span>
                                        ))}
                                      </div>
                                    )}

                                    {plan.plannedContentDescription && (
                                      <p className="text-[11px] text-slate-700 font-medium leading-snug">
                                        {plan.plannedContentDescription}
                                      </p>
                                    )}
                                  </div>
                                )}

                                {/* Preparation Note */}
                                {plan.preparationNote && (
                                  <div className="text-[11px] text-amber-900 bg-amber-50/90 border border-amber-200/60 rounded-lg p-2 flex items-start gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-semibold block text-[10px]">
                                        เตือนเตรียมตัวก่อนเข้าเรียน:
                                      </span>
                                      <span>{plan.preparationNote}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Google Drive Study Material Link */}
                                {plan.googleDriveUrl && (
                                  <div>
                                    <a
                                      href={plan.googleDriveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                                    >
                                      <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>เปิดเอกสารชีทเรียนใน Google Drive</span>
                                      <ExternalLink className="w-3 h-3 text-emerald-500 ml-0.5" />
                                    </a>
                                  </div>
                                )}

                                {/* Payment & PromptPay Strip */}
                                {plan.priceAmount !== undefined && plan.priceAmount > 0 && (
                                  <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-blue-50/70 to-amber-50/50 border border-blue-200/80 rounded-xl text-xs gap-2">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <CreditCard className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                                      <span className="font-bold text-slate-900 font-mono text-xs">
                                        ฿{plan.priceAmount.toLocaleString()}
                                      </span>
                                      <span
                                        className={`px-2 py-0.2 rounded-full text-[10px] font-bold shrink-0 ${
                                          plan.paymentStatus === 'paid'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : plan.paymentStatus === 'slip_uploaded'
                                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                            : 'bg-amber-100 text-amber-900'
                                        }`}
                                      >
                                        {plan.paymentStatus === 'paid'
                                          ? '✓ ชำระแล้ว'
                                          : plan.paymentStatus === 'slip_uploaded'
                                          ? '🔔 แนบสลิปแล้ว (รอครูตรวจ)'
                                          : 'รอชำระเงิน'}
                                      </span>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedPaymentPlan(plan);
                                        setIsPaymentModalOpen(true);
                                      }}
                                      className="px-2.5 py-1 text-[11px] font-bold text-blue-900 hover:text-white bg-white hover:bg-blue-900 border border-blue-200 rounded-lg transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1"
                                    >
                                      {plan.paymentStatus === 'paid'
                                        ? 'ดูสลิปที่ยืนยันแล้ว'
                                        : plan.paymentStatus === 'slip_uploaded'
                                        ? 'ดูสลิป / ส่งใหม่'
                                        : 'สแกน QR จ่าย / แนบสลิป'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setCurrentTab('schedule')}
                        className="w-full py-2 text-center text-xs font-bold text-blue-900 hover:text-blue-800 bg-blue-50/60 hover:bg-blue-100/60 border border-blue-200/60 rounded-xl transition-all cursor-pointer"
                      >
                        เปิดดูตารางเรียนทั้งหมดแบบเต็มจอ (Schedule Planner) →
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* Lesson Logs Timeline */}
          <section className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">ไทม์ไลน์บันทึกการเรียน (Lesson Logs)</h2>
                <p className="text-xs text-slate-500">บันทึกเนื้อหาการสอนและการบ้านรายคาบ</p>
              </div>
              <span className="text-xs font-medium text-slate-500">
                {activeStudentLessons.length} บันทึก
              </span>
            </div>

            {activeStudentLessons.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-amber-50/20">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 mt-1">ยังไม่มีบันทึกคาบเรียนสำหรับคุณ</p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-amber-200">
                {activeStudentLessons.map((les) => {
                  const isExpanded = expandedLessonId === les.id;
                  const durationHours = (les.durationMinutes / 60).toFixed(1);

                  return (
                    <div key={les.id} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-4 border-amber-600 shadow-xs flex items-center justify-center" />

                      <div className="bg-[#FFFDF7]/70 border border-amber-900/10 rounded-xl p-4 transition-all hover:border-amber-400 space-y-2.5">
                        <div
                          onClick={() => setExpandedLessonId(isExpanded ? null : les.id)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 font-mono tabular-nums flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-amber-700" />
                              {les.lessonDate}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-600 font-mono tabular-nums">
                              {les.startTime}–{les.endTime} ({durationHours} ชม.)
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                              คะแนน: {les.scoreScale === '1-5' ? `${les.score}/5 ⭐` : `${les.score}/100`}
                            </span>
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                isExpanded ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                        </div>

                        {/* Covered Subtopics */}
                        {(les.subtopicIds || []).length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 text-xs">
                            {(les.subtopicIds || []).map((subId) => {
                              let subName = subId;
                              activeSubject?.topics?.forEach((t) => {
                                const found = (t.subtopics || []).find((s) => s.id === subId);
                                if (found) subName = found.name;
                              });
                              return (
                                <span
                                  key={subId}
                                  className="bg-blue-50 text-blue-900 border border-blue-200/60 px-2 py-0.5 rounded text-[11px]"
                                >
                                  {subName}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        {/* Content Detail */}
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                          {les.contentDetail}
                        </p>

                        {/* Handwritten Solution & Google Drive Buttons */}
                        {(les.handwrittenSolutionUrl || les.googleDriveUrl) && (
                          <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            {les.handwrittenSolutionUrl && (
                              <a
                                href={les.handwrittenSolutionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all shadow-2xs"
                              >
                                <span>✍️ เฉลยลายมือประจำคาบ (เปิดดูวิธีคิด)</span>
                                <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                              </a>
                            )}
                            {les.googleDriveUrl && (
                              <a
                                href={les.googleDriveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all shadow-2xs"
                              >
                                <FolderOpen className="w-3.5 h-3.5 text-emerald-700" />
                                <span>ชีทเรียน Google Drive</span>
                                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                              </a>
                            )}
                          </div>
                        )}

                        {/* Expanded details (Homework & Teacher Note) */}
                        {isExpanded && (
                          <div className="pt-2 border-t border-amber-100 space-y-3 text-xs animate-in fade-in duration-150">
                            {les.teacherNote && (
                              <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 text-slate-700">
                                <strong className="text-amber-900 block mb-0.5">
                                  คำแนะนำจากครูพี่แม็ก:
                                </strong>
                                <p className="italic">{les.teacherNote}</p>
                              </div>
                            )}

                            {les.homework && (
                              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900">
                                      การบ้าน: {les.homework.title}
                                    </span>
                                    <span
                                      className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                                        les.homework.status === 'submitted'
                                          ? 'bg-emerald-50 text-emerald-700'
                                          : 'bg-amber-50 text-amber-700'
                                      }`}
                                    >
                                      {les.homework.status === 'submitted'
                                        ? 'ส่งเรียบร้อย ✅'
                                        : 'ยังไม่ได้ส่ง ⏳'}
                                    </span>
                                  </div>

                                  {les.homework.status === 'pending' && (
                                    <button
                                      onClick={() =>
                                        updateHomeworkStatus(
                                          les.homework!.id,
                                          'submitted',
                                          'ส่งผ่านเว็บแล้ว'
                                        )
                                      }
                                      className="text-[11px] font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors"
                                    >
                                      ติ๊กส่งการบ้านแล้ว
                                    </button>
                                  )}
                                </div>
                                <p className="text-slate-600">{les.homework.description}</p>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  กำหนดส่ง: {les.homework.dueDate}
                                </div>
                              </div>
                            )}

                            {les.attachments && les.attachments.length > 0 && (
                              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <span>{les.attachments[0].name}</span>
                                <span className="text-[11px] text-slate-400">
                                  ({les.attachments[0].size || 'PDF'})
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right 1 Col: Enrolled Courses / Passcode + Homework To-do & Syllabus Snapshot */}
        <div className="space-y-6">
          {/* Enrolled Courses & Add Course with Passcode */}
          <section className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-900" />
                คอร์สเรียนของฉัน ({courses.length} คอร์ส)
              </h3>
            </div>

            {/* List of enrolled courses */}
            <div className="space-y-2">
              {courses
                .filter((c) => {
                  if (!currentUser?.enrolledCourseIds || currentUser.enrolledCourseIds.length === 0) {
                    return true;
                  }
                  return (
                    currentUser.enrolledCourseIds.includes(c.id) ||
                    currentUser.enrolledCourseIds.includes(c.code) ||
                    currentUser.enrolledCourseIds.includes('chem_alevel')
                  );
                })
                .map((c) => {
                  const isActive = activeCourseId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setActiveCourseId(c.id)}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isActive
                          ? 'bg-blue-50/70 border-blue-300 font-bold text-blue-950 shadow-2xs'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {c.code.slice(0, 2)}
                        </span>
                        <span className="truncate">{c.name}</span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-semibold text-blue-900 bg-white px-2 py-0.5 rounded-md border border-blue-200 shrink-0">
                          กำลังเรียน
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Form to enter new course passcode */}
            <form onSubmit={handleEnrollPasscode} className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-semibold text-slate-700">
                🔑 เพิ่มคอร์สใหม่ด้วยรหัส (ถามจากครู Max)
              </label>

              <div className="flex gap-1.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="รหัส เช่น CHEM68"
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (enrollError) setEnrollError(null);
                    }}
                    className="w-full bg-[#FFFDF7] border border-amber-200 rounded-xl pl-7 pr-2 py-1.5 text-xs font-mono font-bold uppercase text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  <KeyRound className="w-3.5 h-3.5 text-amber-600 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  type="submit"
                  disabled={isEnrolling || !passcodeInput.trim()}
                  className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0 shadow-2xs"
                >
                  {isEnrolling ? 'กำลังตรวจ...' : '+ แอดเข้าโปรไฟล์'}
                </button>
              </div>

              {enrollError && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-xl text-[11px] text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                  <span>{enrollError}</span>
                </div>
              )}

              {enrollSuccess && (
                <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                  <span>{enrollSuccess}</span>
                </div>
              )}
            </form>
          </section>

          {/* Homework To-do List */}
          <section className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                การบ้านที่ต้องส่ง ({pendingHomeworkList.length})
              </h3>
            </div>

            {pendingHomeworkList.length === 0 ? (
              <div className="text-center py-6 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold text-emerald-900 mt-1">
                  ทำการบ้านครบหมดแล้ว! เก่งมากครับ
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {pendingHomeworkList.map((hw) => (
                  <div
                    key={hw.id}
                    className="p-3 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs space-y-1.5"
                  >
                    <div className="font-bold text-slate-900">{hw.title}</div>
                    <p className="text-slate-600 leading-snug">{hw.description}</p>
                    <div className="flex items-center justify-between pt-1 border-t border-amber-100">
                      <span className="text-amber-800 font-mono text-[11px]">
                        ส่งภายใน: {hw.dueDate}
                      </span>
                      <button
                        onClick={() => setCurrentTab('my-homework')}
                        className="text-[11px] font-semibold text-white bg-blue-900 hover:bg-blue-800 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                      >
                        ส่งการบ้าน →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Syllabus Progress Explorer */}
          <section className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentTab('learning-hub')}
                className="font-bold text-slate-900 text-sm flex items-center gap-1.5 hover:text-blue-900 transition-colors cursor-pointer text-left"
                title="คลิกเพื่อเปิดสารบัญคอร์ส"
              >
                <BookOpen className="w-4 h-4 text-blue-900 shrink-0" />
                <span>สารบัญหลักสูตร {activeSubject.name}</span>
              </button>
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {syllabusPercent}%
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-blue-900 h-2 rounded-full"
                style={{ width: `${syllabusPercent}%` }}
              />
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 divide-y divide-slate-100 text-xs">
              {(activeSubject?.topics || []).map((top) => {
                const subs = top.subtopics || [];
                const completedInTopic = subs.filter((sub) => {
                  const p = activeStudentProgress.find((item) => item.subtopicId === sub.id);
                  return p && (p.status === 'completed' || p.status === 'mastered');
                }).length;
                const isFullyDone = completedInTopic === subs.length && subs.length > 0;

                return (
                  <div key={top.id} className="pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">
                        {top.sortOrder}. {top.name}
                      </span>
                      <span
                        className={`text-[11px] font-mono ${
                          isFullyDone ? 'text-emerald-600 font-semibold' : 'text-slate-400'
                        }`}
                      >
                        {completedInTopic}/{subs.length}
                      </span>
                    </div>

                    <div className="pl-2 mt-1 space-y-1">
                      {subs.map((sub) => {
                        const prog = activeStudentProgress.find((p) => p.subtopicId === sub.id);
                        const isDone = prog && (prog.status === 'completed' || prog.status === 'mastered');
                        const isLv2 = sub.level === 2;
                        const isLv3 = sub.level === 3;

                        return (
                          <div
                            key={sub.id}
                            className={`flex items-center justify-between text-[11px] text-slate-600 py-0.5 ${
                              isLv3 ? 'pl-5 text-slate-500' : isLv2 ? 'pl-2.5 text-slate-700' : 'pl-0 font-medium'
                            }`}
                          >
                            <span className="truncate pr-2 flex items-center gap-1">
                              {isLv3 ? (
                                <span className="text-purple-500 font-mono text-[10px]">↳↳</span>
                              ) : isLv2 ? (
                                <span className="text-amber-500 font-mono text-[10px]">↳</span>
                              ) : null}
                              <span>{sub.name}</span>
                            </span>
                            <span
                              className={`flex-shrink-0 text-[10px] ${
                                isDone ? 'text-emerald-600 font-semibold' : 'text-slate-300'
                              }`}
                            >
                              {isDone ? 'เรียนแล้ว ✓' : 'ยังไม่เรียน'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Student PromptPay Payment & Slip Upload Modal */}
      {selectedPaymentPlan && (
        <PromptPayPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false);
            setSelectedPaymentPlan(null);
          }}
          plan={selectedPaymentPlan}
        />
      )}
    </div>
  );
};
