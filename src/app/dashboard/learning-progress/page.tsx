"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api/config";

interface LearningProgressCourse {
  course_id: string;
  title: string;
  image: string;
  progress: number;
  completed_content: string;
  total_content: string;
}


export default function LearningProgressPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<LearningProgressCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/learning-progress/me`,
          {
            headers: getAuthHeaders(),
            credentials: "include",
          }
        );

        const json = await res.json();
        setCourses(json?.data || []);
      } catch (error) {
        console.error("Failed to fetch learning progress", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return <div className="px-8 py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white rounded-tl-3xl overflow-hidden">
      {/* Header */}
      <div
        className="px-8 py-6 mb-8"
        style={{ backgroundColor: "var(--color-sidebar-background)" }}
      >
        <h1 className="text-2xl font-semibold text-[var(--color-dark-blue-zen-ia2)]">
          Learning Progress
        </h1>
      </div>

      {/* Course Cards */}
      <div className="px-8 pb-10">
        {courses.length === 0 ? (
          <div className="text-gray-500">No enrolled courses yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map((course) => {
              const completed = Number(course.completed_content);
              const total = Number(course.total_content);

              return (
                <div
                  key={course.course_id}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                >
                  <img
                    src={course.image}
                    alt={course.title}
                    className="rounded-t-xl w-full object-cover h-40"
                  />

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-medium text-gray-800">
                      {course.title}
                    </h3>

                    {/* Progress info */}
                    <p className="text-sm text-gray-500 mt-2">
                      {completed} / {total} lessons completed
                    </p>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                      <div
                        className="bg-[var(--primary)] h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <button
                      onClick={() =>
                        router.push(`/courses/${course.course_id}`)
                      }
                      className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
