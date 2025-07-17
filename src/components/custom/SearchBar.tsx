import React from "react";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { DummyUser } from "@/assets/images";
import { Info, Moon, Notification } from "@/assets/svg";

const SearchBar = () => {
	return (
		<div className='flex items-center w-fit p-[10px] max-w-[421px] rounded-[30px] gap-[10px] md:gap-5 bg-white h-[61px] shadow-[14px_17px_40px_4px_#7090B014] self-start'>
			<div className='bg-neutral-40 h-[41px] rounded-[49px] max-w-[214px] flex items-center gap-[11px] pl-5 py-[10px] pr-3 w-full '>
				<SearchIcon className=' size-[11px] text-russian-violet-600' />

				<input
					type='text'
					placeholder='Search'
					className=' placeholder:text-russian-violet-600 focus:outline-none w-full  max-w-[214px] text-russian-violet-600 text-[14px]  font-dm_sans font-normal tracking-[-2%] '
				/>
			</div>

			<div className='flex w-full items-center justify-between gap-[10px] md:gap-5'>
				<Notification className='w-[24px] h-[24px] text-russian-violet-700' />
				<Moon className='text-russian-violet-700' />
				<Info className='w-[24px] h-[24px] text-russian-violet-700' />

				<Image
					src={DummyUser}
					alt='DummyUser'
					className='w-[41px] h-[41px] rounded-full object-contain object-center'
					width={41}
					height={41}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
