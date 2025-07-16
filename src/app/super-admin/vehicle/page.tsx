"use client";
import { Chevron, Vehicle as VehicleIcon } from "@/assets/svg";
import { Layout, PageTopBar, TablePageCard, CustomTable } from "@/components";
import { TableRow, TableCell } from "@/components/ui/table";
import { VEHICLES_HEAD_DATA, VEHICLES_DATA } from "@/constant/tableData";
import { useVehicles } from "@/hooks";
import React from "react";

const Vehicle = () => {
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
	} = useVehicles();

	return (
		<Layout>
			<PageTopBar heading='Vehicles' isSearchBar />

			<div className='flex flex-col gap-5 md:gap-10'>
				<TablePageCard
					heading='Add a new vehicles'
					subHeading='You can begin adding new vehicles right from this point.'
					buttontitle='Start adding vehicles'
					icon={VehicleIcon}
					onClick={() => router.push("/super-admin/vehicle/create-vehicle")}
				/>

				<CustomTable
					head={VEHICLES_HEAD_DATA}
					disabledPagination={disabledPagination}
					handleChangePageSize={handleChangePageSize}
					remaining={`of ${VEHICLES_DATA.length} results`}
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
								<TableCell>{item.registrationNumber}</TableCell>
								<TableCell>{item.registerWith}</TableCell>
								<TableCell>{item.mobileNumber}</TableCell>
								<TableCell>{item.registrationCity}</TableCell>
								<TableCell>{item.address}</TableCell>
								<TableCell>{item.driver}</TableCell>
								<TableCell
									className='font-normal text-xs text-russian-violet-1200 font-poppins'
									onClick={() =>
										router.push("/super-admin/vehicle/update-vehicle")
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

export default Vehicle;
