import { API_BASE_URL } from "./config";

export interface SubscriptionPlan {
    id: string;
    plan_name: string;
    price: string;
    duration_months: number;
    features: string | string[];
    created_at: string;
    updated_at: string;
}

export interface SubscriptionPlansResponse {
    success: boolean;
    message: string;
    data: SubscriptionPlan[];
}

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/subscription-plans`, {
            next: { revalidate: 3600 },
            credentials: "include",
        });

        if (!res.ok) {
            console.warn("Failed to fetch subscription plans:", res.statusText);
            return [];
        }

        const result: SubscriptionPlansResponse = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching subscription plans:", error);
        return [];
    }
}
