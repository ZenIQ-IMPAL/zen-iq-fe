"use client";
import { useRouter } from "next/navigation";

const progressCourses = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    image: "/images/img-courses.png",
    progress: 70,
  },
];

export default function LearningProgressPage() {
  const router = useRouter();

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {progressCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-t-xl w-full object-cover h-40"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium text-gray-800">{course.title}</h3>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-[var(--primary)] h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <button
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
