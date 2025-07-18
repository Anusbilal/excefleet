import { TAutocomplete } from "@/components/custom/Autocomplete";
import { TEmpolyee } from "@/types/empolyee.types";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const useAddOrUpdateEmployee = () => {
	const router = useRouter();
	const params = useParams();
	const [id] = params.id || [];
	const [employeeData, setEmployeeData] = useState<Partial<TEmpolyee>>({});
	const [showPassword, setShowPassword] = useState(false);
	const [autocompleteFilters, setAutocompleteFilters] = useState<
		Record<string, string>
	>({
		company_id: "",
		department: "",
		address: "",
		street_address: "",
	});

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TEmpolyee>>>) =>
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
			setEmployeeData((prev) => ({
				...prev,
				[key]: undefined,
			}));
		};

	const handleAutocompleteSelect = (key: string) => (item: TAutocomplete) => {
		setEmployeeData((prev) => ({
			...prev,
			[key]: item,
		}));

		setAutocompleteFilters((prev) => ({
			...prev,
			[key]: "",
		}));
	};

	const onSubmit = () => {
		console.log({ employeeData });

		router.push(
			`/super-admin/employees/successfull/${id ? "update" : "create"}/${
				id ?? 1
			}`,
		);
	};

	return {
		handleChange,
		employeeData,
		setEmployeeData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		id,
		setShowPassword,
		showPassword,
	};
};
export default useAddOrUpdateEmployee;
