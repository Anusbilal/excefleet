"use client";
import { Chevron, User } from "@/assets/svg";
import { PageTopBar, TablePageCard, CustomTable } from "@/components";
import { TableRow, TableCell } from "@/components/ui/table";
import {
	USER_MANAGEMENT_HEAD_DATA,
	USER_MANAGEMENT_DATA,
} from "@/constant/tableData";
import { useUserManagement } from "@/hooks";
import React from "react";

const UserManagement = () => {
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
	} = useUserManagement();

	return (
		<>
			<PageTopBar heading='User Management' isSearchBar />

			<div className='flex flex-col gap-5 md:gap-10'>
				<TablePageCard
					heading='Add a new user'
					subHeading='You can begin adding new users right from this point.'
					buttontitle='Start adding user'
					icon={User}
					onClick={() => router.push("/super-admin/user-management/user")}
				/>

				<CustomTable
					head={USER_MANAGEMENT_HEAD_DATA}
					disabledPagination={disabledPagination}
					handleChangePageSize={handleChangePageSize}
					remaining={`of ${USER_MANAGEMENT_DATA.length} results`}
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
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.role}</TableCell>
								<TableCell>{item.mobileNumber}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell
									className='font-normal text-xs text-russian-violet-1200'
									onClick={() =>
										router.push("/super-admin/user-management/user/1")
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
		</>
	);
};

export default UserManagement;
