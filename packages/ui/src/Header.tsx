import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.h1`
	color: #9e8c86;
	text-align: center;
	font-size: 16px;
`

export const Header = ({ children }: PropsWithChildren) => {
	return <StyledHeader>{children}</StyledHeader>
}
