import state from '@/games/state'

const addition = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 1 },] }) }],
      left: [{ p: 1.0, next: state({
        actions: {
          up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 2 },] }) }],
          down: [{ p: 1.0, next: state({ rewards: [
            { p: 2/3., value: 3 },
            { p: 1/3., value: 1 },
          ] }) }],
        }
      }) }],
    }
  }),
}

export default addition
