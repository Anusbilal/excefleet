// import Cart from "@/assets/svg/Cart.svg?react";
// import Users from "@/assets/svg/Users.svg?react";
// import Products from "@/assets/svg/Products.svg?react";
import {
	Companies,
	Dashboard,
	Driver,
	Employee,
	Logout,
	Route,
	User,
	Vehicle,
} from "@/assets/svg";

export const SIDE_BAR_DATA = [
	{
		title: "Dashboard",
		url: "/super-admin/dashboard",
		icon: Dashboard,
	},
	{
		title: "Companies",
		url: "/super-admin/companies",
		icon: Companies,
	},
	{
		title: "Employees",
		url: "/super-admin/employees",
		icon: Employee,
	},
	{
		title: "Vehicle",
		url: "/super-admin/vehicle",
		icon: Vehicle,
	},
	{
		title: "Drivers",
		url: "/super-admin/drivers",
		icon: Driver,
	},
	{
		title: "Route",
		url: "/super-admin/route",
		icon: Route,
	},
	{
		title: "User management",
		url: "/super-admin/user-management",
		icon: User,
	},
	{
		title: "Logout",
		url: "/sign-in",
		icon: Logout,
	},
];
