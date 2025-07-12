"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
	GoogleMap,
	useJsApiLoader,
	DirectionsRenderer,
} from "@react-google-maps/api";
import { TRouteEmployeeRow } from "@/types/route.types";
import { Separator } from "../ui/separator";
import { COLORS } from "@/constant/colors";

const containerStyle = {
	width: "100%",
	height: "416.05px",
};

const fallbackCenter = {
	lat: 37.7749,
	lng: -122.4194, // Default to San Francisco
};

type TProps = {
	employeeRows: TRouteEmployeeRow[];
};

function CustomGoogleMap({ employeeRows }: TProps) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
	});

	const [directions, setDirections] =
		useState<google.maps.DirectionsResult | null>(null);
	const [distanceKm, setDistanceKm] = useState<number | null>(null);

	// Compute selected employees with locations
	const selected = useMemo(() => {
		return employeeRows
			.map((row) => row.employeeSelected)
			.filter((e) => e?.location) as NonNullable<
			TRouteEmployeeRow["employeeSelected"]
		>[];
	}, [employeeRows]);

	const fromName = selected[0]?.address || "Origin";
	const toName = selected[selected.length - 1]?.address || "Destination";
	const pickupCount = selected.length;

	useEffect(() => {
		if (!isLoaded) return;

		if (selected.length < 2) {
			setDirections(null);
			setDistanceKm(null);
			return;
		}

		const service = new google.maps.DirectionsService();

		const origin = selected[0].location;
		const destination = selected[selected.length - 1].location;
		const waypoints = selected.slice(1, -1).map((stop) => ({
			location: stop.location,
			stopover: true,
		}));

		service.route(
			{
				origin,
				destination,
				waypoints,
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === "OK" && result) {
					setDirections(result);

					const meters = result.routes[0].legs.reduce(
						(sum, leg) => sum + (leg.distance?.value || 0),
						0,
					);
					setDistanceKm(meters / 1000);
				} else {
					console.error("Directions request failed due to", status);
					setDirections(null);
					setDistanceKm(null);
				}
			},
		);
	}, [isLoaded, selected]);

	if (!isLoaded) return <div>Loading...</div>;

	// Center map
	const center =
		directions?.routes[0]?.legs?.[0]?.start_location?.toJSON() ||
		fallbackCenter;

	return (
		<>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={10}
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}
			>
				{directions && (
					<DirectionsRenderer
						directions={directions}
						options={{
							polylineOptions: {
								strokeColor: COLORS.colorPallet.russianViolet[500],
								strokeWeight: 4,
							},
							markerOptions: {
								visible: false,
							},
						}}
					/>
				)}
			</GoogleMap>

			<div className='flex items-center justify-between text-sm text-neutral-1000 font-semibold flex-wrap gap-2 mt-2'>
				<div className='flex items-center flex-wrap gap-x-[10px] md:gap-[10px] '>
					<span>{fromName}</span>
					<span className='font-normal'>to</span>
					<span>{toName}</span>
				</div>

				<div className='flex items-center flex-wrap gap-x-[10px]  md:gap-[10px] '>
					<span className='font-normal'>Pickups</span>
					<span>{pickupCount}</span>
					<Separator orientation='vertical' className='bg-neutral-600 ml-1.5' />
					<span className='font-normal'>Kilometers (one-way)</span>
					<span>{distanceKm?.toFixed(2) || "-"}</span>
				</div>
			</div>
		</>
	);
}

export default React.memo(CustomGoogleMap);
