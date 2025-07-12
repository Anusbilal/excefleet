"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "../../lib/utils";

type TProps = {
	value: string;
	onChange: (value: string) => void;
	className?: string;
};

function CustomOtp({ onChange, value, className }: TProps) {
	return (
		<div className={cn("flex flex-col gap-2 w-full", className)}>
			<InputOTP
				maxLength={6}
				pattern={REGEXP_ONLY_DIGITS}
				value={value}
				onChange={onChange}
			>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
					<InputOTPSlot index={4} />
				</InputOTPGroup>
			</InputOTP>
			<span className='text-xs leading-[18px] text-default-90'>
				5 Digit PIN
			</span>
		</div>
	);
}
export default CustomOtp;
