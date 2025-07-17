"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CardContainer from "./CardContainer";
import FileUploader from "./FileUploader";
import { DeleteIcon, MarkerIcon, UploadIcon } from "@/assets/svg";
import { TDriver } from "@/types/driver.types";
import Autocomplete, { TAutocomplete } from "./Autocomplete";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import CustomInputField from "./CustomInputField";
import { Separator } from "../ui/separator";
import BackButton from "./BackButton";
import CustomOtp from "./CustomOtp";

type TProps = {
	onSubmit: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	data?: Partial<TDriver>;
	autocompleteFilters: Record<string, string>;
	handleAutocompleteSearchChange: (
		key: string,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAutocompleteSelect: (key: string) => (e: TAutocomplete) => void;
	disabledSubmitButton: boolean;
	handleOtp: (value: string) => void;
};

const DriverForm = ({
	onSubmit,
	data,
	onChange,
	autocompleteFilters,
	handleAutocompleteSearchChange,
	handleAutocompleteSelect,
	disabledSubmitButton,
	handleOtp,
}: TProps) => {
	const [isAssignCompany, setIsAssignCompany] = useState(false);

	return (
		<CardContainer className='gap-10 '>
			<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
				<FileUploader
					icon={UploadIcon}
					title='Upload picture'
					handleFileChange={onChange}
					name='photo_url'
					containerClassName='md:col-span-2 lg:max-w-[350px]'
					images={data?.photo_url}
					imagesClassName='md:col-span-2'
				/>

				<CustomInputField
					placeholder='First name'
					name='first_name'
					value={data?.first_name || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Last name'
					name='last_name'
					value={data?.last_name || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Email address (optional)'
					name='email'
					value={data?.email || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Mobile number'
					name='phone'
					value={data?.phone || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Contractor'
					name='contractor'
					value={data?.contractor || ""}
					onChange={onChange}
					className='md:col-span-2 lg:max-w-[350px]'
				/>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.address}
					onChange={handleAutocompleteSearchChange("address")}
					selected={data?.address}
					handleSelect={handleAutocompleteSelect("address")}
					placeholder='Street address'
					icon={MarkerIcon}
					className='md:col-span-2'
					iconClassName='rotate-0'
				/>

				<CustomInputField
					placeholder='State/Province'
					name='province'
					value={data?.province || ""}
					onChange={onChange}
					disabled
				/>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.city}
					onChange={handleAutocompleteSearchChange("city")}
					selected={data?.city}
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
						handleFileChange={onChange}
						name='cnic_image_url'
						containerClassName='md:max-w-[350px] w-full'
						images={data?.cnic_image_url}
					/>

					<FileUploader
						icon={UploadIcon}
						title='Upload Driving license'
						handleFileChange={onChange}
						name='license_image_url'
						containerClassName='md:max-w-[350px] w-full'
						images={data?.license_image_url}
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
					value={data?.login_phone || ""}
					onChange={onChange}
					disabled
					className='md:col-span-2 md:max-w-[350px] xl:col-span-1'
				/>

				<CustomOtp
					onChange={handleOtp}
					value={data?.pin || ""}
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
							selected={data?.company_id}
							handleSelect={handleAutocompleteSelect("company_id")}
							placeholder='Select company'
							icon={Chevron}
						/>

						<Autocomplete
							data={DUMMY_AUTOCOMPLETE_DATA}
							value={autocompleteFilters.address}
							onChange={handleAutocompleteSearchChange("address")}
							selected={data?.address}
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
					disabled={disabledSubmitButton}
				>
					Submit
				</Button>
			</div>
		</CardContainer>
	);
};

export default DriverForm;
