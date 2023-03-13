import style from './success.module.scss'

export const SignUpSuccess = () => {
	return (
		<div className={style.titleContainer}>
			<div className={style.title}>Thank You!</div>
			<div className={style.subtitle}>you registered!</div>
		</div>
	)
}