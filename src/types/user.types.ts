import { TAutocomplete } from "@/components/custom/Autocomplete";

export type UserRole = "admin" | "employee" | "driver";

export type TUser = {
	image_url: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	contact_no: string;
	contractor: string;
	street_address: TAutocomplete;
	password: string;
	role: TAutocomplete;
	login_email: string;
	permission: string[];
};
