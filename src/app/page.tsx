import { Button } from "@/components/button";
import Link from "./link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <h1 className="font-bold text-3xl">Welcome to Homepage</h1>
            <div className="flex gap-4 mt-4">
                <Link href={"/login"}>
                    <Button type="button" variant="outline">
                        Login
                    </Button>
                </Link>
                <Link href={"/register"}>
                    <Button type="button" variant="outline">
                        Register
                    </Button>
                </Link>
            </div>
        </main>
    );
}
