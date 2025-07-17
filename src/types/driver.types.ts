import { TAutocomplete } from "@/components/custom/Autocomplete";

export type TDriver = {
	id: string;
	photo_url: File;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	contractor: string;
	address: TAutocomplete;
	province: string;
	city: TAutocomplete;
	location: {
		lat: number;
		lng: number;
	};
	cnic_image_url: File;
	license_image_url: File;
	login_phone: string;
	pin: string;
	company_id: TAutocomplete;
};
