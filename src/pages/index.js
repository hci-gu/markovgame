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
import balloon2 from '@/games/balloon2'
import balloon3 from '@/games/balloon3'
import balloon4 from '@/games/balloon4'
import balloon5 from '@/games/balloon5'
import maze from '@/games/maze'
import memory1 from '@/games/memory1'
import memory2 from '@/games/memory2'
import memory3 from '@/games/memory3'
import memory4 from '@/games/memory4'
import sequence from '@/games/sequence'
import threeballoons from '@/games/threeballoons'

export default function Home() {
  const [game, setGame] = useState(igt)

  const games = {
    igt,
    die,
    coin,
    addition,
    'igt-variant': igtVar,
    toy,
    subtraction,
    planning,
    planning2,
    patience,
    risktaking,
    riskavoidance,
    doubleindet,
    balloon,
    balloon2,
    balloon3,
    balloon4,
    balloon5,
    maze,
    memory,
    memory1,
    memory2,
    memory3,
    memory4,
    sequence,
    threeballoons,
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {/* { Object.keys(games).map((name, i) => <button key={i} onClick={() => setGame(games[name])}>{name}</button>) } */}
        {/* dropdown to select game */}
        <select onChange={(e) => { setGame(games[e.target.value]); e.target.blur(); }}>
          { Object.keys(games).map((name, i) => <option key={i} value={name}>{name}</option>) }
        </select>
      </div>
      <Game game={game} />
    </>
  )
}
