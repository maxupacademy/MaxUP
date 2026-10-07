import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfessorMeow } from '../brand/ProfessorMeow';
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
} from 'lucide-react';

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
  } = useApp();

  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(
    activeStudentLessons[0]?.id || null
  );

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

  const totalSubtopics = activeSubject.topics.reduce((acc, t) => acc + t.subtopics.length, 0);
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
                onClick={() => setCurrentTab('my-flashcards')}
                className="px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-100/70 hover:bg-amber-100 border border-amber-200 rounded-xl shadow-2xs transition-all"
              >
                🗂️ แฟลชการ์ด
              </button>
              <button
                onClick={() => setCurrentTab('my-quizzes')}
                className="px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl shadow-2xs transition-all"
              >
                📝 ควิซ & ข้อสอบ
              </button>
              <button
                onClick={() => setCurrentTab('my-materials')}
                className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-2xs transition-all"
              >
                📥 โหลดไฟล์เรียน
              </button>
              <button
                onClick={() => setCurrentTab('my-videos')}
                className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl shadow-2xs transition-all"
              >
                ▶️ วิดีโอ YouTube
              </button>
            </div>
          </div>

          {/* Professor Meow Mascot with Encouraging Speech Bubble */}
          <div className="flex-shrink-0">
            <ProfessorMeow
              pose={syllabusPercent >= 30 ? 'exam_pass' : 'happy'}
              size="lg"
              bubbleText={`เยี่ยมมากเลย${activeStudent?.nickname}! เรียนสะสมไปแล้ว ${totalHours} ชั่วโมงแล้วเมี๊ยว!`}
            />
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
        {/* Left 2 Cols: Lesson History Timeline */}
        <div className="lg:col-span-2 space-y-6">
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
              <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
                <ProfessorMeow pose="thinking" size="md" className="mx-auto" />
                <p className="text-xs text-slate-500 mt-2">ยังไม่มีบันทึกคาบเรียนสำหรับคุณ</p>
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
                        {les.subtopicIds.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1 text-xs">
                            {les.subtopicIds.map((subId) => {
                              let subName = subId;
                              activeSubject.topics.forEach((t) => {
                                const found = t.subtopics.find((s) => s.id === subId);
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
                คอร์สเรียนของฉัน ({currentUser?.enrolledCourseIds?.length || 1} คอร์ส)
              </h3>
            </div>

            {/* List of enrolled courses */}
            <div className="space-y-2">
              {courses
                .filter((c) => (currentUser?.enrolledCourseIds || ['chem_alevel']).includes(c.id))
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
                title="คลิกเพื่อเปิดสารบัญคอร์สและอ่านชีทเรียน"
              >
                <BookOpen className="w-4 h-4 text-blue-900 shrink-0" />
                <span>สารบัญ {activeSubject.name} (เปิดอ่านชีท →)</span>
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
              {activeSubject.topics.map((top) => {
                const completedInTopic = top.subtopics.filter((sub) => {
                  const p = activeStudentProgress.find((item) => item.subtopicId === sub.id);
                  return p && (p.status === 'completed' || p.status === 'mastered');
                }).length;
                const isFullyDone = completedInTopic === top.subtopics.length && top.subtopics.length > 0;

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
                        {completedInTopic}/{top.subtopics.length}
                      </span>
                    </div>

                    <div className="pl-3 mt-1 space-y-1">
                      {top.subtopics.map((sub) => {
                        const prog = activeStudentProgress.find((p) => p.subtopicId === sub.id);
                        const isDone = prog && (prog.status === 'completed' || prog.status === 'mastered');

                        return (
                          <div
                            key={sub.id}
                            className="flex items-center justify-between text-[11px] text-slate-600"
                          >
                            <span className="truncate pr-2">{sub.name}</span>
                            <span
                              className={`flex-shrink-0 ${
                                isDone ? 'text-emerald-600 font-medium' : 'text-slate-300'
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
    </div>
  );
};
