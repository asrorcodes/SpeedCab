import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/ThemeSwitcher";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom"; // 👈 yangi

import { useEffect, useState } from "react";

export default function DashboardLayout() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light"
		setTheme(storedTheme)
		document.documentElement.classList.toggle("dark", storedTheme === "dark")
	}, [])

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
								<BreadcrumbItem>
									<BreadcrumbPage><ThemeToggle /></BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>

				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet /> {/* 👈 bu yerda nested route’lar ko‘rinadi */}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
