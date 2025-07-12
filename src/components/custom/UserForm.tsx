"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import CardContainer from "./CardContainer";
import FileUploader from "./FileUploader";
import { Eye, EyeOff, MarkerIcon, UploadIcon } from "@/assets/svg";
import { TUser } from "@/types/user.types";
import Autocomplete, { TAutocomplete } from "./Autocomplete";
import {
	DUMMY_AUTOCOMPLETE_DATA,
	PERMISSIONS,
	USER_ROLE_DATA,
} from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import CustomInputField from "./CustomInputField";
import { Separator } from "../ui/separator";
import BackButton from "./BackButton";
import { Checkbox } from "../ui/checkbox";

type TProps = {
	onSubmit: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	data?: Partial<TUser>;
	autocompleteFilters: Record<string, string>;
	handleAutocompleteSearchChange: (
		key: string,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAutocompleteSelect: (key: string) => (e: TAutocomplete) => void;
	disabledSubmitButton: boolean;
	handlePermission: (permission: string) => void;
};

const UserForm = ({
	onSubmit,
	data,
	onChange,
	autocompleteFilters,
	handleAutocompleteSearchChange,
	handleAutocompleteSelect,
	disabledSubmitButton,
	handlePermission,
}: TProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<CardContainer className='gap-10 '>
			<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
				<FileUploader
					icon={UploadIcon}
					title='Upload picture'
					handleFileChange={onChange}
					name='image_url'
					containerClassName='md:col-span-2 md:max-w-[350px]'
				/>

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					User details
				</span>

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
					name='Email'
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

				<Autocomplete
					data={USER_ROLE_DATA}
					value={autocompleteFilters.role}
					onChange={handleAutocompleteSearchChange("role")}
					selected={data?.role}
					handleSelect={handleAutocompleteSelect("role")}
					placeholder='Role'
					icon={Chevron}
				/>

				<Separator className='md:col-span-2 my-2' />

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					User login
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

				<Separator className='md:col-span-2 my-2' />

				<div className='md:col-span-2 flex flex-col gap-[9px]'>
					<span className='text-lg leading-[26px]  font-semibold text-neutral-1000'>
						Permissions
					</span>

					<span className='text-xs leading-[18px]  font-normal text-neutral-1000'>
						Grant the permissions that allow this user to add content.
					</span>
				</div>

				<div className='flex flex-col gap-2 md:col-span-2'>
					{PERMISSIONS.map((permission) => (
						<div key={permission.key} className='flex  items-center gap-3'>
							<Checkbox
								checked={data?.permission?.includes(permission.key)}
								onCheckedChange={() => handlePermission(permission.key)}
							/>
							<span className='text-sm text-default-10 font-normal font-inter'>
								{permission.label}
							</span>
						</div>
					))}
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

export default UserForm;
