import state from '@/games/state'

const test = {
  start: state({
    actions: {
      up: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 10 }] }) }],
      left: [{ p: 1.0, next: state({
        rewards: [{ p: 1.0, value: -10 }],
        actions: {
          up: [
            {p: 0.5, next: state({ rewards: [{p: 1.0, value: 10}], })},
            {p: 0.5, next: state({ rewards: [{p: 1.0, value: -10}], })},
          ]
        }
      }) }],
    }
  }),
}

export default test
