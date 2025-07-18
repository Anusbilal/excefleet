"use client";
import { PageTopBar, SuccessfullCard } from "@/components";
import { useVehicleSuccessfull } from "@/hooks";
import React from "react";

const VehicleSuccessfull = () => {
	const { router, isUpdate } = useVehicleSuccessfull();

	return (
		<>
			<PageTopBar heading={isUpdate ? "Update vehicle" : "Add a new vehicle"} />

			<SuccessfullCard
				heading={
					isUpdate
						? "Vehicle updated successfully!"
						: "Vehicle added successfully!"
				}
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that Vehicle registration number{" "}
					<span className='font-bold'>“ABC - 786"</span> has been successfully{" "}
					{isUpdate ? "updated" : "added"}.
				</span>
			</SuccessfullCard>
		</>
	);
};

export default VehicleSuccessfull;
