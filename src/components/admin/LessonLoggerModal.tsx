import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson, Homework } from '../../types';
import {
  X,
  Clock,
  Calendar,
  BookOpen,
  Check,
  FolderOpen,
  UserPlus,
  Plus,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface LessonLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  editLesson?: Lesson | null;
}

export const LessonLoggerModal: React.FC<LessonLoggerModalProps> = ({
  isOpen,
  onClose,
  editLesson,
}) => {
  const {
    students,
    courses,
    subjects,
    activeSubjectId,
    addLesson,
    updateLesson,
    addStudent,
    addCourse,
    schedulePlans,
    toggleSchedulePlanStatus,
  } = useApp();

  const [studentId, setStudentId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [lessonDate, setLessonDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('17:00');
  const [endTime, setEndTime] = useState<string>('19:00');
  const [selectedSubtopicIds, setSelectedSubtopicIds] = useState<string[]>([]);
  const [contentDetail, setContentDetail] = useState<string>('');
  const [score, setScore] = useState<number>(5);
  const [scoreScale, setScoreScale] = useState<'1-5' | '0-100'>('1-5');
  const [teacherNote, setTeacherNote] = useState<string>('');
  const [googleDriveUrl, setGoogleDriveUrl] = useState<string>('');
  const [handwrittenSolutionUrl, setHandwrittenSolutionUrl] = useState<string>('');
  const [hasHomework, setHasHomework] = useState<boolean>(false);
  const [hwTitle, setHwTitle] = useState<string>('');
  const [hwDescription, setHwDescription] = useState<string>('');
  const [hwDueDate, setHwDueDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSchedulePlanId, setSelectedSchedulePlanId] = useState<string>('');

  const handleSelectSchedulePlan = (planId: string) => {
    setSelectedSchedulePlanId(planId);
    if (!planId) return;
    const plan = schedulePlans.find((p) => p.id === planId);
    if (!plan) return;

    if (plan.studentId && plan.studentId !== 'all') {
      setStudentId(plan.studentId);
    } else if (students.length > 0 && !studentId) {
      setStudentId(students[0].id);
    }
    if (plan.courseId) {
      setSelectedSubjectId(plan.courseId);
    }
    if (plan.date) {
      setLessonDate(plan.date);
    }
    if (plan.startTime) {
      setStartTime(plan.startTime);
    }
    if (plan.endTime) {
      setEndTime(plan.endTime);
    }
    if (plan.plannedSubtopicIds && plan.plannedSubtopicIds.length > 0) {
      setSelectedSubtopicIds(plan.plannedSubtopicIds);
    }
    if (plan.plannedContentDescription || plan.title) {
      setContentDetail(plan.plannedContentDescription || plan.title);
    }
    if (plan.googleDriveUrl) {
      setGoogleDriveUrl(plan.googleDriveUrl);
    }
  };

  // Quick inline add student state if students list is empty
  const [showQuickAddStudent, setShowQuickAddStudent] = useState(false);
  const [quickStudentNickname, setQuickStudentNickname] = useState('');
  const [quickStudentFullName, setQuickStudentFullName] = useState('');

  // Quick inline add course state if courses list is empty
  const [showQuickAddCourse, setShowQuickAddCourse] = useState(false);
  const [quickCourseName, setQuickCourseName] = useState('');

  // Synchronize initial selections
  useEffect(() => {
    if (isOpen) {
      if (editLesson) {
        setStudentId(editLesson.studentId);
        setSelectedSubjectId(editLesson.subjectId);
        setLessonDate(editLesson.lessonDate);
        setStartTime(editLesson.startTime);
        setEndTime(editLesson.endTime);
        setSelectedSubtopicIds(editLesson.subtopicIds || []);
        setContentDetail(editLesson.contentDetail || '');
        setScore(editLesson.score);
        setScoreScale(editLesson.scoreScale);
        setTeacherNote(editLesson.teacherNote || '');
        setGoogleDriveUrl(editLesson.googleDriveUrl || '');
        setHandwrittenSolutionUrl(editLesson.handwrittenSolutionUrl || '');
        if (editLesson.homework) {
          setHasHomework(true);
          setHwTitle(editLesson.homework.title);
          setHwDescription(editLesson.homework.description);
          setHwDueDate(editLesson.homework.dueDate);
        } else {
          setHasHomework(false);
        }
      } else {
        // Default new lesson
        if (students.length > 0 && !studentId) {
          setStudentId(students[0].id);
        }
        const defaultCourseId = activeSubjectId || courses[0]?.id || '';
        setSelectedSubjectId(defaultCourseId);
        setLessonDate(new Date().toISOString().split('T')[0]);
        setStartTime('17:00');
        setEndTime('19:00');
        setSelectedSubtopicIds([]);
        setContentDetail('');
        setScore(5);
        setScoreScale('1-5');
        setTeacherNote('');
        setGoogleDriveUrl('');
        setHandwrittenSolutionUrl('');
        setHasHomework(false);
        setHwTitle('');
        setHwDescription('');
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 5);
        setHwDueDate(nextWeek.toISOString().split('T')[0]);
      }
      setErrorMessage('');
    }
  }, [isOpen, editLesson, students, courses, activeSubjectId]);

  if (!isOpen) return null;

  const currentCourse =
    courses.find((c) => c.id === selectedSubjectId) ||
    courses[0] || {
      id: 'default',
      name: 'คอร์สเรียนทั่วไป',
      code: 'GEN',
      description: '',
      topics: [],
    };

  // Calculate duration in minutes automatically
  const calculateDuration = (start: string, end: string): number => {
    try {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      return endMin > startMin ? endMin - startMin : 120;
    } catch {
      return 120;
    }
  };

  const durationMinutes = calculateDuration(startTime, endTime);
  const durationHours = (durationMinutes / 60).toFixed(1);

  // Toggle subtopic selection from course syllabus
  const toggleSubtopic = (id: string, name: string) => {
    setSelectedSubtopicIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];

      // Auto update lesson detail text if empty or appending
      if (!exists && !contentDetail) {
        setContentDetail(`เรียนเรื่อง: ${name}`);
      } else if (!exists && contentDetail && !contentDetail.includes(name)) {
        setContentDetail((prevText) => `${prevText}, ${name}`);
      }

      return updated;
    });
  };

  const handleQuickCreateStudent = () => {
    if (!quickStudentNickname.trim()) return;
    const newId = `std_${Date.now()}`;
    const newStd = {
      id: newId,
      role: 'student' as const,
      fullName: quickStudentFullName.trim() || quickStudentNickname.trim(),
      nickname: quickStudentNickname.trim(),
      username: quickStudentNickname.trim().toLowerCase(),
      password: '1234',
      enrolledCourseIds: [selectedSubjectId || courses[0]?.id || ''],
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
    };
    addStudent(newStd);
    setStudentId(newId);
    setShowQuickAddStudent(false);
    setQuickStudentNickname('');
    setQuickStudentFullName('');
    setErrorMessage('');
  };

  const handleQuickCreateCourse = () => {
    if (!quickCourseName.trim()) return;
    addCourse(quickCourseName.trim(), 'CRS', 'คอร์สเรียน');
    setShowQuickAddCourse(false);
    setQuickCourseName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // If no student exists yet
    let finalStudentId = studentId;
    if (!finalStudentId) {
      if (students.length > 0) {
        finalStudentId = students[0].id;
      } else {
        setErrorMessage('กรุณาเพิ่มนักเรียนในระบบก่อนบันทึกคาบเรียน (กดปุ่ม "เพิ่มนักเรียนด่วน" ด้านบน)');
        return;
      }
    }

    if (!contentDetail.trim()) {
      setErrorMessage('กรุณากรอกรายละเอียดเนื้อหาที่เรียนในคาบนี้');
      return;
    }

    const finalCourseId = selectedSubjectId || courses[0]?.id || 'general';

    let homeworkData: Homework | undefined = undefined;
    if (hasHomework && hwTitle.trim()) {
      homeworkData = {
        id: editLesson?.homework?.id || `hw_${Date.now()}`,
        lessonId: editLesson?.id || '',
        courseId: finalCourseId,
        studentId: finalStudentId,
        title: hwTitle.trim(),
        description: hwDescription.trim(),
        dueDate: hwDueDate || new Date().toISOString().split('T')[0],
        status: editLesson?.homework?.status || 'pending',
      };
    }

    if (editLesson) {
      updateLesson({
        ...editLesson,
        studentId: finalStudentId,
        subjectId: finalCourseId,
        lessonDate,
        startTime,
        endTime,
        durationMinutes,
        subtopicIds: selectedSubtopicIds,
        contentDetail: contentDetail.trim(),
        score,
        scoreScale,
        teacherNote: teacherNote.trim(),
        googleDriveUrl: googleDriveUrl.trim() || undefined,
        handwrittenSolutionUrl: handwrittenSolutionUrl.trim() || undefined,
        homework: homeworkData,
      });
    } else {
      addLesson({
        studentId: finalStudentId,
        subjectId: finalCourseId,
        lessonDate,
        startTime,
        endTime,
        durationMinutes,
        subtopicIds: selectedSubtopicIds,
        contentDetail: contentDetail.trim(),
        score,
        scoreScale,
        teacherNote: teacherNote.trim(),
        googleDriveUrl: googleDriveUrl.trim() || undefined,
        handwrittenSolutionUrl: handwrittenSolutionUrl.trim() || undefined,
        homework: homeworkData,
      });
    }

    if (selectedSchedulePlanId) {
      toggleSchedulePlanStatus(selectedSchedulePlanId, 'completed');
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FFFDF7] w-full max-w-3xl rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-amber-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {editLesson ? 'แก้ไขบันทึกคาบเรียน' : 'บันทึกคาบเรียนใหม่ (Lesson Log)'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              เลือกหัวข้อที่เรียนตาม Course Syllabus คำนวณชั่วโมงอัตโนมัติ และแนบลิงก์ Google Drive
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Quick Import from Schedule Plan */}
          {!editLesson && schedulePlans && schedulePlans.length > 0 && (
            <div className="p-3.5 bg-gradient-to-r from-blue-50/90 to-amber-50/80 border border-blue-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs block">
                    📅 ดึงข้อมูลจากตารางเรียนล่วงหน้า (Import from Schedule)
                  </span>
                  <span className="text-[11px] text-slate-600 block">
                    เลือกคาบเพื่อกรอกนักเรียน วิชา เวลา และหัวข้อในสารบัญให้อัตโนมัติ
                  </span>
                </div>
              </div>

              <select
                value={selectedSchedulePlanId}
                onChange={(e) => handleSelectSchedulePlan(e.target.value)}
                className="bg-white border border-blue-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs cursor-pointer max-w-sm"
              >
                <option value="">-- คลิกเพื่อเลือกคาบจากตารางเรียน --</option>
                {schedulePlans
                  .slice()
                  .sort((a, b) => b.date.localeCompare(a.date))
                  .map((p) => {
                    const st = students.find((s) => s.id === p.studentId);
                    const stName = st ? st.nickname : p.studentId === 'all' ? 'ทุกคน' : 'นักเรียน';
                    const isDone = p.status === 'completed';
                    return (
                      <option key={p.id} value={p.id}>
                        {isDone ? '✓ ' : ''}{p.date} ({p.startTime}–{p.endTime}) • {stName} • {p.title}
                      </option>
                    );
                  })}
              </select>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Row 1: Student & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  เลือกนักเรียนที่เรียนในคาบนี้ *
                </label>
                <button
                  type="button"
                  onClick={() => setShowQuickAddStudent(!showQuickAddStudent)}
                  className="text-[11px] font-semibold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>+ เพิ่มนักเรียนด่วน</span>
                </button>
              </div>

              {showQuickAddStudent && (
                <div className="mb-2 p-2.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2">
                  <div className="text-[11px] font-bold text-blue-900">เพิ่มนักเรียนด่วน</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="ชื่อเล่น เช่น น้องภูมิ"
                      value={quickStudentNickname}
                      onChange={(e) => setQuickStudentNickname(e.target.value)}
                      className="bg-white border border-blue-200 rounded-lg px-2 py-1 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="ชื่อ-นามสกุลจริง"
                      value={quickStudentFullName}
                      onChange={(e) => setQuickStudentFullName(e.target.value)}
                      className="bg-white border border-blue-200 rounded-lg px-2 py-1 text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickCreateStudent}
                    className="w-full py-1 bg-blue-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    ยืนยันเพิ่มนักเรียน
                  </button>
                </div>
              )}

              {students.length === 0 ? (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                  <span>ยังไม่มีนักเรียนในระบบ กรุณากดปุ่ม <strong>"+ เพิ่มนักเรียนด่วน"</strong> ด้านบน</span>
                </div>
              ) : (
                <select
                  value={studentId || students[0]?.id || ''}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.nickname} ({st.fullName || st.grade || 'นักเรียน'})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  คอร์สเรียน / วิชาที่สอน *
                </label>
                <button
                  type="button"
                  onClick={() => setShowQuickAddCourse(!showQuickAddCourse)}
                  className="text-[11px] font-semibold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ เพิ่มคอร์สด่วน</span>
                </button>
              </div>

              {showQuickAddCourse && (
                <div className="mb-2 p-2.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                  <input
                    type="text"
                    placeholder="ชื่อคอร์ส เช่น เคมี ม.5 เล่ม 3"
                    value={quickCourseName}
                    onChange={(e) => setQuickCourseName(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-lg px-2 py-1 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleQuickCreateCourse}
                    className="w-full py-1 bg-amber-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    ยืนยันสร้างคอร์ส
                  </button>
                </div>
              )}

              {courses.length === 0 ? (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
                  <span>ยังไม่มีคอร์สเรียนในระบบ กรุณากดปุ่ม <strong>"+ เพิ่มคอร์สด่วน"</strong> ด้านบน</span>
                </div>
              ) : (
                <select
                  value={selectedSubjectId || courses[0]?.id || ''}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                    setSelectedSubtopicIds([]);
                  }}
                  required
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Row 2: Date & Time */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  วันที่เรียน *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={lessonDate}
                    onChange={(e) => setLessonDate(e.target.value)}
                    required
                    className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  เวลาเริ่ม
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  เวลาสิ้นสุด
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-amber-200/40 flex items-center justify-between text-xs">
              <span className="text-slate-500">คำนวณชั่วโมงสอนสะสมอัตโนมัติ:</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-amber-900">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {durationHours} ชม. ({durationMinutes} นาที)
              </span>
            </div>
          </div>

          {/* Row 3: Course Syllabus Selection ("วันนี้เรียนอะไรไปตาม Course syllabus") */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-900" />
                <span>วันนี้เรียนอะไรไปตาม Course Syllabus (เลือกหัวข้อ):</span>
              </label>
              <span className="text-xs text-slate-500 font-medium">
                เลือกแล้ว {selectedSubtopicIds.length} หัวข้อ
              </span>
            </div>

            <div className="max-h-52 overflow-y-auto border border-amber-200 bg-white rounded-xl p-3 space-y-3">
              {currentCourse?.topics.length === 0 ? (
                <div className="text-center py-6 text-xs text-slate-400 space-y-1">
                  <p>คอร์สนี้ยังไม่มีการใส่สารบัญบทเรียน</p>
                  <p className="text-[11px] text-slate-500">
                    คุณครูสามารถพิมพ์รายละเอียดเนื้อหาที่เรียนในช่องด้านล่างได้โดยตรง หรือไปที่เมนู "จัดการเนื้อหา" เพื่อร่างสารบัญ
                  </p>
                </div>
              ) : (
                (currentCourse?.topics || []).map((top) => {
                  const subs = top.subtopics || [];
                  return (
                    <div key={top.id} className="text-xs border-b border-slate-100 pb-2 last:border-b-0 last:pb-0">
                      <div className="font-bold text-slate-800 mb-1.5 flex items-center justify-between">
                        <span>{top.sortOrder}. {top.name} {top.nameEn ? `(${top.nameEn})` : ''}</span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {subs.length} ข้อย่อย
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                        {subs.map((sub) => {
                        const isSelected = selectedSubtopicIds.includes(sub.id);
                        return (
                          <button
                            type="button"
                            key={sub.id}
                            onClick={() => toggleSubtopic(sub.id, sub.name)}
                            className={`text-left p-2 rounded-lg border transition-all flex items-start gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium'
                                : 'bg-[#FFFDF7] border-amber-100 text-slate-700 hover:border-amber-300'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded mt-0.5 flex-shrink-0 flex items-center justify-center border ${
                                isSelected
                                  ? 'bg-blue-900 border-blue-900 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </div>
                            <span className="leading-snug text-xs">{sub.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
              )}
            </div>
          </div>

          {/* Row 4: Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              สรุปรายละเอียดเนื้อหาที่เรียนในคาบนี้ *
            </label>
            <textarea
              rows={2}
              value={contentDetail}
              onChange={(e) => setContentDetail(e.target.value)}
              placeholder="คลิกเลือกหัวข้อจาก Syllabus ด้านบน หรือพิมพ์สรุปเนื้อหาที่สอนในคาบนี้"
              required
              className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          {/* Row 5: Google Drive Link (เก็บ Google Drive แทน วางลิงก์เอง) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>ลิงก์ Google Drive ชีทเรียน (Optional):</span>
              </label>
              <input
                type="url"
                value={googleDriveUrl}
                onChange={(e) => setGoogleDriveUrl(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                วางลิงก์ Google Drive ชีทเรียนเพื่อให้นักเรียนกดเปิดอ่าน
              </p>
            </div>

            {/* Handwritten Solution File Link (เฉลยจากการเขียนลายมือ) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <span className="text-amber-600 font-bold">✍️</span>
                <span>ลิงก์เฉลยจากการเขียนลายมือครู Max (Optional):</span>
              </label>
              <input
                type="url"
                value={handwrittenSolutionUrl}
                onChange={(e) => setHandwrittenSolutionUrl(e.target.value)}
                placeholder="https://drive.google.com/... (ไฟล์เฉลยลายมือ)"
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
              <p className="text-[10px] text-slate-500 mt-0.5">
                แปะลิงก์เฉลยที่ครู Max เขียนลายมือให้น้องเปิดทบทวนวิธีคิด
              </p>
            </div>
          </div>

          {/* Row 6: Score & Teacher Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                คะแนนความตั้งใจ / ความเข้าใจในคาบนี้ (1 - 5 ดาว)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-amber-700 w-10 text-right">
                  {score} / 5 ⭐
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                โน้ตถึงผู้ปกครอง / นักเรียน (Optional)
              </label>
              <input
                type="text"
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                placeholder="เช่น ทำความเข้าใจได้ดีมาก แนะนำให้ทำโจทย์ข้อ 4 เพิ่ม"
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Row 7: Homework Toggle */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
              <input
                type="checkbox"
                checked={hasHomework}
                onChange={(e) => setHasHomework(e.target.checked)}
                className="rounded text-blue-900 focus:ring-blue-900"
              />
              <span>สั่งการบ้านในคาบนี้ด้วย</span>
            </label>

            {hasHomework && (
              <div className="space-y-2 pt-1 border-t border-slate-200 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="หัวข้อการบ้าน เช่น แบบฝึกหัดท้ายบทข้อ 1-10"
                    value={hwTitle}
                    onChange={(e) => setHwTitle(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                  <input
                    type="date"
                    value={hwDueDate}
                    onChange={(e) => setHwDueDate(e.target.value)}
                    className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="คำอธิบายรายละเอียดการบ้าน หรือข้อที่ต้องทำส่ง"
                  value={hwDescription}
                  onChange={(e) => setHwDescription(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                />
              </div>
            )}
          </div>

          {/* Form Submit & Cancel */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-98"
            >
              {editLesson ? 'บันทึกการเปลี่ยนแปลง' : 'ยืนยันบันทึกคาบเรียน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
