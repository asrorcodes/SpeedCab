import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/global.css";
import {
	DashboardLayout,
	LoginPage,
	Cities,
	Drivers,
	Services,
	Orders,
	Tariff,
	Test,
} from ".";
import PrivateRoute from "./components/privateRoute";
import { Toaster } from "sonner"

const App = () => {
	return (
		<BrowserRouter>
			<Toaster position="top-right" richColors />
			<Routes>
				<Route
					path="/"
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					{/* Nested routes */}
					{/* Avtomatik ochiladigan sahifa */}
					<Route index element={<Test />} />

					{/* Foydalanuvchi xohlagan vaqtda `/test` orqali ham qayta kirishi mumkin */}
					<Route path="test" element={<Test />} />
					<Route path="cities" element={<Cities />} />
					<Route path="drivers" element={<Drivers />} />
					<Route path="orders" element={<Orders />} />
					<Route path="services" element={<Services />} />
					<Route path="tariff" element={<Tariff />} />
				</Route>

				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
