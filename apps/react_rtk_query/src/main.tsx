import { App } from './App.tsx'
import GlobalStyles from '@repo/ui/GlobalStyles'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<GlobalStyles />
		<App />
	</>
)
