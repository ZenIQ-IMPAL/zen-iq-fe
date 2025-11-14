import { consola } from "consola";

export interface LoginState {
  error?: string;
  success?: boolean;
  data?: {
    email: string;
    timestamp: string;
  };
}

export const loginAction = async (
  _prevState: LoginState,
  formData: FormData
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

    if (!res.ok) {
      consola.error("Login failed:", result.message);
      return { error: result.message || "Login failed" };
    }

    const successState = {
      success: true,
      data: {
        email: result.data.user.email,
        timestamp: new Date().toISOString(),
      },
    };
    consola.info("Login Success:", successState);
    return successState;
  } catch (err) {
    consola.error("Login Error:", err);
    return { error: "An unexpected error occurred" };
  }
};
