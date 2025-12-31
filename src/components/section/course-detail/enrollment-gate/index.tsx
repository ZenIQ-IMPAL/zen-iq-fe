"use client";

import { useRouter, usePathname } from "next/navigation";
import { API_BASE_URL } from "@/lib/api/config";
import { useAuth } from "@/app/context/auth";

interface EnrollmentGateProps {
  courseId: string;
  onEnrolled: () => void;
}

export function EnrollmentGate({ courseId, onEnrolled }: EnrollmentGateProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleEnroll = async () => {
    // Force login
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Create enrollment
    const res = await fetch(`${API_BASE_URL}/api/enrollments`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ course_id: courseId }),
    });

    if (res.ok) {
      onEnrolled();
      router.refresh(); // revalidate
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-50">
      <div className="bg-white p-6 rounded-lg text-center max-w-sm w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Enroll to Access</h2>
        <p className="text-gray-600 mb-4">
          You need to enroll to unlock this course.
        </p>
        <button
          onClick={handleEnroll}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
