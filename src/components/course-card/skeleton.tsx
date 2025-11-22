import { Card, CardContent } from "@/components/ui/card";

export const CourseCardSkeleton = () => {
    return (
        <Card className="overflow-hidden py-0 h-full">
            <CardContent className="p-5 flex flex-col h-full">
                {/* Image skeleton */}
                <div className="relative overflow-hidden rounded-lg mb-5 flex-shrink-0">
                    <div className="w-full h-48 sm:h-56 bg-gray-200 animate-pulse" />
                </div>

                <div className="flex flex-col flex-1">
                    {/* Title skeleton */}
                    <div className="mb-3 space-y-2">
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2" />
                    </div>

                    {/* Description skeleton */}
                    <div className="mb-4 space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                    </div>

                    {/* Instructor skeleton */}
                    <div className="flex items-center mt-auto">
                        <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
                        <div className="ml-3 h-4 bg-gray-200 rounded animate-pulse w-24" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
