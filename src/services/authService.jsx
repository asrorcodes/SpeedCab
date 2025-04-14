import axios from "./api";

const AuthService = {
	async userLogin(user) {
		const data = await axios.post("/auth/login", user);
		return data;
	},
	// async getUser() {
	// 	const data  = await axios.get("/users/get");	
	// 	return data;
	// },
};

export default AuthService;