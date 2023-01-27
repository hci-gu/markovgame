import state from '@/games/state'

const addition = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 },] }) }],
      up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 7, }], actions: {
        right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: -4 },] }) }],
      } }) }],
    }
  }),
}

export default addition
