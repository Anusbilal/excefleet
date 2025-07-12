"use client";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { COLORS } from "@/constant/colors";
import { SIDE_BAR_DATA } from "@/constant/sidebarData";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EFLogo, Logo } from "@/assets/svg";

export default function AppSidebar() {
	const pathname = usePathname();
	const { state, isMobile, setOpenMobile } = useSidebar();

	const isActive = (item: { title: string; url: string; icon: any }) =>
		pathname === item.url || pathname.startsWith(item.url + "/");

	return (
		<Sidebar className='pt-10' collapsible='icon'>
			<SidebarHeader className='w-full mb-10 p-0 pl-6 '>
				<Link href='/super-admin/dashboard'>
					{!isMobile && state === "collapsed" ? (
						<Logo width={58.58} height={58.58} />
					) : (
						<EFLogo width={185.57} height={58.58} />
					)}
				</Link>
			</SidebarHeader>
			<SidebarContent className='pl-4'>
				<SidebarMenu>
					{SIDE_BAR_DATA.map((item) => {
						const Icon = item.icon;
						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild isActive={isActive(item)}>
									<Link
										href={item.url}
										onClick={() => {
											if (isMobile) setOpenMobile(false);
										}}
									>
										<Icon
											color={
												isActive(item)
													? COLORS.colorPallet.russianViolet[600]
													: COLORS.colorPallet.neutral[600]
											}
											style={{
												width: 20,
												height: 20,
											}}
										/>
										<span
											className={`${
												isActive(item)
													? "text-russian-violet-600"
													: "text-neutral-600"
											} font-semibold text-base`}
										>
											{item.title}
										</span>
									</Link>
								</SidebarMenuButton>
								{isActive(item) && (
									<div className='h-9 w-1 bg-russian-violet-600 rounded-[25px] ' />
								)}
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	);
}
