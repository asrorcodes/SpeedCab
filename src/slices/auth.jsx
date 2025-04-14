import { createSlice } from "@reduxjs/toolkit";
import { setItem, removeItem } from "../helpers/persistanse-storage";
import { toast } from "sonner";

const initialState = {
	isLoading: false,
	loggedIn: false,
	user: null,
	error: null,
	role: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginUserStart: (state) => {
			state.isLoading = true;
		},
		loginUserSuccess: (state, actions) => {
			state.isLoading = false;
			state.loggedIn = true;
			setItem("access_token", actions.payload);
			toast("Logged in successfully!", {
				description: "Welcome back! Glad to have you back.",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
		},
		loginUserFailture: (state, actions) => {
			state.isLoading = false;
			state.error = actions.payload;
			toast("Login failed", {
				description: "Incorrect password. Please try again.",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
		},

		logoutUser: (state) => {
			state.loggedIn = false;
			removeItem("access_token");
			toast("Logged out successfully!", {
				description: "You have successfully logged out.",
				action: {
					label: "Undo",
					onClick: () => console.log("Undo"),
				},
			});
		},
	},
});
export const {
	loginUserStart,
	loginUserSuccess,
	loginUserFailture,
	logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
