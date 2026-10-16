import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MaxUpLogo } from '../brand/MaxUpLogo';
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
  const [grade, setGrade] = useState<string>('เธกเธฑเธเธขเธกเธจเธถเธเธฉเธฒเธเธตเธ—เธตเน 6');
  const [targetExam, setTargetExam] = useState<string>('A-Level 68 (เน€เธเธกเธต)');
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
    { icon: TrendingUp, label: 'เธ•เธดเธ”เธ•เธฒเธกเธเธงเธฒเธกเธเนเธฒเธงเธซเธเนเธฒ', sub: 'เน€เธเนเธเธชเธฒเธฃเธเธฑเธเธ—เธตเนเน€เธฃเธตเธขเธเนเธฅเนเธงเนเธเธ real-time' },
    { icon: BookOpen, label: 'เธเธญเธฃเนเธช & เธชเธทเนเธญเธเธฒเธฃเน€เธฃเธตเธขเธ', sub: 'เน€เธญเธเธชเธฒเธฃ เนเธเธฅเน Google Drive เธเธฃเธ' },
    { icon: Video, label: 'เธงเธดเธ”เธตเนเธญเธขเนเธญเธเธซเธฅเธฑเธ', sub: 'เธเธฅเธดเธเธชเธญเธ YouTube เธ—เธเธ—เธงเธเธ•เธฅเธญเธ” 24 เธเธก.' },
    { icon: ClipboardCheck, label: 'เธเธฒเธฃเธเนเธฒเธ & เธ•เธฃเธงเธเธเธฒเธ', sub: 'เธชเนเธเธเธฒเธ เธฃเธฑเธ feedback เธเธฒเธเธเธฃเธน' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col lg:flex-row">
      {/* โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•
          LEFT PANEL โ€” Brand & Feature Highlights
      โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ• */}
      <div className="lg:w-[45%] xl:w-[42%] flex flex-col justify-between p-8 sm:p-10 lg:p-14 relative overflow-hidden">
        {/* Geometric accent โ€” subtle, not decorative glitter */}
        <div className="absolute top-0 right-0 w-px h-full bg-slate-800" />
        <div className="absolute top-1/3 -right-24 w-48 h-48 rounded-full border border-amber-500/10" />
        <div className="absolute bottom-1/4 -right-32 w-72 h-72 rounded-full border border-blue-500/5" />

        {/* Top: Logo */}
        <div>
          <MaxUpLogo size="sm" showSubtitle={false} />
          <p className="mt-3 text-[11px] font-semibold tracking-widest text-amber-500 uppercase">
            MaxUp TutorHub
          </p>
        </div>

        {/* Middle: Headline */}
        <div className="my-10 lg:my-0">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-[1.15] tracking-tight" style={{ textWrap: 'balance' }}>
            เธฃเธฐเธเธเธ•เธดเธงเน€เธ•เธญเธฃเน<br />
            <span className="text-amber-400">เธชเนเธงเธเธ•เธฑเธง</span> เธ—เธตเนเธฃเธนเนเธเธฑเธ<br />
            เธเนเธญเธเธเธเน€เธ”เธตเธขเธง
          </h1>
          <p className="mt-5 text-sm text-slate-400 leading-relaxed max-w-xs">
            เธเธฑเธเธ—เธถเธเธเธฒเธเน€เธฃเธตเธขเธ เธ•เธดเธ”เธ•เธฒเธกเธชเธฒเธฃเธเธฑเธ เธงเธฒเธเนเธเธเธ•เธฒเธฃเธฒเธเธชเธญเธ โ€” เธ—เธธเธเธญเธขเนเธฒเธเธเธดเธเธเนเนเธเธ real-time
          </p>

          {/* Feature list โ€” no icon grid clichรฉ */}
          <ul className="mt-8 space-y-4">
            {features.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-start gap-3.5">
                <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">{label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: Credential hint for admin */}
        <p className="text-[10px] text-slate-600 flex items-center gap-1.5 mt-10 lg:mt-0">
          <Shield className="w-3 h-3 text-slate-700" />
          <span>เธชเธณเธซเธฃเธฑเธเธเธฃเธนเธเธนเนเธชเธญเธ: เธฅเนเธญเธเธญเธดเธเธ”เนเธงเธข Admin credentials เธ—เธตเนเธเธณเธซเธเธ”เนเธงเน</span>
        </p>
      </div>

      {/* โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•
          RIGHT PANEL โ€” Auth Form
      โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ• */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-14 bg-slate-900">
        <div className="w-full max-w-md">
          {/* Mode Switcher */}
          <div className="flex gap-1 p-1 bg-slate-800 rounded-xl mb-8 w-fit">
            {(['signin', 'signup'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => { setAuthMode(mode); clearAuthError(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  authMode === mode
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {mode === 'signin' ? 'เน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธ' : 'เธชเธกเธฑเธเธฃเธชเธกเธฒเธเธดเธ'}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-black text-white mb-1">
            {authMode === 'signin' ? 'เธขเธดเธเธ”เธตเธ•เนเธญเธเธฃเธฑเธเธเธฅเธฑเธเธกเธฒ' : 'เธชเธฃเนเธฒเธเธเธฑเธเธเธตเธเธฑเธเน€เธฃเธตเธขเธเนเธซเธกเน'}
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            {authMode === 'signin'
              ? 'เธเธฃเธญเธ Username เนเธฅเธฐ Password เธเธญเธเธเธธเธ“'
              : 'เธเธฃเธญเธเธเนเธญเธกเธนเธฅเธชเนเธงเธเธ•เธฑเธงเธเธฃเนเธญเธกเธฃเธซเธฑเธชเน€เธเนเธฒเธเธญเธฃเนเธชเน€เธฃเธตเธขเธ'}
          </p>

          {/* Error Alert */}
          {authError && (
            <div className="mb-4 p-3 bg-red-950/60 border border-red-800/60 rounded-xl flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* โ”€โ”€โ”€ Sign In Form โ”€โ”€โ”€ */}
          {authMode === 'signin' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  เธเธทเนเธญเธเธนเนเนเธเนเธเธฒเธ (Username)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="เธเธฃเธญเธ Username เธเธญเธเธเธธเธ“"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none transition-all"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">เธฃเธซเธฑเธชเธเนเธฒเธ</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="เธเธฃเธญเธเธฃเธซเธฑเธชเธเนเธฒเธเธเธญเธเธเธธเธ“"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>เธเธณเธฅเธฑเธเธ•เธฃเธงเธเธชเธญเธ...</span>
                  </>
                ) : (
                  <>
                    <span>เน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธ</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-600 pt-1">
                เธขเธฑเธเนเธกเนเธกเธตเธเธฑเธเธเธต?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="text-amber-400 font-semibold hover:text-amber-300 cursor-pointer"
                >
                  เธชเธกเธฑเธเธฃเธชเธกเธฒเธเธดเธ
                </button>
              </p>
            </form>
          ) : (
            /* โ”€โ”€โ”€ Sign Up Form โ”€โ”€โ”€ */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div className="p-3 bg-blue-950/50 border border-blue-800/50 rounded-xl flex items-center gap-2 text-slate-300">
                <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-[11px]">
                  เน€เธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃ <strong className="text-white">เธเธฑเธเน€เธฃเธตเธขเธ</strong> เน€เธ—เนเธฒเธเธฑเนเธ โ€” เธเธฃเธธเธ“เธฒเธเธฃเธญเธเธฃเธซเธฑเธชเน€เธเนเธฒเธเธญเธฃเนเธชเธ—เธตเนเธเธฃเธน Max เนเธเนเธ
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">เธเธทเนเธญ-เธเธฒเธกเธชเธเธธเธฅ *</label>
                  <input
                    type="text"
                    required
                    placeholder="เธชเธกเธเธฒเธข เนเธเธ”เธต"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">เธเธทเนเธญเน€เธฅเนเธ *</label>
                  <input
                    type="text"
                    required
                    placeholder="เธเนเธญเธเธเธเธ—เน"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="non_student"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="เธญเธขเนเธฒเธเธเนเธญเธข 4 เธ•เธฑเธง"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Course + Passcode */}
              {courses.length === 0 ? (
                <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl text-center text-xs text-amber-300">
                  เธขเธฑเธเนเธกเนเธกเธตเธเธญเธฃเนเธชเน€เธเธดเธ”เธฃเธฑเธเธชเธกเธฑเธเธฃ โ€” เธ•เธดเธ”เธ•เนเธญเธเธฃเธน Max เน€เธเธทเนเธญเน€เธเธดเธ”เธฃเธฐเธเธ
                </div>
              ) : (
                <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>เธเธญเธฃเนเธชเน€เธฃเธตเธขเธ & เธฃเธซเธฑเธชเน€เธเนเธฒเธเธญเธฃเนเธช</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">เธเธญเธฃเนเธชเธ—เธตเนเธชเธกเธฑเธเธฃ *</label>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
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
                        Passcode *{' '}
                        <span className="text-amber-500 font-normal">(เธ–เธฒเธกเธเธฃเธน)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="CHEM68"
                          value={coursePasscode}
                          onChange={(e) => setCoursePasscode(e.target.value)}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-7 pr-2.5 py-2 text-xs font-mono font-bold tracking-widest text-amber-300 uppercase focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                        />
                        <KeyRound className="w-3.5 h-3.5 text-amber-600 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {selectedCourse && (
                    <p className="text-[11px] text-slate-500">
                      เธเธญเธฃเนเธช <strong className="text-slate-300">{selectedCourse.name}</strong> เธเธฐเธ–เธนเธเน€เธเธดเนเธกเน€เธเนเธฒเนเธเธฃเนเธเธฅเนเธ—เธฑเธเธ—เธต
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">เธฃเธฐเธ”เธฑเธเธเธฑเนเธ</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="เธกเธฑเธเธขเธกเธจเธถเธเธฉเธฒเธเธตเธ—เธตเน 6">เธก. 6</option>
                    <option value="เธกเธฑเธเธขเธกเธจเธถเธเธฉเธฒเธเธตเธ—เธตเน 5">เธก. 5</option>
                    <option value="เธกเธฑเธเธขเธกเธจเธถเธเธฉเธฒเธเธตเธ—เธตเน 4">เธก. 4</option>
                    <option value="เธกเธฑเธเธขเธกเธจเธถเธเธฉเธฒเธ•เธญเธเธ•เนเธ">เธก. เธ•เนเธ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">เนเธฃเธเน€เธฃเธตเธขเธ</label>
                  <input
                    type="text"
                    placeholder="เน€เธ•เธฃเธตเธขเธกเธญเธธเธ”เธกเธจเธถเธเธฉเธฒ"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-900 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 mt-1"
              >
                {isAuthLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>เธเธณเธฅเธฑเธเธเธฑเธเธ—เธถเธเนเธฅเธฐเธ•เธฃเธงเธเธชเธญเธเธฃเธซเธฑเธชเธเธญเธฃเนเธช...</span>
                  </>
                ) : (
                  <>
                    <span>เธขเธทเธเธขเธฑเธเธชเธกเธฑเธเธฃเธชเธกเธฒเธเธดเธ</span>
                    <ArrowRight className="w-4 h-4" />
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
