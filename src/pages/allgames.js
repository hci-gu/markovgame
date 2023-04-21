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

// import prov1 from '@/games/prov1'
// import prov2 from '@/games/prov2'
import double from '@/games/double'
// import double1 from '@/games/double1'
// import tripple from '@/games/tripple'
import tripple1 from '@/games/tripple1'
import tripple2 from '@/games/tripple2'
import tripple3 from '@/games/tripple3'
import tripple4 from '@/games/tripple4'

export default function Home() {
  const [game, setGame] = useState(double)

  // get query anchor value
  const anchor = typeof window !== 'undefined' ? window.location.hash : null
  let showData = false
  if (anchor) {
    showData = anchor.includes('probs')
  }

  const games = {
    // 'Single 1': balloon,
    'Double 1': double,
    // 'Double 2': double1,
    'Tripple 1': tripple1,
    'Tripple 2': tripple2,
    'Tripple 3': tripple3,
    'Tripple 4': tripple4,
    // 'Single 1': balloon,
    // 'Single 2': balloon2,
    // 'Single 3': balloon3,
    // 'Single 4': balloon4,
    // 'Single 5': balloon5,
    // 'Single 6': patience,
    // 'Single 7': risktaking,
    // 'Single 8': riskavoidance,
    // 'Single 9': prov1,
    // 'Single 10': prov2,
    // 'Double 1': igt,
    // 'Double 2': igtVar,
    // 'Double 3': planning,
    // 'Double 4': planning2,
    // 'Double 5': threeballoons,
    // 'Double 6': memory1,
    // 'Double 7': memory2,
    // 'Double 8': double,
    // 'Triple 1': maze,
    // 'Triple 2': memory3,
    // 'Triple 3': memory4,
    // 'Triple 4': tripple,
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {/* dropdown to select game */}
        <select onChange={(e) => { setGame(games[e.target.value]); e.target.blur(); }}>
          { Object.keys(games).map((name, i) => <option key={i} value={name}>{name}</option>) }
        </select>
      </div>
      <Game game={game} onDone={() => {}} showData={showData} />
    </>
  )
}
