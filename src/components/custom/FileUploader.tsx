"use client";
import React, { useRef } from "react";
import { IconType } from "./CustomInputField";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { previewImage } from "@/helper/image-preview";

type TProps = {
	title: string;
	icon: IconType;
	handleFileChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
	containerClassName?: string;
	imagesClassName?: string;
	images?: File | FileList;
} & React.ComponentProps<"input">;

const FileUploader = ({
	icon: Icon,
	title,
	handleFileChange,
	containerClassName,
	imagesClassName,
	images,
	...props
}: TProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const filesArray = images
		? images instanceof FileList
			? Array.from(images)
			: [images]
		: [];

	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
			fileInputRef.current.click();
		}
	};

	return filesArray.length === 0 ? (
		<button
			onClick={handleClick}
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
				accept='image/png, image/jpeg'
			/>

			<span className='font-semibold text-lg text-default-10 text-start'>
				{title}
			</span>
		</button>
	) : (
		<div
			className={cn("flex items-center flex-wrap gap-[10px] ", imagesClassName)}
		>
			{filesArray.map((file, index) => {
				return (
					<button
						key={index}
						className='flex items-center cursor-pointer overflow-hidden justify-center p-4 border-2 border-neutral-400 rounded-[10px] border-dashed w-[192px] h-[192px]'
						onClick={handleClick}
					>
						<Image
							src={previewImage(file)}
							alt={`image-${index}`}
							width={160}
							height={160}
							className='object-contain size-[160px] w-auto h-auto'
						/>
					</button>
				);
			})}

			<input
				type='file'
				ref={fileInputRef}
				onChange={handleFileChange}
				style={{ display: "none" }}
				{...props}
				accept='image/png, image/jpeg'
			/>
		</div>
	);
};

export default FileUploader;
