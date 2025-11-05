"use client";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";

interface Instructor {
    name: string;
    avatar: string;
}

interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    instructor: Instructor;
}

interface CourseSectionProps {
    title: string;
    courses: Course[];
    onSeeAll: () => void;
}

const freeCourses: Course[] = [
    {
        id: "1",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
    {
        id: "2",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
    {
        id: "3",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
    {
        id: "4",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
];

const popularCourses: Course[] = [
    {
        id: "1",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
    {
        id: "2",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
    {
        id: "3",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
    {
        id: "4",
        title: "AWS Certified solutions Architect",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        image: "/images/img-courses.png",
        instructor: {
            name: "Lina",
            avatar: "/api/placeholder/40/40",
        },
    },
];

const CourseSection = ({ title, courses, onSeeAll }: CourseSectionProps) => {
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
                {courses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export const ExploreCourseSection = () => {
    const handleSeeAllFree = () => {
        console.log("Navigate to all free courses");
    };
    const handleSeeAllPopular = () => {
        console.log("Navigate to all popular courses");
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
                onSeeAll={handleSeeAllFree}
            />
            <CourseSection
                title="Popular Courses"
                courses={popularCourses}
                onSeeAll={handleSeeAllPopular}
            />
        </section>
    );
};
