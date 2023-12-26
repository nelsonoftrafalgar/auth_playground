import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
	border-radius: 25px;
	background-color: #f65436;
	padding: 15px;
	color: #fae5df;
`

export const Button = ({ children }: PropsWithChildren) => (
	<StyledButton>{children}</StyledButton>
)
