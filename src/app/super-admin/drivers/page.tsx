"use client";
import { Chevron, Driver } from "@/assets/svg";
import {
	PageTopBar,
	TablePageCard,
	CustomTable,
	StarRating,
} from "@/components";
import { TableCell, TableRow } from "@/components/ui/table";
import { DRIVERS_HEAD_DATA, DUMMY_DRIVER_DATA } from "@/constant/tableData";
import { useDrivers } from "@/hooks";
import React, { useState } from "react";

const Drivers = () => {
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
	} = useDrivers();

	const [rating, setRating] = useState(0);

	return (
		<>
			<PageTopBar heading='Drivers' isSearchBar />
			<div className='flex flex-col gap-5 md:gap-10'>
				<TablePageCard
					heading='Add & assign new drivers'
					subHeading='Start adding new drivers to your fleet and assign to respective companies right here.'
					buttontitle='Start adding driver'
					icon={Driver}
					onClick={() => router.push("/super-admin/drivers/driver")}
				/>

				<CustomTable
					head={DRIVERS_HEAD_DATA}
					disabledPagination={disabledPagination}
					handleChangePageSize={handleChangePageSize}
					remaining={`of ${DUMMY_DRIVER_DATA.length} results`}
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
								<TableCell>{item.mobile}</TableCell>
								<TableCell>{item.route}</TableCell>
								<TableCell>{item.city}</TableCell>
								<TableCell>{item.email}</TableCell>
								<TableCell>{item.onboarded}</TableCell>

								<TableCell>
									<button
										className={`h-[26px] py-1 px-3 rounded-[4px] text-xs leading-[18px] ${
											item?.status
												? "text-secondary-1100 bg-secondary-20"
												: "text-red-400 bg-red-20"
										}`}
									>
										{item?.status ? "Active" : "Inactive"}
									</button>
								</TableCell>

								<TableCell>
									<StarRating
										rating={rating > 0 ? rating : item?.rating}
										onRatingChange={setRating}
										starSize={24}
									/>
								</TableCell>
								<TableCell
									className='font-normal text-xs text-russian-violet-1200'
									onClick={() => router.push("/super-admin/drivers/driver/1")}
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

export default Drivers;
