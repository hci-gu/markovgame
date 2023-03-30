import state from './state.js'

/*

 S-a-b
 | | |
 c d e
 | | |
 f-g-E

*/

const end = state({ rewards: [
  { p: 1.0, value: 0 },
] })

const g = state({
  rewards: [
    { p: 0.5, value: 0 },
    { p: 0.5, value: 1 },
  ],
  actions: {
    right: [{ p: 1.0, next: end }],
  }
})

const f = state({
  rewards: [
    { p: 0.5, value: 0 },
    { p: 0.5, value: 1 },
  ],
  actions: {
    right: [{ p: 1.0, next: g }],
  }
})

const e = state({
  rewards: [
    { p: 1/3.0, value: 3 },
    { p: 2/3.0, value: 0 },
  ],
  actions: {
    down: [{ p: 1.0, next: end }],
  }
})

const d = state({
  rewards: [
    { p: 1/3.0, value: 2 },
    { p: 1/3.0, value: 0 },
    { p: 1/3.0, value: 1 },
  ],
  actions: {
    down: [{ p: 1.0, next: g }],
  }
})

const c = state({
  rewards: [
    { p: 0.5, value: 2 },
    { p: 0.5, value: 0 },
  ],
  actions: {
    down: [{ p: 1.0, next: f }],
  }
})

const b = state({
  rewards: [
    { p: 1.0, value: 0 },
  ],
  actions: {
    down: [{ p: 1.0, next: e }],
  }
})

const a = state({
  rewards: [
    { p: 1.0, value: 0 },
  ],
  actions: {
    down: [{ p: 1.0, next: d }],
    right: [{ p: 1.0, next: b }],
  }
})

const trippl1 = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: a }],
      down: [{ p: 1.0, next: c }],
    }
  }),
}

export default trippl1
