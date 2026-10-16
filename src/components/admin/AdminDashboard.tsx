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
  ExternalLink,
  FolderOpen,
  ArrowUpRight,
  GraduationCap,
} from 'lucide-react';

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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Royal Navy & Orange Hero Banner with Pumpkin Mascot */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#001B48] via-[#072B61] to-[#0B48A1] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-blue-800/50">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(rgba(251, 191, 36, 0.4) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left max-w-xl">
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
              <span>{tx('แดชบอร์ดผู้สอน', 'Instructor Workspace')} · MaxUp Academy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {tx(`สวัสดีครับ ${adminProfile.fullName}`, `Welcome, ${adminProfile.fullName}`)}
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              {tx(
                'ติดตามความก้าวหน้านักเรียน บันทึกคาบเรียน และบริหารหลักสูตร',
                'Monitor student mastery, log sessions, and manage curriculum for'
              )}{' '}
              <strong className="text-amber-300 font-bold">{activeSubject.name}</strong>
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
              <button
                onClick={onOpenLessonModal}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#FF7A00] to-[#F55D00] hover:from-[#F55D00] hover:to-[#E05000] rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-white" />
                <span>{tx('บันทึกคาบเรียน', 'Log Lesson')}</span>
              </button>
              <button
                onClick={onNavigateToSyllabus}
                className="px-3.5 py-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all cursor-pointer backdrop-blur-xs"
              >
                {tx(
                  `สารบัญวิชา (${activeSubject.topics.length} บท)`,
                  `Syllabus (${activeSubject.topics.length} Units)`
                )}
              </button>
              {onNavigateToSchedule && (
                <button
                  onClick={onNavigateToSchedule}
                  className="px-3.5 py-2 text-xs font-bold text-amber-200 bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 rounded-xl transition-all cursor-pointer"
                >
                  {tx('ตารางสอน', 'Schedule')}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Course Spotlight Badge */}
        <SpotlightCard
          spotlightColor="rgba(251, 191, 36, 0.25)"
          className="relative z-10 shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 min-w-[210px] text-center"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center mx-auto mb-2.5 shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="text-xs font-bold text-white line-clamp-1">
            {activeSubject.name || tx('คอร์สเรียน', 'Active Course')}
          </div>
          <div className="text-[11px] text-blue-200 mt-1">
            {tx(`นักเรียนทั้งหมด ${students.length} คน`, `${students.length} Enrolled Students`)}
          </div>
        </SpotlightCard>
      </section>

      {/* 21st.dev Stats Bento Grid with SpotlightCard & NumberTicker */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SpotlightCard
          spotlightColor="rgba(245, 158, 11, 0.12)"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-amber-300"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{tx('ชั่วโมงสอนสะสม', 'Teaching Hours')}</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            <NumberTicker value={totalHoursNum} decimals={1} />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{tx('คำนวณจากเวลาเรียนจริง', 'Calculated from logged sessions')}</span>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(30, 58, 138, 0.1)"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-blue-300"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{tx('จำนวนคาบที่สอน', 'Completed Sessions')}</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-900" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            <NumberTicker value={totalLessons} />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{tx('บันทึกในระบบทั้งหมด', 'Total recorded lessons')}</span>
          </div>
        </SpotlightCard>

        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.12)"
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:border-emerald-300"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">{tx('นักเรียนในความดูแล', 'Active Students')}</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            <NumberTicker value={students.length} />
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>{tx('กำลังเรียนอย่างต่อเนื่อง', 'Currently enrolled')}</span>
          </div>
        </SpotlightCard>
      </section>

      {/* Student Roster & Quick Progress (21st.dev Course Design Cards) */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {tx('ความคืบหน้านักเรียน', 'Student Progress')}
            </h2>
            <p className="text-xs text-slate-500">
              {tx(`อ้างอิงตามสารบัญวิชา ${activeSubject.name}`, `Based on ${activeSubject.name} syllabus`)}
            </p>
          </div>
          <button
            onClick={onNavigateToStudents}
            className="text-xs font-bold text-blue-900 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>{tx('จัดการนักเรียน', 'Manage Students')}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-xs text-slate-500">
            {tx('ยังไม่มีรายชื่อนักเรียนในระบบ', 'No students enrolled yet')}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {students.map((st) => {
              const stProgress = progressMap[st.id] || [];
              const completedCount = stProgress.filter(
                (p) => p.status === 'completed' || p.status === 'mastered'
              ).length;
              const percent =
                totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;
              const stLessons = lessons.filter((l) => l.studentId === st.id);
              const stHours = (
                stLessons.reduce((acc, l) => acc + l.durationMinutes, 0) / 60
              ).toFixed(1);

              return (
                <SpotlightCard
                  key={st.id}
                  spotlightColor="rgba(59, 130, 246, 0.1)"
                  className="border border-slate-200/90 rounded-2xl p-4 hover:border-blue-300 bg-slate-50/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{st.nickname}</h3>
                        <p className="text-xs text-slate-500">{st.fullName}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-lg">
                        {st.grade}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-2">
                      {tx('เป้าหมาย:', 'Goal:')}{' '}
                      <span className="font-semibold text-slate-800">
                        {st.targetFaculty || st.targetExam || '-'}
                      </span>
                    </p>

                    {/* Progress bar */}
                    <div className="mt-3.5 space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{tx('ความคืบหน้าสารบัญ', 'Syllabus Mastery')}</span>
                        <span className="font-mono tabular-nums font-bold text-slate-800">
                          {completedCount}/{totalSubtopics} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-slate-900 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono tabular-nums">
                      {tx(
                        `${stHours} ชม. · ${stLessons.length} คาบ`,
                        `${stHours} hrs · ${stLessons.length} sessions`
                      )}
                    </span>
                    <button
                      onClick={onNavigateToStudents}
                      className="font-bold text-blue-900 hover:text-blue-700 inline-flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>{tx('ดูข้อมูล', 'Details')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent Lesson Logs Table */}
      <section className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {tx('ประวัติบันทึกคาบเรียน', 'Lesson History')}
            </h2>
            <p className="text-xs text-slate-500">
              {tx('รายการบันทึกการสอนและเอกสารประกอบรายคาบ', 'All recorded sessions and attached study materials')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter by student */}
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs font-medium rounded-xl px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
            >
              <option value="all">{tx('นักเรียนทุกคน', 'All Students')}</option>
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.nickname}
                </option>
              ))}
            </select>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={tx('ค้นหาบันทึก...', 'Search logs...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 text-slate-700 w-36 sm:w-48 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl bg-slate-50/40">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-2">
              {tx('ยังไม่มีบันทึกคาบเรียน', 'No lesson logs found')}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {tx('กดปุ่ม "บันทึกคาบเรียน" ด้านบนเพื่อเพิ่มข้อมูล', 'Click "Log Lesson" above to record a session')}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLessons.map((les) => {
              const student = students.find((s) => s.id === les.studentId);
              const durationHours = (les.durationMinutes / 60).toFixed(1);

              return (
                <div
                  key={les.id}
                  className="py-4 hover:bg-slate-50/80 rounded-xl px-3 transition-colors space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {student?.nickname ? student.nickname.slice(0, 2) : 'ST'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">
                            {student?.nickname || tx('นักเรียน', 'Student')}
                          </h4>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500 font-mono tabular-nums flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {les.lessonDate}
                          </span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500 font-mono tabular-nums">
                            {les.startTime}–{les.endTime} ({durationHours} {tx('ชม.', 'h')})
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{student?.fullName || '-'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <button
                        onClick={() => onEditLesson(les)}
                        className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title={tx('แก้ไข', 'Edit')}
                      >
                        <Edit2 className="w-4 h-4" />
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
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title={tx('ลบ', 'Delete')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Detail */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {les.contentDetail}
                  </p>

                  {/* Covered Subtopics Badges */}
                  {(les.subtopicIds || []).length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                      <span className="text-slate-400 font-medium">
                        {tx('หัวข้อที่เรียน:', 'Covered topics:')}
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
                            className="bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md text-[11px] font-medium"
                          >
                            {subName}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Links & Resources */}
                  {(les.handwrittenSolutionUrl || les.googleDriveUrl) && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {les.handwrittenSolutionUrl && (
                        <a
                          href={les.handwrittenSolutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-all"
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
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-lg transition-all"
                        >
                          <FolderOpen className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{tx('เอกสารประกอบการเรียน', 'Study Sheet')}</span>
                          <ExternalLink className="w-3 h-3 text-emerald-700" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Homework & Attachments info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    {les.homework && (
                      <span className="flex items-center gap-1.5 text-blue-900 font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        {tx('การบ้าน:', 'Homework:')} {les.homework.title} (
                        {les.homework.status === 'submitted'
                          ? tx('ส่งแล้ว ✅', 'Submitted ✅')
                          : tx('รอส่ง ⏳', 'Pending ⏳')}
                        )
                      </span>
                    )}

                    {les.attachments && les.attachments.length > 0 && (
                      <span className="flex items-center gap-1 text-slate-600">
                        <FileText className="w-3.5 h-3.5 text-slate-400" />
                        {les.attachments[0].name}
                      </span>
                    )}

                    {les.teacherNote && (
                      <span className="text-slate-500 italic">
                        {tx('โน้ตครู:', 'Note:')} "{les.teacherNote}"
                      </span>
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
};
