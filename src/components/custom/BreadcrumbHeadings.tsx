"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

// Your custom label overrides
const SEGMENT_LABELS: Record<string, string> = {
	"super-admin": "SuperAdmin",
	"user-management": "User Management",
	"create-company": "Add a new company",
	"create-employee": "Add an new employee",
	"create-driver": "Add a new driver",
	"create-vehicle": "Add a new vehicle",
	"create-route": "Add a new route",
	"create-user": "Add a new user",
	successfull: "",
};

const formatSegment = (segment: string) =>
	SEGMENT_LABELS[segment] ??
	segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

type TProps = {
	heading: string;
};

export default function BreadcrumbHeadings({ heading }: TProps) {
	const pathname = usePathname();

	const segments = pathname
		.split("/")
		.filter(Boolean)
		.filter((seg) => SEGMENT_LABELS[seg] !== "");

	const cumulativePaths = segments.map((_, i) => {
		return "/" + segments.slice(0, i + 1).join("/");
	});

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					{segments.map((segment, index) => {
						const label = formatSegment(segment);
						const href = cumulativePaths[index];
						const isLast = index === segments.length - 1;

						return (
							<React.Fragment key={href}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>{label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link
												href={
													href === "/super-admin"
														? "/super-admin/dashboard"
														: href
												}
											>
												{label}
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
							</React.Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>

			<span className='font-bold text-[32px] leading-12 text-primary-foreground'>
				{heading}
			</span>
		</div>
	);
}
