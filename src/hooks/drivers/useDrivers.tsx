"use client";
import { DUMMY_DRIVER_DATA } from "@/constant/tableData";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const useDrivers = () => {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const router = useRouter();

	const totalPages = Math.ceil(DUMMY_DRIVER_DATA.length / pageSize);

	const disabledPagination = {
		prev: page === 1,
		next: page === totalPages,
	};

	// Paginated slice of data
	const currentPageData = useMemo(() => {
		const startIndex = (page - 1) * pageSize;
		return DUMMY_DRIVER_DATA.slice(startIndex, startIndex + pageSize);
	}, [page, pageSize]);

	const handleChangePageSize = (newSize: number) => {
		setPageSize(newSize);
		setPage(1);
	};

	const handleNextPage = () => {
		if (page >= totalPages) return;
		setPage(page + 1);
	};

	const handlePrevPage = () => {
		if (page <= 1) return;
		setPage(page - 1);
	};

	return {
		handleChangePageSize,
		handleNextPage,
		handlePrevPage,
		currentPageData,
		disabledPagination,
		totalPages,
		pageSize,
		setPage,
		page,
		router,
	};
};
export default useDrivers;
