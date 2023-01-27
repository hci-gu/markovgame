import state from '@/games/state'

const addition = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 2 },] }) }],
      up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 0, }], actions: {
        right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 },] }) }],
        left: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: -10 },] }) }],
      } }) }],
    }
  }),
}

export default addition
