"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useDriverSuccessfull } from "@/hooks";
import React from "react";

const UpdateDriverSuccessfull = () => {
	const { router } = useDriverSuccessfull();

	return (
		<Layout>
			<PageTopBar heading='Update driver' />

			<SuccessfullCard
				heading='Driver updated successfully!'
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that{" "}
					<span className='font-bold'>“Driver name"</span> has been successfully
					updated.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default UpdateDriverSuccessfull;
