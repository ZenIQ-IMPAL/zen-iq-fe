"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorStyles } from "@/styles/error.css";

export default function NotFound() {
    const router = useRouter();
    const styles = errorStyles();

    const handleBack = () => {
        if (window.history.length > 1) {
            return router.back();
        }

        return router.push("/");
    };

    return (
        <div className={styles.wrapper()}>
            <div className={styles.decorativeBackground()} />
            <div className={styles.decorativePattern()} />
            <div className={styles.floatingElements()}>
                <div className={styles.floatingCircle1()} />
                <div className={styles.floatingCircle2()} />
            </div>
            <div className={styles.decorativeCode()}>
                <span className={styles.decorativeText()}>404</span>
            </div>
            <div className={styles.content()}>
                <div className={styles.container()}>
                    {/* Error Badge */}
                    <div className={styles.errorBadge()}>
                        <svg
                            className="mr-1.5 h-3 w-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Error 404
                    </div>
                    <h1 className={styles.title()}>Page not found</h1>
                    <p className={styles.description()}>
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for. The page might have been removed, renamed,
                        or doesn&apos;t exist.
                    </p>
                    <div className={styles.actions()}>
                        <button
                            type="button"
                            onClick={handleBack}
                            className={styles.primaryButton()}
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Go back
                        </button>

                        <Link href="/" className={styles.secondaryButton()}>
                            <svg
                                className="mr-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Go home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
