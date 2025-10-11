"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

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

interface CourseCardProps {
    course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
    return (
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group py-0">
            <CardContent className="p-5">
                <div className="relative overflow-hidden rounded-lg mb-5">
                    <Image
                        width={400}
                        height={250}
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {course.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                        {course.description}
                    </p>

                    <div className="flex items-center mt-4">
                        <Image
                            width={40}
                            height={40}
                            src={course.instructor.avatar}
                            alt={course.instructor.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-800">
                            {course.instructor.name}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
