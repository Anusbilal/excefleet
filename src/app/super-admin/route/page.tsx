"use client";
import { Chevron, Route } from "@/assets/svg";
import { Layout, PageTopBar, TablePageCard, CustomTable } from "@/components";
import { TableRow, TableCell } from "@/components/ui/table";
import { ROUTE_DATA, ROUTE_HEAD_DATA } from "@/constant/tableData";
import { useRoute } from "@/hooks";
import React from "react";

const RoutePage = () => {
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
	} = useRoute();

	return (
		<Layout>
			<PageTopBar heading='Route' isSearchBar />

			<div className='flex flex-col gap-5 md:gap-10'>
				<TablePageCard
					heading='Add a new Route'
					subHeading='You can begin adding new route right from this point.'
					buttontitle='Start adding route'
					icon={Route}
					onClick={() => router.push("/super-admin/route/create-route")}
				/>

				<CustomTable
					head={ROUTE_HEAD_DATA}
					disabledPagination={disabledPagination}
					handleChangePageSize={handleChangePageSize}
					remaining={`of ${ROUTE_DATA.length} results`}
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
								<TableCell>{item.route}</TableCell>
								<TableCell>{item.vehicle}</TableCell>
								<TableCell>{item.driver}</TableCell>
								<TableCell>{item.driverNumber}</TableCell>
								<TableCell>{item.city}</TableCell>
								<TableCell>{item.from}</TableCell>
								<TableCell>{item.to}</TableCell>
								<TableCell
									className='font-normal text-xs text-russian-violet-1200'
									onClick={() => router.push("/super-admin/route/update-route")}
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

export default RoutePage;
