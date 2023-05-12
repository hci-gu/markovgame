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

  return <div className={styles.main}>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', maxWidth: 800 }}>
      <button onClick={() => setGame(prov1)}>Prov 1</button>
      <button onClick={() => setGame(prov2)}>Prov 2</button>
    </div>
    <Game game={game} numTrials={20} onDone={() => { setIsDone(true) }} />
    { isDone && <div style={{ marginTop: "30px"}}><center>Välj ett annat spel med knapparna ovan, eller <Link href="start">gå vidare</Link>.</center></div>}
  </div>
}