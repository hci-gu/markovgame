import styles from '@/styles/Home.module.css'
import { useState, useEffect, useMemo, } from 'react'
import { Edge } from './Edge'

import { getEdges, addNodeFromState, getAction, getReward, } from '@/utils/game'

const NUM_TRIALS = 75

export default function Game({ game, onDone, numTrials = NUM_TRIALS }) {
  const nodes = useMemo(() => {
    const nodes = []
    addNodeFromState({ nodes, state: game.start, x: 0, y: 0 })
    return nodes
  }, [game])

  const [nodeAt, setNodeAt] = useState(nodes[0])
  const [score, setScore] = useState(0)
  const [attemptScore, setAttemptScore] = useState(0)
  const [lastReward, setLastReward] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const [dir, setDir] = useState([0, 0])
  const [gameOver, setGameOver] = useState(false)

  const edges = useMemo(() => {
    return getEdges({ nodes })
  }, [nodes])

  useEffect(() => {
    setAtEnd(false)
    setNodeAt(nodes[0])
    setScore(0)
    setAttempts(0)
    setLastReward(0)
    setAttemptScore(0)
    setGameOver(false)
  }, [game, nodes])

  // listen to keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      let action
      if (event.key == 'ArrowUp') {
        if (nodeAt.actions?.up) {
          action = getAction(nodeAt.actions.up)
          setDir([0, -1])
        }
      } else if (event.key == 'ArrowDown') {
        if (nodeAt.actions?.down) {
          action = getAction(nodeAt.actions.down)
          setDir([0, 1])
        }
      } else if (event.key == 'ArrowLeft') {
        if (nodeAt.actions?.left) {
          action = getAction(nodeAt.actions.left)
          setDir([-1, 0])
        }
      } else if (event.key == 'ArrowRight') {
        if (nodeAt.actions?.right) {
          action = getAction(nodeAt.actions.right)
          setDir([1, 0])
        }
      }

      if (action) {
        let reward = 0
        if (action.rewards) {
          reward += getReward(action.rewards)
        }
        if (action.next.rewards) {
          reward += getReward(action.next.rewards)
        }
        setLastReward(reward)
        setAttemptScore(attemptScore => attemptScore + reward)
        setScore(score => score + reward)
        action.next.score = reward
        setNodeAt(action.next)
        if (action.next.actions == null) {
          setAtEnd(true)
          setAttempts(attempts + 1)
        }
      }

      // if key is 'r'
      if (event.key == 'r' && atEnd && !gameOver) {
        nodes.forEach(node => node.score = null)
        setNodeAt(nodes[0])
        setAtEnd(false)
        setAttemptScore(0)
        setLastReward(0)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nodeAt, score, attempts, atEnd, nodes, gameOver])

  useEffect(() => {
    if (attempts === numTrials && !gameOver) {
      setGameOver(true)
      onDone(score)
    }
  }, [attempts, score, onDone, gameOver])

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
        {nodes.map((node) => (
          <text style={{ fontSize: 2, }} key={`t_node_${node.x}_${node.y}`} x={node.x * 10 + 50} y={node.y * 10 + 50} textAnchor="middle" dominantBaseline="middle" fill="white">{node.score}</text>
        ))}
        { atEnd && <text style={{ fontSize: 3, }} x={nodeAt.x * 10 + 50 + 6 * dir[0]} y={nodeAt.y * 10 + 50 + 5 * dir[1]} textAnchor="middle" dominantBaseline="middle" fill="black">{attemptScore}</text> }
      </svg>
      <div className={styles.score}>
        Poäng: {score} Försök: { attempts }/{numTrials}
      </div>
      { atEnd && !gameOver && <div className={styles.end}>Slut! Tryck &#39;r&#39; för att spela igen.</div> }
      { gameOver && <div className={styles.end}>Spelet är slut! Din poäng blev {score}.</div> }
    </>
  )
}
