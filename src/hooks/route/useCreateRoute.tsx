import { TAutocomplete } from "@/components/custom/Autocomplete";
import {
	DUMMY_AUTOCOMPLETE_DATA,
	DUMMY_EMPLOYEE_ROUTE,
} from "@/constant/autocomplete";
import {
	TRoute,
	TRouteDriverRow,
	TRouteEmployee,
	TRouteEmployeeRow,
} from "@/types/route.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCreateRoute = () => {
	const router = useRouter();
	const [routeData, setRouteData] = useState<Partial<TRoute>>({});
	const [employeeRows, setEmployeeRows] = useState<TRouteEmployeeRow[]>([]);
	const [driverRows, setDriverRows] = useState<TRouteDriverRow[]>([]);

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TRoute>>>) =>
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

	const handleAutocompleteSearchChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const query = e.target.value;

		// Update the search input immediately
		setEmployeeRows((prev) =>
			prev.map((row, i) =>
				i === index
					? {
							...row,
							employeeSearch: query,
							employeeSelected: undefined,
							addressText: "",
					  }
					: row,
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

	const handleAutocompleteSelect = (item: TRouteEmployee, index: number) => {
		setEmployeeRows((prev) =>
			prev.map((row, i) =>
				i === index
					? {
							...row,
							employeeSelected: item,
							addressText: item?.address ?? "",
							employeeSearch: "",
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

	const handleDriverSearch = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const query = e.target.value;

		// Update the search input immediately
		setDriverRows((prev) =>
			prev.map((row, i) =>
				i === index
					? { ...row, driverSearch: query, driverSelected: undefined }
					: row,
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

	const handleDriverSelect = (item: TAutocomplete, index: number) => {
		setDriverRows((prev) =>
			prev.map((row, i) =>
				i === index
					? {
							...row,
							driverSelected: item,
							driverSearch: "",
					  }
					: row,
			),
		);
	};

	const handleAddNewDriver = () => {
		setDriverRows((prev) => [
			...prev,
			{
				driverSearch: "",
				driverOptions: DUMMY_AUTOCOMPLETE_DATA,
				driverSelected: undefined,
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
		handleAddNewDriver,
		handleDriverSearch,
		handleDriverSelect,
		driverRows,
	};
};
export default useCreateRoute;
