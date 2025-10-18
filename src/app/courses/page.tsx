"use client";

import { useState } from "react";
import { CourseCard } from "@/components/course-card"; 
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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

  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = coursesData.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  return (
    <>
    <Navbar/>
    <section className="w-full custom-container py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold mb-2">
          Find Your Favorite Course
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          A modern e-learning platform designed to help you understand deeply,
          learn faster, and reach your goals with confidence.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
        <input
          type="text"
          placeholder="Find your favorite course"
          className="w-full md:w-1/2 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="w-full md:w-1/4 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>New Courses</option>
          <option>Popular</option>
          <option>Top Rated</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 border rounded-lg text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
    <Footer/>
    </>
  );
}
