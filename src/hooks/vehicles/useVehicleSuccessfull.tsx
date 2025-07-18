import { useParams, useRouter } from "next/navigation";

const useVehicleSuccessfull = () => {
	const router = useRouter();
	const param = useParams();

	const [update, id] = param?.id || [];
	const isUpdate = update === "update";

	return {
		router,
		id,
		isUpdate,
	};
};
export default useVehicleSuccessfull;
