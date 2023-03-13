import {useState} from "react";
import styles from './dropbox.module.scss'

type PropsType = {
	options: Array<string>
}

export const DropBox = (props: PropsType) => {

	const {options} = props

	const [option, setOption] = useState('')
	const [show, setShow] = useState(false)

	const onOptionClick = (op: string) => {
		setShow(false)
		setOption(op)
	}

	return (
		<div className={styles.accordionContainer}>
			<div className={styles.inputContainer} onClick={() => setShow(!show)}>
				<input readOnly value={option}/>
				<i/>
			</div>

			{show && <div className={styles.optionsContainer}>
				{options.map((op, i) => {
					return <span key={i} onClick={() => onOptionClick(op)}>{op}</span>
				})
				}
			</div>}

		</div>

	)
}