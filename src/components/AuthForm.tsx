import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function AuthForm() {
	const { login, register } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mode, setMode] = useState<"login" | "register">("login");
	const [loading, setLoading] = useState(false);

	const validateForm = () => {
		if (!email.includes("@") || !email.includes(".")) {
			toast.error("Please enter a valid email address");
			return false;
		}
		if (password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		try {
			if (mode === "login") {
				await login(email, password);
				toast.success("Logged in successfully!");
			} else {
				await register(email, password);
				toast.success("Account created successfully!");
			}
		} catch (err) {
			toast.error("Authentication failed. Please try again.");
		} finally {
			setLoading(false);
			window.location.reload();
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md p-8 space-y-6 bg-card text-foreground rounded-lg shadow-lg border border-border"
			>
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Welcome</h1>
					<p className="text-gray-500 dark:text-gray-400">
						{mode === "login" ? "Sign in to your account" : "Create a new account"}
					</p>
				</div>

				<div className="space-y-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium mb-1">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
							className="w-full px-3 py-2 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium mb-1">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="w-full px-3 py-2 border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
							minLength={6}
						/>
					</div>

					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
						{mode === "login" ? "Sign in" : "Sign up"}
					</button>
				</div>

				<div className="text-center text-sm">
					<button
						type="button"
						className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
						onClick={() => setMode(mode === "login" ? "register" : "login")}
					>
						{mode === "login" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
					</button>
				</div>
			</form>
		</div>
	);
}
