import { useRouter } from "next/navigation";

const useRouteSuccessfull = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useRouteSuccessfull;
