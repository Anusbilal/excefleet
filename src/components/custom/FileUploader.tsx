"use client";
import React, { useRef } from "react";
import { IconType } from "./CustomInputField";
import { cn } from "../../lib/utils";

type TProps = {
	title: string;
	icon: IconType;
	handleFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
	containerClassName?: string;
} & React.ComponentProps<"input">;

const FileUploader = ({
	icon: Icon,
	title,
	handleFileChange,
	containerClassName,
	...props
}: TProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	return (
		<button
			onClick={() => fileInputRef.current?.click()}
			className={cn(
				"flex items-center gap-4 p-4 border-2 border-neutral-400 rounded-[10px] border-dashed cursor-pointer  min-h-16",
				containerClassName,
			)}
		>
			<Icon width={32} height={32} />

			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: "none" }}
				{...props}
			/>
			<span className='font-semibold text-lg text-default-10 text-start'>
				{title}
			</span>
		</button>
	);
};

export default FileUploader;
