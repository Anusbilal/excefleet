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

const SEGMENT_LABELS: Record<string, string> = {
	"super-admin": "SuperAdmin",
	"user-management": "User Management",
	create: "Successfull",
	update: "Successfull",
	successfull: "",
};

const ENTITY_NAMES = [
	"company",
	"employee",
	"driver",
	"vehicle",
	"route",
	"user",
];

const isIdLike = (segment: string) =>
	/^\d+$/.test(segment) ||
	/^[a-fA-F0-9]{24}$/.test(segment) ||
	/^[0-9a-fA-F-]{8,}$/.test(segment);

function formatSegment(seg: string, idx: number, segments: string[]): string {
	if (isIdLike(seg)) return "";

	if (SEGMENT_LABELS[seg] !== undefined) return SEGMENT_LABELS[seg];

	if (ENTITY_NAMES.includes(seg)) {
		const next = segments[idx + 1];
		if (!next) {
			return `Add a new ${seg}`;
		} else {
			return `Update ${seg}`;
		}
	}

	return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

type Props = {
	heading: string;
};

export default function BreadcrumbHeadings({ heading }: Props) {
	const pathname = usePathname();

	const rawSegments = pathname.split("/").filter(Boolean);

	const crumbs = rawSegments
		.map((seg, i) => {
			const label = formatSegment(seg, i, rawSegments);
			const href = "/" + rawSegments.slice(0, i + 1).join("/");
			return { seg, label, href };
		})
		.filter((c) => c.label);

	return (
		<div>
			<Breadcrumb>
				<BreadcrumbList>
					{crumbs.map(({ label, href }, i) => {
						const isLast = i === crumbs.length - 1;
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
