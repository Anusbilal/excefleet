"use client";
import CustomInputField from "./CustomInputField";
import { Button } from "../ui/button";
import { useSignIn } from "@/hooks";
import { Checkbox } from "../ui/checkbox";
import { Eye, EyeOff } from "@/assets/svg";

const SignInForm = () => {
	const { setShowPassword, showPassword, router } = useSignIn();

	return (
		<div className='flex items-center  justify-center min-h-screen w-full p-5 md:p-0'>
			<div className='flex w-full max-w-[400px]  flex-col'>
				<div className='flex flex-col gap-2 '>
					<span className='text-[46px] font-bold text-primary-foreground'>
						Sign-in
					</span>
					<span className='text-sm leading-[20px] font-normal text-secondary-foreground'>
						Please sign in using your company email address.
					</span>
				</div>

				<form className='flex flex-col gap-4 w-full mt-6 mb-9'>
					<CustomInputField placeholder='Email' name='email' />
					<CustomInputField
						postIcon={showPassword ? EyeOff : Eye}
						placeholder='Password'
						type={showPassword ? "text" : "password"}
						onViewPassword={() => setShowPassword(!showPassword)}
						name='password'
					/>
				</form>

				<div className='flex justify-between items-center mb-14'>
					<div className='flex items-center gap-3 '>
						<Checkbox />
						<span className='text-base text-foreground font-inter'>
							Keep me logged in
						</span>
					</div>
					<button className='self-end text-base text-russian-violet-600 font-inter pr-2 cursor-pointer '>
						Forget password?
					</button>
				</div>

				<Button onClick={() => router.push("/super-admin/dashboard")}>
					Login
				</Button>
			</div>
		</div>
	);
};

export default SignInForm;
