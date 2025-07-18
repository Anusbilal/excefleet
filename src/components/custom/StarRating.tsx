import { StarIcon } from "@/assets/svg";
import { COLORS } from "@/constant/colors";
import { cn } from "@/lib/utils";
import React from "react";

type StarRatingProps = {
	rating: number;
	onRatingChange: (rating: number) => void;
	starSize?: number;
	filledColor?: string;
	emptyColor?: string;
	maxStars?: number;
	className?: string;
};

export default function StarRating({
	rating,
	onRatingChange,
	starSize = 24,
	filledColor = COLORS.colorPallet.yellow[200],
	emptyColor = COLORS.colorPallet.neutral[300],
	maxStars = 5,
	className,
}: StarRatingProps) {
	return (
		<div className={cn(`flex items-center `, className)}>
			{Array.from({ length: maxStars }, (_, i) => i + 1).map((starIndex) => (
				<button
					key={starIndex}
					type='button'
					onClick={() => onRatingChange(starIndex)}
					className='focus:outline-none cursor-pointer'
				>
					{starIndex <= rating ? (
						<StarIcon width={starSize} height={starSize} color={filledColor} />
					) : (
						<StarIcon width={starSize} height={starSize} color={emptyColor} />
					)}
				</button>
			))}
		</div>
	);
}
