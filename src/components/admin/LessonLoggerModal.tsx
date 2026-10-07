import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson, Homework } from '../../types';
import { X, Clock, Calendar, BookOpen, Star, Paperclip, Check } from 'lucide-react';

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
  const { students, subjects, activeSubjectId, addLesson, updateLesson } = useApp();

  const [studentId, setStudentId] = useState<string>(students[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubjectId);
  const [lessonDate, setLessonDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('17:00');
  const [endTime, setEndTime] = useState<string>('19:00');
  const [selectedSubtopicIds, setSelectedSubtopicIds] = useState<string[]>([]);
  const [contentDetail, setContentDetail] = useState<string>('');
  const [score, setScore] = useState<number>(5);
  const [scoreScale, setScoreScale] = useState<'1-5' | '0-100'>('1-5');
  const [teacherNote, setTeacherNote] = useState<string>('');
  const [hasHomework, setHasHomework] = useState<boolean>(true);
  const [hwTitle, setHwTitle] = useState<string>('');
  const [hwDescription, setHwDescription] = useState<string>('');
  const [hwDueDate, setHwDueDate] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string>('');

  const currentSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  // Calculate duration in minutes automatically
  const calculateDuration = (start: string, end: string): number => {
    try {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      return endMin > startMin ? endMin - startMin : 60;
    } catch {
      return 60;
    }
  };

  const durationMinutes = calculateDuration(startTime, endTime);
  const durationHours = (durationMinutes / 60).toFixed(1);

  // Load existing lesson for edit
  useEffect(() => {
    if (editLesson) {
      setStudentId(editLesson.studentId);
      setSelectedSubjectId(editLesson.subjectId);
      setLessonDate(editLesson.lessonDate);
      setStartTime(editLesson.startTime);
      setEndTime(editLesson.endTime);
      setSelectedSubtopicIds(editLesson.subtopicIds);
      setContentDetail(editLesson.contentDetail);
      setScore(editLesson.score);
      setScoreScale(editLesson.scoreScale);
      setTeacherNote(editLesson.teacherNote || '');
      if (editLesson.homework) {
        setHasHomework(true);
        setHwTitle(editLesson.homework.title);
        setHwDescription(editLesson.homework.description);
        setHwDueDate(editLesson.homework.dueDate);
      } else {
        setHasHomework(false);
      }
      if (editLesson.attachments && editLesson.attachments.length > 0) {
        setAttachmentName(editLesson.attachments[0].name);
      }
    } else {
      // Defaults
      if (students.length > 0) setStudentId(students[0].id);
      setSelectedSubjectId(activeSubjectId);
      setLessonDate(new Date().toISOString().split('T')[0]);
      setStartTime('17:00');
      setEndTime('19:00');
      setSelectedSubtopicIds([]);
      setContentDetail('');
      setScore(5);
      setScoreScale('1-5');
      setTeacherNote('');
      setHasHomework(true);
      setHwTitle('');
      setHwDescription('');
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 5);
      setHwDueDate(nextWeek.toISOString().split('T')[0]);
      setAttachmentName('');
    }
  }, [editLesson, students, isOpen, activeSubjectId]);

  if (!isOpen) return null;

  const [errorMessage, setErrorMessage] = useState('');

  const toggleSubtopic = (id: string) => {
    setSelectedSubtopicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!studentId) {
      setErrorMessage('กรุณาเลือกนักเรียน');
      return;
    }
    if (!contentDetail.trim()) {
      setErrorMessage('กรุณากรอกรายละเอียดเนื้อหาที่เรียน');
      return;
    }

    let homeworkData: Homework | undefined = undefined;
    if (hasHomework && hwTitle.trim()) {
      homeworkData = {
        id: editLesson?.homework?.id || `hw_${Date.now()}`,
        lessonId: editLesson?.id || '',
        courseId: selectedSubjectId,
        studentId,
        title: hwTitle.trim(),
        description: hwDescription.trim(),
        dueDate: hwDueDate || new Date().toISOString().split('T')[0],
        status: editLesson?.homework?.status || 'pending',
      };
    }

    const attachments = attachmentName.trim()
      ? [
          {
            id: `att_${Date.now()}`,
            name: attachmentName.trim(),
            fileType: 'pdf' as const,
            size: '1.8 MB',
          },
        ]
      : undefined;

    if (editLesson) {
      updateLesson({
        ...editLesson,
        studentId,
        subjectId: selectedSubjectId,
        lessonDate,
        startTime,
        endTime,
        durationMinutes,
        subtopicIds: selectedSubtopicIds,
        contentDetail: contentDetail.trim(),
        score,
        scoreScale,
        teacherNote: teacherNote.trim(),
        homework: homeworkData,
        attachments,
      });
    } else {
      addLesson({
        studentId,
        subjectId: selectedSubjectId,
        lessonDate,
        startTime,
        endTime,
        durationMinutes,
        subtopicIds: selectedSubtopicIds,
        contentDetail: contentDetail.trim(),
        score,
        scoreScale,
        teacherNote: teacherNote.trim(),
        homework: homeworkData,
        attachments,
      });
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
              ระบบคำนวณชั่วโมงอัตโนมัติ เชื่อมโยงสารบัญและการบ้าน
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Student, Subject & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                เลือกนักเรียน *
              </label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.nickname} ({st.grade})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                วิชาที่สอน *
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => {
                  setSelectedSubjectId(e.target.value);
                  setSelectedSubtopicIds([]);
                }}
                required
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                วันที่เรียน *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={lessonDate}
                  onChange={(e) => setLessonDate(e.target.value)}
                  required
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
                <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Time & Duration */}
          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
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

              <div className="sm:text-right pt-2 sm:pt-0">
                <span className="text-[11px] text-slate-500 block">คำนวณชั่วโมงอัตโนมัติ</span>
                <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-amber-900 mt-0.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  {durationHours} ชม. ({durationMinutes} นาที)
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Syllabus Subtopic Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-900" />
                หัวข้อในสารบัญ {currentSubject?.name} (เลือกได้หลายข้อ)
              </label>
              <span className="text-xs text-slate-500">
                เลือกแล้ว {selectedSubtopicIds.length} หัวข้อ
              </span>
            </div>

            <div className="max-h-48 overflow-y-auto border border-amber-200 bg-white rounded-xl p-3 space-y-3">
              {currentSubject?.topics.map((top) => (
                <div key={top.id} className="text-xs">
                  <div className="font-semibold text-slate-700 mb-1 px-1">
                    {top.sortOrder}. {top.name} {top.nameEn ? `(${top.nameEn})` : ''}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                    {top.subtopics.map((sub) => {
                      const isSelected = selectedSubtopicIds.includes(sub.id);
                      return (
                        <button
                          type="button"
                          key={sub.id}
                          onClick={() => toggleSubtopic(sub.id)}
                          className={`text-left p-2 rounded-lg border transition-all flex items-start gap-2 ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-400 text-blue-900'
                              : 'bg-[#FFFDF7] border-amber-100/80 text-slate-700 hover:border-amber-300'
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
                          <span className="leading-tight text-xs">{sub.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 4: Detailed Content */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              คำอธิบายรายละเอียดเนื้อหาที่เรียนในคาบนี้ *
            </label>
            <textarea
              rows={3}
              value={contentDetail}
              onChange={(e) => setContentDetail(e.target.value)}
              placeholder="เช่น ตะลุยโจทย์เนื้อหาสำคัญ สรุปสูตร และวิเคราะห์ข้อสอบเก่า น้องทำได้คล่องแคล่ว..."
              required
              className="w-full bg-white border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          {/* Row 5: Assessment & Teacher Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  คะแนนประเมินความเข้าใจ
                </label>
                <div className="text-xs text-slate-500 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setScoreScale('1-5');
                      setScore(5);
                    }}
                    className={`cursor-pointer ${scoreScale === '1-5' ? 'font-bold text-amber-800' : ''}`}
                  >
                    สเกล 1–5
                  </button>
                  <span>|</span>
                  <button
                    type="button"
                    onClick={() => {
                      setScoreScale('0-100');
                      setScore(85);
                    }}
                    className={`cursor-pointer ${scoreScale === '0-100' ? 'font-bold text-amber-800' : ''}`}
                  >
                    สเกล 0–100
                  </button>
                </div>
              </div>

              {scoreScale === '1-5' ? (
                <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-xl p-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setScore(val)}
                      className={`flex-1 py-1 text-xs font-bold rounded-lg transition-all ${
                        score === val
                          ? 'bg-amber-500 text-white shadow-xs'
                          : 'bg-amber-50 text-slate-700 hover:bg-amber-100'
                      }`}
                    >
                      {val} ⭐
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-3 bg-white border border-amber-200 rounded-xl px-3 py-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                    className="flex-1 accent-amber-600"
                  />
                  <span className="font-bold text-amber-900 w-12 text-right text-xs">{score}%</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                หมายเหตุเพิ่มเติม / ข้อแนะนำถึงนักเรียน
              </label>
              <input
                type="text"
                value={teacherNote}
                onChange={(e) => setTeacherNote(e.target.value)}
                placeholder="เช่น ทำได้ดีเยี่ยม แนะนำให้ทบทวนสูตรเพิ่มเติม"
                className="w-full bg-white border border-amber-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Row 6: Homework Section */}
          <div className="border border-amber-200/80 rounded-xl p-4 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-800 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHomework}
                  onChange={(e) => setHasHomework(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4"
                />
                มอบหมายการบ้านในคาบนี้
              </label>
              {hasHomework && (
                <span className="text-xs text-amber-800 font-medium">มีกำหนดส่ง</span>
              )}
            </div>

            {hasHomework && (
              <div className="space-y-3 pt-2 border-t border-amber-100 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">หัวข้อการบ้าน *</label>
                    <input
                      type="text"
                      value={hwTitle}
                      onChange={(e) => setHwTitle(e.target.value)}
                      placeholder="เช่น ทำแบบฝึกหัดท้ายบท 15 ข้อ"
                      className="w-full bg-[#FFFDF7] border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">กำหนดส่ง (Due Date)</label>
                    <input
                      type="date"
                      value={hwDueDate}
                      onChange={(e) => setHwDueDate(e.target.value)}
                      className="w-full bg-[#FFFDF7] border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">คำสั่งหรือรายละเอียดเพิ่มเติม</label>
                  <input
                    type="text"
                    value={hwDescription}
                    onChange={(e) => setHwDescription(e.target.value)}
                    placeholder="เช่น ทำลงในสมุดหรือชีท ถ่ายรูปส่งในระบบก่อนวันเรียนถัดไป"
                    className="w-full bg-[#FFFDF7] border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Row 7: Attachment */}
          <div className="flex items-center gap-2 text-xs">
            <Paperclip className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={attachmentName}
              onChange={(e) => setAttachmentName(e.target.value)}
              placeholder="ชื่อไฟล์ใบงาน / เอกสารประกอบคาบ (เช่น MaxUp_Exercise_Sheet.pdf)"
              className="flex-1 bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Error Message Banner */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <span className="font-bold">⚠️ ข้อผิดพลาด:</span> {errorMessage}
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-amber-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 active:scale-98 rounded-lg shadow-sm transition-all"
            >
              {editLesson ? 'บันทึกการเปลี่ยนแปลง' : 'ยืนยันบันทึกคาบเรียน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
