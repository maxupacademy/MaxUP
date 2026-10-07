import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson } from '../../types';
import { ProfessorMeow } from '../brand/ProfessorMeow';
import {
  Clock,
  BookOpen,
  Users,
  Award,
  Calendar,
  Search,
  PlusCircle,
  FileText,
  Trash2,
  Edit2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenLessonModal: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onNavigateToSyllabus: () => void;
  onNavigateToStudents: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onOpenLessonModal,
  onEditLesson,
  onNavigateToSyllabus,
  onNavigateToStudents,
}) => {
  const {
    students,
    lessons,
    activeSubject,
    progressMap,
    deleteLesson,
    adminProfile,
  } = useApp();

  const [studentFilter, setStudentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Analytics
  const totalMinutes = lessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);
  const totalLessons = lessons.length;
  const avgScore =
    totalLessons > 0
      ? (
          lessons.reduce((acc, l) => acc + (l.scoreScale === '1-5' ? l.score * 20 : l.score), 0) /
          totalLessons
        ).toFixed(0)
      : '0';

  // Total subtopics in subject
  const totalSubtopics = activeSubject.topics.reduce((acc, t) => acc + t.subtopics.length, 0);

  // Filter lessons
  const filteredLessons = lessons.filter((lesson) => {
    const matchesStudent = studentFilter === 'all' || lesson.studentId === studentFilter;
    const matchesQuery =
      lesson.contentDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.teacherNote && lesson.teacherNote.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStudent && matchesQuery;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner with Professor Meow mascot */}
      <section className="bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-blue-900/10 border border-amber-900/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-white/80 border border-blue-900/15 px-3 py-1 rounded-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ระบบบันทึกและติดตามการสอน MaxUp TutorHub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            สวัสดีครับ {adminProfile.fullName}
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            ติดตามประวัติการสอน บันทึกคาบเรียนแบบ Real-time และดูภาพรวมการติวของนักเรียนทุกคนในหลักสูตร{' '}
            <strong className="text-blue-900">{activeSubject.name}</strong>
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3 justify-center md:justify-start">
            <button
              onClick={onOpenLessonModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-300" />
              <span>บันทึกคาบเรียนใหม่</span>
            </button>
            <button
              onClick={onNavigateToSyllabus}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all"
            >
              ดูสารบัญวิชา ({activeSubject.topics.length} บทใหญ่)
            </button>
          </div>
        </div>

        {/* Mascot */}
        <div className="flex-shrink-0">
          <ProfessorMeow
            pose="cheering"
            size="lg"
            bubbleText="สวัสดีครับครูพี่แม็ก! พร้อมติวเข้มเด็กๆ วันนี้แล้วเมี๊ยว!"
          />
        </div>
      </section>

      {/* 4 Quantitative Metric Cards (Tabular numerals, zero-pill discipline) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">ชั่วโมงสอนสะสม</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {totalHours}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>คำนวณจากบันทึกเวลาจริง</span>
          </div>
        </div>

        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">จำนวนคาบที่สอน</span>
            <BookOpen className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {totalLessons}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>ทุกวิชาและนักเรียน</span>
          </div>
        </div>

        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">นักเรียนในความดูแล</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {students.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>กำลังติวอย่างต่อเนื่อง</span>
          </div>
        </div>

        <div className="bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">คะแนนประเมินเฉลี่ย</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {avgScore}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span>ระดับความเข้าใจของนักเรียน</span>
          </div>
        </div>
      </section>

      {/* Student Roster & Quick Progress */}
      <section className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">นักเรียนในหลักสูตร (Student Progress)</h2>
            <p className="text-xs text-slate-500">ความคืบหน้าตามสารบัญเคมี A-Level</p>
          </div>
          <button
            onClick={onNavigateToStudents}
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
          >
            <span>จัดการนักเรียนทั้งหมด</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

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
              <div
                key={st.id}
                className="border border-slate-200/80 rounded-xl p-4 hover:border-amber-400 transition-all bg-[#FFFDF7]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{st.nickname}</h3>
                      <p className="text-xs text-slate-500">{st.fullName}</p>
                    </div>
                    <span className="text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                      {st.grade}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2">
                    เป้าหมาย: <span className="font-medium text-amber-900">{st.targetFaculty || st.targetExam}</span>
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>ครอบคลุมสารบัญ</span>
                      <span className="font-mono tabular-nums font-semibold text-slate-700">
                        {completedCount}/{totalSubtopics} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-blue-900 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono tabular-nums">
                    เรียนแล้ว {stHours} ชม. ({stLessons.length} คาบ)
                  </span>
                  <button
                    onClick={onNavigateToStudents}
                    className="font-medium text-blue-900 hover:text-blue-700 underline underline-offset-2 cursor-pointer"
                  >
                    จัดการข้อมูลนักเรียน →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Lesson Logs Table */}
      <section className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">ประวัติบันทึกคาบเรียน (Lesson Logs)</h2>
            <p className="text-xs text-slate-500">รายการบันทึกการสอนทั้งหมด พร้อมคะแนนและการบ้าน</p>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter by student */}
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="bg-white border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">นักเรียนทุกคน</option>
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
                placeholder="ค้นหาเนื้อหา/บันทึก..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border border-slate-200 text-xs rounded-lg pl-7 pr-3 py-1.5 text-slate-700 w-36 sm:w-48 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-amber-200 rounded-xl bg-amber-50/20">
            <ProfessorMeow pose="thinking" size="md" className="mx-auto" />
            <p className="text-sm font-semibold text-slate-700 mt-2">ยังไม่มีบันทึกคาบเรียนที่ตรงกับเงื่อนไข</p>
            <p className="text-xs text-slate-500 mt-1">สามารถกดปุ่ม "บันทึกคาบเรียนใหม่" เพื่อเริ่มต้นบันทึก</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLessons.map((les) => {
              const student = students.find((s) => s.id === les.studentId);
              const durationHours = (les.durationMinutes / 60).toFixed(1);

              return (
                <div
                  key={les.id}
                  className="py-4 hover:bg-slate-50/70 rounded-xl px-3 transition-colors space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-900 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                        {student?.nickname.slice(0, 2) || 'ST'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{student?.nickname}</h4>
                          <span className="text-slate-400">·</span>
                          <span className="text-xs text-slate-500 font-mono tabular-nums flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {les.lessonDate}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="text-xs text-slate-500 font-mono tabular-nums">
                            {les.startTime}–{les.endTime} ({durationHours} ชม.)
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{student?.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <div className="text-right mr-2">
                        <span className="text-xs font-semibold text-amber-700">
                          {les.scoreScale === '1-5' ? `${les.score}/5 ⭐` : `${les.score}/100 คะแนน`}
                        </span>
                      </div>

                      <button
                        onClick={() => onEditLesson(les)}
                        className="p-1.5 text-slate-400 hover:text-blue-900 rounded-lg hover:bg-slate-100 transition-colors"
                        title="แก้ไข"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('ยืนยันการลบบันทึกการสอนคาบนี้หรือไม่?')) {
                            deleteLesson(les.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="ลบคาบเรียนนี้"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content Detail */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-100">
                    {les.contentDetail}
                  </p>

                  {/* Covered Subtopics Badges (clean unboxed text or soft tags) */}
                  {les.subtopicIds.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                      <span className="text-slate-400 font-medium">หัวข้อที่สอน:</span>
                      {les.subtopicIds.map((subId) => {
                        let subName = subId;
                        activeSubject.topics.forEach((t) => {
                          const found = t.subtopics.find((s) => s.id === subId);
                          if (found) subName = found.name;
                        });
                        return (
                          <span
                            key={subId}
                            className="bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded text-[11px]"
                          >
                            {subName}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Homework & Attachments info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    {les.homework && (
                      <span className="flex items-center gap-1.5 text-blue-900 font-medium">
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                        การบ้าน: {les.homework.title} (กำหนดส่ง {les.homework.dueDate} —{' '}
                        {les.homework.status === 'submitted' ? 'ส่งแล้ว ✅' : 'ยังไม่ส่ง ⏳'})
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
                        โน้ตครู: "{les.teacherNote}"
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
