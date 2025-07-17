"use client";
import React from "react";
import { Button } from "../ui/button";
import CardContainer from "./CardContainer";
import FileUploader from "./FileUploader";
import { MarkerIcon, UploadIcon } from "@/assets/svg";
import { TVehicle } from "@/types/vehicle.types";
import Autocomplete, { TAutocomplete } from "./Autocomplete";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { Chevron } from "@/assets/svg";
import CustomInputField from "./CustomInputField";
import { Separator } from "../ui/separator";
import BackButton from "./BackButton";

type TProps = {
	onSubmit: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	data?: Partial<TVehicle>;
	autocompleteFilters: Record<string, string>;
	handleAutocompleteSearchChange: (
		key: string,
	) => (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAutocompleteSelect: (key: string) => (e: TAutocomplete) => void;
	disabledSubmitButton: boolean;
};

const VehicleForm = ({
	onSubmit,
	data,
	onChange,
	autocompleteFilters,
	handleAutocompleteSearchChange,
	handleAutocompleteSelect,
	disabledSubmitButton,
}: TProps) => {
	return (
		<CardContainer className='gap-10 '>
			<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Vehicle details
				</span>

				<FileUploader
					icon={UploadIcon}
					title='Upload picture'
					handleFileChange={onChange}
					name='image_url'
					containerClassName='md:col-span-2 md:max-w-[350px] md:mb-4'
					multiple
					imagesClassName='md:col-span-2  md:mb-4'
					images={data?.image_url}
				/>

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Owner details
				</span>

				<CustomInputField
					placeholder='Full name'
					name='full_name'
					value={data?.full_name || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Mobile number'
					name='phone'
					value={data?.phone || ""}
					onChange={onChange}
				/>

				<CustomInputField
					placeholder='Vehicle type'
					name='vehicle_type'
					value={data?.vehicle_type || ""}
					onChange={onChange}
				/>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.registration_city}
					onChange={handleAutocompleteSearchChange("registration_city")}
					selected={data?.registration_city}
					handleSelect={handleAutocompleteSelect("registration_city")}
					placeholder='Registration city'
					icon={Chevron}
				/>

				<CustomInputField
					placeholder='Registration Number'
					name='registration_number'
					value={data?.registration_number || ""}
					onChange={onChange}
					className='md:col-span-2'
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

				<Separator className='md:col-span-2 my-2' />

				<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
					Select driver
				</span>

				<Autocomplete
					data={DUMMY_AUTOCOMPLETE_DATA}
					value={autocompleteFilters.driver_id}
					onChange={handleAutocompleteSearchChange("driver_id")}
					selected={data?.driver_id}
					handleSelect={handleAutocompleteSelect("driver_id")}
					placeholder='Select driver'
					icon={Chevron}
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

export default VehicleForm;
