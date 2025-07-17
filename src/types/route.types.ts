import { TAutocomplete } from "@/components/custom/Autocomplete";
import { DUMMY_EMPLOYEE_ROUTE } from "@/constant/autocomplete";
import { string } from "zod";

export type TRoute = {
	_id: string;
	route_name: string;
	vahicle: string;
	driver: string;
	driver_number: string;
	city: string;
	from: string;
	to: string;
	employee_id: TAutocomplete;
	street_address: TAutocomplete;
};

export type TRouteEmployeeRow = {
	employeeSearch: string;
	employeeOptions: TRouteEmployee[];
	employeeSelected?: TRouteEmployee;
	addressText: string;
};

export type TRouteDriverRow = {
	driverSearch: string;
	driverOptions: TAutocomplete[];
	driverSelected?: TAutocomplete;
};

export type TRouteEmployee = {
	id: string;
	name: string;
	address: string;
	location: { lat: number; lng: number };
};
