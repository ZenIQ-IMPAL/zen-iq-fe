import { consola } from "consola";

export interface LoginState {
    error?: string;
    success?: boolean;
    fieldErrors?: {
        email?: string;
        password?: string;
    };
}

export const loginAction = async (
    _prevState: LoginState,
    formData: FormData,
): Promise<LoginState> => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        const errorState = { error: "Email and password are required!" };
        consola.error("Login Error:", errorState);
        return errorState;
    }

    try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        const result = await res.json();

        if (res.ok) {
            consola.info("Login Success");
            return { success: true };
        }

        consola.error("Login failed:", result.message);

        const hasFieldErrors = result.errors && Array.isArray(result.errors);
        const fieldErrors: LoginState["fieldErrors"] = hasFieldErrors
            ? result.errors.reduce(
                  (acc: NonNullable<LoginState["fieldErrors"]>, err: any) => {
                      if (err.field) {
                          acc[err.field as keyof typeof acc] = err.message;
                      }
                      return acc;
                  },
                  {} as NonNullable<LoginState["fieldErrors"]>,
              )
            : undefined;

        return {
            error: result.message || "Login failed",
            fieldErrors,
        };
    } catch (err) {
        consola.error("Login Error:", err);
        return { error: "An unexpected error occurred" };
    }
};
