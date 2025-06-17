import { useState } from "react";
import { toast } from "react-hot-toast";

export function useAuth() {
	const [token, setToken] = useState<string | null>(() => {
		const storedToken = localStorage.getItem("token");
		if (!storedToken) return null;

		try {
			const payload = JSON.parse(atob(storedToken.split(".")[1]));
			if (payload.exp < Date.now()) {
				localStorage.removeItem("token");
				return null;
			}
			return storedToken;
		} catch {
			localStorage.removeItem("token");
			return null;
		}
	});

	const login = async (email: string, password: string) => {
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		const payload = {
			email,
			password,
			exp: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
		};

		const fakeJwt = `fake.${btoa(JSON.stringify(payload))}.signature`;
		localStorage.setItem("token", fakeJwt);
		setToken(fakeJwt);
		return fakeJwt;
	};

	const register = async (email: string, password: string) => {
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 800));
		return login(email, password);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		toast.success("Logged out successfully");
	};

	return { token, login, register, logout };
}
