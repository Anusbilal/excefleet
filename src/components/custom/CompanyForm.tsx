"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CardContainer from "./CardContainer";
import FileUploader from "./FileUploader";
import { Eye, EyeOff, MarkerIcon, UploadIcon } from "@/assets/svg";
import { TCompany } from "@/types/company.types";
import Autocomplete, { TAutocomplete } from "./Autocomplete";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import CustomInputField from "./CustomInputField";
import { Separator } from "../ui/separator";
import BackButton from "./BackButton";
import { cn } from "../../lib/utils";

type TProps = {
	onSubmit: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	data?: Partial<TCompany>;
	autocompleteFilters: Record<string, string>;
	handleAutocompleteSearchChange: (
		key: string,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAutocompleteSelect: (key: string) => (e: TAutocomplete) => void;
	handleAdditionalOffices: (value: boolean) => void;
	disabledSubmitButton: boolean;
};

const CompanyForm = ({
	onSubmit,
	data,
	onChange,
	autocompleteFilters,
	handleAutocompleteSearchChange,
	handleAutocompleteSelect,
	handleAdditionalOffices,
	disabledSubmitButton,
}: TProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const getButtonClass = (active: boolean) =>
		cn(
			"w-[40%] max-w-[112px] h-10 rounded-[4px] p-3 font-normal  font-inter text-base border",
			active
				? "text-white bg-neutral-1000 hover:bg-neutral-1000/90 border-default-80"
				: "border-neutral-300  text-neutral-1000 bg-transparent hover:bg-transparent",
		);

	return (
		<CardContainer className='gap-10 '>
			<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
				<FileUploader
					icon={UploadIcon}
					title='Upload the company logo'
					handleFileChange={onChange}
					name='logo_url'
					containerClassName='md:col-span-2 md:max-w-[350px]'
				/>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.city}
					onChange={handleAutocompleteSearchChange("city")}
					selected={data?.city}
					handleSelect={handleAutocompleteSelect("city")}
					placeholder='Select city'
					icon={Chevron}
					className='md:col-span-2 md:max-w-[350px]'
				/>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.bussiness_nature}
					onChange={handleAutocompleteSearchChange("bussiness_nature")}
					selected={data?.bussiness_nature}
					handleSelect={handleAutocompleteSelect("bussiness_nature")}
					placeholder='Nature of bussiness'
					icon={Chevron}
				/>

				<CustomInputField
					placeholder='Company’s name'
					name='name'
					value={data?.name || ""}
					onChange={onChange}
				/>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.number_of_employees}
					onChange={handleAutocompleteSearchChange("number_of_employees")}
					selected={data?.number_of_employees}
					handleSelect={handleAutocompleteSelect("number_of_employees")}
					placeholder='Number of employees'
					icon={Chevron}
					className='md:col-span-2 md:max-w-[350px]'
				/>

				<Separator className='md:col-span-2 my-2' />

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.address}
					onChange={handleAutocompleteSearchChange("address")}
					selected={data?.address}
					handleSelect={handleAutocompleteSelect("address")}
					placeholder='Office address'
					icon={MarkerIcon}
					className='md:col-span-2'
					iconClassName='rotate-0'
				/>

				<CustomInputField
					placeholder='Email address'
					name='email'
					value={data?.email || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Contact number'
					name='phone'
					value={data?.phone || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Contact person'
					name='contact_person'
					value={data?.contact_person || ""}
					onChange={onChange}
					className='md:col-span-2 md:max-w-[350px]'
				/>

				<Separator className='md:col-span-2 my-2' />

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Company login
				</span>

				<CustomInputField
					placeholder='Email address'
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

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Does your company have additional offices?
				</span>

				<div className='flex items-center gap-4  md:col-span-2'>
					<Button
						className={getButtonClass(data?.additional_office === true)}
						onClick={() => handleAdditionalOffices(true)}
					>
						Yes
					</Button>

					<Button
						onClick={() => handleAdditionalOffices(false)}
						className={getButtonClass(data?.additional_office === false)}
					>
						No
					</Button>
				</div>
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

export default CompanyForm;
