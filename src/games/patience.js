import state from '@/games/state'

const patience = {
  start: state({
    actions: {
      right: [{ p: 1.0, next: state({ rewards: [{ p: 1.0, value: 1 },] }) }],
      left: [{ p: 1.0, next: state({ rewards: [
        { p: 1/3.0, value: 6 },
        { p: 2/3.0, value: 0 },
      ] }) }],
    }
  }),
}

export default patience
