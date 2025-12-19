export const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export function setCookie(name: string, value: string, days: number = 7) {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getCookie(name: string): string | null {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }

    return null;
}

export function deleteCookie(name: string) {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    // Add token from cookie or localStorage if available
    if (typeof window !== "undefined") {
        const token = getCookie("token") || localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return headers;
}

export function getFetchOptions(includeAuth = false): RequestInit {
    return {
        credentials: "include", // Include cookies
        headers: includeAuth
            ? getAuthHeaders()
            : { "Content-Type": "application/json" },
    };
}

export function clearAuthTokens() {
    deleteCookie("token");
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
}
