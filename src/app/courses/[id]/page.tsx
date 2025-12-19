"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import { HeaderSection } from "@/components/section/course-detail/header-section";
import { VideoSection } from "@/components/section/course-detail/video-section/";
import { LessonsList } from "@/components/section/course-detail/lesson-list";
import { API_BASE_URL } from "@/lib/api/config";
import { useAuth } from "@/app/context/auth";
import { checkCourseAccess } from "@/lib/utils/access-control";

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

const sortBySequence = <T extends { order_sequence: number }>(items: T[]): T[] => {
    return [...items].sort((a, b) => a.order_sequence - b.order_sequence);
};

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

interface ModuleGroup {
    id: string;
    name: string;
    description: string;
    lessons: Lesson[];
}

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

const LoadingState = () => (
    <div className="custom-container mx-auto mt-[99px]">Loading...</div>
);

const NotFoundState = () => (
    <div className="custom-container mx-auto mt-[99px]">Course not found.</div>
);

const CourseContent = ({
    course,
}: {
    course: Course;
}) => {
    const moduleGroups = transformModulesToGroups(course.modules);
    const flatLessons = flattenModulesToLessons(course.modules);

    const [selectedLessonId, setSelectedLessonId] = useState<number>(
        flatLessons[0]?.id || 1
    );

    const selectedLesson = flatLessons.find((lesson) => lesson.id === selectedLessonId);
    const currentVideoUrl = selectedLesson?.videoUrl || flatLessons[0]?.videoUrl || "";

    const handleLessonClick = (lessonId: number) => {
        setSelectedLessonId(lessonId);
    };

    return (
        <>
            <HeaderSection title={course.title} />
            <div className="flex flex-col lg:flex-row gap-8">
                <VideoSection videoUrl={currentVideoUrl} />
                <div className="w-full lg:w-1/3">
                    <LessonsList
                        modules={moduleGroups}
                        selectedLessonId={selectedLessonId}
                        onLessonClick={handleLessonClick}
                    />
                </div>
            </div>
        </>
    );
};

export default function CourseDetail() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.id;
    const { user, loading: authLoading } = useAuth();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${API_BASE_URL}/api/courses/${courseId}`,
                    {
                        credentials: "include",
                    }
                );

                const isSuccess = res.ok;
                const json = isSuccess ? await res.json() : null;

                setCourse(json?.data || null);
            } catch (error) {
                console.error("Error fetching course details:", error);
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };

        courseId && fetchCourse();
    }, [courseId]);

    useEffect(() => {
        const bothDataReady = !loading && !authLoading && course;

        const performAccessCheck = () => {
            const accessResult = checkCourseAccess({
                isPremiumUser: user?.is_premium || false,
                isFreeCourse: course!.is_free,
            });

            const shouldRedirect = !accessResult.canAccess;
            shouldRedirect && router.replace("/courses");
        };

        bothDataReady && performAccessCheck();
    }, [course, user, loading, authLoading, router]);

    const isLoading = loading || authLoading;
    const hasNoCourse = !loading && !course;
    const hasCourse = !loading && course;

    const getAccessPermission = () => {
        if (!hasCourse) return false;

        return checkCourseAccess({
            isPremiumUser: user?.is_premium || false,
            isFreeCourse: course!.is_free,
        }).canAccess;
    };

    const canAccess = getAccessPermission();

    const renderState = () => {
        if (isLoading) return <LoadingState />;
        if (hasNoCourse) return <NotFoundState />;
        if (hasCourse && canAccess) return <CourseContent course={course!} />;
        if (hasCourse && !canAccess) return null;

        return <LoadingState />;
    };

    return (
        <>
            <Navbar />
            <div className="custom-container mx-auto mt-[99px] mb-[99px]">
                {renderState()}
            </div>
            <Footer />
        </>
    );
}
