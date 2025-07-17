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
import { EFLogo, Logo, SideBarArrow } from "@/assets/svg";
import { cn } from "@/lib/utils";

export default function AppSidebar() {
	const pathname = usePathname();
	const { state, isMobile, setOpenMobile, toggleSidebar } = useSidebar();

	const isActive = (item: { title: string; url: string; icon: any }) =>
		pathname === item.url || pathname.startsWith(item.url + "/");

	return (
		<Sidebar className='pt-10 relative' collapsible='icon'>
			<button
				onClick={() => {
					toggleSidebar();
				}}
				className='hidden md:flex size-5 absolute top-5 -right-5  cursor-pointer hover:bg-russian-violet-500/90 items-center justify-center   bg-russian-violet-500 rounded-tr-[4px] rounded-br-[4px] '
			>
				<SideBarArrow
					className={cn(
						"size-3 transition-transform duration-500",
						state === "collapsed" && "rotate-180 ",
					)}
				/>
			</button>

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
