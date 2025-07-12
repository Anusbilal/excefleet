"use client";
import { VehicleForm, Layout, PageTopBar } from "@/components";
import { useCreateVehicle } from "@/hooks";
import React from "react";

const CreateVehicle = () => {
	const {
		handleChange,
		vehicleData,
		setVehicleData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	} = useCreateVehicle();

	return (
		<Layout>
			<PageTopBar heading='Add a new vehicle' />

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

export default CreateVehicle;
