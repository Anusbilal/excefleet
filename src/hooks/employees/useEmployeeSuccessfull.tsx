import { useRouter } from "next/navigation";

const useEmployeeSuccessfull = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useEmployeeSuccessfull;
