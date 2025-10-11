import Image from "next/image";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
    return (
        <section className="bg-primary w-full overflow-hidden">
            <div className="custom-container py-12 md:py-16 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center text-white space-y-6 lg:space-y-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Learn Smarter, Not Harder – with ZenIQ
                        </h1>

                        <p className="text-base sm:text-md md:text-lg text-white/90 leading-relaxed max-w-xl">
                            A modern e-learning platform designed to help you
                            understand deeply, learn faster, and reach your
                            goals with confidence.
                        </p>

                        <div>
                            <Button
                                size="lg"
                                className="bg-white text-primary hover:bg-white/90 font-semibold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Start Learning Today
                            </Button>
                        </div>
                    </div>

                    <div className="lg:flex justify-center lg:justify-end items-center hidden ">
                        <div className="relative w-full max-w-md lg:max-w-md">
                            <Image
                                src="/images/img-hero.png"
                                width={400}
                                height={400}
                                alt="Student learning illustration"
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
