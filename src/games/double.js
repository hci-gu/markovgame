import state from './state.js'

const end = state({ rewards: [{ p: 1.0, value: 0 }] })
const shared = state({
  rewards: [
    { p: 0.5, value: 0 },
    { p: 0.5, value: 2 },
  ],
  actions: {
    left: [{ p: 1.0, next: state({
      rewards: [{ p: 0.5, value: 0 }, { p: 0.5, value: -3 }],
      actions: {
        up: [{ p: 1.0, next: end }],
      }
    }) }],
  }
})

const double = {
  start: state({
    actions: {
      up: [{ p: 1.0, next: state({
        rewards: [
          { p: 1.0, value: 1 },
        ],
        actions: {
          left: [{ p: 1.0, next: state({
            rewards: [
              { p: 1/3., value: 0 },
              { p: 1/3., value: 1 },
              { p: 1/3., value: 2 },
            ],
            actions: {
              down: [{ p: 1.0, next: shared }],
              left: [{ p: 1.0, next: end }],
            }
          }) }],
        }
      }) }],
      left: [{ p: 1.0, next: shared }],
    }
  }),
}

export default double
