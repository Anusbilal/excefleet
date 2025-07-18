import {
	Pagination,
	PaginationContent,
	PaginationItem,
	SelectRowsPerPage,
	PaginationLink,
	PaginationEllipsis,
} from "../ui/pagination";
import { PaginationArrow } from "@/assets/svg";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

export type THead = {
	title: string;
	className?: string;
};

type TProps = {
	head: THead[];
	children: React.ReactNode;
	handleChangePageSize?: (pageSize: number) => void;
	pageSize?: number;
	remaining?: string;
	handlePrevPage?: () => void;
	handleNextPage?: () => void;
	disabledPagination?: {
		prev: boolean;
		next: boolean;
	};
	totalPages?: number;
	handlePaginate?: (link: number) => void;
	page?: number;
};

const CustomTable = ({
	head,
	children,
	remaining,
	handleChangePageSize,
	pageSize = 10,
	handlePrevPage,
	handleNextPage,
	disabledPagination,
	totalPages,
	handlePaginate,
	page,
}: TProps) => {
	return (
		<div className='w-full bg-white border border-neutral-200 shadow-[0px_16px_32px_-4px_#0C0C0D1A] rounded-[8px] overflow-hidden'>
			<Table>
				<TableHeader>
					<TableRow className='!border-b-2 border-secondary-600 hover:bg-background-10  bg-background-10  '>
						{head.map((item, index) => {
							return (
								<TableHead key={index} className={cn("", item?.className)}>
									{item?.title}
								</TableHead>
							);
						})}
					</TableRow>
				</TableHeader>
				<TableBody>{children}</TableBody>
			</Table>

			{remaining && handleChangePageSize && (
				<div
					className={`flex items-center w-full justify-between min-h-[88px] border-t border-russian-violet-1100 py-5 gap-5 px-4 flex-wrap `}
				>
					<div className='flex items-center gap-4 flex-wrap'>
						<SelectRowsPerPage
							options={[5, 10, 20]}
							setPageSize={handleChangePageSize}
							pageSize={pageSize}
						/>

						<span className='text-primary-foreground text-sm font-semibold'>
							{remaining}
						</span>
					</div>

					{page && totalPages && totalPages > 1 && (
						<Pagination className=' overflow-x-auto max-w-full whitespace-nowrap  pb-2 sm:pb-0'>
							<PaginationContent>
								<PaginationItem>
									<PaginationLink
										aria-label='Go to prev page'
										size='default'
										className={`
									${
										!disabledPagination?.prev
											? "hover:!text-primary-20 !text-neutral-800"
											: "cursor-default hover:!bg-transparent !text-neutral-1400"
									} rotate-180`}
										onClick={handlePrevPage}
									>
										<PaginationArrow width={16} height={16} />
									</PaginationLink>
								</PaginationItem>

								<>
									<PaginationItem>
										<PaginationLink
											onClick={() => handlePaginate!(0)}
											isActive={page === 1}
											size='sm'
										>
											1
										</PaginationLink>
									</PaginationItem>

									{page > 2 && totalPages > 3 && (
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
									)}

									{Array.from({ length: totalPages }, (_, i) => i + 1)
										.filter(
											(p) =>
												p !== 1 &&
												p !== totalPages &&
												p >= page - 1 &&
												p <= page + 1,
										)
										.map((p) => (
											<PaginationItem key={p}>
												<PaginationLink
													onClick={() => handlePaginate!(p - 1)}
													isActive={page === p}
													size='sm'
												>
													{p}
												</PaginationLink>
											</PaginationItem>
										))}

									{page < totalPages - 1 && totalPages > 3 && (
										<PaginationItem>
											<PaginationEllipsis />
										</PaginationItem>
									)}

									{totalPages > 1 && (
										<PaginationItem>
											<PaginationLink
												onClick={() => handlePaginate!(totalPages - 1)}
												isActive={page === totalPages}
												size='sm'
											>
												{totalPages}
											</PaginationLink>
										</PaginationItem>
									)}
								</>

								<PaginationItem>
									<PaginationLink
										aria-label='Go to next page'
										size='default'
										className={`
									${
										!disabledPagination?.next
											? "hover:!text-primary-20 !text-neutral-800"
											: "cursor-default hover:!bg-transparent !text-neutral-1400"
									}`}
										onClick={handleNextPage}
									>
										<PaginationArrow width={16} height={16} />
									</PaginationLink>
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					)}
				</div>
			)}
		</div>
	);
};

export default CustomTable;
