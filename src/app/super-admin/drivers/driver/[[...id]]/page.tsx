"use client";
import { MarkerIcon, Chevron } from "@/assets/svg";
import {
	Autocomplete,
	BackButton,
	CardContainer,
	CustomInputField,
	CustomOtp,
	FileUploader,
	PageTopBar,
} from "@/components";
import { Button } from "@/components/ui/button";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { useAddOrUpdateDriver } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import { UploadIcon, DeleteIcon } from "lucide-react";
import React from "react";

const AddOrUpdateDriver = () => {
	const {
		handleChange,
		driverData,
		setDriverData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		setIsAssignCompany,
		isAssignCompany,
		id,
	} = useAddOrUpdateDriver();

	return (
		<>
			<PageTopBar heading={id ? "Update driver" : "Add a new driver"} />

			<CardContainer className='gap-10 '>
				<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
					<FileUploader
						icon={UploadIcon}
						title='Upload picture'
						handleFileChange={handleChange(setDriverData)}
						name='photo_url'
						containerClassName='md:col-span-2 lg:max-w-[350px]'
						images={driverData?.photo_url}
						imagesClassName='md:col-span-2'
					/>

					<CustomInputField
						placeholder='First name'
						name='first_name'
						value={driverData?.first_name || ""}
						onChange={handleChange(setDriverData)}
					/>

					<CustomInputField
						placeholder='Last name'
						name='last_name'
						value={driverData?.last_name || ""}
						onChange={handleChange(setDriverData)}
					/>

					<CustomInputField
						placeholder='Email address (optional)'
						name='email'
						value={driverData?.email || ""}
						onChange={handleChange(setDriverData)}
					/>

					<CustomInputField
						placeholder='Mobile number'
						name='phone'
						value={driverData?.phone || ""}
						onChange={handleChange(setDriverData)}
					/>

					<CustomInputField
						placeholder='Contractor'
						name='contractor'
						value={driverData?.contractor || ""}
						onChange={handleChange(setDriverData)}
						className='md:col-span-2 lg:max-w-[350px]'
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.address}
						onChange={handleAutocompleteSearchChange("address")}
						selected={driverData?.address}
						handleSelect={handleAutocompleteSelect("address")}
						placeholder='Street address'
						icon={MarkerIcon}
						className='md:col-span-2'
						iconClassName='rotate-0'
					/>

					<CustomInputField
						placeholder='State/Province'
						name='province'
						value={driverData?.province || ""}
						onChange={handleChange(setDriverData)}
						disabled
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.city}
						onChange={handleAutocompleteSearchChange("city")}
						selected={driverData?.city}
						handleSelect={handleAutocompleteSelect("city")}
						placeholder='Select city'
						icon={Chevron}
						disabled
					/>

					<Separator className='md:col-span-2 my-2' />

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Driver documents
					</span>

					<div className='md:col-span-2 flex flex-col md:flex-row md:items-center gap-4'>
						<FileUploader
							icon={UploadIcon}
							title='Upload CNIC'
							handleFileChange={handleChange(setDriverData)}
							name='cnic_image_url'
							containerClassName='md:max-w-[350px] w-full'
							images={driverData?.cnic_image_url}
						/>

						<FileUploader
							icon={UploadIcon}
							title='Upload Driving license'
							handleFileChange={handleChange(setDriverData)}
							name='license_image_url'
							containerClassName='md:max-w-[350px] w-full'
							images={driverData?.license_image_url}
						/>
					</div>

					<Button
						variant='outline'
						className='md:col-span-2 md:max-w-[150px] border border-russian-violet-500 rounded-[8px] p-4 text-russian-violet-500'
					>
						Add documents
					</Button>

					<Separator className='md:col-span-2 my-2' />

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Driver login
					</span>

					<CustomInputField
						placeholder='Mobile number'
						name='phone'
						value={driverData?.login_phone || ""}
						onChange={handleChange(setDriverData)}
						disabled
						className='md:col-span-2 md:max-w-[350px] xl:col-span-1'
					/>

					<CustomOtp
						onChange={(value) => {
							setDriverData((prev) => ({ ...prev, pin: value }));
						}}
						value={driverData?.pin || ""}
						className='md:col-span-2 xl:col-span-1'
					/>

					{isAssignCompany ? (
						<>
							<Separator className='md:col-span-2 my-2' />
							<div className='flex items-center justify-between md:col-span-2'>
								<span className='text-lg leading-[26px]  font-semibold text-neutral-1000'>
									Company details
								</span>

								<DeleteIcon
									className='size-6 cursor-pointer'
									onClick={() => setIsAssignCompany(false)}
								/>
							</div>

							<Autocomplete
								data={DUMMY_AUTOCOMPLETE_DATA}
								value={autocompleteFilters.company_id}
								onChange={handleAutocompleteSearchChange("company_id")}
								selected={driverData?.company_id}
								handleSelect={handleAutocompleteSelect("company_id")}
								placeholder='Select company'
								icon={Chevron}
							/>

							<Autocomplete
								data={DUMMY_AUTOCOMPLETE_DATA}
								value={autocompleteFilters.address}
								onChange={handleAutocompleteSearchChange("address")}
								selected={driverData?.address}
								handleSelect={handleAutocompleteSelect("address")}
								placeholder='Address'
								icon={MarkerIcon}
								className='md:col-span-2'
								iconClassName='rotate-0'
								disabled
							/>
						</>
					) : (
						<Button
							className='md:col-span-2 md:max-w-[350px] cursor-pointer'
							onClick={() => setIsAssignCompany(true)}
						>
							Assign company
						</Button>
					)}
				</div>

				<div className='flex w-full items-center justify-between'>
					<BackButton />

					<Button
						onClick={onSubmit}
						className='md:max-w-[350px] w-[50%]'
						disabled={Object.keys(driverData).length === 0}
					>
						Submit
					</Button>
				</div>
			</CardContainer>
		</>
	);
};

export default AddOrUpdateDriver;
