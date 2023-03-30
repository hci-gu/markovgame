import state from './state.js'

const addition = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 },] }) }],
      up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 4, }], actions: {
        right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 7 },] }) }],
      } }) }],
    }
  }),
}

export default addition
