"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { getSubscriptionPlans, type SubscriptionPlan } from "@/lib/api/subscription-plans";
import { createPayment } from "@/lib/api/payments";
import { useAuth } from "@/app/context/auth";

const parseFeatures = (features: string | string[]): string[] => {
    return typeof features === "string" ? JSON.parse(features) : features;
};

const formatPrice = (price: string): string => {
    return `Rp ${Number.parseInt(price).toLocaleString("id-ID")}`;
};

const formatDuration = (months: number): string => {
    const durationMap: Record<number, string> = {
        1: "per month",
        6: "6 months",
        12: "12 months",
    };

    return durationMap[months] || `${months} months`;
};

function PaymentContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();

    const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
    const [selectedPlanId, setSelectedPlanId] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const loadPlans = async () => {
            const fetchedPlans = await getSubscriptionPlans();
            setPlans(fetchedPlans);

            const planIdFromUrl = searchParams.get("plan");
            const firstPlanId = fetchedPlans[0]?.id || "";
            const validPlanId = fetchedPlans.some((p) => p.id === planIdFromUrl)
                ? planIdFromUrl
                : firstPlanId;

            setSelectedPlanId(validPlanId || "");
            setLoading(false);
        };

        loadPlans();
    }, [searchParams]);

    const handlePayment = async () => {
        setProcessing(true);

        try {
            const result = await createPayment({
                subscriptionPlanId: selectedPlanId,
            });

            window.location.href = result.redirectUrl;
        } catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : "Payment failed. Please try again.";

            alert(errorMessage);
            setProcessing(false);
        }
    };

    const selectedPlan = plans.find((p) => p.id === selectedPlanId);

    const renderLoading = () => (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Loading payment page...</p>
            </div>
        </div>
    );

    const renderPlanFeatures = (features: string[]) =>
        features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                    <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-gray-700 text-sm">{feature}</span>
            </div>
        ));

    const renderContent = () => (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="bg-primary py-12">
                <div className="custom-container">
                    <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
                        Payment
                    </h1>
                </div>
            </div>

            <div className="custom-container -mt-6 relative z-10 pb-8">
                <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                You're Almost There
                            </h2>
                            <p className="text-gray-600 mb-3 text-sm">
                                Just a quick check before you unlock your learning journey.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Logged in as:{" "}
                                <span className="font-bold text-primary">
                                    {user?.email || "Guest"}
                                </span>
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {selectedPlan?.plan_name || "Select a Plan"}
                            </h3>
                            <div className="space-y-3">
                                {selectedPlan &&
                                    renderPlanFeatures(
                                        parseFeatures(selectedPlan.features)
                                    )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {selectedPlan?.plan_name || "Select a Plan"}
                        </h3>

                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Plan</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {selectedPlan?.plan_name || "-"}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-600">Billing</span>
                                <span className="text-sm text-gray-600">
                                    {selectedPlan
                                        ? formatDuration(selectedPlan.duration_months)
                                        : "-"}
                                </span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Discount Code
                            </label>
                            <Input
                                type="text"
                                placeholder="Enter your discount code"
                                className="w-full"
                            />
                        </div>

                        <div className="flex justify-between items-center mb-6 py-3 border-t border-gray-200">
                            <span className="text-base font-medium text-gray-900">
                                Total price
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                                {selectedPlan ? formatPrice(selectedPlan.price) : "-"}
                            </span>
                        </div>

                        <Button
                            onClick={handlePayment}
                            disabled={!selectedPlan || processing}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Processing..." : "Complete Payment"}
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );

    return loading ? renderLoading() : renderContent();
}

export default function PaymentPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading payment page...</p>
                    </div>
                </div>
            }
        >
            <PaymentContent />
        </Suspense>
    );
}
