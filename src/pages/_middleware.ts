import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { userToken } = req.cookies
  // console.log('🚀 ~ userToken', userToken)

  const url = req.nextUrl.clone()

  if (url.pathname !== '/login') {
    const decodedToken: DecodedIdToken = await fetch(
      'http://localhost:3000/api/verifyIdToken',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userToken })
      }
    ).then((res) => res.json())

    console.log('🚀 ~ decodedToken', decodedToken)

    if (decodedToken.error) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  if (url.pathname === '/login' && userToken) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}
