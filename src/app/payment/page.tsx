"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const planDetails = {
    monthly: {
        title: "ZenIQ Pro - Monthly",
        price: "$19",
        period: "per month",
        features: [
            "Full access to all courses",
            "Personalized learning paths",
            "Cancel anytime"
        ]
    },
    "6months": {
        title: "ZenIQ Pro - 6 Months",
        price: "$59",
        period: "per month",
        features: [
            "Everything in Monthly",
            "Downloadable resources",
            "Early access to new features"
        ]
    },
    "12months": {
        title: "ZenIQ Pro - 12 Months",
        price: "$119",
        period: "per month",
        features: [
            "All features unlocked",
            "1-on-1 mentoring",
            "Premium certificate badges"
        ]
    }
};

export default function PaymentPage() {
    const searchParams = useSearchParams();
    const [selectedPlan, setSelectedPlan] = useState("6months");

    useEffect(() => {
        const plan = searchParams.get('plan');
        if (plan && planDetails[plan as keyof typeof planDetails]) {
            setSelectedPlan(plan);
        }
    }, [searchParams]);

    const currentPlan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails["6months"];
    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <Navbar />

            {/* Payment Banner */}
            <div className="bg-primary py-12">
                <div className="custom-container">
                    <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
                        Payment
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="custom-container -mt-6 relative z-10 pb-8">
                <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Left Panel - Subscription Details */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        {/* You're Almost There Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">
                                You're Almost There
                            </h2>
                            <p className="text-gray-600 mb-3 text-sm">
                                Just a quick check before you unlock your learning journey.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Logged in as: <span className="font-bold text-primary">your@email.com</span>
                            </p>
                        </div>

                        {/* Subscription Features */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                {currentPlan.title}
                            </h3>
                            <div className="space-y-3">
                                {currentPlan.features.map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <Check className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="text-gray-700 text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Payment Summary */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            {currentPlan.title}
                        </h3>

                        {/* Plan Details */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Plan</span>
                                <span className="text-sm font-medium text-gray-900">{currentPlan.title}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                                <span className="text-sm text-gray-600">Billing</span>
                                <span className="text-sm text-gray-600">{currentPlan.period}</span>
                            </div>
                        </div>

                        {/* Discount Code Section */}
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

                        {/* Total Price Section */}
                        <div className="flex justify-between items-center mb-6 py-3 border-t border-gray-200">
                            <span className="text-base font-medium text-gray-900">
                                Total price
                            </span>
                            <span className="text-xl font-bold text-gray-900">
                                {currentPlan.price}
                            </span>
                        </div>

                        {/* Complete Payment Button */}
                        <Link href="/payment/success">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3">
                                Complete Payment
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
