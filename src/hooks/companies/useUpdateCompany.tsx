import { TAutocomplete } from "@/components/custom/Autocomplete";
import { TCompany } from "@/types/company.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useUpdateCompany = () => {
	const router = useRouter();
	const [companyData, setCompanyData] = useState<Partial<TCompany>>({
		additional_office: false,
	});
	const [autocompleteFilters, setAutocompleteFilters] = useState<
		Record<string, string>
	>({
		bussiness_nature: "",
		city: "",
		number_of_employees: "",
		address: "",
	});

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TCompany>>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			let value: unknown;
			if (event?.target) {
				if (event.target.type === "file") {
					value = event.target.files?.[0] ?? undefined;
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
			setCompanyData((prev) => ({
				...prev,
				[key]: undefined,
			}));
		};

	const handleAutocompleteSelect = (key: string) => (item: TAutocomplete) => {
		setCompanyData((prev) => ({
			...prev,
			[key]: item,
		}));

		setAutocompleteFilters((prev) => ({
			...prev,
			[key]: "",
		}));
	};

	const onSubmit = () => {
		console.log({ companyData });
		router.push("/super-admin/companies/update-company/successfull");
	};

	return {
		handleChange,
		companyData,
		setCompanyData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	};
};
export default useUpdateCompany;
