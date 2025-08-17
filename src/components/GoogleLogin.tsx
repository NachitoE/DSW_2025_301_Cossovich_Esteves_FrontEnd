import { useAuth } from "../context/AuthContext";

export default function GoogleLogin() {
	const user = useAuth().user;

	if (user) {
		console.log("Usuario autenticado:", user);
		return (
			<div className="flex items-center h-screen justify-center">
				<img
					src={user.avatarURL || "/default-avatar.png"}
					alt={user.name}
					className="w-16 h-16 rounded-full border-2 border-gray-300 shadow"
					title={user.name}
				/>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<a
				href="http://localhost:3000/api/auth/google"
				className="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow border hover:shadow-lg transition"
				title="Login with Google"
			>
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
					alt="Google"
					className="w-8 h-8"
				/>
			</a>
		</div>
	);
}
