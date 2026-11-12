import React, { useState, useMemo } from 'react';
import { Course, Topic, Subtopic } from '../../types';
import { MathText } from '../ui/MathText';
import { useLanguage } from '../../context/LanguageContext';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Search,
  CornerDownRight,
  ListTree,
  CheckCheck,
  X,
} from 'lucide-react';

export interface FlattenedSubtopicItem {
  sub: Subtopic;
  level: 1 | 2 | 3 | 4;
  numbering: string;
  parentName?: string;
  hasChildren: boolean;
  childCount: number;
  childIds: string[];
  parentChain: string[];
}

export const getOrganizedSubtopicsList = (topic: Topic, topicIdx: number): FlattenedSubtopicItem[] => {
  const result: FlattenedSubtopicItem[] = [];
  const subs = topic.subtopics || [];
  const visited = new Set<string>();

  // Precalculate direct children map
  const childrenMap = new Map<string, Subtopic[]>();
  subs.forEach((s) => {
    if (s.parentId) {
      const list = childrenMap.get(s.parentId) || [];
      list.push(s);
      childrenMap.set(s.parentId, list);
    }
  });

  // Helper to get all descendant IDs
  const getAllDescendantIds = (parentId: string): string[] => {
    const direct = childrenMap.get(parentId) || [];
    const descIds: string[] = [];
    direct.forEach((d) => {
      descIds.push(d.id);
      descIds.push(...getAllDescendantIds(d.id));
    });
    return descIds;
  };

  // 1. Level 1 items
  const level1Items = subs.filter((s) => !s.parentId || s.level === 1);

  level1Items.forEach((l1, i) => {
    visited.add(l1.id);
    const num1 = `${topicIdx + 1}.${i + 1}`;
    const l1Children = childrenMap.get(l1.id) || [];
    const allDescIds = getAllDescendantIds(l1.id);

    result.push({
      sub: l1,
      level: 1,
      numbering: num1,
      hasChildren: l1Children.length > 0,
      childCount: allDescIds.length,
      childIds: allDescIds,
      parentChain: [],
    });

    // 2. Level 2 items under l1
    const level2Items = subs.filter((s) => s.parentId === l1.id || (s.level === 2 && s.parentId === l1.id));
    level2Items.forEach((l2, j) => {
      visited.add(l2.id);
      const num2 = `${num1}.${j + 1}`;
      const l2Children = childrenMap.get(l2.id) || [];
      const l2DescIds = getAllDescendantIds(l2.id);

      result.push({
        sub: l2,
        level: 2,
        numbering: num2,
        parentName: l1.name,
        hasChildren: l2Children.length > 0,
        childCount: l2DescIds.length,
        childIds: l2DescIds,
        parentChain: [l1.id],
      });

      // 3. Level 3 items under l2
      const level3Items = subs.filter((s) => s.parentId === l2.id || (s.level === 3 && s.parentId === l2.id));
      level3Items.forEach((l3, k) => {
        visited.add(l3.id);
        const num3 = `${num2}.${k + 1}`;
        const l3Children = childrenMap.get(l3.id) || [];
        const l3DescIds = getAllDescendantIds(l3.id);

        result.push({
          sub: l3,
          level: 3,
          numbering: num3,
          parentName: l2.name,
          hasChildren: l3Children.length > 0,
          childCount: l3DescIds.length,
          childIds: l3DescIds,
          parentChain: [l1.id, l2.id],
        });

        // 4. Level 4 items under l3
        const level4Items = subs.filter((s) => s.parentId === l3.id || (s.level === 4 && s.parentId === l3.id));
        level4Items.forEach((l4, m) => {
          visited.add(l4.id);
          const num4 = `${num3}.${m + 1}`;
          result.push({
            sub: l4,
            level: 4,
            numbering: num4,
            parentName: l3.name,
            hasChildren: false,
            childCount: 0,
            childIds: [],
            parentChain: [l1.id, l2.id, l3.id],
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
        hasChildren: false,
        childCount: 0,
        childIds: [],
        parentChain: [],
      });
    }
  });

  return result;
};

interface HierarchicalTopicSelectorProps {
  course?: Course | null;
  selectedSubtopicIds: string[];
  onChange: (selectedIds: string[]) => void;
  maxHeight?: string;
}

export const HierarchicalTopicSelector: React.FC<HierarchicalTopicSelectorProps> = ({
  course,
  selectedSubtopicIds,
  onChange,
  maxHeight = 'max-h-72',
}) => {
  const { tx } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicIds, setExpandedTopicIds] = useState<string[]>(() => {
    // Expand all topics by default
    return (course?.topics || []).map((t) => t.id);
  });
  const [expandedSubIds, setExpandedSubIds] = useState<string[]>(() => {
    // Expand all level 1 subtopics by default so hierarchy is visible immediately
    const l1Ids: string[] = [];
    (course?.topics || []).forEach((t) => {
      (t.subtopics || []).forEach((s) => {
        if (!s.parentId || s.level === 1) {
          l1Ids.push(s.id);
        }
      });
    });
    return l1Ids;
  });

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopicIds((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const toggleSubExpand = (subId: string) => {
    setExpandedSubIds((prev) =>
      prev.includes(subId) ? prev.filter((id) => id !== subId) : [...prev, subId]
    );
  };

  const expandAll = () => {
    const allTopicIds = (course?.topics || []).map((t) => t.id);
    const allSubIds: string[] = [];
    (course?.topics || []).forEach((t) => {
      (t.subtopics || []).forEach((s) => allSubIds.push(s.id));
    });
    setExpandedTopicIds(allTopicIds);
    setExpandedSubIds(allSubIds);
  };

  const collapseAll = () => {
    setExpandedTopicIds([]);
    setExpandedSubIds([]);
  };

  // Toggle single subtopic
  const handleToggleSingle = (id: string) => {
    if (selectedSubtopicIds.includes(id)) {
      onChange(selectedSubtopicIds.filter((item) => item !== id));
    } else {
      onChange([...selectedSubtopicIds, id]);
    }
  };

  // Select/Deselect all under a topic
  const handleToggleTopicAll = (topic: Topic) => {
    const topicSubIds = (topic.subtopics || []).map((s) => s.id);
    if (topicSubIds.length === 0) return;

    const allSelected = topicSubIds.every((id) => selectedSubtopicIds.includes(id));
    if (allSelected) {
      onChange(selectedSubtopicIds.filter((id) => !topicSubIds.includes(id)));
    } else {
      const nextSet = new Set([...selectedSubtopicIds, ...topicSubIds]);
      onChange(Array.from(nextSet));
    }
  };

  // Select/Deselect item and all its descendants
  const handleToggleWithDescendants = (item: FlattenedSubtopicItem) => {
    const targetIds = [item.sub.id, ...item.childIds];
    const allSelected = targetIds.every((id) => selectedSubtopicIds.includes(id));

    if (allSelected) {
      onChange(selectedSubtopicIds.filter((id) => !targetIds.includes(id)));
    } else {
      const nextSet = new Set([...selectedSubtopicIds, ...targetIds]);
      onChange(Array.from(nextSet));
    }
  };

  const topics = course?.topics || [];

  // Filtered topics based on search
  const filteredTopics = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return topics;

    return topics
      .map((topic) => {
        const topicMatches = topic.name.toLowerCase().includes(query);
        const matchingSubs = (topic.subtopics || []).filter((s) =>
          s.name.toLowerCase().includes(query)
        );

        if (topicMatches) {
          return topic;
        }

        if (matchingSubs.length > 0) {
          return {
            ...topic,
            // Keep matching subs plus any of their parents so hierarchy doesn't break
            subtopics: topic.subtopics,
          };
        }

        return null;
      })
      .filter(Boolean) as Topic[];
  }, [topics, searchQuery]);

  return (
    <div className="space-y-2 text-xs">
      {/* Top Controls: Search & Quick Actions */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[160px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tx('ค้นหาบทเรียน หรือ หัวข้อย่อย...', 'Search chapters or subtopics...')}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:bg-white transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[11px]">
          <button
            type="button"
            onClick={expandAll}
            className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {tx('ขยายทั้งหมด', 'Expand all')}
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {tx('ยุบทั้งหมด', 'Collapse all')}
          </button>
          {selectedSubtopicIds.length > 0 && (
            <>
              <span className="text-slate-300">|</span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="px-2 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                {tx('ล้างที่เลือก', 'Clear selection')} ({selectedSubtopicIds.length})
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Hierarchy Container */}
      <div
        className={`overflow-y-auto border border-amber-200/90 bg-white rounded-2xl p-2.5 space-y-2.5 shadow-2xs ${maxHeight}`}
      >
        {filteredTopics.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400 space-y-1">
            <ListTree className="w-6 h-6 mx-auto text-slate-300 mb-1" />
            <p>
              {searchQuery
                ? tx('ไม่พบหัวข้อที่ตรงกับคำค้นหา', 'No topics matched your search')
                : tx('คอร์สนี้ยังไม่มีการจัดสารบัญเนื้อหา', 'No syllabus topics defined for this course yet')}
            </p>
          </div>
        ) : (
          filteredTopics.map((topic, topicIdx) => {
            const isTopicExpanded = expandedTopicIds.includes(topic.id) || Boolean(searchQuery);
            const organizedSubs = getOrganizedSubtopicsList(topic, topicIdx);
            const topicSubIds = (topic.subtopics || []).map((s) => s.id);
            const selectedInTopic = topicSubIds.filter((id) => selectedSubtopicIds.includes(id)).length;
            const isAllTopicSelected = topicSubIds.length > 0 && selectedInTopic === topicSubIds.length;

            return (
              <div
                key={topic.id}
                className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/40 transition-colors"
              >
                {/* Topic / Chapter Header (Level 0) */}
                <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-100/80 border-b border-slate-200/60 select-none">
                  <div
                    onClick={() => toggleTopicExpand(topic.id)}
                    className="flex items-center gap-2 cursor-pointer flex-1 min-w-0"
                  >
                    <button
                      type="button"
                      className="p-0.5 text-slate-500 hover:text-slate-800 rounded transition-colors"
                    >
                      {isTopicExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <span className="w-5 h-5 rounded-md bg-blue-900 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                      {topic.sortOrder || topicIdx + 1}
                    </span>
                    <span className="font-bold text-slate-900 text-xs truncate">
                      <MathText text={topic.name} />
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium shrink-0">
                      ({topicSubIds.length} {tx('หัวข้อย่อย', 'subtopics')})
                    </span>
                  </div>

                  {/* Topic Select All Quick Button */}
                  {topicSubIds.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleToggleTopicAll(topic)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isAllTopicSelected
                          ? 'bg-blue-900 text-white shadow-2xs'
                          : selectedInTopic > 0
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                      title={tx('เลือกทุกข้อย่อยในบทนี้', 'Select all subtopics in this chapter')}
                    >
                      <CheckCheck className="w-3 h-3" />
                      <span>
                        {isAllTopicSelected
                          ? tx('เลือกครบทั้งบท', 'All selected')
                          : selectedInTopic > 0
                          ? `${selectedInTopic}/${topicSubIds.length}`
                          : tx('เลือกทั้งบท', 'Select chapter')}
                      </span>
                    </button>
                  )}
                </div>

                {/* Subtopics List (Hierarchical Tree) */}
                {isTopicExpanded && (
                  <div className="p-2 space-y-1.5 bg-white">
                    {organizedSubs.length === 0 ? (
                      <p className="text-slate-400 text-[11px] italic py-2 pl-6">
                        {tx('ยังไม่มีหัวข้อย่อยในบทนี้', 'No subtopics in this chapter')}
                      </p>
                    ) : (
                      organizedSubs.map((item) => {
                        const { sub, level, numbering, hasChildren, childCount, parentChain } = item;

                        // If any ancestor in parentChain is collapsed (and user is not searching), hide this child
                        const isHiddenByParent =
                          !searchQuery &&
                          parentChain.some((parentId) => !expandedSubIds.includes(parentId));
                        if (isHiddenByParent) return null;

                        const isSelected = selectedSubtopicIds.includes(sub.id);
                        const isSubExpanded = expandedSubIds.includes(sub.id) || Boolean(searchQuery);

                        // Styling per level matching SyllabusManager standard
                        const levelStyles = {
                          1: 'bg-white border-slate-200/90 text-slate-900 font-semibold',
                          2: 'bg-amber-50/40 border-amber-200/80 text-amber-950 ml-3 sm:ml-5 font-medium',
                          3: 'bg-purple-50/30 border-purple-200/80 text-purple-950 ml-6 sm:ml-9 font-normal',
                          4: 'bg-indigo-50/40 border-indigo-200/80 text-indigo-950 ml-9 sm:ml-12 font-normal',
                        }[level];

                        const badgeStyles = {
                          1: 'bg-slate-100 text-slate-700 border-slate-300',
                          2: 'bg-amber-100 text-amber-800 border-amber-200',
                          3: 'bg-purple-100 text-purple-800 border-purple-200',
                          4: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                        }[level];

                        return (
                          <div
                            key={sub.id}
                            className={`p-2 rounded-xl border transition-all flex items-start justify-between gap-2 shadow-2xs group hover:border-blue-400 ${levelStyles} ${
                              isSelected ? 'ring-1.5 ring-blue-500 bg-blue-50/40 border-blue-400' : ''
                            }`}
                          >
                            <div className="flex items-start gap-2 flex-1 min-w-0">
                              {/* Branch Icon for indented levels */}
                              {level > 1 && (
                                <CornerDownRight className="w-3.5 h-3.5 text-slate-400 mt-1 shrink-0" />
                              )}

                              {/* Accordion Expand/Collapse button for parents */}
                              {hasChildren ? (
                                <button
                                  type="button"
                                  onClick={() => toggleSubExpand(sub.id)}
                                  className="p-0.5 text-slate-400 hover:text-slate-700 rounded transition-colors mt-0.5"
                                  title={isSubExpanded ? tx('ยุบหัวข้อย่อย', 'Collapse') : tx('ขยายหัวข้อย่อย', 'Expand')}
                                >
                                  {isSubExpanded ? (
                                    <ChevronDown className="w-3.5 h-3.5 text-blue-800 font-bold" />
                                  ) : (
                                    <ChevronRight className="w-3.5 h-3.5 text-slate-500 font-bold" />
                                  )}
                                </button>
                              ) : (
                                <span className="w-3.5 h-3.5 shrink-0 inline-block" />
                              )}

                              {/* Checkbox trigger for single selection */}
                              <button
                                type="button"
                                onClick={() => handleToggleSingle(sub.id)}
                                className={`w-4 h-4 rounded mt-0.5 shrink-0 flex items-center justify-center border transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-blue-900 border-blue-900 text-white shadow-2xs'
                                    : 'border-slate-300 bg-white hover:border-blue-500'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </button>

                              {/* Numbering Pill */}
                              <span
                                className={`px-1.5 py-0.2 rounded font-mono text-[10px] font-bold border shrink-0 ${badgeStyles}`}
                              >
                                {numbering}
                              </span>

                              {/* Subtopic Name */}
                              <div
                                onClick={() => handleToggleSingle(sub.id)}
                                className="cursor-pointer leading-snug flex-1 select-none pt-0.5"
                              >
                                <MathText text={sub.name.replace(/^\d+(\.\d+)+\s*/, '')} />
                                {hasChildren && (
                                  <span className="text-[10px] text-slate-400 ml-1.5 font-normal">
                                    ({childCount} {tx('ข้อย่อยภายใน', 'sub-items')})
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Quick Select All Descendants button if item has children */}
                            {hasChildren && (
                              <button
                                type="button"
                                onClick={() => handleToggleWithDescendants(item)}
                                className="text-[10px] text-blue-700 hover:text-blue-900 hover:underline shrink-0 font-medium px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                                title={tx('เลือก/ยกเลิกหัวข้อนี้พร้อมข้อย่อยทั้งหมด', 'Select all with sub-items')}
                              >
                                + {tx('เลือกลูกทั้งหมด', 'All children')}
                              </button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
