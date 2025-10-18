"use client";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Lesson {
  id: number;
  title: string;
  description: string[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Intro to AWS & Certification Path",
    description: [
      "What is AWS?",
      "Why become a Certified Solutions Architect?",
    ],
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

  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const toggleLesson = (id: number) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">
          AWS Certified Solutions Architect
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Video Section */}
          <div className="flex-1">
            <video
              controls
              className="w-full h-[400px] rounded-lg shadow-md bg-black"
            >
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Course Content */}
          <div className="w-full lg:w-1/3">
            <div className="divide-y divide-[#F5F5F5] w-[387px] rounded-md border border-[#F5F5F5] shadow-[0px_2px_4px_2px_rgba(0,0,0,0.05)] bg-white overflow-hidden">
              {/* Header inside the box */}
              <div className="bg-white px-4 py-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  Course Content
                </h2>
              </div>

              {/* Lessons*/}
              <div className="divide-y divide-[#F5F5F5]">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-start gap-3 px-4 py-4 bg-white"
                  >
                    <Checkbox
                      id={`lesson-${lesson.id}`}
                      checked={completedLessons.includes(lesson.id)}
                      onCheckedChange={() => toggleLesson(lesson.id)}
                      className="mt-1"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {lesson.title}
                      </h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                        {lesson.description.map((desc, i) => (
                          <li key={i}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
