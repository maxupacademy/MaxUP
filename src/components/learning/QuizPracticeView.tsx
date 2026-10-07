import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Quiz, QuizQuestion } from '../../types';
import { ProfessorMeow } from '../brand/ProfessorMeow';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  Clock,
  Award,
  RotateCcw,
  Plus,
  X,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

export const QuizPracticeView: React.FC = () => {
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    quizzes,
    addQuiz,
    submitQuizAttempt,
    quizAttempts,
    currentUserRole,
    activeStudent,
  } = useApp();

  const courseQuizzes = quizzes.filter((q) => q.courseId === activeCourseId);

  // Active quiz being taken
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<{ score: number; total: number } | null>(
    null
  );

  // Add Quiz Modal (Admin)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTime, setNewTime] = useState('10');

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setSubmittedScore(null);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmitQuiz = () => {
    if (!activeQuiz) return;

    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setSubmittedScore({ score, total: activeQuiz.questions.length });
    setIsSubmitted(true);

    if (activeStudent) {
      submitQuizAttempt(
        activeQuiz.id,
        activeStudent.id,
        selectedAnswers,
        score,
        activeQuiz.questions.length
      );
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setSubmittedScore(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Course Filter */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-900" />
              <span>ควิซ & ข้อสอบฝึกฝน (Quizzes & Practice)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              ควิซทบทวน: {activeCourse.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ทดสอบความเข้าใจรายบท พร้อมตรวจคำตอบและอ่านเฉลยละเอียดอย่างเป็นขั้นตอน
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>สร้างชุดควิซใหม่</span>
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
                setActiveQuiz(null);
                setIsSubmitted(false);
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
      </div>

      {/* Main Area: Active Quiz Player OR Quiz List */}
      {activeQuiz ? (
        <div className="bg-white border border-amber-900/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Quiz Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs text-blue-900 font-semibold">{activeCourse.name}</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">{activeQuiz.title}</h2>
            </div>
            <button
              onClick={() => setActiveQuiz(null)}
              className="text-xs text-slate-500 hover:text-slate-800 underline underline-offset-2"
            >
              ← กลับไปเลือกชุดควิซ
            </button>
          </div>

          {/* Submission Result Score Banner */}
          {isSubmitted && submittedScore && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-blue-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Award className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-bold text-slate-900">
                    ผลคะแนนของคุณ: {submittedScore.score} / {submittedScore.total} ข้อ
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {submittedScore.score === submittedScore.total
                    ? '🎉 ยอดเยี่ยมมากครับ! ถูกต้องครบถ้วน 100%'
                    : submittedScore.score >= submittedScore.total / 2
                    ? '👏 เก่งมากครับ! ลองอ่านเฉลยละเอียดด้านล่างเพื่อเสริมจุดที่พลาดนะ'
                    : '💪 สู้ๆ ครับ! ทบทวนเฉลยละเอียดแล้วลองทำใหม่อีกรอบได้เสมอ'}
                </p>
              </div>

              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ทำใหม่อีกครั้ง</span>
              </button>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-8">
            {activeQuiz.questions.map((q, qIdx) => {
              const studentChoice = selectedAnswers[q.id];
              const isAnswered = studentChoice !== undefined;
              const isCorrect = isSubmitted && studentChoice === q.correctIndex;
              const isWrong = isSubmitted && studentChoice !== q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border transition-all space-y-4 ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-red-300 bg-red-50/20'
                      : 'border-slate-200 bg-[#FFFDF7]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                      <span className="text-blue-900 mr-2 font-mono">ข้อที่ {qIdx + 1}.</span>
                      {q.question}
                    </h3>
                    {isSubmitted && (
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                            <CheckCircle className="w-3.5 h-3.5" /> ถูกต้อง (+1)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-md">
                            <XCircle className="w-3.5 h-3.5" /> ไม่ถูกต้อง
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Options Radio List */}
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = studentChoice === optIdx;
                      const isRightOption = isSubmitted && optIdx === q.correctIndex;

                      return (
                        <button
                          type="button"
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                            isSubmitted
                              ? isRightOption
                                ? 'bg-emerald-100/80 border-emerald-500 text-emerald-950 font-bold'
                                : isSelected
                                ? 'bg-red-100/80 border-red-400 text-red-950 font-medium'
                                : 'bg-white border-slate-200 opacity-60 text-slate-700'
                              : isSelected
                              ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-2xs font-semibold'
                              : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center font-bold flex-shrink-0 ${
                                isSelected
                                  ? 'bg-blue-900 text-white'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isSubmitted && isRightOption && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          )}
                          {isSubmitted && isSelected && !isRightOption && (
                            <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Banner (เมื่อตรวจคำตอบแล้ว) */}
                  {isSubmitted && (
                    <div className="mt-3 p-3.5 bg-white border border-amber-200 rounded-xl text-xs space-y-1 animate-in fade-in duration-200">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>เฉลยละเอียด & วิธีคิด:</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action */}
          {!isSubmitted && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                ตอบแล้ว {Object.keys(selectedAnswers).length} จาก {activeQuiz.questions.length} ข้อ
              </span>
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 disabled:opacity-50 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                ส่งคำตอบและตรวจคะแนน
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Catalog Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courseQuizzes.length === 0 ? (
            <div className="col-span-2 text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 mt-2">ยังไม่มีชุดควิซในคอร์สนี้</p>
              <p className="text-xs text-slate-500">ติวเตอร์สามารถกดสร้างชุดควิซใหม่ด้านบนได้เลย</p>
            </div>
          ) : (
            courseQuizzes.map((quiz) => {
              const attempts = quizAttempts.filter(
                (a) => a.quizId === quiz.id && a.studentId === activeStudent?.id
              );
              const latestAttempt = attempts[attempts.length - 1];

              return (
                <div
                  key={quiz.id}
                  className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-md">
                        {quiz.questions.length} ข้อคำถาม
                      </span>
                      {quiz.timeLimitMinutes && (
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          ~{quiz.timeLimitMinutes} นาที
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-base leading-snug">{quiz.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{quiz.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      {latestAttempt ? (
                        <span className="text-xs font-semibold text-emerald-700">
                          เคยทำแล้ว: ได้ {latestAttempt.score}/{latestAttempt.total} คะแนน
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">ยังไม่เคยทำ</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <span>เริ่มทำควิซ</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Add Quiz Modal (Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFDF7] w-full max-w-lg rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">สร้างชุดควิซใหม่</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newTitle.trim()) return;

                addQuiz({
                  courseId: activeCourseId,
                  topicId: activeCourse.topics[0]?.id || 'topic_01',
                  title: newTitle.trim(),
                  description: newDesc.trim() || 'ชุดคำถามทดสอบความเข้าใจประจำบทเรียน',
                  timeLimitMinutes: parseInt(newTime, 10) || 10,
                  questions: [
                    {
                      id: `q_${Date.now()}_1`,
                      quizId: '',
                      question: 'คำถามข้อที่ 1: ตัวอย่างโจทย์ทดสอบความรู้',
                      options: ['ตัวเลือก ก', 'ตัวเลือก ข (ข้อที่ถูกต้อง)', 'ตัวเลือก ค', 'ตัวเลือก ง'],
                      correctIndex: 1,
                      explanation: 'คำอธิบายวิธีคิดและเหตุผลของข้อที่ถูกต้องอย่างละเอียด',
                    },
                  ],
                });

                setIsAddModalOpen(false);
                setNewTitle('');
                setNewDesc('');
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คอร์สที่ต้องการสร้างควิซ
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
                  ชื่อชุดควิซ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ควิซฝึกทำโจทย์ท้ายบทที่ 3"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คำอธิบาย
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น ตะลุยโจทย์ 5 ข้อ พร้อมเฉลยละเอียด..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  เวลาจำกัด (นาที)
                </label>
                <input
                  type="number"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
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
                  บันทึกชุดควิซ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
