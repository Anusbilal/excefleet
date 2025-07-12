"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useSignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	return {
		showPassword,
		setShowPassword,
		router,
	};
};
export default useSignIn;
