"use client";
import { RouteForm, Layout, PageTopBar } from "@/components";
import { useCreateRoute } from "@/hooks";
import React from "react";

const CreateRoute = () => {
	const {
		handleChange,
		routeData,
		setRouteData,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		employeeRows,
		handleAddAnother,
		handleAddNewDriver,
		handleDriverSearch,
		handleDriverSelect,
		driverRows,
	} = useCreateRoute();

	return (
		<Layout>
			<PageTopBar heading='Add a new route' />

			<RouteForm
				onSubmit={onSubmit}
				data={routeData}
				onChange={handleChange(setRouteData)}
				handleAutocompleteSearchChange={handleAutocompleteSearchChange}
				employeeRows={employeeRows}
				handleAutocompleteSelect={handleAutocompleteSelect}
				disabledSubmitButton={Object.keys(routeData).length === 0}
				handleAddAnother={handleAddAnother}
				driverRows={driverRows}
				handleAddNewDriver={handleAddNewDriver}
				handleDriverSearch={handleDriverSearch}
				handleDriverSelect={handleDriverSelect}
			/>
		</Layout>
	);
};

export default CreateRoute;
