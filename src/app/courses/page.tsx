"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeaderSection } from "@/components/section/courses/header-section";
import { FilterSection } from "@/components/section/courses/filter-section";
import { CourseGridSection } from "@/components/section/courses/course-grid-section";
import { PaginationSection } from "@/components/section/courses/pagination-section";

interface Instructor {
  name: string;
  avatar: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  instructor: Instructor;
}

const coursesData: Course[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: "AWS Certified Solutions Architect",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
  image: "/images/img-courses.png",
  instructor: { name: "Lina", avatar: "/api/placeholder/40/401" },
}));

export default function CourseGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(coursesData.length / coursesPerPage);
  const [filter, setFilter] = useState("New Courses");

  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = coursesData.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  return (
    <>
      <Navbar />
      <section className="w-full custom-container p-[99px]">
        <HeaderSection />
        <FilterSection filter={filter} setFilter={setFilter} />
        <CourseGridSection courses={currentCourses} />
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </section>
      <Footer />
    </>
  );
}
