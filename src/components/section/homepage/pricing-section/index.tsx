import { PricingCard } from "@/components/pricing-card";

const pricingPlans = [
    {
        id: 1,
        name: "Monthly Plan",
        price: 19,
        period: "/month",
        features: [
            "Full access to all courses",
            "Personalized learning paths",
            "Cancel anytime",
        ],
    },
    {
        id: 2,
        name: "6-Month Plan",
        price: 59,
        period: "/month",
        features: [
            "Everything in Monthly",
            "Downloadable resources",
            "Early access to new features",
        ],
    },
    {
        id: 3,
        name: "12-Month Plan",
        price: 119,
        period: "/month",
        features: [
            "All features unlocked",
            "1-on-1 mentoring",
            "Premium certificate badges",
        ],
    },
];

export const PricingSection = () => {
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {pricingPlans.map((plan) => (
                    <PricingCard key={plan.id} plan={plan} />
                ))}
            </div>
        </section>
    );
};
