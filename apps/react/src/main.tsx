import { App } from './App.tsx'
import GlobalStyles from '@repo/ui/GlobalStyles'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalStyles />
		<App />
	</React.StrictMode>
)
