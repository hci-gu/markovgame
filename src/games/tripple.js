import state from '@/games/state'

const end = state({ rewards: [{ p: 1.0, value: 1 }] })

const left2 = state({
  rewards: [
    { p: 0.5, value: -1 },
    { p: 0.5, value: -2 },
  ],
  actions: {
    up: [{ p: 1.0, next: end }],
  }
})

const left3 = state({
  rewards: [
    { p: 1.0, value: -5 },
  ],
  actions: {
    up: [{ p: 1.0, next: left2 }],
  }
})

const middle3 = state({
  rewards: [
    { p: 1.0, value: 1 },
  ],
  actions: {
    left: [{ p: 1.0, next: left3 }],
  }
})

const middle2 = state({
  rewards: [
    { p: 1.0, value: 2 },
  ],
  actions: {
    left: [{ p: 1.0, next: left2 }],
    down: [{ p: 1.0, next: middle3 }],
  }
})

const middle1 = state({
  rewards: [
    { p: 1.0, value: 5 },
  ],
  actions: {
    left: [{ p: 1.0, next: end }],
    down: [{ p: 1.0, next: middle2 }],
  }
})

const tripple = {
  start: state({
    actions: {
      up: [{ p: 1.0, next: state({
        rewards: [
          { p: 1.0, value: 1 },
        ],
        actions: {
          left: [{ p: 1.0, next: middle2 }],
          up: [{ p: 1.0, next: state({
            rewards: [
              { p: 1.0, value: 1 },
            ],
            actions: {
              left: [{ p: 1.0, next: middle1 }],
            }
          })}]
        }
      }) }],
      left: [{ p: 1.0, next: middle3 }],
    }
  }),
}

export default tripple
