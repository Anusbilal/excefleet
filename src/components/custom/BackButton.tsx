"use client";
import { Chevron } from "@/assets/svg";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
	const router = useRouter();

	return (
		<button
			className='flex items-center gap-2 cursor-pointer'
			onClick={() => router.back()}
		>
			<Chevron className=' text-black rotate-180' width={24} height={24} />

			<span className='font-inter font-semibold text-base text-neutral-800'>
				Back
			</span>
		</button>
	);
};

export default BackButton;
