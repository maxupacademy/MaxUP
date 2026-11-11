import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { StudyGroup, UserProfile } from '../../types';
import { Users, Plus, Check, X, Bookmark, Edit2, Trash2 } from 'lucide-react';

interface StudentGroupSelectorProps {
  selectedStudentIds: string[];
  onChangeSelected: (studentIds: string[], groupId?: string) => void;
  courseId?: string;
  label?: string;
  showAllOption?: boolean;
}

export const StudentGroupSelector: React.FC<StudentGroupSelectorProps> = ({
  selectedStudentIds,
  onChangeSelected,
  courseId,
  label,
  showAllOption = true,
}) => {
  const { students, studyGroups, addStudyGroup, deleteStudyGroup } = useApp();
  const { tx } = useLanguage();

  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupStudentIds, setNewGroupStudentIds] = useState<string[]>([]);
  const [groupError, setGroupError] = useState('');

  // Filter students by course if courseId provided
  const availableStudents = courseId
    ? students.filter((s) => (s.enrolledCourseIds || []).length === 0 || (s.enrolledCourseIds || []).includes(courseId))
    : students;

  const effectiveStudents = availableStudents.length > 0 ? availableStudents : students;

  // Toggle single student
  const handleToggleStudent = (studentId: string) => {
    if (selectedStudentIds.includes(studentId)) {
      const next = selectedStudentIds.filter((id) => id !== studentId);
      onChangeSelected(next);
    } else {
      const next = [...selectedStudentIds, studentId];
      onChangeSelected(next);
    }
  };

  // Select all students
  const handleSelectAll = () => {
    if (selectedStudentIds.length === effectiveStudents.length) {
      onChangeSelected([]);
    } else {
      onChangeSelected(effectiveStudents.map((s) => s.id));
    }
  };

  // Select by Preset Study Group
  const handleSelectGroup = (group: StudyGroup) => {
    onChangeSelected(group.studentIds, group.id);
  };

  // Save new preset group
  const handleSaveNewGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      setGroupError('กรุณากรอกชื่อกลุ่มเรียน');
      return;
    }
    if (newGroupStudentIds.length === 0) {
      setGroupError('กรุณาเลือกนักเรียนอย่างน้อย 1 คน');
      return;
    }

    addStudyGroup({
      name: newGroupName.trim(),
      studentIds: newGroupStudentIds,
      courseId,
    });

    // Auto-select the newly created group
    onChangeSelected(newGroupStudentIds);
    setNewGroupName('');
    setNewGroupStudentIds([]);
    setIsAddingGroup(false);
    setGroupError('');
  };

  // Check if a group is currently active
  const isGroupActive = (group: StudyGroup) => {
    if (group.studentIds.length !== selectedStudentIds.length) return false;
    return group.studentIds.every((id) => selectedStudentIds.includes(id));
  };

  return (
    <div className="space-y-2.5">
      {/* Header with selected count */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-blue-900" />
          <span>{label || tx('นักเรียนที่เรียนในคาบนี้ *', 'Attending Students *')}</span>
          {selectedStudentIds.length > 0 && (
            <span className="text-[11px] font-bold text-blue-900 bg-blue-100/90 px-2 py-0.5 rounded-full border border-blue-200">
              {selectedStudentIds.length} {tx('คน', 'students')}
            </span>
          )}
        </label>

        <div className="flex items-center gap-2">
          {showAllOption && effectiveStudents.length > 1 && (
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-[11px] font-semibold text-blue-900 hover:underline cursor-pointer"
            >
              {selectedStudentIds.length === effectiveStudents.length
                ? tx('ยกเลิกเลือกทุกคน', 'Deselect All')
                : tx('เลือกทุกคนในคอร์ส', 'Select All')}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsAddingGroup(!isAddingGroup);
              setNewGroupStudentIds(selectedStudentIds.length > 0 ? selectedStudentIds : []);
            }}
            className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
            title="ตั้งกลุ่มเรียนที่ใช้บ่อย เพื่อกดเลือกพร้อมกันในคลิกเดียว"
          >
            <Bookmark className="w-3 h-3 text-amber-600" />
            <span>+ {tx('ตั้งกลุ่มเรียนใหม่', 'New Group')}</span>
          </button>
        </div>
      </div>

      {/* Preset Study Groups Quick Bar */}
      {studyGroups && studyGroups.length > 0 && (
        <div className="space-y-1 bg-amber-50/40 p-2.5 rounded-xl border border-amber-200/60">
          <span className="text-[10px] font-bold text-amber-900 block tracking-tight">
            🏷️ {tx('กลุ่มเรียนที่บันทึกไว้ (คลิกเพื่อเลือกทั้งกลุ่ม):', 'Saved Study Groups (Click to apply):')}
          </span>
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {studyGroups.map((grp) => {
              const active = isGroupActive(grp);
              return (
                <div key={grp.id} className="inline-flex items-center group">
                  <button
                    type="button"
                    onClick={() => handleSelectGroup(grp)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                      active
                        ? 'bg-blue-900 text-white border border-blue-900 shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span>{grp.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        active ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {grp.studentIds.length} คน
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`ลบกลุ่ม "${grp.name}"?`)) {
                        deleteStudyGroup(grp.id);
                      }
                    }}
                    className="p-1 text-slate-300 hover:text-red-500 rounded transition-colors opacity-0 group-hover:opacity-100 cursor-pointer text-[10px]"
                    title="ลบกลุ่มนี้"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Inline Quick Add Study Group Panel */}
      {isAddingGroup && (
        <div className="p-3 bg-gradient-to-r from-blue-50/90 to-amber-50/90 border border-blue-200 rounded-xl space-y-2.5 shadow-2xs animate-in fade-in zoom-in-98 duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              <span>{tx('ตั้งกลุ่มเรียนล่วงหน้า (Preset Study Group)', 'New Preset Study Group')}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsAddingGroup(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder={tx('ชื่อกลุ่ม เช่น กลุ่ม สอวน. ฟิสิกส์ หรือ กลุ่ม ม.6 เตรียมหมอ', 'Group Name')}
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full bg-white border border-blue-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div>
              <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                {tx('เลือกนักเรียนในกลุ่มนี้:', 'Select students for this group:')}
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1 bg-white/80 rounded-lg border border-slate-200">
                {effectiveStudents.map((st) => {
                  const isChecked = newGroupStudentIds.includes(st.id);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setNewGroupStudentIds((prev) =>
                          prev.includes(st.id) ? prev.filter((id) => id !== st.id) : [...prev, st.id]
                        );
                      }}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium flex items-center gap-1.5 cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] ${
                          isChecked ? 'bg-white text-blue-900 border-white' : 'border-slate-300'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-3" />}
                      </div>
                      <span>{st.nickname}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {groupError && <div className="text-[11px] text-red-600 font-semibold">{groupError}</div>}

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingGroup(false)}
                className="px-3 py-1 text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                {tx('ยกเลิก', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={handleSaveNewGroup}
                className="px-3.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-xs font-bold cursor-pointer shadow-2xs"
              >
                {tx('บันทึกกลุ่มเรียน', 'Save Group')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Pills Multi-Select Grid */}
      <div className="bg-white border border-slate-200 rounded-xl p-2.5 max-h-48 overflow-y-auto space-y-1.5 shadow-2xs">
        {effectiveStudents.length === 0 ? (
          <div className="text-center py-4 text-xs text-slate-400">
            {tx('ยังไม่มีนักเรียนในระบบ', 'No students available')}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {effectiveStudents.map((st) => {
              const isSelected = selectedStudentIds.includes(st.id);
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleToggleStudent(st.id)}
                  className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-500/80 text-blue-950 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-3" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate leading-tight">
                      {st.nickname}
                    </div>
                    {st.fullName && (
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {st.fullName}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Chips of Selected Students */}
      {selectedStudentIds.length > 0 && (
        <div className="text-[11px] text-slate-600 flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-slate-700">รายชื่อในคาบนี้:</span>
          {selectedStudentIds.map((id) => {
            const st = students.find((s) => s.id === id);
            return (
              <span
                key={id}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md inline-flex items-center gap-1 font-medium transition-colors"
              >
                <span>{st?.nickname || 'นร.'}</span>
                <button
                  type="button"
                  onClick={() => handleToggleStudent(id)}
                  className="hover:text-red-600 cursor-pointer"
                  title="นำออกจากคาบนี้"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};
