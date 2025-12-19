"use client";

import { useState, useEffect } from "react";
import { CourseCard } from "@/components/course-card";
import { CourseCardSkeleton } from "@/components/course-card/skeleton";
import { Button } from "@/components/ui/button";
import {
    getFreeCourses,
    getPopularCourses,
    type Course,
} from "@/lib/api/courses";

interface CourseSectionProps {
    title: string;
    courses: Course[];
    isLoading: boolean;
    onSeeAll: () => void;
}

const CourseSection = ({
    title,
    courses,
    isLoading,
    onSeeAll,
}: CourseSectionProps) => {
    return (
        <div className="mb-12 sm:mb-16">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {title}
                </h2>
                <Button
                    variant="link"
                    onClick={onSeeAll}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm sm:text-base"
                >
                    SEE ALL
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {isLoading ? (
                    <>
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                    </>
                ) : courses.length === 0 ? (
                    <div className="col-span-3 text-center py-12 text-gray-500">
                        No courses available
                    </div>
                ) : (
                    courses.slice(0, 3).map((course) => (
                        <CourseCard
                            key={course.id}
                            course={{
                                id: course.id,
                                title: course.title,
                                description: course.description || "",
                                image:
                                    course.thumbnail_url ||
                                    "/images/img-courses.png",
                                instructor: {
                                    name: course.instructor?.name || "Unknown",
                                    avatar:
                                        course.instructor?.avatar_url ||
                                        "/api/placeholder/40/40",
                                },
                                is_free: course.is_free,
                            }}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export const ExploreCourseSection = () => {
    const [freeCourses, setFreeCourses] = useState<Course[]>([]);
    const [popularCourses, setPopularCourses] = useState<Course[]>([]);
    const [isLoadingFree, setIsLoadingFree] = useState(true);
    const [isLoadingPopular, setIsLoadingPopular] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const [free, popular] = await Promise.all([
                getFreeCourses(3),
                getPopularCourses(3),
            ]);

            setFreeCourses(free);
            setPopularCourses(popular);
            setIsLoadingFree(false);
            setIsLoadingPopular(false);
        };

        fetchCourses();
    }, []);

    const handleSeeAllFree = () => {
        window.location.href = "/courses?filter=free";
    };

    const handleSeeAllPopular = () => {
        window.location.href = "/courses";
    };

    return (
        <section className="w-full custom-container py-16">
            <div className="text-center mb-12 sm:mb-16">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Explore Course
                </h1>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    A modern e-learning platform designed to help you understand
                    deeply, learn faster, and reach your goals with confidence.
                </p>
            </div>
            <CourseSection
                title="Free Courses"
                courses={freeCourses}
                isLoading={isLoadingFree}
                onSeeAll={handleSeeAllFree}
            />
            <CourseSection
                title="Popular Courses"
                courses={popularCourses}
                isLoading={isLoadingPopular}
                onSeeAll={handleSeeAllPopular}
            />
        </section>
    );
};
