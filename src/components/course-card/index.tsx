"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, Lock, X } from "lucide-react";
import { useAuth } from "@/app/context/auth";
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
    is_free?: boolean;
}

interface CourseCardProps {
    course: Course;
}

const PremiumBadge = () => (
    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10">
        <Crown className="w-4 h-4" />
        <span className="text-xs font-semibold">Premium</span>
    </div>
);

const LockedOverlay = () => (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg z-10">
        <div className="bg-white/90 p-3 rounded-full">
            <Lock className="w-6 h-6 text-gray-800" />
        </div>
    </div>
);

const PremiumUpgradeModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            e.key === "Escape" && onClose();
        };

        isOpen && document.addEventListener("keydown", handleEscape);

        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    useEffect(() => {
        const body = document.body;

        if (isOpen) {
            body.style.setProperty("overflow", "hidden");
        }

        return () => {
            body.style.removeProperty("overflow");
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <Lock className="w-12 h-12 text-primary" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    Premium Content
                </h3>

                <p className="text-gray-600 mb-6 text-center">
                    This is a premium course. Upgrade to access all content and
                    start learning today.
                </p>

                <Link href="/#pricing" onClick={onClose}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3">
                        Upgrade to Premium
                    </Button>
                </Link>
            </div>
        </div>
    );
};

const CardContent_Component = ({
    course,
    isPremiumCourse,
    showLockedOverlay,
}: {
    course: Course;
    isPremiumCourse: boolean;
    showLockedOverlay: boolean;
}) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group py-0 cursor-pointer h-full">
        <CardContent className="p-5 flex flex-col h-full">
            <div className="relative overflow-hidden rounded-lg mb-5 flex-shrink-0">
                <Image
                    width={400}
                    height={250}
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isPremiumCourse && <PremiumBadge />}
                {showLockedOverlay && <LockedOverlay />}
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {course.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3 flex-1">
                    {course.description}
                </p>

                <div className="flex items-center mt-auto">
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

export const CourseCard = ({ course }: CourseCardProps) => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);

    const isPremiumCourse = course.is_free === false;
    const userHasAccess = user?.is_premium || course.is_free;
    const showLockedOverlay = isPremiumCourse && !user?.is_premium;
    const shouldBlockAccess = showLockedOverlay;

    const handleClick = (e: React.MouseEvent) => {
        if (shouldBlockAccess) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    const cardContentComponent = (
        <CardContent_Component
            course={course}
            isPremiumCourse={isPremiumCourse}
            showLockedOverlay={showLockedOverlay}
        />
    );

    return (
        <>
            {shouldBlockAccess ? (
                <div className="block cursor-pointer" onClick={handleClick}>
                    {cardContentComponent}
                </div>
            ) : (
                <Link href={`/courses/${course.id}`} className="block">
                    {cardContentComponent}
                </Link>
            )}

            <PremiumUpgradeModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};
