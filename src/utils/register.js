const API_KEY = 'b9241d79-1351-4eb8-9bb1-1ea6c41cae7c'
const API_URL = 'https://analytics.prod.appadem.in'

const registerScore = async (participantId, gameNumber, score) => {
  // console.log('registerScore', participantId, gameNumber, score)

  try {

    return await fetch(`${API_URL}/markovgame/scores/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        participantId,
        gameNumber,
        score,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (e) {
    console.log('registerScore error', e)
  }
}

const registerFeedback = async (participantId, comment) => {
  // console.log('registerFeedback', participantId, comment)

  try {
    return await fetch(`${API_URL}/markovgame/comments/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({
        participantId,
        comment,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch (e) {
    console.log('registerFeedback error', e)
  }
}

export {
  registerScore,
  registerFeedback,
}