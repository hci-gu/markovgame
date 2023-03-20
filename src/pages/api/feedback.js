import { registerScore, registerFeedback } from '../../utils/register'

export default async function handler(req, res) {
  const participantId = req.body.participantId
  const comment = req.body.comment

  try {
    await registerFeedback(participantId, comment)
  } catch (e) {}

  res.status(200).json({
    ok: true
  })
}
