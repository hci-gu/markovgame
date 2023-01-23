import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'

const state = ({rewards, actions}) => ({
  rewards,
  actions,
})

// const game = {
//   start: state({
//     actions: {
//       up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 }] }) }],
//       left: [{ p: 1.0, next: state({
//         rewards: [{ p: 1.0, value: -10 }],
//         actions: {
//           up: [
//             {p: 0.5, next: state({ rewards: [{p: 1.0, value: 10}], })},
//             {p: 0.5, next: state({ rewards: [{p: 1.0, value: -10}], })},
//           ]
//         }
//       }) }],
//     }
//   }),
// }

// IGT
const game = {
  start: state({
    actions: {
      up: [
        { p: 0.5, next: state({ rewards: [{ p: 1.0, value: 100 }] }) },
        { p: 0.5, next: state({ rewards: [{ p: 1.0, value: -50 }] }) },
      ],
      down: [
        { p: 0.5, next: state({ rewards: [{ p: 1.0, value: 10 }] }) },
        { p: 0.5, next: state({ rewards: [{ p: 1.0, value: -100 }] }) },
      ],
      left: [
        { p: 0.5, next: state({ rewards: [{ p: 1.0, value: +100 }] }) },
        { p: 0.5, next: state({ rewards: [{ p: 1.0, value: -90 }] }) },
      ],
      right: [
        { p: 0.1, next: state({ rewards: [{ p: 1.0, value: +1000 }] }) },
        { p: 0.9, next: state({ rewards: [{ p: 1.0, value: -50 }] }) },
      ],
    }
  })
}

const makeNewNode = ({ nodes, action, x, y}) => (
  {
    p: action.p,
    next: addNodeFromState({
      nodes,
      state: action.next,
      x,
      y,
    }),
  }
)

const makeRoom = ({ nodes, x, y, dx = 0, dy = 0 }) => {
  for (let i = 0; i < nodes.length; i++) {
    if (dx < 0) {
      if (nodes[i].x <= x - 1) {
        nodes[i].x += dx
      }
    } else if (dx > 0) {
      if (nodes[i].x >= x + 1) {
        nodes[i].x += dx
      }
    } else if (dy < 0) {
      if (nodes[i].y <= y - 1) {
        nodes[i].y += dy
      }
    } else if (dy > 0) {
      if (nodes[i].y >= y + 1) {
        nodes[i].y += dy
      }
    }
  }
}

const addNodeFromState = ({ nodes, state, x, y }) => {
  const node = {
    x,
    y,
    rewards: state.rewards,
    actions: null,
  }
  nodes.push(node)

  if (!state.actions) return node

  node.actions = {}

  if (state.actions.up) {
    makeRoom({ nodes, x, y, dy: -1 })

    node.actions.up = []

    let dx = []
    if (state.actions.up.length == 1) {
      dx = [0]
    } else if (state.actions.up.length == 2) {
      dx = [-1, 1]
    }
    for (var i = 0; i < dx.length; i++) {
      makeRoom({ nodes, x, y: y - 1, dx: dx[i] })
      node.actions.up.push(makeNewNode({
        nodes,
        action: state.actions.up[i],
        x: x + dx[i],
        y: y - 1,
      }))
    }
  }
  if (state.actions.down) {
    makeRoom({ nodes, x, y, dy: 1 })

    node.actions.down = []

    let dx = []
    if (state.actions.down.length == 1) {
      dx = [0]
    } else if (state.actions.down.length == 2) {
      dx = [-1, 1]
    }
    for (var i = 0; i < dx.length; i++) {
      makeRoom({ nodes, x, y: y + 1, dx: dx[i] })
      node.actions.down.push(makeNewNode({
        nodes,
        action: state.actions.down[i],
        x: x + dx[i],
        y: y + 1,
      }))
    }
  }
  if (state.actions.left) {
    makeRoom({ nodes, x, y, dx: -1 })

    node.actions.left = []

    let dy = []
    if (state.actions.left.length == 1) {
      dy = [0]
    } else if (state.actions.left.length == 2) {
      dy = [-1, 1]
    }
    for (var i = 0; i < dy.length; i++) {
      makeRoom({ nodes, x: x - 1, y, dy: dy[i] })
      node.actions.left.push(makeNewNode({
        nodes,
        action: state.actions.left[i],
        x: x - 1,
        y: y + dy[i],
      }))
    }
  }
  if (state.actions.right) {
    makeRoom({ nodes, x, y, dx: 1 })

    node.actions.right = []

    let dy = []
    if (state.actions.right.length == 1) {
      dy = [0]
    } else if (state.actions.right.length == 2) {
      dy = [-1, 1]
    }
    for (var i = 0; i < dy.length; i++) {
      makeRoom({ nodes, x: x + 1, y, dy: dy[i] })
      node.actions.right.push(makeNewNode({
        nodes,
        action: state.actions.right[i],
        x: x + 1,
        y: y + dy[i],
      }))
    }
  }

  return node
}

