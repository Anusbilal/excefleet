import Link from "next/link";
import AppSidebar from "./custom/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

type TProps = {
	children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
	return (
		<SidebarProvider>
			<AppSidebar />

			<main className='md:px-6 md:py-10 md:p-0 p-5 bg-background flex-1 overflow-hidden '>
				<div className='flex justify-end md:justify-start items-center mb-5'>
					<SidebarTrigger className='cursor-pointer' />
				</div>

				{children}
			</main>
		</SidebarProvider>
	);
};

export default Layout;
