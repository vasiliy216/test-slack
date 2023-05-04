import React, { useEffect } from "react"
import { useForm, FieldValues, RegisterOptions } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import styles from "./form.module.css"

type FormInputType = {
	id: string
	name: string
	type: string
	value: string
	label: string
	validation: RegisterOptions
	placeholder: string
	handleChange: React.ChangeEventHandler<HTMLInputElement>
	className?: string
}

type FormType = {
	onSubmit: () => Promise<void | boolean>
	buttons: JSX.Element[]
	children: JSX.Element | JSX.Element[]
}

const FormContext = React.createContext<FieldValues | null>(null)

export const Form = (props: FormType) => {
	const { onSubmit, buttons, children } = props

	const { register, handleSubmit, formState: { errors }, setValue } = useForm({ criteriaMode: "all" })

	return (
		<form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
			<FormContext.Provider value={{ register, errors, setValue }}>
				{children}
				{buttons}
			</FormContext.Provider>
		</form>
	)
}

Form.Input = function FormInput(props: FormInputType) {
	const {
		handleChange, value,
		validation, name,
		id, label, type, placeholder, className
	} = props
	const { register, errors, setValue } = React.useContext(FormContext) as FieldValues

	useEffect(() => { setValue(name, value) }, [setValue, name, value])

	return (
		<div className={styles.form_group}>
			{label && <label htmlFor={id}><strong>{label}</strong></label>}
			<input
				{...register(name, { ...validation })}
				name={name}
				className={`${className || ""} ${styles.form_control} ${errors[name] ? styles.is_invalid : ""}`}
				id={id}
				placeholder={placeholder}
				type={type}
				onChange={handleChange}
				value={value}
			/>
			<ErrorMessage
				errors={errors}
				name={name}
				render={({ message }) => (
					<ul className={styles.text_danger} >
						<li>{message}</li>
					</ul>
				)}
			/>
		</div>
	)
}