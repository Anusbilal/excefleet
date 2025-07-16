import React from "react";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

export type THead = {
	title: React.ReactNode;
	className?: string;
};

type TProps = {
	head: THead[];
	children: React.ReactNode;
};

const SimpleTable = ({ head, children }: TProps) => {
	return (
		<Table>
			<TableHeader>
				<TableRow className='!border-b-2 border-secondary-600 hover:bg-background-10  bg-background-10  '>
					{head.map((item, index) => {
						return (
							<TableHead key={index} className={cn("", item?.className)}>
								{item?.title}
							</TableHead>
						);
					})}
				</TableRow>
			</TableHeader>
			<TableBody>{children}</TableBody>
		</Table>
	);
};

export default SimpleTable;
