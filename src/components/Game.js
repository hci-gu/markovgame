import styles from '@/styles/Home.module.css'
import { useState, useEffect, useMemo, } from 'react'
import { Edge } from './Edge'

import { getEdges, addNodeFromState, getAction, getReward, centerNodes, } from '@/utils/game'

const NUM_TRIALS = 75

const Circle = ({ cx, cy, r, fill, stroke, rewards }) => {
  if (!rewards) {
    console.log(' no rewards')
    return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} />;
  }
  if (rewards.length === 1) {
    return <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} />
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={2} fill="white">
        {rewards[0].value}
      </text>
    </g>
  }

  // Calculate the total probability mass
  const totalP = rewards.reduce((acc, reward) => acc + reward.p, 0);

  // Check that the sum of all p values adds up to one
  if (totalP !== 1) {
    throw new Error("The sum of all p values must be equal to one");
  }

  const colors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"]

  // Calculate the angles for each segment based on the p values
  let startAngle = -Math.PI / 2; // Start at the top of the circle
  const paths = rewards.map((reward, i) => {
    const endAngle = startAngle + 2 * Math.PI * reward.p;
    const largeArcFlag = reward.p > 0.5 ? 1 : 0;
    const x1 = Math.cos(startAngle) * r + cx;
    const y1 = Math.sin(startAngle) * r + cy;
    const x2 = Math.cos(endAngle) * r + cx;
    const y2 = Math.sin(endAngle) * r + cy;
    const labelAngle = (startAngle + endAngle) / 2;
    const labelX = Math.cos(labelAngle) * r * 1.2 + cx;
    const labelY = Math.sin(labelAngle) * r * 1.2 + cy;
    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
    startAngle = endAngle;
    return <g key={reward.value}>
      <path key={reward.value} d={d} fill={colors[i]} />
      <text x={labelX} y={labelY} textAnchor="middle" fontSize={2}>
          {reward.value}
      </text>
    </g>
  });

  return (
    <svg width="100" height="100">
      {stroke && stroke !== "none" && <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} />}
      {paths}
    </svg>
  );
}

const possibleNextAction = (node, current) => {
  const next = []
  if (current.actions?.up && current.actions.up[0].next === node) {
    return {
      action: current.actions.up[0],
      dir: [0, -1],
    }
  }
  if (current.actions?.down && current.actions.down[0].next === node) {
    return {
      action: current.actions.down[0],
      dir: [0, 1],
    }
  }
  if (current.actions?.left && current.actions.left[0].next === node) {
    return {
      action: current.actions.left[0],
      dir: [-1, 0],
    }
  }
  if (current.actions?.right && current.actions.right[0].next === node) {
    return {
      action: current.actions.right[0],
      dir: [1, 0],
    }
  }
  return null
}

export default function Game({ game, onDone, numTrials = NUM_TRIALS, showData = false, }) {
  const nodes = useMemo(() => {
    const nodes = []
    addNodeFromState({ nodes, state: game.start, x: 0, y: 0 })
    centerNodes({ nodes })
    console.log({ nodes })
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

  const takeAction = (action) => {
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
  }

  const restartGame = () => {
    nodes.forEach(node => node.score = null)
    setNodeAt(nodes[0])
    setAtEnd(false)
    setAttemptScore(0)
    setLastReward(0)
  }

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

      takeAction(action)

      // if key is 'r'
      if (event.key == 'r' && atEnd && !gameOver) {
        restartGame()
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
      <svg width="100%" height="90%" viewBox="0 0 70 70" style={{ display: 'block', height: '70vh' }}>
        <defs>
          <marker id="arrowhead" markerWidth="20" markerHeight="17" 
          refX="8" refY="7" orient="auto">
            <polygon points="0 0, 20 7, 0 14" fill="black" stroke="black" />
          </marker>
        </defs>

        {edges.map((edge) => (
          <Edge key={`${edge.source.x} ${edge.source.y} ${edge.target.x} ${edge.target.y}`} edge={edge} />
        ))}
        {!showData && nodes.map((node) => (
          <circle
            key={`c_node_${node.x}_${node.y}`} 
            cx={node.x * 10 + 35} 
            cy={node.y * 10 + 35} 
            r="2" 
            fill={node.color} 
            stroke={node == nodeAt ? 'red' : 'none'} 
            onClick={() => {
              const actionAndDir = possibleNextAction(node, nodeAt)
              if (actionAndDir) {
                setDir(actionAndDir.dir)
                takeAction(actionAndDir.action)
              }
            }}
            />
        ))}
        {showData && nodes.map((node) => (
          <Circle
            key={`a_node_${node.x}_${node.y}`} 
            cx={node.x * 10 + 35} 
            cy={node.y * 10 + 35} 
            r={2} 
            fill={node.color} 
            stroke={node == nodeAt ? 'red' : 'none'} 
            rewards={node.rewards} 
            />
        ))}
        {nodes.map((node) => (
          <text 
            style={{ fontSize: 2, }} 
            key={`t_node_${node.x}_${node.y}`} 
            x={node.x * 10 + 35} 
            y={node.y * 10 + 35}
            textAnchor="middle" 
            dominantBaseline="middle" 
            fill="white">{node.score}</text>
        ))}
        { atEnd && <text 
          style={{ fontSize: 3, }} 
          x={nodeAt.x * 10 + 35 + 6 * dir[0]} 
          y={nodeAt.y * 10 + 35 + 5 * dir[1]} 
          textAnchor="middle" 
          dominantBaseline="middle" 
          fill="black">{attemptScore}
        </text> }
        { atEnd && !gameOver && <text
          onClick={restartGame}
          style={{ fontSize: 3, }}
          y={10}
          x={35}
          textAnchor='middle'
          dominantBaseline={'top'}
          >
            Tryck här för att fortsätta.
        </text> }
      </svg>
      <div className={styles.score}>
        Poäng: {score} Omgång: { attempts }/{numTrials}
      </div>
      { atEnd && !gameOver && <div className={styles.end} onClick={restartGame}>Slut! Tryck &#39;r&#39; för att spela igen.</div> }
      { gameOver && <div className={styles.end}>Spelet är slut! Din poäng blev {score}.</div> }
    </>
  )
}
