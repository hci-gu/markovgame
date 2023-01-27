import state from '@/games/state'

const addition = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 1 },] }) }],
      up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 0, }], actions: {
        left: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: -5 },] }) }],
        right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: -5 },], actions: {
          right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 },] }) }],
          up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: -10 },] }) }],
        } }) }],
      } }) }],
    }
  }),
}

export default addition
