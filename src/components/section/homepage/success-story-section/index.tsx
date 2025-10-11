"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Gloria Rose",
        rating: 4,
        text: "ZenIQ completely changed the way I learn online. The courses are comprehensive, the platform is easy to use, the community is supportive, and the overall experience really helped me grow faster and achieve my goals.",
    },
    {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        text: "The best investment I've made in my career. The instructors are knowledgeable, the content is up-to-date, and the interactive learning approach makes complex topics easy to understand.",
    },
    {
        id: 3,
        name: "Sarah Johnson",
        rating: 5,
        text: "I've tried many online learning platforms, but ZenIQ stands out. The personalized learning paths and real-world projects helped me land my dream job in just 6 months!",
    },
    {
        id: 4,
        name: "David Kumar",
        rating: 5,
        text: "Amazing platform with incredible support. The community is active and helpful, and the course material is structured perfectly for both beginners and advanced learners.",
    },
];

export const SuccessStorySection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState("");

    const nextTestimonial = () => {
        setDirection("next");
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setDirection("prev");
        setCurrentIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section
            className="w-full bg-gray-50 py-16 custom-container"
            id="success-story"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-12 sm:w-16 bg-gray-300"></div>
                            <span className="text-sm sm:text-base text-gray-500 uppercase tracking-wider font-medium">
                                Success Story
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            What They Say?
                        </h2>

                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                            A modern e-learning platform designed to help you
                            understand deeply, learn faster, and reach your
                            goals with confidence.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <Card
                        key={currentTestimonial.id}
                        className={`relative overflow-hidden border-l-4 border-l-blue-600 shadow-lg hover:shadow-xl transition-all duration-500 ${
                            direction === "next"
                                ? "animate-slideInRight"
                                : direction === "prev"
                                  ? "animate-slideInLeft"
                                  : ""
                        }`}
                    >
                        <CardContent className="p-6 sm:p-8">
                            <div className="space-y-6">
                                <p className="text-base sm:text-lg text-gray-600 leading-relaxed italic min-h-[120px] sm:min-h-[140px]">
                                    "{currentTestimonial.text}"
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="font-semibold text-gray-900 text-lg">
                                            {currentTestimonial.name}
                                        </p>
                                    </div>

                                    <div className="flex gap-1">
                                        {[
                                            ...Array(currentTestimonial.rating),
                                        ].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <button
                        type="button"
                        onClick={prevTestimonial}
                        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 border border-gray-200 z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={nextTestimonial}
                        className="absolute -right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                type="button"
                                key={index}
                                onClick={() => {
                                    setDirection(
                                        index > currentIndex ? "next" : "prev",
                                    );
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? "w-8 bg-blue-600"
                                        : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.5s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>
        </section>
    );
};
