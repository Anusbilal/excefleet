"use client";
import { RouteForm, Layout, PageTopBar } from "@/components";
import { useUpdateRoute } from "@/hooks";
import React from "react";

const UpdateRoute = () => {
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
	} = useUpdateRoute();

	return (
		<Layout>
			<PageTopBar heading='Update Route' />

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

export default UpdateRoute;
