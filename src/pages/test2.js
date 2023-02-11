import { useState } from "react"
import Router from "next/router"

import Game from "@/components/Game"

import planning2 from "@/games/planning2"

export default function Test2() {
  const [isDone, setIsDone] = useState(false)

return <div>
    <Game game={planning2} onDone={() => { setIsDone(true) }} />
    { isDone && <div style={{ marginTop: "30px"}}><center>Tryck <a href="#" onClick={() => Router.back()}>bakåt</a> för att gå tillbaks till menyn.</center></div>}
  </div>
}
