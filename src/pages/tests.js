import { useState } from "react"
import Router from "next/router"
import Link from "next/link"

import Game from "@/components/Game"

import maze from "@/games/maze"
import balloon from "@/games/balloon"

export default function Test1() {
  const [game, setGame] = useState(maze)
  const [isDone, setIsDone] = useState(false)

  return <div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <button onClick={() => setGame(maze)}>Prov 1</button>
      <button onClick={() => setGame(balloon)}>Prov 2</button>
    </div>
    <Game game={game} onDone={() => { setIsDone(true) }} />
    { isDone && <div style={{ marginTop: "30px"}}><center>Välj ett annat spel med knapparna ovan, eller <Link href="start">gå vidare</Link>.</center></div>}
  </div>
}