import { useState } from 'react'
import Game from '@/components/Game'

import styles from '../styles/Home.module.css'

import { getParticipantId } from '@/utils/participant'

import balloon from '@/games/balloon'
import riskavoidance from '@/games/riskavoidance'
import igtVariant from '@/games/igt-variant2'
import double from '@/games/double'
import tripple from '@/games/tripple'

// import { registerScore, registerFeedback } from '@/utils/register'

const registerScore = async (participantId, gameNumber, score) => {
  const res = await fetch('/api/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      participantId,
      gameNumber,
      score
    })
  })
  const data = await res.json()
  return data
}

const registerFeedback = async (participantId, comment) => {
  const res = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      participantId,
      comment
    })
  })
  const data = await res.json()
  return data
}

const TrialsOver = ({ participantId }) => {
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  return <div>
    <h1>Tack! Alla spel är avslutade.</h1>
    {sent && <p>Tack för dina kommentarer!</p>}
    {!sent && <>
    <p>Om du har några kommentarer eller frågor, skriv dem nedan.</p>
    <p>Berätta till exempel gärna om vilka strategier du använde när du spelade spelen.</p>
    <textarea style={{ width: '100%', height: '150px' }} value={comment} onChange={(e) => setComment(e.target.value)} />
    <button onClick={() => {
      registerFeedback(participantId, comment)
      setSent(true)
    }}>Skicka</button>
    </>}
  </div>
}

export default function Home() {
  const participantId = getParticipantId()
  const [gameOver, setGameOver] = useState(false)
  const [gameNumber, setGameNumber] = useState(0)
  const [promptNext, setPromptNext] = useState(false)

  const games = [
    balloon,
    riskavoidance,
    igtVariant,
    double,
    tripple,
  ]

  const onDone = (score) => {
    registerScore(participantId, gameNumber, score)

    setPromptNext(true)
  }

  const next = () => {
    setPromptNext(false)
    if (gameNumber === games.length - 1) {
      setGameOver(true)
    } else {
      setGameNumber(gameNumber + 1)
    }
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {gameOver && <TrialsOver participantId={participantId} />}
        {!gameOver && <h1>Spel {gameNumber + 1} av {games.length}</h1>}
      </div>
      {!gameOver && <Game game={games[gameNumber]} onDone={onDone}/>}
      { promptNext && <div className={styles.promptNext} style={{ marginTop: '30px' }}><center>Tryck <a href="#" onClick={next}>här</a> för att gå vidare.</center></div> }
    </>
  )
}
