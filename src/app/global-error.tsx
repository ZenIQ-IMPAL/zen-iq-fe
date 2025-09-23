"use client";

import { useRouter } from "next/navigation";
import { errorStyles } from "@/styles/error.css";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    const router = useRouter();
    const styles = errorStyles();

    const handleBack = () => {
        if (window.history.length > 1) {
            return router.back();
        }

        return router.push("/");
    };

    return (
        <html lang="en">
            <body>
                <div className={styles.wrapper()}>
                    <div className={styles.decorativeBackground()} />
                    <div className={styles.decorativePattern()} />
                    <div className={styles.floatingElements()}>
                        <div className={styles.floatingCircle1()} />
                        <div className={styles.floatingCircle2()} />
                    </div>
                    <div className={styles.decorativeCode()}>
                        <span className={styles.decorativeText()}>500</span>
                    </div>
                    <div className={styles.content()}>
                        <div className={styles.container()}>
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
                                {error.digest || "Error 500"}
                            </div>

                            <h1 className={styles.title()}>
                                Internal Server Error
                            </h1>

                            <p className={styles.description()}>
                                {error.message ||
                                    "Something went wrong on our end."}
                            </p>

                            {error.stack && (
                                <div className="mt-6 w-full max-w-2xl">
                                    <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 p-4">
                                        <pre className="overflow-x-auto text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                            <code>{error.stack}</code>
                                        </pre>
                                    </div>
                                </div>
                            )}

                            <div className={styles.actions()}>
                                <button
                                    type="button"
                                    onClick={() => reset()}
                                    className={styles.primaryButton()}
                                >
                                    Try again
                                </button>
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className={styles.secondaryButton()}
                                >
                                    Go back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
