import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { Subtopic, Topic, CourseMaterial } from '../../types';
import { PdfMaterialReaderModal } from '../learning/PdfMaterialReaderModal';
import {
  BookOpen,
  Plus,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FolderPlus,
  FileText,
  Download,
  UploadCloud,
  X,
  FileCheck,
  ShieldCheck,
  Sparkles,
  Edit2,
  Trash2,
  ExternalLink,
  Flame,
  Calendar,
  Users,
  RotateCw,
  Link as LinkIcon,
  CornerDownRight,
  Layers,
} from 'lucide-react';

export const SyllabusManager: React.FC = () => {
  const {
    subjects,
    activeSubjectId,
    setActiveSubjectId,
    activeSubject,
    addSubject,
    addTopic,
    updateTopic,
    deleteTopic,
    addSubtopic,
    updateSubtopic,
    deleteSubtopic,
    currentUserRole,
    currentUser,
    students,
    lessons,
    progressMap,
    updateStudentTopicStatus,
    adjustStudentTopicCount,
    materials,
    addMaterial,
    deleteMaterial,
    recordDownload,
  } = useApp();
  const { tx } = useLanguage();

  const [expandedTopicIds, setExpandedTopicIds] = useState<string[]>(
    activeSubject.topics.slice(0, 3).map((t) => t.id)
  );

  // Student progress view filter (default to currentUser if student, or 'all' for complete overview if admin)
  const [selectedStudentFilterId, setSelectedStudentFilterId] = useState<string>('all');
  const effectiveStudentId =
    currentUserRole === 'student'
      ? currentUser?.id || ''
      : selectedStudentFilterId;

  // Material reader modal
  const [selectedMaterialForReader, setSelectedMaterialForReader] = useState<CourseMaterial | null>(null);

  // Quick Edit Links (Google Drive & Handwritten Solution) modal state
  const [quickLinkSub, setQuickLinkSub] = useState<{
    topicId: string;
    sub: Subtopic;
    handwrittenSolutionUrl: string;
    googleDriveUrl: string;
  } | null>(null);

  // New Subject modal state
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjCode, setNewSubjCode] = useState('');
  const [newSubjDesc, setNewSubjDesc] = useState('');

  // New Topic modal states
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [newTopicName, setNewTopicName] = useState('');
  const [newTopicNameEn, setNewTopicNameEn] = useState('');

  // Edit Topic modal state
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editTopicName, setEditTopicName] = useState('');
  const [editTopicNameEn, setEditTopicNameEn] = useState('');

  // Subtopic modal state (Supports 3 Levels)
  const [activeTopicForSub, setActiveTopicForSub] = useState<string | null>(null);
  const [subModalLevel, setSubModalLevel] = useState<1 | 2 | 3>(1);
  const [subModalParentId, setSubModalParentId] = useState<string>('');
  const [newSubName, setNewSubName] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');
  const [newSubDifficulty, setNewSubDifficulty] = useState<Subtopic['difficulty']>('intermediate');
  const [newSubGoogleDriveUrl, setNewSubGoogleDriveUrl] = useState('');
  const [newSubHandwrittenSolutionUrl, setNewSubHandwrittenSolutionUrl] = useState('');
  const [quickAddName, setQuickAddName] = useState<Record<string, string>>({});

  // Edit Subtopic modal state
  const [editingSub, setEditingSub] = useState<{ topicId: string; sub: Subtopic } | null>(null);
  const [editSubName, setEditSubName] = useState('');
  const [editSubDesc, setEditSubDesc] = useState('');
  const [editSubDifficulty, setEditSubDifficulty] = useState<Subtopic['difficulty']>('intermediate');
  const [editSubLevel, setEditSubLevel] = useState<1 | 2 | 3>(1);
  const [editSubParentId, setEditSubParentId] = useState<string>('');
  const [editSubGoogleDriveUrl, setEditSubGoogleDriveUrl] = useState('');
  const [editSubHandwrittenSolutionUrl, setEditSubHandwrittenSolutionUrl] = useState('');

  // Attach Google Drive Material directly to Topic Modal state
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [attachingTopic, setAttachingTopic] = useState<Topic | null>(null);
  const [attachTitle, setAttachTitle] = useState('');
  const [attachDriveUrl, setAttachDriveUrl] = useState('');
  const [attachDesc, setAttachDesc] = useState('');
  const [attachCategory, setAttachCategory] = useState<CourseMaterial['category']>('ชีทสรุปสูตร');

  const toggleTopic = (id: string) => {
    setExpandedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjName.trim()) return;
    addSubject(newSubjName.trim(), newSubjCode.trim() || 'NEW-101', newSubjDesc.trim());
    setNewSubjName('');
    setNewSubjCode('');
    setNewSubjDesc('');
    setIsAddingSubject(false);
  };

  const handleAddTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopicName.trim()) return;
    addTopic(activeSubjectId, newTopicName.trim(), newTopicNameEn.trim() || undefined);
    setNewTopicName('');
    setNewTopicNameEn('');
    setIsAddingTopic(false);
  };

  const handleAddSubtopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTopicForSub || !newSubName.trim()) return;
    addSubtopic(activeSubjectId, activeTopicForSub, {
      name: newSubName.trim(),
      description: newSubDesc.trim() || undefined,
      difficulty: newSubDifficulty,
      level: subModalLevel,
      parentId: subModalLevel > 1 ? subModalParentId || undefined : undefined,
      googleDriveUrl: newSubGoogleDriveUrl.trim() || undefined,
      handwrittenSolutionUrl: newSubHandwrittenSolutionUrl.trim() || undefined,
    });
    setNewSubName('');
    setNewSubDesc('');
    setNewSubGoogleDriveUrl('');
    setNewSubHandwrittenSolutionUrl('');
    setSubModalParentId('');
    setSubModalLevel(1);
    setActiveTopicForSub(null);
  };

  const handleQuickAddSubtopic = (topicId: string, parentId?: string, level: 1 | 2 | 3 = 1) => {
    const name = quickAddName[topicId]?.trim();
    if (!name) return;
    addSubtopic(activeSubjectId, topicId, {
      name,
      difficulty: 'intermediate',
      level,
      parentId,
    });
    setQuickAddName((prev) => ({ ...prev, [topicId]: '' }));
  };

  const handleEditTopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTopic || !editTopicName.trim()) return;
    updateTopic(activeSubjectId, editingTopic.id, editTopicName.trim(), editTopicNameEn.trim() || undefined);
    setEditingTopic(null);
  };

  const handleDeleteTopic = (topic: Topic) => {
    if (window.confirm(`ยืนยันการลบบทเรียน "${topic.name}" หรือไม่? (หัวข้อย่อยทั้งหมดในบทนี้จะถูกลบด้วย)`)) {
      deleteTopic(activeSubjectId, topic.id);
    }
  };

  const handleEditSubtopicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSub || !editSubName.trim()) return;
    updateSubtopic(activeSubjectId, editingSub.topicId, editingSub.sub.id, {
      name: editSubName.trim(),
      description: editSubDesc.trim() || undefined,
      difficulty: editSubDifficulty,
      level: editSubLevel,
      parentId: editSubLevel > 1 ? editSubParentId || undefined : undefined,
      googleDriveUrl: editSubGoogleDriveUrl.trim() || undefined,
      handwrittenSolutionUrl: editSubHandwrittenSolutionUrl.trim() || undefined,
    });
    setEditingSub(null);
  };

  const handleSaveQuickLinks = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLinkSub) return;
    updateSubtopic(activeSubjectId, quickLinkSub.topicId, quickLinkSub.sub.id, {
      handwrittenSolutionUrl: quickLinkSub.handwrittenSolutionUrl.trim() || undefined,
      googleDriveUrl: quickLinkSub.googleDriveUrl.trim() || undefined,
    });
    if (effectiveStudentId && quickLinkSub.handwrittenSolutionUrl.trim()) {
      updateStudentTopicStatus(
        effectiveStudentId,
        quickLinkSub.sub.id,
        'completed',
        quickLinkSub.handwrittenSolutionUrl.trim()
      );
    }
    setQuickLinkSub(null);
  };

  const handleDeleteSubtopic = (topicId: string, sub: Subtopic) => {
    if (window.confirm(`ยืนยันการลบหัวข้อย่อย "${sub.name}" หรือไม่?`)) {
      deleteSubtopic(activeSubjectId, topicId, sub.id);
    }
  };

  const handleDeleteMaterial = (mat: CourseMaterial) => {
    if (window.confirm(`ยืนยันการลบไฟล์ "${mat.title}" หรือไม่?`)) {
      deleteMaterial(mat.id);
    }
  };

  const handleAttachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachingTopic || !attachTitle.trim() || !attachDriveUrl.trim()) return;

    addMaterial({
      courseId: activeSubjectId,
      topicId: attachingTopic.id,
      title: attachTitle.trim(),
      description: attachDesc.trim() || `เอกสารประกอบบทเรียน: ${attachingTopic.name}`,
      category: attachCategory,
      fileType: 'pdf',
      fileSize: 'Google Drive',
      driveUrl: attachDriveUrl.trim(),
      isProtected: false,
    });

    setIsAttachModalOpen(false);
    setAttachingTopic(null);
    setAttachTitle('');
    setAttachDriveUrl('');
    setAttachDesc('');
  };

  const handleOpenMaterialForTopic = (topic: Topic) => {
    let match = materials.find(
      (m) => m.courseId === activeSubjectId && m.topicId === topic.id
    );
    if (!match) {
      match = materials.find((m) => m.courseId === activeSubjectId);
    }
    if (!match) {
      match = {
        id: `mat_gen_${topic.id}`,
        courseId: activeSubjectId,
        topicId: topic.id,
        title: `MaxUp_Summary_${topic.name.replace(/\s+/g, '_')}.pdf`,
        description: `สรุปเนื้อหา สูตรคำนวณ และแบบฝึกหัดบทที่: ${topic.name} (${activeSubject.name})`,
        category: 'ชีทสรุปสูตร',
        fileType: 'pdf',
        fileSize: '3.5 MB',
        downloadCount: 38,
        updatedAt: new Date().toISOString().split('T')[0],
        isProtected: true,
        embeddedPages: [
          {
            pageNumber: 1,
            title: topic.name,
            subtitle: `${activeSubject.name} • ${topic.nameEn || 'Course Summary'}`,
            content: topic.subtopics.map(
              (s, idx) => `${idx + 1}. ${s.name} — ${s.description || 'จุดเน้นสำคัญและแนวโจทย์ข้อสอบ'}`
            ),
            keyFormulas: [
              'ฝึกคำนวณและทบทวนทฤษฎีควบคู่กัน',
              'ทบทวนข้อสอบเก่าและเช็คหลุมพรางอย่างสม่ำเสมอ',
            ],
            tips: [
              'หัวข้อนี้ออกสอบบ่อยในแนวข้อสอบแข่งขันและ A-Level / เพิ่มคะแนนสอบโรงเรียน',
            ],
          },
        ],
      };
    }
    setSelectedMaterialForReader(match);
  };

  const handleOpenMaterialForSubtopic = (topic: Topic, sub: Subtopic) => {
    let match = materials.find(
      (m) =>
        m.courseId === activeSubjectId &&
        (m.subtopicId === sub.id || m.topicId === topic.id)
    );
    if (!match) {
      match = {
        id: `mat_sub_${sub.id}`,
        courseId: activeSubjectId,
        topicId: topic.id,
        subtopicId: sub.id,
        title: `MaxUp_${sub.name.replace(/\s+/g, '_')}.pdf`,
        description: `เอกสารเจาะลึกหัวข้อย่อย: ${sub.name} ในบท ${topic.name}`,
        category: 'ใบงานแบบฝึกหัด',
        fileType: 'pdf',
        fileSize: '2.1 MB',
        downloadCount: 29,
        updatedAt: new Date().toISOString().split('T')[0],
        isProtected: true,
        embeddedPages: [
          {
            pageNumber: 1,
            title: sub.name,
            subtitle: `บท: ${topic.name} • ความยาก: ${sub.difficulty || 'ปานกลาง'}`,
            content: [
              sub.description || 'เนื้อหาและแนวคิดสำคัญของหัวข้อย่อยนี้',
              ...(sub.keyPoints || ['ทำความเข้าใจนิยามและสมการหลัก', 'ฝึกตะลุยโจทย์และวิเคราะห์ผลลัพธ์']),
            ],
            keyFormulas: ['จดจำสูตรและหน่วยวัดให้แม่นยำ', 'ตรวจสอบความสมเหตุสมผลของคำตอบทุกครั้ง'],
            tips: ['หากติดขัดตรงจุดใด ให้ปรึกษาติวเตอร์ในคาบเรียนถัดไป'],
          },
        ],
      };
    }
    setSelectedMaterialForReader(match);
  };

  interface FlattenedSubtopic {
    sub: Subtopic;
    level: 1 | 2 | 3 | 4;
    numbering: string;
    parentName?: string;
  }

  const getOrganizedSubtopics = (topic: Topic, topicIdx: number): FlattenedSubtopic[] => {
    const result: FlattenedSubtopic[] = [];
    const subs = topic.subtopics || [];
    const visited = new Set<string>();

    // 1. Level 1 items (level === 1 OR (!parentId && level !== 2 && level !== 3 && level !== 4))
    const level1Items = subs.filter((s) => !s.parentId || s.level === 1);

    level1Items.forEach((l1, i) => {
      visited.add(l1.id);
      const num1 = `${topicIdx + 1}.${i + 1}`;
      result.push({
        sub: l1,
        level: 1,
        numbering: num1,
      });

      // 2. Level 2 items under l1
      const level2Items = subs.filter((s) => s.parentId === l1.id || (s.level === 2 && s.parentId === l1.id));
      level2Items.forEach((l2, j) => {
        visited.add(l2.id);
        const num2 = `${num1}.${j + 1}`;
        result.push({
          sub: l2,
          level: 2,
          numbering: num2,
          parentName: l1.name,
        });

        // 3. Level 3 items under l2
        const level3Items = subs.filter((s) => s.parentId === l2.id || (s.level === 3 && s.parentId === l2.id));
        level3Items.forEach((l3, k) => {
          visited.add(l3.id);
          const num3 = `${num2}.${k + 1}`;
          result.push({
            sub: l3,
            level: 3,
            numbering: num3,
            parentName: l2.name,
          });

          // 4. Level 4 items under l3 (Deep Level / K-Tips / Competition insights)
          const level4Items = subs.filter((s) => s.parentId === l3.id || (s.level === 4 && s.parentId === l3.id));
          level4Items.forEach((l4, m) => {
            visited.add(l4.id);
            const num4 = `${num3}.${m + 1}`;
            result.push({
              sub: l4,
              level: 4,
              numbering: num4,
              parentName: l3.name,
            });
          });
        });
      });
    });

    // 5. Any leftover subtopics (orphans or unlinked)
    subs.forEach((s) => {
      if (!visited.has(s.id)) {
        result.push({
          sub: s,
          level: (s.level || 1) as 1 | 2 | 3 | 4,
          numbering: `${topicIdx + 1}.${result.length + 1}`,
        });
      }
    });

    return result;
  };

  const isEnrolled =
    currentUserRole === 'admin' ||
    (currentUser?.enrolledCourseIds || []).includes(activeSubjectId);

  if (!isEnrolled && currentUserRole === 'student') {
    return (
      <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto text-2xl shadow-xs">
          🔒
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          {tx('สารบัญวิชานี้ถูกจำกัดสิทธิ์', 'Subject Syllabus Restricted')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {tx(
            `น้องยังไม่ได้ลงทะเบียนในวิชา "${activeSubject.name}" จึงไม่สามารถเข้าดูสารบัญได้`,
            `You must be enrolled in "${activeSubject.name}" to view this syllabus.`
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Subject Selector */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{tx('สารบัญหลักสูตรและเอกสารประกอบ', 'Course Syllabus & Materials')}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeSubject.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              {activeSubject.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {currentUserRole === 'admin' && (
              <>
                <button
                  onClick={() => setIsAddingSubject(true)}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <FolderPlus className="w-4 h-4 text-amber-600" />
                  <span>{tx('เพิ่มวิชาใหม่', 'New Subject')}</span>
                </button>
                <button
                  onClick={() => setIsAddingTopic(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{tx('เพิ่มบทเรียน', 'New Chapter')}</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Multi-Subject Filter Tabs (Filtered for Students) */}
        {(() => {
          const visibleSubjects = currentUserRole === 'admin'
            ? subjects
            : subjects.filter((s) => (currentUser?.enrolledCourseIds || []).includes(s.id));

          if (visibleSubjects.length <= 1) return null;

          return (
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mr-1">
                {tx('เลือกวิชา:', 'Subject:')}
              </span>
              {visibleSubjects.map((subj) => (
                <button
                  key={subj.id}
                  onClick={() => {
                    setActiveSubjectId(subj.id);
                    setExpandedTopicIds(subj.topics.slice(0, 3).map((t) => t.id));
                  }}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                    activeSubjectId === subj.id
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {subj.name} ({subj.topics.length})
                </button>
              ))}
            </div>
          );
        })()}
      </div>

      {/* Student Learning Progress & Count Tracker Bar */}
      <div className="bg-gradient-to-r from-amber-50/90 via-white to-blue-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            <CheckCircle2 className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-slate-900 text-sm">
                {tx('ติดตามสถานะการเรียนและจำนวนครั้งที่เรียน', 'Learning Progress & Study Count')}
              </h4>
              <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full border border-amber-300">
                {tx('ซิงค์อัตโนมัติ', 'Auto-Synced')}
              </span>
            </div>
            <p className="text-slate-600 text-[11px] mt-0.5">
              {tx(
                'เมื่อบันทึกคาบเรียน สถานะจะอัปเดตเป็น "เรียนแล้ว" พร้อมนับจำนวนครั้งที่เรียนซ้ำให้อัตโนมัติ',
                'Status updates automatically when a lesson log is recorded.'
              )}
            </p>
          </div>
        </div>

        {/* Student Selector (If Admin) or Student Info (If Student) */}
        {currentUserRole === 'admin' ? (
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-white p-2 rounded-xl border border-amber-200 shadow-2xs">
            <span className="font-semibold text-slate-700 whitespace-nowrap flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-900" />
              <span>{tx('นักเรียน:', 'Student:')}</span>
            </span>
            {students.length === 0 ? (
              <span className="text-slate-400 italic">{tx('ยังไม่มีนักเรียน', 'No students')}</span>
            ) : (
              <select
                value={effectiveStudentId}
                onChange={(e) => setSelectedStudentFilterId(e.target.value)}
                className="bg-amber-50/70 border border-amber-300 font-bold text-slate-900 rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">{tx('🌐 ภาพรวมทุกคน', '🌐 All Students')}</option>
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.nickname} {st.fullName ? `— ${st.fullName}` : ''}
                  </option>
                ))}
              </select>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl self-start md:self-auto shrink-0">
            <span>{tx('ผู้เรียน:', 'Student:')} {currentUser?.nickname || tx('นักเรียน', 'Student')}</span>
          </div>
        )}
      </div>

      {/* Add New Subject Modal */}
      {isAddingSubject && (
        <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-5 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">{tx('สร้างหลักสูตร / วิชาใหม่', 'Create New Subject')}</h3>
          <form onSubmit={handleAddSubjectSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อวิชา *', 'Subject Name *')}</label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น ฟิสิกส์ ม.ปลาย, ภาษาอังกฤษ ม.ต้น', 'e.g., High School Physics')}
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('รหัสวิชา', 'Subject Code')}</label>
                <input
                  type="text"
                  placeholder="PH-301, EN-201"
                  value={newSubjCode}
                  onChange={(e) => setNewSubjCode(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">{tx('รายละเอียดหลักสูตร', 'Description')}</label>
              <input
                type="text"
                placeholder={tx('คำอธิบายสรุปขอบเขตเนื้อหา', 'Course overview')}
                value={newSubjDesc}
                onChange={(e) => setNewSubjDesc(e.target.value)}
                className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-slate-800"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingSubject(false)}
                className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
              >
                {tx('ยกเลิก', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                {tx('สร้างวิชาใหม่', 'Create Subject')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Topic Modal */}
      {isAddingTopic && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">{tx(`เพิ่มบทเรียนในวิชา ${activeSubject.name}`, `Add Chapter to ${activeSubject.name}`)}</h3>
          <form onSubmit={handleAddTopicSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อบทเรียน *', 'Chapter Name *')}</label>
                <input
                  type="text"
                  required
                  placeholder={tx('เช่น เคมีอินทรีย์, ไฟฟ้าสถิต, ตรีโกณมิติ', 'e.g., Organic Chemistry')}
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{tx('ชื่อภาษาอังกฤษ', 'English Subtitle')}</label>
                <input
                  type="text"
                  placeholder="Organic Chemistry"
                  value={newTopicNameEn}
                  onChange={(e) => setNewTopicNameEn(e.target.value)}
                  className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingTopic(false)}
                className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
              >
                {tx('ยกเลิก', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                {tx('บันทึกบทใหม่', 'Save Chapter')}
              </button>
            </div>
          </form>
        </div>
      )}



      {/* Syllabus Tree List */}
      <div className="space-y-4">
        {activeSubject.topics.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 mt-2">ยังไม่มีบทเรียนในวิชานี้</p>
            <p className="text-xs text-slate-500 mt-1">กดปุ่ม "เพิ่มบทใหญ่" ด้านบนเพื่อเริ่มกำหนดสารบัญ</p>
          </div>
        ) : (
          activeSubject.topics.map((topic, index) => {
            const isExpanded = expandedTopicIds.includes(topic.id);

            // Direct linked PDF materials for this topic
            const topicMaterials = materials.filter(
              (m) =>
                m.courseId === activeSubjectId &&
                (m.topicId === topic.id || (!m.topicId && index === 0))
            );

            return (
              <div
                key={topic.id}
                className="bg-white border border-amber-900/10 rounded-2xl overflow-hidden shadow-2xs transition-all hover:border-amber-300"
              >
                {/* Topic Header Row */}
                <div
                  onClick={() => toggleTopic(topic.id)}
                  className="px-5 py-4 flex items-center justify-between cursor-pointer select-none hover:bg-amber-50/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-slate-900">
                          {topic.name}
                        </h3>
                        {topic.nameEn && (
                          <span className="text-xs text-slate-500 hidden sm:inline">
                            ({topic.nameEn})
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>{topic.subtopics.length} หัวข้อย่อย</span>
                        {topicMaterials.length > 0 && (
                          <>
                            <span>·</span>
                            <span className="text-blue-900 font-semibold flex items-center gap-1">
                              <FileText className="w-3 h-3 text-red-500" />
                              <span>เอกสาร {topicMaterials.length} ไฟล์</span>
                            </span>
                          </>
                        )}
                        {currentUserRole === 'admin' && topicMaterials.length === 0 && (
                          <>
                            <span>·</span>
                            <span className="text-slate-400 font-normal flex items-center gap-1">
                              <FileText className="w-3 h-3 text-slate-300" />
                              <span>ยังไม่มีชีทแนบ</span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {currentUserRole === 'admin' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isExpanded) toggleTopic(topic.id);
                          setActiveTopicForSub(topic.id);
                          setSubModalLevel(1);
                          setSubModalParentId('');
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 shadow-2xs"
                        title="เพิ่มหัวข้อย่อยในบทนี้"
                      >
                        <Plus className="w-3.5 h-3.5 text-blue-700" />
                        <span>เพิ่มหัวข้อย่อย</span>
                      </button>
                    )}

                    {currentUserRole === 'admin' && (
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => {
                            setEditingTopic(topic);
                            setEditTopicName(topic.name);
                            setEditTopicNameEn(topic.nameEn || '');
                          }}
                          className="p-1.5 text-slate-500 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="แก้ไขชื่อบทเรียน"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTopic(topic)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="ลบบทเรียนนี้"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div className="text-slate-400 p-1">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Section: Linked PDF Materials + Subtopics */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-4 bg-[#FFFDF7]/50">
                      {/* 1. LINKED PDF MATERIALS SECTION (แสดงเมื่อมีเอกสาร หรือสำหรับครู) */}
                      {(currentUserRole === 'admin' || topicMaterials.length > 0) && (
                        <div className="p-4 bg-gradient-to-r from-blue-50/80 via-white to-amber-50/50 border border-blue-200/90 rounded-2xl space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                <h4 className="font-bold text-xs sm:text-sm text-blue-950">
                                  เอกสาร & ชีทประจำบทที่ {index + 1}: {topic.name}
                                </h4>
                                <p className="text-[11px] text-slate-500">
                                  {currentUserRole === 'admin'
                                    ? 'ไฟล์เอกสารที่คุณครูอัปโหลดผูกไว้กับบทนี้'
                                    : 'เอกสารประกอบการเรียนประจำบท'}
                                </p>
                              </div>
                            </div>

                            {currentUserRole === 'admin' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setAttachingTopic(topic);
                                  setAttachTitle(`ชีทสรุป_${topic.name.replace(/\s+/g, '_')}`);
                                  setAttachDriveUrl('');
                                  setIsAttachModalOpen(true);
                                }}
                                className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                              >
                                <Plus className="w-3.5 h-3.5 text-amber-500" />
                                <span>+ แปะลิงก์ชีท Google Drive</span>
                              </button>
                            )}
                          </div>

                          {topicMaterials.length === 0 ? (
                            currentUserRole === 'admin' ? (
                              <div className="p-3 bg-white/90 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500 text-center">
                                ยังไม่มีลิงก์เอกสาร Google Drive ที่ผูกไว้กับบทนี้ (กด "+ แปะลิงก์ชีท Google Drive" ด้านบน หรือแนบลิงก์ในแต่ละหัวข้อย่อยได้)
                              </div>
                            ) : null
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                              {topicMaterials.map((mat) => (
                                <div
                                  key={mat.id}
                                  className="p-3 bg-white border border-blue-100 hover:border-blue-300 rounded-xl flex items-center justify-between gap-3 shadow-2xs transition-all"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 bg-emerald-50 text-emerald-700 font-bold text-[11px] rounded-lg flex items-center justify-center shrink-0 border border-emerald-200/60">
                                      <FolderOpen className="w-4 h-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <div className="font-bold text-slate-900 text-xs truncate" title={mat.title}>
                                        {mat.title}
                                      </div>
                                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                                        <span className="text-blue-900 bg-blue-50 px-1.5 py-0.2 rounded font-medium">
                                          {mat.category}
                                        </span>
                                        <span>•</span>
                                        <span className="text-emerald-700 font-medium">Google Drive</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {mat.driveUrl && (
                                      <a
                                        href={mat.driveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => recordDownload(mat.id)}
                                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                                      >
                                        <ExternalLink className="w-3 h-3 text-emerald-200" />
                                        <span>เปิดชีท Drive</span>
                                      </a>
                                    )}
                                    {mat.fileData && !mat.driveUrl && (
                                      <a
                                        href={mat.fileData}
                                        download={mat.title}
                                        onClick={() => recordDownload(mat.id)}
                                        className="px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                                      >
                                        <Download className="w-3 h-3 text-amber-300" />
                                        <span>ดาวน์โหลด</span>
                                      </a>
                                    )}
                                    {currentUserRole === 'admin' && (
                                      <button
                                        onClick={() => handleDeleteMaterial(mat)}
                                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="ลบเอกสารนี้ออกจากบทเรียน"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                    {/* 2. SUBTOPICS LIST */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">หัวข้อย่อยประจำบทเรียน:</span>
                          <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                            {topic.subtopics.length} ข้อย่อย
                          </span>
                        </div>
                        {currentUserRole === 'admin' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTopicForSub(topic.id);
                              setSubModalLevel(1);
                              setSubModalParentId('');
                              setNewSubName('');
                            }}
                            className="text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-lg transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ เพิ่มหัวข้อย่อย</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        {topic.subtopics.length === 0 ? (
                          <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-500">
                            ยังไม่มีหัวข้อย่อยในบทนี้ คุณครูกดปุ่ม "+ เพิ่มหัวข้อย่อย" หรือพิมพ์เพิ่มด่วนด้านล่างได้เลย
                          </div>
                        ) : (
                          getOrganizedSubtopics(topic, index).map(({ sub, level, numbering }) => {
                            const isAll = effectiveStudentId === 'all';
                            const studentLessonsWithSub = isAll
                              ? lessons.filter((l) => (l.subtopicIds || []).includes(sub.id))
                              : effectiveStudentId
                              ? lessons.filter(
                                  (l) =>
                                    l.studentId === effectiveStudentId &&
                                    (l.subtopicIds || []).includes(sub.id)
                                )
                              : [];

                            let totalStudyCount = 0;
                            let isCompleted = false;
                            let latestDate = '';
                            let handwrittenUrl: string | undefined = sub.handwrittenSolutionUrl;
                            const driveUrl = sub.googleDriveUrl;

                            if (isAll) {
                              const lessonCount = studentLessonsWithSub.length;
                              totalStudyCount = lessonCount;
                              isCompleted = totalStudyCount > 0;
                              const firstLessonDate = studentLessonsWithSub[0]?.lessonDate;
                              if (firstLessonDate) {
                                latestDate = firstLessonDate;
                              }
                              handwrittenUrl =
                                sub.handwrittenSolutionUrl ||
                                studentLessonsWithSub.find((l) => l.handwrittenSolutionUrl)?.handwrittenSolutionUrl;
                            } else {
                              const progress = effectiveStudentId
                                ? (progressMap[effectiveStudentId] || []).find(
                                    (p) => p.subtopicId === sub.id
                                  )
                                : undefined;
                              const lessonCount = studentLessonsWithSub.length;
                              // ยึดตามคาบเรียนจริงในระบบ (Single Source of Truth) หากมีคาบเรียนให้นับตามจำนวนคาบจริงทันที
                              totalStudyCount = lessonCount > 0 ? lessonCount : (progress?.studyCount || 0);
                              isCompleted = totalStudyCount > 0;
                              latestDate = studentLessonsWithSub[0]?.lessonDate || (totalStudyCount > 0 ? progress?.lastStudiedDate : '') || '';
                              handwrittenUrl =
                                sub.handwrittenSolutionUrl ||
                                studentLessonsWithSub.find((l) => l.handwrittenSolutionUrl)?.handwrittenSolutionUrl ||
                                (totalStudyCount > 0 ? progress?.handwrittenSolutionUrl : undefined);
                            }

                            return (
                              <div
                                key={sub.id}
                                className={`p-3 rounded-xl transition-all flex flex-col lg:flex-row lg:items-start justify-between gap-3 text-xs shadow-2xs ${
                                  level === 1
                                    ? 'bg-white border border-slate-200 hover:border-blue-300'
                                    : level === 2
                                    ? 'bg-amber-50/25 border border-amber-200/90 ml-3 sm:ml-6 hover:border-amber-400'
                                    : level === 3
                                    ? 'bg-purple-50/20 border border-purple-200/80 ml-6 sm:ml-12 hover:border-purple-400'
                                    : 'bg-indigo-50/30 border border-indigo-200/90 ml-8 sm:ml-16 hover:border-indigo-400'
                                }`}
                              >
                                <div className="space-y-1.5 flex-1 min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    {/* Hierarchy Branch Icon */}
                                    {level === 2 && (
                                      <CornerDownRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                    )}
                                    {level === 3 && (
                                      <div className="flex items-center text-purple-400 shrink-0">
                                        <CornerDownRight className="w-3 h-3" />
                                        <CornerDownRight className="w-3 h-3 -ml-1.5 text-purple-600" />
                                      </div>
                                    )}
                                    {level === 4 && (
                                      <div className="flex items-center text-indigo-500 shrink-0">
                                        <CornerDownRight className="w-3 h-3" />
                                        <CornerDownRight className="w-3 h-3 -ml-1.5 text-indigo-600" />
                                        <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 px-1 py-0.2 rounded ml-1">L4</span>
                                      </div>
                                    )}

                                    {/* Numbering & Name */}
                                    <span className="font-bold text-slate-900 text-sm">
                                      {numbering} {sub.name}
                                    </span>

                                    {sub.difficulty && (
                                      <span
                                        className={`text-[11px] px-1.5 py-0.2 rounded font-medium ${
                                          sub.difficulty === 'basic'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : sub.difficulty === 'intermediate'
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                                        }`}
                                      >
                                        {sub.difficulty === 'basic'
                                          ? 'พื้นฐาน'
                                          : sub.difficulty === 'intermediate'
                                          ? 'ปานกลาง'
                                          : 'ประยุกต์เข้มข้น'}
                                      </span>
                                    )}

                                    {/* Status and Study Count Badges */}
                                    {isCompleted ? (
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded-md shadow-2xs">
                                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                          <span>เรียนแล้ว</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-950 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs">
                                          <Flame className="w-3 h-3 text-amber-600" />
                                          <span>เรียน {totalStudyCount} ครั้ง {totalStudyCount > 1 ? '(เรียนซ้ำ)' : ''}</span>
                                        </span>
                                        {latestDate && (
                                          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                                            (ล่าสุด {latestDate})
                                          </span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                                        <span>ยังไม่ได้เรียน</span>
                                      </span>
                                    )}

                                    {/* Teacher Quick Increment/Decrement Buttons */}
                                    {currentUserRole === 'admin' && (
                                      <div className="inline-flex items-center gap-1.5 ml-1">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const targetId = effectiveStudentId === 'all' ? (students[0]?.id || '') : effectiveStudentId;
                                            if (targetId) adjustStudentTopicCount(targetId, sub.id, 1);
                                          }}
                                          className="h-7 px-2.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg hover:border-amber-400 cursor-pointer transition-colors shadow-2xs inline-flex items-center gap-1"
                                          title="เพิ่มจำนวนครั้งที่เรียนซ้ำ +1 รอบ"
                                        >
                                          +1 รอบ
                                        </button>
                                        {totalStudyCount > 0 && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const targetId = effectiveStudentId === 'all' ? (students[0]?.id || '') : effectiveStudentId;
                                              if (targetId) adjustStudentTopicCount(targetId, sub.id, -1);
                                            }}
                                            className="h-7 px-2 text-xs font-semibold text-slate-500 hover:text-red-700 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-lg cursor-pointer transition-colors inline-flex items-center"
                                            title="ลดจำนวนครั้งที่เรียน -1 รอบ"
                                          >
                                            -1
                                          </button>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {sub.description && (
                                    <p className="text-slate-600 leading-relaxed text-xs">{sub.description}</p>
                                  )}

                                  {sub.keyPoints && sub.keyPoints.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-slate-500">
                                      <span className="text-slate-400 font-medium">จุดเน้น:</span>
                                      {sub.keyPoints.map((kp, kIdx) => (
                                        <span key={kIdx} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                          {kp}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons: Child Adders, Solutions, Drive, Edit, Delete */}
                                <div className="flex items-center gap-1.5 flex-wrap self-end lg:self-center shrink-0">
                                  {/* Add Child Buttons based on Level */}
                                  {currentUserRole === 'admin' && level === 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveTopicForSub(topic.id);
                                        setSubModalLevel(2);
                                        setSubModalParentId(sub.id);
                                        setNewSubName('');
                                      }}
                                      className="flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                                      title="เพิ่มข้อย่อยขั้นที่ 2 ภายใต้หัวข้อนี้"
                                    >
                                      <CornerDownRight className="w-3 h-3 text-amber-600" />
                                      <span>+ ขั้น 2</span>
                                    </button>
                                  )}

                                  {currentUserRole === 'admin' && level === 2 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveTopicForSub(topic.id);
                                        setSubModalLevel(3);
                                        setSubModalParentId(sub.id);
                                        setNewSubName('');
                                      }}
                                      className="flex items-center gap-1 text-[11px] font-semibold text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-300 px-2 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                                      title="เพิ่มประเด็นย่อยขั้นที่ 3 ภายใต้ข้อย่อยนี้"
                                    >
                                      <CornerDownRight className="w-3 h-3 text-purple-600" />
                                      <span>+ ขั้น 3</span>
                                    </button>
                                  )}

                                  {/* ✍️ Handwritten Solution Button */}
                                  {handwrittenUrl ? (
                                    <a
                                      href={handwrittenUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                                      title="เปิดไฟล์/ลิงก์เฉลยจากการเขียนลายมือครู Max"
                                    >
                                      <span>✍️ เฉลยลายมือ</span>
                                      <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
                                    </a>
                                  ) : currentUserRole === 'admin' ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setQuickLinkSub({
                                          topicId: topic.id,
                                          sub,
                                          handwrittenSolutionUrl: '',
                                          googleDriveUrl: sub.googleDriveUrl || '',
                                        })
                                      }
                                      className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50/70 hover:bg-amber-100 border border-dashed border-amber-300 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                                      title="แปะลิงก์เฉลยลายมือสำหรับหัวข้อนี้"
                                    >
                                      <span>+ ✍️ แปะเฉลย</span>
                                    </button>
                                  ) : null}

                                  {/* 📂 Google Drive Sheet Button */}
                                  {driveUrl ? (
                                    <a
                                      href={driveUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                                      title="เปิดไฟล์ชีทเรียน Google Drive"
                                    >
                                      <span>📂 ชีท Drive</span>
                                      <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                                    </a>
                                  ) : currentUserRole === 'admin' ? (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setQuickLinkSub({
                                          topicId: topic.id,
                                          sub,
                                          handwrittenSolutionUrl: sub.handwrittenSolutionUrl || '',
                                          googleDriveUrl: '',
                                        })
                                      }
                                      className="flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 border border-dashed border-emerald-300 px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs"
                                      title="แปะลิงก์ Google Drive ชีทเรียน"
                                    >
                                      <span>+ 📂 แปะ Drive</span>
                                    </button>
                                  ) : null}

                                  {currentUserRole === 'admin' && (
                                    <div className="flex items-center gap-1 border-l border-slate-200 pl-1.5">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setEditingSub({ topicId: topic.id, sub });
                                          setEditSubName(sub.name);
                                          setEditSubDesc(sub.description || '');
                                          setEditSubDifficulty(sub.difficulty || 'intermediate');
                                          setEditSubLevel(level || sub.level || 1);
                                          setEditSubParentId(sub.parentId || '');
                                          setEditSubGoogleDriveUrl(sub.googleDriveUrl || '');
                                          setEditSubHandwrittenSolutionUrl(sub.handwrittenSolutionUrl || '');
                                        }}
                                        className="p-1.5 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                        title="แก้ไขหัวข้อย่อยและระดับขั้น"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteSubtopic(topic.id, sub)}
                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                        title="ลบหัวข้อย่อยนี้"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Quick Add Subtopic Bar at bottom of each topic */}
                      {currentUserRole === 'admin' && (
                        <div className="pt-2 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder={`+ พิมพ์ชื่อหัวข้อย่อยในบทที่ ${index + 1} แล้วกด Enter...`}
                            value={quickAddName[topic.id] || ''}
                            onChange={(e) => setQuickAddName((prev) => ({ ...prev, [topic.id]: e.target.value }))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleQuickAddSubtopic(topic.id);
                              }
                            }}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuickAddSubtopic(topic.id)}
                            className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap shadow-2xs"
                          >
                            + เพิ่มด่วน
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTopicForSub(topic.id);
                              setSubModalLevel(1);
                              setSubModalParentId('');
                            }}
                            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap shadow-2xs flex items-center gap-1"
                            title="เปิดฟอร์มตั้งค่า 3 ระดับขั้นแบบละเอียด"
                          >
                            <Layers className="w-3.5 h-3.5 text-amber-600" />
                            <span>ตั้งค่า 3 ขั้น</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Attach Google Drive Material Directly Modal */}
      {isAttachModalOpen && attachingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <FolderOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">แปะลิงก์ชีท Google Drive ให้บทเรียนนี้</h3>
                  <p className="text-xs text-slate-500">
                    ผูกลิงก์เอกสารเข้ากับ: <span className="font-semibold text-slate-700">{attachingTopic.name}</span> ({activeSubject.name})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAttachModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAttachSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อเอกสาร / ชีทเรียน *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ชีทสรุปสูตรเคมี ม.4 เทอม 1"
                  value={attachTitle}
                  onChange={(e) => setAttachTitle(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">หมวดหมู่เอกสาร</label>
                <select
                  value={attachCategory}
                  onChange={(e) => setAttachCategory(e.target.value as CourseMaterial['category'])}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-400"
                >
                  <option value="ชีทสรุปสูตร">ชีทสรุปสูตร</option>
                  <option value="ใบงานแบบฝึกหัด">ใบงานแบบฝึกหัด</option>
                  <option value="ข้อสอบเก่า">ข้อสอบเก่า</option>
                  <option value="เฉลยละเอียด">เฉลยละเอียด</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ลิงก์ Google Drive (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/... หรือ https://docs.google.com/..."
                  value={attachDriveUrl}
                  onChange={(e) => setAttachDriveUrl(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:border-emerald-500"
                />
                <div className="mt-2 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-amber-900 text-[11px] flex items-start gap-2">
                  <span className="text-sm shrink-0">💡</span>
                  <div>
                    <span className="font-bold">คำแนะนำ:</span> วางลิงก์ไฟล์หรือโฟลเดอร์ Google Drive ของชีทเรียน (ตั้งค่าสิทธิ์แชร์เป็น "ทุกคนที่มีลิงก์มีสิทธิ์ดู") เพื่อให้นักเรียนกดเปิดดูได้ทันที และไม่เปลืองพื้นที่จัดเก็บฐานข้อมูล
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายเอกสาร (เพิ่มเติม)</label>
                <textarea
                  rows={2}
                  placeholder="ระบุจุดเน้น หรือสิ่งที่นักเรียนจะได้รับจากชีทชุดนี้"
                  value={attachDesc}
                  onChange={(e) => setAttachDesc(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAttachModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>บันทึกลิงก์ Google Drive</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Topic Modal */}
      {editingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base">แก้ไขชื่อบทเรียน (Topic)</h3>
              </div>
              <button
                onClick={() => setEditingTopic(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditTopicSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อบทเรียน (ภาษาไทย) *
                </label>
                <input
                  type="text"
                  required
                  value={editTopicName}
                  onChange={(e) => setEditTopicName(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อภาษาอังกฤษ (Optional)
                </label>
                <input
                  type="text"
                  value={editTopicNameEn}
                  onChange={(e) => setEditTopicNameEn(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTopic(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Subtopic Modal (Supports 3-Levels) */}
      {editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base">แก้ไขหัวข้อย่อย (3 ระดับขั้น)</h3>
              </div>
              <button
                onClick={() => setEditingSub(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubtopicSubmit} className="space-y-4 text-xs">
              {/* Level Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ระดับขั้นของหัวข้อ (Hierarchy Level)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditSubLevel(1);
                      setEditSubParentId('');
                    }}
                    className={`py-1.5 px-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      editSubLevel === 1
                        ? 'bg-blue-900 text-white border-blue-900 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ขั้นที่ 1 (หลัก)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditSubLevel(2);
                      const currentTopic = activeSubject.topics.find((t) => t.id === editingSub.topicId);
                      const l1Items = (currentTopic?.subtopics || []).filter(
                        (s) => s.id !== editingSub.sub.id && (!s.parentId || s.level === 1)
                      );
                      if (l1Items.length > 0 && !editSubParentId) {
                        setEditSubParentId(l1Items[0].id);
                      }
                    }}
                    className={`py-1.5 px-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      editSubLevel === 2
                        ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ขั้นที่ 2 (ย่อย)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditSubLevel(3);
                      const currentTopic = activeSubject.topics.find((t) => t.id === editingSub.topicId);
                      const otherItems = (currentTopic?.subtopics || []).filter(
                        (s) => s.id !== editingSub.sub.id
                      );
                      if (otherItems.length > 0 && !editSubParentId) {
                        setEditSubParentId(otherItems[0].id);
                      }
                    }}
                    className={`py-1.5 px-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      editSubLevel === 3
                        ? 'bg-purple-600 text-white border-purple-700 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    ขั้นที่ 3 (ย่อยลึก)
                  </button>
                </div>
              </div>

              {/* Parent selector if Level 2 or 3 */}
              {editSubLevel > 1 && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {editSubLevel === 2 ? 'เลือกหัวข้อแม่ (ขั้นที่ 1)' : 'เลือกหัวข้อแม่ (ขั้นที่ 2 หรือ 1)'}
                  </label>
                  <select
                    value={editSubParentId}
                    onChange={(e) => setEditSubParentId(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-amber-300 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="">-- เลือกหัวข้อแม่ --</option>
                    {(activeSubject.topics.find((t) => t.id === editingSub.topicId)?.subtopics || [])
                      .filter((s) => s.id !== editingSub.sub.id)
                      .map((pSub) => (
                        <option key={pSub.id} value={pSub.id}>
                          {pSub.level === 2 ? '↳ ' : ''}{pSub.name} ({pSub.level ? `ขั้นที่ ${pSub.level}` : 'ขั้นที่ 1'})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อหัวข้อย่อย *
                </label>
                <input
                  type="text"
                  required
                  value={editSubName}
                  onChange={(e) => setEditSubName(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ระดับความยาก
                </label>
                <select
                  value={editSubDifficulty}
                  onChange={(e) => setEditSubDifficulty(e.target.value as Subtopic['difficulty'])}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="basic">พื้นฐาน</option>
                  <option value="intermediate">ปานกลาง</option>
                  <option value="advanced">ประยุกต์เข้มข้น</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายย่อ</label>
                <textarea
                  rows={2}
                  value={editSubDesc}
                  onChange={(e) => setEditSubDesc(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  📂 ลิงก์ Google Drive ชีทเรียน (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={editSubGoogleDriveUrl}
                  onChange={(e) => setEditSubGoogleDriveUrl(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ✍️ ลิงก์เฉลยจากการเขียนลายมือครู Max (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... (ไฟล์เฉลยลายมือ)"
                  value={editSubHandwrittenSolutionUrl}
                  onChange={(e) => setEditSubHandwrittenSolutionUrl(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSub(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Subtopic Modal (Full Modal Dialog with 3-Level Support) */}
      {activeTopicForSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">เพิ่มหัวข้อย่อย (3 ระดับขั้น)</h3>
                  <p className="text-xs text-slate-500">
                    ในบท: {activeSubject.topics.find((t) => t.id === activeTopicForSub)?.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveTopicForSub(null);
                  setNewSubName('');
                  setNewSubDesc('');
                  setNewSubGoogleDriveUrl('');
                  setNewSubHandwrittenSolutionUrl('');
                  setSubModalParentId('');
                  setSubModalLevel(1);
                }}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubtopicSubmit} className="space-y-4 text-xs">
              {/* Level Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  เลือกระดับขั้นของหัวข้อย่อย (Hierarchy Level) *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubModalLevel(1);
                      setSubModalParentId('');
                    }}
                    className={`py-2 px-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      subModalLevel === 1
                        ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs">ขั้นที่ 1</div>
                    <div className="text-[10px] opacity-80">หัวข้อย่อยหลัก</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubModalLevel(2);
                      const currentTopic = activeSubject.topics.find((t) => t.id === activeTopicForSub);
                      const l1Items = (currentTopic?.subtopics || []).filter(
                        (s) => !s.parentId || s.level === 1
                      );
                      if (l1Items.length > 0 && !subModalParentId) {
                        setSubModalParentId(l1Items[0].id);
                      }
                    }}
                    className={`py-2 px-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      subModalLevel === 2
                        ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs">ขั้นที่ 2</div>
                    <div className="text-[10px] opacity-80">ข้อย่อย (ใต้ขั้น 1)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubModalLevel(3);
                      const currentTopic = activeSubject.topics.find((t) => t.id === activeTopicForSub);
                      const l2Items = (currentTopic?.subtopics || []).filter(
                        (s) => s.level === 2 || (s.parentId && s.level !== 3)
                      );
                      if (l2Items.length > 0 && !subModalParentId) {
                        setSubModalParentId(l2Items[0].id);
                      } else if ((currentTopic?.subtopics || []).length > 0 && !subModalParentId) {
                        setSubModalParentId(currentTopic!.subtopics[0].id);
                      }
                    }}
                    className={`py-2 px-2 rounded-xl border text-center font-semibold transition-all cursor-pointer ${
                      subModalLevel === 3
                        ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-xs">ขั้นที่ 3</div>
                    <div className="text-[10px] opacity-80">ประเด็นย่อย (ใต้ขั้น 2)</div>
                  </button>
                </div>
              </div>

              {/* Parent selector if Level 2 or Level 3 */}
              {subModalLevel > 1 && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {subModalLevel === 2
                      ? 'เลือกหัวข้อหลักที่เป็นแม่ (Parent ขั้นที่ 1) *'
                      : 'เลือกข้อย่อยที่เป็นแม่ (Parent ขั้นที่ 2 หรือ 1) *'}
                  </label>
                  <select
                    required
                    value={subModalParentId}
                    onChange={(e) => setSubModalParentId(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-amber-300 rounded-xl px-3 py-2 text-slate-800 text-xs"
                  >
                    <option value="">-- กรุณาเลือกหัวข้อแม่ --</option>
                    {(activeSubject.topics.find((t) => t.id === activeTopicForSub)?.subtopics || [])
                      .filter((s) => (subModalLevel === 2 ? (!s.parentId || s.level === 1) : true))
                      .map((pSub) => (
                        <option key={pSub.id} value={pSub.id}>
                          {pSub.level === 2 ? '↳ ' : ''}{pSub.name} ({pSub.level ? `ขั้นที่ ${pSub.level}` : 'ขั้นที่ 1'})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Subtopic Name */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อหัวข้อย่อย *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder={
                    subModalLevel === 1
                      ? 'เช่น ประพจน์และค่าความจริง'
                      : subModalLevel === 2
                      ? 'เช่น การสร้างตารางค่าความจริง'
                      : 'เช่น กรณีมี 2 ตัวแปร (4 กรณี)'
                  }
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:outline-hidden focus:border-blue-500"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ระดับความยาก</label>
                <select
                  value={newSubDifficulty}
                  onChange={(e) => setNewSubDifficulty(e.target.value as Subtopic['difficulty'])}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs"
                >
                  <option value="basic">พื้นฐาน</option>
                  <option value="intermediate">ปานกลาง</option>
                  <option value="advanced">ประยุกต์เข้มข้น</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายรายละเอียด (Optional)</label>
                <input
                  type="text"
                  placeholder="เช่น สรุปสูตรและข้อควรระวังในโจทย์ข้อสอบ"
                  value={newSubDesc}
                  onChange={(e) => setNewSubDesc(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs"
                />
              </div>

              {/* Google Drive and Handwritten Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    📂 ลิงก์ Google Drive ชีทเรียน (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/file/d/..."
                    value={newSubGoogleDriveUrl}
                    onChange={(e) => setNewSubGoogleDriveUrl(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ✍️ ลิงก์เฉลยลายมือครู Max (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... (เฉลยลายมือ)"
                    value={newSubHandwrittenSolutionUrl}
                    onChange={(e) => setNewSubHandwrittenSolutionUrl(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveTopicForSub(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>บันทึกหัวข้อย่อย</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Attach Links Modal (Google Drive & Handwritten Solution) */}
      {quickLinkSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-amber-900/15 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">✍️</span>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    แปะลิงก์เฉลยลายมือ & ไฟล์เรียน Google Drive
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate max-w-[280px]">
                    หัวข้อ: {quickLinkSub.sub.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setQuickLinkSub(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickLinks} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="text-amber-600 font-bold">✍️</span>
                  <span>ลิงก์เฉลยจากการเขียนลายมือครู Max:</span>
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/... หรือ ลิงก์ไฟล์เฉลยลายมือ"
                  value={quickLinkSub.handwrittenSolutionUrl}
                  onChange={(e) =>
                    setQuickLinkSub({
                      ...quickLinkSub,
                      handwrittenSolutionUrl: e.target.value,
                    })
                  }
                  className="w-full bg-[#FFFDF7] border border-amber-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  นักเรียนจะสามารถกดปุ่ม "✍️ เฉลยลายมือครู Max" เพื่อเปิดดูวิธีคิดและเฉลยได้ทันที
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">📂</span>
                  <span>ลิงก์ Google Drive ชีทเรียนประจำหัวข้อ:</span>
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  value={quickLinkSub.googleDriveUrl}
                  onChange={(e) =>
                    setQuickLinkSub({
                      ...quickLinkSub,
                      googleDriveUrl: e.target.value,
                    })
                  }
                  className="w-full bg-[#FFFDF7] border border-amber-300 rounded-xl px-3 py-2 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setQuickLinkSub(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกลิงก์
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* In-App PDF / Material Reader Modal */}
      {selectedMaterialForReader && (
        <PdfMaterialReaderModal
          material={selectedMaterialForReader}
          onClose={() => setSelectedMaterialForReader(null)}
        />
      )}
    </div>
  );
};
