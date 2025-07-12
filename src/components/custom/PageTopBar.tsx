import React from "react";
import BreadcrumbHeadings from "./BreadcrumbHeadings";
import SearchBar from "./SearchBar";

type TProps = {
	heading: string;
	isSearchBar?: boolean;
};

const PageTopBar = ({ heading, isSearchBar = false }: TProps) => {
	return (
		<div className='flex flex-wrap justify-between items-center gap-5 mb-5 md:mb-10'>
			<BreadcrumbHeadings heading={heading} />

			{isSearchBar && <SearchBar />}
		</div>
	);
};

export default PageTopBar;
