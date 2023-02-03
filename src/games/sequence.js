import state from '@/games/state'

const sequence = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 1 },] }) }],
      left: [{ p: 1.0, next: state({
        rewards: [
          { p: 0.5, value: 3, },
          { p: 0.5, value: 0, },
        ], actions: {
          left: [{ p: 1.0, next: state({
            rewards: [
              { p: 0.5, value: 3 },
              { p: 0.5, value: 0 },
            ]
          }) }],
        }
      }) }],
    }
  }),
}

export default sequence
