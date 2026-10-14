import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudySchedulePlan } from '../../types';
import {
  Calendar,
  Clock,
  BookOpen,
  Plus,
  CheckCircle,
  X,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Check,
  AlertCircle,
  FolderOpen,
  Search,
  CalendarDays,
  LayoutGrid,
  CreditCard,
  QrCode,
  CheckCircle2,
  Upload,
  Printer,
} from 'lucide-react';
import { PromptPayPaymentModal } from '../payment/PromptPayPaymentModal';

export const SchedulePlannerView: React.FC = () => {
  const {
    currentUserRole,
    currentUser,
    students,
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    schedulePlans,
    addSchedulePlan,
    updateSchedulePlan,
    deleteSchedulePlan,
    toggleSchedulePlanStatus,
    addLesson,
    teacherPromptPay,
    setTeacherPromptPay,
    confirmSchedulePayment,
  } = useApp();

  const [filterCourseId, setFilterCourseId] = useState<string>(activeCourseId || 'all');
  const [filterStudentId, setFilterStudentId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [filterPayment, setFilterPayment] = useState<'all' | 'pending' | 'slip_uploaded' | 'paid'>('all');

  // View Mode: Calendar Month Grid vs Card Timeline
  const [viewMode, setViewMode] = useState<'calendar' | 'cards'>('calendar');
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<StudySchedulePlan | null>(null);

  // Payment Modal State
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState<StudySchedulePlan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [formCourseId, setFormCourseId] = useState<string>(activeCourseId);
  const [formStudentId, setFormStudentId] = useState<string>('all');
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formStartTime, setFormStartTime] = useState('17:00');
  const [formEndTime, setFormEndTime] = useState('19:00');
  const [formSelectedSubtopicIds, setFormSelectedSubtopicIds] = useState<string[]>([]);
  const [formDescription, setFormDescription] = useState('');
  const [formPrepNote, setFormPrepNote] = useState('');
  const [formDriveUrl, setFormDriveUrl] = useState('');
  const [formError, setFormError] = useState('');
  const [syllabusSearch, setSyllabusSearch] = useState('');

  // Form Payment Fields
  const [formEnablePayment, setFormEnablePayment] = useState<boolean>(true);
  const [formPriceAmount, setFormPriceAmount] = useState<string>('500');
  const [formPromptPayNumber, setFormPromptPayNumber] = useState<string>(teacherPromptPay?.number || '0812345678');
  const [formPromptPayName, setFormPromptPayName] = useState<string>(teacherPromptPay?.name || 'อาจารย์แม็ก (MaxUp)');
  const [formPromptPayQrUrl, setFormPromptPayQrUrl] = useState<string>(teacherPromptPay?.qrUrl || '');

  // Calculate duration in hours
  const calculateHours = (start: string, end: string): number => {
    try {
      const [sh, sm] = start.split(':').map(Number);
      const [eh, em] = end.split(':').map(Number);
      const diff = (eh * 60 + em) - (sh * 60 + sm);
      return diff > 0 ? parseFloat((diff / 60).toFixed(1)) : 2.0;
    } catch {
      return 2.0;
    }
  };

  const selectedCourse = courses.find((c) => c.id === formCourseId) || courses[0] || activeCourse;

  // Filter plans based on role and active filters
  const visiblePlans = schedulePlans.filter((plan) => {
    // If student, only show plans where studentId is 'all' or matches current user
    if (currentUserRole === 'student') {
      const isForMe = plan.studentId === 'all' || plan.studentId === currentUser?.id;
      if (!isForMe) return false;
    } else {
      // Teacher filter by student
      if (filterStudentId !== 'all' && plan.studentId !== filterStudentId) {
        return false;
      }
    }

    // Filter by course
    if (filterCourseId !== 'all' && plan.courseId !== filterCourseId) {
      return false;
    }

    // Filter by status
    if (filterStatus !== 'all' && plan.status !== filterStatus) {
      return false;
    }

    // Filter by payment status
    if (filterPayment !== 'all') {
      if (filterPayment === 'slip_uploaded' && plan.paymentStatus !== 'slip_uploaded') return false;
      if (filterPayment === 'paid' && plan.paymentStatus !== 'paid') return false;
      if (filterPayment === 'pending' && plan.paymentStatus !== 'pending' && plan.paymentStatus !== undefined) return false;
    }

    return true;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Metrics
  const upcomingCount = visiblePlans.filter((p) => p.status === 'upcoming').length;
  const completedCount = visiblePlans.filter((p) => p.status === 'completed').length;
  const totalPlannedHours = visiblePlans
    .filter((p) => p.status === 'upcoming')
    .reduce((sum, p) => sum + (p.durationHours || 0), 0)
    .toFixed(1);

  const pendingSlipsCount = schedulePlans.filter((p) => p.paymentStatus === 'slip_uploaded').length;
  const totalPaidAmount = schedulePlans
    .filter((p) => p.paymentStatus === 'paid')
    .reduce((sum, p) => sum + (p.priceAmount || 0), 0);

  const handleOpenAdd = () => {
    setEditingPlan(null);
    setFormCourseId(activeCourseId || courses[0]?.id || '');
    setFormStudentId(students[0]?.id || 'all');
    setFormTitle('คาบเรียนที่ ' + (schedulePlans.length + 1));
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);
    setFormDate(nextDate.toISOString().split('T')[0]);
    setFormStartTime('17:00');
    setFormEndTime('19:00');
    setFormSelectedSubtopicIds([]);
    setFormDescription('');
    setFormPrepNote('เตรียมเอกสารและอุปกรณ์จดบันทึกให้พร้อม');
    setFormDriveUrl('');
    setFormError('');
    setSyllabusSearch('');

    // Default payment: 2.0 hrs * 250 = 500, teacher can edit freely!
    setFormEnablePayment(true);
    setFormPriceAmount('500');
    setFormPromptPayNumber(teacherPromptPay?.number || '0812345678');
    setFormPromptPayName(teacherPromptPay?.name || 'อาจารย์แม็ก (MaxUp)');
    setFormPromptPayQrUrl(teacherPromptPay?.qrUrl || '');

    setIsModalOpen(true);
  };

  const handleOpenAddForDate = (dateStr: string) => {
    setEditingPlan(null);
    setFormCourseId(activeCourseId || courses[0]?.id || '');
    setFormStudentId(students[0]?.id || 'all');
    setFormTitle('คาบเรียนที่ ' + (schedulePlans.length + 1));
    setFormDate(dateStr);
    setFormStartTime('17:00');
    setFormEndTime('19:00');
    setFormSelectedSubtopicIds([]);
    setFormDescription('');
    setFormPrepNote('เตรียมเอกสารและอุปกรณ์จดบันทึกให้พร้อม');
    setFormDriveUrl('');
    setFormError('');
    setSyllabusSearch('');

    setFormEnablePayment(true);
    setFormPriceAmount('500');
    setFormPromptPayNumber(teacherPromptPay?.number || '0812345678');
    setFormPromptPayName(teacherPromptPay?.name || 'อาจารย์แม็ก (MaxUp)');
    setFormPromptPayQrUrl(teacherPromptPay?.qrUrl || '');

    setIsModalOpen(true);
  };

  const handleOpenEdit = (plan: StudySchedulePlan) => {
    setEditingPlan(plan);
    setFormCourseId(plan.courseId);
    setFormStudentId(plan.studentId);
    setFormTitle(plan.title);
    setFormDate(plan.date);
    setFormStartTime(plan.startTime);
    setFormEndTime(plan.endTime);
    setFormSelectedSubtopicIds(plan.plannedSubtopicIds || []);
    setFormDescription(plan.plannedContentDescription || '');
    setFormPrepNote(plan.preparationNote || '');
    setFormDriveUrl(plan.googleDriveUrl || '');
    setFormError('');
    setSyllabusSearch('');

    setFormEnablePayment(plan.priceAmount !== undefined && plan.priceAmount > 0);
    setFormPriceAmount(String(plan.priceAmount || Math.round(plan.durationHours * 250)));
    setFormPromptPayNumber(plan.promptPayNumber || teacherPromptPay?.number || '0812345678');
    setFormPromptPayName(plan.promptPayAccountName || teacherPromptPay?.name || 'อาจารย์แม็ก (MaxUp)');
    setFormPromptPayQrUrl(plan.promptPayQrUrl || '');

    setIsModalOpen(true);
  };

  const toggleSubtopicSelect = (subId: string, subName: string) => {
    setFormSelectedSubtopicIds((prev) => {
      const exists = prev.includes(subId);
      const next = exists ? prev.filter((id) => id !== subId) : [...prev, subId];

      // Auto update description if empty or updating
      if (!exists && !formDescription) {
        setFormDescription(`เรียนหัวข้อ: ${subName}`);
      } else if (!exists && formDescription) {
        setFormDescription((prevDesc) => prevDesc + `, ${subName}`);
      }

      return next;
    });
  };

  const toggleChapterSelect = (chapter: { id: string; name: string; subtopics: { id: string; name: string }[] }) => {
    const subIds = (chapter.subtopics || []).map((s) => s.id);
    const allSelected = subIds.length > 0 && subIds.every((id) => formSelectedSubtopicIds.includes(id));

    if (allSelected) {
      setFormSelectedSubtopicIds((prev) => prev.filter((id) => !subIds.includes(id)));
    } else {
      setFormSelectedSubtopicIds((prev) => Array.from(new Set([...prev, ...subIds])));
      if (!formDescription) {
        setFormDescription(`เรียนบท: ${chapter.name}`);
      } else if (!formDescription.includes(chapter.name)) {
        setFormDescription((prev) => `${prev}, ${chapter.name}`);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formTitle.trim()) {
      setFormError('กรุณากรอกชื่อคาบเรียน');
      return;
    }
    if (!formDate) {
      setFormError('กรุณาเลือกวันที่เรียน');
      return;
    }

    const duration = calculateHours(formStartTime, formEndTime);
    const parsedAmount = formEnablePayment ? parseFloat(formPriceAmount) || 0 : undefined;

    // Save promptpay preferences for teacher
    if (formEnablePayment && formPromptPayNumber) {
      setTeacherPromptPay({
        number: formPromptPayNumber.trim(),
        name: formPromptPayName.trim() || 'อาจารย์แม็ก (MaxUp)',
        qrUrl: formPromptPayQrUrl.trim(),
      });
    }

    if (editingPlan) {
      updateSchedulePlan({
        ...editingPlan,
        courseId: formCourseId,
        studentId: formStudentId,
        title: formTitle.trim(),
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        durationHours: duration,
        plannedSubtopicIds: formSelectedSubtopicIds,
        plannedContentDescription: formDescription.trim(),
        preparationNote: formPrepNote.trim(),
        googleDriveUrl: formDriveUrl.trim(),
        priceAmount: parsedAmount,
        promptPayNumber: formEnablePayment ? formPromptPayNumber.trim() : undefined,
        promptPayAccountName: formEnablePayment ? formPromptPayName.trim() : undefined,
        promptPayQrUrl: formEnablePayment ? formPromptPayQrUrl.trim() : undefined,
      });
    } else {
      addSchedulePlan({
        courseId: formCourseId,
        studentId: formStudentId,
        title: formTitle.trim(),
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        durationHours: duration,
        plannedSubtopicIds: formSelectedSubtopicIds,
        plannedContentDescription: formDescription.trim(),
        preparationNote: formPrepNote.trim(),
        googleDriveUrl: formDriveUrl.trim(),
        status: 'upcoming',
        priceAmount: parsedAmount,
        promptPayNumber: formEnablePayment ? formPromptPayNumber.trim() : undefined,
        promptPayAccountName: formEnablePayment ? formPromptPayName.trim() : undefined,
        promptPayQrUrl: formEnablePayment ? formPromptPayQrUrl.trim() : undefined,
        paymentStatus: formEnablePayment ? 'pending' : undefined,
      });
    }

    setIsModalOpen(false);
  };

  const handleMarkAsCompletedAndLog = (plan: StudySchedulePlan) => {
    const isNowCompleted = plan.status !== 'completed';
    toggleSchedulePlanStatus(plan.id, isNowCompleted ? 'completed' : 'upcoming');

    // Optionally create a lesson log entry if studentId is specific
    let targetStudentId = plan.studentId;
    if ((!targetStudentId || targetStudentId === 'all') && students.length > 0) {
      targetStudentId = students[0].id;
    }

    if (isNowCompleted && targetStudentId && targetStudentId !== 'all') {
      addLesson({
        studentId: targetStudentId,
        subjectId: plan.courseId,
        lessonDate: plan.date,
        startTime: plan.startTime,
        endTime: plan.endTime,
        durationMinutes: Math.round(plan.durationHours * 60),
        subtopicIds: plan.plannedSubtopicIds || [],
        contentDetail: plan.plannedContentDescription || plan.title,
        score: 5,
        scoreScale: '1-5',
        teacherNote: 'บันทึกอัตโนมัติจากแผนตารางเรียน',
        googleDriveUrl: plan.googleDriveUrl,
      });
      setToastMessage('✓ บันทึกคาบเรียนเข้าสู่ประวัติการสอนและอัปเดตความคืบหน้าเรียบร้อยแล้ว!');
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setToastMessage(isNowCompleted ? '✓ ปรับสถานะเป็นสอนแล้ว' : 'ปรับสถานะเป็นกำลังจะมาถึง');
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200 print:hidden">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Printable Sheet Header (Visible only when printed or exported to PDF) */}
      <div className="hidden print:block mb-6 p-4 border-b-2 border-slate-800 text-center">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          MaxUp TutorHub · ตารางเรียนและแผนการสอน
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          ผู้สอน: อาจารย์แม็ก (ครูพี่แม็ก) · สถาบันกวดวิชา MaxUp
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
          ข้อมูล ณ วันที่ {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Header & Planning Overview */}
      <section className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4 print:border-none print:shadow-none print:p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-700" />
              <span>
                {currentUserRole === 'admin'
                  ? 'ระบบวางแผนตารางเรียนและเนื้อหาล่วงหน้า'
                  : 'ตารางเรียนและเนื้อหาล่วงหน้าของคุณ'}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentUserRole === 'admin'
                ? 'ตารางเรียน & วางแผนเนื้อหาล่วงหน้า (Lesson Schedule & Plan)'
                : 'ตารางเรียนล่วงหน้า & เนื้อหาที่ต้องเตรียมตัว'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {currentUserRole === 'admin'
                ? 'คุณครู Max สามารถกำหนดวันเวลา ชั่วโมงเรียน และเลือกหัวข้อใน Syllabus ที่จะสอนล่วงหน้า เพื่อให้นักเรียนทราบและเตรียมตัวก่อนเข้าเรียน'
                : 'ดูวันเวลาเรียนล่วงหน้า ชั่วโมงเรียน และหัวข้อในหลักสูตรที่ครู Max วางแผนจะสอน พร้อมลิงก์เอกสาร Google Drive'}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 shadow-2xs cursor-pointer transition-all active:scale-98"
              title="พิมพ์ตารางเรียนออกเป็นชีท หรือบันทึกเป็น PDF"
            >
              <Printer className="w-4 h-4 text-amber-700" />
              <span>🖨️ พิมพ์ตารางเรียน (PDF)</span>
            </button>
            {currentUserRole === 'admin' && (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs cursor-pointer transition-all active:scale-98"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>เพิ่มตารางเรียนล่วงหน้า</span>
              </button>
            )}
          </div>
        </div>

        {/* Quantitative Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 print:hidden">
          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/60">
            <span className="text-[11px] text-slate-500 block">คาบที่กำลังจะมาถึง</span>
            <span className="text-lg font-bold text-blue-900">{upcomingCount} คาบ</span>
          </div>
          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/60">
            <span className="text-[11px] text-slate-500 block">ชั่วโมงเรียนตามแผน</span>
            <span className="text-lg font-bold text-amber-700">{totalPlannedHours} ชม.</span>
          </div>
          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/60">
            <span className="text-[11px] text-slate-500 block">สลิปที่รอตรวจสอบ</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-lg font-bold ${pendingSlipsCount > 0 ? 'text-red-600' : 'text-slate-700'}`}>
                {pendingSlipsCount} สลิป
              </span>
              {pendingSlipsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[9px] font-bold animate-pulse">
                  ตรวจด่วน
                </span>
              )}
            </div>
          </div>
          <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/60">
            <span className="text-[11px] text-slate-500 block">ยอดชำระแล้วทั้งหมด</span>
            <span className="text-lg font-bold text-emerald-700 font-mono">
              ฿{totalPaidAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          {courses.length > 1 && (
            <select
              value={filterCourseId}
              onChange={(e) => setFilterCourseId(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">ทุกคอร์สเรียน</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}

          {currentUserRole === 'admin' && students.length > 0 && (
            <select
              value={filterStudentId}
              onChange={(e) => setFilterStudentId(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="all">นักเรียนทุกคน</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nickname} ({s.fullName})
                </option>
              ))}
            </select>
          )}

          {/* Lesson Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['all', 'upcoming', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  filterStatus === st
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? 'ทุกสถานะคาบ' : st === 'upcoming' ? 'ตามแผน' : 'สอนแล้ว'}
              </button>
            ))}
          </div>

          {/* Payment Status Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {(['all', 'slip_uploaded', 'paid', 'pending'] as const).map((ps) => (
              <button
                key={ps}
                onClick={() => setFilterPayment(ps)}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  filterPayment === ps
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {ps === 'all' && <span>การเงิน: ทั้งหมด</span>}
                {ps === 'slip_uploaded' && (
                  <>
                    <span>รอตรวจสลิป</span>
                    {pendingSlipsCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center font-bold">
                        {pendingSlipsCount}
                      </span>
                    )}
                  </>
                )}
                {ps === 'paid' && <span>ชำระแล้ว</span>}
                {ps === 'pending' && <span>รอชำระ</span>}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Calendar Grid vs Card Timeline */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg ml-auto">
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-blue-700" />
              <span>ปฏิทินรายเดือน (Calendar)</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-blue-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-slate-600" />
              <span>รายการการ์ด (Cards)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main View: Calendar Month Grid or Cards Timeline */}
      {viewMode === 'calendar' ? (
        <div className="space-y-4">
          {/* Calendar Month Container */}
          <div className="bg-white border border-amber-900/10 rounded-2xl shadow-2xs overflow-hidden">
            {/* Month Header & Controls */}
            <div className="px-5 py-4 bg-gradient-to-r from-[#FFFDF7] to-amber-50/40 border-b border-amber-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const y = calendarDate.getFullYear();
                    const m = calendarDate.getMonth();
                    setCalendarDate(new Date(y, m - 1, 1));
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  title="เดือนก่อนหน้า"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-sans flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-900" />
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
                    ][calendarDate.getMonth()]}{' '}
                    {calendarDate.getFullYear() + 543}
                  </span>
                </h2>

                <button
                  onClick={() => {
                    const y = calendarDate.getFullYear();
                    const m = calendarDate.getMonth();
                    setCalendarDate(new Date(y, m + 1, 1));
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  title="เดือนถัดไป"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCalendarDate(new Date())}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 transition-colors cursor-pointer ml-1"
                >
                  วันนี้
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>คาบตามแผน</span>
                </span>
                <span className="flex items-center gap-1.5 ml-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>สอนแล้ว</span>
                </span>
                {currentUserRole === 'admin' && (
                  <button
                    onClick={handleOpenAdd}
                    className="ml-3 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ เพิ่มคาบเรียน</span>
                  </button>
                )}
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/60 text-center text-xs font-bold text-slate-600 py-2">
              <span className="text-red-600">อา.</span>
              <span>จ.</span>
              <span>อ.</span>
              <span>พ.</span>
              <span>พฤ.</span>
              <span>ศ.</span>
              <span className="text-blue-700">ส.</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
              {(() => {
                const year = calendarDate.getFullYear();
                const month = calendarDate.getMonth();
                const firstDayIdx = new Date(year, month, 1).getDay();
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                const daysInPrevMonth = new Date(year, month, 0).getDate();

                const todayStr = new Date().toISOString().split('T')[0];

                const cells = [];

                // 1. Previous Month Leading Days
                for (let i = firstDayIdx - 1; i >= 0; i--) {
                  const dayNum = daysInPrevMonth - i;
                  cells.push(
                    <div
                      key={`prev-${dayNum}`}
                      className="min-h-[105px] p-1.5 sm:p-2 bg-slate-50/30 text-slate-300 select-none text-[11px]"
                    >
                      <span className="font-medium">{dayNum}</span>
                    </div>
                  );
                }

                // 2. Current Month Days
                for (let day = 1; day <= daysInMonth; day++) {
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayPlans = visiblePlans.filter((p) => p.date === dateStr);
                  const isToday = todayStr === dateStr;
                  const isSelected = selectedCalendarDate === dateStr;

                  cells.push(
                    <div
                      key={dateStr}
                      onClick={() => setSelectedCalendarDate(dateStr)}
                      className={`min-h-[105px] p-1.5 sm:p-2 transition-all flex flex-col justify-between cursor-pointer group relative ${
                        isSelected
                          ? 'bg-amber-50/40 ring-2 ring-amber-400 z-10'
                          : isToday
                          ? 'bg-blue-50/30'
                          : 'bg-white hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Day Number Header */}
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            isToday
                              ? 'bg-blue-900 text-white shadow-2xs'
                              : isSelected
                              ? 'bg-amber-500 text-white'
                              : 'text-slate-700'
                          }`}
                        >
                          {day}
                        </span>

                        {currentUserRole === 'admin' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenAddForDate(dateStr);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded transition-all cursor-pointer text-[10px] flex items-center gap-0.5"
                            title={`เพิ่มคาบเรียนวันที่ ${day}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Day Lesson Slots Chips */}
                      <div className="space-y-1 my-1 flex-1">
                        {dayPlans.map((plan) => {
                          const isDone = plan.status === 'completed';
                          const course = courses.find((c) => c.id === plan.courseId);
                          const student = students.find((s) => s.id === plan.studentId);

                          return (
                            <div
                              key={plan.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCalendarDate(dateStr);
                                if (currentUserRole === 'admin') {
                                  handleOpenEdit(plan);
                                }
                              }}
                              className={`p-1.5 rounded-lg text-[10px] leading-tight border transition-all truncate cursor-pointer shadow-2xs ${
                                isDone
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:bg-emerald-100'
                                  : 'bg-blue-50 border-blue-200/80 text-blue-950 hover:bg-blue-100'
                              }`}
                              title={`${plan.title} (${plan.startTime}-${plan.endTime})\n${plan.plannedContentDescription || ''}`}
                            >
                              <div className="flex items-center gap-1 font-bold">
                                <span className="shrink-0">{plan.startTime}</span>
                                <span className="truncate">{plan.title}</span>
                              </div>
                              <div className="text-[9px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                                {course && <span className="text-slate-700 font-semibold">{course.code}</span>}
                                <span>·</span>
                                <span>{plan.studentId === 'all' ? 'ทุกคน' : student?.nickname || 'นร.'}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Bottom indicator if multiple slots */}
                      {dayPlans.length > 0 && (
                        <div className="text-[9px] text-slate-400 font-medium text-right">
                          {dayPlans.length} คาบ
                        </div>
                      )}
                    </div>
                  );
                }

                // 3. Next Month Trailing Days
                const totalRendered = cells.length;
                const trailingCount = totalRendered % 7 === 0 ? 0 : 7 - (totalRendered % 7);
                for (let d = 1; d <= trailingCount; d++) {
                  cells.push(
                    <div
                      key={`next-${d}`}
                      className="min-h-[105px] p-1.5 sm:p-2 bg-slate-50/30 text-slate-300 select-none text-[11px]"
                    >
                      <span className="font-medium">{d}</span>
                    </div>
                  );
                }

                return cells;
              })()}
            </div>
          </div>

          {/* Selected Date or Upcoming Focus Inspector Panel */}
          {(() => {
            const activeInspectDate =
              selectedCalendarDate ||
              visiblePlans.find((p) => p.status === 'upcoming')?.date ||
              new Date().toISOString().split('T')[0];

            const inspectPlans = visiblePlans.filter((p) => p.date === activeInspectDate);

            return (
              <div className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-blue-50 text-blue-900 border border-blue-200">
                      <CalendarDays className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        คาบเรียนประจำวันที่{' '}
                        {new Date(activeInspectDate).toLocaleDateString('th-TH', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {inspectPlans.length > 0
                          ? `พบ ${inspectPlans.length} คาบเรียนที่วางแผนไว้ในวันนี้`
                          : 'ไม่มีคาบเรียนที่กำหนดไว้ในวันนี้'}
                      </p>
                    </div>
                  </div>

                  {currentUserRole === 'admin' && (
                    <button
                      onClick={() => handleOpenAddForDate(activeInspectDate)}
                      className="px-3.5 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-2xs cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-300" />
                      <span>+ เพิ่มคาบเรียนวันนี้</span>
                    </button>
                  )}
                </div>

                {inspectPlans.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-[#FFFDF7]">
                    <div className="text-2xl mb-1">📅</div>
                    <p className="text-xs text-slate-500">
                      ไม่มีคาบเรียนในวันที่เลือก สามารถคลิกวันที่อื่นๆ บนปฏิทินเพื่อดูแผนการสอน
                    </p>
                    {currentUserRole === 'admin' && (
                      <button
                        onClick={() => handleOpenAddForDate(activeInspectDate)}
                        className="mt-3 px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg cursor-pointer"
                      >
                        + กำหนดคาบเรียนในวันนี้
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inspectPlans.map((plan) => {
                      const course = courses.find((c) => c.id === plan.courseId);
                      const student = students.find((s) => s.id === plan.studentId);
                      const isCompleted = plan.status === 'completed';

                      return (
                        <div
                          key={plan.id}
                          className={`bg-[#FFFDF7] border rounded-2xl p-4 shadow-2xs space-y-3 transition-all relative ${
                            isCompleted ? 'border-emerald-200 bg-emerald-50/10' : 'border-amber-900/15'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200/60 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-blue-700" />
                                {plan.startTime} - {plan.endTime} ({plan.durationHours} ชม.)
                              </span>
                              {course && (
                                <span className="text-slate-700 font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-lg text-xs">
                                  {course.name}
                                </span>
                              )}
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                                isCompleted
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {isCompleted ? '✓ สอนแล้ว' : '⏳ ตามแผน'}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{plan.title}</h4>
                            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                              <Users className="w-3 h-3 text-slate-400" />
                              <span>{plan.studentId === 'all' ? 'นักเรียนทุกคนในคอร์ส' : student?.nickname || 'นร.'}</span>
                            </div>
                          </div>

                          {/* Planned Syllabus Content */}
                          {plan.plannedContentDescription && (
                            <div className="bg-white border border-amber-200/80 rounded-xl p-2.5 text-xs space-y-1">
                              <div className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-blue-800" />
                                <span>หัวข้อ Syllabus ที่จะเรียน:</span>
                              </div>
                              <p className="text-slate-700 leading-relaxed font-medium">
                                {plan.plannedContentDescription}
                              </p>
                            </div>
                          )}

                          {/* Preparation Note */}
                          {plan.preparationNote && (
                            <div className="text-xs text-amber-900 bg-amber-50 border border-amber-200/60 rounded-xl p-2 flex items-start gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold block text-[10px]">เตรียมตัวก่อนเรียน:</span>
                                <span>{plan.preparationNote}</span>
                              </div>
                            </div>
                          )}

                          {/* Google Drive Link */}
                          {plan.googleDriveUrl && (
                            <div>
                              <a
                                href={plan.googleDriveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                              >
                                <FolderOpen className="w-3 h-3 text-emerald-600" />
                                <span>เปิดเอกสารใน Google Drive</span>
                                <ExternalLink className="w-2.5 h-2.5 text-emerald-500 ml-0.5" />
                              </a>
                            </div>
                          )}

                          {/* Payment & PromptPay Strip */}
                          {plan.priceAmount !== undefined && plan.priceAmount > 0 && (
                            <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-blue-50/70 to-amber-50/50 border border-blue-200/80 rounded-xl text-xs gap-2">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <CreditCard className="w-4 h-4 text-blue-900 shrink-0" />
                                <span className="font-bold text-slate-900 font-mono">
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
                                    ? '✓ ชำระแล้ว'
                                    : plan.paymentStatus === 'slip_uploaded'
                                    ? '🔔 แนบสลิปแล้ว (รอตรวจ)'
                                    : 'รอชำระเงิน'}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedPaymentPlan(plan);
                                  setIsPaymentModalOpen(true);
                                }}
                                className="px-2.5 py-1 text-[11px] font-bold text-blue-900 hover:text-white bg-white hover:bg-blue-900 border border-blue-200 rounded-lg transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1 print:hidden"
                              >
                                {currentUserRole === 'admin' && plan.paymentStatus === 'slip_uploaded' ? (
                                  <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                                    <span>ตรวจสลิป & ยืนยัน</span>
                                  </>
                                ) : currentUserRole === 'admin' ? (
                                  <span>ตรวจสลิป / จัดการเงิน</span>
                                ) : (
                                  <span>สแกนจ่าย / แนบสลิป</span>
                                )}
                              </button>
                            </div>
                          )}

                          {/* Teacher Action Controls */}
                          {currentUserRole === 'admin' && (
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs print:hidden">
                              <button
                                onClick={() => handleMarkAsCompletedAndLog(plan)}
                                className={`flex items-center gap-1 font-semibold px-2 py-1 rounded-lg transition-all cursor-pointer ${
                                  isCompleted
                                    ? 'text-slate-500 hover:text-slate-800 bg-slate-100'
                                    : 'text-emerald-700 hover:bg-emerald-50 bg-emerald-50/60 border border-emerald-200'
                                }`}
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>{isCompleted ? 'เปลี่ยนเป็นยังไม่เสร็จ' : 'สอนแล้ว (บันทึกคาบ)'}</span>
                              </button>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleOpenEdit(plan)}
                                  className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="แก้ไขแผนตารางเรียน"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => deleteSchedulePlan(plan.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="ลบคาบเรียนนี้"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        /* View Mode: Card Timeline List */
        visiblePlans.length === 0 ? (
          <div className="bg-white border border-dashed border-amber-200 rounded-2xl p-10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto text-xl">
              📅
            </div>
            <h3 className="text-base font-bold text-slate-800">ยังไม่มีตารางเรียนล่วงหน้า</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {currentUserRole === 'admin'
                ? 'คุณครู Max สามารถกดปุ่ม "เพิ่มตารางเรียนล่วงหน้า" เพื่อกำหนดวันที่ เวลา และหัวข้อใน Syllabus ที่จะสอนได้ทันที'
                : 'ยังไม่มีกำหนดการเรียนล่วงหน้า คุณครู Max จะอัปเดตตารางให้ทราบเร็วๆ นี้ครับ'}
            </p>
            {currentUserRole === 'admin' && (
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
              >
                + วางแผนคาบเรียนแรก
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visiblePlans.map((plan) => {
              const course = courses.find((c) => c.id === plan.courseId);
              const student = students.find((s) => s.id === plan.studentId);
              const isCompleted = plan.status === 'completed';

              return (
                <div
                  key={plan.id}
                  className={`bg-white border rounded-2xl p-5 shadow-2xs space-y-3 transition-all hover:border-amber-300 relative ${
                    isCompleted ? 'border-emerald-200 bg-emerald-50/10' : 'border-amber-900/10'
                  }`}
                >
                  {/* Card Top: Date & Status Badge */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200/60 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        {new Date(plan.date).toLocaleDateString('th-TH', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {plan.startTime} - {plan.endTime} ({plan.durationHours} ชม.)
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {isCompleted ? '✓ สอนแล้ว' : '⏳ ตามแผน'}
                    </span>
                  </div>

                  {/* Title & Student/Course Tags */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{plan.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                      {course && (
                        <span className="text-slate-700 font-semibold bg-slate-100 px-2 py-0.5 rounded">
                          {course.name}
                        </span>
                      )}
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {plan.studentId === 'all' ? 'นักเรียนทุกคนในคอร์ส' : student?.nickname || 'นักเรียนเฉพาะคน'}
                      </span>
                    </div>
                  </div>

                  {/* Planned Syllabus Content Badge */}
                  {plan.plannedContentDescription && (
                    <div className="bg-[#FFFDF7] border border-amber-200/80 rounded-xl p-3 text-xs space-y-1">
                      <div className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-800" />
                        <span>เนื้อหาที่จะเรียนในคาบนี้ (ตาม Syllabus):</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {plan.plannedContentDescription}
                      </p>
                    </div>
                  )}

                  {/* Preparation Note */}
                  {plan.preparationNote && (
                    <div className="text-xs text-amber-800 bg-amber-50/80 border border-amber-200/50 rounded-xl p-2.5 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[11px] text-amber-900">
                          ข้อความเตรียมตัวก่อนเรียน:
                        </span>
                        <span>{plan.preparationNote}</span>
                      </div>
                    </div>
                  )}

                  {/* Google Drive Link if provided */}
                  {plan.googleDriveUrl && (
                    <div className="pt-1">
                      <a
                        href={plan.googleDriveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>เปิดเอกสารเรียนใน Google Drive</span>
                        <ExternalLink className="w-3 h-3 text-emerald-500 ml-0.5" />
                      </a>
                    </div>
                  )}

                  {/* Payment & PromptPay Strip */}
                  {plan.priceAmount !== undefined && plan.priceAmount > 0 && (
                    <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-blue-50/70 to-amber-50/50 border border-blue-200/80 rounded-xl text-xs gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <CreditCard className="w-4 h-4 text-blue-900 shrink-0" />
                        <span className="font-bold text-slate-900 font-mono">
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
                            ? '✓ ชำระแล้ว'
                            : plan.paymentStatus === 'slip_uploaded'
                            ? '🔔 แนบสลิปแล้ว (รอตรวจ)'
                            : 'รอชำระเงิน'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPaymentPlan(plan);
                          setIsPaymentModalOpen(true);
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold text-blue-900 hover:text-white bg-white hover:bg-blue-900 border border-blue-200 rounded-lg transition-all cursor-pointer shadow-2xs shrink-0 flex items-center gap-1 print:hidden"
                      >
                        {currentUserRole === 'admin' && plan.paymentStatus === 'slip_uploaded' ? (
                          <>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                            <span>ตรวจสลิป & ยืนยัน</span>
                          </>
                        ) : currentUserRole === 'admin' ? (
                          <span>ตรวจสลิป / จัดการเงิน</span>
                        ) : (
                          <span>สแกนจ่าย / แนบสลิป</span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Teacher Actions */}
                  {currentUserRole === 'admin' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs print:hidden">
                      <button
                        onClick={() => handleMarkAsCompletedAndLog(plan)}
                        className={`flex items-center gap-1 font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          isCompleted
                            ? 'text-slate-500 hover:text-slate-800 bg-slate-100'
                            : 'text-emerald-700 hover:bg-emerald-50 bg-emerald-50/60 border border-emerald-200'
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'เปลี่ยนเป็นยังไม่เสร็จ' : 'สอนแล้ว (บันทึกคาบ)'}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(plan)}
                          className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="แก้ไขแผนตารางเรียน"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteSchedulePlan(plan.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="ลบคาบเรียนนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )
      )}

      {/* Add / Edit Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFDF7] w-full max-w-2xl rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-amber-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingPlan ? 'แก้ไขตารางเรียนล่วงหน้า' : 'วางแผนตารางเรียนล่วงหน้า (Schedule & Plan)'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  กำหนดวันเวลา ชั่วโมง และเลือกหัวข้อใน Syllabus ที่จะสอน
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Course & Student */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    คอร์สเรียน *
                  </label>
                  <select
                    value={formCourseId}
                    onChange={(e) => {
                      setFormCourseId(e.target.value);
                      setFormSelectedSubtopicIds([]);
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
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    นักเรียนที่เรียนในคาบนี้ *
                  </label>
                  <select
                    value={formStudentId}
                    onChange={(e) => setFormStudentId(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                  >
                    <option value="all">นักเรียนทุกคนในคอร์ส (คลาสกลุ่ม)</option>
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.nickname} ({st.fullName})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ชื่อคาบเรียน / หัวข้อหลัก *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="เช่น คาบที่ 3: สารประกอบไฮโดรคาร์บอน และไอโซเมอร์"
                  required
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/50">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    วันที่เรียน *
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    className="w-full bg-white border border-amber-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    เวลาเริ่ม
                  </label>
                  <input
                    type="time"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    เวลาสิ้นสุด
                  </label>
                  <input
                    type="time"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* Course Syllabus Topics Picker */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-900" />
                    <span>เลือกหัวข้อใน Syllabus ที่จะสอนในคาบนี้ ({selectedCourse?.name || 'คอร์สปัจจุบัน'}):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      เลือกแล้ว {formSelectedSubtopicIds.length} หัวข้อ
                    </span>
                    {formSelectedSubtopicIds.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setFormSelectedSubtopicIds([])}
                        className="text-[10px] text-red-600 hover:text-red-700 underline cursor-pointer"
                      >
                        ล้างทั้งหมด
                      </button>
                    )}
                  </div>
                </div>

                {/* Topic Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อบท หรือหัวข้อย่อยใน Syllabus..."
                    value={syllabusSearch}
                    onChange={(e) => setSyllabusSearch(e.target.value)}
                    className="w-full bg-white border border-amber-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-2xs"
                  />
                  {syllabusSearch && (
                    <button
                      type="button"
                      onClick={() => setSyllabusSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Topics & Subtopics List */}
                <div className="max-h-56 overflow-y-auto border border-amber-200 bg-white rounded-xl p-3 space-y-3 shadow-2xs divide-y divide-slate-100">
                  {(!selectedCourse?.topics || selectedCourse.topics.length === 0) ? (
                    <div className="text-center py-5 text-xs text-slate-400 space-y-1">
                      <p>คอร์สนี้ยังไม่มีหัวข้อในหลักสูตร (Syllabus)</p>
                      <p className="text-[11px]">คุณครู Max สามารถพิมพ์ระบุเนื้อหาในช่องรายละเอียดด้านล่างได้ทันที</p>
                    </div>
                  ) : (
                    (() => {
                      const query = syllabusSearch.trim().toLowerCase();
                      const matchedTopics = (selectedCourse.topics || []).filter((top) => {
                        if (!query) return true;
                        const topMatches = top.name.toLowerCase().includes(query);
                        const subMatches = (top.subtopics || []).some(
                          (sub) =>
                            sub.name.toLowerCase().includes(query) ||
                            sub.description?.toLowerCase().includes(query) ||
                            sub.keyPoints?.some((kp) => kp.toLowerCase().includes(query))
                        );
                        return topMatches || subMatches;
                      });

                      if (matchedTopics.length === 0) {
                        return (
                          <div className="text-center py-4 text-xs text-slate-400">
                            ไม่พบหัวข้อที่ตรงกับคำค้นหา "{syllabusSearch}"
                          </div>
                        );
                      }

                      return matchedTopics.map((top) => {
                        const subtopics = query
                          ? (top.subtopics || []).filter(
                              (sub) =>
                                top.name.toLowerCase().includes(query) ||
                                sub.name.toLowerCase().includes(query) ||
                                sub.description?.toLowerCase().includes(query) ||
                                sub.keyPoints?.some((kp) => kp.toLowerCase().includes(query))
                            )
                          : top.subtopics || [];

                        const allSubsSelected =
                          subtopics.length > 0 &&
                          subtopics.every((s) => formSelectedSubtopicIds.includes(s.id));

                        return (
                          <div key={top.id} className="pt-2.5 first:pt-0 space-y-2">
                            {/* Chapter / Topic Header */}
                            <div className="flex items-center justify-between gap-2">
                              <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                                  {top.sortOrder}
                                </span>
                                <span>{top.name}</span>
                              </div>

                              {subtopics.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => toggleChapterSelect({ id: top.id, name: top.name, subtopics })}
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                    allSubsSelected
                                      ? 'bg-blue-900 text-white border-blue-900'
                                      : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-900 border-slate-200'
                                  }`}
                                >
                                  {allSubsSelected ? '✓ เลือกทั้งบทแล้ว' : '+ เลือกทั้งบท'}
                                </button>
                              )}
                            </div>

                            {/* Subtopics Checklist */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                              {subtopics.map((sub) => {
                                const isSelected = formSelectedSubtopicIds.includes(sub.id);
                                return (
                                  <button
                                    type="button"
                                    key={sub.id}
                                    onClick={() => toggleSubtopicSelect(sub.id, sub.name)}
                                    className={`text-left p-2 rounded-xl border transition-all flex items-start gap-2 cursor-pointer ${
                                      isSelected
                                        ? 'bg-blue-50/80 border-blue-400 text-blue-950 shadow-2xs ring-1 ring-blue-300'
                                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-slate-50/50'
                                    }`}
                                  >
                                    <div
                                      className={`w-4 h-4 rounded-md mt-0.5 flex-shrink-0 flex items-center justify-center border transition-colors ${
                                        isSelected
                                          ? 'bg-blue-900 border-blue-900 text-white'
                                          : 'border-slate-300 bg-white'
                                      }`}
                                    >
                                      {isSelected && <Check className="w-3 h-3" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="text-xs font-semibold leading-tight truncate">
                                        {sub.name}
                                      </div>

                                      {/* Tags: Difficulty & Resources */}
                                      <div className="flex items-center gap-1.5 mt-1 flex-wrap text-[9px]">
                                        {sub.difficulty && (
                                          <span
                                            className={`px-1.5 py-0.2 rounded font-medium ${
                                              sub.difficulty === 'basic'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : sub.difficulty === 'advanced'
                                                ? 'bg-red-50 text-red-700 border border-red-200'
                                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                                            }`}
                                          >
                                            {sub.difficulty === 'basic'
                                              ? 'ระดับพื้นฐาน'
                                              : sub.difficulty === 'advanced'
                                              ? 'ระดับประยุกต์เข้มข้น'
                                              : 'ระดับปานกลาง'}
                                          </span>
                                        )}

                                        {sub.googleDriveUrl && (
                                          <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 font-medium">
                                            📂 มีชีท
                                          </span>
                                        )}

                                        {sub.handwrittenSolutionUrl && (
                                          <span className="text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200 font-medium">
                                            ✍️ เฉลยลายมือ
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      });
                    })()
                  )}
                </div>
              </div>

              {/* Planned Content Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  รายละเอียดเนื้อหาที่จะเรียนในคาบนี้ *
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="เช่น ตะลุยโจทย์เรื่องการแยกสาร และเทคนิคจำตารางธาตุ"
                  required
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              {/* Prep Note */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  ข้อความเตือนนักเรียนเตรียมตัวก่อนเรียน (Optional)
                </label>
                <input
                  type="text"
                  value={formPrepNote}
                  onChange={(e) => setFormPrepNote(e.target.value)}
                  placeholder="เช่น ปริ้นชีทบทที่ 1 มาด้วย และเตรียมเครื่องคิดเลข"
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              {/* Google Drive Link */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  📁 ลิงก์ Google Drive เอกสารประจำคาบนี้ (Optional)
                </label>
                <input
                  type="url"
                  value={formDriveUrl}
                  onChange={(e) => setFormDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
                <p className="text-[10px] text-slate-500 mt-0.5">
                  วางลิงก์ Google Drive ที่คุณครู Max อัปโหลดไว้ นักเรียนจะสามารถกดเปิดอ่านได้ทันที
                </p>
              </div>

              {/* Payment & PromptPay Configuration for this Lesson Slot */}
              <div className="border border-blue-200/80 bg-blue-50/30 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formEnablePayment}
                      onChange={(e) => setFormEnablePayment(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-900 focus:ring-blue-500 cursor-pointer"
                    />
                    <CreditCard className="w-4 h-4 text-blue-900" />
                    <span>เปิดรับชำระเงินสำหรับคาบเรียนนี้ (PromptPay QR Code)</span>
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {formEnablePayment ? 'เปิดใช้งาน' : 'ไม่เก็บค่าเรียน'}
                  </span>
                </div>

                {formEnablePayment && (
                  <div className="space-y-3 pt-2 border-t border-blue-100">
                    {/* Amount input & Suggested 250 baht/hr */}
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <label className="text-xs font-semibold text-slate-700">
                          ค่าเรียนสำหรับคาบนี้ (บาท) *
                        </label>
                        {/* Auto-calc helper button: 250 baht/hr */}
                        <button
                          type="button"
                          onClick={() => {
                            const hours = calculateHours(formStartTime, formEndTime);
                            const calcAmount = Math.round(hours * 250);
                            setFormPriceAmount(String(calcAmount));
                          }}
                          className="text-[11px] font-semibold text-blue-900 hover:text-blue-700 bg-blue-100 hover:bg-blue-200/80 px-2 py-0.5 rounded-md cursor-pointer transition-all inline-flex items-center gap-1 self-start sm:self-auto"
                        >
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>คำนวณตามเวลาสอน: {calculateHours(formStartTime, formEndTime)} ชม. × 250 = {Math.round(calculateHours(formStartTime, formEndTime) * 250)} บ. (คลิกเพื่อใส่)</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2 text-xs font-bold text-slate-400">฿</span>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={formPriceAmount}
                            onChange={(e) => setFormPriceAmount(e.target.value)}
                            placeholder="375"
                            required={formEnablePayment}
                            className="w-full bg-white border border-blue-200 rounded-xl pl-7 pr-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs font-mono"
                          />
                        </div>
                        <span className="text-xs text-slate-600 font-medium">บาท</span>
                      </div>

                      {/* Quick preset amount chips */}
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-[10px] text-slate-500">เลือกเร็ว:</span>
                        {[250, 375, 500, 750, 1000].map((amt) => (
                          <button
                            type="button"
                            key={amt}
                            onClick={() => setFormPriceAmount(String(amt))}
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold border transition-all cursor-pointer ${
                              formPriceAmount === String(amt)
                                ? 'bg-blue-900 text-white border-blue-900'
                                : 'bg-white text-slate-600 hover:bg-blue-50 border-slate-200'
                            }`}
                          >
                            ฿{amt.toLocaleString()} {amt === 250 ? '(1 ชม.)' : amt === 375 ? '(1.5 ชม.)' : amt === 500 ? '(2 ชม.)' : amt === 750 ? '(3 ชม.)' : '(4 ชม.)'}
                          </button>
                        ))}
                        <span className="text-[10px] text-slate-400 ml-1">
                          * กรอกเลขได้อิสระ เช่น 375
                        </span>
                      </div>
                    </div>

                    {/* PromptPay Number & Account Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          หมายเลขพร้อมเพย์ (เบอร์มือถือ หรือ เลขบัตร ปชช.) *
                        </label>
                        <input
                          type="text"
                          value={formPromptPayNumber}
                          onChange={(e) => setFormPromptPayNumber(e.target.value)}
                          placeholder="0812345678 หรือ 1100200300400"
                          required={formEnablePayment}
                          className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                        />
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          ระบบจะสร้าง Thai QR Payment มาตรฐานให้สแกนได้ทันที
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          ชื่อบัญชีผู้รับเงิน (แสดงให้นักเรียนตรวจ) *
                        </label>
                        <input
                          type="text"
                          value={formPromptPayName}
                          onChange={(e) => setFormPromptPayName(e.target.value)}
                          placeholder="อาจารย์แม็ก (MaxUp)"
                          required={formEnablePayment}
                          className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* PromptPay QR Code Image Upload or URL (Optional custom image) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        แนบรูป QR Code พร้อมเพย์ของคุณครู (Optional หรือใช้ QR อัตโนมัติ)
                      </label>
                      <div className="flex flex-col sm:flex-row items-start gap-3">
                        <label className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1.5 shadow-2xs transition-all shrink-0">
                          <Upload className="w-3.5 h-3.5 text-blue-900" />
                          <span>อัปโหลดรูปภาพ QR Code</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                setFormPromptPayQrUrl((ev.target?.result as string) || '');
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="hidden"
                          />
                        </label>

                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={formPromptPayQrUrl.startsWith('data:') ? 'แนบรูปภาพแล้ว (Base64)' : formPromptPayQrUrl}
                            onChange={(e) => {
                              if (!formPromptPayQrUrl.startsWith('data:')) {
                                setFormPromptPayQrUrl(e.target.value);
                              }
                            }}
                            disabled={formPromptPayQrUrl.startsWith('data:')}
                            placeholder="หรือวาง URL รูปภาพ QR Code เช่น https://..."
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                          />
                        </div>

                        {formPromptPayQrUrl && (
                          <button
                            type="button"
                            onClick={() => setFormPromptPayQrUrl('')}
                            className="text-xs text-red-600 hover:underline px-2 py-1 cursor-pointer self-center"
                          >
                            ลบรูป
                          </button>
                        )}
                      </div>

                      {formPromptPayQrUrl && formPromptPayQrUrl.startsWith('data:') && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={formPromptPayQrUrl}
                            alt="QR Preview"
                            className="w-16 h-16 object-contain rounded-lg border border-slate-200 bg-white p-1"
                          />
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            ✓ อัปโหลดรูป QR Code เรียบร้อย
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  {editingPlan ? 'บันทึกการแก้ไข' : 'ยืนยันเพิ่มตารางเรียน'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PromptPay & Slip Upload / Verification Modal */}
      {isPaymentModalOpen && selectedPaymentPlan && (
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