const getEdges = ({ nodes }) => {
  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (!node.actions) continue

    if (node.actions.up) {
      for (let j = 0; j < node.actions.up.length; j++) {
        const action = node.actions.up[j]
        edges.push({
          source: node,
          target: action.next,
          dir: 'up',
          p: action.p,
        })
      }
    }
    if (node.actions.down) {
      for (let j = 0; j < node.actions.down.length; j++) {
        const action = node.actions.down[j]
        edges.push({
          source: node,
          target: action.next,
          dir: 'down',
          p: action.p,
        })
      }
    }
    if (node.actions.left) {
      for (let j = 0; j < node.actions.left.length; j++) {
        const action = node.actions.left[j]
        edges.push({
          source: node,
          target: action.next,
          dir: 'left',
          p: action.p,
        })
      }
    }
    if (node.actions.right) {
      for (let j = 0; j < node.actions.right.length; j++) {
        const action = node.actions.right[j]
        edges.push({
          source: node,
          target: action.next,
          dir: 'right',
          p: action.p,
        })
      }
    }
  }
  return edges
}

const nodes = []
addNodeFromState({ nodes, state: game.start, x: 0, y: 0 })

const getAction = (actions) => {
  const r = Math.random()
  let p = 0
  for (let i = 0; i < actions.length; i++) {
    p += actions[i].p
    if (r < p) {
      return actions[i]
    }
  }
}

const getReward = (rewards) => {
  if (!rewards) return 0
  const r = Math.random()
  let p = 0
  for (let i = 0; i < rewards.length; i++) {
    p += rewards[i].p
    if (r < p) {
      return rewards[i].value
    }
  }
}

const Edge = ({ edge }) => {
  const { source, target, dir, p } = edge
  const x1 = source.x * 10 + 50
  const y1 = source.y * 10 + 50
  const x2 = target.x * 10 + 50
  const y2 = target.y * 10 + 50
  const ys = Math.sign(y2 - y1)
  const xs = Math.sign(x2 - x1)

  if ((dir === 'up' || dir === 'down') && x1 !== x2) {
    return <>
      {/* <line
        x1={x1}
        y1={y1}
        x2={x1}
        y2={y2}
        stroke="black"
        strokeWidth="0.1"
      />
      <line
        x1={x1}
        y1={y2}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="0.1"
      /> */}
      <path d={`M ${x1} ${y1} L ${x1} ${y2 - 10 * ys} A 10 10 0 0 ${xs > 0 ? ys > 0 ? 0 : 1 : ys > 0 ? 1 : 0} ${x1 + 10 * xs} ${y2} L ${x2} ${y2}`} fill="none" stroke="black" strokeWidth="0.1" />
    </>
  }
  if ((dir === 'left' || dir === 'right') && y1 !== y2) {
    return <>
      {/* <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y1}
        stroke="black"
        strokeWidth="0.1"
      />
      <line
        x1={x2}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="black"
        strokeWidth="0.1"
      /> */}
      <path d={`M ${x1} ${y1} L ${x2 - 10 * xs} ${y1} A 10 10 0 0 ${xs > 0 ? ys > 0 ? 1 : 0 : ys > 0 ? 0 : 1} ${x2} ${y1 + 10 * ys} L ${x2} ${y2}`} fill="none" stroke="black" strokeWidth="0.1" />
    </>
  }

  return <>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="black"
      strokeWidth="0.1"
    />
  </>
}

export default function Home() {
  const [nodeAt, setNodeAt] = useState(nodes[0])
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [atEnd, setAtEnd] = useState(false)

  const edges = getEdges({ nodes })

  // listen to keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      let action
      if (event.key == 'ArrowUp') {
        if (nodeAt.actions?.up) {
          action = getAction(nodeAt.actions.up)
        }
      } else if (event.key == 'ArrowDown') {
        if (nodeAt.actions?.down) {
          action = getAction(nodeAt.actions.down)
          // setNodeAt(nodeAt.actions.down[0].next)
        }
      } else if (event.key == 'ArrowLeft') {
        if (nodeAt.actions?.left) {
          action = getAction(nodeAt.actions.left)
          // setNodeAt(nodeAt.actions.left[0].next)
        }
      } else if (event.key == 'ArrowRight') {
        if (nodeAt.actions?.right) {
          action = getAction(nodeAt.actions.right)
          // setNodeAt(nodeAt.actions.right[0].next)
        }
      }

      if (action) {
        if (action.reward) {
          setScore(score + action.reward)
        }
        const reward = getReward(action.next.rewards)
        setScore(score + reward)
        setNodeAt(action.next)
        if (action.next.actions == null) {
          setAtEnd(true)
          setAttempts(attempts + 1)
        }
      }

      // if key is 'r'
      if (event.key == 'r' && atEnd) {
        setNodeAt(nodes[0])
        setAtEnd(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nodeAt, score])

  return (
    <>
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {nodes.map((node) => (
          <circle cx={node.x * 10 + 50} cy={node.y * 10 + 50} r="2" fill="black" stroke={node == nodeAt ? 'red' : 'none'} />
        ))}
        {edges.map((edge) => (
          <Edge key={edge.source.id + edge.target.id} edge={edge} />
        ))}
      </svg>
      <div className={styles.score}>
        Score: { score } Attempts: { attempts }
      </div>
      { atEnd && <div className={styles.end}>You reached the end! Press 'r' to restart.</div> }
    </>
  )
}
