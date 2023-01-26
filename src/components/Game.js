import styles from '@/styles/Home.module.css'
import { useState, useEffect, useMemo, } from 'react'
import { Edge } from './Edge'

import { getEdges, addNodeFromState, getAction, getReward, } from '@/utils/game'

export default function Game({ game }) {
  const nodes = useMemo(() => {
    const nodes = []
    addNodeFromState({ nodes, state: game.start, x: 0, y: 0 })
    return nodes
  }, [game])

  const [nodeAt, setNodeAt] = useState(nodes[0])
  const [score, setScore] = useState(0)
  const [lastReward, setLastReward] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [atEnd, setAtEnd] = useState(false)

  const edges = useMemo(() => {
    return getEdges({ nodes })
  }, [nodes])

  useEffect(() => {
    setAtEnd(false)
    setNodeAt(nodes[0])
    setScore(0)
    setAttempts(0)
    setLastReward(0)
  }, [game, nodes])

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
        }
      } else if (event.key == 'ArrowLeft') {
        if (nodeAt.actions?.left) {
          action = getAction(nodeAt.actions.left)
        }
      } else if (event.key == 'ArrowRight') {
        if (nodeAt.actions?.right) {
          action = getAction(nodeAt.actions.right)
        }
      }

      if (action) {
        let reward = 0
        console.log({ action })
        if (action.rewards) {
          reward += getReward(action.rewards)
        }
        if (action.next.rewards) {
          reward += getReward(action.next.rewards)
        }
        setLastReward(reward)
        setScore(score => score + reward)
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
  }, [nodeAt, score, attempts, atEnd, nodes])

  return (
    <>
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ display: 'block', height: '80vh' }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" 
          refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="black" stroke="black" />
          </marker>
        </defs>

        {nodes.map((node) => (
          <circle key={`c_node_${node.x}_${node.y}`} cx={node.x * 10 + 50} cy={node.y * 10 + 50} r="2" fill="black" stroke={node == nodeAt ? 'red' : 'none'} />
        ))}
        {edges.map((edge) => (
          <Edge key={`${edge.source.x} ${edge.source.y} ${edge.target.x} ${edge.target.y}`} edge={edge} />
        ))}
      </svg>
      <div className={styles.score}>
        Reward: { lastReward }
        <br />
        <br />
        Score: { score } Attempts: { attempts }
      </div>
      { atEnd && <div className={styles.end}>You reached the end! Press &#39;r&#39; to restart.</div> }
    </>
  )
}