"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useParams } from "next/navigation";
import { HeaderSection } from "@/components/section/course-detail/header-section";
import { VideoSection } from "@/components/section/course-detail/video-section/";
import { LessonsList } from "@/components/section/course-detail/lesson-list";
import { API_BASE_URL, getAuthHeaders } from "@/lib/api/config";
import { useAuth } from "@/app/context/auth";
import { EnrollmentGate } from "@/components/section/course-detail/enrollment-gate";

// --- TYPES ---
interface Content {
  id: string;
  content_title: string;
  content_description: string;
  video_url: string;
  order_sequence: number;
}
interface Module {
  id: string;
  module_name: string;
  module_description: string;
  order_sequence: number;
  content: Content[];
}
interface Instructor {
  id: string;
  name: string;
  avatar_url: string;
  bio: string;
  email: string;
}
interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  category: string;
  difficulty_level: string;
  is_free: boolean;
  created_at: string;
  updated_at: string;
  instructor: Instructor;
  modules: Module[];
  total_modules: number;
  total_content: number;
}
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

// --- UTILS ---
const sortBySequence = <T extends { order_sequence: number }>(
  items: T[]
): T[] => [...items].sort((a, b) => a.order_sequence - b.order_sequence);

const flattenModulesToLessons = (modules: Module[]): Lesson[] => {
  let lessonId = 1;
  return sortBySequence(modules).flatMap((module) =>
    sortBySequence(module.content).map((content) => ({
      id: lessonId++,
      title: content.content_title,
      description: [content.content_description],
      videoUrl: content.video_url,
      moduleId: module.id,
    }))
  );
};

const transformModulesToGroups = (modules: Module[]): ModuleGroup[] => {
  let lessonId = 1;
  return sortBySequence(modules).map((module) => ({
    id: module.id,
    name: module.module_name,
    description: module.module_description,
    lessons: sortBySequence(module.content).map((content) => ({
      id: lessonId++,
      title: content.content_title,
      description: [content.content_description],
      videoUrl: content.video_url,
      moduleId: module.id,
    })),
  }));
};

// --- LOADING & NOT FOUND ---
const LoadingState = () => (
  <div className="custom-container mx-auto mt-[99px]">Loading...</div>
);
const NotFoundState = () => (
  <div className="custom-container mx-auto mt-[99px]">Course not found.</div>
);

// --- COURSE CONTENT ---
function CourseContent({ course }: { course: Course }) {
  const moduleGroups = transformModulesToGroups(course.modules);
  const flatLessons = flattenModulesToLessons(course.modules);
  const [selectedLessonId, setSelectedLessonId] = useState<number>(
    flatLessons[0]?.id || 1
  );
  const selectedLesson = flatLessons.find((l) => l.id === selectedLessonId);
  const currentVideoUrl =
    selectedLesson?.videoUrl || flatLessons[0]?.videoUrl || "";

  return (
    <>
      <HeaderSection title={course.title} />
      <div className="flex flex-col lg:flex-row gap-8">
        <VideoSection videoUrl={currentVideoUrl} />
        <div className="w-full lg:w-1/3">
          <LessonsList
            modules={moduleGroups}
            selectedLessonId={selectedLessonId}
            onLessonClick={setSelectedLessonId}
          />
        </div>
      </div>
    </>
  );
}

// --- COURSE DETAIL PAGE ---
export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id;
  const { user, loading: authLoading } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Fetch course
  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/courses/${courseId}`, {
          headers: getAuthHeaders(),
          credentials: "include" as RequestCredentials,
        });
        const json = await res.json();
        setCourse(json?.data || null);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    courseId && fetchCourse();
  }, [courseId]);

  // Check enrollment
  useEffect(() => {
    if (!user || !courseId) return;
    const checkEnrollment = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/enrollments/me`, {
          headers: getAuthHeaders(),
          credentials: "include" as RequestCredentials,
        });
        const json = await res.json();
        const enrolled = json?.data?.some((e: any) => e.course_id === courseId);
        setIsEnrolled(enrolled);
      } catch {
        setIsEnrolled(false);
      }
    };
    checkEnrollment();
  }, [user, courseId]);

  const isLoading = loading || authLoading;
  const hasNoCourse = !loading && !course;

  return (
    <>
      <Navbar />
      <div className="custom-container mx-auto mt-[99px] mb-[99px] relative">
        {isLoading && <LoadingState />}
        {hasNoCourse && <NotFoundState />}
        {course && (
          <>
            <div className={!isEnrolled ? "pointer-events-none blur-sm" : ""}>
              <CourseContent course={course} />
            </div>
            {!isEnrolled && (
              <EnrollmentGate
                courseId={course.id}
                onEnrolled={() => setIsEnrolled(true)}
              />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
