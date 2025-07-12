import { useRouter } from "next/navigation";

const useVehicleSuccessfull = () => {
	const router = useRouter();

	return {
		router,
	};
};
export default useVehicleSuccessfull;
