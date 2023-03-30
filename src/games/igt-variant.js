import state from './state.js'

const igt = {
  start: state({
    actions: {
      up: [
        { p: 1.0, rewards: [{ p: 0.5, value: 100 }, { p: 0.5, value: -50 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      down: [
        { p: 1.0, rewards: [{ p: 0.5, value: 10 }, { p: 0.5, value: -100 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      left: [
        { p: 1.0, rewards: [{ p: 0.5, value: 100 }, { p: 0.5, value: -90 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      right: [
        { p: 1.0, rewards: [{ p: 1/3., value: 1000 }, { p: 2/3., value: -50 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
    }
  })
}

export default igt
