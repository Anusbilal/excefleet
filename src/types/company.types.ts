import { TAutocomplete } from "@/components/custom/Autocomplete";

export type TCompany = {
	_id: string;
	logo_url: File;
	location: {
		lat: number;
		lng: number;
	};
	bussiness_nature: TAutocomplete;
	name: string;
	number_of_employees: TAutocomplete;
	address: TAutocomplete;
	city: TAutocomplete;
	state: string;
	email: string;
	phone: string;
	contact_person: string;
	login_email: string;
	password: string;
	additional_office: boolean;
};
