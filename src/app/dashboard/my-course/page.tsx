"use client";
import { useRouter } from "next/navigation";

const courses = Array(8).fill({
  id: 1,
  title: "AWS Certified Solutions Architect",
  image: "/images/img-courses.png",
});

export default function MyCoursePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white rounded-tl-3xl overflow-hidden">
      {/* Header */}
      <div
        className="px-8 py-6 mb-8"
        style={{ backgroundColor: "var(--color-sidebar-background)" }}
      >
        <h1 className="text-2xl font-semibold text-[var(--color-dark-blue-zen-ia2)]">
          Course List
        </h1>
      </div>

      {/* Course Cards */}
      <div className="px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              <img
                src={course.image}
                alt={course.title}
                className="rounded-t-xl w-full object-cover h-40"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-medium text-gray-800 flex-1">
                  {course.title}
                </h3>
                <button
                  onClick={() => router.push(`/courses/${course.id}`)}
                  className="mt-4 bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
                >
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
