import { Home } from '@/components/Home'
import { getData } from './actions/actions'

export default async function Page() {
	const message = await getData()
	return <Home message={message} />
}
