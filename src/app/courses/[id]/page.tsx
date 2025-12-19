"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useParams } from "next/navigation";
import { HeaderSection } from "@/components/section/course-detail/header-section";
import { VideoSection } from "@/components/section/course-detail/video-section/";
import { LessonsList } from "@/components/section/course-detail/lesson-list";
import { API_BASE_URL } from "@/lib/api/config";

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

export default function CourseDetail() {
    const params = useParams();
    const courseId = params.id;

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(
                    `${API_BASE_URL}/api/courses/${courseId}`,
                    {
                        credentials: "include",
                    },
                );

                if (!res.ok)
                    throw new Error(`HTTP error! Status: ${res.status}`);
                const json = await res.json();
                setCourse(json.data);
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId]);

    if (loading)
        return (
            <div className="custom-container mx-auto mt-[99px]">Loading...</div>
        );
    if (!course)
        return (
            <div className="custom-container mx-auto mt-[99px]">
                Course not found.
            </div>
        );

    // Flatten modules into lessons with number IDs
    let lessonId = 1;

    const lessons = course.modules
        .sort((a, b) => a.order_sequence - b.order_sequence)
        .flatMap((module) =>
            module.content
                .sort((a, b) => a.order_sequence - b.order_sequence)
                .map((content) => ({
                    id: lessonId++,
                    title: content.content_title,
                    description: [content.content_description],
                    videoUrl: content.video_url,
                })),
        );

    return (
        <>
            <Navbar />
            <div className="custom-container mx-auto mt-[99px] mb-[99px]">
                <HeaderSection title={course.title} />
                <div className="flex flex-col lg:flex-row gap-8">
                    <VideoSection videoUrl={lessons[0]?.videoUrl} />
                    <div className="w-full lg:w-1/3">
                        <LessonsList lessons={lessons} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
