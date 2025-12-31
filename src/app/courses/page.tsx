"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeaderSection } from "@/components/section/courses/header-section";
import { FilterSection } from "@/components/section/courses/filter-section";
import { CourseGridSection } from "@/components/section/courses/course-grid-section";
import { PaginationSection } from "@/components/section/courses/pagination-section";
import { API_BASE_URL } from "@/lib/api/config";

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
    rating?: number;
    created_at?: string;
    is_free?: boolean;
}

export default function CourseGrid() {
    const [coursesData, setCoursesData] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState("New Courses");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); // ✅ loading state
    const coursesPerPage = 6;

    // Reset to first page when search input changes
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // Fetch courses based on filter
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true); // start loading
            try {
                let url = "";
                if (filter === "New Courses") {
                    url = `${API_BASE_URL}/api/courses`;
                } else if (filter === "Recommended") {
                    url = `${API_BASE_URL}/api/recommendations`;
                }

                const res = await fetch(url);
                if (!res.ok)
                    throw new Error(`HTTP error! Status: ${res.status}`);

                const json = await res.json();
                if (!json?.data || !Array.isArray(json.data)) {
                    console.error("Invalid API response format:", json);
                    setCoursesData([]);
                    return;
                }

                const formatted: Course[] = json.data.map((course: any) => ({
                    id: course.id,
                    title: course.title,
                    description: course.description,
                    image: course.thumbnail_url,
                    instructor: {
                        name: course.instructor.name,
                        avatar: course.instructor.avatar_url,
                    },
                    rating: Math.floor(Math.random() * 5) + 1,
                    created_at: course.created_at,
                    is_free: course.is_free,
                }));

                if (filter === "New Courses") {
                    formatted.sort((a, b) => {
                        const dateA = new Date(a.created_at ?? "").getTime();
                        const dateB = new Date(b.created_at ?? "").getTime();
                        return dateB - dateA;
                    });
                }

                setCoursesData(formatted);
                setCurrentPage(1);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false); // stop loading
            }
        };

        fetchCourses();
    }, [filter]);

    // Filter by search input
    const filteredCourses = coursesData.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase()),
    );

    // Pagination
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const startIndex = (currentPage - 1) * coursesPerPage;
    const currentCourses = filteredCourses.slice(
        startIndex,
        startIndex + coursesPerPage,
    );

    return (
        <>
            <Navbar />
            <section className="w-full custom-container p-[99px]">
                <HeaderSection />
                <FilterSection
                    filter={filter}
                    setFilter={setFilter}
                    search={search}
                    setSearch={setSearch}
                />

                {loading ? (
                    <div className="text-center py-20 text-gray-500">
                        Loading courses...
                    </div>
                ) : currentCourses.length > 0 ? (
                    <>
                        <CourseGridSection courses={currentCourses} />
                        <PaginationSection
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        No courses found.
                    </div>
                )}
            </section>
            <Footer />
        </>
    );
}
