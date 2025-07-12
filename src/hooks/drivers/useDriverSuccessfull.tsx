import { useRouter } from "next/navigation";

const useDriverSuccessfull = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useDriverSuccessfull;
