import type { AppProps } from 'next/app'
import GlobalStyles from '@repo/ui/GlobalStyles'
import { SessionProvider } from 'next-auth/react'

export default function App({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps) {
	return (
		<SessionProvider session={session}>
			<GlobalStyles />
			<Component {...pageProps} />
		</SessionProvider>
	)
}
