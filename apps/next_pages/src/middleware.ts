import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export const middleware = async (request: NextRequest) => {
	const accessToken = request.cookies.get('accessToken')
	try {
		await jwtVerify(
			accessToken?.value!,
			new TextEncoder().encode(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET)
		)
		return NextResponse.next()
	} catch {
		request.nextUrl.pathname = '/login'
		return NextResponse.redirect(request.nextUrl)
	}
}

export const config = {
	matcher: '/'
}
