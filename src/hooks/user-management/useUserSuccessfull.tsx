import { useRouter } from "next/navigation";

const useUserSuccessfull = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useUserSuccessfull;
