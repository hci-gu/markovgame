import { useState } from "react"
import Router from "next/router"
import Link from "next/link"

import Game from "@/components/Game"

import prov1 from "@/games/prov1"
import prov2 from "@/games/prov2"

export default function Test1() {
  const [game, setGame] = useState(prov1)
  const [isDone, setIsDone] = useState(false)

  return <div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <button onClick={() => setGame(prov1)}>Prov 1</button>
      <button onClick={() => setGame(prov2)}>Prov 2</button>
    </div>
    <Game game={game} onDone={() => { setIsDone(true) }} />
    { isDone && <div style={{ marginTop: "30px"}}><center>Välj ett annat spel med knapparna ovan, eller <Link href="start">gå vidare</Link>.</center></div>}
  </div>
}