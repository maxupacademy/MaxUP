import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage, LanguageToggle } from '../../context/LanguageContext';
import { MaxUpLogo } from '../brand/MaxUpLogo';
import { SpotlightCard } from '../ui/SpotlightCard';
import {
  Shield,
  GraduationCap,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  Loader2,
  KeyRound,
  BookOpen,
  TrendingUp,
  Video,
  ClipboardCheck,
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const {
    courses,
    activeCourseId,
    loginWithUsernameAndPassword,
    signUpStudent,
    isAuthLoading,
    authError,
    clearAuthError,
  } = useApp();

  const { tx } = useLanguage();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Sign up fields (Students only)
  const [fullName, setFullName] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    activeCourseId || courses[0]?.id || 'MATH_JUNIOR_FUNDENMENTAL_01'
  );
  const [coursePasscode, setCoursePasscode] = useState<string>('');
  const [grade, setGrade] = useState<string>('มัธยมศึกษาปีที่ 6');
  const [targetExam, setTargetExam] = useState<string>('A-Level 68');
  const [school, setSchool] = useState<string>('');

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    if (!username.trim() || !password.trim()) return;

    try {
      await loginWithUsernameAndPassword(username, password);
      onLoginSuccess?.();
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
      onLoginSuccess?.();
    } catch {
      // Error handled in context state
    }
  };

  const features = [
    {
      icon: TrendingUp,
      label: tx('ติดตามความก้าวหน้า', 'Live Progress Tracking'),
      sub: tx('เช็คสารบัญที่เรียนแล้วแบบเรียลไทม์', 'Real-time syllabus completion updates'),
    },
    {
      icon: BookOpen,
      label: tx('คอร์สและเอกสารเรียน', 'Course & Study Materials'),
      sub: tx('ดาวน์โหลดชีทเรียนและเฉลยลายมือครบถ้วน', 'Handwritten solutions & PDF worksheets'),
    },
    {
      icon: Video,
      label: tx('วิดีโอทบทวนย้อนหลัง', 'On-Demand Video Archive'),
      sub: tx('ดูคลิปสอนทบทวนได้ตลอด 24 ชั่วโมง', 'Rewatch recorded lessons anytime'),
    },
    {
      icon: ClipboardCheck,
      label: tx('การบ้านและคำแนะนำ', 'Assignments & Feedback'),
      sub: tx('ส่งงานและรับคำแนะนำรายบุคคลจากครู', 'Submit work and get personal notes'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row relative">
      {/* Top-right floating language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle variant="dark" />
      </div>

      {/* ═══════════════════════════════════════════════════
          LEFT PANEL — Brand & 21st.dev Spotlight Bento
      ═══════════════════════════════════════════════════ */}
      <div
        className="lg:w-[46%] xl:w-[44%] flex flex-col justify-between p-8 sm:p-10 lg:p-14 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80"
        style={{
          backgroundImage:
            'radial-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Top: Logo */}
        <div className="flex items-center justify-between">
          <div>
            <MaxUpLogo size="sm" showSubtitle={false} />
            <p className="mt-2.5 text-[11px] font-bold tracking-widest text-amber-400 uppercase">
              MaxUp TutorHub
            </p>
          </div>
        </div>

        {/* Middle: Headline & 21st.dev Spotlight Cards */}
        <div className="my-10 lg:my-0">
          <h1
            className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-white leading-[1.15] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {tx('ระบบดูแลการเรียน', 'Personalized Tutoring')}
            <br />
            <span className="text-amber-400">
              {tx('ที่ออกแบบเพื่อน้องรายบุคคล', 'Built Around Every Student')}
            </span>
          </h1>
          <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
            {tx(
              'บันทึกคาบเรียน วางแผนตารางสอน และติดตามความคืบหน้าสารบัญครบทุกบทในที่เดียว',
              'Track lessons, plan study schedules, and monitor syllabus mastery in one unified workspace.'
            )}
          </p>

          {/* 21st.dev Spotlight Feature Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label, sub }) => (
              <SpotlightCard
                key={label}
                spotlightColor="rgba(251, 191, 36, 0.14)"
                className="rounded-2xl bg-slate-900/90 border border-slate-800/90 p-3.5 hover:border-slate-700"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-100">{label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{sub}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Bottom: Credential hint */}
        <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-8 lg:mt-0">
          <Shield className="w-3.5 h-3.5 text-amber-500/80" />
          <span>
            {tx(
              'เข้าสู่ระบบแล้วจะเข้าสู่หน้าแดชบอร์ดทันที',
              'Instant access to your personal dashboard upon sign-in'
            )}
          </span>
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          RIGHT PANEL — Clean Auth Card (Zero Redundancy)
      ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-slate-900/60">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle top highlight line (21st.dev CleanAuthCard pattern) */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          {/* Segmented Control Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
            {(['signin', 'signup'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setAuthMode(mode);
                  clearAuthError();
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === mode
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode === 'signin'
                  ? tx('เข้าสู่ระบบ', 'Sign In')
                  : tx('สมัครสมาชิก', 'Create Account')}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-black text-white mb-1">
            {authMode === 'signin'
              ? tx('ยินดีต้อนรับกลับมา', 'Welcome Back')
              : tx('สร้างบัญชีนักเรียนใหม่', 'Student Registration')}
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            {authMode === 'signin'
              ? tx('กรอกชื่อผู้ใช้งานและรหัสผ่านเพื่อเข้าสู่แดชบอร์ด', 'Enter your credentials to access your dashboard')
              : tx('กรอกข้อมูลส่วนตัวพร้อมรหัสเข้าคอร์สเรียนจากครูแม็ก', 'Complete your details with the course passcode from Coach Max')}
          </p>

          {/* Error Alert */}
          {authError && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800/60 rounded-xl flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* ─── Sign In Form ─── */}
          {authMode === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {tx('ชื่อผู้ใช้งาน', 'Username')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={tx('กรอกชื่อผู้ใช้งาน', 'Enter your username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {tx('รหัสผ่าน', 'Password')}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder={tx('กรอกรหัสผ่าน', 'Enter your password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="group w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 shadow-md"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{tx('กำลังตรวจสอบ...', 'Signing in...')}</span>
                  </>
                ) : (
                  <>
                    <span>{tx('เข้าสู่ระบบ', 'Sign In')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500 pt-2">
                {tx('ยังไม่มีบัญชีนักเรียน?', 'New student?')}{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-amber-400 font-semibold hover:text-amber-300 cursor-pointer underline underline-offset-2"
                >
                  {tx('สมัครสมาชิก', 'Create Account')}
                </button>
              </p>
            </form>
          ) : (
            /* ─── Sign Up Form ─── */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-xl flex items-center gap-2.5 text-slate-300">
                <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  {tx(
                    'สำหรับนักเรียนเท่านั้น กรุณากรอกรหัสคอร์สที่ได้รับจากครูแม็ก',
                    'For students only. Please enter the course passcode provided by Coach Max.'
                  )}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {tx('ชื่อ-นามสกุล', 'Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={tx('สมชาย ใจดี', 'Somchai Jaidee')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {tx('ชื่อเล่น', 'Nickname')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={tx('น้องนนท์', 'Non')}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {tx('ชื่อผู้ใช้งาน', 'Username')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="non_student"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {tx('รหัสผ่าน', 'Password')} *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder={tx('อย่างน้อย 4 ตัวอักษร', 'Min 4 characters')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Course + Passcode */}
              {courses.length === 0 ? (
                <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl text-center text-xs text-amber-300">
                  {tx(
                    'ยังไม่มีคอร์สเปิดรับสมัคร กรุณาติดต่อครูแม็ก',
                    'No active courses available yet. Please contact Coach Max.'
                  )}
                </div>
              ) : (
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tx('เลือกคอร์สและรหัสเข้าเรียน', 'Course & Passcode')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        {tx('คอร์สเรียน', 'Course')} *
                      </label>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        {tx('รหัสคอร์ส', 'Passcode')} *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="MATH01"
                          value={coursePasscode}
                          onChange={(e) => setCoursePasscode(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-7 pr-2.5 py-2 text-xs font-mono font-bold tracking-widest text-amber-300 uppercase focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                        />
                        <KeyRound className="w-3.5 h-3.5 text-amber-500 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {tx('ระดับชั้น', 'Grade Level')}
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="มัธยมศึกษาปีที่ 6">{tx('ม. 6', 'Grade 12')}</option>
                    <option value="มัธยมศึกษาปีที่ 5">{tx('ม. 5', 'Grade 11')}</option>
                    <option value="มัธยมศึกษาปีที่ 4">{tx('ม. 4', 'Grade 10')}</option>
                    <option value="มัธยมศึกษาตอนต้น">{tx('ม. ต้น', 'Junior High')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {tx('โรงเรียน', 'School')}
                  </label>
                  <input
                    type="text"
                    placeholder={tx('เช่น เตรียมอุดมศึกษา', 'e.g. Triam Udom')}
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="group w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 mt-1 shadow-md"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{tx('กำลังสร้างบัญชี...', 'Creating account...')}</span>
                  </>
                ) : (
                  <>
                    <span>{tx('ยืนยันสมัครสมาชิก', 'Complete Registration')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
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
