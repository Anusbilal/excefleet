"use client";
import React from "react";
import { Button } from "../ui/button";
import CardContainer from "./CardContainer";
import { MarkerIcon } from "@/assets/svg";
import { TRoute, TRouteEmployee, TRouteEmployeeRow } from "@/types/route.types";
import Autocomplete from "./Autocomplete";
import { DUMMY_EMPLOYEE_ROUTE } from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import CustomInputField from "./CustomInputField";
import { Separator } from "../ui/separator";
import BackButton from "./BackButton";
import CustomGoogleMap from "./CustomGoogleMap";

type TProps = {
	onSubmit: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	data?: Partial<TRoute>;
	employeeRows: TRouteEmployeeRow[];
	handleAutocompleteSearchChange: (
		index: number,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAutocompleteSelect: (index: number) => (item: TRouteEmployee) => void;
	disabledSubmitButton: boolean;
	handleAddAnother: () => void;
};

const RouteForm = ({
	onSubmit,
	data,
	onChange,
	employeeRows,
	handleAutocompleteSearchChange,
	handleAutocompleteSelect,
	disabledSubmitButton,
	handleAddAnother,
}: TProps) => {
	return (
		<CardContainer className='gap-8 '>
			<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
				<div className='flex flex-col gap-2  md:col-span-2 '>
					<span className='text-lg leading-[26px]font-semibold text-neutral-1000'>
						Route name
					</span>

					<CustomInputField
						placeholder='Route name'
						name='route_name'
						value={data?.route_name || ""}
						onChange={onChange}
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
											onChange={(e) => handleAutocompleteSearchChange(index)(e)}
											selected={item?.employeeSelected}
											handleSelect={(item) =>
												handleAutocompleteSelect(index)(item)
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

				<div className='md:col-span-2 flex flex-col gap-4'>
					<span className='text-lg leading-[26px]  font-semibold text-neutral-1000'>
						Map
					</span>

					<CustomGoogleMap employeeRows={employeeRows} />
				</div>
			</div>

			<div className='flex w-full items-center justify-between mt-2'>
				<BackButton />

				<Button
					onClick={onSubmit}
					className='md:max-w-[350px] w-[50%]'
					disabled={disabledSubmitButton}
				>
					Submit
				</Button>
			</div>
		</CardContainer>
	);
};

export default RouteForm;
