"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useDriverSuccessfull } from "@/hooks";
import React from "react";

const CreateDriverSuccessfull = () => {
	const { router } = useDriverSuccessfull();

	return (
		<Layout>
			<PageTopBar heading='Add a new driver' />

			<SuccessfullCard
				heading='Driver added successfully!'
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that{" "}
					<span className='font-bold'>“Driver name"</span> has been successfully
					added.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default CreateDriverSuccessfull;
