import React, { useState } from 'react';
import { CourseMaterial } from '../../types';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  ShieldAlert,
  BookOpen,
  Sparkles,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface PdfMaterialReaderModalProps {
  material: CourseMaterial | null;
  onClose: () => void;
}

export const PdfMaterialReaderModal: React.FC<PdfMaterialReaderModalProps> = ({
  material,
  onClose,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [paperTheme, setPaperTheme] = useState<'paper' | 'white' | 'dark'>('paper');
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!material) return null;

  const pages = material.embeddedPages || [
    {
      pageNumber: 1,
      title: material.title.replace('.pdf', ''),
      subtitle: material.description,
      content: [
        'เอกสารนี้ได้รับการจัดเตรียมโดย ครูพี่แม็ก (MaxUp) สำหรับประกอบการเรียนการสอนในระบบ MaxUp TutorHub',
        'ครอบคลุมจุดเน้นสำคัญ สรุปทฤษฎี เทคนิคการวิเคราะห์ และแบบฝึกหัดสำหรับเตรียมสอบ',
        'กรุณาทบทวนร่วมกับการทำโจทย์สม่ำเสมอ หากมีข้อสงสัยสามารถสอบถามในคาบเรียนหรือผ่านช่องทางถาม-ตอบได้ตลอดเวลา',
      ],
      keyFormulas: [
        'หมั่นทบทวนเนื้อหาและทำโจทย์อย่างน้อยสัปดาห์ละ 3-5 ชั่วโมง',
        'จำลองเวลาทำข้อสอบจริงเพื่อสร้างความคุ้นเคยกับสปีดข้อสอบ',
      ],
      tips: [
        'ทำความเข้าใจนิยามและที่มาของสูตรก่อนท่องจำ จะช่วยให้ประยุกต์โจทย์ประยุกต์ได้เร็วขึ้น',
      ],
    },
  ];

  const totalPages = pages.length;
  const activePage = pages[currentPageIndex] || pages[0];

  const themeClasses = {
    paper: 'bg-[#FCF9F2] text-slate-900 border-amber-200/70',
    white: 'bg-white text-slate-900 border-slate-200',
    dark: 'bg-[#181C24] text-slate-100 border-slate-700',
  };

  const isUploadedPdf = Boolean(material.fileData && material.fileData.startsWith('data:application/pdf'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full ${
          isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-5xl max-h-[92vh] rounded-2xl'
        } bg-slate-900 border border-slate-700 shadow-2xl flex flex-col overflow-hidden transition-all`}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-amber-300" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm truncate">{material.title}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono shrink-0">
                  {material.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate hidden sm:block">
                {material.description}
              </p>
            </div>
          </div>

          {/* Controls: Zoom, Theme, Fullscreen, Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {!isUploadedPdf && (
              <>
                <div className="hidden sm:flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700 text-xs">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(80, prev - 10))}
                    className="p-1 hover:text-amber-300 transition-colors"
                    title="ย่อขนาด"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 font-mono text-[11px] text-slate-300">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(140, prev + 10))}
                    className="p-1 hover:text-amber-300 transition-colors"
                    title="ขยายขนาด"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="hidden md:flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700">
                  <button
                    onClick={() => setPaperTheme('paper')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                      paperTheme === 'paper' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    กระดาษถนอมสายตา
                  </button>
                  <button
                    onClick={() => setPaperTheme('white')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                      paperTheme === 'white' ? 'bg-white text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    ขาวสว่าง
                  </button>
                  <button
                    onClick={() => setPaperTheme('dark')}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-medium transition-all ${
                      paperTheme === 'dark' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    โหมดมืด
                  </button>
                </div>
              </>
            )}

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
              title={isFullscreen ? 'ย่อหน้าต่าง' : 'เต็มจอ'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
              title="ปิดเอกสาร"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security / DRM Banner (as requested: embedded so not easily shared) */}
        <div className="bg-amber-950/60 border-b border-amber-800/40 px-4 py-1.5 flex items-center justify-between text-[11px] text-amber-200">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              <strong>เอกสารเฉพาะในระบบ (Embedded In-App Viewer):</strong> ไม่อนุญาตให้คัดลอกหรือแชร์ลิงก์ภายนอก เพื่อรักษาสิทธิ์ของผู้เรียน
            </span>
          </div>
          <span className="font-mono text-[10px] text-amber-400/80 hidden sm:inline">
            MaxUp Protected Reader v3.2
          </span>
        </div>

        {/* Document Body View */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-900/90 flex justify-center">
          {isUploadedPdf ? (
            /* Uploaded PDF embedded via iframe/object */
            <div className="w-full h-full min-h-[500px] bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                src={`${material.fileData}#toolbar=0`}
                className="w-full h-full border-0"
                title={material.title}
              />
            </div>
          ) : (
            /* Structured Multi-Page Sheet Reader */
            <div
              className={`w-full max-w-3xl rounded-xl shadow-2xl border p-6 sm:p-10 transition-all ${
                themeClasses[paperTheme]
              }`}
              style={{ fontSize: `${zoomLevel}%` }}
            >
              {/* Sheet Header */}
              <div className="border-b-2 border-amber-900/20 pb-4 mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-md mb-1.5">
                    MaxUp Studio • Course Summary Sheet
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                    {activePage.title}
                  </h2>
                  {activePage.subtitle && (
                    <p className="text-xs sm:text-sm opacity-75 mt-1 font-medium">
                      {activePage.subtitle}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold opacity-70">
                    หน้า {activePage.pageNumber} / {totalPages}
                  </div>
                  <div className="text-[10px] opacity-50">MaxUp Hub</div>
                </div>
              </div>

              {/* Sheet Content Points */}
              <div className="space-y-4 text-xs sm:text-sm leading-relaxed">
                <div className="space-y-2.5">
                  {activePage.content.map((paragraph, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-2 shrink-0 opacity-80" />
                      <p>{paragraph}</p>
                    </div>
                  ))}
                </div>

                {/* Key Formulas Section */}
                {activePage.keyFormulas && activePage.keyFormulas.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-amber-900/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>สูตรและสมการสำคัญที่ต้องจำ</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {activePage.keyFormulas.map((formula, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-950/5 border border-blue-900/20 rounded-xl p-3 font-mono font-bold text-xs sm:text-sm text-blue-950 tracking-wide"
                        >
                          {formula}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tutor Tips & Pitfalls */}
                {activePage.tips && activePage.tips.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-amber-900/10">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>ข้อควรระวัง & ทริคลัดจากติวเตอร์</span>
                    </h3>
                    <div className="space-y-2">
                      {activePage.tips.map((tip, idx) => (
                        <div
                          key={idx}
                          className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-950"
                        >
                          💡 {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Watermark Footer */}
              <div className="mt-10 pt-4 border-t border-dashed border-slate-300 text-[10px] opacity-60 flex items-center justify-between">
                <span>© MaxUp TutorHub — สถาบันกวดวิชาเคมี คณิต วิทยาศาสตร์</span>
                <span>ผู้เรียน: เอกสารอ่านส่วนบุคคล</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Paging Controls (For Multi-page structured sheets) */}
        {!isUploadedPdf && totalPages > 1 && (
          <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex items-center justify-between text-xs text-white">
            <button
              onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentPageIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>หน้าที่แล้ว</span>
            </button>

            <span className="font-mono text-slate-400">
              หน้า <strong className="text-white">{currentPageIndex + 1}</strong> จาก {totalPages}
            </span>

            <button
              onClick={() => setCurrentPageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
              disabled={currentPageIndex === totalPages - 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>หน้าถัดไป</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
