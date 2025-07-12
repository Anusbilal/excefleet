"use client";
import { Layout, PageTopBar, SuccessfullCard } from "@/components";
import { useCompanySuccessfull } from "@/hooks";
import React from "react";

const UpdateCompanySuccessfull = () => {
	const { router } = useCompanySuccessfull();

	return (
		<Layout>
			<PageTopBar heading='Update Company' />

			<SuccessfullCard
				heading='Company updated successfully!'
				secondaryButtonText='Back to dashboard'
				primaryButtonText='Add an empolyee'
				onPrimaryButtonClick={() =>
					router.push("/super-admin/employees/create-employee")
				}
				onSecondaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that "ABC Tech" has been successfully
					updated to our system! To get started with adding your team members,
					please click the link below.
				</span>
			</SuccessfullCard>
		</Layout>
	);
};

export default UpdateCompanySuccessfull;
