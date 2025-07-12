"use client";
import { CompanyForm, Layout, PageTopBar } from "@/components";
import { useCreateCompany } from "@/hooks";
import React from "react";

const CreateCompany = () => {
	const {
		handleChange,
		companyData,
		setCompanyData,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		autocompleteFilters,
		onSubmit,
	} = useCreateCompany();

	return (
		<Layout>
			<PageTopBar heading='Add a new company' />

			<CompanyForm
				onSubmit={onSubmit}
				data={companyData}
				onChange={handleChange(setCompanyData)}
				handleAutocompleteSearchChange={handleAutocompleteSearchChange}
				autocompleteFilters={autocompleteFilters}
				handleAutocompleteSelect={handleAutocompleteSelect}
				handleAdditionalOffices={(value) => {
					setCompanyData((prev) => ({
						...prev,
						additional_office: value,
					}));
				}}
				disabledSubmitButton={Object.keys(companyData).length === 1}
			/>
		</Layout>
	);
};

export default CreateCompany;
