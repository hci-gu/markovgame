import state from '@/games/state'

const addition = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({
        rewards: [{ p: 1.0, value: 1 },],
      }) }],
      up: [{ p: 1.0, next: state({
        actions: {
          up: [{ p: 1.0, next: state({ }) }],
          left: [{ p: 1.0, next: state({ }) }],
          right: [{ p: 1.0, next: state({
            actions: {
              up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 2 },] }) }],
              right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 0 },] }) }],
            }
          }) }],
        }
      }) }],
    }
  }),
}

export default addition
