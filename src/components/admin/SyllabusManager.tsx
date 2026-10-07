import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
    materials,
    addMaterial,
    deleteMaterial,
    recordDownload,
  } = useApp();

  const [expandedTopicIds, setExpandedTopicIds] = useState<string[]>(
    activeSubject.topics.slice(0, 3).map((t) => t.id)
  );

  // Material reader modal
  const [selectedMaterialForReader, setSelectedMaterialForReader] = useState<CourseMaterial | null>(null);

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

  // Subtopic modal state
  const [activeTopicForSub, setActiveTopicForSub] = useState<string | null>(null);
  const [newSubName, setNewSubName] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');
  const [newSubDifficulty, setNewSubDifficulty] = useState<Subtopic['difficulty']>('intermediate');

  // Edit Subtopic modal state
  const [editingSub, setEditingSub] = useState<{ topicId: string; sub: Subtopic } | null>(null);
  const [editSubName, setEditSubName] = useState('');
  const [editSubDesc, setEditSubDesc] = useState('');
  const [editSubDifficulty, setEditSubDifficulty] = useState<Subtopic['difficulty']>('intermediate');

  // Attach PDF Material directly to Topic Modal state
  const [isAttachModalOpen, setIsAttachModalOpen] = useState(false);
  const [attachingTopic, setAttachingTopic] = useState<Topic | null>(null);
  const [attachTitle, setAttachTitle] = useState('');
  const [attachDesc, setAttachDesc] = useState('');
  const [attachCategory, setAttachCategory] = useState<CourseMaterial['category']>('ชีทสรุปสูตร');
  const [attachFileSize, setAttachFileSize] = useState('3.2 MB');
  const [attachFileData, setAttachFileData] = useState<string | undefined>(undefined);

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
    });
    setNewSubName('');
    setNewSubDesc('');
    setActiveTopicForSub(null);
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
    });
    setEditingSub(null);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setAttachFileSize(`${sizeInMb} MB`);
    if (!attachTitle) {
      setAttachTitle(file.name);
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const result = loadEvt.target?.result as string;
      setAttachFileData(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAttachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attachingTopic || !attachTitle.trim()) return;

    const titleWithExt = attachTitle.trim().endsWith('.pdf')
      ? attachTitle.trim()
      : `${attachTitle.trim()}.pdf`;

    addMaterial({
      courseId: activeSubjectId,
      topicId: attachingTopic.id,
      title: titleWithExt,
      description: attachDesc.trim() || `เอกสารประกอบบทเรียน: ${attachingTopic.name}`,
      category: attachCategory,
      fileType: 'pdf',
      fileSize: attachFileSize.trim() || '2.8 MB',
      fileData: attachFileData,
      isProtected: true,
      embeddedPages: [
        {
          pageNumber: 1,
          title: attachingTopic.name,
          subtitle: `${activeSubject.name} • ${attachingTopic.nameEn || 'เอกสารประกอบบทเรียน'}`,
          content: attachingTopic.subtopics.map(
            (s, idx) => `${idx + 1}. ${s.name} — ${s.description || 'เนื้อหาและแนวโจทย์สำคัญ'}`
          ),
          keyFormulas: [
            'สรุปแนวคิดและสูตรที่ใช้ในบทนี้',
            'ฝึกฝนทบทวนโจทย์อย่างสม่ำเสมอ',
          ],
          tips: ['ทบทวนเนื้อหาก่อนเข้าเรียนหรือเตรียมตัวสอบ A-Level'],
        },
      ],
    });

    setIsAttachModalOpen(false);
    setAttachingTopic(null);
    setAttachTitle('');
    setAttachDesc('');
    setAttachFileData(undefined);
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Subject Selector */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>สารบัญหลักสูตรและไฟล์เอกสารประกอบ (Syllabus & PDF Materials)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeSubject.name} ({activeSubject.code})
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
                  <span>เพิ่มวิชาใหม่</span>
                </button>
                <button
                  onClick={() => setIsAddingTopic(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>เพิ่มบทใหญ่</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Multi-Subject Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mr-1">
            เลือกวิชาในระบบ:
          </span>
          {subjects.map((subj) => (
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
              {subj.name} ({subj.topics.length} บท)
            </button>
          ))}
        </div>
      </div>

      {/* Add New Subject Modal */}
      {isAddingSubject && (
        <div className="bg-amber-50/90 border border-amber-300 rounded-2xl p-5 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">สร้างหลักสูตร / วิชาใหม่ในระบบ</h3>
          <form onSubmit={handleAddSubjectSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อวิชา *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ฟิสิกส์ ม.ปลาย & A-Level, ภาษาอังกฤษ ม.ต้น"
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">รหัสวิชา (Code)</label>
                <input
                  type="text"
                  placeholder="เช่น PH-301 หรือ EN-201"
                  value={newSubjCode}
                  onChange={(e) => setNewSubjCode(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">รายละเอียดหลักสูตร</label>
              <input
                type="text"
                placeholder="คำอธิบายสรุปขอบเขตเนื้อหาและกลุ่มเป้าหมาย"
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
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                สร้างวิชาใหม่
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Topic Modal */}
      {isAddingTopic && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">เพิ่มบทใหญ่ในวิชา {activeSubject.name}</h3>
          <form onSubmit={handleAddTopicSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อบทเรียน (ไทย) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น เคมีอินทรีย์, ไฟฟ้าสถิต, ตรีโกณมิติ"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อภาษาอังกฤษ (ถ้ามี)</label>
                <input
                  type="text"
                  placeholder="เช่น Organic Chemistry"
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
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                บันทึกบทใหม่
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Subtopic Modal */}
      {activeTopicForSub && (
        <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 animate-in fade-in duration-200">
          <h3 className="text-sm font-bold text-slate-900 mb-3">
            เพิ่มหัวข้อย่อยในบท: {activeSubject.topics.find((t) => t.id === activeTopicForSub)?.name}
          </h3>
          <form onSubmit={handleAddSubtopicSubmit} className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ชื่อหัวข้อย่อย *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น การคำนวณจุดยอดและเส้นเชื่อม"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">ระดับความยาก</label>
                <select
                  value={newSubDifficulty}
                  onChange={(e) => setNewSubDifficulty(e.target.value as Subtopic['difficulty'])}
                  className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-slate-800"
                >
                  <option value="basic">พื้นฐาน</option>
                  <option value="intermediate">ปานกลาง</option>
                  <option value="advanced">ประยุกต์เข้มข้น</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">คำอธิบายรายละเอียด</label>
              <input
                type="text"
                placeholder="เช่น การประยุกต์ทฤษฎีกราฟกับโจทย์ข้อสอบแข่งขัน"
                value={newSubDesc}
                onChange={(e) => setNewSubDesc(e.target.value)}
                className="w-full bg-white border border-blue-200 rounded-lg px-3 py-1.5 text-slate-800"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTopicForSub(null)}
                className="px-3 py-1.5 text-slate-600 hover:text-slate-900"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800"
              >
                บันทึกหัวข้อย่อย
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
            const hasExamStats = topic.examWeights;

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
                        <span>·</span>
                        <span className="text-blue-900 font-semibold flex items-center gap-1">
                          <FileText className="w-3 h-3 text-red-500" />
                          <span>ชีท PDF ผูกไว้ {topicMaterials.length} ไฟล์</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* Read Topic Sheet Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenMaterialForTopic(topic);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 shadow-2xs"
                      title="เปิดอ่านชีทสรุป / เอกสาร PDF ของบทนี้ทันที"
                    >
                      <FileText className="w-3.5 h-3.5 text-emerald-600" />
                      <span>เปิดอ่านชีท PDF</span>
                    </button>

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
                    {/* 1. LINKED PDF MATERIALS SECTION (ผูกไฟล์ PDF ประจำบทนี้โดยตรง) */}
                    <div className="p-4 bg-gradient-to-r from-blue-50/80 via-white to-amber-50/50 border border-blue-200/90 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                            <FileText className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm text-blue-950">
                              เอกสาร & ชีทสรุป PDF ประจำบทที่ {index + 1}: {topic.name}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              ไฟล์ที่ผูกกับบทเรียนนี้โดยตรง สามารถเปิดอ่านผ่าน In-App Reader หรือดาวน์โหลดได้
                            </p>
                          </div>
                        </div>

                        {currentUserRole === 'admin' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAttachingTopic(topic);
                              setAttachTitle(`MaxUp_${topic.name.replace(/\s+/g, '_')}_Summary.pdf`);
                              setIsAttachModalOpen(true);
                            }}
                            className="flex items-center gap-1.5 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                          >
                            <Plus className="w-3.5 h-3.5 text-amber-500" />
                            <span>+ แนบไฟล์ PDF ให้บทนี้</span>
                          </button>
                        )}
                      </div>

                      {topicMaterials.length === 0 ? (
                        <div className="flex flex-col sm:flex-row items-center justify-between p-3 bg-white/90 rounded-xl border border-dashed border-blue-200 gap-2 text-xs text-slate-600">
                          <span>ยังไม่มีไฟล์ PDF เจาะจงที่ผูกไว้กับบทนี้ (สามารถเปิดชีทสรุปมาตรฐานของระบบได้)</span>
                          <button
                            onClick={() => handleOpenMaterialForTopic(topic)}
                            className="text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg cursor-pointer"
                          >
                            เปิดอ่านชีทสรุปมาตรฐาน
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {topicMaterials.map((mat) => (
                            <div
                              key={mat.id}
                              className="p-3 bg-white border border-blue-100 hover:border-blue-300 rounded-xl flex items-center justify-between gap-3 shadow-2xs transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 bg-red-50 text-red-600 font-bold text-[11px] rounded-lg flex items-center justify-center shrink-0 border border-red-200/50">
                                  PDF
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
                                    <span>{mat.fileSize}</span>
                                    <span>•</span>
                                    <span className="text-emerald-700">ฝังในระบบแล้ว</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0">
                                <button
                                  onClick={() => {
                                    recordDownload(mat.id);
                                    setSelectedMaterialForReader(mat);
                                  }}
                                  className="px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                                >
                                  <BookOpen className="w-3 h-3 text-amber-300" />
                                  <span>เปิดอ่าน PDF</span>
                                </button>
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

                    {/* 2. SUBTOPICS LIST */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 py-1">
                        <span className="font-bold text-slate-800">หัวข้อย่อยและจุดเน้นในบทเรียนนี้:</span>
                        {currentUserRole === 'admin' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTopicForSub(topic.id);
                            }}
                            className="text-blue-900 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>เพิ่มหัวข้อย่อย</span>
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        {topic.subtopics.map((sub, sIdx) => (
                          <div
                            key={sub.id}
                            className="p-3 bg-white border border-slate-200/80 rounded-xl hover:border-amber-300 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">
                                  {index + 1}.{sIdx + 1} {sub.name}
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
                              </div>
                              {sub.description && (
                                <p className="text-slate-600 leading-relaxed">{sub.description}</p>
                              )}
                              {sub.keyPoints && sub.keyPoints.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
                                  <span className="text-slate-400 font-medium">จุดเน้น:</span>
                                  {sub.keyPoints.map((kp, kIdx) => (
                                    <span key={kIdx} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                      {kp}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                              <button
                                onClick={() => handleOpenMaterialForSubtopic(topic, sub)}
                                className="flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200/70 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                                title="เปิดอ่านชีทสรุปหัวข้อนี้"
                              >
                                <BookOpen className="w-3 h-3 text-blue-700" />
                                <span>อ่านชีทหัวข้อนี้</span>
                              </button>

                              {currentUserRole === 'admin' && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => {
                                      setEditingSub({ topicId: topic.id, sub });
                                      setEditSubName(sub.name);
                                      setEditSubDesc(sub.description || '');
                                      setEditSubDifficulty(sub.difficulty || 'intermediate');
                                    }}
                                    className="p-1 text-slate-400 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                    title="แก้ไขหัวข้อย่อย"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSubtopic(topic.id, sub)}
                                    className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="ลบหัวข้อย่อยนี้"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              )}

                              <div className="text-slate-400 flex items-center gap-1">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                <span className="text-[11px] text-slate-500 hidden sm:inline">เชื่อมโยงแล้ว</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Attach PDF Material Directly Modal */}
      {isAttachModalOpen && attachingTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-900" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">แนบไฟล์ PDF ให้บทเรียนนี้</h3>
                  <p className="text-xs text-slate-500">
                    ผูกไฟล์เข้ากับ: {attachingTopic.name} ({activeSubject.name})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAttachModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAttachSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อไฟล์ PDF *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น MaxUp_Chem_Summary_Ch1.pdf"
                  value={attachTitle}
                  onChange={(e) => setAttachTitle(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">หมวดหมู่เอกสาร</label>
                  <select
                    value={attachCategory}
                    onChange={(e) => setAttachCategory(e.target.value as CourseMaterial['category'])}
                    className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="ชีทสรุปสูตร">ชีทสรุปสูตร</option>
                    <option value="ใบงานแบบฝึกหัด">ใบงานแบบฝึกหัด</option>
                    <option value="ข้อสอบเก่า">ข้อสอบเก่า</option>
                    <option value="เฉลยละเอียด">เฉลยละเอียด</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ขนาดไฟล์ระบุ</label>
                  <input
                    type="text"
                    value={attachFileSize}
                    onChange={(e) => setAttachFileSize(e.target.value)}
                    className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายเอกสาร</label>
                <textarea
                  rows={2}
                  placeholder="ระบุจุดเน้น หรือสิ่งที่นักเรียนจะได้รับจากชีทชุดนี้"
                  value={attachDesc}
                  onChange={(e) => setAttachDesc(e.target.value)}
                  className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              {/* Upload PDF from local device */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  อัปโหลดไฟล์ PDF จากเครื่อง (อุปกรณ์จริง):
                </label>
                <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-4 text-center bg-amber-50/40 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-7 h-7 text-amber-600 mx-auto mb-1" />
                  <p className="font-semibold text-slate-700">คลิกเพื่อเลือกไฟล์ PDF</p>
                  <p className="text-[11px] text-slate-500">หรือลากไฟล์มาวางที่นี่เพื่อฝังลงในบทเรียน</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAttachModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs"
                >
                  ผูกไฟล์ PDF เข้าบทนี้
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

      {/* Edit Subtopic Modal */}
      {editingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base">แก้ไขหัวข้อย่อย (Subtopic)</h3>
              </div>
              <button
                onClick={() => setEditingSub(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubtopicSubmit} className="space-y-4 text-xs">
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
