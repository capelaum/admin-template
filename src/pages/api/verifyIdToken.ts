import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier'
import { NextApiRequest, NextApiResponse } from 'next'
import { adminAuth } from 'services/firebaseAdmin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<DecodedIdToken | void> {
  const { userToken } = req.body

  if (!userToken)
    return res.status(401).json({ error: 'No user token id found' })

  try {
    const decodedToken = await adminAuth.verifyIdToken(userToken)
    console.log('🚀 ~ decodedToken', decodedToken)
    return res.status(200).json(decodedToken)
  } catch (error) {
    return res.status(401).json({ error })
  }
}
