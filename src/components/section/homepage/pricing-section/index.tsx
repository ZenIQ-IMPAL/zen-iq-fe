"use client";

import { useState, useEffect } from "react";
import { PricingCard } from "@/components/pricing-card";
import {
    getSubscriptionPlans,
    type SubscriptionPlan,
} from "@/lib/api/subscription-plans";

export const PricingSection = () => {
    const [plans, setPlans] = useState<
        Array<{
            id: string;
            name: string;
            price: number;
            durationMonths: number;
            features: string[];
        }>
    >([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            const data = await getSubscriptionPlans();
            const formattedPlans = data.map((plan) => ({
                id: plan.id,
                name: plan.plan_name,
                price: Number.parseFloat(plan.price),
                durationMonths: plan.duration_months,
                features: parseFeatures(plan.features),
            }));
            setPlans(formattedPlans);
            setIsLoading(false);
        };

        fetchPlans();
    }, []);

    const parseFeatures = (features: string | string[]): string[] => {
        if (!features) return [];

        if (Array.isArray(features)) return features;

        if (typeof features !== "string") return [];

        try {
            const parsed = JSON.parse(features);
            return Array.isArray(parsed) ? parsed : [features];
        } catch {
            return features.split(",").map((f) => f.trim());
        }
    };

    return (
        <section className="w-full custom-container py-16" id="pricing">
            <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    Pricing
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    No confusing plans. No hidden fees. Just pick what fits your
                    vibe and start leveling up.
                </p>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="text-gray-500">
                        Loading pricing plans...
                    </div>
                </div>
            ) : plans.length === 0 ? (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="text-gray-500">
                        No pricing plans available at the moment.
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} plan={plan} />
                    ))}
                </div>
            )}
        </section>
    );
};
