"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useUserSuccessfull } from "@/hooks";
import React from "react";

const CreateUserSuccessfull = () => {
	const { router } = useUserSuccessfull();

	return (
		<Layout>
			<PageTopBar heading='User management' />

			<SuccessfullCard
				heading='User added successfully!'
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that new user{" "}
					<span className='font-bold'>“Ali Hamza"</span> as a user has been
					successfully added.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default CreateUserSuccessfull;
