"use client";
import { Chevron, Employee } from "@/assets/svg";
import { Layout, PageTopBar, TablePageCard, CustomTable } from "@/components";
import { TableCell, TableRow } from "@/components/ui/table";
import { EMPLOYEES_DATA, EMPLOYEES_HEAD_DATA } from "@/constant/tableData";
import { useEmployees } from "@/hooks";
import React from "react";

const Employees = () => {
	const {
		currentPageData,
		disabledPagination,
		totalPages,
		handleChangePageSize,
		handleNextPage,
		handlePrevPage,
		pageSize,
		setPage,
		page,
		router,
	} = useEmployees();

	return (
		<Layout>
			<PageTopBar heading='Employees' isSearchBar />

			<div className='flex flex-col gap-5 md:gap-10'>
				<TablePageCard
					heading='Add a new employee'
					subHeading='You can begin adding new employee right from this point.'
					buttontitle='Start adding employee'
					icon={Employee}
					onClick={() => router.push("/super-admin/employees/create-employee")}
				/>

				<CustomTable
					head={EMPLOYEES_HEAD_DATA}
					disabledPagination={disabledPagination}
					handleChangePageSize={handleChangePageSize}
					remaining={`of ${EMPLOYEES_DATA.length} results`}
					handleNextPage={handleNextPage}
					handlePrevPage={handlePrevPage}
					pageSize={pageSize}
					totalPages={totalPages}
					handlePaginate={(link) => setPage(link + 1)}
					page={page}
				>
					{currentPageData?.map((item, index) => {
						return (
							<TableRow key={index}>
								<TableCell>{item.employee}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{item.mobileNumber}</TableCell>
								<TableCell>{item.city}</TableCell>
								<TableCell>{item.address}</TableCell>
								<TableCell>{item.route}</TableCell>
								<TableCell
									className='font-normal text-xs text-russian-violet-1200'
									onClick={() =>
										router.push("/super-admin/employees/update-employee")
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

export default Employees;
