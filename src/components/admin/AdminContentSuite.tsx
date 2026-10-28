import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Course, Topic, Subtopic, VideoLesson, CourseMaterial } from '../../types';
import { HomeworkSuite } from '../homework/HomeworkSuite';
import {
  Settings,
  BookOpen,
  Play,
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
  FolderOpen,
  RotateCcw,
  ExternalLink,
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
    materials,
    addMaterial,
    deleteMaterial,
    resetToDefaultMathJuniorCourse,
  } = useApp();
  const { tx } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    'courses' | 'syllabus' | 'videos' | 'materials' | 'homework'
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
  const [subLevel, setSubLevel] = useState<1 | 2 | 3>(1);
  const [subParentId, setSubParentId] = useState<string>('');

  // Add Video Modal
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [vidTitle, setVidTitle] = useState('');
  const [vidUrl, setVidUrl] = useState('');
  const [vidDuration, setVidDuration] = useState('25');
  const [vidDesc, setVidDesc] = useState('');
  const [vidTopicId, setVidTopicId] = useState('');

  // Add Material Modal
  const [isAddMatModalOpen, setIsAddMatModalOpen] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matCategory, setMatCategory] = useState<CourseMaterial['category']>('ชีทสรุปสูตร');
  const [matSize, setMatSize] = useState('3.5 MB');
  const [matDriveUrl, setMatDriveUrl] = useState('');
  const [matDesc, setMatDesc] = useState('');
  const [matFileData, setMatFileData] = useState<string | undefined>(undefined);
  const [matFileName, setMatFileName] = useState('');

  // Current course items
  const courseVideos = videos.filter((v) => v.subjectId === activeCourseId);
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
      level: subLevel,
      parentId: subLevel > 1 ? subParentId || undefined : undefined,
    });
    setSelectedTopicForSubtopic(null);
    setNewSubtopicName('');
    setNewSubtopicDesc('');
    setSubLevel(1);
    setSubParentId('');
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
      title: matTitle.trim(),
      description: matDesc.trim() || 'เอกสารประกอบการเรียนและฝึกโจทย์',
      category: matCategory,
      fileType: 'pdf',
      fileSize: matDriveUrl.trim() ? 'Google Drive' : (matSize.trim() || '2.5 MB'),
      driveUrl: matDriveUrl.trim() || undefined,
      fileData: matFileData,
      isProtected: false,
    });

    setIsAddMatModalOpen(false);
    setMatTitle('');
    setMatDriveUrl('');
    setMatDesc('');
    setMatFileData(undefined);
    setMatFileName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <Settings className="w-3.5 h-3.5 text-blue-800" />
              <span>{tx('ศูนย์จัดการเนื้อหา', 'Content Management Studio')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {tx('จัดการคอร์ส สารบัญ และสื่อการเรียน', 'Manage Courses, Syllabus & Materials')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {tx(
                'ปรับปรุงคอร์ส สารบัญ วิดีโอ เอกสาร และการบ้านได้ทันที',
                'Update courses, syllabus topics, videos, PDF sheets, and homework in real time.'
              )}
            </p>
          </div>

          {/* Course Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
              {tx('คอร์สที่แก้ไข:', 'Active Course:')}
            </span>
            {courses.length === 0 ? (
              <span className="text-xs text-amber-800 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200 font-semibold">
                {tx('ยังไม่มีคอร์ส', 'No courses yet')}
              </span>
            ) : (
              <select
                value={activeCourseId}
                onChange={(e) => setActiveCourseId(e.target.value)}
                className="bg-[#FFFDF7] border border-amber-200 text-xs font-semibold rounded-xl px-3 py-2 text-slate-800 shadow-2xs focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Suite Category Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 border-t border-slate-100">
          {[
            { id: 'courses', label: tx('คอร์สเรียน', 'Courses'), icon: BookOpen },
            { id: 'syllabus', label: tx('สารบัญบทเรียน', 'Syllabus'), icon: BookOpen },
            { id: 'videos', label: tx('วิดีโอทบทวน', 'Videos'), icon: Play },
            { id: 'materials', label: tx('เอกสารประกอบ', 'Materials'), icon: Download },
            { id: 'homework', label: tx('การบ้าน', 'Homework'), icon: ClipboardList },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="admin-content-suite-tab"
                    className="absolute inset-0 bg-slate-950 rounded-xl shadow-xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className={`relative z-10 w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className="relative z-10">{tab.label}</span>
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
                {tx(`คอร์สเรียนทั้งหมด (${courses.length})`, `All Courses (${courses.length})`)}
              </h2>
              <p className="text-xs text-slate-500">
                {tx(
                  'สามารถเพิ่มคอร์สใหม่ กำหนดรหัสคอร์สและรหัสเข้าเรียนได้ตามต้องการ',
                  'Add new courses and configure course codes and access passcodes.'
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={async () => {
                  if (
                    window.confirm(
                      tx(
                        'คุณต้องการรีเซ็ตโครงสร้างวิชาเป็น "คณิตศาสตร์ พื้นฐาน ม.ต้น" (มาตรฐาน สสวท. 10 บทหลัก) หรือไม่?',
                        'Reset courses to the default Junior High Mathematics (10 IPST chapters)?'
                      )
                    )
                  ) {
                    await resetToDefaultMathJuniorCourse();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                <span>{tx('รีเซ็ตวิชาคณิต ม.ต้น', 'Reset Default Math')}</span>
              </button>
              <button
                onClick={() => {
                  setCourseName('');
                  setCourseCode('');
                  setCourseDesc('');
                  setCoursePasscode('');
                  setIsAddCourseModalOpen(true);
                }}
                className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>+ {tx('เพิ่มคอร์สใหม่', 'New Course')}</span>
              </button>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="bg-[#FFFDF7] border-2 border-dashed border-amber-300 rounded-3xl p-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-2xl font-bold shadow-2xs">
                📚
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800">{tx('ยังไม่มีคอร์สเรียนในระบบ', 'No courses yet')}</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  {tx(
                    'กดปุ่มโหลดวิชาคณิตศาสตร์พื้นฐาน ม.ต้น ตามมาตรฐาน สสวท. 10 บทได้ทันที หรือกดเพิ่มคอร์สใหม่',
                    'Load the default Junior High Mathematics syllabus or create a new custom course.'
                  )}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => resetToDefaultMathJuniorCourse()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-xl text-xs shadow-xs cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-slate-950" />
                  <span>{tx('โหลดวิชาคณิตศาสตร์ ม.ต้น', 'Load Default Math Course')}</span>
                </button>
                <button
                  onClick={() => {
                    setCourseName('');
                    setCourseCode('');
                    setCourseDesc('');
                    setCoursePasscode('');
                    setIsAddCourseModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs shadow-xs cursor-pointer transition-all"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>+ {tx('สร้างคอร์สใหม่', 'Create Course')}</span>
                </button>
              </div>
            </div>
          ) : (
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
                        {course.gradeLevel || tx('ม.ปลาย', 'High School')}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base">{course.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>

                    <div className="p-2 bg-emerald-50/80 border border-emerald-200/90 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                        <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{tx('รหัสเข้าคอร์ส:', 'Passcode:')}</span>
                      </div>
                      <span className="font-mono font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-300">
                        {course.passcode || course.code}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-mono pt-1">
                      • {tx(`จำนวนบทเรียน: ${course.topics.length} บท`, `${course.topics.length} chapters`)}
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
                      <span>{tx('แก้ไข', 'Edit')}</span>
                    </button>

                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{tx('ลบ', 'Delete')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Syllabus & Topics Management */}
      {activeTab === 'syllabus' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {tx(`สารบัญคอร์ส: ${activeCourse.name}`, `Syllabus: ${activeCourse.name}`)} ({activeCourse.topics.length})
              </h2>
              <p className="text-xs text-slate-500">
                {tx(
                  'เพิ่มบทเรียนหลักและหัวข้อย่อยสำหรับติดตามความก้าวหน้า',
                  'Add main chapters and subtopics to track student progression.'
                )}
              </p>
            </div>
            {courses.length > 0 && (
              <button
                onClick={() => setIsAddTopicModalOpen(true)}
                className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-amber-300" />
                <span>+ {tx('เพิ่มบทใหม่', 'New Chapter')}</span>
              </button>
            )}
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-amber-200 rounded-2xl bg-[#FFFDF7] space-y-2">
              <BookOpen className="w-10 h-10 text-amber-600/50 mx-auto" />
              <p className="text-sm font-bold text-slate-800">{tx('ยังไม่มีคอร์สเรียนในระบบ', 'No courses yet')}</p>
              <p className="text-xs text-slate-500">{tx('กรุณาสร้างคอร์สแรกก่อนเริ่มกำหนดสารบัญ', 'Create a course first before adding syllabus chapters.')}</p>
            </div>
          ) : activeCourse.topics.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-amber-200 rounded-2xl bg-[#FFFDF7] space-y-2">
              <BookOpen className="w-10 h-10 text-amber-600/50 mx-auto" />
              <p className="text-sm font-bold text-slate-800">{tx(`ยังไม่มีบทเรียนในวิชา ${activeCourse.name}`, `No chapters in ${activeCourse.name}`)}</p>
              <p className="text-xs text-slate-500">{tx('กดปุ่ม "+ เพิ่มบทใหม่" ด้านบนเพื่อเริ่มร่างบทเรียนแรก', 'Click "+ New Chapter" above to add the first chapter.')}</p>
            </div>
          ) : (
            <div className="space-y-4">
            {activeCourse.topics.map((topic, tIdx) => (
              <div
                key={topic.id}
                className="border border-slate-200 rounded-2xl p-4 bg-[#FFFDF7] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {tIdx + 1}. {topic.name}
                    </h3>
                    <span className="text-[11px] text-slate-500">
                      {tx(`หัวข้อย่อย ${topic.subtopics.length} เรื่อง`, `${topic.subtopics.length} subtopics`)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTopicForSubtopic(topic.id)}
                      className="flex items-center gap-1 text-xs text-blue-900 hover:text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>{tx('เพิ่มหัวข้อย่อย', 'Add Subtopic')}</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(tx(`ยืนยันการลบบทเรียน "${topic.name}" หรือไม่?`, `Delete chapter "${topic.name}"?`))) {
                          deleteTopic(activeCourseId, topic.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      title={tx('ลบบทเรียนนี้', 'Delete chapter')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subtopics list (Supports 3 Levels) */}
                <div className="pl-3 space-y-1.5 border-l-2 border-amber-300">
                  {topic.subtopics.map((sub, sIdx) => {
                    const isLv2 = sub.level === 2;
                    const isLv3 = sub.level === 3;
                    return (
                      <div
                        key={sub.id}
                        className={`p-2 bg-white rounded-lg border flex items-center justify-between text-xs shadow-2xs ${
                          isLv3
                            ? 'ml-6 border-purple-200 bg-purple-50/20'
                            : isLv2
                            ? 'ml-3 border-amber-200 bg-amber-50/20'
                            : 'border-slate-100'
                        }`}
                      >
                        <span className="font-medium text-slate-700 flex items-center gap-1.5">
                          {isLv3 ? (
                            <span className="text-purple-600 font-mono text-[10px]">↳↳</span>
                          ) : isLv2 ? (
                            <span className="text-amber-600 font-mono text-[10px]">↳</span>
                          ) : (
                            <span className="text-slate-400 font-mono text-[10px]">{tIdx + 1}.{sIdx + 1}</span>
                          )}
                          <span>{sub.name}</span>
                          <span
                            className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                              isLv3
                                ? 'bg-purple-100 text-purple-800'
                                : isLv2
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-50 text-blue-800'
                            }`}
                          >
                            {tx(`ขั้นที่ ${sub.level || 1}`, `Lv.${sub.level || 1}`)}
                          </span>
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (window.confirm(tx(`ยืนยันการลบหัวข้อย่อย "${sub.name}" หรือไม่?`, `Delete subtopic "${sub.name}"?`))) {
                                deleteSubtopic(activeCourseId, topic.id, sub.id);
                              }
                            }}
                            className="p-0.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                            title={tx('ลบหัวข้อย่อย', 'Delete subtopic')}
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Videos Management */}
      {activeTab === 'videos' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {tx(`วิดีโอในคอร์ส: ${activeCourse.name}`, `Videos: ${activeCourse.name}`)} ({courseVideos.length})
              </h2>
              <p className="text-xs text-slate-500">{tx('คลิปทบทวนและเนื้อหาการสอนที่ฝังในระบบ', 'Embedded YouTube review lessons')}</p>
            </div>
            <button
              onClick={() => setIsAddVideoModalOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ {tx('เพิ่มคลิปใหม่', 'Add Video')}</span>
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
                      YouTube ID: {vid.youtubeId} · {vid.durationMinutes} {tx('นาที', 'min')}
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

      {/* Tab 6: Materials Management (PDFs) */}
      {activeTab === 'materials' && (
        <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {tx(`เอกสารประกอบการเรียน: ${activeCourse.name}`, `Materials: ${activeCourse.name}`)} ({courseMaterials.length})
              </h2>
              <p className="text-xs text-slate-500">{tx('แนบลิงก์ Google Drive ชีทเรียนให้อ่านได้ทันที', 'Attach Google Drive study sheets for students')}</p>
            </div>
            <button
              onClick={() => setIsAddMatModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-amber-300" />
              <span>+ {tx('วางลิงก์ Google Drive', 'Add Drive Link')}</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {courseMaterials.map((mat) => (
              <div key={mat.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{mat.title}</h4>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                    <span>{mat.category}</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-medium">Google Drive</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {mat.driveUrl && (
                    <a
                      href={mat.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3 text-emerald-200" />
                      <span>เปิด Drive</span>
                    </a>
                  )}
                  <button
                    onClick={() => deleteMaterial(mat.id)}
                    className="p-1 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
              <h3 className="font-bold text-slate-900 text-base">{tx('เพิ่มคอร์สเรียนใหม่', 'Add New Course')}</h3>
              <button onClick={() => setIsAddCourseModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อคอร์ส *', 'Course Name *')}</label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น ฟิสิกส์ ม.ปลาย ตะลุยโจทย์ A-Level', 'e.g., A-Level Physics')}
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{tx('รหัสคอร์ส', 'Course Code')}</label>
                  <input
                    type="text"
                    placeholder="PHYS-01"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{tx('ระดับชั้น', 'Grade Level')}</label>
                  <select
                    value={courseGrade}
                    onChange={(e) => setCourseGrade(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white"
                  >
                    <option value="ม.ปลาย">{tx('ม.ปลาย (ม.4 - ม.6)', 'Senior High (M.4-6)')}</option>
                    <option value="ม.ต้น">{tx('ม.ต้น (ม.1 - ม.3)', 'Junior High (M.1-3)')}</option>
                    <option value="ม.1">{tx('มัธยมศึกษาปีที่ 1 (ม.1)', 'Grade 7 (M.1)')}</option>
                    <option value="ม.2">{tx('มัธยมศึกษาปีที่ 2 (ม.2)', 'Grade 8 (M.2)')}</option>
                    <option value="ม.3">{tx('มัธยมศึกษาปีที่ 3 (ม.3)', 'Grade 9 (M.3)')}</option>
                    <option value="ม.4">{tx('มัธยมศึกษาปีที่ 4 (ม.4)', 'Grade 10 (M.4)')}</option>
                    <option value="ม.5">{tx('มัธยมศึกษาปีที่ 5 (ม.5)', 'Grade 11 (M.5)')}</option>
                    <option value="ม.6">{tx('มัธยมศึกษาปีที่ 6 (ม.6)', 'Grade 12 (M.6)')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>{tx('รหัสเข้าคอร์ส *', 'Course Passcode *')}</span>
                  <span className="text-[10px] text-emerald-700">{tx('สำหรับนักเรียนใช้เข้าเรียน', 'Used by students to enroll')}</span>
                </label>
                <input
                  type="text"
                  placeholder="CHEM68, MATH101"
                  value={coursePasscode}
                  onChange={(e) => setCoursePasscode(e.target.value)}
                  className="w-full border border-emerald-300 rounded-lg px-3 py-2 font-mono font-bold uppercase text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('คำอธิบาย', 'Description')}</label>
                <textarea
                  rows={2}
                  placeholder={tx('เนื้อหาหลักและเป้าหมายของคอร์ส...', 'Course overview and goals...')}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddCourseModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  {tx('ยกเลิก', 'Cancel')}
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  {tx('บันทึกคอร์สใหม่', 'Create Course')}
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
              <h3 className="font-bold text-slate-900 text-base">{tx('แก้ไขข้อมูลคอร์สเรียน', 'Edit Course')}</h3>
              <button onClick={() => setEditingCourse(null)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อคอร์ส *', 'Course Name *')}</label>
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
                  <label className="block font-semibold text-slate-700 mb-1">{tx('รหัสคอร์ส', 'Course Code')}</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">{tx('ระดับชั้น', 'Grade Level')}</label>
                  <select
                    value={courseGrade}
                    onChange={(e) => setCourseGrade(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 bg-white"
                  >
                    <option value="ม.ปลาย">{tx('ม.ปลาย (ม.4 - ม.6)', 'Senior High (M.4-6)')}</option>
                    <option value="ม.ต้น">{tx('ม.ต้น (ม.1 - ม.3)', 'Junior High (M.1-3)')}</option>
                    <option value="ม.1">{tx('มัธยมศึกษาปีที่ 1 (ม.1)', 'Grade 7 (M.1)')}</option>
                    <option value="ม.2">{tx('มัธยมศึกษาปีที่ 2 (ม.2)', 'Grade 8 (M.2)')}</option>
                    <option value="ม.3">{tx('มัธยมศึกษาปีที่ 3 (ม.3)', 'Grade 9 (M.3)')}</option>
                    <option value="ม.4">{tx('มัธยมศึกษาปีที่ 4 (ม.4)', 'Grade 10 (M.4)')}</option>
                    <option value="ม.5">{tx('มัธยมศึกษาปีที่ 5 (ม.5)', 'Grade 11 (M.5)')}</option>
                    <option value="ม.6">{tx('มัธยมศึกษาปีที่ 6 (ม.6)', 'Grade 12 (M.6)')}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>{tx('รหัสเข้าคอร์ส *', 'Course Passcode *')}</span>
                  <span className="text-[10px] text-emerald-700">{tx('สำหรับนักเรียนใช้เข้าเรียน', 'Used by students to enroll')}</span>
                </label>
                <input
                  type="text"
                  placeholder="CHEM68, MATH101"
                  value={coursePasscode}
                  onChange={(e) => setCoursePasscode(e.target.value)}
                  className="w-full border border-emerald-300 rounded-lg px-3 py-2 font-mono font-bold uppercase text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('คำอธิบายคอร์ส', 'Description')}</label>
                <textarea
                  rows={2}
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditingCourse(null)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  {tx('ยกเลิก', 'Cancel')}
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  {tx('บันทึกการแก้ไข', 'Save Changes')}
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
              <h3 className="font-bold text-slate-900 text-base">{tx('เพิ่มบทเรียนหลัก', 'Add Main Chapter')}</h3>
              <button onClick={() => setIsAddTopicModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTopicSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อบทเรียน *', 'Chapter Name *')}</label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น อัตราการเกิดปฏิกิริยาเคมี', 'e.g., Chemical Kinetics')}
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อภาษาอังกฤษ', 'English Subtitle')}</label>
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
                  {tx('ยกเลิก', 'Cancel')}
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  {tx('บันทึกบทเรียน', 'Save Chapter')}
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
              <h3 className="font-bold text-slate-900 text-base">{tx('เพิ่มหัวข้อย่อย', 'Add Subtopic')}</h3>
              <button onClick={() => setSelectedTopicForSubtopic(null)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubtopicSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ระดับชั้นของหัวข้อ', 'Hierarchy Level')}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubLevel(1);
                      setSubParentId('');
                    }}
                    className={`py-1.5 px-2 rounded-lg border font-semibold text-center cursor-pointer ${
                      subLevel === 1 ? 'bg-blue-900 text-white border-blue-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {tx('ขั้นที่ 1', 'Level 1')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubLevel(2);
                      const currentTopic = activeCourse.topics.find((t) => t.id === selectedTopicForSubtopic);
                      const l1 = (currentTopic?.subtopics || []).filter((s) => !s.parentId || s.level === 1);
                      if (l1.length > 0 && !subParentId) setSubParentId(l1[0].id);
                    }}
                    className={`py-1.5 px-2 rounded-lg border font-semibold text-center cursor-pointer ${
                      subLevel === 2 ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {tx('ขั้นที่ 2', 'Level 2')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubLevel(3);
                      const currentTopic = activeCourse.topics.find((t) => t.id === selectedTopicForSubtopic);
                      const l2 = (currentTopic?.subtopics || []).filter((s) => s.level === 2 || (s.parentId && s.level !== 3));
                      if (l2.length > 0 && !subParentId) setSubParentId(l2[0].id);
                    }}
                    className={`py-1.5 px-2 rounded-lg border font-semibold text-center cursor-pointer ${
                      subLevel === 3 ? 'bg-purple-600 text-white border-purple-700' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {tx('ขั้นที่ 3', 'Level 3')}
                  </button>
                </div>
              </div>

              {subLevel > 1 && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {tx('เลือกหัวข้อหลัก', 'Parent Topic')}
                  </label>
                  <select
                    value={subParentId}
                    onChange={(e) => setSubParentId(e.target.value)}
                    className="w-full border border-amber-300 rounded-lg px-3 py-2 text-slate-800 bg-[#FFFDF7]"
                  >
                    <option value="">{tx('-- เลือกหัวข้อหลัก --', '-- Select Parent --')}</option>
                    {(activeCourse.topics.find((t) => t.id === selectedTopicForSubtopic)?.subtopics || [])
                      .filter((s) => (subLevel === 2 ? (!s.parentId || s.level === 1) : true))
                      .map((pSub) => (
                        <option key={pSub.id} value={pSub.id}>
                          {pSub.level === 2 ? '↳ ' : ''}{pSub.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อหัวข้อย่อย *', 'Subtopic Name *')}</label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น ปัจจัยที่มีผลต่ออัตราการเกิดปฏิกิริยา', 'e.g., Factors affecting reaction rate')}
                  value={newSubtopicName}
                  onChange={(e) => setNewSubtopicName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('รายละเอียดหัวข้อ', 'Description')}</label>
                <textarea
                  rows={2}
                  placeholder={tx('คำอธิบายสั้นๆ เกี่ยวกับเนื้อหาหัวข้อย่อยนี้...', 'Brief description...')}
                  value={newSubtopicDesc}
                  onChange={(e) => setNewSubtopicDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setSelectedTopicForSubtopic(null)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  {tx('ยกเลิก', 'Cancel')}
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer">
                  {tx('บันทึกหัวข้อย่อย', 'Save Subtopic')}
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

      {/* MODAL: Add Material with Drive Link */}
      {isAddMatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{tx('วางลิงก์เอกสาร Google Drive', 'Attach Google Drive Sheet')}</h3>
              </div>
              <button onClick={() => setIsAddMatModalOpen(false)} className="p-1 text-slate-400 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMatSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อเอกสาร / ชีทเรียน *', 'Title *')}</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ชีทสรุปเคมี A-Level"
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('หมวดหมู่', 'Category')}</label>
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
                <label className="block font-semibold text-slate-700 mb-1">
                  {tx('ลิงก์ Google Drive (URL) *', 'Google Drive Link *')}
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/... หรือ https://docs.google.com/..."
                  value={matDriveUrl}
                  onChange={(e) => setMatDriveUrl(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  💡 แปะลิงก์ Google Drive เพื่อให้นักเรียนเปิดดูได้ทันที และไม่เปลืองพื้นที่จัดเก็บฐานข้อมูล
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('คำอธิบายเอกสาร (เพิ่มเติม)', 'Description')}</label>
                <textarea
                  rows={2}
                  placeholder="คำอธิบายสรุปหรือสิ่งที่นักเรียนจะได้รับ..."
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddMatModalOpen(false)} className="px-4 py-2 text-slate-600 cursor-pointer">
                  {tx('ยกเลิก', 'Cancel')}
                </button>
                <button type="submit" className="px-5 py-2 font-semibold text-white bg-blue-900 rounded-lg shadow-xs cursor-pointer flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>{tx('บันทึกลิงก์ Google Drive', 'Save Drive Link')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
