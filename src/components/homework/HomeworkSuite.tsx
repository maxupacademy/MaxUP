import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Homework, HomeworkSubmission } from '../../types';
import { ProfessorMeow } from '../brand/ProfessorMeow';
import {
  ClipboardList,
  Plus,
  CheckCircle,
  Clock,
  FileText,
  Image as ImageIcon,
  Send,
  Sparkles,
  Award,
  ChevronRight,
  X,
  Upload,
  AlertCircle,
  HelpCircle,
  Calendar,
  Check,
  Eye,
  FileCheck,
} from 'lucide-react';

export const HomeworkSuite: React.FC = () => {
  const {
    currentUserRole,
    currentUser,
    activeStudent,
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    homeworks,
    addHomework,
    deleteHomework,
    submitHomework,
    gradeHomeworkSubmission,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'student_list' | 'admin_grading' | 'admin_list'>(
    currentUserRole === 'admin' ? 'admin_grading' : 'student_list'
  );
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  // Submit Modal state (Student)
  const [selectedHwToSubmit, setSelectedHwToSubmit] = useState<Homework | null>(null);
  const [submissionMethod, setSubmissionMethod] = useState<'text' | 'image' | 'pdf'>('text');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [attachedFileData, setAttachedFileData] = useState<string | undefined>(undefined);
  const [attachedFileName, setAttachedFileName] = useState('');
  const [attachedFileSize, setAttachedFileSize] = useState('');

  // Create Homework Modal state (Admin)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDueDate, setNewDueDate] = useState('2026-10-25');
  const [newMaxScore, setNewMaxScore] = useState(10);
  const [newAllowedTypes, setNewAllowedTypes] = useState<('pdf' | 'image' | 'text')[]>([
    'pdf',
    'image',
    'text',
  ]);

  // Grading Modal state (Admin)
  const [selectedSubmissionToGrade, setSelectedSubmissionToGrade] = useState<{
    hw: Homework;
    submission: HomeworkSubmission;
  } | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(10);
  const [gradeFeedback, setGradeFeedback] = useState<string>('');

  // Current student id
  const currentStudentId = currentUserRole === 'student' ? currentUser?.id || 'student_phoom' : activeStudent?.id;
  const currentStudentName = currentUserRole === 'student' ? currentUser?.nickname || 'นักเรียน' : activeStudent?.nickname;

  // Filter homeworks for current active course
  const courseHomeworks = homeworks.filter(
    (hw) => hw.courseId === activeCourseId || hw.courseId === 'all'
  );

  // Quick Math & Science Symbols for students typing equations
  const mathSymbols = [
    { label: 'x²', val: '²' },
    { label: 'x³', val: '³' },
    { label: 'x₁', val: '₁' },
    { label: 'x₂', val: '₂' },
    { label: '√', val: '√' },
    { label: '±', val: '±' },
    { label: '×', val: '×' },
    { label: '÷', val: '÷' },
    { label: '≈', val: '≈' },
    { label: '≠', val: '≠' },
    { label: '≤', val: '≤' },
    { label: '≥', val: '≥' },
    { label: 'π', val: 'π' },
    { label: 'θ', val: 'θ' },
    { label: 'Δ', val: 'Δ' },
    { label: 'Σ', val: 'Σ' },
    { label: '∫', val: '∫' },
    { label: '∞', val: '∞' },
  ];

  const chemSymbols = [
    { label: '→', val: ' → ' },
    { label: '⇌', val: ' ⇌ ' },
    { label: 'H₂O', val: 'H₂O' },
    { label: 'CO₂', val: 'CO₂' },
    { label: 'H⁺', val: 'H⁺' },
    { label: 'OH⁻', val: 'OH⁻' },
    { label: 'mol/L', val: ' mol/L' },
    { label: '°C', val: '°C' },
  ];

  const quickFormulas = [
    { label: 'Quadratic: x = (-b ± √(b² - 4ac)) / 2a', val: 'x = (-b ± √(b² - 4ac)) / (2a)' },
    { label: 'Gas: PV = nRT', val: 'PV = nRT' },
    { label: 'Dilution: C₁V₁ = C₂V₂', val: 'C₁V₁ = C₂V₂' },
    { label: 'pH: pH = -log[H⁺]', val: 'pH = -log[H⁺]' },
    { label: 'Newton: ΣF = ma', val: 'ΣF = ma' },
    { label: 'Work: W = F · s', val: 'W = F · s' },
  ];

  const insertSymbol = (text: string) => {
    setTypedAnswer((prev) => prev + text);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachedFileName(file.name);
    setAttachedFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);

    const reader = new FileReader();
    reader.onload = (evt) => {
      setAttachedFileData(evt.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHwToSubmit) return;

    submitHomework({
      homeworkId: selectedHwToSubmit.id,
      studentId: currentStudentId,
      studentName: currentStudentName || 'นักเรียน',
      submissionType: submissionMethod,
      textAnswer: submissionMethod === 'text' ? typedAnswer : undefined,
      fileData: submissionMethod !== 'text' ? attachedFileData : undefined,
      fileName: submissionMethod !== 'text' ? attachedFileName : undefined,
      fileSize: submissionMethod !== 'text' ? attachedFileSize : undefined,
      maxScore: selectedHwToSubmit.maxScore || 10,
    });

    // Reset and close
    setSelectedHwToSubmit(null);
    setTypedAnswer('');
    setAttachedFileData(undefined);
    setAttachedFileName('');
    setAttachedFileSize('');
  };

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addHomework({
      courseId: activeCourseId,
      studentId: 'all',
      title: newTitle.trim(),
      description: newDesc.trim() || 'ให้นักเรียนทำโจทย์และส่งวิธีคิดอย่างละเอียด',
      dueDate: newDueDate,
      maxScore: Number(newMaxScore) || 10,
      allowedSubmissionTypes: newAllowedTypes,
    });

    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleSaveGrading = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmissionToGrade) return;

    gradeHomeworkSubmission(
      selectedSubmissionToGrade.hw.id,
      selectedSubmissionToGrade.submission.id,
      Number(gradeScore),
      gradeFeedback.trim() || 'ตรวจเรียบร้อยครับ เก่งมาก!'
    );

    setSelectedSubmissionToGrade(null);
    setGradeFeedback('');
  };

  // Collect all submissions for admin
  const allSubmissions: { hw: Homework; sub: HomeworkSubmission }[] = [];
  homeworks.forEach((hw) => {
    (hw.submissions || []).forEach((sub) => {
      allSubmissions.push({ hw, sub });
    });
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <ClipboardList className="w-3.5 h-3.5 text-amber-600" />
              <span>ระบบการบ้าน & ส่งงานออนไลน์ (Homework & Assignments)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentUserRole === 'admin' ? 'ศูนย์จัดการและตรวจการบ้าน' : `การบ้านของ ${currentStudentName}`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {currentUserRole === 'admin'
                ? 'สร้างโจทย์การบ้านใหม่ ตรวจงานนักเรียน และให้คะแนนพร้อมคำแนะนำแบบรายบุคคล'
                : 'ส่งการบ้านได้ทั้งแบบอัปโหลด PDF, แนบรูปถ่ายสมุด หรือพิมพ์คำตอบพร้อมสูตรคณิต-เคมีในระบบ'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>+ สร้างโจทย์การบ้านใหม่</span>
              </button>
            )}
          </div>
        </div>

        {/* Course Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">เลือกคอร์ส:</span>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveCourseId(course.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCourseId === course.id
                  ? 'bg-blue-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>

      {/* Admin Mode Switcher Tabs */}
      {currentUserRole === 'admin' && (
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-amber-900/10 shadow-2xs">
          <button
            onClick={() => setActiveTab('admin_grading')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'admin_grading'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>ตรวจการบ้านนักเรียน ({allSubmissions.filter((s) => s.sub.status === 'submitted').length} รอตรวจ)</span>
          </button>
          <button
            onClick={() => setActiveTab('admin_list')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'admin_list'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-amber-300" />
            <span>รายการโจทย์ทั้งหมดในคอร์ส ({courseHomeworks.length})</span>
          </button>
        </div>
      )}

      {/* ADMIN VIEW: SUBMISSIONS GRADING ROSTER */}
      {currentUserRole === 'admin' && activeTab === 'admin_grading' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-900" />
              <span>งานที่นักเรียนส่งเข้ามา ({allSubmissions.length} รายการ)</span>
            </h2>
          </div>

          {allSubmissions.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 space-y-2">
              <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-sm font-bold text-slate-700">ยังไม่มีงานที่นักเรียนส่งเข้ามา</div>
              <p className="text-xs text-slate-500">เมื่อนักเรียนส่งการบ้าน งานจะปรากฏที่นี่เพื่อให้ติวเตอร์ตรวจและให้คะแนน</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allSubmissions.map(({ hw, sub }) => (
                <div
                  key={sub.id}
                  className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-3.5 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[11px] text-blue-900 font-bold bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                          {sub.studentName}
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mt-1">{hw.title}</h3>
                      </div>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-md font-semibold whitespace-nowrap ${
                          sub.status === 'graded'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {sub.status === 'graded' ? `✓ ตรวจแล้ว (${sub.score}/${sub.maxScore || 10})` : '⏳ รอตรวจ'}
                      </span>
                    </div>

                    {/* Submission content preview */}
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-between">
                        <span>
                          ประเภทงาน: {sub.submissionType === 'text' ? '✍️ พิมพ์คำตอบและสมการ' : sub.submissionType === 'pdf' ? '📄 เอกสาร PDF' : '🖼️ รูปภาพ'}
                        </span>
                        <span className="font-mono text-[10px]">
                          {new Date(sub.submittedAt).toLocaleDateString('th-TH')}
                        </span>
                      </div>

                      {sub.textAnswer && (
                        <p className="line-clamp-3 font-mono text-[11px] whitespace-pre-wrap bg-white p-2 rounded border border-slate-200 mt-1">
                          {sub.textAnswer}
                        </p>
                      )}

                      {sub.fileName && (
                        <div className="flex items-center gap-1.5 text-blue-900 font-medium text-[11px] mt-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{sub.fileName}</span>
                          <span className="text-slate-400">({sub.fileSize || 'ไฟล์แนบ'})</span>
                        </div>
                      )}
                    </div>

                    {/* Feedback if graded */}
                    {sub.feedback && (
                      <div className="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900">
                        <strong>คำแนะนำที่ให้ไว้:</strong> {sub.feedback}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setSelectedSubmissionToGrade({ hw, submission: sub });
                        setGradeScore(sub.score || hw.maxScore || 10);
                        setGradeFeedback(sub.feedback || '');
                      }}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      {sub.status === 'graded' ? 'แก้ไขคะแนน/คำแนะนำ' : 'ตรวจและให้คะแนน'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* STUDENT VIEW & ADMIN LIST: HOMEWORK LIST */}
      {(currentUserRole === 'student' || activeTab === 'admin_list') && (
        <div className="space-y-4">
          {/* Status filter bar */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-amber-900/10 shadow-2xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                  filterStatus === 'all' ? 'bg-blue-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ทั้งหมด ({courseHomeworks.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                  filterStatus === 'pending' ? 'bg-amber-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                รอส่ง ({courseHomeworks.filter((h) => !h.submissions?.some((s) => s.studentId === currentStudentId)).length})
              </button>
              <button
                onClick={() => setFilterStatus('submitted')}
                className={`px-3 py-1 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                  filterStatus === 'submitted' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                ส่งแล้ว ({courseHomeworks.filter((h) => h.submissions?.some((s) => s.studentId === currentStudentId)).length})
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseHomeworks.map((hw) => {
              const mySub = (hw.submissions || []).find((s) => s.studentId === currentStudentId);
              const isSubmitted = Boolean(mySub);
              const isGraded = mySub?.status === 'graded';

              return (
                <div
                  key={hw.id}
                  className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-3.5 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md">
                          {activeCourse.name}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm mt-1">{hw.title}</h3>
                      </div>

                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-md font-semibold whitespace-nowrap ${
                          isGraded
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isSubmitted
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isGraded
                          ? `✓ ตรวจแล้ว (${mySub?.score}/${mySub?.maxScore || 10})`
                          : isSubmitted
                          ? 'ส่งแล้ว (รอตรวจ)'
                          : 'ยังไม่ส่ง'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-[#FFFDF7] p-3 rounded-xl border border-amber-100 whitespace-pre-wrap">
                      {hw.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-mono text-[11px] text-amber-800">
                        <Clock className="w-3.5 h-3.5" />
                        <span>กำหนดส่ง: {hw.dueDate}</span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        คะแนนเต็ม: <strong>{hw.maxScore || 10}</strong> คะแนน
                      </span>
                    </div>

                    {/* If student submitted, show submission summary & teacher remarks */}
                    {isSubmitted && mySub && (
                      <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs space-y-1.5">
                        <div className="font-bold text-blue-950 flex items-center justify-between">
                          <span>งานที่คุณส่ง:</span>
                          <span className="text-[10px] text-blue-700">
                            {new Date(mySub.submittedAt).toLocaleDateString('th-TH')}
                          </span>
                        </div>
                        {mySub.textAnswer && (
                          <div className="font-mono text-[11px] bg-white p-2 rounded border border-blue-200/60 whitespace-pre-wrap">
                            {mySub.textAnswer}
                          </div>
                        )}
                        {mySub.fileName && (
                          <div className="text-[11px] text-blue-900 flex items-center gap-1">
                            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>ไฟล์: {mySub.fileName}</span>
                          </div>
                        )}
                        {isGraded && mySub.feedback && (
                          <div className="mt-2 pt-2 border-t border-blue-100 text-emerald-900 bg-emerald-50/70 p-2 rounded-lg">
                            <strong className="block text-emerald-950">คำแนะนำจากครูพี่แม็ก:</strong>
                            {mySub.feedback}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    {currentUserRole === 'admin' ? (
                      <button
                        onClick={() => deleteHomework(hw.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium cursor-pointer"
                      >
                        ลบโจทย์นี้
                      </button>
                    ) : (
                      <div className="w-full flex justify-end">
                        <button
                          onClick={() => setSelectedHwToSubmit(hw)}
                          className={`px-4 py-2 text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer ${
                            isSubmitted
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-blue-900 hover:bg-blue-800 text-white'
                          }`}
                        >
                          {isSubmitted ? 'ส่งงานใหม่อีกครั้ง' : '✍️ ส่งการบ้าน'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBMIT HOMEWORK MODAL (STUDENT) */}
      {selectedHwToSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-5 sm:p-7 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded">
                  ส่งการบ้าน
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{selectedHwToSubmit.title}</h3>
              </div>
              <button
                onClick={() => setSelectedHwToSubmit(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Assignment Problem Prompt */}
            <div className="bg-amber-50/50 p-3.5 rounded-2xl border border-amber-200/80 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
              <strong className="block text-amber-900 mb-1">โจทย์คำสั่ง:</strong>
              {selectedHwToSubmit.description}
            </div>

            {/* Submission Channel Tabs (PDF, Image, Text/Math) */}
            <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <button
                type="button"
                onClick={() => setSubmissionMethod('text')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  submissionMethod === 'text'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>✍️ พิมพ์ข้อความ & สมการ</span>
              </button>
              <button
                type="button"
                onClick={() => setSubmissionMethod('image')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  submissionMethod === 'image'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>🖼️ ส่งรูปภาพสมุด</span>
              </button>
              <button
                type="button"
                onClick={() => setSubmissionMethod('pdf')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                  submissionMethod === 'pdf'
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>📄 ส่งไฟล์ PDF</span>
              </button>
            </div>

            <form onSubmit={handleSubmitHomework} className="space-y-4 text-xs">
              {/* Method 1: Typed text with formula toolbar */}
              {submissionMethod === 'text' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-slate-700">พิมพ์คำตอบและแสดงวิธีทำ:</label>
                    <span className="text-[11px] text-slate-400">กดปุ่มสัญลักษณ์ด้านล่างเพื่อแทรกลงในข้อความได้ทันที</span>
                  </div>

                  {/* Formula and Symbol Toolbar */}
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[10px] font-bold text-slate-500 mr-1">สัญลักษณ์คณิต:</span>
                      {mathSymbols.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => insertSymbol(s.val)}
                          className="px-1.5 py-0.5 bg-white hover:bg-amber-100 border border-slate-300 rounded text-xs font-mono font-bold text-slate-800 transition-colors cursor-pointer"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 mr-1">สัญลักษณ์เคมี:</span>
                      {chemSymbols.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => insertSymbol(s.val)}
                          className="px-1.5 py-0.5 bg-white hover:bg-blue-100 border border-slate-300 rounded text-xs font-mono font-bold text-blue-900 transition-colors cursor-pointer"
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1 pt-1 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 mr-1">สูตรลัด:</span>
                      {quickFormulas.map((f, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => insertSymbol(f.val)}
                          className="px-2 py-0.5 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded text-[10px] font-mono font-semibold text-amber-950 transition-colors cursor-pointer"
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    rows={6}
                    required
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    placeholder="พิมพ์วิธีทำ คำตอบ หรือสมการคำนวณที่นี่..."
                    className="w-full border border-slate-300 rounded-xl p-3 text-xs font-mono focus:ring-1 focus:ring-blue-900 bg-white"
                  />
                </div>
              )}

              {/* Method 2 & 3: File Upload (PDF or Image) */}
              {(submissionMethod === 'image' || submissionMethod === 'pdf') && (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-6 text-center bg-amber-50/40 transition-colors cursor-pointer relative">
                    <input
                      type="file"
                      required={!attachedFileData}
                      accept={submissionMethod === 'pdf' ? 'application/pdf' : 'image/*'}
                      onChange={(e) => handleFileUpload(e, submissionMethod)}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <div className="text-xs font-semibold text-slate-800">
                      {attachedFileName ? (
                        <span className="text-emerald-700 font-bold">✓ เลือกไฟล์: {attachedFileName}</span>
                      ) : (
                        `คลิกเพื่อเลือกไฟล์ ${submissionMethod === 'pdf' ? 'PDF' : 'รูปภาพ'} หรือลากไฟล์มาวาง`
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {attachedFileSize ? `ขนาด: ${attachedFileSize}` : 'รองรับทั้งมือถือและคอมพิวเตอร์'}
                    </div>
                  </div>

                  {/* Image Preview if image uploaded */}
                  {submissionMethod === 'image' && attachedFileData && (
                    <div className="max-h-48 overflow-hidden rounded-xl border border-slate-200 flex justify-center bg-slate-900/10 p-2">
                      <img src={attachedFileData} alt="Homework Preview" className="max-h-44 object-contain rounded" />
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedHwToSubmit(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
                >
                  <Send className="w-3.5 h-3.5 text-amber-300" />
                  <span>ยืนยันการส่งการบ้าน</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE HOMEWORK MODAL (ADMIN) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base">สร้างโจทย์การบ้านใหม่</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHomework} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คอร์สเรียน:</label>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 font-bold text-slate-800">
                  {activeCourse.name} ({activeCourse.code})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">หัวข้อการบ้าน / ชื่องาน:</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น การบ้านคำนวณสมดุลเคมีและค่าคงที่สมดุล Kc 3 ข้อ"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">กำหนดส่ง (Due Date):</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">คะแนนเต็ม:</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={newMaxScore}
                    onChange={(e) => setNewMaxScore(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คำสั่งโจทย์ / รายละเอียดงาน:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="ระบุข้อคำถาม คำสั่ง หรือรายละเอียดให้นักเรียนทำ..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกและส่งให้นักเรียน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GRADE SUBMISSION MODAL (ADMIN) */}
      {selectedSubmissionToGrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  ตรวจการบ้าน
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">
                  งานของ {selectedSubmissionToGrade.submission.studentName}
                </h3>
                <div className="text-xs text-slate-500">{selectedSubmissionToGrade.hw.title}</div>
              </div>
              <button
                onClick={() => setSelectedSubmissionToGrade(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student's answer display */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2 max-h-60 overflow-y-auto">
              <strong className="block text-slate-700">คำตอบที่นักเรียนส่ง:</strong>
              {selectedSubmissionToGrade.submission.textAnswer && (
                <div className="font-mono text-xs whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200">
                  {selectedSubmissionToGrade.submission.textAnswer}
                </div>
              )}

              {selectedSubmissionToGrade.submission.fileData && (
                <div className="space-y-2 pt-2">
                  <div className="text-blue-900 font-semibold flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>{selectedSubmissionToGrade.submission.fileName || 'ไฟล์งานที่แนบมา'}</span>
                  </div>
                  {selectedSubmissionToGrade.submission.submissionType === 'image' && (
                    <img
                      src={selectedSubmissionToGrade.submission.fileData}
                      alt="Student work"
                      className="max-h-48 object-contain rounded-xl border border-slate-300"
                    />
                  )}
                </div>
              )}
            </div>

            <form onSubmit={handleSaveGrading} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คะแนนที่ได้ (เต็ม {selectedSubmissionToGrade.hw.maxScore || 10}):
                </label>
                <input
                  type="number"
                  min={0}
                  max={selectedSubmissionToGrade.hw.maxScore || 10}
                  required
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs font-mono font-bold focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คำแนะนำติวเตอร์ (Feedback & จุดที่ควรระวัง):
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="เขียนคำแนะนำ คำชม หรืออธิบายจุดที่น้องเข้าใจคลาดเคลื่อน..."
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedSubmissionToGrade(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกผลการตรวจ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
