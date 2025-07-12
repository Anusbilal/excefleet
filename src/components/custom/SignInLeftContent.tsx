import { SignInLogo } from "@/assets/svg";

const SignInLeftContent = () => {
	return (
		<div className='xl:flex flex-col items-center gap-6 justify-center hidden min-h-screen min-w-1/2 bg-white  bg-[linear-gradient(150deg,_var(--color-primary-500)_0%,_var(--color-russian-violet-500)_100%)] rounded-tr-[48px] rounded-br-[48px]'>
			<SignInLogo width={150.26} height={134} />

			<span className='font-normal text-[22px] text-white'>
				Your Executive <span className='font-bold'>Commute Partner</span>
			</span>
		</div>
	);
};

export default SignInLeftContent;
