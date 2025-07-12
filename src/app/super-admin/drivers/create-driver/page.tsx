"use client";
import { DriverForm, Layout, PageTopBar } from "@/components";
import { useCreateDriver } from "@/hooks";
import React from "react";

const CreateDriver = () => {
	const {
		handleChange,
		driverData,
		setDriverData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	} = useCreateDriver();

	return (
		<Layout>
			<PageTopBar heading='Add a new driver' />

			<DriverForm
				onSubmit={onSubmit}
				data={driverData}
				onChange={handleChange(setDriverData)}
				handleAutocompleteSearchChange={handleAutocompleteSearchChange}
				autocompleteFilters={autocompleteFilters}
				handleAutocompleteSelect={handleAutocompleteSelect}
				disabledSubmitButton={Object.keys(driverData).length === 0}
				handleOtp={(value) => {
					setDriverData((prev) => ({ ...prev, pin: value }));
				}}
			/>
		</Layout>
	);
};

export default CreateDriver;
