import { PropsWithChildren } from 'react'
import styled from 'styled-components'

const StyledCard = styled.div`
	width: 400px;
	padding: 20px;
	background-color: #f6f4f1;
	display: flex;
	flex-direction: column;
	gap: 40px;
`

export const Card = ({ children }: PropsWithChildren) => (
	<StyledCard>{children}</StyledCard>
)
