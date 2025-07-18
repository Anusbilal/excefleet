"use client";
import { PageTopBar, SuccessfullCard } from "@/components";
import { useRouteSuccessfull } from "@/hooks";
import React from "react";

const RouteSuccessfull = () => {
	const { router, isUpdate } = useRouteSuccessfull();

	return (
		<>
			<PageTopBar heading={isUpdate ? "Update route" : "Add a new route"} />

			<SuccessfullCard
				heading={
					isUpdate ? "Route updated successfully!" : "Route added successfully!"
				}
				primaryButtonText='Back to dashboard'
				onPrimaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that new{" "}
					<span className='font-bold'>“Route"</span> from{" "}
					<span className='font-bold'>North nazimabad</span> to{" "}
					<span className='font-bold'>Clifton</span> has been successfully{" "}
					{isUpdate ? "updated" : "added"}.
				</span>
			</SuccessfullCard>
		</>
	);
};

export default RouteSuccessfull;
