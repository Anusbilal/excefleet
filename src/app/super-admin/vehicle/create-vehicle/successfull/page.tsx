"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useVehicleSuccessfull } from "@/hooks";
import React from "react";

const CreateVehicleSuccessfull = () => {
	const { router } = useVehicleSuccessfull();

	return (
		<Layout>
			<PageTopBar heading='Add a new vehicle' />

			<SuccessfullCard
				heading='Vehicle added successfully!'
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that Vehicle registration number{" "}
					<span className='font-bold'>“ABC - 786"</span> has been successfully
					added.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default CreateVehicleSuccessfull;
