"use client";
import { PageTopBar, SuccessfullCard } from "@/components";
import { useCompanySuccessfull } from "@/hooks";
import React from "react";

const CompanySuccessfull = () => {
	const { router, isUpdate } = useCompanySuccessfull();

	return (
		<>
			<PageTopBar heading={isUpdate ? "Update company" : "Add a new company"} />

			<SuccessfullCard
				heading={
					isUpdate
						? "Company updated successfully!"
						: "Company added successfully!"
				}
				secondaryButtonText='Back to dashboard'
				primaryButtonText='Add an empolyee'
				onPrimaryButtonClick={() =>
					router.push("/super-admin/employees/employee")
				}
				onSecondaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that "ABC Tech" has been successfully{" "}
					{isUpdate ? "updated" : "added"} to our system! To get started with
					adding your team members, please click the link below.
				</span>
			</SuccessfullCard>
		</>
	);
};

export default CompanySuccessfull;
