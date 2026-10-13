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
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Trash2,
  FolderOpen,
  Copy,
  Check,
  Link,
  Edit2,
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
    updateCourse,
    recordDownload,
    currentUserRole,
  } = useApp();

  const courseMaterials = materials.filter((m) => m.courseId === activeCourseId);
  const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด');
  const [readerMaterial, setReaderMaterial] = useState<CourseMaterial | null>(null);

  // Add Material Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDriveUrl, setNewDriveUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<CourseMaterial['category']>('ชีทสรุปสูตร');
  const [newTopicId, setNewTopicId] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Course Google Drive folder editing
  const [isEditingCourseDrive, setIsEditingCourseDrive] = useState(false);
  const [courseDriveInput, setCourseDriveInput] = useState(activeCourse?.googleDriveFolderUrl || '');

  const categories = ['ทั้งหมด', 'ชีทสรุปสูตร', 'ใบงานแบบฝึกหัด', 'ข้อสอบเก่า', 'เฉลยละเอียด'];

  const filteredMaterials =
    selectedCategory === 'ทั้งหมด'
      ? courseMaterials
      : courseMaterials.filter((m) => m.category === selectedCategory);

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveCourseDrive = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourse({
      ...activeCourse,
      googleDriveFolderUrl: courseDriveInput.trim(),
    });
    setIsEditingCourseDrive(false);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addMaterial({
      courseId: activeCourseId,
      topicId: newTopicId || undefined,
      title: newTitle.trim(),
      description: newDesc.trim() || 'เอกสารประกอบการเรียนสำหรับทบทวนและฝึกทำโจทย์',
      category: newCategory,
      fileType: 'pdf',
      fileSize: 'Google Drive',
      driveUrl: newDriveUrl.trim(),
      isProtected: false,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDriveUrl('');
    setNewDesc('');
    setNewTopicId('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Google Drive Hub */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <FolderOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>คลังไฟล์เรียน Google Drive ประจำคอร์ส</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              คลังเอกสาร & ชีทเรียน: {activeCourse.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              เข้าถึงชีทสรุปสูตร ใบงานแบบฝึกหัด และข้อสอบเก่าผ่านลิงก์ Google Drive ที่คุณครู Max รวบรวมไว้
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs cursor-pointer transition-all active:scale-98"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>+ วางลิงก์ไฟล์ Google Drive</span>
              </button>
            )}
          </div>
        </div>

        {/* Master Course Google Drive Folder Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-amber-50/30 border border-emerald-200/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
              📁
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <span>โฟลเดอร์ Google Drive รวมของคอร์สนี้</span>
                {activeCourse?.googleDriveFolderUrl && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    พร้อมใช้งาน
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {activeCourse?.googleDriveFolderUrl
                  ? 'กดปุ่มด้านขวาเพื่อเปิดดูโฟลเดอร์รวมของคอร์สนี้ใน Google Drive'
                  : 'ยังไม่ได้ตั้งค่าโฟลเดอร์รวม (ครู Max สามารถกดแก้ไขเพื่อใส่ลิงก์โฟลเดอร์ได้)'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeCourse?.googleDriveFolderUrl ? (
              <a
                href={activeCourse.googleDriveFolderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>เปิดโฟลเดอร์ Google Drive</span>
                <ExternalLink className="w-3 h-3 text-emerald-200 ml-0.5" />
              </a>
            ) : null}

            {currentUserRole === 'admin' && (
              <button
                onClick={() => {
                  setCourseDriveInput(activeCourse?.googleDriveFolderUrl || '');
                  setIsEditingCourseDrive(true);
                }}
                className="p-2 text-slate-600 hover:text-emerald-800 hover:bg-emerald-100/60 rounded-xl border border-emerald-200 text-xs font-medium cursor-pointer"
                title="ตั้งค่าลิงก์โฟลเดอร์ Google Drive รวม"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Modal/Inline Editor for Course Folder Link */}
        {isEditingCourseDrive && (
          <form
            onSubmit={handleSaveCourseDrive}
            className="p-3 bg-emerald-50/70 border border-emerald-300 rounded-xl space-y-2 text-xs animate-in fade-in"
          >
            <label className="block font-bold text-emerald-950">
              วางลิงก์โฟลเดอร์ Google Drive รวมสำหรับคอร์ส "{activeCourse.name}":
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                required
                placeholder="https://drive.google.com/drive/folders/..."
                value={courseDriveInput}
                onChange={(e) => setCourseDriveInput(e.target.value)}
                className="flex-1 bg-white border border-emerald-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white rounded-lg font-bold cursor-pointer"
              >
                บันทึกลิงก์
              </button>
              <button
                type="button"
                onClick={() => setIsEditingCourseDrive(false)}
                className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        )}
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
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="text-sm font-bold text-slate-700">ยังไม่มีเอกสารในหมวดหมู่นี้</div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {currentUserRole === 'admin'
                ? 'คุณครู Max สามารถกดปุ่ม "+ วางลิงก์ไฟล์ Google Drive" ด้านบน เพื่อแปะลิงก์ชีทเรียนหรือโจทย์'
                : 'รอคุณครู Max วางลิงก์เอกสาร Google Drive สำหรับบทเรียนนี้นะครับ'}
            </p>
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-xs"
              >
                + วางลิงก์แรก
              </button>
            )}
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
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0 text-emerald-700 font-bold text-base">
                      📁
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md">
                        {mat.category}
                      </span>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
                        Google Drive
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50 font-medium">
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                    <span>Cloud Drive</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-blue-900 transition-colors">
                  {mat.title}
                </h3>

                {mat.topicId && (
                  <div className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md inline-flex items-center gap-1 border border-blue-200/60">
                    <BookOpen className="w-3 h-3 text-blue-700" />
                    <span>
                      บทที่:{' '}
                      {activeCourse.topics.find((t) => t.id === mat.topicId)?.name || 'บทเรียนในหลักสูตร'}
                    </span>
                  </div>
                )}

                <p className="text-xs text-slate-600 leading-relaxed bg-[#FFFDF7] p-2.5 rounded-xl border border-amber-100">
                  {mat.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {mat.driveUrl ? (
                  <div className="flex-1 flex items-center gap-1.5">
                    <a
                      href={mat.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>เปิดใน Google Drive</span>
                      <ExternalLink className="w-3 h-3 text-emerald-200" />
                    </a>
                    <button
                      onClick={() => handleCopyLink(mat.id, mat.driveUrl || '')}
                      className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                      title="คัดลอกลิงก์ Google Drive"
                    >
                      {copiedId === mat.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-slate-400 italic">ยังไม่ได้ใส่ลิงก์</span>
                )}

                {currentUserRole === 'admin' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`ยืนยันการลบไฟล์ "${mat.title}" หรือไม่?`)) {
                        deleteMaterial(mat.id);
                      }
                    }}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shrink-0"
                    title="ลบไฟล์เรียนนี้"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Google Drive Material Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-[#FFFDF7] w-full max-w-lg rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-white border-b border-amber-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 text-emerald-600" />
                  <span>เพิ่มไฟล์เรียน Google Drive ใหม่</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  วางลิงก์ Google Drive ของเอกสาร เช่น ชีทสรุป หรือใบงาน
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              {/* Google Drive URL */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  ลิงก์ Google Drive (URL) * :
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/... หรือลิงก์โฟลเดอร์"
                  value={newDriveUrl}
                  onChange={(e) => setNewDriveUrl(e.target.value)}
                  className="w-full border border-amber-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-amber-500 bg-white"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  💡 แนะนำ: ตั้งค่าสิทธิ์การแชร์ใน Google Drive เป็น "ทุกคนที่มีลิงก์ (Anyone with link)"
                </p>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  ชื่อเอกสาร / ชีทเรียน * :
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น สรุปสูตรเคมี A-Level ฉบับพกพา"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500 bg-white"
                />
              </div>

              {/* Category & Topic */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">หมวดหมู่:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CourseMaterial['category'])}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="ชีทสรุปสูตร">ชีทสรุปสูตร</option>
                    <option value="ใบงานแบบฝึกหัด">ใบงานแบบฝึกหัด</option>
                    <option value="ข้อสอบเก่า">ข้อสอบเก่า</option>
                    <option value="เฉลยละเอียด">เฉลยละเอียด</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ผูกกับบทเรียน (Optional):
                  </label>
                  <select
                    value={newTopicId}
                    onChange={(e) => setNewTopicId(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-2.5 text-xs bg-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="">ภาพรวมทั้งคอร์ส</option>
                    {activeCourse.topics.map((t, idx) => (
                      <option key={t.id} value={t.id}>
                        บทที่ {idx + 1}: {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คำอธิบายหรือคำแนะนำการอ่าน:
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น ชีทนี้ใช้เรียนในคาบที่ 1-3 ควรปริ้นหรือเปิดใน iPad ก่อนเริ่มเรียน"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-amber-500 bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer transition-all shadow-xs"
                >
                  บันทึกไฟล์ Google Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reader Modal (if any embedded PDF exists) */}
      {readerMaterial && (
        <PdfMaterialReaderModal
          material={readerMaterial}
          onClose={() => setReaderMaterial(null)}
        />
      )}
    </div>
  );
};
