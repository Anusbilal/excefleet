"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CardContainer from "./CardContainer";
import FileUploader from "./FileUploader";
import { Eye, EyeOff, MarkerIcon, UploadIcon } from "@/assets/svg";
import { TEmpolyee } from "@/types/empolyee.types";
import Autocomplete, { TAutocomplete } from "./Autocomplete";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import CustomInputField from "./CustomInputField";
import { Separator } from "../ui/separator";
import BackButton from "./BackButton";
type TProps = {
	onSubmit: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	data?: Partial<TEmpolyee>;
	autocompleteFilters: Record<string, string>;
	handleAutocompleteSearchChange: (
		key: string,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAutocompleteSelect: (key: string) => (e: TAutocomplete) => void;
	disabledSubmitButton: boolean;
};

const EmpolyeeForm = ({
	onSubmit,
	data,
	onChange,
	autocompleteFilters,
	handleAutocompleteSearchChange,
	handleAutocompleteSelect,
	disabledSubmitButton,
}: TProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<CardContainer className='gap-10 '>
			<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Company details
				</span>

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
					value={autocompleteFilters.department}
					onChange={handleAutocompleteSearchChange("department")}
					selected={data?.department}
					handleSelect={handleAutocompleteSelect("department")}
					placeholder='Department'
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

				<Separator className='md:col-span-2 my-2' />

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Employee details
				</span>

				<FileUploader
					icon={UploadIcon}
					title='Upload picture'
					handleFileChange={onChange}
					name='photo_url'
					containerClassName='md:col-span-2 md:max-w-[350px]'
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
					placeholder='Email address'
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

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.street_address}
					onChange={handleAutocompleteSearchChange("street_address")}
					selected={data?.street_address}
					handleSelect={handleAutocompleteSelect("street_address")}
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
					Empolyee login
				</span>

				<CustomInputField
					placeholder='Employee email address'
					name='login_email'
					value={data?.login_email || ""}
					onChange={onChange}
					disabled
				/>

				<CustomInputField
					postIcon={showPassword ? EyeOff : Eye}
					placeholder='Password'
					type={showPassword ? "text" : "password"}
					onViewPassword={() => setShowPassword(!showPassword)}
					name='password'
					value={data?.password || ""}
					onChange={onChange}
				/>
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

export default EmpolyeeForm;
