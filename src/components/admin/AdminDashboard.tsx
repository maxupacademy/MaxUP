import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Lesson } from '../../types';
import { SpotlightCard } from '../ui/SpotlightCard';
import { NumberTicker } from '../ui/NumberTicker';
import {
  Clock,
  BookOpen,
  Users,
  Calendar,
  Search,
  PlusCircle,
  FileText,
  Trash2,
  Edit2,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  FolderOpen,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { MathText } from '../ui/MathText';

interface AdminDashboardProps {
  onOpenLessonModal: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onNavigateToSyllabus: () => void;
  onNavigateToStudents: () => void;
  onNavigateToSchedule?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onOpenLessonModal,
  onEditLesson,
  onNavigateToSyllabus,
  onNavigateToStudents,
  onNavigateToSchedule,
}) => {
  const {
    students,
    lessons,
    activeSubject,
    progressMap,
    deleteLesson,
    adminProfile,
  } = useApp();

  const { tx } = useLanguage();

  const [studentFilter, setStudentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedLessonIds, setExpandedLessonIds] = useState<Record<string, boolean>>({});

  const toggleSubtopics = (lessonId: string) => {
    setExpandedLessonIds((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  // Analytics
  const totalMinutes = lessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalHoursNum = totalMinutes / 60;
  const totalLessons = lessons.length;

  // Total subtopics in subject
  const totalSubtopics =
    activeSubject?.topics?.reduce((acc, t) => acc + (t.subtopics?.length || 0), 0) || 0;

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    const matchesStudent = studentFilter === 'all' || lesson.studentId === studentFilter;
    const content = lesson.contentDetail || '';
    const note = lesson.teacherNote || '';
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      content.toLowerCase().includes(query) || note.toLowerCase().includes(query);
    return matchesStudent && matchesQuery;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* 21st.dev Editorial Hero Bar - Clean, Authoritative, Non-AI */}
      <section className="relative overflow-hidden bg-[#001B48] text-white rounded-3xl p-5 sm:p-7 border border-blue-900/60 shadow-sm">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(rgba(255, 122, 0, 0.4) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Left: Identity + Mascot */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl overflow-hidden ring-2 ring-amber-400/80 shadow-md bg-white/10">
                <img
                  src="/mascot/pumpkin_lab.jpg"
                  alt="Pumpkin"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#001B48]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider text-amber-300 uppercase">
                  {tx('ห้องเรียนผู้สอน', 'Instructor Workspace')}
                </span>
                <span className="text-blue-300/40 text-xs">•</span>
                <span className="text-[11px] text-blue-200">MaxUp Academy</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {tx(`สวัสดีครับ ${adminProfile.fullName}`, `Welcome back, ${adminProfile.fullName}`)}
              </h1>
              <p className="text-xs text-blue-200/90 flex items-center gap-1.5 flex-wrap">
                <span>{tx('วิชาหลัก:', 'Active Course:')}</span>
                <span className="font-bold text-amber-300">{activeSubject.name}</span>
                <span className="text-blue-400 text-[10px]">({students.length} {tx('นักเรียน', 'Students')})</span>
              </p>
            </div>
          </div>

          {/* Right: High-Fitts Primary CTA & Compact Tools */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap pt-2 md:pt-0 border-t border-white/10 md:border-none">
            <button
              onClick={onOpenLessonModal}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-black text-white bg-[#FF7A00] hover:bg-[#E66E00] active:scale-97 transition-all rounded-xl shadow-md min-h-[44px] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{tx('บันทึกการสอนใหม่', 'New Lesson Log')}</span>
            </button>

            <button
              onClick={onNavigateToSyllabus}
              className="px-4 py-2.5 text-xs font-bold text-blue-100 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl transition-all min-h-[44px] cursor-pointer"
            >
              {tx(`สารบัญวิชา (${activeSubject.topics.length})`, `Syllabus (${activeSubject.topics.length})`)}
            </button>

            {onNavigateToSchedule && (
              <button
                onClick={onNavigateToSchedule}
                className="px-4 py-2.5 text-xs font-bold text-amber-200 hover:text-amber-100 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 rounded-xl transition-all min-h-[44px] cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 inline mr-1 text-amber-300" />
                <span>{tx('ตารางสอน', 'Schedule')}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 21st.dev Metric Bento Strip - Crisp Tabular Numbers, Zero Fluff */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        <SpotlightCard
          spotlightColor="rgba(255, 122, 0, 0.08)"
          className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-[#FF7A00]/40 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-tight text-slate-600">
              {tx('ชั่วโมงสอนสะสม', 'Teaching Hours')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#FF7A00]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
            <NumberTicker value={totalHoursNum} decimals={1} />
            <span className="text-xs font-normal text-slate-400 ml-1.5">{tx('ชม.', 'hrs')}</span>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(0, 27, 72, 0.08)"
          className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-[#001B48]/30 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-tight text-slate-600">
              {tx('คาบที่บันทึกแล้ว', 'Recorded Sessions')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#001B48]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
            <NumberTicker value={totalLessons} />
            <span className="text-xs font-normal text-slate-400 ml-1.5">{tx('คาบ', 'sessions')}</span>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.08)"
          className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-emerald-300 transition-colors"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold tracking-tight text-slate-600">
              {tx('นักเรียนในระบบ', 'Active Students')}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight">
            <NumberTicker value={students.length} />
            <span className="text-xs font-normal text-slate-400 ml-1.5">{tx('คน', 'students')}</span>
          </div>
        </SpotlightCard>
      </section>

      {/* Student Roster - Clickable Cards, Direct Navigation without Duplicate Buttons */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {tx('นักเรียนและความคืบหน้า', 'Students & Progress')}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {tx(`หลักสูตร ${activeSubject.name}`, `Course: ${activeSubject.name}`)}
            </p>
          </div>
          <button
            onClick={onNavigateToStudents}
            className="text-xs font-bold text-[#001B48] hover:text-[#0B48A1] flex items-center gap-1 min-h-[44px] px-2 cursor-pointer"
          >
            <span>{tx('จัดการทั้งหมด', 'Manage All')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-xs text-slate-500">
            {tx('ยังไม่มีรายชื่อนักเรียนในระบบ', 'No students enrolled yet')}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {students.map((st) => {
              const stProgress = progressMap[st.id] || [];
              const completedCount = stProgress.filter(
                (p) => (p.status === 'completed' || p.status === 'mastered') && (p.studyCount || 0) > 0
              ).length;
              const percent =
                totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;
              const stLessons = lessons.filter((l) => l.studentId === st.id);
              const stHours = (
                stLessons.reduce((acc, l) => acc + l.durationMinutes, 0) / 60
              ).toFixed(1);

              return (
                <div
                  key={st.id}
                  onClick={onNavigateToStudents}
                  className="group bg-slate-50/60 hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-300 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#001B48] text-white font-bold flex items-center justify-center text-xs shrink-0 group-hover:bg-[#FF7A00] transition-colors">
                          {st.nickname ? st.nickname.slice(0, 2) : 'ST'}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#001B48] flex items-center gap-1">
                            {st.nickname}
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </h3>
                          <p className="text-[11px] text-slate-500">{st.fullName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md shrink-0">
                        {st.grade}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>{tx('ความคืบหน้า', 'Progress')}</span>
                        <span className="font-mono tabular-nums font-bold text-slate-800">
                          {completedCount}/{totalSubtopics} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#001B48] h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{stHours} {tx('ชม.', 'hrs')} • {stLessons.length} {tx('คาบ', 'lessons')}</span>
                    <span className="text-slate-400 truncate max-w-[120px] text-right">
                      {st.targetFaculty || st.targetExam || '-'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Lesson History Feed - De-cluttered with Progressive Disclosure on Subtopics */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {tx('ประวัติการสอนล่าสุด', 'Recent Lesson Logs')}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {tx('บันทึกการเรียนพร้อมลิงก์เอกสาร Google Drive', 'Teaching records with Drive sheets & notes')}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Filter by student */}
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/40 min-h-[40px] cursor-pointer"
            >
              <option value="all">{tx('นักเรียนทุกคน', 'All Students')}</option>
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.nickname}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder={tx('ค้นหาบันทึก...', 'Search logs...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-2 text-slate-700 w-full sm:w-44 focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/40 min-h-[40px]"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
            <BookOpen className="w-7 h-7 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700">
              {tx('ไม่พบบันทึกการสอน', 'No lesson logs found')}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {tx('กด "+ บันทึกการสอนใหม่" เพื่อเริ่มบันทึกคาบเรียน', 'Click "+ New Lesson Log" to record a session')}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLessons.map((les) => {
              const student = students.find((s) => s.id === les.studentId);
              const durationHours = (les.durationMinutes / 60).toFixed(1);
              const isExpanded = !!expandedLessonIds[les.id];
              const subCount = (les.subtopicIds || []).length;

              return (
                <div
                  key={les.id}
                  className="py-3.5 sm:py-4 hover:bg-slate-50/70 rounded-xl px-2.5 sm:px-3 transition-colors space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#001B48] text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {student?.nickname ? student.nickname.slice(0, 2) : 'ST'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900 text-sm">
                            {student?.nickname || tx('นักเรียน', 'Student')}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-600 font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {les.lessonDate}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-600 font-mono">
                            {les.startTime}–{les.endTime} ({durationHours} {tx('ชม.', 'h')})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 self-end sm:self-auto">
                      <button
                        onClick={() => onEditLesson(les)}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                        title={tx('แก้ไข', 'Edit')}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              tx('ยืนยันการลบบันทึกคาบเรียนนี้?', 'Delete this lesson log?')
                            )
                          ) {
                            deleteLesson(les.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                        title={tx('ลบ', 'Delete')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Combined Lesson Notes & Teacher Feedback (100% Data Preserved) */}
                  {(() => {
                    const detail = (les.contentDetail || '').trim();
                    const note = (les.teacherNote || '').trim();
                    let displayText = detail;
                    if (note && note !== detail) {
                      displayText = detail ? `${detail}\n\n💬 โน้ตครู: ${note}` : note;
                    }
                    if (!displayText) return null;

                    return (
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100 whitespace-pre-line">
                        <MathText text={displayText} />
                      </div>
                    );
                  })()}

                  {/* Progressive Disclosure for Subtopics */}
                  {subCount > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSubtopics(les.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#001B48] hover:text-[#0B48A1] bg-blue-50/70 border border-blue-200/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                        >
                          <span>{tx(`เนื้อหาที่เรียน (${subCount} หัวข้อ)`, `Covered Topics (${subCount})`)}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="flex flex-wrap gap-1.5 pt-1 animate-in fade-in duration-150">
                          {(les.subtopicIds || []).map((subId) => {
                            let subName = subId;
                            activeSubject?.topics?.forEach((t) => {
                              const found = (t.subtopics || []).find((s) => s.id === subId);
                              if (found) subName = found.name;
                            });
                            return (
                              <span
                                key={subId}
                                className="bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md text-[11px] font-medium"
                              >
                                <MathText text={subName} />
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Links & Resources (Drive Sheet & Notes) */}
                  {(les.handwrittenSolutionUrl || les.googleDriveUrl) && (
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      {les.handwrittenSolutionUrl && (
                        <a
                          href={les.handwrittenSolutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-all min-h-[36px]"
                        >
                          <span>✍️ {tx('เฉลยลายมือ', 'Handwritten Notes')}</span>
                          <ExternalLink className="w-3 h-3 text-amber-700" />
                        </a>
                      )}
                      {les.googleDriveUrl && (
                        <a
                          href={les.googleDriveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all min-h-[36px]"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{tx('เอกสาร Google Drive', 'Drive Materials')}</span>
                          <ExternalLink className="w-3 h-3 text-emerald-700" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Homework info */}
                  {les.homework && (
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 text-blue-900 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        {tx('การบ้าน:', 'HW:')} {les.homework.title} (
                        {les.homework.status === 'submitted'
                          ? tx('ส่งแล้ว ✅', 'Done ✅')
                          : tx('รอส่ง ⏳', 'Pending ⏳')}
                        )
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
