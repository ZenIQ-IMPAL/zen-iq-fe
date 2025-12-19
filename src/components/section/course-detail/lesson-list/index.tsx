"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, ChevronDown, ChevronUp } from "lucide-react";

interface Lesson {
    id: number;
    title: string;
    description: string[];
    videoUrl: string;
    moduleId: string;
}

interface ModuleGroup {
    id: string;
    name: string;
    description: string;
    lessons: Lesson[];
}

interface LessonsListProps {
    modules: ModuleGroup[];
    selectedLessonId: number;
    onLessonClick: (lessonId: number) => void;
}

export function LessonsList({
    modules,
    selectedLessonId,
    onLessonClick,
}: LessonsListProps) {
    const [completedLessons, setCompletedLessons] = useState<number[]>([]);
    const [expandedModules, setExpandedModules] = useState<string[]>(
        modules.map((m) => m.id)
    );

    const toggleLesson = (id: number) => {
        setCompletedLessons((prev) =>
            prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
        );
    };

    const toggleModule = (moduleId: string) => {
        setExpandedModules((prev) =>
            prev.includes(moduleId)
                ? prev.filter((id) => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const isModuleExpanded = (moduleId: string) => expandedModules.includes(moduleId);

    const renderLesson = (lesson: Lesson) => {
        const isSelected = selectedLessonId === lesson.id;
        const isCompleted = completedLessons.includes(lesson.id);

        const containerClasses = [
            "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50",
            isSelected ? "bg-blue-50 border-l-4 border-blue-600" : "bg-white",
        ].join(" ");

        return (
            <div
                key={lesson.id}
                className={containerClasses}
                onClick={() => onLessonClick(lesson.id)}
            >
                <Checkbox
                    id={`lesson-${lesson.id}`}
                    checked={isCompleted}
                    onCheckedChange={() => toggleLesson(lesson.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        {isSelected && (
                            <Play className="w-4 h-4 text-blue-600 fill-blue-600 flex-shrink-0" />
                        )}
                        <h3 className="font-semibold text-gray-900 text-sm">
                            {lesson.title}
                        </h3>
                    </div>
                    <ul className="list-disc list-inside text-xs text-muted-foreground mt-1">
                        {lesson.description.map((desc, i) => (
                            <li key={i} className="truncate">{desc}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    const renderModule = (module: ModuleGroup, index: number) => {
        const isExpanded = isModuleExpanded(module.id);
        const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;
        const lessonCount = module.lessons.length;

        return (
            <div key={module.id} className="border-b border-[#F5F5F5] last:border-b-0">
                <div
                    className="px-4 py-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
                    onClick={() => toggleModule(module.id)}
                >
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                Module {index + 1}
                            </span>
                            <h3 className="font-bold text-gray-900 text-sm truncate">
                                {module.name}
                            </h3>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {module.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            {lessonCount} {lessonCount === 1 ? "lesson" : "lessons"}
                        </p>
                    </div>
                    <ChevronIcon className="w-5 h-5 text-gray-600 flex-shrink-0 ml-2" />
                </div>

                {isExpanded && (
                    <div className="divide-y divide-[#F5F5F5]">
                        {module.lessons.map(renderLesson)}
                    </div>
                )}
            </div>
        );
    };

    const hasModules = modules && modules.length > 0;

    return hasModules ? (
        <div className="w-full max-w-[387px] rounded-md border border-[#F5F5F5] shadow-[0px_2px_4px_2px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
            <div className="bg-white px-4 py-3 border-b border-[#F5F5F5]">
                <h2 className="text-xl font-semibold text-gray-900">
                    Course Content
                </h2>
            </div>

            <div className="divide-y divide-[#F5F5F5]">
                {modules.map(renderModule)}
            </div>
        </div>
    ) : null;
}
