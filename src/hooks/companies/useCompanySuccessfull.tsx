import { useRouter } from "next/navigation";

const useCompanySuccessfull = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useCompanySuccessfull;
