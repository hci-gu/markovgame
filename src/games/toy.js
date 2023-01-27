import state from '@/games/state'

const coin = {
  start: state({
    actions: {
      up: [{ p: 1.0, next: state({ rewards: [ { p: 1.0, value: 1 }, ] }) }],
      right: [{ p: 1.0, next: state({ rewards: [ { p: 1.0, value: 2 }, ] }) }],
      down: [{ p: 1.0, next: state({ rewards: [ { p: 1.0, value: 3 }, ] }) }],
      left: [{ p: 1.0, next: state({ rewards: [ { p: 1.0, value: 4 }, ] }) }],
    }
  }),
}

export default coin
