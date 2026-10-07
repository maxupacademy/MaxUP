import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseMaterial } from '../../types';
import { PdfMaterialReaderModal } from './PdfMaterialReaderModal';
import {
  FileText,
  Download,
  Plus,
  X,
  FileCheck,
  Eye,
  Sparkles,
  BookMarked,
  Layers,
  Calendar,
  UploadCloud,
  ShieldCheck,
  BookOpen,
  Trash2,
} from 'lucide-react';

export const CourseMaterialsView: React.FC = () => {
  const {
    courses,
    activeCourseId,
    setActiveCourseId,
    activeCourse,
    materials,
    addMaterial,
    deleteMaterial,
    recordDownload,
    currentUserRole,
  } = useApp();

  const courseMaterials = materials.filter((m) => m.courseId === activeCourseId);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [readerMaterial, setReaderMaterial] = useState<CourseMaterial | null>(null);

  // Add Material Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<CourseMaterial['category']>('ชีทสรุปสูตร');
  const [newSize, setNewSize] = useState('3.5 MB');
  const [newTopicId, setNewTopicId] = useState<string>('');
  const [uploadedFileData, setUploadedFileData] = useState<string | undefined>(undefined);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const categories = ['ทั้งหมด', 'ชีทสรุปสูตร', 'ใบงานแบบฝึกหัด', 'ข้อสอบเก่า', 'เฉลยละเอียด'];

  const filteredMaterials =
    selectedCategory === 'ทั้งหมด'
      ? courseMaterials
      : courseMaterials.filter((m) => m.category === selectedCategory);

  const handleOpenReader = (material: CourseMaterial) => {
    recordDownload(material.id);
    setReaderMaterial(material);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Calculate human-readable size
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    setNewSize(`${sizeInMb} MB`);
    setUploadedFileName(file.name);
    if (!newTitle) {
      setNewTitle(file.name);
    }

    const reader = new FileReader();
    reader.onload = (loadEvt) => {
      const result = loadEvt.target?.result as string;
      setUploadedFileData(result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addMaterial({
      courseId: activeCourseId,
      topicId: newTopicId || undefined,
      title: newTitle.trim().endsWith('.pdf') ? newTitle.trim() : `${newTitle.trim()}.pdf`,
      description: newDesc.trim() || 'เอกสารประกอบการเรียนสำหรับทบทวนและฝึกทำโจทย์',
      category: newCategory,
      fileType: 'pdf',
      fileSize: newSize.trim() || '2.5 MB',
      fileData: uploadedFileData,
      isProtected: true,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewTopicId('');
    setUploadedFileData(undefined);
    setUploadedFileName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Course Filter */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>คลังไฟล์เรียน & ชีทสรุปฝังในระบบ (Embedded Materials)</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              คลังเอกสาร & ชีทเรียน: {activeCourse.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              เปิดอ่านชีทสรุปสูตร ใบงานตะลุยโจทย์ และข้อสอบเก่าได้ทันทีในเว็บ ปลอดภัยและแชร์ต่อง่ายไม่ได้
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>อัปโหลดไฟล์เรียนใหม่</span>
              </button>
            )}
          </div>
        </div>

        {/* Course Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">เลือกคอร์ส:</span>
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => setActiveCourseId(course.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCourseId === course.id
                  ? 'bg-blue-900 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {course.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Bar & Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-amber-900/10 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-100/90 text-amber-900 font-bold border border-amber-300/80 shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 font-mono text-right shrink-0">
          พบ <strong className="text-slate-800">{filteredMaterials.length}</strong> ไฟล์ในคอร์สนี้
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-slate-300 space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">ยังไม่มีเอกสารในหมวดหมู่นี้</div>
            <p className="text-xs text-slate-500">
              {currentUserRole === 'admin'
                ? 'กดปุ่ม "+ อัปโหลดไฟล์เรียนใหม่" เพื่อเพิ่มชีทเรียนหรือข้อสอบ'
                : 'รอติวเตอร์อัปโหลดเอกสารสำหรับคอร์สนี้เร็วๆ นี้นะครับ'}
            </p>
          </div>
        ) : (
          filteredMaterials.map((mat) => (
            <div
              key={mat.id}
              className="bg-white border border-amber-900/10 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200/60 flex items-center justify-center shrink-0 text-red-600 font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md">
                        {mat.category}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">{mat.fileSize}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>ฝังในระบบ</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-900 transition-colors">
                  {mat.title}
                </h3>
                {mat.topicId && (
                  <div className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1 border border-blue-200/60">
                    <BookOpen className="w-3 h-3 text-blue-700" />
                    <span>
                      ผูกกับบทที่:{' '}
                      {activeCourse.topics.find((t) => t.id === mat.topicId)?.name || 'บทเรียนในหลักสูตร'}
                    </span>
                  </div>
                )}
                <p className="text-xs text-slate-600 leading-relaxed bg-[#FFFDF7] p-2.5 rounded-xl border border-amber-100">
                  {mat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleOpenReader(mat)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer active:scale-98"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                  <span>เปิดอ่านชีทในระบบ</span>
                </button>
                {currentUserRole === 'admin' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`ยืนยันการลบไฟล์ "${mat.title}" หรือไม่?`)) {
                        deleteMaterial(mat.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                    title="ลบไฟล์เรียนนี้"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Embedded PDF Reader Modal */}
      {readerMaterial && (
        <PdfMaterialReaderModal
          material={readerMaterial}
          onClose={() => setReaderMaterial(null)}
        />
      )}

      {/* Add Material Modal (Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-900" />
                <h3 className="font-bold text-slate-900 text-base">อัปโหลดไฟล์เรียน / ชีทสรุป</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  เลือกคอร์สเรียน:
                </label>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 font-bold text-slate-800">
                  {activeCourse.name} ({activeCourse.code})
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ผูกกับบทเรียนในสารบัญ (เชื่อมโยงเข้าสารบัญทันที):
                </label>
                <select
                  value={newTopicId}
                  onChange={(e) => setNewTopicId(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-[#FFFDF7] focus:ring-1 focus:ring-amber-500"
                >
                  <option value="">ภาพรวมทั้งคอร์ส (General Course Material)</option>
                  {activeCourse.topics.map((t, idx) => (
                    <option key={t.id} value={t.id}>
                      บทที่ {idx + 1}: {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload PDF File directly */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ไฟล์ PDF จากเครื่อง (ฝังในระบบโดยตรง):
                </label>
                <div className="border-2 border-dashed border-amber-300 hover:border-amber-500 rounded-2xl p-4 text-center bg-amber-50/40 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <UploadCloud className="w-8 h-8 text-amber-600 mx-auto mb-1" />
                  <div className="text-xs font-semibold text-slate-800">
                    {uploadedFileName ? (
                      <span className="text-emerald-700 font-bold">✓ เลือกไฟล์: {uploadedFileName}</span>
                    ) : (
                      'คลิกเพื่อเลือกไฟล์ PDF หรือลากไฟล์มาวางที่นี่'
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    ไฟล์จะถูกแปลงและฝังลงในฐานข้อมูลระบบโดยตรง
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อเอกสาร / ชื่อไฟล์:
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สรุปสูตรเคมี A-Level ฉบับพกพา.pdf"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">หมวดหมู่:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CourseMaterial['category'])}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="ชีทสรุปสูตร">ชีทสรุปสูตร</option>
                    <option value="ใบงานแบบฝึกหัด">ใบงานแบบฝึกหัด</option>
                    <option value="ข้อสอบเก่า">ข้อสอบเก่า</option>
                    <option value="เฉลยละเอียด">เฉลยละเอียด</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ขนาดไฟล์:</label>
                  <input
                    type="text"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="เช่น 3.5 MB"
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">คำอธิบายเอกสาร:</label>
                <textarea
                  rows={3}
                  placeholder="รายละเอียดเนื้อหา ข้อสอบปีไหน หรือคำแนะนำในการอ่าน..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกไฟล์ลงคลัง
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
