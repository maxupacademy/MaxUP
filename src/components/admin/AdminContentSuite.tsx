import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, Topic, Subtopic, VideoLesson, Flashcard, Quiz, CourseMaterial } from '../../types';
import { HomeworkSuite } from '../homework/HomeworkSuite';
import {
  Settings,
  BookOpen,
  Play,
  Layers,
  HelpCircle,
  Download,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  Save,
  Clock,
  ChevronRight,
  ClipboardList,
  UploadCloud,
  FileCheck,
  KeyRound,
} from 'lucide-react';

export const AdminContentSuite: React.FC = () => {
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    addCourse,
    updateCourse,
    deleteCourse,
    addTopic,
    updateTopic,
    deleteTopic,
    addSubtopic,
    updateSubtopic,
    deleteSubtopic,
    videos,
    addVideo,
    deleteVideo,
    flashcards,
    addFlashcard,
    deleteFlashcard,
    quizzes,
    addQuiz,
    materials,
    addMaterial,
    deleteMaterial,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'courses' | 'syllabus' | 'videos' | 'flashcards' | 'quizzes' | 'materials' | 'homework'
  >('courses');

  // Edit/Add Course Modal
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseGrade, setCourseGrade] = useState('ม.ปลาย');
  const [courseDesc, setCourseDesc] = useState('');
  const [coursePasscode, setCoursePasscode] = useState('');

  // Add Topic / Subtopic state
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicNameEn, setNewTopicNameEn] = useState('');
  const [selectedTopicForSubtopic, setSelectedTopicForSubtopic] = useState<string | null>(null);
  const [newSubtopicName, setNewSubtopicName] = useState('');
  const [newSubtopicDesc, setNewSubtopicDesc] = useState('');

  // Add Video Modal
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [vidDuration, setVidDuration] = useState('25');
  const [vidDesc, setVidDesc] = useState('');
  const [vidTopicId, setVidTopicId] = useState('');

  // Add Flashcard Modal
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');
  const [cardHint, setCardHint] = useState('');
  const [cardFormula, setCardFormula] = useState('');

  // Add Material Modal
  const [isAddMatModalOpen, setIsAddMatModalOpen] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matCategory, setMatCategory] = useState<CourseMaterial['category']>('ชีทสรุปสูตร');
  const [matSize, setMatSize] = useState('3.5 MB');
  const [matDesc, setMatDesc] = useState('');
  const [matFileData, setMatFileData] = useState<string | undefined>(undefined);
  const [matFileName, setMatFileName] = useState('');

  // Current course items
  const courseVideos = videos.filter((v) => v.subjectId === activeCourseId);
  const courseCards = flashcards.filter((f) => f.courseId === activeCourseId);
  const courseQuizzes = quizzes.filter((q) => q.courseId === activeCourseId);
  const courseMaterials = materials.filter((m) => m.courseId === activeCourseId);

  // Extract YouTube ID
  const extractYoutubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url.trim();
  };

  const handleOpenEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseName(course.name);
    setCourseCode(course.code);
    setCourseGrade(course.gradeLevel || 'ม.ปลาย');
    setCourseDesc(course.description);
    setCoursePasscode(course.passcode || '');
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;

    updateCourse({
      ...editingCourse,
      name: courseName.trim(),
      code: courseCode.trim().toUpperCase(),
      gradeLevel: courseGrade.trim(),
      description: courseDesc.trim(),
      passcode: coursePasscode.trim().toUpperCase() || 'CHEM68',
    });
    setEditingCourse(null);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName.trim()) return;

    addCourse(
      courseName.trim(),
      courseCode.trim().toUpperCase() || 'COURSE-01',
      courseDesc.trim() || 'คอร์สเรียนเข้มข้น',
      courseGrade.trim() || 'ม.ปลาย',
      coursePasscode.trim().toUpperCase() || 'PASS123'
    );
    setIsAddCourseModalOpen(false);
    setCourseName('');
    setCourseCode('');
    setCourseDesc('');
    setCoursePasscode('');
  };

  const handleAddTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;

    addTopic(activeCourseId, newTopicName.trim(), newTopicNameEn.trim() || undefined);
    setIsAddTopicModalOpen(false);
    setNewTopicName('');
    setNewTopicNameEn('');
  };

  const handleAddSubtopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicForSubtopic || !newSubtopicName.trim()) return;

    addSubtopic(activeCourseId, selectedTopicForSubtopic, {
      name: newSubtopicName.trim(),
      description: newSubtopicDesc.trim() || 'หัวข้อย่อยและเนื้อหาฝึกปฏิบัติ',
      difficulty: 'intermediate',
    });
    setSelectedTopicForSubtopic(null);
    setNewSubtopicName('');
    setNewSubtopicDesc('');
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle.trim() || !vidUrl.trim()) return;

    const ytId = extractYoutubeId(vidUrl);
    addVideo({
      subjectId: activeCourseId,
      topicId: vidTopicId || activeCourse.topics[0]?.id || 'topic_01',
      title: vidTitle.trim(),
      description: vidDesc.trim() || 'คลิปทบทวนเนื้อหาและตะลุยโจทย์ละเอียด',
      youtubeUrl: vidUrl.trim(),
      youtubeId: ytId,
      durationMinutes: Number(vidDuration) || 25,
    });

    setIsAddVideoModalOpen(false);
    setVidTitle('');
    setVidUrl('');
    setVidDesc('');
  };

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardFront.trim() || !cardBack.trim()) return;

    addFlashcard({
      courseId: activeCourseId,
      topicId: activeCourse.topics[0]?.id || 'topic_01',
      front: cardFront.trim(),
      back: cardBack.trim(),
      hint: cardHint.trim() || undefined,
      keyFormula: cardFormula.trim() || undefined,
    });

    setIsAddCardModalOpen(false);
    setCardFront('');
    setCardBack('');
    setCardHint('');
    setCardFormula('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMatFileName(file.name);
    setMatSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    if (!matTitle) {
      setMatTitle(file.name);
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      setMatFileData(loadEvt.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddMatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle.trim()) return;

    addMaterial({
      courseId: activeCourseId,
      title: matTitle.trim().endsWith('.pdf') ? matTitle.trim() : `${matTitle.trim()}.pdf`,
      description: matDesc.trim() || 'เอกสารประกอบการเรียนและฝึกโจทย์',
      category: matCategory,
      fileType: 'pdf',
      fileSize: matSize.trim() || '2.5 MB',
      fileData: matFileData,
      isProtected: true,
    });

    setIsAddMatModalOpen(false);
    setMatTitle('');
    setMatDesc('');
    setMatFileData(undefined);
    setMatFileName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <Settings className="w-3.5 h-3.5 text-blue-800" />
              <span>ศูนย์ควบคุม & จัดการเนื้อหาเว็บ (Tutor Management Studio)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              จัดการและปรับแต่งเนื้อหาทุกส่วน
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              ปรับปรุงชื่อคอร์ส สารบัญ วิดีโอ แฟลชการ์ด ควิซ เอกสาร และการบ้านได้เองบนเว็บทันที
            </p>
          </div>

          {/* Course Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
              คอร์สที่กำลังแก้ไข:
            </span>
            <select
              value={activeCourseId}
              onChange={(e) => setActiveCourseId(e.target.value)}
              className="bg-[#FFFDF7] border border-amber-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 shadow-2xs focus:ring-1 focus:ring-amber-500 cursor-pointer"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Suite Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-slate-100">
          {[
            { id: 'courses', label: '1. คอร์สเรียน', icon: BookOpen },
            { id: 'syllabus', label: '2. สารบัญ & บทเรียน', icon: BookOpen },
            { id: 'videos', label: '3. วิดีโอ YouTube', icon: Play },
            { id: 'flashcards', label: '4. แฟลชการ์ด', icon: Layers },
            { id: 'quizzes', label: '5. ควิซ & ข้อสอบ', icon: HelpCircle },
            { id: 'materials', label: '6. ไฟล์เรียน & PDF', icon: Download },
            { id: 'homework', label: '7. การบ้าน & ตรวจงาน', icon: ClipboardList },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Courses Management */}
      {activeTab === 'courses' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                รายการคอร์สเรียนทั้งหมดในระบบ ({courses.length} คอร์ส)
              </h2>
              <p className="text-xs text-slate-500">
                สามารถเพิ่มคอร์สใหม่ เปลี่ยนชื่อคอร์ส หรือแก้ไขรหัสวิชาได้ตามต้องการ
              </p>
            </div>
            <button
              onClick={() => {
                setCourseName('');
                setCourseCode('');
                setCourseDesc('');
                setIsAddCourseModalOpen(true);
              }}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ เพิ่มคอร์สใหม่</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  activeCourseId === course.id
                    ? 'border-blue-900 bg-blue-50/20 shadow-xs'
                    : 'border-slate-200 bg-[#FFFDF7]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {course.gradeLevel || 'ม.ปลาย'}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{course.name}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>

                  <div className="p-2 bg-emerald-50/80 border border-emerald-200/90 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                      <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                      <span>รหัสเข้าคอร์ส:</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-300">
                      {course.passcode || course.code}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-500 font-mono pt-1">
                    • จำนวนบทในสารบัญ: {course.topics.length} บท
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => {
                      setActiveCourseId(course.id);
                      handleOpenEditCourse(course);
                    }}
                    className="text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>แก้ไขข้อมูล</span>
                  </button>

                  {courses.length > 1 && (
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>ลบ</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Syllabus & Topics Management */}
      {activeTab === 'syllabus' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                สารบัญคอร์ส: {activeCourse.name} ({activeCourse.topics.length} บท)
              </h2>
              <p className="text-xs text-slate-500">
                เพิ่มหัวข้อหลัก (Topic) และหัวข้อย่อย (Subtopic) พร้อมกำหนดเวลาเรียน
              </p>
            </div>
            <button
              onClick={() => setIsAddTopicModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ เพิ่มบทใหม่ (Topic)</span>
            </button>
          </div>

          <div className="space-y-4">
            {activeCourse.topics.map((topic, tIdx) => (
              <div
                key={topic.id}
                className="border border-slate-200 rounded-2xl p-4 bg-[#FFFDF7] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {tIdx + 1}. {topic.name} {topic.nameEn && <span className="text-slate-400 font-normal">({topic.nameEn})</span>}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      มีหัวข้อย่อย {topic.subtopics.length} เรื่อง
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTopicForSubtopic(topic.id)}
                      className="flex items-center gap-1 text-xs text-blue-900 hover:text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>เพิ่มหัวข้อย่อย</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`ยืนยันการลบบทเรียน "${topic.name}" หรือไม่?`)) {
                          deleteTopic(activeCourseId, topic.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title="ลบบทเรียนนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtopics list */}
                <div className="pl-3 space-y-1.5 border-l-2 border-amber-300">
                  {topic.subtopics.map((sub, sIdx) => (
                    <div
                      key={sub.id}
                      className="p-2 bg-white rounded-lg border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-700">
                        {tIdx + 1}.{sIdx + 1} {sub.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {sub.difficulty || 'intermediate'}
                        </span>
                        <button
                          onClick={() => {
                            if (window.confirm(`ยืนยันการลบหัวข้อย่อย "${sub.name}" หรือไม่?`)) {
                              deleteSubtopic(activeCourseId, topic.id, sub.id);
                            }
                          }}
                          className="p-0.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="ลบหัวข้อย่อย"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Videos Management */}
      {activeTab === 'videos' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                วิดีโอ YouTube ในคอร์ส: {activeCourse.name} ({courseVideos.length} คลิป)
              </h2>
              <p className="text-xs text-slate-500">คลิปทบทวนและเนื้อหาการสอนที่ฝังในระบบ</p>
            </div>
            <button
              onClick={() => setIsAddVideoModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ เพิ่มคลิปใหม่</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {courseVideos.map((vid, idx) => (
              <div key={vid.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-8 rounded bg-red-100 text-red-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                    <Play className="w-4 h-4 fill-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{idx + 1}. {vid.title}</h4>
                    <p className="text-slate-500 text-[11px] font-mono">
                      YouTube ID: {vid.youtubeId} · {vid.durationMinutes} นาที
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => deleteVideo(vid.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Flashcards Management */}
      {activeTab === 'flashcards' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                แฟลชการ์ดในคอร์ส: {activeCourse.name} ({courseCards.length} ใบ)
              </h2>
              <p className="text-xs text-slate-500">จัดการสูตรและคำถาม-คำตอบพลิกการ์ด</p>
            </div>
            <button
              onClick={() => setIsAddCardModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ เพิ่มแฟลชการ์ด</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {courseCards.map((card, idx) => (
              <div
                key={card.id}
                className="p-4 rounded-xl border border-slate-200 bg-[#FFFDF7] space-y-2 text-xs flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>การ์ดที่ {idx + 1}</span>
                    <button
                      onClick={() => deleteFlashcard(card.id)}
                      className="text-red-400 hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="font-bold text-slate-900">หน้า: {card.front}</div>
                  <div className="text-amber-900 font-mono bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                    หลัง: {card.back}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Quizzes Management */}
      {activeTab === 'quizzes' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                ควิซ & ข้อสอบในคอร์ส: {activeCourse.name} ({courseQuizzes.length} ชุด)
              </h2>
              <p className="text-xs text-slate-500">ชุดโจทย์คำถามพร้อมเฉลยละเอียดและจับเวลา</p>
            </div>
          </div>

          <div className="space-y-3">
            {courseQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 rounded-xl border border-slate-200 bg-[#FFFDF7] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{quiz.title}</h3>
                  <span className="font-mono text-slate-500">
                    {quiz.questions.length} ข้อ ({quiz.timeLimitMinutes || 5} นาที)
                  </span>
                </div>
                <p className="text-slate-600">{quiz.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Materials Management (PDFs) */}
      {activeTab === 'materials' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                ไฟล์เรียน & ชีทสรุปในคอร์ส: {activeCourse.name} ({courseMaterials.length} ไฟล์)
              </h2>
              <p className="text-xs text-slate-500">อัปโหลด PDF ฝังลงในระบบให้อ่านได้ทันที</p>
            </div>
            <button
              onClick={() => setIsAddMatModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ อัปโหลดไฟล์ PDF ใหม่</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {courseMaterials.map((mat) => (
              <div key={mat.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-slate-500 text-[11px]">
                    หมวด: {mat.category} · ขนาด: {mat.fileSize} · อ่านแล้ว {mat.downloadCount} ครั้ง
                  </p>
                </div>
                <button
                  onClick={() => deleteMaterial(mat.id)}
                  className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Homework & Grading Suite */}
      {activeTab === 'homework' && (
        <HomeworkSuite />
      )}

      {/* MODAL: Add Course */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มคอร์สเรียนใหม่</h3>
              <button onClick={() => setIsAddCourseModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อคอร์ส *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ฟิสิกส์ ม.ปลาย ตะลุยโจทย์ A-Level"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">รหัสคอร์ส</label>
                  <input
                    type="text"
                    placeholder="เช่น PHYS-01"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ระดับชั้น</label>
                  <input
                    type="text"
                    value={courseGrade}
                    onChange={(e) => setCourseGrade(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>รหัสเข้าคอร์สสำหรับนักเรียน (Passcode) *</span>
                  <span className="text-[10px] text-emerald-700">ให้นักเรียนใช้สมัครหรือเข้าเรียน</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น CHEM68, MATH101"
                  value={coursePasscode}
                  onChange={(e) => setCoursePasscode(e.target.value)}
                  className="w-full border border-emerald-300 rounded-lg px-3 py-2 font-mono font-bold uppercase text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบาย</label>
                <textarea
                  rows={2}
                  placeholder="เนื้อหาหลักและเป้าหมายของคอร์ส..."
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddCourseModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกคอร์สใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Course */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">แก้ไขข้อมูลคอร์สเรียน</h3>
              <button onClick={() => setEditingCourse(null)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อคอร์ส *</label>
                <input
                  type="text"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">รหัสคอร์ส</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ระดับชั้น</label>
                  <input
                    type="text"
                    value={courseGrade}
                    onChange={(e) => setCourseGrade(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>รหัสเข้าคอร์สสำหรับนักเรียน (Passcode) *</span>
                  <span className="text-[10px] text-emerald-700">ให้นักเรียนใช้สมัครหรือเข้าเรียน</span>
                </label>
                <input
                  type="text"
                  placeholder="เช่น CHEM68, MATH101"
                  value={coursePasscode}
                  onChange={(e) => setCoursePasscode(e.target.value)}
                  className="w-full border border-emerald-300 rounded-lg px-3 py-2 font-mono font-bold uppercase text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายคอร์ส</label>
                <textarea
                  rows={2}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditingCourse(null)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Topic */}
      {isAddTopicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มบทเรียนหลัก (Topic)</h3>
              <button onClick={() => setIsAddTopicModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTopicSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อบทเรียน (ไทย) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น อัตราการเกิดปฏิกิริยาเคมี"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อภาษาอังกฤษ (ถ้ามี)</label>
                <input
                  type="text"
                  placeholder="Chemical Kinetics"
                  value={newTopicNameEn}
                  onChange={(e) => setNewTopicNameEn(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddTopicModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกบทเรียน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Subtopic */}
      {selectedTopicForSubtopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มหัวข้อย่อย (Subtopic)</h3>
              <button onClick={() => setSelectedTopicForSubtopic(null)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubtopicSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อหัวข้อย่อย *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ปัจจัยที่มีผลต่ออัตราการเกิดปฏิกิริยา"
                  value={newSubtopicName}
                  onChange={(e) => setNewSubtopicName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">รายละเอียดหัวข้อ</label>
                <textarea
                  rows={2}
                  placeholder="คำอธิบายสั้นๆ เกี่ยวกับเนื้อหาหัวข้อย่อยนี้..."
                  value={newSubtopicDesc}
                  onChange={(e) => setNewSubtopicDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setSelectedTopicForSubtopic(null)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกหัวข้อย่อย
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Video */}
      {isAddVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มวิดีโอ YouTube ในคอร์ส</h3>
              <button onClick={() => setIsAddVideoModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddVideoSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อคลิปวิดีโอ *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สรุปสูตรและข้อสอบเก่าสมดุลเคมี A-Level"
                  value={vidTitle}
                  onChange={(e) => setVidTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ลิงก์ YouTube URL หรือ Video ID *</label>
                <input
                  type="text"
                  required
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={vidUrl}
                  onChange={(e) => setVidUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ความยาว (นาที)</label>
                  <input
                    type="number"
                    value={vidDuration}
                    onChange={(e) => setVidDuration(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">บทเรียน</label>
                  <select
                    value={vidTopicId}
                    onChange={(e) => setVidTopicId(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  >
                    {activeCourse.topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายคลิป</label>
                <textarea
                  rows={2}
                  placeholder="รายละเอียดประเด็นสำคัญในคลิป..."
                  value={vidDesc}
                  onChange={(e) => setVidDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddVideoModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกวิดีโอ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Flashcard */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มแฟลชการ์ดช่วยจำ</h3>
              <button onClick={() => setIsAddCardModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCardSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำถาม / หัวข้อ (ด้านหน้าการ์ด) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น กฎของแก๊สในอุดมคติ และค่าคงที่ R"
                  value={cardFront}
                  onChange={(e) => setCardFront(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำตอบ / วิธีจำ (ด้านหลังการ์ด) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="เช่น PV = nRT โดย R = 0.0821 dm³·atm/(mol·K)"
                  value={cardBack}
                  onChange={(e) => setCardBack(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">คำใบ้ (Hint)</label>
                  <input
                    type="text"
                    placeholder="เช่น จำหน่วยอุณหภูมิเป็นเคลวิน"
                    value={cardHint}
                    onChange={(e) => setCardHint(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">สูตรคีย์เวิร์ด</label>
                  <input
                    type="text"
                    placeholder="PV = nRT"
                    value={cardFormula}
                    onChange={(e) => setCardFormula(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddCardModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกการ์ด
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Material with PDF Upload */}
      {isAddMatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">อัปโหลดไฟล์เรียน / PDF</h3>
              <button onClick={() => setIsAddMatModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMatSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ไฟล์ PDF (ฝังในระบบโดยตรง):</label>
                <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-xl p-4 text-center bg-amber-50/40 relative cursor-pointer">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-7 h-7 text-amber-600 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-slate-800">
                    {matFileName ? (
                      <span className="text-emerald-700 font-bold">✓ {matFileName}</span>
                    ) : (
                      'คลิกเพื่อเลือกไฟล์ PDF'
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อเอกสาร *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สรุปสูตรเคมี A-Level.pdf"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">หมวดหมู่</label>
                  <select
                    value={matCategory}
                    onChange={(e) => setMatCategory(e.target.value as CourseMaterial['category'])}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  >
                    <option value="ชีทสรุปสูตร">ชีทสรุปสูตร</option>
                    <option value="ใบงานแบบฝึกหัด">ใบงานแบบฝึกหัด</option>
                    <option value="ข้อสอบเก่า">ข้อสอบเก่า</option>
                    <option value="เฉลยละเอียด">เฉลยละเอียด</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ขนาดไฟล์</label>
                  <input
                    type="text"
                    value={matSize}
                    onChange={(e) => setMatSize(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายเอกสาร</label>
                <textarea
                  rows={2}
                  placeholder="คำอธิบายสรุปหรือปีข้อสอบ..."
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddMatModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  บันทึกไฟล์
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
