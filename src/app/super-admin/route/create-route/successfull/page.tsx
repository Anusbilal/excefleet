"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useRouteSuccessfull } from "@/hooks";
import React from "react";

const CreateRouteSuccessfull = () => {
	const { router } = useRouteSuccessfull();

	return (
		<Layout>
			<PageTopBar heading='Add a new route' />

			<SuccessfullCard
				heading='Route added successfully!'
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that new{" "}
					<span className='font-bold'>“Route"</span> from{" "}
					<span className='font-bold'>North nazimabad</span> to{" "}
					<span className='font-bold'>Clifton</span> has been successfully
					added.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default CreateRouteSuccessfull;
