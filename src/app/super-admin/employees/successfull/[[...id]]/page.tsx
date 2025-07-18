"use client";
import { PageTopBar, SuccessfullCard } from "@/components";
import { useEmployeeSuccessfull } from "@/hooks";
import React from "react";

const EmployeeSuccessfull = () => {
	const { router, isUpdate } = useEmployeeSuccessfull();

	return (
		<>
			<PageTopBar
				heading={isUpdate ? "Update employee" : "Add a new employee"}
			/>

			<SuccessfullCard
				heading={
					isUpdate
						? "Employee updated successfully!"
						: "Employee added successfully!"
				}
				secondaryButtonText='Back to dashboard'
				primaryButtonText='Add an empolyee'
				onPrimaryButtonClick={() =>
					router.push("/super-admin/employees/employee")
				}
				onSecondaryButtonClick={() => router.push("/super-admin/dashboard")}
			>
				<span className='text-sm text-neutral-900 leading-5 text-center'>
					We are excited to announce that{" "}
					<span className='font-bold'>“Saima Nabil"</span> has been successfully{" "}
					{isUpdate ? "updated" : "added"} to{" "}
					<span className='font-bold'>“ABC Tech"</span>.
				</span>
			</SuccessfullCard>
		</>
	);
};

export default EmployeeSuccessfull;
