import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MaxUpLogo } from '../brand/MaxUpLogo';
import { ProfessorMeow } from '../brand/ProfessorMeow';
import {
  Shield,
  GraduationCap,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Loader2,
  KeyRound,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const {
    courses,
    activeCourseId,
    loginWithUsernameAndPassword,
    signUpStudent,
    isAuthLoading,
    authError,
    clearAuthError,
  } = useApp();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Sign up fields (Students only)
  const [fullName, setFullName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(activeCourseId || courses[0]?.id || 'chem_alevel');
  const [coursePasscode, setCoursePasscode] = useState<string>('');
  const [grade, setGrade] = useState<string>('มัธยมศึกษาปีที่ 6');
  const [targetExam, setTargetExam] = useState<string>('A-Level 68 (เคมี)');
  const [school, setSchool] = useState<string>('');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    if (!username.trim() || !password.trim()) return;

    try {
      await loginWithUsernameAndPassword(username, password);
    } catch {
      // Error is stored in authError
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    if (!newUsername.trim() || !newPassword.trim() || !fullName.trim() || !nickname.trim()) return;

    try {
      await signUpStudent(
        fullName,
        nickname,
        newUsername,
        newPassword,
        selectedCourseId,
        coursePasscode,
        {
          grade,
          targetExam,
          school,
        }
      );
    } catch {
      // Error handled in context state
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column: Brand & Mascot Welcome */}
        <div className="lg:col-span-5 text-center lg:text-left space-y-4">
          <div className="inline-block">
            <MaxUpLogo size="lg" showSubtitle={true} />
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-white/90 border border-blue-900/10 px-3 py-1 rounded-xl shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>แพลตฟอร์มการเรียนรู้และบันทึกการสอน MaxUp TutorHub</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            เข้าสู่ระบบคอร์สเรียน & บันทึกการสอน
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            กรุณาเข้าสู่ระบบด้วยชื่อผู้ใช้ (Username) และรหัสผ่าน หรือสมัครสมาชิกนักเรียนใหม่พร้อมกรอกรหัสเข้าคอร์สเรียนที่คุณครู Max กำหนดให้
          </p>

          <div className="pt-2 flex justify-center lg:justify-start">
            <ProfessorMeow
              pose="cheering"
              size="lg"
              bubbleText="ยินดีต้อนรับครับ! กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าเรียนเมี๊ยว!"
            />
          </div>
        </div>

        {/* Right column: Login / Sign Up Card */}
        <div className="lg:col-span-7 bg-white border border-amber-900/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          {/* Top Switcher: Sign In vs Sign Up */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {authMode === 'signin' ? 'เข้าสู่ระบบ (Sign In)' : 'สมัครสมาชิกนักเรียนใหม่ (Register)'}
              </h2>
              <p className="text-xs text-slate-500">
                {authMode === 'signin'
                  ? 'กรอก Username และ Password ของคุณ'
                  : 'กรอกข้อมูลส่วนตัวพร้อมรหัสเข้าคอร์สเรียน'}
              </p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  clearAuthError();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  authMode === 'signin'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                เข้าสู่ระบบ
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  clearAuthError();
                }}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  authMode === 'signup'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                สมัครใหม่
              </button>
            </div>
          </div>

          {/* Error Alert */}
          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Sign In Form */}
          {authMode === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อผู้ใช้งาน (Username) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="กรอก Username ของคุณ"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">รหัสผ่าน (Password) *</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="กรอกรหัสผ่านของคุณ"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>กำลังตรวจสอบข้อมูล...</span>
                  </>
                ) : (
                  <>
                    <span>เข้าสู่ระบบ (Sign In)</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-slate-100 text-center text-[11px] text-slate-500 space-y-1">
                <div>
                  💡 สำหรับคุณครู Max: Username <strong className="text-slate-800">Maxnum</strong> / รหัสผ่าน <strong className="text-slate-800">Maxnum</strong>
                </div>
                <div>
                  สำหรับนักเรียน: หากยังไม่มีบัญชี กรุณากดปุ่ม <strong className="text-blue-900 cursor-pointer" onClick={() => setAuthMode('signup')}>"สมัครใหม่"</strong> ด้านบน
                </div>
              </div>
            </form>
          ) : (
            /* Sign Up Form for Students */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">
              <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center gap-2 text-slate-700">
                <GraduationCap className="w-4 h-4 text-blue-800 shrink-0" />
                <span className="text-[11px]">
                  เปิดรับสมัครสำหรับ <strong>นักเรียน (Student)</strong> เท่านั้น กรุณากรอกรหัสเข้าคอร์สที่คุณครู Max แจ้งเพื่อปลดล็อกสิทธิ์เข้าเรียน
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ชื่อ-นามสกุลจริง *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น สมชาย ใจดี"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ชื่อเล่น *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น น้องนนท์"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ตั้งชื่อผู้ใช้ (Username) *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น non_student, somchai"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ตั้งรหัสผ่าน (Password) *</label>
                  <input
                    type="password"
                    required
                    placeholder="อย่างน้อย 4 ตัวอักษร"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Course Selection & Course Passcode */}
              <div className="p-3 bg-amber-50/70 border border-amber-200/90 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>เลือกคอร์สเรียน & ระบุรหัสเข้าคอร์ส (Course Passcode)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">คอร์สที่ต้องการสมัคร *</label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none font-medium"
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span>รหัสเข้าคอร์สเรียน (Passcode) *</span>
                      <span className="text-[10px] text-amber-700 font-normal">ถามจากคุณครู Max</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="กรอกรหัสเข้าคอร์ส เช่น CHEM68"
                        value={coursePasscode}
                        onChange={(e) => setCoursePasscode(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl pl-8 pr-3 py-2 font-mono font-bold tracking-wider text-slate-900 uppercase focus:ring-1 focus:ring-amber-500 focus:outline-none"
                      />
                      <KeyRound className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-normal">
                  📌 เมื่อกรอกรหัสถูกต้อง คอร์ส <strong className="text-slate-800">{selectedCourse?.name}</strong> จะถูกเพิ่มเข้าโปรไฟล์ของคุณทันที (นักเรียนสามารถเพิ่มคอร์สอื่นภายหลังได้ด้วยรหัสคอร์สนั้นๆ)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ระดับชั้น</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="มัธยมศึกษาปีที่ 6">มัธยมศึกษาปีที่ 6</option>
                    <option value="มัธยมศึกษาปีที่ 5">มัธยมศึกษาปีที่ 5</option>
                    <option value="มัธยมศึกษาปีที่ 4">มัธยมศึกษาปีที่ 4</option>
                    <option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">โรงเรียน</label>
                  <input
                    type="text"
                    placeholder="เช่น โรงเรียนเตรียมอุดมศึกษา"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-2.5 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-98 disabled:opacity-50 mt-2"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                    <span>กำลังบันทึกข้อมูลและตรวจสอบรหัสคอร์ส...</span>
                  </>
                ) : (
                  <>
                    <span>ยืนยันสมัครสมาชิก & เข้าสู่คอร์สเรียน</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
