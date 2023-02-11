import { useState } from "react"
import Router from "next/router"

import Game from "@/components/Game"

import maze from "@/games/maze"

export default function Test1() {
  const [isDone, setIsDone] = useState(false)

  return <div>
    <Game game={maze} onDone={() => { setIsDone(true) }} />
    { isDone && <div style={{ marginTop: "30px"}}><center>Tryck <a href="#" onClick={() => Router.back()}>bakåt</a> för att gå tillbaks till menyn.</center></div>}
  </div>
}