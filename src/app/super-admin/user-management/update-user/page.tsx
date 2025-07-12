"use client";
import { UserForm, Layout, PageTopBar } from "@/components";
import { useUpdateUser } from "@/hooks";
import React from "react";

const UpdateUser = () => {
	const {
		handleChange,
		userData,
		setUserData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		handlePermission,
	} = useUpdateUser();

	return (
		<Layout>
			<PageTopBar heading='Update User' />

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

export default UpdateUser;
