import state from '@/games/state'

const igt = {
  start: state({
    actions: {
      up: [
        { p: 1.0, rewards: [{ p: 0.25, value: -6 }, { p: 0.75, value: 2 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      down: [
        { p: 1.0, rewards: [{ p: 0.5, value: 1 }, { p: 0.5, value: 0 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      left: [
        { p: 1.0, rewards: [{ p: 0.75, value: 1 }, { p: 0.25, value: -2 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      right: [
        { p: 1.0, rewards: [{ p: 0.5, value: -3 }, { p: 0.5, value: 2 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
    }
  })
}

export default igt
