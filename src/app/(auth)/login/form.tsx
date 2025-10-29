// Import komponen UI untuk input dan button
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <form className="space-y-4">
      <Input
        id="email"
        name="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 mt-2 rounded-lg border"
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        className="w-full px-4 py-2 mt-2 rounded-lg border"
      />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}
