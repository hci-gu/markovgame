import { useState } from 'react'
import Game from '@/components/Game'

import styles from '../styles/Home.module.css'

import { getParticipantId } from '@/utils/participant'

import memory1 from '@/games/memory1'
import memory2 from '@/games/memory2'
import memory3 from '@/games/memory3'
import memory4 from '@/games/memory4'
import sequence from '@/games/sequence'

import { registerScore, registerFeedback } from '@/utils/register'

const TrialsOver = ({ participantId }) => {
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)

  return <div>
    <h1>Tack! Alla spel är avslutade.</h1>
    {sent && <p>Tack för dina kommentarer!</p>}
    {!sent && <>
    <p>Om du har några kommentarer eller frågor, skriv dem nedan.</p>
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
    memory1,
    memory2,
    memory3,
    memory4,
    sequence,
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
      </div>
      {!gameOver && <Game game={games[gameNumber]} onDone={onDone}/>}
      { promptNext && <div className={styles.promptNext} style={{ marginTop: '30px' }}><center>Tryck <a href="#" onClick={next}>här</a> för att gå vidare.</center></div> }
    </>
  )
}
