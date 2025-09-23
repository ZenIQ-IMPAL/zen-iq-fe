import { tv } from "tailwind-variants";

export const errorStyles = tv({
    slots: {
        wrapper: [
            "relative min-h-screen overflow-hidden",
            "bg-gradient-to-br from-gray-50 via-white to-gray-100",
            "dark:from-gray-900 dark:via-gray-800 dark:to-gray-900",
        ],

        decorativeBackground: [
            "absolute inset-0 -z-10",
            "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
            "from-blue-100/20 via-transparent to-transparent",
            "dark:from-blue-900/10",
        ],

        decorativePattern: [
            "absolute inset-0 -z-5",
            "bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)]",
            "bg-[size:14px_24px]",
            "opacity-20 dark:opacity-10",
        ],

        content: [
            "relative z-10 flex min-h-screen flex-col items-center justify-center",
            "px-6 py-24 sm:py-32 lg:px-8",
        ],

        container: "mx-auto max-w-2xl text-center",

        decorativeCode: [
            "absolute inset-0 flex items-center justify-center -z-5",
            "pointer-events-none select-none",
        ],

        decorativeText: [
            "font-black text-[20rem] sm:text-[25rem] md:text-[30rem] lg:text-[35rem]",
            "text-gray-100/50 dark:text-gray-800/30",
            "leading-none tracking-tighter",
        ],

        errorBadge: [
            "inline-flex items-center rounded-full",
            "bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700",
            "ring-1 ring-inset ring-red-600/10",
            "dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/20",
            "mb-4",
        ],

        title: [
            "mt-4 text-4xl font-bold tracking-tight",
            "text-gray-900 dark:text-white",
            "sm:text-5xl lg:text-6xl",
        ],

        description: [
            "mt-6 text-lg leading-8",
            "text-gray-600 dark:text-gray-400",
            "max-w-2xl mx-auto",
        ],

        actions: [
            "mt-10 flex flex-col sm:flex-row items-center justify-center",
            "gap-4 sm:gap-x-6",
        ],

        primaryButton: [
            "inline-flex items-center justify-center",
            "rounded-lg bg-gray-900 px-6 py-3",
            "text-sm font-semibold text-white",
            "shadow-sm hover:bg-gray-800",
            "focus-visible:outline focus-visible:outline-2",
            "focus-visible:outline-offset-2 focus-visible:outline-gray-900",
            "transition-all duration-200",
            "dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
            "dark:focus-visible:outline-white",
            "min-w-[140px]",
        ],

        secondaryButton: [
            "inline-flex items-center justify-center",
            "rounded-lg bg-transparent px-6 py-3",
            "text-sm font-semibold text-gray-900",
            "ring-1 ring-inset ring-gray-300",
            "hover:bg-gray-50 hover:ring-gray-400",
            "focus-visible:outline focus-visible:outline-2",
            "focus-visible:outline-offset-2 focus-visible:outline-gray-600",
            "transition-all duration-200",
            "dark:text-white dark:ring-gray-600",
            "dark:hover:bg-gray-800 dark:hover:ring-gray-500",
            "dark:focus-visible:outline-gray-400",
            "min-w-[140px]",
        ],

        floatingElements:
            "absolute inset-0 -z-5 overflow-hidden pointer-events-none",

        floatingCircle1: [
            "absolute top-20 right-20 w-64 h-64",
            "bg-gradient-to-br from-blue-400/10 to-purple-400/10",
            "rounded-full blur-3xl",
            "animate-pulse",
        ],

        floatingCircle2: [
            "absolute bottom-20 left-20 w-96 h-96",
            "bg-gradient-to-br from-pink-400/10 to-orange-400/10",
            "rounded-full blur-3xl",
            "animate-pulse",
            "animation-delay-1000",
        ],
    },
});
