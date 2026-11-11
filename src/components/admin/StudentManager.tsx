import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserProfile } from '../../types';
import { Users, UserPlus, GraduationCap, School, Target, Clock, Trash2, User, Lock, Bookmark, Plus, Check, Edit2, X } from 'lucide-react';
import { StudyGroup } from '../../types';

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
    setEditingStudent(student);
    setIsAdding(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !nickname.trim()) return;

    const finalUsername = (studentUsername.trim() || nickname.trim()).toLowerCase();
    const finalPassword = studentPassword.trim() || '1234';

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
            const stLessons = lessons.filter((l) => l.studentId === st.id);
            const stHours = (
              stLessons.reduce((acc, l) => acc + l.durationMinutes, 0) / 60
            ).toFixed(1);
            const stProgress = progressMap[st.id] || [];
            const completedCount = stProgress.filter(
              (p) => (p.status === 'completed' || p.status === 'mastered') && (p.studyCount || 0) > 0
            ).length;
            const percent =
              totalSubtopics > 0 ? Math.round((completedCount / totalSubtopics) * 100) : 0;

            const enrolledNames =
              (st.enrolledCourseIds || [])
                .map((id) => courses.find((c) => c.id === id)?.name || id)
                .join(', ') || tx('ยังไม่ได้ระบุคอร์ส', 'No course assigned');

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
                    <span>{tx('ความคืบหน้าสารบัญ', 'Syllabus Progress')}</span>
                    <span className="font-mono tabular-nums font-bold text-slate-800">
                      {percent}% ({completedCount}/{totalSubtopics})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-blue-900 h-2 rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
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
  </div>
);
};
