import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Game from '@/components/Game'

import igt from '@/games/igt'
import die from '@/games/die'
import coin from '@/games/coin'
import addition from '@/games/addition'
import balloon from '@/games/balloon'
import igtVar from '@/games/igt-variant'
import toy from '@/games/toy'
import subtraction from '@/games/subtraction'
import planning from '@/games/planning'
import planning2 from '@/games/planning2'
import patience from '@/games/patience'
import memory from '@/games/memory'
import risktaking from '@/games/risktaking'
import riskavoidance from '@/games/riskavoidance'
import doubleindet from '@/games/doubleindet'

export default function Home() {
  const [game, setGame] = useState(igt)

  const games = {
    igt,
    die,
    coin,
    addition,
    balloon,
    'igt-variant': igtVar,
    toy,
    subtraction,
    planning,
    planning2,
    patience,
    memory,
    risktaking,
    riskavoidance,
    doubleindet,
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        { Object.keys(games).map((name, i) => <button key={i} onClick={() => setGame(games[name])}>{name}</button>) }
      </div>
      <Game game={game} />
    </>
  )
}
