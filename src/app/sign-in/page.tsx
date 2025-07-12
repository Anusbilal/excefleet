import { SignInForm, SignInLeftContent } from "@/components";

const SignIn = () => {
	return (
		<div className='flex  items-center justify-center 2xl:justify-normal bg-grey-100 w-full min-h-screen'>
			<SignInLeftContent />

			<SignInForm />
		</div>
	);
};

export default SignIn;
