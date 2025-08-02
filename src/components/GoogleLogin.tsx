import { useEffect, useState } from "react";
import axios from "axios";

export default function GoogleLogin() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-800 dark:text-white">
          Bienvenido, {user.displayName || user.email}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <a
        href="http://localhost:3000/api/auth/google"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Login with Google
      </a>
    </div>
  );
}
