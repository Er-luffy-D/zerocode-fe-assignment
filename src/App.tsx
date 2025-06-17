// App.tsx
import { useState, useEffect } from "react";
import Chat from "./components/Chat";
import AuthForm from "./components/AuthForm";
import { useAuth } from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./context/ThemeContext";
import { Sun, Moon } from "lucide-react";

function App() {
	const { token, logout } = useAuth();
	const { toggleTheme, isDark } = useTheme();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-background text-foreground transition-colors duration-200">
			<Toaster
				position="top-center"
				toastOptions={{
					className: "dark:bg-gray-800 dark:text-white",
				}}
			/>

			<button
				onClick={toggleTheme}
				className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
				aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			>
				{isDark ? <Sun size={20} /> : <Moon size={20} />}
			</button>

			{token ? (
				<div className="container mx-auto p-4">
					<button onClick={logout} className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
						Logout
					</button>
					<Chat />
				</div>
			) : (
				<AuthForm />
			)}
		</div>
	);
}

export default App;
