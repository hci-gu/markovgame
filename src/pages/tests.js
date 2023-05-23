import { useState } from "react"
import styles from "@/styles/Home.module.css"
import Router from "next/router"
import Link from "next/link"

import Game from "@/components/Game"

import prov1 from "@/games/threeballoons"
import prov2 from "@/games/planning2"

export default function Test1() {
  const [game, setGame] = useState(prov1)
  const [isDone, setIsDone] = useState(false)
  const [showIntro , setShowIntro] = useState(true)

  return <div className={styles.main}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', maxWidth: 800 }}>
      <button onClick={() => setGame(prov1)}>Prov 1</button>
      <button onClick={() => setGame(prov2)}>Prov 2</button>
    </div>
    <div style={{ position: 'relative' }}>
      <Game game={game} numTrials={20} onDone={() => { setIsDone(true) }} />
      {showIntro && <div style={{ position: 'absolute', background: 'white', border: '1px solid black', opacity: 0.9, top: 200, textAlign: 'center', width: '100%', padding: '1em' }}>
        <h1>Att spela</h1>
        <p>Detta är ett testspel. Du kommer att spela 20 omgångar. Du kommer att få poäng för varje omgång, och dina poäng kommer att summeras i slutet av spelet.</p>
        <p>Du spelar genom att använda piltangenterna eller trycka på dit du vill gå.</p>
        <button onClick={() => setShowIntro(false)}>Börja spela</button>
        <nbsp />
      </div>}
    </div>
    { isDone && <div style={{ marginTop: "30px"}}><center>Välj ett annat spel med knapparna ovan, eller <Link href="start">gå vidare</Link>.</center></div>}
  </div>
}