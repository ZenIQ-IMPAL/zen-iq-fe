"use client";

import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Import shadcn components
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-8 mt-[100px]">
          <Input
            type="text"
            placeholder="Find your favorite course"
            className="
      w-full             /* full width on small */
      sm:w-[280px]       /* medium small devices */
      md:w-[319px]       /* desktop */
      h-[50px]
      border border-[#4F4F4F]
      rounded-[10px]
      placeholder:text-[#828282]
      focus:outline-none focus:ring-2 focus:ring-primary
      transition
    "
          />

          <Select value={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger
              className="
        w-full             /* full width on small */
        sm:w-[180px]       /* medium small devices */
        md:w-[212px]       /* desktop */
        h-[50px]
        min-h-[50px]
        border border-[#4F4F4F]
        rounded-[10px]
        px-4
        placeholder:text-[#828282]
        focus:outline-none focus:ring-2 focus:ring-primary
        transition
        opacity-100
        transform-none
      "
            >
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New Courses">New Courses</SelectItem>
              <SelectItem value="Popular">Popular</SelectItem>
              <SelectItem value="Top Rated">Top Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-10 gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="text-sm"
          >
            Prev
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              className="text-sm"
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="text-sm"
          >
            Next
          </Button>
        </div>
      </section>
      <Footer />
    </>
  );
}
