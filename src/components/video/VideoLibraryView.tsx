import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VideoLesson } from '../../types';
import {
  Play,
  CheckCircle,
  Plus,
  Clock,
  BookOpen,
  X,
  ExternalLink,
  Search,
  Sparkles,
} from 'lucide-react';

export const VideoLibraryView: React.FC = () => {
  const {
    subjects,
    activeSubjectId,
    setActiveSubjectId,
    activeSubject,
    videos,
    addVideo,
    currentUserRole,
    activeStudent,
    activeStudentVideoProgress,
    toggleVideoWatched,
  } = useApp();

  const subjectVideos = videos.filter((v) => v.subjectId === activeSubjectId);

  // Active playing video state
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(
    subjectVideos[0] || videos[0] || null
  );

  const [searchQuery, setSearchQuery] = useState('');

  // Add video modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTopicId, setNewTopicId] = useState('');
  const [newDuration, setNewDuration] = useState('25');

  // Extract YouTube ID from various YouTube URL formats
  const extractYoutubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url.trim();
  };

  const handleAddVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    const ytId = extractYoutubeId(newUrl);
    const chosenTopicId = newTopicId || activeSubject.topics[0]?.id || 'topic_01';

    addVideo({
      subjectId: activeSubjectId,
      topicId: chosenTopicId,
      title: newTitle.trim(),
      description: newDesc.trim(),
      youtubeUrl: newUrl.trim(),
      youtubeId: ytId,
      durationMinutes: parseInt(newDuration, 10) || 20,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewUrl('');
  };

  const filteredVideos = subjectVideos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculation for student progress
  const watchedCount = subjectVideos.filter((v) =>
    activeStudentVideoProgress.some((p) => p.videoId === v.id && p.watched)
  ).length;

  const totalSubjectVideos = subjectVideos.length;
  const watchedPercent =
    totalSubjectVideos > 0 ? Math.round((watchedCount / totalSubjectVideos) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Subject Switcher */}
      <div className="bg-white border border-amber-900/10 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200/60 px-2.5 py-0.5 rounded-md mb-1">
              <Play className="w-3.5 h-3.5 fill-red-600" />
              <span>คลังวิดีโอประกอบการสอน YouTube</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              วิดีโอทบทวนบทเรียน ({activeSubject.name})
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              เรียนเสริมและทบทวนเนื้อหาย้อนหลังผ่าน YouTube ฝังในระบบ พร้อมบันทึกสถานะการดู
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentUserRole === 'admin' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>เพิ่มคลิป YouTube</span>
              </button>
            )}
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mr-1">
            เลือกวิชา:
          </span>
          {subjects.map((subj) => (
            <button
              key={subj.id}
              onClick={() => {
                setActiveSubjectId(subj.id);
                const firstSubjVid = videos.find((v) => v.subjectId === subj.id);
                if (firstSubjVid) setSelectedVideo(firstSubjVid);
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                activeSubjectId === subj.id
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {subj.name}
            </button>
          ))}
        </div>

        {/* Student watched progress bar */}
        {currentUserRole === 'student' && (
          <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-slate-700">
                ความคืบหน้าการดูของ <strong>{activeStudent?.nickname}</strong>:
              </span>
              <span className="font-bold text-amber-900 font-mono">
                {watchedCount} / {totalSubjectVideos} คลิป ({watchedPercent}%)
              </span>
            </div>

            <div className="w-full sm:w-48 bg-white border border-amber-200 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${watchedPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Video Arena: Player on Left, Playlist on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 7-8 Cols: Embedded YouTube Player */}
        <div className="lg:col-span-8 bg-white border border-amber-900/10 rounded-2xl overflow-hidden shadow-2xs space-y-4 p-4 sm:p-5">
          {selectedVideo ? (
            <div className="space-y-4">
              {/* 16:9 Responsive Video Container */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Video Info Bar */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-2">
                <div className="space-y-1">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      ความยาว ~{selectedVideo.durationMinutes} นาที
                    </span>
                    <span>·</span>
                    <a
                      href={selectedVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:underline flex items-center gap-1"
                    >
                      เปิดบน YouTube <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Mark as watched button (student view) */}
                {currentUserRole === 'student' && (
                  <button
                    onClick={() => toggleVideoWatched(activeStudent.id, selectedVideo.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs cursor-pointer ${
                      activeStudentVideoProgress.some(
                        (p) => p.videoId === selectedVideo.id && p.watched
                      )
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {activeStudentVideoProgress.some(
                        (p) => p.videoId === selectedVideo.id && p.watched
                      )
                        ? 'ดูจบแล้ว (ติ๊กแล้ว ✓)'
                        : 'มาร์คว่าดูจบแล้ว'}
                    </span>
                  </button>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#FFFDF7] p-3 rounded-xl border border-amber-100">
                {selectedVideo.description}
              </p>
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-xl">
              <Play className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 mt-2">ยังไม่มีวิดีโอในหมวดนี้</p>
              <p className="text-xs text-slate-500">ติวเตอร์สามารถกดปุ่ม "เพิ่มคลิป YouTube" ด้านบนได้เลย</p>
            </div>
          )}
        </div>

        {/* Right 4-5 Cols: Playlist Queue */}
        <div className="lg:col-span-4 bg-white border border-amber-900/10 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-900" />
              รายการคลิปในคอร์ส ({subjectVideos.length})
            </h3>
          </div>

          {/* Search within playlist */}
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาชื่อคลิป..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFDF7] border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredVideos.map((vid, idx) => {
              const isSelected = selectedVideo?.id === vid.id;
              const isWatched = activeStudentVideoProgress.some(
                (p) => p.videoId === vid.id && p.watched
              );

              return (
                <div
                  key={vid.id}
                  onClick={() => setSelectedVideo(vid)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 text-xs ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-400 shadow-2xs'
                      : 'bg-[#FFFDF7]/50 border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/20'
                  }`}
                >
                  {/* Thumbnail / Play index badge */}
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/mqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>

                  <div className="flex-1 truncate">
                    <div className="font-bold text-slate-900 truncate leading-snug">
                      {idx + 1}. {vid.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 font-mono">
                      <span>{vid.durationMinutes} นาที</span>
                      {isWatched && (
                        <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                          ✓ ดูแล้ว
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Video Modal (Admin) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-[#FFFDF7] w-full max-w-lg rounded-2xl shadow-2xl border border-amber-900/15 overflow-hidden p-6 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">เพิ่มคลิปวิดีโอ YouTube ในหลักสูตร</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideoSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  วิชาที่ต้องการเพิ่มคลิป
                </label>
                <select
                  value={activeSubjectId}
                  onChange={(e) => setActiveSubjectId(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ลิงก์ YouTube (YouTube URL หรือ Video ID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น https://www.youtube.com/watch?v=0hB871g_y44"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ชื่อคลิปวิดีโอ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ปริมาณสารสัมพันธ์: ตะลุยโจทย์โมลและสารละลาย"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  บทที่เกี่ยวข้องในสารบัญ
                </label>
                <select
                  value={newTopicId}
                  onChange={(e) => setNewTopicId(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                >
                  {activeSubject.topics.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.sortOrder}. {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  ความยาวโดยประมาณ (นาที)
                </label>
                <input
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  คำอธิบายหรือสรุปใจความคลิป
                </label>
                <textarea
                  rows={2}
                  placeholder="เช่น สรุปเนื้อหาสำคัญ เทคนิคการจำ และตัวอย่างข้อสอบ..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
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
                  บันทึกคลิป YouTube
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
