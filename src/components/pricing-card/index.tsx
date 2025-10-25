import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface PricingPlan {
    id: number;
    name: string;
    price: number;
    period: string;
    features: string[];
}

interface PricingCardProps {
    plan: PricingPlan;
}

export const PricingCard = ({ plan }: PricingCardProps) => {
    // Map plan names to URL parameters
    const getPlanParam = (planName: string) => {
        switch (planName) {
            case "Monthly Plan":
                return "monthly";
            case "6-Month Plan":
                return "6months";
            case "12-Month Plan":
                return "12months";
            default:
                return "6months";
        }
    };

    const planParam = getPlanParam(plan.name);

    return (
        <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 py-0">
            <CardContent className="p-0">
                <div className="py-8 px-6 bg-white text-center">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
                        {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center">
                        <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                            ${plan.price}
                        </span>
                        <span className="text-xl sm:text-2xl text-gray-500 ml-2">
                            {plan.period}
                        </span>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 sm:p-8">
                    <div className="space-y-4 mb-6">
                        {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                                <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <p className="ml-3 text-gray-700 text-left">
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Link href={`/payment?plan=${planParam}`}>
                        <Button
                            variant="outline"
                            className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium py-5 text-base"
                        >
                            Get started
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};
