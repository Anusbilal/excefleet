import { TAutocomplete } from "@/components/custom/Autocomplete";
import { TVehicle } from "@/types/vehicle.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useUpdateVehicle = () => {
	const router = useRouter();
	const [vehicleData, setVehicleData] = useState<Partial<TVehicle>>({});
	const [autocompleteFilters, setAutocompleteFilters] = useState<
		Record<string, string>
	>({
		registration_city: "",
		street_address: "",
		driver_id: "",
	});

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TVehicle>>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			let value: unknown;
			if (event?.target) {
				if (event.target.type === "file") {
					value = event.target.files ?? undefined;
				} else {
					value = event.target.value;
				}
			}

			setter((prev) => ({
				...prev,
				[event.target.name]: value,
			}));
		};

	const handleAutocompleteSearchChange =
		(key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setAutocompleteFilters((prev) => ({
				...prev,
				[key]: e.target.value,
			}));
			setVehicleData((prev) => ({
				...prev,
				[key]: undefined,
			}));
		};

	const handleAutocompleteSelect = (key: string) => (item: TAutocomplete) => {
		setVehicleData((prev) => ({
			...prev,
			[key]: item,
		}));

		setAutocompleteFilters((prev) => ({
			...prev,
			[key]: "",
		}));
	};

	const onSubmit = () => {
		console.log({ vehicleData });
		router.push("/super-admin/vehicle/update-vehicle/successfull");
	};

	return {
		handleChange,
		vehicleData,
		setVehicleData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	};
};
export default useUpdateVehicle;
