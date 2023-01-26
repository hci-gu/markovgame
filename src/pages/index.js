import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Game from '@/components/Game'

const state = ({rewards, actions}) => ({
  rewards,
  actions,
})

const test = {
  start: state({
    actions: {
      up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 }] }) }],
      left: [{ p: 1.0, next: state({
        rewards: [{ p: 1.0, value: -10 }],
        actions: {
          up: [
            {p: 0.5, next: state({ rewards: [{p: 1.0, value: 10}], })},
            {p: 0.5, next: state({ rewards: [{p: 1.0, value: -10}], })},
          ]
        }
      }) }],
    }
  }),
}

// IGT
const igt = {
  start: state({
    actions: {
      up: [
        { p: 1.0, rewards: [{ p: 0.5, value: 100 }, { p: 0.5, value: -50 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      down: [
        { p: 1.0, rewards: [{ p: 0.5, value: 10 }, { p: 0.5, value: -100 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      left: [
        { p: 1.0, rewards: [{ p: 0.5, value: 100 }, { p: 0.5, value: -90 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      right: [
        { p: 1.0, rewards: [{ p: 0.1, value: 1000 }, { p: 0.9, value: -50 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
    }
  })
}

export default function Home() {
  const [game, setGame] = useState(igt)
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={() => setGame(igt)}>IGT</button>
        <button onClick={() => setGame(test)}>Test</button>
      </div>
      <Game game={game} />
    </>
  )
}
