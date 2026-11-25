import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserProfile } from '../../types';
import {
  Users,
  UserPlus,
  GraduationCap,
  School,
  Target,
  Clock,
  Trash2,
  User,
  Lock,
  Bookmark,
  Plus,
  Check,
  Edit2,
  X,
  BookOpen,
  CheckCircle2,
  Calendar,
  FileText,
  ExternalLink,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { StudyGroup } from '../../types';
import { MathText } from '../ui/MathText';

export const StudentManager: React.FC = () => {
  const {
    students,
    courses,
    addStudent,
    updateStudent,
    deleteStudent,
    lessons,
    progressMap,
    activeSubject,
    studyGroups,
    addStudyGroup,
    updateStudyGroup,
    deleteStudyGroup,
  } = useApp();
  const { tx } = useLanguage();

  const [isAdding, setIsAdding] = useState(false);
  const [editingStudent, setEditingStudent] = useState<UserProfile | null>(null);

  // Form state (No email required! Only Username and Password)
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [studentUsername, setStudentUsername] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [grade, setGrade] = useState('มัธยมศึกษาปีที่ 6');
  const [school, setSchool] = useState('');
  const [targetExam, setTargetExam] = useState('A-Level 68');
  const [targetFaculty, setTargetFaculty] = useState('');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([]);

  // Student Learning History / Progress Inspector Modal
  const [inspectingStudent, setInspectingStudent] = useState<UserProfile | null>(null);
  const [inspectorCourseId, setInspectorCourseId] = useState<string>('');
  const [inspectorTab, setInspectorTab] = useState<'topics' | 'lessons'>('topics');


  const [managerTab, setManagerTab] = useState<'students' | 'groups'>('students');

  // Study Group Form State
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [editingGroup, setEditingGroup] = useState<StudyGroup | null>(null);
  const [groupName, setGroupName] = useState('');
  const [groupStudentIds, setGroupStudentIds] = useState<string[]>([]);
  const [groupCourseId, setGroupCourseId] = useState(activeSubject?.id || '');
  const [groupError, setGroupError] = useState('');

  const handleOpenAddGroup = () => {
    setEditingGroup(null);
    setGroupName('');
    setGroupStudentIds([]);
    setGroupCourseId(activeSubject?.id || courses[0]?.id || '');
    setGroupError('');
    setIsAddingGroup(true);
  };

  const handleOpenEditGroup = (grp: StudyGroup) => {
    setEditingGroup(grp);
    setGroupName(grp.name);
    setGroupStudentIds(grp.studentIds || []);
    setGroupCourseId(grp.courseId || activeSubject?.id || '');
    setGroupError('');
    setIsAddingGroup(true);
  };

  const handleSaveGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) {
      setGroupError('กรุณากรอกชื่อกลุ่มเรียน');
      return;
    }
    if (groupStudentIds.length === 0) {
      setGroupError('กรุณาเลือกนักเรียนในกลุ่มอย่างน้อย 1 คน');
      return;
    }

    if (editingGroup) {
      updateStudyGroup({
        ...editingGroup,
        name: groupName.trim(),
        studentIds: groupStudentIds,
        courseId: groupCourseId || undefined,
      });
    } else {
      addStudyGroup({
        name: groupName.trim(),
        studentIds: groupStudentIds,
        courseId: groupCourseId || undefined,
      });
    }

    setIsAddingGroup(false);
    setEditingGroup(null);
    setGroupName('');
    setGroupStudentIds([]);
  };

  const totalSubtopics =
    activeSubject?.topics?.reduce((acc, t) => acc + (t.subtopics?.length || 0), 0) || 0;

  const handleOpenAdd = () => {
    setFullName('');
    setNickname('');
    setStudentUsername('');
    setStudentPassword('1234');
    setGrade('มัธยมศึกษาปีที่ 6');
    setSchool('');
    setTargetExam('A-Level 68');
    setTargetFaculty('');
    setEnrolledCourseIds(courses.length > 0 ? [courses[0].id] : []);
    setEditingStudent(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (student: UserProfile) => {
    setFullName(student.fullName);
    setNickname(student.nickname);
    setStudentUsername(student.username || '');
    setStudentPassword(student.password || '1234');
    setGrade(student.grade || 'มัธยมศึกษาปีที่ 6');
    setSchool(student.school || '');
    setTargetExam(student.targetExam || 'A-Level 68');
    setTargetFaculty(student.targetFaculty || '');
    setEnrolledCourseIds(student.enrolledCourseIds || []);
    setEditingStudent(student);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !nickname.trim()) return;

    const finalUsername = (studentUsername.trim() || nickname.trim()).toLowerCase();
    const finalPassword = studentPassword.trim() || '1234';
    const finalEnrolled = enrolledCourseIds.length > 0 ? enrolledCourseIds : [courses[0]?.id || 'MATH_JUNIOR_FUNDENMENTAL_01'];

    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        fullName: fullName.trim(),
        nickname: nickname.trim(),
        username: finalUsername,
        password: finalPassword,
        grade,
        school: school.trim(),
        targetExam,
        targetFaculty: targetFaculty.trim(),
        enrolledCourseIds: finalEnrolled,
      });
    } else {
      addStudent({
        fullName: fullName.trim(),
        nickname: nickname.trim(),
        username: finalUsername,
        password: finalPassword,
        grade,
        school: school.trim(),
        targetExam,
        targetFaculty: targetFaculty.trim(),
        enrolledCourseIds: finalEnrolled,
        isActive: true,
      });
    }

    setIsAdding(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>{tx('จัดการนักเรียน', 'Student Directory')}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {tx(`รายชื่อนักเรียน (${students.length} คน)`, `Students (${students.length})`)}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {tx(
              'สร้างบัญชี กำหนดเป้าหมายการสอบ และติดตามพัฒนาการของนักเรียนแต่ละคน',
              'Manage student accounts, exam goals, and individual syllabus progress.'
            )}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4 text-amber-300" />
          <span>{tx('เพิ่มนักเรียนใหม่', 'Add Student')}</span>
        </button>
      </div>


      {/* Sub-Tabs: Students vs Groups */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setManagerTab('students')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            managerTab === 'students'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{tx(`รายชื่อนักเรียน (${students.length})`, `Students (${students.length})`)}</span>
        </button>

        <button
          onClick={() => setManagerTab('groups')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            managerTab === 'groups'
              ? 'bg-blue-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>{tx(`กลุ่มเรียนที่จัดไว้ (${studyGroups.length})`, `Study Groups (${studyGroups.length})`)}</span>
        </button>
      </div>

      {/* Add / Edit Form Modal */}
      {isAdding && (
        <div className="bg-[#FFFDF7] border border-amber-200 rounded-2xl p-6 shadow-md animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            {editingStudent ? tx('แก้ไขข้อมูลนักเรียน', 'Edit Student') : tx('ลงทะเบียนนักเรียนใหม่', 'Register New Student')}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('ชื่อ-นามสกุลจริง *', 'Full Name *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น กานต์ รัตนเมธา', 'Full Name')}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('ชื่อเล่น *', 'Nickname *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น น้องกานต์', 'Nickname')}
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('ระดับชั้น', 'Grade Level')}
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                >
                  <option value="มัธยมศึกษาปีที่ 1">{tx('มัธยมศึกษาปีที่ 1 (ม.1)', 'Grade 7 (M.1)')}</option>
                  <option value="มัธยมศึกษาปีที่ 2">{tx('มัธยมศึกษาปีที่ 2 (ม.2)', 'Grade 8 (M.2)')}</option>
                  <option value="มัธยมศึกษาปีที่ 3">{tx('มัธยมศึกษาปีที่ 3 (ม.3)', 'Grade 9 (M.3)')}</option>
                  <option value="มัธยมศึกษาปีที่ 4">{tx('มัธยมศึกษาปีที่ 4 (ม.4)', 'Grade 10 (M.4)')}</option>
                  <option value="มัธยมศึกษาปีที่ 5">{tx('มัธยมศึกษาปีที่ 5 (ม.5)', 'Grade 11 (M.5)')}</option>
                  <option value="มัธยมศึกษาปีที่ 6">{tx('มัธยมศึกษาปีที่ 6 (ม.6)', 'Grade 12 (M.6)')}</option>
                  <option value="ซิ่ว / เตรียมสอบใหม่">{tx('ซิ่ว / เตรียมสอบใหม่', 'Gap Year / Retake')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('โรงเรียน', 'School')}
                </label>
                <input
                  type="text"
                  placeholder={tx('เช่น โรงเรียนเตรียมอุดมศึกษา', 'School Name')}
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('สนามสอบเป้าหมาย', 'Target Exam')}
                </label>
                <input
                  type="text"
                  placeholder="A-Level 68 / กสพท"
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('คณะ/มหาวิทยาลัยเป้าหมาย', 'Target Faculty / University')}
                </label>
                <input
                  type="text"
                  placeholder={tx('เช่น คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย', 'e.g., Faculty of Medicine')}
                  value={targetFaculty}
                  onChange={(e) => setTargetFaculty(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('ชื่อผู้ใช้งาน *', 'Username *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="somchai, nonny"
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {tx('รหัสผ่าน *', 'Password *')}
                </label>
                <input
                  type="text"
                  required
                  placeholder="1234"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-slate-800 font-mono"
                />
              </div>

              {/* Course Enrollment Selection */}
              <div className="sm:col-span-2 space-y-2 pt-2 border-t border-amber-200/60">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-700">
                    {tx('คอร์สเรียนที่ลงทะเบียน * (เลือกวิชาที่นักเรียนคนนี้เรียน)', 'Enrolled Courses *')}
                  </label>
                  <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {tx(`เลือกแล้ว ${enrolledCourseIds.length} คอร์ส`, `${enrolledCourseIds.length} selected`)}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-amber-50/50 border border-amber-200/80 rounded-xl">
                  {courses.map((course) => {
                    const isChecked = enrolledCourseIds.includes(course.id) || enrolledCourseIds.includes(course.code);
                    return (
                      <label
                        key={course.id}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-blue-900 border-blue-900 text-white font-bold shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEnrolledCourseIds((prev) => [...prev.filter((id) => id !== course.id && id !== course.code), course.id]);
                            } else {
                              setEnrolledCourseIds((prev) => prev.filter((id) => id !== course.id && id !== course.code));
                            }
                          }}
                          className="rounded text-amber-500 focus:ring-amber-500"
                        />
                        <div className="min-w-0">
                          <span className="truncate block">{course.name}</span>
                          <span className={`text-[10px] block ${isChecked ? 'text-blue-200' : 'text-slate-400'}`}>
                            {course.code}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
                {enrolledCourseIds.length === 0 && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {tx('กรุณาเลือกวิชาที่นักเรียนลงทะเบียนอย่างน้อย 1 คอร์ส', 'Please select at least one course')}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-amber-100">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                {tx('ยกเลิก', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-xs"
              >
                {editingStudent ? tx('บันทึกการแก้ไข', 'Save Changes') : tx('เพิ่มนักเรียน', 'Add Student')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Groups View */}
      {managerTab === 'groups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white border border-amber-900/10 rounded-2xl p-4 shadow-2xs">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-900" />
                <span>{tx('กลุ่มเรียนที่ตั้งค่าไว้ล่วงหน้า', 'Preset Study Groups')}</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {tx(
                  'จัดเซ็ตกลุ่มนักเรียนที่เรียนพร้อมกันบ่อยๆ เพื่อคลิกเลือกทั้งกลุ่มในหน้าลงตารางสอนและบันทึกคาบได้ทันที',
                  'Group students who learn together for one-click selection during scheduling and logging.'
                )}
              </p>
            </div>
            <button
              onClick={handleOpenAddGroup}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>{tx('สร้างกลุ่มใหม่', 'New Group')}</span>
            </button>
          </div>

          {/* Group Add/Edit Modal */}
          {isAddingGroup && (
            <div className="bg-[#FFFDF7] border border-blue-200 rounded-2xl p-5 shadow-md animate-in fade-in duration-200 space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingGroup ? tx('แก้ไขกลุ่มเรียน', 'Edit Study Group') : tx('สร้างกลุ่มเรียนใหม่', 'Create New Study Group')}
                </h3>
                <button
                  onClick={() => setIsAddingGroup(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveGroupSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {tx('ชื่อกลุ่มเรียน *', 'Group Name *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={tx('เช่น กลุ่มสอวน. ฟิสิกส์ หรือ กลุ่ม ม.5 เตรียมหมอ', 'Group Name')}
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {tx('คอร์สหลักที่เรียนด้วยกัน', 'Default Course')}
                    </label>
                    <select
                      value={groupCourseId}
                      onChange={(e) => setGroupCourseId(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-xs text-slate-800 shadow-2xs cursor-pointer"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {tx('เลือกนักเรียนในกลุ่มนี้ * (คลิกเพื่อเลือก/ถอน)', 'Select Students *')}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-200 max-h-48 overflow-y-auto">
                    {students.map((st) => {
                      const isChecked = groupStudentIds.includes(st.id);
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            setGroupStudentIds((prev) =>
                              prev.includes(st.id) ? prev.filter((id) => id !== st.id) : [...prev, st.id]
                            );
                          }}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-blue-50/90 border-blue-500/80 text-blue-950 font-bold'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                              isChecked ? 'bg-blue-900 text-white border-blue-900' : 'border-slate-300'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-3" />}
                          </div>
                          <span className="text-xs truncate">{st.nickname}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {groupError && <div className="text-xs text-red-600 font-semibold">{groupError}</div>}

                <div className="flex justify-end gap-2 pt-2 border-t border-amber-100">
                  <button
                    type="button"
                    onClick={() => setIsAddingGroup(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    {tx('ยกเลิก', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                  >
                    {editingGroup ? tx('บันทึกการแก้ไข', 'Save Changes') : tx('บันทึกกลุ่มเรียน', 'Create Group')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Groups Grid */}
          {studyGroups.length === 0 ? (
            <div className="bg-white border border-dashed border-amber-300 rounded-2xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">{tx('ยังไม่มีกลุ่มเรียนที่จัดไว้', 'No study groups created yet')}</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {tx(
                  'กดปุ่ม "+ สร้างกลุ่มใหม่" ด้านบนเพื่อตั้งค่ากลุ่มนักเรียนที่เรียนด้วยกันบ่อยๆ',
                  'Click "+ New Group" above to create reusable groups of students.'
                )}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyGroups.map((grp) => {
                const groupStudents = students.filter((s) => (grp.studentIds || []).includes(s.id));
                const course = courses.find((c) => c.id === grp.courseId);

                return (
                  <div
                    key={grp.id}
                    className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          {course?.code || 'กลุ่มเรียน'}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">{grp.name}</h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditGroup(grp)}
                          className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="แก้ไขกลุ่ม"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`ยืนยันการลบกลุ่ม "${grp.name}" หรือไม่?`)) {
                              deleteStudyGroup(grp.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="ลบกลุ่ม"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1 border-t border-slate-100">
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        สมาชิก ({groupStudents.length} คน):
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {groupStudents.map((st) => (
                          <span
                            key={st.id}
                            className="bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-md font-medium"
                          >
                            {st.nickname}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Student Cards Grid (Only visible when managerTab === 'students') */}
      {managerTab === 'students' && (
        <>
          {students.length === 0 ? (
        <div className="bg-white border border-dashed border-amber-300 rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">{tx('ยังไม่มีนักเรียนลงทะเบียน', 'No registered students yet')}</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            {tx(
              'คุณครูสามารถแจ้งรหัสเข้าคอร์สให้นักเรียนสมัครสมาชิกได้เอง หรือกดปุ่มเพิ่มนักเรียนใหม่ด้านบน',
              'Share the course passcode with students to sign up, or click Add Student above.'
            )}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {students.map((st) => {
            const stLessons = lessons.filter(
              (l) => l.studentId === st.id || (l.studentIds && l.studentIds.includes(st.id))
            );
            const stHours = (
              stLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0) / 60
            ).toFixed(1);

            // Compute progress strictly across the student's enrolled courses
            const studentEnrolledCourses = courses.filter((c) =>
              (st.enrolledCourseIds || []).includes(c.id) || (st.enrolledCourseIds || []).includes(c.code)
            );
            const stTotalSubtopics = studentEnrolledCourses.reduce(
              (acc, c) => acc + (c.topics || []).reduce((tAcc, t) => tAcc + (t.subtopics?.length || 0), 0),
              0
            );
            const stProgress = progressMap[st.id] || [];
            const enrolledSubtopicIdSet = new Set(
              studentEnrolledCourses.flatMap((c) => (c.topics || []).flatMap((t) => (t.subtopics || []).map((s) => s.id)))
            );
            const completedCount = stProgress.filter(
              (p) =>
                enrolledSubtopicIdSet.has(p.subtopicId) &&
                (p.status === 'completed' || p.status === 'mastered') &&
                (p.studyCount || 0) > 0
            ).length;
            const percent =
              stTotalSubtopics > 0 ? Math.round((completedCount / stTotalSubtopics) * 100) : 0;

            const enrolledNames =
              studentEnrolledCourses.map((c) => c.name).join(', ') ||
              tx('ยังไม่ได้ระบุคอร์ส', 'No course assigned');

            return (
              <div
                key={st.id}
                className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-blue-900 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        {st.nickname.slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{st.nickname}</h3>
                        <p className="text-xs text-slate-500">{st.fullName}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2 py-0.5 rounded-md">
                      {st.grade}
                    </span>
                  </div>

                  {/* Course & Username Info */}
                  <div className="mt-3 p-2 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{tx('ชื่อผู้ใช้:', 'Username:')}</span>
                      <strong className="font-mono text-slate-900">{st.username || st.nickname}</strong>
                    </div>
                    <div className="text-[11px] text-slate-600 line-clamp-1">
                      📚 <span className="font-medium">{enrolledNames}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 text-xs text-slate-600">
                    {st.school && (
                      <div className="flex items-center gap-2">
                        <School className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{st.school}</span>
                      </div>
                    )}
                    {st.targetFaculty && (
                      <div className="flex items-center gap-2">
                        <Target className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        <span className="font-medium text-slate-800">{st.targetFaculty}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-600">
                      <Lock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{tx('รหัสผ่าน:', 'Password:')} <strong className="font-mono text-slate-800">{st.password || '1234'}</strong></span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{tx('ความคืบหน้าสารบัญ (วิชาที่ลงทะเบียน)', 'Syllabus Progress')}</span>
                      <span className="font-mono tabular-nums font-bold text-slate-800">
                        {percent}% ({completedCount}/{stTotalSubtopics})
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-blue-900 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Action button to inspect student progress & history */}
                  <button
                    type="button"
                    onClick={() => {
                      setInspectingStudent(st);
                      const firstCourse = (st.enrolledCourseIds && st.enrolledCourseIds.length > 0)
                        ? (courses.find((c) => st.enrolledCourseIds?.includes(c.id) || st.enrolledCourseIds?.includes(c.code))?.id || courses[0]?.id || '')
                        : (courses[0]?.id || '');
                      setInspectorCourseId(firstCourse);
                      setInspectorTab('topics');
                    }}
                    className="w-full mt-3 py-2 px-3 bg-gradient-to-r from-blue-900 to-[#072B61] hover:from-blue-800 hover:to-[#093577] text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>{tx('ดูสิ่งที่เรียนไปแล้ว & ประวัติการเรียน', 'View Studied Topics & History')}</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono tabular-nums flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    {stHours} {tx('ชม.', 'hrs')} ({stLessons.length} {tx('คาบ', 'lessons')})
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleOpenEdit(st)}
                      className="font-medium text-blue-900 hover:text-blue-700 underline underline-offset-2 cursor-pointer"
                    >
                      {tx('แก้ไข', 'Edit')}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(tx(`ยืนยันการลบนักเรียน "${st.nickname}" หรือไม่?`, `Delete student "${st.nickname}"?`))) {
                          deleteStudent(st.id);
                        }
                      }}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
                      title={tx('ลบบัญชีนักเรียน', 'Delete student')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
        </>
      )}

      {/* Student Learning History & Progress Inspector Modal */}
      {inspectingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/75 backdrop-blur-xs overflow-hidden animate-in fade-in duration-200">
          <div className="bg-[#FFFDF7] w-full max-w-4xl max-h-[92vh] rounded-2xl md:rounded-3xl shadow-2xl border border-amber-900/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Bar */}
            <div className="px-6 py-4 bg-white border-b border-amber-100 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-900 to-[#072B61] text-white font-bold flex items-center justify-center text-base shadow-xs shrink-0">
                  {inspectingStudent.nickname.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base">
                      {inspectingStudent.nickname} ({inspectingStudent.fullName})
                    </h3>
                    <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                      {inspectingStudent.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {inspectingStudent.school ? `${inspectingStudent.school} • ` : ''}
                    {inspectingStudent.targetFaculty || inspectingStudent.targetExam || tx('ติดตามพัฒนาการการเรียน', 'Student Learning Tracker')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectingStudent(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Enrolled Courses Filter Pills (Strictly student's enrolled courses only!) */}
            {(() => {
              const enrolledCourses = courses.filter((c) =>
                (inspectingStudent.enrolledCourseIds || []).includes(c.id) ||
                (inspectingStudent.enrolledCourseIds || []).includes(c.code)
              );
              const targetCourse = courses.find((c) => c.id === inspectorCourseId) || enrolledCourses[0] || courses[0];
              const studentCourseLessons = lessons.filter(
                (l) => (l.studentId === inspectingStudent.id || (l.studentIds && l.studentIds.includes(inspectingStudent.id))) &&
                       (l.subjectId === targetCourse.id || l.subjectId === targetCourse.code)
              );
              const studentCourseHours = (
                studentCourseLessons.reduce((acc, l) => acc + (l.durationMinutes || 0), 0) / 60
              ).toFixed(1);

              const courseSubtopics = (targetCourse.topics || []).flatMap((t) => t.subtopics || []);
              const stProgress = progressMap[inspectingStudent.id] || [];
              const courseCompletedCount = courseSubtopics.filter((sub) => {
                const p = stProgress.find((prog) => prog.subtopicId === sub.id);
                return p && (p.status === 'completed' || p.status === 'mastered') && (p.studyCount || 0) > 0;
              }).length;
              const coursePercent = courseSubtopics.length > 0 ? Math.round((courseCompletedCount / courseSubtopics.length) * 100) : 0;

              return (
                <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                  {/* Course Selector Tabs */}
                  <div className="px-6 py-3 bg-white border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto shrink-0">
                    <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1">
                      {tx('วิชาที่ลงทะเบียน:', 'Enrolled Courses:')}
                    </span>
                    {enrolledCourses.length === 0 ? (
                      <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                        {tx('ยังไม่ได้ระบุคอร์สที่ลงทะเบียน', 'No courses enrolled')}
                      </span>
                    ) : (
                      enrolledCourses.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setInspectorCourseId(c.id)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                            targetCourse.id === c.id
                              ? 'bg-blue-900 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {c.name}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Summary Bar for Target Course */}
                  <div className="px-6 py-3 bg-amber-50/70 border-b border-amber-200/70 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-900" />
                        <span>{targetCourse.name}</span>
                      </span>
                      <span className="text-slate-600 font-mono flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span>{studentCourseHours} {tx('ชม.', 'hrs')} ({studentCourseLessons.length} {tx('คาบ', 'lessons')})</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">{tx('ความคืบหน้าสารบัญ:', 'Syllabus Progress:')}</span>
                      <span className="font-mono font-bold text-blue-900 bg-white px-2.5 py-0.5 rounded-lg border border-amber-200">
                        {courseCompletedCount}/{courseSubtopics.length} ({coursePercent}%)
                      </span>
                    </div>
                  </div>

                  {/* Sub-Tabs: Topics vs Lesson Logs */}
                  <div className="px-6 pt-3 bg-[#FFFDF7] flex items-center gap-2 border-b border-amber-200/50 shrink-0">
                    <button
                      onClick={() => setInspectorTab('topics')}
                      className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                        inspectorTab === 'topics'
                          ? 'border-blue-900 text-blue-900'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{tx(`สิ่งที่เรียนไปแล้วตามสารบัญ (${courseCompletedCount}/${courseSubtopics.length})`, `Studied Topics (${courseCompletedCount}/${courseSubtopics.length})`)}</span>
                    </button>
                    <button
                      onClick={() => setInspectorTab('lessons')}
                      className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
                        inspectorTab === 'lessons'
                          ? 'border-blue-900 text-blue-900'
                          : 'border-transparent text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{tx(`ประวัติคาบเรียนทั้งหมด (${studentCourseLessons.length} คาบ)`, `Lesson Logs (${studentCourseLessons.length})`)}</span>
                    </button>
                  </div>

                  {/* Content Body */}
                  <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
                    {inspectorTab === 'topics' ? (
                      <div className="space-y-4">
                        {(targetCourse.topics || []).map((top) => {
                          const subs = top.subtopics || [];
                          const completedInTop = subs.filter((sub) => {
                            const p = stProgress.find((prog) => prog.subtopicId === sub.id);
                            return p && (p.status === 'completed' || p.status === 'mastered') && (p.studyCount || 0) > 0;
                          }).length;

                          return (
                            <div key={top.id} className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-2xs space-y-2.5">
                              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                                  {top.sortOrder}. {top.name}
                                </h4>
                                <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                                  {completedInTop}/{subs.length}
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                {subs.map((sub) => {
                                  const prog = stProgress.find((p) => p.subtopicId === sub.id);
                                  const isStudied = prog && (prog.status === 'completed' || prog.status === 'mastered') && (prog.studyCount || 0) > 0;
                                  const studyCount = prog?.studyCount || 0;
                                  const lastDate = prog?.lastStudiedDate;
                                  const noteUrl = sub.handwrittenSolutionUrl || prog?.handwrittenSolutionUrl;

                                  return (
                                    <div
                                      key={sub.id}
                                      className={`p-2.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                                        isStudied
                                          ? 'bg-emerald-50/70 border-emerald-200/90 text-emerald-950'
                                          : 'bg-slate-50/50 border-slate-200/60 text-slate-600'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        {isStudied ? (
                                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        ) : (
                                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                                        )}
                                        <span className={`font-medium ${isStudied ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                                          <MathText text={sub.name} />
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                                        {isStudied ? (
                                          <>
                                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300">
                                              {tx(`เรียนแล้ว ${studyCount} ครั้ง`, `Studied ${studyCount}x`)}
                                              {lastDate && ` • ${lastDate}`}
                                            </span>
                                            {noteUrl && (
                                              <a
                                                href={noteUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-[11px] font-semibold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1 transition-colors"
                                              >
                                                <span>✍️ {tx('เฉลยลายมือ', 'Handwritten')}</span>
                                                <ExternalLink className="w-3 h-3" />
                                              </a>
                                            )}
                                          </>
                                        ) : (
                                          <span className="text-[11px] text-slate-400">
                                            {tx('ยังไม่ได้เรียน', 'Not studied yet')}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {studentCourseLessons.length === 0 ? (
                          <div className="text-center py-12 bg-white border border-dashed border-slate-200 rounded-2xl space-y-2">
                            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                            <p className="text-xs font-semibold text-slate-600">
                              {tx('ยังไม่มีประวัติการบันทึกคาบเรียนในวิชานี้', 'No lesson records for this course yet')}
                            </p>
                          </div>
                        ) : (
                          studentCourseLessons.map((les) => (
                            <div key={les.id} className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-2xs space-y-2.5">
                              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100 text-xs">
                                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <Calendar className="w-3.5 h-3.5 text-blue-900" />
                                  {les.lessonDate} ({les.startTime || '17:00'} - {les.endTime || '19:00'})
                                </span>
                                <span className="font-mono text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-bold text-[11px]">
                                  {((les.durationMinutes || 120) / 60).toFixed(1)} {tx('ชม.', 'hrs')}
                                </span>
                              </div>

                              <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                                {les.contentDetail || les.teacherNote || tx('ไม่มีรายละเอียด', 'No summary notes')}
                              </p>

                              {(les.subtopicIds || []).length > 0 && (
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                  <span className="text-[11px] text-slate-400 font-medium">
                                    {tx('หัวข้อ:', 'Topics:')}
                                  </span>
                                  {les.subtopicIds?.map((subId) => {
                                    let subName = subId;
                                    courseSubtopics.forEach((s) => {
                                      if (s.id === subId) subName = s.name;
                                    });
                                    return (
                                      <span
                                        key={subId}
                                        className="bg-blue-50 text-blue-900 border border-blue-200/80 px-2 py-0.5 rounded-md text-[11px] font-medium"
                                      >
                                        <MathText text={subName} />
                                      </span>
                                    );
                                  })}
                                </div>
                              )}

                              {(les.handwrittenSolutionUrl || les.googleDriveUrl) && (
                                <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
                                  {les.handwrittenSolutionUrl && (
                                    <a
                                      href={les.handwrittenSolutionUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md transition-colors"
                                    >
                                      <span>✍️ {tx('เฉลยลายมือครู Max', 'Handwritten Notes')}</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                  {les.googleDriveUrl && (
                                    <a
                                      href={les.googleDriveUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-md transition-colors"
                                    >
                                      <span>📄 {tx('ชีทเรียน Google Drive', 'Drive Materials')}</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Modal Bottom Bar */}
            <div className="px-6 py-3 bg-white border-t border-amber-100 flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setInspectingStudent(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {tx('ปิดหน้าต่าง', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
