import { Home } from '@/components/Home'
import { getDataServer } from './actions/actions'

export default async function Page() {
	const message = await getDataServer()
	return <Home message={message} />
}
