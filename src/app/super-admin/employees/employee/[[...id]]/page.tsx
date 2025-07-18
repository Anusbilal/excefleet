"use client";
import { Chevron, MarkerIcon } from "@/assets/svg";
import {
	Autocomplete,
	BackButton,
	CardContainer,
	CustomInputField,
	FileUploader,
	PageTopBar,
} from "@/components";
import { Button } from "@/components/ui/button";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { useAddOrUpdateEmployee } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import { UploadIcon, EyeOff, Eye } from "lucide-react";
import React from "react";

const AddOrUpdateEmployee = () => {
	const {
		handleChange,
		employeeData,
		setEmployeeData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		id,
		setShowPassword,
		showPassword,
	} = useAddOrUpdateEmployee();

	return (
		<>
			<PageTopBar heading={id ? "Update employee" : "Add an new employee"} />

			<CardContainer className='gap-10 '>
				<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Company details
					</span>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.company_id}
						onChange={handleAutocompleteSearchChange("company_id")}
						selected={employeeData?.company_id}
						handleSelect={handleAutocompleteSelect("company_id")}
						placeholder='Select company'
						icon={Chevron}
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.department}
						onChange={handleAutocompleteSearchChange("department")}
						selected={employeeData?.department}
						handleSelect={handleAutocompleteSelect("department")}
						placeholder='Department'
						icon={Chevron}
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.address}
						onChange={handleAutocompleteSearchChange("address")}
						selected={employeeData?.address}
						handleSelect={handleAutocompleteSelect("address")}
						placeholder='Address'
						icon={MarkerIcon}
						className='md:col-span-2'
						iconClassName='rotate-0'
						disabled
					/>

					<Separator className='md:col-span-2 my-2' />

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Employee details
					</span>

					<FileUploader
						icon={UploadIcon}
						title='Upload picture'
						handleFileChange={handleChange(setEmployeeData)}
						name='photo_url'
						containerClassName='md:col-span-2 md:max-w-[350px]'
						images={employeeData?.photo_url}
						imagesClassName='md:col-span-2'
					/>

					<CustomInputField
						placeholder='First name'
						name='first_name'
						value={employeeData?.first_name || ""}
						onChange={handleChange(setEmployeeData)}
					/>
					<CustomInputField
						placeholder='Last name'
						name='last_name'
						value={employeeData?.last_name || ""}
						onChange={handleChange(setEmployeeData)}
					/>
					<CustomInputField
						placeholder='Email address'
						name='email'
						value={employeeData?.email || ""}
						onChange={handleChange(setEmployeeData)}
					/>
					<CustomInputField
						placeholder='Mobile number'
						name='phone'
						value={employeeData?.phone || ""}
						onChange={handleChange(setEmployeeData)}
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.street_address}
						onChange={handleAutocompleteSearchChange("street_address")}
						selected={employeeData?.street_address}
						handleSelect={handleAutocompleteSelect("street_address")}
						placeholder='Street address'
						icon={MarkerIcon}
						className='md:col-span-2'
						iconClassName='rotate-0'
					/>

					<CustomInputField
						placeholder='State/Province'
						name='province'
						value={employeeData?.province || ""}
						onChange={handleChange(setEmployeeData)}
						disabled
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.city}
						onChange={handleAutocompleteSearchChange("city")}
						selected={employeeData?.city}
						handleSelect={handleAutocompleteSelect("city")}
						placeholder='Select city'
						icon={Chevron}
						disabled
					/>

					<Separator className='md:col-span-2 my-2' />

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Empolyee login
					</span>

					<CustomInputField
						placeholder='Employee email address'
						name='login_email'
						value={employeeData?.login_email || ""}
						onChange={handleChange(setEmployeeData)}
						disabled
					/>

					<CustomInputField
						postIcon={showPassword ? EyeOff : Eye}
						placeholder='Password'
						type={showPassword ? "text" : "password"}
						onViewPassword={() => setShowPassword(!showPassword)}
						name='password'
						value={employeeData?.password || ""}
						onChange={handleChange(setEmployeeData)}
					/>
				</div>

				<div className='flex w-full items-center justify-between'>
					<BackButton />

					<Button
						onClick={onSubmit}
						className='md:max-w-[350px] w-[50%]'
						disabled={Object.keys(employeeData).length === 0}
					>
						Submit
					</Button>
				</div>
			</CardContainer>
		</>
	);
};

export default AddOrUpdateEmployee;
