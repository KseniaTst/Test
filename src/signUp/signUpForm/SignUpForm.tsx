import {
	FormControlLabel,
	FormGroup,
	Radio,
	RadioGroup,
	TextField
} from "@mui/material";
import style from "./signUpForm.module.scss";
import {useFormik} from "formik";
import classNames from "classnames";
import icon from "../../assets/icons/Shape.svg";
import {DropBox} from "../../components/DropBox";

type FormikErrorType = {
	firstName?: string
	lastName?: string
	Nationality?: string
	day?: string
	month?: string
	year?: string
	email?: string
	gender?: string
	password?: string
	confirmPassword?: string
}

type PropsType = {
	setRegistered: (registered:boolean)=>void
}

export const SignUpForm = (props:PropsType) => {

	const {setRegistered} = props

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			nationality: '',
			day: '',
			month: '',
			year: '',
			email: '',
			gender: '',
			password: '',
			confirmPassword: '',
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if ( values.password.length < 8) {
				errors.password = 'Password must be 8 characters or more';
			} else if (!/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/i.test(values.password)) {
				errors.password = 'Invalid password'
			}

			if (!values.confirmPassword) {
				errors.confirmPassword = 'Required';
			} else if (values.password !== values.confirmPassword) {
				errors.confirmPassword = 'Passwords do not match';
			}
			return errors;
		},
		onSubmit: values => {
			formik.resetForm();
			fetch(' http://localhost:3001/response')
				.then((res)=> {
					if (res.status===200) setRegistered(true)
				})
		},
	});
	return (
		<div>
			<img src={icon}/>
			<div className={style.title}>New user?</div>
			<div className={style.subtitle}>Use the form below to create your account.</div>
			<form onSubmit={formik.handleSubmit}>
				<FormGroup>
					<div className={style.formContainer}>

						<div className={style.formBlock}>
							<TextField
								className={style.textField}
								variant='standard'
								label='First Name'
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								{...formik.getFieldProps('firstName')}
							/>
							<div className={style.dropBoxContainer}>
								<div className={style.label}>Nationality</div>
								<DropBox options={nations}/>
							</div>

							<div className={style.dropBoxContainer}>
								<div className={style.label}>Date of Birth</div>
								<div style={{width: '56px'}}>
									<DropBox options={days}/>
								</div>
								<div style={{width: '91px'}}>
									<DropBox options={months} />
								</div>
								<div style={{width: '67.6px'}}>
									<DropBox  options={years}/>
								</div>
							</div>

							<TextField
								className={style.textField}
								variant='standard'
								type='password'
								label='Password'
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								{...formik.getFieldProps('password')}
							/>
							<div className={style.error}>
								{formik.touched.password && formik.errors.password ? formik.errors.password : null}
							</div>
						</div>

						<div className={style.formBlock}>
							<TextField
								className={style.textField}
								variant='standard'
								label='Last Name'
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								{...formik.getFieldProps('lastName')}
							/>

							<TextField
								className={classNames(style.textField, {
									[style.errorTextField]: formik.errors.email
								})}
								variant='standard'
								label='E-mail'
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								{...formik.getFieldProps('email')}
							/>
							<div className={style.error}>
								{formik.touched.email && formik.errors.email ? formik.errors.email : null}
							</div>

							<RadioGroup className={style.radioContainer}>
								<div className={style.label}>Gender</div>
								<FormControlLabel
									{...formik.getFieldProps('gender')}
									value={'male'}
									control={<Radio size={'small'}/>} label="Male"/>
								<FormControlLabel
									{...formik.getFieldProps('gender')}
									value="female" control={<Radio  size={'small'}/>} label="Female"/>
							</RadioGroup>

							<TextField
								className={style.textField}
								variant='standard'
								type='password'
								label='Confirm Password'
								InputLabelProps={{
									shrink: true,
								}}
								margin='normal'
								{...formik.getFieldProps('confirmPassword')}
							/>
							<div className={style.error}>
								{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
							</div>

						</div>
						<div className={style.buttonBlock}>
							<span className={style.subtitle}>Have an account? <a>Login</a></span>
							<button type={'submit'} >
								Complete SignUp
							</button>
						</div>
					</div>
				</FormGroup>
			</form>
		</div>
	)
}

const years = ['2020','2021','2022','2023']
const months = ['January', 'February','March', 'April', 'May']
const nations = ['German']
const days = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
