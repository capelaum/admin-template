import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { getDecodedToken } from 'services/users'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { userToken } = req.cookies
  const url = req.nextUrl.clone()

  const decodedToken: DecodedIdToken | null = await getDecodedToken(userToken)

  if (url.pathname !== '/login' && !decodedToken) {
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (url.pathname === '/login' && decodedToken) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
