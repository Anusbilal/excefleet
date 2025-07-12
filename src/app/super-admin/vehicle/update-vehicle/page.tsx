"use client";
import { VehicleForm, Layout, PageTopBar } from "@/components";
import { useUpdateVehicle } from "@/hooks";
import React from "react";

const UpdateVehicle = () => {
	const {
		handleChange,
		vehicleData,
		setVehicleData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	} = useUpdateVehicle();

	return (
		<Layout>
			<PageTopBar heading='Update Vehicle' />
			<VehicleForm
				onSubmit={onSubmit}
				data={vehicleData}
				onChange={handleChange(setVehicleData)}
				handleAutocompleteSearchChange={handleAutocompleteSearchChange}
				autocompleteFilters={autocompleteFilters}
				handleAutocompleteSelect={handleAutocompleteSelect}
				disabledSubmitButton={Object.keys(vehicleData).length === 0}
			/>
		</Layout>
	);
};

export default UpdateVehicle;
