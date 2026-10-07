import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flashcard } from '../../types';
import { ProfessorMeow } from '../brand/ProfessorMeow';
import {
  RotateCw,
  CheckCircle,
  XCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    flashcards,
    addFlashcard,
    currentUserRole,
    activeStudent,
    flashcardProgressMap,
    toggleFlashcardKnown,
  } = useApp();

  const courseCards = flashcards.filter((c) => c.courseId === activeCourseId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Add flashcard modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');
  const [newHint, setNewHint] = useState('');
  const [newTopicId, setNewTopicId] = useState('');

  const currentCard: Flashcard | undefined = courseCards[currentIndex];

  const studentCardProgress = flashcardProgressMap[activeStudent?.id] || {};
  const knownCount = courseCards.filter((c) => studentCardProgress[c.id]?.known).length;
  const progressPercent =
    courseCards.length > 0 ? Math.round((knownCount / courseCards.length) * 100) : 0;

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1) % courseCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 + courseCards.length) % courseCards.length);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFront.trim() || !newBack.trim()) return;

    addFlashcard({
      courseId: activeCourseId,
      topicId: newTopicId || activeCourse.topics[0]?.id || 'topic_01',
      front: newFront.trim(),
      back: newBack.trim(),
      hint: newHint.trim() || undefined,
    });

    setIsAddModalOpen(false);
    setNewFront('');
    setNewBack('');
    setNewHint('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Course Filter */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>แฟลชการ์ดทบทวนความจำ (Flashcards)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              แฟลชการ์ด: {activeCourse.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ทบทวนสูตรสำคัญ นิยาม และเทคนิคตัดช้อยส์ด้วยระบบ Spaced Repetition พลิกการ์ดฝึกจำ
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>เพิ่มแฟลชการ์ด</span>
              </button>
            )}
          </div>
        </div>

        {/* Course Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mr-1">
            เลือกคอร์ส:
          </span>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => {
                setActiveCourseId(course.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeCourseId === course.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>

        {/* Student Progress */}
        {currentUserRole === 'student' && courseCards.length > 0 && (
          <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-slate-700">
                ความคืบหน้าของ <strong>{activeStudent?.nickname}</strong>:
              </span>
              <span className="font-bold text-amber-900 font-mono">
                จำได้แล้ว {knownCount} / {courseCards.length} ใบ ({progressPercent}%)
              </span>
            </div>
            <div className="w-full sm:w-48 bg-white border border-amber-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Flashcard Arena */}
      {courseCards.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700 mt-2">ยังไม่มีแฟลชการ์ดในคอร์สนี้</p>
          <p className="text-xs text-slate-500 mt-1">ติวเตอร์สามารถกดปุ่ม "เพิ่มแฟลชการ์ด" ด้านบนได้เลย</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>
              การ์ดใบที่ {currentIndex + 1} จาก {courseCards.length}
            </span>
            <span>กดที่การ์ดเพื่อพลิกดูคำตอบ</span>
          </div>

          {/* Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer select-none perspective-1000 min-h-[300px] sm:min-h-[340px]"
          >
            <div
              className={`w-full min-h-[300px] sm:min-h-[340px] rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 border shadow-md relative ${
                isFlipped
                  ? 'bg-gradient-to-br from-blue-900 to-indigo-950 text-white border-blue-800'
                  : 'bg-white text-slate-900 border-amber-900/15 hover:border-amber-400'
              }`}
            >
              {/* Card Top Label */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                    isFlipped ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {isFlipped ? 'เฉลย / คำอธิบาย' : 'คำถาม / สูตร'}
                </span>

                <div className="flex items-center gap-2 text-xs">
                  <RotateCw className="w-4 h-4 opacity-60" />
                  <span className="opacity-75">คลิกเพื่อพลิก</span>
                </div>
              </div>

              {/* Card Center Content */}
              <div className="my-auto py-6 text-center space-y-4">
                <h3
                  className={`text-lg sm:text-2xl font-bold tracking-tight leading-relaxed ${
                    isFlipped ? 'text-amber-300 font-mono' : 'text-slate-900'
                  }`}
                >
                  {isFlipped ? currentCard.back : currentCard.front}
                </h3>

                {/* Optional Hint on Front */}
                {!isFlipped && currentCard.hint && (
                  <div>
                    {showHint ? (
                      <p className="text-xs text-amber-800 bg-amber-50 py-1.5 px-3 rounded-xl border border-amber-200 inline-block">
                        💡 คำใบ้: {currentCard.hint}
                      </p>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowHint(true);
                        }}
                        className="text-xs text-slate-500 hover:text-amber-700 flex items-center gap-1 mx-auto"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>แสดงคำใบ้</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Card Bottom: Known status badge */}
              <div className="flex items-center justify-between text-xs pt-3 border-t border-current/10">
                <span className="opacity-75">
                  วิชา: {activeCourse.code} · {activeCourse.name}
                </span>
                {currentUserRole === 'student' && studentCardProgress[currentCard.id]?.known && (
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>จำได้แล้ว</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation & Action Controls */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>ก่อนหน้า</span>
            </button>

            {/* Quick Known / Unknown Buttons (Student) */}
            {currentUserRole === 'student' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFlashcardKnown(activeStudent.id, currentCard.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl shadow-2xs transition-all ${
                    studentCardProgress[currentCard.id]?.known
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {studentCardProgress[currentCard.id]?.known ? 'จำได้แล้ว ✓' : 'มาร์คว่าจำได้'}
                  </span>
                </button>
              </div>
            )}

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all"
            >
              <span>ถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Add Flashcard Modal (Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFDF7] w-full max-w-lg rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มแฟลชการ์ดใหม่</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คอร์สที่ต้องการเพิ่ม
                </label>
                <select
                  value={activeCourseId}
                  onChange={(e) => setActiveCourseId(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ด้านหน้าการ์ด (คำถาม / หัวข้อสูตร) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="เช่น กฎของแก๊สสมบูรณ์ (Ideal Gas Law)"
                  value={newFront}
                  onChange={(e) => setNewFront(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ด้านหลังการ์ด (คำตอบ / วิธีจำ / คำอธิบาย) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="เช่น PV = nRT โดย R = 0.0821 L·atm/(mol·K) และ T ต้องเป็นเคลวิน..."
                  value={newBack}
                  onChange={(e) => setNewBack(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คำใบ้เพิ่มเติม (Optional)
                </label>
                <input
                  type="text"
                  placeholder="เช่น ตัวแปรความดันต้องใช้หน่วย atm เสมอ"
                  value={newHint}
                  onChange={(e) => setNewHint(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-xs"
                >
                  บันทึกแฟลชการ์ด
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
