"use client";
import { PageTopBar, SuccessfullCard } from "@/components";
import { useDriverSuccessfull } from "@/hooks";
import React from "react";

const DriverSuccessfull = () => {
	const { router, isUpdate } = useDriverSuccessfull();

	return (
		<>
			<PageTopBar heading={isUpdate ? "Update driver" : "Add a new driver"} />

			<SuccessfullCard
				heading={
					isUpdate
						? "Driver updated successfully!"
						: "Driver added successfully!"
				}
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that{" "}
					<span className='font-bold'>“Driver name"</span> has been successfully{" "}
					{isUpdate ? "updated" : "added"}.
				</span>
			</SuccessfullCard>
		</>
	);
};

export default DriverSuccessfull;
