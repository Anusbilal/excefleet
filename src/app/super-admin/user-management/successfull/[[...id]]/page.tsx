"use client";
import { PageTopBar, SuccessfullCard } from "@/components";
import { useUserSuccessfull } from "@/hooks";
import React from "react";

const UserSuccessfull = () => {
	const { router, isUpdate } = useUserSuccessfull();

	return (
		<>
			<PageTopBar heading={isUpdate ? "Update user" : "User management"} />

			<SuccessfullCard
				heading={
					isUpdate ? "User updated successfully!" : "User added successfully!"
				}
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that new user{" "}
					<span className='font-bold'>“Ali Hamza"</span> as a user has been
					successfully {isUpdate ? "updated" : "added"}.
				</span>
			</SuccessfullCard>
		</>
	);
};

export default UserSuccessfull;
