import { ChangeEventHandler, forwardRef } from 'react'

import styled from 'styled-components'

const StyledLabel = styled.label`
	display: flex;
	flex-direction: column;
	color: #9e8c86;
	font-size: 12px;
	font-weight: bold;

	:focus-visible {
		outline: none;
	}
`

const StyledInput = styled.input`
	background-color: transparent;
	border-bottom: 1px solid #dbd7cf;
	padding-block: 15px;
	&::placeholder {
		color: #bbb7af;
		font-size: 12px;
	}
`

interface Props {
	label: string
	placeholder: string
	onChange: ChangeEventHandler<HTMLInputElement>
	name: string
	type: 'text' | 'password'
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ label, placeholder, onChange, name, type }, ref) => (
		<StyledLabel>
			{label}
			<StyledInput
				onChange={onChange}
				name={name}
				ref={ref}
				type={type}
				placeholder={placeholder}
			/>
		</StyledLabel>
	)
)
