import type { AppProps } from 'next/app'
import GlobalStyles from '@repo/ui/GlobalStyles'
import { Provider } from 'react-redux'
import { wrapper } from '@/store/store'

const App = ({ Component, ...rest }: AppProps) => {
	const { store, props } = wrapper.useWrappedStore(rest)
	return (
		<Provider store={store}>
			<GlobalStyles />
			<Component {...props.pageProps} />
		</Provider>
	)
}

export default App
