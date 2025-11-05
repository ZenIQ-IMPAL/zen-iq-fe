"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface Lesson {
  id: number;
  title: string;
  description: string[];
}

interface LessonsListProps {
  lessons: Lesson[];
}

export function LessonsList({ lessons }: LessonsListProps) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const toggleLesson = (id: number) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  if (!lessons || lessons.length === 0) {
    return <></>;
  }

  return (
    <div className="divide-y divide-[#F5F5F5] w-full max-w-[387px] rounded-md border border-[#F5F5F5] shadow-[0px_2px_4px_2px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
      {/* Header inside the box */}
      <div className="bg-white px-4 py-3">
        <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
      </div>

      {/* Lessons */}
      <div className="divide-y divide-[#F5F5F5]">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex items-start gap-3 px-4 py-4 bg-white"
          >
            <Checkbox
              id={`lesson-${lesson.id}`}
              checked={completedLessons.includes(lesson.id)}
              onCheckedChange={() => toggleLesson(lesson.id)}
              className="mt-1"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-base">
                {lesson.title}
              </h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                {lesson.description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
