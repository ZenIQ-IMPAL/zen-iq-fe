import { CourseCard } from "@/components/course-card";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    avatar: string;
  };
}

interface CourseGridSectionProps {
  courses: Course[];
}

export function CourseGridSection({ courses }: CourseGridSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
