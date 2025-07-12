"use client";
import { DummyUser } from "@/assets/images";
import { Chevron, Companies, Driver, Employee } from "@/assets/svg";
import {
	DashboardAnalyticCard,
	DashboardCard,
	Layout,
	PageTopBar,
} from "@/components";
import CustomTable from "@/components/custom/CustomTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { COMPANY_HEAD_DATA, DUMMY_DATA } from "@/constant/tableData";
import { useDasboard } from "@/hooks";
import Image from "next/image";
import React from "react";

const Dashboard = () => {
	const { router } = useDasboard();

	return (
		<Layout>
			<PageTopBar heading='Dashboard' />

			<div className='flex flex-col gap-5 md:gap-10'>
				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<DashboardAnalyticCard
						heading='Total Companies'
						subHeading='13'
						percentage='-0.03%'
						className='bg-secondary-100'
					/>
					<DashboardAnalyticCard
						heading='Total Employees'
						subHeading='163'
						percentage='-0.03%'
						className='bg-primary-200'
					/>
					<DashboardAnalyticCard
						heading='Total Drivers'
						subHeading='14'
						percentage='-0.03%'
						className='bg-secondary-100'
					/>
				</div>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
					<DashboardCard
						heading='Create a new business'
						subHeading='You can begin adding new companies right from this point.'
						className='bg-secondary-300'
						buttontitle='Start adding business'
						onClick={() => router.push("/super-admin/companies/create-company")}
						icon={Companies}
					/>
					<DashboardCard
						heading='Add & assign new drivers'
						subHeading='Start adding new drivers to your fleet and assign to respective companies right here.'
						buttontitle='Start adding drivers'
						className='bg-secondary-200'
						onClick={() => router.push("/super-admin/drivers/create-driver")}
						icon={Driver}
					/>
					<DashboardCard
						heading='Add new employees'
						subHeading='You can start adding and assigning new employees to your route from their respective companies.'
						buttontitle='Start adding employees'
						className='bg-secondary-100'
						onClick={() =>
							router.push("/super-admin/employees/create-employee")
						}
						icon={Employee}
					/>
				</div>

				<CustomTable head={COMPANY_HEAD_DATA}>
					{DUMMY_DATA?.map((item, index) => {
						return (
							<TableRow key={index}>
								<TableCell>
									<div className='flex items-center gap-3'>
										<Image
											src={DummyUser}
											alt='DummyUser'
											className='w-[24px] h-[24px] rounded-full object-contain object-center'
											width={24}
											height={24}
										/>

										{item.name}
									</div>
								</TableCell>
								<TableCell>{item.address}</TableCell>
								<TableCell>{item.person}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{item.contact}</TableCell>
								<TableCell
									className='font-normal text-xs text-russian-violet-1200'
									onClick={() =>
										router.push("/super-admin/companies/update-company")
									}
								>
									<div className='flex items-center gap-1 cursor-pointer'>
										View details
										<Chevron width={14} height={14} />
									</div>
								</TableCell>
							</TableRow>
						);
					})}
				</CustomTable>
			</div>
		</Layout>
	);
};

export default Dashboard;
