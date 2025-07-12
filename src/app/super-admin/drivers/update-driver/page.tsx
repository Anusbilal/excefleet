"use client";
import { DriverForm, Layout, PageTopBar } from "@/components";
import { useUpdateDriver } from "@/hooks";
import React from "react";

const UpdateDriver = () => {
	const {
		handleChange,
		driverData,
		setDriverData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	} = useUpdateDriver();

	return (
		<Layout>
			<PageTopBar heading='Update driver' />

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

export default UpdateDriver;
