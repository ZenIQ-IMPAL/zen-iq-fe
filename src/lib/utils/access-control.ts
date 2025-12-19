export interface AccessCheckParams {
    isPremiumUser: boolean;
    isFreeCourse: boolean;
}

export interface AccessResult {
    canAccess: boolean;
    requiresUpgrade: boolean;
    message: string;
}

const ACCESS_MESSAGES = {
    GRANTED: "You have access to this course",
    PREMIUM_REQUIRED: "This is a premium course. Please upgrade to access.",
    FREE_COURSE: "This course is free for everyone",
} as const;

export const checkCourseAccess = ({
    isPremiumUser,
    isFreeCourse,
}: AccessCheckParams): AccessResult => {
    const canAccessPremium = isPremiumUser;
    const canAccessFree = isFreeCourse;
    const canAccess = canAccessPremium || canAccessFree;

    const requiresUpgrade = !canAccess && !isFreeCourse;

    const messageMap: Record<string, string> = {
        premium_granted: ACCESS_MESSAGES.GRANTED,
        free_course: ACCESS_MESSAGES.FREE_COURSE,
        requires_upgrade: ACCESS_MESSAGES.PREMIUM_REQUIRED,
    };

    const messageKey = (() => {
        return canAccessPremium
            ? "premium_granted"
            : canAccessFree
              ? "free_course"
              : "requires_upgrade";
    })();

    return {
        canAccess,
        requiresUpgrade,
        message: messageMap[messageKey],
    };
};

export const filterAccessibleCourses = <T extends { is_free: boolean }>(
    courses: T[],
    isPremiumUser: boolean
): T[] => {
    return courses.filter((course) => isPremiumUser || course.is_free);
};
