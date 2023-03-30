import state from './state.js'

const end = state({ rewards: [
  { p: 0.5, value: 0 },
  { p: 0.5, value: 1 },
] })

const double = {
  start: state({
    actions: {
      up: [{ p: 1.0, next: state({
        rewards: [
          { p: 1.0, value: 1 },
        ],
        actions: {
          left: [{ p: 1.0, next: end }],
        }
      }) }],
      left: [{ p: 1.0, next: state({
        rewards: [
          { p: 1.0, value: 0 },
        ],
        actions: {
          up: [{ p: 1.0, next: end }],
        }
      }) }],
    }
  }),
}

export default double
