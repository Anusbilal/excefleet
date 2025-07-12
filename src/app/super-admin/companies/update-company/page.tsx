"use client";
import { CompanyForm, Layout, PageTopBar } from "@/components";
import { useUpdateCompany } from "@/hooks";
import React from "react";

const UpdateCompany = () => {
	const {
		handleChange,
		companyData,
		setCompanyData,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		autocompleteFilters,
		onSubmit,
	} = useUpdateCompany();

	return (
		<Layout>
			<PageTopBar heading='Update Company' />

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

export default UpdateCompany;
