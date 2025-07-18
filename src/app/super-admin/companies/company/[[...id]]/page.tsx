"use client";
import {
	Autocomplete,
	BackButton,
	CardContainer,
	CustomInputField,
	FileUploader,
	PageTopBar,
} from "@/components";
import { useAddOrUpdateCompany } from "@/hooks";
import { useParams } from "next/navigation";
import React from "react";
import { Eye, EyeOff, MarkerIcon, UploadIcon } from "@/assets/svg";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AddOrUpdateCompany = () => {
	const {
		handleChange,
		companyData,
		setCompanyData,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		autocompleteFilters,
		onSubmit,
		setShowPassword,
		showPassword,
		id,
	} = useAddOrUpdateCompany();

	return (
		<>
			<PageTopBar heading={id ? "Update company" : "Add a new company"} />

			<CardContainer className='gap-10 '>
				<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
					<FileUploader
						icon={UploadIcon}
						title='Upload the company logo'
						handleFileChange={handleChange(setCompanyData)}
						name='logo_url'
						containerClassName='md:col-span-2 md:max-w-[350px]'
						images={companyData?.logo_url}
						imagesClassName='md:col-span-2'
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.city}
						onChange={handleAutocompleteSearchChange("city")}
						selected={companyData?.city}
						handleSelect={handleAutocompleteSelect("city")}
						placeholder='Select city'
						icon={Chevron}
						className='md:col-span-2 md:max-w-[350px]'
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.bussiness_nature}
						onChange={handleAutocompleteSearchChange("bussiness_nature")}
						selected={companyData?.bussiness_nature}
						handleSelect={handleAutocompleteSelect("bussiness_nature")}
						placeholder='Nature of bussiness'
						icon={Chevron}
					/>

					<CustomInputField
						placeholder='Company’s name'
						name='name'
						value={companyData?.name || ""}
						onChange={handleChange(setCompanyData)}
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.number_of_employees}
						onChange={handleAutocompleteSearchChange("number_of_employees")}
						selected={companyData?.number_of_employees}
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
						selected={companyData?.address}
						handleSelect={handleAutocompleteSelect("address")}
						placeholder='Office address'
						icon={MarkerIcon}
						className='md:col-span-2'
						iconClassName='rotate-0'
					/>

					<CustomInputField
						placeholder='Email address'
						name='email'
						value={companyData?.email || ""}
						onChange={handleChange(setCompanyData)}
					/>

					<CustomInputField
						placeholder='Contact number'
						name='phone'
						value={companyData?.phone || ""}
						onChange={handleChange(setCompanyData)}
					/>

					<CustomInputField
						placeholder='Contact person'
						name='contact_person'
						value={companyData?.contact_person || ""}
						onChange={handleChange(setCompanyData)}
						className='md:col-span-2 md:max-w-[350px]'
					/>

					<Separator className='md:col-span-2 my-2' />

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Company login
					</span>

					<CustomInputField
						placeholder='Email address'
						name='login_email'
						value={companyData?.login_email || ""}
						onChange={handleChange(setCompanyData)}
						disabled
					/>

					<CustomInputField
						postIcon={showPassword ? EyeOff : Eye}
						placeholder='Password'
						type={showPassword ? "text" : "password"}
						onViewPassword={() => setShowPassword(!showPassword)}
						name='password'
						value={companyData?.password || ""}
						onChange={handleChange(setCompanyData)}
					/>

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Does your company have additional offices?
					</span>

					<div className='flex items-center gap-4  md:col-span-2'>
						<Button
							className={getButtonClass(
								companyData?.additional_office === true,
							)}
							onClick={() => {
								setCompanyData((prev) => ({
									...prev,
									additional_office: true,
								}));
							}}
						>
							Yes
						</Button>

						<Button
							onClick={() => {
								setCompanyData((prev) => ({
									...prev,
									additional_office: false,
								}));
							}}
							className={getButtonClass(
								companyData?.additional_office === false,
							)}
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
						disabled={Object.keys(companyData).length === 1}
					>
						Submit
					</Button>
				</div>
			</CardContainer>
		</>
	);
};

export default AddOrUpdateCompany;

const getButtonClass = (active: boolean) =>
	cn(
		"w-[40%] max-w-[112px] h-10 rounded-[4px] p-3 font-normal  font-inter text-base border",
		active
			? "text-white bg-neutral-1000 hover:bg-neutral-1000/90 border-default-80"
			: "border-neutral-300  text-neutral-1000 bg-transparent hover:bg-transparent",
	);
