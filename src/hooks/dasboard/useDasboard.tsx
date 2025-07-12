"use client";

import { useRouter } from "next/navigation";

const useDasboard = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useDasboard;
