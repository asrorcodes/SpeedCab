import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthService from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
	loginUserFailture,
	loginUserStart,
	loginUserSuccess,
} from "@/slices/auth";
import { useNavigate } from "react-router-dom";
import { getItem } from "@/helpers/persistanse-storage";

export function LoginForm({ className, ...props }) {
	const dispatch = useDispatch();
	const { isLoading } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [phoneFormatted, setPhoneFormatted] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		if (getItem("access_token")) {
			navigate("/");
		}
	}, [navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();

		const cleanedPhone = phoneFormatted.replace(/\D/g, "");
		const user = {
			phone_number: "+998" + cleanedPhone,
			password: password,
		};

		dispatch(loginUserStart());

		try {
			const response = await AuthService.userLogin(user);
			if (response.data.success) {
				dispatch(loginUserSuccess(response.data.accessToken));
				navigate("/");
				setPhoneFormatted("");
				setPassword("");
			}
		} catch (error) {
			dispatch(loginUserFailture(error));
			console.error("Error during login:", error);
		}
	};

	const handlePhoneChange = (e) => {
		const raw = e.target.value.replace(/\D/g, "").slice(0, 9); // faqat raqam, maksimal 9ta
		let formatted = "";

		if (raw.length <= 2) {
			formatted = raw;
		} else if (raw.length <= 5) {
			formatted = `${raw.slice(0, 2)}-${raw.slice(2)}`;
		} else if (raw.length <= 7) {
			formatted = `${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(5)}`;
		} else {
			formatted = `${raw.slice(0, 2)}-${raw.slice(2, 5)}-${raw.slice(
				5,
				7,
			)}-${raw.slice(7, 9)}`;
		}

		setPhoneFormatted(formatted);
	};

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your phone number below to login to your account!
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="phone">Phone Number</Label>
								<div className="flex items-center border rounded px-3 py-2">
									<span className="text-white mr-2 select-none">(+998)</span>
									<input
										id="phone"
										type="tel"
										inputMode="numeric"
										maxLength="13" // `xx-xxx-xx-xx` bu 13 belgidan iborat
										placeholder="99-123-45-67"
										className="outline-none flex-1 bg-transparent"
										value={phoneFormatted}
										onChange={handlePhoneChange}
										required
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<Button disabled={isLoading} type="submit" className="w-full">
								{isLoading ? "Loading" : "Login"}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
