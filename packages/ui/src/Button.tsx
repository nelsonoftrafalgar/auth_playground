import { MouseEventHandler, ReactNode } from 'react'

import styled from 'styled-components'

const StyledButton = styled.button`
	border-radius: 25px;
	background-color: #f65436;
	padding: 15px;
	color: #fae5df;
`

interface Props {
	children: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({ children, onClick }: Props) => (
	<StyledButton onClick={onClick}> {children}</StyledButton>
)
