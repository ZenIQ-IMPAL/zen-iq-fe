import { API_BASE_URL } from "./config";

export interface Instructor {
    id: string;
    name: string;
    email: string;
    bio: string | null;
    avatar_url: string | null;
}

export interface Course {
    id: string;
    title: string;
    description: string | null;
    thumbnail_url: string | null;
    instructor_id: string;
    category: string | null;
    is_free: boolean;
    difficulty_level: string | null;
    created_at: string;
    updated_at: string;
    instructor?: Instructor;
}

export interface CoursesResponse {
    success: boolean;
    message: string;
    data: Course[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

export interface CourseFilters {
    is_free?: boolean;
    category?: string;
    difficulty_level?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export async function getCourses(filters?: CourseFilters): Promise<Course[]> {
    try {
        const params = new URLSearchParams();

        if (filters?.is_free !== undefined) {
            params.append("is_free", filters.is_free.toString());
        }
        if (filters?.category) {
            params.append("category", filters.category);
        }
        if (filters?.difficulty_level) {
            params.append("difficulty_level", filters.difficulty_level);
        }
        if (filters?.search) {
            params.append("search", filters.search);
        }
        if (filters?.page) {
            params.append("page", filters.page.toString());
        }
        if (filters?.limit) {
            params.append("limit", filters.limit.toString());
        }

        const url = `${API_BASE_URL}/api/courses${params.toString() ? `?${params.toString()}` : ""}`;

        const res = await fetch(url, {
            next: { revalidate: 3600 }, // Revalidate every hour
            credentials: "include",
        });

        if (!res.ok) {
            console.warn("Failed to fetch courses:", res.statusText);
            return [];
        }

        const result: CoursesResponse = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
    }
}

export async function getFreeCourses(limit = 3): Promise<Course[]> {
    return getCourses({ is_free: true, limit });
}

export async function getPopularCourses(limit = 3): Promise<Course[]> {
    // Popular courses bisa pakai logic lain, tapi untuk sekarang ambil latest courses
    return getCourses({ limit });
}
