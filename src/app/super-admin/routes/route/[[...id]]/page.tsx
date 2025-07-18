"use client";
import { Chevron, MarkerIcon } from "@/assets/svg";
import {
	PageTopBar,
	Autocomplete,
	BackButton,
	CardContainer,
	CustomGoogleMap,
	CustomInputField,
} from "@/components";
import { Button } from "@/components/ui/button";
import { DUMMY_EMPLOYEE_ROUTE } from "@/constant/autocomplete";
import { useAddOrUpdateRoute } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import React from "react";

const AddOrUpdateRoute = () => {
	const {
		handleChange,
		routeData,
		setRouteData,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		employeeRows,
		handleAddAnother,
		handleAddNewDriver,
		handleDriverSearch,
		handleDriverSelect,
		driverRows,
		id,
	} = useAddOrUpdateRoute();

	return (
		<>
			<PageTopBar heading={id ? "Update route" : "Add a new route"} />

			<CardContainer className='gap-10 '>
				<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-8'>
					<div className='flex flex-col gap-2  md:col-span-2 '>
						<span className='text-lg leading-[26px]font-semibold text-neutral-1000'>
							Route name
						</span>

						<CustomInputField
							placeholder='Route name'
							name='route_name'
							value={routeData?.route_name || ""}
							onChange={handleChange(setRouteData)}
						/>
					</div>

					<div className='flex flex-col gap-4 md:col-span-2'>
						<span className='text-lg leading-[26px] font-semibold text-neutral-1000'>
							Select employee
						</span>

						<div className='flex flex-col gap-[10px] '>
							{employeeRows.map((item, index) => {
								return (
									<div className='flex items-center gap-4 ' key={index}>
										<span className='text-lg leading-[26px] font-semibold text-neutral-1000 min-w-[24px] text-right'>
											{index + 1}.
										</span>
										<div className='flex flex-col md:flex-row md:items-center flex-wrap gap-[10px] md:gap-4 w-full'>
											<Autocomplete<(typeof DUMMY_EMPLOYEE_ROUTE)[number]>
												data={item?.employeeOptions}
												value={item.employeeSearch}
												onChange={(e) =>
													handleAutocompleteSearchChange(e, index)
												}
												selected={item?.employeeSelected}
												handleSelect={(item) =>
													handleAutocompleteSelect(item, index)
												}
												placeholder='Select employee'
												icon={Chevron}
												className='flex-1  md:max-w-[200px] '
											/>

											<Autocomplete
												value={item?.addressText}
												placeholder='Street address'
												icon={MarkerIcon}
												iconClassName='rotate-0'
												disabled
												className='flex-1 md:max-w-full'
											/>
										</div>
									</div>
								);
							})}

							<Separator className='md:col-span-2 my-2' />

							<Button
								variant='outline'
								className=' md:max-w-[150px] border border-russian-violet-500 rounded-[8px] p-4 text-russian-violet-500'
								onClick={handleAddAnother}
							>
								Add another
							</Button>
						</div>
					</div>

					<div className='md:col-span-2 flex flex-col gap-4 '>
						<span className='text-lg leading-[26px]  font-semibold text-neutral-1000'>
							Map
						</span>

						<CustomGoogleMap employeeRows={employeeRows} />
					</div>

					<Separator className='md:col-span-2 my-2' />

					<div className='md:col-span-2 flex flex-col gap-4'>
						<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
							Select driver
						</span>

						{driverRows.map((item, index) => {
							return (
								<Autocomplete
									key={index}
									data={item?.driverOptions}
									value={item?.driverSearch}
									onChange={(e) => handleDriverSearch(e, index)}
									selected={item?.driverSelected}
									handleSelect={(e) => handleDriverSelect(e, index)}
									placeholder='Select driver'
									icon={Chevron}
									className='md:max-w-[350px]'
								/>
							);
						})}

						<Button
							variant='outline'
							className=' md:max-w-[200px]  border border-russian-violet-500 rounded-[8px] p-4 text-russian-violet-500'
							onClick={handleAddNewDriver}
						>
							Add a new driver
						</Button>
					</div>
				</div>

				<div className='flex w-full items-center justify-between '>
					<BackButton />

					<Button
						onClick={onSubmit}
						className='md:max-w-[350px] w-[50%]'
						disabled={Object.keys(routeData).length === 0}
					>
						Submit
					</Button>
				</div>
			</CardContainer>
		</>
	);
};

export default AddOrUpdateRoute;
