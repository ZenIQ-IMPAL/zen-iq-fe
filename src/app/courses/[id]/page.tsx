"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useParams } from "next/navigation";
import { HeaderSection } from "@/components/section/course-detail/header-section";
import { VideoSection } from "@/components/section/course-detail/video-section/";
import { LessonsList } from "@/components/section/course-detail/lesson-list";

interface Lesson {
  id: number;
  title: string;
  description: string[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Intro to AWS & Certification Path",
    description: ["What is AWS?", "Why become a Certified Solutions Architect?"],
  },
  {
    id: 2,
    title: "Understanding AWS Global Infrastructure",
    description: ["Regions, Availability Zones, and Edge Locations"],
  },
];

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id;

  return (
    <>
      <Navbar />
      <div className="custom-container max-w-7xl mx-auto mt-[99px] mb-[99px]">
        <HeaderSection />
        <div className="flex flex-col lg:flex-row gap-8">
          <VideoSection />
          <div className="w-full lg:w-1/3">
            <LessonsList lessons={lessons} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
