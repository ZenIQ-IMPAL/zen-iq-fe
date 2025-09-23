import { consola } from "consola";

export interface RegisterState {
    error?: string;
    success?: boolean;
    data?: {
        email: string;
        timestamp: string;
    };
}

export const registerAction = async (
    _prevState: RegisterState,
    formData: FormData,
): Promise<RegisterState> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        const errorState = { error: "Email and password are required!" };
        consola.error("Register Error:", errorState);
        return errorState;
    }

    const successState = {
        success: true,
        data: {
            email: email.toString(),
            timestamp: new Date().toISOString(),
        },
    };
    consola.info("Register Success:", successState);
    return successState;
};
