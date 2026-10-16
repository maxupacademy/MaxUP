import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { SpotlightCard } from '../ui/SpotlightCard';
import { NumberTicker } from '../ui/NumberTicker';
import {
  Clock,
  BookOpen,
  Calendar,
  CheckCircle,
  FileText,
  AlertCircle,
  ChevronRight,
  Sparkles,
  KeyRound,
  Check,
  ExternalLink,
  FolderOpen,
  CalendarDays,
  ChevronLeft,
  CreditCard,
  Target,
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

  const { lang, tx } = useLanguage();

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

  const [lessonSearch, setLessonSearch] = useState('');
  const [lessonCourseFilter, setLessonCourseFilter] = useState('all');

  const handleEnrollPasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) return;
    setEnrollError(null);
    setEnrollSuccess(null);
    setIsEnrolling(true);

    try {
      const addedCourse = await enrollByPasscode(passcodeInput.trim());
      setEnrollSuccess(
        tx(
          `เพิ่มคอร์ส "${addedCourse.name}" เข้าโปรไฟล์เรียบร้อยแล้ว`,
          `Added "${addedCourse.name}" to your courses`
        )
      );
      setPasscodeInput('');
    } catch (err: any) {
      setEnrollError(err.message || tx('รหัสเข้าคอร์สไม่ถูกต้อง', 'Invalid course passcode'));
    } finally {
      setIsEnrolling(false);
    }
  };

  // Statistics
  const totalMinutes = activeStudentLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalHoursNum = totalMinutes / 60;
  const totalHours = totalHoursNum.toFixed(1);
  const totalLessons = activeStudentLessons.length;

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

  // Dedicated View for 'my-lessons'
  if (currentTab === 'my-lessons') {
    const query = lessonSearch.trim().toLowerCase();
    const filteredLessons = activeStudentLessons.filter((les) => {
      if (lessonCourseFilter !== 'all' && les.subjectId !== lessonCourseFilter) {
        return false;
      }
      if (!query) return true;
      const matchDate = (les.lessonDate || '').includes(query);
      const matchDetail = (les.contentDetail || '').toLowerCase().includes(query);
      const matchNote = (les.teacherNote || '').toLowerCase().includes(query);
      const matchSub = (les.subtopicIds || []).some((subId) => {
        let name = subId.toLowerCase();
        activeSubject?.topics?.forEach((t) => {
          const found = (t.subtopics || []).find((s) => s.id === subId);
          if (found) name = found.name.toLowerCase();
        });
        return name.includes(query);
      });
      return matchDate || matchDetail || matchNote || matchSub;
    });

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* Header Banner in Royal Navy CI */}
        <section className="bg-gradient-to-r from-[#001B48] via-[#072B61] to-[#0B48A1] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-800/50 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0 bg-white/10 shadow-sm">
                <img
                  src="/mascot/pumpkin_lab.jpg"
                  alt="Pumpkin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-white/10 border border-white/15 px-3 py-1 rounded-full mb-1.5 backdrop-blur-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{tx('สมุดบันทึกการเรียน', 'Personal Study Log')} · MaxUp Academy</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {tx('ประวัติการเรียนทั้งหมด', 'Lesson History')}
                </h1>
                <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
                  {tx(
                    `บันทึกเนื้อหาการสอนและคำแนะนำจากครูแม็กของ ${activeStudent?.nickname}`,
                    `Session notes and feedback from Coach Max for ${activeStudent?.nickname}`
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentTab('home')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 backdrop-blur-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{tx('กลับหน้าแดชบอร์ด', 'Back to Dashboard')}</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-blue-800/40 max-w-sm relative z-10">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3 text-center backdrop-blur-xs">
              <span className="text-[11px] text-blue-100 block">
                {tx('จำนวนคาบทั้งหมด', 'Total Sessions')}
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-white">
                <NumberTicker value={activeStudentLessons.length} />
              </span>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3 text-center backdrop-blur-xs">
              <span className="text-[11px] text-blue-100 block">
                {tx('ชั่วโมงเรียนสะสม', 'Study Hours')}
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                <NumberTicker value={totalHoursNum} decimals={1} />
              </span>
            </div>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              placeholder={tx(
                'ค้นหาตามวันที่ หัวข้อ หรือเนื้อหาที่เรียน...',
                'Search by date, topic, or lesson notes...'
              )}
              value={lessonSearch}
              onChange={(e) => setLessonSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            />
            <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {lessonSearch && (
              <button
                onClick={() => setLessonSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <select
              value={lessonCourseFilter}
              onChange={(e) => setLessonCourseFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 cursor-pointer"
            >
              <option value="all">
                {tx(`ทุกคอร์สเรียน (${courses.length})`, `All Courses (${courses.length})`)}
              </option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Full Lesson Timeline */}
        <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-900" />
              <span>{tx('บันทึกการเรียนตามลำดับเวลา', 'Chronological Sessions')}</span>
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              {tx(
                `แสดง ${filteredLessons.length} จาก ${activeStudentLessons.length} คาบ`,
                `Showing ${filteredLessons.length} of ${activeStudentLessons.length}`
              )}
            </span>
          </div>

          {filteredLessons.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/40 space-y-2">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">
                {lessonSearch
                  ? tx('ไม่พบบันทึกคาบเรียนที่ตรงกับคำค้นหา', 'No matching sessions found')
                  : tx('ยังไม่มีประวัติบันทึกการเรียน', 'No recorded sessions yet')}
              </p>
              {lessonSearch && (
                <button
                  onClick={() => setLessonSearch('')}
                  className="text-xs text-blue-900 hover:underline cursor-pointer"
                >
                  {tx('ล้างคำค้นหา', 'Clear search')}
                </button>
              )}
            </div>
          ) : (
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {filteredLessons.map((les) => {
                const isExpanded = expandedLessonId === les.id;
                const durationHours = (les.durationMinutes / 60).toFixed(1);

                return (
                  <div key={les.id} className="relative group">
                    <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-4 border-slate-900 shadow-xs flex items-center justify-center" />

                    <div className="bg-slate-50/60 border border-slate-200/90 rounded-2xl p-4 sm:p-5 transition-all hover:border-slate-300 space-y-3">
                      <div
                        onClick={() => setExpandedLessonId(isExpanded ? null : les.id)}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono tabular-nums flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-blue-900" />
                            {les.lessonDate}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-600 font-mono tabular-nums">
                            {les.startTime}–{les.endTime} ({durationHours} {tx('ชม.', 'h')})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isExpanded ? 'rotate-90' : ''
                            }`}
                          />
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                        {les.contentDetail}
                      </p>

                      {(les.subtopicIds || []).length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="text-slate-400 font-medium">
                            {tx('หัวข้อที่เรียน:', 'Topics:')}
                          </span>
                          {(les.subtopicIds || []).map((subId) => {
                            let subName = subId;
                            activeSubject?.topics?.forEach((t) => {
                              const found = (t.subtopics || []).find((s) => s.id === subId);
                              if (found) subName = found.name;
                            });
                            return (
                              <span
                                key={subId}
                                className="bg-blue-50 text-blue-900 border border-blue-200/80 px-2.5 py-0.5 rounded-lg text-[11px] font-medium"
                              >
                                {subName}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {(les.handwrittenSolutionUrl || les.googleDriveUrl) && (
                        <div className="flex items-center gap-2 flex-wrap pt-1">
                          {les.handwrittenSolutionUrl && (
                            <a
                              href={les.handwrittenSolutionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-xl transition-all"
                            >
                              <span>✍️ {tx('ดูเฉลยลายมือ', 'Handwritten Notes')}</span>
                              <ExternalLink className="w-3 h-3 text-amber-700" />
                            </a>
                          )}
                          {les.googleDriveUrl && (
                            <a
                              href={les.googleDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-xl transition-all"
                            >
                              <span>📂 {tx('เอกสารประกอบการเรียน', 'Study Sheet')}</span>
                              <ExternalLink className="w-3 h-3 text-emerald-700" />
                            </a>
                          )}
                        </div>
                      )}

                      {isExpanded && (
                        <div className="pt-2 border-t border-slate-200/70 space-y-3 text-xs animate-in fade-in duration-150">
                          {les.teacherNote && (
                            <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 text-slate-700 space-y-1">
                              <strong className="text-amber-900 block font-bold">
                                💬 {tx('คำแนะนำจากครูแม็ก:', 'Coach Max Note:')}
                              </strong>
                              <p className="italic text-slate-800 leading-relaxed">
                                {les.teacherNote}
                              </p>
                            </div>
                          )}

                          {les.homework && (
                            <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">
                                    {tx('การบ้าน:', 'Homework:')} {les.homework.title}
                                  </span>
                                  <span
                                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                                      les.homework.status === 'submitted'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-amber-50 text-amber-700'
                                    }`}
                                  >
                                    {les.homework.status === 'submitted'
                                      ? tx('ส่งแล้ว ✅', 'Submitted ✅')
                                      : tx('รอส่ง ⏳', 'Pending ⏳')}
                                  </span>
                                </div>

                                {les.homework.status === 'pending' && (
                                  <button
                                    onClick={() =>
                                      updateHomeworkStatus(
                                        les.homework!.id,
                                        'submitted',
                                        tx('ส่งผ่านเว็บแล้ว', 'Submitted via web')
                                      )
                                    }
                                    className="text-[11px] font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
                                  >
                                    {tx('ทำเครื่องหมายว่าส่งแล้ว', 'Mark as Submitted')}
                                  </button>
                                )}
                              </div>
                              <p className="text-slate-600">{les.homework.description}</p>
                              <div className="text-[11px] text-slate-500 font-mono">
                                {tx('กำหนดส่ง:', 'Due:')} {les.homework.dueDate}
                              </div>
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
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Royal Navy & Orange Student Hero Banner with Pumpkin Mascot */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#001B48] via-[#072B61] to-[#0B48A1] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-800/50">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(251, 191, 36, 0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left max-w-xl">
            {/* Pumpkin Mascot Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-white/10">
              <img
                src="/mascot/pumpkin_lab.jpg"
                alt="น้องพัมคิน (Pumpkin)"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{tx('แดชบอร์ดนักเรียน', 'Student Learning Hub')} · MaxUp Academy</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {tx(`สวัสดีครับ ${activeStudent?.nickname}! 🚀`, `Welcome back, ${activeStudent?.nickname}! 🚀`)}
              </h1>

              <p className="text-blue-100 text-sm leading-relaxed">
                {tx('เป้าหมาย:', 'Target:')}{' '}
                <strong className="text-amber-300 font-bold">
                  {activeStudent?.targetFaculty || activeStudent?.targetExam || '-'}
                </strong>{' '}
                · {tx(`ความคืบหน้าวิชา ${activeSubject.name}`, `${activeSubject.name} mastery`)}{' '}
                <strong className="text-amber-300 font-mono font-black">{syllabusPercent}%</strong>
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <button
                  onClick={() => setCurrentTab('my-lessons')}
                  className="px-3.5 py-2 text-xs font-black text-white bg-gradient-to-r from-[#FF7A00] to-[#F55D00] hover:from-[#F55D00] hover:to-[#E05000] rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  {tx(`ประวัติเรียน (${totalLessons})`, `History (${totalLessons})`)}
                </button>
                <button
                  onClick={() => setCurrentTab('my-syllabus')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
                >
                  {tx(`สารบัญ (${completedCount}/${totalSubtopics})`, `Syllabus (${completedCount}/${totalSubtopics})`)}
                </button>
                <button
                  onClick={() => setCurrentTab('schedule')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
                >
                  {tx('ตารางเรียน', 'Schedule')}
                </button>
                <button
                  onClick={() => setCurrentTab('my-materials')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
                >
                  {tx('เอกสารเรียน', 'Materials')}
                </button>
                <button
                  onClick={() => setCurrentTab('my-videos')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
                >
                  {tx('วิดีโอ', 'Videos')}
                </button>
                <button
                  onClick={() => setCurrentTab('my-homework')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
                >
                  {tx('การบ้าน', 'Homework')}
                </button>
              </div>
            </div>
          </div>

          {/* Student Goal Spotlight Badge in Glassmorphism */}
          <SpotlightCard
            spotlightColor="rgba(251, 191, 36, 0.25)"
            className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center min-w-[210px]"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mb-2 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-white">
              {activeStudent?.targetExam || tx('เตรียมสอบเข้า', 'Exam Preparation')}
            </div>
            <div className="text-[11px] text-blue-200 mt-1 max-w-[180px]">
              {activeStudent?.targetFaculty
                ? activeStudent.targetFaculty
                : tx(`สะสมชั่วโมงเรียน ${totalHours} ชม.`, `${totalHours} hours completed`)}
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* 21st.dev Quantitative Metric Cards with Spotlight & NumberTicker */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.12)"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-amber-300"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{tx('ชั่วโมงเรียนสะสม', 'Study Hours')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            <NumberTicker value={totalHoursNum} decimals={1} />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{tx('ชั่วโมงเรียนทั้งหมด', 'Total hours logged')}</span>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(30, 58, 138, 0.1)"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-blue-300"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{tx('จำนวนคาบที่เรียน', 'Sessions Attended')}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-900" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            <NumberTicker value={totalLessons} />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{tx('คาบเรียนที่บันทึกแล้ว', 'Recorded sessions')}</span>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.12)"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-emerald-300"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{tx('สารบัญที่ครอบคลุม', 'Syllabus Mastery')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            <NumberTicker value={syllabusPercent} suffix="%" />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>
              {tx(
                `${completedCount} จาก ${totalSubtopics} หัวข้อย่อย`,
                `${completedCount} of ${totalSubtopics} subtopics`
              )}
            </span>
          </div>
        </SpotlightCard>
      </section>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Lesson Calendar & Lesson History Timeline */}
        <div className="lg:col-span-2 space-y-6">
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

            const focusedDate =
              selectedCalDate || myPlans.find((p) => p.status === 'upcoming')?.date || todayStr;
            const focusedPlans = myPlans.filter((p) => p.date === focusedDate);

            const thaiMonths = [
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
            ];
            const enMonths = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ];

            return (
              <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-1">
                      <CalendarDays className="w-3.5 h-3.5 text-blue-700" />
                      <span>{tx('ปฏิทินตารางเรียน', 'Study Calendar')}</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">
                      {tx('ตารางเรียนล่วงหน้าและหัวข้อที่เตรียมสอน', 'Upcoming Schedule & Planned Topics')}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-50 text-amber-900 border border-amber-200/60">
                      {tx(`ตามแผน ${upcomingCount} คาบ`, `${upcomingCount} Upcoming`)}
                    </span>
                    <button
                      onClick={() => setCurrentTab('schedule')}
                      className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <span>{tx('ดูเต็มจอ', 'Full View')}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Calendar Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  {/* Left Column: Mini Month Calendar Grid */}
                  <div className="md:col-span-6 bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCalViewDate(new Date(calYear, calMonth - 1, 1))}
                        className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-600 transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          {lang === 'th'
                            ? `${thaiMonths[calMonth]} ${calYear + 543}`
                            : `${enMonths[calMonth]} ${calYear}`}
                        </span>
                      </div>

                      <button
                        onClick={() => setCalViewDate(new Date(calYear, calMonth + 1, 1))}
                        className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-600 transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 pb-1 border-b border-slate-200/70">
                      <span className="text-red-500">{tx('อา.', 'Su')}</span>
                      <span>{tx('จ.', 'Mo')}</span>
                      <span>{tx('อ.', 'Tu')}</span>
                      <span>{tx('พ.', 'We')}</span>
                      <span>{tx('พฤ.', 'Th')}</span>
                      <span>{tx('ศ.', 'Fr')}</span>
                      <span className="text-blue-600">{tx('ส.', 'Sa')}</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
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
                                ? 'bg-slate-900 text-white shadow-2xs ring-2 ring-amber-400'
                                : isToday
                                ? 'bg-amber-100 text-amber-950 font-bold'
                                : hasPlans
                                ? 'bg-blue-50 text-blue-900 hover:bg-blue-100 font-bold'
                                : 'text-slate-700 hover:bg-slate-200/50'
                            }`}
                          >
                            <span>{day}</span>
                            {hasPlans && (
                              <span
                                className={`w-1.5 h-1.5 rounded-full absolute bottom-1 ${
                                  isSelected ? 'bg-amber-400' : 'bg-blue-600'
                                }`}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-200/70">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                        <span>{tx('วันที่มีคาบเรียน', 'Scheduled day')}</span>
                      </span>
                      {selectedCalDate && (
                        <button
                          onClick={() => setSelectedCalDate(null)}
                          className="text-blue-900 hover:underline cursor-pointer"
                        >
                          {tx('แสดงทั้งหมด', 'Show all')}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Scheduled Lesson Slot Details */}
                  <div className="md:col-span-6 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-900" />
                          <span>
                            {selectedCalDate
                              ? tx(`ตารางวันที่ ${selectedCalDate}`, `Schedule for ${selectedCalDate}`)
                              : tx('คาบเรียนที่กำลังจะถึง', 'Upcoming Sessions')}
                          </span>
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {selectedCalDate
                            ? tx(`${focusedPlans.length} คาบ`, `${focusedPlans.length} slots`)
                            : tx(`${myPlans.length} คาบทั้งหมด`, `${myPlans.length} total`)}
                        </span>
                      </div>

                      {(selectedCalDate ? focusedPlans : myPlans.slice(0, 3)).length === 0 ? (
                        <div className="p-6 bg-slate-50/70 border border-dashed border-slate-200 rounded-xl text-center space-y-2">
                          <p className="text-xs text-slate-600 font-semibold">
                            {selectedCalDate
                              ? tx('ไม่มีคาบเรียนในวันที่เลือก', 'No sessions on selected date')
                              : tx('ยังไม่มีตารางเรียนที่กำหนดไว้', 'No upcoming sessions scheduled')}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {(selectedCalDate ? focusedPlans : myPlans.slice(0, 3)).map((plan) => {
                            const isDone = plan.status === 'completed';
                            const course = courses.find((c) => c.id === plan.courseId);

                            const allCourseSubtopics =
                              (course || activeSubject)?.topics?.flatMap((t) => t.subtopics) || [];
                            const matchedSubtopics = allCourseSubtopics.filter((sub) =>
                              plan.plannedSubtopicIds?.includes(sub.id)
                            );

                            return (
                              <div
                                key={plan.id}
                                className={`p-3.5 rounded-xl border transition-all space-y-2 ${
                                  isDone
                                    ? 'bg-emerald-50/30 border-emerald-200'
                                    : 'bg-slate-50/70 border-slate-200 hover:border-amber-400'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200 flex items-center gap-1">
                                      <Calendar className="w-3 h-3 text-blue-700" />
                                      {plan.date}
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200 flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-amber-700" />
                                      {plan.startTime} - {plan.endTime} ({plan.durationHours}{' '}
                                      {tx('ชม.', 'h')})
                                    </span>
                                  </div>

                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                      isDone
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-amber-100 text-amber-900'
                                    }`}
                                  >
                                    {isDone
                                      ? tx('✓ เรียนแล้ว', '✓ Completed')
                                      : tx('⏳ ตามแผน', '⏳ Planned')}
                                  </span>
                                </div>

                                <div>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                    {plan.title}
                                  </h4>
                                  {course && (
                                    <span className="text-[10px] text-slate-500 font-medium">
                                      {course.name}
                                    </span>
                                  )}
                                </div>

                                {(matchedSubtopics.length > 0 || plan.plannedContentDescription) && (
                                  <div className="bg-white border border-slate-200/80 rounded-lg p-2 space-y-1">
                                    <div className="text-[10px] font-bold text-blue-900 flex items-center gap-1">
                                      <BookOpen className="w-3 h-3 text-blue-800" />
                                      <span>{tx('หัวข้อที่เตรียมเรียน:', 'Planned Topics:')}</span>
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

                                {plan.preparationNote && (
                                  <div className="text-[11px] text-amber-900 bg-amber-50/90 border border-amber-200/60 rounded-lg p-2 flex items-start gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-semibold block text-[10px]">
                                        {tx('การเตรียมตัว:', 'Preparation:')}
                                      </span>
                                      <span>{plan.preparationNote}</span>
                                    </div>
                                  </div>
                                )}

                                {plan.googleDriveUrl && (
                                  <div>
                                    <a
                                      href={plan.googleDriveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                                    >
                                      <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
                                      <span>{tx('เปิดเอกสารประกอบการเรียน', 'Open Study Sheet')}</span>
                                      <ExternalLink className="w-3 h-3 text-emerald-500 ml-0.5" />
                                    </a>
                                  </div>
                                )}

                                {plan.priceAmount !== undefined && plan.priceAmount > 0 && (
                                  <div className="flex items-center justify-between p-2.5 bg-blue-50/50 border border-blue-200/80 rounded-xl text-xs gap-2">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <CreditCard className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                                      <span className="font-bold text-slate-900 font-mono text-xs">
                                        ฿{plan.priceAmount.toLocaleString()}
                                      </span>
                                      <span
                                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                                          plan.paymentStatus === 'paid'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : plan.paymentStatus === 'slip_uploaded'
                                            ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                            : 'bg-amber-100 text-amber-900'
                                        }`}
                                      >
                                        {plan.paymentStatus === 'paid'
                                          ? tx('✓ ชำระแล้ว', '✓ Paid')
                                          : plan.paymentStatus === 'slip_uploaded'
                                          ? tx('🔔 รอครูตรวจสลิป', '🔔 Verifying Slip')
                                          : tx('รอชำระเงิน', 'Unpaid')}
                                      </span>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setSelectedPaymentPlan(plan);
                                        setIsPaymentModalOpen(true);
                                      }}
                                      className="px-2.5 py-1 text-[11px] font-bold text-blue-900 hover:text-white bg-white hover:bg-blue-900 border border-blue-200 rounded-lg transition-all cursor-pointer shrink-0"
                                    >
                                      {plan.paymentStatus === 'paid'
                                        ? tx('ดูสลิป', 'View Slip')
                                        : plan.paymentStatus === 'slip_uploaded'
                                        ? tx('แก้ไขสลิป', 'Update Slip')
                                        : tx('ชำระเงิน / แนบสลิป', 'Pay / Attach Slip')}
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
                        className="w-full py-2 text-center text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer"
                      >
                        {tx('ดูตารางเรียนทั้งหมด →', 'Open Full Schedule →')}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            );
          })()}

          {/* Recent Lesson Logs */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {tx('คาบเรียนล่าสุด', 'Recent Sessions')}
                </h2>
                <p className="text-xs text-slate-500">
                  {tx('สรุปเนื้อหาและคำแนะนำ 3 คาบล่าสุด', 'Summary and feedback from your latest 3 sessions')}
                </p>
              </div>
              {activeStudentLessons.length > 0 && (
                <button
                  onClick={() => setCurrentTab('my-lessons')}
                  className="text-xs font-bold text-blue-900 hover:text-blue-700 cursor-pointer flex items-center gap-1"
                >
                  <span>
                    {tx(
                      `ดูทั้งหมด (${activeStudentLessons.length})`,
                      `View All (${activeStudentLessons.length})`
                    )}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {activeStudentLessons.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {tx('ยังไม่มีบันทึกคาบเรียน', 'No recorded sessions yet')}
                </p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                {activeStudentLessons.slice(0, 3).map((les) => {
                  const isExpanded = expandedLessonId === les.id;
                  const durationHours = (les.durationMinutes / 60).toFixed(1);

                  return (
                    <div key={les.id} className="relative group">
                      <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-white border-4 border-slate-900 shadow-xs flex items-center justify-center" />

                      <div className="bg-slate-50/60 border border-slate-200/90 rounded-2xl p-4 transition-all hover:border-slate-300 space-y-2.5">
                        <div
                          onClick={() => setExpandedLessonId(isExpanded ? null : les.id)}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 font-mono tabular-nums flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-amber-600" />
                              {les.lessonDate}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-600 font-mono tabular-nums">
                              {les.startTime}–{les.endTime} ({durationHours} {tx('ชม.', 'h')})
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <ChevronRight
                              className={`w-4 h-4 text-slate-400 transition-transform ${
                                isExpanded ? 'rotate-90' : ''
                              }`}
                            />
                          </div>
                        </div>

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
                                  className="bg-blue-50 text-blue-900 border border-blue-200/60 px-2 py-0.5 rounded-md text-[11px] font-medium"
                                >
                                  {subName}
                                </span>
                              );
                            })}
                          </div>
                        )}

                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                          {les.contentDetail}
                        </p>

                        {(les.handwrittenSolutionUrl || les.googleDriveUrl) && (
                          <div className="flex flex-wrap items-center gap-2 pt-0.5">
                            {les.handwrittenSolutionUrl && (
                              <a
                                href={les.handwrittenSolutionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-all"
                              >
                                <span>✍️ {tx('ดูเฉลยลายมือ', 'Handwritten Notes')}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                              </a>
                            )}
                            {les.googleDriveUrl && (
                              <a
                                href={les.googleDriveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-all"
                              >
                                <FolderOpen className="w-3.5 h-3.5 text-emerald-700" />
                                <span>{tx('เอกสารประกอบการเรียน', 'Study Sheet')}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                              </a>
                            )}
                          </div>
                        )}

                        {isExpanded && (
                          <div className="pt-2 border-t border-slate-200/70 space-y-3 text-xs animate-in fade-in duration-150">
                            {les.teacherNote && (
                              <div className="bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 text-slate-700">
                                <strong className="text-amber-900 block mb-0.5">
                                  {tx('คำแนะนำจากครูแม็ก:', 'Coach Max Note:')}
                                </strong>
                                <p className="italic">{les.teacherNote}</p>
                              </div>
                            )}

                            {les.homework && (
                              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-slate-900">
                                      {tx('การบ้าน:', 'Homework:')} {les.homework.title}
                                    </span>
                                    <span
                                      className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                                        les.homework.status === 'submitted'
                                          ? 'bg-emerald-50 text-emerald-700'
                                          : 'bg-amber-50 text-amber-700'
                                      }`}
                                    >
                                      {les.homework.status === 'submitted'
                                        ? tx('ส่งแล้ว ✅', 'Submitted ✅')
                                        : tx('รอส่ง ⏳', 'Pending ⏳')}
                                    </span>
                                  </div>

                                  {les.homework.status === 'pending' && (
                                    <button
                                      onClick={() =>
                                        updateHomeworkStatus(
                                          les.homework!.id,
                                          'submitted',
                                          tx('ส่งผ่านเว็บแล้ว', 'Submitted via web')
                                        )
                                      }
                                      className="text-[11px] font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
                                    >
                                      {tx('ทำเครื่องหมายว่าส่งแล้ว', 'Mark as Submitted')}
                                    </button>
                                  )}
                                </div>
                                <p className="text-slate-600">{les.homework.description}</p>
                                <div className="text-[11px] text-slate-500 font-mono">
                                  {tx('กำหนดส่ง:', 'Due:')} {les.homework.dueDate}
                                </div>
                              </div>
                            )}

                            {les.attachments && les.attachments.length > 0 && (
                              <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <span>{les.attachments[0].name}</span>
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

            {activeStudentLessons.length > 3 && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => setCurrentTab('my-lessons')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>
                    {tx(
                      `ดูประวัติการเรียนทั้งหมด (${activeStudentLessons.length} คาบ) →`,
                      `View All Sessions (${activeStudentLessons.length}) →`
                    )}
                  </span>
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Right 1 Col: Enrolled Courses / Passcode + Homework To-do & Syllabus Snapshot */}
        <div className="space-y-6">
          {/* Enrolled Courses & Add Course with Passcode */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-900" />
                <span>{tx(`คอร์สเรียนของฉัน (${courses.length})`, `My Courses (${courses.length})`)}</span>
              </h3>
            </div>

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
                          ? 'bg-slate-900 border-slate-900 font-bold text-white shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0 ${
                            isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {c.code.slice(0, 2)}
                        </span>
                        <span className="truncate">{c.name}</span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-bold text-amber-300 shrink-0">
                          {tx('กำลังเลือก', 'Active')}
                        </span>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Form to enter new course passcode */}
            <form onSubmit={handleEnrollPasscode} className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-semibold text-slate-700">
                🔑 {tx('เพิ่มคอร์สด้วยรหัสผ่าน', 'Add Course with Passcode')}
              </label>

              <div className="flex gap-1.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={tx('กรอกรหัสคอร์ส', 'Passcode')}
                    value={passcodeInput}
                    onChange={(e) => {
                      setPasscodeInput(e.target.value);
                      if (enrollError) setEnrollError(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-7 pr-2 py-1.5 text-xs font-mono font-bold uppercase text-slate-800 focus:ring-2 focus:ring-amber-500/40 focus:outline-none"
                  />
                  <KeyRound className="w-3.5 h-3.5 text-amber-600 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  type="submit"
                  disabled={isEnrolling || !passcodeInput.trim()}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0"
                >
                  {isEnrolling ? tx('รอสักครู่...', 'Adding...') : tx('+ เพิ่มคอร์ส', '+ Add')}
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
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>
                  {tx(
                    `การบ้านที่ต้องส่ง (${pendingHomeworkList.length})`,
                    `Pending Homework (${pendingHomeworkList.length})`
                  )}
                </span>
              </h3>
            </div>

            {pendingHomeworkList.length === 0 ? (
              <div className="text-center py-6 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold text-emerald-900 mt-1">
                  {tx('ส่งการบ้านครบทุกชิ้นแล้ว!', 'All homework completed!')}
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
                        {tx('กำหนดส่ง:', 'Due:')} {hw.dueDate}
                      </span>
                      <button
                        onClick={() => setCurrentTab('my-homework')}
                        className="text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                      >
                        {tx('ส่งงาน →', 'Submit →')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Syllabus Progress Explorer */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentTab('learning-hub')}
                className="font-bold text-slate-900 text-sm flex items-center gap-1.5 hover:text-blue-900 transition-colors cursor-pointer text-left"
              >
                <BookOpen className="w-4 h-4 text-blue-900 shrink-0" />
                <span>{tx(`สารบัญ ${activeSubject.name}`, `${activeSubject.name} Syllabus`)}</span>
              </button>
              <span className="text-xs font-mono text-slate-700 font-bold">
                {syllabusPercent}%
              </span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-slate-900 h-2 rounded-full transition-all duration-500"
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
                        const isDone =
                          prog && (prog.status === 'completed' || prog.status === 'mastered');
                        const isLv2 = sub.level === 2;
                        const isLv3 = sub.level === 3;

                        return (
                          <div
                            key={sub.id}
                            className={`flex items-center justify-between text-[11px] text-slate-600 py-0.5 ${
                              isLv3
                                ? 'pl-5 text-slate-500'
                                : isLv2
                                ? 'pl-2.5 text-slate-700'
                                : 'pl-0 font-medium'
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
                              className={`shrink-0 text-[10px] ${
                                isDone ? 'text-emerald-600 font-semibold' : 'text-slate-300'
                              }`}
                            >
                              {isDone ? tx('เรียนแล้ว ✓', 'Done ✓') : tx('รอเรียน', 'Pending')}
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
