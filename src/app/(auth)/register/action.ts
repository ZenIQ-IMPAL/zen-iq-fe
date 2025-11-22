import { consola } from "consola";

export interface RegisterState {
    error?: string;
    success?: boolean;
    fieldErrors?: {
        fullName?: string;
        email?: string;
        password?: string;
    };
}

export const registerAction = async (
    _prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> => {
    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!fullName || !email || !password) {
        const errorState = { error: "All fields are required!" };
        consola.error("Register Error:", errorState);
        return errorState;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ fullName, email, password }),
        });

        const result = await res.json();

        if (res.ok) {
            consola.info("Register Success");
            return { success: true };
        }

        consola.error("Register failed:", result.message);

        const hasFieldErrors = result.errors && Array.isArray(result.errors);
        const fieldErrors: RegisterState["fieldErrors"] = hasFieldErrors
            ? result.errors.reduce(
                  (acc: NonNullable<RegisterState["fieldErrors"]>, err: any) => {
                      if (err.field) {
                          acc[err.field as keyof typeof acc] = err.message;
                      }
                      return acc;
                  },
                  {} as NonNullable<RegisterState["fieldErrors"]>,
              )
            : undefined;

        return {
            error: result.message || "Registration failed",
            fieldErrors,
        };
    } catch (err) {
        consola.error("Register Error:", err);
        return { error: "An unexpected error occurred" };
    }
};
