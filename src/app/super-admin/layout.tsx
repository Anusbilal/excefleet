import { AppSideBar } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function SuperAdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSideBar />

			<main className='md:px-6 md:py-10 md:p-0 p-5 bg-background flex-1 overflow-hidden '>
				<div className='flex justify-end md:hidden items-center mb-5'>
					<SidebarTrigger className='cursor-pointer' />
				</div>

				{children}
			</main>
		</SidebarProvider>
	);
}
