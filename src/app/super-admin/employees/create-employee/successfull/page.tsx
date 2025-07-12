"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useEmployeeSuccessfull } from "@/hooks";
import React from "react";

const CreateEmployeeSuccessfull = () => {
	const { router } = useEmployeeSuccessfull();

	return (
		<Layout>
			<PageTopBar heading='Add an new employee' />

			<SuccessfullCard
				heading='Employee added successfully!'
				secondaryButtonText='Back to dashboard'
				primaryButtonText='Add an empolyee'
				onPrimaryButtonClick={() =>
					router.push("/super-admin/employees/create-employee")
				}
				onSecondaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that{" "}
					<span className='font-bold'>“Saima Nabil"</span> has been successfully
					added to <span className='font-bold'>“ABC Tech"</span>.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default CreateEmployeeSuccessfull;
