"use client";
import { EmployeeForm, Layout, PageTopBar } from "@/components";
import { useUpdateEmployee } from "@/hooks";
import React from "react";

const UpdateEmployee = () => {
	const {
		handleChange,
		employeeData,
		setEmployeeData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	} = useUpdateEmployee();

	return (
		<Layout>
			<PageTopBar heading='Update Employee' />

			<EmployeeForm
				onSubmit={onSubmit}
				data={employeeData}
				onChange={handleChange(setEmployeeData)}
				handleAutocompleteSearchChange={handleAutocompleteSearchChange}
				autocompleteFilters={autocompleteFilters}
				handleAutocompleteSelect={handleAutocompleteSelect}
				disabledSubmitButton={Object.keys(employeeData).length === 0}
			/>
		</Layout>
	);
};

export default UpdateEmployee;
