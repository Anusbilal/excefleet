"use client";
import { DummyUser } from "@/assets/images";
import { Layout, PageTopBar, CustomTable, TablePageCard } from "@/components";
import { TableCell, TableRow } from "@/components/ui/table";
import { COMPANY_HEAD_DATA, DUMMY_DATA } from "@/constant/tableData";
import { useCompanies } from "@/hooks";
import Image from "next/image";
import React from "react";
import { Chevron, Companies as CompaniesIcon } from "@/assets/svg";

const Companies = () => {
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
	} = useCompanies();

	return (
		<Layout>
			<PageTopBar heading='Companies' isSearchBar />

			<div className='flex flex-col gap-5 md:gap-10'>
				<TablePageCard
					heading='Create a new business'
					subHeading='You can begin adding new companies right from this point.'
					buttontitle='Start adding company'
					icon={CompaniesIcon}
					onClick={() => router.push("/super-admin/companies/create-company")}
				/>

				<CustomTable
					head={COMPANY_HEAD_DATA}
					disabledPagination={disabledPagination}
					handleChangePageSize={handleChangePageSize}
					remaining={`of ${DUMMY_DATA.length} results`}
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

export default Companies;
