import { createContext, useContext, useEffect, useState } from "react";
import { getMeAuth } from "@/api.ts";
import type { User } from "shared-types";

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getMeAuth()
			.then((user) => setUser(user))
			.catch(() => setUser(null));
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
