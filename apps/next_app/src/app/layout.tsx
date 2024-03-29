import GlobalStyles from '@repo/ui/GlobalStyles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<GlobalStyles />
			<body id='next-app-body'>{children}</body>
		</html>
	)
}
