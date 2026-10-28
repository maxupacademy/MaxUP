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
    <div className="min-h-screen bg-gradient-to-br from-[#001B48] via-[#072B61] to-[#001B48] flex flex-col lg:flex-row relative">
      {/* Top-right floating language switcher */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageToggle variant="dark" />
      </div>

      {/* ═══════════════════════════════════════════════════
          LEFT PANEL — Brand & Pumpkin Mascot Welcome
      ═══════════════════════════════════════════════════ */}
      <div
        className="lg:w-[48%] xl:w-[46%] flex flex-col justify-between p-8 sm:p-10 lg:p-12 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-blue-800/40 text-white"
        style={{
          backgroundImage:
            'radial-gradient(rgba(251, 191, 36, 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        {/* Top: Logo & Mascot Badge */}
        <div className="flex items-center justify-between">
          <div>
            <MaxUpLogo size="sm" showSubtitle={false} />
            <div className="flex items-center gap-2 mt-2.5">
              <span className="text-[11px] font-black tracking-widest text-[#FF7A00] uppercase bg-amber-400/10 px-2.5 py-0.5 rounded-md border border-amber-400/30">
                MaxUp Academy
              </span>
              <span className="text-[11px] font-semibold text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-md border border-purple-400/30">
                🐱 Pumpkin
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Headline, Pumpkin Mascot & Feature Cards */}
        <div className="my-8 lg:my-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
            {/* Pumpkin Mascot Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg shrink-0 bg-white/10">
              <img
                src="/mascot/pumpkin_lab.jpg"
                alt="น้องพัมคิน (Pumpkin - Professor Meow)"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1
                className="text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-white leading-[1.2] tracking-tight text-center sm:text-left"
                style={{ textWrap: 'balance' }}
              >
                {tx('ระบบดูแลการเรียน', 'Personalized Tutoring')}
                <br />
                <span className="text-[#FF7A00]">
                  {tx('ที่ออกแบบเพื่อน้องรายบุคคล', 'Built Around Every Student')}
                </span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed text-center sm:text-left">
                {tx(
                  'บันทึกคาบเรียน วางแผนตารางสอน และติดตามสารบัญวิชากับครูพี่แม็กและน้อง Pumpkin',
                  'Track lessons, schedule sessions, and master subjects with Coach Max & Pumpkin.'
                )}
              </p>
            </div>
          </div>

          {/* Feature Cards in Royal Navy Glassmorphism */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map(({ icon: Icon, label, sub }) => (
              <SpotlightCard
                key={label}
                spotlightColor="rgba(251, 191, 36, 0.18)"
                className="rounded-2xl bg-white/5 backdrop-blur-sm border border-blue-400/20 p-3 hover:border-amber-400/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 w-8 h-8 rounded-xl bg-[#001B48] border border-blue-400/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{label}</div>
                    <div className="text-[11px] text-blue-200/80 mt-0.5 leading-snug">{sub}</div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Bottom: Credential hint */}
        <p className="text-[11px] text-blue-200/70 flex items-center gap-1.5 mt-6 lg:mt-0">
          <Shield className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {tx(
              'เข้าสู่ระบบแล้วจะเข้าสู่หน้าแดชบอร์ดทันที',
              'Instant access to your personal dashboard upon sign-in'
            )}
          </span>
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════
          RIGHT PANEL — Clean Auth Card (MaxUp CI Style)
      ═══════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-[#001B48]/90 via-[#072B61]/80 to-[#001B48]/95">
        <div className="w-full max-w-md bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-800">
          {/* Subtle top highlight line in MaxUp Orange */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0B48A1] via-[#FF7A00] to-[#FBBF24]" />

          {/* Segmented Control Switcher */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 border border-slate-200 rounded-xl mb-6">
            {(['signin', 'signup'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setAuthMode(mode);
                  clearAuthError();
                }}
                className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  authMode === mode
                    ? 'bg-[#0B48A1] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode === 'signin'
                  ? tx('เข้าสู่ระบบ', 'Sign In')
                  : tx('สมัครสมาชิก', 'Create Account')}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-black text-slate-900 mb-1">
            {authMode === 'signin'
              ? tx('ยินดีต้อนรับกลับมา', 'Welcome Back')
              : tx('สร้างบัญชีนักเรียนใหม่', 'Student Registration')}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            {authMode === 'signin'
              ? tx('กรอกชื่อผู้ใช้งานและรหัสผ่านเพื่อเข้าสู่แดชบอร์ด', 'Enter your credentials to access your dashboard')
              : tx('กรอกข้อมูลส่วนตัวพร้อมรหัสเข้าคอร์สเรียนจากครูแม็ก', 'Complete your details with the course passcode from Coach Max')}
          </p>

          {/* Error Alert */}
          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* ─── Sign In Form ─── */}
          {authMode === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {tx('ชื่อผู้ใช้งาน', 'Username')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={tx('กรอกชื่อผู้ใช้งาน เช่น max, fah', 'Enter your username')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {tx('รหัสผ่าน', 'Password')}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder={tx('กรอกรหัสผ่าน', 'Enter your password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="group w-full mt-2 py-3 px-4 bg-gradient-to-r from-[#FF7A00] to-[#F55D00] hover:from-[#F55D00] hover:to-[#E05000] active:scale-[0.99] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-md"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{tx('กำลังเข้าสู่ระบบ...', 'Signing in...')}</span>
                  </>
                ) : (
                  <>
                    <span>{tx('เข้าสู่แดชบอร์ด', 'Access Dashboard')}</span>
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tx('ชื่อเล่น', 'Nickname')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={tx('น้องนนท์', 'Non')}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tx('ชื่อผู้ใช้งาน', 'Username')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="non_student"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tx('รหัสผ่าน', 'Password')} *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder={tx('อย่างน้อย 4 ตัวอักษร', 'Min 4 characters')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                  />
                </div>
              </div>

              {/* Course + Passcode */}
              {courses.length === 0 ? (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center text-xs text-amber-800">
                  {tx(
                    'ยังไม่มีคอร์สเปิดรับสมัคร กรุณาติดต่อครูแม็ก',
                    'No active courses available yet. Please contact Coach Max.'
                  )}
                </div>
              ) : (
                <div className="p-3.5 bg-blue-50/50 border border-blue-200/80 rounded-2xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#001B48]">
                    <BookOpen className="w-3.5 h-3.5 text-[#0B48A1]" />
                    <span>{tx('เลือกคอร์สและรหัสเข้าเรียน', 'Course & Passcode')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {tx('คอร์สเรียน', 'Course')} *
                      </label>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                      >
                        {courses.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">
                        {tx('รหัสคอร์ส', 'Passcode')} *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="MATH01"
                          value={coursePasscode}
                          onChange={(e) => setCoursePasscode(e.target.value)}
                          className="w-full bg-white border border-amber-300 rounded-lg pl-7 pr-2.5 py-2 text-xs font-mono font-bold tracking-widest text-[#FF7A00] uppercase focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 focus:outline-none"
                        />
                        <KeyRound className="w-3.5 h-3.5 text-amber-500 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tx('ระดับชั้น', 'Grade Level')}
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                  >
                    <option value="มัธยมศึกษาปีที่ 6">{tx('ม. 6', 'Grade 12')}</option>
                    <option value="มัธยมศึกษาปีที่ 5">{tx('ม. 5', 'Grade 11')}</option>
                    <option value="มัธยมศึกษาปีที่ 4">{tx('ม. 4', 'Grade 10')}</option>
                    <option value="มัธยมศึกษาปีที่ 3">{tx('ม. 3', 'Grade 9')}</option>
                    <option value="มัธยมศึกษาปีที่ 2">{tx('ม. 2', 'Grade 8')}</option>
                    <option value="มัธยมศึกษาปีที่ 1">{tx('ม. 1', 'Grade 7')}</option>
                    <option value="มัธยมศึกษาตอนต้น">{tx('ม. ต้น รวม', 'Junior High')}</option>
                    <option value="ซิ่ว / เตรียมสอบใหม่">{tx('ซิ่ว / เตรียมสอบใหม่', 'Gap Year')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {tx('โรงเรียน', 'School')}
                  </label>
                  <input
                    type="text"
                    placeholder={tx('เช่น เตรียมอุดมศึกษา', 'e.g. Triam Udom')}
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#0B48A1]/30 focus:border-[#0B48A1] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="group w-full py-3 px-4 bg-gradient-to-r from-[#FF7A00] to-[#F55D00] hover:from-[#F55D00] hover:to-[#E05000] active:scale-[0.99] text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 mt-1 shadow-md"
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
