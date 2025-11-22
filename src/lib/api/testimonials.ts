const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface Testimonial {
    id: number;
    user_id: string;
    testimonial_text: string;
    rating: number;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    user?: {
        id: string;
        full_name: string;
        email: string;
    };
}

export interface TestimonialsResponse {
    success: boolean;
    message: string;
    data: Testimonial[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
    };
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
    try {
        const res = await fetch(
            `${API_URL}/api/testimonials?is_featured=true&limit=10`,
            {
                next: { revalidate: 3600 },
            },
        );

        if (!res.ok) {
            throw new Error("Failed to fetch testimonials");
        }

        const result: TestimonialsResponse = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return [];
    }
}
