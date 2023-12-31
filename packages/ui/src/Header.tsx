import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.h1<{ $color: string }>`
	color: ${({ $color }) => $color};
	text-align: center;
	font-size: 16px;
`

interface Props extends PropsWithChildren {
	color: string
}

export const Header = ({ children, color }: Props) => {
	return <StyledHeader $color={color}>{children}</StyledHeader>
}
