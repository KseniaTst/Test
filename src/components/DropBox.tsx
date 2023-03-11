import {Autocomplete, InputAdornment, TextField} from "@mui/material";
import style from './dropBox.module.scss'

type PropsType = {
	formik: any
	label : string
	field:string
}

export const DropBox = (props:PropsType) => {
	const {formik, label, field} = props

	return (
		<Autocomplete
			renderInput={(p)=>(<TextField
					{...p}
					className={style.textField}
					variant="standard"
					label={label}
					InputLabelProps={{
						shrink: true,
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<i className={style.arrowDown}/>
							</InputAdornment>
						),
					}}
					margin="normal"
					{...formik.getFieldProps(field)}
				/>
			)} options={[]}/>
	)
}