import { TAutocomplete } from "@/components/custom/Autocomplete";
import { PERMISSIONS } from "@/constant/autocomplete";
import { TUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useUpdateUser = () => {
	const router = useRouter();
	const [userData, setUserData] = useState<Partial<TUser>>({});
	const [autocompleteFilters, setAutocompleteFilters] = useState<
		Record<string, string>
	>({
		role: "",
		street_address: "",
	});

	const handleChange =
		(setter: React.Dispatch<React.SetStateAction<Partial<TUser>>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			let value: unknown;
			if (event?.target) {
				if (event.target.type === "file") {
					value = event.target.files?.[0] ?? undefined;
				} else {
					value = event.target.value;
				}
			}

			setter((prev) => ({
				...prev,
				[event.target.name]: value,
			}));
		};

	const handleAutocompleteSearchChange =
		(key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setAutocompleteFilters((prev) => ({
				...prev,
				[key]: e.target.value,
			}));
			setUserData((prev) => ({
				...prev,
				[key]: undefined,
			}));
		};

	const handleAutocompleteSelect = (key: string) => (item: TAutocomplete) => {
		setAutocompleteFilters((prev) => ({
			...prev,
			[key]: "",
		}));

		if (key === "role" && item?.id === "admin") {
			setUserData((prev) => ({
				...prev,
				[key]: item,
				permission: PERMISSIONS.map((item) => item.key),
			}));
		} else {
			setUserData((prev) => ({
				...prev,
				[key]: item,
			}));
		}
	};

	const handlePermission = (permission: string) => {
		setUserData((prev) => {
			const current = prev?.permission ?? [];
			const updated = current.includes(permission)
				? current.filter((p) => p !== permission)
				: [...current, permission];

			return { ...prev, permission: updated };
		});
	};

	const onSubmit = () => {
		console.log({ userData });
		router.push("/super-admin/user-management/update-user/successfull");
	};

	return {
		handleChange,
		userData,
		setUserData,
		autocompleteFilters,
		handleAutocompleteSearchChange,
		handleAutocompleteSelect,
		onSubmit,
		handlePermission,
	};
};
export default useUpdateUser;
