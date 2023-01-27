import state from '@/games/state'

const igt = {
  start: state({
    actions: {
      up: [
        { p: 1.0, rewards: [{ p: 0.1, value: -1150 }, { p: 0.9, value: 100 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      down: [
        { p: 1.0, rewards: [{ p: 0.5, value: 0 }, { p: 0.5, value: 50 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      left: [
        { p: 1.0, rewards: [{ p: 0.1, value: -200 }, { p: 0.9, value: 50 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
      right: [
        { p: 1.0, rewards: [{ p: 0.5, value: 100 }, { p: 0.5, value: -150 }], next: state({ rewards: [{ p: 1.0, value: 0 }] }) },
      ],
    }
  })
}

export default igt
