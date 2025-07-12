"use client";
import { EmployeeForm, Layout, PageTopBar } from "@/components";
import { useCreateEmployee } from "@/hooks";
import React from "react";

const CreateEmployee = () => {
	const {
		handleChange,
		employeeData,
		setEmployeeData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
	} = useCreateEmployee();

	return (
		<Layout>
			<PageTopBar heading='Add an new employee' />

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

export default CreateEmployee;
