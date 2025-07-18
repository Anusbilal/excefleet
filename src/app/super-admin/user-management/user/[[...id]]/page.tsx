"use client";
import { MarkerIcon, Chevron } from "@/assets/svg";
import {
	PageTopBar,
	Autocomplete,
	BackButton,
	CardContainer,
	CustomInputField,
	FileUploader,
} from "@/components";
import { Button } from "@/components/ui/button";
import {
	DUMMY_AUTOCOMPLETE_DATA,
	USER_ROLE_DATA,
	PERMISSIONS,
} from "@/constant/autocomplete";
import { useAddOrUpdateUser } from "@/hooks";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { UploadIcon, EyeOff, Eye } from "lucide-react";
import React from "react";

const AddOrUpdateUser = () => {
	const {
		handleChange,
		userData,
		setUserData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		handlePermission,
		id,
		setShowPassword,
		showPassword,
	} = useAddOrUpdateUser();

	return (
		<>
			<PageTopBar heading={id ? "Update user" : "User management"} />

			<CardContainer className='gap-10 '>
				<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
					<FileUploader
						icon={UploadIcon}
						title='Upload a profile picture'
						handleFileChange={handleChange(setUserData)}
						name='image_url'
						containerClassName='md:col-span-2 md:max-w-[350px]'
						imagesClassName='md:col-span-2'
						images={userData?.image_url}
					/>

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						User details
					</span>

					<CustomInputField
						placeholder='First name'
						name='first_name'
						value={userData?.first_name || ""}
						onChange={handleChange(setUserData)}
					/>

					<CustomInputField
						placeholder='Last name'
						name='last_name'
						value={userData?.last_name || ""}
						onChange={handleChange(setUserData)}
					/>

					<CustomInputField
						placeholder='Email address'
						name='Email'
						value={userData?.email || ""}
						onChange={handleChange(setUserData)}
					/>

					<CustomInputField
						placeholder='Mobile number'
						name='phone'
						value={userData?.phone || ""}
						onChange={handleChange(setUserData)}
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.street_address}
						onChange={handleAutocompleteSearchChange("street_address")}
						selected={userData?.street_address}
						handleSelect={handleAutocompleteSelect("street_address")}
						placeholder='Street address'
						icon={MarkerIcon}
						className='md:col-span-2'
						iconClassName='rotate-0'
					/>

					<Separator className='md:col-span-2 my-2' />

					<div className='md:col-span-2 flex flex-col gap-[9px]'>
						<span className='text-lg leading-[26px]  font-semibold text-neutral-1000'>
							Permissions
						</span>

						<span className='text-xs leading-[18px]  font-normal text-neutral-1000'>
							Grant the permissions that allow this user to add content.
						</span>
					</div>

					<div className='flex flex-col gap-4 md:col-span-2'>
						<Autocomplete
							data={USER_ROLE_DATA}
							value={autocompleteFilters.role}
							onChange={handleAutocompleteSearchChange("role")}
							selected={userData?.role}
							handleSelect={handleAutocompleteSelect("role")}
							placeholder='Role'
							icon={Chevron}
							className='max-w-[350px]'
						/>

						{PERMISSIONS.map((permission) => (
							<div key={permission.key} className='flex  items-center gap-3'>
								<Checkbox
									checked={userData?.permission?.includes(permission.key)}
									onCheckedChange={() => handlePermission(permission.key)}
								/>
								<span className='text-sm text-default-10 font-normal font-inter'>
									{permission.label}
								</span>
							</div>
						))}
					</div>

					<Separator className='md:col-span-2 my-2' />

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						User login
					</span>

					<CustomInputField
						placeholder='Email address'
						name='login_email'
						value={userData?.login_email || ""}
						onChange={handleChange(setUserData)}
						disabled
					/>

					<CustomInputField
						postIcon={showPassword ? EyeOff : Eye}
						placeholder='Password'
						type={showPassword ? "text" : "password"}
						onViewPassword={() => setShowPassword(!showPassword)}
						name='password'
						value={userData?.password || ""}
						onChange={handleChange(setUserData)}
					/>
				</div>

				<div className='flex w-full items-center justify-between'>
					<BackButton />

					<Button
						onClick={onSubmit}
						className='md:max-w-[350px] w-[50%]'
						disabled={Object.keys(userData).length === 0}
					>
						Submit
					</Button>
				</div>
			</CardContainer>
		</>
	);
};

export default AddOrUpdateUser;
