"use client";
import { UserForm, Layout, PageTopBar } from "@/components";
import { useCreateUser } from "@/hooks";
import React from "react";

const CreateUser = () => {
	const {
		handleChange,
		userData,
		setUserData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		handlePermission,
	} = useCreateUser();

	return (
		<Layout>
			<PageTopBar heading='User management' />

			<UserForm
				onSubmit={onSubmit}
				data={userData}
				onChange={handleChange(setUserData)}
				handleAutocompleteSearchChange={handleAutocompleteSearchChange}
				autocompleteFilters={autocompleteFilters}
				handleAutocompleteSelect={handleAutocompleteSelect}
				disabledSubmitButton={Object.keys(userData).length === 0}
				handlePermission={handlePermission}
			/>
		</Layout>
	);
};

export default CreateUser;
