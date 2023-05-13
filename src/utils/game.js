const makeNewNode = ({ nodes, action, x, y}) => (
  {
    p: action.p,
    rewards: action.rewards,
    next: addNodeFromState({
      nodes,
      state: action.next,
      x,
      y,
    }),
  }
)
  
const makeRoom = ({ nodes, x, y, dx = 0, dy = 0 }) => {
  // for (let i = 0; i < nodes.length; i++) {
  //   if (dx < 0) {
  //     if (nodes[i].x <= x - 1) {
  //       nodes[i].x += dx
  //     }
  //   } else if (dx > 0) {
  //     if (nodes[i].x >= x + 1) {
  //       nodes[i].x += dx
  //     }
  //   } else if (dy < 0) {
  //     if (nodes[i].y <= y - 1) {
  //       nodes[i].y += dy
  //     }
  //   } else if (dy > 0) {
  //     if (nodes[i].y >= y + 1) {
  //       nodes[i].y += dy
  //     }
  //   }
  // }
}

const colors = [
  "#1f77b4", // blue
  "#ff7f0e", // orange
  "#2ca02c", // green
  "#d62728", // red
  "#9467bd", // purple
  "#8c564b", // brown
  "#e377c2", // pink
  "#7f7f7f", // gray
  "#bcbd22", // yellow-green
  "#17becf", // blue-green
  "#aec7e8", // light blue
  "#ffbb78" // light orange
]

const addNodeFromState = ({ nodes, state, x, y }) => {
  const existingNode = nodes.find(({ state: s }) => (s === state))
  if (existingNode) return existingNode

  const node = {
    x,
    y,
    rewards: state.rewards,
    actions: null,
    state: state,
    color: colors[nodes.length % colors.length],
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

const centerNodes = ({ nodes }) => {
  // center based on max/min x and max/min y
  const x = nodes.map(n => n.x)
  const y = nodes.map(n => n.y)
  const minX = Math.min(...x)
  const maxX = Math.max(...x)
  const minY = Math.min(...y)
  const maxY = Math.max(...y)
  const dx = (maxX + minX) / 2
  const dy = (maxY + minY) / 2
  console.log({ minX, maxX, minY, maxY, dx, dy })
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].x -= dx
    nodes[i].y -= dy
  }
}

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

export {
    getAction,
    getReward,
    getEdges,
    addNodeFromState,
    centerNodes,
}