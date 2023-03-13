import style from './signUp.module.scss'
import {SignUpForm} from "./signUpForm/SignUpForm";
import {SignUpSuccess} from "./signUpSuccess/SignUpSuccess";
import {useState} from "react";

export const SignUp = () => {
	const [registered, setRegistered] = useState(false)

	return (
		<div className={style.mainBlock}>
			<div className={style.appBar}>
				<div>Sign up</div>
			</div>
			<div className={style.container}>
				{registered? <SignUpSuccess/>: <SignUpForm setRegistered={setRegistered}/>}
			</div>
		</div>
	);
}