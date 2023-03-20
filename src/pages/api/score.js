import { registerScore, registerFeedback } from '../../utils/register'

export default async function handler(req, res) {
  const participantId = req.body.participantId
  const gameNumber = req.body.gameNumber
  const score = req.body.score

  try {
    await registerScore(participantId, gameNumber, score)
    console.log('registerScore', participantId, gameNumber, score)
  } catch (e) {}

  res.status(200).json({
    ok: true
  })
}
