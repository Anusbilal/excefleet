import { TAutocomplete } from "@/components/custom/Autocomplete";
import { DUMMY_EMPLOYEE_ROUTE } from "@/constant/autocomplete";
import { TRoute, TRouteEmployee, TRouteEmployeeRow } from "@/types/route.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCreateRoute = () => {
	const router = useRouter();
	const [routeData, setRouteData] = useState<Partial<TRoute>>({});
	const [employeeRows, setEmployeeRows] = useState<TRouteEmployeeRow[]>([]);

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TRoute>>>) =>
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
		(index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const query = e.target.value;

			// Update the search input immediately
			setEmployeeRows((prev) =>
				prev.map((row, i) =>
					i === index ? { ...row, employeeSearch: query } : row,
				),
			);

			// Fetch matching employees from API
			//   const results = await fetchEmployeesFromAPI(query);

			// Store the results in that row
			// setEmployeeRows((prev) =>
			// 	prev.map((row, i) =>
			// 		i === index ? { ...row, employeeSearch: query } : row,
			// 	),
			// );
		};

	const handleAutocompleteSelect =
		(index: number) => (item: TRouteEmployee) => {
			setEmployeeRows((prev) =>
				prev.map((row, i) =>
					i === index
						? {
								...row,
								employeeSelected: item,
								addressText: item?.address ?? "",
						  }
						: row,
				),
			);
		};

	const handleAddAnother = () => {
		setEmployeeRows((prev) => [
			...prev,
			{
				employeeSearch: "",
				employeeSelected: undefined,
				addressText: "",
				employeeOptions: DUMMY_EMPLOYEE_ROUTE,
			},
		]);
	};

	const onSubmit = () => {
		console.log({ routeData });
		router.push("/super-admin/route/create-route/successfull");
	};

	return {
		handleChange,
		routeData,
		setRouteData,
		employeeRows,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		handleAddAnother,
	};
};
export default useCreateRoute;
