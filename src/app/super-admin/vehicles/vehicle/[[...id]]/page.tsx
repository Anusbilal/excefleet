"use client";
import { Chevron, MarkerIcon } from "@/assets/svg";
import {
	PageTopBar,
	Autocomplete,
	BackButton,
	CardContainer,
	CustomInputField,
	FileUploader,
} from "@/components";
import { Button } from "@/components/ui/button";
import { DUMMY_AUTOCOMPLETE_DATA } from "@/constant/autocomplete";
import { useAddOrUpdateVehicle } from "@/hooks";
import { Separator } from "@/components/ui/separator";
import { UploadIcon } from "lucide-react";
import React from "react";

const AddOrUpdateVehicle = () => {
	const {
		handleChange,
		vehicleData,
		setVehicleData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		id,
	} = useAddOrUpdateVehicle();

	return (
		<>
			<PageTopBar heading={id ? "Update vehicle" : "Add a new vehicle"} />

			<CardContainer className='gap-10 '>
				<div className='grid grid-cols-1 md:grid-cols-2  md:max-w-[716px] gap-4'>
					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Vehicle details
					</span>

					<FileUploader
						icon={UploadIcon}
						title='Upload picture'
						handleFileChange={handleChange(setVehicleData)}
						name='image_url'
						containerClassName='md:col-span-2 md:max-w-[350px] md:mb-4'
						multiple
						imagesClassName='md:col-span-2  md:mb-4'
						images={vehicleData?.image_url}
					/>

					<span className='text-lg leading-[26px] md:col-span-2 font-semibold text-neutral-1000'>
						Owner details
					</span>

					<CustomInputField
						placeholder='Full name'
						name='full_name'
						value={vehicleData?.full_name || ""}
						onChange={handleChange(setVehicleData)}
					/>

					<CustomInputField
						placeholder='Mobile number'
						name='phone'
						value={vehicleData?.phone || ""}
						onChange={handleChange(setVehicleData)}
					/>

					<CustomInputField
						placeholder='Vehicle type'
						name='vehicle_type'
						value={vehicleData?.vehicle_type || ""}
						onChange={handleChange(setVehicleData)}
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.registration_city}
						onChange={handleAutocompleteSearchChange("registration_city")}
						selected={vehicleData?.registration_city}
						handleSelect={handleAutocompleteSelect("registration_city")}
						placeholder='Registration city'
						icon={Chevron}
					/>

					<CustomInputField
						placeholder='Registration Number'
						name='registration_number'
						value={vehicleData?.registration_number || ""}
						onChange={handleChange(setVehicleData)}
						className='md:col-span-2'
					/>

					<Autocomplete
						data={DUMMY_AUTOCOMPLETE_DATA}
						value={autocompleteFilters.street_address}
						onChange={handleAutocompleteSearchChange("street_address")}
						selected={vehicleData?.street_address}
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
						selected={vehicleData?.driver_id}
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
						disabled={Object.keys(vehicleData).length === 0}
					>
						Submit
					</Button>
				</div>
			</CardContainer>
		</>
	);
};

export default AddOrUpdateVehicle;
