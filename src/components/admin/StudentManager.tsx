import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserProfile } from '../../types';
import { Users, UserPlus, GraduationCap, School, Target, Clock, Trash2, User, Lock } from 'lucide-react';

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

      {/* Student Cards Grid */}
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
  </div>
);
};
