import { TAutocomplete } from "@/components/custom/Autocomplete";

export type TEmpolyee = {
	company_id: TAutocomplete;
	department: TAutocomplete;
	photo_url: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	address: TAutocomplete;
	street_address: TAutocomplete;
	province: string;
	city: TAutocomplete;
	location: {
		lat: number;
		lng: number;
	};
	login_email: string;
	password: string;
};
