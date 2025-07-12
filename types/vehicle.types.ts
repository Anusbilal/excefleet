import { TAutocomplete } from "@/components/custom/Autocomplete";

export type TVehicle = {
	image_url: string;
	contact_no: string;
	first_name: string;
	last_name: string;
	phone: string;
	vehicle_type: string;
	registration_city: TAutocomplete;
	registration_number: string;
	street_address: TAutocomplete;
	driver_id: TAutocomplete;
};
