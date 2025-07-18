import { TAutocomplete } from "@/components/custom/Autocomplete";
import { TDriver } from "@/types/driver.types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const useAddOrUpdateDriver = () => {
	const router = useRouter();
	const params = useParams();
	const [id] = params.id || [];
	const [driverData, setDriverData] = useState<Partial<TDriver>>({});
	const [autocompleteFilters, setAutocompleteFilters] = useState<
		Record<string, string>
	>({
		city: "",
		company_id: "",
		address: "",
	});
	const [isAssignCompany, setIsAssignCompany] = useState(false);

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TDriver>>>) =>
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
			setDriverData((prev) => ({
				...prev,
				[key]: undefined,
			}));
		};

	const handleAutocompleteSelect = (key: string) => (item: TAutocomplete) => {
		setDriverData((prev) => ({
			...prev,
			[key]: item,
		}));

		setAutocompleteFilters((prev) => ({
			...prev,
			[key]: "",
		}));
	};

	const onSubmit = () => {
		console.log({ driverData });

		router.push(
			`/super-admin/drivers/successfull/${id ? "update" : "create"}/${id ?? 1}`,
		);
	};

	return {
		handleChange,
		driverData,
		setDriverData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		setIsAssignCompany,
		isAssignCompany,
		id,
	};
};
export default useAddOrUpdateDriver;
