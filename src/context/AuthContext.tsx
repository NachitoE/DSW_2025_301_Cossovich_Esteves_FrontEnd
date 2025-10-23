import { createContext, useContext, useEffect, useState } from "react";
import { getMeAuth } from "@/api.ts";
import type { User } from "shared-types";

export const AuthContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({
    user: null,
    setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		getMeAuth()
			.then((user) => setUser(user))
			.catch(() => setUser(null));
	}, []);

	return (
		<AuthContext.Provider value={{ user , setUser }}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
